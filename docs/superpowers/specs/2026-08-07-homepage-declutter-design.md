# Homepage redesign: de-duplicate against /about, /projects, /services

## Problem

The current homepage (built up over the AI-engineer-repositioning commits) has grown into a
second copy of content that already lives on other pages:

- `CareerStrip` and `AwardsBand` restate the career timeline and award list that `/about` already
  shows in full (`Timeline`, `AwardsList`).
- `SkillsGrid` ("Chuyên môn") restates the skill tags already listed on `/about`, and previews
  service categories that `/services/ai.astro` and `/services/software.astro` already own.
- The "Case study AI" section (`CaseStudySpotlight` + `PipelineDiagram` for NexusAI, plus
  `CaseStudyCard` for LinguistAI and KiKi) reproduces depth that either already exists as a full
  project entry (`nexusai.json`, `linguistai.json` on `/projects`) or has nowhere else to live
  (KiKi/Zalo proof).
- The "Hệ thống đang vận hành" section reproduces the `OrgRoster` + deployment stats that
  `/services/index.astro` already shows in full, and duplicates `TOTAL_PLATFORM_USERS` which
  already appears in `StatBar` on the same page.
- The "Dịch vụ" teaser cards restate feature bullets that the actual service pages already own.

Goal: make the homepage a high-level frontpage — establish credibility and route visitors to
`/about`, `/projects`, `/services` for depth — without restating what those pages already say.

Primary audience for the homepage: personal/career brand (a visitor evaluating him as a senior AI
engineer) first; freelance/consulting services second.

## New homepage structure

Six blocks, down from the current ~11 numbered sections:

1. **Hero** — unchanged, except the second CTA link changes from the removed `#case-study-ai`
   anchor to the new "Dự án" section anchor.
2. **StatBar** — unchanged (already carries real, aggregate-only numbers: years, companies,
   national awards count, platform users). This is the only "bio" touch that survives on the
   homepage — detail (who/when/what award) stays exclusively on `/about`.
3. **`01 / Dự án`** — a single unified project-teaser grid, replacing both the old "Case study AI"
   section and the old "Dự án khác" section. Reads directly from the `projects` content
   collection (`getCollection('projects')`, sorted by `data.order` — all 5 entries currently have
   `featured: true`, so no filtering needed) instead of hand-picked spotlight data. Each entry
   renders as a `ProjectMiniCard` (title, description, tech tags, status badge, link). The one
   `flagship: true` entry (LCOJ) gets a visual accent only (accent-colored top border + "CHỦ LỰC"
   badge, matching the pattern `ServiceCard` already uses for its flagship service) — no separate
   spotlight treatment, no org roster, no metrics block. Section header links to `/projects` for
   the full case studies.
4. **`02 / Dịch vụ`** — same 3-card row (AI / Software / Online Judge), but each card's bullet
   list drops to a single one-line pitch + "Xem chi tiết →". No feature bullets on the homepage;
   those live only on the service pages.
5. **`03 / Viết & nghiên cứu`** — unchanged blog teaser.
6. **CTABand** — unchanged.

Removed entirely from `index.astro`: `CareerStrip`, `AwardsBand`, `SkillsGrid`, `CaseStudySpotlight`
(homepage usage), `PipelineDiagram` (homepage usage), `CaseStudyCard` (homepage usage), `OrgRoster`
(homepage usage), and the `otherProjects`/`flagshipProject`/`SERVICES`-bullets logic tied to the
removed sections.

## Content relocation (nothing factual gets deleted)

`/services/ai.astro` currently has zero proof/case-study content (just a feature grid and process
steps). The deep AI case-study content being cut from the homepage moves there as a new section,
inserted after the feature grid and before the process steps:

- `CaseStudySpotlight` + `PipelineDiagram`, using the existing `NEXUS_AI` / `NEXUS_PIPELINE` data.
- A 2-card `CaseStudyCard` row for `LINGUIST_AI` and `KIKI_ASR`.
- `RAG_PROOF` (ALQAC legal-QA win) becomes a supporting line on the NexusAI spotlight — it's RAG
  credibility that has nowhere else to attach.
- `PRODUCTION_PROOF` (−15% service errors on Kubernetes) becomes a supporting line on the KiKi
  card — that card's `result` text currently omits this figure entirely.

`src/data/ai-work.ts` keeps its current exports; only the *consumer* changes (from `index.astro`
to `services/ai.astro`), except `COMPANIES_SHIPPED_AT`, which stays feeding the homepage
`StatBar` as today.

## Component changes

- `ProjectMiniCard.astro`: add an optional `flagship` prop (accent top border + "CHỦ LỰC" badge),
  mirroring `ServiceCard.astro`'s existing flagship treatment. Used for all 5 homepage project
  cards instead of just the 2 "other projects".
- `ServiceCard.astro`: no prop-shape change — `bullets` is passed a 1-item array instead of 3.
- `CareerStrip.astro`, `AwardsBand.astro`, `SkillsGrid.astro`: deleted outright. Confirmed (via
  grep) they are referenced only from `src/pages/index.astro`; no other consumers exist.
- `CaseStudySpotlight.astro`, `PipelineDiagram.astro`, `CaseStudyCard.astro`, `OrgRoster.astro`:
  kept, relocated to `/services/ai.astro` (`OrgRoster` was already also used on
  `/services/index.astro`, so it keeps that existing usage plus loses only the homepage one).
- `StatBar`, `Hero`, `BlogCard`, `CTABand`: unchanged.

## Out of scope

- No changes to `/about`, `/projects`, `/services/index.astro`, `/services/software.astro`, or the
  design-token/CSS system — this redesign reuses the existing brutalist "Modernist" component
  vocabulary throughout, no new visual language.
- No changes to the `projects` or `blog` content collections' schemas.
