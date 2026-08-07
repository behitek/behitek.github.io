# Homepage Declutter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut the homepage down to a high-level frontpage (Hero, StatBar, a unified project teaser, a trimmed services teaser, a blog teaser, CTA) by removing content that already lives in full on `/about`, `/projects`, and `/services`, and relocating the AI case-study content that has nowhere else to live into `/services/ai.astro`.

**Architecture:** `src/pages/index.astro` drops three components (`CareerStrip`, `AwardsBand`, `SkillsGrid` — all deleted, unused elsewhere) and replaces its "Case study AI" + "Hệ thống đang vận hành" + "Dự án khác" sections with one section that reads `getCollection('projects')` directly and renders every entry through `ProjectMiniCard` (which gains a `flagship` prop for the one `flagship: true` entry). `ServiceCard` gets bullets made optional so the "Dịch vụ" teaser can drop to a one-line pitch. The case-study content that's cut (`CaseStudySpotlight` + `PipelineDiagram` for NexusAI, `CaseStudyCard` for LinguistAI/KiKi) moves as-is into a new section on `/services/ai.astro`, which currently has no proof content at all. `src/data/ai-work.ts` loses its now-unused `ProofLine` exports (`RAG_PROOF`, `SPEECH_PROOF`, `PRODUCTION_PROOF`), folding their facts as sentences into `NEXUS_AI.description` and `KIKI_ASR.result` instead.

**Tech Stack:** Astro 4 (static), TailwindCSS 3, TypeScript strict. No UI framework, no test framework.

## Global Constraints

- **THERE IS NO TEST SUITE IN THIS REPO.** Do not create one, do not install a test framework. The only automated gate is `npm run build` (runs `astro check` then `astro build`). Every task's verification is `npm run build` plus targeted `grep` assertions against `dist/`.
- Run `npx prettier --write <files>` on every file you touch before committing. There is no `format` npm script; invoke prettier directly.
- Design system is fixed: sharp corners, 2px `border-ink` borders, `font-mono` for labels/kickers, `accent` (`#ec3013`) for emphasis. No `dark:` classes exist in `src/` — do not add any.
- Responsive collapsing uses the `.rgrid` / `.rwrap` / `.rpad` helper classes in the single `@media (max-width: 900px)` block in `src/styles/global.css`, plus the `max-[899px]:border-b-2 max-[899px]:border-ink` mobile-divider pattern already used in `ProjectMiniCard.astro`/`CaseStudyCard.astro`. Do not add new per-component Tailwind breakpoint variants.
- All user-facing copy is Vietnamese.
- Every figure in `src/data/ai-work.ts` is already real (no `placeholder: true` values exist in the current file) — this plan is a content-relocation/de-duplication pass, not a fabricate-then-replace pass. Do not invent new numbers.
- These figures are REAL and must be reproduced verbatim wherever they appear: `+12%` ASR accuracy (KiKi/Zalo), `−15%` service errors on Kubernetes (Zalo), Giải Nhất ALQAC 2022 (Legal QA).
- Import aliases: `@/*` → `src/*`, `@components/*`, `@layouts/*`, `@utils/*`, `@styles/*`.

---

## File Structure

**Modify**

| File | Change |
|------|--------|
| `src/components/ProjectMiniCard.astro` | Add optional `flagship` prop (accent top border + "CHỦ LỰC" badge). |
| `src/components/ServiceCard.astro` | Make `bullets` optional; skip rendering the `<ul>` when empty. |
| `src/components/Hero.astro` | Second CTA repoints from `#case-study-ai` to `#projects`, label changes to "Xem dự án". |
| `src/pages/index.astro` | Drop `CareerStrip`, `AwardsBand`, `SkillsGrid`, the case-study section, the LCOJ spotlight, and the old "Dự án khác" section. Add one unified `Dự án` section over `getCollection('projects')`. Trim `SERVICES` bullets to one-liners. Renumber remaining sections 01–03. |
| `src/data/ai-work.ts` | Remove `ProofLine` interface and `RAG_PROOF`/`SPEECH_PROOF`/`PRODUCTION_PROOF`. Fold their text into `NEXUS_AI.description` and `KIKI_ASR.result`. |
| `src/pages/services/ai.astro` | Add a numbered `02 / Case study` section (`CaseStudySpotlight` + `PipelineDiagram` for NexusAI, two `CaseStudyCard`s for LinguistAI/KiKi). Number the existing feature-grid and process-steps sections `01 /` and `03 /` for consistency. Repoint the hero's "Xem case study" CTA to the new in-page anchor. |

