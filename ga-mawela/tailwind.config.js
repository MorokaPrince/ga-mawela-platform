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
        // Light theme professional palette - publicservices.international style
        primary: {
          50: '#f0f7fc',
          100: '#e1f0f9',
          200: '#c4e1f3',
          300: '#9ecceb',
          400: '#70b5e1',
          500: '#4a9ed4',
          600: '#2d87c7',
          700: '#256da6',
          800: '#1f5788',
          900: '#19466d',
          950: '#0f2d47',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
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