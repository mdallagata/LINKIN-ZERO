// Sirve el sitio exportado (out/) como Cloudflare: /members → members.html y
// las rutas que no existen devuelven 404.html con status 404.
// Uso: node tests/serve.mjs <puerto>
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const ROOT = "out";
const PORT = Number(process.argv[2] ?? 3100);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

async function isFile(path) {
  return stat(path).then(
    (s) => s.isFile(),
    () => false,
  );
}

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(ROOT, path), join(ROOT, path, "index.html"), join(ROOT, `${path}.html`)];
  let found = null;
  for (const candidate of candidates)
    if (await isFile(candidate)) {
      found = candidate;
      break;
    }
  const file = found ?? join(ROOT, "404.html");
  res.writeHead(found ? 200 : 404, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(await readFile(file));
}).listen(PORT, () => console.log(`Sirviendo ${ROOT}/ en http://localhost:${PORT}`));
