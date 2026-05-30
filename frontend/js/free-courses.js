(() => {
  const API_BASE = window.CONFIG?.API_URL || 'http://localhost:5000/api';

  const FALLBACK_CATALOG = {
    source: 'Curated open-access self-study resources',
    updatedAt: '2026-05-19T00:00:00.000Z',
    categories: [
      {
        key: 'web-development',
        label: 'Web & Software Development',
        icon: 'code',
        intro: 'Build strong frontend and full-stack foundations with open learning paths.',
        courses: [
          {
            slug: 'responsive-web-design',
            title: 'Responsive Web Design',
            provider: 'freeCodeCamp',
            providerUrl: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
            accessUrl: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
            level: 'Beginner',
            format: 'Self-paced curriculum',
            duration: '30-40 hours',
            certificate: 'Free certificate available',
            description: 'Learn HTML, CSS, accessibility, and modern responsive layouts through project-based lessons.',
            highlights: ['Semantic HTML', 'Flexbox and Grid', 'Accessibility basics', 'Portfolio projects'],
          },
          {
            slug: 'javascript-algorithms',
            title: 'JavaScript Algorithms and Data Structures',
            provider: 'freeCodeCamp',
            providerUrl: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/',
            accessUrl: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/',
            level: 'Beginner to Intermediate',
            format: 'Self-paced curriculum',
            duration: '40-60 hours',
            certificate: 'Free certificate available',
            description: 'Practice modern JavaScript by solving interactive challenges and building practical applications.',
            highlights: ['ES6+ JavaScript', 'Data structures', 'Algorithm thinking', 'Functional and object-oriented patterns'],
          },
          {
            slug: 'odin-project-foundations',
            title: 'The Odin Project Foundations',
            provider: 'The Odin Project',
            providerUrl: 'https://www.theodinproject.com/paths/foundations/courses/foundations',
            accessUrl: 'https://www.theodinproject.com/paths/foundations/courses/foundations',
            level: 'Beginner',
            format: 'Project-based self-study',
            duration: 'Open ended',
            certificate: 'No formal certificate',
            description: 'A free, structured path for learning web development fundamentals with hands-on exercises.',
            highlights: ['Git and GitHub', 'Command line basics', 'HTML and CSS', 'Problem solving'],
          },
        ],
      },
      {
        key: 'computer-science',
        label: 'Computer Science Foundations',
        icon: 'graduation-cap',
        intro: 'Use widely respected open courses to understand core computing concepts.',
        courses: [
          {
            slug: 'harvard-cs50x',
            title: 'CS50x: Introduction to Computer Science',
            provider: 'Harvard University',
            providerUrl: 'https://cs50.harvard.edu/x/',
            accessUrl: 'https://cs50.harvard.edu/x/',
            level: 'Beginner to Intermediate',
            format: 'Video lectures and problem sets',
            duration: '12 weeks',
            certificate: 'Free access to all course materials',
            description: 'A rigorous introduction to computer science with Python, C, algorithms, and web development basics.',
            highlights: ['Algorithms and complexity', 'Python programming', 'Memory and C basics', 'Problem sets and labs'],
          },
          {
            slug: 'mit-python',
            title: 'Introduction to Computer Science and Programming in Python',
            provider: 'MIT OpenCourseWare',
            providerUrl: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2022/',
            accessUrl: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2022/',
            level: 'Beginner',
            format: 'Lecture notes and exercises',
            duration: 'Open course schedule',
            certificate: 'Open course materials only',
            description: 'Learn programming fundamentals and computational thinking from MIT’s open courseware.',
            highlights: ['Python basics', 'Problem decomposition', 'Testing', 'Computational models'],
          },
        ],
      },
      {
        key: 'data-ai',
        label: 'Data & AI',
        icon: 'chart-line',
        intro: 'Self-paced paths for Python, data analysis, and machine learning basics.',
        courses: [
          {
            slug: 'kaggle-python',
            title: 'Kaggle Learn: Python',
            provider: 'Kaggle',
            providerUrl: 'https://www.kaggle.com/learn/python',
            accessUrl: 'https://www.kaggle.com/learn/python',
            level: 'Beginner',
            format: 'Interactive micro-lessons',
            duration: '5-8 hours',
            certificate: 'Completion badge',
            description: 'A fast, practical introduction to Python through short lessons and exercises.',
            highlights: ['Variables and loops', 'Functions', 'Data structures', 'Hands-on notebooks'],
          },
          {
            slug: 'kaggle-ml',
            title: 'Kaggle Learn: Intro to Machine Learning',
            provider: 'Kaggle',
            providerUrl: 'https://www.kaggle.com/learn/intro-to-machine-learning',
            accessUrl: 'https://www.kaggle.com/learn/intro-to-machine-learning',
            level: 'Intermediate',
            format: 'Interactive micro-lessons',
            duration: '6-10 hours',
            certificate: 'Completion badge',
            description: 'Learn the foundations of machine learning with guided notebooks and practical datasets.',
            highlights: ['Model training', 'Validation', 'Random forests', 'Feature engineering'],
          },
        ],
      },
      {
        key: 'mobile-development',
        label: 'Mobile Development',
        icon: 'mobile-alt',
        intro: 'Free resources to start building Android apps and mobile-friendly products.',
        courses: [
          {
            slug: 'android-basics-compose',
            title: 'Android Basics with Compose',
            provider: 'Android Developers',
            providerUrl: 'https://developer.android.com/courses/pathways/android-basics-compose',
            accessUrl: 'https://developer.android.com/courses/pathways/android-basics-compose',
            level: 'Beginner',
            format: 'Guided learning path',
            duration: '15-20 hours',
            certificate: 'Free learning path',
            description: 'Learn the essentials of Android app development using Jetpack Compose.',
            highlights: ['Kotlin basics', 'UI with Compose', 'State and navigation', 'App architecture'],
          },
        ],
      },
      {
        key: 'cybersecurity',
        label: 'Cybersecurity & Digital Safety',
        icon: 'shield-alt',
        intro: 'Open-access learning for security awareness and defensive thinking.',
        courses: [
          {
            slug: 'openlearn-cyber-security',
            title: 'Introduction to Cyber Security',
            provider: 'OpenLearn',
            providerUrl: 'https://www.open.edu/openlearn/science-maths-technology/introduction-cyber-security/content-section-0',
            accessUrl: 'https://www.open.edu/openlearn/science-maths-technology/introduction-cyber-security/content-section-0',
            level: 'Beginner',
            format: 'Self-paced course',
            duration: '8-12 hours',
            certificate: 'Free access to course material',
            description: 'Build a foundation in digital safety, risk awareness, and cybersecurity basics.',
            highlights: ['Threat awareness', 'Safe passwords', 'Privacy basics', 'Security habits'],
          },
        ],
      },
    ],
  };

  const CATEGORY_META = {
    'web-development': { className: 'web-development', label: 'Web & Software Development', icon: 'code' },
    'computer-science': { className: 'computer-science', label: 'Computer Science Foundations', icon: 'graduation-cap' },
    'data-ai': { className: 'data-ai', label: 'Data & AI', icon: 'chart-line' },
    'mobile-development': { className: 'mobile-development', label: 'Mobile Development', icon: 'mobile-alt' },
    cybersecurity: { className: 'cybersecurity', label: 'Cybersecurity & Digital Safety', icon: 'shield-alt' },
  };

  const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const resolveCourseData = (payload) => {
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.data?.courses)) return payload.data.courses;
    if (Array.isArray(payload?.courses)) return payload.courses;
    return null;
  };

  const buildCatalogShell = () => {
    let root = document.getElementById('free-courses-root');
    if (root) return root;

    root = document.createElement('div');
    root.id = 'free-courses-root';

    // Insert before the CTA section so footer stays at the bottom
    const cta = document.querySelector('section.cta');
    if (cta?.parentNode) {
      cta.parentNode.insertBefore(root, cta);
    } else {
      const footer = document.querySelector('footer.footer');
      if (footer?.parentNode) {
        footer.parentNode.insertBefore(root, footer);
      } else {
        document.body.appendChild(root);
      }
    }

    return root;
  };

  const updateHeroCopy = () => {
    const title = document.querySelector('.page-header h1');
    const tagline = document.querySelector('.page-header .tagline');
    const description = document.querySelector('.page-header .header-description');

    if (title) title.textContent = 'Free Self-Study Courses';
    if (tagline) tagline.textContent = '"Learn at your own pace with open resources"';
    if (description) {
      description.textContent = 'These resources are free to access, self-paced, and designed for independent study. No instructor-led teaching is required to get started.';
    }
  };

  const renderCourseCard = (course) => `
    <div class="course-card free-course-card">
      <div class="course-header">
        <div class="course-meta-badges">
          <span class="course-badge free">Free</span>
          <span class="course-badge">${escapeHtml(course.duration)}</span>
        </div>
        <div class="course-rating">
          <i class="fas fa-folder-open"></i> ${escapeHtml(course.format)}
        </div>
      </div>
      <h3>${escapeHtml(course.title)}</h3>
      <p class="course-desc">${escapeHtml(course.description)}</p>

      <div class="course-details">
        <div class="detail-item">
          <i class="fas fa-building"></i>
          <span>Provider: ${escapeHtml(course.provider)}</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-signal"></i>
          <span>${escapeHtml(course.level)}</span>
        </div>
        <div class="detail-item">
          <i class="fas fa-certificate"></i>
          <span>${escapeHtml(course.certificate)}</span>
        </div>
      </div>

      <div class="curriculum-preview">
        <h4>What You'll Learn:</h4>
        <ul class="course-features">
          ${course.highlights.map((item) => `<li><i class="fas fa-check"></i> ${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>

      <div class="course-footer">
        <span class="course-level"><i class="fas fa-user-graduate"></i> Self-paced study</span>
        <a href="${escapeHtml(course.accessUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-small">
          Start Learning
        </a>
      </div>
    </div>
  `;

  const renderCategorySection = (category) => {
    const meta = CATEGORY_META[category.key] || {};
    return `
      <section class="courses-section ${meta.className || ''}">
        <div class="container">
          <div class="category-header">
            <i class="fas fa-${meta.icon || 'book-open'} category-icon"></i>
            <div>
              <h2>${escapeHtml(meta.label || category.label)}</h2>
              <p class="free-study-intro">${escapeHtml(category.intro || '')}</p>
            </div>
          </div>
          <div class="courses-grid">
            ${category.courses.map(renderCourseCard).join('')}
          </div>
        </div>
      </section>
    `;
  };

  const renderCatalog = (catalog) => {
    const root = buildCatalogShell();
    const updatedLabel = catalog.updatedAt ? new Date(catalog.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently updated';

    document.querySelectorAll('.courses-section').forEach((section) => section.remove());

    root.innerHTML = `
      <section class="courses-section alt-bg free-study-hero">
        <div class="container">
          <div class="category-header">
            <i class="fas fa-book-open category-icon"></i>
            <div>
              <h2>Open Access Learning Catalog</h2>
              <p class="free-study-intro">All resources below are free to study, self-paced, and curated for independent learners.</p>
            </div>
          </div>

          <div class="free-study-banner">
            <div>
              <span class="free-study-pill">${escapeHtml(catalog.source || 'Open access resources')}</span>
              <h3>Learn without instructor-led teaching</h3>
              <p>Pick a track, follow the resource link, and study at your own pace. We keep the catalog focused on open resources that do not require one-to-one teaching.</p>
            </div>
            <div class="free-study-meta">
              <strong>Updated</strong>
              <span>${escapeHtml(updatedLabel)}</span>
            </div>
          </div>
        </div>
      </section>
      ${catalog.categories.map(renderCategorySection).join('')}
    `;
  };

  const fetchCatalog = async () => {
    try {
      const response = await fetch(`${API_BASE}/courses/free`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const payload = await response.json();
      if (payload?.data?.categories) {
        return payload.data;
      }

      const courses = resolveCourseData(payload);

      if (!courses || courses.length === 0) {
        return FALLBACK_CATALOG;
      }

      const grouped = Object.values(CATEGORY_META).map((meta) => ({
        key: meta.className,
        label: meta.label,
        icon: meta.icon,
        intro: '',
        courses: courses.filter((course) => course.category === meta.className),
      })).filter((category) => category.courses.length > 0);

      return grouped.length > 0 ? {
        source: payload?.data?.source || 'Live course catalog',
        updatedAt: payload?.data?.updatedAt || new Date().toISOString(),
        categories: grouped,
      } : FALLBACK_CATALOG;
    } catch (error) {
      console.warn('Free course catalog fallback used:', error.message);
      return FALLBACK_CATALOG;
    }
  };

  document.addEventListener('DOMContentLoaded', async () => {
    updateHeroCopy();

    const root = buildCatalogShell();
    root.innerHTML = `
      <section class="courses-section alt-bg">
        <div class="container">
          <div class="category-header">
            <i class="fas fa-spinner category-icon"></i>
            <div>
              <h2>Loading free learning catalog...</h2>
              <p class="free-study-intro">Fetching open-access study resources.</p>
            </div>
          </div>
        </div>
      </section>
    `;

    const catalog = await fetchCatalog();
    renderCatalog(catalog);
  });
})();