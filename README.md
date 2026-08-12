# Elevate Research

A premium, Apple-inspired website for Elevate Research, an independent
equity research platform. Built with Next.js 14 (App Router), TypeScript,
and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm start
```

## Pages

- `/` — Home (hero, featured research, latest research, categories, about
  teaser, newsletter)
- `/research` — Research archive with live search and category filtering
- `/research/[slug]` — Article page with sticky table of contents,
  disclaimer, and related research (7 sample articles included)
- `/about` — Story, method, team, and disclosures

## Design system

- **Type:** Fraunces (display/serif) + Inter (body) + IBM Plex Mono
  (data, captions, eyebrows) — loaded via `next/font/google`.
- **Color:** warm paper/ink in light mode, near-black "night" navy in dark
  mode, with the brand blue from the logo as the sole accent color plus a
  muted brass tone used sparingly for premium touches.
- **Signature motif:** "The Elevate Line" — a single rising hairline
  (`components/SignatureLine.tsx`) used in the hero, the featured-article
  cover panel, and the newsletter section.
- **Dark mode:** class-based (`darkMode: "class"` in Tailwind config), set
  by an inline blocking script in `app/layout.tsx` to avoid a flash of the
  wrong theme, and toggled by `components/ThemeToggle.tsx`. Defaults to the
  visitor's system preference on first visit.

## Branding assets

All generated from the supplied logo, and wired up via Next.js's
file-based metadata conventions (no manual `<link>` tags needed):

- `app/icon.png` — browser tab favicon
- `app/apple-icon.png` — iOS home-screen icon
- `app/favicon.ico` — legacy favicon fallback
- `app/opengraph-image.png` — social share preview image
- `public/logo.png` / `public/logo-dark.png` — light/dark wordmark,
  swapped automatically by `components/Logo.tsx`
- `public/logo-mark.png` — "ER" monogram only, for compact placements

## Content

All research content in `lib/data.ts` is original sample copy written for
this project — it is not real financial advice or real company research.

## Notes

- No authentication and no backend: the newsletter form and search are
  fully client-side for this build.
- This project was scaffolded by hand (config files, `package.json`,
  etc.) rather than via `create-next-app`, so run `npm install` before
  first use to fetch dependencies.
