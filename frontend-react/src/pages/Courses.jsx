import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const categories = [
  {
    icon: 'fa-code', title: 'Web & Software Development', bg: '',
    courses: [
      { duration: '12 Weeks', price: '$220', title: 'Full-Stack Web Development Bootcamp', desc: 'Master both frontend and backend development. Build complete web applications from scratch using industry-standard tools.', instructor: 'James Maker', mode: 'Online + In-Person', level: 'Beginner to Advanced', learns: ['HTML5, CSS3, JavaScript ES6+', 'React.js & Node.js/Express', 'MongoDB & RESTful APIs', '5 Real-World Portfolio Projects'] },
      { duration: '8 Weeks', price: '$150', title: 'Frontend Development with Modern JavaScript', desc: 'Create stunning, interactive user interfaces with modern JavaScript frameworks and responsive design principles.', instructor: 'Sarah Chen', mode: 'Online', level: 'Intermediate', learns: ['ES6+ JavaScript & TypeScript', 'React & Vue.js Frameworks', 'Responsive Design & CSS Grid', 'API Integration & State Management'] },
      { duration: '8 Weeks', price: '$160', title: 'Backend Development with Node.js & Express', desc: 'Build scalable server-side applications, RESTful APIs, and microservices with the Node.js ecosystem.', instructor: 'Michael Torres', mode: 'Online + In-Person', level: 'Intermediate', learns: ['Node.js & Express Framework', 'MongoDB & SQL Databases', 'Authentication & Security', 'RESTful API Development & Testing'] },
      { duration: '10 Weeks', price: '$170', title: 'Python for Software Development', desc: 'Learn Python programming for web development, automation, data processing, and building scalable applications.', instructor: 'Dr. Amina Hassan', mode: 'Online', level: 'Beginner to Intermediate', learns: ['Python Fundamentals & OOP', 'Django Web Framework', 'Automation Scripts', 'Testing, Debugging & Deployment'] },
    ],
  },
  {
    icon: 'fa-mobile-alt', title: 'Mobile Development', bg: 'bg-gray-50',
    courses: [
      { duration: '10 Weeks', price: '$200', badge: 'Popular', title: 'Mobile App Development with React Native', desc: 'Build cross-platform mobile apps for iOS and Android with one codebase using React Native.', instructor: 'David Kim', mode: 'Online + In-Person', level: 'Intermediate', learns: ['React Native Fundamentals', 'Navigation & State Management', 'Native Features & Device APIs', 'App Store & Play Store Deployment'] },
      { duration: '12 Weeks', price: '$220', title: 'Android Development with Kotlin', desc: 'Create native Android applications using modern Kotlin programming and Android Studio.', instructor: 'Rachel Omondi', mode: 'Online', level: 'Intermediate', learns: ['Kotlin Programming Language', 'Android Studio & Jetpack', 'Material Design Guidelines', 'Google Play Store Publishing'] },
    ],
  },
  {
    icon: 'fa-graduation-cap', title: 'EdTech & Digital Tools', bg: '',
    courses: [
      { duration: '8 Weeks', price: '$160', badge: 'Hot', title: 'Building E-Learning Platforms', desc: 'Design and develop online learning management systems and educational platforms with modern tools.', instructor: 'Prof. John Akech', mode: 'Online + In-Person', level: 'Intermediate', learns: ['LMS Architecture & Design', 'Course Management Systems', 'Student Progress Tracking', 'Assessment & Grading Tools'] },
      { duration: '6 Weeks', price: '$75', title: 'Digital Literacy for Educators', desc: 'Essential digital skills for teachers to effectively use technology in education and engage students.', instructor: 'Mary Ayen', mode: 'Online', level: 'Beginner', learns: ['Digital Tools for Teaching', 'Online Teaching Best Practices', 'Educational Content Creation', 'Student Engagement Strategies'] },
    ],
  },
  {
    icon: 'fa-shield-alt', title: 'IT & Cybersecurity', bg: 'bg-gray-50',
    courses: [
      { duration: '8 Weeks', price: '$120', title: 'IT Support & Networking Fundamentals', desc: 'Master the basics of IT support, troubleshooting, and network administration.', instructor: 'Thomas Wani', mode: 'Online + In-Person', level: 'Beginner', learns: ['Hardware & Software Troubleshooting', 'Network Basics & TCP/IP', 'System Diagnostics & Repair', 'System Administration Essentials'] },
      { duration: '10 Weeks', price: '$180', title: 'Cybersecurity Essentials', desc: 'Protect systems and data with essential cybersecurity skills, threat detection, and best practices.', instructor: 'Angela Nyok', mode: 'Online', level: 'Intermediate', learns: ['Security Fundamentals & CIA Triad', 'Threat Detection & Prevention', 'Encryption & Data Privacy', 'Incident Response & Recovery'] },
      { duration: '8 Weeks', price: '$180', title: 'Cloud Computing with AWS', desc: 'Learn to deploy and manage applications on Amazon Web Services cloud platform.', instructor: 'Samuel Garang', mode: 'Online + In-Person', level: 'Intermediate', learns: ['AWS Fundamentals & Core Services', 'EC2, S3 & Lambda Functions', 'RDS & Database Services', 'Cloud Architecture & Best Practices'] },
    ],
  },
  {
    icon: 'fa-chart-line', title: 'Data & AI', bg: '',
    courses: [
      { duration: '8 Weeks', price: '$140', title: 'Data Analysis with Python & Excel', desc: 'Analyze and visualize data using Python, Pandas, and Excel for actionable business insights.', instructor: 'Dr. Grace Bol', mode: 'Online', level: 'Beginner to Intermediate', learns: ['Python for Data Analysis', 'Pandas & NumPy Libraries', 'Data Visualization with Matplotlib', 'Excel Integration & Automation'] },
      { duration: '10 Weeks', price: '$200', badge: 'Trending', title: 'Introduction to Machine Learning', desc: 'Build intelligent systems with machine learning algorithms and AI fundamentals.', instructor: 'Dr. Isaac Mayen', mode: 'Online + In-Person', level: 'Intermediate to Advanced', learns: ['ML Fundamentals & Algorithms', 'Supervised & Unsupervised Learning', 'Model Training & Evaluation', 'Real-world ML Projects'] },
    ],
  },
]

