/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      /* ── Brand palette ── */
      colors: {
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted:   '#f8fafc',
          subtle:  '#f1f5f9',
          dark:    '#0f172a',
        },
        /* Semantic tokens */
        text: {
          primary:   '#0f172a',
          secondary: '#475569',
          muted:     '#94a3b8',
          inverse:   '#f8fafc',
        },
        border: {
          DEFAULT: '#e2e8f0',
          strong:  '#cbd5e1',
          subtle:  '#f1f5f9',
        },
      },

      /* ── Typography ── */
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem,   6vw, 5rem)',   { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.02em' }],
        'display-xl':  ['clamp(2.5rem, 5vw, 4rem)',   { lineHeight: '1.08', fontWeight: '800', letterSpacing: '-0.02em' }],
        'display-lg':  ['clamp(2rem,   4vw, 3rem)',   { lineHeight: '1.12', fontWeight: '700', letterSpacing: '-0.015em' }],
        'display-md':  ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2',  fontWeight: '700', letterSpacing: '-0.01em' }],
        'display-sm':  ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
      },

      /* ── Spacing ── */
      spacing: {
        section:    '5rem',
        'section-lg': '7rem',
        18: '4.5rem',
        22: '5.5rem',
      },

      /* ── Border radius ── */
      borderRadius: {
        '4xl': '2.5rem',
      },

      /* ── Shadows ── */
      boxShadow: {
        'xs':         '0 1px 2px 0 rgb(0 0 0 / .05)',
        'card':       '0 1px 3px 0 rgb(0 0 0 / .07), 0 1px 2px -1px rgb(0 0 0 / .07)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .08)',
        'card-lg':    '0 20px 40px -10px rgb(0 0 0 / .12)',
        'glow':       '0 0 40px -10px rgb(2 132 199 / .45)',
        'glow-lg':    '0 0 60px -15px rgb(2 132 199 / .5)',
        'inner-sm':   'inset 0 1px 2px 0 rgb(0 0 0 / .05)',
      },

      /* ── Animations ── */
      animation: {
        'fade-up':      'fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':      'fadeIn 0.4s ease-out both',
        'fade-down':    'fadeDown 0.4s ease-out both',
        'slide-down':   'slideDown 0.28s cubic-bezier(0.16,1,0.3,1)',
        'slide-up':     'slideUp 0.28s cubic-bezier(0.16,1,0.3,1)',
        'scale-in':     'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
        'spin-slow':    'spin 3s linear infinite',
        'pulse-slow':   'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'shimmer':      'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeDown: {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      /* ── Transitions ── */
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        400: '400ms',
      },

      /* ── Backdrop blur ── */
      backdropBlur: {
        xs: '2px',
      },

      /* ── Z-index scale ── */
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },
  plugins: [],
}
