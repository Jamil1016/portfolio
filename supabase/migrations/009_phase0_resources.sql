-- 009_phase0_resources.sql
-- Point Phase 0 items at specific, current learning resources (the broad doc
-- landing pages were unfollowable), and split the over-broad "Claude Code
-- power-user" item (0a) into two focused items:
--   0a  = project memory & workflows (CLAUDE.md, /init, common workflows)
--   0a+ = automation (hooks, subagents, slash commands)
-- MCP (0e) and Skills (0f) remain the dedicated items for those topics, so 0a
-- no longer overlaps them. Idempotent. Runs after 006 + 008.
-- NOTE: avoid em dashes in this file (they previously broke a migration).

-- 1. Re-point URLs + renumber Phase 0 so the new 0a+ slots in at sort_order 2.
--    Keyed on (phase, week_label) so re-runs set the same absolute values.
update public.learning_weeks lw
set sort_order = v.sort_order,
    url        = v.url,
    updated_at = now()
from (values
  ('Week 0a', 1, 'https://code.claude.com/docs/en/memory'),
  ('Week 0b', 3, 'https://github.com/anthropics/courses/tree/master/prompt_engineering_interactive_tutorial'),
  ('Week 0c', 4, 'https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals'),
  ('Week 0d', 5, 'https://code.claude.com/docs/en/agent-sdk/quickstart'),
  ('Week 0e', 6, 'https://modelcontextprotocol.io/docs/develop/build-server'),
  ('Week 0f', 7, 'https://code.claude.com/docs/en/skills'),
  ('Week 0g', 8, 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching'),
  ('Week 0h', 9, 'https://platform.claude.com/docs/en/managed-agents/overview')
) as v(week_label, sort_order, url)
where lw.phase = 'Phase 0 - Mastering Claude'
  and lw.week_label = v.week_label
  and lw.owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com');

-- move the Phase 0 capstone from 9 to 10 to make room
update public.learning_weeks
set sort_order = 10, updated_at = now()
where phase = 'Phase 0 - Mastering Claude' and week_label = 'Capstone'
  and owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com');

-- 2. Narrow 0a to project memory & workflows.
update public.learning_weeks
set course_title   = 'Claude Code: project memory & workflows (CLAUDE.md, /init, common workflows)',
    objectives     = 'CLAUDE.md project memory & auto-memory; /init; path-scoped rules; the common workflows (explore, fix, refactor, test). Structured course: Anthropic Academy "Claude Code 101".',
    success_metric = 'A CLAUDE.md committed to a repo Claude actually uses (real build/test commands + conventions); /init run and the file refined once.',
    data_source    = 'The portfolio (or DARA) repo, with its real commands and conventions',
    apply_action   = 'A CLAUDE.md PR to the repo',
    time_estimate  = '~3 hrs',
    playbook_path  = 'docs/roadmap/phase-0.md#week-0a',
    updated_at     = now()
where phase = 'Phase 0 - Mastering Claude' and week_label = 'Week 0a'
  and owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com');

-- 3. Insert the new automation item at sort_order 2. Delete-then-insert on
--    (phase, week_label) keeps it idempotent (no unique constraint exists).
delete from public.learning_weeks
where phase = 'Phase 0 - Mastering Claude' and week_label = 'Week 0a+'
  and owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com');

insert into public.learning_weeks
  (owner_id, phase, week_label, course_title, url, time_estimate, apply_action, sort_order,
   objectives, success_metric, data_source, playbook_path)
select u.id, 'Phase 0 - Mastering Claude', 'Week 0a+',
  'Claude Code: automation (hooks, subagents, slash commands)',
  'https://code.claude.com/docs/en/hooks-guide',
  '~3 hrs',
  'A PR adding a hook + a slash command (+ a subagent definition)',
  2,
  'Lifecycle hooks (PreToolUse / PostToolUse); authoring subagents and when to fan out; custom slash commands. Docs: hooks-guide, sub-agents, commands.',
  'A hook that fires automatically + one custom slash command + one subagent, all working in a repo.',
  'The portfolio (or DARA) repo',
  'docs/roadmap/phase-0.md#week-0a-2'
from auth.users u
where u.email = 'jamilmendez1016@gmail.com';

-- verify
select sort_order, week_label, left(course_title, 46) as title, url
from public.learning_weeks
where phase = 'Phase 0 - Mastering Claude'
  and owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com')
order by sort_order;
