import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { loadAnalytics, trackPageView } from '../../lib/analytics'

// Per-navigation housekeeping: reset scroll, and record the page view (a
// no-op unless the visitor has accepted analytics — see lib/analytics.js).
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    loadAnalytics()
    trackPageView(pathname)
  }, [pathname])
  return null
}
