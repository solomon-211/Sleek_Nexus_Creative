/**
 * ============================================
 * Sleek Nexus Creative - MAIN JAVASCRIPT FILE
 * ============================================
 * 
 * This file handles core functionality for the website including:
 * - Mobile navigation menu toggle
 * - Smooth scrolling for anchor links
 * - Navbar scroll effects
 * - Scroll-triggered animations
 * 
 * @author Sleek Nexus Creative Team
 * @version 1.0.0
 */

// ===== MOBILE MENU TOGGLE =====
// Handles hamburger menu click and navigation visibility on mobile devices
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navSpecial = document.querySelector('.nav-special');

// Toggle mobile menu when hamburger is clicked
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        // Toggle active class on main navigation
        navMenu.classList.toggle('active');
        // Toggle active class on special navigation (Partner/Donate)
        if (navSpecial) navSpecial.classList.toggle('active');
        // Animate hamburger icon
        hamburger.classList.toggle('active');
        // Update aria-expanded for accessibility
        const expanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', expanded);
    });

    // Close mobile menu when any navigation link is clicked
    document.querySelectorAll('.nav-menu a, .nav-special a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navSpecial) navSpecial.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== SMOOTH SCROLLING =====
// Enables smooth scrolling for all anchor links on the page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Scroll to target element smoothly
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
// Adds enhanced shadow to navbar when user scrolls down
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Increase shadow depth after scrolling 50px
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // ===== COOKIE CONSENT HANDLERS =====
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    const cookieDeclineBtn = document.getElementById('cookie-decline-btn');
    if (cookieAcceptBtn) cookieAcceptBtn.addEventListener('click', acceptCookies);
    if (cookieDeclineBtn) cookieDeclineBtn.addEventListener('click', declineCookies);
});

// Handle bfcache restore (browser back/forward) - force all animated elements visible
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.querySelectorAll(
            '.fade-in, .fade-in-left, .fade-in-right, .service-card, .project-card, .testimonial-card'
        ).forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.classList.add('visible');
        });
    }
});

// ===== COOKIE CONSENT FUNCTIONS =====
function acceptCookies() {
    localStorage.setItem('SNC_cookie_consent', 'accepted');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'none';
    }
    // Load analytics if function exists
    if (window.loadAnalytics) {
        window.loadAnalytics();
    }
}

function declineCookies() {
    localStorage.setItem('SNC_cookie_consent', 'declined');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'none';
    }
}
