# Roadmap Enrichment — Design Spec

**Date:** 2026-06-13
**Status:** Approved (design) — ready for implementation plan
**Author:** Jamil Mendez (with Claude)

## Problem

The learning roadmap (`learning_weeks` table, rendered on `/dashboard` via `WeekCard`)
is **course-centric**: each row is a course link plus a thin one-line `apply_action`
nudge ("Add an eval harness to one Pipeline Guardian decision"). It tells you *what to
watch* but not *what to actually learn*, *how you'll know you learned it*, or *what real
data to build against*. There is nothing concrete to follow.

## Goal

Reframe every roadmap item from **course → project**: a measurable, data-grounded
mini-project built against real Ontel systems, so completing each item ships something
of value. The roadmap should double as the **build plan for DARA**, the flagship.

## Decisions (locked)

1. **Format: Hybrid.** Structured fields on the DB/dashboard (at-a-glance) + a detailed
   per-phase playbook in the repo (the spec you follow).
2. **Scope: Enrich in place.** Keep the existing phases (0–5), courses, ordering, and
   `sort_order`. Add depth to each of the 29 items. No courses added or removed.
3. **DARA is the north-star spine.** The roadmap threads through building/hardening DARA
   end-to-end. Other systems (Async ETL Platform, Pipeline Guardian, Report Automation)
   supply data/projects where DARA doesn't fit. Finishing the roadmap ≈ DARA shipped +
   hardened + written up.
4. **DARA status: core works, hardening it.** Agent loop + NL→SQL + tool use are DONE.
   In progress: safety rails, eval suite. TODO: caching, RAG, observability. Items are
   tagged `HARDEN` / `BUILD` / `SUPPORT` accordingly so early items deepen-and-refactor
   rather than build-from-scratch.

## Per-item content schema

Each of the 29 items gains four required fields plus build steps:

| Field | Meaning | Storage |
|-------|---------|---------|
| **Learn** (`objectives`) | 3–5 concrete concepts to understand — the actual ideas, not the course title | new DB column + dashboard |
| **Measure** (`success_metric`) | One pass/fail criterion. A number or a reconciliation, never "I read it" | new DB column + dashboard |
| **Data** (`data_source`) | The specific real system + dataset to build against | new DB column + dashboard |
| **Ships** | What lands in prod (PR / eval result / dashboard / writeup) | existing `artifact_url` (user fills the live link) + a line in the playbook |
| **Build steps** | Ordered steps to actually do it | playbook doc only |

`apply_action` is retained but its content is folded into the richer fields; the existing
`notes` / `artifact_url` fields are unchanged in purpose.

## Data model changes

New migration `008_roadmap_enrichment.sql` (idempotent, same email-resolve +
delete-then-insert pattern as `006`):

- `alter table public.learning_weeks add column if not exists objectives text;`
- `... add column if not exists success_metric text;`
- `... add column if not exists data_source text;`
- `... add column if not exists playbook_path text;`  (e.g. `docs/roadmap/phase-0.md#week-0d`)
- Re-seed all 29 rows for owner `jamilmendez1016@gmail.com` with the enriched content.

**Public views unchanged.** The migration does not touch `v_now_learning` or
`v_learning_public`; neither selects any of the new columns, so the enriched fields stay
owner-only (existing RLS) and never surface publicly — they reference internal systems.

## Dashboard UI changes

- `components/tracker/WeekCard.tsx` — extend `WeekRow` with `objectives`,
  `success_metric`, `data_source`, `playbook_path`. Render a compact "Learn / Measure /
  Data" block above the notes area, and a "Full build steps →" link when `playbook_path`
  is set (links to the GitHub blob).
- `app/dashboard/page.tsx` + `app/dashboard/actions.ts` — add the new columns to the
  owner-scoped select.
- No change to `lib/learning.ts` (public snapshot) or the home-page tiles.

## Playbook docs

- `docs/roadmap/phase-0.md` … `phase-5.md` (one file per phase; items as `##` sections),
  plus `docs/roadmap/README.md` indexing them.
- Each item section: Learn / Measure / Data / Ships / Build steps — the full version of
  what the DB stores in summary.

### Public-repo constraint

