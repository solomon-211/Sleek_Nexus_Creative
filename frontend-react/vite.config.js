import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { generateIcons } from './scripts/generate-icons.mjs'

// Keeps src/icons.generated.css in step with the `fa-*` classes used in the
// source — see scripts/generate-icons.mjs for what it produces and why.
function iconSubset() {
  return {
    name: 'snc-icon-subset',
    buildStart() {
      generateIcons()
    },
    configureServer(server) {
      const regenerate = (file) => {
        if (!/[\\/]src[\\/].*\.jsx?$/.test(file)) return
        try {
          generateIcons()
        } catch (err) {
          // A half-typed icon name mid-edit shouldn't kill the dev server.
          server.config.logger.warn(err.message)
        }
      }
      server.watcher.on('change', regenerate)
      server.watcher.on('add', regenerate)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    iconSubset(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon-32.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Sleek Nexus Creative',
        short_name: 'SNC',
        description: 'Technology, innovation, and leadership organisation in Juba, South Sudan.',
        start_url: '/',
        display: 'standalone',
        background_color: '#233D4D',
        theme_color: '#FE7F2D',
        // Built by scripts/generate-app-icons.mjs from the logo.
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // HTML is deliberately excluded: scripts/generate-seo-html.mjs rewrites
        // dist/index.html and creates 12 more per-route index.html files (in
        // subdirectories) *after* `vite build` finishes, so this plugin's
        // precache manifest — built during `vite build` — would either miss
        // those files entirely or capture them pre-SEO-rewrite. Precaching
        // JS/CSS/images/fonts is fully safe since those are complete and
        // correctly content-hashed by the time `vite build` finishes; HTML
        // navigation just falls through to a normal network fetch, same as
        // before this plugin was added.
        // Deliberately just JS/CSS — the app shell. Favicon/icons are covered
        // separately via includeAssets above. Content photography in
        // public/images/ is intentionally NOT precached: those files are
        // hundreds of KB each, and eagerly force-downloading all of them for
        // every visitor (including mobile, on the slow connections this site
        // is built for) on first load would be far worse than just letting
        // normal HTTP caching handle images as they're actually viewed.
        globPatterns: ['**/*.{js,css}'],
        // Also excludes three-vendor: the desktop-only, lazy-loaded three.js
        // bundle (see Hero3DAccent / GlobeAccent) shouldn't be eagerly
        // precached either — that would download ~880kB for every visitor,
        // including mobile users who should never fetch it at all.
        globIgnores: ['**/three-vendor-*.js'],
      },
    }),
  ],
  build: {
    // three-vendor alone exceeds the default 500kB warning limit — expected and
    // fine, since it's isolated precisely so it's only ever fetched by desktop
    // viewports rendering the 3D hero/globe accents (see manualChunks below).
    chunkSizeWarningLimit: 900,
    // Split large, rarely-changing dependencies into their own long-cached
    // chunks so an app code change doesn't bust the whole vendor bundle.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
          if (id.includes('framer-motion')) return 'motion-vendor'
          if (/(react-hook-form|@hookform|zod)/.test(id)) return 'form-vendor'
          // Only fetched if a form has to fall back to browser-side email
          // (see sendLead in src/lib/api.js) — keep it out of 'vendor', which
          // every page loads.
          if (id.includes('@emailjs')) return 'email-vendor'
          // Isolated from the generic 'vendor' bucket on purpose: three.js is only
          // ever reached via Hero3DAccent's dynamic import(), and 'vendor' also
          // carries eagerly-loaded deps (react-helmet-async, etc.) used on every
          // page — sharing a chunk with those would force every page to fetch
          // three.js too, defeating the lazy-load entirely.
          if (/[\\/]node_modules[\\/](three|@react-three)[\\/]/.test(id)) return 'three-vendor'
          return 'vendor'
        },
      },
    },
  },
})
