// ── Config ──────────────────────────────────────────────────────────────────
const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
export const API_URL = isLocal
  ? 'http://localhost:5000/api'
  : window.location.origin + '/api';

// ── Core fetch ───────────────────────────────────────────────────────────────
async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    return await res.json();
  } catch (err) {
    console.warn(`API [${path}]:`, err.message);
    return null;
  }
}

// ── API calls ────────────────────────────────────────────────────────────────
export const api = {
  track:     (event, meta = {}) => request('/analytics/track', { method: 'POST', body: JSON.stringify({ event, page: window.location.pathname, ...meta }) }),
  contact:   (data)             => request('/contact',              { method: 'POST', body: JSON.stringify(data) }),
  subscribe: (data)             => request('/newsletter/subscribe', { method: 'POST', body: JSON.stringify(data) }),
  enroll:    (courseId, data)   => request(`/courses/${courseId}/enroll`, { method: 'POST', body: JSON.stringify(data) }),
  apply:     (data)             => request('/jobs/apply',           { method: 'POST', body: JSON.stringify(data) }),
  impact:    ()                 => request('/impact'),
  stats:     ()                 => request('/stats'),
};

// ── Toast ────────────────────────────────────────────────────────────────────
let toastContainer = null;
function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = 'info', duration = 3500) {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
  getToastContainer().appendChild(el);
  setTimeout(() => {
    el.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, duration);
}

// ── Cookie consent ───────────────────────────────────────────────────────────
export const cookies = {
  accepted: () => localStorage.getItem('SNC_cookie_consent') === 'accepted',
  accept:   () => { localStorage.setItem('SNC_cookie_consent', 'accepted'); },
  decline:  () => { localStorage.setItem('SNC_cookie_consent', 'declined'); },
  hasChosen: () => !!localStorage.getItem('SNC_cookie_consent'),
};

// ── Scroll progress ──────────────────────────────────────────────────────────
export function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.style.width = '0%';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

// ── Intersection observer animation ─────────────────────────────────────────
export function observeFadeIns(root = document) {
  const els = root.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ── Animated counter ─────────────────────────────────────────────────────────
export function initCounters(root = document) {
  const els = root.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        const target = parseInt(e.target.dataset.count);
        const start = performance.now();
        const update = (now) => {
          const p = Math.min((now - start) / 2000, 1);
          e.target.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString();
          if (p < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

// ── PWA service worker ───────────────────────────────────────────────────────
export async function registerSW() {
  if ('serviceWorker' in navigator) {
    try { await navigator.serviceWorker.register('/sw.js'); } catch { /* silent */ }
  }
}
