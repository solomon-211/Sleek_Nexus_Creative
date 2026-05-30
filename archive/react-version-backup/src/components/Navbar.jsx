import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/courses',  label: 'Courses' },
  { to: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight || 1;
        setProgress(Math.min((window.scrollY / max) * 100, 100));
        setScrolled(window.scrollY > 40);
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <div className="container flex items-center justify-between h-18 md:h-22">
        {/* Logo */}
        <Link to="/" aria-label="Sleek Nexus Creative Home" className="flex items-center gap-3 no-underline">
          <span className="w-11 h-11 rounded-lg bg-[#c41e3a] flex items-center justify-center text-white">
            <i className="fas fa-bolt text-base" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold text-gray-900">
              Sleek <span className="text-[#c41e3a]">Nexus</span>
            </span>
            <span className="block text-sm text-gray-500 font-medium">Creative</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors no-underline ${
                  location.pathname === to
                    ? 'text-[#c41e3a] bg-red-50'
                    : 'text-gray-600 hover:text-[#c41e3a] hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop special links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/partners" className="btn btn-outline btn-small">
            <i className="fas fa-handshake" /> Partner
          </Link>
          <Link to="/donors" className="btn btn-primary btn-small">
            <i className="fas fa-heart" /> Donate
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${open ? 'max-h-screen' : 'max-h-0'}`}>
        <ul className="list-none m-0 p-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`block px-4 py-3.5 rounded-lg text-base font-medium no-underline ${
                  location.pathname === to ? 'text-[#c41e3a] bg-red-50' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="flex gap-2 pt-2">
            <Link to="/partners" className="btn btn-outline btn-small flex-1 justify-center">
              <i className="fas fa-handshake" /> Partner
            </Link>
            <Link to="/donors" className="btn btn-primary btn-small flex-1 justify-center">
              <i className="fas fa-heart" /> Donate
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
