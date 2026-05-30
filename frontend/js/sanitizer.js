// Input Sanitization Utility
const Sanitizer = {
    // Sanitize text input
    sanitizeText(input) {
        if (!input) return '';
        return String(input)
            .replace(/[<>]/g, '')
            .trim()
            .slice(0, 1000);
    },

    // Sanitize email
    sanitizeEmail(email) {
        if (!email) return '';
        return String(email)
            .toLowerCase()
            .trim()
            .slice(0, 254);
    },

    // Sanitize HTML (basic)
    sanitizeHTML(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    },

    // Validate and sanitize form data
    sanitizeFormData(formData) {
        const sanitized = {};
        for (const [key, value] of Object.entries(formData)) {
            if (key === 'email') {
                sanitized[key] = this.sanitizeEmail(value);
            } else if (typeof value === 'string') {
                sanitized[key] = this.sanitizeText(value);
            } else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }
};

// Export for use in other scripts
window.Sanitizer = Sanitizer;