**Delete**

| File | Why |
|------|-----|
| `src/components/CareerStrip.astro` | Restates `/about`'s career timeline; confirmed unused outside `index.astro`. |
| `src/components/AwardsBand.astro` | Restates `/about`'s award list; confirmed unused outside `index.astro`. |
| `src/components/SkillsGrid.astro` | Restates `/about`'s skill tags; confirmed unused outside `index.astro`. |

**Do not touch:** `/about`, `/projects`, `/services/index.astro`, `/services/software.astro`, `OrgRoster.astro` (keeps its existing `/services/index.astro` usage, loses only the homepage one), `CaseStudySpotlight.astro`, `PipelineDiagram.astro`, `CaseStudyCard.astro` (all three are relocated, not edited), `StatBar.astro`, `BlogCard.astro`, `CTABand.astro`, `src/content/**`, the design-token/CSS system.

---

### Task 1: Rebuild the homepage as a unified, de-duplicated frontpage

**Files:**
- Modify: `src/components/ProjectMiniCard.astro`
- Modify: `src/components/ServiceCard.astro`
- Modify: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`
- Delete: `src/components/CareerStrip.astro`, `src/components/AwardsBand.astro`, `src/components/SkillsGrid.astro`

**Interfaces:**
- Consumes: `getCollection('projects')` (existing, from `astro:content`); `ServiceCard`, `ProjectMiniCard`, `StatBar`, `Hero`, `BlogCard`, `CTABand` (all existing).
- Produces: `ProjectMiniCard` accepts an optional `flagship?: boolean` prop (default `false`). `ServiceCard` accepts `bullets?: string[]` (default `[]`, was required). The homepage's project section gets `id="projects"`, which `Hero.astro`'s second CTA now targets.

- [x] **Step 1: Add the `flagship` prop to `ProjectMiniCard`**

Replace the entire contents of `src/components/ProjectMiniCard.astro` with:

```astro
---
interface Props {
  title: string;
  description: string;
  tech: string[];
  status: 'open-source' | 'private';
  href?: string;
  flagship?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  mobileDivider?: boolean;
}

const {
  title,
  description,
  tech,
  status,
  href,
  flagship = false,
  borderRight = false,
  borderBottom = false,
  mobileDivider = false,
} = Astro.props;
const statusLabel = status === 'open-source' ? 'OPEN SOURCE' : 'PRIVATE';
---

<div
  class={`p-7 bg-white ${flagship ? 'border-t-4 border-t-accent' : ''} ${borderRight ? 'border-r-2 border-ink' : ''} ${borderBottom ? 'border-b-2 border-ink' : ''} ${mobileDivider ? 'max-[899px]:border-b-2 max-[899px]:border-ink' : ''}`}
>
  <div class="mb-3 flex items-center justify-between">
    <span class="border border-ink px-[7px] py-0.5 font-mono text-[10px] font-semibold text-ink">
      {statusLabel}
    </span>
    {
      flagship && (
        <span class="bg-accent px-[7px] py-[3px] font-mono text-[10px] font-semibold text-bg">
          CHỦ LỰC
        </span>
      )
    }
  </div>
  <h3 class="mb-2.5 font-heading text-[21px] font-bold leading-tight text-ink">{title}</h3>
  <p class="mb-4 text-sm leading-relaxed text-neutral-700">{description}</p>
  <div class="mb-4 flex flex-wrap gap-1.5">
    {tech.map((t) => <span class="tag-pill">{t}</span>)}
  </div>
  {
    href && (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        class="font-heading text-[13px] font-bold text-accent no-underline"
      >
        Xem chi tiết →
      </a>
    )
  }
</div>
```

This is byte-for-byte the previous card markup plus the `flagship` branch in the header row and the matching border class. The `justify-between` header row already degrades correctly to a single child when `flagship` is `false` — no layout change for non-flagship cards.

- [x] **Step 2: Make `ServiceCard`'s bullets optional**

In `src/components/ServiceCard.astro`, replace:

```astro
interface Props {
  href: string;
  path: string;
  title: string;
  description: string;
  bullets: string[];
  flagship?: boolean;
  borderRight?: boolean;
}

