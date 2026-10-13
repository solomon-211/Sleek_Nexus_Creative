import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GA_ID, OPEN_SETTINGS_EVENT, getConsent, setConsent } from '../../lib/analytics'

// Only rendered at all when analytics is configured — with no measurement ID
// the site sets no optional cookies, so there is nothing to ask about.
export default function CookieBanner() {
  const [visible, setVisible]   = useState(() => Boolean(GA_ID) && !getConsent())
  const [expanded, setExpanded] = useState(false)

  // Lets the footer's "Cookie settings" link reopen the banner so a visitor
  // can change their mind later.
  useEffect(() => {
    if (!GA_ID) return
    const open = () => setVisible(true)
    window.addEventListener(OPEN_SETTINGS_EVENT, open)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open)
  }, [])

  const choose = (value) => { setConsent(value); setVisible(false) }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[10000] bg-dark border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]"
      style={{ animation: 'slideUp 0.3s ease' }}
    >
      <style>{`@keyframes slideUp { from { transform: translateY(100%); opacity:0; } to { transform: translateY(0); opacity:1; } }`}</style>

      <div className="container-page py-4">
        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3 flex-1">
            <i className="fas fa-shield-alt text-primary text-lg flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-semibold mb-0.5">We value your privacy</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                With your permission, we use analytics cookies to see which pages are useful and improve the site. Nothing is collected unless you accept.{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                {' · '}
                <button onClick={() => setExpanded(e => !e)} aria-expanded={expanded} className="text-primary hover:underline text-xs">
                  {expanded ? 'Hide details' : 'Cookie details'}
                </button>
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 flex-shrink-0">
            <button onClick={() => choose('declined')}
              className="text-xs font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2 rounded-lg transition-all">
              Decline
            </button>
            <button onClick={() => choose('accepted')}
              className="text-xs font-semibold bg-primary hover:bg-white hover:text-dark text-white px-5 py-2 rounded-lg transition-colors shadow-lg">
              Accept
            </button>
          </div>
        </div>

        {/* Expanded cookie details — lists only what the site actually uses */}
        {expanded && (
          <div className="mt-4 grid sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
            {[
              { icon: 'fa-cog', title: 'Essential', desc: 'Remembers this cookie choice on your device. No tracking, and required for the site to work.', always: true },
              { icon: 'fa-chart-bar', title: 'Analytics', desc: 'Google Analytics — anonymous page-view statistics. Loaded only if you press Accept.' },
            ].map(({ icon, title, desc, always }) => (
              <div key={title} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                <i className={`fas ${icon} text-primary text-sm mt-0.5 flex-shrink-0`} />
                <div>
                  <p className="text-white text-xs font-semibold mb-0.5">
                    {title} {always && <span className="text-[0.6rem] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full ml-1">Always on</span>}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
