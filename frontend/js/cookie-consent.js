// Cookie Consent Manager - GDPR Compliant
class CookieConsent {
    constructor() {
        this.cookieName = 'SNC_cookie_consent';
        this.init();
    }

    init() {
        if (!this.hasConsent()) {
            this.showBanner();
        } else {
            this.loadAnalytics();
        }
    }

    hasConsent() {
        return localStorage.getItem(this.cookieName) === 'accepted';
    }

    showBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <p>We use cookies to improve your experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies. <a href="privacy.html">Privacy Policy</a></p>
                <div class="cookie-consent-buttons">
                    <button id="cookie-accept" class="btn btn-primary">Accept</button>
                    <button id="cookie-decline" class="btn btn-secondary">Decline</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('cookie-accept').addEventListener('click', () => this.acceptCookies());
        document.getElementById('cookie-decline').addEventListener('click', () => this.declineCookies());
    }

    acceptCookies() {
        localStorage.setItem(this.cookieName, 'accepted');
        this.hideBanner();
        this.loadAnalytics();
    }

    declineCookies() {
        localStorage.setItem(this.cookieName, 'declined');
        this.hideBanner();
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) banner.remove();
    }

    loadAnalytics() {
        // Only load Google Analytics if consent given
        if (this.hasConsent()) {
            const script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
            script.async = true;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', { 'anonymize_ip': true });
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
});
