// Breadcrumb Generator
class BreadcrumbManager {
    constructor() {
        this.init();
    }

    init() {
        const breadcrumbContainer = document.querySelector('.breadcrumb-container');
        if (!breadcrumbContainer) {
            this.createBreadcrumb();
        }
    }

    createBreadcrumb() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment && segment !== 'html');
        
        if (segments.length === 0 || path === '/' || path.includes('index.html')) {
            return; // Don't show breadcrumb on homepage
        }

        const breadcrumb = document.createElement('nav');
        breadcrumb.className = 'breadcrumb-nav';
        breadcrumb.setAttribute('aria-label', 'Breadcrumb');

        const schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": []
        };

        let html = '<ol class="breadcrumb-list">';
        html += '<li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>';
        
        schema.itemListElement.push({
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin + "/index.html"
        });

        let currentPath = '';
        segments.forEach((segment, index) => {
            currentPath += '/' + segment;
            const name = this.formatSegmentName(segment);
            const isLast = index === segments.length - 1;
            
            schema.itemListElement.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": name,
                "item": window.location.origin + currentPath
            });

            if (isLast) {
                html += `<li class="active">${name}</li>`;
            } else {
                html += `<li><a href="${segment}">${name}</a></li>`;
            }
        });

        html += '</ol>';
        breadcrumb.innerHTML = html;

        // Add schema markup
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);

        // Insert breadcrumb after navbar
        const navbar = document.querySelector('.navbar');
        if (navbar && navbar.nextSibling) {
            navbar.parentNode.insertBefore(breadcrumb, navbar.nextSibling);
        }
    }

    formatSegmentName(segment) {
        return segment
            .replace('.html', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new BreadcrumbManager();
});
