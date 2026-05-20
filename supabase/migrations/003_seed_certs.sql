-- 003_seed_certs.sql
-- USER ACTION REQUIRED: Replace <YOUR_AUTH_UID> with the UUID of your Supabase auth user before running.
-- Run AFTER 002_seed_data.sql has been applied.
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
