# LINKIN ZERØ

Sitio web promocional de **LINKIN ZERØ**, una banda tributo a LINKIN PARK de San Miguel de Tucumán, Argentina, disponible para contrataciones en todo el país. El objetivo es que productores, bares, eventos y particulares de otras provincias nos conozcan y nos contraten.

Empezó en 2021 como una página de fan sobre la banda real, mi primera página en HTML y CSS puro. En 2026 la revivimos migrándola a **Next.js 16** (App Router) + **React 19** + **TypeScript** + **react-bootstrap 5**, manteniendo la estética original (fondo negro, acentos cadetblue, tipografía monospace) y remodelando el contenido para una banda tributo real (ver rama `legacy` para la versión original sobre LINKIN PARK).

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
- [react-bootstrap](https://react-bootstrap.github.io) + [Bootstrap](https://getbootstrap.com) 5
- TypeScript + ESLint
- Fuente: [Anton](https://fonts.google.com/specimen/Anton) (Google Fonts)

## Estructura

- `src/app/page.tsx` — home (sobre la banda, shows, embed de Instagram, contacto)
- `src/app/members/page.tsx` — integrantes de la banda
- `src/app/shows/page.tsx` — historial de shows
- `src/app/icon.png` — favicon de la banda
- `src/components/` — SiteHeader, SiteFooter, MemberSection, ShowsSections
- `src/data/` — contenido editable: nombre/descripción, shows, integrantes, redes

## Contacto

- **Email:** linkin.zero.tuc@gmail.com
- **Instagram:** [@linkin.zero](https://www.instagram.com/linkin.zero/)
