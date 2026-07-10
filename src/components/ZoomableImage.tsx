"use client";

import type { CSSProperties, MouseEvent, ReactNode, WheelEvent } from "react";
import { useCallback, useRef, useState } from "react";
import type { ImageProps } from "next/image";
import FadeInImage from "@/components/FadeInImage";

export default function ZoomableImage(props: ImageProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const [scale, setScale] = useState<number>(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);

  const isZoomed: boolean = scale > 1;

  const handleWheel = useCallback((e: WheelEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const rect: DOMRect | undefined = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cursorX: number = e.clientX - rect.left;
    const cursorY: number = e.clientY - rect.top;
    const factor: number = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    const newScale: number = Math.max(1, Math.min(10, scale * factor));
    if (newScale === 1) {
      setScale(1);
      setPos({ x: 0, y: 0 });
      return;
    }
    const ratio: number = newScale / scale;
    setPos({
      x: cursorX - (cursorX - pos.x) * ratio,
      y: cursorY - (cursorY - pos.y) * ratio,
    });
    setScale(newScale);
  }, [scale, pos]);

  const handleMouseDown = useCallback((e: MouseEvent): void => {
    if (!isZoomed) return;
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
  }, [isZoomed, pos.x, pos.y]);

  const handleMouseMove = useCallback((e: MouseEvent): void => {
    if (!dragging) return;
    setPos({
      x: dragStart.current.posX + (e.clientX - dragStart.current.x),
      y: dragStart.current.posY + (e.clientY - dragStart.current.y),
    });
  }, [dragging]);

  const handleMouseUp = useCallback((): void => {
    setDragging(false);
  }, []);

  const wrapClass: string = `zoomable-wrap${isZoomed ? " zoomed" : ""}`;
  const cursor: string = isZoomed ? (dragging ? "grabbing" : "grab") : "zoom-in";
  const style: CSSProperties = {
    ...props.style,
    transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
    transformOrigin: "0 0",
    cursor,
    transition: dragging ? "none" : "transform 0.15s ease-out",
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
    >
      <FadeInImage {...props} style={style} />
    </div>
  );
}
