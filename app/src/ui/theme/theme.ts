import { ThemeConfig } from 'antd';
import { theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

// Cyberpunk color palette
export const cyberpunkColors = {
  // Primary colors
  black: '#0D0D0F',
  darkGray: '#121318',
  mediumGray: '#1A1B23',
  lightGray: '#24262F',
  white: '#E6E6E8',
  
  // Accent colors
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
  
  // Gradients
  gradientCyan: 'linear-gradient(90deg, #00F0FF 0%, #0088FF 100%)',
  gradientPurple: 'linear-gradient(90deg, #BD00FF 0%, #FF0099 100%)',
};

// Typography settings
export const typography = {
  fontFamily: "'JetBrains Mono', 'Roboto Mono', monospace",
  fontSize: 14,
  fontSizeHeading1: 32,
  fontSizeHeading2: 24,
  fontSizeHeading3: 20,
  fontSizeHeading4: 16,
  fontSizeHeading5: 14,
  lineHeight: 1.6,
};

// Shared token overrides (common between light and dark themes)
export const sharedTokens: Partial<ThemeConfig['token']> = {
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  borderRadius: 2,
  wireframe: false,
  
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
};

// Dark theme configuration (Cyberpunk)
export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    ...sharedTokens,
    colorPrimary: cyberpunkColors.cyan,
    colorInfo: cyberpunkColors.info,
    colorSuccess: cyberpunkColors.success,
    colorWarning: cyberpunkColors.warning,
    colorError: cyberpunkColors.error,
    colorTextBase: cyberpunkColors.white,
    colorBgBase: cyberpunkColors.black,
    colorBorder: cyberpunkColors.lightGray,
  },
  components: {
    Button: {
      colorPrimary: cyberpunkColors.cyan,
      algorithm: true,
      borderRadius: 2,
      controlHeight: 36,
      colorPrimaryHover: cyberpunkColors.blue,
    },
    Card: {
      colorBgContainer: cyberpunkColors.darkGray,
      borderRadius: 4,
      boxShadowTertiary: '0 4px 12px rgba(0, 240, 255, 0.1)',
    },
    Menu: {
      colorItemBg: 'transparent',
      colorItemText: cyberpunkColors.white,
      colorItemTextSelected: cyberpunkColors.cyan,
      colorItemBgSelected: cyberpunkColors.mediumGray,
      colorItemTextHover: cyberpunkColors.cyan,
      colorItemBgHover: cyberpunkColors.mediumGray,
    },
    Table: {
      colorBgContainer: cyberpunkColors.darkGray,
      headerBg: cyberpunkColors.mediumGray,
      headerColor: cyberpunkColors.cyan,
      borderColor: cyberpunkColors.lightGray,
      rowHoverBg: cyberpunkColors.mediumGray,
    },
    Input: {
      colorBgContainer: cyberpunkColors.mediumGray,
      colorBorder: cyberpunkColors.lightGray,
      colorText: cyberpunkColors.white,
      activeBorderColor: cyberpunkColors.cyan,
    },
    Select: {
      colorBgContainer: cyberpunkColors.mediumGray,
      colorBorder: cyberpunkColors.lightGray,
      colorText: cyberpunkColors.white,
      colorTextPlaceholder: 'rgba(230, 230, 232, 0.45)',
      optionSelectedBg: cyberpunkColors.lightGray,
      optionActiveBg: cyberpunkColors.lightGray,
    },
    Modal: {
      contentBg: cyberpunkColors.darkGray,
      headerBg: cyberpunkColors.darkGray,
      titleColor: cyberpunkColors.white,
      borderRadiusOuter: 4,
    },
    Tabs: {
      inkBarColor: cyberpunkColors.cyan,
      cardGutter: 0,
      itemSelectedColor: cyberpunkColors.cyan,
      itemHoverColor: cyberpunkColors.cyan,
    },
    Layout: {
      bodyBg: cyberpunkColors.black,
      headerBg: cyberpunkColors.darkGray,
      siderBg: cyberpunkColors.darkGray,
    },
    Dropdown: {
      controlItemBgHover: cyberpunkColors.lightGray,
      controlItemBgActive: cyberpunkColors.lightGray,
    },
    Drawer: {
      colorBgElevated: cyberpunkColors.darkGray,
    },
    Message: {
      colorBgElevated: cyberpunkColors.mediumGray,
    },
    Notification: {
      colorBgElevated: cyberpunkColors.mediumGray,
    },
    Tag: {
      defaultBg: cyberpunkColors.mediumGray,
      defaultColor: cyberpunkColors.white,
    },
  },
};

