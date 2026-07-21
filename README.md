# LINKIN ZERØ

Sitio web promocional de **LINKIN ZERØ**, una banda tributo a LINKIN PARK de Tucumán, Argentina, disponible para contrataciones en todo el país. El objetivo es que productores, eventos y particulares de otras provincias nos conozcan y nos contraten.

Empezó en 2021 como una página de fan sobre la banda real, mi primera página en HTML y CSS puro. En 2026 la revivimos migrándola a **Next.js 16** (App Router) + **React 19** + **TypeScript** + **react-bootstrap** (sobre Bootstrap 5), manteniendo la estética original (fondo negro, acentos cadetblue) pero con tipografía display (Anton + Space Grotesk) y remodelando el contenido para una banda tributo real (ver rama `legacy` para la versión original sobre LINKIN PARK).

## Requisitos

- Node.js 24.18.0 (LTS) — fijado en [.nvmrc](.nvmrc). Si usás [nvm](https://github.com/nvm-sh/nvm), corré `nvm use`.

## Desarrollo

```bash
yarn install
yarn dev
```

Abrí [http://localhost:3001](http://localhost:3001).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [React](https://react.dev) 19
- [react-bootstrap](https://react-bootstrap.github.io) 2 + [Bootstrap](https://getbootstrap.com) 5 (solo CSS)
- TypeScript + ESLint
- Deploy: [Cloudflare Workers](https://developers.cloudflare.com/workers/) (`wrangler`)
- Fuentes: [Anton](https://fonts.google.com/specimen/Anton) (títulos) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (cuerpo), vía `next/font/google`

## Estructura

- `src/app/page.tsx` — home (sobre la banda, shows, fotos, contacto)
- `src/app/members/page.tsx` — integrantes de la banda
- `src/app/shows/page.tsx` — historial de shows
- `src/app/{loading,error,not-found}.tsx` — estados de carga/error/404
- `src/app/{robots,sitemap}.ts` — SEO
- `src/app/icon.png` — favicon de la banda
- `src/components/` — SiteHeader, SiteFooter, MemberSection, ShowsSections, y utilidades de UI (BackToTop, ContactButtons, FadeInImage/Section, LoadingSpinner, ScrollToContent, y los visores de fotos PhotoShowcase / ShowPhotoGallery / PhotoModalTrigger / ZoomableImage)
- `src/data/` — contenido editable: nombre/descripción (`band.ts`), navegación (`nav.ts`), shows (`shows.ts`), integrantes (`members.ts`)

## Contacto

- **Email:** linkin.zero.tuc@gmail.com
- **Instagram:** [@linkin.zero](https://www.instagram.com/linkin.zero/)
