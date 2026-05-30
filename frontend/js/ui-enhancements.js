/**
 * PROFESSIONAL UI ENHANCEMENTS
 * Loading states, toast notifications, breadcrumbs, sticky CTA
 */

// ===== PAGE LOADER =====
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 300);
        }, 200);
    }
});

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== SMOOTH SCROLL TO TOP =====
if (!window.backToTopInitialized) {
    window.backToTopInitialized = true;
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ===== FORM VALIDATION ENHANCEMENT =====
document.querySelectorAll('input[required], textarea[required]').forEach(field => {
    field.addEventListener('blur', () => {
        if (field.value.trim()) {
            field.classList.add('valid');
            field.classList.remove('invalid');
        } else {
            field.classList.add('invalid');
            field.classList.remove('valid');
        }
    });
    
    field.addEventListener('input', () => {
        field.classList.remove('invalid');
    });
});

// ===== EMAIL VALIDATION =====
document.querySelectorAll('input[type="email"]').forEach(field => {
    field.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(field.value)) {
            field.classList.add('valid');
            field.classList.remove('invalid');
        } else if (field.value) {
            field.classList.add('invalid');
            field.classList.remove('valid');
        }
    });
});

// ===== PHONE VALIDATION =====
document.querySelectorAll('input[type="tel"]').forEach(field => {
    field.addEventListener('blur', () => {
        const phoneRegex = /^\+?[\d\s-()]+$/;
        if (phoneRegex.test(field.value) && field.value.length >= 10) {
            field.classList.add('valid');
            field.classList.remove('invalid');
        } else if (field.value) {
            field.classList.add('invalid');
            field.classList.remove('valid');
        }
    });
});

// ===== FORM SUBMISSION LOADING STATE =====
// Only applies to forms not already handled by dedicated modules
document.querySelectorAll('form:not([data-handled])').forEach(form => {
    form.addEventListener('submit', () => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn && !submitBtn.disabled) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = submitBtn.dataset.originalText;
            }, 5000);
        }
    });
});

// ===== READING PROGRESS BAR =====
if (document.querySelector('.blog-post-single')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== STICKY HEADER BEHAVIOR =====
(function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    }, { passive: true });
})();

// ===== NAV SCROLL PROGRESS LINE =====
(function () {
    const line = document.getElementById('navProgressLine');
    if (!line) return;
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        line.style.width = Math.min(scrolled, 100) + '%';
    }, { passive: true });
})();

// ===== EXTERNAL LINKS =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===== INITIALIZE ON DOM LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Store original button text
    document.querySelectorAll('button[type="submit"]').forEach(btn => {
        btn.dataset.originalText = btn.innerHTML;
    });
});

// Export for use in other scripts
window.showToast = showToast;
window.copyToClipboard = copyToClipboard;


// ===== SEARCH FUNCTIONALITY =====
const searchData = [
    { title: 'Software Development', type: 'Service', desc: 'Custom software solutions', url: 'services.html#software-dev' },
    { title: 'Web & Mobile Apps', type: 'Service', desc: 'Responsive websites and mobile applications', url: 'services.html#web-mobile' },
    { title: 'Educational Technology', type: 'Service', desc: 'Learning management systems', url: 'services.html#edtech' },
    { title: 'IT Consulting', type: 'Service', desc: 'Strategic technology guidance', url: 'services.html#consulting' },
    { title: 'E-Learning Platform', type: 'Project', desc: 'Online learning system for 10,000+ students', url: 'projects.html#project1' },
    { title: 'Business Management System', type: 'Project', desc: 'Streamlined operations for enterprises', url: 'projects.html#project2' },
    { title: 'Mobile Banking App', type: 'Project', desc: 'Secure financial services', url: 'projects.html#project3' },
    { title: 'Full-Stack Web Development', type: 'Course', desc: 'Master frontend and backend development', url: 'courses.html' },
    { title: 'Mobile App Development', type: 'Course', desc: 'Build cross-platform mobile apps', url: 'courses.html' },
    { title: 'About Us', type: 'Page', desc: 'Learn about our mission and team', url: 'about.html' },
    { title: 'Contact Us', type: 'Page', desc: 'Get in touch with our team', url: 'contact.html' },
    { title: 'Blog', type: 'Page', desc: 'Tech insights and tutorials', url: 'blog.html' }
];

const searchToggle = document.querySelector('.search-toggle');
const searchOverlay = document.querySelector('.search-overlay');
const searchClose = document.querySelector('.search-close');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });
}

if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.classList.remove('show');
    });
}

if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.classList.remove('show');
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.desc.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        );
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(item => `
                <div class="search-result-item" onclick="window.location.href='${item.url}'">
                    <div class="search-result-type">${item.type}</div>
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-desc">${item.desc}</div>
                </div>
            `).join('');
            searchResults.classList.add('show');
        } else {
            searchResults.innerHTML = '<div class="search-no-results">No results found. Try different keywords.</div>';
            searchResults.classList.add('show');
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.classList.remove('show');
        }
    });
}
