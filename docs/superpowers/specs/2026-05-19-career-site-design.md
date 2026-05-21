# Career Site v1 — Design Spec

**Date:** 2026-05-19
**Owner:** Jamil Mendez (`Jamil1016` on GitHub)
**Status:** Approved for implementation planning

---

## 1. Summary

A personal career site that doubles as a public portfolio and a private learning/project tracker. The public side showcases six production projects through written case studies; the private side replaces the existing `Learning_Path_AI_Engineer.docx` with a logged-in dashboard. v1 ships in one weekend. Public open-source reference implementations of each project land progressively over the following 10 weeks (Option A phasing).

---

## 2. Goals & Roadmap

### v1 Goals (3-day build)
- A polished public landing that reads as senior IC-level engineering work
- Six project case studies with architecture, decisions, and metrics
- A private dashboard that tracks the 13-week AI Engineer Learning Path
- **Certification progress widget** in the dashboard (reuses `learning_weeks` table with `phase='Certification'` rows)
- **GitHub activity feed widget** showing recent commits across the public showcase repos
- **Custom domain** wired up at launch (e.g. `jamilmendez.dev` — see Section 13 Open Questions)
- **Vercel Analytics** enabled for page-view and Core Web Vitals tracking
- Personal GitHub / Supabase / Vercel accounts only (no work credentials)
- Portable artifact owned by Jamil Mendez, not employer

### v2 (next 1–2 weekends after v1 lands)
- **Blog / MDX posts** — engineering writeups, learning-week recaps. Reuses the existing MDX infrastructure from project case studies.
- **Journal viewer** in the private dashboard — parses `journal/Journal.docx` at build time, renders the recent entries.

### v3 (focused weekend each)
- **Live DARA demo** — clean-room agent running on a sandbox Supabase project with synthetic schema. FastAPI backend (Railway / Fly) + chat UI on the portfolio. Linked from the DARA case study.
- **RAG search** — embeddings over case studies + journal + (eventually) blog posts. Stored in `pgvector` on the same Supabase project. Search box on the landing page that returns cited answers.

### Future / aspirational
- Analytics dashboard for the public showcase repos themselves (stars, clones, issues over time)
- Project-level health badges (Lighthouse, repo activity)
- Multi-language toggle if portfolio audience expands

**Commitment:** every item above is on the roadmap — none are eliminated. Phasing is about ship-rate, not scope reduction.

---

## 3. Architecture

**Stack:**
- Next.js 14 (App Router) — public statically rendered, private client-rendered
- TypeScript end-to-end
- Tailwind CSS + shadcn/ui for the component library and bento grid primitives
- Supabase (personal account) — Auth (email magic link) + Postgres for tracker data
- Vercel (personal account) — hosting, auto-deploy on push to `main`

**Account model:**
All three services (GitHub, Supabase, Vercel) authenticated as `Jamil1016` (personal). No work credentials touch this project. Per-repo `git config user.email` set to personal email; SSH key dedicated to this repo or `gh auth switch -u Jamil1016` before each push.

---

## 4. Repository Layout

