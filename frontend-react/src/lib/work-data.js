// Portfolio content — the single source for the /work page and for the brand
// gallery on /services/branding, so a project added here appears in both.
//
// To add a project: append to `brandWork` (image-led work) or add another
// `featured`-shaped object and render it on Work.jsx. Put the image in
// public/images and run `npm run images` to generate its WebP variants.

export const EDUPORTAL_URL  = 'https://eduportalss.solomonleek.tech'
export const HEALTHHUB_URL  = 'https://healthhubbridge.com'

// Live products — shown on Home, on /work, and in the Innovation Hub's
// "Innovation in Action". Everything said here should be true of the live
// site; check it there before changing a claim.
export const liveProducts = [
  {
    id: 'eduportal',
    title: 'EduPortal South Sudan',
    sector: 'Education',
    icon: 'fa-graduation-cap',
    tagline: 'Empowering every learner across South Sudan',
    url: EDUPORTAL_URL,
    displayUrl: 'eduportalss.solomonleek.tech',
    cta: 'Visit EduPortal',
    summary: 'A full-scale education platform we designed, built, and deployed — helping learners across all 10 states discover schools, apply for scholarships, and track their progress, completely free.',
    short: 'Learners across all 10 states discover schools, apply for scholarships, and track their progress — completely free.',
    facts: [
      { icon: 'fa-map-marker-alt',     label: '10 States Covered' },
      { icon: 'fa-hand-holding-heart', label: 'Free — Always' },
      { icon: 'fa-signal',             label: 'Live In Production' },
    ],
    capabilities: [
      { icon: 'fa-magnifying-glass', title: 'School Discovery',  desc: 'Learners find schools across every state from one place.' },
      { icon: 'fa-award',            title: 'Scholarships',      desc: 'Scholarship opportunities gathered together, with applications handled on the platform.' },
      { icon: 'fa-chart-line',       title: 'Progress Tracking', desc: 'Each learner can follow their own progress over time.' },
    ],
    services: ['Software Development', 'UI/UX Design', 'Educational Technology'],
  },
  {
    id: 'healthhub',
    title: 'HealthHub Bridge',
    sector: 'Healthcare',
    icon: 'fa-heart-pulse',
    tagline: 'Faster records, faster referrals',
    url: HEALTHHUB_URL,
    displayUrl: 'healthhubbridge.com',
    cta: 'Visit HealthHub Bridge',
    summary: "A hospital management system built for facilities where the network can't be trusted — registration, triage, consultation, laboratory, pharmacy, and billing in one place, with patient referrals at its core. Now piloting at Bor State Hospital.",
    short: 'Hospital records and referrals in one system — registration to billing — built to keep working when the network drops. Piloting at Bor State Hospital.',
    facts: [
      { icon: 'fa-hospital', label: 'Piloting at Bor State Hospital' },
      { icon: 'fa-wifi',     label: 'Built for Weak Networks' },
      { icon: 'fa-signal',   label: 'Live In Production' },
    ],
    capabilities: [
      { icon: 'fa-hospital-user',    title: 'One System, Every Desk',         desc: 'Registration, triage, consultation, lab, pharmacy, and billing share one patient record.' },
      { icon: 'fa-share-from-square', title: 'Referrals at the Core',          desc: 'Built around the referral record — the paperwork that can take 30 to 60 minutes to prepare by hand.' },
      { icon: 'fa-wifi',             title: 'Keeps Working Offline',          desc: 'Check-ins, viewed records, and lab orders carry on without signal and sync when the connection returns.' },
    ],
    services: ['Software Development', 'UI/UX Design', 'Health Technology'],
  },
]

export const brandWork = [
  {
    src: '/images/rise-leadership-academy.png',
    title: 'Rise Leadership Academy',
    category: 'Brand Identity',
    desc: 'Full brand identity for Rise Leadership Academy — built to inspire and empower the next generation of leaders.',
  },
  {
    src: '/images/building-the-future.png',
    title: 'Building the Future',
    category: 'Campaign Design',
    desc: 'Inspirational brand campaign communicating vision and forward momentum.',
  },
  {
    src: '/images/honoring-excellence.png',
    title: 'Honoring Excellence',
    category: 'Event Branding',
    desc: 'Ceremonial brand materials for recognition and award programs.',
  },
  {
    src: '/images/fresh-identity.png',
    title: 'Fresh Identity',
    category: 'Brand Launch',
    desc: 'Clean, modern brand launch materials built for digital-first audiences.',
  },
  {
    src: '/images/white-hoodie-gold-print.png',
    title: 'White Hoodie — Gold Print',
    category: 'Brand Merchandise',
    desc: 'Brand applied to physical merchandise — hoodies, apparel, and print materials.',
  },
  {
    src: '/images/orange-t-shirt.png',
    title: 'Orange T-Shirt',
    category: 'Brand Merchandise',
    desc: 'Branded apparel design — vibrant orange tee with bold logo placement.',
  },
]

// Filter chips on /work, in display order. 'All' is added by the page.
export const brandCategories = [...new Set(brandWork.map((w) => w.category))]
