# Rebuild the homepage as an AI Engineer's homepage

**Date:** 2026-08-06
**Status:** Approved (design), pending implementation

## Problem

The homepage frames Hieu as an AI Engineer but proves something else. Of the page's
substance, roughly 70% is the online judge (OJ) business:

- The hero paragraph spends half its sentence on free OJ hosting for schools.
- `StatBar` shows four stats; three are OJ platform numbers.
- `Dịch vụ` is section 02, with the OJ card marked `flagship: true` and listed first.
- `Case study nổi bật` — the single largest block on the page — is LCOJ, plus a
  20-organization roster.
- The closing CTA reads "từ online judge đến sản phẩm AI".

Meanwhile the genuinely strong AI evidence (AI4VN Champion, ALQAC 1st place, VLSP 2nd,
JAIST MSc in IR/ML, KiKi ASR +12%, NexusAI, LinguistAI) is compressed into a four-cell
awards strip, one line of 13px proof text, and two one-line project cards.

A visitor evaluating Hieu for AI work leaves knowing he runs a competitive-programming
platform.

## Goal

Make AI the page's centre of gravity and the page's ask, while keeping the OJ work —
recast from *product being sold* to *production system I have operated since 2020*. That
reframing makes the AI pitch stronger rather than competing with it: five years of uptime
across 20 organizations is evidence that this engineer ships things that survive contact
with real users.

The OJ service stays reachable in one click; it stops being the headline.

## Non-goals

- No visual redesign. The brutalist/"Modernist" terminal aesthetic
  (`tailwind.config.mjs`, `global.css`) is already the right register for an engineer's
  site and stays exactly as-is: sharp corners, 2px `border-ink`, mono kickers, `accent`
  red.
- No changes to `/services/*`, `/about`, `/projects`, or `/blog`. Homepage only, plus the
  shared components it renders.
- No new dependencies and no UI framework. Interactivity stays vanilla inline `<script>`.

## Placeholder data — read before implementing

The AI case-study content does not exist yet. Hieu will supply real figures later. Until
then implementation uses **fabricated placeholder data**, subject to three rules:

1. Every fabricated value lives in exactly one new file, `src/data/ai-work.ts`. No
   invented number may be inlined into component markup or into `index.astro`.
2. That file opens with a prominent `PLACEHOLDER DATA` header comment, and every
   fabricated metric carries `placeholder: true` in its object literal so a grep for
   `placeholder: true` enumerates everything still fake.
3. **Do not merge to `main` while placeholders remain.** `.github/workflows/deploy.yml`
   deploys `main` to GitHub Pages on push, so merging publishes invented metrics on a
   live personal site under Hieu's real name. Work stays on a feature branch until the
   figures are replaced. The repo has hit this problem before — commit `a076638`
   ("remove placeholder testimonials attributed to named people").

Real figures already in the repo are **not** placeholders and must be preserved verbatim:
`+12%` ASR accuracy (KiKi/Zalo), `−15%` service errors on Kubernetes (Zalo), the four
award names, the career timeline, and everything derived from `src/data/organizations.ts`
(`TOTAL_PLATFORM_USERS = '20.000+'`, `TOTAL_SUBMISSIONS = '2M+'`, 20 organizations,
`TOTAL_ORG_MEMBERS`).

## Page structure

Unnumbered bands (hero, stats, career, awards) keep their current order. The numbered
sections are reordered and renumbered:

| Band | Now | Proposed |
|------|-----|----------|
| Hero | Half the paragraph is OJ-for-schools | AI-only claim; terminal panel lists the AI stack |
| StatBar | 3 of 4 stats are OJ | 3 AI stats + 1 OJ scale stat |
| CareerStrip | VMO / Zalo·VCCorp / JAIST | unchanged |
| AwardsBand | 4 national awards | unchanged |
| 01 | Chuyên môn (1 of 3 columns is OJ) | Chuyên môn — 3 AI columns |
| 02 | Dịch vụ | **Case study AI** — NexusAI spotlight + 2 cards |
| 03 | Case study nổi bật (LCOJ, largest block) | **Hệ thống đang vận hành** — LCOJ, condensed |
| 04 | Dự án (4 mini cards) | **Dịch vụ** — AI first, OJ last |
| 05 | Viết & nghiên cứu | **Dự án khác** — Behivest + Beli5 |
| 06 | — | Viết & nghiên cứu |
| CTA | "từ online judge đến sản phẩm AI" | AI-framed ask |

