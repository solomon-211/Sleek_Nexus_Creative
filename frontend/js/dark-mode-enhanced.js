/**
 * Enhanced Dark Mode System
 * System preference detection, auto-scheduling, theme customization
 */

class DarkModeManager {
  constructor(config = {}) {
    this.config = {
      storageKey: 'theme-preference',
      enableAutoSchedule: true,
      sunriseTime: '06:00',
      sunsetTime: '18:00',
      ...config
    };

    this.currentTheme = this.getSystemTheme();
    this.init();
  }

  init() {
    this.loadSavedTheme();
    this.setupSystemPreferenceListener();
    this.setupToggle();

    if (this.config.enableAutoSchedule) {
      this.setupAutoSchedule();
    }

    this.applyTheme(this.currentTheme);
  }

  /**
   * Get system theme preference
   */
  getSystemTheme() {
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  /**
   * Load saved theme from localStorage
   */
  loadSavedTheme() {
    const saved = localStorage.getItem(this.config.storageKey);
    if (saved && ['light', 'dark', 'auto'].includes(saved)) {
      this.currentTheme = saved;
      if (saved === 'auto') {
        this.currentTheme = this.getSystemTheme();
      }
    }
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark-mode', theme === 'dark');
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#ffffff');
    }

    // Dispatch custom event
    const event = new CustomEvent('theme-change', { detail: { theme } });
    document.dispatchEvent(event);
  }

  /**
   * Setup system preference listener
   */
  setupSystemPreferenceListener() {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (mediaQuery.addListener) {
      mediaQuery.addListener((e) => {
        if (this.currentTheme === 'auto') {
          this.currentTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(this.currentTheme);
        }
      });
    } else if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', (e) => {
        if (this.currentTheme === 'auto') {
          this.currentTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(this.currentTheme);
        }
      });
    }
  }

  /**
   * Setup theme toggle button
   */
  setupToggle() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-theme-toggle]')) {
        this.toggleTheme();
      }
    });

    // Create toggle button if it doesn't exist
    if (!document.querySelector('[data-theme-toggle]')) {
      this.createToggleButton();
    }
  }

  /**
   * Create toggle button
   */
  createToggleButton() {
    const toggle = document.createElement('button');
    toggle.setAttribute('data-theme-toggle', '');
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = `
      <svg class="sun-icon" viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      <svg class="moon-icon" viewBox="0 0 24 24" width="20" height="20">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    `;

    // Find a good place to append (navbar, header, etc)
    const navbar = document.querySelector('nav, .navbar, [role="navigation"]');
    if (navbar) {
      navbar.appendChild(toggle);
    } else {
      document.body.appendChild(toggle);
    }
  }

  /**
   * Toggle between light and dark mode
   */
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.config.storageKey, this.currentTheme);
    this.applyTheme(this.currentTheme);
  }

  /**
   * Setup auto schedule based on time
   */
  setupAutoSchedule() {
    const checkSchedule = () => {
      const now = new Date();
      const [sunriseHour, sunriseMin] = this.config.sunriseTime.split(':').map(Number);
      const [sunsetHour, sunsetMin] = this.config.sunsetTime.split(':').map(Number);

      const sunriseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sunriseHour, sunriseMin, 0);
      const sunsetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sunsetHour, sunsetMin, 0);

      let autoTheme = 'light';
      if (now > sunsetTime || now < sunriseTime) {
        autoTheme = 'dark';
      }

      const saved = localStorage.getItem(this.config.storageKey);
      if (!saved || saved === 'auto') {
        this.currentTheme = autoTheme;
        this.applyTheme(this.currentTheme);
      }
    };

    // Check every minute
    checkSchedule();
    setInterval(checkSchedule, 60000);
  }

  /**
   * Get CSS variable for current theme
   */
  getCSSVariable(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  }

  /**
   * Set custom theme colors
   */
  setCustomTheme(colors) {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }

  /**
   * Get current theme
   */
  getTheme() {
    return this.currentTheme;
  }
}

// Initialize
const darkModeManager = new DarkModeManager({
  enableAutoSchedule: false, // Set to true if you want auto-scheduling
  sunriseTime: '06:00',
  sunsetTime: '18:00'
});

window.darkModeManager = darkModeManager;

// Add dark mode styles and theme definitions
const style = document.createElement('style');
style.textContent = `
  :root {
    /* Light mode colors */
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #1a1a1a;
    --text-secondary: #666666;
    --border-color: #e0e0e0;
    --accent-color: #4a90e2;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  [data-theme="dark"],
  html.dark-mode {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #404040;
    --accent-color: #5fa3f0;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .theme-toggle {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }

  .theme-toggle:hover {
    background: var(--accent-color);
  }

  .theme-toggle svg {
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s ease;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .theme-toggle .sun-icon {
    opacity: 1;
  }

  [data-theme="dark"] .theme-toggle .sun-icon,
  html.dark-mode .theme-toggle .sun-icon {
    opacity: 0;
  }

  [data-theme="dark"] .theme-toggle .moon-icon,
  html.dark-mode .theme-toggle .moon-icon {
    opacity: 1;
  }

  /* Smooth transitions across the site */
  * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }

  /* Disable transitions on theme toggle */
  html.theme-transitioning * {
    transition: none;
  }

  /* Input fields */
  input, textarea, select {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    border-color: var(--border-color);
  }

  /* Cards and containers */
  .card, [role="article"], article {
    background-color: var(--bg-secondary);
    border-color: var(--border-color);
  }

  /* Links */
  a {
    color: var(--accent-color);
  }

  /* Code blocks */
  pre, code {
    background-color: var(--bg-secondary);
    color: var(--text-secondary);
  }

  /* Buttons */
  button {
    background-color: var(--accent-color);
    color: white;
  }

  button:hover {
    filter: brightness(1.1);
  }

  /* Reduce motion support */
  @media (prefers-reduced-motion: reduce) {
    body, .theme-toggle, * {
      transition: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: more) {
    :root {
      --border-color: #000000;
    }

    [data-theme="dark"] {
      --border-color: #ffffff;
    }
  }
`;
document.head.appendChild(style);
