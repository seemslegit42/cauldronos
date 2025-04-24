/**
 * Cyberpunk Theme Tokens
 * 
 * This file defines the core design tokens for the cyberpunk theme.
 * These tokens are used throughout the UI system to maintain consistency.
 */

// Cyberpunk color palette
export const cyberpunkColors = {
  // Primary colors
  primary: {
    base: '#00F0FF', // Neon cyan - primary brand color
    light: '#7CFFFF',
    dark: '#00B8D4',
    contrast: '#000000',
  },
  
  // Secondary colors
  secondary: {
    base: '#FF00A0', // Neon magenta - secondary brand color
    light: '#FF5ED0',
    dark: '#C10078',
    contrast: '#FFFFFF',
  },
  
  // Accent colors
  accent: {
    yellow: '#FFD600', // Neon yellow
    green: '#00FF66', // Neon green
    purple: '#9D00FF', // Neon purple
    orange: '#FF6D00', // Neon orange
  },
  
  // Background colors
  background: {
    darkest: '#0D0D0F', // Nearly black
    darker: '#121218', // Very dark gray with blue tint
    dark: '#1A1A24', // Dark gray with blue tint
    medium: '#2A2A35', // Medium dark gray
    light: '#3D3D4E', // Light gray with blue tint
    card: '#1E1E2A', // Card background
    elevated: '#252532', // Elevated surface
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF', // White
    secondary: 'rgba(255, 255, 255, 0.85)', // Slightly transparent white
    tertiary: 'rgba(255, 255, 255, 0.65)', // More transparent white
    disabled: 'rgba(255, 255, 255, 0.45)', // Very transparent white
    inverse: '#000000', // Black text for light backgrounds
  },
  
  // Border colors
  border: {
    light: 'rgba(255, 255, 255, 0.12)', // Subtle border
    medium: 'rgba(255, 255, 255, 0.2)', // Medium border
    strong: 'rgba(255, 255, 255, 0.3)', // Strong border
    glow: '#00F0FF', // Glowing border (same as primary)
  },
  
  // Status colors
  status: {
    success: '#00FF66', // Neon green
    warning: '#FFD600', // Neon yellow
    error: '#FF2D55', // Neon red
    info: '#00F0FF', // Neon cyan (same as primary)
  },
  
  // Special effects
  effects: {
    glow: {
      primary: '#00F0FF80', // Semi-transparent primary for glow
      secondary: '#FF00A080', // Semi-transparent secondary for glow
      success: '#00FF6680', // Semi-transparent success for glow
      error: '#FF2D5580', // Semi-transparent error for glow
    },
    scanline: 'rgba(0, 240, 255, 0.1)', // Very subtle cyan for scanline effect
    noise: 'rgba(255, 255, 255, 0.03)', // Very subtle white for noise texture
  },
};

// Light mode variant (still cyberpunk but lighter)
export const cyberpunkLightColors = {
  // Primary colors (same as dark mode)
  primary: cyberpunkColors.primary,
  
  // Secondary colors (same as dark mode)
  secondary: cyberpunkColors.secondary,
  
  // Accent colors (same as dark mode)
  accent: cyberpunkColors.accent,
  
  // Background colors (inverted from dark mode)
  background: {
    darkest: '#FFFFFF', // White
    darker: '#F5F5FF', // Very light blue-white
    dark: '#EEEEF7', // Light blue-white
    medium: '#E0E0E9', // Medium light blue-white
    light: '#D0D0D9', // Darker light blue-white
    card: '#F0F0F7', // Card background
    elevated: '#FFFFFF', // Elevated surface
  },
  
  // Text colors (inverted from dark mode)
  text: {
    primary: '#121218', // Very dark gray with blue tint
    secondary: 'rgba(18, 18, 24, 0.85)', // Slightly transparent dark
    tertiary: 'rgba(18, 18, 24, 0.65)', // More transparent dark
    disabled: 'rgba(18, 18, 24, 0.45)', // Very transparent dark
    inverse: '#FFFFFF', // White text for dark backgrounds
  },
  
  // Border colors
  border: {
    light: 'rgba(18, 18, 24, 0.12)', // Subtle border
    medium: 'rgba(18, 18, 24, 0.2)', // Medium border
    strong: 'rgba(18, 18, 24, 0.3)', // Strong border
    glow: '#00F0FF', // Glowing border (same as primary)
  },
  
  // Status colors (same as dark mode)
  status: cyberpunkColors.status,
  
  // Special effects
  effects: {
    glow: cyberpunkColors.effects.glow,
    scanline: 'rgba(0, 240, 255, 0.05)', // Very subtle cyan for scanline effect
    noise: 'rgba(18, 18, 24, 0.03)', // Very subtle dark for noise texture
  },
};

// Typography
export const typography = {
  fontFamily: {
    base: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    mono: "'Roboto Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    display: "'Rajdhani', 'Roboto', sans-serif", // Futuristic display font
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    md: '1.125rem',    // 18px
    lg: '1.25rem',     // 20px
    xl: '1.5rem',      // 24px
    '2xl': '1.875rem', // 30px
    '3xl': '2.25rem',  // 36px
    '4xl': '3rem',     // 48px
    '5xl': '4rem',     // 64px
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
  '0': '0',
  '1': '0.25rem',      // 4px
  '2': '0.5rem',       // 8px
  '3': '0.75rem',      // 12px
  '4': '1rem',         // 16px
  '5': '1.25rem',      // 20px
  '6': '1.5rem',       // 24px
  '8': '2rem',         // 32px
  '10': '2.5rem',      // 40px
  '12': '3rem',        // 48px
  '16': '4rem',        // 64px
  '20': '5rem',        // 80px
  '24': '6rem',        // 96px
  '32': '8rem',        // 128px
  '40': '10rem',       // 160px
  '48': '12rem',       // 192px
  '56': '14rem',       // 224px
  '64': '16rem',       // 256px
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',      // 2px
  default: '0.25rem',  // 4px
  md: '0.375rem',      // 6px
  lg: '0.5rem',        // 8px
  xl: '0.75rem',       // 12px
  '2xl': '1rem',       // 16px
  '3xl': '1.5rem',     // 24px
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(0, 240, 255, 0.5)',
  glow: {
    primary: '0 0 15px rgba(0, 240, 255, 0.7)',
    secondary: '0 0 15px rgba(255, 0, 160, 0.7)',
    success: '0 0 15px rgba(0, 255, 102, 0.7)',
    error: '0 0 15px rgba(255, 45, 85, 0.7)',
  },
  none: 'none',
};

// Z-index
export const zIndex = {
  '0': 0,
  '10': 10,
  '20': 20,
  '30': 30,
  '40': 40,
  '50': 50,
  auto: 'auto',
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  drawer: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
};

// Transitions
export const transitions = {
  duration: {
    fastest: '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },
  timing: {
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    acceleration: 'cubic-bezier(0.4, 0, 1, 1)',
    deceleration: 'cubic-bezier(0, 0, 0.2, 1)',
  },
};

// Breakpoints
export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

// Export all tokens
export const tokens = {
  colors: cyberpunkColors,
  lightColors: cyberpunkLightColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  transitions,
  breakpoints,
};

export default tokens;
