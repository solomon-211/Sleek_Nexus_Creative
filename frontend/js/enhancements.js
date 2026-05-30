// Animated Counter for Stats
const initCounters = () => {
    // Support both data-target (legacy) and data-count
    const statNumbers = document.querySelectorAll('.stat-number, [data-target]');
    if (statNumbers.length === 0) return;

    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target || element.dataset.count || 0);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
};

// Initialize counters on page load
document.addEventListener('DOMContentLoaded', initCounters);
initCounters();

// FAQ Accordion
const initFAQ = () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        if (question.dataset.faqBound === 'true') return;
        question.dataset.faqBound = 'true';

        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                if (q.nextElementSibling) {
                    q.nextElementSibling.classList.remove('active');
                }
            });

            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                question.classList.add('active');
                if (answer) {
                    answer.classList.add('active');
                }
            }
        });
    });
};

// Initialize FAQ on page load and after DOM is ready
document.addEventListener('DOMContentLoaded', initFAQ);

// Newsletter Form
const initNewsletter = () => {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm) {
        if (newsletterForm.dataset.newsletterBound === 'true') return;
        newsletterForm.dataset.newsletterBound = 'true';

        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            
            try {
                const apiBase = window.CONFIG?.API_URL || `${window.location.origin}/api`;
                const response = await fetch(`${apiBase}/newsletter/subscribe`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    newsletterMessage.style.display = 'block';
                    newsletterMessage.textContent = 'Thank you for subscribing! Check your email for confirmation.';
                    newsletterMessage.className = 'newsletter-message success';
                    emailInput.value = '';
                } else {
                    newsletterMessage.style.display = 'block';
                    newsletterMessage.textContent = data.message || 'Subscription failed. Please try again.';
                    newsletterMessage.className = 'newsletter-message error';
                }
            } catch (error) {
                newsletterMessage.style.display = 'block';
                newsletterMessage.textContent = 'Network error. Please check your connection and try again.';
                newsletterMessage.className = 'newsletter-message error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
                
                setTimeout(() => {
                    newsletterMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
};

// Initialize newsletter on page load
document.addEventListener('DOMContentLoaded', initNewsletter);

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach(el => el.classList.remove('active'));
    }
});

// Smooth Scroll for All Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
