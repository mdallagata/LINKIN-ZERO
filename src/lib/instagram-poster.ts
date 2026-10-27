import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { instagramEmbedInfo } from "@/lib/instagram-embed";

/** Portada de la publicación (captura generada con `pnpm instagram-poster <url>`), si existe. */
export function instagramPoster(url: string): string | undefined {
  const code: string | undefined = instagramEmbedInfo(url)?.code;
  if (!code) return undefined;
  const path: string = `/images/instagram/${code}.webp`;
  return existsSync(join(process.cwd(), "public", path)) ? path : undefined;
}
