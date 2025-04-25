// Spacing system based on 8px grid
export const spacing = {
  // Base spacing units (in pixels)
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  48: '192px',
  56: '224px',
  64: '256px',
  
  // Named spacing
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
  
  // Layout spacing
  gutter: '16px',
  containerPadding: '24px',
  sectionGap: '48px',
  
  // Function to get spacing value
  get: (value: number | string) => {
    if (typeof value === 'number') {
      // Convert to pixels based on 8px grid
      return `${value * 8}px`;
    }
    
    // Return named spacing or the value itself if not found
    return spacing[value as keyof typeof spacing] || value;
  },
};

export default spacing;
