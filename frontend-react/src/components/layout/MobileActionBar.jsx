import { Link, useLocation } from 'react-router-dom'
import { PHONE_E164, whatsappUrl } from '../../lib/site'

// Pages that are already about getting in touch don't need the bar.
const HIDDEN_ON = ['/contact', '/get-started']

/**
 * MobileActionBar — a fixed bar at the bottom of phone screens with the three
 * ways most visitors here actually make contact: call, WhatsApp, or send a
 * brief. Hidden from lg up, where the navbar's Get Started button is always
 * in view.
 *
 * Renders its own spacer, so the footer's last lines are never hidden
 * underneath it.
 */
export default function MobileActionBar() {
  const { pathname } = useLocation()
  if (HIDDEN_ON.includes(pathname)) return null

  const item = 'flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wide transition-colors'

  return (
    <>
      <div className="h-16 lg:hidden bg-dark" aria-hidden="true" />
      <nav
        aria-label="Quick contact"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[9990] bg-dark border-t border-white/10 shadow-[0_-8px_24px_rgba(0,0,0,0.25)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex">
          <a href={`tel:${PHONE_E164}`} className={`${item} text-white/80 hover:text-white`}>
            <i className="fas fa-phone text-accent text-base" />
            Call
          </a>
          <a href={whatsappUrl("Hi Sleek Nexus Creative! I'd like to talk about a project.")} target="_blank" rel="noopener noreferrer" className={`${item} text-white/80 hover:text-white border-x border-white/10`}>
            <i className="fab fa-whatsapp text-accent text-base" />
            WhatsApp
          </a>
          <Link to="/get-started" className={`${item} bg-primary text-[#1B2F3B] hover:bg-white hover:text-dark`}>
            <i className="fas fa-paper-plane text-base" />
            Start a Project
          </Link>
        </div>
      </nav>
    </>
  )
}
