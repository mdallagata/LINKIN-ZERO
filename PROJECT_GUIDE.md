# LINKIN ZERØ - Project Guide

> For colors and visual style, see [STYLEGUIDE.md](./STYLEGUIDE.md).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Bootstrap 5 compilado desde Sass (solo base, grilla y algunas clases utilitarias; sin componentes ni JS de Bootstrap) · CSS Modules · Playwright · Prettier. Package manager is **pnpm** (version pinned in `packageManager`) — commit `pnpm-lock.yaml`, never `package-lock.json` or `yarn.lock`. Packages allowed to run install scripts are listed under `allowBuilds` in `pnpm-workspace.yaml`.

Node version is pinned in [.nvmrc](.nvmrc). Run `nvm use` before installing/running.

## Idioma

- **Código en inglés**: identificadores, variables, props, tipos y nombres de archivos — siempre en inglés.
- **Texto al usuario en español**: todo lo que renderiza la UI (labels, descripciones, `alt`, `aria-label`, metadatos, contenido de `src/data/`) — en español, con acentos y ñ correctos.
- Los comentarios son libres (inglés o español); lo visible al usuario no.

## TypeScript

Strict mode (`"strict": true`) y `noUncheckedIndexedAccess` están activos: `array[i]` es `T | undefined` y hay que contemplarlo. Convención de tipado en todo el código:

- **Nada implícito**: parámetros de funciones, props de componentes, retornos y variables (incluidas `useState`/`useRef`/`Map`) llevan anotación explícita — incluso cuando TS los infiere.
- **Prohibido `any`**: si algo no tiene tipo, hay que definirlo (tipo local, `unknown` + narrowing, o tipo de `next`/`react`), no usar `any`.
- **Exports de datos tipados**: toda constante de `src/data/` declara su tipo (`export const X: Tipo[] = ...`), incluidos literales como `OG_IMAGE` en `band.ts`.
- **Tipos de eventos**: los de React (`MouseEvent`, `PointerEvent`, `SyntheticEvent`) para handlers de JSX; los del DOM solo para listeners nativos (`addEventListener("wheel", …)`, que React registra como pasivo).
- Los retornos de componentes se anotan `: ReactNode`; los handlers de eventos, `: void`.
- No importar tipos de rutas internas (`next/dist/...`): se rompen con cualquier actualización.

## Server vs Client Components

Todo es Server Component salvo lo interactivo, que va en componentes chicos con `"use client"` (islas): `SiteHeader` (barra fija, link activo), `ShowPhotos` + `ShowPhotoGallery` + `ZoomableImage` (miniaturas, galería y zoom), `PhotoModalTrigger` + `PhotoDialog` (modales de fotos), `InstagramEmbed`, `FadeInSection`/`FadeInImage`, `BackToTop`, `ScrollToContent`. Secciones enteras como `ShowsSections` o `MemberSection` se renderizan en el servidor y solo pasan datos a esas islas.

Una página que exporta `metadata` no puede ser Client Component (requisito de Next.js).

Lo que depende de la fecha (`src/lib/shows.ts`, que separa próximos y anteriores) importa `server-only`: si el navegador lo recalculara un día después del último build, el HTML y React no coincidirían al hidratar.

## Deploy

El sitio es **100% estático** (`output: "export"` en `next.config.ts`). Esto implica:

- No hay servidor que redimensione fotos: ver **Images**.
- **No existe ISR**: `export const revalidate` no hace nada en un export estático; no agregarlo.
- El deploy se hace a **Cloudflare Workers** (static assets, ver `wrangler.jsonc`) con `wrangler deploy`. Lo corre el CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) en cada push a `prod` y **todos los días a las 06:00 de Tucumán**, para que los shows pasen solos de próximos a anteriores.
- El CI corre lint, formato, tipos, build y tests en cada PR; el deploy publica el mismo `out/` que pasó los tests.
- Headers (cache y seguridad) en [public/\_headers](public/_headers). Para probarlos en local: `pnpm build && pnpm exec wrangler dev`.

## Images

- Todas las fotos van en `public/images/` (las de shows en `public/images/shows/<n>/1.webp…N.webp`) y se muestran con `next/image`.
- `pnpm images` ([scripts/generate-images.mts](scripts/generate-images.mts), con sharp) genera cada foto en los anchos de [src/lib/image-sizes.json](src/lib/image-sizes.json) dentro de `public/generated/` (no va a git). Corre solo antes de `pnpm dev` y `pnpm build`, y únicamente procesa las fotos que cambiaron.
- El loader de `next/image` ([src/lib/image-loader.ts](src/lib/image-loader.ts)) arma el `srcset` con esos archivos: pasá `sizes` a cada imagen que no ocupe el ancho de su `width`.
- Las miniaturas de los shows son el ancho de 120/240 de la misma foto: no hay que generar thumbs a mano.
- Retratos de integrantes: 1200×1800 de origen, declarados como 480×720 en `src/data/members.ts`, con `imagePosition` para el encuadre.
- **Portadas de Instagram**: cada publicación embebida necesita su captura en `public/images/instagram/<código>.webp`, que se genera con `pnpm instagram-poster <url>`. Sin portada, el embed se carga solo al entrar en pantalla.