```
portfolio/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                       # bento grid landing
│   │   ├── projects/
│   │   │   ├── page.tsx                   # all projects index
│   │   │   └── [slug]/page.tsx            # case study renderer
│   │   ├── about/page.tsx
│   │   └── resume/page.tsx
│   ├── (private)/
│   │   ├── login/page.tsx
│   │   └── dashboard/
│   │       ├── page.tsx                   # learning tracker home
│   │       └── learning/[weekId]/page.tsx # individual week edit
│   ├── api/auth/callback/route.ts         # magic link callback
│   └── layout.tsx
├── components/
│   ├── bento/
│   │   ├── HeroTile.tsx
│   │   ├── MetricTile.tsx
│   │   ├── ProjectTile.tsx
│   │   ├── NowLearningTile.tsx
│   │   ├── StackTile.tsx
│   │   └── CTATile.tsx
│   ├── tracker/
│   │   ├── WeekCard.tsx
│   │   ├── PhaseSection.tsx
│   │   └── StatusBadge.tsx
│   └── ui/                                # shadcn primitives
├── content/
│   └── projects/                          # MDX case studies
│       ├── local-pipeline.mdx
│       ├── gmail-scraper.mdx
│       ├── pipeline-guardian.mdx
│       ├── data-analyst-reporting-agent.mdx
│       ├── date-validator.mdx
│       └── report-automation.mdx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                      # browser client
│   │   └── server.ts                      # server actions client
│   ├── auth.ts                            # email allowlist check
│   └── content.ts                         # MDX loader
├── public/
│   ├── resume.pdf
│   ├── og-image.png
│   └── diagrams/                          # project architecture SVGs
├── supabase/
│   └── migrations/
│       └── 001_learning_weeks.sql
├── styles/globals.css
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.example
├── .env.local                             # gitignored
└── README.md
```

---

## 5. Public Site

### 5.1 Landing — `/`

Bento grid layout (asymmetric tiles, 12-column on desktop, single-column on mobile). Eleven tiles:

| # | Tile | Size | Content |
|---|---|---|---|
| 1 | Hero | 2×2 | Name, role, location, one-line pitch, headshot |
| 2 | Live metric | 2×1 | "6.2M rows / night" with pulsing indicator |
| 3 | Project: local-pipeline | 1×2 | Logo, one-liner, stack badges, status pill, link |
| 4 | Project: pipeline-guardian | 1×1 | Same template |
| 5 | Project: data-analyst-reporting-agent | 1×1 | Same template |
| 6 | Project: gmail-scraper | 1×1 | Same template |
| 7 | Project: date-validator | 1×1 | Same template |
| 8 | Project: report-automation | 1×1 | Same template |
| 9 | Now learning | 2×1 | Pulls the first `in_progress` row from Supabase `learning_weeks` ordered by `sort_order` (via public read-only view). If no `in_progress` row, the tile renders a hardcoded fallback message. |
| 10 | Stack | 2×1 | Tech logo cloud: Python · Supabase · Claude · Next.js · GitHub Actions · Postgres · dbt (soon) |
| 11 | CTA | 2×1 | "Open to senior data / AI engineering roles" + email and LinkedIn |

Tiles are responsive: collapse to single column under 768px, two columns under 1024px.

### 5.2 Project case study — `/projects/[slug]`

One `.mdx` file per project. Shared layout component renders:

1. **Hero block** — title, one-line summary, role, stack badges (logos), status pill ("In production" / "Open source coming W6" / etc.)
2. **Context** — what problem the project solves, scale of operation (sanitized)
3. **Architecture** — embedded SVG diagram, 1–2 paragraphs explaining data flow
4. **Key decisions** — 3–5 bullets of "why this approach"
5. **Metrics** — generic, no-customer numbers ("processes millions of rows nightly", "99.x% uptime", "sub-15s analytics refresh")
6. **Code samples** — 2–4 sanitized snippets inline with syntax highlighting
7. **Links** — `case_study_url` (always this page), `public_repo_url` (only renders when set; otherwise placeholder "Open-source reference implementation: coming Week N")

### 5.3 Projects index — `/projects`

Simple grid of all six case studies, same card style as the bento tiles. No filtering in v1.

### 5.4 About — `/about`

Short bio (3–4 paragraphs), career trajectory (Data Analyst → Senior Data Engineer → AI Engineering Lead), certs in progress (GCP PDE, dbt), contact links.

### 5.5 Resume — `/resume`

HTML version (clean print stylesheet) plus a "Download PDF" button serving `/resume.pdf`.

---

## 6. Private Dashboard

### 6.1 Login — `/login`

Single email input. Submission triggers Supabase magic link. Server-side allowlist: if `email !== process.env.ALLOWED_EMAIL`, return error before issuing link. After click-through, session cookie set, redirect to `/dashboard`.

