/**
 * Sleek Nexus Creative — Frontend API Client
 * Handles: Live impact counters, analytics tracking, language support, PWA
 */

const SleekAPI = (() => {
  const BASE = 'http://localhost:5000/api';
  const sessionId = Math.random().toString(36).substring(2);

  // -- CORE FETCH ----------------------------------------------------
  const request = async (path, options = {}) => {
    try {
      const res = await fetch(`${BASE}${path}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
      });
      return await res.json();
    } catch (err) {
      console.warn(`API error [${path}]:`, err.message);
      return null;
    }
  };

  // -- ANALYTICS TRACKING ---------------------------------------------
  const track = (event, page = null, metadata = {}) => {
    request('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({
        event,
        page: page || window.location.pathname,
        sessionId,
        metadata,
      }),
    });
  };

  // -- IMPACT COUNTERS ------------------------------------------------
  const loadImpactMetrics = async () => {
    const data = await request('/impact');
    if (!data?.success) return;

    const lang = document.documentElement.lang || 'en';
    const container = document.getElementById('impactMetrics');
    if (!container) return;

    container.innerHTML = data.data.map(m => `
      <div class="impact-stat" data-metric="${m.metric}">
        <div class="impact-icon"><i class="fas ${m.icon || 'fa-chart-bar'}"></i></div>
        <div class="impact-number" data-target="${m.value}">0</div>
        <div class="impact-label">${lang === 'ar' && m.labelAr ? m.labelAr : m.label}</div>
      </div>
    `).join('');

    // Animate counters when in viewport
    observeCounters();
  };

  const observeCounters = () => {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target) || 0;
    if (target === 0) { el.textContent = '0'; return; }

    const duration = 2000;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(easeOut(progress) * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  // -- CONTACT FORM --------------------------------------------------
  const submitContact = async (formData) => {
    const res = await request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res?.success) {
      track('form_submit', null, { type: 'contact', service: formData.service });
    }

    return res;
  };

  // -- NEWSLETTER ----------------------------------------------------
  const subscribe = async (data) => {
    const res = await request('/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        language: document.documentElement.lang || 'en',
      }),
    });

    if (res?.success) {
      track('form_submit', null, { type: 'newsletter' });
    }

    return res;
  };

  // -- COURSE ENROLLMENT ---------------------------------------------
  const enroll = async (courseId, data) => {
    const res = await request(`/courses/${courseId}/enroll`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res?.success) {
      track('enrollment', null, { courseId });
    }

    return res;
  };

  return { track, loadImpactMetrics, submitContact, subscribe, enroll };
})();

// -- LANGUAGE TOGGLE ------------------------------------------------------------
const SleekLang = (() => {
  const translations = {
    en: {
      nav_home: 'Home',
      nav_about: 'About',
      nav_services: 'Services',
      nav_projects: 'Projects',
      nav_courses: 'Courses',
      nav_contact: 'Contact',
      hero_title: 'Empowering South Sudan Through Technology',
      hero_subtitle: 'We build digital solutions, train youth, and drive sustainable development across South Sudan.',
      hero_cta: 'Get Started',
      hero_cta2: 'Our Work',
      contact_name: 'Full Name',
      contact_email: 'Email Address',
      contact_phone: 'Phone Number',
      contact_service: 'Service Needed',
      contact_message: 'Your Message',
      contact_submit: 'Send Message',
      contact_success: 'Message sent! We\'ll reply within 24-48 hours.',
      newsletter_placeholder: 'Your email address',
      newsletter_btn: 'Subscribe',
      newsletter_success: 'Successfully subscribed!',
    },
    ar: {
      nav_home: '????????',
      nav_about: '?? ???',
      nav_services: '???????',
      nav_projects: '????????',
      nav_courses: '???????',
      nav_contact: '???? ???',
      hero_title: '????? ???? ??????? ?? ???? ???????????',
      hero_subtitle: '???? ?????? ?????? ?????? ??????? ????? ??????? ????????? ?? ???? ????? ???? ???????.',
      hero_cta: '???? ????',
      hero_cta2: '???????',
      contact_name: '????? ??????',
      contact_email: '?????? ??????????',
      contact_phone: '??? ??????',
      contact_service: '?????? ????????',
      contact_message: '??????',
      contact_submit: '????? ???????',
      contact_success: '?? ???????! ???? ???? 24-48 ????.',
      newsletter_placeholder: '????? ??????????',
      newsletter_btn: '?????',
      newsletter_success: '?? ???????? ?????!',
    },
  };

  const current = () => document.documentElement.lang || 'en';

  const t = (key) => translations[current()]?.[key] || translations.en[key] || key;

  const apply = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('sleek_lang', lang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });

    // Update active state on language buttons
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Reload impact metrics with correct language labels
    SleekAPI.loadImpactMetrics();
  };

  const init = () => {
    const saved = localStorage.getItem('sleek_lang') || 'en';
    apply(saved);
  };

  return { t, apply, init, current };
})();

// -- FORM HELPERS --------------------------------------------------------------
const SleekForms = (() => {
  const showMessage = (formEl, message, isSuccess) => {
    const existing = formEl.querySelector('.form-feedback');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.className = `form-feedback ${isSuccess ? 'success' : 'error'}`;
    div.style.cssText = `
      padding: 12px 16px;
      border-radius: 8px;
      margin-top: 12px;
      font-size: 14px;
      font-weight: 500;
      background: ${isSuccess ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'};
      border: 1px solid ${isSuccess ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'};
      color: ${isSuccess ? '#4ade80' : '#f87171'};
    `;
    div.textContent = message;
    formEl.appendChild(div);

    if (isSuccess) {
      setTimeout(() => div.remove(), 5000);
    }
  };

  const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = '...';

      const formData = Object.fromEntries(new FormData(form));
      const res = await SleekAPI.submitContact(formData);

      if (res?.success) {
        showMessage(form, SleekLang.t('contact_success'), true);
        form.reset();
      } else {
        const errorMsg = res?.errors?.[0]?.message || res?.error || 'Something went wrong. Please try again.';
        showMessage(form, errorMsg, false);
      }

      btn.disabled = false;
      btn.textContent = originalText;
    });
  };

  const initNewsletterForm = () => {
    const forms = document.querySelectorAll('.newsletter-form, #newsletterForm');
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const btn = form.querySelector('button[type="submit"]') || form.querySelector('button');

        if (!emailInput?.value) return;

        const originalText = btn?.textContent;
        if (btn) { btn.disabled = true; btn.textContent = '...'; }

        const res = await SleekAPI.subscribe({
          email: emailInput.value,
          source: 'homepage',
        });

        if (res?.success) {
          showMessage(form, SleekLang.t('newsletter_success'), true);
          form.reset();
        } else {
          showMessage(form, res?.error || 'Subscription failed.', false);
        }

        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      });
    });
  };

  return { initContactForm, initNewsletterForm };
})();

// -- PWA SERVICE WORKER REGISTRATION -------------------------------------------
const SleekPWA = (() => {
  const register = async () => {
    if (!('serviceWorker' in navigator)) return;
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      console.log('[OK] Service Worker registered:', reg.scope);
    } catch (err) {
      console.warn('Service Worker registration failed:', err);
    }
  };
  return { register };
})();

// -- INIT ON DOM READY ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  SleekLang.init();
  SleekAPI.loadImpactMetrics();
  SleekForms.initContactForm();
  SleekForms.initNewsletterForm();
  SleekPWA.register();

  // Track page view
  SleekAPI.track('page_view');

  // Language toggle buttons
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => SleekLang.apply(btn.dataset.lang));
  });
});
