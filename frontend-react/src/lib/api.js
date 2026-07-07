/**
 * api.js — Centralized API client for SNC frontend-react
 *
 * Exports a typed axios instance plus named request helpers
 * consumed directly by TanStack Query's useQuery / useMutation hooks.
 */

import axios from 'axios'

// ── Base client ──────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10_000,
  withCredentials: true,
})

// ── Request interceptor — attach auth token if stored ────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('snc_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Response interceptor — unwrap data, handle 401 globally ─────────────────
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('snc_token')
      // Only redirect if not already on auth page
      if (!window.location.pathname.includes('/login')) {
        window.dispatchEvent(new CustomEvent('snc:unauthorized'))
      }
    }
    return Promise.reject(err.response?.data ?? err)
  }
)

// ── Contact ──────────────────────────────────────────────────────────────────
export const contactApi = {
  /** POST /api/contact — send a contact form message */
  send: (data) => api.post('/contact', data),
}

// ── Newsletter ────────────────────────────────────────────────────────────────
export const newsletterApi = {
  /** POST /api/newsletter/subscribe */
  subscribe: (data) => api.post('/newsletter/subscribe', data),
  /** GET  /api/newsletter/unsubscribe?token=xxx */
  unsubscribe: (token) => api.get('/newsletter/unsubscribe', { params: { token } }),
}

// ── Stats ─────────────────────────────────────────────────────────────────────
export const statsApi = {
  /** GET /api/stats — homepage counters */
  get: () => api.get('/stats'),
}

// ── Quote / Consultation ──────────────────────────────────────────────────────
export const quoteApi = {
  /** POST /api/contact/quote — submit a project quote request */
  submit: (data) => api.post('/contact', { ...data, type: 'quote' }),
}

export const consultationApi = {
  /** POST /api/contact/consultation */
  book: (data) => api.post('/contact', { ...data, type: 'consultation' }),
}

export default api
