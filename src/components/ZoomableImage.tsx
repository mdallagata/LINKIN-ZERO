"use client";

import type { CSSProperties, MouseEvent, ReactNode, TouchEvent, WheelEvent } from "react";
import { useCallback, useRef, useState } from "react";
import type { ImageProps } from "next/image";
import FadeInImage from "@/components/FadeInImage";

const MIN_SCALE = 1;
const MAX_SCALE = 10;
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_MOVE_TOLERANCE = 10;
const DOUBLE_TAP_ZOOM = 2.5;

type Point = { x: number; y: number };
type DragStart = Point & { posX: number; posY: number };

export default function ZoomableImage(props: ImageProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<DragStart>({ x: 0, y: 0, posX: 0, posY: 0 });
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const tapStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTap = useRef<{ time: number } | null>(null);
  const [scale, setScale] = useState<number>(MIN_SCALE);
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [touching, setTouching] = useState<boolean>(false);

  const isZoomed: boolean = scale > MIN_SCALE;

  const clampPos = useCallback((x: number, y: number, s: number): Point => {
    const rect: DOMRect | undefined = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x, y };
    const maxX: number = (rect.width * (s - 1)) / 2;
    const maxY: number = (rect.height * (s - 1)) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  }, []);

  const zoomAt = useCallback(
    (clientX: number, clientY: number, newScale: number, currentScale: number, currentPos: Point): void => {
      const rect: DOMRect | undefined = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cursorX: number = clientX - rect.left;
      const cursorY: number = clientY - rect.top;
      const ratio: number = newScale / currentScale;
      const next: Point = clampPos(
        cursorX - (cursorX - currentPos.x) * ratio,
        cursorY - (cursorY - currentPos.y) * ratio,
        newScale
      );
      setPos(next);
      setScale(newScale);
    },
    [clampPos]
  );

  const handleWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>): void => {
      e.preventDefault();
      const factor: number = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      const newScale: number = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * factor));
      zoomAt(e.clientX, e.clientY, newScale, scale, pos);
    },
    [scale, pos, zoomAt]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent): void => {
      if (!isZoomed) return;
      e.preventDefault();
      setDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
    },
    [isZoomed, pos.x, pos.y]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent): void => {
      if (!dragging) return;
      setPos(
        clampPos(
          dragStart.current.posX + (e.clientX - dragStart.current.x),
          dragStart.current.posY + (e.clientY - dragStart.current.y),
          scale
        )
      );
    },
    [dragging, scale, clampPos]
  );

  const handleMouseUp = useCallback((): void => {
    setDragging(false);
  }, []);

  const handleDoubleClick = useCallback(
    (e: MouseEvent): void => {
      const target: number = scale > MIN_SCALE ? MIN_SCALE : DOUBLE_TAP_ZOOM;
      zoomAt(e.clientX, e.clientY, target, scale, pos);
    },
    [scale, pos, zoomAt]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>): void => {
      if (e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        pinchStart.current = {
          dist: Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY),
          scale,
        };
        setTouching(true);
        return;
      }
      const touch = e.touches[0];
      if (isZoomed) {
        dragStart.current = { x: touch.clientX, y: touch.clientY, posX: pos.x, posY: pos.y };
        setTouching(true);
      } else {
        tapStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
      }
    },
    [isZoomed, scale, pos.x, pos.y]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>): void => {
      if (e.touches.length === 2 && pinchStart.current) {
        e.preventDefault();
        const rect: DOMRect | undefined = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist: number = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const midX: number = (t1.clientX + t2.clientX) / 2 - rect.left;
        const midY: number = (t1.clientY + t2.clientY) / 2 - rect.top;
        const newScale: number = Math.max(
          MIN_SCALE,
          Math.min(MAX_SCALE, pinchStart.current.scale * (dist / pinchStart.current.dist))
        );
        const ratio: number = newScale / scale;
        setPos(clampPos(midX - (midX - pos.x) * ratio, midY - (midY - pos.y) * ratio, newScale));
        setScale(newScale);
        return;
      }
      if (e.touches.length === 1 && touching) {
        e.preventDefault();
        const touch = e.touches[0];
        setPos(
          clampPos(
            dragStart.current.posX + (touch.clientX - dragStart.current.x),
            dragStart.current.posY + (touch.clientY - dragStart.current.y),
            scale
          )
        );
      }
    },
    [touching, scale, pos, clampPos]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>): void => {
      if (e.touches.length === 1) {
        if (touching) {
          const touch = e.touches[0];
          dragStart.current = { x: touch.clientX, y: touch.clientY, posX: pos.x, posY: pos.y };
        }
        pinchStart.current = null;
        return;
      }
      pinchStart.current = null;
      setTouching(false);
      const start: { x: number; y: number; time: number } | null = tapStart.current;
      tapStart.current = null;
      if (!start) return;
      const changed = e.changedTouches[0];
      const moved: number = Math.hypot(changed.clientX - start.x, changed.clientY - start.y);
      if (moved > DOUBLE_TAP_MOVE_TOLERANCE) return;
      const now: number = Date.now();
      const prev: { time: number } | null = lastTap.current;
      if (prev && now - prev.time < DOUBLE_TAP_MS) {
        lastTap.current = null;
        const target: number = scale > MIN_SCALE ? MIN_SCALE : DOUBLE_TAP_ZOOM;
        zoomAt(start.x, start.y, target, scale, pos);
      } else {
        lastTap.current = { time: now };
      }
    },
    [touching, scale, pos, zoomAt]
  );

  const handleTouchCancel = useCallback((): void => {
    pinchStart.current = null;
    tapStart.current = null;
    setTouching(false);
  }, []);

  const wrapClass: string = `zoomable-wrap${isZoomed ? " zoomed" : ""}`;
  const cursor: string = isZoomed ? (dragging ? "grabbing" : "grab") : "zoom-in";
  const style: CSSProperties = {
    ...props.style,
    transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
    transformOrigin: "0 0",
    cursor,
    touchAction: isZoomed ? "none" : "manipulation",
    transition: dragging || touching ? "none" : "transform 0.15s ease-out",
  };

  return (
    <div
      ref={containerRef}
      className={wrapClass}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <FadeInImage {...props} style={style} />
    </div>
  );
}
