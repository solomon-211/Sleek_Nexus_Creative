// Shared package/tier definitions — used by the static package grid on the
// Services page and by PricingEstimator's recommendation result, so both
// always describe the exact same three tiers.
export const packages = [
  {
    tier: 'BASIC', label: 'Starter', icon: 'fa-seedling', timeline: '2–4 weeks', popular: false, color: '',
    desc: 'Perfect for getting your digital presence off the ground quickly and affordably.',
    features: ['Basic website or simple app', 'Up to 5 pages/screens', 'Mobile-friendly responsive design', 'Basic SEO setup', 'Contact form / WhatsApp integration', '30 days post-launch support'],
    bestFor: 'Small businesses, shops, personal brands, NGOs starting out',
  },
  {
    tier: 'POPULAR', label: 'Professional', icon: 'fa-rocket', timeline: '1–3 months', popular: true, color: 'text-accent',
    desc: 'The go-to choice for growing organizations that need powerful, custom-built solutions.',
    features: ['Custom website or application', 'Up to 15–25 pages/screens', 'Advanced features (dashboards, payments)', 'API integration', 'Admin panel included', '90 days post-launch support', 'Staff training included'],
    bestFor: 'Growing companies, schools, hospitals, NGOs, startups',
  },
  {
    tier: 'ENTERPRISE', label: 'Premium', icon: 'fa-city', timeline: '3–6+ months', popular: false, color: '',
    desc: 'Full-scale enterprise solutions built for complex, high-stakes environments.',
    features: ['Enterprise-level platform', 'Complex system architecture', 'Multiple integrations (payments, SMS)', 'Cloud deployment & DevOps', 'Dedicated development team', '1 year post-launch support', 'Priority support & SLA'],
    bestFor: 'Banks, telecoms, government institutions, large organizations',
  },
]
