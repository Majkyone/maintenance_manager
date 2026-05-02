/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      }
    },
    variants: {
      extend: {},
    },
    screens: {
      'desktop': '1440px',
      'laptop': '1024px',
      'tablet': '768px',
      'mobileL': '425px',
      'mobileM': '375px',
      'mobileS': '320px',
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}