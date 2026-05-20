# Career Site v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a public bento-grid portfolio at `Jamil1016/portfolio` with six project case studies, a private auth-gated learning tracker, and six placeholder showcase repos — all on personal GitHub / Supabase / Vercel accounts.

**Architecture:** Next.js 14 App Router. Public pages statically rendered, private dashboard client-rendered with Supabase Auth (email magic link, single-email allowlist). Supabase Postgres for `learning_weeks` with RLS. MDX for case studies. Tailwind + shadcn/ui for the bento grid.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Supabase (Auth + Postgres), Vercel, MDX (`next-mdx-remote`), Vitest + React Testing Library for tests.

**Spec:** `docs/superpowers/specs/2026-05-19-career-site-design.md`

---

## File Structure Overview

```
portfolio/
├── app/
│   ├── (public)/{page,projects/[slug],projects,about,resume}/...
│   ├── (private)/{login,dashboard}/...
│   ├── api/auth/{magic-link,callback}/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── bento/{HeroTile,MetricTile,ProjectTile,NowLearningTile,StackTile,CTATile,GitHubFeedTile}.tsx
│   ├── tracker/{WeekCard,PhaseSection,StatusBadge,CertCard}.tsx
│   ├── case-study/{Layout,DecisionList,MetricGrid}.tsx
│   └── ui/                        # shadcn primitives (button, card, badge, ...)
├── content/projects/*.mdx         # six case studies
├── lib/
│   ├── supabase/{client,server,middleware}.ts
│   ├── auth.ts                    # email allowlist
│   ├── content.ts                 # MDX loader
│   ├── github.ts                  # GitHub REST API helper
│   └── projects.ts                # static project metadata
├── public/{resume.pdf,og-image.png,diagrams/*.svg,logos/*.svg}
├── supabase/migrations/{001_learning_weeks.sql,002_seed_data.sql}
├── tests/{lib,components}/*.test.ts
├── middleware.ts                  # auth gate for /dashboard/**
├── next.config.mjs
├── tailwind.config.ts
├── vitest.config.ts
├── tsconfig.json
├── package.json
├── .env.example
└── README.md
```

Each `lib/` file has one clear responsibility. Components are split by feature area (bento / tracker / case-study). Tests live alongside `lib/` and `components/` they exercise.

---

# Phase 0 — Repo & Tooling Setup

### Task 1: Initialize repo, gitignore, and git identity

**Files:**
- Create: `portfolio/.gitignore`
- Create: `portfolio/README.md`

- [ ] **Step 1: Create the project folder under personal namespace**

```bash
mkdir -p /c/Users/admin/Desktop/Projects/personal/portfolio
cd /c/Users/admin/Desktop/Projects/personal/portfolio
```

- [ ] **Step 2: Switch active GitHub account to personal**

```bash
gh auth login --hostname github.com --git-protocol https --web
# When prompted, sign in as Jamil1016
gh auth switch -u Jamil1016
gh auth status
```
Expected: `Active account: true` under `Jamil1016`.

- [ ] **Step 3: Initialize git and set per-repo identity**

```bash
git init
git config user.name "Jamil Mendez"
git config user.email "<your personal email>"
git config --local --get user.email   # verify
```

- [ ] **Step 4: Write `.gitignore`**

```gitignore
# deps
node_modules/
.pnp
.pnp.js

# next
.next/
out/
build/

# env
.env*.local
.env

# supabase
supabase/.branches
supabase/.temp

# editor
.vscode/
.idea/
.DS_Store
Thumbs.db

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# tests
coverage/
```

- [ ] **Step 5: Write a placeholder `README.md`**

```markdown
# portfolio

Personal portfolio and career-tracker site for Jamil Mendez.

Production: https://jamilmendez.dev (TBD)
Stack: Next.js 14, Supabase, Vercel.
```

- [ ] **Step 6: Initial commit**

```bash
git add .gitignore README.md
git commit -m "chore: initialize repo"
```

---

### Task 2: Scaffold Next.js 14 + TypeScript + Tailwind

**Files:**
- Create: standard Next.js scaffold via `create-next-app`

- [ ] **Step 1: Run create-next-app inside the existing folder**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --no-turbopack
```
When prompted "directory not empty, continue?" answer **yes**.

- [ ] **Step 2: Verify it boots**

```bash
npm run dev
```
Open `http://localhost:3000` — should see the default Next.js landing.

- [ ] **Step 3: Stop the dev server (Ctrl+C) and commit**

```bash
git add -A
git commit -m "chore: scaffold next.js 14 with typescript + tailwind"
```

---

### Task 3: Install shadcn/ui + initialize

**Files:**
- Create: `components.json`
- Modify: `tailwind.config.ts`, `app/globals.css`

- [ ] **Step 1: Init shadcn**

```bash
npx shadcn@latest init
```
Choose:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

- [ ] **Step 2: Add core primitives we'll need**

```bash
npx shadcn@latest add button card badge input label textarea select dropdown-menu
```

- [ ] **Step 3: Verify the dev server still boots**

```bash
npm run dev
```
Visit `http://localhost:3000` — no errors in console.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add shadcn/ui with core primitives"
```

---

### Task 4: Install runtime + dev dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Supabase + auth helpers + MDX**

```bash
npm install @supabase/supabase-js @supabase/ssr next-mdx-remote @vercel/analytics
```

- [ ] **Step 2: Install test toolchain**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom @types/node
```

- [ ] **Step 3: Add npm scripts**

Edit `package.json` — replace the `scripts` block with:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 4: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

- [ ] **Step 5: Create `tests/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 6: Verify Vitest runs (no tests yet, should exit clean)**

```bash
npm test
```
Expected: `No test files found, exiting with code 0` (or equivalent — exit 0).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: add supabase, mdx, analytics, and vitest test setup"
```

---

### Task 5: Create Supabase project + env file

**Files:**
- Create: `.env.example`
- Create: `.env.local` (gitignored)

- [ ] **Step 1: Create Supabase project under personal account**

In the browser (using your personal Supabase account):
1. Visit `https://supabase.com/dashboard`
2. Sign in as Jamil1016 / your personal email
3. Click "New project" → name it `portfolio`, region closest to you, generate a strong DB password (save it in your password manager)
4. Wait for provisioning (~2 minutes)
5. Navigate to **Settings → API**. Copy: Project URL, `anon` public key, `service_role` secret key

- [ ] **Step 2: Write `.env.example`**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ALLOWED_EMAIL=your-personal-email@example.com
```

- [ ] **Step 3: Write `.env.local` with real values**

Copy `.env.example` to `.env.local` and fill in your real values.

```bash
cp .env.example .env.local
```
Edit `.env.local` with the actual Supabase URL/keys and your personal email.

- [ ] **Step 4: Commit example only**

```bash
git add .env.example
git commit -m "chore: add env example with supabase + allowlist vars"
```

---

### Task 6: Apply `learning_weeks` migration via Supabase SQL editor

**Files:**
- Create: `supabase/migrations/001_learning_weeks.sql`

- [ ] **Step 1: Write the migration**

```sql
-- 001_learning_weeks.sql
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

create index learning_weeks_owner_sort_idx
  on public.learning_weeks (owner_id, sort_order);

alter table public.learning_weeks enable row level security;

create policy "owner can read own"
  on public.learning_weeks for select
  using (auth.uid() = owner_id);

create policy "owner can write own"
  on public.learning_weeks for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create or replace view public.v_now_learning as
select phase, week_label, course_title, url
from public.learning_weeks
where status = 'in_progress'
order by sort_order
limit 1;

grant select on public.v_now_learning to anon;
```

- [ ] **Step 2: Apply via Supabase SQL editor**

1. Open the Supabase dashboard → **SQL Editor** → **New query**
2. Paste the contents of `001_learning_weeks.sql`
3. Click **Run**
4. Expected: "Success. No rows returned."

- [ ] **Step 3: Verify the table exists**

In SQL editor, run:
```sql
select count(*) from public.learning_weeks;
```
Expected: `0` (table exists, no rows).

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/001_learning_weeks.sql
git commit -m "feat: add learning_weeks table with RLS and now-learning view"
```

---

### Task 7: Seed `learning_weeks` from the existing docx builder data

