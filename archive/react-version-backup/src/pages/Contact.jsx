import { useState } from 'react';
import { api, showToast } from '../lib/api';
import CTASection from '../components/CTA';

const faqs = [
  { q: 'How long does a typical project take?',  a: 'Project timelines vary based on complexity. Simple websites take 2–4 weeks, while complex applications may take 3–6 months. We provide detailed timelines during consultation.' },
  { q: 'What is your pricing structure?',         a: 'We offer flexible pricing based on project scope. Contact us for a free consultation and custom quote tailored to your needs and budget.' },
  { q: 'Do you provide ongoing support?',         a: 'Yes! We offer maintenance packages and ongoing support to ensure your solution continues to perform optimally after launch.' },
  { q: 'Can you work with our existing systems?', a: 'Absolutely. We specialize in integrations and can work with your existing infrastructure to create seamless solutions.' },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-2xl mx-auto">
      {faqs.map((f, i) => (
        <div key={i} className="faq-item">
          <button className="faq-question" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {f.q}
            <i className={`fas fa-chevron-down text-[#c41e3a] transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && <div className="faq-answer">{f.a}</div>}
        </div>
      ))}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', service:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await api.contact(form);
    setLoading(false);
    if (res?.success) {
      setSent(true);
      showToast("Message sent! We'll reply within 24–48 hours.", 'success');
      setForm({ name:'', email:'', phone:'', company:'', service:'', message:'' });
    } else {
      showToast(res?.errors?.[0]?.message || res?.error || 'Something went wrong. Please try again.', 'error');
    }
  };

  const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 transition-all';

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="tagline">Let's Transform Your Vision Into Reality Together</span>
          <h1>Get In Touch</h1>
          <p className="header-description">
            We're here to answer your questions, discuss your project requirements, and explore how our technology solutions can drive your business forward.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

              {sent && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6 text-sm">
                  <i className="fas fa-check-circle mr-2" /> Message sent! We'll reply within 24–48 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input type="text" required value={form.name} onChange={set('name')} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input type="email" required value={form.email} onChange={set('email')} className={inputCls} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company / Organization</label>
                    <input type="text" value={form.company} onChange={set('company')} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                  <select value={form.service} onChange={set('service')} className={inputCls}>
                    <option value="">Select a service</option>
                    <option value="software-dev">Software Development</option>
                    <option value="web-mobile">Web &amp; Mobile Apps</option>
                    <option value="edtech">Educational Technology</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                  <textarea required rows={5} value={form.message} onChange={set('message')} className={inputCls} />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center">
                  {loading ? <><i className="fas fa-spinner fa-spin" /> Sending...</> : <><i className="fas fa-paper-plane" /> Send Message</>}
                </button>
              </form>
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Contact Information</h2>
              <p className="text-gray-500 text-sm mb-8">Reach out to us through any of these channels.</p>
              <div className="space-y-5 mb-10">
                {[
                  { icon:'fa-map-marker-alt', title:'Office Address', text:'Juba, South Sudan\nCentral Equatoria State' },
                  { icon:'fa-phone',          title:'Phone',          text:'+211 925 277 700\nMon–Fri, 9AM–6PM', href:'tel:+211925277700' },
                  { icon:'fa-envelope',       title:'Email',          text:'info@SNC.ss', href:'mailto:info@SNC.ss' },
                  { icon:'fa-whatsapp fab',   title:'WhatsApp',       text:'Chat with us', href:'https://wa.me/211925277700' },
                  { icon:'fa-clock',          title:'Business Hours', text:'Mon–Fri: 9AM–6PM\nSat: 10AM–4PM\nSun: Closed' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-[#c41e3a] shrink-0">
                      <i className={`fas ${item.icon}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</h4>
                      {item.href
                        ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-[#c41e3a]">{item.text}</a>
                        : <p className="text-gray-500 text-sm whitespace-pre-line">{item.text}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Connect With Us</h4>
                <div className="flex gap-3">
                  {[['fa-facebook','https://www.facebook.com/SNC'],['fa-twitter','https://twitter.com/SNC'],['fa-linkedin','https://www.linkedin.com/company/SNC'],['fa-whatsapp','https://wa.me/211925277700']].map(([icon, href]) => (
                    <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#c41e3a] hover:text-white transition-colors">
                      <i className={`fab ${icon}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support cards */}
      <section className="py-16 bg-gray-50">
        <div className="container text-center">
          <h2 className="section-title">We're Here to Help</h2>
          <p className="section-subtitle">Expert support and guidance for your technology journey.</p>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            {[
              { icon:'fa-headset',  title:'24/7 Support',       text:'Round-the-clock assistance for urgent technical issues and inquiries.' },
              { icon:'fa-comments', title:'Free Consultation',   text:'Schedule a complimentary session to discuss your project requirements.' },
              { icon:'fa-rocket',   title:'Fast Response',       text:'We respond to all inquiries within 24 hours on business days.' },
            ].map(c => (
              <div key={c.title} className="bg-white rounded-2xl p-8 shadow-sm fade-in">
                <i className={`fas ${c.icon} text-3xl text-[#c41e3a] mb-4 block`} />
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Find answers to common questions about our services and process.</p>
          <div className="mt-8"><FAQ /></div>
        </div>
      </section>
    </>
  );
}
