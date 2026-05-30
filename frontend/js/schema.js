// Schema.org Structured Data Generator
const SchemaGenerator = {
    // Organization Schema
    getOrganizationSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sleek Nexus Creative",
            "url": "https://SNC.ss",
            "logo": "https://SNC.ss/images/logo.png",
            "description": "Leading technology company in Juba, South Sudan providing software development, web & mobile apps, educational technology, and IT consulting.",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Juba",
                "addressRegion": "Central Equatoria State",
                "addressCountry": "SS"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+211-925-277-700",
                "contactType": "customer service",
                "email": "info@SNC.ss",
                "availableLanguage": ["en"]
            },
            "sameAs": [
                "https://facebook.com/SNC",
                "https://twitter.com/SNC",
                "https://linkedin.com/company/SNC",
                "https://github.com/SNC"
            ],
            "founder": {
                "@type": "Person",
                "name": "Solomon Leek",
                "jobTitle": "CEO & Founder"
            }
        };
    },

    // LocalBusiness Schema
    getLocalBusinessSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sleek Nexus Creative",
            "image": "https://SNC.ss/images/logo.png",
            "telephone": "+211-925-277-700",
            "email": "info@SNC.ss",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Juba",
                "addressRegion": "Central Equatoria State",
                "addressCountry": "SS"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "4.8517",
                "longitude": "31.5825"
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "18:00"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Saturday",
                    "opens": "10:00",
                    "closes": "16:00"
                }
            ],
            "priceRange": "$$"
        };
    },

    // WebSite Schema (for Sitelinks Search Box)
    getWebSiteSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Sleek Nexus Creative",
            "url": "https://SNC.ss",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://SNC.ss/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };
    },

    // Service Schema
    getServiceSchema(serviceName, description) {
        return {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": serviceName,
            "provider": {
                "@type": "Organization",
                "name": "Sleek Nexus Creative"
            },
            "description": description,
            "areaServed": {
                "@type": "Country",
                "name": "South Sudan"
            }
        };
    },

    // JobPosting Schema
    getJobPostingSchema(job) {
        return {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": job.title,
            "description": job.description,
            "datePosted": job.datePosted,
            "employmentType": job.employmentType || "FULL_TIME",
            "hiringOrganization": {
                "@type": "Organization",
                "name": "Sleek Nexus Creative",
                "sameAs": "https://SNC.ss"
            },
            "jobLocation": {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Juba",
                    "addressCountry": "SS"
                }
            }
        };
    },

    // Insert schema into page
    insertSchema(schema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    },

    // Initialize schemas based on page
    init() {
        // Add Organization schema to all pages
        this.insertSchema(this.getOrganizationSchema());

        // Add page-specific schemas
        const path = window.location.pathname;
        
        if (path === '/' || path.includes('index.html')) {
            this.insertSchema(this.getLocalBusinessSchema());
            this.insertSchema(this.getWebSiteSchema());
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    SchemaGenerator.init();
});
