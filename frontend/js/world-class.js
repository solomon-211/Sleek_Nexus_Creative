// ===== WORLD-CLASS ENHANCEMENTS =====

(function () {

    // ---- Page Structure (Non-home) ----
    function initPageStructure() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        // run page-structure logic on all pages (including index)

        document.body.classList.add('page-shell');

        // Ensure keyboard users can jump directly to primary content.
        if (!document.querySelector('.skip-to-content')) {
            const skip = document.createElement('a');
            skip.className = 'skip-to-content';
            skip.href = '#main-content';
            skip.textContent = 'Skip to main content';
            document.body.prepend(skip);
        }

        const nav = document.querySelector('.navbar, nav');
        const footer = document.querySelector('footer');
        if (!nav || !footer) return;

        let main = document.querySelector('main#main-content');
        if (!main) {
            main = document.createElement('main');
            main.id = 'main-content';
            main.tabIndex = -1;

            const nodesToMove = [];
            let node = nav.nextSibling;
            while (node && node !== footer) {
                const next = node.nextSibling;
                nodesToMove.push(node);
                node = next;
            }

            footer.parentNode.insertBefore(main, footer);
            nodesToMove.forEach((n) => main.appendChild(n));
        }
    }

    // ---- Scroll Progress Bar ----
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress-bar';
        document.body.prepend(bar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            bar.style.width = Math.min(scrolled, 100) + '%';
        }, { passive: true });
    }

    // Dark mode toggle removed per user preference

    // ---- Toast Notifications ----
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    window.showToast = function (message, type = 'info', duration = 3000) {
        const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // ---- Animated Stats Counter ----
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start).toLocaleString();
            }
        }, 16);
    }

    function initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    const target = parseInt(entry.target.dataset.count);
                    animateCounter(entry.target, target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    // ---- Navbar Scroll Effect ----
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // ---- Breadcrumbs ----
    function initBreadcrumbs() {
        const map = {
            'about.html':    [{ label: 'About Us' }],
            'services.html': [{ label: 'Services' }],
            'projects.html': [{ label: 'Projects' }],
            'blog.html':     [{ label: 'Blog' }],
            'courses.html':  [{ label: 'Courses' }],
            'contact.html':  [{ label: 'Contact' }],
            'careers.html':  [{ label: 'Careers' }],
            'partners.html': [{ label: 'Partners' }],
            'donors.html':   [{ label: 'Donors' }],
            'privacy.html':  [{ label: 'Privacy Policy' }],
            'terms.html':    [{ label: 'Terms of Service' }],
            'enroll.html':   [{ label: 'Courses', href: 'courses.html' }, { label: 'Enroll' }],
            'blog-post.html':[{ label: 'Blog', href: 'blog.html' }, { label: 'Article' }],
        };

        const page = window.location.pathname.split('/').pop() || 'index.html';
        if (page === 'index.html' || page === '' || !map[page]) return;

        const nav = document.querySelector('.navbar');
        if (!nav) return;

        const crumbs = map[page];
        const nav_el = document.createElement('nav');
        nav_el.className = 'breadcrumbs';
        nav_el.setAttribute('aria-label', 'Breadcrumb');

        let html = '<div class="container"><a href="index.html"><i class="fas fa-home"></i> Home</a>';
        crumbs.forEach((crumb, i) => {
            html += '<span class="separator"><i class="fas fa-chevron-right"></i></span>';
            if (crumb.href && i < crumbs.length - 1) {
                html += `<a href="${crumb.href}">${crumb.label}</a>`;
            } else {
                html += `<span class="current" aria-current="page">${crumb.label}</span>`;
            }
        });
        html += '</div>';
        nav_el.innerHTML = html;
        nav.insertAdjacentElement('afterend', nav_el);
    }

    // ---- Lazy Image Loading with Fade ----
    function initLazyImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.classList.add('lazy');
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => img.classList.add('loaded'));
            }
        });
    }

    // ---- Keyboard Navigation Enhancement ----
    function initKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const nav = document.querySelector('.nav-menu.active');
                if (nav) {
                    nav.classList.remove('active');
                    document.querySelector('.hamburger')?.classList.remove('active');
                }
                document.querySelector('.emoji-picker')?.remove();
            }
        });
    }

    // ---- Blog Search (client-side filtering) ----
    function initBlogSearch() {
        const form = document.querySelector('.search-form');
        if (!form) return;
        const input = form.querySelector('input[type="text"]');
        const posts = document.querySelectorAll('.blog-card');

        function doFilter(q) {
            const term = (q || '').toLowerCase().trim();
            posts.forEach(post => {
                const title = post.querySelector('h3')?.textContent || '';
                const excerpt = post.querySelector('p')?.textContent || '';
                const category = post.querySelector('.blog-category')?.textContent || '';
                const match = [title, excerpt, category].join(' ').toLowerCase().includes(term);
                post.style.display = term === '' || match ? '' : 'none';
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            doFilter(input.value);
        });

        input.addEventListener('input', () => doFilter(input.value));
    }

    // ---- Newsletter Form Enhancement ----
    async function postToAPI(endpoint, data) {
        const base = window.CONFIG?.API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${base}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return { ok: res.ok, data: await res.json() };
    }

    function initNewsletterForms() {
        async function handleNewsletterSubmit(email, firstName, btn, msgEl, resetFn) {
            if (!email) return showToast('Please provide an email', 'error');
            const orig = btn?.innerHTML;
            if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...'; }
            try {
                const { ok, data } = await postToAPI('/newsletter/subscribe', { email, firstName });
                if (ok) {
                    showToast(data.message || 'Successfully subscribed!', 'success');
                    if (msgEl) { msgEl.className = 'newsletter-message success'; msgEl.textContent = data.message || 'Thank you for subscribing!'; setTimeout(() => { msgEl.className = 'newsletter-message'; msgEl.textContent = ''; }, 4000); }
                    resetFn?.();
                } else {
                    showToast(data.error || 'Subscription failed', 'error');
                }
            } catch {
                showToast('Network error. Please try again.', 'error');
            } finally {
                if (btn) { btn.disabled = false; btn.innerHTML = orig; }
            }
        }

        // Standard .newsletter-form
        document.querySelectorAll('.newsletter-form').forEach(form => {
            if (form.dataset.nlBound) return;
            form.dataset.nlBound = '1';
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]')?.value?.trim();
                const firstName = form.querySelector('input[name="firstName"], input[placeholder="First Name"]')?.value?.trim();
                const btn = form.querySelector('button[type="submit"]');
                const msgEl = document.getElementById('newsletter-message');
                await handleNewsletterSubmit(email, firstName, btn, msgEl, () => form.reset());
            });
        });

        // Banner form
        const bannerForm = document.getElementById('newsletter-form');
        if (bannerForm && !bannerForm.dataset.nlBound) {
            bannerForm.dataset.nlBound = '1';
            bannerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = bannerForm.querySelector('input[name="email"]')?.value?.trim();
                const firstName = bannerForm.querySelector('input[name="firstName"]')?.value?.trim();
                const btn = bannerForm.querySelector('button[type="submit"]');
                const msgEl = document.getElementById('newsletter-message');
                await handleNewsletterSubmit(email, firstName, btn, msgEl, () => bannerForm.reset());
            });
        }

        // Footer newsletter form
        const footerForm = document.getElementById('footer-newsletter-form');
        if (footerForm && !footerForm.dataset.nlBound) {
            footerForm.dataset.nlBound = '1';
            footerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = footerForm.querySelector('input[type="email"]')?.value?.trim();
                const firstName = footerForm.querySelector('input[placeholder="First Name"]')?.value?.trim();
                const btn = footerForm.querySelector('button[type="submit"]');
                await handleNewsletterSubmit(email, firstName, btn, null, () => footerForm.reset());
            });
        }
    }

    // ---- Contact Form Enhancement ----
    function initContactForm() {
        // contact-validation.js handles this with real API — skip to avoid double-binding
    }

    // ---- Job Application ----
    function initJobApplication() {
        const form = document.getElementById('jobApplicationForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name    = document.getElementById('app-name')?.value.trim();
            const email   = document.getElementById('app-email')?.value.trim();
            const role    = document.getElementById('app-role')?.value.trim();
            const message = document.getElementById('app-message')?.value.trim();
            const msgEl   = document.getElementById('app-form-message');

            if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (msgEl) { msgEl.textContent = 'Please provide your name and a valid email.'; msgEl.className = 'form-message error'; }
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const orig = submitBtn?.textContent;
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting...'; }

            try {
                const base = window.CONFIG?.API_URL || 'http://localhost:5000/api';
                const res = await fetch(`${base}/jobs/apply`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, role, message })
                });
                const data = await res.json();
                if (res.ok) {
                    form.reset();
                    if (msgEl) { msgEl.textContent = 'Application received! We will be in touch.'; msgEl.className = 'form-message success'; }
                    showToast('Application submitted successfully!', 'success');
                } else {
                    if (msgEl) { msgEl.textContent = data.error || 'Submission failed. Please try again.'; msgEl.className = 'form-message error'; }
                    showToast('Failed to submit application.', 'error');
                }
            } catch {
                if (msgEl) { msgEl.textContent = 'Network error. Please try again.'; msgEl.className = 'form-message error'; }
                showToast('Network error. Please try again.', 'error');
            }

            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = orig; }
            setTimeout(() => { if (msgEl) { msgEl.textContent = ''; msgEl.className = 'form-message'; } }, 5000);
        });
    }

    // ---- Smooth Anchor Scrolling ----
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ---- Section Dividers ----
    function initSectionDividers() {
        document.querySelectorAll('section + section').forEach(section => {
            const divider = document.createElement('div');
            divider.className = 'section-divider';
            section.parentNode.insertBefore(divider, section);
        });
    }

    // ---- Footer Year ----
    function initFooterYear() {
        const yearEl = document.getElementById('footer-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    // ---- Join Us Section ----
    function initJoinUsSection() {
        if (document.querySelector('.join-us-section')) return;

        const footerNewsletter = document.querySelector('.footer-newsletter-banner');
        const footer = document.querySelector('footer');
        if (!footerNewsletter && !footer) return;

        const section = document.createElement('section');
        section.className = 'join-us-section';
        section.setAttribute('aria-labelledby', 'joinUsTitle');
        section.innerHTML = `
            <div class="container join-us-inner">
                <p class="join-us-eyebrow"><i class="fas fa-users" aria-hidden="true"></i> Join Us</p>
                <h2 id="joinUsTitle">Build, partner, and grow with Sleek Nexus Creative</h2>
                <p class="join-us-description">If you want to work with a team that delivers practical digital solutions, we’re open to careers, partnerships, and new projects that create real impact.</p>
                <div class="join-us-grid">
                    <div class="join-us-card">
                        <i class="fas fa-briefcase" aria-hidden="true"></i>
                        <h3>Careers</h3>
                        <p>Join a team that values engineering, design, and delivery excellence.</p>
                    </div>
                    <div class="join-us-card">
                        <i class="fas fa-handshake" aria-hidden="true"></i>
                        <h3>Partnerships</h3>
                        <p>Collaborate with us on education, business, and community initiatives.</p>
                    </div>
                    <div class="join-us-card">
                        <i class="fas fa-paper-plane" aria-hidden="true"></i>
                        <h3>Projects</h3>
                        <p>Start a new build, refresh an existing platform, or modernize your digital presence.</p>
                    </div>
                </div>
                <div class="join-us-actions">
                    <a href="careers.html" class="btn btn-primary"><i class="fas fa-arrow-right btn-icon" aria-hidden="true"></i>Explore Careers</a>
                    <a href="partners.html" class="btn btn-secondary">Partner With Us</a>
                    <a href="contact.html" class="join-us-link">Talk to Our Team</a>
                </div>
            </div>
        `;

        if (footerNewsletter) {
            footerNewsletter.insertAdjacentElement('beforebegin', section);
        } else {
            footer.insertAdjacentElement('beforebegin', section);
        }
    }

    // ---- Enroll Links Wiring ----
    function initEnrollLinks() {
        document.querySelectorAll('.enroll-btn').forEach(a => {
            try {
                const card = a.closest('.course-card');
                const title = card ? card.querySelector('h3')?.textContent.trim() : null;
                if (title) {
                    const url = new URL(a.href, window.location.origin);
                    url.searchParams.set('course', title);
                    a.href = url.toString();
                }
            } catch (e) { /* ignore */ }
        });
    }

    // ---- Init All ----
    document.addEventListener('DOMContentLoaded', () => {
        initPageStructure();
        initScrollProgress();
        // initDarkMode(); // removed per user preference
        initCounters();
        initNavbarScroll();
        initBreadcrumbs();
        initLazyImages();
        initKeyboardNav();
        initNewsletterForms();
        initContactForm();
        initJobApplication();
        initSmoothScroll();
        initBlogSearch();
        initEnrollLinks();
        initSectionDividers();
        initFooterYear();
        initJoinUsSection();
    });

})();
