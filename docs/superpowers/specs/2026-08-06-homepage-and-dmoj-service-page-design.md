# Homepage & DMOJ service page redesign

Date: 2026-08-06
Status: approved design, ready for implementation planning

## Problem

The homepage asks visitors to trust *claims* ("AI Engineer", "7+ năm kinh nghiệm") when it could
show *evidence*. Every verifiable trust asset — national awards, named employers, 20 institutions
running systems built and operated by Hieu — sits one click away on `/about` or `/services`, and
most visitors never take that click.

The DMOJ service page has the inverse problem: it actively understates the track record. It claims
deployment for "3 đơn vị đang hoạt động" when the real footprint is roughly 7× that.

## Goals

1. A visitor who lands on `/` and reads nothing but the first screen should come away believing
   Hieu is credible, and knowing which door is theirs (commercial work vs. education platform).
2. Trust should rest on things a visitor can verify by clicking, not on adjectives.
3. The DMOJ service page should describe what is actually offered — three tiers, not two — and
   state the real scale.

## Audience & positioning decisions

- **Audience:** both commercial buyers (AI/software) and education buyers (online judge). The
  homepage positions Hieu personally as the credibility spine, with services as clearly-labeled
  parallel doors. A visitor must be able to self-select within seconds.
- **The education-infrastructure story leads the hero** — it is the most verifiable, most
  distinctive, most human asset available.
- **On the homepage, DMOJ is proof, not product.** Operating public infrastructure reliably for
  five years is evidence of engineering judgment that transfers to a buyer who will never care
  about online judges. On the service page, DMOJ is the product.
- Target DMOJ share of homepage: ~35% (one section, one skills column, one service card, half the
  hero). The pre-design draft reached ~70%, which over-weighted the offering that is mostly free.

## Verified facts

Confirmed from public sources on 2026-08-06.

| Fact | Value | Source |
|---|---|---|
| Organizations on luyencode.net | 22 total; 2 are Hieu's own (Luyện Code Club, Luyện Code School) | `luyencode.net/organizations/` |
| External institutions | 20 | derived from above |
| Members across the 20 external orgs | 2,520 | sum of listed member counts |
| Total platform users | 20,000+ | stated by Hieu |
| Platform launch | October 2020 (~5 years continuous operation) | luyencode.net |
| Public problems | ~900 (23 pages × ~40) | `luyencode.net/problems/` |
| Separate branded instance | LNQOJ — Trường THCS Lý Nhật Quang, Đô Lương, Nghệ An | `lynhatquang.luyencode.net` |
| Managed deployments | cothilaptrinh.vn, laptrinh.online, codebuddy.vn (domain + VPS + deploy + maintain) | stated by Hieu |
| Experience | 8 years | stated by Hieu |
| Current role | VMO — AI fullstack, bidding, solution architecture, leads a small team | stated by Hieu |
| Past roles | Zalo, VCCorp; MSc JAIST (Japan) | `about.astro` |

