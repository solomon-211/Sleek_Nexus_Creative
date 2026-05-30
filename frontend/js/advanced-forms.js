/**
 * Advanced Forms System
 * Multi-step forms, auto-save, validation, upload progress
 */

class AdvancedFormManager {
  constructor() {
    this.forms = new Map();
    this.initForms();
  }

  initForms() {
    document.querySelectorAll('form[data-advanced]').forEach(form => {
      this.setupForm(form);
    });

    document.addEventListener('submit', (e) => {
      if (e.target.matches('form[data-advanced]')) {
        e.preventDefault();
        this.handleFormSubmit(e.target);
      }
    });
  }

  /**
   * Setup advanced form features
   */
  setupForm(form) {
    const formId = form.id || `form_${Date.now()}`;
    const formData = {
      id: formId,
      element: form,
      isMultiStep: form.dataset.steps ? parseInt(form.dataset.steps) : 1,
      currentStep: 1,
      data: this.loadFormData(formId),
      autoSave: form.dataset.autoSave !== 'false'
    };

    if (formData.isMultiStep > 1) {
      this.setupMultiStepForm(form, formData);
    }

    if (formData.autoSave) {
      this.setupAutoSave(form, formId);
    }

    this.setupValidation(form);
    this.setupFileUpload(form);
    this.forms.set(formId, formData);
  }

  /**
   * Setup multi-step form
   */
  setupMultiStepForm(form, formData) {
    const steps = form.querySelectorAll('[data-step]');
    
    // Show only current step
    this.showStep(form, formData.currentStep);

    // Add navigation
    const nav = document.createElement('div');
    nav.className = 'form-step-nav';
    nav.innerHTML = `
      <div class="form-progress">
        <div class="progress-bar" style="width: ${(formData.currentStep / formData.isMultiStep) * 100}%"></div>
      </div>
      <div class="step-buttons">
        <button type="button" class="btn-prev" ${formData.currentStep === 1 ? 'disabled' : ''}>Previous</button>
        <span class="step-indicator">Step ${formData.currentStep} of ${formData.isMultiStep}</span>
        <button type="button" class="btn-next" ${formData.currentStep === formData.isMultiStep ? 'disabled' : ''}>Next</button>
        ${formData.currentStep === formData.isMultiStep ? '<button type="submit" class="btn-submit">Submit</button>' : ''}
      </div>
    `;
    form.appendChild(nav);

    // Add listeners
    form.querySelector('.btn-prev')?.addEventListener('click', () => {
      if (formData.currentStep > 1) {
        formData.currentStep--;
        this.showStep(form, formData.currentStep);
        this.updateStepNav(form, formData);
      }
    });

    form.querySelector('.btn-next')?.addEventListener('click', () => {
      if (this.validateStep(form, formData.currentStep)) {
        if (formData.currentStep < formData.isMultiStep) {
          formData.currentStep++;
          this.showStep(form, formData.currentStep);
          this.updateStepNav(form, formData);
        }
      }
    });
  }

  /**
   * Show specific step
   */
  showStep(form, stepNum) {
    form.querySelectorAll('[data-step]').forEach((step, idx) => {
      step.style.display = idx + 1 === stepNum ? 'block' : 'none';
    });
  }

  /**
   * Update step navigation
   */
  updateStepNav(form, formData) {
    const nav = form.querySelector('.form-step-nav');
    const progress = nav.querySelector('.progress-bar');
    const indicator = nav.querySelector('.step-indicator');
    const prevBtn = nav.querySelector('.btn-prev');
    const nextBtn = nav.querySelector('.btn-next');

    progress.style.width = `${(formData.currentStep / formData.isMultiStep) * 100}%`;
    indicator.textContent = `Step ${formData.currentStep} of ${formData.isMultiStep}`;

    prevBtn.disabled = formData.currentStep === 1;
    nextBtn.style.display = formData.currentStep === formData.isMultiStep ? 'none' : 'inline-block';

    const submitBtn = nav.querySelector('.btn-submit');
    if (submitBtn) {
      submitBtn.style.display = formData.currentStep === formData.isMultiStep ? 'inline-block' : 'none';
    }
  }

  /**
   * Setup auto-save
   */
  setupAutoSave(form, formId) {
    form.addEventListener('change', () => {
      this.saveFormData(formId, form);

      // Show save indicator
      const indicator = form.querySelector('[data-save-indicator]') || this.createSaveIndicator(form);
      indicator.textContent = 'Saving...';
      indicator.style.opacity = '1';

      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(() => {
        indicator.textContent = 'Saved!';
        setTimeout(() => {
          indicator.style.opacity = '0';
        }, 2000);
      }, 500);
    });
  }

  /**
   * Create save indicator element
   */
  createSaveIndicator(form) {
    const indicator = document.createElement('div');
    indicator.dataset.saveIndicator = '';
    indicator.className = 'form-save-indicator';
    indicator.style.cssText = 'position: absolute; top: 10px; right: 10px; opacity: 0; transition: opacity 0.3s; color: #4caf50;';
    form.style.position = 'relative';
    form.appendChild(indicator);
    return indicator;
  }

