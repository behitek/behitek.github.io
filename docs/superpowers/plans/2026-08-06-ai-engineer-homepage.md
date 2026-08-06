# AI Engineer Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder and rewrite the homepage so AI work is its centre of gravity and its ask, recasting the online judge from product-being-sold to production-system-operated.

**Architecture:** All new AI case-study content lives in one data module (`src/data/ai-work.ts`) so fabricated placeholder metrics are quarantined in a single file. Two new presentational components (`PipelineDiagram`, `CaseStudyCard`) and one small backwards-compatible extension to `CaseStudySpotlight` (an optional `media` named slot) supply the new section 02. `src/pages/index.astro` is rewired for the new section order. No new dependencies.

**Tech Stack:** Astro 4 (static), TailwindCSS 3, TypeScript strict. No UI framework, no test framework.

## Global Constraints

- **THERE IS NO TEST SUITE IN THIS REPO.** Do not create one, do not install Vitest/Jest/Playwright, do not write `*.test.ts` files. The only automated gate is `npm run build`, which runs `astro check` (type-check) then `astro build`. Every task's verification step is `npm run build` plus targeted `grep` assertions. This overrides the usual TDD step pattern.
- Run `npx prettier --write <files>` on every file you touch before committing. There is no `format` npm script; invoke prettier directly.
- Design system is fixed: sharp corners (all `borderRadius` except `full` is zeroed), 2px `border-ink` borders, `font-mono` for labels/kickers, `accent` (`#ec3013`) for emphasis. No `dark:` classes exist in `src/` — do not add any.
- Responsive collapsing uses the `.rgrid` / `.rwrap` / `.rpad` helper classes defined in the single `@media (max-width: 900px)` block in `src/styles/global.css`. Do not add per-component Tailwind breakpoint variants for grid collapsing. The one sanctioned exception already in the codebase is `max-[899px]:border-b-2 max-[899px]:border-ink` for mobile-only dividers (see `ProjectMiniCard.astro`).
- All user-facing copy is Vietnamese.
- **Do not merge this branch to `main`.** `.github/workflows/deploy.yml` publishes `main` to GitHub Pages on push; the placeholder metrics would go live under Hieu's real name.
- These figures are REAL and must be reproduced verbatim wherever they appear: `+12%` ASR accuracy (KiKi/Zalo), `−15%` service errors on Kubernetes (Zalo), the four award names in `AwardsBand.astro`, and everything exported from `src/data/organizations.ts`. Never edit `src/data/organizations.ts`.
- The online judge service page is at route `/services` (`src/pages/services/index.astro`). `/services/online-judge` is **not** a route — it is display-only text on a service card. Never link to it.
- Import aliases: `@/*` → `src/*`, `@components/*`, `@layouts/*`, `@utils/*`, `@styles/*`.

---

## File Structure

**Create**

| File | Responsibility |
|------|----------------|
| `src/data/ai-work.ts` | All AI case-study content and every fabricated metric. Single quarantine point for placeholder data. |
| `src/components/PipelineDiagram.astro` | Renders a vertical box-and-arrow diagram from a `PipelineStage[]`. Presentation only, no data. |
| `src/components/CaseStudyCard.astro` | Compact case-study card: kicker, title, Vấn đề/Cách làm/Kết quả rows, tech pills, one accent metric. |

**Modify**

| File | Change |
|------|--------|
| `src/components/Hero.astro` | Copy, buttons, terminal lines. Drops its `organizations` import. |
| `src/components/StatBar.astro` | New stat set, 3 AI + 1 scale. |
| `src/components/SkillsGrid.astro` | Three AI columns. Drops its `organizations` import. |
| `src/components/CaseStudySpotlight.astro` | Optional `media` named slot for the right column. |
| `src/pages/index.astro` | Section order, numbering, headings, service order, project list, CTA. |

**Do not touch:** `CareerStrip.astro`, `AwardsBand.astro`, `OrgRoster.astro`, `ProjectMiniCard.astro`, `BlogCard.astro`, `CTABand.astro`, `ServiceCard.astro`, `TerminalWindow.astro`, `src/data/organizations.ts`, `src/content/**`, and every page other than `index.astro`.

---

### Task 1: AI work data module

Foundation for every later task. Nothing renders yet; this task's deliverable is a type-checking module whose placeholder values are all greppable.

