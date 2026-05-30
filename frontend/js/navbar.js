/* Enhanced Navbar JS
 * - Updates scroll progress line
 * - Toggles .scrolled on navbar
 * - Highlights active menu items for in-page sections and same-page links
 * - Adds keyboard accessibility for hamburger and Escape-close behavior
 */
(function () {
    'use strict';

    const clamp = (v, a = 0, b = 100) => Math.min(Math.max(v, a), b);

    function init() {
        const navbar = document.querySelector('.navbar');
        const progress = document.getElementById('navProgressLine');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = Array.from(document.querySelectorAll('.nav-menu a'));

        // Scroll handling with rAF for performance
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const doc = document.documentElement;
                    const scrollTop = window.scrollY || doc.scrollTop;
                    const max = (doc.scrollHeight - window.innerHeight) || 1;
                    const pct = clamp((scrollTop / max) * 100, 0, 100);
                    if (progress) progress.style.width = pct + '%';

                    if (navbar) {
                        if (scrollTop > 40) navbar.classList.add('scrolled');
                        else navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        // Initial update
        onScroll();

        // Accessibility: keyboard toggle for hamburger
        if (hamburger && navMenu) {
            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    hamburger.click();
                } else if (e.key === 'Escape') {
                    // close menu
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });

            // Close when resizing to desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Close menu on Escape globally
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });

        // ACTIVE LINK HIGHLIGHT: support in-page anchors and same-page links
        const anchors = navLinks.filter(l => l.getAttribute('href') && l.getAttribute('href').startsWith('#'));
        if (anchors.length) {
            const sections = anchors.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
            if (sections.length) {
                const obs = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const id = entry.target.id ? '#' + entry.target.id : null;
                        if (!id) return;
                        const link = navLinks.find(l => l.getAttribute('href') === id);
                        if (!link) return;
                        if (entry.isIntersecting) {
                            navLinks.forEach(l => l.classList.remove('active'));
                            link.classList.add('active');
                        }
                    });
                }, { threshold: 0.45 });
                sections.forEach(s => obs.observe(s));
            }
        }

        // Also highlight links that match current pathname or filename
        navLinks.forEach(link => {
            try {
                const href = link.getAttribute('href');
                if (!href) return;
                // Ignore pure anchors (handled above)
                if (href.startsWith('#')) return;
                const url = new URL(href, window.location.href);
                const linkPath = url.pathname.replace(/\/g, '/');
                const currentPath = window.location.pathname.replace(/\\/g, '/');
                if (linkPath === currentPath || (linkPath.endsWith('index.html') && currentPath.endsWith('/'))) {
                    link.classList.add('active');
                }
            } catch (err) {
                // ignore invalid URLs
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
