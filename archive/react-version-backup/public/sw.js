/**
 * Service Worker — Sleek Nexus Creative
 * Strategy: Cache-first for static assets, network-first for API calls.
 */

const CACHE_NAME   = 'snc-v1'
const STATIC_CACHE = 'snc-static-v1'
const API_CACHE    = 'snc-api-v1'

/* Assets to pre-cache on install */
const PRECACHE_URLS = [
  './html/index.html',
  './manifest.json',
]

/* ── Install ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

/* ── Activate — clean old caches ── */
self.addEventListener('activate', (event) => {
  const VALID = [CACHE_NAME, STATIC_CACHE, API_CACHE]
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !VALID.includes(k)).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

/* ── Fetch ── */
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  /* Skip non-GET and cross-origin requests */
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  /* API calls — network first, fall back to cache */
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(API_CACHE).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() => caches.match(request))
    )
    return
  }

  /* Static assets — cache first */
  if (/\.(js|css|woff2?|png|jpg|jpeg|svg|ico|webp)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) => cached || fetch(request).then((response) => {
          const clone = response.clone()
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone))
          return response
        })
      )
    )
    return
  }

  /* HTML navigation — network first, fall back to cached index */
  event.respondWith(
    fetch(request).catch(() =>
      caches.match('/index.html')
    )
  )
})