// Light theme configuration (still with cyberpunk accents)
export const lightTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    ...sharedTokens,
    colorPrimary: cyberpunkColors.blue,
    colorInfo: cyberpunkColors.blue,
    colorSuccess: cyberpunkColors.success,
    colorWarning: cyberpunkColors.warning,
    colorError: cyberpunkColors.error,
    colorTextBase: '#202124',
    colorBgBase: '#FFFFFF',
    colorBorder: '#E1E2E6',
  },
  components: {
    Button: {
      colorPrimary: cyberpunkColors.blue,
      algorithm: true,
      borderRadius: 2,
      controlHeight: 36,
      colorPrimaryHover: cyberpunkColors.cyan,
    },
    Card: {
      colorBgContainer: '#FFFFFF',
      borderRadius: 4,
      boxShadowTertiary: '0 4px 12px rgba(0, 136, 255, 0.1)',
    },
    Menu: {
      colorItemBg: 'transparent',
      colorItemText: '#202124',
      colorItemTextSelected: cyberpunkColors.blue,
      colorItemBgSelected: '#F5F5F7',
      colorItemTextHover: cyberpunkColors.blue,
      colorItemBgHover: '#F5F5F7',
    },
    Table: {
      colorBgContainer: '#FFFFFF',
      headerBg: '#F5F5F7',
      headerColor: '#202124',
      borderColor: '#E1E2E6',
      rowHoverBg: '#F5F5F7',
    },
    Input: {
      colorBgContainer: '#FFFFFF',
      colorBorder: '#E1E2E6',
      colorText: '#202124',
      activeBorderColor: cyberpunkColors.blue,
    },
    Select: {
      colorBgContainer: '#FFFFFF',
      colorBorder: '#E1E2E6',
      colorText: '#202124',
      colorTextPlaceholder: 'rgba(32, 33, 36, 0.45)',
      optionSelectedBg: '#F5F5F7',
      optionActiveBg: '#F5F5F7',
    },
    Modal: {
      contentBg: '#FFFFFF',
      headerBg: '#FFFFFF',
      titleColor: '#202124',
      borderRadiusOuter: 4,
    },
    Tabs: {
      inkBarColor: cyberpunkColors.blue,
      cardGutter: 0,
      itemSelectedColor: cyberpunkColors.blue,
      itemHoverColor: cyberpunkColors.blue,
    },
    Layout: {
      bodyBg: '#F5F5F7',
      headerBg: '#FFFFFF',
      siderBg: '#FFFFFF',
    },
    Dropdown: {
      controlItemBgHover: '#F5F5F7',
      controlItemBgActive: '#F5F5F7',
    },
    Drawer: {
      colorBgElevated: '#FFFFFF',
    },
    Message: {
      colorBgElevated: '#FFFFFF',
    },
    Notification: {
      colorBgElevated: '#FFFFFF',
    },
    Tag: {
      defaultBg: '#F5F5F7',
      defaultColor: '#202124',
    },
  },
};

// CSS variables for use outside of Ant Design components
export const getCssVariables = (mode: 'light' | 'dark') => {
  const colors = mode === 'dark' ? {
    // Dark mode variables
    '--color-bg-base': cyberpunkColors.black,
    '--color-bg-container': cyberpunkColors.darkGray,
    '--color-bg-elevated': cyberpunkColors.mediumGray,
    '--color-bg-layout': cyberpunkColors.black,
    '--color-text-base': cyberpunkColors.white,
    '--color-text-secondary': 'rgba(230, 230, 232, 0.75)',
    '--color-text-tertiary': 'rgba(230, 230, 232, 0.45)',
    '--color-border': cyberpunkColors.lightGray,
    '--color-primary': cyberpunkColors.cyan,
    '--color-secondary': cyberpunkColors.blue,
    '--color-accent': cyberpunkColors.purple,
    '--color-success': cyberpunkColors.success,
    '--color-warning': cyberpunkColors.warning,
    '--color-error': cyberpunkColors.error,
    '--color-info': cyberpunkColors.info,
    '--gradient-primary': cyberpunkColors.gradientCyan,
    '--gradient-secondary': cyberpunkColors.gradientPurple,
    '--shadow-base': '0 4px 12px rgba(0, 0, 0, 0.5)',
    '--shadow-elevated': '0 8px 24px rgba(0, 0, 0, 0.7)',
    '--glow-cyan': '0 0 10px rgba(0, 240, 255, 0.5)',
    '--glow-blue': '0 0 10px rgba(0, 136, 255, 0.5)',
  } : {
    // Light mode variables
    '--color-bg-base': '#FFFFFF',
    '--color-bg-container': '#FFFFFF',
    '--color-bg-elevated': '#FFFFFF',
    '--color-bg-layout': '#F5F5F7',
    '--color-text-base': '#202124',
    '--color-text-secondary': 'rgba(32, 33, 36, 0.75)',
    '--color-text-tertiary': 'rgba(32, 33, 36, 0.45)',
    '--color-border': '#E1E2E6',
    '--color-primary': cyberpunkColors.blue,
    '--color-secondary': cyberpunkColors.cyan,
    '--color-accent': cyberpunkColors.purple,
    '--color-success': cyberpunkColors.success,
    '--color-warning': cyberpunkColors.warning,
    '--color-error': cyberpunkColors.error,
    '--color-info': cyberpunkColors.blue,
    '--gradient-primary': cyberpunkColors.gradientCyan,
    '--gradient-secondary': cyberpunkColors.gradientPurple,
    '--shadow-base': '0 4px 12px rgba(0, 0, 0, 0.1)',
    '--shadow-elevated': '0 8px 24px rgba(0, 0, 0, 0.15)',
    '--glow-cyan': '0 0 10px rgba(0, 240, 255, 0.3)',
    '--glow-blue': '0 0 10px rgba(0, 136, 255, 0.3)',
  };

  return {
    ...colors,
    // Typography variables (same for both modes)
    '--font-family': typography.fontFamily,
    '--font-size-base': `${typography.fontSize}px`,
    '--font-size-h1': `${typography.fontSizeHeading1}px`,
    '--font-size-h2': `${typography.fontSizeHeading2}px`,
    '--font-size-h3': `${typography.fontSizeHeading3}px`,
    '--font-size-h4': `${typography.fontSizeHeading4}px`,
    '--font-size-h5': `${typography.fontSizeHeading5}px`,
    '--line-height': `${typography.lineHeight}`,
    '--border-radius-base': '2px',
    '--border-radius-sm': '2px',
    '--border-radius-md': '4px',
    '--border-radius-lg': '6px',
  };
};

// Get theme based on mode
export const getTheme = (mode: 'light' | 'dark'): ThemeConfig => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

export default {
  cyberpunkColors,
  typography,
  darkTheme,
  lightTheme,
  getTheme,
  getCssVariables,
};
