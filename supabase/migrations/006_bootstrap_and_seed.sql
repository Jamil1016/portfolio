-- 006_bootstrap_and_seed.sql
-- Self-contained: creates the learning_weeks schema IF it doesn't exist, then seeds
-- the roadmap by resolving the owner via email. Idempotent - safe to re-run.
-- Use this if 001-004 were never applied (table missing) or you just want one script.

-- 1. Schema (no-op if already present) -------------------------------------
create table if not exists public.learning_weeks (
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

create index if not exists learning_weeks_owner_sort_idx
  on public.learning_weeks (owner_id, sort_order);

alter table public.learning_weeks enable row level security;

drop policy if exists "owner can read own" on public.learning_weeks;
create policy "owner can read own"
  on public.learning_weeks for select
  using (auth.uid() = owner_id);

drop policy if exists "owner can write own" on public.learning_weeks;
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

-- 2. Seed (clears this owner's rows first, then re-inserts) -----------------
delete from public.learning_weeks
where owner_id in (
  select id from auth.users where email = 'jamilmendez1016@gmail.com'
);

insert into public.learning_weeks
  (owner_id, phase, week_label, course_title, url, time_estimate, apply_action, sort_order)
select u.id, v.phase, v.week_label, v.course_title, v.url, v.time_estimate, v.apply_action, v.sort_order
from auth.users u
cross join (values
  -- Phase 0 - Mastering Claude (front-loaded; sort_order 1-9)
  ('Phase 0 - Mastering Claude','Week 0a',
   'Claude Code power-user - skills, subagents, hooks, MCP, slash commands, CLAUDE.md',
   'https://docs.claude.com/en/docs/claude-code/overview',
   '~5 hrs','Build a CLAUDE.md + one custom skill + one slash command for the portfolio or DARA repo.',1),
  ('Phase 0 - Mastering Claude','Week 0b',
   'Anthropic Interactive Prompt Engineering Tutorial',
   'https://github.com/anthropics/prompt-eng-interactive-tutorial',
   '~6 hrs','Rewrite DARA''s worst-performing prompt using the tutorial''s structure.',2),
  ('Phase 0 - Mastering Claude','Week 0c',
   'Claude API / Anthropic SDK fundamentals - Messages API, system prompts, streaming, tool use',
   'https://platform.claude.com/docs/en/build-with-claude/overview',
   '~5 hrs','Replace one DARA LLM call with a direct Anthropic SDK call using tool use.',3),
  ('Phase 0 - Mastering Claude','Week 0d',
   'Building agents with Claude - the agent loop, tools, context, Claude Agent SDK',
   'https://platform.claude.com/docs/en/agents-and-tools/agent-sdk',
   '~5 hrs','Prototype Pipeline Guardian as a real agent loop.',4),
  ('Phase 0 - Mastering Claude','Week 0e',
   'Model Context Protocol (MCP) - build an MCP server',
   'https://modelcontextprotocol.io',
   '~5 hrs','Wrap one Report Automation query as an MCP tool.',5),
  ('Phase 0 - Mastering Claude','Week 0f',
   'Claude Skills - authoring reusable skills',
   'https://platform.claude.com/docs/en/agents-and-tools/skills',
   '~3 hrs','Package a reusable reporting skill for DARA.',6),
  ('Phase 0 - Mastering Claude','Week 0g',
   'Cost & performance - prompt caching, adaptive thinking / effort, context editing',
   'https://platform.claude.com/docs/en/build-with-claude/prompt-caching',
   '~3 hrs','Add prompt caching to DARA; verify with cache_read_input_tokens.',7),
  ('Phase 0 - Mastering Claude','Week 0h',
   'Managed Agents (optional depth) - server-managed agents, sessions, outcomes',
   'https://platform.claude.com/docs/en/managed-agents/overview',
   '~4 hrs','Sketch DARA as a Managed Agent with a rubric-graded outcome.',8),
  ('Phase 0 - Mastering Claude','Capstone',
   'Ship one Claude-powered feature end-to-end + write it up',
   '','',
   'Build a DARA feature using an agent loop + MCP tools + a skill + prompt caching, then publish a writeup.',9),
  ('Phase 1 - Master your existing stack','Week 2',
   'Anthropic Courses repo (real_world_prompting + prompt_evaluations) + Academy',
   'https://github.com/anthropics/courses',
   '~6 hrs','Add an eval harness to one Pipeline Guardian decision.',20),
  ('Phase 1.5 - AI Security','Week 2.5a',
   'Lakera AI Gandalf - gamified prompt injection',
   'https://gandalf.lakera.ai',
   '~2 hrs','Beat at least Level 5. Note which jailbreak tactics worked and which failed.',25),
  ('Phase 1.5 - AI Security','Week 2.5b',
   'OWASP LLM Top 10',
   'https://genai.owasp.org',
   '~2 hrs','Map each of the 10 risks to one of your existing systems. Note where you''re covered and where you''re not.',26),
  ('Phase 1.5 - AI Security','Week 2.5c',
   'DeepLearning.AI - Red Teaming LLM Applications',
   'https://learn.deeplearning.ai/courses/red-teaming-llm-applications/',
   '~1 hr','Apply one red-team technique to DARA prompt construction. Document the result.',27),
  ('Phase 1.5 - AI Security','Week 2.5d',
   'OWASP Web Top 10 refresher',
   'https://owasp.org/Top10/',
   '~2 hrs','Review SQLi + auth bypass sections. Strengthen Key Decisions in DARA case study with explicit security framing.',28),
  ('Phase 1.5 - AI Security','Week 2.5e',
   'Anthropic safety + responsible scaling docs',
   'https://www.anthropic.com/responsible-scaling-policy',
   '~1 hr','Read end-to-end. Note any controls applicable to Pipeline Guardian.',29),
  ('Phase 2 - LLM systems engineering','Week 3',
   'DeepLearning.AI - Building and Evaluating Advanced RAG',
   'https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag',
   '~2 hrs','Sketch a RAG layer over analytics views for DARA.',30),
  ('Phase 2 - LLM systems engineering','Week 4',
   'DeepLearning.AI - Evaluating AI Agents',
   'https://learn.deeplearning.ai/courses/evaluating-ai-agents/information',
   '~2 hrs','Add observability traces to Pipeline Guardian.',40),
  ('Phase 2 - LLM systems engineering','Week 5',
   'DeepLearning.AI - Functions, Tools and Agents with LangChain',
   'https://www.deeplearning.ai/courses/functions-tools-agents-langchain',
   '~3 hrs','Re-read Pipeline Guardian tools through the LCEL lens.',50),
  ('Phase 3 - Modern data stack','Week 6',
   'dbt Learn - dbt Fundamentals',
   'https://learn.getdbt.com/courses/dbt-fundamentals',
   '~5 hrs','Spin up dbt-postgres against Supabase.',60),
  ('Phase 3 - Modern data stack','Week 7',
   'Apply dbt to Report Automation (no new course)',
   'https://learn.getdbt.com/catalog',
   '~5 hrs','Convert one Report Automation query into a dbt model with tests + sources.',70),
  ('Phase 3 - Modern data stack','Week 8',
   'Astronomer Academy - Airflow 101 Learning Path',
   'https://academy.astronomer.io/path/airflow-101',
   '~6 hrs','Redraw pipeline.yml as an Airflow DAG.',80),
  ('Phase 4 - Cloud + GenAI fluency','Week 9',
   'Google Cloud Skills Boost - Generative AI Leader Learning Path',
   'https://cloud.google.com/learn/certification/generative-ai-leader',
   '~6 hrs','List three GCP services to swap for current Supabase/GHA components.',90),
  ('Phase 4 - Cloud + GenAI fluency','Week 10',
   'Architecture rewrite exercise (no new course)',
   'https://cloud.google.com/architecture',
   '~3 hrs','Whiteboard DARA-on-GCP architecture diagram.',100),
  ('Phase 5 - Optional depth','Week 11+',
   'Hugging Face - AI Agents Course',
   'https://huggingface.co/learn/agents-course/en/unit0/introduction',
   'multi-week','Pick one of the three depth tracks.',110),
  ('Phase 5 - Optional depth','Week 11+',
   'Made With ML - MLOps Course',
   'https://madewithml.com/courses/mlops/',
   'multi-month','Optional production-ML rigor.',120),
  ('Phase 5 - Optional depth','Week 11+',
   'Hugging Face - LLM Course',
   'https://huggingface.co/learn/llm-course/en/chapter1/1',
   'multi-week','Optional transformer internals.',130),
  ('Certification','GCP PDE',
   'Google Cloud Professional Data Engineer',
   'https://cloud.google.com/learn/certification/data-engineer',
   '~8-10 wks','Cert exam - primary L&D ask.',500),
  ('Certification','dbt Analytics Engineer',
   'dbt Analytics Engineering Certification',
   'https://www.getdbt.com/certifications/analytics-engineer-certification-exam',
   '~3-4 wks','Cert exam - fastest first win.',501),
  ('Capstone','Capstone',
   'Public writeup: Pipeline Guardian or DARA',
   '','',
   'After Week 10, publish a writeup with architecture diagram, eval harness, RAG/agent vocab, GCP comparison.',999)
) as v(phase, week_label, course_title, url, time_estimate, apply_action, sort_order)
where u.email = 'jamilmendez1016@gmail.com';

-- 3. Verify -----------------------------------------------------------------
select sort_order, phase, week_label, course_title, status
from public.learning_weeks
where owner_id in (select id from auth.users where email = 'jamilmendez1016@gmail.com')
order by sort_order;
