# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:4321
npm run build     # astro check (type-check) + astro build → dist/
npm run preview   # Preview the production build
npm run astro     # Run arbitrary Astro CLI commands (e.g. npm run astro -- add react)
```

There is no test suite and no lint script. `npm run build` runs `astro check`, which is the
only automated correctness gate — always run it before considering a change done. Prettier is
configured (`.prettierrc`, with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`) but
there is no `format` script wired up in `package.json`; invoke `npx prettier --write <files>` directly.

CI (`.github/workflows/test-deploy.yml`) runs `npm run build` on PRs into `main`.
`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on push to `main` or
`astro-main`.

## History note: the site was rebuilt after the Docusaurus→Astro migration

Dark mode and the old i18n routing were removed in commit `2052b40` ("remove legacy i18n
routing, dark mode, and set up Modernist design tokens"), replacing an earlier emerald-green,
glass-morphism, dark-mode design (with components like `ThemeToggle.astro`, `LanguageBadge.astro`)
with the current brutalist "Modernist" design. The migration-era docs that described the old
design (`PROJECT_SUMMARY.md`, `CURRENT_STATUS.md`, `BLOG_MIGRATION_STATUS.md`,
`MIGRATION_GUIDE.md`) have been removed — `README.md` now reflects the current design. If similar
stray status/summary docs reappear, treat them with suspicion and verify against the actual
source under `src/` (see "Current design system" below) rather than trusting them.

## Architecture

**Stack**: Astro 7 (static output, no SSR adapter), TailwindCSS 4 (via the `@tailwindcss/vite`
plugin, not an Astro integration), TypeScript (strict, via `astro/tsconfigs/strict`), MDX for blog
content. Astro 7 defaults to a new Rust-based Markdown processor ("Sätteri"); this project opts
back into the classic `unified()`/remark pipeline by installing `@astrojs/markdown-remark`
explicitly, since `astro.config.mjs`'s `markdown.remarkPlugins`/`shikiConfig` keys depend on it.
Content is entirely in Vietnamese (`<html lang="vi">` in `BaseLayout.astro`); English pages exist
under a manually-duplicated `/en/` page tree (not Astro's i18n-routing-generated pages) — the
navbar's EN/VI control routes between the two trees directly.

**Import aliases** (`tsconfig.json`): `@/*` → `src/*`, `@components/*`, `@layouts/*`,
`@utils/*`, `@styles/*`.

### Content collections (`src/content.config.ts`)

Two collections defined with the Content Layer API (`loader: glob({...})`), both consumed via
`getCollection()`:
- `blog` — MDX files in `src/content/blog/`. Frontmatter: `title`, `description`, `date`,
  `updated?`, `author` (defaults to "Hieu Nguyen"), `language` (`en`|`vi`, default `en`),
  `category`, `tags[]`, `image?`, `draft`. The entry's `id` (filename-derived) is used as the
  slug — not `.slug`, which no longer exists on Content Layer entries.
- `projects` — JSON files in `src/content/projects/`. Schema includes `category`
  (`Product`|`Research`|`Tutorial`|`Tool`|`Fun`), `tech[]`, `image?`/`images[]`, `links`
  (`website`/`github`/`blog`), `featured`, `order`, `status` (`open-source`|`private`),
  `flagship`, `placeholderIcon?`. Exactly one project should have `flagship: true` — the homepage
  (`src/pages/index.astro`) looks it up via `allProjects.find(p => p.data.flagship)` and renders it
  as the `CaseStudySpotlight`.

Rendering a blog post uses the Content Layer's `render(entry)` function imported from
`astro:content` (not an `entry.render()` method) — see `src/pages/blog/[...slug].astro`.

### Page/layout structure

- `BaseLayout.astro` — the shared HTML shell: `<SEO>` head tags, Google Fonts (Archivo), GTM
  snippet, `Navbar` + `Footer`. Every page wraps its content in this.
- `BlogPostLayout.astro` — wraps `BaseLayout` for individual posts; handles TOC
  (`TableOfContents.astro`, built from MDX `headings`), reading-progress bar, and Giscus comments.
- Routes under `src/pages/`: `index.astro` (home), `about.astro`, `projects.astro`,
  `blog/index.astro` (listing) + `blog/[...slug].astro` (post, statically generated from the
  `blog` collection via `getStaticPaths`), `contact.astro`, `services/index.astro` +
  `services/ai.astro` + `services/software.astro`, `404.astro`, `rss.xml.ts`.
- Markdown is extended with `remark-directive` + a custom `remarkAdmonitions` plugin
  (`astro.config.mjs`) so `:::tip`, `:::warning`, `:::danger`, `:::note`, `:::info` blocks render
  as styled admonitions (CSS in `global.css`). Code blocks are highlighted with Shiki
  (`github-light` theme) and get a copy-button wrapper class injected by a custom transformer.

### Current design system

The palette, type scale, and component conventions live entirely in `src/styles/global.css` (there
is no `tailwind.config.mjs` — Tailwind 4 uses CSS-based config). Key facts a future edit should
respect:
- Brutalist/"Modernist" terminal aesthetic: sharp corners everywhere (`--radius-*` tokens are
  zeroed out except `full`), heavy 2px `border-ink` borders, monospace (`font-mono`) used for
  labels/kickers/nav, `font-heading`/`font-sans` both map to Archivo.
- Color tokens live in the `@theme` block at the top of `global.css`: `bg`, `surface`, `ink`
  (near-black text), `border`/`border-light`, `accent` (`#ec3013` red/orange) with a full 100–900
  ramp, `accent-2`, and a `neutral` ramp. There is no dark-mode variant of these tokens (no `dark:`
  classes exist in `src/`).
- Reusable utility classes are defined in `global.css` as `@utility` blocks (Tailwind 4's
  replacement for `@layer components`): `.btn`/`.btn-primary`/`.btn-secondary`, `.card`,
  `.tag-pill`, `.kicker` (mono accent-colored section labels like `01 /`), `.blink-cursor`
  (terminal cursor animation), `.section`, `.container`. Any scoped `<style>` block in a `.astro`
  component that uses `@apply` needs its own `@reference '@styles/global.css';` line — Tailwind 4
  compiles each such block as an isolated CSS module.
- Responsive collapsing of the bordered grid layouts (e.g. `ServiceCard` grid, homepage sections)
  is handled by custom helper classes (`.rgrid`, `.rwrap`, `.rpad`) defined in a single
  `@media (max-width: 900px)` block in `global.css`, rather than per-component Tailwind responsive
  variants — follow that pattern when adding new bordered grid sections.

### Interactive components are vanilla JS, not a UI framework

There is no React/Vue/Svelte integration installed. Client-side interactivity (mobile nav toggle,
contact form validation in `ContactForm.astro`, image gallery modal in
`ImageGalleryModal.astro`/`ImageGallery.astro`, blog reading-progress bar, code-block copy
buttons) is plain inline `<script>` in the relevant `.astro` component, wired up with
`document.getElementById`/data attributes. The image gallery communicates via
`window.galleryData` / `window.openImageGallery` etc., typed in `src/env.d.ts` — follow that
pattern (extend the `Window` interface there) if you add another global-scoped script bridge.

The contact form (`ContactForm.astro`) is a **client-side mock**: it validates fields and swaps
in a fake "sent" success state, but does not actually submit anywhere (no backend/API route
exists in this project — it's a fully static Astro site).
