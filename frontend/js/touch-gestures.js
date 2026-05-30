/**
 * Touch & Swipe Gesture Handling
 * Enhance mobile UX with touch-friendly interactions
 */

class TouchGestureManager {
  constructor() {
    this.touchStart = null;
    this.touchEnd = null;
    this.minSwipeDistance = 50;
    this.init();
  }

  init() {
    this.setupSwipeGestures();
    this.setupTouchFriendly();
    this.setupLongPress();
    this.setupPinchZoom();
  }

  /**
   * Setup swipe gesture handling
   */
  setupSwipeGestures() {
    document.addEventListener('touchstart', (e) => {
      this.touchStart = e.changedTouches[0];
    }, false);

    document.addEventListener('touchend', (e) => {
      this.touchEnd = e.changedTouches[0];
      this.handleSwipe(e);
    }, false);
  }

  /**
   * Handle swipe gestures
   */
  handleSwipe(e) {
    if (!this.touchStart || !this.touchEnd) return;

    const diffX = this.touchStart.clientX - this.touchEnd.clientX;
    const diffY = this.touchStart.clientY - this.touchEnd.clientY;

    // Determine swipe direction
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > this.minSwipeDistance) {
        this.triggerSwipeEvent(e.target, 'swipeleft');
      } else if (diffX < -this.minSwipeDistance) {
        this.triggerSwipeEvent(e.target, 'swiperight');
      }
    } else {
      // Vertical swipe
      if (diffY > this.minSwipeDistance) {
        this.triggerSwipeEvent(e.target, 'swipeup');
      } else if (diffY < -this.minSwipeDistance) {
        this.triggerSwipeEvent(e.target, 'swipedown');
      }
    }

    this.touchStart = null;
    this.touchEnd = null;
  }

  /**
   * Trigger swipe event on element
   */
  triggerSwipeEvent(element, direction) {
    const carousel = element.closest('[data-carousel], .carousel, [data-swipe]');
    if (!carousel) return;

    const event = new CustomEvent(`swipe:${direction}`, {
      detail: { direction, element: carousel }
    });
    carousel.dispatchEvent(event);

    // Handle carousel navigation
    if (direction === 'swipeleft') {
      this.nextCarouselItem(carousel);
    } else if (direction === 'swiperight') {
      this.prevCarouselItem(carousel);
    }
  }

  /**
   * Navigate to next carousel item
   */
  nextCarouselItem(carousel) {
    const items = carousel.querySelectorAll('[data-carousel-item], .carousel-item, [role="group"]');
    const active = carousel.querySelector('[data-carousel-item].active, .carousel-item.active, [role="group"].active');
    
    if (!active) {
      items[0]?.classList.add('active');
      return;
    }

    const currentIndex = Array.from(items).indexOf(active);
    const nextIndex = (currentIndex + 1) % items.length;

    active.classList.remove('active');
    items[nextIndex].classList.add('active');

    this.updateCarouselDisplay(carousel, nextIndex);
  }

  /**
   * Navigate to previous carousel item
   */
  prevCarouselItem(carousel) {
    const items = carousel.querySelectorAll('[data-carousel-item], .carousel-item, [role="group"]');
    const active = carousel.querySelector('[data-carousel-item].active, .carousel-item.active, [role="group"].active');
    
    if (!active) {
      items[items.length - 1]?.classList.add('active');
      return;
    }

    const currentIndex = Array.from(items).indexOf(active);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;

    active.classList.remove('active');
    items[prevIndex].classList.add('active');

    this.updateCarouselDisplay(carousel, prevIndex);
  }

  /**
   * Update carousel display
   */
  updateCarouselDisplay(carousel, index) {
    const scrollContainer = carousel.querySelector('.carousel-track, [role="region"]');
    if (scrollContainer) {
      const itemWidth = carousel.querySelector('[data-carousel-item], .carousel-item')?.offsetWidth;
      if (itemWidth) {
        scrollContainer.scrollLeft = index * itemWidth;
      }
    }

    // Update pagination indicators
    const indicators = carousel.querySelectorAll('[data-carousel-indicator], .carousel-dot');
    indicators.forEach((indicator, idx) => {
      if (idx === index) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Setup touch-friendly areas
   */
  setupTouchFriendly() {
    // Increase minimum touch target size to 48x48px
    document.querySelectorAll('button, a, input[type="checkbox"], input[type="radio"]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 48 || rect.height < 48) {
        el.style.minWidth = '48px';
        el.style.minHeight = '48px';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
      }
    });

    // Add visual feedback for touch
    document.addEventListener('touchstart', (e) => {
      const target = e.target.closest('button, a, input');
      if (target) {
        target.classList.add('touch-active');
      }
    });

    document.addEventListener('touchend', (e) => {
      const target = e.target.closest('button, a, input');
      if (target) {
        target.classList.remove('touch-active');
      }
    });
  }

  /**
   * Setup long press detection
   */
  setupLongPress() {
    let longPressTimer;
    const longPressDuration = 500;

    document.addEventListener('touchstart', (e) => {
      const target = e.target.closest('[data-long-press]');
      if (!target) return;

      longPressTimer = setTimeout(() => {
        const event = new CustomEvent('longpress', {
          detail: { target, touch: e.touches[0] }
        });
        target.dispatchEvent(event);
        target.classList.add('long-pressed');
      }, longPressDuration);
    });

    document.addEventListener('touchend', () => {
      clearTimeout(longPressTimer);
      const longPressed = document.querySelector('.long-pressed');
      if (longPressed) longPressed.classList.remove('long-pressed');
    });

    document.addEventListener('touchmove', () => {
      clearTimeout(longPressTimer);
    });
  }

  /**
   * Setup pinch zoom control
   */
  setupPinchZoom() {
    let lastDistance = 0;

    document.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 2) return;

      const x1 = e.touches[0].clientX;
      const y1 = e.touches[0].clientY;
      const x2 = e.touches[1].clientX;
      const y2 = e.touches[1].clientY;

      const distance = Math.hypot(x2 - x1, y2 - y1);

      if (lastDistance > 0) {
        const delta = distance - lastDistance;
        const scale = 1 + (delta / 100);

        // Allow pinch zoom on designated elements only
        const pinchTarget = e.target.closest('[data-pinch-zoom]');
        if (pinchTarget) {
          const currentScale = parseFloat(pinchTarget.style.transform?.match(/scale\(([\d.]+)\)/)?.[1] || 1);
          const newScale = Math.max(1, Math.min(3, currentScale * scale));
          pinchTarget.style.transform = `scale(${newScale})`;
        }
      }

      lastDistance = distance;
    }, { passive: true });

    document.addEventListener('touchend', () => {
      lastDistance = 0;
    });
  }
}

