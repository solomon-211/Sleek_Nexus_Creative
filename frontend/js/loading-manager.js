// Loading States & Error Handling Utilities

class LoadingManager {
    static showPageLoader() {
        const loader = document.querySelector('.page-loader') || this.createPageLoader();
        loader.classList.remove('hidden');
    }

    static hidePageLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => loader.classList.add('hidden'), 300);
        }
    }

    static createPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loader);
        return loader;
    }

    static showContentLoading(element) {
        element.classList.add('content-loading');
    }

    static hideContentLoading(element) {
        element.classList.remove('content-loading');
    }
}

class ToastManager {
    static container = null;

    static init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    }

    static show(message, type = 'info', duration = 5000) {
        this.init();
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${icons[type]} toast-icon"></i>
            <span>${message}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;

        this.container.appendChild(toast);

        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.remove(toast);
        });

        if (duration > 0) {
            setTimeout(() => this.remove(toast), duration);
        }

        return toast;
    }

    static remove(toast) {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }

    static success(message, duration) {
        return this.show(message, 'success', duration);
    }

    static error(message, duration) {
        return this.show(message, 'error', duration);
    }

    static warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    static info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

class ErrorHandler {
    static showError(container, message, retryCallback = null) {
        container.innerHTML = `
            <div class="error-container">
                <div class="error-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <h3 class="error-title">Oops! Something went wrong</h3>
                <p class="error-message">${message}</p>
                ${retryCallback ? '<button class="retry-btn">Try Again</button>' : ''}
            </div>
        `;

        if (retryCallback) {
            container.querySelector('.retry-btn').addEventListener('click', retryCallback);
        }
    }

    static showEmptyState(container, title, message, actionText = null, actionCallback = null) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-inbox"></i></div>
                <h3 class="empty-title">${title}</h3>
                <p class="empty-message">${message}</p>
                ${actionText ? `<button class="btn btn-primary">${actionText}</button>` : ''}
            </div>
        `;

        if (actionCallback) {
            container.querySelector('.btn').addEventListener('click', actionCallback);
        }
    }
}

class ProgressBar {
    constructor(container) {
        this.container = container;
        this.bar = this.create();
    }

    create() {
        const wrapper = document.createElement('div');
        wrapper.className = 'progress-bar';
        wrapper.innerHTML = '<div class="progress-fill" style="width: 0%"></div>';
        this.container.appendChild(wrapper);
        return wrapper.querySelector('.progress-fill');
    }

    update(percent) {
        this.bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    }

    complete() {
        this.update(100);
        setTimeout(() => this.remove(), 500);
    }

    remove() {
        this.bar.parentElement.remove();
    }
}

// Skeleton Screen Generator
class SkeletonLoader {
    static createSkeleton(type, count = 1) {
        const skeletons = {
            text: '<div class="skeleton skeleton-text"></div>',
            title: '<div class="skeleton skeleton-title"></div>',
            card: '<div class="skeleton skeleton-card"></div>',
            avatar: '<div class="skeleton skeleton-avatar"></div>'
        };

        return Array(count).fill(skeletons[type] || skeletons.text).join('');
    }

    static show(container, type, count) {
        container.innerHTML = this.createSkeleton(type, count);
    }
}

// Auto-hide page loader on load
window.addEventListener('load', () => {
    LoadingManager.hidePageLoader();
});

// Export for use in other scripts
window.LoadingManager = LoadingManager;
window.ToastManager = ToastManager;
window.ErrorHandler = ErrorHandler;
window.ProgressBar = ProgressBar;
window.SkeletonLoader = SkeletonLoader;
