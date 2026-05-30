import { Link } from 'react-router-dom';
import CTASection from '../components/CTA';

const services = [
  {
    id: 'software-dev', icon: 'fa-code', title: 'Software Development', img: '/images/software-dev.jpg',
    intro: 'Enterprise-grade custom software engineered with cutting-edge technologies to address complex business challenges and drive sustainable growth.',
    offers: ['Custom Application Development','Enterprise Software Solutions','API Development & Integration','Database Design & Management','Cloud-Based Solutions','Software Maintenance & Support'],
    extra: { label: 'Our Process', items: ['Requirements Analysis','Design & Planning','Development','Testing & QA','Deployment & Support'] },
  },
  {
    id: 'web-mobile', icon: 'fa-mobile-alt', title: 'Web & Mobile Applications', img: '/images/web-mobile.jpg', reverse: true,
    intro: 'Cutting-edge responsive platforms and mobile solutions engineered to deliver exceptional user experiences across all devices.',
    offers: ['Responsive Website Development','Progressive Web Apps (PWA)','iOS & Android App Development','Cross-Platform Solutions','E-Commerce Platforms','UI/UX Design'],
    extra: { label: 'Technologies We Use', badges: ['React','Angular','Vue.js','React Native','Flutter','Node.js'] },
  },
  {
    id: 'edtech', icon: 'fa-graduation-cap', title: 'Educational Technology', img: '/images/edtech.jpg',
    intro: 'Revolutionary learning ecosystems and educational tools that democratize access to quality education and deliver measurable learning outcomes.',
    offers: ['Learning Management Systems (LMS)','Online Course Platforms','Student Information Systems','Interactive Learning Tools','Assessment & Analytics','Virtual Classroom Solutions'],
    extra: { label: 'Key Features', features: [['fa-video','Video Learning'],['fa-chart-line','Progress Tracking'],['fa-users','Collaboration'],['fa-certificate','Certifications']] },
  },
  {
    id: 'consulting', icon: 'fa-laptop-code', title: 'IT Consulting & Digital Transformation', img: '/images/consulting.jpg', reverse: true,
    intro: 'Strategic technology advisory services designed to navigate digital transformation complexities and position your organization for sustained competitive advantage.',
    offers: ['Technology Strategy & Planning','Digital Transformation','System Architecture Design','Security Audits & Compliance','Cloud Migration Services','Performance Optimization'],
    extra: { label: 'Why Choose Us', benefits: [['fa-lightbulb','Expert Guidance','Decades of combined experience across diverse industries'],['fa-shield-alt','Security First','Enterprise-grade security and compliance best practices'],['fa-rocket','Scalable Solutions','Built to grow with your business']] },
  },
];

const packages = [
  {
    tier: 'BASIC', name: 'Starter', icon: 'fa-seedling', timeline: '2–4 weeks delivery',
    desc: 'Perfect for getting your digital presence off the ground quickly and affordably.',
    features: ['Basic website or simple app','Up to 5 pages/screens','Mobile-friendly responsive design','Basic SEO setup','Contact form / WhatsApp integration','30 days post-launch support'],
    bestFor: 'Small businesses, shops, personal brands, NGOs starting out',
  },
  {
    tier: 'POPULAR', name: 'Professional', icon: 'fa-rocket', timeline: '1–3 months delivery', featured: true,
    desc: 'The go-to choice for growing organizations that need powerful, custom-built solutions.',
    features: ['Custom website or application','Up to 15–25 pages/screens','Advanced features (dashboards, payments, bookings)','API integration','Admin panel included','Performance optimization','90 days post-launch support','Staff training included'],
    bestFor: 'Growing companies, schools, hospitals, NGOs, startups',
  },
  {
    tier: 'ENTERPRISE', name: 'Premium', icon: 'fa-city', timeline: '3–6+ months delivery',
    desc: 'Full-scale enterprise solutions built for complex, high-stakes environments.',
    features: ['Enterprise-level platform','Complex system architecture','Multiple integrations (payments, SMS, databases)','Cloud deployment & DevOps','Dedicated development team','Security & backup systems','1 year post-launch support','Priority support & SLA'],
    bestFor: 'Banks, telecoms, government institutions, large organizations',
  },
];

