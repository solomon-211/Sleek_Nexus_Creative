import { Link } from 'react-router-dom';
import CTASection from '../components/CTA';
import StatCounter from '../components/StatCounter';
import Zigzag from '../components/Zigzag';

const services = [
  { icon: 'fa-code',           title: 'Software Development',    desc: 'Custom platforms engineered for speed, reliability, and clear business outcomes.',                                    to: '/services#software-dev' },
  { icon: 'fa-mobile-alt',     title: 'Web & Mobile Apps',       desc: 'Responsive web and mobile products optimized for adoption across all device conditions.',                             to: '/services#web-mobile' },
  { icon: 'fa-graduation-cap', title: 'Educational Technology',  desc: 'Digital learning tools that expand access, improve engagement, and increase completion rates.',                       to: '/services#edtech' },
  { icon: 'fa-laptop-code',    title: 'IT Consulting',           desc: 'Technology strategy and implementation support that de-risks delivery and accelerates growth.',                       to: '/services#consulting' },
];

const stats = [
  { icon: 'fa-project-diagram', count: 50,    label: 'Projects Delivered' },
  { icon: 'fa-user-graduate',   count: 10000, label: 'Learners Supported' },
  { icon: 'fa-handshake',       count: 30,    label: 'Partner Organizations' },
  { icon: 'fa-calendar-check',  count: 5,     label: 'Years of Excellence' },
];

const projects = [
  { img: '/images/project1.jpg', title: 'E-Learning Platform',        desc: 'Comprehensive digital learning ecosystem empowering 10,000+ students.',                          to: '/projects#project1' },
  { img: '/images/project2.jpg', title: 'Business Management System', desc: 'Integrated enterprise solution driving operational excellence and scalable growth.',              to: '/projects#project2' },
  { img: '/images/project3.jpg', title: 'Mobile Banking App',         desc: 'Bank-grade secure platform delivering seamless financial services.',                              to: '/projects#project3' },
];

const testimonials = [
  { initials: 'JD', name: 'John Doe',      role: 'CEO, Tech Corp',           text: '\u201cSleek Nexus Creative revolutionized our operations with exceptional innovation and technical excellence. Their professionalism set them apart as true strategic partners.\u201d' },
  { initials: 'JS', name: 'Jane Smith',    role: 'Director, Education Plus', text: '\u201cExceptional execution from start to finish. They delivered ahead of schedule while surpassing every expectation.\u201d' },
  { initials: 'SL', name: 'Solomon Leek', role: 'Founder, StartUp Hub',      text: '\u201cSimply the most capable technology partner we have collaborated with. Their innovative approach consistently delivers transformative results.\u201d' },
];

const whyUs = [
  { icon: 'fa-map-marker-alt', title: 'Locally Based',      desc: 'We understand South Sudan\u2019s unique challenges and market realities better than any foreign firm.' },
  { icon: 'fa-shield-alt',     title: 'Secure & Reliable',  desc: 'Every product follows security best practices with 99.9% uptime and robust backup systems.' },
  { icon: 'fa-dollar-sign',    title: 'Affordable Pricing', desc: 'World-class quality at prices designed for African markets, with flexible payment plans.' },
  { icon: 'fa-headset',        title: 'Dedicated Support',  desc: 'Our team is available after launch for maintenance, updates, training, and technical support.' },
  { icon: 'fa-graduation-cap', title: 'Training Included',  desc: 'We train your team to use and manage every product we deliver so you stay independent.' },
  { icon: 'fa-clock',          title: 'On-Time Delivery',   desc: 'We set clear milestones and consistently deliver on time without compromising quality.' },
];

