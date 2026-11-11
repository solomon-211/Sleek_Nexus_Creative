import { useEffect, useMemo, useState } from 'react'
import { fetchInsights } from '../../lib/admin-api'

// Friendly names for the site's pages, for the "Most visited pages" list.
const PAGE_NAMES = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/work': 'Our Work',
  '/innovation-hub': 'Innovation Hub',
  '/contact': 'Contact',
  '/get-started': 'Get Started',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
  '/services/web-dev': 'Web Development',
  '/services/mobile-apps': 'Mobile Apps',
  '/services/ui-ux': 'UI/UX Design',
  '/services/branding': 'Branding & Design',
  '/services/consulting': 'IT Consulting',
}
const DEVICE_NAMES = { mobile: 'Phone', desktop: 'Computer', tablet: 'Tablet' }
const RANGES = [7, 30, 90]

let regionNames
function countryName(code) {
  if (!code) return 'Unknown'
  try {
    regionNames ??= new Intl.DisplayNames(['en'], { type: 'region' })
    return regionNames.of(code) || code
  } catch {
    return code
  }
}

function countBy(rows, key) {
  const m = new Map()
  for (const r of rows) {
    const k = typeof key === 'function' ? key(r) : r[key]
    m.set(k, (m.get(k) || 0) + 1)
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1])
}

const dayKey = (d) => d.toISOString().slice(0, 10)
function timeAgo(iso, now) {
  const mins = Math.round((now - Date.parse(iso)) / 60000)
  if (mins < 60) return `${Math.max(mins, 1)} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} h ago`
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}
const scoreTone = (n) => (n == null ? 'text-muted' : n >= 90 ? 'text-green-700' : n >= 50 ? 'text-[#A8420B]' : 'text-red-700')

function Tile({ value, label, note }) {
  return (
    <div className="card px-5 py-4">
      <span className="block font-heading font-black text-dark text-2xl">{value}</span>
      <span className="block text-muted text-xs font-semibold uppercase tracking-widest mt-0.5">{label}</span>
      {note && <span className="block text-muted text-xs mt-1">{note}</span>}
    </div>
  )
}

