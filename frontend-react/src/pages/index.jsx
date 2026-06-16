import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

// ─── Partners ────────────────────────────────────────────────────────────────

const partnerTypes = [
  { icon: 'fa-laptop-code', title: 'Technology Partners', desc: 'Software vendors, cloud providers, and tech companies who collaborate with us to deliver better solutions for our clients.' },
  { icon: 'fa-graduation-cap', title: 'Education Partners', desc: 'Universities, schools, and NGOs that collaborate with SNC Academy to expand tech education access across South Sudan.' },
  { icon: 'fa-handshake', title: 'Implementation Partners', desc: 'Consultancies and service firms that resell or co-deliver SNC solutions to organizations across East Africa.' },
  { icon: 'fa-building', title: 'Corporate Partners', desc: 'Businesses and institutions that fund initiatives, sponsor training programs, or co-invest in community tech programs.' },
]

const currentPartners = [
  { img: '/images/partner-dxc-technology.jpg', name: 'DXC Technology', type: 'Technology', desc: 'Collaborating on educational technology initiatives, curriculum development, and comprehensive training programs that transform learning outcomes.' },
  { img: '/images/partner-education.jpg', name: 'Education Partner', type: 'Education', desc: 'Providing cutting-edge platforms, tools, and technical expertise to accelerate our development initiatives and maximize project impact.' },
  { img: '/images/partner-dxc-ferrari.jpg', name: 'DXC Technology Team Partner', type: 'Corporate', desc: 'Co-developing enterprise solutions, sharing market intelligence, and driving mutual business growth through strategic collaboration.' },
]

const partnerFAQs = [
  {
    q: 'What does the partnership process look like?',
    a: 'Our partnership process begins with a comprehensive consultation to understand your strategic objectives and identify collaboration opportunities. We then co-develop a detailed partnership agreement outlining mutual benefits, shared responsibilities, success metrics, and implementation timelines.',
  },
  {
    q: 'What types of partnerships do you offer?',
    a: 'We offer Technology Partnerships (platform integration, technical collaboration), Educational Partnerships (curriculum development, training programs), Business Collaborations (joint ventures, co-development), and Community Partnerships (social impact initiatives). Each is customized to align with both organizations\u2019 missions.',
  },
  {
    q: 'What are the benefits of partnering with Sleek Nexus Creative?',
    a: 'Partners gain access to our deep technical expertise, extensive local market knowledge, established community networks, and proven track record delivering impact in South Sudan. Benefits include co-branding opportunities, joint project development, shared resources, priority support, and amplified market reach.',
  },
]

