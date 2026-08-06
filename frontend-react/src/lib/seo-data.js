// Single source of truth for every reachable page's <SEO> props.
//
// Each page component spreads its entry into <SEO {...pageSeo['/route']} />, and
// scripts/generate-seo-html.mjs reads this same object after `vite build` to bake
// route-specific <title>/meta/OG/JSON-LD directly into a static dist/<route>/index.html —
// so crawlers and link-preview bots that don't execute JS still see real per-page SEO.
//
// Keep entries here in sync with each page's actual visible content; this file IS the
// content, not a cache of it.

export const pageSeo = {
  '/': {
    title: 'Sleek Nexus Creative — Technology & Innovation for South Sudan',
    description: 'Sleek Nexus Creative helps organizations in South Sudan launch dependable websites, apps, and platforms that scale, perform, and deliver measurable impact. Based in Juba.',
    canonical: '/',
    keywords: 'web development South Sudan, mobile apps Juba, IT consulting South Sudan, e-learning platform South Sudan, software company Juba, Sleek Nexus Creative, SNC technology',
    image: 'https://sleeknexuscreative.com/images/hero-tech.jpg',
    imageAlt: 'Sleek Nexus Creative — Technology & Innovation for South Sudan',
    imageWidth: 2560,
    imageHeight: 1920,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Sleek Nexus Creative',
        url: 'https://sleeknexuscreative.com',
        logo: 'https://sleeknexuscreative.com/images/snc-logo.png',
        description: 'Sleek Nexus Creative is a technology and innovation company based in Juba, South Sudan, building websites, mobile apps, e-learning platforms, and digital solutions for organizations across Africa.',
        foundingDate: '2024',
        address: { '@type': 'PostalAddress', addressLocality: 'Juba', addressCountry: 'SS' },
        contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'info@sleeknexuscreative.com', availableLanguage: 'English' },
        sameAs: [
          'https://www.linkedin.com/company/sleek-nexus-creative/',
          'https://www.facebook.com/share/183ufB9mqx/?mibextid=wwXIfr',
          'https://twitter.com/SNC',
          'https://www.instagram.com/sleek_nexus_creative',
          'https://www.youtube.com/@SNC',
          'https://www.tiktok.com/@SNC',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Sleek Nexus Creative',
        url: 'https://sleeknexuscreative.com',
        potentialAction: { '@type': 'SearchAction', target: 'https://sleeknexuscreative.com/?s={search_term_string}', 'query-input': 'required name=search_term_string' },
      },
    ],
  },

  '/innovation-hub': {
    title: 'SNC Innovation Hub — Technology & Digital Solutions for South Sudan',
    description: 'The SNC Innovation Hub is a technology and innovation ecosystem in Juba, South Sudan — delivering custom software, digital transformation, and startup support aligned with the UN SDGs.',
    canonical: '/innovation-hub',
    keywords: 'innovation hub South Sudan, tech hub Juba, software development South Sudan, digital transformation South Sudan, SNC hub, startup incubation South Sudan, SDGs technology',
    image: 'https://sleeknexuscreative.com/images/about-preview.jpg',
    imageAlt: 'SNC Innovation Hub — Technology and Digital Solutions',
    imageWidth: 1920,
    imageHeight: 1440,
    breadcrumbs: [{ name: 'Innovation Hub', url: '/innovation-hub' }],
    faq: [
      { q: 'What is the SNC Innovation Hub?', a: 'The SNC Innovation Hub is a technology and innovation ecosystem in Juba, South Sudan that delivers custom software, digital transformation, and startup support — aligned with the UN Sustainable Development Goals.' },
      { q: 'What SDGs does SNC address?', a: 'SNC directly contributes to SDG 4 (Quality Education), SDG 8 (Decent Work & Economic Growth), SDG 9 (Industry, Innovation & Infrastructure), SDG 10 (Reduced Inequalities), and SDG 17 (Partnerships for the Goals).' },
      { q: 'What technology services does SNC offer?', a: 'SNC offers custom software development, mobile apps, UI/UX design, cloud infrastructure, cybersecurity, digital consulting, and startup incubation.' },
      { q: 'Where is the SNC Innovation Hub located?', a: 'The SNC Innovation Hub is based in Juba, Central Equatoria, South Sudan.' },
    ],
  },

  '/about': {
    title: 'About Us — Sleek Nexus Creative, Juba South Sudan',
    description: 'Learn about Sleek Nexus Creative — a technology and innovation company based in Juba, South Sudan. Our story, mission, values, and the team behind the work.',
    canonical: '/about',
    keywords: 'about Sleek Nexus Creative, technology company Juba, software company South Sudan, SNC founders, tech company mission South Sudan',
    image: 'https://sleeknexuscreative.com/images/company-story.jpg',
    imageAlt: 'Sleek Nexus Creative team in Juba, South Sudan',
    imageWidth: 1920,
    imageHeight: 1440,
    breadcrumbs: [{ name: 'About', url: '/about' }],
  },

  '/services': {
    title: 'Our Services — Web, Mobile, E-Learning & IT Consulting',
    description: 'Software development, web & mobile apps, educational technology, and IT consulting services in South Sudan. Affordable, reliable, and built for local realities.',
    canonical: '/services',
    keywords: 'software development services South Sudan, web development Juba, mobile app development South Sudan, IT consulting Juba, educational technology South Sudan, custom software South Sudan',
    image: 'https://sleeknexuscreative.com/images/software-dev.jpg',
    imageAlt: 'Software development and IT services in South Sudan',
    imageWidth: 736,
    imageHeight: 736,
    breadcrumbs: [{ name: 'Services', url: '/services' }],
  },

  '/contact': {
    title: 'Contact Us — Juba, South Sudan',
    description: 'Get in touch with Sleek Nexus Creative in Juba, South Sudan. Call +211 925 277 700, email info@sleeknexuscreative.com, or fill out our contact form for a free consultation.',
    canonical: '/contact',
    keywords: 'contact Sleek Nexus Creative, web development Juba, IT consulting South Sudan, free consultation',
    imageAlt: 'Contact Sleek Nexus Creative in Juba, South Sudan',
    breadcrumbs: [{ name: 'Contact', url: '/contact' }],
    faq: [
      { q: 'How long does a typical project take?', a: 'Project timelines vary based on complexity. Simple websites take 2–4 weeks, while complex applications may take 3–6 months. We provide detailed timelines during consultation.' },
      { q: 'What is your pricing structure?', a: 'We offer flexible pricing based on project scope. Contact us for a free consultation and custom quote tailored to your needs and budget.' },
      { q: 'Do you provide ongoing support?', a: 'Yes! We offer maintenance packages and ongoing support to ensure your solution continues to perform optimally after launch.' },
      { q: 'Can you work with our existing systems?', a: 'Absolutely. We specialize in integrations and can work with your existing infrastructure to create seamless solutions.' },
    ],
  },

  '/get-started': {
    title: 'Get Started — Start a Project with Sleek Nexus Creative',
    description: "Ready to build something? Tell us about your project and we'll get back to you within 24 hours with a free consultation and custom proposal.",
    canonical: '/get-started',
    keywords: 'start a project, hire software developers South Sudan, web development quote, mobile app development Africa',
    image: 'https://sleeknexuscreative.com/images/about-preview.jpg',
    imageAlt: 'Start a project with Sleek Nexus Creative',
    imageWidth: 1920,
    imageHeight: 1440,
    breadcrumbs: [{ name: 'Get Started', url: '/get-started' }],
    faq: [
      { q: 'Do I need to know exactly what I want before reaching out?', a: 'No. Most clients start with a general idea or a problem they need solved. Our discovery call is designed to help shape that into a clear, buildable scope together.' },
      { q: 'How much does a typical project cost?', a: 'It depends entirely on scope. We offer tiers from a simple starter website to full enterprise systems — every quote is customized after a free consultation, with no hidden fees.' },
      { q: 'How long does a project take?', a: 'Simple websites typically take 2–4 weeks; custom applications usually take 1–3 months; large enterprise systems can take 3–6+ months. You will get a clear timeline in your proposal.' },
      { q: 'Is my project idea kept confidential?', a: "Yes. We treat every project brief as confidential, and we're happy to sign an NDA before any detailed discussion if you'd prefer." },
      { q: "What if I'm not ready to commit yet?", a: 'That\'s completely fine — the discovery call and proposal are free with no obligation. Many people use it just to understand scope and cost before deciding.' },
      { q: 'Can I request changes after receiving the proposal?', a: 'Absolutely. The proposal is a starting point for discussion, not a final offer — we refine it together until the scope and pricing actually fit your needs.' },
    ],
  },

  '/privacy': {
    title: 'Privacy Policy',
    description: 'How Sleek Nexus Creative collects, uses, and protects your personal information.',
    canonical: '/privacy',
    keywords: 'privacy policy Sleek Nexus Creative, data protection South Sudan, SNC privacy policy',
    breadcrumbs: [{ name: 'Privacy Policy', url: '/privacy' }],
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Privacy Policy', url: 'https://sleeknexuscreative.com/privacy' },
  },

  '/terms': {
    title: 'Terms of Service',
    description: "Terms and conditions governing your use of Sleek Nexus Creative's services.",
    canonical: '/terms',
    keywords: 'terms of service Sleek Nexus Creative, terms and conditions South Sudan, SNC terms of service',
    breadcrumbs: [{ name: 'Terms of Service', url: '/terms' }],
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Terms of Service', url: 'https://sleeknexuscreative.com/terms' },
  },

  '/services/web-dev': {
    title: 'Web Development — Custom Websites & Web Apps',
    description: "Custom, responsive websites and web applications built for South Sudan's real conditions — mobile-first, low-bandwidth optimized, and production-ready. Get a free quote.",
    canonical: '/services/web-dev',
    keywords: 'web development South Sudan, website design Juba, custom web applications, responsive websites South Sudan, e-commerce websites Juba, web developer South Sudan',
    image: 'https://sleeknexuscreative.com/images/web-mobile.jpg',
    imageAlt: 'Web development services by Sleek Nexus Creative',
    imageWidth: 736,
    imageHeight: 1308,
    breadcrumbs: [{ name: 'Services', url: '/services' }, { name: 'Web Development', url: '/services/web-dev' }],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Web Development',
      name: 'Web Development',
      description: 'Custom website and web application development, including responsive design, progressive web apps, e-commerce platforms, and API integration.',
      provider: { '@type': 'Organization', name: 'Sleek Nexus Creative', url: 'https://sleeknexuscreative.com' },
      areaServed: { '@type': 'Country', name: 'South Sudan' },
    },
  },

  '/services/mobile-apps': {
    title: 'Mobile App Development — iOS, Android & Cross-Platform',
    description: "Native and cross-platform mobile apps built for South Sudan's mobile-first users — offline-capable, lightweight, and optimized for low-end devices and slow networks.",
    canonical: '/services/mobile-apps',
    keywords: 'mobile app development South Sudan, iOS app development Juba, Android app development, React Native developer South Sudan, offline mobile apps Africa',
    image: 'https://sleeknexuscreative.com/images/web-mobile.jpg',
    imageAlt: 'Mobile app development services by Sleek Nexus Creative',
    imageWidth: 736,
    imageHeight: 1308,
    breadcrumbs: [{ name: 'Services', url: '/services' }, { name: 'Mobile App Development', url: '/services/mobile-apps' }],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Mobile App Development',
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile app development for iOS and Android, including offline-capable and low-bandwidth-optimized apps.',
      provider: { '@type': 'Organization', name: 'Sleek Nexus Creative', url: 'https://sleeknexuscreative.com' },
      areaServed: { '@type': 'Country', name: 'South Sudan' },
    },
  },

  '/services/ui-ux': {
    title: 'UI/UX Design — Human-Centered Digital Design',
    description: 'User research, wireframing, and high-fidelity UI design that makes digital products intuitive, accessible, and beautiful — built for real users in South Sudan.',
    canonical: '/services/ui-ux',
    keywords: 'UI UX design South Sudan, user experience design Juba, product design South Sudan, Figma designer South Sudan, app design services, website design services',
    image: 'https://sleeknexuscreative.com/images/software-dev.jpg',
    imageAlt: 'UI/UX design services by Sleek Nexus Creative',
    imageWidth: 736,
    imageHeight: 736,
    breadcrumbs: [{ name: 'Services', url: '/services' }, { name: 'UI/UX Design', url: '/services/ui-ux' }],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'UI/UX Design',
      name: 'UI/UX Design',
      description: 'User research, wireframing, prototyping, and high-fidelity UI design for web and mobile products.',
      provider: { '@type': 'Organization', name: 'Sleek Nexus Creative', url: 'https://sleeknexuscreative.com' },
      areaServed: { '@type': 'Country', name: 'South Sudan' },
    },
  },

  '/services/branding': {
    title: 'Branding & Identity Design',
    description: 'Logo design, brand strategy, and complete visual identity systems that make your organization instantly recognizable — across digital, print, and merchandise.',
    canonical: '/services/branding',
    keywords: 'branding services South Sudan, logo design Juba, brand identity design, visual identity South Sudan, brand strategy Juba, graphic design South Sudan',
    imageAlt: 'Branding and identity design services by Sleek Nexus Creative',
    breadcrumbs: [{ name: 'Services', url: '/services' }, { name: 'Branding & Identity', url: '/services/branding' }],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Branding & Identity Design',
      name: 'Branding & Identity',
      description: 'Logo design, brand strategy, visual identity systems, and brand style guides for organizations.',
      provider: { '@type': 'Organization', name: 'Sleek Nexus Creative', url: 'https://sleeknexuscreative.com' },
      areaServed: { '@type': 'Country', name: 'South Sudan' },
    },
    faq: [
      { q: 'How long does a branding project take?', a: 'A logo and core identity typically takes 2–3 weeks. A full brand system with style guide, templates, and merchandise usually takes 3–5 weeks, depending on revision rounds.' },
      { q: 'Do I receive the source files?', a: 'Yes. Every project includes the full logo suite in editable and production formats (SVG, PNG, PDF) plus your color, type, and usage guidelines — nothing is locked to us.' },
      { q: 'How many logo concepts will I see?', a: "We typically present 2–3 distinct directions based on your discovery session, then refine your chosen direction through focused revision rounds until it's right." },
      { q: 'Can you rebrand an existing organization without losing recognition?', a: "Yes — we call this a refresh. We study what's already working in your current brand and evolve it deliberately, rather than starting from zero." },
      { q: 'Do you design for both digital and print?', a: 'Yes. Every brand system we deliver is built to work consistently across websites, social media, business cards, signage, and merchandise.' },
    ],
  },

  '/services/consulting': {
    title: 'IT Consulting & Digital Transformation',
    description: 'Strategic technology advisory to help your organization navigate digital transformation — technology strategy, system architecture, security audits, and cloud migration.',
    canonical: '/services/consulting',
    keywords: 'IT consulting South Sudan, digital transformation Juba, technology strategy South Sudan, IT consultant Juba, cloud migration services, security audit South Sudan',
    image: 'https://sleeknexuscreative.com/images/consulting.jpg',
    imageAlt: 'IT consulting and digital transformation services by Sleek Nexus Creative',
    imageWidth: 736,
    imageHeight: 552,
    breadcrumbs: [{ name: 'Services', url: '/services' }, { name: 'IT Consulting', url: '/services/consulting' }],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'IT Consulting',
      name: 'IT Consulting & Digital Transformation',
      description: 'Technology strategy, digital transformation planning, system architecture design, security audits, and cloud migration advisory services.',
      provider: { '@type': 'Organization', name: 'Sleek Nexus Creative', url: 'https://sleeknexuscreative.com' },
      areaServed: { '@type': 'Country', name: 'South Sudan' },
    },
  },
}
