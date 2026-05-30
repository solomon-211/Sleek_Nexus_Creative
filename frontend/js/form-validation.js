// Enhanced Form Validation
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearError(field));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let isValid = true;
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            if (!this.validateField(field)) isValid = false;
        });
        if (isValid) this.submitForm();
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');

        if (required && !value) {
            this.showError(field, 'This field is required');
            return false;
        }

        if (value && type === 'email' && !this.isValidEmail(value)) {
            this.showError(field, 'Please enter a valid email address');
            return false;
        }

        if (value && type === 'tel' && !this.isValidPhone(value)) {
            this.showError(field, 'Please enter a valid phone number');
            return false;
        }

        if (field.hasAttribute('minlength') && value.length < field.getAttribute('minlength')) {
            this.showError(field, `Minimum ${field.getAttribute('minlength')} characters required`);
            return false;
        }

        this.clearError(field);
        return true;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^[\d\s\+\-\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 9;
    }

    showError(field, message) {
        this.clearError(field);
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearError(field) {
        field.classList.remove('error');
        const error = field.parentNode.querySelector('.field-error');
        if (error) error.remove();
    }

    async submitForm() {
        const btn = this.form.querySelector('button[type="submit"]');
        if (!btn) return;
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Collect form data as JSON for proper Content-Type header
            const formData = {};
            this.form.querySelectorAll('input, textarea, select').forEach(field => {
                if (field.name) {
                    formData[field.name] = field.value;
                }
            });

            const response = await fetch(this.form.action || '/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                this.showSuccess('Message sent successfully!');
                this.form.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(this.form, 'Failed to send. Please try again.');
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }

    showSuccess(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        this.form.insertBefore(alert, this.form.firstChild);
        setTimeout(() => alert.remove(), 5000);
    }
}

// Initialize all forms
document.addEventListener('DOMContentLoaded', () => {
    ['contact-form', 'newsletter-form', 'career-form'].forEach(id => {
        if (document.getElementById(id)) new FormValidator(id);
    });
});
