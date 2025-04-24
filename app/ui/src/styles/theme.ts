import { ThemeConfig } from 'antd';
import { theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

// Corporate cyberpunk color palette
export const colors = {
  // Primary colors
  primaryBlue: '#00b0ff', // Electric blue
  primaryCyan: '#00e5ff', // Electric cyan
  primaryPurple: '#d500f9', // Neon purple
  
  // Accent colors
  accentGreen: '#00e676', // Neon green
  accentYellow: '#ffea00', // Bright yellow
  accentRed: '#ff1744', // Bright red
  
  // Neutral colors - Dark mode
  darkBg: '#121212',
  darkBgElevated: '#1e1e1e',
  darkBgContainer: '#2d2d2d',
  darkBorder: '#333333',
  darkText: '#e0e0e0',
  darkTextSecondary: '#9e9e9e',
  
  // Neutral colors - Light mode
  lightBg: '#f5f5f5',
  lightBgElevated: '#ffffff',
  lightBgContainer: '#fafafa',
  lightBorder: '#e0e0e0',
  lightText: '#212121',
  lightTextSecondary: '#757575',
};

// Typography settings
export const typography = {
  fontFamily: "'Roboto Mono', monospace",
  fontSize: 14,
  fontSizeHeading1: 28,
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
  borderRadius: 4,
  wireframe: false,
  
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
};

// Dark theme configuration
export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    ...sharedTokens,
    colorPrimary: colors.primaryBlue,
    colorInfo: colors.primaryBlue,
    colorSuccess: colors.accentGreen,
    colorWarning: colors.accentYellow,
    colorError: colors.accentRed,
    colorTextBase: colors.darkText,
    colorBgBase: colors.darkBg,
    colorBorder: colors.darkBorder,
  },
  components: {
    Button: {
      colorPrimaryHover: colors.primaryCyan,
      defaultBorderColor: colors.darkBorder,
      defaultColor: colors.darkText,
      defaultBg: colors.darkBgContainer,
    },
    Card: {
      colorBgContainer: colors.darkBgElevated,
      colorBorderSecondary: colors.darkBorder,
    },
    Menu: {
      colorItemBg: colors.darkBgElevated,
      colorItemText: colors.darkText,
      colorItemTextSelected: colors.primaryBlue,
      colorItemBgSelected: `${colors.primaryBlue}20`, // 20% opacity
      colorItemTextHover: colors.primaryCyan,
    },
    Table: {
      colorBgContainer: colors.darkBgElevated,
      headerBg: colors.darkBgContainer,
      headerColor: colors.darkText,
      rowHoverBg: `${colors.primaryBlue}10`, // 10% opacity
    },
    Input: {
      colorBgContainer: colors.darkBgContainer,
      colorBorder: colors.darkBorder,
      colorText: colors.darkText,
    },
    Select: {
      colorBgContainer: colors.darkBgContainer,
      colorBorder: colors.darkBorder,
      colorText: colors.darkText,
      colorTextPlaceholder: colors.darkTextSecondary,
    },
    Modal: {
      contentBg: colors.darkBgElevated,
      headerBg: colors.darkBgElevated,
      titleColor: colors.darkText,
    },
    Tabs: {
      inkBarColor: colors.primaryBlue,
      cardGutter: 0,
    },
  },
};

// Light theme configuration
export const lightTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    ...sharedTokens,
    colorPrimary: colors.primaryBlue,
    colorInfo: colors.primaryBlue,
    colorSuccess: colors.accentGreen,
    colorWarning: colors.accentYellow,
    colorError: colors.accentRed,
    colorTextBase: colors.lightText,
    colorBgBase: colors.lightBg,
    colorBorder: colors.lightBorder,
  },
  components: {
    Button: {
      colorPrimaryHover: colors.primaryCyan,
      defaultBorderColor: colors.lightBorder,
      defaultColor: colors.lightText,
      defaultBg: colors.lightBgContainer,
    },
    Card: {
      colorBgContainer: colors.lightBgElevated,
      colorBorderSecondary: colors.lightBorder,
    },
    Menu: {
      colorItemBg: colors.lightBgElevated,
      colorItemText: colors.lightText,
      colorItemTextSelected: colors.primaryBlue,
      colorItemBgSelected: `${colors.primaryBlue}10`, // 10% opacity
      colorItemTextHover: colors.primaryCyan,
    },
    Table: {
      colorBgContainer: colors.lightBgElevated,
      headerBg: colors.lightBgContainer,
      headerColor: colors.lightText,
      rowHoverBg: `${colors.primaryBlue}10`, // 10% opacity
    },
    Input: {
      colorBgContainer: colors.lightBgContainer,
      colorBorder: colors.lightBorder,
      colorText: colors.lightText,
    },
    Select: {
      colorBgContainer: colors.lightBgContainer,
      colorBorder: colors.lightBorder,
      colorText: colors.lightText,
      colorTextPlaceholder: colors.lightTextSecondary,
    },
    Modal: {
      contentBg: colors.lightBgElevated,
      headerBg: colors.lightBgElevated,
      titleColor: colors.lightText,
    },
    Tabs: {
      inkBarColor: colors.primaryBlue,
      cardGutter: 0,
    },
  },
};

// Get theme based on mode
export const getTheme = (mode: 'light' | 'dark'): ThemeConfig => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

export default {
  colors,
  typography,
  darkTheme,
  lightTheme,
  getTheme,
};
