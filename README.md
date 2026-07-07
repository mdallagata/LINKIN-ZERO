# Página de Linkin Park

La idea de esta página fue recrear una página de la banda Linkin Park con un estilo de principios de los 00's.

Empezó en 2021 como mi primera página en HTML y CSS puro. En 2026 la revivimos migrándola a **Next.js 16** (App Router) + **React 19** + **TypeScript** + **react-bootstrap 5**, manteniendo la estética original (fondo negro, acentos cadetblue con glow, tipografía monospace) pero con un layout responsive real.

## Requisitos

- Node.js 24.18.0 (LTS) — fijado en [.nvmrc](.nvmrc). Si usás [nvm](https://github.com/nvm-sh/nvm), corré `nvm use`.

## Desarrollo

```bash
yarn install
yarn dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [React](https://react.dev) 19
- [react-bootstrap](https://react-bootstrap.github.io) + [Bootstrap](https://getbootstrap.com) 5
- TypeScript + ESLint

## Estructura

- `src/app/page.tsx` — home
- `src/app/members/page.tsx` — perfiles de la banda
- `src/components/` — Header, Footer y la sección reutilizable de cada miembro
- `public/images/` — fotos y gifs originales del proyecto