// Initialize
const touchGestureManager = new TouchGestureManager();
window.touchGestureManager = touchGestureManager;

// Add touch gesture styles
(function () {
  const s = document.createElement('style');
  s.textContent = `
  .touch-active { opacity: 0.8; transform: scale(0.98); }
  [data-long-press] { transition: opacity 0.2s ease; }
  [data-long-press].long-pressed { opacity: 0.7; }
  [data-carousel], .carousel { overflow: hidden; }
  [data-carousel-item], .carousel-item { transition: opacity 0.3s ease; }
  [data-carousel-item].active, .carousel-item.active { opacity: 1; }
  [data-carousel-item]:not(.active), .carousel-item:not(.active) { opacity: 0; position: absolute; pointer-events: none; }
  .carousel-track, [role="region"] { scroll-behavior: smooth; scroll-snap-type: x mandatory; }
  [data-carousel-item], .carousel-item { scroll-snap-align: center; }
  [data-pinch-zoom] { transform-origin: center; transition: transform 0.1s ease-out; }
  @media (prefers-reduced-motion: reduce) {
    [data-carousel-item], .carousel-item { transition: none; }
    .carousel-track, [role="region"] { scroll-behavior: auto; }
    .touch-active { transform: none; }
    [data-pinch-zoom] { transition: none; }
  }
  @media (max-width: 768px) {
    button, a, input[type="checkbox"], input[type="radio"] { min-height: 44px; min-width: 44px; }
  }
`;
  document.head.appendChild(s);
})();
