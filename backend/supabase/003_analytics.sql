-- Analytics — run this once in the Supabase SQL Editor, after
-- 002_admin_dashboard.sql. Safe to run again.
--
-- What it adds:
--   1. public.page_views  — one row per page a visitor opens on the website.
--   2. public.site_checks — one row per website run through the Network Test.
--   Both are written only by the backend Worker (service_role key) and read
--   only by signed-in admins, through the Insights tab of the /admin dashboard.
--
-- Privacy: no names, no IP addresses, no cookies. A page view is just the
-- page, the site the visitor came from, their country and device type.

-- 1. Page views ----------------------------------------------------------------
create table if not exists public.page_views (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  path       text not null,
  referrer   text,          -- the referring site's domain only, e.g. google.com
  country    text,          -- two-letter country code from Cloudflare
  device     text           -- mobile | tablet | desktop
);
create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
alter table public.page_views enable row level security;

-- 2. Network Test runs -------------------------------------------------------------
create table if not exists public.site_checks (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  url        text not null,
  host       text not null,
  score      integer,       -- speed score, 0–100
  weaknesses integer,       -- how many weaknesses the report listed
  pages      integer,       -- how many pages the site has
  country    text,
  cached     boolean not null default false  -- true when a saved result was re-shown
);
create index if not exists site_checks_created_at_idx on public.site_checks (created_at desc);
alter table public.site_checks enable row level security;

-- 3. Admins can read both; nobody else can see anything --------------------------
drop policy if exists "Admins can read page views" on public.page_views;
create policy "Admins can read page views" on public.page_views
  for select to authenticated using (public.is_admin());

drop policy if exists "Admins can read site checks" on public.site_checks;
create policy "Admins can read site checks" on public.site_checks
  for select to authenticated using (public.is_admin());

grant select on public.page_views, public.site_checks to authenticated;