## Fonts

Two Google fonts are loaded via `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx) and exposed as CSS variables: **Anton** (`--font-heading`, headings/wordmark) and **Space Grotesk** (`--font-body`, body copy, via `$font-family-base` in `bootstrap.scss`).

## Theming

- [src/app/bootstrap.scss](src/app/bootstrap.scss): tema de Bootstrap en Sass (`$brand` y las variables `-dark`) y qué partes se compilan. Solo se generan los grupos de clases utilitarias listados en `$utilities`: si usás una clase de Bootstrap (`mt-*`, `d-flex`…) que no aparece en el CSS final, agregá su grupo ahí.
- [src/app/globals.css](src/app/globals.css): tokens (`--ink-2`, `--surface-2`, `--hairline`; `--brand` sale del Sass), base, tipografía y las clases compartidas (`text-brand`, `glow-hover`, `brand-hr`, `section-divider`, `icon-link`, `outline-button`).
- Todo lo demás vive en el `.module.css` de cada componente (`styles.algo` en el TSX, `cx()` de [src/lib/cx.ts](src/lib/cx.ts) para combinar clases), incluida su parte de `prefers-reduced-motion`.
- Transparencias del color de marca con `color-mix(in srgb, var(--brand) 30%, transparent)`.
- Estilos inline solo para valores que salen de datos (encuadre de cada retrato, demora de cada letra).

## Propósito del sitio

Este sitio es una **herramienta de publicidad y captación de contrataciones**. El foco principal es que productores, bares, organizadores de eventos y público de otras provincias puedan:

- Ver quiénes somos (miembros)
- Ver shows pasados y próximos
- Contactarnos para contratarnos

Cada decisión de contenido y layout debe responder a: **¿esto ayuda a vender un show?**

## SEO y datos estructurados

- Metadatos de cada página con `pageMetadata()` ([src/lib/metadata.ts](src/lib/metadata.ts)): título, descripción, canonical, OpenGraph y Twitter juntos (si una página define `openGraph`, Next reemplaza el del layout entero). La home usa los del layout.
- `viewport` (`themeColor`) se exporta **por separado** como `export const viewport: Viewport` — **no** dentro de `metadata`; Next 16 lo exige así.
- Un solo `h1` por página: en la home es el nombre de la banda (wordmark); en las demás, el título de la página.
- JSON-LD (schema.org) se renderiza con el componente `JsonLd` (`<script type="application/ld+json">`):
  - `layout.tsx` inyecta un `MusicGroup` global.
  - `ShowsSections` inyecta un `MusicEvent` por cada próximo show (con su `date`).

## Content

This is a tribute-band site, not the real LINKIN PARK's — all editable content (band name/tagline, nav links, shows, member bios) lives in [src/data/](src/data/). When editing content:

- **Shows**: una sola lista `SHOWS` en `src/data/shows.ts`, con `date` en formato `AAAA-MM-DD`. No hay que separar próximos de anteriores ni ordenarlos: se calcula al generar el sitio. Fotos con `showPhotos(carpeta, cantidad)`; la publicación de Instagram en `postUrl` (con su portada, ver **Images**).
- `MemberSection` requires an `imageSrc` (member photo); there is no automatic placeholder-avatar fallback, so every member needs a real photo in `public/images/`.
- Keep the footer's tribute disclaimer (`LEGAL_DISCLAIMER` in `src/data/band.ts`) — this is a tribute act, not the official band, and the site shouldn't imply otherwise.

## Tests y formato

- `pnpm test` (Playwright) corre contra el sitio ya exportado: primero `pnpm build`. En la máquina usa el Chrome instalado; en el CI, el Chromium de Playwright.
  - [tests/data.spec.ts](tests/data.spec.ts): los datos de `src/data` (fechas, fotos que existan, links de Instagram) y la lógica de próximos/anteriores.
  - [tests/site.spec.ts](tests/site.spec.ts): recorrido del sitio en escritorio y celular (errores de consola, h1, canonical, 404, navegación, galería, Instagram, sin JS, gestos).
- `pnpm format` (Prettier, líneas de hasta 160). El pre-push corre lint, formato y tipos.
