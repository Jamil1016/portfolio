-- 007_public_learning_view.sql
-- Safe, public-readable projection of the learning roadmap for the home page.
-- Exposes ONLY non-sensitive fields (phase / labels / status / timestamps).
-- It deliberately does NOT expose notes or artifact_url, which stay private
-- behind the owner RLS policy on learning_weeks.
--
-- NOTE: single-owner site. This view returns all rows regardless of owner_id;
-- if this app ever becomes multi-tenant, scope it to a specific owner before
-- granting anon read.

create or replace view public.v_learning_public as
select
  phase,
  week_label,
  course_title,
  url,
  status,
  sort_order,
  started_at,
  completed_at
from public.learning_weeks
order by sort_order;

grant select on public.v_learning_public to anon;
