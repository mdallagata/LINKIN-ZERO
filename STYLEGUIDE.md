# LINKIN ZERØ — Style Guide

**Platform:** Next.js 16 · React Bootstrap 2 (Bootstrap 5)
**Last updated:** 2026-08-18

> For coding rules and architecture conventions, see [PROJECT_GUIDE.md](./PROJECT_GUIDE.md).

---

## 1. Brand

LINKIN ZERØ is a LINKIN PARK tribute band. The site keeps an early-2000s, slightly retro internet aesthetic as an homage: black background, glowing cadetblue accents, monospace type — but branded as its own act, not as LINKIN PARK's official site (see the footer disclaimer). Currently frontend-only.

---

## 2. Colors

Source of truth: [src/app/globals.css](src/app/globals.css)

| Token                 | Value                      | Usage                                       |
| --------------------- | -------------------------- | ------------------------------------------- |
| Brand (cadetblue)     | `--brand` `#5f9ea0`         | Links, nav, headings glow, borders          |
| Brand (RGB)           | `--brand-rgb` `95, 158, 160` | Canales RGB del brand para `rgba(var(--brand-rgb), <alpha>)` |
| Background            | `--bs-body-bg` `#000000`    | Page background                             |
| Text                  | `--bs-body-color` `#ffffff` | Body text                                   |
| Secondary/muted text  | `--ink-2` `rgba(255,255,255,0.7)` | Roles, descriptions, muted copy (`.text-muted`) |
| Surface (elevated)    | `--surface-2` `#121212`     | Card backgrounds for finished content       |
| Hairline              | `--hairline` `rgba(255,255,255,0.12)` | Subtle borders around cards/photos    |

## 3. Typography

Display type via `next/font/google` (see [src/app/layout.tsx](src/app/layout.tsx)): **Anton** for headings and the wordmark (`--font-heading`), **Space Grotesk** for body copy (`--font-body`, wired into `--bs-body-font-family`). Text is centered throughout.

## 4. Effects

| Class                   | Effect                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| `.text-brand`           | Brand-colored (cadetblue) text                                                                              |
| `.text-muted`           | Secondary/muted text (`--ink-2`)                                                                            |
| `.glow-hover`           | White text + brand glow on hover (links/nav)                                                               |
| `.brand-hr`             | Glowing cadetblue gradient `<hr>` (default Bootstrap hr is a faint inherited-color line, doesn't work here) |
| `.section-divider`      | Short centered cadetblue rule under section headings                                                        |
| `.member-photo`         | Large border-radius on member portraits                                                                     |
| `.site-wordmark`        | Fluid-sized text logo (`[ BAND NAME ]`) in the header; `.site-wordmark--glow` adds the glow variant         |
| `.placeholder-box`      | Brand-glow box for "no hay fechas" placeholder (solid border, not dashed)                                   |
| `.entry-badge`          | Pill badge for show access info (ej. "Entrada: alimento no perecedero")                                     |
| `.contact-section`      | Bordered brand panel around the contact block (home)                                                        |
| `.show-card`            | Surface card for shows (past & upcoming); `.show-card--featured` resalta el último show                     |
| `.show-photo-full`      | Fixed-ratio photo frame (16/9, 4/5 on mobile) inside the gallery modal                                      |
| `.fade-in-section`      | Scroll-reveal (fade + translate) via IntersectionObserver                                                    |
| `.back-to-top`          | Floating button that appears after scrolling 300px                                                          |
| `.timeline`             | Vertical timeline for past shows grouped by year (shows page)                                               |

## 5. Layout

Bootstrap's grid (`Container`/`Row`/`Col`) drives responsive layout — mobile stacks to a single centered column, `md`+ splits into the two-column alternating layout on the members page.