Ordering rationale: prove (01–03), then offer (04), then supporting material (05–06).
Services land immediately after the proof rather than at the very bottom, so the OJ and
AI service funnels stay above the fold-count of a normal scroll.

## Section detail

### Hero (`src/components/Hero.astro`)

Layout, photo, and `TerminalWindow` all stay. Copy changes:

- Subtitle: `AI Engineer · LLM · RAG · Speech · Hà Nội`
- Paragraph: rewritten to claim only AI-in-production — building the model *and* the
  infrastructure that keeps it up. No mention of schools or online judges.
- Buttons: primary `Trao đổi về dự án AI` → `/contact`; secondary `Xem case study`
  → `#case-study-ai` (anchor added to section 02).
- Terminal lines become a stack readout rather than OJ counters:

  ```
  $ behitek --stack
  > llm         GPT-4 · Claude · fine-tune
  > retrieval   hybrid search · re-rank · eval
  > speech      Whisper · ASR · text normalization
  > serving     FastAPI · Docker · K8s
  ```

  This drops `Hero.astro`'s import of `ORGANIZATIONS` / `TOTAL_PLATFORM_USERS`.

### StatBar (`src/components/StatBar.astro`)

Four cells, three AI-weighted:

1. `8 năm` — "đưa AI vào production" (real)
2. placeholder count of AI systems shipped to production (from `ai-work.ts`)
3. `4` — "giải quốc gia về AI & thuật toán" (real; AI4VN, ALQAC, VLSP, ICPC)
4. `TOTAL_PLATFORM_USERS` — "người dùng trên hệ thống tôi vận hành" (real, kept as scale
   proof)

`TOTAL_SUBMISSIONS` drops off the homepage; it remains on the OJ service page.

### 01 / Chuyên môn (`src/components/SkillsGrid.astro`)

Same three-column bordered grid, same card anatomy (title, areas, tech pills, accent
proof line). The OJ/education column is removed — its proof line moves to section 03.
New columns:

1. **LLM & RAG** — retrieval · agent · evaluation · fine-tune. Tech: Python, LangGraph,
   ChromaDB, GPT-4, Claude. Proof: NexusAI metric (placeholder).
2. **Speech & NLP** — ASR · TTS · text normalization · phân loại. Tech: PyTorch, Whisper,
   Transformers. Proof: `+12% độ chính xác ASR cho trợ lý ảo KiKi (Zalo)` (real).
3. **ML trong production** — serving · monitoring · tối ưu chi phí · hạ tầng. Tech:
   FastAPI, Docker, Kubernetes, PostgreSQL, Redis. Proof: `−15% lỗi dịch vụ trên
   Kubernetes (Zalo)` (real).

This removes `SkillsGrid`'s dependency on `src/data/organizations.ts`.

### 02 / Case study AI (new, `id="case-study-ai"`)

One spotlight plus two cards.

**Spotlight — NexusAI**, rendered with the existing `CaseStudySpotlight`. NexusAI has no
screenshot and inventing one is out of the question, so `CaseStudySpotlight` gains an
optional named slot `media`: when `Astro.slots.has('media')` the right-hand column renders
the slot instead of `<img>`. The `image`, `quote`, and `attribution` props keep their
current behaviour, so `/` and any other consumer are unaffected.

Into that slot goes a new `PipelineDiagram.astro` — a box-and-arrow diagram of the RAG
pipeline drawn with the existing border/mono tokens (no SVG library, no images). Stages:
`query → hybrid retrieval (BM25 + dense) → LLM re-rank → grounded answer + citations`.
This is the page's one signature AI element and it fits the terminal aesthetic.

Spotlight body: anonymized client context, the problem, the architecture in concrete
beats, and three stats — corpus size, p95 latency, retrieval-quality lift — all
placeholder.

**Cards — LinguistAI and KiKi (Zalo)**, in a new `CaseStudyCard.astro`: a bordered card
with mono kicker, title, `Vấn đề` / `Cách làm` / `Kết quả` lines, tech pills, and an
accent metric row. Two-up in an `rgrid grid-cols-2 border-2 border-ink`, matching the
`ProjectMiniCard` grid convention.

