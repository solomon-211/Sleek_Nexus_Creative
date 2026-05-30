// ===== SMOOTH SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll(
        '.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .fade-in-down, [data-animate]'
    ).forEach(el => observer.observe(el));
}

// ===== STAGGERED CHILDREN ANIMATION =====
function initStaggeredAnimations() {
    document.querySelectorAll('[data-stagger]').forEach(parent => {
        const delay = parseInt(parent.dataset.stagger) || 100;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                Array.from(parent.children).forEach((child, i) => {
                    child.style.animationDelay = `${i * delay}ms`;
                    child.classList.add('visible');
                });
                observer.unobserve(parent);
            }
        }, { threshold: 0.1 });
        observer.observe(parent);
    });
}

// Make all animated elements visible immediately (used for bfcache restore)
function makeAllVisible() {
    document.querySelectorAll(
        '.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .fade-in-down, [data-animate]'
    ).forEach(el => el.classList.add('visible'));
}

// ===== COOKIE CONSENT BANNER =====
function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner || localStorage.getItem('SNC_cookie_consent')) return;
    setTimeout(() => banner.classList.add('show'), 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initStaggeredAnimations();
    showCookieBanner();
});

// Restore all animations when page is served from bfcache
window.addEventListener('pageshow', (event) => {
    if (event.persisted) makeAllVisible();
});
