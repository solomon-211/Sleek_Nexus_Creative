import { Link } from 'react-router-dom';
import CTASection from '../components/CTA';

const team = {
  board: [
    { img: '/images/board-member.jpeg',  name: 'Dr. James Kuol',  role: 'Chairman of the Board',  bio: 'Strategic leader with 20+ years in technology governance and corporate strategy across East Africa.', socials: ['fa-linkedin'] },
    { img: '/images/board-chairman.jpeg', name: 'Mary Akech',     role: 'Board Member',            bio: 'Finance expert and advocate for technology-driven economic development in South Sudan.',              socials: ['fa-linkedin'] },
  ],
  marketing: [
    { img: '/images/marketing-head-new.jpeg', name: 'Agau Deborah Makuol', role: 'Head of Marketing & Communications', bio: 'Brand strategist specializing in digital marketing, content creation, and stakeholder engagement.', socials: ['fa-linkedin','fa-twitter'] },
    { img: '/images/marketing-head.jpeg',     name: 'Daniel Deng',         role: 'Sales Manager',                      bio: 'Results-driven sales professional with expertise in B2B technology solutions.',                    socials: ['fa-linkedin'] },
  ],
  leadership: [
    { img: '/images/team-member1.jpg', name: 'Solomon Leek',    role: 'CEO & Founder',   bio: 'Visionary entrepreneur with deep expertise in software engineering and social impact technology.', socials: ['fa-linkedin','fa-twitter'] },
    { img: '/images/team-member2.jpg', name: 'Gideon Erioluwa', role: 'CTO',             bio: 'Technical architect specializing in cloud infrastructure, AI/ML integration, and enterprise systems.', socials: ['fa-linkedin'] },
    { img: '/images/team-member3.jpg', name: 'Genesis Goch',    role: 'Lead Developer',  bio: 'Senior full-stack engineer specializing in React, Node.js, and database optimization.', socials: ['fa-linkedin'] },
    { img: '/images/team-member4.jpg', name: 'Philip Bior',     role: 'UX/UI Designer', bio: 'Award-winning designer specializing in human-centered design and intuitive interfaces.', socials: ['fa-linkedin','fa-dribbble'] },
  ],
};

const approach = [
  { num:'01', icon:'fa-search',    title:'Discovery & Analysis',   desc:'We deeply understand your challenges through stakeholder interviews, data analysis, and market research.' },
  { num:'02', icon:'fa-lightbulb', title:'Strategic Planning',     desc:'We design tailored solutions, define success metrics, and create a detailed roadmap aligned with your goals.' },
  { num:'03', icon:'fa-code',      title:'Agile Development',      desc:'Using iterative methodologies, we build robust solutions with continuous testing and regular demos.' },
  { num:'04', icon:'fa-rocket',    title:'Deployment & Training',  desc:'We ensure seamless implementation with comprehensive user training and hands-on support.' },
  { num:'05', icon:'fa-chart-line', title:'Optimization & Growth', desc:'Post-launch, we monitor performance, gather feedback, and continuously optimize the solution.' },
  { num:'06', icon:'fa-handshake', title:'Long-Term Partnership',  desc:'Through regular check-ins and proactive maintenance, we ensure your technology keeps delivering value.' },
];

