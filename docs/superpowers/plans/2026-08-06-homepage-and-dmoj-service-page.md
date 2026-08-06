# Homepage & DMOJ Service Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage around verifiable evidence (career, awards, capabilities-with-proof, a 20-organization roster, AI projects), and correct the DMOJ service page, which currently understates the real footprint by roughly 7×.

**Architecture:** Static Astro components composed in `src/pages/index.astro` and `src/pages/services/index.astro`. Organization and deployment data is extracted to a single typed module (`src/data/organizations.ts`) consumed by both pages, so the roster is authored once. New components follow the existing brutalist conventions: sharp corners, 2px `border-ink`, `font-mono` labels, and the `.rgrid` / `.rwrap` / `.rpad` responsive helpers.

**Tech Stack:** Astro 4 (static), TailwindCSS 3, TypeScript strict. No UI framework, no test runner.

**Spec:** `docs/superpowers/specs/2026-08-06-homepage-and-dmoj-service-page-design.md`

## Global Constraints

- **No test suite exists.** Per `CLAUDE.md`, `npm run build` (which runs `astro check`) is the only automated correctness gate. Every task ends with a passing build plus a named visual check at `npm run dev` (http://localhost:4321).
- **All user-facing copy is Vietnamese.** The site is `<html lang="vi">`.
- **No dark mode.** Never add `dark:` classes — no dark-mode tokens exist.
- **Design tokens only:** `bg`, `surface`, `ink`, `border`, `border-light`, `accent`, `accent-2`, `neutral-*`. Sharp corners (`borderRadius` is zeroed except `full`), 2px `border-ink` borders, `font-mono` for labels/kickers.
- **Responsive collapsing uses `.rgrid` / `.rwrap` / `.rpad`** from the single `@media (max-width: 900px)` block in `global.css`. Do NOT add per-component Tailwind responsive variants for bordered grid collapse.
- **Import aliases:** `@/*` → `src/*`, `@components/*`, `@layouts/*`, `@utils/*`, `@styles/*`.
- **Format before committing:** `npx prettier --write <files>` (no `format` npm script exists).
- **Placeholder policy:** the submission count is unknown. Use the literal string `[N]` everywhere it appears so it is greppable, and never invent a number.
- **Never ship invented testimonials.** Quotes attributed to named people at real organizations must be real or absent. Task 14 removes the three existing placeholders.
- **Experience is 8 years, not 7+.** Correct every occurrence.

---

# PHASE 1 — HOMEPAGE

### Task 1: Organization & deployment data module

**Files:**

- Create: `src/data/organizations.ts`

**Interfaces:**

- Consumes: nothing
- Produces:
  - `interface Organization { name: string; slug: string; members: number }`
  - `interface Deployment { name: string; url: string; tier: 'branded' | 'managed'; note: string }`
  - `ORGANIZATIONS: Organization[]` — the 20 external institutions
  - `DEPLOYMENTS: Deployment[]` — LNQOJ plus the 3 managed clients
  - `ORG_LIST_URL: string`
  - `TOTAL_ORG_MEMBERS: number` — computed, not hardcoded

- [ ] **Step 1: Create the data module**

Hieu's own two orgs (Luyện Code Club, Luyện Code School) are deliberately excluded — this array is the external institutions only.

```ts
export interface Organization {
  name: string;
  slug: string;
  members: number;
}

export interface Deployment {
  name: string;
  url: string;
  tier: 'branded' | 'managed';
  note: string;
}

/**
 * External institutions with an organization on luyencode.net.
 * Excludes Hieu's own orgs (Luyện Code Club, Luyện Code School).
 * Source: https://luyencode.net/organizations/ — verified 2026-08-06.
 */
export const ORGANIZATIONS: Organization[] = [
  { name: 'Trường Đại học Sư phạm Hà Nội', slug: 'hnue', members: 121 },
  { name: 'Trường ĐH Kinh Tế - Kỹ thuật Công nghiệp', slug: 'ktktcn', members: 213 },
  { name: 'UTL707', slug: 'dhkt-hccand', members: 517 },
  { name: 'THPT Chuyên Nguyễn Chí Thanh - Đăk Nông', slug: 'nctdno', members: 265 },
  { name: 'Trường THPT Chuyên Lê Quý Đôn - Quảng Trị', slug: 'lqdqt', members: 13 },
  { name: 'Trường THPT Chuyên Lý Tự Trọng - Cần Thơ', slug: 'thptltt', members: 139 },
  { name: 'Trường THPT Quang Hà - Vĩnh Phúc', slug: 'thptqh', members: 203 },
  { name: 'Trường THPT Tam Đảo II', slug: 'thpttd2', members: 107 },
  { name: 'Trường THPT Bình Sơn', slug: 'bshs', members: 85 },
  { name: 'Trường THPT Lục Nam', slug: 'tlnhs', members: 31 },
  { name: 'Trường THPT Bất Bạt', slug: 'batbat-highschool', members: 5 },
  { name: 'THPT Huỳnh Thúc Kháng', slug: 'thpt-hunh-thuc-khang', members: 36 },
  { name: 'Trường THCS Lập Thạch', slug: 'lths', members: 446 },
  { name: 'Trường THCS Ninh Phong - TP Ninh Bình', slug: 'thcsnp', members: 163 },
  { name: 'Trường THCS Lương Thế Vinh (Đắk Lắk)', slug: 'ltvdk', members: 21 },
  { name: "Trường PTDT Nội Trú THCS M'Drắk", slug: 'trng-ptdt-ni-tru-thcs-mdrk', members: 2 },
  { name: 'Trường TH Nguyễn Trãi - Đắk Lắk', slug: 'trng-th-nguyn-trai-djk-lk', members: 4 },
  { name: 'Đội Tỉnh Đồng Tháp', slug: 'thptdt', members: 45 },
  { name: 'Kidcode Vũng Tàu', slug: 'kidvt', members: 53 },
  { name: 'Thầy Minh chuyên tin', slug: 'tmct', members: 51 },
];

/** Systems deployed and operated outside the shared luyencode.net platform. */
export const DEPLOYMENTS: Deployment[] = [
  {
    name: 'LNQOJ — Trường THCS Lý Nhật Quang',
    url: 'https://lynhatquang.luyencode.net',
    tier: 'branded',
    note: 'Đô Lương, Nghệ An — thương hiệu riêng',
  },
  {
    name: 'cothilaptrinh.vn',
    url: 'https://cothilaptrinh.vn',
    tier: 'managed',
    note: 'trung tâm luyện thi HSG tin học',
  },
  {
    name: 'laptrinh.online',
    url: 'https://laptrinh.online',
    tier: 'managed',
    note: 'lớp học lập trình trực tuyến',
  },
  {
    name: 'codebuddy.vn',
    url: 'https://codebuddy.vn',
    tier: 'managed',
    note: 'nền tảng luyện code cho sinh viên',
  },
];

export const ORG_LIST_URL = 'https://luyencode.net/organizations/';

/** Computed so the figure can never drift from the list above. Currently 2520. */
export const TOTAL_ORG_MEMBERS = ORGANIZATIONS.reduce((sum, org) => sum + org.members, 0);
```

- [ ] **Step 2: Verify it type-checks and the total is right**

Run:

```bash
npm run build
grep -c "slug:" src/data/organizations.ts
```

Expected: build passes with 0 errors; grep prints `20`.

`TOTAL_ORG_MEMBERS` should evaluate to `2520`. It is computed rather than hardcoded, so it cannot drift from the list; its rendered value is confirmed visually in Task 8.

- [ ] **Step 3: Commit**

```bash
npx prettier --write src/data/organizations.ts
git add src/data/organizations.ts
git commit -m "feat: add organization and deployment data module"
```

---

### Task 2: Hero rewrite

**Files:**

- Modify: `src/components/Hero.astro`

**Interfaces:**

- Consumes: `TerminalWindow` (existing, prop `lines: string[]`)
- Produces: no exports; `Hero` takes no props, as today

Note: `src/components/Hero.astro` has uncommitted changes in the working tree. This task overwrites its body wholesale — that is intended.

- [ ] **Step 1: Replace the file**

```astro
---
import TerminalWindow from '@components/TerminalWindow.astro';
import { ORGANIZATIONS } from '@/data/organizations';

const terminalLines = [
  '$ behitek --status',
  `> orgs        ${ORGANIZATIONS.length} trường & tổ chức`,
  '> users       20.000+',
  '> uptime      99.9%',
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
      AI Engineer · Kiến trúc giải pháp · Hà Nội
    </div>
    <p
      class="mb-8 max-w-[720px] text-[17px] leading-relaxed text-neutral-700"
      style="text-wrap: pretty"
    >
      Tôi xây hệ thống AI chạy thật trong production — và vận hành hạ tầng luyện code miễn phí cho
      {ORGANIZATIONS.length}+ trường học trên khắp Việt Nam, từ THPT chuyên đến trường nội trú vùng
      cao.
    </p>
    <div class="rwrap flex gap-3.5">
      <a href="/contact" class="btn-primary gap-6">
        Nhận báo giá dịch vụ <span>→</span>
      </a>
      <a href="/services" class="btn-secondary">OJ miễn phí cho trường</a>
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

- [ ] **Step 2: Build and check visually**

Run: `npm run build`
Expected: 0 errors.

Run: `npm run dev`, open http://localhost:4321/
Expected: role line reads `AI Engineer · Kiến trúc giải pháp · Hà Nội`; paragraph is two lines, not five; two buttons where the second reads `OJ miễn phí cho trường`; terminal shows `orgs 20 trường & tổ chức`.

- [ ] **Step 3: Commit**

```bash
npx prettier --write src/components/Hero.astro
git add src/components/Hero.astro
git commit -m "feat: rewrite hero around verifiable scale and two service doors"
```

---

### Task 3: StatBar rewrite

**Files:**

- Modify: `src/components/StatBar.astro`

**Interfaces:**

- Consumes: `ORGANIZATIONS` from `@/data/organizations`
- Produces: no exports; no props

- [ ] **Step 1: Replace the file**

The `[N]` placeholder is intentional — see Global Constraints.

```astro
---
import { ORGANIZATIONS } from '@/data/organizations';

const STATS = [
  { value: '8 năm', label: 'kinh nghiệm AI & hệ thống' },
  { value: '20.000+', label: 'người dùng trên hệ thống tôi vận hành' },
  { value: `${ORGANIZATIONS.length}+`, label: 'tổ chức đang sử dụng' },
  { value: '[N]', label: 'lượt chấm bài đã xử lý' },
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

- [ ] **Step 2: Build and check visually**

Run: `npm run build`
Expected: 0 errors.

Visual at http://localhost:4321/: four stats reading `8 năm`, `20.000+`, `20+`, `[N]`. The `[N]` is expected until the submission count is supplied.

- [ ] **Step 3: Commit**

```bash
npx prettier --write src/components/StatBar.astro
git add src/components/StatBar.astro
git commit -m "feat: rebuild StatBar around operational scale"
```

---

### Task 4: CareerStrip replaces LogosBar

**Files:**

- Create: `src/components/CareerStrip.astro`
- Delete: `src/components/LogosBar.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**

- Consumes: nothing
- Produces: `CareerStrip` — no props

`LogosBar` is deleted because it lists `luyencode.net` under "ĐANG VẬN HÀNH CHO" (currently operating for), which is Hieu's own project. Those client domains reappear in Task 8 as clickable live systems.

- [ ] **Step 1: Create `src/components/CareerStrip.astro`**

```astro
---
const CURRENT = {
  org: 'VMO',
  detail: 'AI fullstack · kiến trúc giải pháp · dẫn dắt team',
};
const PAST = 'Zalo · VCCorp';
const EDUCATION = 'Thạc sĩ JAIST, Nhật Bản';
---

<div class="rgrid grid grid-cols-[1.3fr_1fr] border-b-2 border-t-2 border-ink bg-white">
  <div class="rpad rwrap flex items-baseline gap-4 border-r-2 border-ink px-12 py-5">
    <span class="flex-none font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
      HIỆN TẠI
    </span>
    <span class="font-heading text-base font-bold text-ink">{CURRENT.org}</span>
    <span class="font-mono text-[13px] text-neutral-600">{CURRENT.detail}</span>
  </div>
  <div class="rpad rwrap flex items-baseline gap-4 px-12 py-5">
    <span class="flex-none font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
      TRƯỚC ĐÓ
    </span>
    <span class="font-heading text-base font-bold text-ink">{PAST}</span>
    <span class="flex-none font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
      HỌC VẤN
    </span>
    <span class="font-mono text-[13px] text-neutral-600">{EDUCATION}</span>
  </div>
</div>
```

All three labels (`HIỆN TẠI`, `TRƯỚC ĐÓ`, `HỌC VẤN`) must render. Without the `HỌC VẤN` label the
band reads `TRƯỚC ĐÓ  Zalo · VCCorp  Thạc sĩ JAIST, Nhật Bản`, which makes JAIST look like a third
past employer instead of a degree.

- [ ] **Step 2: Swap it into `src/pages/index.astro`**

Change the import line:

```astro
import LogosBar from '@components/LogosBar.astro';
```

to:

```astro
import CareerStrip from '@components/CareerStrip.astro';
```

And in the markup, change:

```astro
<LogosBar />
```

to:

```astro
<CareerStrip />
```

- [ ] **Step 3: Delete the old component**

```bash
git rm src/components/LogosBar.astro
```

- [ ] **Step 4: Build and check visually**

Run: `npm run build`
Expected: 0 errors. A leftover `LogosBar` import anywhere would fail the build — that is the check.

Visual at http://localhost:4321/: a white band under the stats reading `HIỆN TẠI  VMO  AI fullstack · kiến trúc giải pháp · dẫn dắt team` on the left, `TRƯỚC ĐÓ  Zalo · VCCorp  Thạc sĩ JAIST, Nhật Bản` on the right.

- [ ] **Step 5: Commit**

```bash
npx prettier --write src/components/CareerStrip.astro src/pages/index.astro
git add src/components/CareerStrip.astro src/pages/index.astro
git commit -m "feat: replace LogosBar with tiered CareerStrip"
```

---

### Task 5: AwardsBand

**Files:**

- Create: `src/components/AwardsBand.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**

- Consumes: nothing
- Produces: `AwardsBand` — no props

Award text is copied verbatim from the `AWARDS` array in `src/pages/about.astro:34-39`.

- [ ] **Step 1: Create `src/components/AwardsBand.astro`**

```astro
---
const AWARDS = [
  { rank: 'Champion', name: 'AI4VN National Grand Finale Hackathon' },
  { rank: 'Giải Nhất', name: 'ALQAC — Legal Document Retrieval' },
  { rank: 'Giải Nhì', name: 'ACM/ICPC Việt Nam National Contest' },
  { rank: 'Giải Nhì', name: 'Speech-to-Text Shared Task, VLSP 2019' },
];
---

<div class="rgrid grid grid-cols-4 border-b-2 border-ink bg-bg">
  {
    AWARDS.map((award, i) => (
      <div class={`px-12 py-[22px] ${i < AWARDS.length - 1 ? 'border-r-2 border-ink' : ''}`}>
        <div class="mb-1 font-heading text-[15px] font-extrabold text-accent">{award.rank}</div>
        <div class="font-mono text-[12px] leading-[1.6] text-neutral-700">{award.name}</div>
      </div>
    ))
  }
</div>
```

Horizontal padding is `px-12` to match `StatBar`, so the two 4-column bands share the same column gutters and read as a deliberate pair.

- [ ] **Step 2: Wire into `src/pages/index.astro`**

Add the import beneath the `CareerStrip` import:

```astro
import AwardsBand from '@components/AwardsBand.astro';
```

And place it directly after `<CareerStrip />`:

```astro
<CareerStrip />
<AwardsBand />
```

- [ ] **Step 3: Build and check visually**

Run: `npm run build`
Expected: 0 errors.

Visual at http://localhost:4321/: four cells, each with an accent-coloured rank above a monospace competition name. Confirm the vertical dividers line up with the `StatBar` dividers above.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/components/AwardsBand.astro src/pages/index.astro
git add src/components/AwardsBand.astro src/pages/index.astro
git commit -m "feat: add AwardsBand naming all four national awards"
```

---

### Task 6: SkillsGrid — section 01

**Files:**

- Create: `src/components/SkillsGrid.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**

- Consumes: `ORGANIZATIONS` from `@/data/organizations`
- Produces: `SkillsGrid` — no props

Each column ends in a proof line tied to a system that exists. That terminal `→` line is the point of the component; do not drop it.

- [ ] **Step 1: Create `src/components/SkillsGrid.astro`**

```astro
---
import { ORGANIZATIONS } from '@/data/organizations';

interface Skill {
  title: string;
  areas: string;
  tech: string[];
  proof: string;
}

const SKILLS: Skill[] = [
  {
    title: 'AI & Machine Learning',
    areas: 'LLM · RAG · NLP · Speech · Agentic AI',
    tech: ['Python', 'PyTorch', 'LangGraph', 'ChromaDB', 'Whisper'],
    proof: '+12% độ chính xác ASR cho trợ lý ảo KiKi (Zalo)',
  },
  {
    title: 'Hệ thống & hạ tầng',
    areas: 'API · kiến trúc · triển khai · vận hành',
    tech: ['FastAPI', 'Django', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    proof: '−15% lỗi dịch vụ trên Kubernetes (Zalo)',
  },
  {
    title: 'Nền tảng giáo dục',
    areas: 'Online judge · chấm tự động · contest · ngân hàng đề',
    tech: ['DMOJ', 'Vue', 'Docker'],
    proof: `${ORGANIZATIONS.length}+ trường, 20.000+ người dùng, 5 năm vận hành liên tục`,
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

- [ ] **Step 2: Wire into `src/pages/index.astro` as section 01**

Add the import:

```astro
import SkillsGrid from '@components/SkillsGrid.astro';
```

Insert this section immediately before the existing `Dịch vụ` section:

```astro
<section class="p-12 pb-0">
  <div class="mb-7 flex items-baseline gap-4">
    <span class="kicker">01 /</span>
    <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Chuyên môn</h2>
  </div>
  <SkillsGrid />
</section>
```

Then renumber the existing sections: `Dịch vụ` becomes `02 /`, `Case study nổi bật` becomes `03 /`, `Bài viết mới` becomes `04 /` for now (Task 9 inserts a new `04 /` and pushes the blog to `05 /`).

- [ ] **Step 3: Build and check visually**

Run: `npm run build`
Expected: 0 errors.

Visual at http://localhost:4321/: three columns; each ends with an accent-coloured `→` proof line sitting on a 2px rule, and those three rules are flush with each other regardless of differing tag-pill wrap heights (that is what `mt-auto` + `flex flex-col` buy you).

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/components/SkillsGrid.astro src/pages/index.astro
git add src/components/SkillsGrid.astro src/pages/index.astro
git commit -m "feat: add Chuyên môn skills grid with per-column proof lines"
```

---

### Task 7: OrgRoster component

**Files:**

- Create: `src/components/OrgRoster.astro`

**Interfaces:**

- Consumes: `ORGANIZATIONS`, `ORG_LIST_URL`, `Organization` from `@/data/organizations`
- Produces: `OrgRoster` with props `{ variant?: 'compact' | 'full'; limit?: number }`
  - `compact` (default) — 2 columns, no member counts. Used inside the homepage case study.
  - `full` — 3 columns, shows member counts. Used on the service page in Task 13.
  - `limit` — render only the first N organizations and append a `+X tổ chức khác` link.

This task creates the component but wires nothing. Task 8 is its first consumer.

- [ ] **Step 1: Create `src/components/OrgRoster.astro`**

```astro
---
import { ORGANIZATIONS, ORG_LIST_URL, type Organization } from '@/data/organizations';

interface Props {
  variant?: 'compact' | 'full';
  limit?: number;
}

const { variant = 'compact', limit } = Astro.props;

const orgs: Organization[] = limit ? ORGANIZATIONS.slice(0, limit) : ORGANIZATIONS;
const remaining = ORGANIZATIONS.length - orgs.length;
const cols = variant === 'full' ? 'grid-cols-3' : 'grid-cols-2';
---

<div>
  <div class={`rgrid grid ${cols} border-t-2 border-ink`}>
    {
      orgs.map((org) => (
        <div class="flex items-baseline gap-2 border-b border-border-light py-2 pr-6 font-mono text-[12.5px] leading-[1.5] text-ink">
          <span class="flex-none text-accent">●</span>
          <span class="flex-1">{org.name}</span>
          {variant === 'full' && <span class="flex-none text-neutral-600">{org.members}</span>}
        </div>
      ))
    }
  </div>
  <a
    href={ORG_LIST_URL}
    target="_blank"
    rel="noopener noreferrer"
    class="mt-3.5 inline-block font-mono text-[13px] font-semibold text-ink no-underline hover:text-accent"
  >
    {remaining > 0 ? `+${remaining} tổ chức khác — xem danh sách →` : 'Xem danh sách tổ chức →'}
  </a>
</div>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: 0 errors. Nothing renders yet — the component is unused until Task 8.

- [ ] **Step 3: Commit**

```bash
npx prettier --write src/components/OrgRoster.astro
git add src/components/OrgRoster.astro
git commit -m "feat: add OrgRoster component with compact and full variants"
```

---

### Task 8: CaseStudySpotlight extension — section 03

**Files:**

- Modify: `src/components/CaseStudySpotlight.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**

- Consumes: `OrgRoster` (Task 7), `DEPLOYMENTS` from `@/data/organizations`
- Produces: `CaseStudySpotlight` with props:
  ```ts
  {
    kicker: string;
    title: string;
    description: string;
    stats: { value: string; label: string }[];
    quote?: string;          // now optional
    attribution?: string;    // now optional
    image?: string;
    links?: { label: string; href: string }[];
  }
  ```
  Plus a default `<slot />` rendered below the main grid, for the roster.

`quote` and `attribution` become optional because the only quote currently in the codebase is an invented one (see Task 14). The component must look finished without it.

- [ ] **Step 1: Replace `src/components/CaseStudySpotlight.astro`**

```astro
---
interface Props {
  kicker: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  quote?: string;
  attribution?: string;
  image?: string;
  links?: { label: string; href: string }[];
}

const { kicker, title, description, stats, quote, attribution, image, links } = Astro.props;
const hasQuote = Boolean(quote && attribution);
---

<div class="border-2 border-ink bg-white">
  <div class="rgrid grid grid-cols-[1.2fr_1fr]">
    <div class="border-r-2 border-ink p-8">
      <div class="mb-2.5 font-mono text-xs text-neutral-600">{kicker}</div>
      <h3 class="mb-3 font-heading text-2xl font-bold leading-tight text-ink">{title}</h3>
      <p class="mb-5 text-[14.5px] leading-relaxed text-neutral-700">{description}</p>
      <div class="rwrap mb-5 flex gap-7">
        {
          stats.map((s) => (
            <div>
              <div class="font-heading text-[26px] font-extrabold text-ink">{s.value}</div>
              <div class="font-mono text-[11px] text-neutral-600">{s.label}</div>
            </div>
          ))
        }
      </div>
      {
        links && links.length > 0 && (
          <div class="rwrap flex gap-5 border-t-2 border-ink pt-4 font-mono text-[13px] font-semibold">
            {links.map((link) => (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                class="text-ink no-underline hover:text-accent"
              >
                {link.label} →
              </a>
            ))}
          </div>
        )
      }
    </div>
    <div class="flex flex-col bg-bg">
      {image && <img src={image} alt={title} class="block h-full w-full object-cover object-top" />}
      {
        hasQuote && (
          <div
            class={`p-8 ${image ? 'border-t-2 border-ink' : 'flex h-full flex-col justify-between'}`}
          >
            <p class="m-0 text-[17px] font-medium leading-[1.55] text-ink">“{quote}”</p>
            <div class="mt-4 font-mono text-xs text-neutral-600">— {attribution}</div>
          </div>
        )
      }
    </div>
  </div>
  <slot />
</div>
```

- [ ] **Step 2: Update the case study section in `src/pages/index.astro`**

Add these imports:

```astro
import OrgRoster from '@components/OrgRoster.astro'; import {
  (ORGANIZATIONS, DEPLOYMENTS, TOTAL_ORG_MEMBERS)
} from '@/data/organizations';
```

Replace the whole `flagshipProject && (...)` section with:

```astro
{
  flagshipProject && (
    <section class="px-12 pb-14">
      <div class="mb-7 flex items-baseline gap-4">
        <span class="kicker">03 /</span>
        <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Case study nổi bật</h2>
      </div>
      <CaseStudySpotlight
        kicker="luyencode.net — LCOJ"
        title="Nền tảng luyện thi lập trình cho học sinh Việt Nam"
        description="Online judge chấm bài tự động tôi xây và vận hành liên tục từ 2020. Ngoài luyencode.net, hệ thống còn chạy dưới thương hiệu riêng và trên hạ tầng riêng cho các đơn vị khác."
        image="/images/project/lcoj-home.png"
        stats={[
          { value: '20.000+', label: 'người dùng' },
          { value: `${ORGANIZATIONS.length}+`, label: 'trường & tổ chức' },
          { value: '2020', label: 'vận hành liên tục' },
        ]}
        links={DEPLOYMENTS.map((d) => ({ label: d.name, href: d.url }))}
      >
        <div class="border-t-2 border-ink p-8">
          <div class="mb-4 font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
            {ORGANIZATIONS.length} TRƯỜNG & TỔ CHỨC ĐANG SỬ DỤNG —{' '}
            {TOTAL_ORG_MEMBERS.toLocaleString('vi-VN')} THÀNH VIÊN
          </div>
          <OrgRoster />
        </div>
      </CaseStudySpotlight>
    </section>
  )
}
```

The invented `quote` and `attribution` props are gone. Do not reinstate them without a real quote.

- [ ] **Step 3: Build and check visually**

Run: `npm run build`
Expected: 0 errors.

Visual at http://localhost:4321/: the case study shows an LCOJ screenshot on the right instead of a quote; four deployment links sit under a rule on the left; below the grid, a bordered block lists all 20 school names in two columns with a link out to `luyencode.net/organizations/`.

**Density check** — this is now the heaviest block on the page. If it reads bloated, the spec's sanctioned cut is `<OrgRoster limit={12} />`, which renders 12 names plus a `+8 tổ chức khác` link. Apply it only if needed.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/components/CaseStudySpotlight.astro src/pages/index.astro
git add src/components/CaseStudySpotlight.astro src/pages/index.astro
git commit -m "feat: extend case study with screenshot, live links, and org roster"
```

---

### Task 9: Projects grid — section 04

**Files:**

- Create: `src/components/ProjectMiniCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**

- Consumes: the `projects` content collection
- Produces: `ProjectMiniCard` with props
  ```ts
  {
    title: string;
    description: string;
    tech: string[];
    status: 'open-source' | 'private';
    href?: string;
    borderRight?: boolean;
    borderBottom?: boolean;
  }
  ```

**Spec correction:** the spec listed `ProjectCard` as reused unchanged, but `ProjectCard` is a wide horizontal card (`grid-cols-[440px_1fr]`) that cannot tile into a multi-column grid. A smaller card is required. The spec also said "4-up grid"; this plan uses 2×2, because four columns leaves each description too cramped to read.

- [ ] **Step 1: Create `src/components/ProjectMiniCard.astro`**

```astro
---
interface Props {
  title: string;
  description: string;
  tech: string[];
  status: 'open-source' | 'private';
  href?: string;
  borderRight?: boolean;
  borderBottom?: boolean;
}

const {
  title,
  description,
  tech,
  status,
  href,
  borderRight = false,
  borderBottom = false,
} = Astro.props;
const statusLabel = status === 'open-source' ? 'OPEN SOURCE' : 'PRIVATE';
---

<div
  class={`p-7 bg-white ${borderRight ? 'border-r-2 border-ink' : ''} ${borderBottom ? 'border-b-2 border-ink' : ''}`}
>
  <div class="mb-3 flex items-center justify-between">
    <span class="border border-ink px-[7px] py-0.5 font-mono text-[10px] font-semibold text-ink">
      {statusLabel}
    </span>
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

- [ ] **Step 2: Add section 04 to `src/pages/index.astro`**

Add the import:

```astro
import ProjectMiniCard from '@components/ProjectMiniCard.astro';
```

Add this derivation in the frontmatter, after the existing `flagshipProject` line. AI projects lead, because they are the only AI evidence on the page:

```ts
const AI_FIRST_ORDER = ['nexusai', 'linguistai', 'behivest', 'beli5'];
const otherProjects = AI_FIRST_ORDER.map((id) => allProjects.find((p) => p.data.id === id)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);
```

Insert this section after the case study section and before the blog section:

```astro
{
  otherProjects.length > 0 && (
    <section class="px-12 pb-14">
      <div class="mb-7 flex items-baseline justify-between">
        <div class="flex items-baseline gap-4">
          <span class="kicker">04 /</span>
          <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Dự án</h2>
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
            borderBottom={i < otherProjects.length - 2}
          />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Build and check visually**

Run: `npm run build`
Expected: 0 errors.

Visual at http://localhost:4321/: a 2×2 grid in order NexusAI, LinguistAI, Behivest, Beli5. NexusAI and LinguistAI show `PRIVATE` with no link; Behivest and Beli5 show `OPEN SOURCE` with a `Xem chi tiết →` link. Internal borders form a clean cross with no doubled or missing edges. At a viewport under 900px the grid collapses to one column via `.rgrid`.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/components/ProjectMiniCard.astro src/pages/index.astro
git add src/components/ProjectMiniCard.astro src/pages/index.astro
git commit -m "feat: add Dự án grid surfacing the four non-flagship projects"
```

---

### Task 10: Blog section retitle and final homepage ordering

**Files:**

- Modify: `src/pages/index.astro`

**Interfaces:**

- Consumes: everything from Tasks 2–9
- Produces: the final homepage composition

- [ ] **Step 1: Retitle the blog section and renumber it to 05**

In the blog section, change the kicker from `03 /` to `05 /` and the heading text from `Bài viết mới` to `Viết & nghiên cứu`. Six of the ten posts are AI/ML deep-dives; the section is a research portfolio, not a news feed.

- [ ] **Step 2: Verify the final section order**

The page must now read, top to bottom:

```
<Hero />
<StatBar />
<CareerStrip />
<AwardsBand />
01 / Chuyên môn
02 / Dịch vụ
03 / Case study nổi bật
04 / Dự án
05 / Viết & nghiên cứu
<CTABand />
```

Confirm the kickers are `01 /` through `05 /` with no gaps or repeats.

- [ ] **Step 3: Build and full-page visual review**

Run: `npm run build`
Expected: 0 errors.

Visual at http://localhost:4321/ — scroll the whole page and check:

- The three bands under the hero alternate background: `StatBar` on `bg`, `CareerStrip` on `white`, `AwardsBand` on `bg`.
- Section numbering runs 01→05 without gaps.
- No horizontal scrollbar at 1440px, 1024px, and 375px widths.
- At 375px every bordered grid has collapsed to a single column.

**Band-stacking check:** if the three stacked bands read as monotonous, the spec's sanctioned fallback is moving `CareerStrip` into the hero's right column beneath `TerminalWindow`. Apply only if needed.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/pages/index.astro
git add src/pages/index.astro
git commit -m "feat: retitle blog section and finalise homepage ordering"
```

---

# PHASE 2 — DMOJ SERVICE PAGE

### Task 11: ServiceTiers replaces PricingSplit

**Files:**

- Create: `src/components/ServiceTiers.astro`
- Delete: `src/components/PricingSplit.astro`
- Modify: `src/pages/services/index.astro`

**Interfaces:**

- Consumes: `ORGANIZATIONS`, `DEPLOYMENTS` from `@/data/organizations`
- Produces: `ServiceTiers` — no props

`PricingSplit` is deleted for two reasons: it describes two tiers when three are offered, and its free-tier copy ("cùng phạm vi trọn gói, không thu phí dịch vụ") implies a free full deployment. The 20 free organizations receive an org on shared infrastructure, not a dedicated system.

**Open item:** tier 2 pricing is unconfirmed. Ship the literal string `Trao đổi cụ thể` until Hieu confirms.

- [ ] **Step 1: Create `src/components/ServiceTiers.astro`**

```astro
---
import { ORGANIZATIONS, DEPLOYMENTS } from '@/data/organizations';

const managed = DEPLOYMENTS.filter((d) => d.tier === 'managed');
const branded = DEPLOYMENTS.filter((d) => d.tier === 'branded');

const TIERS = [
  {
    kicker: 'MIỄN PHÍ, DÙNG CHUNG',
    title: 'Tổ chức trên luyencode.net',
    price: '0đ',
    description:
      'Trường học, CLB và đội tuyển có không gian riêng trên nền tảng chung: quản lý học sinh, giao bài, tổ chức contest. Không cần máy chủ, không cần đội kỹ thuật.',
    proof: `${ORGANIZATIONS.length} trường & tổ chức đang dùng`,
    highlighted: true,
  },
  {
    kicker: 'INSTANCE RIÊNG',
    title: 'Tên miền phụ + thương hiệu riêng',
    price: 'Trao đổi cụ thể',
    description:
      'Hệ thống riêng mang tên và nhận diện của đơn vị, chạy trên hạ tầng của tôi. Phù hợp với trường muốn có online judge mang thương hiệu mình mà không phải tự vận hành.',
    proof: branded.map((d) => d.name).join(', '),
    highlighted: false,
  },
  {
    kicker: 'TRIỂN KHAI TRỌN GÓI',
    title: 'Tên miền, VPS, triển khai & vận hành',
    price: 'Theo quy mô',
    description:
      'Hệ thống độc lập trên hạ tầng riêng của đơn vị: tư vấn tên miền và máy chủ, cài đặt, tùy biến, backup, giám sát và hỗ trợ dài hạn.',
    proof: managed.map((d) => d.name).join(', '),
    highlighted: false,
  },
];
---

<div class="rgrid grid grid-cols-3 border-2 border-ink">
  {
    TIERS.map((tier, i) => (
      <div
        class={`flex flex-col bg-white p-7 ${i < TIERS.length - 1 ? 'border-r-2 border-ink' : ''} ${
          tier.highlighted ? 'border-t-4 border-t-accent' : ''
        }`}
      >
        <div class="mb-2.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
          {tier.kicker}
        </div>
        <h3 class="mb-1.5 font-heading text-xl font-bold leading-tight text-ink">{tier.title}</h3>
        <div class="mb-3.5 font-heading text-[22px] font-extrabold text-accent">{tier.price}</div>
        <p class="mb-5 text-[13.5px] leading-relaxed text-neutral-700">{tier.description}</p>
        <div class="mt-auto border-t-2 border-ink pt-3.5 font-mono text-[12px] leading-[1.6] text-neutral-600">
          {tier.proof}
        </div>
      </div>
    ))
  }
</div>
```

- [ ] **Step 2: Swap it into `src/pages/services/index.astro`**

Change the import:

```astro
import PricingSplit from '@components/PricingSplit.astro';
```

to:

```astro
import ServiceTiers from '@components/ServiceTiers.astro';
```

Replace `<PricingSplit />` with a titled section:

```astro
<div class="mb-7 mt-12 flex items-baseline gap-4">
  <span class="kicker">01 /</span>
  <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Ba cách bắt đầu</h2>
</div>
<ServiceTiers />
```

- [ ] **Step 3: Delete the old component**

```bash
git rm src/components/PricingSplit.astro
```

- [ ] **Step 4: Build and check visually**

Run: `npm run build`
Expected: 0 errors. A leftover `PricingSplit` import would fail the build.

Visual at http://localhost:4321/services: three tiers; the free tier carries the accent top border; each ends with a flush proof line naming real organizations.

- [ ] **Step 5: Commit**

```bash
npx prettier --write src/components/ServiceTiers.astro src/pages/services/index.astro
git add src/components/ServiceTiers.astro src/pages/services/index.astro
git commit -m "feat: replace two-tier PricingSplit with accurate three-tier ServiceTiers"
```

---

### Task 12: FAQ component

**Files:**

- Create: `src/components/FAQ.astro`

**Interfaces:**

- Consumes: nothing
- Produces: `FAQ` with props `{ items: { question: string; answer: string }[] }`

Uses native `<details>`/`<summary>` — no JavaScript, consistent with the site's vanilla approach.

- [ ] **Step 1: Create `src/components/FAQ.astro`**

```astro
---
interface Props {
  items: { question: string; answer: string }[];
}

const { items } = Astro.props;
---

<div class="border-t-2 border-ink">
  {
    items.map((item) => (
      <details class="group border-b-2 border-ink">
        <summary class="flex cursor-pointer list-none items-baseline gap-3 py-4 font-heading text-[17px] font-bold text-ink hover:text-accent">
          <span class="flex-none font-mono text-accent">+</span>
          {item.question}
        </summary>
        <p class="m-0 max-w-[760px] pb-5 pl-6 text-[14.5px] leading-relaxed text-neutral-700">
          {item.answer}
        </p>
      </details>
    ))
  }
</div>

<style>
  summary::-webkit-details-marker {
    display: none;
  }
  details[open] summary span {
    transform: rotate(45deg);
    display: inline-block;
  }
</style>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: 0 errors. Nothing renders yet — Task 13 is the consumer.

- [ ] **Step 3: Commit**

```bash
npx prettier --write src/components/FAQ.astro
git add src/components/FAQ.astro
git commit -m "feat: add FAQ component using native details/summary"
```

---

### Task 13: Service page recomposition

**Files:**

- Modify: `src/pages/services/index.astro`

**Interfaces:**

- Consumes: `ServiceTiers` (Task 11), `FAQ` (Task 12), `OrgRoster` (Task 7), `ImageGallery` + `ImageGalleryModal` (existing), `ORGANIZATIONS` / `DEPLOYMENTS` / `TOTAL_ORG_MEMBERS` (Task 1)
- Produces: the final service page

- [ ] **Step 1: Correct the scale claim in `ServiceHero`**

`src/pages/services/index.astro:47` currently ends with "đã triển khai cho 3 đơn vị đang hoạt động" — an understatement of roughly 7×. Replace the `description` prop with:

```
"Hệ thống chấm bài tự động cho trường học và trung tâm dạy lập trình. Ba cách bắt đầu: dùng miễn phí trên luyencode.net, instance mang thương hiệu riêng, hoặc triển khai trọn gói trên hạ tầng của bạn. Hiện có 20 trường và tổ chức đang sử dụng, cùng 4 hệ thống chạy độc lập."
```

- [ ] **Step 2: Add the imports**

```astro
import OrgRoster from '@components/OrgRoster.astro'; import FAQ from '@components/FAQ.astro'; import
ImageGallery from '@components/ImageGallery.astro'; import ImageGalleryModal from
'@components/ImageGalleryModal.astro'; import {(ORGANIZATIONS, DEPLOYMENTS, TOTAL_ORG_MEMBERS)} from
'@/data/organizations';
```

- [ ] **Step 3: Add the frontmatter data**

```ts
const LCOJ_SCREENSHOTS = [
  '/images/project/lcoj-home.png',
  '/images/project/lcoj-problem.png',
  '/images/project/lcoj-contest.png',
  '/images/project/lcoj-submission.png',
  '/images/project/lcoj-ranking-global.png',
  '/images/project/lcoj-contest-ranking.png',
  '/images/project/lcoj-stats.png',
];

const FAQ_ITEMS = [
  {
    question: 'Dữ liệu của trường thuộc về ai?',
    answer:
      'Dữ liệu học sinh, bài tập và kết quả thi thuộc về đơn vị. Với gói triển khai trọn gói, toàn bộ dữ liệu nằm trên hạ tầng của đơn vị. Với gói miễn phí trên luyencode.net, đơn vị có thể yêu cầu xuất dữ liệu bất cứ lúc nào.',
  },
  {
    question: 'Nếu sau này anh không duy trì hệ thống nữa thì sao?',
    answer:
      'Hệ thống dựa trên DMOJ — một nền tảng mã nguồn mở đã được cộng đồng quốc tế duy trì nhiều năm, không phải phần mềm riêng của tôi. Toàn bộ cấu hình và tài liệu quản trị được bàn giao cho đơn vị, nên một kỹ thuật viên khác có thể tiếp quản. luyencode.net đã chạy liên tục từ 2020.',
  },
  {
    question: 'Trường có cần máy chủ riêng không?',
    answer:
      'Không, nếu chọn gói miễn phí hoặc instance riêng — hệ thống chạy trên hạ tầng của tôi. Chỉ gói triển khai trọn gói mới cần máy chủ riêng, và tôi sẽ tư vấn cấu hình phù hợp với quy mô để tránh trả tiền thừa.',
  },
  {
    question: 'Trường có thể dùng đề của mình không?',
    answer:
      'Có. Đơn vị tự tạo bài tập, bộ test và đề thi riêng; đồng thời có thể dùng ngân hàng đề sẵn có trên hệ thống. Hỗ trợ nhập đề hàng loạt từ định dạng phổ biến.',
  },
  {
    question:
      'Đang dùng gói miễn phí, sau này muốn chuyển sang hệ thống riêng thì có mất dữ liệu không?',
    answer:
      'Không. Dữ liệu tổ chức được chuyển sang hệ thống mới khi nâng cấp. Đây là đường đi bình thường: bắt đầu miễn phí, khi quy mô lớn hơn thì chuyển sang instance riêng hoặc hạ tầng riêng.',
  },
  {
    question: 'Hệ thống có chịu được kỳ thi đông người cùng nộp bài không?',
    answer:
      'Có. Hệ thống dùng hàng đợi chấm bài tách riêng khỏi web, nên lượng nộp tăng đột biến không làm treo giao diện. Các kỳ thi thử với hàng trăm thí sinh đồng thời đã chạy ổn định trên hạ tầng hiện tại.',
  },
];
```

- [ ] **Step 4: Recompose the page body**

Sections, in order, each with a numbered kicker matching the homepage convention:

```
ServiceTabs                          (existing)
ServiceHero                          (corrected description from Step 1)
01 / Ba cách bắt đầu                 <ServiceTiers />          (wired in Task 11)
02 / Đang chạy ở đâu                 <OrgRoster variant="full" /> + DEPLOYMENTS list
03 / Có gì trong đó                  <ServiceFeatureGrid features={FEATURES} />
04 / Ngân hàng đề                    problem-bank block
05 / Xem thử hệ thống                <ImageGallery ... />
06 / Quy trình                       <ProcessSteps kicker="$ ./process" steps={STEPS} />
07 / Câu hỏi thường gặp              <FAQ items={FAQ_ITEMS} />
TestimonialSplit                     (edited in Task 14)
CTABand                              (existing)
<ImageGalleryModal ... />
```

Section 02 markup:

```astro
<section class="px-12 pb-12">
  <div class="mb-7 flex items-baseline gap-4">
    <span class="kicker">02 /</span>
    <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Đang chạy ở đâu</h2>
  </div>
  <div class="border-2 border-ink bg-white p-8">
    <div class="mb-4 font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
      {ORGANIZATIONS.length} TỔ CHỨC TRÊN LUYENCODE.NET — {
        TOTAL_ORG_MEMBERS.toLocaleString('vi-VN')
      } THÀNH VIÊN
    </div>
    <OrgRoster variant="full" />
    <div class="mb-4 mt-8 font-mono text-[11px] font-semibold tracking-[0.08em] text-neutral-600">
      HỆ THỐNG CHẠY ĐỘC LẬP
    </div>
    <div class="border-t-2 border-ink">
      {
        DEPLOYMENTS.map((d) => (
          <a
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-baseline gap-3 border-b border-border-light py-3 font-mono text-[13px] text-ink no-underline hover:text-accent"
          >
            <span class="flex-none text-accent">●</span>
            <span class="font-semibold">{d.name}</span>
            <span class="text-neutral-600">— {d.note}</span>
          </a>
        ))
      }
    </div>
  </div>
</section>
```

Section 04 markup. The problem bank is promoted out of a single feature bullet because for a teacher it is often the deciding reason to say yes:

```astro
<section class="px-12 pb-12">
  <div class="mb-7 flex items-baseline gap-4">
    <span class="kicker">04 /</span>
    <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Ngân hàng đề sẵn có</h2>
  </div>
  <div class="rgrid grid grid-cols-[1fr_1.2fr] border-2 border-ink bg-white">
    <div class="border-r-2 border-ink p-8">
      <div class="mb-2 font-heading text-[46px] font-extrabold leading-none text-accent">900+</div>
      <div class="font-mono text-[13px] text-neutral-600">bài tập kèm lời giải, dùng được ngay</div>
    </div>
    <div class="p-8">
      <p class="m-0 text-[14.5px] leading-relaxed text-neutral-700">
        Đơn vị không phải bắt đầu từ con số không. Ngân hàng đề phân theo chủ đề và độ khó, từ bài
        nhập môn tới bài luyện đội tuyển, kèm lời giải và bộ test. Giáo viên có thể dùng trực tiếp,
        chỉnh sửa, hoặc thêm đề riêng của trường.
      </p>
    </div>
  </div>
</section>
```

Section 05 markup. `ImageGallery` requires a matching `ImageGalleryModal` at page level with the same id — the pattern is established in `src/pages/projects.astro:31-33`:

```astro
<section class="px-12 pb-12">
  <div class="mb-7 flex items-baseline gap-4">
    <span class="kicker">05 /</span>
    <h2 class="m-0 font-heading text-[34px] font-extrabold text-ink">Xem thử hệ thống</h2>
  </div>
  <div class="border-2 border-ink bg-white p-8">
    <ImageGallery images={LCOJ_SCREENSHOTS} title="LCOJ" projectId="lcoj-service" />
  </div>
</section>
```

And immediately before `</BaseLayout>`:

```astro
<ImageGalleryModal projects={[{ id: 'lcoj-service', title: 'LCOJ', images: LCOJ_SCREENSHOTS }]} />
```

Wrap `ProcessSteps` and `FAQ` in sections numbered `06 /` and `07 /` following the same heading pattern.

- [ ] **Step 5: Build and check visually**

Run: `npm run build`
Expected: 0 errors.

Visual at http://localhost:4321/services:

- The hero no longer says "3 đơn vị" anywhere. Confirm with `grep -rn "3 đơn vị" src/` returning nothing.
- Section 02 lists all 20 orgs in three columns with member counts, then the 4 independent systems as clickable links.
- Section 05 thumbnails open the modal on click, and the modal closes again.
- FAQ items expand and collapse; the `+` rotates to `×` when open.

- [ ] **Step 6: Commit**

```bash
npx prettier --write src/pages/services/index.astro
git add src/pages/services/index.astro
git commit -m "feat: correct DMOJ service page scale and add roster, problem bank, gallery, FAQ"
```

---

### Task 14: Remove placeholder testimonials

**Files:**

- Modify: `src/components/TestimonialSplit.astro`

**Interfaces:**

- Consumes: `DEPLOYMENTS` from `@/data/organizations`
- Produces: `TestimonialSplit` — no props

Three invented quotes attributed to named people at real organizations currently ship. One was already removed in Task 8 (Nguyễn Văn Minh, `index.astro`). This task removes the other two — Trần Thu Hà and Lê Quốc Bảo in `TestimonialSplit.astro:8-19`.

The component keeps its client list, which is factual, and gains a `TESTIMONIALS` array that is empty until real quotes exist. When the array is empty, the quote column is not rendered and the client list spans the full width.

- [ ] **Step 1: Replace `src/components/TestimonialSplit.astro`**

```astro
---
import { DEPLOYMENTS } from '@/data/organizations';

const clients = DEPLOYMENTS.filter((d) => d.tier === 'managed');

/**
 * Real client quotes only. Leave empty until a real, attributable quote exists —
 * never add an invented quote attributed to a named person at a real organization.
 */
const TESTIMONIALS: { quote: string; attribution: string }[] = [];
---

<div
  class={`rgrid grid ${TESTIMONIALS.length > 0 ? 'grid-cols-2' : 'grid-cols-1'} border-t-2 border-ink bg-white`}
>
  <div class={`rpad px-12 py-9 ${TESTIMONIALS.length > 0 ? 'border-r-2 border-ink' : ''}`}>
    <h2 class="mb-4.5 font-heading text-[26px] font-extrabold text-ink">Đơn vị đang vận hành</h2>
    <div class="flex flex-col gap-3 font-mono text-sm text-ink">
      {
        clients.map((c) => (
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-ink no-underline hover:text-accent"
          >
            <span class="text-accent">●</span> {c.name}{' '}
            <span class="text-neutral-600">— {c.note}</span>
          </a>
        ))
      }
    </div>
  </div>
  {
    TESTIMONIALS.length > 0 && (
      <div class="flex flex-col bg-bg">
        {TESTIMONIALS.map((t, i) => (
          <div class={`flex-1 px-12 py-9 ${i > 0 ? 'border-t-2 border-ink' : ''}`}>
            <p class="mb-3.5 text-[17px] font-medium leading-[1.55] text-ink">“{t.quote}”</p>
            <div class="font-mono text-xs text-neutral-600">— {t.attribution}</div>
          </div>
        ))}
      </div>
    )
  }
</div>
```

- [ ] **Step 2: Verify no invented quotes remain anywhere**

Run:

```bash
grep -rn "Nguyễn Văn Minh\|Trần Thu Hà\|Lê Quốc Bảo" src/
```

Expected: no matches.

- [ ] **Step 3: Build and check visually**

Run: `npm run build`
Expected: 0 errors.

Visual at http://localhost:4321/services: the "Đơn vị đang vận hành" block spans full width with three clickable client links, and no quote column. It should look intentional, not truncated.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/components/TestimonialSplit.astro
git add src/components/TestimonialSplit.astro
git commit -m "fix: remove placeholder testimonials attributed to named people"
```

---

### Task 15: About page corrections and site-wide experience figure

**Files:**

- Modify: `src/pages/about.astro`

**Interfaces:**

- Consumes: nothing
- Produces: nothing

- [ ] **Step 1: Expand the VMO timeline entry**

In `src/pages/about.astro:10-15`, replace the VMO entry's `description` with:

```
'Xây dựng sản phẩm AI fullstack, thiết kế kiến trúc giải pháp, tham gia bidding và dẫn dắt một nhóm kỹ sư nhỏ.'
```

The current text ("Thiết kế hệ thống AI, biến bài toán nghiệp vụ mơ hồ thành sản phẩm có thể đo lường") omits architecture ownership, bidding, and team leadership — the signals a services buyer weighs most.

- [ ] **Step 2: Find and fix every stale experience figure**

Run:

```bash
grep -rn "7+ năm\|7 năm" src/
```

Update each hit to `8 năm`. At time of writing the known hit is the `description` prop in `src/pages/about.astro:42`; the grep is authoritative in case others exist.

- [ ] **Step 3: Build and check visually**

Run: `npm run build`
Expected: 0 errors.

Run: `grep -rn "7+ năm\|7 năm" src/`
Expected: no matches.

Visual at http://localhost:4321/about: the VMO entry names architecture, bidding, and team leadership.

- [ ] **Step 4: Commit**

```bash
npx prettier --write src/pages/about.astro
git add src/pages/about.astro
git commit -m "fix: correct VMO role description and experience figure to 8 years"
```

---

## Final verification

- [ ] Run `npm run build` — 0 errors from `astro check`, build completes.
- [ ] Run `grep -rn "Nguyễn Văn Minh\|Trần Thu Hà\|Lê Quốc Bảo" src/` — no matches.
- [ ] Run `grep -rn "3 đơn vị" src/` — no matches.
- [ ] Run `grep -rn "7+ năm\|7 năm" src/` — no matches.
- [ ] Run `grep -rn "LogosBar\|PricingSplit" src/` — no matches.
- [ ] Run `grep -rn "\[N\]" src/` — exactly one match, in `src/components/StatBar.astro`. This is the known placeholder awaiting the submission count.
- [ ] Visual pass over `/` and `/services` at 1440px, 1024px, and 375px. No horizontal scrollbar at any width; every bordered grid collapses to one column at 375px.

## Open items to resolve before this is publicly announced

These do not block merging — the page is accurate and shippable without them — but each is a known gap:

1. **Submission count** — replace `[N]` in `StatBar.astro`. Get it via `SELECT COUNT(*) FROM judge_submission;` or `Submission.objects.count()`.
2. **Tier 2 pricing** — `ServiceTiers.astro` ships `Trao đổi cụ thể`; replace once confirmed.
3. **Problem count** — this plan uses `900+` (verified: 23 pages × ~40 on the public list). Raise to `1000+` only if org-private problems justify it.
4. **School naming consent** — the 20 names are already public on `luyencode.net/organizations/`, but confirm none object to appearing on a commercial page. Remove any objector from `ORGANIZATIONS` in `src/data/organizations.ts`; every count on both pages is derived, so they update automatically.
5. **Real testimonials** — populate the `TESTIMONIALS` array in `TestimonialSplit.astro` once real quotes exist.
