# AGENTS.md - LLM Instructions for Behitek.com Project

## Project Overview

This is **Behitek.com** - a personal website and blog for Hieu Nguyen (behitek), an AI Engineer from Vietnam. The site is built using **Docusaurus 3.7.0**, a modern static site generator, and serves as a platform for sharing AI/ML knowledge, technical documentation, and personal projects.

### Site Purpose
- **Personal Portfolio**: Showcases Hieu's background as an AI Engineer with focus on NLP, RAG, LLMs, and information retrieval
- **Technical Blog**: AI/ML articles, tutorials, and insights
- **Documentation Hub**: Computer science fundamentals (data structures, algorithms)
- **Project Showcase**: Personal and professional projects
- **Interactive Games**: Mini-games like Minesweeper, Clash of Clans integration

## Architecture & Technology Stack

### Core Framework
- **Docusaurus 3.7.0** - React-based static site generator
- **React 18.2.0** - Frontend framework
- **Node.js ≥18.0** - Runtime requirement

### Styling & UI
- **TailwindCSS 3.4.1** - Utility-first CSS framework
- **Custom CSS** - Located in `src/css/custom.css`
- **Dark Mode**: Default theme (forced dark mode, no toggle)
- **FontAwesome Icons** - For social links and UI elements

### Content & Features
- **MDX Support** - Enhanced Markdown with React components
- **Math Rendering** - KaTeX for mathematical expressions
- **Search** - Algolia DocSearch integration
- **Analytics** - Google Tag Manager (GTM)
- **Comments** - Disqus integration for blog posts

## Project Structure

```
behitek.github.io/
├── blog/                    # Blog posts (Markdown files)
│   ├── authors.yml         # Author information
│   └── *.md               # Blog posts with YYYY-MM-DD-title.md format
├── docs/                   # Documentation pages
│   ├── algorithms/        # Algorithm explanations
│   ├── data-structures/   # Data structure guides
│   └── *.md              # Other documentation
├── src/
│   ├── css/               # Custom styles
│   ├── data/              # Site data (projects, social links)
│   ├── pages/             # Custom React pages
│   │   ├── index.js       # Homepage
│   │   ├── projects/      # Projects showcase
│   │   ├── minesweeper/   # Game page
│   │   └── bank/          # Banking game
│   └── theme/             # Docusaurus theme customizations
├── static/                # Static assets
│   ├── img/              # Images and media
│   ├── pdf/              # Documents (resume, etc.)
│   └── CNAME             # Custom domain configuration
├── docusaurus.config.js   # Main configuration
├── sidebars.js            # Documentation sidebar structure
└── package.json           # Dependencies and scripts
```

## Key Configuration Files

### docusaurus.config.js
- **Site metadata**: Title, tagline, URL configuration
- **Theme settings**: Dark mode, navbar, footer
- **Plugin configuration**: Algolia search, Google Tag Manager
- **Content settings**: Blog and docs configuration
- **Math support**: KaTeX integration

### sidebars.js
- Defines documentation sidebar structure
- Categories: Data Structures, Algorithms
- Individual docs: Git, Python conventions

## Content Guidelines

### Blog Posts
- **Location**: `blog/` directory
- **Naming**: `YYYY-MM-DD-title.md` format
- **Frontmatter**: Required metadata (title, authors, tags, etc.)
- **Author**: Use `hieunv` as defined in `authors.yml`
- **Topics**: AI/ML, programming, tutorials, technical insights

### Documentation
- **Location**: `docs/` directory
- **Structure**: Organized by categories (algorithms, data structures)
- **Style**: Educational, with examples and explanations
- **Images**: Store in `static/img/docs/`

### Projects
- **Configuration**: `src/data/_Projects.js`
- **Format**: Array of project objects with metadata
- **Required fields**: category, title, subtitle, description, tech, links

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve built site
npm run serve
```

### Content Creation
1. **Blog posts**: Create in `blog/` with proper frontmatter
2. **Documentation**: Add to `docs/` and update `sidebars.js` if needed
3. **Images**: Place in appropriate `static/img/` subdirectory
4. **Projects**: Update `src/data/_Projects.js`

### Deployment
- **Platform**: GitHub Pages
- **Domain**: behitek.com (configured via CNAME)
- **Branch**: `gh-pages` for deployment
- **Command**: `npm run deploy`

## Important Notes for LLMs

### When Working with This Project:

1. **Content Focus**: This is an AI Engineer's personal site - content should be technical, educational, and professional

2. **File Naming**: 
   - Blog posts: `YYYY-MM-DD-title.md`
   - Use kebab-case for URLs and file names
   - Images: descriptive names in appropriate subdirectories

3. **Markdown Features**:
   - Supports MDX (React components in Markdown)
   - Math expressions with KaTeX
   - Code syntax highlighting with Prism
   - Frontmatter metadata is required for blog posts

4. **Styling**:
   - Uses TailwindCSS classes
   - Custom CSS variables defined in `src/css/custom.css`
   - Dark mode is default and forced (no light mode toggle)

5. **Navigation**:
   - Main nav: Docs, Blog, Games, Resume
   - Footer: Connect, Discover, Products sections
   - Social links: LinkedIn, GitHub, Twitter, Email

6. **SEO & Analytics**:
   - Google Tag Manager configured
   - Algolia search integration
   - Meta descriptions and titles important

### Common Tasks:
- **Adding blog posts**: Create markdown file in `blog/` with proper frontmatter
- **Updating projects**: Modify `src/data/_Projects.js`
- **Adding documentation**: Create in `docs/` and update `sidebars.js`
- **Styling changes**: Edit `src/css/custom.css` or use Tailwind classes
- **Configuration changes**: Modify `docusaurus.config.js`

### Best Practices:
- Always include proper frontmatter in blog posts
- Use descriptive alt text for images
- Maintain consistent formatting and style
- Test locally before deployment
- Keep content professional and educational
- Use proper heading hierarchy (H1 → H2 → H3)

## Contact Information
- **Site Owner**: Hieu Nguyen (behitek)
- **Email**: hello@behitek.com
- **GitHub**: https://github.com/behitek
- **LinkedIn**: https://www.linkedin.com/in/behitek/
- **Twitter**: https://twitter.com/behitek_
