-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)

create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  form_type  text not null check (form_type in ('contact', 'get_started')),
  name       text not null,
  email      text not null,
  phone      text,
  company    text,
  service    text,
  budget     text,
  timeline   text,
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

-- Row Level Security is on by default for new tables in the Supabase
-- dashboard. The Worker connects with the service_role key, which bypasses
-- RLS entirely — so no policies are required for the API to write rows.
-- This just makes sure the table can never be read or written directly by
-- the public anon key (i.e. from someone's browser).
alter table public.messages enable row level security;
