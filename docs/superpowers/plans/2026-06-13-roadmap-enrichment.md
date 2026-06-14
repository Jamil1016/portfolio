# Roadmap Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe all 29 learning-roadmap items from course-centric to project-centric — each gains Learn/Measure/Data/Ships fields grounded in real Ontel systems, with DARA as the build spine — stored as new DB columns (shown on the dashboard) plus per-phase playbook docs.

**Architecture:** New idempotent migration `008` adds four columns to `learning_weeks` and re-seeds all 29 rows with enriched content; `WeekCard` renders the new fields; per-phase markdown playbooks in `docs/roadmap/` hold the full build steps. Public views and the home page are untouched.

**Tech Stack:** Supabase/Postgres (SQL migrations), Next.js (App Router) + React + TypeScript, Tailwind, Vitest + Testing Library.

---

## File Structure

- **Create** `supabase/migrations/008_roadmap_enrichment.sql` — adds columns + re-seeds 29 rows (the DB-summary fields).
- **Modify** `components/tracker/WeekCard.tsx` — extend `WeekRow` type + render Learn/Measure/Data + playbook link.
- **Modify** `tests/components/WeekCard.test.tsx` — add assertions for the new fields.
- **Create** `docs/roadmap/README.md` — index of the playbook.
- **Create** `docs/roadmap/phase-0.md` … `docs/roadmap/phase-5.md` — full build steps per item.
- **No change** to `app/dashboard/page.tsx` (already `select("*")`), `app/dashboard/actions.ts`, `lib/learning.ts`, or any public view.

**Source of truth for content:** the [Content Appendix](#content-appendix) at the bottom of this plan holds the complete authored text for all 29 items. Tasks 5 and 6 transcribe from it.

---

## Task 1: Migration 008 — add columns

**Files:**
- Create: `supabase/migrations/008_roadmap_enrichment.sql`

- [ ] **Step 1: Write the column-add header of the migration**

Create `supabase/migrations/008_roadmap_enrichment.sql` with:

```sql
-- 008_roadmap_enrichment.sql
-- Adds enrichment columns to learning_weeks and re-seeds all rows with
-- project-centric content (Learn / Measure / Data + playbook link).
-- Idempotent: safe to re-run. Public views (v_now_learning, v_learning_public)
-- are intentionally NOT modified; the new columns stay owner-only via RLS.

alter table public.learning_weeks add column if not exists objectives     text;
alter table public.learning_weeks add column if not exists success_metric text;
alter table public.learning_weeks add column if not exists data_source    text;
alter table public.learning_weeks add column if not exists playbook_path  text;
```

- [ ] **Step 2: Verify the SQL parses (no DB required)**

Run: `node -e "const s=require('fs').readFileSync('supabase/migrations/008_roadmap_enrichment.sql','utf8'); if(!/add column if not exists objectives/.test(s)) throw new Error('missing column'); console.log('ok');"`
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/008_roadmap_enrichment.sql
git commit -m "feat(db): add roadmap enrichment columns to learning_weeks"
```

---

## Task 2: WeekCard — failing test for new fields

**Files:**
- Modify: `tests/components/WeekCard.test.tsx`

- [ ] **Step 1: Extend the test fixture and add a test**

In `tests/components/WeekCard.test.tsx`, add `objectives`, `success_metric`, `data_source`, and `playbook_path` to the `week` fixture object, and add this test inside the `describe` block:

```tsx
  it("renders learn objectives, success metric, data source, and playbook link", () => {
    const enriched = {
      ...week,
      objectives: "Messages API; tool use; streaming",
      success_metric: "1 DARA call ported, eval ≥ baseline",
      data_source: "DARA prod prompt log",
      playbook_path: "docs/roadmap/phase-0.md#week-0c",
    };
    render(<WeekCard week={enriched} />);
    expect(screen.getByText(/Messages API/)).toBeInTheDocument();
    expect(screen.getByText(/eval ≥ baseline/)).toBeInTheDocument();
    expect(screen.getByText(/DARA prod prompt log/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /build steps/i })).toBeInTheDocument();
  });
