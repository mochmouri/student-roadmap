# 2026-05-28 — Initial scaffold

## What was done
Full project scaffolded from scratch: Next.js 14 App Router, Sanity CMS, next-intl (EN/AR with RTL), next-themes (dark/light, system default).

## Structure decisions

- `/app/[locale]/` routing: all public pages live under a locale prefix (`/en/`, `/ar/`). Middleware redirects the root URL to the default locale.
- Sanity Studio embedded at `/studio` (excluded from i18n middleware). Uses `next-sanity/studio`.
- Bilingual CMS fields: simple `titleEn`/`titleAr` pairs rather than Sanity's i18n plugin — simpler for a solo-managed site.
- Placeholder data in `lib/placeholder-data.ts`: shown when Sanity isn't connected. Pages always try Sanity first, fall back to placeholder.
- No UI component library — all custom Tailwind components.
- CSS variables for all colours/spacing, used throughout (not just Tailwind classes) so dark mode transitions work cleanly.

## Rejected alternatives

- Sanity's i18n plugin: adds complexity (locale document variants) without benefit for a site where one person manages all content.
- Algolia for search: GROQ full-text search is sufficient for this volume of content; Algolia-ready structure is in place if needed later.
- Separate Sanity Studio project: embedding in Next.js keeps deployment simple.

## What needs doing before launch

1. Create a Sanity project at sanity.io, add credentials to `.env.local`
2. Add real content through the Studio
3. Configure a custom domain and deploy (Vercel recommended)
4. Add a Google Analytics or Plausible script if wanted
