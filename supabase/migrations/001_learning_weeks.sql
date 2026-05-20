-- 001_learning_weeks.sql
create table public.learning_weeks (
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

create index learning_weeks_owner_sort_idx
  on public.learning_weeks (owner_id, sort_order);

alter table public.learning_weeks enable row level security;

create policy "owner can read own"
  on public.learning_weeks for select
  using (auth.uid() = owner_id);

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