function TeamCard({ member }) {
  return (
    <div className="team-card">
      <img src={member.img} alt={member.name} loading="lazy" className="w-full h-56 object-cover object-top" />
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-[#c41e3a] text-sm font-semibold mb-2">{member.role}</p>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{member.bio}</p>
        <div className="flex gap-2">
          {member.socials.map(s => (
            <a key={s} href="#" aria-label={s.replace('fa-','')}
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#c41e3a] hover:text-white transition-colors text-sm">
              <i className={`fab ${s}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="tagline">Building Digital Solutions That Work in the Real World</span>
          <h1>About Sleek Nexus Creative</h1>
          <p className="header-description">
            We partner with businesses, institutions, and communities to develop cutting-edge technology solutions that address real challenges and empower South Sudan's future through innovation.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Pioneering Digital Transformation Across <span className="text-[#c41e3a]">South Sudan</span></h2>
              <p className="text-gray-500 leading-relaxed mb-4">Sleek Nexus Creative is a forward-thinking digital innovation company dedicated to accelerating South Sudan's transition into the modern digital era.</p>
              <p className="text-gray-500 leading-relaxed mb-4">Our work focuses on building reliable digital infrastructure, developing custom software systems, and providing transformative tech services that improve efficiency, transparency, and access to opportunities.</p>
              <p className="text-gray-500 leading-relaxed mb-6">Driven by a mission to bridge the digital divide, we are committed to nurturing local talent, supporting entrepreneurship, and enabling sustainable development through innovation.</p>
              <div className="flex flex-wrap gap-3">
                {['5+ Years Experience','50+ Projects Delivered','30+ Happy Clients','South Sudan Based'].map(b => (
                  <span key={b} className="inline-flex items-center gap-2 bg-red-50 text-[#c41e3a] text-xs font-semibold px-3 py-1.5 rounded-full">
                    <i className="fas fa-check" /> {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="fade-in">
              <img src="/images/company-story.jpg" alt="Our Story" loading="lazy" className="rounded-2xl shadow-xl w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 bg-gray-50">
        <div className="container text-center">
          <span className="section-label">What Drives Us</span>
          <h2 className="section-title">Our Core Principles</h2>
          <p className="section-subtitle">The foundation that drives our innovation and impact.</p>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { icon:'fa-bullseye', title:'Our Mission', text:'To engineer transformative technology solutions that address critical real-world challenges, empower underserved communities, and catalyze sustainable economic growth.' },
              { icon:'fa-eye',      title:'Our Vision',  text:'To establish ourselves as the preeminent technology partner across East Africa, renowned for converting visionary concepts into high-impact solutions.' },
              { icon:'fa-heart',    title:'Our Values',  text:'Innovation, Integrity, Excellence, Collaboration, and Community Impact form the foundational pillars that guide every decision we make.' },
            ].map(c => (
              <div key={c.title} className="bg-white rounded-2xl p-8 shadow-sm fade-in">
                <div className="w-14 h-14 rounded-xl bg-[#c41e3a] flex items-center justify-center text-white text-2xl mb-5 mx-auto">
                  <i className={`fas ${c.icon}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <span className="section-label">How We Work</span>
          <h2 className="section-title">Our Problem-Solving Approach</h2>
          <p className="section-subtitle">A strategic framework for delivering transformative solutions.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {approach.map(a => (
              <div key={a.num} className="bg-gray-50 rounded-2xl p-8 fade-in text-left">
                <div className="text-4xl font-extrabold text-gray-100 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{a.num}</div>
                <div className="w-10 h-10 rounded-lg bg-[#c41e3a] flex items-center justify-center text-white mb-3">
                  <i className={`fas ${a.icon}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-[#c41e3a] text-white">
        <div className="container text-center">
          <span className="section-label" style={{ color: '#ff8c42' }}>By The Numbers</span>
          <h2 className="section-title" style={{ color: 'white' }}>Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            {[['50+','Projects Completed'],['30+','Happy Clients'],['5+','Years Experience'],['15+','Team Members']].map(([v,l]) => (
              <div key={l}>
                <div className="text-4xl font-extrabold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{v}</div>
                <div className="text-white/70 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-white">
        <div className="container text-center">
          <span className="section-label">The People Behind The Work</span>
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">The exceptional talent driving innovation and impact across South Sudan.</p>

          {[['Board of Directors', team.board], ['Sales, Marketing & Communication', team.marketing], ['Leadership Team', team.leadership]].map(([title, members]) => (
            <div key={title} className="mb-14">
              <h3 className="text-xl font-bold text-gray-700 mb-6 text-left border-b border-gray-100 pb-3">{title}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.map(m => <TeamCard key={m.name} member={m} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to Shape South Sudan's Digital Future?"
        subtitle="We're actively seeking exceptional talent who share our passion for innovation and social impact."
        primaryLabel="View Open Positions"
        primaryTo="/careers"
        secondaryLabel="Get In Touch"
        secondaryTo="/contact"
        trust={[]}
      />
    </>
  );
}
