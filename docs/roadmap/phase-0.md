# Phase 0 — Mastering Claude

Foundation phase: learn the Claude toolchain end-to-end by applying each capability directly to DARA and the portfolio repo. Every item ships a measurable artifact against a real system.

## <a id="week-0a"></a>Week 0a — Claude Code power-user  `SUPPORT`

**Learn:** skills authoring; subagents; hooks; MCP config; slash commands; CLAUDE.md memory.
**Measure:** a CLAUDE.md + 1 custom skill + 1 slash command committed; the skill auto-fires on a relevant prompt.
**Data:** the portfolio (or DARA) repo — its real build/test commands and conventions.
**Ships:** PR with the three artifacts (CLAUDE.md, skill file, slash command).
**Build steps:** ① pick the repo (portfolio or DARA) → ② write CLAUDE.md with commands + conventions → ③ author a skill with a trigger description + a slash command → ④ trigger them on a real prompt and confirm auto-fire → ⑤ open PR.

## <a id="week-0b"></a>Week 0b — Prompt engineering tutorial  `HARDEN`

**Learn:** tutorial structure: role, clear instructions, examples, output formatting, chain-of-thought.
**Measure:** DARA's worst prompt rewritten; eval pass-rate improves by ≥1 previously-failing case.
**Data:** DARA's worst-performing prompt + its failing eval cases.
**Ships:** prompt PR + before/after pass-rate numbers.
**Build steps:** ① identify the worst prompt by running evals and sorting by failure count → ② rewrite it using the tutorial structure (role / instructions / examples / output format / CoT) → ③ re-run evals → ④ record the before/after delta → ⑤ open PR.

## <a id="week-0c"></a>Week 0c — Claude API / Anthropic SDK fundamentals  `HARDEN`

**Learn:** Messages API shape (system/messages/roles); streaming; the tool_use/tool_result cycle; `stop_reason` handling; token-usage fields.
**Measure:** one non-idiomatic DARA call refactored with `stop_reason` handled explicitly; evals still pass.
**Data:** DARA's existing Anthropic SDK call sites.
**Ships:** refactor PR to `data-analyst-reporting-agent` + a short "API contract" note.
**Build steps:** ① list DARA's SDK call sites → ② check each against the Messages API docs → ③ refactor the least-idiomatic one, handle `stop_reason` → ④ run evals, confirm parity → ⑤ open PR.

## <a id="week-0d"></a>Week 0d — Agent loop / Agent SDK  `HARDEN`

**Learn:** canonical agent loop (model→tool_use→tool_result→repeat); stop conditions; Agent SDK context/tools.
**Measure:** DARA loop refactored to canonical pattern with 0 eval regressions + a max-turn loop guard added.
**Data:** DARA's existing agent loop + the NL→SQL tool.
**Ships:** refactor PR + a "loop anatomy" note documenting the states.
**Build steps:** ① diagram DARA's current loop (states, transitions) → ② compare to the canonical model→tool_use→tool_result→repeat pattern → ③ refactor to explicit states + add a turn cap → ④ run evals to confirm parity → ⑤ write the loop anatomy note.

## <a id="week-0e"></a>Week 0e — MCP server  `SUPPORT`

**Learn:** MCP server anatomy (tools/resources/prompts); stdio transport; tool discovery; tool schema design.
**Measure:** 1 Report Automation query exposed as an MCP tool, returning correct rows on 3 sample inputs.
**Data:** a Report Automation query (daily finance report shape).
**Ships:** MCP server + a 3-input transcript showing correct output.
**Build steps:** ① scaffold an MCP server with stdio transport → ② wrap the Report Automation query as a tool with a well-typed schema → ③ connect it from Claude Code → ④ run 3 sample inputs and verify correct rows → ⑤ commit the server + transcript.

## <a id="week-0f"></a>Week 0f — Claude Skills  `SUPPORT`

**Learn:** SKILL.md frontmatter & triggers; progressive disclosure; bundling scripts; skill vs prompt.
**Measure:** a reporting skill that auto-triggers on a reporting request and produces the correct report format.
**Data:** the Report Automation report spec/format.
**Ships:** packaged skill + trigger transcript showing auto-fire.
**Build steps:** ① write SKILL.md with a trigger description matching reporting requests → ② bundle the report template inside the skill → ③ test auto-trigger on a natural reporting prompt → ④ refine the trigger description until reliable → ⑤ commit skill + transcript.

## <a id="week-0g"></a>Week 0g — Caching / cost  `BUILD`

**Learn:** `cache_control` breakpoints; 5-min TTL & invalidation; `cache_read` vs `cache_creation` tokens; when caching loses.
**Measure:** `cache_read_input_tokens > 0` on call #2 AND 10-call session input cost drops ≥60% vs recorded baseline.
**Data:** DARA's system prompt + the 25-table schema block it injects (static prefix).
**Ships:** caching PR + a before/after token table showing ≥60% drop.
**Build steps:** ① run 10 baseline queries and record input-token totals → ② move the static schema block above ephemeral content to form the cacheable prefix → ③ add `cache_control` breakpoints and log `cache_read_input_tokens` + `cache_creation_input_tokens` → ④ assert ≥60% drop in a test → ⑤ open PR with the token comparison table.

## <a id="week-0h"></a>Week 0h — Managed agents (optional)  `SUPPORT`

**Learn:** server-managed agents vs self-hosted loop; sessions; rubric-graded outcomes; tradeoffs.
**Measure:** a design sketch of DARA as a Managed Agent with one rubric-graded outcome (explicit pass/fail).
**Data:** DARA's current agent definition + one representative task.
**Ships:** a playbook design note (committed markdown).
**Build steps:** ① read the managed-agents docs thoroughly → ② map DARA's existing loop to the managed-agent model (sessions, turn management) → ③ define one rubric-graded outcome with explicit pass/fail criteria → ④ note tradeoffs (self-hosted vs managed: latency, cost, control) → ⑤ commit the design note.

## <a id="capstone"></a>Capstone (Phase 0) — Ship one Claude feature E2E  `BUILD`

**Learn:** integrating loop + MCP tool + skill + caching into one shipped feature; writing it up publicly.
**Measure:** 1 DARA feature live E2E using loop + MCP tool + skill + caching; a public writeup exists.
**Data:** DARA prod.
**Ships:** feature PR merged to DARA + published writeup linked on the dashboard.
**Build steps:** ① pick a thin but real DARA feature that touches all four capabilities → ② build it using the canonical loop + an MCP tool + a triggering skill + prompt caching → ③ ship (merge PR, deploy) → ④ write up the architecture with diagrams and eval numbers → ⑤ publish and link the writeup as the item's artifact URL.
