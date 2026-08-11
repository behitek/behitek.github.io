# behitek.github.io

Personal site and portfolio for Hieu Nguyen (behitek) — AI engineer. Built with Astro 4 and
TailwindCSS, statically generated and deployed to Cloudflare Pages.

🌐 **Live site:** [behitek.com](https://behitek.com)

## Tech stack

- **Framework:** [Astro 4](https://astro.build) (static output, no client-side framework)
- **Styling:** [TailwindCSS 3](https://tailwindcss.com)
- **Content:** MDX blog posts + JSON project entries via Astro Content Collections
- **Language:** TypeScript (strict)
- **Comments:** [Giscus](https://giscus.app) (GitHub Discussions)
- **Analytics:** Google Tag Manager
- **Hosting:** Cloudflare Pages

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-checks (astro check) then builds to dist/
npm run preview   # preview the production build
```

There is no separate lint/test script — `npm run build` running `astro check` is the main
correctness gate.

## Project structure

```
src/
├── components/     # Astro components (Navbar, Footer, ServiceCard, ProjectCard, BlogCard,
│                   #   ContactForm, image gallery, TableOfContents, Giscus, SEO, ...)
├── layouts/
│   ├── BaseLayout.astro       # shared shell: head/SEO, fonts, GTM, Navbar + Footer
│   └── BlogPostLayout.astro   # post chrome: TOC, reading progress, Giscus
├── pages/
│   ├── index.astro            # homepage
│   ├── about.astro
│   ├── projects.astro
│   ├── blog/index.astro        # listing
│   ├── blog/[...slug].astro    # post pages, generated from the `blog` collection
│   ├── contact.astro           # mock lead-capture form (client-side only, no backend)
│   ├── services/index.astro    # Online Judge (DMOJ) service
│   ├── services/ai.astro       # AI project service
│   ├── services/software.astro # full-stack software service
│   ├── 404.astro
│   └── rss.xml.ts
├── content/
│   ├── blog/        # blog posts (.mdx)
│   ├── projects/    # project entries (.json)
│   └── config.ts    # content collection schemas
├── styles/global.css   # Tailwind layers + design tokens/utilities
└── utils/               # constants.ts, helpers.ts

public/                  # static assets: images, favicon, CNAME, .nojekyll
.github/workflows/        # test-deploy.yml (build check on PRs)
```

## Design system

The site uses a brutalist/terminal-inspired look ("Modernist"): sharp corners (no border-radius
except pills), 2px `border-ink` borders, monospace labels for nav/kickers, and a single warm red
accent. All content is in Vietnamese by default.

Tokens live in `tailwind.config.mjs`:

```
bg        #f3f2f2   surface   #eae9e9   ink (text)  #201e1d
accent    #ec3013   accent-2  #e15b47   neutral      100–900 gray ramp
```

- **Font:** Archivo (Google Fonts) for both headings and body; system monospace for code/labels.
- **Reusable classes** (`src/styles/global.css` `@layer components`): `.btn` / `.btn-primary` /
  `.btn-secondary`, `.card`, `.tag-pill`, `.kicker` (e.g. `01 /`), `.blink-cursor`, `.section`,
  `.container`.
- There is currently no dark mode — it was removed along with the old i18n routing when the site
  was rebuilt from its original emerald/dark-mode Docusaurus-derived design into this one.

## Content management

### Adding a blog post

Add an `.mdx` file to `src/content/blog/`:

```yaml
---
title: "Your Post Title"
description: "Brief description"
date: 2026-01-01
author: "Hieu Nguyen"       # optional, defaults to "Hieu Nguyen"
language: "en"              # "en" | "vi", defaults to "en"
category: "AI/ML"
tags: ["tag1", "tag2"]
image: "/images/blog/your-image.jpg"
draft: false
---
```

Drop images in `public/images/blog/`. The post is served at `/blog/<filename-slug>`.
Content supports `:::tip` / `:::warning` / `:::danger` / `:::note` / `:::info` admonition blocks
(via a custom remark-directive plugin in `astro.config.mjs`) in addition to standard Markdown/MDX.

### Adding a project

Add a `.json` file to `src/content/projects/`:

```json
{
  "id": "project-slug",
  "title": "Project Name",
  "description": "Project description",
  "category": "Product",
  "tech": ["Python", "FastAPI", "Docker"],
  "links": { "website": "https://example.com", "github": "https://github.com/...", "blog": "/blog/..." },
  "featured": true,
  "order": 1,
  "status": "private",
  "flagship": false,
  "images": ["/images/project/screenshot-1.png"]
}
```

Exactly one project should have `"flagship": true` — it drives the case-study spotlight on the
homepage. `status` (`open-source` | `private`) controls the private-project indicator on the
project card.

## Configuration

**Giscus comments** — set your repo/category IDs in `src/components/Giscus.astro`.

**Google Tag Manager** — GTM container ID is set inline in `src/layouts/BaseLayout.astro`.

**Custom domain** — set in `public/CNAME`.

## Deployment

Pushes to `main` trigger a Cloudflare Pages build (configured in the Cloudflare dashboard), which
builds with Astro and deploys `dist/`. `.github/workflows/test-deploy.yml` runs a build check
on pull requests into `main`.

To deploy manually elsewhere: `npm run build` and upload the `dist/` folder.

## Contact

- **Email:** hello@behitek.com
- **LinkedIn:** [linkedin.com/in/behitek](https://linkedin.com/in/behitek)
- **GitHub:** [github.com/behitek](https://github.com/behitek)
- **Twitter/X:** [@behitek_](https://twitter.com/behitek_)

© 2026 Hieu Nguyen. All rights reserved.
