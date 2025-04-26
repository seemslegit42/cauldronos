/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './layouts/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'void-purple': {
          DEFAULT: '#4A0D67', // Deep Purple - primary background color, brand identifier
          light: '#6A2D87', // Lighter variant - hover states, secondary elements
          dark: '#2A0047', // Darker variant - active states, pressed buttons
        },
        'flux-aqua': {
          DEFAULT: '#3DAA9D', // Electric Aqua - primary accent color, call-to-actions, links
          light: '#5DCABD', // Lighter variant - hover states, highlights
          dark: '#1D8A7D', // Darker variant - active states, pressed buttons
        },
        // Accent colors
        'alchemy-gold': {
          DEFAULT: '#B8860B', // Muted Gold - success states, profit indicators
          light: '#D8A62B', // Lighter variant - hover states for success elements
        },
        'warning-amber': '#FFD166', // Bright amber for warnings - warning messages, caution indicators
        'error-red': '#EF476F', // Vibrant red for errors - error messages, critical alerts
        
        // Neutral colors - Dark mode
        'obsidian-black': '#0D1117', // Deep blue-black for backgrounds - main background color for dark mode
        'dark-gray': {
          1: '#121212', // Darkest gray for backgrounds - main background in dark mode
          2: '#1E1E1E', // Slightly lighter gray - card backgrounds, elevated surfaces
          3: '#2D2D2D', // Medium dark gray - borders, dividers
        },
        'light-gray': {
          1: '#E0E0E0', // Light gray for text - primary text on dark backgrounds
          2: '#9E9E9E', // Medium light gray - secondary text, disabled elements
        },
        'silver': '#C0C0C0', // Metallic silver - subtle highlights, industrial accents
      },
      fontFamily: {
        'heading': ['Manrope', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'code': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        '5xl': '36px',
        '6xl': '48px',
      },
      boxShadow: {
        'glow-primary': '0 0 10px rgba(61, 170, 157, 0.5)',
        'glow-success': '0 0 10px rgba(184, 134, 11, 0.5)',
        'glow-warning': '0 0 10px rgba(255, 209, 102, 0.5)',
        'glow-error': '0 0 10px rgba(239, 71, 111, 0.5)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4A0D67 0%, #3DAA9D 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0D1117 0%, #1E1E1E 100%)',
        'circuit-pattern': `
          radial-gradient(circle at 25px 25px, #3DAA9D 2px, transparent 0),
          linear-gradient(to right, rgba(61, 170, 157, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(61, 170, 157, 0.1) 1px, transparent 1px)
        `,
        'grid-pattern': `
          linear-gradient(rgba(61, 170, 157, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(61, 170, 157, 0.05) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'circuit': '50px 50px, 25px 25px, 25px 25px',
        'grid': '20px 20px',
      },
      animation: {
        'glitch': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
      spacing: {
        // Based on 8px grid system
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
      },
    },
  },
  plugins: [],
}