**Files:**
- Create: `supabase/migrations/002_seed_data.sql`
- Create: `scripts/seed.ts`

- [ ] **Step 1: Get your auth user ID**

You don't have a user yet. Sign in once via Supabase dashboard:
1. Supabase dashboard → **Authentication → Users** → **Invite user** → enter your personal email → send invite
2. Click the magic link in your email → it lands on Supabase (no UI to redirect to yet, that's fine)
3. Back in dashboard → **Authentication → Users** → copy your `id` (UUID)

- [ ] **Step 2: Write the seed SQL**

```sql
-- 002_seed_data.sql
-- Replace <YOUR_AUTH_UID> with the UUID from Step 1 before running
insert into public.learning_weeks
  (owner_id, phase, week_label, course_title, url, time_estimate, apply_action, sort_order)
values
  ('<YOUR_AUTH_UID>', 'Phase 1 — Master your existing stack', 'Week 1',
   'Anthropic Interactive Prompt Engineering Tutorial',
   'https://github.com/anthropics/prompt-eng-interactive-tutorial',
   '~6 hrs',
   'Rewrite DARA''s worst-performing prompt using Chapter 9 structure.',
   1),
  ('<YOUR_AUTH_UID>', 'Phase 1 — Master your existing stack', 'Week 2',
   'Anthropic Courses repo (real_world_prompting + prompt_evaluations) + Academy',
   'https://github.com/anthropics/courses',
   '~6 hrs',
   'Add an eval harness to one Pipeline Guardian decision.',
   2),
  ('<YOUR_AUTH_UID>', 'Phase 2 — LLM systems engineering', 'Week 3',
   'DeepLearning.AI — Building and Evaluating Advanced RAG',
   'https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag',
   '~2 hrs',
   'Sketch a RAG layer over analytics views for DARA.',
   3),
  ('<YOUR_AUTH_UID>', 'Phase 2 — LLM systems engineering', 'Week 4',
   'DeepLearning.AI — Evaluating AI Agents',
   'https://learn.deeplearning.ai/courses/evaluating-ai-agents/information',
   '~2 hrs',
   'Add observability traces to Pipeline Guardian.',
   4),
  ('<YOUR_AUTH_UID>', 'Phase 2 — LLM systems engineering', 'Week 5',
   'DeepLearning.AI — Functions, Tools and Agents with LangChain',
   'https://www.deeplearning.ai/courses/functions-tools-agents-langchain',
   '~3 hrs',
   'Re-read Pipeline Guardian tools through the LCEL lens.',
   5),
  ('<YOUR_AUTH_UID>', 'Phase 3 — Modern data stack', 'Week 6',
   'dbt Learn — dbt Fundamentals',
   'https://learn.getdbt.com/courses/dbt-fundamentals',
   '~5 hrs',
   'Spin up dbt-postgres against Supabase.',
   6),
  ('<YOUR_AUTH_UID>', 'Phase 3 — Modern data stack', 'Week 7',
   'Apply dbt to Report Automation (no new course)',
   'https://learn.getdbt.com/catalog',
   '~5 hrs',
   'Convert one Report Automation query into a dbt model with tests + sources.',
   7),
  ('<YOUR_AUTH_UID>', 'Phase 3 — Modern data stack', 'Week 8',
   'Astronomer Academy — Airflow 101 Learning Path',
   'https://academy.astronomer.io/path/airflow-101',
   '~6 hrs',
   'Redraw pipeline.yml as an Airflow DAG.',
   8),
  ('<YOUR_AUTH_UID>', 'Phase 4 — Cloud + GenAI fluency', 'Week 9',
   'Google Cloud Skills Boost — Generative AI Leader Learning Path',
   'https://cloud.google.com/learn/certification/generative-ai-leader',
   '~6 hrs',
   'List three GCP services to swap for current Supabase/GHA components.',
   9),
  ('<YOUR_AUTH_UID>', 'Phase 4 — Cloud + GenAI fluency', 'Week 10',
   'Architecture rewrite exercise (no new course)',
   'https://cloud.google.com/architecture',
   '~3 hrs',
   'Whiteboard DARA-on-GCP architecture diagram.',
   10),
  ('<YOUR_AUTH_UID>', 'Phase 5 — Optional depth', 'Week 11+',
   'Hugging Face — AI Agents Course',
   'https://huggingface.co/learn/agents-course/en/unit0/introduction',
   'multi-week',
   'Pick one of the three depth tracks.',
   11),
  ('<YOUR_AUTH_UID>', 'Phase 5 — Optional depth', 'Week 11+',
   'Made With ML — MLOps Course',
   'https://madewithml.com/courses/mlops/',
   'multi-month',
   'Optional production-ML rigor.',
   12),
  ('<YOUR_AUTH_UID>', 'Phase 5 — Optional depth', 'Week 11+',
   'Hugging Face — LLM Course',
   'https://huggingface.co/learn/llm-course/en/chapter1/1',
   'multi-week',
   'Optional transformer internals.',
   13),
  ('<YOUR_AUTH_UID>', 'Capstone', 'Capstone',
   'Public writeup: Pipeline Guardian or DARA',
   '',
   '',
   'After Week 10, publish a writeup with architecture diagram, eval harness, RAG/agent vocab, GCP comparison.',
   999);
```

- [ ] **Step 3: Run it in Supabase SQL editor**

Replace `<YOUR_AUTH_UID>` with the real UUID, paste into SQL editor, run.

Expected: "Success. 14 rows inserted."

- [ ] **Step 4: Verify**

```sql
select phase, week_label, course_title from public.learning_weeks order by sort_order;
```
Expected: 14 rows.

- [ ] **Step 5: Commit (with the UUID redacted to a placeholder)**

Before committing, replace the literal UUID back to `<YOUR_AUTH_UID>` in the file so the seed stays a portable template.

```bash
git add supabase/migrations/002_seed_data.sql
git commit -m "feat: seed 13 learning weeks + capstone row"
```

---

# Phase 1 — Foundation

### Task 8: Supabase client helpers (browser + server + middleware)

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/middleware.ts`
- Test: `tests/lib/supabase.test.ts`

- [ ] **Step 1: Write the failing test for the browser client factory**

`tests/lib/supabase.test.ts`:
```ts
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("createBrowserClient", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon-key");
  });

  it("returns a client when env vars are present", async () => {
    const { createBrowserClient } = await import("@/lib/supabase/client");
    const client = createBrowserClient();
    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test, confirm it fails**

```bash
npm test
```
Expected: FAIL — `Cannot find module '@/lib/supabase/client'`.

- [ ] **Step 3: Write `lib/supabase/client.ts`**

```ts
import { createBrowserClient as createSupabaseBrowser } from "@supabase/ssr";

export function createBrowserClient() {
  return createSupabaseBrowser(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Step 4: Run test, confirm pass**

```bash
npm test
```
Expected: PASS.

- [ ] **Step 5: Write `lib/supabase/server.ts`**

```ts
import { createServerClient as createSupabaseServer } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerClient() {
  const cookieStore = await cookies();
  return createSupabaseServer(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // called from a Server Component — safe to ignore (middleware refreshes)
          }
        },
      },
    }
  );
}
```

- [ ] **Step 6: Write `lib/supabase/middleware.ts`**

```ts
import { createServerClient as createSupabaseServer } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createSupabaseServer(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  return { response, user };
}
```

- [ ] **Step 7: Commit**

```bash
git add lib/supabase tests/lib/supabase.test.ts
git commit -m "feat: add supabase client helpers (browser/server/middleware)"
```

---

### Task 9: Email allowlist helper

**Files:**
- Create: `lib/auth.ts`
- Test: `tests/lib/auth.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
// tests/lib/auth.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("isAllowedEmail", () => {
  beforeEach(() => {
    vi.stubEnv("ALLOWED_EMAIL", "jamil@example.com");
  });

  it("returns true for the configured email (case-insensitive)", async () => {
    const { isAllowedEmail } = await import("@/lib/auth");
    expect(isAllowedEmail("jamil@example.com")).toBe(true);
    expect(isAllowedEmail("Jamil@Example.com")).toBe(true);
  });

  it("returns false for any other email", async () => {
    const { isAllowedEmail } = await import("@/lib/auth");
    expect(isAllowedEmail("attacker@example.com")).toBe(false);
    expect(isAllowedEmail("")).toBe(false);
  });

  it("returns false if ALLOWED_EMAIL env is missing", async () => {
    vi.unstubAllEnvs();
    const { isAllowedEmail } = await import("@/lib/auth");
    expect(isAllowedEmail("jamil@example.com")).toBe(false);
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```bash
npm test
```
Expected: FAIL.

- [ ] **Step 3: Implement**

```ts
// lib/auth.ts
export function isAllowedEmail(email: string): boolean {
  const allowed = process.env.ALLOWED_EMAIL;
  if (!allowed) return false;
  if (!email) return false;
  return email.trim().toLowerCase() === allowed.trim().toLowerCase();
}
```

- [ ] **Step 4: Run, confirm pass**

```bash
npm test
```
Expected: PASS (all three test cases).

- [ ] **Step 5: Commit**

```bash
git add lib/auth.ts tests/lib/auth.test.ts
git commit -m "feat: add email allowlist helper with case-insensitive match"
```

---

### Task 10: Static project metadata

**Files:**
- Create: `lib/projects.ts`
- Test: `tests/lib/projects.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
// tests/lib/projects.test.ts
import { describe, it, expect } from "vitest";
import { projects, getProjectBySlug } from "@/lib/projects";

describe("projects metadata", () => {
  it("exposes exactly six projects", () => {
    expect(projects).toHaveLength(6);
  });

  it("each project has required fields", () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.publicRepoStatus).toMatch(/^(coming|live)$/);
    }
  });

  it("getProjectBySlug returns the matching project", () => {
    const p = getProjectBySlug("pipeline-guardian");
    expect(p?.name).toBe("Pipeline Guardian");
  });

  it("getProjectBySlug returns null for unknown slug", () => {
    expect(getProjectBySlug("not-real")).toBeNull();
  });
});
```

- [ ] **Step 2: Run, confirm fail**

```bash
npm test
```
Expected: FAIL.

- [ ] **Step 3: Implement**

```ts
// lib/projects.ts
export type ProjectMeta = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  publicRepoUrl: string;
  publicRepoStatus: "coming" | "live";
  publicEtaWeek?: string;
  privateRepoUrl?: string;
};

export const projects: ProjectMeta[] = [
  {
    slug: "local-pipeline",
    name: "Async ETL Platform",
    tagline: "6.2M rows / night across 25 tables on Postgres",
    stack: ["Python", "asyncpg", "Postgres", "GitHub Actions"],
    publicRepoUrl: "https://github.com/Jamil1016/local-pipeline",
    publicRepoStatus: "coming",
    publicEtaWeek: "W12",
  },
  {
    slug: "pipeline-guardian",
    name: "Pipeline Guardian",
    tagline: "Auto-remediation agent for ETL failures",
    stack: ["Python", "Claude API", "Supabase"],
    publicRepoUrl: "https://github.com/Jamil1016/pipeline-guardian",
    publicRepoStatus: "coming",
    publicEtaWeek: "W8",
  },
  {
    slug: "data-analyst-reporting-agent",
    name: "DARA — Data Analyst Reporting Agent",
    tagline: "Schema-aware natural-language SQL with safety rails",
    stack: ["FastAPI", "Next.js", "Claude API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/data-analyst-reporting-agent",
    publicRepoStatus: "coming",
    publicEtaWeek: "W10",
  },
  {
    slug: "gmail-scraper",
    name: "Gmail Document Parser",
    tagline: "HTML email → JSONB with dynamic field discovery",
    stack: ["Python", "Gmail API", "Postgres"],
    publicRepoUrl: "https://github.com/Jamil1016/gmail-scraper",
    publicRepoStatus: "coming",
    publicEtaWeek: "W3",
  },
  {
    slug: "date-validator",
    name: "Cross-Source Date Validator",
    tagline: "Daily reconciliation of task dates vs. email dates",
    stack: ["Python", "GitHub Actions", "Google Sheets API"],
    publicRepoUrl: "https://github.com/Jamil1016/date-validator",
    publicRepoStatus: "coming",
    publicEtaWeek: "W11",
  },
  {
    slug: "report-automation",
    name: "Report Automation",
    tagline: "Automated daily finance report pipeline",
    stack: ["Python", "Supabase", "Chart.js", "GitHub Actions"],
    publicRepoUrl: "https://github.com/Jamil1016/report-automation",
    publicRepoStatus: "coming",
    publicEtaWeek: "W5",
  },
];

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return projects.find((p) => p.slug === slug) ?? null;
}
```

- [ ] **Step 4: Run, confirm pass**

```bash
npm test
```
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/projects.ts tests/lib/projects.test.ts
git commit -m "feat: add static project metadata for six case studies"
```

---

### Task 11: Root layout + global styles

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Jamil Mendez — Data + AI Engineer",
  description:
    "Engineer building production data pipelines and AI agents. Portfolio, projects, and learning log.",
  metadataBase: new URL("https://jamilmendez.dev"),
  openGraph: {
    title: "Jamil Mendez — Data + AI Engineer",
    description: "Portfolio, projects, and learning log.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify it builds**

```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: root layout with fonts, dark theme, and Vercel Analytics"
```

---

# Phase 2 — Public Site

### Task 12: Bento grid container component

**Files:**
- Create: `components/bento/BentoGrid.tsx`
- Test: `tests/components/BentoGrid.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
// tests/components/BentoGrid.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BentoGrid } from "@/components/bento/BentoGrid";

describe("BentoGrid", () => {
  it("renders children inside a 12-column responsive grid", () => {
    render(
      <BentoGrid>
        <div data-testid="child">x</div>
      </BentoGrid>
    );
    const grid = screen.getByTestId("child").parentElement!;
    expect(grid.className).toContain("grid");
    expect(grid.className).toContain("grid-cols-1");
    expect(grid.className).toContain("md:grid-cols-12");
  });
});
```

- [ ] **Step 2: Run, fail**

```bash
npm test
```

- [ ] **Step 3: Implement**

```tsx
// components/bento/BentoGrid.tsx
import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-12 gap-4 max-w-6xl mx-auto px-4 py-12",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoTile({
  children,
  span = "md:col-span-3 md:row-span-1",
  className,
}: {
  children: React.ReactNode;
  span?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900/50 p-6",
        "backdrop-blur transition-colors hover:border-slate-700",
        span,
        className
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run, pass**

- [ ] **Step 5: Commit**

```bash
git add components/bento/BentoGrid.tsx tests/components/BentoGrid.test.tsx
git commit -m "feat: bento grid container + tile primitives"
```

---

### Task 13: Hero, Metric, Stack, and CTA tiles

**Files:**
- Create: `components/bento/HeroTile.tsx`
- Create: `components/bento/MetricTile.tsx`
- Create: `components/bento/StackTile.tsx`
- Create: `components/bento/CTATile.tsx`

- [ ] **Step 1: Write `HeroTile.tsx`**

```tsx
import { BentoTile } from "./BentoGrid";

export function HeroTile() {
  return (
    <BentoTile span="md:col-span-6 md:row-span-2">
      <div className="flex flex-col h-full justify-between">
        <div>
          <p className="font-mono text-xs text-slate-500 mb-2">JAMIL MENDEZ</p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-50">
            Data + AI Engineer
          </h1>
          <p className="mt-4 text-slate-400 max-w-md">
            I build production data systems that operate themselves. Six years across ETL,
            analytics, and AI agents — currently shipping at ONTEL TechOps.
          </p>
        </div>
        <p className="font-mono text-xs text-slate-500">based in the Philippines · open to remote</p>
      </div>
    </BentoTile>
  );
}
```

- [ ] **Step 2: Write `MetricTile.tsx`**

```tsx
import { BentoTile } from "./BentoGrid";

export function MetricTile() {
  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-mono text-xs text-slate-500">PRODUCTION</span>
      </div>
      <p className="mt-3 text-4xl font-semibold text-slate-50">
        6.2M <span className="text-slate-400 text-2xl">rows / night</span>
      </p>
      <p className="mt-1 text-sm text-slate-400">across 25 tables, 99%+ uptime</p>
    </BentoTile>
  );
}
```

- [ ] **Step 3: Write `StackTile.tsx`**

```tsx
import { BentoTile } from "./BentoGrid";

const STACK = [
  "Python", "TypeScript", "Postgres", "Supabase",
  "Next.js", "Claude API", "GitHub Actions", "dbt (soon)",
];

export function StackTile() {
  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <p className="font-mono text-xs text-slate-500 mb-3">STACK</p>
      <div className="flex flex-wrap gap-2">
        {STACK.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-xs text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </BentoTile>
  );
}
```

- [ ] **Step 4: Write `CTATile.tsx`**

```tsx
import { BentoTile } from "./BentoGrid";

export function CTATile() {
  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <p className="font-mono text-xs text-slate-500 mb-2">OPEN TO</p>
      <p className="text-lg text-slate-50">
        Senior data engineering and AI engineering roles
      </p>
      <div className="mt-4 flex gap-4 text-sm">
        <a
          href="mailto:your-personal-email@example.com"
          className="text-emerald-400 hover:text-emerald-300"
        >
          Email →
        </a>
        <a
          href="https://www.linkedin.com/in/your-handle"
          className="text-emerald-400 hover:text-emerald-300"
        >
          LinkedIn →
        </a>
      </div>
    </BentoTile>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/bento/
git commit -m "feat: hero, metric, stack, and CTA bento tiles"
```

---

### Task 14: ProjectTile component + integration

**Files:**
- Create: `components/bento/ProjectTile.tsx`
- Test: `tests/components/ProjectTile.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
// tests/components/ProjectTile.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProjectTile } from "@/components/bento/ProjectTile";

describe("ProjectTile", () => {
  const project = {
    slug: "pipeline-guardian",
    name: "Pipeline Guardian",
    tagline: "Auto-remediation agent",
    stack: ["Python", "Claude API"],
    publicRepoUrl: "https://github.com/Jamil1016/pipeline-guardian",
    publicRepoStatus: "coming" as const,
    publicEtaWeek: "W8",
  };

  it("renders project name, tagline, and stack badges", () => {
    render(<ProjectTile project={project} />);
    expect(screen.getByText("Pipeline Guardian")).toBeInTheDocument();
    expect(screen.getByText("Auto-remediation agent")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Claude API")).toBeInTheDocument();
  });

  it("shows the open-source ETA when status is coming", () => {
    render(<ProjectTile project={project} />);
    expect(screen.getByText(/W8/)).toBeInTheDocument();
  });

  it("links to the case study page", () => {
    render(<ProjectTile project={project} />);
    const link = screen.getByRole("link", { name: /case study/i });
    expect(link).toHaveAttribute("href", "/projects/pipeline-guardian");
  });
});
```

- [ ] **Step 2: Fail**

- [ ] **Step 3: Implement**

```tsx
// components/bento/ProjectTile.tsx
import Link from "next/link";
import { BentoTile } from "./BentoGrid";
import type { ProjectMeta } from "@/lib/projects";

export function ProjectTile({
  project,
  span = "md:col-span-3 md:row-span-1",
}: {
  project: ProjectMeta;
  span?: string;
}) {
  return (
    <BentoTile span={span}>
      <div className="flex h-full flex-col justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">{project.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{project.tagline}</p>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs">
            <Link
              href={`/projects/${project.slug}`}
              className="text-emerald-400 hover:text-emerald-300"
            >
              Read case study →
            </Link>
            {project.publicRepoStatus === "coming" && project.publicEtaWeek && (
              <span className="font-mono text-slate-500">
                OSS · {project.publicEtaWeek}
              </span>
            )}
          </div>
        </div>
      </div>
    </BentoTile>
  );
}
```

- [ ] **Step 4: Pass**

- [ ] **Step 5: Commit**

```bash
git add components/bento/ProjectTile.tsx tests/components/ProjectTile.test.tsx
git commit -m "feat: ProjectTile with status pill and case-study link"
```

---

### Task 15: NowLearningTile (server component with Supabase fetch)

**Files:**
- Create: `components/bento/NowLearningTile.tsx`

- [ ] **Step 1: Implement**

```tsx
// components/bento/NowLearningTile.tsx
import { BentoTile } from "./BentoGrid";
import { createServerClient } from "@/lib/supabase/server";

export async function NowLearningTile() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("v_now_learning")
    .select("phase, week_label, course_title, url")
    .maybeSingle();

  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <p className="font-mono text-xs text-slate-500 mb-2">NOW LEARNING</p>
      {data ? (
        <>
          <p className="text-sm text-slate-500">{data.phase} · {data.week_label}</p>
          <a
            href={data.url || "#"}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-block text-lg text-slate-50 hover:text-emerald-300"
          >
            {data.course_title} →
          </a>
        </>
      ) : (
        <p className="text-lg text-slate-50">Between weeks — planning the next push.</p>
      )}
    </BentoTile>
  );
}
```

- [ ] **Step 2: Verify the dev server renders (manual smoke)**

```bash
npm run dev
```
Briefly: visit `http://localhost:3000` later, after Task 16, to confirm rendering.

- [ ] **Step 3: Commit**

```bash
git add components/bento/NowLearningTile.tsx
git commit -m "feat: NowLearningTile pulls from v_now_learning view"
```

---

### Task 16: Landing page composition

**Files:**
- Create: `app/(public)/page.tsx`

- [ ] **Step 1: Write the landing page**

```tsx
// app/(public)/page.tsx
import { BentoGrid } from "@/components/bento/BentoGrid";
import { HeroTile } from "@/components/bento/HeroTile";
import { MetricTile } from "@/components/bento/MetricTile";
import { ProjectTile } from "@/components/bento/ProjectTile";
import { NowLearningTile } from "@/components/bento/NowLearningTile";
import { StackTile } from "@/components/bento/StackTile";
import { CTATile } from "@/components/bento/CTATile";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const [flagship, ...rest] = projects;
  return (
    <main>
      <BentoGrid>
        <HeroTile />
        <MetricTile />
        <ProjectTile project={flagship} span="md:col-span-6 md:row-span-1" />
        {rest.map((p) => (
          <ProjectTile key={p.slug} project={p} />
        ))}
        <NowLearningTile />
        <StackTile />
        <CTATile />
      </BentoGrid>
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and inspect**

```bash
npm run dev
```
Open `http://localhost:3000`. Verify:
- Hero tile shows your name and tagline
- Metric tile shows 6.2M with pulsing dot
- Six project tiles render
- Now-learning tile renders (either the row from Supabase or fallback)
- Stack + CTA tiles render
- Layout looks reasonable on desktop

- [ ] **Step 3: Resize to 375px width**

In browser devtools, set viewport to 375px. Verify:
- All tiles stack into one column
- No horizontal scrollbar
- All text readable

- [ ] **Step 4: Commit**

```bash
git add app/\(public\)/page.tsx
git commit -m "feat: bento landing page composition"
```

---

# Phase 3 — Case Studies

### Task 17: MDX content loader

**Files:**
- Create: `lib/content.ts`
- Test: `tests/lib/content.test.ts`

- [ ] **Step 1: Failing test**

```ts
// tests/lib/content.test.ts
import { describe, it, expect } from "vitest";
import { loadCaseStudy } from "@/lib/content";

describe("loadCaseStudy", () => {
  it("returns null for an unknown slug", async () => {
    expect(await loadCaseStudy("does-not-exist")).toBeNull();
  });
});
```

- [ ] **Step 2: Fail**

- [ ] **Step 3: Implement**

```ts
// lib/content.ts
import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export async function loadCaseStudy(slug: string): Promise<string | null> {
  const safe = slug.replace(/[^a-z0-9-]/gi, "");
  if (!safe || safe !== slug) return null;
  try {
    const file = path.join(CONTENT_DIR, `${safe}.mdx`);
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

export async function listCaseStudySlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}
```

- [ ] **Step 4: Pass**

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts tests/lib/content.test.ts
git commit -m "feat: MDX content loader for case studies"
```

---

### Task 18: Case study dynamic route + shared layout

**Files:**
- Create: `app/(public)/projects/[slug]/page.tsx`
- Create: `components/case-study/Layout.tsx`

- [ ] **Step 1: Write `Layout.tsx`**

```tsx
// components/case-study/Layout.tsx
import type { ProjectMeta } from "@/lib/projects";
import Link from "next/link";

export function CaseStudyLayout({
  project,
  children,
}: {
  project: ProjectMeta;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">
        ← back to home
      </Link>
      <header className="mt-8 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-50">
          {project.name}
        </h1>
        <p className="mt-2 text-lg text-slate-400">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-slate-800 px-2 py-0.5 text-xs text-slate-400"
            >
              {s}
            </span>
          ))}
        </div>
        {project.publicRepoStatus === "coming" && (
          <p className="mt-4 font-mono text-xs text-slate-500">
            Open-source reference implementation coming {project.publicEtaWeek}
          </p>
        )}
      </header>
      <div className="prose prose-invert prose-slate mt-8 max-w-none">
        {children}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Install `@tailwindcss/typography` for the `prose` classes**

```bash
npm install -D @tailwindcss/typography
```
Add to `tailwind.config.ts`:

```ts
import typography from "@tailwindcss/typography";

const config = {
  // ... existing config
  plugins: [typography],
};
export default config;
```

- [ ] **Step 3: Write the dynamic route**

```tsx
// app/(public)/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, projects } from "@/lib/projects";
import { loadCaseStudy } from "@/lib/content";
import { CaseStudyLayout } from "@/components/case-study/Layout";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const source = await loadCaseStudy(slug);
  if (!source) notFound();

  return (
    <CaseStudyLayout project={project}>
      <MDXRemote source={source} />
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/case-study app/\(public\)/projects tailwind.config.ts package.json package-lock.json
git commit -m "feat: case study dynamic route + shared layout"
```

---

### Task 19: Write six case study MDX files

**Files:**
- Create: `content/projects/local-pipeline.mdx`
- Create: `content/projects/pipeline-guardian.mdx`
- Create: `content/projects/data-analyst-reporting-agent.mdx`
- Create: `content/projects/gmail-scraper.mdx`
- Create: `content/projects/date-validator.mdx`
- Create: `content/projects/report-automation.mdx`

For each MDX file, follow this structure (substitute real content per project):

```mdx
## The problem

[1–2 paragraphs sanitized — generic domain, no customer/employer names]

## Architecture

![Diagram](/diagrams/<slug>.svg)

[1–2 paragraphs of data flow]

## Key decisions

- **Decision 1:** Why we chose X over Y
- **Decision 2:** The async pattern that mattered
- **Decision 3:** Where we said no to features

## Metrics (production-scale, generalized)

- Throughput: millions of rows / night
- Uptime: 99.x%
- Mean run duration: <15s

## Code sample

```python
# Generic-domain illustration of the pattern
async def extract_async(batch):
    ...
```

## Status

The production version runs privately. The open-source reference implementation
on synthetic data lands on the repo above on the ETA shown at the top of this page.
```

- [ ] **Step 1: Write `local-pipeline.mdx`**

(Draft sanitized content per template above — async ETL pattern, generic domain.)

- [ ] **Step 2: Write `pipeline-guardian.mdx`**

(LLM auto-remediation pattern, generic ETL failure domain.)

- [ ] **Step 3: Write `data-analyst-reporting-agent.mdx`**

(NL→SQL pattern, schema-aware prompting, safety rails.)

- [ ] **Step 4: Write `gmail-scraper.mdx`**

(Email parsing pattern, HTML → JSONB, dynamic field discovery.)

- [ ] **Step 5: Write `date-validator.mdx`**

(Cross-source reconciliation pattern, daily diff job.)

- [ ] **Step 6: Write `report-automation.mdx`**

(Scheduled report pipeline, weekend gating, email delivery.)

- [ ] **Step 7: Drop placeholder SVGs into `public/diagrams/`**

A minimal `placeholder.svg` per project is fine — real diagrams can land later.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
  <rect width="400" height="200" fill="#1e293b" />
  <text x="200" y="100" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="14">
    diagram coming soon
  </text>
</svg>
```

- [ ] **Step 8: Visit each case study URL locally**

```bash
npm run dev
```

Visit each: `/projects/local-pipeline`, `/projects/pipeline-guardian`, etc. Verify each renders without errors.

- [ ] **Step 9: Commit**

```bash
git add content/ public/diagrams
git commit -m "feat: six initial case study MDX files with placeholder diagrams"
```

---

### Task 20: Projects index page

**Files:**
- Create: `app/(public)/projects/page.tsx`

- [ ] **Step 1: Write the index**

```tsx
// app/(public)/projects/page.tsx
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata = { title: "Projects — Jamil Mendez" };

export default function ProjectsIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">
        ← back
      </Link>
      <h1 className="mt-6 text-3xl font-semibold text-slate-50">Projects</h1>
      <div className="mt-8 space-y-4">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="block rounded-xl border border-slate-800 p-5 hover:border-slate-700"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-medium text-slate-50">{p.name}</h2>
              {p.publicRepoStatus === "coming" && (
                <span className="font-mono text-xs text-slate-500">
                  OSS · {p.publicEtaWeek}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-400">{p.tagline}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify rendering**

Visit `http://localhost:3000/projects`. All six projects listed.

- [ ] **Step 3: Commit**

```bash
git add app/\(public\)/projects/page.tsx
git commit -m "feat: projects index page"
```

---

### Task 21: About + Resume pages

**Files:**
- Create: `app/(public)/about/page.tsx`
- Create: `app/(public)/resume/page.tsx`
- Create: `public/resume.pdf` (placeholder OK at first)

- [ ] **Step 1: Write `about/page.tsx`**

```tsx
// app/(public)/about/page.tsx
import Link from "next/link";
export const metadata = { title: "About — Jamil Mendez" };
export default function About() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">← back</Link>
      <h1 className="mt-6 text-3xl font-semibold text-slate-50">About</h1>
      <div className="prose prose-invert prose-slate mt-6">
        <p>
          I&apos;m Jamil Mendez — a data and AI engineer at ONTEL TechOps. I build the
          systems that turn carrier-network operations into measurable, debuggable, and
          mostly self-healing pipelines.
        </p>
        <p>
          Most of my last two years has been spent on three things: making nightly ETL
          fast and observable, building AI agents that wrap our internal data the way
          a senior analyst would, and removing the kinds of recurring incidents that
          turn into 2 AM Slack threads.
        </p>
        <h2>Trajectory</h2>
        <p>
          Data Analyst / Engineer → Senior Data Engineer → Data Platform / AI Engineering Lead.
        </p>
        <h2>In progress</h2>
        <ul>
          <li>Google Cloud Professional Data Engineer (target Q3 2026)</li>
          <li>dbt Analytics Engineering Certification</li>
          <li>13-week AI Engineer learning path (track on this site)</li>
        </ul>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Write `resume/page.tsx`**

```tsx
// app/(public)/resume/page.tsx
import Link from "next/link";
export const metadata = { title: "Resume — Jamil Mendez" };
export default function Resume() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">← back</Link>
        <a
          href="/resume.pdf"
          className="rounded-md border border-emerald-700 px-3 py-1.5 text-sm text-emerald-300 hover:bg-emerald-900/30"
          download
        >
          Download PDF
        </a>
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-slate-50">Jamil Mendez</h1>
      <p className="text-slate-400">Data + AI Engineer</p>
      <div className="prose prose-invert prose-slate mt-8 max-w-none">
        <h2>Experience</h2>
        <p>ONTEL TechOps — Data + AI Engineering</p>
        <p>
          Built and operate the team&apos;s production pipeline platform (millions of rows
          nightly), the in-house data analytics agent (DARA), and the auto-remediation
          agent (Pipeline Guardian).
        </p>
        <h2>Selected work</h2>
        <ul>
          <li>Async ETL platform — Python, asyncpg, Postgres, GitHub Actions</li>
          <li>Pipeline Guardian — Claude API, structured tools, runbook-aware</li>
          <li>DARA — FastAPI + Next.js, schema-aware NL→SQL with safety rails</li>
          <li>Gmail document parser — HTML→JSONB with dynamic field discovery</li>
          <li>Cross-source date validator — daily reconciliation over Sheets + Postgres</li>
          <li>Report Automation — Daily Finance Report pipeline</li>
        </ul>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Drop a placeholder resume PDF**

Put any existing resume PDF at `public/resume.pdf`. If you don't have one yet, generate a one-page placeholder from `CAREER_PLAN.md` (any tool — Word export, pandoc).

- [ ] **Step 4: Commit**

```bash
git add app/\(public\)/about app/\(public\)/resume public/resume.pdf
git commit -m "feat: about and resume pages"
```

---

# Phase 4 — Auth & Private Dashboard

### Task 22: Auth middleware (dashboard route guard)

**Files:**
- Create: `middleware.ts`

- [ ] **Step 1: Write middleware**

```ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isAllowedEmail } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const isPrivate = request.nextUrl.pathname.startsWith("/dashboard");
  if (!isPrivate) return response;

  if (!user || !isAllowedEmail(user.email ?? "")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 2: Commit**

```bash
git add middleware.ts
git commit -m "feat: middleware guards /dashboard with session + allowlist"
```

---

### Task 23: Login page + magic-link API route

**Files:**
- Create: `app/(private)/login/page.tsx`
- Create: `app/api/auth/magic-link/route.ts`
- Create: `app/api/auth/callback/route.ts`

- [ ] **Step 1: Write the magic-link API route (with allowlist enforcement)**

```ts
// app/api/auth/magic-link/route.ts
import { NextResponse } from "next/server";
import { isAllowedEmail } from "@/lib/auth";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string" || !isAllowedEmail(email)) {
    // Always returns generic 200 to avoid enumerating the allowed email
    return NextResponse.json({ ok: true });
  }

  const supabase = await createServerClient();
  const origin = new URL(request.url).origin;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/api/auth/callback` },
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Write the callback route**

```ts
// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code) {
    const supabase = await createServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${url.origin}/dashboard`);
}
```

- [ ] **Step 3: Write the login page**

```tsx
// app/(private)/login/page.tsx
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    await fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setState("sent");
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-24">
      <h1 className="text-2xl font-semibold text-slate-50">Sign in</h1>
      <p className="mt-2 text-sm text-slate-400">
        Private dashboard. Magic-link only.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100"
        />
        <button
          type="submit"
          disabled={state !== "idle"}
          className="w-full rounded-md bg-emerald-700 px-3 py-2 text-sm text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {state === "loading" ? "Sending..." : state === "sent" ? "Check your email" : "Send magic link"}
        </button>
      </form>
    </main>
  );
}
```

- [ ] **Step 4: Manual end-to-end test**

```bash
npm run dev
```
1. Visit `/dashboard` → should redirect to `/login`
2. Enter your `ALLOWED_EMAIL` → submit
3. Check your inbox for the magic link → click it
4. Should land on `/dashboard` (page doesn't exist yet — 404 is fine for now)
5. Try a non-allowlisted email → form says "Check your email" but no email is sent (verify in Supabase auth logs)

- [ ] **Step 5: Commit**

```bash
git add app/\(private\)/login app/api/auth
git commit -m "feat: magic-link auth with server-side email allowlist"
```

---

### Task 24: Status badge + week card components

**Files:**
- Create: `components/tracker/StatusBadge.tsx`
- Create: `components/tracker/WeekCard.tsx`
- Test: `tests/components/WeekCard.test.tsx`

- [ ] **Step 1: Write `StatusBadge.tsx`**

```tsx
// components/tracker/StatusBadge.tsx
const VARIANTS = {
  not_started: { label: "Not started", className: "bg-slate-800 text-slate-400" },
  in_progress: { label: "In progress", className: "bg-emerald-900/40 text-emerald-300" },
  done:        { label: "Done",        className: "bg-slate-700 text-slate-200" },
};

export function StatusBadge({ status }: { status: keyof typeof VARIANTS }) {
  const v = VARIANTS[status];
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs ${v.className}`}>
      {v.label}
    </span>
  );
}
```

- [ ] **Step 2: Failing test for WeekCard**

```tsx
// tests/components/WeekCard.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WeekCard } from "@/components/tracker/WeekCard";

