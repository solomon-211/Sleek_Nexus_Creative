// Contact Form Validation with Security
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    // Guard against missing elements
    if (!form) {
        console.error('Contact form not found');
        return;
    }

    // Reset form state on page load
    form.reset();
    if (formMessage) {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        clearErrors();
        
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        if (name.value.trim().length < 2) {
            showError('name', 'Please enter a valid name');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation
        const phone = document.getElementById('phone');
        if (phone.value && phone.value.trim().length < 10) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Message validation
        const message = document.getElementById('message');
        if (message.value.trim().length < 10) {
            showError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        if (!isValid) {
            if (formMessage) {
                formMessage.textContent = 'Please correct the errors above and try again.';
                formMessage.className = 'form-message error';
            }
            return;
        }
        
        // Add reCAPTCHA and submit
        try {
            formMessage.textContent = 'Sending...';
            formMessage.className = 'form-message';
            
            // Add loading state to button
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            if (window.ReCaptcha) {
                await window.ReCaptcha.protectForm(form, 'contact');
            }
            
            const formData = {
                name: name.value,
                email: email.value,
                phone: phone.value,
                company: document.getElementById('company').value,
                service: document.getElementById('service').value,
                message: message.value,
                recaptcha_token: form.querySelector('input[name="recaptcha_token"]')?.value
            };
            
            const sanitized = window.Sanitizer ? window.Sanitizer.sanitizeFormData(formData) : formData;
            
            const response = await fetch(window.CONFIG?.API_URL + '/contact' || '/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sanitized)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                if (window.Toast) {
                    window.Toast.success(data.message || 'Message sent successfully!');
                }
                formMessage.textContent = data.message || 'Thank you! Your message has been sent successfully.';
                formMessage.className = 'form-message success';
                form.reset();
                setTimeout(() => formMessage.className = 'form-message', 5000);
            } else {
                if (window.Toast) {
                    window.Toast.error(data.error || 'Failed to send message');
                }
                formMessage.textContent = data.error || 'Failed to send message. Please try again.';
                formMessage.className = 'form-message error';
            }
            
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        } catch (error) {
            console.error('Form submission error:', error);
            if (window.Toast) {
                window.Toast.error('Network error. Please try again later.');
            }
            formMessage.textContent = 'Network error. Please try again later.';
            formMessage.className = 'form-message error';
            
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(fieldId + '-error');
        field.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.classList.remove('show');
            msg.textContent = '';
        });
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        formMessage.className = 'form-message';
    }

    // ===== FAQ ACCORDION FUNCTIONALITY =====
    // Initialize FAQ accordion items
    const initializeFAQ = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            // Reset all items to closed state
            item.classList.remove('active');
            
            const header = item.querySelector('.faq-header');
            
            if (header) {
                // Remove old listeners (in case function is called multiple times)
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                const newHeaderRef = item.querySelector('.faq-header');
                
                newHeaderRef.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Check if this item is already active
                    const isActive = item.classList.contains('active');
                    
                    // Close all FAQ items
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // Open this item if it wasn't already open
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
                
                // Make keyboard accessible (Enter/Space to toggle)
                newHeaderRef.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        newHeaderRef.click();
                    }
                });
                
                // Make header focusable for keyboard navigation
                newHeaderRef.setAttribute('tabindex', '0');
                newHeaderRef.setAttribute('role', 'button');
            }
        });
    };
    
    // Initialize FAQ on page load
    initializeFAQ();
    
    // Reinitialize FAQ and reset form when page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Page is now visible - reset and reinitialize
            console.log('Contact page is now visible, resetting state');
            form.reset();
            if (formMessage) {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }
            clearErrors();
            initializeFAQ();
        }
    });
    
    // Also reinitialize when user returns via back button
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            // Page restored from bfcache
            form.reset();
            if (formMessage) {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }
            clearErrors();
            initializeFAQ();
        }
    });
});