### 6.2 Dashboard — `/dashboard`

Three sections stacked:

**Section 1: Learning path (primary v1 content)**
Replaces `Learning_Path_AI_Engineer.docx`. Phases as collapsible sections. Each phase contains its week cards. Per card:
- Week label + course title (linked to source URL)
- Status dropdown (Not Started → In Progress → Done)
- Started date (auto-set when moved to In Progress)
- Completed date (auto-set when moved to Done)
- Time-estimate (text field, read-only from seed, e.g. "~6 hrs")
- Apply-to-work action (read-only from seed data)
- Notes (free-text textarea)
- Artifact URL (one field for "what I produced from this week")

Bulk-edit not needed in v1. Optimistic UI updates.

**Section 2: Capstone tracker**
Single card for the public writeup capstone (Pipeline Guardian or DARA). Stored as a row in the same `learning_weeks` table with `phase = 'Capstone'` and `sort_order = 999` so it sorts last and is queryable by phase filter. Same field set as a week card; `course_title` holds the artifact title, `artifact_url` holds the published writeup link.

**Section 3: Quick stats**
Three numbers: weeks done / weeks total, hours logged, current streak. No charts in v1.

### 6.3 Mobile

Fully responsive. Status changes editable from phone — that's the primary use case (mark progress on the train, etc.).

---

## 7. Data Model

### 7.1 Tables

```sql
-- learning_weeks
create table public.learning_weeks (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null references auth.users(id) on delete cascade,
  phase         text not null,
  week_label    text not null,
  course_title  text not null,
  url           text,
  time_estimate text,
  apply_action  text,
  status        text not null default 'not_started'
                check (status in ('not_started','in_progress','done')),
  started_at    timestamptz,
  completed_at  timestamptz,
  notes         text,
  artifact_url  text,
  sort_order    int not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index on public.learning_weeks (owner_id, sort_order);
```

### 7.2 RLS

```sql
alter table public.learning_weeks enable row level security;

create policy "owner can read own"
  on public.learning_weeks for select
  using (auth.uid() = owner_id);

create policy "owner can write own"
  on public.learning_weeks for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);
```

### 7.3 Public read view

```sql
create view public.v_now_learning as
select phase, week_label, course_title, url
from public.learning_weeks
where status = 'in_progress'
order by sort_order
limit 1;

grant select on public.v_now_learning to anon;
```

Used by the "Now learning" bento tile. If no row is `in_progress`, the tile falls back to a hardcoded message.

### 7.4 Seed

One-time seed script reads the 13 weeks from `_build_learning_path.py` data definition and inserts them under the owner's `auth.uid()`. Idempotent: re-running does nothing if rows already exist.

---

## 8. Auth Flow

- Supabase Auth, email magic link only
- Allowlist enforced server-side in the magic-link request handler: if requesting email ≠ `ALLOWED_EMAIL` env var, return 403 before Supabase issues the link
- No public signup form, no password
- Session managed via `@supabase/ssr` cookies
- All `/dashboard/**` routes wrapped in middleware that checks session and email match; redirect to `/login` if missing

---

## 9. Public Showcase Repos — Option A Phasing

Six reference-implementation repos under `Jamil1016`, all named identically to the work counterparts. **Created as placeholder repos in weekend 1**, then filled with clean-room code on the schedule below. Each placeholder repo contains a `README.md` reading:

> Open-source reference implementation of the *X pattern*. Production version built and operated privately. Reference code lands Week N.

| Week | Repo | Effort | Order rationale |
|---|---|---|---|
| W2–3 | `gmail-scraper` | Small | Self-contained, single API, easy to sanitize first |
| W4–5 | `report-automation` | Small–medium | Currently in development; designed public-first from now on |
| W6–8 | `pipeline-guardian` | Medium | Headline AI piece — worth taking time to do right |
| W9–10 | `data-analyst-reporting-agent` | Medium | Most distinctive, public version is the marquee artifact |
| W11 | `date-validator` | Small | Quick fill-in |
| W12 | `local-pipeline` | Large | Most complex, save for last |

