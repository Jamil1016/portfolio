-- 004_security_week.sql
-- USER ACTION REQUIRED: Replace <YOUR_AUTH_UID> below with your Supabase auth user UUID
-- (the same UUID used in 002 + 003). Run AFTER 001+002+003 have been applied.
--
-- This migration inserts a new "Phase 1.5 — AI Security" between Phase 1 and Phase 2,
-- containing 5 entries covering prompt-injection, OWASP LLM Top 10, red-teaming, OWASP
-- web fundamentals, and Anthropic safety docs.
--
-- To position the new phase between existing phases without renumbering, we use
-- sort_order values 25-29 — but to keep these AFTER Phase 1 (sort_order 1-2) and BEFORE
-- Phase 2 (sort_order 3-5), we first multiply existing sort_orders by 10 so Phase 1
-- becomes 10-20, Phase 2 becomes 30-50, etc. The Capstone row (999) is preserved.

-- Step 1: scale existing non-certification, non-capstone rows by 10
update public.learning_weeks
set sort_order = sort_order * 10
where owner_id = '<YOUR_AUTH_UID>'
  and sort_order < 500;

-- Step 2: insert the AI Security phase (sort_order 25-29 fits cleanly between
-- the scaled Phase 1 (10-20) and Phase 2 (30-50))
insert into public.learning_weeks
  (owner_id, phase, week_label, course_title, url, time_estimate, apply_action, sort_order)
values
  ('<YOUR_AUTH_UID>', 'Phase 1.5 — AI Security', 'Week 2.5a',
   'Lakera AI Gandalf — gamified prompt injection',
   'https://gandalf.lakera.ai',
   '~2 hrs',
   'Beat at least Level 5. Note which jailbreak tactics worked and which failed.',
   25),
  ('<YOUR_AUTH_UID>', 'Phase 1.5 — AI Security', 'Week 2.5b',
   'OWASP LLM Top 10',
   'https://genai.owasp.org',
   '~2 hrs',
   'Map each of the 10 risks to one of your existing systems. Note where you''re covered and where you''re not.',
   26),
  ('<YOUR_AUTH_UID>', 'Phase 1.5 — AI Security', 'Week 2.5c',
   'DeepLearning.AI — Red Teaming LLM Applications',
   'https://learn.deeplearning.ai/courses/red-teaming-llm-applications/',
   '~1 hr',
   'Apply one red-team technique to DARA prompt construction. Document the result.',
   27),
  ('<YOUR_AUTH_UID>', 'Phase 1.5 — AI Security', 'Week 2.5d',
   'OWASP Web Top 10 refresher',
   'https://owasp.org/Top10/',
   '~2 hrs',
   'Review SQLi + auth bypass sections. Strengthen Key Decisions in DARA case study with explicit security framing.',
   28),
  ('<YOUR_AUTH_UID>', 'Phase 1.5 — AI Security', 'Week 2.5e',
   'Anthropic safety + responsible scaling docs',
   'https://www.anthropic.com/responsible-scaling-policy',
   '~1 hr',
   'Read end-to-end. Note any controls applicable to Pipeline Guardian.',
   29);