```

Add the four fields to the existing `week` fixture as well (so the existing tests still type-check):

```tsx
    objectives: null,
    success_metric: null,
    data_source: null,
    playbook_path: null,
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/components/WeekCard.test.tsx`
Expected: FAIL — the new test cannot find "Messages API" text (WeekCard does not render it yet); existing tests may also fail to type-check if `WeekRow` lacks the new fields.

---

## Task 3: WeekCard — render the new fields

**Files:**
- Modify: `components/tracker/WeekCard.tsx`

- [ ] **Step 1: Extend the `WeekRow` type**

In `components/tracker/WeekCard.tsx`, add the four fields to the `WeekRow` type (after `artifact_url`):

```tsx
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
  objectives: string | null;
  success_metric: string | null;
  data_source: string | null;
  playbook_path: string | null;
};
```

- [ ] **Step 2: Render the Learn/Measure/Data block + playbook link**

Replace the existing `apply_action` paragraph block:

```tsx
      {week.apply_action && (
        <p className="mt-3 text-sm text-slate-300">{week.apply_action}</p>
      )}
```

with this enriched block (keeps `apply_action` as the "Ships" line):

```tsx
      {(week.objectives || week.success_metric || week.data_source) && (
        <dl className="mt-3 space-y-1.5 text-sm">
          {week.objectives && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-mono text-xs uppercase text-emerald-500/80">Learn</dt>
              <dd className="text-slate-300">{week.objectives}</dd>
            </div>
          )}
          {week.success_metric && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-mono text-xs uppercase text-amber-500/80">Measure</dt>
              <dd className="text-slate-300">{week.success_metric}</dd>
            </div>
          )}
          {week.data_source && (
            <div className="flex gap-2">
              <dt className="shrink-0 font-mono text-xs uppercase text-sky-500/80">Data</dt>
              <dd className="text-slate-300">{week.data_source}</dd>
            </div>
          )}
        </dl>
      )}
      {week.apply_action && (
        <p className="mt-2 text-sm text-slate-400">
          <span className="font-mono text-xs uppercase text-slate-500">Ships</span> · {week.apply_action}
        </p>
      )}
      {week.playbook_path && (
        <a
          href={`https://github.com/Jamil1016/portfolio/blob/main/${week.playbook_path}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-xs text-emerald-400 hover:text-emerald-300"
        >
          Full build steps →
        </a>
      )}
```

- [ ] **Step 3: Run the test to verify it passes**

Run: `npx vitest run tests/components/WeekCard.test.tsx`
Expected: PASS — all tests green.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (or no new errors in `WeekCard.tsx` / the test).

- [ ] **Step 5: Commit**

```bash
git add components/tracker/WeekCard.tsx tests/components/WeekCard.test.tsx
git commit -m "feat(dashboard): render Learn/Measure/Data + playbook link on WeekCard"
```

---

## Task 4: Migration 008 — seed enriched content

**Files:**
- Modify: `supabase/migrations/008_roadmap_enrichment.sql`

- [ ] **Step 1: Append the re-seed block**

Append to `supabase/migrations/008_roadmap_enrichment.sql` an `update` per row that sets `objectives`, `success_metric`, `data_source`, `playbook_path`, matched on `(owner_id, sort_order)`. Use this exact pattern (idempotent — updates existing seeded rows from migration 006; does not duplicate):

```sql
-- Re-seed enrichment fields for the owner's rows, matched by sort_order.
update public.learning_weeks lw
set objectives     = v.objectives,
    success_metric = v.success_metric,
    data_source    = v.data_source,
    playbook_path  = v.playbook_path,
    updated_at     = now()
from (values
  -- (sort_order, objectives, success_metric, data_source, playbook_path)
  (1, 'Skills authoring; subagents; hooks; MCP config; slash commands; CLAUDE.md memory',
      'A CLAUDE.md + 1 custom skill + 1 slash command committed; the skill auto-fires on a relevant prompt',
      'The portfolio (or DARA) repo — its real build/test commands and conventions',
      'docs/roadmap/phase-0.md#week-0a'),
  (2, 'Tutorial structure: role, clear instructions, examples, output formatting, chain-of-thought',
      'DARA''s worst prompt rewritten; eval pass-rate improves by ≥1 previously-failing case',
      'DARA''s worst-performing prompt + its failing eval cases',
      'docs/roadmap/phase-0.md#week-0b'),
  (3, 'Messages API shape; streaming; tool_use/tool_result cycle; stop_reason; token usage fields',
      '1 non-idiomatic DARA call refactored with stop_reason handled; evals still pass',
      'DARA''s existing Anthropic SDK call sites',
      'docs/roadmap/phase-0.md#week-0c'),
  (4, 'Canonical agent loop (model→tool_use→tool_result→repeat); stop conditions; Agent SDK context/tools',
      'DARA loop refactored to canonical pattern with 0 eval regressions + a max-turn loop guard',
      'DARA''s existing agent loop + the NL→SQL tool',
      'docs/roadmap/phase-0.md#week-0d'),
  (5, 'MCP server anatomy (tools/resources/prompts); stdio transport; tool discovery; tool schema design',
      '1 Report Automation query exposed as an MCP tool, returning correct rows on 3 sample inputs',
      'A Report Automation query (daily finance report shape)',
      'docs/roadmap/phase-0.md#week-0e'),
  (6, 'SKILL.md frontmatter & triggers; progressive disclosure; bundling scripts; skill vs prompt',
      'A reporting skill that auto-triggers on a reporting request and produces the report format',
      'The Report Automation report spec/format',
      'docs/roadmap/phase-0.md#week-0f'),
  (7, 'cache_control breakpoints; 5-min TTL & invalidation; cache_read vs cache_creation tokens; when caching loses',
      'cache_read_input_tokens>0 on call #2 AND 10-call session input cost drops ≥60% vs recorded baseline',
      'DARA''s system prompt + the 25-table schema block it injects (static prefix)',
      'docs/roadmap/phase-0.md#week-0g'),
  (8, 'Server-managed agents vs self-hosted loop; sessions; rubric-graded outcomes; tradeoffs',
      'A design sketch of DARA as a Managed Agent with one rubric-graded outcome (explicit pass/fail)',
      'DARA''s current agent definition + one representative task',
      'docs/roadmap/phase-0.md#week-0h'),
  (9, 'Integrating loop + MCP tool + skill + caching into one shipped feature; writing it up',
      '1 DARA feature live E2E using loop + MCP tool + skill + caching; a public writeup exists',
      'DARA prod',
      'docs/roadmap/phase-0.md#capstone'),
  (20, 'Eval harness design; graded test sets; classification vs model-graded evals; measuring prompt changes',
       'Eval harness over 1 decision with ≥10 graded cases producing a pass-rate; a prompt change moves it',
       'Real DARA query/answer pairs (or Pipeline Guardian remediation decisions)',
       'docs/roadmap/phase-1.md#week-2'),
  (25, 'Prompt-injection tactics: instruction override, encoding, role-play, indirect; which defenses block which',
       'Beat ≥ Gandalf Level 5; documented tactics→defense map applied to DARA''s prompt boundary',
       'Gandalf levels (external) applied to DARA''s prompt boundary',
       'docs/roadmap/phase-1_5.md#week-2-5a'),
  (26, 'OWASP LLM Top 10 risks; mapping each to a real system',
       'All 10 mapped to your systems with covered/not-covered verdicts; ≥1 gap filed as a DARA ticket',
       'DARA + Pipeline Guardian architecture',
       'docs/roadmap/phase-1_5.md#week-2-5b'),
  (27, 'Systematic red-team techniques; building adversarial cases; measuring robustness',
       '1 red-team technique applied to DARA prompt construction with a documented result + mitigation',
       'DARA prompt construction path',
       'docs/roadmap/phase-1_5.md#week-2-5c'),
  (28, 'SQLi vectors; auth bypass; how NL→SQL can emit unsafe SQL; parameterization/allowlisting',
       'DARA NL→SQL path verified against ≥5 malicious prompts — all blocked or read-only/schema-scoped',
       'DARA NL→SQL generation + DB role/permissions',
       'docs/roadmap/phase-1_5.md#week-2-5d'),
  (29, 'Responsible scaling concepts; safety controls for autonomous agents',
       'A note listing which RSP-style controls Pipeline Guardian has vs lacks',
       'Pipeline Guardian''s autonomy scope',
       'docs/roadmap/phase-1_5.md#week-2-5e'),
  (30, 'Retrieval over structured/unstructured; chunking; embeddings; RAG eval (faithfulness/relevance)',
       'RAG over analytics views answers 5 business questions with citations; retrieval relevance measured',
       'The analytics-schema views (table/column descriptions, metric definitions)',
       'docs/roadmap/phase-2.md#week-3'),
  (40, 'Agent traces & spans; what to log (tool calls, tokens, latency, decisions); offline vs online eval',
       'Traces added so every DARA/Guardian run emits a structured trace answering "why did run X decide Y"',
       'DARA/Pipeline Guardian run logs',
       'docs/roadmap/phase-2.md#week-4'),
  (50, 'LCEL composition; tool abstraction; LangChain''s agent model vs hand-rolled; what to borrow/skip',
       'A written comparison identifying ≥2 concrete improvements (adopted or rejected with reason)',
       'DARA/Pipeline Guardian tool definitions',
       'docs/roadmap/phase-2.md#week-5'),
  (60, 'dbt models, refs, sources, tests, materializations; dbt vs hand-written SQL pipelines',
       'dbt-postgres running against Supabase with ≥1 model built and dbt test passing',
       'The analytics schema (read-only)',
       'docs/roadmap/phase-3.md#week-6'),
  (70, 'Converting procedural SQL to a dbt model; sources + schema tests; incremental models',
       '1 Report Automation query as a dbt model with ≥2 tests passing, output reconciling row-for-row',
       'A Report Automation query + its current output',
       'docs/roadmap/phase-3.md#week-7'),
  (80, 'DAGs, operators, scheduling, retries, backfill; Airflow vs GitHub Actions cron',
       'pipeline.yml redrawn as an Airflow DAG running locally E2E on sample data with task-level retries',
       'The ETL platform''s pipeline.yml + a sample slice',
       'docs/roadmap/phase-3.md#week-8'),
  (90, 'GCP GenAI service map (Vertex AI, BigQuery, Cloud Run, Pub/Sub); managed vs self-hosted tradeoffs',
       'A table mapping ≥3 Supabase/GHA components to GCP equivalents with a cost/benefit note each',
       'Your current architecture inventory',
       'docs/roadmap/phase-4.md#week-9'),
  (100, 'Cloud architecture diagramming; data flow; failure domains; cost modeling',
        'A DARA-on-GCP diagram with data flow + one failure-mode annotation per component',
        'DARA''s current architecture',
        'docs/roadmap/phase-4.md#week-10'),
  (110, 'Agent frameworks breadth (track-dependent)',
        'Complete one depth track with a working agent demo artifact',
        'A sandbox dataset or DARA subset',
        'docs/roadmap/phase-5.md#hf-agents'),
  (120, 'Production-ML rigor: testing, CI/CD for ML, monitoring',
        'Apply one MLOps practice to an existing pipeline (e.g., a data-validation gate in CI)',
        'ETL/Report Automation CI',
        'docs/roadmap/phase-5.md#mlops'),
  (130, 'Transformer internals; tokenization; attention; fine-tuning basics',
        'A written explainer connecting one internal concept to an observed DARA behavior',
        'DARA behavior logs',
        'docs/roadmap/phase-5.md#hf-llm'),
  (500, 'GCP Professional Data Engineer domains: storage, pipelines, ML, security',
        'Pass the GCP Professional Data Engineer exam',
        'Official exam guide + practice exams',
        'docs/roadmap/phase-4.md#cert-gcp-pde'),
  (501, 'dbt Analytics Engineering exam domains: modeling, testing, deployment',
        'Pass the dbt Analytics Engineering certification exam',
        'dbt cert exam guide',
        'docs/roadmap/phase-3.md#cert-dbt'),
  (999, 'Technical writing; architecture narrative; presenting evals/safety/observability',
        'A published writeup with architecture diagram, eval harness, RAG/agent vocab, GCP comparison',
        'Everything built across the roadmap',
        'docs/roadmap/README.md#capstone')
) as v(sort_order, objectives, success_metric, data_source, playbook_path)
where lw.sort_order = v.sort_order
  and lw.owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com');

-- Verify
select sort_order, week_label, left(objectives, 40) as learn, left(success_metric, 40) as measure
from public.learning_weeks
where owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com')
order by sort_order;
```

> **Note:** matching on `sort_order` requires migration `006` to have run first (the rows must exist). If they don't, run `006` first. The `update ... from (values ...)` is idempotent.

- [ ] **Step 2: Verify the SQL references all 29 sort_orders**

Run: `node -e "const s=require('fs').readFileSync('supabase/migrations/008_roadmap_enrichment.sql','utf8'); const m=(s.match(/^\s*\((\d+),/gm)||[]).length; if(m!==29) throw new Error('expected 29 rows, got '+m); console.log('29 rows ok');"`
Expected: `29 rows ok`

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/008_roadmap_enrichment.sql
git commit -m "feat(db): seed enriched roadmap content (Learn/Measure/Data) for 29 items"
```

---

## Task 5: Playbook docs

**Files:**
- Create: `docs/roadmap/README.md`, `docs/roadmap/phase-0.md`, `phase-1.md`, `phase-1_5.md`, `phase-2.md`, `phase-3.md`, `phase-4.md`, `phase-5.md`

- [ ] **Step 1: Write `docs/roadmap/README.md`**

```markdown
# Learning Roadmap — Build Playbook

Project-centric roadmap: every item is a measurable mini-project built against a real
system, with **DARA** as the north-star build spine. The dashboard (`/dashboard`) shows
the Learn/Measure/Data summary per item; this playbook holds the full build steps.

**Tags:** `BUILD` = creates a new DARA feature · `HARDEN` = deepens/refactors an existing
one · `SUPPORT` = uses another system (ETL, Pipeline Guardian, Report Automation).

**`‹you supply›`** marks a private Ontel specific to fill in locally — keep real table
names / financials out of this public repo.

- [Phase 0 — Mastering Claude](phase-0.md)
- [Phase 1 — Master your existing stack](phase-1.md)
- [Phase 1.5 — AI Security](phase-1_5.md)
- [Phase 2 — LLM systems engineering](phase-2.md)
- [Phase 3 — Modern data stack](phase-3.md)
- [Phase 4 — Cloud + GenAI fluency](phase-4.md)
- [Phase 5 — Optional depth](phase-5.md)

## <a id="capstone"></a>Capstone — Public writeup
**Learn:** technical writing; architecture narrative; presenting evals/safety/observability.
**Measure:** a published writeup with architecture diagram, eval harness, RAG/agent vocab, GCP comparison.
**Data:** everything built across the roadmap.
**Ships:** the public post (set its URL as the item's artifact link).
**Build steps:** ① outline the DARA story (problem → build → harden) → ② pull diagrams/eval tables from earlier items → ③ draft → ④ publish → ⑤ link it on the dashboard.
```

- [ ] **Step 2: Write each `phase-N.md`**

For every phase file, write one `##` section per item using the anchor in its `playbook_path` (e.g. `## <a id="week-0c"></a>Week 0c — …`). Each section MUST contain the five fields, transcribed from the [Content Appendix](#content-appendix): **Learn**, **Measure**, **Data**, **Ships**, and **Build steps** (the Appendix gives the build steps for items that have them; for `SUPPORT`/optional/cert items without explicit steps in the Appendix, write a 3–5 step sequence that achieves the Measure). Use `‹you supply›` for any private specific.

Example section (Phase 0, Week 0c — transcribe the rest the same way):

```markdown
## <a id="week-0c"></a>Week 0c — Claude API / Anthropic SDK fundamentals  `HARDEN`

**Learn:** Messages API shape (system/messages/roles); streaming; the tool_use/tool_result cycle; `stop_reason` handling; token-usage fields.
**Measure:** one non-idiomatic DARA call refactored with `stop_reason` handled explicitly; evals still pass.
**Data:** DARA's existing Anthropic SDK call sites.
**Ships:** refactor PR to `data-analyst-reporting-agent` + a short "API contract" note.
**Build steps:** ① list DARA's SDK call sites → ② check each against the Messages API docs → ③ refactor the least-idiomatic one, handle `stop_reason` → ④ run evals, confirm parity → ⑤ open PR.
```

- [ ] **Step 3: Verify all playbook anchors referenced by the migration exist**

Run:
```bash
node -e "
const fs=require('fs');
const mig=fs.readFileSync('supabase/migrations/008_roadmap_enrichment.sql','utf8');
const refs=[...mig.matchAll(/'(docs\/roadmap\/[a-z0-9_.-]+\.md)#([a-z0-9-]+)'/g)];
let missing=[];
for(const [,file,anchor] of refs){
  if(!fs.existsSync(file)){missing.push(file+' (file)');continue;}
  const c=fs.readFileSync(file,'utf8');
  if(!c.includes('id=\"'+anchor+'\"')) missing.push(file+'#'+anchor);
}
if(missing.length) throw new Error('missing anchors:\n'+missing.join('\n'));
console.log('all '+refs.length+' playbook anchors resolve');
"
```
Expected: `all 29 playbook anchors resolve`

- [ ] **Step 4: Commit**

```bash
git add docs/roadmap/
git commit -m "docs(roadmap): add per-phase build playbook with full steps"
```

---

## Task 6: Apply migration + manual verification

> Migrations in this project are applied by hand in the Supabase SQL editor (see prior migration history). This task is manual.

- [ ] **Step 1: Apply the migration**

Open the Supabase SQL editor for the portfolio project and run the full contents of `supabase/migrations/008_roadmap_enrichment.sql`. Confirm the trailing `select` returns 29 rows, each with non-null `learn` and `measure`.

- [ ] **Step 2: Verify the dashboard renders**

Run: `npm run dev` (serves on port 3001 — see project config), sign in via magic link, open `http://localhost:3001/dashboard`.
Expected: each card shows a **Learn / Measure / Data** block, a **Ships ·** line, and a **Full build steps →** link that opens the matching playbook section on GitHub.

- [ ] **Step 3: Confirm public pages are unchanged**

Open `http://localhost:3001/` (home). Expected: the Now-Learning tile and any public learning display look exactly as before — no enriched fields leaked.

---

## Self-Review

- **Spec coverage:** columns (Task 1) ✓; per-item Learn/Measure/Data (Task 4 + Appendix) ✓; Ships via `apply_action` (already seeded, rendered Task 3) ✓; playbook build steps (Task 5) ✓; dashboard render (Tasks 2–3) ✓; public views untouched (Task 1 note + Task 6 step 3) ✓; public-repo `‹you supply›` constraint (Task 5) ✓; DARA spine tags (Appendix) ✓.
- **Acceptance criteria:** 29 rows non-null after migration (Task 4/6) ✓; every Measure is pass/fail (Appendix — each is a number/threshold/reconciliation) ✓; every Data names a real system (Appendix) ✓; dashboard renders without breaking controls (Task 3 keeps status buttons/notes/artifact) ✓; playbook for phases 0–5 (Task 5) ✓.

---

## Content Appendix

Complete authored content for all 29 items. `sort_order` matches migration 006. Tag: `BUILD`/`HARDEN`/`SUPPORT`.

### Phase 0 — Mastering Claude
- **0a (1) Claude Code power-user · SUPPORT** — *Learn:* skills, subagents, hooks, MCP config, slash commands, CLAUDE.md. *Measure:* CLAUDE.md + 1 skill + 1 slash command committed; skill auto-fires. *Data:* portfolio/DARA repo conventions. *Ships:* PR with the three. *Steps:* ① pick repo → ② write CLAUDE.md (commands+conventions) → ③ author a skill + slash command → ④ trigger them → ⑤ PR.
- **0b (2) Prompt engineering tutorial · HARDEN** — *Learn:* role/instructions/examples/output-format/CoT. *Measure:* worst DARA prompt rewritten; ≥1 failing eval case now passes. *Data:* DARA worst prompt + failing cases. *Ships:* prompt PR + before/after numbers. *Steps:* ① find worst prompt by eval → ② rewrite to tutorial structure → ③ re-run evals → ④ record delta → ⑤ PR.
- **0c (3) Claude API/SDK fundamentals · HARDEN** — *Learn:* Messages API, streaming, tool_use/tool_result, stop_reason, usage. *Measure:* 1 non-idiomatic call refactored w/ stop_reason; evals pass. *Data:* DARA SDK call sites. *Ships:* refactor PR + API note. *Steps:* see Task 5 example.
- **0d (4) Agent loop / Agent SDK · HARDEN** — *Learn:* canonical loop, stop conditions, SDK context/tools. *Measure:* loop refactored, 0 eval regressions, max-turn guard. *Data:* DARA loop + NL→SQL tool. *Ships:* refactor PR + "loop anatomy" note. *Steps:* ① diagram current loop → ② compare to canonical → ③ refactor to explicit states + turn cap → ④ evals parity → ⑤ note.
- **0e (5) MCP server · SUPPORT** — *Learn:* tools/resources/prompts, stdio, discovery, tool schema. *Measure:* 1 Report Automation query as MCP tool, correct on 3 inputs. *Data:* a Report Automation query. *Ships:* MCP server + 3-input transcript. *Steps:* ① scaffold MCP server → ② wrap query as a tool w/ schema → ③ connect from Claude → ④ test 3 inputs → ⑤ commit transcript.
- **0f (6) Claude Skills · SUPPORT** — *Learn:* frontmatter triggers, progressive disclosure, bundling, skill vs prompt. *Measure:* reporting skill auto-triggers + emits report format. *Data:* Report Automation report spec. *Ships:* packaged skill + trigger transcript. *Steps:* ① write SKILL.md w/ trigger desc → ② bundle the report template → ③ test auto-trigger → ④ refine description → ⑤ commit.
- **0g (7) Caching / cost · BUILD** — *Learn:* cache_control, TTL/invalidation, cache_read vs creation, when caching loses. *Measure:* cache_read>0 call#2 + ≥60% input-cost drop over 10 calls vs baseline. *Data:* DARA system prompt + 25-table schema prefix. *Ships:* caching PR + before/after token table. *Steps:* ① baseline 10 queries → ② move static block above ephemeral breakpoint → ③ log cache fields → ④ assert ≥60% → ⑤ PR table.
- **0h (8) Managed agents (optional) · SUPPORT** — *Learn:* managed vs self-hosted, sessions, rubric outcomes. *Measure:* design sketch of DARA-as-Managed-Agent w/ 1 rubric outcome. *Data:* DARA agent definition + one task. *Ships:* playbook design note. *Steps:* ① read managed-agents docs → ② map DARA's loop to it → ③ define a rubric-graded outcome → ④ note tradeoffs → ⑤ commit note.
- **Capstone(0) (9) Ship one Claude feature E2E · BUILD** — *Learn:* integrate loop+MCP+skill+caching; writeup. *Measure:* 1 DARA feature live using all four + public writeup. *Data:* DARA prod. *Ships:* feature PR + writeup. *Steps:* ① pick a thin feature → ② build with loop+MCP tool+skill+caching → ③ ship → ④ write it up → ⑤ publish.

### Phase 1 — Master your existing stack
- **W2 (20) Anthropic courses (prompting + evals) · BUILD** — *Learn:* eval harness, graded sets, classification vs model-graded, measuring prompt changes. *Measure:* harness over 1 decision, ≥10 graded cases, pass-rate; a change moves it. *Data:* DARA QA pairs (or Guardian decisions). *Ships:* harness + baseline pass-rate. *Steps:* ① collect 10 cases w/ expected answers → ② build grader → ③ run baseline → ④ change a prompt → ⑤ show delta.

### Phase 1.5 — AI Security
- **2.5a (25) Gandalf · BUILD(safety)** — *Learn:* injection tactics + defenses. *Measure:* beat ≥L5; tactics→defense map applied to DARA boundary. *Data:* Gandalf → DARA prompt boundary. *Ships:* playbook note. *Steps:* ① play to L5+ → ② log what worked → ③ map each to a DARA defense → ④ note gaps → ⑤ commit.
- **2.5b (26) OWASP LLM Top 10 · BUILD(safety)** — *Learn:* the 10 risks + mapping. *Measure:* all 10 mapped covered/not; ≥1 gap → DARA ticket. *Data:* DARA + Guardian arch. *Ships:* risk table + 1 filed gap. *Steps:* ① list the 10 → ② verdict per system → ③ pick worst gap → ④ file ticket → ⑤ commit table.
- **2.5c (27) Red Teaming LLM Apps · BUILD(safety)** — *Learn:* red-team techniques, adversarial cases, robustness. *Measure:* 1 technique on DARA prompt construction, documented result + mitigation. *Data:* DARA prompt path. *Ships:* result note + mitigation PR. *Steps:* ① pick a technique → ② craft cases → ③ run vs DARA → ④ mitigate if breached → ⑤ document.
- **2.5d (28) OWASP Web Top 10 · BUILD(safety)** — *Learn:* SQLi, auth bypass, unsafe NL→SQL, parameterization/allowlisting. *Measure:* NL→SQL vs ≥5 malicious prompts — all blocked/read-only/schema-scoped. *Data:* DARA NL→SQL + DB role. *Ships:* SQLi test set + guardrail PR. *Steps:* ① write 5 malicious prompts → ② run vs DARA → ③ enforce read-only + schema scope → ④ re-test → ⑤ PR.
- **2.5e (29) Anthropic safety/RSP · SUPPORT** — *Learn:* RSP concepts, controls for autonomy. *Measure:* note of which controls Guardian has vs lacks. *Data:* Guardian autonomy scope. *Ships:* controls note. *Steps:* ① read RSP → ② list controls → ③ check Guardian → ④ note gaps → ⑤ commit.

### Phase 2 — LLM systems engineering
- **W3 (30) Advanced RAG · BUILD** — *Learn:* retrieval, chunking, embeddings, RAG eval. *Measure:* RAG over analytics views answers 5 questions w/ citations; relevance measured. *Data:* analytics-schema views + metric defs. *Ships:* RAG prototype + 5-question eval. *Steps:* ① index view docs → ② build retrieval → ③ wire to DARA → ④ test 5 Qs → ⑤ measure relevance.
- **W4 (40) Evaluating AI Agents / observability · BUILD** — *Learn:* traces, spans, what to log, offline vs online. *Measure:* every run emits a structured trace answering "why did run X decide Y". *Data:* DARA/Guardian run logs. *Ships:* tracing PR + 1 trace walkthrough. *Steps:* ① define trace schema → ② instrument tool calls/decisions → ③ emit per run → ④ replay one run → ⑤ PR.
- **W5 (50) Functions/Tools/Agents (LangChain) · HARDEN** — *Learn:* LCEL, tool abstraction, LangChain agent model vs hand-rolled. *Measure:* comparison w/ ≥2 concrete improvements (adopt/reject + reason). *Data:* DARA/Guardian tool defs. *Ships:* comparison note. *Steps:* ① skim LCEL → ② map your tools to it → ③ find 2 improvements → ④ decide adopt/reject → ⑤ note.

### Phase 3 — Modern data stack
- **W6 (60) dbt Fundamentals · SUPPORT** — *Learn:* models/refs/sources/tests/materializations; dbt vs SQL scripts. *Measure:* dbt-postgres on Supabase, ≥1 model, dbt test passes. *Data:* analytics schema (read-only). *Ships:* dbt skeleton + passing test. *Steps:* ① install dbt-postgres → ② point at Supabase → ③ build 1 model → ④ add a test → ⑤ dbt test.
- **W7 (70) Apply dbt to Report Automation · SUPPORT** — *Learn:* procedural→dbt model, sources+tests, incremental. *Measure:* 1 query→dbt model, ≥2 tests pass, output reconciles row-for-row. *Data:* a Report Automation query + output. *Ships:* dbt model PR + reconciliation. *Steps:* ① pick query → ② port to model + sources → ③ add not_null/unique → ④ reconcile rows → ⑤ PR.
- **W8 (80) Airflow 101 · SUPPORT** — *Learn:* DAGs/operators/scheduling/retries/backfill; Airflow vs GHA cron. *Measure:* pipeline.yml as a DAG running locally E2E on sample data w/ retries. *Data:* ETL pipeline.yml + sample slice. *Ships:* DAG file + local-run log. *Steps:* ① map yml stages to tasks → ② write DAG + deps → ③ add retries → ④ run on sample → ⑤ capture log.

### Phase 4 — Cloud + GenAI fluency
- **W9 (90) GCP GenAI Leader · SUPPORT** — *Learn:* GCP GenAI service map; managed vs self-hosted. *Measure:* table mapping ≥3 Supabase/GHA components to GCP + cost/benefit each. *Data:* current arch inventory. *Ships:* swap-table note. *Steps:* ① inventory components → ② find GCP equivalents → ③ cost/benefit each → ④ pick top 3 → ⑤ commit table.
- **W10 (100) Architecture rewrite · SUPPORT** — *Learn:* cloud diagramming, data flow, failure domains, cost. *Measure:* DARA-on-GCP diagram w/ data flow + 1 failure-mode per component. *Data:* DARA current arch. *Ships:* diagram + rationale. *Steps:* ① draw current arch → ② map to GCP → ③ annotate failure modes → ④ rationale → ⑤ commit.
- **Cert GCP PDE (500)** — *Learn:* PDE domains (storage/pipelines/ML/security). *Measure:* pass the exam. *Data:* exam guide + practice. *Ships:* certificate (artifact = credential link). *Steps:* ① study guide → ② practice exams → ③ weak-area drills → ④ book → ⑤ pass.

### Phase 5 — Optional depth
- **HF Agents (110) · SUPPORT(optional)** — *Learn:* agent frameworks breadth. *Measure:* complete 1 track w/ a working agent demo. *Data:* sandbox/DARA subset. *Ships:* demo repo. *Steps:* ① pick track → ② follow units → ③ build demo → ④ test → ⑤ publish.
- **MLOps (120) · SUPPORT(optional)** — *Learn:* ML testing, CI/CD, monitoring. *Measure:* apply 1 MLOps practice (e.g., CI data-validation gate). *Data:* ETL/Report Auto CI. *Ships:* CI gate PR. *Steps:* ① pick practice → ② add to CI → ③ make it fail on bad data → ④ verify → ⑤ PR.
- **HF LLM Course (130) · SUPPORT(optional)** — *Learn:* transformer internals, tokenization, attention, fine-tuning. *Measure:* explainer linking 1 internal concept to an observed DARA behavior. *Data:* DARA behavior logs. *Ships:* explainer note. *Steps:* ① study chapter → ② find a matching DARA behavior → ③ explain the link → ④ review → ⑤ commit.
- **Cert dbt Analytics Engineer (501)** — *Learn:* modeling/testing/deployment. *Measure:* pass the dbt cert exam. *Data:* dbt cert guide. *Ships:* certificate. *Steps:* ① study guide → ② practice → ③ drill weak areas → ④ book → ⑤ pass.

### Capstone
- **Capstone (999) Public writeup · BUILD** — *Learn:* technical writing, architecture narrative, presenting evals/safety/observability. *Measure:* published writeup w/ diagram + eval harness + RAG/agent vocab + GCP comparison. *Data:* everything built. *Ships:* public post (artifact = link). *Steps:* ① outline DARA story → ② gather diagrams/tables → ③ draft → ④ publish → ⑤ link on dashboard.