**Clean-room rule:** Each public repo is written on personal hardware, on personal time, against synthetic or public-API data — never copy-pasted from work. Same patterns, fresh code, your IP.

**Work-side action — REVISED 2026-05-20:**
- `jamilmendez-ontel/local-pipeline` and `jamilmendez-ontel/gmail-scraper` **stay PUBLIC**. Original plan was to flip both to private at launch, but the work account runs multiple GitHub Actions workflows (pipeline.yml, gmail-pipeline.yml, timer-* triggers, etc.) and public repos get unlimited free Actions minutes while private repos are capped at 2,000/month on the free tier. The portfolio still points to the personal `Jamil1016/<repo>` showcases as the "open-source reference implementation"; the work-account public repos serve a different audience (anyone scrolling that GitHub profile) and are acceptable to remain visible as-is.

---

## 10. Project Case Studies

Each `.mdx` file uses the template in §5.2. Initial drafts for v1:

| Slug | Title | Stack badges | Status pill at launch |
|---|---|---|---|
| `local-pipeline` | Async ETL platform for telecom operations | Python · asyncpg · Postgres · GitHub Actions | "Open source: coming W12" |
| `pipeline-guardian` | Auto-remediation agent for ETL failures | Python · Claude API · Supabase | "Open source: coming W8" |
| `data-analyst-reporting-agent` | Schema-aware NL→SQL agent (DARA) | FastAPI · Next.js · Claude API · Postgres | "Open source: coming W10" |
| `gmail-scraper` | Gmail document parser with JSONB extraction | Python · Gmail API · Postgres | "Open source: coming W3" |
| `date-validator` | Cross-source date validator (Swift × Gmail) | Python · GitHub Actions · Google Sheets API | "Open source: coming W11" |
| `report-automation` | Automated daily finance report pipeline | Python · Supabase · Chart.js · GitHub Actions | "Open source: coming W5" |

Each case study includes 2–4 sanitized code snippets and an architecture SVG.

---

## 11. Deployment

- **GitHub:** `github.com/Jamil1016/portfolio` (private until launch, then public)
- **Vercel:** project imported from the repo under personal Vercel account, auto-deploy on push to `main`
- **Supabase:** new project under personal Supabase account (free tier sufficient), apply migration `001_learning_weeks.sql`
- **Env vars on Vercel:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
  - `ALLOWED_EMAIL` (your personal email)
- **Domain:** `<slug>.vercel.app` at launch; custom domain deferred

---

## 12. Success Criteria

1. Lighthouse ≥ 95 on the landing page (Performance + Accessibility + Best Practices + SEO)
2. Mobile responsive at 375px viewport with no horizontal scroll
3. Landing TTFB < 1.5s on Vercel free tier
4. Magic-link login works end-to-end on the deployed site
5. Learning tracker editable from a phone (status change + notes save without errors)
6. Six project case studies live, each with architecture diagram + 2+ code snippets + metrics
7. Resume PDF downloadable from `/resume`
8. Six placeholder public repos live on `Jamil1016` with README + "coming Week N" date

---

## 13. Open Questions

- Headshot photo: existing one to reuse, or generate a clean replacement?
- Domain choice: `jamil.dev`, `jamilmendez.dev`, `jmendez.dev`, or stay on `vercel.app` for now?
- LinkedIn URL and personal email for the CTA tile (need exact strings)
- Resume PDF: existing one in `career-development/` to reuse, or generate from CAREER_PLAN.md?

---

## 14. Future Work Index

All future work is captured in Section 2 (Roadmap). This section is intentionally short — see §2 for the v2 / v3 commitments and the "none eliminated" guarantee.
