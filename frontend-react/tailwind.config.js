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
        primary: '#FE7F2D',
        'primary-dark': '#C66323',
        accent: '#FE9957',
        'accent-dark': '#CB7A46',
        dark: '#000000',
        'dark-soft': '#233D4D',
        muted: '#6E737A',
        surface: '#EAECF0',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
        // Tall, condensed display face — used sparingly for monumental headlines.
        tall: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [forms, typography],
}
