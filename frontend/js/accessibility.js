/**
 * Accessibility Enhancement Module
 * WCAG 2.1 AA compliance improvements
 * - Skip links, keyboard navigation, ARIA labels
 */

class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.addSkipLinks();
    this.enhanceKeyboardNavigation();
    this.addAriaLabels();
    this.improveFormAccessibility();
    this.addFocusManagement();
  }

  /**
   * Add skip links for keyboard navigation
   */
  addSkipLinks() {
    const skipLinksHTML = `
      <div class="skip-links">
        <a href="#main-content" class="skip-link">Skip to main content</a>
        <a href="#navigation" class="skip-link">Skip to navigation</a>
        <a href="#footer" class="skip-link">Skip to footer</a>
      </div>
    `;
    
    const body = document.body;
    const firstElement = body.firstChild;
    const container = document.createElement('div');
    container.innerHTML = skipLinksHTML;
    body.insertBefore(container.firstChild, firstElement);
  }

  /**
   * Add comprehensive ARIA labels
   */
  addAriaLabels() {
    // Button labels
    document.querySelectorAll('button:not([aria-label])').forEach(btn => {
      if (!btn.textContent.trim()) {
        const icon = btn.querySelector('[class*="fa-"]');
        if (icon) {
          const ariaLabel = this.getIconAriaLabel(icon);
          btn.setAttribute('aria-label', ariaLabel);
        }
      }
    });

    // Link labels
    document.querySelectorAll('a[href^="#"]:not([aria-label])').forEach(link => {
      if (!link.textContent.trim()) {
        link.setAttribute('aria-label', `Navigate to ${link.href.slice(1)}`);
      }
    });

    // Form fields
    document.querySelectorAll('input:not([aria-label]):not([aria-describedby])').forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label) {
        input.setAttribute('aria-label', input.placeholder || input.name || 'Form field');
      }
    });

    // Form containers
    document.querySelectorAll('form:not([role])').forEach(form => {
      form.setAttribute('role', 'form');
    });

    // Navigation
    document.querySelectorAll('nav:not([aria-label])').forEach((nav, idx) => {
      nav.setAttribute('aria-label', `Navigation ${idx > 0 ? idx + 1 : ''}`);
    });

    // Headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      if (!heading.id) {
        heading.id = `heading-${Math.random().toString(36).substr(2, 9)}`;
      }
    });
  }

  /**
   * Get aria label from icon class
   */
  getIconAriaLabel(icon) {
    const classList = Array.from(icon.classList);
    const iconClass = classList.find(cls => cls.startsWith('fa-'));
    if (iconClass) {
      return iconClass.replace('fa-', '').replace(/-/g, ' ');
    }
    return 'Icon button';
  }

  /**
   * Enhance keyboard navigation
   */
  enhanceKeyboardNavigation() {
    // Trap focus in modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"].active, .modal.active');
        if (modal) {
          modal.classList.remove('active');
          e.preventDefault();
        }
      }

      // Tab key handling
      if (e.key === 'Tab') {
        this.handleTabTrapping(e);
      }
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Alt + S = Skip to main
      if (e.altKey && e.key === 's') {
        document.querySelector('#main-content')?.focus();
      }
      // Alt + N = Skip to nav
      if (e.altKey && e.key === 'n') {
        document.querySelector('nav')?.focus();
      }
    });

    // Make all interactive elements keyboard accessible
    this.makeInteractiveElementsKeyboardAccessible();
  }

  /**
   * Make interactive divs/spans keyboard accessible
   */
  makeInteractiveElementsKeyboardAccessible() {
    document.querySelectorAll('[onclick], .clickable, [data-action]').forEach(el => {
      if (!['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
        if (!el.hasAttribute('tabindex')) {
          el.setAttribute('tabindex', '0');
          el.setAttribute('role', 'button');
        }

        // Add Enter/Space key support
        if (!el.dataset.keyboardSetup) {
          el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              el.click();
            }
          });
          el.dataset.keyboardSetup = 'true';
        }
      }
    });
  }

  /**
   * Improve form accessibility
   */
  improveFormAccessibility() {
    document.querySelectorAll('form').forEach(form => {
      // Add aria-required to required fields
      form.querySelectorAll('[required]').forEach(field => {
        field.setAttribute('aria-required', 'true');
      });

      // Add error announcements
      form.querySelectorAll('[aria-invalid]').forEach(field => {
        const errorId = `error-${field.id || Math.random().toString(36).substr(2, 9)}`;
        if (!field.getAttribute('aria-describedby')) {
          field.setAttribute('aria-describedby', errorId);
        }
      });

      // Form field groups
      form.querySelectorAll('.form-group, .input-group').forEach(group => {
        const legend = group.querySelector('legend');
        if (legend && !group.getAttribute('role')) {
          group.setAttribute('role', 'group');
          group.setAttribute('aria-labelledby', legend.id || `legend-${Math.random().toString(36).substr(2, 9)}`);
        }
      });
    });
  }

  /**
   * Add focus management
   */
  addFocusManagement() {
    // Visible focus styles
    const style = document.createElement('style');
    style.textContent = `
      :focus {
        outline: 3px solid #4a90e2;
        outline-offset: 2px;
      }

      :focus:not(:focus-visible) {
        outline: none;
      }

      :focus-visible {
        outline: 3px solid #4a90e2;
        outline-offset: 2px;
      }

      button:focus-visible,
      a:focus-visible,
      input:focus-visible,
      textarea:focus-visible,
      select:focus-visible {
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.25);
      }

      .skip-links {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        padding: 8px;
        z-index: 100;
      }

      .skip-link {
        display: inline-block;
        color: #fff;
        margin: 0 10px;
        text-decoration: underline;
      }

      .skip-link:focus {
        top: 0;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Handle tab trapping in modals
   */
  handleTabTrapping(e) {
    const modal = document.querySelector('[role="dialog"].active, .modal.active');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  /**
   * Test color contrast ratio
   */
  testContrast(element) {
    const style = window.getComputedStyle(element);
    const bgColor = style.backgroundColor;
    const fgColor = style.color;
    
    // Calculate luminance
    const getLuminance = (color) => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return 0;
      const [r, g, b] = rgb.map(x => {
        const c = parseInt(x) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(bgColor);
    const l2 = getLuminance(fgColor);
    const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      ratio: contrast.toFixed(2),
      isAACompliant: contrast >= 4.5,
      isAAACompliant: contrast >= 7
    };
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const a11y = new AccessibilityManager();
  window.a11y = a11y;
});
