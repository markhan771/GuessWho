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
        brand: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F5F5F0',
          tertiary: '#EBEBEB',
        }
      },
      keyframes: {
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
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
          '50%':  { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        'delta': {
          '0%':   { opacity: '1', transform: 'translateY(0)' },
          '80%':  { opacity: '1', transform: 'translateY(-16px)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
        'confetti-drop': {
          '0%':   { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        'bounce-in': {
          '0%':   { transform: 'scale(0.3)', opacity: '0' },
          '50%':  { transform: 'scale(1.05)' },
          '70%':  { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'slide-up':      'slide-up 0.3s ease both',
        'shake':         'shake 0.4s ease',
        'pop':           'pop 0.25s ease',
        'delta':         'delta 1.2s ease forwards',
        'confetti-drop': 'confetti-drop 2.5s ease-in forwards',
        'bounce-in':     'bounce-in 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
      },
    },
  },
  plugins: [],
}
