"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { ImageProps } from "next/image";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import FadeInImage from "@/components/FadeInImage";
import { cx } from "@/lib/cx";
import styles from "./ZoomableImage.module.css";

const MIN_SCALE: number = 1;
const MAX_SCALE: number = 5;
/** Zoom de un click, un doble toque o el botón. */
const TOGGLE_SCALE: number = 2.5;
/** Cuánto acerca la rueda por píxel de scroll (un paso de la rueda del mouse son ~100 px). */
const WHEEL_ZOOM_PER_PIXEL: number = 0.002;
const DOUBLE_TAP_MS: number = 300;
const TAP_MOVE_TOLERANCE: number = 10;
const SWIPE_MIN_DISTANCE: number = 50;
/** Con zoom, `sizes` pide una versión más grande de la foto (el navegador la elige del srcset). */
const ZOOMED_SIZES: string = "250vw";
const TOGGLE_TRANSITION: string = "transform 0.35s cubic-bezier(0.2, 0, 0, 1)";
const WHEEL_TRANSITION: string = "transform 0.12s ease-out";

type Point = { x: number; y: number };
type View = { scale: number; x: number; y: number };
/** Dónde empieza y cuánto mide la foto en un eje, dentro del recuadro y sin zoom. */
type Span = { start: number; length: number };
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

// Qué parte del recuadro ocupa la foto sin zoom: con object-fit: contain puede
// sobrar lugar a los costados (o arriba y abajo).
function photoArea(img: HTMLImageElement, width: number, height: number): { x: Span; y: Span } {
  if (getComputedStyle(img).objectFit !== "contain" || !img.naturalWidth || !img.naturalHeight) {
    return { x: { start: 0, length: width }, y: { start: 0, length: height } };
  }
  const fit: number = Math.min(width / img.naturalWidth, height / img.naturalHeight);
  const w: number = img.naturalWidth * fit;
  const h: number = img.naturalHeight * fit;
  return { x: { start: (width - w) / 2, length: w }, y: { start: (height - h) / 2, length: h } };
}

// Desplazamiento permitido en un eje (con el origen arriba a la izquierda): con
// zoom, la foto tiene que seguir tapando el recuadro, sin dejar arrastrarla
// hasta ver el vacío; si todavía es más chica que el recuadro, queda centrada.
function clampOffset(offset: number, scale: number, size: number, photo: Span): number {
  const scaled: number = photo.length * scale;
  if (scaled <= size) return (size - scaled) / 2 - photo.start * scale;
  return clamp(offset, size - (photo.start + photo.length) * scale, -photo.start * scale);
}

