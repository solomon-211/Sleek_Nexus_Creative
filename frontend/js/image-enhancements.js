/**
 * IMAGE ENHANCEMENTS
 * Lazy loading, lightbox, and performance optimizations
 */

// ===== LAZY LOADING FOR IMAGES =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ===== IMAGE LIGHTBOX =====
class ImageLightbox {
    constructor() {
        this.createLightbox();
        this.attachListeners();
    }
    
    createLightbox() {
        const lightboxHTML = `
            <div id="image-lightbox" class="lightbox">
                <span class="lightbox-close">&times;</span>
                <img class="lightbox-content" id="lightbox-img">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    attachListeners() {
        document.querySelectorAll('.project-image img, .blog-image img, .about-image img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => this.open(img));
        });
        
        document.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        document.getElementById('image-lightbox').addEventListener('click', (e) => {
            if (e.target.id === 'image-lightbox') this.close();
        });
    }
    
    open(img) {
        const lightbox = document.getElementById('image-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const caption = document.querySelector('.lightbox-caption');
        
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        caption.textContent = img.alt;
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        document.getElementById('image-lightbox').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== ANIMATED COUNTERS =====
function animateCounters() {
    const counters = document.querySelectorAll('.achievement-number, .stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
}

// ===== IMAGE HOVER ZOOM =====
function initImageZoom() {
    const projectCards = document.querySelectorAll('.project-card, .blog-card');
    
    projectCards.forEach(card => {
        const img = card.querySelector('img');
        if (!img) return;
        
        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    new ImageLightbox();
    animateCounters();
    initParallax();
    initImageZoom();
});
