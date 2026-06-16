/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      maxWidth: {
        container: '1400px',
      },
      colors: {
        primary: '#c41e3a',
        'primary-dark': '#a01830',
        accent: '#ff8c42',
        'accent-dark': '#e67a2e',
        dark: '#0f172a',
        'dark-soft': '#1e293b',
        muted: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
