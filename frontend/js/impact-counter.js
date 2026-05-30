// Impact Counter - Dynamic Stats from Database
class ImpactCounter {
    constructor() {
        this.counters = {
            students: 0,
            projects: 0,
            courses: 0,
            jobs: 0
        };
        this.init();
    }

    async init() {
        await this.fetchStats();
        this.animateCounters();
    }

    async fetchStats() {
        try {
            // Fetch from API (replace with actual endpoint)
            const response = await fetch('http://localhost:5000/api/stats');
            if (response.ok) {
                const data = await response.json();
                this.counters = data;
            } else {
                // Fallback to demo data
                this.counters = {
                    students: 10000,
                    projects: 150,
                    courses: 45,
                    jobs: 28
                };
            }
        } catch (error) {
            // Use demo data if API fails
            this.counters = {
                students: 10000,
                projects: 150,
                courses: 45,
                jobs: 28
            };
        }
    }

    animateCounters() {
        const duration = 2000;
        const elements = {
            students: document.getElementById('counter-students'),
            projects: document.getElementById('counter-projects'),
            courses: document.getElementById('counter-courses'),
            jobs: document.getElementById('counter-jobs')
        };

        Object.keys(elements).forEach(key => {
            const element = elements[key];
            if (!element) return;

            const target = this.counters[key];
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString();
                }
            };

            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.disconnect();
                    }
                });
            });

            observer.observe(element);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.impact-section')) {
        new ImpactCounter();
    }
});
