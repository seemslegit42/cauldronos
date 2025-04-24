import { cyberpunkColors } from '../theme/theme';

// Re-export colors from theme
export const colors = {
  ...cyberpunkColors,
  
  // Brand colors (CauldronOS)
  voidPurple: '#2D1B47', // Deep, twilight-like purple
  fluxAqua: '#00F0FF',   // Vibrant but clear aqua (same as cyan)
  growthGreen: '#00FF66', // Fresh and insightful green (same as success)
  
  // Additional utility colors
  transparent: 'transparent',
  current: 'currentColor',
  
  // Color manipulation utilities
  alpha: (color: string, alpha: number) => {
    // Simple alpha function for hex colors
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    // For named colors or other formats, use CSS variables
    return `color-mix(in srgb, ${color}, transparent ${(1 - alpha) * 100}%)`;
  },
  
  // Gradient generators
  gradient: (from: string, to: string, direction = '90deg') => {
    return `linear-gradient(${direction}, ${from} 0%, ${to} 100%)`;
  },
};

export default colors;