// Zoom con click, doble toque, rueda, pellizco o el botón de la esquina;
// arrastre con zoom; swipe sin zoom. Mouse, dedo y lápiz pasan todos por
// Pointer Events. La transformación se escribe directo en el <img>
// (transform-origin arriba a la izquierda): React solo se entera cuando cambia
// si hay zoom o si se está arrastrando, no en cada movimiento.
export default function ZoomableImage({ onSwipe, sizes, ...props }: ImageProps & { onSwipe?: (direction: "prev" | "next") => void }): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const view = useRef<View>({ scale: MIN_SCALE, x: 0, y: 0 });
  const pointers = useRef<Map<number, Point>>(new Map());
  const gesture = useRef<Gesture>(null);
  // Tiempos del último toque y del último click. Arrancan en -Infinity y no en
  // 0: event.timeStamp cuenta desde que cargó la página, y con 0 un primer
  // toque o click en los primeros 300 ms se tomaría como el segundo de un doble.
  const lastTapTime = useRef<number>(-Infinity);
  const lastClickTime = useRef<number>(-Infinity);
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);

  function relativeTo(point: Point): Point {
    const rect: DOMRect | undefined = containerRef.current?.getBoundingClientRect();
    return rect ? { x: point.x - rect.left, y: point.y - rect.top } : point;
  }

  function center(): Point {
    const rect: DOMRect | undefined = containerRef.current?.getBoundingClientRect();
    return rect ? { x: rect.width / 2, y: rect.height / 2 } : { x: 0, y: 0 };
  }

  function apply(next: View, transition: string = "none"): void {
    const container: HTMLDivElement | null = containerRef.current;
    const img: HTMLImageElement | null | undefined = container?.querySelector("img");
    if (!container || !img) return;
    const { width, height } = container.getBoundingClientRect();
    const scale: number = clamp(next.scale, MIN_SCALE, MAX_SCALE);
    const photo: { x: Span; y: Span } = photoArea(img, width, height);
    view.current = { scale, x: clampOffset(next.x, scale, width, photo.x), y: clampOffset(next.y, scale, height, photo.y) };
    img.style.transition = transition;
    img.style.transform = `translate(${view.current.x}px, ${view.current.y}px) scale(${scale})`;
    setZoomed(scale > MIN_SCALE);
  }

  // Cambia la escala dejando quieto el punto `at` (relativo al recuadro).
  function zoomAround(at: Point, targetScale: number, transition?: string): void {
    const { scale, x, y } = view.current;
    const nextScale: number = clamp(targetScale, MIN_SCALE, MAX_SCALE);
    const ratio: number = nextScale / scale;
    apply({ scale: nextScale, x: at.x - (at.x - x) * ratio, y: at.y - (at.y - y) * ratio }, transition);
  }

  // Click, doble toque o botón: acerca en ese punto o vuelve a la foto entera.
  function toggleZoom(at: Point): void {
    zoomAround(at, view.current.scale > MIN_SCALE ? MIN_SCALE : TOGGLE_SCALE, TOGGLE_TRANSITION);
  }

  // Con el dedo, el segundo toque dentro de DOUBLE_TAP_MS alterna el zoom.
  function registerTap(at: Point, time: number): void {
    if (time - lastTapTime.current < DOUBLE_TAP_MS) {
      lastTapTime.current = -Infinity;
      toggleZoom(relativeTo(at));
    } else {
      lastTapTime.current = time;
    }
  }

  // Con el mouse alcanza un click. El segundo click de un doble click no
  // cuenta: si no, el doble click acercaría y alejaría de una.
  function registerClick(at: Point, time: number): void {
    if (time - lastClickTime.current < DOUBLE_TAP_MS) return;
    lastClickTime.current = time;
    toggleZoom(relativeTo(at));
  }

  function startPan(pointerId: number, start: Point): void {
    gesture.current = { kind: "pan", pointerId, start, from: view.current };
    setDragging(true);
  }

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>): void => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const point: Point = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, point);

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()] as [Point, Point];
      gesture.current = { kind: "pinch", startDistance: distance(a, b), startScale: view.current.scale };
      setDragging(true);
    } else if (pointers.current.size === 1) {
      if (view.current.scale > MIN_SCALE) startPan(e.pointerId, point);
      else gesture.current = { kind: "tap", pointerId: e.pointerId, start: point };
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
    if (cancelled) return;

    const dx: number = e.clientX - g.start.x;
    const dy: number = e.clientY - g.start.y;
    // Un arrastre que casi no se movió también cuenta como click o toque: así
    // con zoom un click (o doble toque) la deja entera de nuevo.
    const moved: boolean = Math.hypot(dx, dy) > TAP_MOVE_TOLERANCE;
    if (e.pointerType === "mouse") {
      // Un arrastre en el medio corta el doble click: el click siguiente cuenta.
      if (moved) lastClickTime.current = -Infinity;
      else registerClick(g.start, e.timeStamp);
    } else if (g.kind === "tap" && onSwipe && Math.abs(dx) >= SWIPE_MIN_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      onSwipe(dx < 0 ? "next" : "prev");
    } else if (!moved) {
      registerTap(g.start, e.timeStamp);
    }
  };

  // React registra `wheel` como listener pasivo y ahí preventDefault() no hace
  // nada: la rueda haría zoom en la foto y además scrollearía lo de atrás. El
  // zoom es proporcional al scroll: un paso de rueda acerca de a saltos y el
  // trackpad (muchos eventos chiquitos) de a poco.
  const handleWheel = useEffectEvent((e: WheelEvent): void => {
    e.preventDefault();
    // deltaMode: 0 = píxeles, 1 = líneas, 2 = páginas.
    const pixels: number = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1);
    const factor: number = Math.exp(-clamp(pixels, -100, 100) * WHEEL_ZOOM_PER_PIXEL);
    zoomAround(relativeTo({ x: e.clientX, y: e.clientY }), view.current.scale * factor, WHEEL_TRANSITION);
  });

  useEffect((): (() => void) | void => {
    const el: HTMLDivElement | null = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent): void => handleWheel(e);
    el.addEventListener("wheel", onWheel, { passive: false });
    return (): void => el.removeEventListener("wheel", onWheel);
  }, []);

  // PhotoDialog no desmonta el contenido al cerrarse: sin esto, al volver a
  // abrir el modal la foto seguiría con zoom.
  const resetZoom = useEffectEvent((): void => apply({ scale: MIN_SCALE, x: 0, y: 0 }));

  useEffect((): (() => void) | void => {
    const dialog: HTMLDialogElement | null | undefined = containerRef.current?.closest("dialog");
    if (!dialog) return;
    const onClose = (): void => resetZoom();
    dialog.addEventListener("close", onClose);
    return (): void => dialog.removeEventListener("close", onClose);
  }, []);

  const style: CSSProperties = { ...props.style, transformOrigin: "0 0" };

  return (
    <div
      ref={containerRef}
      className={cx(styles.zoomableWrap, zoomed && styles.zoomed, dragging && styles.dragging)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <FadeInImage {...props} sizes={zoomed ? ZOOMED_SIZES : sizes} style={style} draggable={false} />
      <button
        type="button"
        className={cx("button button--outline button--icon", styles.zoomButton)}
        aria-label={zoomed ? "Alejar la foto" : "Acercar la foto"}
        // Sin esto, el recuadro tomaría el toque del botón como el comienzo de un gesto.
        onPointerDown={(e: PointerEvent<HTMLButtonElement>): void => e.stopPropagation()}
        onClick={(): void => toggleZoom(center())}
      >
        {zoomed ? <FiZoomOut aria-hidden /> : <FiZoomIn aria-hidden />}
      </button>
    </div>
  );
}
