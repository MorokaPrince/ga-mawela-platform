/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gm: {
          50: '#f4fbfb',
          100: '#e2f7f6',
          200: '#bfeceb',
          300: '#8fe0dd',
          400: '#5ccdcf',
          500: '#2bb9c1',
          600: '#27a9ae',
          700: '#1f867c',
          800: '#166055',
          900: '#0e3a36'
        },
        accent: {
          50: '#fff8f2',
          100: '#fff1e6',
          200: '#ffd9b8',
          400: '#ffb66b',
          600: '#ff9f34'
        },
        neutral: {
          50: '#fbfcfd', 100:'#f5f7f8', 200:'#e6eaec', 300:'#cfd8db', 400:'#aebfc3', 600:'#6f7e82', 900:'#1b2224'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'serif']
      },
      boxShadow: {
        soft: '0 8px 30px rgba(14,58,54,0.08)'
      },
      borderRadius: { xl: '18px' },
      animation: {
        'fade-pulse': 'fadePulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}