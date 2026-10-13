import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      maxWidth: {
        container: '1400px',
      },
      gridAutoRows: {
        'bento': '220px',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease forwards',
      },
      colors: {
        // Brand palette — #FE7F2D orange, #233D4D navy, #000000 black, #EAECF0 grey
        primary:      '#FE7F2D',        // orange — CTAs, highlights, icons
        'primary-dark': '#233D4D',      // navy — hover states, dark CTAs
        accent:       '#FE7F2D',        // alias kept for backwards compat
        'accent-dark': '#233D4D',
        dark:         '#233D4D',        // navy — the "dark" tone
        'dark-soft':  '#233D4D',        // used on body text, nav, footers
        'near-black': '#000000',        // use sparingly — only truly dark elements
        muted:        'rgba(35,61,77,0.65)',  // navy at reduced opacity for body text
        surface:      '#EAECF0',        // grey — card backgrounds, section fills
        light:        '#EAECF0',        // alias
        // Neutrals. Tailwind's stock grays are a cool blue-gray unrelated to
        // the brand; these are tints of the brand navy instead, anchored on
        // the brand grey (100 = #EAECF0) and ending at the navy itself (800).
        // Every existing gray-* utility — section fills, borders, muted text —
        // now sits inside the palette without touching any markup.
        gray: {
          50:  '#F5F6F8',
          100: '#EAECF0',
          200: '#DDE1E6',
          300: '#C5CCD2',
          400: '#9CA8AF',
          500: '#70818B',
          600: '#4F6471',
          700: '#39505F',
          800: '#233D4D',
          900: '#1A2E3A',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'sans-serif'],
        heading: ['Inter Variable', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [forms, typography],
}
