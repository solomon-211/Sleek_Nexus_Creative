/* Enhanced Navbar JS — scroll progress, active links, dropdowns, mobile */
(function () {
    'use strict';

    const clamp = (v, a = 0, b = 100) => Math.min(Math.max(v, a), b);

    function init() {
        const navbar    = document.querySelector('.navbar');
        const progress  = document.getElementById('navProgressLine');
        const hamburger = document.getElementById('hamburger');
        const navMenu   = document.getElementById('navMenu');
        const navLinks  = Array.from(document.querySelectorAll('.nav-menu a'));

        // ── Scroll progress + scrolled class ─────────────────────────────────
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const doc = document.documentElement;
                    const scrollTop = window.scrollY || doc.scrollTop;
                    const max = (doc.scrollHeight - window.innerHeight) || 1;
                    if (progress) progress.style.width = clamp((scrollTop / max) * 100) + '%';
                    if (navbar) navbar.classList.toggle('scrolled', scrollTop > 40);
                    ticking = false;
                });
                ticking = true;
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        // ── Hamburger ─────────────────────────────────────────────────────────
        function closeMenu() {
            if (!navMenu || !hamburger) return;
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('active');
                hamburger.classList.toggle('active', isOpen);
                hamburger.setAttribute('aria-expanded', String(isOpen));
            });

            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hamburger.click(); }
                if (e.key === 'Escape') closeMenu();
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) closeMenu();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
                closeAllDropdowns();
            }
        });

        // ── Dropdowns ─────────────────────────────────────────────────────────
        const dropdownItems = Array.from(document.querySelectorAll('.nav-menu > li.has-dropdown'));

        function closeAllDropdowns(except) {
            dropdownItems.forEach(li => {
                if (li !== except) li.classList.remove('open');
            });
        }

        dropdownItems.forEach(li => {
            const toggle = li.querySelector('.nav-dropdown-toggle');
            if (!toggle) return;

            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = li.classList.toggle('open');
                // On desktop close others
                if (window.innerWidth > 768) closeAllDropdowns(isOpen ? li : null);
            });

            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => closeAllDropdowns());
        navbar && navbar.addEventListener('click', (e) => e.stopPropagation());

        // ── Active link highlight ─────────────────────────────────────────────
        navLinks.forEach(link => {
            try {
                const href = link.getAttribute('href');
                if (!href || href.startsWith('#')) return;
                const url = new URL(href, window.location.href);
                const linkPath = url.pathname.replace(/\\/g, '/');
                const currentPath = window.location.pathname.replace(/\\/g, '/');
                if (linkPath === currentPath || (linkPath.endsWith('index.html') && currentPath.endsWith('/'))) {
                    link.classList.add('active');
                    // Also mark parent toggle active
                    const parentLi = link.closest('li.has-dropdown');
                    if (parentLi) {
                        const toggle = parentLi.querySelector('.nav-dropdown-toggle');
                        if (toggle) toggle.classList.add('active');
                    }
                }
            } catch (_) {}
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
