# LINKIN ZERØ - Project Guide

> For colors and visual style, see [STYLEGUIDE.md](./STYLEGUIDE.md).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · react-bootstrap 5 + Bootstrap 5 (CSS only, no Bootstrap JS bundle). Package manager is **Yarn** — commit `yarn.lock`, never `package-lock.json`.

Node version is pinned in [.nvmrc](.nvmrc). Run `nvm use` before installing/running.

## Server vs Client Components

`react-bootstrap` components (`Nav`, `Container`, `Row`, `Col`, etc.) use React context/hooks internally and are not RSC-aware, so any file that renders them needs `"use client"` at the top.

A page that exports `metadata` **cannot** be a Client Component (Next.js requirement). If a page needs both `metadata` and react-bootstrap layout, keep `metadata` in the page (Server Component) and push the react-bootstrap usage down into child components (e.g. `SiteHeader`, `SiteFooter`, `MemberSection`) that are themselves `"use client"`.

## Images

- Photos are `.webp` and go through `next/image`, which optimizes them automatically.
- All images live in `public/images/` (show photos under `public/images/shows/`).

## Fonts

Two Google fonts are loaded via `next/font/google` in [src/app/layout.tsx](src/app/layout.tsx) and exposed as CSS variables: **Anton** (`--font-heading`, headings/wordmark) and **Space Grotesk** (`--font-body`, body copy). `globals.css` wires these into `--bs-body-font-family` and the heading rules — there is no monospace anymore.

## Theming

There's no Sass build step. The site's look (black background, cadetblue glow) is done by overriding Bootstrap 5.3's CSS variables (`--bs-body-bg`, `--bs-body-color`, `--bs-link-color`, etc.) plus custom design tokens (`--brand`, `--ink-2`, `--surface-2`, `--hairline`) and utility classes, all in [src/app/globals.css](src/app/globals.css). See STYLEGUIDE.md for the actual tokens.

## Propósito del sitio

Este sitio es una **herramienta de publicidad y captación de contrataciones**. El foco principal es que productores, bares, organizadores de eventos y público de otras provincias puedan:
- Ver quiénes somos (miembros)
- Ver shows pasados y próximos
- Contactarnos para contratarnos

Cada decisión de contenido y layout debe responder a: **¿esto ayuda a vender un show?**

## Content

This is a tribute-band site, not the real LINKIN PARK's — all editable content (band name/tagline, nav links, shows, member bios) lives in [src/data/](src/data/). When editing content:

- `MemberSection` requires an `imageSrc` (member photo); there is no automatic placeholder-avatar fallback, so every member needs a real photo in `public/images/`.
- Keep the footer's tribute disclaimer (`LEGAL_DISCLAIMER` in `src/data/band.ts`) — this is a tribute act, not the official band, and the site shouldn't imply otherwise.
