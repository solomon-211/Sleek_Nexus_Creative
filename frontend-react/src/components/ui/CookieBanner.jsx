import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CONSENT_KEY = 'snc_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible]     = useState(false)
  const [expanded, setExpanded]   = useState(false)

  // Only show after hydration to avoid SSR mismatch
  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
  }, [])

  const accept  = () => { localStorage.setItem(CONSENT_KEY, 'accepted');  setVisible(false) }
  const decline = () => { localStorage.setItem(CONSENT_KEY, 'declined');  setVisible(false) }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[10000] bg-[#0f172a]/98 backdrop-blur-sm border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]"
      style={{ animation: 'slideUp 0.3s ease' }}
    >
      <style>{`@keyframes slideUp { from { transform: translateY(100%); opacity:0; } to { transform: translateY(0); opacity:1; } }`}</style>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3 flex-1">
            <i className="fas fa-shield-alt text-primary text-lg flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-semibold mb-0.5">We value your privacy</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                We use cookies to enhance your experience, analyze traffic, and personalize content.{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                {' · '}
                <button onClick={() => setExpanded(e => !e)} className="text-primary hover:underline text-xs">
                  {expanded ? 'Hide details' : 'Cookie details'}
                </button>
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 flex-shrink-0">
            <button onClick={decline}
              className="text-xs font-semibold text-gray-300 hover:text-white border border-white/15 hover:border-white/30 px-4 py-2 rounded-lg transition-all">
              Decline
            </button>
            <button onClick={accept}
              className="text-xs font-semibold bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg transition-colors shadow-lg">
              Accept All
            </button>
          </div>
        </div>

        {/* Expanded cookie details */}
        {expanded && (
          <div className="mt-4 grid sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
            {[
              { icon: 'fa-cog', title: 'Essential', desc: 'Required for the website to function. Cannot be disabled.', always: true },
              { icon: 'fa-chart-bar', title: 'Analytics', desc: 'Help us understand how visitors use the site to improve the experience.' },
              { icon: 'fa-bullseye', title: 'Marketing', desc: 'Used to deliver relevant content and measure campaign effectiveness.' },
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
