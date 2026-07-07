import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import NewsletterForm from '../components/ui/NewsletterForm'
import { fadeUp } from '../lib/animations'

const faqs = [
  {
    q: 'What types of partnerships are you open to?',
    a: 'We are open to technology collaborations, educational program partnerships, corporate sponsorships, and community impact initiatives. If you have an idea that doesn\'t fit neatly into a category, reach out anyway — we are flexible.',
  },
  {
    q: 'Do I need to be a large organization to partner with SNC?',
    a: 'Not at all. We welcome partnerships with organizations of all sizes — from small NGOs to growing businesses. What matters most is shared values and a genuine desire to create impact in South Sudan.',
  },
  {
    q: 'How is my donation used?',
    a: 'Donations go directly toward youth tech training, community digital tools, devices and connectivity support, and open community events. We are committed to transparency and will keep you updated on how your contribution is making a difference.',
  },
  {
    q: 'Can I donate toward a specific program?',
    a: 'Yes. If you have a specific area you want to support — such as training programs or community workshops — just mention it when you reach out and we will accommodate your preference.',
  },
  {
    q: 'How long does it take to hear back after reaching out?',
    a: 'We respond to all partnership and donation inquiries within 24 hours on business days. For urgent matters, you can also reach us directly at info@sleeknexuscreative.com.',
  },
]

