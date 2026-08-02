import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_NUMBER = '211925277700'
const DEFAULT_MESSAGE = "Hi Sleek Nexus Creative! I'd like to talk about a project."
const DISMISS_KEY = 'snc_whatsapp_dismissed'
const CONSENT_KEY = 'snc_cookie_consent'

export default function WhatsAppBubble() {
  const [dismissed, setDismissed] = useState(() => typeof window !== 'undefined' && !!sessionStorage.getItem(DISMISS_KEY))
  const [open, setOpen] = useState(false)
  const [liftForBanner] = useState(() => typeof window !== 'undefined' && !localStorage.getItem(CONSENT_KEY))

  if (dismissed) return null

  const chatUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <div
      className={`fixed right-4 sm:right-6 z-[9997] transition-[bottom] duration-300 ${liftForBanner ? 'bottom-[136px] sm:bottom-24' : 'bottom-5 sm:bottom-6'}`}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-[72px] right-0 w-[280px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.28)] border border-gray-100 overflow-hidden"
          >
            <div className="bg-[#25D366] px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <i className="fab fa-whatsapp text-white text-lg" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Sleek Nexus Creative</p>
                <p className="text-white/80 text-xs">Typically replies within minutes</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-dark-soft text-sm leading-relaxed mb-4">
                👋 Have a project in mind or a question? Chat with us directly on WhatsApp.
              </p>
              <a
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb355] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
              >
                <i className="fab fa-whatsapp" /> Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close WhatsApp chat panel' : 'Chat with us on WhatsApp'}
          aria-expanded={open}
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1fb355] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] flex items-center justify-center transition-all duration-300 hover:scale-105"
        >
          {!open && (
            <span
              className="motion-safe:animate-ping absolute inset-0 rounded-full bg-[#25D366] opacity-40"
              style={{ animationDuration: '2.5s' }}
            />
          )}
          <i className={`${open ? 'fas fa-times' : 'fab fa-whatsapp'} text-2xl relative`} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            sessionStorage.setItem(DISMISS_KEY, '1')
            setDismissed(true)
          }}
          aria-label="Dismiss WhatsApp chat button"
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-dark text-white text-[0.55rem] flex items-center justify-center border-2 border-white hover:bg-primary transition-colors"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  )
}