const process = [
  { num: '01', icon: 'fa-comments',     title: 'Discovery Call',    desc: 'We listen to your goals, challenges, and requirements to understand exactly what you need.' },
  { num: '02', icon: 'fa-pencil-ruler', title: 'Plan & Design',     desc: 'We create a detailed project plan, wireframes, and design mockups for your approval.' },
  { num: '03', icon: 'fa-code',         title: 'Build & Test',      desc: 'Our engineers build your product with regular updates and thorough quality testing.' },
  { num: '04', icon: 'fa-rocket',       title: 'Launch & Support',  desc: 'We deploy your product and provide ongoing support, training, and maintenance.' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a0a10] via-[#2d0d1a] to-[#0f1520] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#ff8c42] text-sm font-bold uppercase tracking-widest mb-4">Transforming Ideas Into Digital Reality</p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                We Build Digital Products That Work in the Real World
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Sleek Nexus Creative helps organizations in South Sudan launch dependable websites, apps,
                and platforms that scale, perform, and deliver measurable impact.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/contact" className="btn btn-primary"><i className="fas fa-rocket" /> Start Your Project</Link>
                <Link to="/projects" className="btn btn-secondary"><i className="fas fa-eye" /> View Our Work</Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {[['50+', 'Projects Delivered'], ['10K+', 'Learners Supported'], ['5+', 'Years of Excellence']].map(([v, l]) => (
                  <div key={l}>
                    <strong className="block text-2xl font-extrabold text-white">{v}</strong>
                    <span className="text-gray-400 text-sm">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <aside className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <p className="text-[#ff8c42] text-xs font-bold uppercase tracking-widest mb-4">What You Get</p>
              <ul className="space-y-3 text-gray-300 text-sm">
                {[
                  'Discovery and planning before every build',
                  'Fast, mobile-first interfaces users actually adopt',
                  'Secure architecture and post-launch support',
                  'Dedicated team throughout the project',
                  'On-time delivery with clear milestones',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-[#ff8c42] mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-[#ff8c42] text-sm font-semibold hover:gap-3 transition-all">
                Explore Our Services <i className="fas fa-arrow-right" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Stats counter */}
      <section className="bg-gray-900 pt-16 pb-0">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16">
            {stats.map(s => (
              <StatCounter key={s.label} icon={s.icon} count={s.count} label={s.label} />
            ))}
          </div>
        </div>
        {/* Zigzag into Services (gray-50) */}
        <Zigzag color="#f9fafb" bg="#111827" size={20} />
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="container text-center">
          <span className="section-label">Our Services</span>
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle">From concept to launch, we design systems that solve real operational and community problems.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {services.map(s => (
              <div key={s.title} className="service-card fade-in text-left">
                <div className="service-icon"><i className={`fas ${s.icon}`} /></div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <Link to={s.to} className="text-[#c41e3a] text-sm font-semibold hover:underline">Learn More &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="pt-20 pb-0 bg-white">
        <div className="container pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="section-title">Building Reliable Technology for South Sudanese Organizations</h2>
              <p className="text-gray-500 leading-relaxed mb-4">Based in Juba, we partner with businesses, schools, NGOs, and public initiatives to design practical, scalable digital systems for local realities.</p>
              <p className="text-gray-500 leading-relaxed mb-6">Our team combines product strategy, engineering, and training to help clients launch faster, operate more efficiently, and sustain long-term digital growth.</p>
              <Link to="/about" className="btn btn-primary">Learn About Us</Link>
            </div>
            <div className="fade-in">
              <img src="/images/about-preview.jpg" alt="Sleek Nexus Creative Team" loading="lazy" className="rounded-2xl shadow-xl w-full object-cover" />
            </div>
          </div>
        </div>
        {/* Zigzag into How it Works (gray-50) */}
        <Zigzag color="#f9fafb" bg="#ffffff" size={20} />
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container text-center">
          <h2 className="section-title">How We Work</h2>
          <p className="section-subtitle">A clear, structured process from your first message to a live product.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {process.map((p, i) => (
              <div key={p.num} className="bg-white rounded-2xl p-8 shadow-sm fade-in relative">
                <div className="text-5xl font-extrabold text-gray-100 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{p.num}</div>
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#c41e3a] text-xl mb-4 mx-auto">
                  <i className={`fas ${p.icon}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                {i < process.length - 1 && (
                  <i className="fas fa-chevron-right absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zigzag into Projects (white) — sits at bottom of How it Works */}

      {/* Projects */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h2 className="section-title fade-in">Featured Projects</h2>
          <p className="section-subtitle fade-in">Selected case studies with measurable outcomes in education, business, and finance.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {projects.map(p => (
              <div key={p.title} className="project-card fade-in text-left">
                <img src={p.img} alt={p.title} loading="lazy" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <Link to={p.to} className="btn btn-outline btn-small">View Case Study</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/projects" className="btn btn-primary">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-20 pb-0 bg-gray-50" style={{ overflow: 'visible' }}>
        <div className="container text-center">
          <span className="section-label">Client Stories</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Trusted by businesses, schools, and organizations across South Sudan.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {testimonials.map(t => (
              <div key={t.name} className="testimonial-card fade-in text-left">
                <div className="flex gap-1 text-[#ff8c42] mb-4">
                  {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-sm" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c41e3a] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Zigzag into Why Choose Us (white) */}
        <Zigzag color="#ffffff" bg="#f9fafb" size={20} />
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">We are not just a vendor &mdash; we are a long-term technology partner committed to your success.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {whyUs.map(w => (
              <div key={w.title} className="bg-gray-50 rounded-2xl p-8 fade-in text-left">
                <div className="w-12 h-12 rounded-xl bg-[#c41e3a] flex items-center justify-center text-white text-xl mb-4">
                  <i className={`fas ${w.icon}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
