import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * PageViewTracker — counts one anonymous page view per page a visitor opens,
 * for the Insights tab of the /admin dashboard (backend: POST /api/track).
 *
 * Sends only the page path and the referring page; the backend keeps just the
 * referring site's domain, plus country and device type. No cookies, no IDs,
 * no IP addresses. Skipped in local development and when the browser asks not
 * to be tracked. Rendered only inside the public site's layout, so /admin is
 * never counted.
 */
export default function PageViewTracker() {
  const { pathname } = useLocation()
  const last = useRef(null)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    if (import.meta.env.DEV || !apiUrl || navigator.doNotTrack === '1') return
    if (last.current === pathname) return
    // The site the visitor arrived from counts once, on their first page.
    const ref = last.current === null ? document.referrer : ''
    last.current = pathname

    const body = JSON.stringify({ path: pathname, ref })
    try {
      // text/plain keeps this a "simple" request: no extra preflight round trip.
      const blob = new Blob([body], { type: 'text/plain' })
      if (!navigator.sendBeacon?.(`${apiUrl}/track`, blob)) {
        fetch(`${apiUrl}/track`, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(() => {})
      }
    } catch {
      // Analytics must never affect the visitor.
    }
  }, [pathname])

  return null
}