The portfolio repo is public (`github.com/Jamil1016`). DARA, Pipeline Guardian, and
Report Automation are already public projects, so naming them and describing general data
shapes (e.g. "your nightly run-failure logs", "the 25-table analytics schema") is fine.
Real Ontel business specifics — actual table names, financial figures, internal
identifiers — stay **out** of committed docs. Where a step needs a private specific,
write the placeholder `‹you supply›`.

## DARA spine mapping

| Phase | Item(s) | Tag |
|-------|---------|-----|
| 0 · Mastering Claude | 0b prompt eng, 0c API/SDK, 0d agent loop | `HARDEN` — deepen + refactor DARA core |
| 0 | 0a Claude Code, 0e MCP, 0f Skills, 0h Managed agents | `SUPPORT` — tooling/data from Report Automation, ETL |
| 0 | 0g caching | `BUILD` (TODO) — add to DARA, prove cost ↓ |
| 1 · Stack | W2 evals course | `BUILD` (in progress) — grow DARA eval suite |
| 1.5 · AI Security | 2.5a–d Gandalf/OWASP/red-team | `BUILD` (in progress) — DARA safety rails + NL→SQL/SQLi defense |
| 1.5 | 2.5e safety docs | `SUPPORT` — Pipeline Guardian controls |
| 2 · LLM systems | W3 RAG, W4 eval/observability | `BUILD` (TODO) — RAG over analytics views, traces in DARA |
| 2 | W5 LangChain lens | `HARDEN` — re-read DARA/Guardian tools |
| 3 · Data stack | W6 dbt, W7 dbt→Report Auto, W8 Airflow | `SUPPORT` — ETL + Report Automation, analytics schema |
| 4 · Cloud | W9 GCP, W10 arch rewrite | `SUPPORT` — DARA-on-GCP diagram |
| 5 / Certs / Capstone | depth tracks, GCP PDE, dbt cert, writeup | capstone = publish DARA build story |

## Worked examples

**Week 0d · Building agents — the agent loop, tools, Agent SDK** `HARDEN`
- **Learn:** the canonical agent loop (model → tool_use → tool_result → repeat); stop
  conditions; how the Agent SDK structures context/tools vs a hand-rolled loop.
- **Measure:** DARA's loop refactored to the canonical pattern with 0 regressions on the
  eval suite, and a max-turn / loop-guard added (no infinite tool loops).
- **Data:** DARA's existing agent loop + the NL→SQL tool already built.
- **Ships:** refactor PR to `data-analyst-reporting-agent` + a "loop anatomy" note.
- **Build steps:** ① diagram current loop → ② compare to canonical → ③ refactor to
  explicit states + turn cap → ④ run evals, confirm parity → ⑤ note what changed.

**Week 0g · Cost & performance — prompt caching** `BUILD`
- **Learn:** where `cache_control` breakpoints go; the 5-min TTL & what invalidates a
  cache; reading `cache_read_input_tokens` vs `cache_creation_input_tokens`; when caching
  loses.
- **Measure:** `cache_read_input_tokens > 0` on call #2, and input-token cost on a 10-call
  session drops ≥ 60% vs an uncached baseline recorded first.
- **Data:** DARA's system prompt + the 25-table schema block it injects (the static prefix).
- **Ships:** PR to `data-analyst-reporting-agent` + a before/after token table.
- **Build steps:** ① capture baseline on 10 queries → ② move static block above an
  `ephemeral` breakpoint → ③ re-run, log cache fields → ④ assert ≥60% drop → ⑤ paste table
  into PR.

## Out of scope

- No change to the curriculum (courses, phases, order).
- No change to public home-page tiles or public views.
- No in-app rendering of the playbook (link out to GitHub).
- No new tracking states beyond the existing `not_started / in_progress / done`.

## Acceptance criteria

- Migration `008` applies cleanly and idempotently; all 29 rows have non-null
  `objectives`, `success_metric`, `data_source`.
- Every `Measure` is pass/fail (a number, threshold, or reconciliation).
- Every `Data` names a real system + dataset; no private Ontel specifics in committed text.
- Dashboard renders Learn/Measure/Data + playbook link without breaking existing controls.
- Playbook docs exist for phases 0–5 with one section per item, mirroring the DB summary.
