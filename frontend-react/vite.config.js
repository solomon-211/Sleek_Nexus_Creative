import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split large, rarely-changing dependencies into their own long-cached
    // chunks so an app code change doesn't bust the whole vendor bundle.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
          if (id.includes('framer-motion')) return 'motion-vendor'
          if (/(react-hook-form|@hookform|zod)/.test(id)) return 'form-vendor'
          if (/(@tanstack|axios)/.test(id)) return 'data-vendor'
          return 'vendor'
        },
      },
    },
  },
})
