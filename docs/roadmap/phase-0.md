# Phase 0 — Mastering Claude → Claude Certified Architect: Foundations (CCA-F)

The Phase 0 focus is the **CCA-F** credential. Each Anthropic Academy course maps to a
concrete **capstone module** and an **acceptance criterion** — a course isn't "done"
until it has produced a working, committed artifact. Completion badges don't count.

- **Exam:** 60 questions, 120 minutes, proctored, closed-book, no AI assistance.
- **Validity:** 2 years.
- **Access path:** join the Claude Partner Network (free) → request the exam at
  `anthropic.skilljar.com/claude-certified-architect-foundations-access-request` (secures the $99 partner price / waiver).
- **Assumed stack:** Python 3.11+, `anthropic` SDK, Supabase/Postgres, Claude Code.

## Exam blueprint (target effort by weight)

| Domain | Weight |
|---|---|
| Agentic Architecture & Orchestration | 27% |
| Claude Code Configuration & Workflows | 20% |
| Prompt Engineering & Structured Output | 20% |
| Tool Design & MCP Integration | 18% |
| Context Management & Reliability | 15% |

## The capstone repo (every course feeds one artifact)

```
cca-capstone/
├── README.md                      # architecture diagram, design rationale, trade-offs
├── pyproject.toml · .env.example
├── CLAUDE.md                      # Claude Code project config
├── .claude/skills/                # custom Agent Skills
├── .github/workflows/ci.yml       # CI/CD with Claude Code + hooks
├── src/
│   ├── config/models.py           # model-selection map: cost/latency/context per task
│   ├── prompts/extraction.py      # schema-validated JSON output
│   ├── schemas/                   # Pydantic guardrails
│   ├── agents/{orchestrator,subagents/,escalation}.py
│   ├── mcp_server/{server,tools/}.py   # typed tools over Supabase/Postgres
│   ├── context/manager.py         # window budgeting, summarization checkpoints
│   └── reliability/retries.py     # backoff, fallback, circuit breakers
├── tests/scenarios/               # eval cases mirroring exam scenarios
└── infra/{supabase/,deploy/}
```

---

## <a id="cca-claude-101"></a>0a — Claude 101 (foundations)  `BUILD`

