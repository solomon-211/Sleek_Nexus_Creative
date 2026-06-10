const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '..', 'frontend', 'html');

const NAV = `
            <ul class="nav-menu" id="navMenu" role="menubar">
                <li role="none"><a href="index.html" role="menuitem">Home</a></li>
                <li role="none" class="has-dropdown">
                    <button class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">About <i class="fas fa-chevron-down drop-arrow"></i></button>
                    <ul class="dropdown">
                        <li><a href="our-story.html"><i class="fas fa-book-open"></i> Our Story</a></li>
                        <li><a href="team.html"><i class="fas fa-users"></i> Team</a></li>
                        <li><a href="mission-vision.html"><i class="fas fa-bullseye"></i> Mission &amp; Vision</a></li>
                        <li><a href="careers.html"><i class="fas fa-briefcase"></i> Careers</a></li>
                    </ul>
                </li>
                <li role="none" class="has-dropdown">
                    <button class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">Services <i class="fas fa-chevron-down drop-arrow"></i></button>
                    <ul class="dropdown">
                        <li><a href="web-dev.html"><i class="fas fa-code"></i> Web Development</a></li>
                        <li><a href="mobile-apps.html"><i class="fas fa-mobile-alt"></i> Mobile Apps</a></li>
                        <li><a href="ui-ux.html"><i class="fas fa-pencil-ruler"></i> UI/UX Design</a></li>
                        <li><a href="elearning.html"><i class="fas fa-graduation-cap"></i> E-Learning Solutions</a></li>
                        <li><a href="branding.html"><i class="fas fa-palette"></i> Branding</a></li>
                        <li><a href="digital-consulting.html"><i class="fas fa-laptop-code"></i> Digital Consulting</a></li>
                    </ul>
                </li>
                <li role="none" class="has-dropdown">
                    <button class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">Projects <i class="fas fa-chevron-down drop-arrow"></i></button>
                    <ul class="dropdown">
                        <li><a href="portfolio.html"><i class="fas fa-th"></i> Portfolio</a></li>
                        <li><a href="case-studies.html"><i class="fas fa-chart-bar"></i> Case Studies</a></li>
                        <li><a href="client-success.html"><i class="fas fa-trophy"></i> Client Success Stories</a></li>
                    </ul>
                </li>
                <li role="none" class="has-dropdown">
                    <button class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">Courses <i class="fas fa-chevron-down drop-arrow"></i></button>
                    <ul class="dropdown">
                        <li><a href="browse-courses.html"><i class="fas fa-search"></i> Browse Courses</a></li>
                        <li><a href="free-resources.html"><i class="fas fa-gift"></i> Free Resources</a></li>
                        <li><a href="certifications.html"><i class="fas fa-certificate"></i> Certifications</a></li>
                        <li><a href="student-projects.html"><i class="fas fa-flask"></i> Student Projects</a></li>
                    </ul>
                </li>
                <li role="none" class="has-dropdown">
                    <button class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">Resources <i class="fas fa-chevron-down drop-arrow"></i></button>
                    <ul class="dropdown">
                        <li><a href="blog.html"><i class="fas fa-rss"></i> Blog</a></li>
                        <li><a href="guides.html"><i class="fas fa-map"></i> Guides</a></li>
                        <li><a href="faqs.html"><i class="fas fa-question-circle"></i> FAQs</a></li>
                        <li><a href="downloads.html"><i class="fas fa-download"></i> Downloads</a></li>
                    </ul>
                </li>
                <li role="none" class="has-dropdown">
                    <button class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">Contact <i class="fas fa-chevron-down drop-arrow"></i></button>
                    <ul class="dropdown">
                        <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact Us</a></li>
                        <li><a href="quote.html"><i class="fas fa-file-invoice-dollar"></i> Get a Quote</a></li>
                        <li><a href="book-consultation.html"><i class="fas fa-calendar-check"></i> Book Consultation</a></li>
                    </ul>
                </li>
                <li role="none" class="has-dropdown">
                    <button class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">Join Us <i class="fas fa-chevron-down drop-arrow"></i></button>
                    <ul class="dropdown">
                        <li><a href="careers.html"><i class="fas fa-briefcase"></i> Careers</a></li>
                        <li><a href="internships.html"><i class="fas fa-user-graduate"></i> Internships</a></li>
                        <li><a href="volunteer.html"><i class="fas fa-hands-helping"></i> Volunteer Opportunities</a></li>
                        <li><a href="trainer.html"><i class="fas fa-chalkboard-teacher"></i> Become a Trainer</a></li>
                        <li><a href="mentor.html"><i class="fas fa-user-tie"></i> Become a Mentor</a></li>
                        <li><a href="community.html"><i class="fas fa-users"></i> Join Our Community</a></li>
                        <li><a href="open-positions.html"><i class="fas fa-door-open"></i> Open Positions</a></li>
                    </ul>
                </li>
            </ul>
            <div class="nav-actions">
                <ul class="nav-special">
                    <li><a href="partners.html" class="special-link"><i class="fas fa-handshake"></i> Partner</a></li>
                    <li><a href="donors.html" class="special-link donate-link"><i class="fas fa-heart"></i> Donate</a></li>
                </ul>
                <button class="hamburger" id="hamburger" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navMenu">
                    <span></span><span></span><span></span>
                </button>
            </div>`;

