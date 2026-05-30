import { Link } from 'react-router-dom';

export default function CTASection({
  eyebrow = "Let's Build Together",
  title = 'Ready to Launch Your Next Digital Product?',
  subtitle = 'Partner with Sleek Nexus Creative to build dependable, scalable technology that delivers real results.',
  primaryLabel = 'Start Your Project',
  primaryTo = '/contact',
  secondaryLabel = 'Explore Services',
  secondaryTo = '/services',
  trust = ['Free Consultation', 'On-Time Delivery', 'Post-Launch Support', 'Transparent Pricing'],
}) {
  return (
    <section className="cta-section">
      {/* subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container relative z-10">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ff8c42] mb-5 px-4 py-1.5 rounded-full border border-[#ff8c42]/30 bg-[#ff8c42]/10">
            <i className="fas fa-bolt" /> {eyebrow}
          </p>
        )}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-heading)', background: 'linear-gradient(135deg,#fff 50%,rgba(255,200,170,.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {title}
        </h2>
        <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed">{subtitle}</p>
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <Link to={primaryTo} className="btn btn-primary">{primaryLabel}</Link>
          <Link to={secondaryTo} className="btn btn-secondary">{secondaryLabel}</Link>
        </div>
        {trust.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6">
            {trust.map(t => (
              <span key={t} className="flex items-center gap-2 text-sm text-white/55">
                <i className="fas fa-check-circle text-[#ff8c42]" /> {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
