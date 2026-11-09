import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, fadeRight, rotateIn, staggerContainer, scaleIn } from '../lib/animations'
import SEO from '../components/ui/SEO'
import { pageSeo } from '../lib/seo-data'
import MagneticButton from '../components/ui/MagneticButton'
import KineticHeadline from '../components/ui/KineticHeadline'
import RevealLink from '../components/ui/RevealLink'
import Img from '../components/ui/Img'
import { liveProducts } from '../lib/work-data'
import { companyStats } from '../lib/site'
import CtaBand from '../components/ui/CtaBand'
// ─── Data ────────────────────────────────────────────────────────────────────

// Hero background photo (a file in public/images). After adding a new one,
// run `npm run images` so phones get a smaller WebP version.
const HERO_IMAGE = '/images/hero-tech.jpg'

const counters = companyStats

const processSteps = [
  { num: '01', icon: 'fa-comments', title: 'Discovery Call', desc: 'We listen to your goals, challenges, and requirements to understand exactly what you need.' },
  { num: '02', icon: 'fa-pencil-ruler', title: 'Plan & Design', desc: 'We create a detailed project plan, wireframes, and design mockups for your approval.' },
  { num: '03', icon: 'fa-code', title: 'Build & Test', desc: 'Our engineers build your product with regular updates and thorough quality testing.' },
  { num: '04', icon: 'fa-rocket', title: 'Launch & Support', desc: 'We deploy your product and provide ongoing support, training, and maintenance.' },
]


// `photo` is optional: put the file in public/images and set e.g.
// photo: '/images/akol-mading.jpg'. Without one, the first letter of the
// name is shown instead.
const testimonials = [
  { photo: '', name: 'Akol Mading', role: 'Director, Juba Learning Centre', text: 'SNC built our online course platform from scratch. The team was communicative, delivered on time, and trained our staff to manage it independently. Exactly what we needed.' },
  { photo: '', name: 'Rebecca Chol', role: 'Owner, RC Retail Store', text: 'They built us a simple inventory system that actually works on our local network. No unnecessary complexity, just a clean solution that saves us hours every week.' },
  { photo: '', name: 'Peter Majok', role: 'Program Officer, Local NGO', text: 'We needed a website quickly and within a tight budget. SNC delivered a professional, mobile-friendly site and were honest about what was realistic. Great experience.' },
]