function FAQItem({ q, a, i, open, onToggle }) {
  return (
    <motion.div
      className="card overflow-hidden"
      variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-dark text-sm gap-4"
      >
        {q}
        <i className={`fas fa-chevron-down text-primary text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="px-6 pb-5 text-muted text-sm leading-relaxed">{a}</p>}
    </motion.div>
  )
}

export default function GetStarted() {
  const [openFaq, setOpenFaq] = useState(null)
  return (
    <>
      <SEO
        title="Get Started — Partner, Donate & Get Involved in South Sudan"
        description="Partner with Sleek Nexus Creative, donate to support youth tech education in South Sudan, or get involved as a volunteer, trainer, or mentor. Start making an impact today."
        canonical="/get-started"
        keywords="partner with SNC, donate tech education South Sudan, get involved Juba, volunteer South Sudan tech, support digital innovation"
        image="https://sleeknexuscreative.com/images/hero-tech.png"
        imageAlt="Get involved with Sleek Nexus Creative in South Sudan"
        breadcrumbs={[{ name: 'Get Started', url: '/get-started' }]}
        faq={faqs.map(({ q, a }) => ({ q, a }))}
      />
      <PageHeader
        label="Get Involved"
        title="Get Started"
        desc="Whether you want to partner with us or support our mission, we would love to hear from you."
      />

      {/* QUICK NAV */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-[72px] z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-wrap gap-3 justify-center">
          {[
            { label: 'Partner With Us', hash: '#partner', icon: 'fa-handshake', color: 'text-primary border-primary/30 hover:bg-primary hover:text-white' },
            { label: 'Donate', hash: '#donate', icon: 'fa-heart', color: 'text-accent border-accent/30 hover:bg-accent hover:text-white' },
            { label: 'FAQs', hash: '#faqs', icon: 'fa-question-circle', color: 'text-dark border-gray-200 hover:bg-dark hover:text-white' },
            { label: 'Stay Connected', hash: '#newsletter', icon: 'fa-envelope', color: 'text-dark border-gray-200 hover:bg-dark hover:text-white' },
          ].map(({ label, hash, icon, color }) => (
            <a key={hash} href={hash} className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${color}`}>
              <i className={`fas ${icon} text-xs`} /> {label}
            </a>
          ))}
        </div>
      </section>

      {/* WAYS TO GET INVOLVED */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">How You Can Help</p>
            <h2 className="section-title">Ways to Get Involved</h2>
            <p className="section-subtitle">There is a place for everyone who wants to contribute to South Sudan's digital growth.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'fa-handshake', color: 'bg-primary/10 text-primary', title: 'Partner', desc: 'Collaborate with us on projects, programs, or initiatives that create shared value.', hash: '#partner' },
              { icon: 'fa-heart', color: 'bg-accent/10 text-accent', title: 'Donate', desc: 'Contribute financially to fund training, tools, and community programs.', hash: '#donate' },
              { icon: 'fa-hands-helping', color: 'bg-green-50 text-green-600', title: 'Volunteer', desc: 'Give your time and skills to support our programs and community events.', to: '/volunteer' },
              { icon: 'fa-chalkboard-teacher', color: 'bg-purple-50 text-purple-600', title: 'Teach', desc: 'Share your expertise by becoming a trainer or mentor in our academy.', to: '/trainer' },
            ].map(({ icon, color, title, desc, hash, to }) => (
              <motion.div
                key={title}
                className="card p-6 text-center hover:shadow-lg transition-shadow duration-300"
                variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true }} transition={{ duration: 0.4 }}
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-4`}>
                  <i className={`fas ${icon} text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{desc}</p>
                {hash
                  ? <a href={hash} className="text-primary text-sm font-semibold hover:underline">Learn More →</a>
                  : <Link to={to} className="text-primary text-sm font-semibold hover:underline">Learn More →</Link>
                }
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER SECTION */}
      <section id="partner" className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <i className="fas fa-handshake text-primary text-2xl" />
              </div>
              <p className="section-label text-primary">Collaboration</p>
              <h2 className="section-title">Partner With Us</h2>
              <p className="text-muted leading-relaxed mb-4">
                Great things happen when the right people work together. We are actively seeking organizations,
                businesses, and institutions ready to roll up their sleeves and co-create meaningful change
                through technology in South Sudan.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                A partnership is not just a logo on a page — it is shared ownership of outcomes. You bring
                your resources and reach, we bring the technical expertise and local knowledge.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { icon: 'fa-laptop-code', text: 'Technology & software collaboration' },
                  { icon: 'fa-graduation-cap', text: 'Educational program partnerships' },
                  { icon: 'fa-globe-africa', text: 'Community impact initiatives' },
                  { icon: 'fa-building', text: 'Corporate sponsorships' },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-muted">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <i className={`fas ${icon} text-primary text-xs`} />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
              <Link to="/contact?subject=Partnership%20Inquiry" className="btn-primary">
                <i className="fas fa-handshake mr-2" /> Start a Partnership
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 text-white">
                <h3 className="text-xl font-heading font-bold mb-6">What Partnership Looks Like</h3>
                <div className="space-y-5">
                  {[
                    { step: '01', title: 'Reach Out', desc: 'Send us a message describing your organization and what kind of partnership you have in mind.' },
                    { step: '02', title: 'Discovery Call', desc: 'We schedule a call to understand your goals, resources, and how we can work together effectively.' },
                    { step: '03', title: 'Agree on Terms', desc: 'We co-develop a clear agreement outlining roles, responsibilities, and shared outcomes.' },
                    { step: '04', title: 'Build Together', desc: 'We get to work — collaborating, co-creating, and delivering real impact for South Sudan.' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4">
                      <span className="text-2xl font-black text-white/20 font-heading leading-none">{step}</span>
                      <div>
                        <p className="font-semibold mb-1">{title}</p>
                        <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DONATE SECTION */}
      <section id="donate" className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:order-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <i className="fas fa-hand-holding-heart text-accent text-2xl" />
              </div>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Make a Difference</p>
              <h2 className="text-3xl font-heading font-bold text-dark mb-5">Invest in South Sudan's Future</h2>
              <p className="text-muted leading-relaxed mb-4">
                South Sudan has an enormous amount of untapped talent. Young people here are eager to learn,
                build, and contribute — they just need the opportunity and the tools to do it.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Your donation goes directly to the people who need it most. No layers of bureaucracy.
                No inflated overhead. Just real support for real students and real communities.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: 'fa-user-graduate', label: 'Students Trained', value: '50+' },
                  { icon: 'fa-laptop', label: 'Projects Built', value: '10+' },
                  { icon: 'fa-map-marker-alt', label: 'Communities Reached', value: '5+' },
                  { icon: 'fa-briefcase', label: 'Jobs Created', value: '20+' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <i className={`fas ${icon} text-accent mb-2 block`} />
                    <p className="text-xl font-heading font-black text-dark">{value}</p>
                    <p className="text-xs text-muted">{label}</p>
                  </div>
                ))}
              </div>
              <Link to="/contact?subject=Donation%20Inquiry" className="bg-accent hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">
                <i className="fas fa-heart mr-2" /> Donate Now
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show"
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lg:order-1"
            >
              <div className="bg-gradient-to-br from-accent to-orange-600 rounded-2xl p-10 text-white">
                <h3 className="text-xl font-heading font-bold mb-2">Where Your Money Goes</h3>
                <p className="text-white/70 text-sm mb-6">Every donation is used transparently and purposefully.</p>
                <div className="space-y-5">
                  {[
                    { icon: 'fa-chalkboard-teacher', title: 'Tech Training Programs', desc: 'Course materials, trainer fees, and student support for our hands-on coding and design programs.' },
                    { icon: 'fa-tools', title: 'Free Digital Tools', desc: 'Building and maintaining tools and platforms that communities access at no cost.' },
                    { icon: 'fa-wifi', title: 'Devices & Connectivity', desc: 'Helping students who cannot afford devices or internet access get what they need to participate.' },
                    { icon: 'fa-comments', title: 'Community Events', desc: 'Workshops, meetups, and mentorship sessions open to anyone in South Sudan who wants to grow in tech.' },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                        <i className={`fas ${icon} text-white text-sm`} />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">{title}</p>
                        <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-white/70 text-xs">Have questions about donating? Reach us at <a href="mailto:info@sleeknexuscreative.com" className="text-white underline">info@sleeknexuscreative.com</a></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Common Questions</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know before getting involved.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                {...item}
                i={i}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <i className="fas fa-envelope text-primary text-xl" />
            </div>
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Stay in the Loop</p>
            <h2 className="text-2xl font-heading font-bold text-dark mb-3">Not Ready Yet? Stay Connected</h2>
            <p className="text-muted leading-relaxed mb-8">
              Subscribe to our newsletter and we'll keep you updated on new programs, partnership opportunities,
              and the impact your support is making in South Sudan.
            </p>
            <NewsletterForm id="getstarted-newsletter" dark={false} />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-gray-300 mb-8">Just reach out and tell us what you have in mind. We will get back to you within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact?subject=Partnership%20Inquiry" className="btn-primary">Partner With Us</Link>
            <Link to="/contact?subject=Donation%20Inquiry" className="bg-accent hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">Donate Now</Link>
          </div>
        </div>
      </section>
    </>
  )
}
