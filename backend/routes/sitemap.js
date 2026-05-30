const express = require('express');
const router = express.Router();
const { BlogPost, Project } = require('../../database/models/index');

// Dynamic Sitemap Generation
router.get('/sitemap.xml', async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL || 'https://codebridge.ss';
        const currentDate = new Date().toISOString().split('T')[0];

        // Static pages
        const staticPages = [
            { url: '', changefreq: 'daily', priority: '1.0' },
            { url: '/about.html', changefreq: 'monthly', priority: '0.8' },
            { url: '/services.html', changefreq: 'monthly', priority: '0.9' },
            { url: '/projects.html', changefreq: 'weekly', priority: '0.9' },
            { url: '/blog.html', changefreq: 'daily', priority: '0.8' },
            { url: '/contact.html', changefreq: 'monthly', priority: '0.7' },
            { url: '/careers.html', changefreq: 'weekly', priority: '0.7' }
        ];

        // Get dynamic blog posts
        const blogPosts = await BlogPost.find({ status: 'published' })
            .select('slug updatedAt')
            .sort({ publishedAt: -1 });

        // Get dynamic projects
        const projects = await Project.find()
            .select('slug updatedAt')
            .sort({ createdAt: -1 });

        // Build XML
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add static pages
        staticPages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
            xml += `    <lastmod>${currentDate}</lastmod>\n`;
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += '  </url>\n';
        });

        // Add blog posts
        blogPosts.forEach(post => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
            xml += `    <lastmod>${post.updatedAt.toISOString().split('T')[0]}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.6</priority>\n`;
            xml += '  </url>\n';
        });

        // Add projects
        projects.forEach(project => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/projects/${project.slug}</loc>\n`;
            xml += `    <lastmod>${project.updatedAt.toISOString().split('T')[0]}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.7</priority>\n`;
            xml += '  </url>\n';
        });

        xml += '</urlset>';

        res.header('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        console.error('Sitemap generation error:', error);
        res.status(500).send('Error generating sitemap');
    }
});

module.exports = router;
