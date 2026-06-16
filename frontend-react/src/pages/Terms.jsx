import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const navItems = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'services', label: 'Services Description' },
  { id: 'user-obligations', label: 'User Obligations' },
  { id: 'payment', label: 'Payment Terms' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'warranties', label: 'Warranties & Disclaimers' },
  { id: 'limitation', label: 'Limitation of Liability' },
  { id: 'termination', label: 'Termination' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact-terms', label: 'Contact Us' },
]

const Section = ({ id, icon, title, children }) => (
  <section id={id} className="mb-10 scroll-mt-24">
    <h2 className="text-xl font-heading font-bold text-dark mb-4 flex items-center gap-2">
      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <i className={`fas ${icon} text-primary text-xs`} />
      </span>
      {title}
    </h2>
    {children}
  </section>
)

const Li = ({ children }) => (
  <li className="flex items-start gap-2 text-muted text-sm">
    <i className="fas fa-check text-primary text-xs mt-1 flex-shrink-0" />
    <span>{children}</span>
  </li>
)

export default function Terms() {
  const [active, setActive] = useState('')

  return (
    <>
      <Helmet>
        <title>Terms of Service - Sleek Nexus Creative</title>
        <meta name="description" content="Terms and conditions governing your use of Sleek Nexus Creative's services." />
        <meta property="og:title" content="Terms of Service - Sleek Nexus Creative" />
        <meta property="og:description" content="Terms and conditions governing your use of Sleek Nexus Creative's services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://SNC.ss/terms" />
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">Terms of Service</h1>
          <p className="text-accent italic mb-3">"Clear Terms, Fair Practices, Mutual Respect"</p>
          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mx-auto">These terms govern your use of our services and establish the foundation for our professional relationship. By engaging with Sleek Nexus Creative, you agree to these terms.</p>
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
                  {navItems.map(({ id, label }) => (
                    <li key={id}>
                      <a href={`#${id}`} onClick={() => setActive(id)}
                        className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${active === id ? 'bg-primary/10 text-primary font-semibold' : 'text-muted hover:text-primary hover:bg-primary/5'}`}>
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
            <div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 text-sm text-dark">
                <p>Welcome to Sleek Nexus Creative. These Terms of Service ("Terms") govern your access to and use of our services, website, and products. Please read these Terms carefully before using our services.</p>
              </div>

              <Section id="acceptance" icon="fa-check-circle" title="1. Acceptance of Terms">
                <p className="text-muted text-sm leading-relaxed mb-3">By accessing or using Sleek Nexus Creative's services, you agree to be bound by these Terms.</p>
                <ul className="space-y-2"><Li>These Terms apply to all visitors, users, and clients of our services</Li><Li>Your continued use constitutes acceptance of any modifications to these Terms</Li><Li>You must be at least 18 years old or have parental consent to use our services</Li></ul>
              </Section>

              <Section id="services" icon="fa-cogs" title="2. Services Description">
                <p className="text-muted text-sm leading-relaxed mb-3">Sleek Nexus Creative provides technology solutions including:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[['Software Development', 'Custom application development, system integration, and software consulting'], ['Web & Mobile Development', 'Responsive websites, mobile applications, and progressive web apps'], ['Educational Technology', 'Learning management systems, educational platforms, and training solutions'], ['IT Consulting', 'Technology strategy, digital transformation, and technical advisory services'], ['Training & Courses', 'Professional development programs and technical training']].map(([title, desc]) => (
                    <div key={title} className="bg-gray-50 rounded-xl p-4">
                      <p className="font-semibold text-dark text-sm mb-1">{title}</p>
                      <p className="text-muted text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="user-obligations" icon="fa-user-check" title="3. User Obligations">
                <p className="text-muted text-sm mb-3">As a user of our services, you agree to:</p>
                <ul className="space-y-2"><Li>Provide accurate, current, and complete information during registration and project engagement</Li><Li>Maintain the security of your account credentials and notify us of any unauthorized access</Li><Li>Use our services only for lawful purposes and in accordance with these Terms</Li><Li>Not engage in any activity that interferes with or disrupts our services</Li><Li>Respect intellectual property rights of Sleek Nexus Creative and third parties</Li><Li>Provide timely feedback, approvals, and necessary materials for project completion</Li><Li>Not reverse engineer, decompile, or attempt to extract source code from our proprietary software</Li></ul>
              </Section>

              <Section id="payment" icon="fa-credit-card" title="4. Payment Terms">
                <div className="space-y-4">
                  {[['4.1 Pricing', 'Service pricing is determined based on project scope, complexity, and timeline. All prices are quoted in USD unless otherwise specified.'], ['4.3 Late Payments', 'Invoices are due within 14 days of issuance. Late payments may incur a 2% monthly interest charge and may result in service suspension.'], ['4.4 Refund Policy', 'Refunds are considered on a case-by-case basis. Work completed prior to cancellation is non-refundable. Course fees are non-refundable after course commencement.']].map(([h, p]) => (
                    <div key={h}><h3 className="font-semibold text-dark text-sm mb-1">{h}</h3><p className="text-muted text-sm">{p}</p></div>
                  ))}
                  <div>
                    <h3 className="font-semibold text-dark text-sm mb-2">4.2 Payment Schedule</h3>
                    <ul className="space-y-2"><Li>Project-Based Services: Typically 50% upfront and 50% upon completion</Li><Li>Retainer Services: Billed monthly in advance</Li><Li>Training Courses: Full payment required before course commencement</Li></ul>
                  </div>
                </div>
              </Section>

              <Section id="intellectual-property" icon="fa-copyright" title="5. Intellectual Property Rights">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-semibold text-dark text-sm mb-2">5.1 Client-Owned IP</p>
                    <p className="text-muted text-xs leading-relaxed">Upon full payment, clients receive ownership of custom-developed deliverables including source code, designs, and documentation created specifically for the client.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-semibold text-dark text-sm mb-2">5.2 Sleek Nexus Creative IP</p>
                    <p className="text-muted text-xs leading-relaxed">We retain ownership of pre-existing tools, frameworks, methodologies, reusable components, and our brand/trademarks.</p>
                  </div>
                </div>
              </Section>

              <Section id="confidentiality" icon="fa-lock" title="6. Confidentiality">
                <ul className="space-y-2"><Li>We will not disclose client confidential information without written consent</Li><Li>Confidential information includes business plans, technical data, customer lists, and proprietary processes</Li><Li>Confidentiality obligations survive termination of services</Li><Li>We may showcase completed projects in our portfolio unless explicitly prohibited by client</Li></ul>
              </Section>

              <Section id="warranties" icon="fa-shield-alt" title="7. Warranties and Disclaimers">
                <div className="space-y-4">
                  <div><h3 className="font-semibold text-dark text-sm mb-2">7.1 Our Warranties</h3>
                  <ul className="space-y-2"><Li>Services will be performed with professional skill and care</Li><Li>Deliverables will substantially conform to agreed specifications</Li><Li>We have the right to provide the services offered</Li></ul></div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 leading-relaxed">
                    <strong>7.2 Disclaimer:</strong> EXCEPT AS EXPRESSLY PROVIDED, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                  </div>
                </div>
              </Section>

              <Section id="limitation" icon="fa-exclamation-triangle" title="8. Limitation of Liability">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 leading-relaxed mb-3">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</div>
                <ul className="space-y-2"><Li>Our total liability shall not exceed the amount paid by client for the specific service giving rise to the claim</Li><Li>We are not liable for indirect, incidental, consequential, or punitive damages</Li><Li>We are not responsible for losses resulting from client's failure to maintain backups or secure systems</Li><Li>Force majeure events excuse performance obligations</Li></ul>
              </Section>

              <Section id="termination" icon="fa-times-circle" title="9. Termination">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4"><p className="font-semibold text-dark text-sm mb-2">9.1 Termination by Client</p><p className="text-muted text-xs">Clients may terminate with 30 days written notice. Client remains responsible for payment of work completed.</p></div>
                  <div className="bg-gray-50 rounded-xl p-4"><p className="font-semibold text-dark text-sm mb-2">9.2 Termination by SNC</p><p className="text-muted text-xs">We may terminate immediately if client breaches these Terms, fails to make payments, or engages in illegal conduct.</p></div>
                </div>
              </Section>

              <Section id="governing-law" icon="fa-gavel" title="10. Governing Law and Dispute Resolution">
                <p className="text-muted text-sm leading-relaxed mb-3">These Terms are governed by the laws of South Sudan. Any disputes will be resolved through:</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {[['1', 'Negotiation', 'Good faith discussions between parties'], ['2', 'Mediation', 'Neutral third-party mediation if negotiation fails'], ['3', 'Arbitration', 'Binding arbitration in Juba, South Sudan']].map(([n, title, desc]) => (
                    <div key={n} className="flex-1 bg-gray-50 rounded-xl p-4 text-center">
                      <div className="w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">{n}</div>
                      <p className="font-semibold text-dark text-sm mb-1">{title}</p>
                      <p className="text-muted text-xs">{desc}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="changes" icon="fa-sync-alt" title="11. Changes to Terms">
                <p className="text-muted text-sm leading-relaxed">We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Continued use of services after changes constitutes acceptance of modified Terms. Material changes will be communicated via email to registered users.</p>
              </Section>

              <Section id="contact-terms" icon="fa-envelope" title="12. Contact Information">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <p className="font-semibold text-dark mb-3">For questions about these Terms, please contact us:</p>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-center gap-2"><i className="fas fa-building text-primary w-4" /><strong className="text-dark">Sleek Nexus Creative</strong></li>
                    <li className="flex items-center gap-2"><i className="fas fa-location-dot text-primary w-4" />Juba, South Sudan</li>
                    <li className="flex items-center gap-2"><i className="fas fa-envelope text-primary w-4" /><a href="mailto:legal@SNC.ss" className="hover:text-primary">legal@SNC.ss</a></li>
                    <li className="flex items-center gap-2"><i className="fas fa-phone text-primary w-4" /><a href="tel:+211925277700" className="hover:text-primary">+211 925 277 700</a></li>
                  </ul>
                </div>
              </Section>

              <div className="bg-dark rounded-2xl p-6 text-white text-center mt-10">
                <i className="fas fa-handshake text-primary text-2xl mb-3 block" />
                <p className="font-semibold mb-1">Acknowledgment</p>
                <p className="text-gray-400 text-sm">By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-muted text-sm mb-4">Have questions about our terms?</p>
          <Link to="/contact" className="btn-primary">Contact Us</Link>
        </div>
      </section>
    </>
  )
}
