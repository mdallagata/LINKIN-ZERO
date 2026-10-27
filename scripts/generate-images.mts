// Genera las versiones de cada foto de public/images en los anchos de
// src/lib/image-sizes.json, dentro de public/generated (no va a git). Corre
// antes de `pnpm dev` y `pnpm build`; solo procesa lo que cambió desde la
// última vez y borra lo que ya no tiene foto de origen.
import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import sharp from "sharp";
import sizes from "../src/lib/image-sizes.json" with { type: "json" };
import { generatedImagePath } from "../src/lib/generated-image-path.ts";

const PUBLIC_DIR: string = "public";
const SOURCE_DIR: string = join(PUBLIC_DIR, "images");
const OUTPUT_DIR: string = join(PUBLIC_DIR, "generated");
const WIDTHS: number[] = [...sizes.imageSizes, ...sizes.deviceSizes];
const EXTENSIONS: Set<string> = new Set([".webp", ".jpg", ".jpeg", ".png"]);

// Pocos hilos: el build no tiene que trabar la máquina.
sharp.concurrency(2);

async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries.filter((e) => e.isFile()).map((e) => join(e.parentPath, e.name));
}

async function mtime(path: string): Promise<number | null> {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return null;
  }
}

const sources: string[] = (await listFiles(SOURCE_DIR)).filter((f: string): boolean => EXTENSIONS.has(extname(f).toLowerCase()));
const expected: Set<string> = new Set();
let generated: number = 0;

for (const file of sources) {
  const src: string = "/" + relative(PUBLIC_DIR, file);
  const sourceTime: number = (await mtime(file)) ?? 0;
  const { width: sourceWidth = 0 } = await sharp(file).metadata();

  for (const width of WIDTHS) {
    const out: string = join(PUBLIC_DIR, generatedImagePath(src, width));
    expected.add(out);
    const outTime: number | null = await mtime(out);
    if (outTime !== null && outTime >= sourceTime) continue;

    await mkdir(dirname(out), { recursive: true });
    // Si la foto ya es más chica que este ancho, se usa tal cual (sin volver a
    // comprimir un .webp, que solo le bajaría la calidad).
    if (width >= sourceWidth && extname(file).toLowerCase() === ".webp") await copyFile(file, out);
    else await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    generated++;
  }
}

let removed: number = 0;
for (const file of await listFiles(OUTPUT_DIR).catch((): string[] => [])) {
  if (!expected.has(file)) {
    await rm(file);
    removed++;
  }
}

console.log(`Imágenes: ${sources.length} fotos, ${generated} versiones generadas, ${expected.size - generated} al día, ${removed} borradas.`);