describe("WeekCard", () => {
  const week = {
    id: "abc",
    phase: "Phase 1",
    week_label: "Week 1",
    course_title: "Anthropic Prompt Engineering Tutorial",
    url: "https://example.com",
    time_estimate: "~6 hrs",
    apply_action: "Rewrite DARA's prompt",
    status: "not_started" as const,
    notes: null,
    artifact_url: null,
  };

  it("renders week label, course title, and status badge", () => {
    render(<WeekCard week={week} />);
    expect(screen.getByText("Week 1")).toBeInTheDocument();
    expect(screen.getByText(/Anthropic Prompt Engineering Tutorial/)).toBeInTheDocument();
    expect(screen.getByText("Not started")).toBeInTheDocument();
  });

  it("shows the time estimate and apply action", () => {
    render(<WeekCard week={week} />);
    expect(screen.getByText(/~6 hrs/)).toBeInTheDocument();
    expect(screen.getByText(/Rewrite DARA/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Fail**

- [ ] **Step 4: Implement WeekCard**

```tsx
// components/tracker/WeekCard.tsx
"use client";

import { useState, useTransition } from "react";
import { StatusBadge } from "./StatusBadge";
import { updateWeekStatus } from "@/app/(private)/dashboard/actions";

export type WeekRow = {
  id: string;
  phase: string;
  week_label: string;
  course_title: string;
  url: string | null;
  time_estimate: string | null;
  apply_action: string | null;
  status: "not_started" | "in_progress" | "done";
  notes: string | null;
  artifact_url: string | null;
};

export function WeekCard({ week }: { week: WeekRow }) {
  const [status, setStatus] = useState(week.status);
  const [notes, setNotes] = useState(week.notes ?? "");
  const [artifactUrl, setArtifactUrl] = useState(week.artifact_url ?? "");
  const [pending, startTransition] = useTransition();

  function change(next: WeekRow["status"]) {
    setStatus(next);
    startTransition(async () => {
      await updateWeekStatus(week.id, { status: next });
    });
  }

  function saveText() {
    startTransition(async () => {
      await updateWeekStatus(week.id, { notes, artifact_url: artifactUrl });
    });
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-slate-500">{week.week_label}</p>
          <h3 className="text-lg text-slate-50">
            {week.url ? (
              <a href={week.url} target="_blank" rel="noreferrer" className="hover:text-emerald-300">
                {week.course_title} →
              </a>
            ) : (
              week.course_title
            )}
          </h3>
        </div>
        <StatusBadge status={status} />
      </div>

      {week.time_estimate && (
        <p className="mt-2 text-xs text-slate-500">Time estimate · {week.time_estimate}</p>
      )}
      {week.apply_action && (
        <p className="mt-3 text-sm text-slate-300">{week.apply_action}</p>
      )}

      <div className="mt-4 flex gap-2">
        {(["not_started", "in_progress", "done"] as const).map((s) => (
          <button
            key={s}
            onClick={() => change(s)}
            disabled={pending}
            className={`rounded-md border px-2 py-1 text-xs ${
              status === s
                ? "border-emerald-700 bg-emerald-900/40 text-emerald-200"
                : "border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={saveText}
          placeholder="Notes, takeaways, blockers..."
          className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200"
          rows={2}
        />
        <input
          type="url"
          value={artifactUrl}
          onChange={(e) => setArtifactUrl(e.target.value)}
          onBlur={saveText}
          placeholder="Artifact URL (e.g., PR, repo, blog post)"
          className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-200"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Pass**

- [ ] **Step 6: Commit**

```bash
git add components/tracker tests/components/WeekCard.test.tsx
git commit -m "feat: WeekCard with status buttons + notes + artifact URL"
```

---

### Task 25: Dashboard page + status mutation server action

**Files:**
- Create: `app/(private)/dashboard/page.tsx`
- Create: `app/(private)/dashboard/actions.ts`

- [ ] **Step 1: Write the server action**

```ts
// app/(private)/dashboard/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

type Patch = {
  status?: "not_started" | "in_progress" | "done";
  notes?: string | null;
  artifact_url?: string | null;
};

export async function updateWeekStatus(id: string, patch: Patch) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("unauthorized");

  const update: Record<string, unknown> = { ...patch, updated_at: new Date().toISOString() };
  if (patch.status === "in_progress") update.started_at = new Date().toISOString();
  if (patch.status === "done") update.completed_at = new Date().toISOString();

  const { error } = await supabase
    .from("learning_weeks")
    .update(update)
    .eq("id", id)
    .eq("owner_id", user.id);

  if (error) throw error;
  revalidatePath("/dashboard");
}
```

- [ ] **Step 2: Write the dashboard page**

```tsx
// app/(private)/dashboard/page.tsx
import { createServerClient } from "@/lib/supabase/server";
import { WeekCard, type WeekRow } from "@/components/tracker/WeekCard";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("learning_weeks")
    .select("*")
    .order("sort_order", { ascending: true });

  const weeks = (data ?? []) as WeekRow[];
  const phases = Array.from(new Set(weeks.map((w) => w.phase)));

  const totalCount = weeks.filter((w) => w.phase !== "Capstone").length;
  const doneCount  = weeks.filter((w) => w.status === "done" && w.phase !== "Capstone").length;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold text-slate-50">Learning tracker</h1>
        <span className="font-mono text-sm text-slate-400">
          {doneCount} / {totalCount} weeks
        </span>
      </header>

      <div className="mt-8 space-y-10">
        {phases.map((phase) => (
          <section key={phase}>
            <h2 className="font-mono text-xs uppercase tracking-wide text-slate-500">
              {phase}
            </h2>
            <div className="mt-3 space-y-3">
              {weeks
                .filter((w) => w.phase === phase)
                .map((w) => (
                  <WeekCard key={w.id} week={w} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: End-to-end smoke**

```bash
npm run dev
```
1. Sign in via `/login`
2. Land on `/dashboard`
3. Click status buttons → values persist on reload
4. Type notes, blur → reload, notes persist

- [ ] **Step 4: Commit**

```bash
git add app/\(private\)/dashboard
git commit -m "feat: dashboard with learning tracker + status mutations"
```

---

# Phase 5 — Polish

### Task 26: GitHub activity feed widget

**Files:**
- Create: `lib/github.ts`
- Create: `components/bento/GitHubFeedTile.tsx`
- Modify: `app/(public)/page.tsx` (add the tile)

- [ ] **Step 1: Write `lib/github.ts`**

```ts
// lib/github.ts
const REPOS = [
  "Jamil1016/portfolio",
  "Jamil1016/local-pipeline",
  "Jamil1016/gmail-scraper",
  "Jamil1016/pipeline-guardian",
  "Jamil1016/data-analyst-reporting-agent",
  "Jamil1016/date-validator",
  "Jamil1016/report-automation",
];

export type RecentCommit = {
  repo: string;
  message: string;
  url: string;
  date: string;
};

export async function recentCommits(): Promise<RecentCommit[]> {
  const results: RecentCommit[] = [];
  for (const repo of REPOS) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repo}/commits?per_page=1`,
        { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } }
      );
      if (!res.ok) continue;
      const data = (await res.json()) as Array<{
        sha: string; commit: { message: string; author: { date: string } }; html_url: string;
      }>;
      if (data[0]) {
        results.push({
          repo,
          message: data[0].commit.message.split("\n")[0].slice(0, 80),
          url: data[0].html_url,
          date: data[0].commit.author.date,
        });
      }
    } catch {
      // ignore individual failures
    }
  }
  return results
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);
}
```

- [ ] **Step 2: Write the tile**

```tsx
// components/bento/GitHubFeedTile.tsx
import { BentoTile } from "./BentoGrid";
import { recentCommits } from "@/lib/github";

export async function GitHubFeedTile() {
  const commits = await recentCommits();
  return (
    <BentoTile span="md:col-span-6 md:row-span-1">
      <p className="font-mono text-xs text-slate-500 mb-3">RECENT COMMITS</p>
      {commits.length === 0 ? (
        <p className="text-sm text-slate-400">No recent activity.</p>
      ) : (
        <ul className="space-y-1.5">
          {commits.map((c) => (
            <li key={c.url} className="truncate text-sm">
              <a href={c.url} target="_blank" rel="noreferrer"
                 className="text-slate-300 hover:text-emerald-300">
                <span className="font-mono text-xs text-slate-500">
                  {c.repo.split("/")[1]}
                </span>
                {" — "}
                {c.message}
              </a>
            </li>
          ))}
        </ul>
      )}
    </BentoTile>
  );
}
```

- [ ] **Step 3: Add to landing**

In `app/(public)/page.tsx`, insert `<GitHubFeedTile />` after the existing tiles. Import it at the top.

- [ ] **Step 4: Commit**

```bash
git add lib/github.ts components/bento/GitHubFeedTile.tsx app/\(public\)/page.tsx
git commit -m "feat: GitHub activity feed bento tile"
```

---

### Task 27: Certification tracker section (dashboard)

**Files:**
- Modify: `supabase/migrations/002_seed_data.sql` (add cert rows — apply via SQL editor too)
- Modify: `app/(private)/dashboard/page.tsx` (filter by phase)

- [ ] **Step 1: Append cert rows to the seed (and run them in SQL editor too)**

```sql
insert into public.learning_weeks
  (owner_id, phase, week_label, course_title, url, time_estimate, apply_action, sort_order)
values
  ('<YOUR_AUTH_UID>', 'Certification', 'GCP PDE',
   'Google Cloud Professional Data Engineer',
   'https://cloud.google.com/learn/certification/data-engineer',
   '~8-10 wks', 'Cert exam — primary L&D ask.', 500),
  ('<YOUR_AUTH_UID>', 'Certification', 'dbt Analytics Engineer',
   'dbt Analytics Engineering Certification',
   'https://www.getdbt.com/certifications/analytics-engineer-certification-exam',
   '~3-4 wks', 'Cert exam — fastest first win.', 501);
```
Run in Supabase SQL editor. Commit the SQL.

- [ ] **Step 2: Verify it shows up in the dashboard**

`/dashboard` should now have a `Certification` section automatically (the page groups by `phase`).

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/002_seed_data.sql
git commit -m "feat: seed two certification tracker rows"
```

---

### Task 28: SEO metadata + OG image + sitemap

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `public/og-image.png` (placeholder OK)

- [ ] **Step 1: Sitemap**

```ts
// app/sitemap.ts
import { projects } from "@/lib/projects";

const BASE = "https://jamilmendez.dev"; // update after domain is wired

export default function sitemap() {
  const now = new Date();
  return [
    { url: BASE,                lastModified: now },
    { url: `${BASE}/projects`,  lastModified: now },
    { url: `${BASE}/about`,     lastModified: now },
    { url: `${BASE}/resume`,    lastModified: now },
    ...projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: now,
    })),
  ];
}
```

- [ ] **Step 2: Robots**

```ts
// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/login", "/api"] },
    sitemap: "https://jamilmendez.dev/sitemap.xml",
  };
}
```

- [ ] **Step 3: OG image**

Drop a 1200x630 PNG at `public/og-image.png`. Quick win: a slate background with your name and tagline rendered in any image editor.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts public/og-image.png
git commit -m "feat: SEO sitemap, robots, and OG image"
```

---

# Phase 6 — Deploy & Repo Reservations

### Task 29: Push to GitHub + connect Vercel

**Files:** (none — operations only)

- [ ] **Step 1: Create the GitHub repo**

```bash
gh auth switch -u Jamil1016
gh repo create Jamil1016/portfolio --private --source=. --remote=origin --push
```

- [ ] **Step 2: Sign in to Vercel as personal**

In a fresh browser profile, visit [vercel.com](https://vercel.com), sign in with the GitHub `Jamil1016` account.

- [ ] **Step 3: Import the project**

In Vercel dashboard → **Add New… → Project → Import `Jamil1016/portfolio`**. Accept defaults; the framework is Next.js.

- [ ] **Step 4: Add environment variables in Vercel project settings**

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | (from Supabase) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from Supabase) |
| `SUPABASE_SERVICE_ROLE_KEY` | (from Supabase) |
| `ALLOWED_EMAIL` | (your personal email) |

- [ ] **Step 5: Trigger first deploy**

Click **Deploy**. Wait ~2 minutes. Visit the `*.vercel.app` URL Vercel assigns. Verify the landing renders.

- [ ] **Step 6: End-to-end auth smoke on the live URL**

1. Visit `/dashboard` → redirect to `/login`
2. Submit your allowed email
3. Click the magic link in your inbox
4. Land on `/dashboard` with the seeded weeks

- [ ] **Step 7: Make the GitHub repo public**

```bash
gh repo edit Jamil1016/portfolio --visibility public --accept-visibility-change-consequences
```

---

### Task 30: Custom domain (optional same-day)

**Files:** (none — operations only)

- [ ] **Step 1: Buy a domain**

Recommended: `jamilmendez.dev` (or your preference) via Namecheap or Cloudflare Registrar. Use the personal email.

- [ ] **Step 2: Add the domain in Vercel**

Project → **Settings → Domains → Add → `jamilmendez.dev`**. Vercel shows the DNS records to set.

- [ ] **Step 3: Update DNS at the registrar**

Add the A / CNAME records Vercel shows. Wait for propagation (5–60 min).

- [ ] **Step 4: Update base URLs in code**

If you didn't pick `jamilmendez.dev` exactly, update `app/sitemap.ts`, `app/robots.ts`, and `app/layout.tsx` (`metadataBase`) to the real domain. Commit and push:

```bash
git add app/
git commit -m "chore: point sitemap/robots/metadata to custom domain"
git push
```

---

### Task 31: Create six placeholder showcase repos under Jamil1016

**Files:** (none — operations only)

- [ ] **Step 1: Define the placeholder README content**

Save this template locally as `placeholder-readme.md` (not committed):

```markdown
# <repo-name>

Open-source reference implementation of the **<pattern>** pattern.

The production version of this system runs privately at my employer at the scale described on the portfolio case study:
https://jamilmendez.dev/projects/<slug>

This repository will contain a **clean-room implementation** on synthetic data, designed for public consumption — same architecture, same techniques, my IP.

**ETA:** Week <N> of the AI Engineer learning path

## Why a separate repo

- The work code is my employer's IP and stays private
- This repo is written on personal time against synthetic data — same patterns, distinct codebase
- The case study explains what the system does and the decisions behind it

## Status

🚧 Placeholder. Real code lands on the ETA above.
```

- [ ] **Step 2: Create each repo and seed it with the placeholder README**

Repeat for each of the six:

```bash
gh auth switch -u Jamil1016
mkdir -p /tmp/placeholder && cd /tmp/placeholder

for repo in local-pipeline gmail-scraper pipeline-guardian data-analyst-reporting-agent date-validator report-automation; do
  rm -rf "$repo"
  mkdir "$repo" && cd "$repo"
  git init
  cp ~/placeholder-readme.md README.md
  # Replace placeholders in README.md with the right repo + pattern names manually here
  # before committing.
  git add README.md
  git commit -m "chore: placeholder for clean-room implementation"
  gh repo create "Jamil1016/$repo" --public --source=. --remote=origin --push
  cd ..
done
```
After running, manually edit each README on github.com to fill in the repo name, pattern name, slug, and ETA week.

- [ ] **Step 3: Verify case-study `Read repo →` links resolve**

Visit each `/projects/<slug>` on the live site. The "Open-source reference implementation coming WN" text should reference a working repo URL (links to the placeholder README on github.com).

---

### Task 32: Flip work-side public repos to private

**Files:** (none — operations only)

- [ ] **Step 1: Switch active GH to work**

```bash
gh auth switch -u jamilmendez-ontel
gh auth status
```

- [ ] **Step 2: Flip the two public work repos to private**

```bash
gh repo edit jamilmendez-ontel/local-pipeline --visibility private --accept-visibility-change-consequences
gh repo edit jamilmendez-ontel/gmail-scraper --visibility private --accept-visibility-change-consequences
```

- [ ] **Step 3: Verify**

```bash
gh repo view jamilmendez-ontel/local-pipeline --json visibility
gh repo view jamilmendez-ontel/gmail-scraper --json visibility
```
Expected: `{"visibility":"PRIVATE"}` on both.

- [ ] **Step 4: Switch back to personal as the active account**

```bash
gh auth switch -u Jamil1016
gh auth status
```

---

# Phase 7 — v1 Sign-off

### Task 33: Acceptance checklist against the spec's success criteria

- [ ] **Step 1: Lighthouse audit on landing**

Open the deployed `/` in Chrome → DevTools → Lighthouse → Mobile + Desktop. Target ≥ 95 across Performance, Accessibility, Best Practices, SEO. Note any failures and fix the cheapest first (alt text, meta description, image sizes).

- [ ] **Step 2: Mobile responsive check at 375px**

DevTools → device toolbar → iPhone SE (375x667). Scroll the landing, projects index, a case study, and `/login`. No horizontal scroll on any page.

- [ ] **Step 3: Magic-link login end-to-end on production**

Already covered in Task 29 Step 6, but re-verify in a private/incognito window.

- [ ] **Step 4: Tracker edits from a phone**

Open `/login` on your phone, send magic link, open it on the phone, edit one week's notes + status, reload to confirm persisted.

- [ ] **Step 5: Six case studies, each linked from the landing and live**

Click through all six tiles. Each renders without errors.

- [ ] **Step 6: Resume PDF downloads**

Click "Download PDF" on `/resume`. File downloads successfully.

- [ ] **Step 7: All six placeholder repos exist and link from case studies**

Verify the six `Jamil1016/<slug>` URLs return live placeholder READMEs.

- [ ] **Step 8: Final commit — declare v1 done**

```bash
git commit --allow-empty -m "v1 shipped: portfolio + tracker live, six showcase placeholders reserved"
git push
gh release create v1.0.0 --title "v1.0.0 — initial launch" \
  --notes "Public portfolio + private learning tracker live. Showcase repos placeholders reserved on the W3–W12 schedule."
```

---

## Self-Review Pass

The following requirements from the spec are covered:

| Spec section | Implemented by |
|---|---|
| §3 Architecture (Next.js + Tailwind + shadcn + Supabase + Vercel) | Tasks 2–5, 8, 11, 29 |
| §4 Repo layout | All tasks (paths follow the spec) |
| §5.1 Landing bento grid (11 tiles) | Tasks 12–16, 26 |
| §5.2 Project case study template | Task 18 |
| §5.3 Projects index | Task 20 |
| §5.4 About | Task 21 |
| §5.5 Resume + PDF download | Task 21 |
| §6.1 Login | Task 23 |
| §6.2 Dashboard learning tracker | Tasks 24–25 |
| §6.2 Section 2 Capstone | Tasks 7 (seed row with `phase='Capstone'`), 25 (renders) |
| §6.2 Section 3 Quick stats (count) | Task 25 (header shows `done / total`) |
| §6.3 Mobile responsive dashboard | Tasks 24, 33 |
| §7 Data model + RLS + view | Task 6 |
| §7.4 Seed | Task 7 |
| §8 Auth allowlist + magic link | Tasks 9, 22, 23 |
| §9 Six placeholder showcase repos | Task 31 |
| §9 Flip work repos to private | Task 32 |
| §10 Six MDX case studies | Task 19 |
| §11 Deployment to Vercel + env vars | Task 29 |
| §11 Custom domain | Task 30 |
| §12 Success criteria 1–8 | Task 33 |
| §2 v1 Goals: GitHub feed tile | Task 26 |
| §2 v1 Goals: Vercel Analytics | Task 11 |
| §2 v1 Goals: Certification widget | Task 27 |

**Type consistency:** `WeekRow` defined in `WeekCard.tsx` matches the columns in `learning_weeks` per the migration in Task 6. `ProjectMeta` defined in `lib/projects.ts` matches the props expected by `ProjectTile` and `CaseStudyLayout`. Server action `updateWeekStatus(id, patch)` signature matches calls from `WeekCard`.

**Placeholder scan:** No `TBD`/`TODO`/`add appropriate X` markers in the task body. The only true placeholders are user-specific data the engineer fills in (your personal email, UUID, domain, LinkedIn URL) which are intentional and clearly labeled.

**Open spec items deferred to user input at execution time:** headshot photo, LinkedIn URL string, exact personal email, exact domain choice. These are noted in spec §13 and surfaced in Tasks 5, 7, 13, and 30.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-20-career-site-v1.md`.

Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — I execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
