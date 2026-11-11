// Data access for the /admin dashboard.
//
// Talks to Supabase directly with the public anon key. That is safe because
// every read and write is checked by the database itself (Row Level Security
// in backend/supabase/002_admin_dashboard.sql): only signed-in users listed in
// public.admins can see leads, and they can change only status and notes.
//
// Loaded only by the admin page, so the Supabase library never reaches
// visitors of the public site.

import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isConfigured = Boolean(url && anonKey)
export const supabase = isConfigured ? createClient(url, anonKey) : null

export const STATUSES = [
  { id: 'new',     label: 'New' },
  { id: 'replied', label: 'Replied' },
  { id: 'won',     label: 'Won' },
  { id: 'closed',  label: 'Closed' },
]

export const FORM_TYPES = {
  contact:     'Contact form',
  get_started: 'Project brief',
}

export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message === 'Invalid login credentials' ? 'Wrong email or password.' : error.message)
}

export async function signOut() {
  await supabase.auth.signOut()
}

// The 1,000 most recent leads — plenty for an agency inbox; older ones stay
// in the database and in CSV exports taken over time.
export async function fetchLeads() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1000)
  if (error) throw new Error(error.message)
  return data
}

export async function updateLead(id, changes) {
  const { data, error } = await supabase
    .from('messages')
    .update(changes)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

// Signed in but not on the allowlist → RLS returns zero rows rather than an
// error, so check membership explicitly to show a clear message.
export async function isAdmin() {
  const { data, error } = await supabase.rpc('is_admin')
  if (error) throw new Error(error.message)
  return Boolean(data)
}

// Analytics for the Insights tab (tables from backend/supabase/003_analytics.sql).
// Raw rows for the chosen period; the dashboard adds them up itself.
export async function fetchInsights(days) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
  const [views, checks] = await Promise.all([
    supabase.from('page_views').select('created_at, path, referrer, country, device')
      .gte('created_at', since).order('created_at', { ascending: false }).limit(20000),
    supabase.from('site_checks').select('created_at, url, host, score, weaknesses, pages, country, cached')
      .gte('created_at', since).order('created_at', { ascending: false }).limit(2000),
  ])
  for (const r of [views, checks]) {
    if (r.error) {
      // The tables don't exist until 003_analytics.sql has been run.
      throw new Error(/does not exist|schema cache/i.test(r.error.message)
        ? 'Analytics isn’t set up yet: run backend/supabase/003_analytics.sql in the Supabase SQL Editor.'
        : r.error.message)
    }
  }
  return { views: views.data, checks: checks.data }
}

export function toCsv(rows) {
  const cols = ['created_at', 'status', 'form_type', 'name', 'email', 'phone', 'company', 'service', 'budget', 'timeline', 'message', 'notes']
  const esc = (v) => {
    const s = v == null ? '' : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
}
