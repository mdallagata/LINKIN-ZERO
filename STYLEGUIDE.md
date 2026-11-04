# LINKIN ZERØ — Style Guide

**Platform:** Next.js 16 · Bootstrap 5 (Sass) · CSS Modules
**Last updated:** 2026-11-03

> For coding rules and architecture conventions, see [PROJECT_GUIDE.md](./PROJECT_GUIDE.md).

---

## 1. Brand

LINKIN ZERØ is a LINKIN PARK tribute band. The site looks like a tour poster: near-black background, big condensed type, black-and-white live photos and a single cadetblue accent. It's branded as its own act, not as LINKIN PARK's official site (see the footer disclaimer). Currently frontend-only.

Principles:

- **Nothing glows.** No text-shadow/box-shadow glows, no breathing or letter-by-letter animations, no hover scaling. Cadetblue is reserved for a few things: the Ø of the wordmark, the next show's date, eyebrows, the "Contratar" button and the booking block.
- **Left-aligned, on one grid.** Every section uses `.page-container` (max 1440px, `--gutter` side margins). No centered stacks with a divider under each title.
- **Content-specific shapes**, not one generic card: shows as a tour-dates list, members as portraits, booking as a solid brand-colored block.
- **One photo treatment.** Photos on the page are black and white (`.photo-bw`); galleries, modals and the show thumbnails (the home's date list and /shows) show the original color. Portraits and the home's group photo get their color back on hover (`.photo-reveal`): a quick tint in the brand color that settles into the real colors.
- **Booking always at hand**: "Contratar" in the nav (desktop) and a fixed bottom bar with WhatsApp (phone).

---

## 2. Colors

Source of truth: `$brand` and the `-dark` variables in [src/app/bootstrap.scss](src/app/bootstrap.scss) (same values in [src/lib/theme.ts](src/lib/theme.ts) for the manifest and `theme-color`); the rest of the tokens in [src/app/globals.css](src/app/globals.css).

| Token         | Value                    | Usage                                                                      |
| ------------- | ------------------------ | -------------------------------------------------------------------------- |
| `--brand`     | `#5f9ea0` (cadetblue)    | The only accent (see Principles). Black text on it passes contrast (6.9:1) |
| `--bg`        | `#0b0b0b`                | Page background (also `--bs-body-bg`)                                      |
| `--ink`       | `#ecebe6`                | Main text, instead of pure white (also `--bs-body-color`)                  |
| `--ink-2`     | `#a3a29d`                | Secondary text: places, roles, metadata (`.text-muted`)                    |
| `--ink-soft`  | `rgba(236,235,230,0.78)` | Long paragraphs                                                            |
| `--surface-2` | `#151515`                | Behind photos while they load                                              |
| `--hairline`  | `rgba(236,235,230,0.14)` | 1px rules between rows and sections                                        |

## 3. Typography

Display type via `next/font/google` (see [src/app/layout.tsx](src/app/layout.tsx)): **Anton** for the wordmark, headings and show dates (`--font-heading`), **Archivo** for body copy and UI (`--font-body`, variable, wired into `--bs-body-font-family`).

- `h1`/`h2`: Anton, uppercase. `h2` is the big section title (up to 104px).
- `h3`/`h4`: Archivo 600, sentence case (rows, cards).
- Eyebrows and labels: Archivo 700, 13px, uppercase, letter-spacing 0.16em.

## 4. Shared classes

In [src/app/globals.css](src/app/globals.css):

| Class                               | Effect                                                                                       |
| ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `.page-container`                   | Max 1440px, `--gutter` side padding: every section                                           |
| `.section`                          | Vertical section spacing (`--section-space`)                                                 |
| `.section-header`                   | Section title on the left, a link ("Historial completo →") on the right                      |
| `.eyebrow`                          | Small cadetblue label above a title                                                          |
| `.text-link`                        | Underlined text link/button, 44px tall                                                       |
| `.button` + `--solid` / `--outline` | Square uppercase buttons (brand fill / light outline)                                        |
| `--dark` / `--dark-outline`         | Buttons on the brand-colored booking block                                                   |
| `--large` / `--icon`                | Taller button / square icon-only button                                                      |
| `.photo-bw` / `.photo-reveal`       | Black-and-white photo / its container gives the color back on hover (brand-color tint first) |
| `.text-muted`                       | Secondary text                                                                               |

Component-specific styles live in each component's `.module.css`:

| Component (module)                   | What it draws                                                                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| `SiteHeader`                         | Fixed nav: transparent over the hero, solid once scrolled; Ø logo, links, "Contratar"     |
| `HomeHero` / `PageHero`              | Full-screen hero with the wordmark and next-show strip / shorter hero with the page title |
| `ShowsSections`                      | Tour-dates rows (home), next show in detail and past shows by year (/shows)               |
| `MemberGrid` / `MemberSection`       | Portrait grid (home) / one row per member (/members)                                      |
| `BookingSection`, `MobileBookingBar` | Brand-colored booking block (home) / fixed WhatsApp bar on phones                         |
| `LogoMark`                           | The brush Ø as a CSS mask (`public/icons/logo-mark.webp`), colored with `currentColor`    |
| `ShowPhotos` / `ShowPhotoGallery`    | Thumbnails and the gallery frame (16/9, 4/5 on mobile)                                    |
| `PhotoDialog` / `PhotoModalTrigger`  | Photo modal (native `<dialog>`) and the photo buttons that open it                        |
| `InstagramEmbed`                     | Embed frame, poster with "Tocá para cargar", skeleton and fallback link                   |
| `BackToTop`, `ContactButtons`        | Floating back-to-top button; booking buttons                                              |

## 5. Layout

Sections are full-width `.page-container`s; inside, CSS grid/flex in each module (Bootstrap's grid classes are no longer used in components). Rows collapse to a date column plus a stacked column on phones; the shows list goes to columns from 992px. Animations respect `prefers-reduced-motion` (including smooth scrolling).
