import { Link } from 'react-router-dom';
import CTASection from '../components/CTA';

const projects = [
  { id:'project1', img:'/images/project1.jpg',         title:'E-Learning Platform',        tags:['EdTech','React','Node.js'],   desc:'Comprehensive digital learning ecosystem empowering 10,000+ students with accessible, quality education across South Sudan.' },
  { id:'project2', img:'/images/project2.jpg',         title:'Business Management System', tags:['Enterprise','MongoDB'],       desc:'Integrated enterprise solution driving operational excellence and scalable growth for a leading South Sudanese business.' },
  { id:'project3', img:'/images/project3.jpg',         title:'Mobile Banking App',         tags:['FinTech','React Native'],     desc:'Bank-grade secure platform delivering seamless financial services to underserved communities.' },
  { id:'project4', img:'/images/project-ecommerce.jpg', title:'E-Commerce Platform',       tags:['E-Commerce','Stripe'],        desc:'Full-featured online store with payment integration, inventory management, and real-time analytics.' },
  { id:'project5', img:'/images/project-student-system.jpg', title:'Student Information System', tags:['EdTech','PostgreSQL'], desc:'Comprehensive student management platform used by multiple schools across South Sudan.' },
  { id:'project6', img:'/images/project6.jpg',         title:'NGO Impact Dashboard',       tags:['Analytics','Dashboard'],      desc:'Real-time impact tracking and reporting platform for a major international NGO operating in South Sudan.' },
];