export default function Services() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="tagline">Enterprise-Grade Technology Solutions Engineered for Your Success</span>
          <h1>Our Services</h1>
          <p className="header-description">
            We deliver comprehensive technology services designed to transform your business operations and accelerate growth — from custom software to strategic IT consulting.
          </p>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={`py-20 ${i % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="container">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${s.reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div className="fade-in">
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-[#c41e3a] text-2xl mb-5">
                  <i className={`fas ${s.icon}`} />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-6">{s.intro}</p>
                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">What We Offer</h3>
                <ul className="space-y-2 mb-6">
                  {s.offers.map(o => (
                    <li key={o} className="flex items-center gap-2 text-gray-600 text-sm">
                      <i className="fas fa-check text-[#c41e3a] text-xs" /> {o}
                    </li>
                  ))}
                </ul>
                {s.extra.badges && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.extra.badges.map(b => <span key={b} className="tech-badge">{b}</span>)}
                  </div>
                )}
                {s.extra.items && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.extra.items.map((item, idx) => (
                      <div key={item} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                        <span className="w-6 h-6 rounded-full bg-[#c41e3a] text-white text-xs flex items-center justify-center font-bold">{idx+1}</span>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
                {s.extra.features && (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {s.extra.features.map(([icon, label]) => (
                      <div key={label} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 text-sm">
                        <i className={`fas ${icon} text-[#c41e3a]`} /> {label}
                      </div>
                    ))}
                  </div>
                )}
                {s.extra.benefits && (
                  <div className="space-y-3 mb-6">
                    {s.extra.benefits.map(([icon, title, desc]) => (
                      <div key={title} className="flex gap-3">
                        <i className={`fas ${icon} text-[#c41e3a] mt-1`} />
                        <div><h4 className="font-semibold text-gray-900 text-sm">{title}</h4><p className="text-gray-500 text-xs">{desc}</p></div>
                      </div>
                    ))}
                  </div>
                )}
                <Link to="/contact" className="btn btn-primary">Request a Quote</Link>
              </div>
              <div className="fade-in">
                <img src={s.img} alt={s.title} loading="lazy" className="rounded-2xl shadow-xl w-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Packages */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <span className="section-label">Service Packages</span>
          <h2 className="section-title">Find the Right Fit for Your Project</h2>
          <p className="section-subtitle">Every project is unique. Browse our packages then contact us for a tailored quote.</p>
          <div className="grid sm:grid-cols-3 gap-6 mt-10 items-start">
            {packages.map(p => (
              <div key={p.name} className={`pricing-card ${p.featured ? 'featured' : ''}`}>
                {p.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c41e3a] text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>}
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-3 mx-auto ${p.featured ? 'bg-[#c41e3a] text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <i className={`fas ${p.icon}`} />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${p.featured ? 'bg-[#ff8c42] text-white' : 'bg-gray-100 text-gray-600'}`}>{p.tier}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</h3>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                  <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1 text-xs text-gray-500 mt-3">
                    <i className="fas fa-clock text-[#c41e3a]" /> {p.timeline}
                  </div>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="fas fa-check text-[#c41e3a] mt-0.5 shrink-0 text-xs" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                  <i className="fas fa-users text-[#c41e3a]" /> {p.bestFor}
                </div>
                <Link to="/contact" className={`btn w-full justify-center ${p.featured ? 'btn-primary' : 'btn-outline'}`}>Get a Free Quote</Link>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-8">
            <i className="fas fa-shield-alt text-[#c41e3a] mr-2" />
            All packages include a <strong>free initial consultation</strong>. Pricing is customized to your exact requirements.
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to Accelerate Your Digital Transformation?"
        subtitle="Partner with us to unlock innovative solutions that drive growth, efficiency, and competitive advantage."
        primaryLabel="Contact Us"
        primaryTo="/contact"
        secondaryLabel="View Our Work"
        secondaryTo="/projects"
        trust={[]}
      />
    </>
  );
}
