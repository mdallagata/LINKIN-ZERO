// Con "reducir movimiento" activado en el sistema, los saltos de scroll son
// instantáneos en vez de animados (igual que scroll-behavior en globals.css).
export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