const { href, path, title, description, bullets, flagship = false, borderRight = true } = Astro.props;
```

with:

```astro
interface Props {
  href: string;
  path: string;
  title: string;
  description: string;
  bullets?: string[];
  flagship?: boolean;
  borderRight?: boolean;
}

const {
  href,
  path,
  title,
  description,
  bullets = [],
  flagship = false,
  borderRight = true,
} = Astro.props;
```

Then replace:

```astro
  <ul class="font-mono text-[13px] leading-[1.9] text-ink mb-4 pl-0 list-none">
    {bullets.map((b) => <li>› {b}</li>)}
  </ul>
```

with:

```astro
  {
    bullets.length > 0 && (
      <ul class="font-mono text-[13px] leading-[1.9] text-ink mb-4 pl-0 list-none">
        {bullets.map((b) => <li>› {b}</li>)}
      </ul>
    )
  }
```

- [x] **Step 3: Repoint Hero's second CTA**

In `src/components/Hero.astro`, replace:

```astro
      <a href="#case-study-ai" class="btn-secondary">Xem case study</a>
```

with:

```astro
      <a href="#projects" class="btn-secondary">Xem dự án</a>
```

- [x] **Step 4: Rewrite `index.astro`**

Replace the entire contents of `src/pages/index.astro` with:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '@layouts/BaseLayout.astro';
import Hero from '@components/Hero.astro';
import StatBar from '@components/StatBar.astro';
import ServiceCard from '@components/ServiceCard.astro';
import ProjectMiniCard from '@components/ProjectMiniCard.astro';
import BlogCard from '@components/BlogCard.astro';
import CTABand from '@components/CTABand.astro';
import { SITE } from '@utils/constants';
import { readingTime } from '@utils/helpers';

const sortedProjects = (await getCollection('projects')).sort(
  (a, b) => a.data.order - b.data.order
);

const allPosts = await getCollection('blog', ({ data }) => data.draft !== true);
const recentPosts = allPosts
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

const SERVICES = [
  {
    href: '/services/ai',
    path: '/services/ai',
    title: 'Dự án AI',
    description: 'RAG, LLM, NLP — từ PoC đến production, tư vấn kiến trúc và tối ưu hệ thống AI.',
    flagship: true,
  },
  {
    href: '/services/software',
    path: '/services/software',
    title: 'Phần mềm full-stack',
    description:
      'Web app, API, hạ tầng — thiết kế và phát triển trọn gói từ ý tưởng đến triển khai.',
  },
  {
    href: '/services',
    path: '/services/online-judge',
    title: 'Online Judge (DMOJ)',
    description:
      'Triển khai & vận hành online judge cho trường học và trung tâm dạy lập trình.',
    borderRight: false,
  },
];
---

<BaseLayout title="Trang chủ" description={SITE.description}>
  <Hero />
  <StatBar />

  <section id="projects" class="px-12 pb-14 pt-12">
    <div class="mb-7 flex items-baseline justify-between">
      <div class="flex items-baseline gap-4">
        <span class="kicker">01 /</span>
        <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Dự án</h2>
      </div>
      <a
        href="/projects"
        class="font-mono text-[13px] font-semibold text-ink no-underline hover:text-accent"
      >
        ls ./projects →
      </a>
    </div>
    <div class="rgrid grid grid-cols-3 border-2 border-ink">
      {
        sortedProjects.map((project, i) => {
          const isLastInRow = (i + 1) % 3 === 0 || i === sortedProjects.length - 1;
          const isLastRow = i >= sortedProjects.length - (sortedProjects.length % 3 || 3);
          return (
            <ProjectMiniCard
              title={project.data.title}
              description={project.data.description}
              tech={project.data.tech}
              status={project.data.status}
              href={project.data.links?.website}
              flagship={project.data.flagship}
              borderRight={!isLastInRow}
              borderBottom={!isLastRow}
              mobileDivider={isLastRow && !isLastInRow}
            />
          );
        })
      }
    </div>
  </section>

  <section class="px-12 pb-14">
    <div class="mb-7 flex items-baseline gap-4">
      <span class="kicker">02 /</span>
      <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Dịch vụ</h2>
    </div>
    <div class="rgrid grid grid-cols-3 border-2 border-ink">
      {SERVICES.map((service) => <ServiceCard {...service} />)}
    </div>
  </section>

  {
    recentPosts.length > 0 && (
      <section class="px-12 pb-14">
        <div class="mb-5 flex items-baseline justify-between">
          <div class="flex items-baseline gap-4">
            <span class="kicker">03 /</span>
            <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Viết & nghiên cứu</h2>
          </div>
          <a
            href="/blog"
            class="font-mono text-[13px] font-semibold text-ink no-underline hover:text-accent"
          >
            ls ./blog →
          </a>
        </div>
        <div class="border-t-2 border-ink">
          {recentPosts.map((post) => (
            <BlogCard
              variant="compact"
              title={post.data.title}
              description={post.data.description}
              date={post.data.date}
              category={post.data.category}
              language={post.data.language}
              slug={post.slug}
              readingTime={readingTime(post.body)}
            />
          ))}
        </div>
      </section>
    )
  }

  <CTABand
    kicker="$ ./contact --ai-project"
    title="Có bài toán AI cần đưa vào production? Cùng bàn từ kiến trúc tới vận hành."
    buttonLabel="Trao đổi về dự án"
    size="lg"
    showEmail
  />
</BaseLayout>
```