function CourseCard({ course, i }) {
  return (
    <motion.div className="card p-6 flex flex-col" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
          <span className="bg-dark/10 text-dark text-xs font-bold px-2.5 py-1 rounded-full">{course.duration}</span>
          <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">{course.price}</span>
          {course.badge && <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">{course.badge}</span>}
        </div>
        <span className="text-xs text-muted">Max: 50 Students</span>
      </div>
      <h3 className="font-heading font-bold text-dark text-base mb-2">{course.title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-4">{course.desc}</p>
      <div className="space-y-1.5 mb-4 text-xs text-muted">
        <div className="flex items-center gap-2"><i className="fas fa-user-tie text-primary w-4" />{course.instructor}</div>
        <div className="flex items-center gap-2"><i className="fas fa-certificate text-primary w-4" />Certificate Included</div>
        <div className="flex items-center gap-2"><i className="fas fa-laptop text-primary w-4" />{course.mode}</div>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 mb-5">
        <p className="text-xs font-bold text-dark mb-2">What You'll Learn:</p>
        <ul className="space-y-1">
          {course.learns.map(l => (
            <li key={l} className="flex items-start gap-2 text-xs text-muted">
              <i className="fas fa-check text-primary mt-0.5 flex-shrink-0" /> {l}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-muted"><i className="fas fa-signal text-primary mr-1" />{course.level}</span>
        <Link to="/contact" className="btn-primary text-xs px-4 py-2">Enroll Now</Link>
      </div>
    </motion.div>
  )
}

export default function Courses() {
  return (
    <>
      <Helmet>
        <title>Courses - Sleek Nexus Creative</title>
        <meta name="description" content="Professional tech training programs in South Sudan covering web development, mobile apps, cybersecurity, data science, and more." />
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-br from-dark to-dark-soft text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Empowering South Sudan's Future</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Courses</h1>
            <p className="text-gray-300 text-lg leading-relaxed">Professional tech training programs built for South Sudan. Learn practical skills with industry-certified instructors and real-world projects.</p>
          </motion.div>
        </div>
      </section>

      {/* Course Categories */}
      {categories.map(({ icon, title, bg, courses }) => (
        <section key={title} className={`py-20 ${bg}`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <i className={`fas ${icon} text-primary text-xl`} />
              </div>
              <h2 className="text-2xl font-heading font-bold text-dark">{title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((c, i) => <CourseCard key={c.title} course={c} i={i} />)}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-dark to-dark-soft text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-gray-300 mb-8">Join hundreds of students building tech careers in South Sudan.</p>
          <Link to="/contact" className="btn-primary text-base px-8 py-4">Enroll Today</Link>
        </div>
      </section>
    </>
  )
}
