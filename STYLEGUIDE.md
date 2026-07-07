# LINKIN ZERØ — Style Guide

**Platform:** Next.js 16 · React Bootstrap 5
**Last updated:** 2026-07-07

> For coding rules and architecture conventions, see [PROJECT_GUIDE.md](./PROJECT_GUIDE.md).

---

## 1. Brand

LINKIN ZERØ is a LINKIN PARK tribute band. The site keeps an early-2000s, slightly retro internet aesthetic as an homage: black background, glowing cadetblue accents, monospace type — but branded as its own act, not as LINKIN PARK's official site (see the footer disclaimer). Currently frontend-only.

---

## 2. Colors

Source of truth: [src/app/globals.css](src/app/globals.css)

| Token             | Value                | Usage                               |
| ----------------- | -------------------- | ------------------------------------ |
| Brand (cadetblue) | `#5f9ea0`             | Links, nav, headings glow, borders   |
| Background        | `#000000`             | Page background (`--bs-body-bg`)     |
| Text              | `#ffffff`             | Body text (`--bs-body-color`)        |
| Paragraph text    | `rgb(174, 214, 214)`  | Body copy inside articles            |

## 3. Typography

System monospace stack (`--bs-body-font-family` override), centered text throughout.

## 4. Effects

| Class                  | Effect                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `.glow-lg`             | Large text-shadow glow (headings)                                                                           |
| `.glow-sm`             | Smaller text-shadow glow (body text)                                                                        |
| `.glow-hover`          | White glow on hover (links/nav)                                                                             |
| `.glow-box`            | Box-shadow glow (social icons)                                                                              |
| `.brand-hr`            | Solid cadetblue `<hr>` (default Bootstrap hr is a faint inherited-color line, doesn't work for this theme) |
| `.brand-dotted-border` | Dotted cadetblue border                                                                                      |
| `.member-photo`        | Large border-radius on member portraits/gifs                                                                |
| `.site-wordmark`       | Fluid-sized text logo (`[ BAND NAME ]`) in the header                                                       |
| `.placeholder-avatar`  | Dashed-border circle with initials — fallback when a member has no photo yet                               |
| `.placeholder-box`     | Dashed-border box for "coming soon" content (e.g. the featured video slot)                                  |

## 5. Layout

Bootstrap's grid (`Container`/`Row`/`Col`) drives responsive layout — mobile stacks to a single centered column, `md`+ splits into the two-column alternating layout on the members page.
