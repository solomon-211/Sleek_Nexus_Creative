import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cookies } from '../lib/api';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!cookies.hasChosen()) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => { cookies.accept(); setVisible(false); };
  const decline = () => { cookies.decline(); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-[9998] shadow-2xl">
      <div className="container flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm flex-1">
          <i className="fas fa-shield-alt text-[#ff8c42] mr-2" />
          We use cookies to enhance your experience and analyze traffic.{' '}
          <Link to="/privacy" className="text-[#ff8c42] hover:underline">Learn more</Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button onClick={accept}
            className="bg-[#c41e3a] hover:bg-[#8b0000] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
            Accept All
          </button>
          <button onClick={decline}
            className="border border-white/30 hover:bg-white/10 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
