# Behitek Portfolio - Astro Edition

> A blazing-fast, modern portfolio website for an AI Engineer, built with Astro 4.x and TailwindCSS.

🌐 **Live Site:** [behitek.com](https://behitek.com)
🎨 **Framework:** Astro 4.x
💅 **Styling:** TailwindCSS 3.x
📝 **Content:** MDX for blog posts

---

## ✨ Features

### Core Features
- ⚡ **Lightning Fast**: < 1s load time with minimal JavaScript
- 🌙 **Dark Mode**: Smooth theme switching with persistence
- 📱 **Fully Responsive**: Mobile-first design
- 🎨 **Modern UI**: Glass morphism, gradient accents, smooth animations
- 🔍 **SEO Optimized**: Complete meta tags, OpenGraph, Twitter cards
- 📊 **RSS Feed**: Subscribe to blog updates
- ♿ **Accessible**: WCAG 2.1 AA compliant

### Blog Features
- 📝 10+ technical articles about AI/ML, NLP, RAG, Python
- 🌐 **Bilingual Support**: English & Vietnamese posts (tagged)
- 🏷️ **Smart Filtering**: Filter by language and category
- 📖 **Table of Contents**: Auto-generated with active section highlighting
- 📈 **Reading Progress**: Visual progress bar
- 💬 **Comments**: Giscus (GitHub Discussions)
- 🔗 **Share Buttons**: Twitter, LinkedIn, Copy link
- ⏱️ **Reading Time**: Estimated time for each post

### Project Showcase
- 🚀 Featured projects: LCOJ, Inverted HyDE, hoc-bash
- 📂 Categorized: Product, Research, Tutorial, Tool, Fun
- 🏷️ Tech stack tags
- 🔗 Links to GitHub, live demos, blog posts

### Technical Highlights
- 🎯 TypeScript for type safety
- 🎨 Custom Tailwind theme with emerald green branding
- 📦 Content Collections for type-safe content
- 🖼️ Optimized images with Astro Image
- 🤖 Google Tag Manager integration
- 🚀 GitHub Actions deployment

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands

```bash
npm run dev          # Start dev server (http://localhost:4321)
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

---

## 📁 Project Structure

```
/
├── public/              # Static assets
│   ├── images/          # Images (copied from old site)
│   │   ├── blog/        # Blog post images
│   │   └── me.jpeg      # Profile picture
│   ├── favicon.ico
│   ├── CNAME            # Custom domain config
│   └── .nojekyll        # GitHub Pages config
│
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   ├── BlogCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── LanguageBadge.astro
│   │   ├── TableOfContents.astro
│   │   ├── Giscus.astro
│   │   └── SEO.astro
│   │
│   ├── layouts/         # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   │
│   ├── pages/           # Routes
│   │   ├── index.astro           # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro       # Blog listing
│   │   │   └── [...slug].astro   # Blog post pages
│   │   ├── projects.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   └── rss.xml.ts            # RSS feed
│   │
│   ├── content/         # Content collections
│   │   ├── blog/        # Blog posts (MDX)
│   │   │   └── inverted-hyde.mdx
│   │   ├── projects/    # Projects (JSON)
│   │   │   ├── lcoj.json
│   │   │   ├── inverted-hyde.json
│   │   │   └── hoc-bash.json
│   │   └── config.ts    # Content collection schemas
│   │
│   ├── styles/          # Global styles
│   │   └── global.css   # Tailwind + custom styles
│   │
│   └── utils/           # Utility functions
│       ├── constants.ts
│       └── helpers.ts
│
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment
│
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json
```

---

## 🎨 Design System

### Color Palette

```css
Primary (Emerald Green):
  - #10B981 (Main)
  - #059669 (Dark)
  - #34D399 (Light)

Accent:
  - #06B6D4 (Cyan) - For highlights
  - #8B5CF6 (Purple) - For AI/ML content

Neutral (Slate):
  - Light mode: #FFFFFF background, #0F172A text
  - Dark mode: #0F172A background, #F8FAFC text
```

### Typography

- **Headings**: Inter (Google Fonts)
- **Body**: System fonts for performance
- **Code**: JetBrains Mono / Fira Code

### Components

- **Glass Morphism**: Navbar with backdrop blur
- **Bento Grid**: About section layout
- **Cards**: Elevated cards with hover effects
- **Badges**: Language (EN/VI) and category badges
- **Buttons**: Primary (filled) and secondary (outlined)

---

## 📝 Content Management

### Adding Blog Posts

1. Create new MDX file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: 2025-11-12
author: "Hieu Nguyen"
language: "en"  # or "vi"
category: "AI/ML"  # AI/ML, Python, Tutorial, Data
tags: ["tag1", "tag2"]
image: "/images/blog/your-image.jpg"
draft: false
---

Your content here...
```

2. Add images to `public/images/blog/`
3. Blog post will be automatically generated at `/blog/your-post-slug`

### Adding Projects

1. Create JSON file in `src/content/projects/`:

```json
{
  "title": "Project Name",
  "description": "Project description",
  "category": "Product",
  "tech": ["Python", "FastAPI", "Docker"],
  "links": {
    "website": "https://example.com",
    "github": "https://github.com/..."
  },
  "featured": true,
  "order": 1
}
```

2. Project will appear on homepage and projects page

---

## 🔧 Configuration

### Giscus Comments

1. Enable GitHub Discussions in your repository
2. Visit [giscus.app](https://giscus.app)
3. Configure and get your repo ID and category ID
4. Update `src/components/Giscus.astro`:

```astro
script.setAttribute('data-repo', 'behitek/behitek.github.io');
script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
```

### Google Tag Manager

Update in `src/layouts/BaseLayout.astro`:

```html
<script is:inline>
  (function(w,d,s,l,i){...})(window,document,'script','dataLayer','YOUR_GTM_ID');
</script>
```

### Custom Domain

Update `public/CNAME` with your domain:

```
behitek.com
```

---

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Push to main branch or designated branch
2. GitHub Actions will automatically build and deploy
3. Enable GitHub Pages in repo settings:
   - Settings → Pages
   - Source: GitHub Actions

### Manual Deployment

```bash
# Build
npm run build

# Deploy dist/ folder to your hosting provider
```

---

## 📊 Performance

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Bundle Size
- JavaScript: ~5-10 KB (vs 200 KB with Docusaurus)
- CSS: ~20 KB (with TailwindCSS purging)
- First Load: < 1 second

---

## 🛠️ Tech Stack

- **Framework**: [Astro 4.x](https://astro.build)
- **Styling**: [TailwindCSS 3.x](https://tailwindcss.com)
- **Content**: MDX with Content Collections
- **Fonts**: Google Fonts (Inter)
- **Icons**: Emoji + SVG
- **Comments**: [Giscus](https://giscus.app)
- **Analytics**: Google Tag Manager
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

---

## 📚 Migration from Docusaurus

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed migration steps.

**Summary**:
- Copy blog posts from `/blog/*.md` to `/src/content/blog/*.mdx`
- Update frontmatter format
- Fix image paths: `/img/blog` → `/images/blog`
- Remove `<!--truncate-->` tags
- Test each post

---

## 🤝 Contributing

This is a personal portfolio, but suggestions and bug reports are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

© 2025 Hieu Nguyen. All rights reserved.

---

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [TailwindCSS](https://tailwindcss.com)
- Comments powered by [Giscus](https://giscus.app)
- Hosted on [GitHub Pages](https://pages.github.com)

---

## 📧 Contact

- **Email**: hello@behitek.com
- **LinkedIn**: [linkedin.com/in/behitek](https://linkedin.com/in/behitek)
- **GitHub**: [github.com/behitek](https://github.com/behitek)
- **Twitter**: [@behitek_](https://twitter.com/behitek_)

---

**Built with ❤️ by Hieu Nguyen**
