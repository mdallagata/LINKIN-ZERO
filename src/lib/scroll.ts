import { useEffect, useState } from "react";

// Con "reducir movimiento" activado en el sistema, los saltos de scroll son
// instantáneos en vez de animados (igual que scroll-behavior en globals.css).
export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

/**
 * Si la página está scrolleada más de `offset` px (SiteHeader, BackToTop). Lee
 * el scroll a lo sumo una vez por frame, y también al montar: la página puede
 * arrancar scrolleada (recarga, link con #).
 */
export function useScrolledPast(offset: number): boolean {
  const [past, setPast] = useState<boolean>(false);

  useEffect((): (() => void) => {
    let rafId: number | null = null;
    function update(): void {
      rafId = null;
      setPast(window.scrollY > offset);
    }
    function onScroll(): void {
      if (rafId === null) rafId = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return (): void => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [offset]);

  return past;
}