Note on the grid-border math: `sortedProjects` currently has 5 entries (`lcoj` order 1, `behivest` order 2, `beli5` order 3, `nexusai` order 4, `linguistai` order 5) rendered in a 3-column grid, so row 0 is indices 0–2 and row 1 is indices 3–4. `isLastInRow`/`isLastRow` are computed generically (not hardcoded to 5) so the layout keeps working if a project is added or removed later — verify the visual result in Task 4 regardless.

- [x] **Step 5: Delete the three orphaned components**

```bash
rm src/components/CareerStrip.astro src/components/AwardsBand.astro src/components/SkillsGrid.astro
```

- [x] **Step 6: Verify the build**

Run: `npm run build`
Expected: PASS.

- [x] **Step 7: Verify the deleted components have no remaining references**

Run: `grep -rn "CareerStrip\|AwardsBand\|SkillsGrid" src/`
Expected: no output.

- [x] **Step 8: Verify the removed sections are gone and the new one is present**

Run: `grep -c "Hệ thống đang vận hành\|Case study AI\|Dự án khác\|Chuyên môn" dist/index.html`
Expected: `0`.

Run: `grep -c 'id="projects"' dist/index.html`
Expected: `1`.

Run: `grep -c "CHỦ LỰC" dist/index.html`
Expected: `1` — exactly the LCOJ card.

- [x] **Step 9: Verify the section numbering**

Run: `grep -o '0[0-9] /' dist/index.html`
Expected, in this exact order:

```
01 /
02 /
03 /
```

- [x] **Step 10: Verify no duplicate project listings**

Run: `grep -c "NexusAI" dist/index.html`
Expected: `1` — it now appears only once, as a project-grid card (previously it could appear both there and in a case-study section).

Run: `grep -c "LinguistAI" dist/index.html`
Expected: `1`.

- [x] **Step 11: Commit**

```bash
npx prettier --write src/components/ProjectMiniCard.astro src/components/ServiceCard.astro src/components/Hero.astro src/pages/index.astro
git add -A src/components/ProjectMiniCard.astro src/components/ServiceCard.astro src/components/Hero.astro src/pages/index.astro src/components/CareerStrip.astro src/components/AwardsBand.astro src/components/SkillsGrid.astro
git commit -m "feat: declutter homepage into a unified project grid, drop about/services duplication"
```

---

### Task 2: Trim `ai-work.ts` down to what the case-study section still needs

**Files:**
- Modify: `src/data/ai-work.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Metric`, `PipelineStage`, `SpotlightCaseStudy`, `CardCaseStudy` (types); `COMPANIES_SHIPPED_AT`, `NEXUS_PIPELINE`, `NEXUS_AI`, `LINGUIST_AI`, `KIKI_ASR` (values). The `ProofLine` type and `RAG_PROOF`/`SPEECH_PROOF`/`PRODUCTION_PROOF` values are removed — Task 3 depends on their removal already having happened, since it imports only the five names above.

- [x] **Step 1: Replace the file**

Replace the entire contents of `src/data/ai-work.ts` with:

