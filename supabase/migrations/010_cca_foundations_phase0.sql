-- 010_cca_foundations_phase0.sql
-- Replace Phase 0 with the Claude Certified Architect - Foundations (CCA-F)
-- study + build track. Each Anthropic Academy course maps to a capstone module
-- and an acceptance criterion (a committed artifact; completion badges do not
-- count). The cca-capstone repo is the single build target.
-- Also: move Managed Agents out of Phase 0 into Phase 5 (optional, out of CCA-F
-- scope), and fold prompt caching into the MCP Advanced / reliability item.
-- Idempotent. Runs after 006/008/009. ASCII punctuation only (em dashes once
-- broke a migration) and no apostrophes inside string literals.

-- 1. Preserve Managed Agents by moving it to Phase 5 (optional) before the wipe.
update public.learning_weeks
set phase         = 'Phase 5 - Optional depth',
    week_label    = 'Optional',
    course_title  = 'Managed Agents API (optional, out of CCA-F scope)',
    sort_order    = 140,
    playbook_path = 'docs/roadmap/phase-5.md#managed-agents',
    updated_at    = now()
where phase = 'Phase 0 - Mastering Claude' and week_label = 'Week 0h'
  and owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com');

-- 2. Remove the remaining (now-redundant) Phase 0 rows for this owner.
delete from public.learning_weeks
where phase = 'Phase 0 - Mastering Claude'
  and owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com');

-- 3. Insert the CCA-F Phase 0 track (course -> capstone module -> acceptance).
insert into public.learning_weeks
  (owner_id, phase, week_label, course_title, url, time_estimate, apply_action, sort_order,
   objectives, success_metric, data_source, playbook_path)
select u.id,
  v.phase, v.week_label, v.course_title, v.url, v.time_estimate, v.apply_action, v.sort_order,
  v.objectives, v.success_metric, v.data_source, v.playbook_path
