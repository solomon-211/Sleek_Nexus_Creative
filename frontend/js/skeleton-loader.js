/**
 * Loading Skeletons & Placeholder States
 * Improves perceived performance with skeleton screens
 */

class SkeletonLoader {
  constructor() {
    this.skeletons = new Map();
    this.init();
  }

  init() {
    this.createSkeletonStyles();
  }

  /**
   * Create skeleton screen for content
   * @param {string} elementSelector - Target element selector
   * @param {string} type - 'text', 'image', 'card', 'list', 'form'
   * @param {number} count - Number of skeleton items
   */
  createSkeleton(elementSelector, type = 'content', count = 1) {
    const element = document.querySelector(elementSelector);
    if (!element) return;

    const skeletonHTML = this.generateSkeleton(type, count);
    element.innerHTML = skeletonHTML;
    element.classList.add('skeleton-loading');

    this.skeletons.set(elementSelector, { type, count, element });
  }

  /**
   * Generate skeleton markup based on type
   */
  generateSkeleton(type, count) {
    const skeletons = [];

    for (let i = 0; i < count; i++) {
      switch (type) {
        case 'image':
          skeletons.push(`
            <div class="skeleton skeleton-image" aria-hidden="true"></div>
          `);
          break;
        case 'card':
          skeletons.push(`
            <div class="skeleton-card" aria-hidden="true">
              <div class="skeleton skeleton-image-lg"></div>
              <div class="skeleton-content">
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text skeleton-text-sm"></div>
              </div>
            </div>
          `);
          break;
        case 'text':
          skeletons.push(`
            <div class="skeleton skeleton-text" aria-hidden="true"></div>
            <div class="skeleton skeleton-text skeleton-text-sm" aria-hidden="true"></div>
          `);
          break;
        case 'list':
          skeletons.push(`
            <div class="skeleton-list-item" aria-hidden="true">
              <div class="skeleton skeleton-avatar"></div>
              <div class="skeleton-content">
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text skeleton-text-sm"></div>
              </div>
            </div>
          `);
          break;
        case 'form':
          skeletons.push(`
            <div class="skeleton-form-group" aria-hidden="true">
              <div class="skeleton skeleton-text skeleton-text-xs"></div>
              <div class="skeleton skeleton-input"></div>
            </div>
          `);
          break;
        default:
          skeletons.push(`
            <div class="skeleton skeleton-text" aria-hidden="true"></div>
          `);
      }
    }

    return skeletons.join('');
  }

  /**
   * Remove skeleton and show actual content
   */
  hideSkeleton(elementSelector) {
    const element = document.querySelector(elementSelector);
    if (element) {
      element.classList.remove('skeleton-loading');
      element.classList.add('content-loaded');
    }
    this.skeletons.delete(elementSelector);
  }

  /**
   * Create skeleton styles
   */
  createSkeletonStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Skeleton Base Styles */
      .skeleton {
        background: linear-gradient(
          90deg,
          #f0f0f0 0%,
          #e0e0e0 50%,
          #f0f0f0 100%
        );
        background-size: 200% 100%;
        animation: skeleton-shimmer 2s infinite;
        border-radius: 4px;
      }

      .skeleton-loading {
        pointer-events: none;
      }

      @keyframes skeleton-shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      /* Specific skeleton types */
      .skeleton-text {
        height: 16px;
        margin-bottom: 8px;
        border-radius: 4px;
        width: 100%;
      }

      .skeleton-text-xs {
        height: 12px;
        width: 60%;
      }

      .skeleton-text-sm {
        height: 14px;
        width: 80%;
        margin-top: -4px;
      }

      .skeleton-image {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 8px;
        margin-bottom: 12px;
      }

      .skeleton-image-lg {
        width: 100%;
        aspect-ratio: 1;
        border-radius: 8px;
        margin-bottom: 16px;
      }

      .skeleton-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .skeleton-input {
        height: 40px;
        width: 100%;
        border-radius: 4px;
        margin-bottom: 16px;
      }

      /* Skeleton Card */
      .skeleton-card {
        background: #fff;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .skeleton-content {
        padding: 8px 0;
      }

      /* Skeleton List Item */
      .skeleton-list-item {
        display: flex;
        gap: 12px;
        padding: 12px;
        margin-bottom: 8px;
        border-radius: 8px;
      }

      .skeleton-list-item .skeleton-content {
        flex: 1;
      }

      /* Skeleton Form Group */
      .skeleton-form-group {
        margin-bottom: 20px;
      }

      /* Content Loaded Animation */
      .content-loaded {
        animation: contentFadeIn 0.3s ease-in;
      }

      @keyframes contentFadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Dark Mode Support */
      @media (prefers-color-scheme: dark) {
        .skeleton {
          background: linear-gradient(
            90deg,
            #333 0%,
            #444 50%,
            #333 100%
          );
        }
      }

      /* Accessibility - Reduce Motion */
      @media (prefers-reduced-motion: reduce) {
        .skeleton {
          animation: none;
          background: #e0e0e0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize
const skeletonLoader = new SkeletonLoader();
window.skeletonLoader = skeletonLoader;
