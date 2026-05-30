/**
 * Analytics & Event Tracking
 * Comprehensive user behavior tracking and analytics
 */

class AnalyticsTracker {
  constructor(config = {}) {
    this.config = {
      trackPageViews: true,
      trackClicks: true,
      trackScrollDepth: true,
      trackFormInteractions: true,
      trackVideoPlays: true,
      trackSearches: true,
      ...config
    };

    this.events = [];
    this.sessionStart = Date.now();
    this.scrollDepth = 0;
    this.init();
  }

  init() {
    if (this.config.trackPageViews) this.trackPageView();
    if (this.config.trackClicks) this.setupClickTracking();
    if (this.config.trackScrollDepth) this.setupScrollTracking();
    if (this.config.trackFormInteractions) this.setupFormTracking();
    if (this.config.trackVideoPlays) this.setupVideoTracking();
    if (this.config.trackSearches) this.setupSearchTracking();

    // Send events periodically
    this.startEventQueue();
  }

  /**
   * Track page view
   */
  trackPageView() {
    const pageView = {
      type: 'pageview',
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      title: document.title,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };

    this.queueEvent(pageView);
  }

  /**
   * Setup click tracking
   */
  setupClickTracking() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-track-click], a, button');
      if (!target) return;

      const event = {
        type: 'click',
        timestamp: new Date().toISOString(),
        element: {
          tag: target.tagName,
          id: target.id,
          class: target.className,
          text: target.textContent.substring(0, 50),
          href: target.href || null,
          dataAttributes: this.extractDataAttributes(target)
        }
      };

      this.queueEvent(event);
    });
  }

  /**
   * Setup scroll depth tracking
   */
  setupScrollTracking() {
    let trackingPoints = [25, 50, 75, 100];
    let trackedPoints = new Set();

    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollPercent = (scrollTop + windowHeight) / documentHeight * 100;

      trackingPoints.forEach(point => {
        if (scrollPercent >= point && !trackedPoints.has(point)) {
          trackedPoints.add(point);
          this.queueEvent({
            type: 'scroll_depth',
            timestamp: new Date().toISOString(),
            depth: point,
            content: `${point}% scroll depth reached`
          });
        }
      });
    }, { passive: true });
  }

  /**
   * Setup form interaction tracking
   */
  setupFormTracking() {
    document.addEventListener('focusin', (e) => {
      if (e.target.matches('input, textarea, select')) {
        this.queueEvent({
          type: 'form_interaction',
          timestamp: new Date().toISOString(),
          action: 'focus',
          fieldName: e.target.name,
          fieldType: e.target.type
        });
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.matches('input, textarea, select')) {
        this.queueEvent({
          type: 'form_interaction',
          timestamp: new Date().toISOString(),
          action: 'change',
          fieldName: e.target.name,
          fieldType: e.target.type
        });
      }
    });

    document.addEventListener('submit', (e) => {
      if (e.target.matches('form')) {
        this.queueEvent({
          type: 'form_submission',
          timestamp: new Date().toISOString(),
          formId: e.target.id,
          formName: e.target.name,
          fields: Array.from(e.target.elements)
            .filter(el => el.name)
            .map(el => ({
              name: el.name,
              type: el.type,
              filled: !!el.value
            }))
        });
      }
    });
  }

  /**
   * Setup video tracking
   */
  setupVideoTracking() {
    document.querySelectorAll('video').forEach(video => {
      video.addEventListener('play', () => {
        this.queueEvent({
          type: 'video_play',
          timestamp: new Date().toISOString(),
          videoSource: video.src || video.querySelector('source')?.src,
          duration: video.duration
        });
      });

      video.addEventListener('ended', () => {
        this.queueEvent({
          type: 'video_complete',
          timestamp: new Date().toISOString(),
          videoSource: video.src || video.querySelector('source')?.src
        });
      });
    });
  }

  /**
   * Setup search tracking
   */
  setupSearchTracking() {
    document.addEventListener('submit', (e) => {
      if (e.target.matches('form[data-track-search]')) {
        const searchInput = e.target.querySelector('input[type="search"], input[name="q"]');
        if (searchInput) {
          this.queueEvent({
            type: 'search',
            timestamp: new Date().toISOString(),
            query: searchInput.value,
            resultsCount: document.querySelectorAll('[data-search-result]').length
          });
        }
      }
    });
  }

  /**
   * Queue event for batch sending
   */
  queueEvent(event) {
    this.events.push(event);
  }

  /**
   * Send queued events
   */
  async sendEvents() {
    if (this.events.length === 0) return;

    const payload = {
      sessionId: this.getOrCreateSessionId(),
      events: this.events,
      timestamp: new Date().toISOString()
    };

    try {
      // Try to send to analytics endpoint
      const apiBase = (window.CONFIG?.API_URL || 'http://localhost:5000/api');
      await fetch(`${apiBase}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      });

      // Clear sent events
      this.events = [];
    } catch (error) {
      // Silently fail — analytics should never break the page
      this.events = [];
    }
  }

  /**
   * Start event queue processing
   */
  startEventQueue() {
    // Send events every 30 seconds or on page unload
    setInterval(() => this.sendEvents(), 30000);

    window.addEventListener('beforeunload', () => {
      this.sendEvents();
    });
  }

  /**
   * Get or create session ID
   */
  getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('analyticsSessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analyticsSessionId', sessionId);
    }
    return sessionId;
  }

  /**
   * Extract data attributes from element
   */
  extractDataAttributes(element) {
    const data = {};
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        data[attr.name] = attr.value;
      }
    });
    return data;
  }

  /**
   * Track custom event
   */
  trackEvent(eventType, data = {}) {
    this.queueEvent({
      type: eventType,
      timestamp: new Date().toISOString(),
      ...data
    });
  }

  /**
   * Get analytics summary
   */
  getAnalyticsSummary() {
    const sessionDuration = Date.now() - this.sessionStart;
    const eventTypes = {};

    this.events.forEach(event => {
      eventTypes[event.type] = (eventTypes[event.type] || 0) + 1;
    });

    return {
      sessionDuration: Math.round(sessionDuration / 1000),
      eventCount: this.events.length,
      eventTypes,
      page: window.location.pathname,
      scrollDepth: this.scrollDepth
    };
  }
}

// Initialize
const analyticsTracker = new AnalyticsTracker({
  trackPageViews: true,
  trackClicks: true,
  trackScrollDepth: true,
  trackFormInteractions: true,
  trackVideoPlays: true,
  trackSearches: true
});

window.analyticsTracker = analyticsTracker;
