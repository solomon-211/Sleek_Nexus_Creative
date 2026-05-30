/**
 * Free self-study course catalog
 * GET /api/courses/free — public
 */

'use strict';

const express = require('express');

const router = express.Router();

const FREE_COURSE_CATALOG = {
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

router.get('/free', (_req, res) => {
  res.json({
    success: true,
    data: FREE_COURSE_CATALOG,
  });
});

router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Use /free for the self-study course catalog.',
    freeCatalogEndpoint: '/api/courses/free',
  });
});

module.exports = router;