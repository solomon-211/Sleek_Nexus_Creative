import { Link } from 'react-router-dom'
import NewsletterForm from '../ui/NewsletterForm'

const footerLinks = {
  About: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Story', to: '/about/our-story' },
    { label: 'Our Team', to: '/about/team' },
    { label: 'Mission & Vision', to: '/about/mission-vision' },
  ],
  Services: [
    { label: 'Web Development', to: '/services/web-dev' },
    { label: 'Mobile Apps', to: '/services/mobile-apps' },
    { label: 'UI/UX Design', to: '/services/ui-ux' },
    { label: 'E-Learning Solutions', to: '/services/elearning' },
    { label: 'Branding', to: '/services/branding' },
    { label: 'IT Consulting', to: '/services/consulting' },
  ],
  'Get Involved': [
    { label: 'Get Started', to: '/get-started' },
    { label: 'Careers', to: '/careers' },
    { label: 'Internships', to: '/internships' },
    { label: 'Volunteer', to: '/volunteer' },
    { label: 'Contact Us', to: '/contact' },
  ],
}

const socials = [
  { href: 'https://www.facebook.com/SNC', icon: 'fab fa-facebook-f', label: 'Facebook', color: 'bg-[#1877f2] text-white' },
  { href: 'https://twitter.com/SNC', icon: 'fab fa-x-twitter', label: 'Twitter / X', color: 'bg-black text-white' },
  { href: 'https://www.linkedin.com/company/SNC', icon: 'fab fa-linkedin-in', label: 'LinkedIn', color: 'bg-[#0a66c2] text-white' },
  { href: 'https://wa.me/211925277700', icon: 'fab fa-whatsapp', label: 'WhatsApp', color: 'bg-[#25d366] text-white' },
  { href: 'https://www.tiktok.com/@SNC', icon: 'fab fa-tiktok', label: 'TikTok', color: 'bg-[#010101] text-white border border-white/20' },
  { href: 'https://www.instagram.com/SNC', icon: 'fab fa-instagram', label: 'Instagram', color: 'bg-[#e1306c] text-white' },
]


export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      {/* Brand accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <span className="flex items-center justify-center w-[46px] h-[46px] bg-white rounded-full border-2 border-white/30 shadow-[0_2px_10px_rgba(196,30,58,0.25)] text-[0.78rem] font-black font-heading tracking-wide">
                <span className="text-primary">S</span>
                <span className="text-accent">N</span>
                <span className="text-primary">C</span>
              </span>
              <span className="text-[1.05rem] font-extrabold font-heading leading-none">
                <span className="text-primary">Sleek </span>
                <span className="text-accent">Nexus</span>
                <span className="text-primary"> Creative</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              We design and deliver dependable digital products that help organizations scale impact, improve operations, and serve communities better.
            </p>
            <Link to="/careers" className="inline-flex items-center gap-2 text-xs font-semibold text-primary border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              We're Hiring
              <i className="fas fa-arrow-right text-[0.65rem]" />
            </Link>
            <ul className="mt-4 space-y-2">
              {[
                { icon: 'fa-envelope', label: 'info@SNC.ss', href: 'mailto:info@SNC.ss' },
                { icon: 'fa-phone', label: '+211 925 277 700', href: 'tel:+211925277700' },
                { icon: 'fa-location-dot', label: 'Juba, South Sudan', href: null },
              ].map(({ icon, label, href }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-gray-400">
                  <i className={`fas ${icon} text-primary w-4`} />
                  {href ? <a href={href} className="hover:text-white transition-colors">{label}</a> : <span>{label}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter + Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Monthly Newsletter</h4>
            <NewsletterForm id="footer-newsletter-form" dark={true} />
            <div className="flex items-center gap-2 mt-5">
              {socials.map(({ href, icon, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                  className={`w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${color}`}>
                  <i className={`${icon} text-[14px] leading-none`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Sleek Nexus Creative. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors" aria-label="Back to top">
              <i className="fas fa-arrow-up" />
            </button>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