const whyCards = [
  { icon: 'fa-map-marker-alt', title: 'Locally Based', desc: "We work where our clients work — we know the networks, the devices, and the paperwork, because we deal with them too." },
  { icon: 'fa-shield-alt', title: 'Secure & Reliable', desc: 'Access control, regular backups, and reliable hosting are part of every build — not optional extras.' },
  { icon: 'fa-dollar-sign', title: 'Affordable Pricing', desc: 'Pricing set for organizations operating here, with payment plans that follow project milestones.' },
  { icon: 'fa-headset', title: 'Dedicated Support', desc: 'Our team is available after launch for maintenance, updates, training, and technical support.' },
  { icon: 'fa-graduation-cap', title: 'Training Included', desc: 'We train your team to use and manage every product we deliver so you stay independent.' },
  { icon: 'fa-clock', title: 'On-Time Delivery', desc: 'Agreed milestones you can check progress against, and early warning if anything is going to slip.' },
]

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <SEO {...pageSeo['/']} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-dark">
        {/* Static background photo — swap HERO_IMAGE (top of this file) to change it */}
        <Img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />
        {/* Navy wash: strongest behind the text, lighter on the right */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-dark via-dark/85 to-dark/50" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark/80 via-transparent to-dark/30" />

        <div className="relative container-page py-20 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.8 }}>
              <p className="hero-eyebrow">Based in Juba, South Sudan</p>
              <h1 className="display-heading text-white mb-6">
                <KineticHeadline lines={[
                  ['We', 'Build', 'Digital', 'Products'],
                  ['That', 'Work', 'in'],
                  ['the', (
                    <span key="real-world" className="relative inline-block">
                      <span className="text-accent">Real World</span>
                      <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary rounded-full" />
                    </span>
                  )],
                ]} />
              </h1>
              <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-7 sm:mb-8">
                Bring us the problem slowing your organization down — paper records, customers you can't reach online, systems that fail when the network drops. We'll design, build, and launch the website, app, or platform that fixes it, train your team to run it, and stay with you after launch.
              </p>
              <div className="flex flex-wrap gap-3 mb-8 sm:mb-12">
                <MagneticButton>
                  <Link to="/contact" className="btn-primary text-base px-7 py-3.5">Start Your Project</Link>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary text-base px-7 py-3.5">View Our Services</Link>
                </MagneticButton>
              </div>
            </motion.div>

              <motion.aside
              variants={fadeRight} initial="hidden" animate="show" transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Card glow border */}
              <div className="absolute -inset-[1px] rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(254,127,45,0.35), rgba(35,61,77,0.15), rgba(254,127,45,0.2))', borderRadius: '1rem' }} />

              <div
                className="relative bg-white/95 backdrop-blur-sm border border-white rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(35,61,77,0.12),0_4px_16px_rgba(254,127,45,0.08)]"
              >
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">What You Get</p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Discovery and planning before every build',
                    'Fast, mobile-first interfaces users actually adopt',
                    'Secure architecture and post-launch support',
                    'Dedicated team throughout the project',
                    'On-time delivery with clear milestones',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-dark-soft text-sm">
                      <i className="fas fa-check-circle text-accent mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="inline-flex items-center gap-2 text-accent font-semibold text-sm">
                  Explore Our Services <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ── Orbital Stats ── */}
      <section className="py-12 sm:py-16 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="container-page">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {counters.map(({ icon, value, suffix, label }) => (
              <motion.div key={label} variants={scaleIn} className="relative group flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <i className={`fas ${icon} text-primary text-xl`} />
                </div>
                <strong className="block text-3xl sm:text-4xl font-heading font-black text-dark mb-1">
                  {value}{suffix}
                </strong>
                <span className="text-muted text-xs sm:text-sm">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bento Services Grid ── */}
      <section className="py-16 sm:py-24 aurora-bg">
        <div className="container-page">
          <motion.div className="text-center mb-10 sm:mb-14" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="eyebrow">What We Do</p>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">From concept to launch, we design systems that solve real operational and community problems.</p>
          </motion.div>

          {/* Bento asymmetric grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-4">

            {/* Large feature cell — spans 2 cols + 2 rows */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5}}
              className="bento-cell row-span-2 lg:col-span-2 relative overflow-hidden group cursor-pointer bg-dark">
              {/* Background photo under a navy wash, darkest where the text sits */}
              <Img
                src="/images/software-dev.jpg"
                alt=""
                aria-hidden="true"
                sizes="(min-width: 1024px) 66vw, 100vw"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
              <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <i className="fas fa-code text-primary text-2xl" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-3xl sm:text-5xl uppercase leading-none mb-3" style={{ letterSpacing: '-0.02em' }}>Software<br/>Development</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-sm">Systems shaped around how your organization actually works.</p>
                  <RevealLink to="/services#software-dev" className="inline-flex items-center gap-2 text-accent font-bold text-sm hover:gap-3 transition-all">
                    Explore <i className="fas fa-arrow-right text-xs" />
                  </RevealLink>
                </div>
              </div>
            </motion.div>

            {/* Small cell 1 */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
              className="bento-cell group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <i className="fas fa-mobile-alt text-primary text-lg" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-dark text-xl uppercase leading-tight mb-1">Web &amp; Mobile</h3>
                  <p className="text-muted text-xs leading-relaxed">Responsive products for all devices.</p>
                </div>
              </div>
            </motion.div>

            {/* Small cell 2 */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5,delay:0.2}}
              className="bento-cell group cursor-pointer bg-primary relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-light opacity-30" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-white text-xl uppercase leading-tight mb-1">EdTech</h3>
                  <p className="text-white/70 text-xs leading-relaxed">Digital learning tools that expand access.</p>
                </div>
              </div>
            </motion.div>

            {/* Wide cell — spans 2 cols */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5,delay:0.3}}
              className="bento-cell sm:col-span-2 lg:col-span-2 relative overflow-hidden group cursor-pointer">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/5" />
              <div className="relative h-full flex items-center gap-8 p-6">
                <div className="w-14 h-14 rounded-2xl bg-dark flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-laptop-code text-accent text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-black text-dark text-2xl uppercase leading-tight mb-1">IT Consulting &amp; Digital Transformation</h3>
                  <p className="text-muted text-sm">Clear advice on what to build, what to buy, and what to leave alone.</p>
                </div>
                <RevealLink to="/services#consulting" className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center text-primary hover:text-white transition-all group-hover:scale-110">
                  <i className="fas fa-arrow-right" />
                </RevealLink>
              </div>
            </motion.div>

            {/* CTA cell */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}} transition={{duration:0.5,delay:0.4}}
              className="bento-cell relative overflow-hidden bg-dark-soft flex items-center justify-center cursor-pointer group">
              <div className="absolute inset-0 bg-dots-light opacity-20" />
              <RevealLink to="/services" className="relative flex flex-col items-center gap-3 text-center p-6">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 group-hover:border-primary flex items-center justify-center transition-colors">
                  <i className="fas fa-plus text-white group-hover:text-primary transition-colors" />
                </div>
                <span className="text-white font-heading font-bold text-sm uppercase tracking-widest">All Services</span>
              </RevealLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="eyebrow">Who We Are</p>
              <h2 className="section-title">
                Reliable Technology, Built in Juba
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Headquartered in Juba, South Sudan, we partner with businesses, schools, NGOs, and organizations — locally and internationally — to design practical, scalable digital systems built for real-world conditions.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Our team combines product strategy, engineering, and training to help clients launch faster, operate more efficiently, and sustain long-term digital growth.
              </p>
              <MagneticButton>
                <Link to="/about" className="btn-primary">Learn About Us</Link>
              </MagneticButton>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.15 }}>
              <Img src="/images/about-preview.jpg" alt="Sleek Nexus Creative — Reliable Technology, Built in Juba" className="w-full rounded-xl object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work — process steps */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="text-center mb-10 sm:mb-14">
            <p className="eyebrow">Our Process</p>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">A clear, structured process from your first message to a live product.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ num, icon, title, desc }, i) => (
              <motion.div key={num}
                className="relative card p-6"
                variants={rotateIn} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="relative font-heading font-black text-dark text-lg mb-2">{title}</h3>
                <p className="relative text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live products — proof, before the testimonials */}
      <section className="relative overflow-hidden bg-noise py-16 sm:py-24 bg-dark text-white">
        <div className="relative container-page">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <motion.div className="lg:col-span-2" variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest">{liveProducts.length} Live Products</span>
              </span>
              <h2 className="display-heading-sm mb-5">Built Here. In Use Today.</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Two platforms of our own are live today — one for learners, one for hospitals. They're built with the same discipline we bring to every client project: real networks, real devices, and the people who depend on them.
              </p>
              <MagneticButton>
                <Link to="/work" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">See All Our Work</Link>
              </MagneticButton>
            </motion.div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
              {liveProducts.map((p, i) => (
                <motion.a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.15 + i * 0.12 }}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-dark-soft shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(254,127,45,0.2)] transition-all duration-500"
                >
                  {/* Browser-chrome frame — the live sites block iframe embeds,
                      so this is a styled preview that links out instead. */}
                  <div className="flex items-center gap-2 bg-gray-900 px-4 py-3 border-b border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="ml-2 flex-1 min-w-0 bg-white/5 rounded-md px-2.5 py-1 text-white/50 text-[0.7rem] flex items-center gap-1.5">
                      <i className="fas fa-lock text-[0.55rem]" /> <span className="truncate">{p.displayUrl}</span>
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                        <i className={`fas ${p.icon} text-accent text-lg`} />
                      </div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/60 bg-white/10 rounded-full px-2.5 py-1">{p.sector}</span>
                    </div>
                    <h3 className="font-heading font-black text-white text-xl uppercase leading-tight mb-1" style={{ letterSpacing: '-0.01em' }}>{p.title}</h3>
                    <p className="text-accent text-xs font-semibold mb-3">{p.tagline}</p>
                    <p className="text-white/60 text-sm leading-relaxed mb-5 flex-1">{p.short}</p>
                    <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:text-accent transition-colors">
                      {p.cta} <i className="fas fa-arrow-up-right-from-square text-xs" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container-page">
          <div className="text-center mb-10 sm:mb-14">
            <p className="eyebrow">Client Stories</p>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">Trusted by businesses, schools, and organizations across South Sudan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map(({ photo, name, role, text }) => (
              <figure key={name} className="bg-white rounded-xl p-6 sm:p-7 h-full flex flex-col border-t-4 border-primary">
                <blockquote className="text-dark-soft leading-relaxed mb-6 flex-1">“{text}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  {photo ? (
                    <img src={photo} alt={name} loading="lazy" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <span className="w-11 h-11 rounded-full bg-dark text-accent font-heading font-black flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      {name.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="block font-semibold text-dark text-sm">{name}</span>
                    <span className="block text-muted text-xs">{role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="text-center mb-10 sm:mb-14">
            <p className="eyebrow">Why SNC</p>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">We're based here, we understand the context, and we stay involved after launch.</p>
          </div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {whyCards.map(({ icon, title, desc }) => (
              <motion.div key={title} className="card p-5 sm:p-6 hover:-translate-y-1" variants={rotateIn}>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`fas ${icon} text-primary text-lg`} />
                </div>
                <h3 className="font-heading font-bold text-dark mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CtaBand
        title="Let's Build Something Real"
        desc="Send a project brief and hear back within 24 hours — a clear scope, a straight timeline, and pricing that makes sense."
        primary={{ to: '/get-started', label: "Start a Project" }}
        secondary={{ to: '/services', label: "Our Services" }}
      />
    </>
  )
}
