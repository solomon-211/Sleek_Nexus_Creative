// Consent-gated Google Analytics 4.
//
// Nothing here runs — no script tag, no cookie, no network request — until
// BOTH are true: a measurement ID is configured (VITE_GA_MEASUREMENT_ID) and
// the visitor has pressed "Accept" on the cookie banner. With no ID set, the
// site collects nothing and the banner never appears, because there is
// nothing to ask consent for.

export const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

const CONSENT_KEY = 'snc_cookie_consent'
export const OPEN_SETTINGS_EVENT = 'snc:open-cookie-settings'

// localStorage throws in some private-browsing modes; treat that as "no
// stored choice" rather than letting it break the page.
export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Choice simply won't persist past this page view.
  }
  if (value === 'accepted') {
    if (loaded) window.gtag('consent', 'update', { analytics_storage: 'granted' })
    loadAnalytics()
    // The page they accepted on counts too.
    trackPageView(window.location.pathname)
  } else if (loaded) {
    // Withdrawn after having accepted earlier in this visit.
    window.gtag('consent', 'update', { analytics_storage: 'denied' })
  }
}

let loaded = false

export function loadAnalytics() {
  if (loaded || !GA_ID || getConsent() !== 'accepted') return
  loaded = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  // Page views are sent by trackPageView on each route change instead —
  // GA's automatic one only fires on the initial document load in an SPA.
  window.gtag('config', GA_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(script)
}

export function trackPageView(path) {
  if (!loaded || getConsent() !== 'accepted') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
  })
}
