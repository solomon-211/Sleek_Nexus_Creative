/**
 * Real-Time Features & Live Updates
 * WebSocket integration, live counters, animated stats
 */

class RealTimeManager {
  constructor(config = {}) {
    this.config = {
      wsUrl: config.wsUrl || `ws://${window.location.host}`,
      enableLiveCounters: true,
      enableNotifications: true,
      ...config
    };

    this.ws = null;
    this.counters = new Map();
    this.init();
  }

  init() {
    this.connectWebSocket();
    this.setupLiveCounters();
    this.setupNotifications();
  }

  /**
   * Connect to WebSocket server
   */
  connectWebSocket() {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = this.config.wsUrl.replace(/^(wss?:|https?:)\/\//, protocol + '//');
      
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.broadcastMessage('user:connected', { timestamp: Date.now() });
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected, attempting reconnect...');
        setTimeout(() => this.connectWebSocket(), 3000);
      };
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  }

  /**
   * Handle incoming WebSocket messages
   */
  handleMessage(data) {
    const { type, payload } = data;

    switch (type) {
      case 'counter:update':
        this.updateCounter(payload);
        break;
      case 'notification:new':
        this.showNotification(payload);
        break;
      case 'stats:update':
        this.updateStats(payload);
        break;
      default:
        console.log('Unknown message type:', type);
    }
  }

  /**
   * Setup live counters
   */
  setupLiveCounters() {
    document.querySelectorAll('[data-counter]').forEach(counter => {
      const name = counter.dataset.counter;
      const initial = parseInt(counter.textContent) || 0;

      this.counters.set(name, {
        element: counter,
        current: initial,
        target: initial
      });

      counter.addEventListener('animationend', () => {
        counter.classList.remove('counter-update');
      });
    });
  }

  /**
   * Update counter with animation
   */
  updateCounter(data) {
    const { name, value, delta } = data;
    
    if (!this.counters.has(name)) {
      const element = document.querySelector(`[data-counter="${name}"]`);
      if (!element) return;

      this.counters.set(name, {
        element,
        current: value,
        target: value
      });
    }

    const counter = this.counters.get(name);
    const newValue = delta ? counter.current + delta : value;

    // Animate counter
    this.animateCounter(counter, newValue);

    // Add pulse animation
    counter.element.classList.add('counter-update');
    setTimeout(() => counter.element.classList.remove('counter-update'), 600);
  }

  /**
   * Animate counter value
   */
  animateCounter(counter, targetValue) {
    const currentValue = counter.current;
    const difference = targetValue - currentValue;
    const steps = Math.abs(difference);
    let step = 0;

    const increment = Math.sign(difference);
    const animationDuration = Math.min(steps * 50, 1000); // Max 1 second animation
    const startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const currentValue = currentValue + (difference * progress);

      counter.element.textContent = Math.round(currentValue).toLocaleString();
      counter.current = Math.round(currentValue);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.element.textContent = targetValue.toLocaleString();
        counter.current = targetValue;
      }
    };

    requestAnimationFrame(update);
  }

  /**
   * Setup live notifications
   */
  setupNotifications() {
    document.addEventListener('notification:show', (e) => {
      this.showNotification(e.detail);
    });
  }

  /**
   * Show real-time notification
   */
  showNotification(data) {
    const { message, type = 'info', duration = 4000 } = data;

    const notification = document.createElement('div');
    notification.className = `real-time-notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">×</button>
      </div>
    `;

    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });

    document.body.appendChild(notification);

    // Auto remove
    if (duration) {
      setTimeout(() => notification.remove(), duration);
    }
  }

  /**
   * Update stats section
   */
  updateStats(data) {
    Object.entries(data).forEach(([key, value]) => {
      const element = document.querySelector(`[data-stat="${key}"]`);
      if (element) {
        element.textContent = typeof value === 'number' ? value.toLocaleString() : value;
      }
    });
  }

  /**
   * Broadcast message via WebSocket
   */
  broadcastMessage(type, payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  /**
   * Subscribe to live updates
   */
  subscribeToUpdates(channel) {
    this.broadcastMessage('subscribe', { channel });
  }

  /**
   * Unsubscribe from updates
   */
  unsubscribeFromUpdates(channel) {
    this.broadcastMessage('unsubscribe', { channel });
  }
}

// Initialize
const realTimeManager = new RealTimeManager();
window.realTimeManager = realTimeManager;

// Add notification styles
(function () {
  const s = document.createElement('style');
  s.textContent = `
  .real-time-notification {
    position: fixed; top: 20px; right: 20px; min-width: 300px;
    padding: 16px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000; animation: rtSlideIn 0.3s ease-out;
  }
  @keyframes rtSlideIn {
    from { transform: translateX(400px); opacity: 0; }
    to   { transform: translateX(0);     opacity: 1; }
  }
  .notification-content { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .notification-close { background: none; border: none; font-size: 24px; cursor: pointer; color: inherit; padding: 0; line-height: 1; }
  .notification-close:hover { opacity: 0.7; }
  .notification-info    { background: #2196F3; color: white; }
  .notification-success { background: #4CAF50; color: white; }
  .notification-error   { background: #f44336; color: white; }
  .notification-warning { background: #ff9800; color: white; }
  [data-counter].counter-update { animation: rtPulse 0.6s ease-out; }
  @keyframes rtPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
  @media (max-width: 600px) { .real-time-notification { right: 10px; left: 10px; min-width: auto; } }
  @media (prefers-reduced-motion: reduce) {
    .real-time-notification { animation: none; }
    [data-counter].counter-update { animation: none; }
  }
`;
  document.head.appendChild(s);
})();
