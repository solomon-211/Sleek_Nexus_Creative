/**
 * Interactive Elements
 * Parallax scrolling, sliders, animated counters, before-after sliders
 */

class InteractiveElements {
  constructor() {
    this.init();
  }

  init() {
    this.setupParallax();
    this.setupSliders();
    this.setupCountingAnimations();
    this.setupBeforeAfterSlider();
    this.setupScrollReveal();
    this.setupProgressBars();
  }

  /**
   * Setup parallax scrolling effect
   */
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const rect = element.getBoundingClientRect();
        const scrollAmount = window.innerHeight - rect.top;
        
        element.style.transform = `translateY(${scrollAmount * speed * -1}px)`;
      });
    }, { passive: true });
  }

  /**
   * Setup image sliders / carousels
   */
  setupSliders() {
    document.querySelectorAll('[data-slider]').forEach(slider => {
      const track = slider.querySelector('.slider-track, [role="region"]');
      const slides = slider.querySelectorAll('.slider-slide, [role="group"]');
      const prevBtn = slider.querySelector('.slider-prev');
      const nextBtn = slider.querySelector('.slider-next');
      const dots = slider.querySelectorAll('.slider-dot, [data-slide-indicator]');

      let currentSlide = 0;

      const showSlide = (n) => {
        currentSlide = (n + slides.length) % slides.length;
        
        slides.forEach((slide, idx) => {
          slide.classList.toggle('active', idx === currentSlide);
          slide.setAttribute('aria-hidden', idx !== currentSlide);
        });

        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
          dot.setAttribute('aria-current', idx === currentSlide ? 'true' : 'false');
        });

        if (track) {
          track.scrollLeft = currentSlide * slides[0]?.offsetWidth || 0;
        }
      };

      prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));
      nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => showSlide(idx));
      });

      // Show first slide
      showSlide(0);

      // Auto-slide
      if (slider.dataset.autoSlide) {
        const interval = parseInt(slider.dataset.autoSlide) || 5000;
        setInterval(() => showSlide(currentSlide + 1), interval);
      }
    });
  }

  /**
   * Setup counting animations for stats
   */
  setupCountingAnimations() {
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.count) || parseInt(counter.textContent);
          const duration = parseInt(counter.dataset.duration) || 2000;
          const suffix = counter.dataset.suffix || '';
          const prefix = counter.dataset.prefix || '';

          this.animateCount(counter, 0, target, duration, suffix, prefix);
          observer.unobserve(counter);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-count], .counter').forEach(counter => {
      observer.observe(counter);
    });
  }

  /**
   * Animate counter
   */
  animateCount(element, from, to, duration, suffix = '', prefix = '') {
    const startTime = Date.now();
    const step = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const value = Math.floor(from + (to - from) * progress);
      
      element.textContent = prefix + value.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * Setup before-after slider
   */
  setupBeforeAfterSlider() {
    document.querySelectorAll('[data-before-after]').forEach(container => {
      const before = container.querySelector('.before, [data-before]');
      const after = container.querySelector('.after, [data-after]');
      const slider = container.querySelector('.slider-handle, [data-handle]');

      if (!before || !after || !slider) return;

      let isSliding = false;

      const updatePosition = (e) => {
        if (!isSliding) return;

        const rect = container.getBoundingClientRect();
        let x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        x = Math.max(0, Math.min(x, rect.width));

        const percentage = (x / rect.width) * 100;
        before.style.width = percentage + '%';
        slider.style.left = percentage + '%';

        e.preventDefault();
      };

      slider.addEventListener('mousedown', () => { isSliding = true; });
      slider.addEventListener('touchstart', () => { isSliding = true; });
      
      document.addEventListener('mousemove', updatePosition);
      document.addEventListener('touchmove', updatePosition, { passive: false });
      
      document.addEventListener('mouseup', () => { isSliding = false; });
      document.addEventListener('touchend', () => { isSliding = false; });

      // Initialize
      before.style.width = '50%';
      slider.style.left = '50%';
    });
  }

  /**
   * Setup scroll reveal animations
   */
  setupScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-reveal], .reveal').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Setup progress bars
   */
  setupProgressBars() {
    document.querySelectorAll('[data-progress], .progress-bar').forEach(bar => {
      const value = parseInt(bar.dataset.progress || bar.style.width);
      const target = bar.dataset.target || value;
      const duration = parseInt(bar.dataset.duration) || 1000;

      let current = 0;
      const increment = target / (duration / 16);

      const animate = () => {
        current += increment;
        if (current < target) {
          bar.style.width = current + '%';
          requestAnimationFrame(animate);
        } else {
          bar.style.width = target + '%';
        }
      };

      if (this.isElementVisible(bar)) {
        animate();
      } else {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(bar);
          }
        });
        observer.observe(bar);
      }
    });
  }

  /**
   * Check if element is visible
   */
  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const interactive = new InteractiveElements();
  window.interactive = interactive;
});

// Add interactive element styles
(function () {
  const s = document.createElement('style');
  s.textContent = `
  /* Parallax Elements */
  [data-parallax] {
    will-change: transform;
  }

  /* Sliders */
  [data-slider] {
    position: relative;
    overflow: hidden;
  }

  .slider-track, [role="region"] {
    display: flex;
    scroll-behavior: smooth;
  }

  .slider-slide, [role="group"] {
    min-width: 100%;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  .slider-slide.active, [role="group"].active {
    opacity: 1;
  }

  .slider-prev, .slider-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
    transition: 0.3s;
  }

  .slider-prev:hover, .slider-next:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .slider-prev {
    left: 10px;
  }

  .slider-next {
    right: 10px;
  }

  .slider-dot, [data-slide-indicator] {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    margin: 0 6px;
    cursor: pointer;
    transition: 0.3s;
  }

  .slider-dot.active, [data-slide-indicator].active {
    background: rgba(0, 0, 0, 0.8);
  }

  /* Before-After Slider */
  [data-before-after] {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }

  [data-before-after] .before,
  [data-before-after] [data-before] {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
  }

  [data-before-after] .after,
  [data-before-after] [data-after] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  [data-before-after] .slider-handle,
  [data-before-after] [data-handle] {
    position: absolute;
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    background: white;
    z-index: 5;
    cursor: ew-resize;
    transform: translateX(-50%);
  }

  /* Scroll Reveal */
  [data-reveal], .reveal {
    opacity: 0;
    transform: translateY(30px);
  }

  [data-reveal].revealed, .reveal.revealed {
    animation: revealUp 0.6s ease-out forwards;
  }

  @keyframes revealUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Progress Bars */
  [data-progress], .progress-bar {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
    width: 0%;
    transition: width 0.3s ease;
  }

  [data-progress]::after, .progress-bar::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #4a90e2, #357abd);
  }

  /* Reduce motion support */
  @media (prefers-reduced-motion: reduce) {
    [data-parallax],
    .slider-slide,
    [data-reveal],
    [data-progress] {
      transition: none;
      animation: none;
    }

    [data-parallax] {
      will-change: auto;
    }
  }
`;
  document.head.appendChild(s);
})();
