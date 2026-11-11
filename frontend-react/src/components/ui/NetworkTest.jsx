import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { whatsappUrl } from '../../lib/site'

/**
 * NetworkTest — the free website speed check in the homepage hero.
 *
 * A visitor types any website address; the backend runs Google's mobile
 * speed test on it (see backend/src/routes/site-check.js) and we show the
 * result in plain language, with a direct route to SNC to get it fixed.
 */

const PROGRESS = [
  'Opening the site on a mobile network…',
  'Counting its pages…',
  'Weighing images, code and fonts…',
  'Checking how Google sees it…',
  'Listing strengths and weaknesses…',
  'Almost there…',
]

// The four areas Google scores, in the order we show them.
const AREAS = [
  ['speed', 'Speed'],
  ['seo', 'Google'],
  ['accessibility', 'Access'],
  ['bestPractices', 'Security'],
]
const areaTone = (n) => (n == null ? 'text-muted' : n >= 90 ? 'text-green-600' : n >= 50 ? 'text-primary' : 'text-red-600')

function verdict(score) {
  if (score >= 90) return { label: 'Fast', tone: 'text-green-600', ring: '#16A34A', note: 'Your site is in great shape for mobile visitors.' }
  if (score >= 50) return { label: 'Needs work', tone: 'text-primary', ring: '#FE7F2D', note: 'Slower than it should be. Some visitors will give up before it opens.' }
  return { label: 'Too slow', tone: 'text-red-600', ring: '#DC2626', note: 'Over half of mobile visitors leave a page that takes more than 3 seconds to load.' }
}

function ScoreRing({ score, color }) {
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div className="relative w-24 h-24 flex-shrink-0" role="img" aria-label={`Speed score ${score} out of 100`}>
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#EAECF0" strokeWidth="7" />
        <motion.circle
          cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - score / 100) }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading font-black text-dark text-2xl leading-none">{score}</span>
        <span className="text-muted text-[0.65rem] font-semibold">/ 100</span>
      </span>
    </div>
  )
}

const hostOf = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url }
}

