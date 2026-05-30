// reCAPTCHA Integration
const ReCaptcha = {
    siteKey: window.CONFIG?.RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    loaded: false,

    // Load reCAPTCHA script
    load() {
        if (this.loaded) return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
            script.onload = () => {
                this.loaded = true;
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    // Execute reCAPTCHA
    async execute(action = 'submit') {
        await this.load();
        
        return new Promise((resolve, reject) => {
            grecaptcha.ready(() => {
                grecaptcha.execute(this.siteKey, { action })
                    .then(resolve)
                    .catch(reject);
            });
        });
    },

    // Add reCAPTCHA to form
    async protectForm(formElement, action = 'submit') {
        try {
            const token = await this.execute(action);
            
            let input = formElement.querySelector('input[name="recaptcha_token"]');
            if (!input) {
                input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'recaptcha_token';
                formElement.appendChild(input);
            }
            input.value = token;
            
            return token;
        } catch (error) {
            console.error('reCAPTCHA error:', error);
            throw error;
        }
    }
};

window.ReCaptcha = ReCaptcha;
