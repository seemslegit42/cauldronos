import { theme } from 'antd';
const { darkAlgorithm, defaultAlgorithm } = theme;

/**
 * CauldronOS Design System Tokens
 * 
 * This file defines the core design tokens for the CauldronOS UI system.
 * It serves as a single source of truth for colors, typography, spacing,
 * and other design variables.
 */

// Color Palette
export const colors = {
  // Primary colors
  voidPurple: {
    DEFAULT: '#4A0D67', // Deep Purple - primary background color, brand identifier
    light: '#6A2D87', // Lighter variant - hover states, secondary elements
    dark: '#2A0047', // Darker variant - active states, pressed buttons
  },
  fluxAqua: {
    DEFAULT: '#3DAA9D', // Electric Aqua - primary accent color, call-to-actions, links
    light: '#5DCABD', // Lighter variant - hover states, highlights
    dark: '#1D8A7D', // Darker variant - active states, pressed buttons
  },
  // Accent colors
  alchemyGold: {
    DEFAULT: '#B8860B', // Muted Gold - success states, profit indicators
    light: '#D8A62B', // Lighter variant - hover states for success elements
  },
  warningAmber: '#FFD166', // Bright amber for warnings
  errorRed: '#EF476F', // Vibrant red for errors
  
  // Neutral colors - Dark mode
  obsidianBlack: '#0D1117', // Deep blue-black for backgrounds
  darkGray: {
    1: '#121212', // Darkest gray for backgrounds
    2: '#1E1E1E', // Slightly lighter gray
    3: '#2D2D2D', // Medium dark gray
  },
  lightGray: {
    1: '#E0E0E0', // Light gray for text
    2: '#9E9E9E', // Medium light gray
  },
  silver: '#C0C0C0', // Metallic silver
  
  // Cyberpunk colors
  cyan: '#00F0FF',       // Electric cyan - primary accent
  blue: '#0088FF',       // Electric blue - secondary accent
  purple: '#BD00FF',     // Neon purple
  pink: '#FF0099',       // Hot pink
  yellow: '#FFD700',     // Cyber yellow
  
  // Functional colors
  success: '#00FF66',    // Neon green
  warning: '#FFBB00',    // Amber
  error: '#FF0033',      // Bright red
  info: '#00F0FF',       // Same as cyan
};

// Typography
export const typography = {
  fontFamily: {
    heading: "'Manrope', sans-serif",
    body: "'Inter', sans-serif",
    code: "'JetBrains Mono', monospace",
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '36px',
    '6xl': '48px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Spacing
export const spacing = {
  // Based on 8px grid system
  0: '0',
  0.5: '4px',
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',
  7: '56px',
  8: '64px',
  9: '72px',
  10: '80px',
  12: '96px',
  16: '128px',
  20: '160px',
  24: '192px',
};

// Breakpoints
export const breakpoints = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  // Cyberpunk glow shadows
  'glow-primary': '0 0 10px rgba(61, 170, 157, 0.5)',
  'glow-success': '0 0 10px rgba(184, 134, 11, 0.5)',
  'glow-warning': '0 0 10px rgba(255, 209, 102, 0.5)',
  'glow-error': '0 0 10px rgba(239, 71, 111, 0.5)',
  'glow-cyan': '0 0 15px rgba(0, 240, 255, 0.6)',
  'glow-purple': '0 0 15px rgba(189, 0, 255, 0.6)',
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: '2px',
  DEFAULT: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
};

// Z-index
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto',
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Transitions
export const transitions = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom easings
    bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// Animation presets
export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  slideInUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  slideInDown: {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  slideInLeft: {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  slideInRight: {
    from: { opacity: 0, transform: 'translateX(20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  scaleIn: {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  scaleOut: {
    from: { opacity: 1, transform: 'scale(1)' },
    to: { opacity: 0, transform: 'scale(0.95)' },
  },
  glitch: {
    '0%': { transform: 'translate(0)' },
    '20%': { transform: 'translate(-2px, 2px)' },
    '40%': { transform: 'translate(-2px, -2px)' },
    '60%': { transform: 'translate(2px, 2px)' },
    '80%': { transform: 'translate(2px, -2px)' },
    '100%': { transform: 'translate(0)' },
  },
};

// Gradients
export const gradients = {
  primary: 'linear-gradient(135deg, #4A0D67 0%, #3DAA9D 100%)',
  secondary: 'linear-gradient(135deg, #BD00FF 0%, #FF0099 100%)',
  accent: 'linear-gradient(135deg, #00F0FF 0%, #0088FF 100%)',
  dark: 'linear-gradient(135deg, #0D1117 0%, #1E1E1E 100%)',
  circuit: `
    radial-gradient(circle at 25px 25px, #3DAA9D 2px, transparent 0),
    linear-gradient(to right, rgba(61, 170, 157, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(61, 170, 157, 0.1) 1px, transparent 1px)
  `,
  grid: `
    linear-gradient(rgba(61, 170, 157, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 170, 157, 0.05) 1px, transparent 1px)
  `,
};

// Export all tokens
export const tokens = {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  borderRadius,
  zIndex,
  transitions,
  animations,
  gradients,
};

export default tokens;