from auth.users u
cross join (values
  ('Phase 0 - Mastering Claude','0a','Claude 101 (foundations)',
   'https://anthropic.skilljar.com/claude-101','~2 hrs','Repo init + README skeleton',1,
   'Baseline Claude concepts and the model family. Kicks off the cca-capstone repo.',
   'cca-capstone repo created; README states the system purpose plus a textual architecture diagram.',
   'cca-capstone/README.md','docs/roadmap/phase-0.md#cca-claude-101'),
  ('Phase 0 - Mastering Claude','0b','AI Fluency: Framework and Foundations',
   'https://anthropic.skilljar.com/ai-fluency-framework-foundations','~3 hrs','README guardrails section',2,
   'Delegation vs discernment: what the agent decides vs what it escalates (prompt-engineering judgment).',
   'README has a Design Principles and Guardrails section documenting the delegate/escalate policy.',
   'cca-capstone/README.md','docs/roadmap/phase-0.md#cca-ai-fluency'),
  ('Phase 0 - Mastering Claude','0c','Claude Platform 101 (skip if API-fluent)',
   'https://anthropic.skilljar.com/claude-platform-101','~2 hrs','models.py + .env.example',3,
   'Prompt and structured-output basics; model selection by cost, latency, context window, batch API.',
   'A model-selection table (cost, latency, context window, batch notes per task) in src/config/models.py plus .env.example.',
   'cca-capstone/src/config/models.py','docs/roadmap/phase-0.md#cca-platform-101'),
  ('Phase 0 - Mastering Claude','0d','Building with the Claude API (do in full)',
   'https://anthropic.skilljar.com/claude-with-the-anthropic-api','~6 hrs','extraction.py + base orchestrator',4,
   'Messages API, tool use, structured JSON output, the single-agent loop. Spine of the exam (Agentic 27% + Prompt/Structured 20%).',
   'A single-agent loop with tool use returns JSON validated against a Pydantic schema; failing validation triggers a re-ask.',
   'cca-capstone/src/prompts/extraction.py + src/agents/orchestrator.py','docs/roadmap/phase-0.md#cca-building-api'),
  ('Phase 0 - Mastering Claude','0e','Claude Code 101 (skip if daily user)',
   'https://anthropic.skilljar.com/claude-code-101','~2 hrs','CLAUDE.md',5,
   'Claude Code configuration; CLAUDE.md project memory, conventions, context boundaries.',
   'Project CLAUDE.md with build/test commands, conventions, and context boundaries.',
   'cca-capstone/CLAUDE.md','docs/roadmap/phase-0.md#cca-claude-code-101'),
  ('Phase 0 - Mastering Claude','0f','Claude Code in Action',
   'https://anthropic.skilljar.com/claude-code-in-action','~3 hrs','ci.yml + a hook',6,
   'Claude Code workflows; CI/CD with Claude Code; pre and post lifecycle hooks.',
   'CI runs lint + tests on PR; at least one pre or post hook configured.',
   'cca-capstone/.github/workflows/ci.yml','docs/roadmap/phase-0.md#cca-claude-code-action'),
  ('Phase 0 - Mastering Claude','0g','Introduction to Agent Skills',
   'https://anthropic.skilljar.com/introduction-to-agent-skills','~2 hrs','a custom Skill',7,
   'Authoring custom Agent Skills that auto-apply to repeatable tasks.',
   'One custom Skill in .claude/skills/ that auto-applies to a repeatable task in the repo.',
   'cca-capstone/.claude/skills/','docs/roadmap/phase-0.md#cca-agent-skills'),
  ('Phase 0 - Mastering Claude','0h','Introduction to MCP',
   'https://anthropic.skilljar.com/introduction-to-model-context-protocol','~3 hrs','mcp_server + typed tools',8,
   'MCP server anatomy; typed tools; tool design (MCP / Tool Design 18%).',
   'An MCP server exposes >=2 typed tools backed by Supabase queries; the orchestrator calls them.',
   'cca-capstone/src/mcp_server/','docs/roadmap/phase-0.md#cca-mcp-intro'),
  ('Phase 0 - Mastering Claude','0i','MCP: Advanced Topics (caching and reliability)',
   'https://anthropic.skilljar.com/model-context-protocol-advanced-topics','~3 hrs','reliability/retries.py + caching',9,
   'Advanced MCP; transport-error handling, backoff, fallback, circuit breakers; prompt caching and context-window budgeting (Context Mgmt and Reliability 15%).',
   'Tools handle transport errors with backoff; tighter schemas reduce misrouting in a test; prompt caching on the static prefix shows cache_read_input_tokens greater than 0.',
   'cca-capstone/src/reliability/retries.py + src/context/manager.py','docs/roadmap/phase-0.md#cca-mcp-advanced'),
  ('Phase 0 - Mastering Claude','0j','Introduction to Subagents',
   'https://anthropic.skilljar.com/introduction-to-subagents','~3 hrs','subagents + context manager + escalation',10,
   'Hub-and-spoke orchestration; isolated-context subagents; context budgeting with summarization; human-in-the-loop escalation (Agentic 27% + Context 15%).',
   'Orchestrator delegates to >=2 subagents in isolated contexts; manager enforces a token budget with summarization; escalation triggers on a defined condition.',
   'cca-capstone/src/agents/subagents/ + src/context/manager.py','docs/roadmap/phase-0.md#cca-subagents'),
  ('Phase 0 - Mastering Claude','0k','Claude with Google Vertex AI (optional, GCP deploy)',
   'https://anthropic.skilljar.com/claude-with-google-vertex','~2 hrs','infra/deploy Vertex adapter (optional)',11,
   'Optional: deploy Claude on GCP Vertex AI. Take only if your deployment target is GCP (aligns with your GCP track).',
   'infra/deploy/ contains a working Vertex adapter (only required if deploying on GCP).',
   'cca-capstone/infra/deploy/','docs/roadmap/phase-0.md#cca-vertex'),
  ('Phase 0 - Mastering Claude','CCA-F','CERT: Claude Certified Architect - Foundations (exam)',
   'https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request','120-min exam','CCA-F certificate',12,
   'Sit the proctored exam (60 questions / 120 min, closed-book). Join the Claude Partner Network (free) for the $99 waiver, then request access via Skilljar. Validity 2 years.',
   'All 5 capstone domains green in the coverage check; pass the CCA-F exam.',
   'cca-capstone (whole repo) + tests/scenarios/','docs/roadmap/phase-0.md#cca-exam')
) as v(phase, week_label, course_title, url, time_estimate, apply_action, sort_order,
       objectives, success_metric, data_source, playbook_path)
where u.email = 'jamilmendez1016@gmail.com';

-- verify
select sort_order, week_label, left(course_title, 46) as title
from public.learning_weeks
where phase = 'Phase 0 - Mastering Claude'
  and owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com')
order by sort_order;
