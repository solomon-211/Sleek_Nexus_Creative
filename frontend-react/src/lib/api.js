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

// ── Projects ──────────────────────────────────────────────────────────────────
export const projectsApi = {
  /** GET /api/projects?page=1&limit=12&category=xxx */
  list: (params) => api.get('/projects', { params }),
  /** GET /api/projects/:id */
  get: (id) => api.get(`/projects/${id}`),
}

// ── Courses ───────────────────────────────────────────────────────────────────
export const coursesApi = {
  /** GET /api/courses?page=1&limit=12&category=xxx */
  list: (params) => api.get('/courses', { params }),
  /** GET /api/courses/:id */
  get: (id) => api.get(`/courses/${id}`),
  /** POST /api/courses/enroll */
  enroll: (data) => api.post('/courses/enroll', data),
}

// ── Jobs ──────────────────────────────────────────────────────────────────────
export const jobsApi = {
  /** GET /api/jobs */
  list: (params) => api.get('/jobs', { params }),
  /** GET /api/jobs/:id */
  get: (id) => api.get(`/jobs/${id}`),
  /** POST /api/jobs/apply */
  apply: (data) => api.post('/jobs/apply', data),
}

// ── Impact / Donors ───────────────────────────────────────────────────────────
export const impactApi = {
  /** GET /api/impact */
  get: () => api.get('/impact'),
}

// ── Alumni ────────────────────────────────────────────────────────────────────
export const alumniApi = {
  /** GET /api/alumni?page=1&limit=12 */
  list: (params) => api.get('/alumni', { params }),
  /** GET /api/alumni/search?q=xxx&page=1&limit=12 */
  search: (q, params) => api.get('/alumni/search', { params: { q, ...params } }),
  /** POST /api/alumni/register */
  register: (data) => api.post('/alumni/register', data),
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

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  /** POST /api/auth/login */
  login: (credentials) => api.post('/auth/login', credentials),
  /** POST /api/auth/logout */
  logout: () => api.post('/auth/logout'),
  /** GET  /api/auth/me */
  me: () => api.get('/auth/me'),
}

export default api
