import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const sections = [
  { id: 'info-collect', label: '1. Information We Collect' },
  { id: 'info-use', label: '2. How We Use Information' },
  { id: 'info-share', label: '3. Information Sharing' },
  { id: 'security', label: '4. Data Security' },
  { id: 'cookies', label: '5. Cookies' },
  { id: 'retention', label: '7. Data Retention' },
  { id: 'rights', label: '8. Your Rights' },
  { id: 'children', label: "9. Children's Privacy" },
  { id: 'international', label: '10. International Transfers' },
  { id: 'email', label: '12. Email Communications' },
  { id: 'breach', label: '15. Data Breach' },
  { id: 'gdpr', label: '17. GDPR Compliance' },
  { id: 'contact', label: '20. Contact Us' },
]

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('')

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Sleek Nexus Creative</title>
        <meta name="description" content="How Sleek Nexus Creative collects, uses, and protects your personal information." />
        <meta property="og:title" content="Privacy Policy - Sleek Nexus Creative" />
        <meta property="og:description" content="How Sleek Nexus Creative collects, uses, and protects your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sleeknexuscreative.com/privacy" />
        <link rel="canonical" href="https://sleeknexuscreative.com/privacy" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300">How we collect, use, and protect your information</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12">

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 card p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Quick Navigation</p>
                <ul className="space-y-1">
                  {sections.map(({ id, label }) => (
                    <li key={id}>
                      <a href={`#${id}`} onClick={() => setActiveSection(id)}
                        className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${activeSection === id ? 'bg-primary/10 text-primary font-semibold' : 'text-muted hover:text-primary hover:bg-primary/5'}`}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-muted flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-primary" /> Last Updated: January 2024
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="prose prose-slate max-w-none">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 text-sm text-dark flex items-start gap-3">
                <i className="fas fa-calendar-alt text-primary mt-0.5" />
                <span><strong>Last Updated:</strong> January 2024</span>
              </div>

              <p className="text-muted leading-relaxed mb-8">At Sleek Nexus Creative, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

              <h2 id="info-collect" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-database text-primary text-xs" /></span>
                1. Information We Collect
              </h2>
              <h3 className="font-semibold text-dark mb-2">Personal Information</h3>
              <p className="text-muted text-sm leading-relaxed mb-3">We may collect personal information that you voluntarily provide when you:</p>
              <ul className="space-y-1.5 mb-4 text-muted text-sm">
                {['Fill out contact forms or request information', 'Subscribe to our newsletter', 'Apply for internships or job positions', 'Enroll in our courses or training programs', 'Submit project requests or inquiries'].map(i => (
                  <li key={i} className="flex items-start gap-2"><i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" />{i}</li>
                ))}
              </ul>
              <h3 className="font-semibold text-dark mb-2">Automatically Collected Information</h3>
              <p className="text-muted text-sm leading-relaxed mb-3">When you visit our website, we may automatically collect:</p>
              <ul className="space-y-1.5 mb-8 text-muted text-sm">
                {['IP address and browser type', 'Operating system and device information', 'Pages visited and time spent on pages', 'Referring website addresses', 'Click patterns and navigation paths'].map(i => (
                  <li key={i} className="flex items-start gap-2"><i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" />{i}</li>
                ))}
              </ul>

              <h2 id="info-use" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-cog text-primary text-xs" /></span>
                2. How We Use Your Information
              </h2>
              <ul className="space-y-1.5 mb-8 text-muted text-sm">
                {['Respond to your inquiries and provide customer support', 'Process applications for internships, jobs, or courses', 'Send newsletters and marketing communications (with your consent)', 'Improve our website, services, and user experience', 'Analyze website traffic and usage patterns', 'Comply with legal obligations and protect our rights', 'Prevent fraud and enhance security'].map(i => (
                  <li key={i} className="flex items-start gap-2"><i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" />{i}</li>
                ))}
              </ul>

              <h2 id="info-share" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-share-nodes text-primary text-xs" /></span>
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-3">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[['Service Providers', 'Trusted third-party providers who assist us in operating our website and business.'], ['Legal Requirements', 'When required by law or to protect our rights, property, or safety.'], ['Business Transfers', 'In connection with a merger, acquisition, or sale of assets.'], ['With Your Consent', 'When you explicitly authorize us to share your information.']].map(([title, desc]) => (
                  <div key={title} className="bg-gray-50 rounded-xl p-4">
                    <p className="font-semibold text-dark text-sm mb-1">{title}</p>
                    <p className="text-muted text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <h2 id="security" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-shield-alt text-primary text-xs" /></span>
                4. Data Security
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-3">We implement appropriate technical and organizational security measures including:</p>
              <ul className="space-y-1.5 mb-8 text-muted text-sm">
                {['Encryption of data in transit and at rest', 'Regular security assessments and updates', 'Access controls and authentication procedures', 'Employee training on data protection'].map(i => (
                  <li key={i} className="flex items-start gap-2"><i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" />{i}</li>
                ))}
              </ul>

              <h2 id="cookies" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-cookie-bite text-primary text-xs" /></span>
                5. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-3">We use cookies and similar tracking technologies. Types of cookies we use:</p>
              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                {[['Essential Cookies', 'Required for website functionality'], ['Analytics Cookies', 'Help us understand how visitors use our site'], ['Preference Cookies', 'Remember your settings and preferences']].map(([title, desc]) => (
                  <div key={title} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="font-semibold text-dark text-sm mb-1">{title}</p>
                    <p className="text-muted text-xs">{desc}</p>
                  </div>
                ))}
              </div>

              <h2 id="retention" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-clock text-primary text-xs" /></span>
                7. Data Retention
              </h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-semibold text-dark border border-gray-100">Data Type</th>
                      <th className="text-left p-3 font-semibold text-dark border border-gray-100">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['Contact Inquiries', '2 years after last contact'], ['Newsletter Subscriptions', 'Until you unsubscribe'], ['Job Applications', '1 year after application'], ['Course Enrollments', '5 years for certification records'], ['Project Records', '7 years for legal/tax purposes'], ['Website Analytics', 'Anonymized after 26 months']].map(([type, period]) => (
                      <tr key={type} className="border border-gray-100">
                        <td className="p-3 text-muted">{type}</td>
                        <td className="p-3 text-muted">{period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="rights" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-user-shield text-primary text-xs" /></span>
                8. Your Rights and Choices
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[['Access', 'Request a copy of the personal information we hold about you'], ['Correction', 'Request correction of inaccurate or incomplete information'], ['Deletion', 'Request deletion of your personal information'], ['Opt-Out', 'Unsubscribe from marketing communications at any time'], ['Data Portability', 'Request transfer of your data to another service']].map(([right, desc]) => (
                  <div key={right} className="flex gap-3 bg-gray-50 rounded-xl p-4">
                    <i className="fas fa-check-circle text-primary mt-0.5 flex-shrink-0" />
                    <div><p className="font-semibold text-dark text-sm">{right}</p><p className="text-muted text-xs">{desc}</p></div>
                  </div>
                ))}
              </div>
              <p className="text-muted text-sm mb-8">To exercise these rights, contact us at <a href="mailto:info@SNC.ss" className="text-primary hover:underline">info@SNC.ss</a></p>

              <h2 id="children" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-child text-primary text-xs" /></span>
                9. Children's Privacy
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-8">Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.</p>

              <h2 id="international" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-globe text-primary text-xs" /></span>
                10. International Data Transfers
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-8">Your information may be transferred to and processed in countries other than South Sudan. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.</p>

              <h2 id="email" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-envelope text-primary text-xs" /></span>
                12. Email Communications
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-3">You can unsubscribe from marketing emails at any time by clicking "unsubscribe" in any email or contacting us at <a href="mailto:info@SNC.ss" className="text-primary hover:underline">info@SNC.ss</a>.</p>
              <p className="text-muted text-sm leading-relaxed mb-8">Note: You cannot opt out of transactional emails related to services you've purchased.</p>

              <h2 id="breach" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-exclamation-triangle text-primary text-xs" /></span>
                15. Data Breach Notification
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-3">In the event of a data breach affecting your personal information, we will notify affected users within 72 hours of discovering the breach, explain steps we're taking, and recommend actions you can take to protect yourself.</p>

              <h2 id="gdpr" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-flag text-primary text-xs" /></span>
                17. GDPR Compliance (European Users)
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-8">If you are located in the European Economic Area (EEA), you have additional rights under GDPR including the right to object, restriction, lodge complaints with your local data protection authority, and rights around automated decision-making. We do not use automated decision-making or profiling.</p>

              <h2 id="contact" className="text-xl font-heading font-bold text-dark mt-10 mb-4 flex items-center gap-2 scroll-mt-24">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="fas fa-envelope text-primary text-xs" /></span>
                20. Contact Us
              </h2>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                <p className="font-semibold text-dark mb-3">If you have any questions about this Privacy Policy, contact us:</p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2"><i className="fas fa-envelope text-primary w-4" /><a href="mailto:info@SNC.ss" className="hover:text-primary">info@SNC.ss</a></li>
                  <li className="flex items-center gap-2"><i className="fas fa-phone text-primary w-4" /><a href="tel:+211925277700" className="hover:text-primary">+211 925 277 700</a></li>
                  <li className="flex items-center gap-2"><i className="fas fa-location-dot text-primary w-4" /><span>Juba, South Sudan</span></li>
                </ul>
              </div>

              <div className="bg-dark rounded-2xl p-6 text-white text-center">
                <i className="fas fa-shield-alt text-primary text-2xl mb-3 block" />
                <p className="font-semibold mb-1">Your privacy matters to us.</p>
                <p className="text-gray-400 text-sm">We are committed to transparency and protecting your personal information. If you have any concerns about how we handle your data, please don't hesitate to reach out.</p>
              </div>
            </div>
          </div>

          {/* Mobile quick nav */}
          <div className="lg:hidden mt-8 card p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Quick Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {sections.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className="text-xs text-muted hover:text-primary truncate">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-muted text-sm mb-4">Have questions about our privacy practices?</p>
          <Link to="/contact" className="btn-primary">Contact Us</Link>
        </div>
      </section>
    </>
  )
}