**Files:**
- Create: `src/data/ai-work.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: types `Metric`, `ProofLine`, `PipelineStage`, `SpotlightCaseStudy`, `CardCaseStudy`; values `AI_SYSTEMS_SHIPPED: Metric`, `RAG_PROOF: ProofLine`, `SPEECH_PROOF: ProofLine`, `PRODUCTION_PROOF: ProofLine`, `NEXUS_PIPELINE: PipelineStage[]`, `NEXUS_AI: SpotlightCaseStudy`, `LINGUIST_AI: CardCaseStudy`, `KIKI_ASR: CardCaseStudy`.

- [ ] **Step 1: Create the data module**

Create `src/data/ai-work.ts` with exactly this content:

```ts
/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER DATA — NOT REAL. DO NOT MERGE TO `main`.
 * ─────────────────────────────────────────────────────────────────────────────
 * Every value marked `placeholder: true` below is fabricated. It exists only so
 * the homepage can be built and reviewed before the real figures arrive.
 * `.github/workflows/deploy.yml` publishes `main` to GitHub Pages on push, so
 * merging this file as-is would put invented metrics on a live personal site
 * under a real name.
 *
 * To enumerate everything still fake:
 *   grep -rn "placeholder: true" src/
 *
 * Values marked `placeholder: false` are REAL and must not be changed:
 *   - "+12%" ASR accuracy on the KiKi virtual assistant (Zalo)
 *   - "−15%" service errors on Kubernetes (Zalo)
 *
 * The NEXUS_PIPELINE stages are not metrics; they restate the architecture
 * already described in src/content/projects/nexusai.json ("vector embedding
 * tùy biến, hybrid search, re-rank bằng LLM") and need no placeholder flag.
 */

/** A single headline number with its caption. */
export interface Metric {
  value: string;
  label: string;
  placeholder: boolean;
}

/** The accent-coloured evidence line at the bottom of a skills column. */
export interface ProofLine {
  text: string;
  placeholder: boolean;
}

/** One stage in a rendered architecture diagram. */
export interface PipelineStage {
  label: string;
  detail: string;
}

/** Content for the large CaseStudySpotlight treatment. */
export interface SpotlightCaseStudy {
  kicker: string;
  title: string;
  description: string;
  stats: Metric[];
}

/** Content for the compact CaseStudyCard treatment. */
export interface CardCaseStudy {
  kicker: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  metric: Metric;
}

export const AI_SYSTEMS_SHIPPED: Metric = {
  value: '6',
  label: 'hệ thống AI đã lên production',
  placeholder: true,
};

export const RAG_PROOF: ProofLine = {
  text: '+31% recall@10 so với baseline BM25 trên corpus khách hàng',
  placeholder: true,
};

export const SPEECH_PROOF: ProofLine = {
  text: '+12% độ chính xác ASR cho trợ lý ảo KiKi (Zalo)',
  placeholder: false,
};

export const PRODUCTION_PROOF: ProofLine = {
  text: '−15% lỗi dịch vụ trên Kubernetes (Zalo)',
  placeholder: false,
};

export const NEXUS_PIPELINE: PipelineStage[] = [
  { label: 'query', detail: 'câu hỏi ngôn ngữ tự nhiên' },
  { label: 'hybrid retrieval', detail: 'BM25 + dense vector song song' },
  { label: 'LLM re-rank', detail: 'chấm lại top-k theo ngữ cảnh' },
  { label: 'grounded answer', detail: 'trả lời kèm trích dẫn nguồn' },
];

export const NEXUS_AI: SpotlightCaseStudy = {
  kicker: 'NexusAI — RAG đa phương thức',
  title: 'Tra cứu trên kho tài liệu văn bản, hình ảnh và video',
  description:
    'Khách hàng doanh nghiệp có kho tài liệu nội bộ nhiều năm nhưng tìm kiếm theo từ khoá gần như vô dụng: câu hỏi nghiệp vụ không khớp từ khoá, và nội dung nằm rải rác trong cả văn bản lẫn ảnh chụp và video. Tôi xây hệ thống RAG với embedding tùy biến cho từng loại nội dung, hybrid search kết hợp BM25 và vector, re-rank bằng LLM, và câu trả lời luôn kèm trích dẫn để người dùng kiểm chứng được nguồn.',
  stats: [
    { value: '1,2M', label: 'tài liệu đã index', placeholder: true },
    { value: '480ms', label: 'p95 latency', placeholder: true },
    { value: '+31%', label: 'recall@10 vs baseline', placeholder: true },
  ],
};

export const LINGUIST_AI: CardCaseStudy = {
  kicker: 'LinguistAI — LLM + speech',
  title: 'Thi thử 4 kỹ năng tiếng Anh, chấm tự động',
  problem:
    'Luyện thi 4 kỹ năng bị nghẽn ở khâu chấm: nói và viết cần giáo viên, nên học viên phải chờ nhiều ngày mới có phản hồi.',
  approach:
    'Sinh đề đọc bằng LLM theo đúng định dạng đề thi, chấm phần nói bằng Whisper cộng một lớp đánh giá phát âm và trôi chảy, chấm viết bằng LLM với rubric cố định và phản hồi theo từng tiêu chí.',
  result:
    'Học viên nhận phản hồi chi tiết ngay sau khi nộp bài, giáo viên chỉ còn phải soát lại các bài mà hệ thống đánh dấu là không chắc chắn.',
  tech: ['GPT-4', 'Claude', 'Whisper', 'React'],
  metric: { value: '0,82', label: 'tương quan với giám khảo người', placeholder: true },
};

export const KIKI_ASR: CardCaseStudy = {
  kicker: 'KiKi (Zalo) — speech',
  title: 'Chuẩn hoá văn bản cho nhận dạng giọng nói tiếng Việt',
  problem:
    'Trợ lý ảo trên ô tô nghe sai những chuỗi mà người Việt đọc không theo mặt chữ: số, ngày tháng, đơn vị, tên đường và tên riêng.',
  approach:
    'Xây pipeline chuẩn hoá văn bản cho cả dữ liệu huấn luyện và đầu ra nhận dạng, mở rộng từ điển phát âm cho tên riêng, và dựng bộ đánh giá riêng cho từng nhóm lỗi thay vì chỉ nhìn WER tổng.',
  result:
    'Độ chính xác nhận dạng tăng 12%, và các nhóm lỗi liên quan tới số và địa danh giảm rõ rệt trên bộ đánh giá nội bộ.',
  tech: ['PyTorch', 'Kaldi', 'Python', 'Kubernetes'],
  metric: { value: '+12%', label: 'độ chính xác ASR', placeholder: false },
};
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run build`
Expected: PASS. The module is not imported anywhere yet, so this only proves the file is valid TypeScript and the build is green before you start changing rendered output.

- [ ] **Step 3: Verify placeholders are greppable**

Run: `grep -c "placeholder: true" src/data/ai-work.ts`
Expected: `7` — the six fabricated values (`AI_SYSTEMS_SHIPPED`, `RAG_PROOF`, and the three `NEXUS_AI.stats`, plus `LINGUIST_AI.metric`), plus one incidental match inside the header comment's own grep instruction.

Run: `grep -rn "placeholder: true" src/ --include=*.astro`
Expected: no output — no fabricated value has leaked into markup.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/data/ai-work.ts
git add src/data/ai-work.ts
git commit -m "feat: add quarantined AI case-study data module"
```

---

### Task 2: Hero rewritten around AI

**Files:**
- Modify: `src/components/Hero.astro`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: an anchor target `#case-study-ai` is *linked from* here; Task 8 creates it. The link will be dead until Task 8 lands — that is expected and acceptable mid-plan.

- [ ] **Step 1: Replace the component**

Replace the entire contents of `src/components/Hero.astro` with:

```astro
---
import TerminalWindow from '@components/TerminalWindow.astro';

const terminalLines = [
  '$ behitek --stack',
  '> llm         GPT-4 · Claude · fine-tune',
  '> retrieval   hybrid search · re-rank · eval',
  '> speech      Whisper · ASR · text normalization',
  '> serving     FastAPI · Docker · K8s',
];
---

<div class="rgrid grid grid-cols-[3fr_1fr] bg-bg">
  <div class="rpad border-r-2 border-ink px-12 pb-14 pt-[72px]">
    <div class="kicker mb-[18px]">hieu@behitek:~ $ whoami</div>
    <h1
      class="mb-2 font-heading text-[44px] font-extrabold leading-[1.02] tracking-tight text-ink md:text-[62px]"
    >
      Hiếu Nguyễn
    </h1>
    <div class="mb-5 font-heading text-2xl font-bold text-accent">
      AI Engineer · LLM · RAG · Speech · Hà Nội
    </div>
    <p
      class="mb-8 max-w-[720px] text-[17px] leading-relaxed text-neutral-700"
      style="text-wrap: pretty"
    >
      8 năm đưa AI từ nghiên cứu vào production: hệ thống RAG trên kho tài liệu doanh nghiệp, nhận
      dạng giọng nói tiếng Việt phục vụ người dùng thật, và hạ tầng chạy liên tục nhiều năm. Tôi làm
      cả phần mô hình lẫn phần giữ cho nó không sập.
    </p>
    <div class="rwrap flex gap-3.5">
      <a href="/contact" class="btn-primary gap-6">
        Trao đổi về dự án AI <span>→</span>
      </a>
      <a href="#case-study-ai" class="btn-secondary">Xem case study</a>
    </div>
  </div>
  <div class="flex flex-col gap-6 p-10">
    <img
      src="/images/me.png"
      alt="Hiếu Nguyễn"
      class="grayscale-photo block aspect-square w-full border-2 border-ink object-cover"
    />
    <TerminalWindow lines={terminalLines} />
  </div>
</div>
```

- [ ] **Step 2: Verify the build and the removed dependency**

Run: `npm run build`
Expected: PASS.

Run: `grep -c "organizations" src/components/Hero.astro`
Expected: `0` — the hero no longer depends on OJ data.

- [ ] **Step 3: Verify no OJ framing remains in the hero**

Run: `grep -niE "trường|online judge|luyencode|báo giá" src/components/Hero.astro`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/components/Hero.astro
git add src/components/Hero.astro
git commit -m "feat: reframe hero around AI in production"
```

---

### Task 3: StatBar reweighted to AI

**Files:**
- Modify: `src/components/StatBar.astro`

**Interfaces:**
- Consumes: `AI_SYSTEMS_SHIPPED: Metric` from `@/data/ai-work` (Task 1).
- Produces: nothing consumed downstream.

- [ ] **Step 1: Replace the component**

Replace the entire contents of `src/components/StatBar.astro` with:

```astro
---
import { TOTAL_PLATFORM_USERS } from '@/data/organizations';
import { AI_SYSTEMS_SHIPPED } from '@/data/ai-work';

const STATS = [
  { value: '8 năm', label: 'đưa AI vào production' },
  { value: AI_SYSTEMS_SHIPPED.value, label: AI_SYSTEMS_SHIPPED.label },
  { value: '4', label: 'giải quốc gia về AI & thuật toán' },
  { value: TOTAL_PLATFORM_USERS, label: 'người dùng trên hệ thống tôi vận hành' },
];
---

<div class="rgrid grid grid-cols-4 border-t-2 border-ink">
  {
    STATS.map((stat, i) => (
      <div class={`px-12 py-[22px] ${i < STATS.length - 1 ? 'border-r-2 border-ink' : ''}`}>
        <div class="font-heading text-[30px] font-extrabold text-ink">{stat.value}</div>
        <div class="font-mono text-xs leading-[1.5] text-neutral-600">{stat.label}</div>
      </div>
    ))
  }
</div>
```

Note: `ORGANIZATIONS` and `TOTAL_SUBMISSIONS` are no longer imported here. `TOTAL_SUBMISSIONS` stays in use on the OJ service page — do not delete it from `src/data/organizations.ts`.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: PASS. `astro check` would flag an unused import, so a green build also confirms the import list is exactly right.

Run: `grep -c "TOTAL_SUBMISSIONS" src/data/organizations.ts`
Expected: `1` — still exported, just no longer on the homepage.

- [ ] **Step 3: Commit**

```bash
npx prettier --write src/components/StatBar.astro
git add src/components/StatBar.astro
git commit -m "feat: reweight StatBar to three AI stats and one scale stat"
```

---

### Task 4: SkillsGrid rebuilt as three AI columns

**Files:**
- Modify: `src/components/SkillsGrid.astro`

**Interfaces:**
- Consumes: `RAG_PROOF`, `SPEECH_PROOF`, `PRODUCTION_PROOF` (all `ProofLine`) from `@/data/ai-work` (Task 1).
- Produces: nothing consumed downstream.

- [ ] **Step 1: Replace the component**

Replace the entire contents of `src/components/SkillsGrid.astro` with:

```astro
---
import { RAG_PROOF, SPEECH_PROOF, PRODUCTION_PROOF } from '@/data/ai-work';

interface Skill {
  title: string;
  areas: string;
  tech: string[];
  proof: string;
}

const SKILLS: Skill[] = [
  {
    title: 'LLM & RAG',
    areas: 'retrieval · agent · evaluation · fine-tune',
    tech: ['Python', 'LangGraph', 'ChromaDB', 'GPT-4', 'Claude'],
    proof: RAG_PROOF.text,
  },
  {
    title: 'Speech & NLP',
    areas: 'ASR · TTS · chuẩn hoá văn bản · phân loại',
    tech: ['PyTorch', 'Whisper', 'Transformers', 'Kaldi'],
    proof: SPEECH_PROOF.text,
  },
  {
    title: 'ML trong production',
    areas: 'serving · monitoring · tối ưu chi phí · hạ tầng',
    tech: ['FastAPI', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    proof: PRODUCTION_PROOF.text,
  },
];
---

<div class="rgrid grid grid-cols-3 border-2 border-ink bg-white">
  {
    SKILLS.map((skill, i) => (
      <div class={`flex flex-col p-7 ${i < SKILLS.length - 1 ? 'border-r-2 border-ink' : ''}`}>
        <h3 class="mb-2.5 font-heading text-[21px] font-bold leading-tight text-ink">
          {skill.title}
        </h3>
        <p class="mb-4 font-mono text-[13px] leading-[1.9] text-neutral-700">{skill.areas}</p>
        <div class="mb-5 flex flex-wrap gap-1.5">
          {skill.tech.map((t) => (
            <span class="tag-pill">{t}</span>
          ))}
        </div>
        <div class="mt-auto border-t-2 border-ink pt-3.5 font-heading text-[13px] font-bold leading-[1.5] text-accent">
          → {skill.proof}
        </div>
      </div>
    ))
  }
</div>
```

The card anatomy is byte-for-byte the previous markup; only the `SKILLS` data and the import changed.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: PASS.

Run: `grep -c "organizations" src/components/SkillsGrid.astro`
Expected: `0`.

- [ ] **Step 3: Commit**

```bash
npx prettier --write src/components/SkillsGrid.astro
git add src/components/SkillsGrid.astro
git commit -m "feat: rebuild Chuyên môn as three AI columns"
```

---

### Task 5: PipelineDiagram component

**Files:**
- Create: `src/components/PipelineDiagram.astro`

**Interfaces:**
- Consumes: type `PipelineStage` from `@/data/ai-work` (Task 1).
- Produces: `PipelineDiagram` with props `{ stages: PipelineStage[]; caption?: string }`. Task 8 renders it into `CaseStudySpotlight`'s `media` slot.

- [ ] **Step 1: Create the component**

Create `src/components/PipelineDiagram.astro`:

```astro
---
import type { PipelineStage } from '@/data/ai-work';

interface Props {
  stages: PipelineStage[];
  caption?: string;
}

const { stages, caption } = Astro.props;
---

<div class="flex h-full flex-col justify-center p-8">
  {
    caption && (
      <div class="mb-4 font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
        {caption}
      </div>
    )
  }
  {
    stages.map((stage, i) => (
      <div>
        <div class="border-2 border-ink bg-white px-4 py-3">
          <div class="font-mono text-[13px] font-semibold text-ink">{stage.label}</div>
          <div class="font-mono text-[11px] leading-[1.6] text-neutral-600">{stage.detail}</div>
        </div>
        {i < stages.length - 1 && (
          <div
            class="flex h-5 items-center justify-center font-mono text-[13px] text-accent"
            aria-hidden="true"
          >
            ↓
          </div>
        )}
      </div>
    ))
  }
</div>
```

Notes for the implementer: the diagram is intentionally a vertical stack at every width, so it needs no entry in the `@media (max-width: 900px)` block — it collapses correctly for free. `aria-hidden` on the arrow keeps a decorative glyph out of the accessibility tree; the stage labels alone read as a sensible sequence.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: PASS. Not yet rendered anywhere; this proves the props type resolves.

- [ ] **Step 3: Commit**

```bash
npx prettier --write src/components/PipelineDiagram.astro
git add src/components/PipelineDiagram.astro
git commit -m "feat: add PipelineDiagram for rendering architecture as boxes"
```

---

### Task 6: CaseStudySpotlight gains an optional media slot

The NexusAI case study has no screenshot and one must not be invented. This task lets the spotlight's right-hand column render arbitrary slot content instead of an `<img>`, without changing behaviour for the existing LCOJ usage.

**Files:**
- Modify: `src/components/CaseStudySpotlight.astro`

**Interfaces:**
- Consumes: nothing.
- Produces: `CaseStudySpotlight` accepts a named slot `media`. Precedence: if a `media` slot is supplied it wins over the `image` prop. All existing props (`kicker`, `title`, `description`, `stats`, `quote`, `attribution`, `image`, `links`) and the default slot keep their current behaviour.

- [ ] **Step 1: Add the slot detection**

In `src/components/CaseStudySpotlight.astro`, in the frontmatter, add a line directly below the existing `hasQuote` line:

```ts
const hasQuote = Boolean(quote && attribution);
const hasMedia = Astro.slots.has('media');
```

- [ ] **Step 2: Render the slot in the right-hand column**

Replace this block:

```astro
    <div class="flex flex-col bg-bg">
      {image && <img src={image} alt={title} class="block min-h-0 w-full flex-1 object-cover object-top" />}
      {
        hasQuote && (
          <div
            class={`p-8 ${image ? 'flex-none border-t-2 border-ink' : 'flex h-full flex-col justify-between'}`}
          >
```

with:

```astro
    <div class="flex flex-col bg-bg">
      {
        hasMedia ? (
          <div class="flex min-h-0 flex-1 flex-col">
            <slot name="media" />
          </div>
        ) : (
          image && (
            <img
              src={image}
              alt={title}
              class="block min-h-0 w-full flex-1 object-cover object-top"
            />
          )
        )
      }
      {
        hasQuote && (
          <div
            class={`p-8 ${image || hasMedia ? 'flex-none border-t-2 border-ink' : 'flex h-full flex-col justify-between'}`}
          >
```

Leave the rest of the file — the quote body, the `links` block, the trailing `<slot />` — untouched.

- [ ] **Step 3: Verify the existing usage is unaffected**

Run: `npm run build`
Expected: PASS.

Run: `grep -n "lcoj-home.png" dist/index.html`
Expected: a match. The homepage still renders the LCOJ screenshot, proving the `image` path is intact while no `media` slot is passed.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/components/CaseStudySpotlight.astro
git add src/components/CaseStudySpotlight.astro
git commit -m "feat: let CaseStudySpotlight render a media slot instead of an image"
```

---

### Task 7: CaseStudyCard component

**Files:**
- Create: `src/components/CaseStudyCard.astro`

**Interfaces:**
- Consumes: type `CardCaseStudy` from `@/data/ai-work` (Task 1).
- Produces: `CaseStudyCard` with props `CardCaseStudy & { borderRight?: boolean; mobileDivider?: boolean }` — i.e. `kicker`, `title`, `problem`, `approach`, `result`, `tech`, `metric`, plus the two optional border flags. Both flags default to `false`. Task 8 spreads a `CardCaseStudy` straight into it.

- [ ] **Step 1: Create the component**

Create `src/components/CaseStudyCard.astro`:

```astro
---
import type { CardCaseStudy } from '@/data/ai-work';

interface Props extends CardCaseStudy {
  borderRight?: boolean;
  mobileDivider?: boolean;
}

const {
  kicker,
  title,
  problem,
  approach,
  result,
  tech,
  metric,
  borderRight = false,
  mobileDivider = false,
} = Astro.props;

const ROWS = [
  { label: 'VẤN ĐỀ', text: problem },
  { label: 'CÁCH LÀM', text: approach },
  { label: 'KẾT QUẢ', text: result },
];
---

<div
  class={`flex flex-col bg-white p-7 ${borderRight ? 'border-r-2 border-ink' : ''} ${mobileDivider ? 'max-[899px]:border-b-2 max-[899px]:border-ink' : ''}`}
>
  <div class="mb-2.5 font-mono text-xs text-neutral-600">{kicker}</div>
  <h3 class="mb-4 font-heading text-[21px] font-bold leading-tight text-ink">{title}</h3>
  <dl class="m-0 mb-5">
    {
      ROWS.map((row) => (
        <div class="mb-3">
          <dt class="font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
            {row.label}
          </dt>
          <dd class="m-0 text-[14.5px] leading-relaxed text-neutral-700">{row.text}</dd>
        </div>
      ))
    }
  </dl>
  <div class="mb-5 flex flex-wrap gap-1.5">
    {tech.map((t) => <span class="tag-pill">{t}</span>)}
  </div>
  <div class="mt-auto flex items-baseline gap-2 border-t-2 border-ink pt-3.5">
    <span class="font-heading text-[26px] font-extrabold text-ink">{metric.value}</span>
    <span class="font-mono text-[11px] leading-[1.5] text-neutral-600">{metric.label}</span>
  </div>
</div>
```

The `mt-auto` on the metric row pins metrics to a common baseline across both cards even when the prose above differs in length — same technique `SkillsGrid` uses for its proof line.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
npx prettier --write src/components/CaseStudyCard.astro
git add src/components/CaseStudyCard.astro
git commit -m "feat: add CaseStudyCard for compact AI case studies"
```

---

### Task 8: Section 02 — Case study AI

The first task that changes what the homepage actually says. Sections are renumbered here so the page stays internally consistent after each commit: the old `02 / Dịch vụ` becomes the new `02 / Case study AI`, and the old `03 / Case study nổi bật` block is moved below it untouched for now (Task 9 reframes it).

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `NEXUS_AI`, `NEXUS_PIPELINE`, `LINGUIST_AI`, `KIKI_ASR` from `@/data/ai-work` (Task 1); `PipelineDiagram` (Task 5); the `media` slot (Task 6); `CaseStudyCard` (Task 7).
- Produces: the anchor `id="case-study-ai"` that Task 2's hero button targets.

- [ ] **Step 1: Add the imports**

In the frontmatter of `src/pages/index.astro`, add below the existing `BlogCard` import:

```ts
import CaseStudyCard from '@components/CaseStudyCard.astro';
import PipelineDiagram from '@components/PipelineDiagram.astro';
```

and below the existing `@/data/organizations` import block:

```ts
import { NEXUS_AI, NEXUS_PIPELINE, LINGUIST_AI, KIKI_ASR } from '@/data/ai-work';
```

- [ ] **Step 2: Settle the final section order**

This step establishes the order all later tasks assume, so do the moves and the renumbering together — leaving the page half-renumbered would produce duplicate section numbers.

Cut the entire existing `<section class="p-12">` block containing `02 /` and `Dịch vụ` (including its `<div class="rgrid grid grid-cols-3 border-2 border-ink">` and the `SERVICES.map` inside) out of its current position, and paste it back directly *after* the LCOJ section — that is its final home. Then renumber three kickers:

- the moved Dịch vụ section: `02 /` → `04 /`
- the Dự án section: `04 /` → `05 /`
- the Viết & nghiên cứu section: `05 /` → `06 /`

The LCOJ section keeps `03 /`; Task 9 rewrites its heading and copy.

After this step the body order is: Hero, StatBar, CareerStrip, AwardsBand, 01 Chuyên môn, 02 Case study AI, 03 (LCOJ), 04 Dịch vụ, 05 Dự án, 06 Viết & nghiên cứu, CTA.

In the gap left by the Dịch vụ block — directly after the `01 / Chuyên môn` section — insert:

```astro
  <section id="case-study-ai" class="px-12 pb-14">
    <div class="mb-7 flex items-baseline gap-4">
      <span class="kicker">02 /</span>
      <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Case study AI</h2>
    </div>
    <CaseStudySpotlight
      kicker={NEXUS_AI.kicker}
      title={NEXUS_AI.title}
      description={NEXUS_AI.description}
      stats={NEXUS_AI.stats}
    >
      <PipelineDiagram slot="media" stages={NEXUS_PIPELINE} caption="KIẾN TRÚC" />
    </CaseStudySpotlight>
    <div class="rgrid mt-7 grid grid-cols-2 border-2 border-ink">
      <CaseStudyCard {...LINGUIST_AI} borderRight mobileDivider />
      <CaseStudyCard {...KIKI_ASR} />
    </div>
  </section>
```

Note on the `01 / Chuyên môn` section: it currently carries `class="p-12 pb-0"` and the section that followed it supplied the bottom padding. Change it to `class="px-12 pb-14 pt-12"` so it owns its own spacing now that a different section follows.

- [ ] **Step 3: Verify the build and the anchor**

Run: `npm run build`
Expected: PASS.

Run: `grep -c 'id="case-study-ai"' dist/index.html`
Expected: `1` — the hero's `#case-study-ai` button now resolves.

- [ ] **Step 4: Verify the diagram rendered instead of an image**

Run: `grep -c "hybrid retrieval" dist/index.html`
Expected: `1`.

Run: `grep -c "grounded answer" dist/index.html`
Expected: `1`.

- [ ] **Step 5: Verify the section numbering**

Run: `grep -o '0[0-9] /' dist/index.html`
Expected, in this exact order and with no repeats:

```
01 /
02 /
03 /
04 /
05 /
06 /
```

A duplicate or out-of-order number means the cut-and-paste or the renumbering in Step 2 went wrong — fix before committing.

- [ ] **Step 6: Commit**

```bash
npx prettier --write src/pages/index.astro
git add src/pages/index.astro
git commit -m "feat: add AI case study section with RAG pipeline diagram"
```

---

### Task 9: Section 03 — reframe LCOJ as a system in operation

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `ORGANIZATIONS`, `DEPLOYMENTS`, `TOTAL_ORG_MEMBERS`, `TOTAL_PLATFORM_USERS` — all already imported in this file.
- Produces: nothing consumed downstream.

- [ ] **Step 1: Rewrite the section**

Replace the whole `flagshipProject && (...)` section with:

```astro
  {
    flagshipProject && (
      <section class="px-12 pb-14">
        <div class="mb-7 flex items-baseline gap-4">
          <span class="kicker">03 /</span>
          <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">
            Hệ thống đang vận hành
          </h2>
        </div>
        <CaseStudySpotlight
          kicker="luyencode.net — LCOJ"
          title="Online judge tôi tự xây và vận hành liên tục từ 2020"
          description="Hệ thống chấm bài tự động cho học sinh Việt Nam: tôi viết, triển khai, và trực tiếp vận hành nó suốt 5 năm qua — không có team hạ tầng đứng sau, không có ngân sách marketing. Số tổ chức dùng nó tăng lên hoàn toàn bằng truyền miệng. Đây là phần bằng chứng cho việc tôi không chỉ xây được hệ thống mà còn giữ cho nó chạy."
          image="/images/project/lcoj-home.png"
          stats={[
            { value: TOTAL_PLATFORM_USERS, label: 'người dùng' },
            { value: `${ORGANIZATIONS.length}+`, label: 'trường & tổ chức' },
            { value: '2020', label: 'vận hành liên tục' },
          ]}
          links={DEPLOYMENTS.map((d) => ({ label: d.name, href: d.url }))}
        >
          <div class="border-t-2 border-ink p-8">
            <div class="rwrap mb-4 flex items-baseline justify-between gap-4">
              <div class="font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
                {ORGANIZATIONS.length} TRƯỜNG & TỔ CHỨC ĐANG SỬ DỤNG —{' '}
                {TOTAL_ORG_MEMBERS.toLocaleString('vi-VN')} THÀNH VIÊN
              </div>
              <a
                href="/services"
                class="flex-none font-mono text-[13px] font-semibold text-ink no-underline hover:text-accent"
              >
                Dịch vụ triển khai →
              </a>
            </div>
            <OrgRoster />
          </div>
        </CaseStudySpotlight>
      </section>
    )
  }
```

The heading, title, and description are the reframe; the stats, image, deployment links, and `OrgRoster` are carried over unchanged. The only structural addition is the `Dịch vụ triển khai →` link, which points at `/services` — the actual OJ service route.

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: PASS.

Run: `grep -c "Hệ thống đang vận hành" dist/index.html`
Expected: `1`.

Run: `grep -c "Case study nổi bật" dist/index.html`
Expected: `0`.

- [ ] **Step 3: Verify the service link points at a real route**

Run: `test -f dist/services/index.html && echo ROUTE_OK`
Expected: `ROUTE_OK`.

Run: `grep -c "/services/online-judge" dist/index.html`
Expected: `1` — the single permitted occurrence is the display-only `path` text on the OJ service card. If this returns `2`, a real link to the non-existent route was added; remove it.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/pages/index.astro
git add src/pages/index.astro
git commit -m "feat: reframe LCOJ from product on sale to system in operation"
```

---

### Task 10: Sections 04–06 and the CTA

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: everything already in the file.
- Produces: the final section order. Nothing downstream.

- [ ] **Step 1: Reorder the SERVICES array**

Replace the `SERVICES` constant in the frontmatter with:

```ts
const SERVICES = [
  {
    href: '/services/ai',
    path: '/services/ai',
    title: 'Dự án AI',
    description:
      'RAG, LLM, NLP — từ PoC đến production. Tư vấn kiến trúc, xây dựng và tối ưu hệ thống AI.',
    bullets: [
      'Chatbot / trợ lý nghiệp vụ',
      'Tìm kiếm ngữ nghĩa, RAG',
      'Fine-tune, đánh giá mô hình',
    ],
    flagship: true,
  },
  {
    href: '/services/software',
    path: '/services/software',
    title: 'Phần mềm full-stack',
    description:
      'Web app, API, hạ tầng — thiết kế và phát triển trọn gói từ ý tưởng đến triển khai.',
    bullets: ['FastAPI · Django · React', 'Docker, CI/CD, self-host', 'Tối ưu chi phí hạ tầng'],
  },
  {
    href: '/services',
    path: '/services/online-judge',
    title: 'Online Judge (DMOJ)',
    description:
      'Từ tổ chức miễn phí trên luyencode.net đến triển khai riêng trên VPS — 2 cách bắt đầu cho trường học và trung tâm dạy lập trình.',
    bullets: ['Cài đặt, tùy biến giao diện', 'Ngân hàng đề, contest', 'Backup, giám sát, hỗ trợ'],
    borderRight: false,
  },
];
```

Only the order and the `flagship` / `borderRight` flags changed. `flagship: true` moved from the OJ card to the AI card; `borderRight: false` moved to whichever card is now last.

- [ ] **Step 2: Replace the project list constant**

NexusAI and LinguistAI are now full case studies in section 02, so listing them again as mini cards duplicates them. Replace:

```ts
const AI_FIRST_ORDER = ['nexusai', 'linguistai', 'behivest', 'beli5'];
const otherProjects = AI_FIRST_ORDER.map((id) => allProjects.find((p) => p.data.id === id)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);
```

with:

```ts
const OTHER_PROJECT_ORDER = ['behivest', 'beli5'];
const otherProjects = OTHER_PROJECT_ORDER.map((id) =>
  allProjects.find((p) => p.data.id === id)
).filter((p): p is NonNullable<typeof p> => Boolean(p));
```

- [ ] **Step 3: Finish the Dịch vụ and Dự án sections**

Task 8 already moved these blocks into their final positions and renumbered their kickers, so this step only adjusts what is inside them.

The Dịch vụ section should already read exactly like this — verify it does, and fix the `class` if the moved block still carries its old `p-12`:

```astro
  <section class="px-12 pb-14">
    <div class="mb-7 flex items-baseline gap-4">
      <span class="kicker">04 /</span>
      <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Dịch vụ</h2>
    </div>
    <div class="rgrid grid grid-cols-3 border-2 border-ink">
      {SERVICES.map((service) => <ServiceCard {...service} />)}
    </div>
  </section>
```

The Dự án section gets a renamed heading (`Dự án` → `Dự án khác`) and corrected border maths for a two-card row. It becomes:

```astro
  {
    otherProjects.length > 0 && (
      <section class="px-12 pb-14">
        <div class="mb-7 flex items-baseline justify-between">
          <div class="flex items-baseline gap-4">
            <span class="kicker">05 /</span>
            <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Dự án khác</h2>
          </div>
          <a
            href="/projects"
            class="font-mono text-[13px] font-semibold text-ink no-underline hover:text-accent"
          >
            ls ./projects →
          </a>
        </div>
        <div class="rgrid grid grid-cols-2 border-2 border-ink">
          {otherProjects.map((project, i) => (
            <ProjectMiniCard
              title={project.data.title}
              description={project.data.description}
              tech={project.data.tech}
              status={project.data.status}
              href={project.data.links?.website}
              borderRight={i % 2 === 0}
              borderBottom={false}
              mobileDivider={i === 0}
            />
          ))}
        </div>
      </section>
    )
  }
```

With two projects the border maths is: index 0 gets the right border and the mobile-only bottom divider, index 1 gets neither, and neither gets a bottom border since there is only one row.

The blog section needs no change here — Task 8 already renumbered its kicker to `06 /`.

- [ ] **Step 4: Rewrite the CTA**

Replace the `CTABand` usage at the end of the page with:

```astro
  <CTABand
    kicker="$ ./contact --ai-project"
    title="Có bài toán AI cần đưa vào production? Cùng bàn từ kiến trúc tới vận hành."
    buttonLabel="Trao đổi về dự án"
    size="lg"
    showEmail
  />
```

- [ ] **Step 5: Verify the section order**

Run: `npm run build`
Expected: PASS.

Run: `grep -o '0[0-9] /' dist/index.html`
Expected, in this exact order:

```
01 /
02 /
03 /
04 /
05 /
06 /
```

Any duplicate or out-of-order number means a block was pasted in the wrong place.

- [ ] **Step 6: Verify the AI service is now flagship**

Run: `grep -n "flagship: true" src/pages/index.astro`
Expected: exactly one match, and its line number falls inside the first service entry (the one with `href: '/services/ai'`) — i.e. above the line matched by `grep -n "'/services/software'" src/pages/index.astro`. Confirm both line numbers and check the ordering yourself; do not assume.

Run: `grep -c "CHỦ LỰC" dist/index.html`
Expected: `1` — exactly one card is badged. Which card it is gets confirmed visually in Task 11.

- [ ] **Step 7: Verify no duplicated projects**

Run: `grep -c "NexusAI" dist/index.html`
Expected: `1` — it appears in the case study section only, not also as a mini card.

Run: `grep -c "LinguistAI" dist/index.html`
Expected: `1`.

- [ ] **Step 8: Commit**

```bash
npx prettier --write src/pages/index.astro
git add src/pages/index.astro
git commit -m "feat: demote services below proof, dedupe projects, reframe CTA"
```

---

### Task 11: Whole-page verification

No code changes unless a defect is found. This is the gate that decides whether the page actually reads as an AI engineer's homepage.

**Files:**
- Modify: only files with defects found during this task.

**Interfaces:**
- Consumes: the finished page.
- Produces: nothing.

- [ ] **Step 1: Clean build**

```bash
rm -rf dist && npm run build
```

Expected: PASS with no `astro check` errors or warnings.

- [ ] **Step 2: Confirm placeholder quarantine**

Run: `grep -rn "placeholder: true" src/ | grep -v "src/data/ai-work.ts"`
Expected: no output. Every fabricated value is still confined to the data module.

Run: `grep -rn "1,2M\|480ms\|+31%\|0,82" src/ --include=*.astro`
Expected: no output. No fabricated figure was hardcoded into markup.

- [ ] **Step 3: Confirm formatting**

Run: `npx prettier --check src/pages/index.astro src/components/Hero.astro src/components/StatBar.astro src/components/SkillsGrid.astro src/components/CaseStudySpotlight.astro src/components/CaseStudyCard.astro src/components/PipelineDiagram.astro src/data/ai-work.ts`
Expected: `All matched files use Prettier code style!`

- [ ] **Step 4: Visual check at desktop width**

```bash
npm run preview
```

Open `http://localhost:4321` at a 1440px viewport and confirm:
- No horizontal scrollbar on `<body>`.
- Every bordered grid has clean seams — no doubled 2px borders where two bordered blocks meet, no missing right border in the middle of a row.
- In section 02, the pipeline diagram fills the spotlight's right-hand column and is vertically centred; the two case study cards below have their metric rows aligned on a common baseline.
- In section 04, the `CHỦ LỰC` badge and the 4px accent top border are on the **Dự án AI** card.

- [ ] **Step 5: Visual check at mobile width**

At a 375px viewport confirm:
- No horizontal overflow anywhere.
- Every `.rgrid` has collapsed to a single column with no orphaned right borders.
- The two case study cards are separated by the mobile-only bottom divider.
- The hero's `Xem case study` button scrolls to section 02.

- [ ] **Step 6: Read the page as a stranger**

Read the homepage top to bottom and answer honestly: what does a first-time visitor conclude this person does? The intended answer is "an AI engineer who ships and operates production systems", with the online judge reading as evidence of durability rather than as the product on sale. If any band still pulls toward "online judge vendor", note it and fix it before finishing.

- [ ] **Step 7: Commit any fixes**

```bash
npx prettier --write <changed files>
git add <changed files>
git commit -m "fix: <specific defect found during whole-page verification>"
```

If no defects were found, skip this step — do not create an empty commit.

---

## Handoff notes

Before this branch can merge to `main`, Hieu must replace these six placeholder values in `src/data/ai-work.ts` (the seventh row below is listed for completeness — `KIKI_ASR`'s number is already real):

| Constant | Field | What is needed |
|----------|-------|----------------|
| `AI_SYSTEMS_SHIPPED` | `value` | Real count of AI systems shipped to production |
| `RAG_PROOF` | `text` | Real NexusAI retrieval-quality result |
| `NEXUS_AI.stats[0]` | `value` | Real corpus size |
| `NEXUS_AI.stats[1]` | `value` | Real p95 latency |
| `NEXUS_AI.stats[2]` | `value` | Real retrieval-quality lift |
| `LINGUIST_AI.metric` | `value` | Real scoring accuracy or human-rater agreement |
| `KIKI_ASR` | — | `+12%` is real; only the surrounding prose needs a factual pass |

Also outstanding: NexusAI's client context is currently anonymized ("khách hàng doanh nghiệp"). If the client can be named, that materially strengthens the case study.

After replacing each value, flip its `placeholder` flag to `false`. `grep -rn "placeholder: true" src/` returning no output is the merge gate.
