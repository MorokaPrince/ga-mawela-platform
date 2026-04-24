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
        // Dark theme for Ga-Mawela Land Intelligence System
        primary: {
          50: '#faf5ed',
          100: '#f5e9d4',
          200: '#e8d0a6',
          300: '#d4b876',
          400: '#c9a646',
          500: '#b8943a',
          600: '#a07c28',
          700: '#7a5c1a',
          800: '#5c4112',
          900: '#3e2f1c',
          950: '#2a1f0e',
        },
        accent: {
          50: '#fefaf0',
          100: '#fdf2d4',
          200: '#fbe8a6',
          300: '#f8d876',
          400: '#f5c846',
          500: '#e8b832',
          600: '#cc9620',
          700: '#996b11',
          800: '#6b450a',
          900: '#4a2e06',
          950: '#361f04',
        },
        earth: {
          50: '#fdfaf6',
          100: '#f9f0e6',
          200: '#efe4d0',
          300: '#e0ceb4',
          400: '#c9b090',
          500: '#b09270',
          600: '#8c6e52',
          700: '#634f37',
          800: '#4a3a28',
          900: '#3e2f1c',
          950: '#2a1f0e',
        },
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
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif']
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(14,58,54,0.08)',
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 32px rgba(0,0,0,0.12)',
      },
      borderRadius: { 
        xl: '18px',
        '2xl': '24px',
      },
      animation: {
        'fade-pulse': 'fadePulse 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}