// Dark Mode Manager
class DarkModeManager {
    constructor() {
        this.darkMode = localStorage.getItem('darkMode') === 'enabled';
        this.init();
    }

    init() {
        // Apply saved preference
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
        }

        // Create toggle button
        this.createToggle();
    }

    createToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = `
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
        `;
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.addEventListener('click', () => this.toggle());
        
        // Add to navbar
        const navbar = document.querySelector('.navbar .container');
        if (navbar) {
            navbar.appendChild(toggle);
        }
    }

    toggle() {
        this.darkMode = !this.darkMode;
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        localStorage.setItem('darkMode', this.darkMode ? 'enabled' : 'disabled');
        
        // Animate toggle
        const toggle = document.querySelector('.dark-mode-toggle');
        toggle.style.transform = 'rotate(360deg)';
        setTimeout(() => toggle.style.transform = '', 300);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeManager();
});