Institutional mix among the 20: 3 universities (ĐH Sư phạm Hà Nội, ĐH Kinh Tế–Kỹ thuật Công
nghiệp, UTL707), 3 chuyên high schools (Nguyễn Chí Thanh Đăk Nông, Lê Quý Đôn Quảng Trị, Lý Tự
Trọng Cần Thơ), one provincial competition team (Đội Tỉnh Đồng Tháp), one boarding school for
ethnic-minority students (PTDT Nội Trú THCS M'Drắk), plus THPT/THCS across ~13 provinces.

### The three tiers

| Tier | What they get | Who is on it |
|---|---|---|
| Miễn phí, dùng chung | Organization on luyencode.net | 20 schools & universities |
| Instance riêng | Own branding + subdomain | LNQOJ (THCS Lý Nhật Quang) |
| Triển khai trọn gói | Domain + VPS + deployment + operations | cothilaptrinh.vn, laptrinh.online, codebuddy.vn |

## Open items

These block final copy but not implementation. Scaffold with clearly-marked placeholders.

1. **Submission count** — `Submission.objects.count()` / `SELECT COUNT(*) FROM judge_submission;`.
   Needed for StatBar slot 4.
2. **Tier 2 pricing** — free, or negotiated?
3. **Problem count** — is `1000+` defensible, or should copy read `900+`? Public list shows ~900;
   the higher figure is plausible if org-private problems count.
4. **Consent** — any school that should not be named. Names are already public on luyencode.net,
   but featuring them as marketing on a commercial page is a different act.
5. **Real testimonials** — three placeholder quotes with invented attributions currently ship:
   Nguyễn Văn Minh (`index.astro`), Trần Thu Hà and Lê Quốc Bảo (`TestimonialSplit.astro`).
   These must be replaced with real quotes or removed. Do not ship invented quotes attributed to
   named people at real organizations.

## Homepage design

### Structure

```
HERO                     tightened; two CTAs = two doors
StatBar                  operational scale
CareerStrip              NEW — replaces LogosBar
AwardsBand               NEW — four awards named in full
01 / Chuyên môn          NEW — 3 columns, each ending in a proof line
02 / Dịch vụ             existing 3 ServiceCards
03 / Case study          LCOJ + 20-org roster as its evidence block
04 / Dự án               NEW — 4-up grid, AI-forward
05 / Viết & nghiên cứu   existing blog list, retitled
CTABand
```

### Hero

Role line becomes `AI Engineer · Kiến trúc giải pháp · Hà Nội`. The current `AI Engineer` alone
reads two levels below someone who designs architecture, runs bidding, and leads a team.

Paragraph drops from ~65 words to ~34, every clause a verifiable fact:

> Tôi xây hệ thống AI chạy thật trong production — và vận hành hạ tầng luyện code miễn phí cho
> 20+ trường học trên khắp Việt Nam, từ THPT chuyên đến trường nội trú vùng cao.

Two CTAs, making the two doors literal: `Nhận báo giá dịch vụ →` (commercial) and
`OJ miễn phí cho trường` (education). Photo and `TerminalWindow` stay in the right column.

### StatBar

Labels frame the numbers as operational scale rather than product metrics, so they read as
credibility for any buyer:

```
8 năm              20.000+            20+                [N]
kinh nghiệm        người dùng trên    tổ chức đang       lượt chấm bài
AI & hệ thống      hệ thống tôi       sử dụng            đã xử lý
                   vận hành
```

Replaces the current `7+ / 3 hệ thống OJ / 4 giải thưởng / JAIST`. Awards and JAIST move to
AwardsBand and CareerStrip respectively, where they get named instead of compressed to a digit.

### CareerStrip (replaces LogosBar)

`LogosBar` is deleted. It lists four bare domains under "ĐANG VẬN HÀNH CHO", one of which
(`luyencode.net`) is Hieu's own project — a claim a sharp reader will catch. The three real client
domains move to the case study section, where they become clickable live systems.

```
HIỆN TẠI   VMO — AI fullstack · kiến trúc giải pháp · dẫn dắt team
TRƯỚC ĐÓ   Zalo · VCCorp          HỌC VẤN   Thạc sĩ JAIST, Nhật Bản
```

Tiered rather than flat, because seniority is the deciding signal for a services buyer.

### AwardsBand

Four columns, each award named in full:

```
Champion            Giải Nhất           Giải Nhì            Giải Nhì
AI4VN National      ALQAC — Legal       ACM/ICPC            Speech-to-Text
Grand Finale        Document Retrieval  Vietnam National    VLSP 2019
```

### 01 / Chuyên môn

Three columns. Each terminates in a proof line tied to a system that exists — this is the
"evidence not adjectives" rule made structural.

```
AI & Machine Learning       Hệ thống & hạ tầng          Nền tảng giáo dục
LLM · RAG · NLP             API · kiến trúc             Online judge · chấm
Speech · Agentic AI         triển khai · vận hành       tự động · contest

Python · PyTorch            FastAPI · Django            DMOJ · Vue · Docker
LangGraph · ChromaDB        Docker · K8s · Postgres

→ +12% độ chính xác ASR     → −15% lỗi dịch vụ          → 20+ trường, 20.000+
  cho trợ lý KiKi (Zalo)      trên Kubernetes (Zalo)      người dùng, 5 năm
```

### 03 / Case study

Existing `CaseStudySpotlight` for LCOJ, extended with: a real screenshot (7 available in
`/images/project/`), corrected metrics, the three managed deployments as clickable links, and a
quote slot that stays empty until a real quote exists.

The 20-org roster renders inside this section as its evidence block — all 20 names, monospace,
bordered, linked to `luyencode.net/organizations/` for verification. It is proof of the case
study, not a standalone product pitch.

*Risk:* this becomes the heaviest block on the page (narrative + screenshot + metrics + quote +
20 names). If it reads bloated once built, the cut is 12 names plus `+8 tổ chức khác →`.

### 04 / Dự án

4-up grid of the non-flagship projects: NexusAI, LinguistAI, Behivest, Beli5. AI-forward ordering,
because NexusAI (RAG) and LinguistAI (LLM/Whisper) are the only AI evidence on the page —
without them the AI services door rests on claims alone.

### 05 / Viết & nghiên cứu

Existing blog list, retitled from `Bài viết mới`. Six of ten posts are AI/ML deep-dives (RAG in
Production, Inverted HyDE, fine-tuning BERT, beam search); this is a research portfolio, not a
news feed, and it carries real AI credibility.

*Noted, out of scope:* 9 of 10 posts are in English on a Vietnamese-language site. Fine for AI
buyers, a mismatch for school directors.

### Band-stacking risk

Four horizontal bands stack under the hero (StatBar, CareerStrip, AwardsBand), which is heavy in
this brutalist style. Mitigation: alternate backgrounds (`bg` / `white` / `bg`) and vary internal
rhythm — StatBar is large numerals, CareerStrip a single inline row, AwardsBand four cells of
small text. Fallback if still heavy: fold CareerStrip into the hero's right column.

## DMOJ service page design (`/services`)

### Structure

```
ServiceTabs
ServiceHero              corrected scale; three doors named
01 / Ba cách bắt đầu     3 tiers — replaces PricingSplit
02 / Đang chạy ở đâu     20-org roster + LNQOJ + 3 managed deployments
03 / Có gì trong đó      ServiceFeatureGrid, kept
04 / Ngân hàng đề        problem bank promoted to its own section
05 / Xem thử hệ thống    ImageGallery with the 7 LCOJ screenshots
06 / Quy trình           ProcessSteps, kept
07 / Câu hỏi thường gặp  NEW
TestimonialSplit         real quotes only
CTABand
```

### Fixes

**Scale correction.** `services/index.astro:47` claims "3 đơn vị đang hoạt động". Replace with the
real footprint: 20 institutions on luyencode.net, one branded instance, three managed deployments.

**Three tiers, not two.** `PricingSplit` is replaced. Beyond omitting the branded-instance tier,
its free-tier copy ("cùng phạm vi trọn gói, không thu phí dịch vụ") implies a free full deployment.
That is not what the 20 orgs receive — they get an organization on shared infrastructure. A school
that signs up expecting a dedicated system will feel misled.

**Roster on the page.** The 20 schools currently appear nowhere on the page selling this service.

**Problem bank promoted.** Currently the third bullet of the third feature card. For a teacher,
"~900 bài tập kèm lời giải, sẵn sàng dùng" may be the strongest single reason to say yes.

**Screenshots.** Seven LCOJ screenshots exist and are unused here. `ImageGallery` already handles
this pattern.

**FAQ.** Answers the fears that stop adoption: data ownership, what happens if maintenance stops,
whether a server is needed, importing own problems, migrating between tiers, contest formats.

**Positioning.** The page is framed as a *deployment* service, but 20 of 24 relationships use the
free hosted tier, which involves no deployment. The page should serve that door first.

### CTAs

Both doors route to `/contact`, as today — no new signup flow. The free-tier CTA is labelled
distinctly so a school knows the contact form is the right path for them.

## Components

**New**
- `CareerStrip.astro` — tiered career band (homepage)
- `AwardsBand.astro` — 4-column awards band (homepage)
- `SkillsGrid.astro` — 3-column capabilities with proof lines (homepage)
- `OrgRoster.astro` — organization roster; `variant` prop for compact (homepage case study) vs.
  full (service page)
- `ServiceTiers.astro` — three-tier comparison (service page)
- `FAQ.astro` — accordion or bordered list (service page)

**Modified**
- `Hero.astro` — copy, role line, two CTAs
- `StatBar.astro` — new stats and labels
- `CaseStudySpotlight.astro` — screenshot support, client links, optional quote
- `index.astro` — recomposition
- `services/index.astro` — recomposition, scale correction
- `about.astro` — VMO entry currently reads only "Thiết kế hệ thống AI"; add architecture,
  bidding, team lead. Also 7+ → 8 years wherever it appears.

**Deleted**
- `LogosBar.astro`
- `PricingSplit.astro` (superseded by `ServiceTiers`)

**Reused unchanged**
- `ServiceCard`, `ProjectCard`, `BlogCard`, `CTABand`, `ProcessSteps`, `ServiceFeatureGrid`,
  `ServiceHero`, `ImageGallery`, `TerminalWindow`

### Data

The 20 organizations live in `src/data/organizations.ts` as a typed array (`name`, `slug`,
`members`). Not a content collection — it is a flat list and a collection would be overkill.
Type-checked by `astro check`, editable without touching component code.

Deployment records (LNQOJ + the three managed clients) live alongside it as a second typed array
with `name`, `url`, `tier`, and `note`.

### Conventions

All new bordered grid sections use the existing `.rgrid` / `.rwrap` / `.rpad` helpers defined in
the single `@media (max-width: 900px)` block in `global.css`, per the established responsive
pattern. No per-component Tailwind responsive variants. Sharp corners, 2px `border-ink`,
`font-mono` for labels and kickers, no `dark:` classes.

## Non-goals

- No backend or signup flow; the contact form stays a client-side mock.
- No language switcher or i18n routing.
- No process section on the homepage — all three service pages already carry `ProcessSteps`.
- No changes to the AI or software service pages beyond shared component updates.
- No redesign of the blog, projects, or contact pages.

## Sequencing

Two phases. Phase 1 is the homepage; phase 2 is the DMOJ service page. `OrgRoster` is built in
phase 1 (compact variant) and extended in phase 2 (full variant), so the shared component lands
before both consumers need it.

## Verification

`npm run build` (runs `astro check`) must pass. There is no test suite. Visual check at
`npm run dev` for the band-stacking and roster-density risks noted above.
