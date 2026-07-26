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
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [forms, typography],
}
