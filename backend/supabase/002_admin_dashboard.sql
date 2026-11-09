-- Admin dashboard — run this once in the Supabase SQL Editor, after schema.sql.
-- Safe to run again: every statement checks before it changes anything.
--
-- What it adds:
--   1. Lead tracking on public.messages: status, internal notes, updated_at.
--   2. public.admins — the allowlist of team accounts that may use /admin.
--   3. Row Level Security policies: signed-in admins can read and update
--      leads; nobody else (including signed-in non-admins) can see anything.
--      The Worker keeps inserting with the service_role key, which bypasses
--      RLS, so public form submissions are unaffected.
--
-- To give someone access: Supabase → Authentication → Users → Add user
-- (email + password), copy their user ID, then run:
--   insert into public.admins (user_id, email) values ('<user-id>', '<their email>');

-- 1. Lead tracking ----------------------------------------------------------
alter table public.messages
  add column if not exists status     text not null default 'new',
  add column if not exists notes      text,
  add column if not exists updated_at timestamptz not null default now();

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'messages_status_check') then
    alter table public.messages
      add constraint messages_status_check check (status in ('new', 'replied', 'won', 'closed'));
  end if;
end $$;

create index if not exists messages_status_idx on public.messages (status);

-- Keep updated_at current on every change.
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists messages_touch_updated_at on public.messages;
create trigger messages_touch_updated_at
  before update on public.messages
  for each row execute function public.touch_updated_at();

-- 2. Admin allowlist ----------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

-- True when the signed-in user is on the allowlist. SECURITY DEFINER so the
-- check itself can read admins without opening that table to everyone.
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid())
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 3. Policies ------------------------------------------------------------------
alter table public.messages enable row level security;

drop policy if exists "Admins can read leads" on public.messages;
create policy "Admins can read leads" on public.messages
  for select to authenticated using (public.is_admin());

drop policy if exists "Admins can update leads" on public.messages;
create policy "Admins can update leads" on public.messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Admins can see who else has access (shown on the dashboard).
drop policy if exists "Admins can read the admin list" on public.admins;
create policy "Admins can read the admin list" on public.admins
  for select to authenticated using (public.is_admin());

-- Only the status and notes columns may be changed from the dashboard; the
-- submission itself (name, email, message, …) stays exactly as sent.
revoke update on public.messages from authenticated;
grant select on public.messages to authenticated;
grant update (status, notes) on public.messages to authenticated;
grant select on public.admins to authenticated;
