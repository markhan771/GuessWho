/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        pitch: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
      },
      keyframes: {
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shake': {
          '0%,100%': { transform: 'translateX(0)' },
          '20%':     { transform: 'translateX(-6px)' },
          '40%':     { transform: 'translateX(6px)' },
          '60%':     { transform: 'translateX(-4px)' },
          '80%':     { transform: 'translateX(4px)' },
        },
        'pop': {
          '0%':   { transform: 'scale(1)' },
          '50%':  { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        'delta': {
          '0%':   { opacity: '1', transform: 'translateY(0)' },
          '80%':  { opacity: '1', transform: 'translateY(-14px)' },
          '100%': { opacity: '0', transform: 'translateY(-18px)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease both',
        'shake':    'shake 0.4s ease',
        'pop':      'pop 0.25s ease',
        'delta':    'delta 1.2s ease forwards',
      },
    },
  },
  plugins: [],
}
