# LINKIN ZERØ — Style Guide

**Platform:** Next.js 16 · Bootstrap 5 (Sass) · CSS Modules
**Last updated:** 2026-10-27

> For coding rules and architecture conventions, see [PROJECT_GUIDE.md](./PROJECT_GUIDE.md).

---

## 1. Brand

LINKIN ZERØ is a LINKIN PARK tribute band. The site keeps an early-2000s, slightly retro internet aesthetic as an homage: black background, glowing cadetblue accents, condensed display type — but branded as its own act, not as LINKIN PARK's official site (see the footer disclaimer). Currently frontend-only.

---

## 2. Colors

Source of truth: `$brand` and the `-dark` variables in [src/app/bootstrap.scss](src/app/bootstrap.scss) (same value in [src/lib/theme.ts](src/lib/theme.ts) for the manifest and `theme-color`); the rest of the tokens in [src/app/globals.css](src/app/globals.css).

| Token                | Value                                 | Usage                                                                                                   |
| -------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Brand (cadetblue)    | `--brand` `#5f9ea0`                   | Links, nav, headings glow, borders. Transparencias: `color-mix(in srgb, var(--brand) 30%, transparent)` |
| Background           | `--bs-body-bg` `#000000`              | Page background                                                                                         |
| Text                 | `--bs-body-color` `#ffffff`           | Body text                                                                                               |
| Secondary/muted text | `--ink-2` `rgba(255,255,255,0.7)`     | Roles, descriptions, muted copy (`.text-muted`)                                                         |
| Surface (elevated)   | `--surface-2` `#121212`               | Card backgrounds for finished content                                                                   |
| Hairline             | `--hairline` `rgba(255,255,255,0.12)` | Subtle borders around cards/photos                                                                      |

## 3. Typography

Display type via `next/font/google` (see [src/app/layout.tsx](src/app/layout.tsx)): **Anton** for headings and the wordmark (`--font-heading`), **Space Grotesk** for body copy (`--font-body`, wired into `--bs-body-font-family`). Text is centered throughout.

## 4. Effects

Clases compartidas, en [src/app/globals.css](src/app/globals.css):

| Class              | Effect                                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `.text-brand`      | Brand-colored (cadetblue) text                                                                              |
| `.text-muted`      | Secondary/muted text (`--ink-2`)                                                                            |
| `.glow-hover`      | White text + brand glow on hover (links/nav)                                                                |
| `.brand-hr`        | Glowing cadetblue gradient `<hr>` (default Bootstrap hr is a faint inherited-color line, doesn't work here) |
| `.section-divider` | Short centered cadetblue rule under section headings                                                        |
| `.icon-link`       | Brand-colored icon links (`--text` with label, `--member` on member roles)                                  |
| `.outline-button`  | Light outlined button (`--round` for the gallery arrows)                                                    |

El resto de los efectos vive en el `.module.css` de cada componente:

| Component (module)                  | Effect                                                                                             |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| `SiteHeader`                        | Hero with photo, wordmark `[ BAND NAME ]` with breathing glow, letter-by-letter tagline, fixed nav |
| `ShowsSections`                     | Show cards (`showCardFeatured` for the latest), year timeline, entry badge, "no dates" box         |
| `ShowPhotos` / `ShowPhotoGallery`   | Thumbnails and the gallery frame (16/9, 4/5 on mobile)                                             |
| `PhotoDialog` / `PhotoModalTrigger` | Photo modal (native `<dialog>`) and the framed photo buttons that open it                          |
| `FadeInSection` / `FadeInImage`     | Scroll reveal and fade on image load (only with JS, off with reduced motion)                       |
| `InstagramEmbed`                    | Embed frame, poster with "Tocá para cargar", skeleton and fallback link                            |
| `BackToTop`, `ContactButtons`       | Floating back-to-top button; contact buttons                                                       |

## 5. Layout

Bootstrap's grid classes (`container`, `row`, `col-md-*`) drive responsive layout — mobile stacks to a single centered column, `md`+ splits into the two-column alternating layout on the members page. Animations respect `prefers-reduced-motion` (including smooth scrolling).
