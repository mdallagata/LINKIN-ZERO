# LINKIN ZERØ - Project Guide

> For colors and visual style, see [STYLEGUIDE.md](./STYLEGUIDE.md).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · react-bootstrap 2 + Bootstrap 5 (CSS only, no Bootstrap JS bundle). Package manager is **Yarn** — commit `yarn.lock`, never `package-lock.json`.

Node version is pinned in [.nvmrc](.nvmrc). Run `nvm use` before installing/running.

## Idioma

- **Código en inglés**: identificadores, variables, props, tipos y nombres de archivos — siempre en inglés.
- **Texto al usuario en español**: todo lo que renderiza la UI (labels, descripciones, `alt`, `aria-label`, metadatos, contenido de `src/data/`) — en español, con acentos y ñ correctos.
- Los comentarios son libres (inglés o español); lo visible al usuario no.

## TypeScript

Strict mode (`"strict": true`) está activo. Convención de tipado en todo el código:

- **Nada implícito**: parámetros de funciones, props de componentes, retornos y variables (incluidas `useState`/`useRef`/`Map`) llevan anotación explícita — incluso cuando TS los infiere.
- **Prohibido `any`**: si algo no tiene tipo, hay que definirlo (tipo local, `unknown` + narrowing, o tipo de `next`/`react`), no usar `any`.
- **Exports de datos tipados**: toda constante de `src/data/` declara su tipo (`export const X: Tipo[] = ...`), incluidos literales como `OG_IMAGE` en `band.ts`.
- **Tipos de eventos**: usar los de React (`MouseEvent`, `TouchEvent`, `WheelEvent`, `SyntheticEvent`), no los del DOM, para handlers de JSX.
- Los retornos de componentes se anotan `: ReactNode`; los handlers de eventos, `: void`.

## Server vs Client Components

`react-bootstrap` components (`Nav`, `Container`, `Row`, `Col`, etc.) use React context/hooks internally and are not RSC-aware, so any file that renders them needs `"use client"` at the top.

A page that exports `metadata` **cannot** be a Client Component (Next.js requirement). If a page needs both `metadata` and react-bootstrap layout, keep `metadata` in the page (Server Component) and push the react-bootstrap usage down into child components (e.g. `SiteHeader`, `SiteFooter`, `MemberSection`) that are themselves `"use client"`.

## Deploy

El sitio es **100% estático** (`output: "export"` en `next.config.ts`). Esto implica:

- `next/image` necesita `images: { unoptimized: true }` — no hay servidor de optimización.
- **No existe ISR**: `export const revalidate` no hace nada en un export estático; no agregarlo.
- El deploy se hace a **Cloudflare Pages** con `wrangler deploy` (script `deploy` en `package.json`).

## Images

- Photos go through `next/image` (`.webp`). Como el deploy es estático, `unoptimized: true` está activo — la optimización de tamaño corre en tiempo de build o se hace manualmente.
- All images live in `public/images/` (show photos under `public/images/shows/`).
- Member photos are 480×720 (1200×1800 source) with `objectPosition` tuning per member in `src/data/members.ts`.
- **Thumbnails**: cada foto de show tiene una versión `*-thumb.webp` chica (aprox. 120×90) en la misma carpeta, generada manualmente con `cwebp`. `ShowsSections` usa `thumbUrl()` para derivar el path (`photo.replace(/\.(\w+)$/, "-thumb.$1")`). Al agregar un show nuevo, hay que generar los thumbs antes de deployar.

## Fonts

Two Google fonts are loaded via `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx) and exposed as CSS variables: **Anton** (`--font-heading`, headings/wordmark) and **Space Grotesk** (`--font-body`, body copy). `globals.css` wires these into `--bs-body-font-family` and the heading rules — there is no monospace anymore.

## Theming

There's no Sass build step. The site's look (black background, cadetblue glow) is done by overriding Bootstrap 5.3's CSS variables (`--bs-body-bg`, `--bs-body-color`, `--bs-link-color`, etc.) plus custom design tokens (`--brand`, `--brand-rgb`, `--ink-2`, `--surface-2`, `--hairline`) and utility classes, all in [src/app/globals.css](src/app/globals.css). See STYLEGUIDE.md for the actual tokens.

## Propósito del sitio

Este sitio es una **herramienta de publicidad y captación de contrataciones**. El foco principal es que productores, bares, organizadores de eventos y público de otras provincias puedan:
- Ver quiénes somos (miembros)
- Ver shows pasados y próximos
- Contactarnos para contratarnos

Cada decisión de contenido y layout debe responder a: **¿esto ayuda a vender un show?**

## SEO y datos estructurados

- Metadatos OpenGraph y Twitter están en `layout.tsx` (global) y en cada página (título/descripción específicos).
- `viewport` (`themeColor`) se exporta **por separado** como `export const viewport: Viewport` — **no** dentro de `metadata`; Next 16 lo exige así.
- JSON-LD (schema.org) se renderiza con el componente `JsonLd` (`<script type="application/ld+json">`):
  - `layout.tsx` inyecta un `MusicGroup` global.
  - `ShowsSections` inyecta un `MusicEvent` por cada próximo show.
- `UpcomingShow` requiere `startDate: string` (ISO 8601, ej. `"2026-11-28"`) para el JSON-LD — el campo `date` es solo display.

## Content

This is a tribute-band site, not the real LINKIN PARK's — all editable content (band name/tagline, nav links, shows, member bios) lives in [src/data/](src/data/). When editing content:

- `MemberSection` requires an `imageSrc` (member photo); there is no automatic placeholder-avatar fallback, so every member needs a real photo in `public/images/`.
- Keep the footer's tribute disclaimer (`LEGAL_DISCLAIMER` in `src/data/band.ts`) — this is a tribute act, not the official band, and the site shouldn't imply otherwise.
