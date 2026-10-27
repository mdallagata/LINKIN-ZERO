"use client";

import type { CSSProperties, MouseEvent, PointerEvent, ReactNode } from "react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { ImageProps } from "next/image";
import FadeInImage from "@/components/FadeInImage";

const MIN_SCALE: number = 1;
const MAX_SCALE: number = 10;
const WHEEL_STEP: number = 1.15;
const DOUBLE_TAP_MS: number = 300;
const DOUBLE_TAP_ZOOM: number = 2.5;
const TAP_MOVE_TOLERANCE: number = 10;
const SWIPE_MIN_DISTANCE: number = 50;

type Point = { x: number; y: number };
type View = { scale: number; x: number; y: number };
type Gesture =
  | { kind: "tap"; pointerId: number; start: Point }
  | { kind: "pan"; pointerId: number; start: Point; from: View }
  | { kind: "pinch"; startDistance: number; startScale: number }
  | null;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Zoom con rueda, doble click/tap y pellizco; arrastre con zoom; swipe sin zoom.
// Mouse, dedo y lápiz pasan todos por Pointer Events. La transformación se
// escribe directo en el <img> (transform-origin arriba a la izquierda): React
// solo se entera cuando empieza o termina un gesto, no en cada movimiento.
export default function ZoomableImage({ onSwipe, ...props }: ImageProps & { onSwipe?: (direction: "prev" | "next") => void }): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const view = useRef<View>({ scale: MIN_SCALE, x: 0, y: 0 });
  const pointers = useRef<Map<number, Point>>(new Map());
  const gesture = useRef<Gesture>(null);
  const lastTapTime = useRef<number>(0);
  const lastPointerType = useRef<string>("mouse");
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);

  function relativeTo(point: Point): Point {
    const rect: DOMRect | undefined = containerRef.current?.getBoundingClientRect();
    return rect ? { x: point.x - rect.left, y: point.y - rect.top } : point;
  }

  function apply(next: View): void {
    const container: HTMLDivElement | null = containerRef.current;
    const img: HTMLImageElement | null | undefined = container?.querySelector("img");
    if (!container || !img) return;
    const { width, height } = container.getBoundingClientRect();
    const scale: number = clamp(next.scale, MIN_SCALE, MAX_SCALE);
    // La foto agrandada tiene que seguir tapando el recuadro: con el origen
    // arriba a la izquierda, x va de W·(1 − escala) a 0 (y lo mismo para y).
    view.current = { scale, x: clamp(next.x, width * (1 - scale), 0), y: clamp(next.y, height * (1 - scale), 0) };
    img.style.transform = `translate(${view.current.x}px, ${view.current.y}px) scale(${scale})`;
    setZoomed(scale > MIN_SCALE);
  }

  // Cambia la escala dejando quieto el punto `at` (relativo al recuadro).
  function zoomAround(at: Point, targetScale: number): void {
    const { scale, x, y } = view.current;
    const nextScale: number = clamp(targetScale, MIN_SCALE, MAX_SCALE);
    const ratio: number = nextScale / scale;
    apply({ scale: nextScale, x: at.x - (at.x - x) * ratio, y: at.y - (at.y - y) * ratio });
  }

  function toggleZoom(at: Point): void {
    zoomAround(at, view.current.scale > MIN_SCALE ? MIN_SCALE : DOUBLE_TAP_ZOOM);
  }

  // Un toque corto: el segundo dentro de DOUBLE_TAP_MS alterna el zoom.
  function registerTap(at: Point, time: number): void {
    if (time - lastTapTime.current < DOUBLE_TAP_MS) {
      lastTapTime.current = 0;
      toggleZoom(relativeTo(at));
    } else {
      lastTapTime.current = time;
    }
  }

  function startPan(pointerId: number, start: Point): void {
    gesture.current = { kind: "pan", pointerId, start, from: view.current };
    setDragging(true);
  }

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>): void => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    lastPointerType.current = e.pointerType;
    e.currentTarget.setPointerCapture(e.pointerId);
    const point: Point = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, point);

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()] as [Point, Point];
      gesture.current = { kind: "pinch", startDistance: distance(a, b), startScale: view.current.scale };
      setDragging(true);
    } else if (pointers.current.size === 1) {
      if (view.current.scale > MIN_SCALE) startPan(e.pointerId, point);
      // Con mouse y sin zoom no hay gesto: el doble click lo maneja onDoubleClick.
      else gesture.current = e.pointerType === "mouse" ? null : { kind: "tap", pointerId: e.pointerId, start: point };
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>): void => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g: Gesture = gesture.current;

    if (g?.kind === "pinch" && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()] as [Point, Point];
      zoomAround(relativeTo({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }), g.startScale * (distance(a, b) / g.startDistance));
    } else if (g?.kind === "pan" && g.pointerId === e.pointerId) {
      apply({ scale: g.from.scale, x: g.from.x + (e.clientX - g.start.x), y: g.from.y + (e.clientY - g.start.y) });
    }
  };

  const handlePointerEnd = (e: PointerEvent<HTMLDivElement>): void => {
    if (!pointers.current.delete(e.pointerId)) return;
    const g: Gesture = gesture.current;
    const cancelled: boolean = e.type === "pointercancel";

    if (g?.kind === "pinch") {
      // Si queda un dedo apoyado y hay zoom, sigue como arrastre con ese dedo.
      const rest: [number, Point] | undefined = [...pointers.current.entries()][0];
      if (rest && view.current.scale > MIN_SCALE) return startPan(rest[0], rest[1]);
      gesture.current = null;
      setDragging(false);
      return;
    }
    if (g?.pointerId !== e.pointerId) return;
    gesture.current = null;
    setDragging(false);
    if (cancelled || e.pointerType === "mouse") return;

    const dx: number = e.clientX - g.start.x;
    const dy: number = e.clientY - g.start.y;
    if (g.kind === "tap" && onSwipe && Math.abs(dx) >= SWIPE_MIN_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      onSwipe(dx < 0 ? "next" : "prev");
    } else if (Math.hypot(dx, dy) <= TAP_MOVE_TOLERANCE) {
      // Un arrastre que casi no se movió también cuenta como toque: así el
      // doble toque saca el zoom además de ponerlo.
      registerTap(g.start, e.timeStamp);
    }
  };

  // El navegador también dispara dblclick tras un doble toque con el dedo, que
  // ya alternó el zoom en registerTap: acá solo cuenta el del mouse.
  const handleDoubleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (lastPointerType.current === "mouse") toggleZoom(relativeTo({ x: e.clientX, y: e.clientY }));
  };

  // React registra `wheel` como listener pasivo y ahí preventDefault() no hace
  // nada: la rueda haría zoom en la foto y además scrollearía lo de atrás.
  const handleWheel = useEffectEvent((e: WheelEvent): void => {
    e.preventDefault();
    zoomAround(relativeTo({ x: e.clientX, y: e.clientY }), view.current.scale * (e.deltaY < 0 ? WHEEL_STEP : 1 / WHEEL_STEP));
  });

  useEffect((): (() => void) | void => {
    const el: HTMLDivElement | null = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent): void => handleWheel(e);
    el.addEventListener("wheel", onWheel, { passive: false });
    return (): void => el.removeEventListener("wheel", onWheel);
  }, []);

  const style: CSSProperties = {
    ...props.style,
    transformOrigin: "0 0",
    transition: dragging ? "none" : "transform 0.15s ease-out",
  };

  return (
    <div
      ref={containerRef}
      className={`zoomable-wrap${zoomed ? " zoomed" : ""}${dragging ? " dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onDoubleClick={handleDoubleClick}
    >
      <FadeInImage {...props} style={style} draggable={false} />
    </div>
  );
}
