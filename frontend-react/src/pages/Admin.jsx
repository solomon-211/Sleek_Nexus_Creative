import { useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  supabase, isConfigured, STATUSES, FORM_TYPES,
  signIn, signOut, fetchLeads, updateLead, isAdmin, toCsv,
} from '../lib/admin-api'

// ─── Helpers ────────────────────────────────────────────────────────────────

const STATUS_STYLE = {
  new:     'bg-primary text-white',
  replied: 'bg-dark text-white',
  won:     'bg-green-600 text-white',
  closed:  'bg-gray-200 text-dark',
}

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// wa.me needs digits only, country code included.
function waNumber(phone) {
  const digits = (phone || '').replace(/\D/g, '')
  return digits.length >= 8 ? digits : null
}

function StatusPill({ status }) {
  const label = STATUSES.find((s) => s.id === status)?.label || status
  return <span className={`inline-flex items-center text-[0.7rem] font-bold uppercase tracking-widest rounded-full px-2.5 py-1 ${STATUS_STYLE[status] || STATUS_STYLE.closed}`}>{label}</span>
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Leads | Sleek Nexus Creative</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {children}
    </div>
  )
}

// ─── Screens ────────────────────────────────────────────────────────────────

function NotConfigured() {
  return (
    <Shell>
      <div className="max-w-lg mx-auto px-6 py-24">
        <div className="card p-8">
          <h1 className="font-heading font-black uppercase text-dark text-2xl mb-3">Admin not set up yet</h1>
          <p className="text-muted text-sm leading-relaxed mb-4">
            The dashboard needs two settings: <code className="text-dark">VITE_SUPABASE_URL</code> and{' '}
            <code className="text-dark">VITE_SUPABASE_ANON_KEY</code>. Add them to <code className="text-dark">frontend-react/.env</code> for local use
            and as GitHub Actions variables for the live site, then rebuild.
          </p>
          <p className="text-muted text-sm">Full steps are in <code className="text-dark">backend/README.md</code> under “Admin dashboard”.</p>
        </div>
      </div>
    </Shell>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try { await signIn(email.trim(), password) } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return (
    <Shell>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center justify-center gap-3 mb-8">
            <img src="/images/snc-logo.png" alt="" className="h-11 w-11" />
            <span className="font-heading font-black uppercase text-dark">Sleek Nexus Creative</span>
          </Link>
          <form onSubmit={submit} className="card p-7 space-y-5">
            <div>
              <h1 className="font-heading font-black uppercase text-dark text-xl">Team sign in</h1>
              <p className="text-muted text-sm mt-1">Leads dashboard</p>
            </div>
            {error && <p role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</p>}
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-dark mb-1.5">Email</label>
              <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-dark mb-1.5">Password</label>
              <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
            <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">
              {busy ? <><i className="fas fa-spinner fa-spin" /> Signing in…</> : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </Shell>
  )
}

function NotAllowed({ email }) {
  return (
    <Shell>
      <div className="max-w-lg mx-auto px-6 py-24">
        <div className="card p-8">
          <h1 className="font-heading font-black uppercase text-dark text-2xl mb-3">No access</h1>
          <p className="text-muted text-sm leading-relaxed mb-6">
            <span className="text-dark font-semibold">{email}</span> is signed in but isn't on the admin list. Ask an existing admin to add your account.
          </p>
          <button onClick={signOut} className="btn-secondary">Sign out</button>
        </div>
      </div>
    </Shell>
  )
}

function LeadDetail({ lead, onSaved, onClose }) {
  const [status, setStatus] = useState(lead.status)
  const [notes, setNotes] = useState(lead.notes || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const dirty = status !== lead.status || notes !== (lead.notes || '')

  const save = async () => {
    setSaving(true); setError('')
    try { onSaved(await updateLead(lead.id, { status, notes: notes.trim() || null })) } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  const wa = waNumber(lead.phone)
  const firstName = lead.name.split(' ')[0]
  const rows = [
    ['Email', lead.email], ['Phone', lead.phone], ['Organization', lead.company],
    ['Service', lead.service], ['Budget', lead.budget], ['Timeline', lead.timeline],
  ].filter(([, v]) => v)

  return (
    <div className="card p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">{FORM_TYPES[lead.form_type] || lead.form_type}</p>
          <h2 className="font-heading font-black text-dark text-2xl leading-tight mt-1">{lead.name}</h2>
        </div>
        <button onClick={onClose} aria-label="Close" className="lg:hidden text-gray-400 hover:text-dark"><i className="fas fa-xmark text-lg" /></button>
      </div>
      <p className="text-muted text-xs mb-5">Received {formatDate(lead.created_at)}</p>

      {/* Quick replies */}
      <div className="flex flex-wrap gap-2 mb-6">
        <a href={`mailto:${lead.email}?subject=${encodeURIComponent('Re: your enquiry to Sleek Nexus Creative')}&body=${encodeURIComponent(`Hi ${firstName},\n\n`)}`} className="btn-primary text-sm py-2 px-4">
          <i className="fas fa-envelope" /> Email
        </a>
        {lead.phone && <a href={`tel:${lead.phone}`} className="btn-secondary text-sm py-2 px-4"><i className="fas fa-phone" /> Call</a>}
        {wa && <a href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hi ${firstName}, this is Sleek Nexus Creative following up on your enquiry.`)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2 px-4"><i className="fab fa-whatsapp" /> WhatsApp</a>}
      </div>

      <dl className="divide-y divide-gray-100 text-sm mb-6">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2.5">
            <dt className="text-muted">{k}</dt>
            <dd className="text-dark font-medium text-right break-all">{v}</dd>
          </div>
        ))}
      </dl>

      <p className="text-xs font-bold uppercase tracking-widest text-muted mb-2">Message</p>
      <p className="text-dark text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4 mb-6">{lead.message}</p>

      <div className="grid sm:grid-cols-[auto_1fr] gap-4 items-start">
        <div>
          <label htmlFor="lead-status" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Status</label>
          <select id="lead-status" value={status} onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
            {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="lead-notes" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Team notes</label>
          <textarea id="lead-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Call booked for Tuesday, quote sent…"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
        </div>
      </div>
      {error && <p role="alert" className="text-red-600 text-sm mt-3">{error}</p>}
      <div className="flex items-center justify-between gap-3 mt-4">
        <p className="text-muted text-xs">Last updated {formatDate(lead.updated_at || lead.created_at)}</p>
        <button onClick={save} disabled={!dirty || saving} className="btn-primary text-sm py-2 px-5 disabled:opacity-40 disabled:hover:translate-y-0">
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}

function Dashboard({ session }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try { setLeads(await fetchLeads()) } catch (err) { setError(err.message) } finally { setLoading(false) }
  }, [])

  // First load: state is only set once the request answers.
  useEffect(() => {
    let alive = true
    fetchLeads()
      .then((data) => { if (alive) setLeads(data) })
      .catch((err) => { if (alive) setError(err.message) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const counts = useMemo(() => {
    const c = { all: leads.length }
    for (const s of STATUSES) c[s.id] = leads.filter((l) => l.status === s.id).length
    return c
  }, [leads])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return leads.filter((l) =>
      (statusFilter === 'all' || l.status === statusFilter) &&
      (typeFilter === 'all' || l.form_type === typeFilter) &&
      (!q || [l.name, l.email, l.company, l.service, l.message, l.notes].some((v) => (v || '').toLowerCase().includes(q))),
    )
  }, [leads, statusFilter, typeFilter, query])

  const selected = leads.find((l) => l.id === selectedId) || null

  const exportCsv = () => {
    const blob = new Blob([toCsv(visible)], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `snc-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <Shell>
      {/* Top bar */}
      <header className="bg-dark text-white">
        <div className="container-page h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/snc-logo.png" alt="" className="h-9 w-9" />
            <span className="font-heading font-black uppercase text-sm hidden sm:inline">Sleek Nexus Creative</span>
            <span className="text-white/40 hidden sm:inline">/</span>
            <span className="text-accent font-semibold text-sm">Leads</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/60 hidden md:inline">{session.user.email}</span>
            <button onClick={signOut} className="text-white/80 hover:text-white font-semibold">Sign out</button>
          </div>
        </div>
      </header>

      <main className="container-page py-8 sm:py-10">
        {/* Status overview — also the status filter */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {[{ id: 'all', label: 'All leads' }, ...STATUSES].map((s) => (
            <button key={s.id} onClick={() => setStatusFilter(s.id)} aria-pressed={statusFilter === s.id}
              className={`card text-left px-5 py-4 ${statusFilter === s.id ? 'ring-2 ring-primary' : ''}`}>
              <span className="block font-heading font-black text-dark text-2xl">{counts[s.id] ?? 0}</span>
              <span className="block text-muted text-xs font-semibold uppercase tracking-widest mt-0.5">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[220px]">
            <i className="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, organization, message…"
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Form type"
            className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
            <option value="all">All forms</option>
            {Object.entries(FORM_TYPES).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
          </select>
          <button onClick={load} className="btn-secondary text-sm py-2.5 px-4"><i className="fas fa-rotate" /> Refresh</button>
          <button onClick={exportCsv} disabled={!visible.length} className="btn-secondary text-sm py-2.5 px-4 disabled:opacity-40"><i className="fas fa-download" /> Export CSV</button>
        </div>

        {error && <p role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</p>}

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* List */}
          <div className={`lg:col-span-2 card overflow-hidden ${selected ? 'hidden lg:block' : ''}`}>
            {loading ? (
              <p className="p-8 text-center text-muted text-sm"><i className="fas fa-spinner fa-spin mr-2" />Loading leads…</p>
            ) : !visible.length ? (
              <p className="p-8 text-center text-muted text-sm">{leads.length ? 'No leads match these filters.' : 'No submissions yet. They’ll appear here as soon as someone uses a form.'}</p>
            ) : (
              <ul className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
                {visible.map((l) => (
                  <li key={l.id}>
                    <button onClick={() => setSelectedId(l.id)}
                      className={`w-full text-left px-5 py-4 transition-colors ${l.id === selectedId ? 'bg-primary/5' : 'hover:bg-gray-50'}`}>
                      <span className="flex items-center justify-between gap-3 mb-1">
                        <span className={`font-semibold text-dark text-sm truncate ${l.status === 'new' ? '' : 'font-medium'}`}>{l.name}</span>
                        <StatusPill status={l.status} />
                      </span>
                      <span className="block text-muted text-xs truncate">{[l.company, l.service].filter(Boolean).join(' · ') || l.email}</span>
                      <span className="block text-gray-400 text-[0.7rem] mt-1">{formatDate(l.created_at)} · {FORM_TYPES[l.form_type] || l.form_type}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Detail */}
          <div className={`lg:col-span-3 ${selected ? '' : 'hidden lg:block'}`}>
            {selected ? (
              <LeadDetail
                key={selected.id}
                lead={selected}
                onClose={() => setSelectedId(null)}
                onSaved={(updated) => setLeads((all) => all.map((l) => (l.id === updated.id ? updated : l)))}
              />
            ) : (
              <div className="card p-10 text-center text-muted text-sm">Select a lead to see the full message and reply.</div>
            )}
          </div>
        </div>
      </main>
    </Shell>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Admin() {
  const [session, setSession] = useState(undefined) // undefined = still checking
  const [allowed, setAllowed] = useState(null)

  useEffect(() => {
    if (!isConfigured) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => { setSession(s); setAllowed(null) })
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return
    isAdmin().then(setAllowed).catch(() => setAllowed(false))
  }, [session])

  if (!isConfigured) return <NotConfigured />
  if (session === undefined || (session && allowed === null)) {
    return <Shell><p className="py-32 text-center text-muted text-sm"><i className="fas fa-spinner fa-spin mr-2" />Loading…</p></Shell>
  }
  if (!session) return <Login />
  if (!allowed) return <NotAllowed email={session.user.email} />
  return <Dashboard session={session} />
}