export default function NetworkTest() {
  const [address, setAddress] = useState('')
  const [state, setState] = useState('idle') // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [step, setStep] = useState(0)
  const controller = useRef(null)

  // Rotate the progress messages while the test runs.
  useEffect(() => {
    if (state !== 'loading') return
    const t = setInterval(() => setStep((s) => Math.min(s + 1, PROGRESS.length - 1)), 5500)
    return () => clearInterval(t)
  }, [state])

  useEffect(() => () => controller.current?.abort(), [])

  async function run(e) {
    e.preventDefault()
    const apiUrl = import.meta.env.VITE_API_URL
    if (!address.trim()) return
    controller.current?.abort()
    controller.current = new AbortController()
    setState('loading')
    setStep(0)
    setError('')
    try {
      if (!apiUrl) throw new Error('The test is not available right now.')
      const res = await fetch(`${apiUrl}/site-check?url=${encodeURIComponent(address.trim())}`, { signal: controller.current.signal })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setResult(data)
      setState('done')
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message)
      setState('error')
    }
  }

  function reset() {
    setState('idle')
    setResult(null)
    setError('')
  }

  const v = result ? verdict(result.score) : null
  const host = result ? hostOf(result.url) : ''
  const askUs = whatsappUrl(
    result
      ? `Hi Sleek Nexus Creative! I tested ${host} with your Network Test: speed ${result.score}/100${result.weaknesses?.length ? `, with ${result.weaknesses.length} weaknesses to fix` : ''}. I'd like your help improving it.`
      : `Hi Sleek Nexus Creative! Could you check how fast my website is${address ? `: ${address.trim()}` : ''}?`,
  )

  return (
    <div className="relative bg-white rounded-[1.375rem] p-6 sm:p-7 shadow-[0_20px_60px_rgba(15,23,32,0.35)]">
      <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Free Network Test</p>

      <AnimatePresence mode="wait" initial={false}>
        {(state === 'idle' || state === 'error') && (
          <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            <h2 className="font-heading font-black text-dark text-xl sm:text-2xl leading-tight mb-2">
              How fast is your website on a mobile network?
            </h2>
            <p className="text-muted text-sm mb-5">
              Get a free report on any website in about 30 seconds: its speed, how many pages it has, what it does well, and what is costing it customers.
            </p>
            <form onSubmit={run} className="flex flex-col sm:flex-row gap-2.5">
              <label htmlFor="network-test-url" className="sr-only">Your website address</label>
              <input
                id="network-test-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="yourbusiness.com"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 min-w-0 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none px-4 py-3 text-dark text-sm"
                required
              />
              <button type="submit" className="btn-primary justify-center whitespace-nowrap px-5 py-3">
                Test my site
              </button>
            </form>
            {state === 'error' && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {error}{' '}
                <a href={askUs} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Or ask us to check it</a>.
              </p>
            )}
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-dark-soft">
              {[
                ['fa-gift', 'Free, no sign-up'],
                ['fa-shield-halved', 'Confidential'],
                ['fa-mobile-screen', 'Powered by Google’s mobile test'],
              ].map(([icon, label]) => (
                <li key={label} className="flex items-center gap-1.5">
                  <i className={`fas ${icon} text-primary`} />{label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {state === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6" aria-live="polite">
            <p className="font-heading font-bold text-dark text-lg mb-1 truncate">Testing {address.trim()}</p>
            <AnimatePresence mode="wait">
              <motion.p key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-muted text-sm mb-5">
                {PROGRESS[step]}
              </motion.p>
            </AnimatePresence>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '4%' }}
                animate={{ width: '92%' }}
                transition={{ duration: 32, ease: 'easeOut' }}
              />
            </div>
            <button type="button" onClick={() => { controller.current?.abort(); reset() }} className="mt-4 text-xs text-muted hover:text-dark">
              Cancel
            </button>
          </motion.div>
        )}

        {state === 'done' && result && (
          <motion.div key="result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center gap-4 mb-4">
              <ScoreRing score={result.score} color={v.ring} />
              <div className="min-w-0">
                <p className="text-muted text-xs truncate">{host}</p>
                <p className={`font-heading font-black text-xl ${v.tone}`}>{v.label}</p>
                <p className="text-dark-soft text-sm leading-snug">{v.note}</p>
              </div>
            </div>

            {/* Key facts */}
            <dl className="grid grid-cols-4 gap-2 mb-3 text-center">
              {[
                ['Pages', result.pages ? `${result.pages.count}${result.pages.atLeast ? '+' : ''}` : null, ''],
                ['Appears', result.visibleSeconds, 's'],
                ['Size', result.pageMegabytes, ' MB'],
                ['Slow 3G', result.slow3gSeconds, 's'],
              ].map(([label, value, unit]) => (
                <div key={label} className="rounded-xl bg-gray-50 px-1.5 py-2">
                  <dt className="text-[0.6rem] text-muted font-semibold uppercase tracking-wide">{label}</dt>
                  <dd className="font-heading font-black text-dark text-base sm:text-lg leading-tight">{value ?? '–'}{value != null && unit}</dd>
                </div>
              ))}
            </dl>

            {/* Scores in the four areas Google checks */}
            {result.scores && (
              <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                {AREAS.map(([key, label]) => (
                  <div key={key} className="rounded-xl ring-1 ring-inset ring-gray-200 px-1.5 py-1.5">
                    <p className={`font-heading font-black text-base leading-tight ${areaTone(result.scores[key])}`}>{result.scores[key] ?? '–'}</p>
                    <p className="text-[0.6rem] text-muted font-semibold uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            )}

            {result.strengths?.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-bold text-dark uppercase tracking-wide mb-1.5">Strengths</p>
                <ul className="space-y-1">
                  {result.strengths.slice(0, 4).map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-dark-soft">
                      <i className="fas fa-circle-check text-green-600 mt-0.5 flex-shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.weaknesses?.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-bold text-dark uppercase tracking-wide mb-1.5">
                  Weaknesses found <span className="text-primary">({result.weaknesses.length})</span>
                </p>
                <ul className="space-y-1.5">
                  {result.weaknesses.map((issue) => (
                    <li key={issue} className="flex items-start gap-2 text-sm text-dark font-medium leading-snug">
                      <i className="fas fa-circle-exclamation text-red-600 mt-0.5 flex-shrink-0" />{issue}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex items-center gap-2 rounded-xl bg-primary/10 px-3.5 py-2.5 text-sm font-semibold text-dark">
                  <i className="fas fa-screwdriver-wrench text-primary flex-shrink-0" />
                  SNC can fix every one of these for you.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5">
              {!result.weaknesses?.length ? (
                <Link to="/services" className="btn-primary justify-center flex-1">See what else we build</Link>
              ) : (
                <a href={askUs} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center flex-1">
                  <i className="fab fa-whatsapp" /> Get this fixed
                </a>
              )}
              <button type="button" onClick={reset} className="btn-secondary justify-center">Test another site</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
