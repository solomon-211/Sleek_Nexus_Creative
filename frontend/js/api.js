const API_URL = window.CONFIG?.API_URL || 'http://localhost:5000/api';

// Newsletter subscription
async function subscribeNewsletter(email) {
    try {
        const response = await fetch(`${API_URL}/newsletter/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccessMessage(data.message || 'Successfully subscribed!');
            return true;
        } else {
            showErrorMessage(data.error || data.details || 'Subscription failed');
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        showErrorMessage('Network error: ' + error.message);
        return false;
    }
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #ef4444;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
    `;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Initialize newsletter forms
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const emailInput = form.querySelector('input[type="email"]') || form.querySelector('input[type="text"]') || form.querySelector('.newsletter-input');
            const email = emailInput ? emailInput.value : '';
            
            if (!email) return;
            
            // Sanitize input
            const sanitizedEmail = window.Sanitizer ? window.Sanitizer.sanitizeEmail(email) : email;
            
            // Add reCAPTCHA protection
            try {
                if (window.ReCaptcha) {
                    await window.ReCaptcha.protectForm(form, 'newsletter');
                }
                
                const success = await subscribeNewsletter(sanitizedEmail);
                if (success) form.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                showErrorMessage('Unable to submit form. Please try again.');
            }
        });
    });
});
