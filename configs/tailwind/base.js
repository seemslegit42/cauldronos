const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Corporate Cyberpunk color palette
        primary: {
          DEFAULT: '#0066CC',
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066CC',
          600: '#0052A3',
          700: '#003D7A',
          800: '#002952',
          900: '#001429',
        },
        secondary: {
          DEFAULT: '#6600CC',
          50: '#F0E6FF',
          100: '#E0CCFF',
          200: '#C299FF',
          300: '#A366FF',
          400: '#8533FF',
          500: '#6600CC',
          600: '#5200A3',
          700: '#3D007A',
          800: '#290052',
          900: '#140029',
        },
        accent: {
          DEFAULT: '#00CCCC',
          50: '#E6FFFF',
          100: '#CCFFFF',
          200: '#99FFFF',
          300: '#66FFFF',
          400: '#33FFFF',
          500: '#00CCCC',
          600: '#00A3A3',
          700: '#007A7A',
          800: '#005252',
          900: '#002929',
        },
        dark: {
          DEFAULT: '#121212',
          50: '#F2F2F2',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#121212',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'cyberpunk': '0 0 10px rgba(0, 204, 204, 0.5)',
        'cyberpunk-lg': '0 0 20px rgba(0, 204, 204, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};