// Dónde queda cada ancho generado de una foto de public/images. Lo usan el
// loader de next/image (para armar el srcset) y scripts/generate-images.ts
// (para generar los archivos), así que no puede importar nada con "@/".

/** "/images/shows/1/2.webp", 480 → "/generated/images/shows/1/2-480.webp" */
export function generatedImagePath(src: string, width: number): string {
  return `/generated${src.replace(/\.\w+$/, "")}-${width}.webp`;
}