// A ranked list with a bar per row. Numbers are text, so nothing relies on
// reading the bar length alone.
function RankList({ title, rows, total, name = (k) => k, empty }) {
  return (
    <div className="card p-5">
      <h3 className="font-heading font-bold text-dark mb-4">{title}</h3>
      {!rows.length ? (
        <p className="text-muted text-sm">{empty}</p>
      ) : (
        <ul className="space-y-3">
          {rows.map(([key, count]) => {
            const pct = total ? Math.round((count / total) * 100) : 0
            return (
              <li key={String(key)}>
                <div className="flex items-baseline justify-between gap-3 text-sm mb-1">
                  <span className="text-dark font-medium truncate">{name(key)}</span>
                  <span className="text-muted flex-shrink-0 tabular-nums">{count.toLocaleString()} · {pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden" aria-hidden="true">
                  <div className="h-full rounded-full bg-dark" style={{ width: `${Math.max(pct, 2)}%` }} />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// Visits per day: one series, so one colour and no legend; hover a bar for the
// exact figure.
function DailyChart({ days }) {
  const max = Math.max(1, ...days.map((d) => d.count))
  const [hover, setHover] = useState(null)
  const shown = hover ?? days[days.length - 1]
  return (
    <div className="card p-5">
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h3 className="font-heading font-bold text-dark">Visits per day</h3>
        {shown && (
          <p className="text-sm text-muted tabular-nums" aria-live="polite">
            <span className="text-dark font-semibold">{shown.count.toLocaleString()}</span> on {shown.label}
          </p>
        )}
      </div>
      <div className="flex items-end gap-[2px] h-36" onMouseLeave={() => setHover(null)}>
        {days.map((d) => (
          <button
            key={d.key}
            type="button"
            onMouseEnter={() => setHover(d)}
            onFocus={() => setHover(d)}
            aria-label={`${d.label}: ${d.count} visits`}
            className="group flex-1 h-full flex items-end focus:outline-none"
          >
            <span
              className={`w-full rounded-t-[4px] transition-colors ${hover?.key === d.key ? 'bg-primary' : 'bg-dark group-focus-visible:bg-primary'}`}
              style={{ height: d.count ? `${Math.max((d.count / max) * 100, 3)}%` : '2px', opacity: d.count ? 1 : 0.25 }}
            />
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[0.7rem] text-muted mt-2">
        <span>{days[0]?.label}</span>
        <span>{days[days.length - 1]?.label}</span>
      </div>
    </div>
  )
}

export default function Insights() {
  const [range, setRange] = useState(30)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let alive = true
    fetchInsights(range)
      .then((d) => { if (alive) { setData({ ...d, loadedAt: Date.now() }); setError('') } })
      .catch((err) => { if (alive) setError(err.message) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [range, reload])

  const stats = useMemo(() => {
    if (!data) return null
    const { views, checks } = data
    const now = data.loadedAt
    const today = dayKey(new Date(now))
    const days = []
    for (let i = range - 1; i >= 0; i--) {
      const d = new Date(now - i * 86400000)
      days.push({ key: dayKey(d), label: d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }), count: 0 })
    }
    const byDay = new Map(days.map((d) => [d.key, d]))
    for (const v of views) {
      const d = byDay.get(v.created_at.slice(0, 10))
      if (d) d.count++
    }
    const tested = checks.filter((c) => !c.cached)
    const scores = checks.map((c) => c.score).filter((n) => n != null)
    return {
      days,
      total: views.length,
      today: views.filter((v) => v.created_at.slice(0, 10) === today).length,
      pages: countBy(views, 'path').slice(0, 10),
      sources: countBy(views, (v) => v.referrer || 'Direct or unknown').slice(0, 6),
      devices: countBy(views, (v) => v.device || 'unknown'),
      countries: countBy(views, 'country').slice(0, 6),
      checks,
      uniqueSites: new Set(checks.map((c) => c.host)).size,
      testsRun: checks.length,
      freshTests: tested.length,
      avgScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    }
  }, [data, range])

  return (
    <div>
      {/* Period */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex rounded-xl bg-white border border-gray-200 p-1" role="group" aria-label="Period">
          {RANGES.map((r) => (
            <button key={r} onClick={() => { setLoading(true); setRange(r) }} aria-pressed={range === r}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${range === r ? 'bg-dark text-white' : 'text-muted hover:text-dark'}`}>
              {r} days
            </button>
          ))}
        </div>
        <button onClick={() => { setLoading(true); setReload((n) => n + 1) }} className="btn-secondary text-sm py-2 px-4">
          <i className="fas fa-rotate" /> Refresh
        </button>
      </div>

      {error && <p role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</p>}

      {loading && !stats ? (
        <p className="card p-10 text-center text-muted text-sm"><i className="fas fa-spinner fa-spin mr-2" />Loading insights…</p>
      ) : stats && (
        <div className={`space-y-6 transition-opacity ${loading ? 'opacity-60' : ''}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Tile value={stats.total.toLocaleString()} label="Page views" note={`Last ${range} days`} />
            <Tile value={stats.today.toLocaleString()} label="Today" />
            <Tile value={stats.testsRun.toLocaleString()} label="Network Tests" note={`${stats.uniqueSites} different websites`} />
            <Tile value={stats.avgScore ?? '–'} label="Avg. speed score" note="Of websites tested" />
          </div>

          <DailyChart days={stats.days} />

          <div className="grid lg:grid-cols-2 gap-6">
            <RankList title="Most visited pages" rows={stats.pages} total={stats.total}
              name={(p) => PAGE_NAMES[p] ? `${PAGE_NAMES[p]}  (${p})` : p} empty="No visits recorded in this period yet." />
            <RankList title="Where visitors come from" rows={stats.sources} total={stats.total} empty="No visits recorded in this period yet." />
            <RankList title="Devices" rows={stats.devices} total={stats.total} name={(d) => DEVICE_NAMES[d] || d} empty="No visits recorded in this period yet." />
            <RankList title="Countries" rows={stats.countries} total={stats.total} name={countryName} empty="No visits recorded in this period yet." />
          </div>

          {/* Network Test runs: businesses checking their own websites */}
          <div className="card overflow-hidden">
            <div className="px-5 pt-5 pb-3">
              <h3 className="font-heading font-bold text-dark">Websites tested</h3>
              <p className="text-muted text-xs mt-0.5">Every Network Test run. Sites with low scores are good leads to follow up.</p>
            </div>
            {!stats.checks.length ? (
              <p className="px-5 pb-5 text-muted text-sm">No websites tested in this period yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-muted text-xs uppercase tracking-wide">
                    <tr>
                      <th className="px-5 py-2.5 font-semibold">Website</th>
                      <th className="px-3 py-2.5 font-semibold text-right">Speed</th>
                      <th className="px-3 py-2.5 font-semibold text-right">Weaknesses</th>
                      <th className="px-3 py-2.5 font-semibold text-right">Pages</th>
                      <th className="px-3 py-2.5 font-semibold">Country</th>
                      <th className="px-5 py-2.5 font-semibold text-right">When</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.checks.slice(0, 50).map((c, i) => (
                      <tr key={`${c.created_at}-${i}`} className="hover:bg-gray-50">
                        <td className="px-5 py-2.5">
                          <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium text-dark hover:text-primary">{c.host}</a>
                          {c.cached && <span className="ml-2 text-[0.65rem] text-muted uppercase tracking-wide">repeat</span>}
                        </td>
                        <td className={`px-3 py-2.5 text-right font-semibold tabular-nums ${scoreTone(c.score)}`}>{c.score ?? '–'}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-dark">{c.weaknesses ?? '–'}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-dark">{c.pages ?? '–'}</td>
                        <td className="px-3 py-2.5 text-dark">{countryName(c.country)}</td>
                        <td className="px-5 py-2.5 text-right text-muted whitespace-nowrap">{timeAgo(c.created_at, data.loadedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="text-muted text-xs">
            Anonymous counts: no cookies, names or IP addresses. Visits from bots and from the admin dashboard aren’t counted.
          </p>
        </div>
      )}
    </div>
  )
}
