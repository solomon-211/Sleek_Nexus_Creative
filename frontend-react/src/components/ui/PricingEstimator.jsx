import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { packages } from '../../lib/packages-data'

// Estimator does NOT invent dollar figures we don't have authority to quote —
// it scores answers against the same three tiers shown in the static package
// grid below and recommends one, then hands off to a real quote via /contact.
const QUESTIONS = [
  {
    key: 'type', label: 'What are you building?', multi: false,
    options: [
      { label: 'Simple Website', value: 'website', points: 1 },
      { label: 'Web Application', value: 'webapp', points: 2 },
      { label: 'Mobile App', value: 'mobile', points: 2 },
      { label: 'E-Learning Platform', value: 'edtech', points: 2.5 },
      { label: 'Enterprise System', value: 'enterprise', points: 3 },
      { label: 'Not Sure Yet', value: 'unsure', points: 1 },
    ],
  },
  {
    key: 'scale', label: 'Roughly how many pages or screens?', multi: false,
    options: [
      { label: 'Up to 5', value: 'small', points: 0.5 },
      { label: '15–25', value: 'medium', points: 1.5 },
      { label: '25+', value: 'large', points: 2.5 },
    ],
  },
  {
    key: 'features', label: 'Any of these features needed?', multi: true,
    options: [
      { label: 'Payments / E-Commerce', value: 'payments', points: 0.6 },
      { label: 'User Accounts & Dashboards', value: 'accounts', points: 0.6 },
      { label: 'Admin Panel', value: 'admin', points: 0.5 },
      { label: 'API Integrations', value: 'api', points: 0.5 },
      { label: 'Offline Support', value: 'offline', points: 0.6 },
      { label: 'Multi-Language', value: 'i18n', points: 0.4 },
    ],
  },
  {
    key: 'timeline', label: "What's your ideal timeline?", multi: false,
    options: [
      { label: 'ASAP — Rush It', value: 'rush', points: 0.3 },
      { label: '1–3 Months', value: 'normal', points: 0 },
      { label: 'Flexible / 3+ Months', value: 'flexible', points: 0 },
    ],
  },
]

function scoreToTierIndex(score) {
  if (score <= 2.5) return 0
  if (score <= 5.5) return 1
  return 2
}

export default function PricingEstimator() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)

  const question = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1

  const canAdvance = question.multi
    ? true // feature picks are optional
    : !!answers[question.key]

  const select = (value) => {
    setAnswers(prev => {
      if (!question.multi) return { ...prev, [question.key]: value }
      const current = prev[question.key] || []
      const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
      return { ...prev, [question.key]: next }
    })
  }

  const isSelected = (value) => {
    const a = answers[question.key]
    return question.multi ? (a || []).includes(value) : a === value
  }

  const next = () => {
    if (isLast) { setDone(true); return }
    setDirection(1)
    setStep(s => s + 1)
  }
  const back = () => {
    if (done) { setDone(false); return }
    setDirection(-1)
    setStep(s => Math.max(0, s - 1))
  }
  const restart = () => {
    setDirection(-1)
    setAnswers({})
    setStep(0)
    setDone(false)
  }

  const score = useMemo(() => {
    let total = 0
    for (const q of QUESTIONS) {
      const a = answers[q.key]
      if (!a) continue
      if (q.multi) {
        for (const v of a) total += q.options.find(o => o.value === v)?.points || 0
      } else {
        total += q.options.find(o => o.value === a)?.points || 0
      }
    }
    return total
  }, [answers])

  const tierIndex = scoreToTierIndex(score)
  const recommended = packages[tierIndex]

  const scrollToPackage = () => {
    document.getElementById(`pkg-${recommended.tier.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Not Sure Where to Start?</p>
          <h2 className="section-title">Find Your Package in 30 Seconds</h2>
          <p className="section-subtitle">Answer a few quick questions and we'll point you to the right starting tier.</p>
        </div>

        <div className="card p-6 sm:p-10 overflow-hidden">
          {!done ? (
            <>
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {QUESTIONS.map((q, i) => (
                  <div key={q.key} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-primary' : 'bg-gray-200'}`} />
                ))}
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-muted mb-2">Step {step + 1} of {QUESTIONS.length}{question.multi ? ' · Select any that apply' : ''}</p>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-dark mb-6">{question.label}</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {question.options.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => select(opt.value)}
                        className={`text-left px-4 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all duration-200 flex items-center justify-between gap-2 ${
                          isSelected(opt.value)
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 text-dark-soft hover:border-primary/40 hover:bg-primary/[0.03]'
                        }`}
                      >
                        {opt.label}
                        {isSelected(opt.value) && <i className="fas fa-check-circle" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="text-sm font-semibold text-muted hover:text-dark disabled:opacity-0 transition-colors flex items-center gap-1.5"
                >
                  <i className="fas fa-arrow-left text-xs" /> Back
                </button>
                <button
                  onClick={next}
                  disabled={!canAdvance}
                  className="btn-primary disabled:opacity-40 disabled:pointer-events-none"
                >
                  {isLast ? 'See My Recommendation' : 'Next'} <i className="fas fa-arrow-right text-xs" />
                </button>
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
                  <i className="fas fa-wand-magic-sparkles" /> Recommended For You
                </span>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${recommended.icon} text-primary text-2xl`} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-dark mb-2">{recommended.label} Package</h3>
                <p className="text-muted text-sm max-w-md mx-auto">{recommended.desc}</p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-2 mb-6 max-w-lg mx-auto">
                {recommended.features.slice(0, 6).map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <p className="text-center text-xs text-muted bg-gray-50 rounded-lg p-3 mb-6 max-w-md mx-auto">
                <i className="fas fa-clock text-primary mr-1" /> Typical delivery: {recommended.timeline}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact" className="btn-primary">Get a Precise Quote</Link>
                <button onClick={scrollToPackage} className="btn-secondary">View Full Package Details</button>
              </div>
              <div className="text-center mt-6">
                <button onClick={restart} className="text-sm text-muted hover:text-primary transition-colors">
                  <i className="fas fa-rotate-left mr-1.5" /> Start over
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