```ts
/**
 * All figures below are real, sourced from the site owner's resume. The
 * NEXUS_PIPELINE stages restate the architecture already described in
 * src/content/projects/nexusai.json ("vector embedding tùy biến, hybrid
 * search, re-rank bằng LLM").
 */

/** A single headline number with its caption. */
export interface Metric {
  value: string;
  label: string;
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

export const COMPANIES_SHIPPED_AT: Metric = {
  value: '3',
  label: 'công ty đưa AI vào sản phẩm thực tế',
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
    'Khách hàng doanh nghiệp có kho tài liệu nội bộ nhiều năm nhưng tìm kiếm theo từ khoá gần như vô dụng: câu hỏi nghiệp vụ không khớp từ khoá, và nội dung nằm rải rác trong cả văn bản lẫn ảnh chụp và video. Tôi xây hệ thống RAG với embedding tùy biến cho từng loại nội dung, hybrid search kết hợp BM25 và vector, re-rank bằng LLM, và câu trả lời luôn kèm trích dẫn để người dùng kiểm chứng được nguồn. Kinh nghiệm RAG này cũng là nền cho nghiên cứu Legal QA mà tôi đồng tác giả, giành Giải Nhất ALQAC 2022.',
  stats: [
    { value: '3', label: 'loại nội dung: văn bản, ảnh, video', placeholder: false },
    { value: 'Hybrid', label: 'search: BM25 + vector + re-rank LLM', placeholder: false },
    { value: 'Có', label: 'trích dẫn nguồn trong mọi câu trả lời', placeholder: false },
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
  metric: { value: '4 kỹ năng', label: 'chấm tự động, phản hồi tức thì', placeholder: false },
};

export const KIKI_ASR: CardCaseStudy = {
  kicker: 'KiKi (Zalo) — speech',
  title: 'Chuẩn hoá văn bản cho nhận dạng giọng nói tiếng Việt',
  problem:
    'Trợ lý ảo trên ô tô nghe sai những chuỗi mà người Việt đọc không theo mặt chữ: số, ngày tháng, đơn vị, tên đường và tên riêng.',
  approach:
    'Xây pipeline chuẩn hoá văn bản cho cả dữ liệu huấn luyện và đầu ra nhận dạng, mở rộng từ điển phát âm cho tên riêng, và dựng bộ đánh giá riêng cho từng nhóm lỗi thay vì chỉ nhìn WER tổng.',
  result:
    'Độ chính xác nhận dạng tăng 12%, và các nhóm lỗi liên quan tới số và địa danh giảm rõ rệt trên bộ đánh giá nội bộ. Cùng giai đoạn đó, tôi cũng tối ưu dịch vụ suy luận trên Kubernetes, giảm 15% lỗi dịch vụ.',
  tech: ['PyTorch', 'Kaldi', 'Python', 'Kubernetes'],
  metric: { value: '+12%', label: 'độ chính xác ASR', placeholder: false },
};
```

`COMPANIES_SHIPPED_AT` is unchanged — it still feeds `StatBar.astro`, which this plan does not touch.

- [x] **Step 2: Verify**

Run: `npm run build`
Expected: PASS. `astro check` would flag an unused type/value if the trim left anything orphaned, so a green build also confirms `StatBar.astro` (the only remaining consumer of this file until Task 3) still resolves.

Run: `grep -c "ProofLine\|RAG_PROOF\|SPEECH_PROOF\|PRODUCTION_PROOF" src/data/ai-work.ts`
Expected: `0`.

Run: `grep -c "Giải Nhất ALQAC 2022" src/data/ai-work.ts`
Expected: `1` — the RAG proof fact survived, folded into `NEXUS_AI.description`.

Run: `grep -c "giảm 15% lỗi dịch vụ" src/data/ai-work.ts`
Expected: `1` — the production proof fact survived, folded into `KIKI_ASR.result`.

- [x] **Step 3: Commit**

```bash
npx prettier --write src/data/ai-work.ts
git add src/data/ai-work.ts
git commit -m "refactor: fold ai-work.ts proof lines into case-study prose, drop unused SkillsGrid-only exports"
```

---

### Task 3: Give `/services/ai.astro` the case-study section it currently lacks

**Files:**
- Modify: `src/pages/services/ai.astro`