- LinguistAI: LLM-generated reading items, Whisper-scored speaking, written feedback.
  Metrics placeholder.
- KiKi/Zalo: text normalization for ASR. `+12%` is real; user scale is placeholder.

### 03 / Hệ thống đang vận hành (LCOJ)

The existing LCOJ `CaseStudySpotlight` with its screenshot, three stats, deployment links,
and `OrgRoster` slot — kept, but reframed:

- Section heading changes from `Case study nổi bật` to `Hệ thống đang vận hành`.
- Description reframed from a service pitch to an operations claim: built in 2020, run
  continuously since, 20 organizations, no marketing.
- Adds a link to the OJ service page so the commercial path stays one click away. Note
  that page's route is `/services` (i.e. `src/pages/services/index.astro`, titled "Online
  Judge (DMOJ)"). The `path: '/services/online-judge'` string on the service card is
  display-only terminal-style text, not a route — there is no such page.

### 04 / Dịch vụ

Same three `ServiceCard`s, reordered and re-weighted: **Dự án AI** first with
`flagship: true`, **Phần mềm full-stack** second, **Online Judge (DMOJ)** third with
`flagship` removed and `borderRight: false`. Card copy is otherwise unchanged.

### 05 / Dự án khác

The `AI_FIRST_ORDER` list in `index.astro` currently surfaces `nexusai`, `linguistai`,
`behivest`, `beli5`. NexusAI and LinguistAI are now full case studies in section 02, so
listing them again as mini cards duplicates them. This section becomes Behivest + Beli5
in a two-column grid, keeping the `ls ./projects →` link.

### 06 / Viết & nghiên cứu

Unchanged apart from its section number.

### CTA

- kicker: `$ ./contact --ai-project`
- title: an AI-framed ask covering architecture through operation
- button: `Trao đổi về dự án`
- `size="lg"`, `showEmail` unchanged

## Files

**New**

- `src/data/ai-work.ts` — all AI case-study content and every placeholder metric
- `src/components/CaseStudyCard.astro` — compact case-study card
- `src/components/PipelineDiagram.astro` — bordered box-and-arrow RAG diagram

**Modified**

- `src/pages/index.astro` — section order, numbering, headings, project list, CTA
- `src/components/Hero.astro` — copy, buttons, terminal lines
- `src/components/StatBar.astro` — stat set
- `src/components/SkillsGrid.astro` — three AI columns
- `src/components/CaseStudySpotlight.astro` — optional `media` named slot

**Untouched:** `CareerStrip`, `AwardsBand`, `OrgRoster`, `ProjectMiniCard`, `BlogCard`,
`CTABand`, `ServiceCard`, `TerminalWindow`, all pages other than `index.astro`.

## Responsive behaviour

New bordered grids follow the established convention: collapse via the `.rgrid` / `.rwrap`
/ `.rpad` helpers in the single `@media (max-width: 900px)` block in `global.css`, not via
per-component Tailwind breakpoint variants. `PipelineDiagram` stacks its stages vertically
at that breakpoint; if it needs a rule of its own, that rule goes in the same media block.

## Verification

- `npm run build` (runs `astro check`) must pass — the only automated gate in this repo.
- `npx prettier --check` on every touched file.
- Visual check at 1440px and at 375px: no horizontal overflow, every bordered grid
  collapses cleanly, no doubled or missing 2px borders at section seams.
- `grep -rn "placeholder: true" src/` enumerates exactly the fabricated values, and no
  fabricated number appears anywhere outside `src/data/ai-work.ts`.
- Read the rendered homepage end to end and confirm a first-time visitor's takeaway is
  "AI engineer who ships production systems", with the OJ platform reading as evidence
  rather than as the product on sale.

## Open items for Hieu

Replace in `src/data/ai-work.ts` before merging to `main`:

- NexusAI — client context (nameable or anonymized), corpus size, p95 latency,
  retrieval-quality lift, production status
- LinguistAI — user/exam volume, scoring accuracy or agreement with human raters, status
- KiKi/Zalo — user scale (the `+12%` figure is already real)
- Count of AI systems shipped to production (StatBar cell 2)
