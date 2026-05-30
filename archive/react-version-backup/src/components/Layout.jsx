import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import { observeFadeIns, initCounters, initScrollProgress } from '../lib/api';

let progressInit = false;

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!progressInit) { initScrollProgress(); progressInit = true; }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Wait for lazy page to fully render before running DOM-dependent init
    const t = setTimeout(() => {
      observeFadeIns();
      initCounters();
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="page-enter">
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
