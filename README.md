# LINKIN ZERØ

Sitio web de **LINKIN ZERØ**, una banda tributo a LINKIN PARK. El contenido de la banda (integrantes, shows, redes) es placeholder por ahora — ver [src/data/](src/data/) para reemplazarlo por el real.

Empezó en 2021 como una página de fan sobre la banda real, mi primera página en HTML y CSS puro. En 2026 la revivimos migrándola a **Next.js 16** (App Router) + **React 19** + **TypeScript** + **react-bootstrap 5**, manteniendo la estética original (fondo negro, acentos cadetblue con glow, tipografía monospace) y remodelando el contenido para una banda tributo real (ver rama `legacy` para la versión original sobre LINKIN PARK).

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

## Estructura

- `src/app/page.tsx` — home (shows, video, booking)
- `src/app/members/page.tsx` — miembros
- `src/components/` — Header, Footer y la sección reutilizable de cada integrante
- `src/data/` — contenido editable: nombre/tagline de la banda, nav, shows, integrantes (todo placeholder hoy)
- `public/images/` — assets heredados del sitio original (algunos ya no se usan, ver [PROJECT_GUIDE.md](PROJECT_GUIDE.md))