**Course:** [Claude 101](https://anthropic.skilljar.com/claude-101) · **Domain:** baseline.
**Learn:** what Claude is, the model family, core concepts.
**Measure:** `cca-capstone` repo created; README states the system's purpose + a textual architecture diagram.
**Ships:** repo init + README skeleton (`cca-capstone/README.md`).
**Build steps:** ① create the repo + `pyproject.toml` → ② write the README purpose statement → ③ sketch a textual architecture diagram → ④ commit.

## <a id="cca-ai-fluency"></a>0b — AI Fluency: Framework & Foundations  `BUILD`

**Course:** [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations) · **Domain:** prompt-eng judgment.
**Learn:** delegation vs discernment — what the agent decides vs what it escalates.
**Measure:** README "Design Principles & Guardrails" section documents the delegate/escalate policy.
**Ships:** README guardrails section.
**Build steps:** ① list decisions the agent may take autonomously → ② list those it must escalate → ③ write the policy into the README → ④ commit.

## <a id="cca-platform-101"></a>0c — Claude Platform 101 (skip if API-fluent)  `BUILD`

**Course:** [Claude Platform 101](https://anthropic.skilljar.com/claude-platform-101) · **Domain:** Prompt/Structured (20%).
**Learn:** prompt & structured-output basics; model selection (cost / latency / context / batch API).
**Measure:** a model-selection table (cost, latency, context window, batch notes per task) in `src/config/models.py` + `.env.example`.
**Ships:** `models.py` + `.env.example`.
**Build steps:** ① enumerate task types in the capstone → ② pick a model per task with rationale → ③ encode as a table/map in `models.py` → ④ commit.

## <a id="cca-building-api"></a>0d — Building with the Claude API (do in full)  `BUILD`

**Course:** [Building with the Claude API](https://anthropic.skilljar.com/claude-with-the-anthropic-api) · **Domain:** Agentic (27%) + Prompt/Structured (20%). **The spine — 47% of the exam.**
**Learn:** Messages API, tool use, structured JSON output, the single-agent loop.
**Measure:** a single-agent loop with tool use returns JSON validated against a Pydantic schema; failing validation triggers a re-ask.
**Ships:** `src/prompts/extraction.py` + base `src/agents/orchestrator.py`.
**Build steps:** ① define a Pydantic output schema → ② write the extraction prompt → ③ build the loop (model → tool_use → tool_result) → ④ validate output, re-ask on failure → ⑤ commit.

## <a id="cca-claude-code-101"></a>0e — Claude Code 101 (skip if daily user)  `BUILD`

**Course:** [Claude Code 101](https://anthropic.skilljar.com/claude-code-101) · **Domain:** Claude Code (20%).
**Learn:** Claude Code config; CLAUDE.md project memory, conventions, context boundaries.
**Measure:** project `CLAUDE.md` with build/test commands, conventions, and context boundaries.
**Ships:** `CLAUDE.md`.
**Build steps:** ① run `/init` → ② fill in real build/test commands + conventions → ③ set context boundaries → ④ commit.

## <a id="cca-claude-code-action"></a>0f — Claude Code in Action  `BUILD`

**Course:** [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action) · **Domain:** Claude Code (20%).
**Learn:** Claude Code workflows; CI/CD with Claude Code; pre/post lifecycle hooks.
**Measure:** CI runs lint + tests on PR; at least one pre/post hook configured.
**Ships:** `.github/workflows/ci.yml` + a hook.
**Build steps:** ① write `ci.yml` (lint + tests on PR) → ② add a PreToolUse or PostToolUse hook → ③ confirm both fire → ④ commit.

## <a id="cca-agent-skills"></a>0g — Introduction to Agent Skills  `BUILD`

**Course:** [Introduction to Agent Skills](https://anthropic.skilljar.com/introduction-to-agent-skills) · **Domain:** Claude Code (20%).
**Learn:** authoring custom Agent Skills that auto-apply to repeatable tasks.
**Measure:** one custom Skill in `.claude/skills/` that auto-applies to a repeatable task in this repo.
**Ships:** a custom Skill.
**Build steps:** ① pick a repeatable task → ② write the SKILL.md with a trigger description → ③ confirm it auto-fires → ④ commit.

## <a id="cca-mcp-intro"></a>0h — Introduction to MCP  `BUILD`

**Course:** [Introduction to MCP](https://anthropic.skilljar.com/introduction-to-model-context-protocol) · **Domain:** MCP / Tool Design (18%).
**Learn:** MCP server anatomy; typed tools; tool schema design.
**Measure:** an MCP server exposing ≥2 typed tools backed by Supabase queries; the orchestrator calls them.
**Ships:** `src/mcp_server/server.py` + `tools/`.
**Build steps:** ① scaffold the MCP server → ② write ≥2 typed tools over Supabase → ③ wire the orchestrator to call them → ④ test on sample inputs → ⑤ commit.

## <a id="cca-mcp-advanced"></a>0i — MCP: Advanced Topics (caching & reliability)  `BUILD`

**Course:** [MCP: Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) · **Domain:** MCP (18%) + Context Mgmt & Reliability (15%).
**Learn:** advanced MCP; transport-error handling, backoff, fallback, circuit breakers; **prompt caching** + context-window budgeting (the old "0g caching" item folds in here).
**Measure:** tools handle transport errors with backoff; tighter schemas reduce misrouting in a test; prompt caching on the static prefix shows `cache_read_input_tokens > 0`.
**Ships:** `src/reliability/retries.py` + caching on the system/schema prefix.
**Build steps:** ① add backoff + a circuit breaker to tool calls → ② tighten tool schemas, prove fewer misroutes in a test → ③ add a `cache_control` breakpoint above the static prefix → ④ confirm `cache_read_input_tokens > 0` → ⑤ commit.

## <a id="cca-subagents"></a>0j — Introduction to Subagents  `BUILD`

**Course:** [Introduction to Subagents](https://anthropic.skilljar.com/introduction-to-subagents) · **Domain:** Agentic (27%) + Context (15%).
**Learn:** hub-and-spoke orchestration; isolated-context subagents; context budgeting with summarization; human-in-the-loop escalation.
**Measure:** orchestrator delegates to ≥2 subagents in isolated contexts; `context/manager.py` enforces a token budget with summarization; an escalation path triggers on a defined condition.
**Ships:** `src/agents/subagents/` + `context/manager.py` + `agents/escalation.py`.
**Build steps:** ① split work into ≥2 specialized subagents → ② give each an isolated context → ③ add token-budget + summarization checkpoints → ④ wire the escalation trigger → ⑤ commit.

## <a id="cca-vertex"></a>0k — Claude with Google Vertex AI (optional)  `SUPPORT`

**Course:** [Claude with Google Vertex AI](https://anthropic.skilljar.com/claude-with-google-vertex) · **When:** only if deploying on GCP (aligns with your GCP PDE track).
**Learn:** deploying Claude on GCP Vertex AI.
**Measure:** `infra/deploy/` contains a working Vertex adapter (only required if deploying on GCP).
**Ships:** a Vertex deploy adapter (optional).
**Build steps:** ① add the Vertex adapter behind the deploy interface → ② run one call through Vertex → ③ commit (skip entirely if not deploying on GCP).

## <a id="cca-exam"></a>CCA-F — Claude Certified Architect: Foundations (the exam)  `BUILD`

**Register:** join the [Claude Partner Network](https://anthropic.skilljar.com) (free) → [request exam access](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request).
**Measure:** all 5 domains green in the coverage check below; **pass the CCA-F exam.**
**Ships:** the CCA-F certificate (set its credential URL as this item's artifact).
**Pre-exam checklist:**
- ☐ Joined Claude Partner Network (secures $99 price) and requested exam access.
- ☐ All 5 domains green (see table).
- ☐ Ran `tests/scenarios/` drills: cost/latency trade-offs, autonomous-vs-escalate, tool-selection debugging.
- ☐ README explains every architectural trade-off in plain language (the muscle the scenario questions test).
- ☐ Booked a 120-minute proctored slot in a quiet environment.

### Domain coverage check (all green before sitting)

| Domain | Covered by |
|---|---|
| Agentic Architecture & Orchestration (27%) | `orchestrator.py` + `subagents/` |
| Claude Code Config & Workflows (20%) | `CLAUDE.md` + `ci.yml` + a Skill |
| Prompt Engineering & Structured Output (20%) | `extraction.py` + `schemas/` |
| Tool Design & MCP Integration (18%) | `mcp_server/` |
| Context Management & Reliability (15%) | `context/manager.py` + `reliability/retries.py` |

### Suggested cadence (6 weeks, ~8–10 hrs/week)

| Week | Items | Outcome |
|---|---|---|
| 1 | 0a–0b | Repo + README + principles |
| 2–3 | 0c–0d | API spine: validated structured output + base agent loop |
| 4 | 0e–0g | Claude Code config, CI, custom Skill |
| 5 | 0h–0i + start 0j | MCP server live; reliability + caching; subagents begun |
| 6 | finish 0j + pre-exam | Coverage green, scenario drills, sit the exam |

> Verify the live Academy catalog before enrolling — Anthropic keeps adding/renaming courses. Slot any new title by domain using the blueprint table.
