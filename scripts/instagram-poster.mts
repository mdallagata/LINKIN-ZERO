// Uso: pnpm instagram-poster <url de la publicación>
//
// Guarda una captura del embed de Instagram en public/images/instagram/<código>.webp.
// InstagramEmbed la muestra como portada y crea el iframe recién cuando la
// tocan, así quien no mira el video no descarga el embed (~50 pedidos). Hay que
// correrlo una vez por cada publicación nueva que se muestre en el sitio.
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { instagramEmbedInfo } from "../src/lib/instagram-embed.ts";

const url: string | undefined = process.argv[2];
const info = url ? instagramEmbedInfo(url) : null;
if (!url || !info) {
  console.error("Uso: pnpm instagram-poster https://www.instagram.com/p/<código>/");
  process.exit(1);
}

// Usa el Chrome instalado; si no hay, el Chromium de Playwright (`pnpm exec playwright install chromium`).
const browser = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: info.width, height: info.height }, deviceScaleFactor: 2 });
await page.goto(info.src, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const png: Buffer = await page.screenshot();
await browser.close();

const out: string = `public/images/instagram/${info.code}.webp`;
await mkdir("public/images/instagram", { recursive: true });
await sharp(png).webp({ quality: 80 }).toFile(out);
console.log(`Portada guardada en ${out}`);