  /**
   * Setup validation
   */
  setupValidation(form) {
    form.addEventListener('submit', (e) => {
      const isValid = Array.from(form.elements).every(field => {
        if (field.type === 'submit') return true;
        return this.validateField(field);
      });

      if (!isValid) {
        e.preventDefault();
      }
    });

    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
    });
  }

  /**
   * Validate individual field
   */
  validateField(field) {
    let isValid = true;
    const errorContainer = field.parentElement.querySelector('.field-error') || 
                          this.createErrorContainer(field);

    // Required validation
    if (field.required && !field.value.trim()) {
      isValid = false;
      errorContainer.textContent = `${field.name || 'This field'} is required`;
    }

    // Email validation
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorContainer.textContent = 'Please enter a valid email address';
      }
    }

    // URL validation
    if (field.type === 'url' && field.value) {
      try {
        new URL(field.value);
      } catch {
        isValid = false;
        errorContainer.textContent = 'Please enter a valid URL';
      }
    }

    // Phone validation
    if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(field.value)) {
        isValid = false;
        errorContainer.textContent = 'Please enter a valid phone number';
      }
    }

    // Min length
    if (field.minLength && field.value.length < field.minLength) {
      isValid = false;
      errorContainer.textContent = `Minimum ${field.minLength} characters required`;
    }

    // Pattern validation
    if (field.pattern && field.value) {
      const pattern = new RegExp(field.pattern);
      if (!pattern.test(field.value)) {
        isValid = false;
        errorContainer.textContent = field.title || 'Invalid format';
      }
    }

    field.setAttribute('aria-invalid', !isValid);
    errorContainer.style.display = isValid ? 'none' : 'block';

    return isValid;
  }

  /**
   * Create error container
   */
  createErrorContainer(field) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.style.cssText = 'color: #d32f2f; font-size: 12px; margin-top: 4px; display: none;';
    field.parentElement.appendChild(errorDiv);
    return errorDiv;
  }

  /**
   * Setup file upload with progress
   */
  setupFileUpload(form) {
    form.querySelectorAll('input[type="file"]').forEach(input => {
      input.addEventListener('change', (e) => {
        const files = e.target.files;
        Array.from(files).forEach(file => {
          this.uploadFile(file, input);
        });
      });
    });
  }

  /**
   * Upload file with progress
   */
  uploadFile(file, input) {
    const formData = new FormData();
    formData.append('file', file);

    const progressContainer = this.createProgressContainer(input);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        progressContainer.querySelector('.progress-fill').style.width = percentComplete + '%';
        progressContainer.querySelector('.progress-text').textContent = Math.round(percentComplete) + '%';
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        progressContainer.style.display = 'none';
        input.dataset.uploaded = 'true';
      }
    });

    xhr.addEventListener('error', () => {
      progressContainer.querySelector('.progress-text').textContent = 'Upload failed';
    });

    xhr.open('POST', input.dataset.uploadUrl || '/api/upload');
    xhr.send(formData);
  }

  /**
   * Create progress container
   */
  createProgressContainer(input) {
    const container = document.createElement('div');
    container.className = 'file-upload-progress';
    container.innerHTML = `
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <span class="progress-text">0%</span>
      </div>
    `;
    input.parentElement.appendChild(container);
    return container;
  }

  /**
   * Validate step
   */
  validateStep(form, stepNum) {
    const step = form.querySelector(`[data-step="${stepNum}"]`);
    if (!step) return true;

    const fields = step.querySelectorAll('input, textarea, select');
    return Array.from(fields).every(field => this.validateField(field));
  }

  /**
   * Handle form submission
   */
  async handleFormSubmit(form) {
    const isValid = Array.from(form.elements).every(field => {
      if (field.type === 'submit') return true;
      return this.validateField(field);
    });

    if (!isValid) return;

    const formData = new FormData(form);
    const submitBtn = form.querySelector('[type="submit"]');

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      const response = await fetch(form.action || '/api/submit', {
        method: form.method || 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        this.clearFormData(form.id);
        form.reset();
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error submitting form');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  }

  /**
   * Save form data to localStorage
   */
  saveFormData(formId, form) {
    const data = {};
    Array.from(form.elements).forEach(field => {
      if (field.name) {
        data[field.name] = field.type === 'checkbox' ? field.checked : field.value;
      }
    });
    localStorage.setItem(`form_${formId}`, JSON.stringify(data));
  }

  /**
   * Load form data from localStorage
   */
  loadFormData(formId) {
    const saved = localStorage.getItem(`form_${formId}`);
    return saved ? JSON.parse(saved) : {};
  }

  /**
   * Clear form data from localStorage
   */
  clearFormData(formId) {
    localStorage.removeItem(`form_${formId}`);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const formManager = new AdvancedFormManager();
  window.formManager = formManager;
});

// Add styles
(function () {
  const s = document.createElement('style');
  s.textContent = `
  .form-step-nav { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
  .form-progress { height: 4px; background: #eee; border-radius: 2px; margin-bottom: 20px; overflow: hidden; }
  .form-progress .progress-bar { height: 100%; background: #4caf50; transition: width 0.3s ease; }
  .step-buttons { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
  .step-buttons button { padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; background: #fff; cursor: pointer; transition: 0.3s; }
  .step-buttons button:hover:not(:disabled) { background: #f5f5f5; }
  .step-buttons button:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-submit { background: #4caf50 !important; color: white !important; }
  .field-error { color: #d32f2f; font-size: 12px; margin-top: 4px; }
  .file-upload-progress { margin-top: 10px; }
  .progress-container { display: flex; gap: 10px; align-items: center; }
  .progress-fill { height: 100%; background: #4caf50; transition: width 0.2s; }
  @media (prefers-reduced-motion: reduce) {
    .form-progress .progress-bar, .progress-fill, .step-buttons button { transition: none; }
  }
`;
  document.head.appendChild(s);
})();
