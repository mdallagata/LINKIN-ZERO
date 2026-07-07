# Linkin Park WebPage — Style Guide

**Platform:** Next.js 16 · React Bootstrap 5
**Last updated:** 2026-07-07

> For coding rules and architecture conventions, see [PROJECT_GUIDE.md](./PROJECT_GUIDE.md).

---

## 1. Brand

A fan tribute to Linkin Park with an early-2000s, slightly retro internet aesthetic: black background, glowing cadetblue accents, monospace type. Currently frontend-only.

---

## 2. Colors

Source of truth: [src/app/globals.css](src/app/globals.css)

| Token               | Value                 | Usage                                     |
| ------------------- | --------------------- | ------------------------------------------ |
| Brand (cadetblue)   | `#5f9ea0`              | Links, nav, headings glow, borders         |
| Background          | `#000000`              | Page background (`--bs-body-bg`)           |
| Text                | `#ffffff`              | Body text (`--bs-body-color`)              |
| Paragraph text      | `rgb(174, 214, 214)`   | Body copy inside articles                  |
| Highlight (Chester) | `rgb(255, 255, 83)`    | `.glow-yellow`, used once as a tribute accent |

## 3. Typography

System monospace stack (`--bs-body-font-family` override), centered text throughout.

## 4. Effects

| Class                | Effect                                              |
| --------------------- | ---------------------------------------------------- |
| `.glow-lg`             | Large text-shadow glow (headings)                    |
| `.glow-sm`             | Smaller text-shadow glow (body text)                 |
| `.glow-yellow`         | Yellow glow variant                                  |
| `.glow-hover`          | White glow on hover (links/nav)                      |
| `.glow-box`            | Box-shadow glow (social icons)                       |
| `.brand-hr`            | Solid cadetblue `<hr>` (default Bootstrap hr is a faint inherited-color line, doesn't work for this theme) |
| `.brand-dotted-border` | Dotted cadetblue border                              |
| `.animate-fade-pulse`  | Looping opacity pulse (used on Chester Bennington's name) |
| `.member-photo`        | Large border-radius on member portraits/gifs         |

## 5. Layout

Bootstrap's grid (`Container`/`Row`/`Col`) drives responsive layout — mobile stacks to a single centered column, `md`+ splits into the two-column alternating layout on the members page.
