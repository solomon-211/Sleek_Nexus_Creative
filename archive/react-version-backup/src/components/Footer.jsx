import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, showToast } from '../lib/api';

export default function Footer() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) return;
    setLoading(true);
    const res = await api.subscribe(form);
    setLoading(false);
    if (res?.success) {
      showToast('Successfully subscribed!', 'success');
      setForm({ firstName: '', lastName: '', email: '' });
    } else {
      showToast(res?.error || 'Subscription failed.', 'error');
    }
  };

  return (
    <>
      {/* Newsletter banner */}
      <div className="relative text-white py-16 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #1a0a10 0%, #2d0d1a 50%, #1a0a10 100%)'
      }}>
        {/* Radial glow overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(196,30,58,.25), transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(255,140,66,.15), transparent 55%)'
        }} />

        <div className="container relative z-10 text-center">
          {/* Floating envelope icon */}
          <div className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-full mb-6" style={{
            background: 'linear-gradient(135deg, rgba(255,140,66,0.18), rgba(196,30,58,0.10))',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            border: '1.5px solid rgba(255,140,66,0.25)'
          }}>
            <i className="fas fa-envelope" style={{ fontSize: '1.4rem', color: '#ff8c42' }} />
          </div>

          {/* Label with decorative lines */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="block w-6 h-0.5 rounded bg-[#ff8c42]" />
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#ff8c42]">
              Don’t Miss Out On Exciting Updates
            </p>
            <span className="block w-6 h-0.5 rounded bg-[#ff8c42]" />
          </div>

          <h2 className="font-extrabold text-white mb-8 tracking-tight" style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            letterSpacing: '-0.02em'
          }}>
            Subscribe to Our Monthly Newsletter
          </h2>

          {/* Form — dark glass inputs */}
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 max-w-4xl w-full mx-auto items-stretch">
            <input
              type="text" placeholder="First Name" value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              className="flex-1 min-w-[140px] px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
              style={{ background: 'rgba(255,255,255,.1)', border: '2px solid transparent' }}
              onFocus={e => e.target.style.borderColor = '#ff8c42'}
              onBlur={e => e.target.style.borderColor = 'transparent'}
              aria-label="First Name"
            />
            <input
              type="text" placeholder="Last Name" value={form.lastName}
              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              className="flex-1 min-w-[140px] px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
              style={{ background: 'rgba(255,255,255,.1)', border: '2px solid transparent' }}
              onFocus={e => e.target.style.borderColor = '#ff8c42'}
              onBlur={e => e.target.style.borderColor = 'transparent'}
              aria-label="Last Name"
            />
            <input
              type="email" placeholder="Email Address" value={form.email} required
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="flex-1 min-w-[200px] px-4 py-3 rounded-lg text-white text-sm outline-none transition-all"
              style={{ background: 'rgba(255,255,255,.1)', border: '2px solid transparent' }}
              onFocus={e => e.target.style.borderColor = '#ff8c42'}
              onBlur={e => e.target.style.borderColor = 'transparent'}
              aria-label="Email address"
            />
            <button type="submit" disabled={loading}
              className="px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider text-white transition-all disabled:opacity-60 hover:-translate-y-0.5"
              style={{ background: '#ff8c42', flexShrink: 0 }}
              onMouseEnter={e => e.target.style.background = '#e67a2e'}
              onMouseLeave={e => e.target.style.background = '#ff8c42'}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <footer className="bg-[#0f1520] text-gray-400 pt-14 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Sleek <span className="text-[#ff8c42]">Nexus</span> Creative
              </h4>
              <p className="text-sm leading-relaxed mb-5">
                We design and deliver dependable digital products that help organizations scale impact, improve operations, and serve communities better.
              </p>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:info@SNC.ss" className="hover:text-white transition-colors"><i className="fas fa-envelope mr-2 text-[#ff8c42]" />info@SNC.ss</a></li>
                <li><a href="tel:+211925277700" className="hover:text-white transition-colors"><i className="fas fa-phone mr-2 text-[#ff8c42]" />+211 925 277 700</a></li>
                <li><span><i className="fas fa-location-dot mr-2 text-[#ff8c42]" />Juba, South Sudan</span></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/about#story" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/about#team" className="hover:text-white transition-colors">Our Team</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services#software-dev" className="hover:text-white transition-colors">Software Development</Link></li>
                <li><Link to="/services#web-mobile" className="hover:text-white transition-colors">Web &amp; Mobile Apps</Link></li>
                <li><Link to="/services#edtech" className="hover:text-white transition-colors">Educational Technology</Link></li>
                <li><Link to="/services#consulting" className="hover:text-white transition-colors">IT Consulting</Link></li>
              </ul>
            </div>

            {/* Get Involved */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get Involved</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/partners" className="hover:text-white transition-colors">Partner With Us</Link></li>
                <li><Link to="/donors" className="hover:text-white transition-colors">Donate</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
              <div className="flex gap-3 mt-5">
                {[
                  { href: 'https://www.facebook.com/SNC', icon: 'fa-facebook', label: 'Facebook' },
                  { href: 'https://twitter.com/SNC',      icon: 'fa-twitter',  label: 'Twitter' },
                  { href: 'https://www.linkedin.com/company/SNC', icon: 'fa-linkedin', label: 'LinkedIn' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#c41e3a] transition-colors text-sm">
                    <i className={`fab ${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
            <p>&copy; {new Date().getFullYear()} Sleek Nexus Creative. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#top" className="hover:text-white transition-colors">Back to Top</a>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/admin" className="hover:text-white transition-colors opacity-40 hover:opacity-100">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
