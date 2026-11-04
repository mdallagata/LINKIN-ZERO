# LINKIN ZERØ

Sitio web promocional de **LINKIN ZERØ**, una banda tributo a LINKIN PARK de Tucumán, Argentina, disponible para contrataciones en todo el país. El objetivo es que productores, eventos y particulares de otras provincias nos conozcan y nos contraten.

Empezó en 2021 como una página de fan sobre la banda real, mi primera página en HTML y CSS puro. En 2026 la revivimos migrándola a **Next.js 16** (App Router) + **React 19** + **TypeScript** (con Bootstrap 5 para la base y la grilla), manteniendo la estética original (fondo negro, acento cadetblue) con un diseño tipo afiche de gira: tipografía display (Anton + Archivo), fotos en blanco y negro y el contenido de una banda tributo real (ver rama `legacy` para la versión original sobre LINKIN PARK).

## Requisitos

- Node.js 24.22.1 (LTS) — fijado en [.nvmrc](.nvmrc). Si usás [nvm](https://github.com/nvm-sh/nvm), corré `nvm use`.

## Desarrollo

```bash
pnpm install
pnpm dev          # genera las fotos redimensionadas y levanta http://localhost:3010
```

Otros comandos:

```bash
pnpm build        # sitio estático en out/
pnpm test         # tests de Playwright contra out/ (correr pnpm build antes)
pnpm format       # Prettier
pnpm lint
pnpm instagram-poster <url>   # portada para una publicación de Instagram nueva
```

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [React](https://react.dev) 19
- [Bootstrap](https://getbootstrap.com) 5 desde Sass (base, grilla y utilidades) + CSS Modules
- TypeScript + ESLint + Prettier
- Tests: [Playwright](https://playwright.dev)
- Fotos en varios anchos generadas con [sharp](https://sharp.pixelplumbing.com) al hacer build
- Deploy: [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) (static assets) — sitio 100% estático (`output: "export"` + `wrangler deploy`)
- Fuentes: [Anton](https://fonts.google.com/specimen/Anton) (títulos) + [Archivo](https://fonts.google.com/specimen/Archivo) (cuerpo), vía `next/font/google`

## Estructura

- `src/app/page.tsx` — home (hero con la próxima fecha, quiénes somos, fechas, en vivo, integrantes, contrataciones)
- `src/app/members/page.tsx` — integrantes de la banda (`/members`)
- `src/app/shows/page.tsx` — historial de shows
- `src/app/{loading,error,global-error,not-found}.tsx` — estados de carga/error/404
- `src/app/{robots,sitemap,manifest}.ts` — SEO y PWA
- `src/app/icon.png` — favicon de la banda
- `src/components/` — SiteHeader, SiteFooter, MobileBookingBar, HomeHero, PageHero, HeroImage, ShowsSections, MemberGrid, MemberSection, BookingSection, LogoMark, JsonLd, y utilidades de UI (BackToTop, ContactButtons, FadeInImage, InstagramEmbed, LoadingSpinner, y las fotos: PhotoShowcase, ShowPhotos, ShowGalleryButton, ShowPhotoGallery, PhotoModalTrigger, PhotoDialog, ZoomableImage), cada uno con su `.module.css`
- `src/data/` — contenido editable: nombre, descripción, datos rápidos y contacto (`band.ts`), navegación y botón Contratar (`nav.ts`), shows (`shows.ts`, una sola lista con fechas `AAAA-MM-DD`), integrantes (`members.ts`), reel de Instagram de la home (`instagram.ts`)
- `src/lib/` — lógica compartida: metadatos, próximos/anteriores, loader de imágenes, Instagram, tema
- `scripts/` — generación de fotos redimensionadas y portadas de Instagram
- `tests/` — tests de Playwright

## Contacto

- **Email:** linkin.zero.tuc@gmail.com
- **Instagram:** [@linkin.zero](https://www.instagram.com/linkin.zero/)
