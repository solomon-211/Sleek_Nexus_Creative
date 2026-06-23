import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  // Initialize from storage on first render — no effect/flash needed (client-only app).
  const [visible, setVisible] = useState(() => !localStorage.getItem('snc_cookie_consent'))

  const accept = () => { localStorage.setItem('snc_cookie_consent', 'accepted'); setVisible(false) }
  const decline = () => { localStorage.setItem('snc_cookie_consent', 'declined'); setVisible(false) }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[10000] bg-[#0f172a] border-t border-white/10 shadow-2xl">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          <i className="fas fa-shield-alt text-primary mr-2" />
          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.{' '}
          <Link to="/privacy" className="text-primary hover:underline">Learn more</Link>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={decline}
            className="text-sm font-semibold text-gray-400 hover:text-white border border-white/20 px-4 py-2 rounded-lg transition-colors">
            Decline
          </button>
          <button onClick={accept}
            className="text-sm font-semibold bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg transition-colors">
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