export function Projects() {
  return (
    <>
      {/* Header */}
      <section className="page-header">
        <div className="px-6 sm:px-10 lg:px-16 max-w-screen-2xl mx-auto">
          <span className="tagline">Real Solutions. Measurable Impact.</span>
          <h1>Our Projects</h1>
          <p className="header-description">Selected case studies showcasing our work across education, business, finance, and community development in South Sudan.</p>
        </div>
      </section>

      {/* Projects grid — full width with small side padding */}
      <section className="py-16 bg-white">
        <div className="px-4 sm:px-8 lg:px-14 max-w-screen-2xl mx-auto">

          {/* Section intro */}
          <div className="mb-10">
            <span className="section-label">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
              Work We're Proud Of
            </h2>
          </div>

          {/* Grid — 3 columns on large screens, bigger cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map(p => (
              <div key={p.id} id={p.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 fade-in flex flex-col">

                {/* Image — taller */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.img} alt={p.title} loading="lazy"
                    className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tag overlay */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    {p.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-6 flex-1">{p.desc}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[#c41e3a] font-semibold text-sm hover:gap-3 transition-all group-hover:underline">
                    Discuss a Similar Project <i className="fas fa-arrow-right text-xs" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

const courses = [
  { title:'Web Development Bootcamp',    icon:'fa-code',          duration:'12 weeks', level:'Beginner',     desc:'Learn HTML, CSS, JavaScript, React, and Node.js from scratch. Build real projects and launch your tech career.' },
  { title:'Mobile App Development',      icon:'fa-mobile-alt',    duration:'10 weeks', level:'Intermediate', desc:'Build iOS and Android apps using React Native. Deploy to app stores and monetize your skills.' },
  { title:'Data Science & Analytics',    icon:'fa-chart-bar',     duration:'8 weeks',  level:'Intermediate', desc:'Master Python, data visualization, and machine learning fundamentals with real-world datasets.' },
  { title:'UI/UX Design Fundamentals',   icon:'fa-paint-brush',   duration:'6 weeks',  level:'Beginner',     desc:'Learn Figma, design principles, and user research to create beautiful, user-centered digital products.' },
  { title:'Cybersecurity Essentials',    icon:'fa-shield-alt',    duration:'8 weeks',  level:'Beginner',     desc:'Understand network security, ethical hacking basics, and how to protect digital systems.' },
  { title:'Cloud Computing with AWS',    icon:'fa-cloud',         duration:'10 weeks', level:'Advanced',     desc:'Deploy scalable applications on AWS. Prepare for AWS certifications and cloud architecture roles.' },
];

export function Courses() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="tagline">Empowering South Sudan Through Tech Education</span>
          <h1>Our Courses</h1>
          <p className="header-description">Practical, industry-aligned technology courses designed to equip South Sudanese youth and professionals with in-demand digital skills.</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(c => (
              <div key={c.title} className="service-card fade-in">
                <div className="service-icon"><i className={`fas ${c.icon}`} /></div>
                <div className="flex gap-2 mb-3">
                  <span className="tech-badge">{c.duration}</span>
                  <span className={`tech-badge ${c.level === 'Beginner' ? 'bg-green-50 text-green-700' : c.level === 'Advanced' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{c.level}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{c.desc}</p>
                <Link to="/contact" className="btn btn-outline btn-small">Enroll Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Ready to Start Your Tech Journey?" subtitle="Join hundreds of South Sudanese learners building in-demand digital skills." primaryLabel="Enroll Today" primaryTo="/contact" secondaryLabel="Learn More" secondaryTo="/about" trust={[]} />
    </>
  );
}

const jobs = [
  { title:'Senior Full-Stack Developer', dept:'Engineering',  type:'Full-time', desc:'Build and maintain scalable web applications using React, Node.js, and MongoDB.' },
  { title:'UI/UX Designer',              dept:'Design',       type:'Full-time', desc:'Create intuitive user interfaces and experiences for our client projects.' },
  { title:'Project Manager',             dept:'Operations',   type:'Full-time', desc:'Lead cross-functional teams to deliver technology projects on time and within budget.' },
  { title:'Sales Executive',             dept:'Sales',        type:'Full-time', desc:'Drive business growth by identifying and closing new client opportunities.' },
  { title:'Tech Trainer',                dept:'Education',    type:'Part-time', desc:'Deliver engaging technology training sessions to students and corporate clients.' },
];

export function Careers() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="tagline">Shape South Sudan's Digital Future</span>
          <h1>Careers at SNC</h1>
          <p className="header-description">Join a passionate team of innovators building technology that creates real impact across South Sudan and beyond.</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[['fa-heart','Mission-Driven Work','Every project we build creates real impact for communities across South Sudan.'],['fa-graduation-cap','Growth & Learning','Continuous learning opportunities, mentorship, and career development support.'],['fa-users','Great Team','Work alongside talented, passionate people who care about technology and impact.']].map(([icon,title,desc]) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-8 text-center fade-in">
                <i className={`fas ${icon} text-3xl text-[#c41e3a] mb-4 block`} />
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <h2 className="section-title text-center mb-8">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map(j => (
              <div key={j.title} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow fade-in">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{j.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <span className="tech-badge">{j.dept}</span>
                    <span className="tech-badge">{j.type}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{j.desc}</p>
                </div>
                <Link to="/contact" className="btn btn-primary btn-small shrink-0">Apply Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Don't See Your Role?" subtitle="We're always looking for talented people. Send us your CV and let's talk." primaryLabel="Send Your CV" primaryTo="/contact" secondaryLabel="Learn About Us" secondaryTo="/about" trust={[]} />
    </>
  );
}

const partners = [
  { img:'/images/partner-dxc-technology.jpg',   name:'DXC Technology',       desc:'Global IT services and solutions partner supporting our enterprise projects.' },
  { img:'/images/partner-dxc-ferrari.jpg',       name:'Ferrari Partnership',  desc:'Strategic collaboration on technology innovation and digital transformation.' },
  { img:'/images/partner-education.jpg',         name:'Education Partners',   desc:'Collaborating to expand digital education access across South Sudan.' },
  { img:'/images/partner-strong-families.jpg',   name:'Strong Families',      desc:'Community development partner focused on family empowerment through technology.' },
];

export function Partners() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="tagline">Building Together for Greater Impact</span>
          <h1>Our Partners</h1>
          <p className="header-description">We collaborate with organizations that share our vision of using technology to drive sustainable development and positive change in South Sudan.</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h2 className="section-title">Our Partner Organizations</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {partners.map(p => (
              <div key={p.name} className="bg-gray-50 rounded-2xl p-6 fade-in">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-36 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{p.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container text-center max-w-2xl">
          <h2 className="section-title">Become a Partner</h2>
          <p className="section-subtitle">Join our network of organizations committed to driving digital transformation and sustainable development in South Sudan.</p>
          <div className="space-y-4 text-left mb-8">
            {['Co-develop technology solutions for shared communities','Access our network of clients and stakeholders','Joint marketing and brand visibility opportunities','Collaborative research and innovation projects'].map(b => (
              <div key={b} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <i className="fas fa-check-circle text-[#c41e3a] text-lg shrink-0" />
                <span className="text-gray-700 text-sm">{b}</span>
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn btn-primary">Partner With Us</Link>
        </div>
      </section>
    </>
  );
}

const donors = [
  { img:'/images/donor-corporate-microsoft.jpg',      name:'Microsoft',           type:'Corporate Donor',    desc:'Supporting digital literacy and technology access programs across South Sudan.' },
  { img:'/images/donor-foundation-reconnecting.jpg',  name:'Reconnecting Foundation', type:'Foundation',     desc:'Funding educational technology initiatives to bridge the digital divide.' },
  { img:'/images/donor-grant-provider.jpg',           name:'Grant Provider',      type:'Grant Funding',      desc:'Providing grants for community technology development projects.' },
  { img:'/images/donor-major-capital-one.jpg',        name:'Capital One',         type:'Major Donor',        desc:'Major financial supporter of our youth technology training programs.' },
];

export function Donors() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="tagline">Fueling Impact Through Generosity</span>
          <h1>Our Donors</h1>
          <p className="header-description">Our work is made possible by the generous support of individuals and organizations who believe in the power of technology to transform lives in South Sudan.</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container text-center">
          <h2 className="section-title">Our Generous Supporters</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {donors.map(d => (
              <div key={d.name} className="bg-gray-50 rounded-2xl p-6 fade-in">
                <img src={d.img} alt={d.name} loading="lazy" className="w-full h-36 object-cover rounded-xl mb-4" />
                <span className="tech-badge mb-2 inline-block">{d.type}</span>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{d.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container text-center max-w-2xl">
          <h2 className="section-title">Make a Difference</h2>
          <p className="section-subtitle">Your donation directly funds technology education, community projects, and digital infrastructure in South Sudan.</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[['$50','Funds one student\'s course materials'],['$200','Sponsors a youth tech workshop'],['$1,000','Equips a community computer lab']].map(([amt, desc]) => (
              <div key={amt} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-2xl font-extrabold text-[#c41e3a] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{amt}</div>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn btn-primary"><i className="fas fa-heart" /> Donate Now</Link>
        </div>
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <div className="py-20 bg-white">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: January 2024</p>
        {[
          ['Information We Collect', 'We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or apply for a job. This may include your name, email address, phone number, and message content.'],
          ['How We Use Your Information', 'We use the information we collect to respond to your inquiries, send newsletters you have subscribed to, process job applications, improve our services, and comply with legal obligations.'],
          ['Information Sharing', 'We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business.'],
          ['Data Security', 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'],
          ['Your Rights', 'You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@SNC.ss.'],
          ['Contact Us', 'If you have questions about this Privacy Policy, please contact us at info@SNC.ss or +211 925 277 700.'],
        ].map(([title, text]) => (
          <div key={title} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h2>
            <p className="text-gray-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="py-20 bg-white">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: January 2024</p>
        {[
          ['Acceptance of Terms', 'By accessing and using the Sleek Nexus Creative website, you accept and agree to be bound by these Terms of Service.'],
          ['Use of Services', 'Our services are provided for legitimate business and personal use. You agree not to use our services for any unlawful purpose or in any way that could damage our reputation or operations.'],
          ['Intellectual Property', 'All content on this website, including text, graphics, logos, and software, is the property of Sleek Nexus Creative and is protected by applicable intellectual property laws.'],
          ['Limitation of Liability', 'Sleek Nexus Creative shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.'],
          ['Changes to Terms', 'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.'],
          ['Contact', 'For questions about these Terms, contact us at info@SNC.ss.'],
        ].map(([title, text]) => (
          <div key={title} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h2>
            <p className="text-gray-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center py-20">
      <div>
        <div className="text-8xl font-extrabold text-gray-100 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">Go Back Home</Link>
      </div>
    </div>
  );
}
