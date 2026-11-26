import { useEffect, useState } from "react";

// Scroll animado para los saltos que hace el JS (Contratar, Volver arriba),
// salvo con "reducir movimiento" activado en el sistema. No va en el CSS
// (scroll-behavior en html): ver el comentario en globals.css.
export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

/** Cuánto se espera a que aparezca la sección del #ancla (mientras se ve loading.tsx). */
const HASH_TARGET_TIMEOUT_MS: number = 3000;

/**
 * Asegura que un link con #ancla termine en su sección (Contratar → /#contacto,
 * "Más info" → /shows#…). El navegador o Next lo hacen solos, pero a veces no:
 * al abrir el link de cero, la hidratación de React les corta el scroll; y al
 * navegar a una página que todavía no se precargó, Next scrollea mientras se ve
 * loading.tsx, cuando la sección todavía no existe. En los dos casos la página
 * quedaba arriba de todo. Corre al cargar y en cada cambio de página
 * (`pathname`): espera a que exista la sección y, si no quedó a la vista, baja.
 */
export function useScrollToHash(pathname: string): void {
  useEffect((): (() => void) | void => {
    const id: string = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const deadline: number = performance.now() + HASH_TARGET_TIMEOUT_MS;
    let frame: number = 0;
    function check(): void {
      const target: HTMLElement | null = document.getElementById(id);
      if (!target) {
        if (performance.now() < deadline) frame = requestAnimationFrame(check);
        return;
      }
      const top: number = target.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight / 2) target.scrollIntoView({ behavior: "instant", block: "start" });
    }
    check();
    return (): void => cancelAnimationFrame(frame);
  }, [pathname]);
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
