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
        primary: '#C3110C',
        'primary-dark': '#740A03',
        accent: '#E6501B',
        'accent-dark': '#A83A12',
        dark: '#280905',
        'dark-soft': '#4A1710',
        muted: '#7C6F6C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [forms, typography],
}
