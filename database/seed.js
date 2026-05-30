/**
 * CodeBridge Bootcamp — Database Seeder
 * Populates initial data including admin user, sample blog posts, and projects
 */

require('dotenv').config({ path: '../backend/.env' });
const mongoose = require('mongoose');
const { User, Project } = require('./models');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codebridge');
    console.log('[OK] Connected to MongoDB');

    // ── ADMIN USER ──────────────────────────────────────────────────
    const existingAdmin = await User.findOne({ email: 'admin@codebridge.ss' });
    if (!existingAdmin) {
      await User.create({
        name: 'CodeBridge Admin',
        email: 'admin@codebridge.ss',
        password: 'SleekAdmin2024!', // Change immediately after first login
        role: 'admin',
      });
      console.log('[OK] Admin user created: admin@codebridge.ss / SleekAdmin2024!');
    }

    // ── PROJECTS ─────────────────────────────────────────────────────
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: 'Juba Youth Tech Hub Website',
          description: 'Full-stack web platform for South Sudan\'s first youth technology hub, including course enrollment and community features.',
          category: 'web',
          technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
          client: 'Youth Tech Hub Juba',
          status: 'completed',
          featured: true,
          impact: {
            beneficiaries: 500,
            description: 'Enabled digital access to training opportunities for youth.'
          }
        },
        {
          title: 'NGO Operations Management System',
          description: 'Custom web application for tracking beneficiaries, projects, and impact reporting for humanitarian organizations.',
          category: 'consulting',
          technologies: ['Node.js', 'MongoDB', 'Chart.js'],
          client: 'International NGO',
          status: 'completed',
          featured: true,
          impact: {
            beneficiaries: 12000,
            description: 'Automated reporting and beneficiary tracking for large programs.'
          }
        },
        {
          title: 'Mobile Banking App',
          description: 'Bank-grade secure platform delivering seamless financial services to underserved communities.',
          category: 'mobile',
          technologies: ['React Native', 'Node.js', 'MongoDB', 'Encryption'],
          client: 'Local Bank',
          status: 'completed',
          featured: true,
        },
      ]);
      console.log('[OK] Sample projects created');
    }

    console.log('\n[INFO] Database seeded successfully!');
    console.log('─────────────────────────────────');
    console.log('Admin login: admin@codebridge.ss');
    console.log('Password:    SleekAdmin2024!');
    console.log('[WARNING]  Change the admin password immediately after first login!');
    process.exit(0);
  } catch (error) {
    console.error('[ERROR] Seeding error:', error);
    process.exit(1);
  }
};

seed();