**Interfaces:**
- Consumes: `NEXUS_AI`, `NEXUS_PIPELINE`, `LINGUIST_AI`, `KIKI_ASR` from `@/data/ai-work` (Task 2); `CaseStudySpotlight`, `PipelineDiagram`, `CaseStudyCard` (all pre-existing, previously only used on the homepage).
- Produces: an anchor `id="case-study"` that the page's own hero CTA now targets.

- [x] **Step 1: Replace the file**

Replace the entire contents of `src/pages/services/ai.astro` with:

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import ServiceHero from '@components/ServiceHero.astro';
import ServiceTabs from '@components/ServiceTabs.astro';
import ServiceFeatureGrid from '@components/ServiceFeatureGrid.astro';
import ProcessSteps from '@components/ProcessSteps.astro';
import CTABand from '@components/CTABand.astro';
import CaseStudySpotlight from '@components/CaseStudySpotlight.astro';
import CaseStudyCard from '@components/CaseStudyCard.astro';
import PipelineDiagram from '@components/PipelineDiagram.astro';
import { NEXUS_AI, NEXUS_PIPELINE, LINGUIST_AI, KIKI_ASR } from '@/data/ai-work';

const FEATURES = [
  {
    kicker: 'HẠNG MỤC 01',
    title: 'Chatbot & trợ lý nghiệp vụ',
    bullets: ['Trả lời trên tài liệu nội bộ', 'Tích hợp Slack, web, Zalo OA', 'Guardrails & kiểm soát chi phí'],
  },
  {
    kicker: 'HẠNG MỤC 02',
    title: 'RAG & tìm kiếm ngữ nghĩa',
    bullets: ['Hybrid search + re-rank', 'Văn bản, hình ảnh, video', 'Bộ đo chất lượng truy hồi'],
    highlighted: true,
  },
  {
    kicker: 'HẠNG MỤC 03',
    title: 'Fine-tune & đánh giá mô hình',
    bullets: ['LoRA / SFT trên dữ liệu riêng', 'Benchmark trước–sau rõ ràng', 'Tối ưu suy luận, self-host'],
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Tư vấn kiến trúc',
    description: 'Đánh giá bài toán, chọn mô hình và stack phù hợp ngân sách.',
  },
  {
    number: '02',
    title: 'PoC 2–4 tuần',
    description: 'Bản chạy được trên dữ liệu thật, kèm số liệu để ra quyết định.',
  },
  {
    number: '03',
    title: 'Đưa lên production',
    description: 'Triển khai, giám sát chất lượng và chi phí, bàn giao tài liệu.',
  },
];
---

<BaseLayout title="Dự án AI" description="RAG, LLM, NLP cho bài toán nghiệp vụ thực tế — từ PoC đến production.">
  <ServiceTabs active="ai" />
  <ServiceHero
    breadcrumb="ai"
    title="Dự án AI — từ PoC đến production"
    description="RAG, LLM, NLP cho bài toán nghiệp vụ thực tế: tư vấn kiến trúc, xây dựng PoC nhanh, và đưa hệ thống lên production với chi phí vận hành đo lường được."
    ctas={[
      { label: 'Đặt lịch tư vấn →', href: '/contact?need=ai', variant: 'primary' },
      { label: 'Xem case study', href: '#case-study', variant: 'secondary' },
    ]}
  />

  <div class="px-12 pb-12">
    <div class="mb-7 flex items-baseline gap-4">
      <span class="kicker">01 /</span>
      <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Hạng mục dịch vụ</h2>
    </div>
    <ServiceFeatureGrid features={FEATURES} />
  </div>

  <section id="case-study" class="px-12 pb-12">
    <div class="mb-7 flex items-baseline gap-4">
      <span class="kicker">02 /</span>
      <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Case study</h2>
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

  <div class="px-12 pb-12">
    <div class="mb-7 flex items-baseline gap-4">
      <span class="kicker">03 /</span>
      <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Quy trình</h2>
    </div>
    <ProcessSteps kicker="$ ./engagement" steps={STEPS} />
  </div>

  <CTABand
    title="Có bài toán AI cần lời giải?"
    buttonLabel="Trao đổi miễn phí 30 phút →"
    buttonHref="/contact?need=ai"
  />
