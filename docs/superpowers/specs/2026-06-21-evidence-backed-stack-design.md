# Evidence-Backed Stack — Design

**Date:** 2026-06-21
**Status:** Approved

## Problem

The home page "Technical stack" section (`components/home/Stack.tsx`) renders each
skill with a hand-typed proficiency percentage (`pct`) and an animated bar. These
numbers come from nowhere measurable — they are subjective self-ratings in
`lib/site-data.ts`. Arbitrary "95%" skill bars are a well-known "AI-generated
portfolio" tell and get discounted by recruiters because they are unfalsifiable.

## Goal

Replace each skill's percentage with **evidence**: a concrete proof phrase plus a
link to the real project that demonstrates the skill. Every row must be truthful
and point at a project that exists in `lib/projects.ts`.

## Data model (`lib/site-data.ts`)

```ts
export type Skill = {
  name: string;
  proof: string;        // hard metric, or qualitative phrase when no clean number
  projectSlug: string;  // links to /projects/<slug>
  projectName: string;  // display label for the link
};
export type SkillColumn = { title: string; skills: Skill[] };
```

## Mappings

### Data & Pipelines
| Skill | proof | projectName (slug) |
|---|---|---|
| Python | 12.2M rows across 14 pipelines | Async ETL Platform (`local-pipeline`) |
| PostgreSQL | 111 tables, materialized views | Async ETL Platform (`local-pipeline`) |
| Async ETL (asyncpg) | 12 concurrent GitHub Actions workflows | Async ETL Platform (`local-pipeline`) |
| GitHub Actions | 14 scheduled pipelines in production | Cross-Source Date Validator (`date-validator`) |
| Supabase | backs 10 production systems | Pipeline Guardian (`pipeline-guardian`) |
| Data quality & dedup | per-carrier date reconciliation | Cross-Source Date Validator (`date-validator`) |

### AI & Orchestration
| Skill | proof | projectName (slug) |
|---|---|---|
| Claude API | 2 agents in production | Pipeline Guardian (`pipeline-guardian`) |
| Prompt engineering | eval-gated prompt suite | DARA (`data-analyst-reporting-agent`) |
| Agent design & tool use | human-in-the-loop tool approvals | Pipeline Guardian (`pipeline-guardian`) |
| NL → SQL | chat-first analytics over the warehouse | DARA (`data-analyst-reporting-agent`) |
| Evals & safety rails | Postgres RLS + eval harness | DARA (`data-analyst-reporting-agent`) |
| Next.js + TypeScript | 3 shipped web apps | Ops Portal (`portal`) |

**Honesty fix:** the old "FastAPI + Next.js" skill is renamed to **"Next.js +
TypeScript"** — no project in `lib/projects.ts` uses FastAPI, whereas DARA, Ops
Portal, and Quote Automation are all Next.js + TypeScript apps.

## Layout (`components/home/Stack.tsx`, `app/home.css`)

Two-line stacked rows:

```
Python
12.2M rows across 14 pipelines — Async ETL Platform →
```

- Line 1: skill name.
- Line 2 (muted): `{proof} — {projectName} →`, where `{projectName} →` is a
  `next/link` to `/projects/{projectSlug}`.
- Remove the `data-count`/bar markup. Keep the two-column grouping
  (Data & Pipelines / AI & Orchestration).

## Cleanup

- Remove the dead skill-bar animation block (`i[data-w]`) from
  `components/home/HomeEffects.tsx`. The stats-band counter animation
  (`.num[data-count]`) is untouched.
- Remove `.bar`, `.bar i`, `.pc`, and per-row bar-color rules from `app/home.css`;
  add styles for the two-line skill row and its link.

## Testing

- New `tests/components/Stack.test.tsx` (TDD, written first): renders the section
  and asserts each skill shows its name, its proof text, and a link whose `href`
  points to the correct `/projects/<slug>`.

## Out of scope

The stats band (12.2M rows / 111 tables / 14 pipelines / 10 systems / 2 agents),
the ticker, and all other home sections are unchanged.