function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-3">
      {items.map(({ q, a }, i) => (
        <div key={i} className="card overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-dark text-sm gap-4"
          >
            {q}
            <i className={`fas fa-chevron-down text-primary text-xs transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && <p className="px-6 pb-5 text-muted text-sm leading-relaxed">{a}</p>}
        </div>
      ))}
    </div>
  )
}

export function Partners() {
  return (
    <>
      <Helmet><title>Partner With Us - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Collaboration" title="Our Partners" desc="Co-Creating South Sudan's Digital Future Through Strategic Collaboration" />

      {/* Partnership Types */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Partnership Types</p>
            <h2 className="section-title">How We Work Together</h2>
            <p className="section-subtitle">We welcome partnerships that create real value — for your organization and for South Sudan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map(({ icon, title, desc }, i) => (
              <motion.div key={title} className="card p-6" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-6">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Strategic Partnerships</p>
            <h2 className="section-title">Organizations We Work With</h2>
            <p className="section-subtitle">We forge strategic alliances with leading organizations, premier educational institutions, and innovative technology companies.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {currentPartners.map(({ img, name, type, desc }) => (
              <div key={name} className="card overflow-hidden">
                <img src={img} alt={name} className="w-full h-44 object-cover" loading="lazy" />
                <div className="p-5">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{type}</span>
                  <h3 className="font-heading font-bold text-dark mt-1 mb-2">{name}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Community Partner */}
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2 text-center">Featured Community Partner</p>
          <p className="text-center text-muted text-sm mb-6">Our dedicated community partner working to create sustainable impact through technology-enabled development programs.</p>
          <div className="max-w-sm mx-auto card overflow-hidden">
            <img src="/images/partner-strong-families.jpg" alt="Community Partner" className="w-full h-44 object-cover" loading="lazy" />
            <div className="p-5 text-center">
              <h3 className="font-heading font-bold text-dark mb-2">Community Partner</h3>
              <p className="text-muted text-sm">Partnering to create measurable, sustainable impact in local communities through technology-enabled development programs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <i className="fas fa-quote-left text-primary/20 text-5xl mb-6 block" />
          <blockquote className="text-lg text-dark leading-relaxed italic mb-6">
            "Partnering with Sleek Nexus Creative has been transformative for our organization. Their unwavering commitment to innovation, technical excellence, and community impact aligns seamlessly with our mission. Together, we've reached thousands of students across South Sudan, delivering measurable improvements in educational access and outcomes."
          </blockquote>
          <p className="font-semibold text-dark">Dr. Sarah Johnson</p>
          <p className="text-muted text-sm">Director, Education Development Initiative</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Questions</p>
            <h2 className="section-title">Partnership FAQs</h2>
          </div>
          <FAQAccordion items={partnerFAQs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Become a Strategic Partner</h2>
          <p className="text-gray-300 mb-8">Join us in pioneering South Sudan's digital transformation and creating lasting social impact through technology.</p>
          <Link to="/contact" className="btn-primary">Partner With Us</Link>
        </div>
      </section>
    </>
  )
}

// ─── Donors ──────────────────────────────────────────────────────────────────

const donorCategories = [
  { img: '/images/donor-major-capital-one.jpg', name: 'Major Donor', desc: 'Championing large-scale educational technology initiatives that transform learning outcomes across South Sudan.' },
  { img: '/images/donor-foundation-reconnecting.jpg', name: 'Foundation Partner', desc: 'Funding comprehensive youth empowerment programs, skills development initiatives, and career acceleration pathways.' },
  { img: '/images/donor-grant-provider.jpg', name: 'Grant Provider', desc: 'Enabling sustainable, scalable technology solutions that create lasting positive impact in underserved communities.' },
]

const impactStats = [
  { icon: 'fa-users', value: '10,000+', label: 'Students Reached' },
  { icon: 'fa-map-marker-alt', value: '50+', label: 'Communities Served' },
  { icon: 'fa-project-diagram', value: '100+', label: 'Projects Completed' },
  { icon: 'fa-briefcase', value: '200+', label: 'Jobs Created' },
]

const donorFAQs = [
  {
    q: 'Is my donation tax deductible?',
    a: 'Yes, Sleek Nexus Creative operates as a registered nonprofit organization. All charitable contributions are tax-deductible to the maximum extent permitted by applicable law. We provide official donation receipts and comprehensive documentation for all contributions.',
  },
  {
    q: 'How will my donation be used?',
    a: 'Your contribution directly funds educational technology platforms, youth skills training initiatives, community development projects, and critical infrastructure improvements. We maintain rigorous financial transparency, allocating 85% of donations directly to program delivery.',
  },
  {
    q: 'Can I designate my donation for a specific program?',
    a: 'Absolutely! You can direct your contribution to Educational Technology, Youth Empowerment, Community Development, or Innovation Labs. Contact our donor relations team to discuss customized giving options aligned with your philanthropic priorities.',
  },
  {
    q: 'Do you provide impact reports?',
    a: 'Yes. All donors receive detailed quarterly reports featuring project progress, beneficiary statistics, success stories, and financial accountability statements. Major donors ($10,000+) receive personalized briefings and exclusive site visit opportunities.',
  },
]

export function Donors() {
  return (
    <>
      <Helmet><title>Donate - Sleek Nexus Creative</title></Helmet>
      <PageHeader label="Support Our Mission" title="Our Donors" desc="Investing in Innovation, Empowering Communities, Transforming Lives" />

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {impactStats.map(({ icon, value, label }) => (
              <div key={label}>
                <i className={`fas ${icon} text-2xl mb-2 block`} />
                <div className="text-4xl font-heading font-black mb-1">{value}</div>
                <div className="text-white/80 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Catalyzing Innovation</p>
            <h2 className="section-title">Our Valued Donors</h2>
            <p className="section-subtitle">We extend our deepest gratitude to our visionary donors who champion our mission to democratize education, empower youth, and catalyze sustainable development through transformative technology solutions.</p>
          </div>

          {/* Donor Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {donorCategories.map(({ img, name, desc }) => (
              <div key={name} className="card overflow-hidden">
                <img src={img} alt={name} className="w-full h-44 object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-heading font-bold text-dark mb-2">{name}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Corporate Sponsor */}
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2 text-center">Featured Corporate Sponsor</p>
          <p className="text-center text-muted text-sm mb-6">Our premier corporate partner providing strategic support and resources for large-scale technology infrastructure development.</p>
          <div className="max-w-sm mx-auto card overflow-hidden mb-16">
            <img src="/images/donor-corporate-microsoft.jpg" alt="Corporate Sponsor" className="w-full h-44 object-cover" loading="lazy" />
            <div className="p-5 text-center">
              <h3 className="font-heading font-bold text-dark mb-2">Corporate Sponsor</h3>
              <p className="text-muted text-sm">Investing in critical infrastructure development, organizational capacity building, and long-term sustainability initiatives.</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <i className="fas fa-quote-left text-primary/20 text-5xl mb-6 block" />
            <blockquote className="text-lg text-dark leading-relaxed italic mb-6">
              "Supporting Sleek Nexus Creative represents one of our most impactful philanthropic investments. Their exceptional transparency, rigorous impact measurement, and unwavering dedication to empowering South Sudanese youth through technology education make them an outstanding partner in creating transformative, sustainable change."
            </blockquote>
            <p className="font-semibold text-dark">Michael Chen</p>
            <p className="text-muted text-sm">Executive Director, Global Impact Foundation</p>
          </div>

          {/* Donate CTA Card */}
          <div className="max-w-xl mx-auto card p-8 text-center">
            <h3 className="font-heading font-bold text-dark text-xl mb-2">Make a Donation</h3>
            <p className="text-muted text-sm mb-6">Reach out to discuss donation amounts, tax receipts, and how your contribution will be used.</p>
            <div className="flex flex-col gap-3">
              <Link to="/contact" className="btn-primary justify-center">Contact Us to Donate</Link>
              <a href="mailto:info@SNC.ss" className="btn-secondary justify-center">info@SNC.ss</a>
            </div>
          </div>
        </div>
      </section>

      {/* Donor FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Questions</p>
            <h2 className="section-title">Donor FAQs</h2>
          </div>
          <FAQAccordion items={donorFAQs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Invest in Transformative Impact</h2>
          <p className="text-gray-300 mb-8">Partner with us to create lasting change and empower the next generation through technology.</p>
          <Link to="/contact" className="btn-primary">Become a Donor</Link>
        </div>
      </section>
    </>
  )
}

// ─── Not Found ────────────────────────────────────────────────────────────────

export function NotFound() {
  return (
    <>
      <Helmet><title>404 - Page Not Found | Sleek Nexus Creative</title></Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-6">
          <div className="text-8xl font-heading font-black text-primary/20 mb-4">404</div>
          <h1 className="text-3xl font-heading font-bold text-dark mb-3">Page Not Found</h1>
          <p className="text-muted mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">Go Home</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  )
}
