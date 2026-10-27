"use client";

import { generatedImagePath } from "@/lib/generated-image-path";

// next/image llama a esta función para cada ancho del srcset (los de
// image-sizes.json) y devuelve la versión que generó scripts/generate-images.ts.
// El sitio es estático: no hay servidor que redimensione al vuelo.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  return src.startsWith("/images/") ? generatedImagePath(src, width) : src;
}
