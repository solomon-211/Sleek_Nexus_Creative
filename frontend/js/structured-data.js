/**
 * Structured Data & SEO Enhancement
 * JSON-LD schema generation for better search visibility
 */

class StructuredDataGenerator {
  constructor() {
    this.schemas = [];
    this.init();
  }

  init() {
    this.generatePageSchema();
    this.generateOrgSchema();
    this.generateBreadcrumbSchema();
    this.generateProductSchemas();
    this.addOpenGraphTags();
  }

  /**
   * Generate page schema
   */
  generatePageSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': document.title,
      'description': document.querySelector('meta[name="description"]')?.content || '',
      'url': window.location.href,
      'image': document.querySelector('meta[property="og:image"]')?.content || '',
      'datePublished': new Date().toISOString(),
      'inLanguage': document.documentElement.lang || 'en-US'
    };

    this.addSchema(schema);
  }

  /**
   * Generate organization schema
   */
  generateOrgSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Sleek Nexus Creative',
      'url': window.location.origin,
      'logo': `${window.location.origin}/images/Sleek_Axis.png`,
      'description': 'Professional tech solutions and services',
      'sameAs': [
        'https://www.facebook.com/SNC',
        'https://www.twitter.com/SNC',
        'https://www.linkedin.com/company/SNC',
        'https://www.instagram.com/SNC'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Service',
        'telephone': '+1-XXX-XXX-XXXX',
        'email': 'info@SNC.ss',
        'url': `/html/contact.html`
      },
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'US',
        'addressRegion': 'State',
        'addressLocality': 'City'
      }
    };

    this.addSchema(schema);
  }

  /**
   * Generate breadcrumb schema
   */
  generateBreadcrumbSchema() {
    const breadcrumbs = Array.from(document.querySelectorAll('.breadcrumb a, [data-breadcrumb]')).map((el, idx) => ({
      '@type': 'BreadcrumbList',
      'position': idx + 1,
      'name': el.textContent,
      'item': el.href || window.location.href
    }));

    if (breadcrumbs.length > 0) {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs
      };

      this.addSchema(schema);
    }
  }

  /**
   * Generate product/service schemas
   */
  generateProductSchemas() {
    // Generate schema for each service/product card
    document.querySelectorAll('[data-product], [data-service], article').forEach(item => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': item.querySelector('h2, h3, .title')?.textContent?.trim(),
        'description': item.querySelector('p, .description')?.textContent?.trim(),
        'image': item.querySelector('img')?.src,
        'offers': {
          '@type': 'Offer',
          'price': item.dataset.price || 'Contact for price',
          'priceCurrency': 'USD',
          'url': item.querySelector('a')?.href || window.location.href
        }
      };

      if (schema.name) {
        this.addSchema(schema);
      }
    });
  }

  /**
   * Add Open Graph meta tags
   */
  addOpenGraphTags() {
    const ogTags = [
      { property: 'og:title', content: document.title },
      { property: 'og:description', content: document.querySelector('meta[name="description"]')?.content || '' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: document.querySelector('meta[property="og:image"]')?.content || `${window.location.origin}/images/Sleek_Axis.png` },
      { property: 'og:site_name', content: 'Sleek Nexus Creative' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: document.title },
      { name: 'twitter:description', content: document.querySelector('meta[name="description"]')?.content || '' },
      { name: 'twitter:image', content: document.querySelector('meta[property="og:image"]')?.content || `${window.location.origin}/images/Sleek_Axis.png` },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#1a1a1a' }
    ];

    ogTags.forEach(tag => {
      const existing = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
      
      if (!existing) {
        const meta = document.createElement('meta');
        if (tag.property) meta.setAttribute('property', tag.property);
        if (tag.name) meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });
  }

  /**
   * Add schema to page
   */
  addSchema(schema) {
    this.schemas.push(schema);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /**
   * Generate FAQ schema
   */
  generateFAQSchema(questions = []) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': questions.map(q => ({
        '@type': 'Question',
        'name': q.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': q.answer
        }
      }))
    };

    this.addSchema(faqSchema);
  }

  /**
   * Generate event schema
   */
  generateEventSchema(event) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      'name': event.name,
      'description': event.description,
      'startDate': event.startDate,
      'endDate': event.endDate,
      'location': {
        '@type': 'Place',
        'name': event.location,
        'address': event.address
      },
      'organizer': {
        '@type': 'Organization',
        'name': 'Sleek Nexus Creative',
        'url': window.location.origin
      }
    };

    this.addSchema(schema);
  }

  /**
   * Get all schemas
   */
  getAllSchemas() {
    return this.schemas;
  }
}

// Initialize
const structuredDataGenerator = new StructuredDataGenerator();
window.structuredDataGenerator = structuredDataGenerator;