</BaseLayout>
```

`FEATURES` and `STEPS` are unchanged from the current file — only copied here verbatim because the whole file is being replaced.

- [x] **Step 2: Verify the build and the anchor**

Run: `npm run build`
Expected: PASS.

Run: `grep -c 'id="case-study"' dist/services/ai/index.html`
Expected: `1`.

Run: `grep -c 'href="#case-study"' dist/services/ai/index.html`
Expected: `1` — the hero CTA now resolves to the section on the same page instead of navigating to `/projects`.

- [x] **Step 3: Verify the case-study content actually rendered**

Run: `grep -c "hybrid retrieval" dist/services/ai/index.html`
Expected: `1`.

Run: `grep -c "Giải Nhất ALQAC 2022" dist/services/ai/index.html`
Expected: `1`.

Run: `grep -c "giảm 15% lỗi dịch vụ" dist/services/ai/index.html`
Expected: `1`.

- [x] **Step 4: Verify the section numbering on this page**

Run: `grep -o '0[0-9] /' dist/services/ai/index.html`
Expected, in this exact order:

```
01 /
02 /
03 /
```

- [x] **Step 5: Commit**

```bash
npx prettier --write src/pages/services/ai.astro
git add src/pages/services/ai.astro
git commit -m "feat: add case-study proof section to the AI service page"
```

---

### Task 4: Whole-site verification

No code changes unless a defect is found.

**Files:**
- Modify: only files with defects found during this task.

**Interfaces:**
- Consumes: the finished homepage and AI service page.
- Produces: nothing.

- [x] **Step 1: Clean build**

```bash
rm -rf dist && npm run build
```

Expected: PASS with no `astro check` errors or warnings.

- [x] **Step 2: Confirm formatting**

Run: `npx prettier --check src/pages/index.astro src/pages/services/ai.astro src/components/ProjectMiniCard.astro src/components/ServiceCard.astro src/components/Hero.astro src/data/ai-work.ts`
Expected: `All matched files use Prettier code style!`

- [x] **Step 3: Confirm no dead references anywhere in the repo**

Run: `grep -rn "CareerStrip\|AwardsBand\|SkillsGrid\|ProofLine\|RAG_PROOF\|SPEECH_PROOF\|PRODUCTION_PROOF" src/`
Expected: no output.

- [x] **Step 4: Confirm other pages are untouched**

Run: `git diff --stat main -- src/pages/about.astro src/pages/projects.astro src/pages/services/index.astro src/pages/services/software.astro`
Expected: no output (empty diff) — this plan never intended to touch these files.

- [x] **Step 5: Visual check — homepage, desktop width**

```bash
npm run preview
```

Open `http://localhost:4321` at a 1440px viewport and confirm:
- No horizontal scrollbar on `<body>`.
- The `01 / Dự án` grid shows all 5 projects with clean border seams (no doubled 2px borders, no missing right border mid-row) and the LCOJ card is the one with the accent top border + `CHỦ LỰC` badge.
- The `02 / Dịch vụ` cards show one description line each and no bullet list.
- The hero's `Xem dự án` button scrolls to the `01 / Dự án` section.

- [x] **Step 6: Visual check — homepage, mobile width**

At a 375px viewport confirm:
- No horizontal overflow anywhere.
- The project grid collapses to a single column with no orphaned right borders and a visible divider between the 4th and 5th card only.

- [x] **Step 7: Visual check — `/services/ai`, desktop and mobile**

Open `http://localhost:4321/services/ai` and confirm:
- The `02 / Case study` section renders the NexusAI spotlight with the pipeline diagram filling its right column, followed by the two case-study cards with aligned metric baselines — visually identical to how this content rendered on the old homepage, just on this page.
- The hero's `Xem case study` button scrolls down to that section instead of leaving the page.
- At 375px width, no horizontal overflow.

- [x] **Step 8: Read both pages as a stranger**

Read `/` and `/services/ai` top to bottom. Confirm: nothing on the homepage restates specific award names, career dates, or skill tag lists (those now only exist on `/about`); nothing on the homepage shows a full org roster or deployment list (that only exists on `/services`); the AI case-study depth (pipeline diagram, problem/approach/result cards) now only exists on `/services/ai`, not duplicated on the homepage.

- [x] **Step 9: Commit any fixes**

```bash
npx prettier --write <changed files>
git add <changed files>
git commit -m "fix: <specific defect found during whole-site verification>"
```

If no defects were found, skip this step — do not create an empty commit.