function makePage(title, heading, subtitle, body, activeParent) {
    // Mark the active parent dropdown
    const nav = NAV.replace(
        `class="nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">${activeParent}`,
        `class="nav-dropdown-toggle active" aria-haspopup="true" aria-expanded="false">${activeParent}`
    ).replace(
        `class="has-dropdown">\n                    <button class="nav-dropdown-toggle active"`,
        `class="has-dropdown open">\n                    <button class="nav-dropdown-toggle active"`
    );

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${title} - Sleek Nexus Creative">
    <title>${title} - Sleek Nexus Creative</title>
    <link rel="icon" type="image/png" href="../images/Sleek_Axis.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png">
    <link rel="manifest" href="../manifest.json">
    <link rel="stylesheet" href="../css/style.css?v=5">
    <link rel="stylesheet" href="../css/navbar.css?v=2">
    <link rel="stylesheet" href="../css/consistency.css?v=2">
    <link rel="stylesheet" href="../css/widgets.css?v=2">
    <link rel="stylesheet" href="../css/world-class.css?v=2">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="page-shell">
    <a href="#main-content" class="skip-to-content">Skip to main content</a>
    <nav class="navbar" id="mainNav">
        <div class="nav-progress-line" id="navProgressLine"></div>
        <div class="container">
            <div class="logo">
                <a href="index.html" aria-label="Sleek Nexus Creative Home">
                    <span class="logo-icon"><i class="fas fa-bolt"></i></span>
                    <span class="logo-text"><span class="logo-line1">Sleek <span class="logo-nexus">Nexus</span> Creative</span></span>
                </a>
            </div>
            ${nav}
        </div>
    </nav>
    <section class="page-header" id="main-content">
        <div class="container">
            <p class="tagline">${subtitle}</p>
            <h1>${heading}</h1>
        </div>
    </section>
    <div class="section-divider-edge section-divider-edge--zigzag"></div>
    <section style="padding:4rem 0;">
        <div class="container">
            <div style="max-width:760px;margin:0 auto;text-align:center;">
                ${body}
                <div style="margin-top:2.5rem;">
                    <a href="contact.html" class="btn btn-primary">Get in Touch</a>
                    <a href="index.html" class="btn btn-secondary" style="margin-left:1rem;">Back to Home</a>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; <span id="footer-year">2024</span> Sleek Nexus Creative. All rights reserved.</p>
                <div class="footer-links">
                    <a href="#mainNav" class="footer-back-top" aria-label="Back to top"><i class="fas fa-arrow-up"></i></a>
                    <a href="privacy.html">Privacy Policy</a>
                    <a href="terms.html">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
    <script src="../js/config.js?v=2"></script>
    <script src="../js/navbar.js?v=2" defer></script>
    <script src="../js/script.js?v=3" defer></script>
</body>
</html>`;
}

const pages = [
    ['team', 'Our Team', 'Meet Our Team', 'The People Behind the Work', '<p style="line-height:1.8;color:#475569;">Our team brings together engineers, designers, educators, and strategists united by a single mission: to build technology that works for South Sudan. <a href="about.html">See full team profiles</a>.</p>', 'About'],
    ['mission-vision', 'Mission &amp; Vision', 'Mission &amp; Vision', 'What Drives Us Forward', '<p style="line-height:1.8;color:#475569;"><strong>Mission:</strong> To engineer transformative technology solutions that address critical real-world challenges and catalyze sustainable economic growth.</p><p style="margin-top:1rem;line-height:1.8;color:#475569;"><strong>Vision:</strong> To become the preeminent technology partner across East Africa, renowned for converting visionary concepts into high-impact solutions.</p>', 'About'],
    ['web-dev', 'Web Development', 'Web Development', 'Sleek Nexus Creative Services', '<p style="line-height:1.8;color:#475569;">We build fast, responsive, mobile-first websites and web applications tailored to your organization\'s needs. From simple brochure sites to complex web platforms — we deliver quality on time. <a href="services.html">Explore all services</a>.</p>', 'Services'],
    ['mobile-apps', 'Mobile Apps', 'Mobile Apps', 'Sleek Nexus Creative Services', '<p style="line-height:1.8;color:#475569;">Cross-platform iOS and Android apps built with React Native and Flutter. We design and develop apps that users actually enjoy using. <a href="services.html">Explore all services</a>.</p>', 'Services'],
    ['ui-ux', 'UI/UX Design', 'UI/UX Design', 'Sleek Nexus Creative Services', '<p style="line-height:1.8;color:#475569;">Human-centered design that puts your users first. From wireframes to high-fidelity prototypes, we craft intuitive interfaces that drive engagement and adoption. <a href="services.html">Explore all services</a>.</p>', 'Services'],
    ['elearning', 'E-Learning Solutions', 'E-Learning Solutions', 'Sleek Nexus Creative Services', '<p style="line-height:1.8;color:#475569;">Custom LMS platforms, online course portals, student information systems, and interactive learning tools built for African educational contexts. <a href="services.html">Explore all services</a>.</p>', 'Services'],
    ['branding', 'Branding', 'Branding', 'Sleek Nexus Creative Services', '<p style="line-height:1.8;color:#475569;">From logo design to full brand identity systems — we help your organization communicate its values and stand out in a crowded market. <a href="services.html">Explore all services</a>.</p>', 'Services'],
    ['digital-consulting', 'Digital Consulting', 'Digital Consulting', 'Sleek Nexus Creative Services', '<p style="line-height:1.8;color:#475569;">Strategic technology advisory to guide your digital transformation. We help you make smart technology decisions, reduce risk, and maximize ROI. <a href="services.html">Explore all services</a>.</p>', 'Services'],
    ['portfolio', 'Portfolio', 'Our Portfolio', 'Sleek Nexus Creative Projects', '<p style="line-height:1.8;color:#475569;">Browse our full portfolio of completed projects across web, mobile, EdTech, and enterprise systems. <a href="projects.html">View all projects</a>.</p>', 'Projects'],
    ['case-studies', 'Case Studies', 'Case Studies', 'Sleek Nexus Creative Projects', '<p style="line-height:1.8;color:#475569;">Deep-dive analysis of selected projects — the challenge, our approach, the solution, and the measurable results. <a href="projects.html">View all projects</a>.</p>', 'Projects'],
    ['client-success', 'Client Success Stories', 'Client Success Stories', 'Sleek Nexus Creative Projects', '<p style="line-height:1.8;color:#475569;">Real testimonials and success stories from the organizations and communities we\'ve served. <a href="projects.html">View all projects</a>.</p>', 'Projects'],
    ['browse-courses', 'Browse Courses', 'Browse All Courses', 'Sleek Nexus Creative Education', '<p style="line-height:1.8;color:#475569;">Find the right course for your career goals. From web development to cybersecurity, data analysis, and business tech — we have a path for you. <a href="courses.html">View full catalog</a>.</p>', 'Courses'],
    ['free-resources', 'Free Resources', 'Free Resources', 'Sleek Nexus Creative Education', '<p style="line-height:1.8;color:#475569;">Access free learning materials, cheat sheets, tutorial videos, and open-access content curated by our instructors. No registration required.</p>', 'Courses'],
    ['certifications', 'Certifications', 'Certifications', 'Sleek Nexus Creative Education', '<p style="line-height:1.8;color:#475569;">Earn industry-recognized certifications upon completing our courses. Our certificates are valued by employers across the region. <a href="courses.html">Browse courses</a>.</p>', 'Courses'],
    ['student-projects', 'Student Projects', 'Student Projects', 'Sleek Nexus Creative Education', '<p style="line-height:1.8;color:#475569;">Showcase of real projects built by our students. These graduates are already solving problems and launching careers. <a href="courses.html">Join them today</a>.</p>', 'Courses'],
    ['blog', 'Blog', 'Blog', 'Sleek Nexus Creative Resources', '<p style="line-height:1.8;color:#475569;">Articles, insights, and perspectives on technology, digital transformation, education, and innovation in South Sudan and beyond. Coming soon.</p>', 'Resources'],
    ['guides', 'Guides', 'Guides', 'Sleek Nexus Creative Resources', '<p style="line-height:1.8;color:#475569;">Step-by-step guides on web development, mobile apps, digital marketing, project management, and more. Written for African practitioners.</p>', 'Resources'],
    ['faqs', 'FAQs', 'Frequently Asked Questions', 'Sleek Nexus Creative Resources', '<p style="line-height:1.8;color:#475569;">Answers to the questions we hear most often about our services, pricing, timelines, and how to work with us. <a href="contact.html">Can\'t find your answer? Ask us directly.</a></p>', 'Resources'],
    ['downloads', 'Downloads', 'Downloads', 'Sleek Nexus Creative Resources', '<p style="line-height:1.8;color:#475569;">Free downloadable templates, brand assets, course syllabi, and project documentation for clients and learners.</p>', 'Resources'],
    ['quote', 'Get a Quote', 'Get a Quote', 'Sleek Nexus Creative Contact', '<p style="line-height:1.8;color:#475569;">Tell us about your project and we\'ll send you a detailed, transparent proposal within 48 hours. No obligations. <a href="contact.html">Fill out our contact form</a> to get started.</p>', 'Contact'],
    ['book-consultation', 'Book a Consultation', 'Book a Consultation', 'Sleek Nexus Creative Contact', '<p style="line-height:1.8;color:#475569;">Schedule a free 30-minute discovery call with one of our specialists. We\'ll listen, answer your questions, and outline how we can help. <a href="contact.html">Contact us to book your slot</a>.</p>', 'Contact'],
    ['internships', 'Internships', 'Internships', 'Join Sleek Nexus Creative', '<p style="line-height:1.8;color:#475569;">Gain real-world experience working on live projects alongside our senior engineers and designers. Internships are available for students and recent graduates. <a href="contact.html">Apply now</a>.</p>', 'Join Us'],
    ['volunteer', 'Volunteer Opportunities', 'Volunteer Opportunities', 'Join Sleek Nexus Creative', '<p style="line-height:1.8;color:#475569;">Contribute your skills to community tech projects, digital literacy programs, and social impact initiatives. Make a difference with your expertise. <a href="contact.html">Express interest</a>.</p>', 'Join Us'],
    ['trainer', 'Become a Trainer', 'Become a Trainer', 'Join Sleek Nexus Creative', '<p style="line-height:1.8;color:#475569;">Are you an expert in your field? Join our training faculty and help shape the next generation of South Sudanese tech professionals. <a href="contact.html">Apply to teach</a>.</p>', 'Join Us'],
    ['mentor', 'Become a Mentor', 'Become a Mentor', 'Join Sleek Nexus Creative', '<p style="line-height:1.8;color:#475569;">Support students and early-career professionals with guidance, career advice, and real-world insights. Our mentors make a lasting difference. <a href="contact.html">Become a mentor</a>.</p>', 'Join Us'],
    ['community', 'Join Our Community', 'Join Our Community', 'Join Sleek Nexus Creative', '<p style="line-height:1.8;color:#475569;">Connect with tech professionals, students, entrepreneurs, and changemakers across South Sudan. Our community is a space to learn, collaborate, and grow together. <a href="contact.html">Get connected</a>.</p>', 'Join Us'],
    ['open-positions', 'Open Positions', 'Open Positions', 'Join Sleek Nexus Creative', '<p style="line-height:1.8;color:#475569;">We are always looking for talented people who share our passion for building technology that matters. View current openings and apply. <a href="careers.html">See all positions</a>.</p>', 'Join Us'],
    ['sponsor-student', 'Sponsor a Student', 'Sponsor a Student', 'Support Sleek Nexus Creative', '<p style="line-height:1.8;color:#475569;">Your sponsorship covers tuition, learning materials, and mentorship for a student who couldn\'t otherwise access tech education. One sponsor changes one life — and often many more. <a href="donors.html">Learn about giving</a>.</p>', 'Donate'],
    ['community-programs', 'Community Programs', 'Community Programs', 'Support Sleek Nexus Creative', '<p style="line-height:1.8;color:#475569;">We run free and subsidized tech programs in underserved communities across South Sudan. Support these programs and help bridge the digital divide. <a href="donors.html">Support our work</a>.</p>', 'Donate'],
];

pages.forEach(([file, title, heading, subtitle, body, activeParent]) => {
    const filePath = path.join(htmlDir, `${file}.html`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, makePage(title, heading, subtitle, body, activeParent), 'utf8');
        console.log(`Created: ${file}.html`);
    } else {
        console.log(`Skipped (exists): ${file}.html`);
    }
});

console.log('Done.');
