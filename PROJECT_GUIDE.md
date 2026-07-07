# LINKIN ZERØ - Project Guide

> For colors and visual style, see [STYLEGUIDE.md](./STYLEGUIDE.md).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · react-bootstrap 5 + Bootstrap 5 (CSS only, no Bootstrap JS bundle). Package manager is **Yarn** — commit `yarn.lock`, never `package-lock.json`.

Node version is pinned in [.nvmrc](.nvmrc). Run `nvm use` before installing/running.

## Server vs Client Components

`react-bootstrap` components (`Nav`, `Container`, `Row`, `Col`, etc.) use React context/hooks internally and are not RSC-aware, so any file that renders them needs `"use client"` at the top.

A page that exports `metadata` **cannot** be a Client Component (Next.js requirement). If a page needs both `metadata` and react-bootstrap layout, keep `metadata` in the page (Server Component) and push the react-bootstrap usage down into child components (e.g. `SiteHeader`, `SiteFooter`, `MemberSection`) that are themselves `"use client"`.

## Images

- Static photos (`.jpg`/`.png`) go through `next/image` normally — it optimizes them automatically.
- Animated `.gif`s must have `unoptimized` set on `next/image`, otherwise Next's image optimizer can break the animation.
- All images live in `public/images/`.

## Theming

There's no Sass build step. The site's look (black background, cadetblue glow, monospace) is done by overriding Bootstrap 5.3's CSS variables (`--bs-body-bg`, `--bs-body-color`, `--bs-link-color`, etc.) plus a handful of custom utility classes, all in [src/app/globals.css](src/app/globals.css). See STYLEGUIDE.md for the actual tokens.

## Content

This is a tribute-band site, not the real LINKIN PARK's — all editable content (band name/tagline, nav links, shows, member bios) lives in [src/data/](src/data/), currently filled with placeholders. When replacing placeholders with real content:

- **Don't reuse real LINKIN PARK photos/logo assets** (`public/images/lpgif.gif`, `cbpic.jpg`, `mspic.jpg`, etc. — leftover from the original 2021 fan-page rewrite) as if they depicted this band's own members or branding. `MemberSection` falls back to a placeholder initials avatar when `imageSrc` is omitted; use that until real member photos exist.
- Keep the footer's tribute disclaimer (`LEGAL_DISCLAIMER` in `src/data/band.ts`) — this is a tribute act, not the official band, and the site shouldn't imply otherwise.
