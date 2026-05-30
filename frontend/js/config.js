// API Configuration
const runtimeConfig = window.__SNC_CONFIG__ || {};
const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const isFileProtocol = window.location.protocol === 'file:';
const hasValidOrigin = Boolean(window.location.origin && window.location.origin !== 'null');

const CONFIG = {
    // API endpoint - automatically adapts to environment
    API_URL: runtimeConfig.API_URL || (isLocalHost || isFileProtocol || !hasValidOrigin
        ? 'http://localhost:5000/api'
        : window.location.origin + '/api'), // Same domain, no CORS issues
    
    // reCAPTCHA v3 Site Key - IMPORTANT: Replace with your actual key from Google Cloud Console
    // Get it at: https://console.cloud.google.com/security/recaptcha
    // Currently using test key but won't work properly in production
    RECAPTCHA_SITE_KEY: runtimeConfig.RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    
    // Google Analytics 4 Tracking ID - PRODUCTION ONLY
    // Replace 'G-XXXXXXXXXX' with your actual GA4 ID from Google Analytics dashboard
    // Leave as placeholder if not using analytics
    GA_TRACKING_ID: runtimeConfig.GA_TRACKING_ID || 'G-XXXXXXXXXX',
    
    // Sentry Error Tracking DSN - Optional but recommended for production
    // Get it at: https://sentry.io/
    // Leave empty to disable error tracking
    SENTRY_DSN: runtimeConfig.SENTRY_DSN || '',
};

// Validate configuration — only warn in production
const _isProd = !isLocalHost && !isFileProtocol;
if (_isProd && CONFIG.GA_TRACKING_ID === 'G-XXXXXXXXXX') {
    console.warn('[WARNING]  Google Analytics ID not configured. Analytics will not work.');
}
if (_isProd && !CONFIG.SENTRY_DSN) {
    console.warn('[WARNING]  Sentry DSN not configured. Error tracking disabled.');
}

// Make CONFIG globally available
window.CONFIG = CONFIG;

// Initialize Google Analytics only if properly configured
if (CONFIG.GA_TRACKING_ID && CONFIG.GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', CONFIG.GA_TRACKING_ID);
}

// Initialize Sentry Error Tracking only if DSN is provided
if (CONFIG.SENTRY_DSN && typeof Sentry !== 'undefined') {
    Sentry.init({
        dsn: CONFIG.SENTRY_DSN,
        environment: window.location.hostname === 'localhost' ? 'development' : 'production',
        tracesSampleRate: 1.0,
    });
}
