/**
 * Lazy Loading Module
 * Implements intersection observer for images and content
 * Reduces initial page load time and improves performance
 */

class LazyLoader {
  constructor(options = {}) {
    this.options = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '50px',
      ...options
    };
    
    this.imageObserver = null;
    this.contentObserver = null;
    this.init();
  }

  init() {
    // Initialize intersection observers
    this.imageObserver = new IntersectionObserver(
      (entries) => this.loadImages(entries),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin
      }
    );

    this.contentObserver = new IntersectionObserver(
      (entries) => this.loadContent(entries),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin
      }
    );

    this.observeImages();
    this.observeContent();
    this.setupImageOptimization();
  }

  observeImages() {
    // Lazy load all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      this.imageObserver.observe(img);
      // Placeholder blur effect
      if (!img.src) {
        img.style.backgroundColor = '#f0f0f0';
      }
    });
  }

  observeContent() {
    // Lazy load content sections with data-lazy attribute
    const lazyElements = document.querySelectorAll('[data-lazy]');
    lazyElements.forEach(el => {
      this.contentObserver.observe(el);
    });
  }

  loadImages(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const dataSrc = img.dataset.src;
        
        if (dataSrc) {
          // Create new image to preload
          const newImg = new Image();
          
          newImg.onload = () => {
            img.src = dataSrc;
            img.classList.add('lazy-loaded');
            this.imageObserver.unobserve(img);
          };
          
          newImg.onerror = () => {
            // Fallback: show placeholder or default image
            img.src = img.dataset.fallback || 'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22400%22%20height=%22300%22%3E%3Crect%20fill=%22%23ddd%22%20width=%22400%22%20height=%22300%22/%3E%3Ctext%20x=%2250%25%22%20y=%2250%25%22%20text-anchor=%22middle%22%20dy=%22.3em%22%20fill=%22%23999%22%3EImage%20Not%20Available%3C/text%3E%3C/svg%3E';
            this.imageObserver.unobserve(img);
          };
          
          newImg.src = dataSrc;
        }
      }
    });
  }

  loadContent(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('content-loaded');
        el.style.animation = 'fadeIn 0.5s ease-in';
        this.contentObserver.unobserve(el);
      }
    });
  }

  setupImageOptimization() {
    // Add WebP support with fallback
    const images = document.querySelectorAll('img[data-webp]');
    images.forEach(img => {
      const webpSrc = img.dataset.webp;
      
      // Check WebP support
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      
      if (canvas.toDataURL('image/webp').indexOf('image/webp') === 0) {
        img.dataset.src = webpSrc;
      }
    });
  }

  /**
   * Preload critical images
   * @param {string[]} imageSrcs - Array of image sources
   */
  preloadImages(imageSrcs = []) {
    imageSrcs.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  /**
   * Enable lazy loading for dynamically added images
   */
  observeDynamicImages() {
    const observer = new MutationObserver(() => {
      const newImages = document.querySelectorAll('img[data-src]:not(.lazy-loaded)');
      newImages.forEach(img => {
        if (!this.imageObserver.hasOwnProperty(img)) {
          this.imageObserver.observe(img);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const lazyLoader = new LazyLoader({
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  // Store globally for dynamic usage
  window.lazyLoader = lazyLoader;
});

// CSS for lazy loading animations
(function () {
  const s = document.createElement('style');
  s.textContent = `
  img[data-src] {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  img.lazy-loaded {
    animation: fadeIn 0.5s ease-in;
    background: none !important;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  [data-lazy] { opacity: 0; }
  [data-lazy].content-loaded { animation: fadeIn 0.5s ease-in forwards; }
`;
  document.head.appendChild(s);
})();
