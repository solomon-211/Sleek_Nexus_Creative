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
        // Brand palette — #FF9E20 orange primary, #215E61 teal dark, #1D2128 near-black, #F4F2F2 off-white
        primary:      '#FF9E20',        // warm orange — CTAs, highlights, icons
        'primary-dark': '#215E61',      // deep teal — hover states, dark CTAs
        accent:       '#FF9E20',        // alias kept for backwards compat
        'accent-dark': '#215E61',
        dark:         '#215E61',        // teal replaces near-black as the "dark" tone
        'dark-soft':  '#215E61',        // used on body text, nav, footers
        'near-black': '#1D2128',        // use sparingly — only truly dark elements
        muted:        'rgba(33,94,97,0.65)',  // teal at reduced opacity for body text
        surface:      '#F4F2F2',        // off-white — card backgrounds, section fills
        light:        '#F4F2F2',        // alias
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [forms, typography],
}
