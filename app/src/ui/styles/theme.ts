import { ThemeConfig } from 'antd';
import { theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

// CauldronOS color palette based on brand guidelines
export const colors = {
  // Primary colors
  voidPurple: '#4A0D67', // Deep Purple - primary background color, brand identifier
  voidPurpleLight: '#6A2D87', // Lighter variant - hover states, secondary elements
  voidPurpleDark: '#2A0047', // Darker variant - active states, pressed buttons

  fluxAqua: '#3DAA9D', // Electric Aqua - primary accent color, call-to-actions, links
  fluxAquaLight: '#5DCABD', // Lighter variant - hover states, highlights
  fluxAquaDark: '#1D8A7D', // Darker variant - active states, pressed buttons

  // Accent colors
  alchemyGold: '#B8860B', // Muted Gold - success states, profit indicators
  alchemyGoldLight: '#D8A62B', // Lighter variant - hover states for success elements
  warningAmber: '#FFD166', // Bright amber for warnings - warning messages, caution indicators
  errorRed: '#EF476F', // Vibrant red for errors - error messages, critical alerts

  // Neutral colors - Dark mode
  obsidianBlack: '#0D1117', // Deep blue-black for backgrounds - main background color for dark mode
  darkGray1: '#121212', // Darkest gray for backgrounds - main background in dark mode
  darkGray2: '#1E1E1E', // Slightly lighter gray - card backgrounds, elevated surfaces
  darkGray3: '#2D2D2D', // Medium dark gray - borders, dividers
  lightGray1: '#E0E0E0', // Light gray for text - primary text on dark backgrounds
  lightGray2: '#9E9E9E', // Medium light gray - secondary text, disabled elements
  silver: '#C0C0C0', // Metallic silver - subtle highlights, industrial accents

  // Neutral colors - Light mode
  lightBg: '#F5F5F5',
  lightBgElevated: '#FFFFFF',
  lightBgContainer: '#FAFAFA',
  lightBorder: '#E0E0E0',
  lightText: '#212121',
  lightTextSecondary: '#757575',
};

// Typography settings based on brand guidelines
export const typography = {
  // Font families
  fontFamilyHeading: "'Manrope', sans-serif", // For key headings where we want brand personality
  fontFamilyBody: "'Inter', sans-serif", // Fallback for when we're not using Ant Design's default
  fontFamilyCode: "'JetBrains Mono', monospace", // For code and technical content

  // Font sizes - compatible with Ant Design
  fontSize: 14, // Base font size (Ant Design default)
  fontSizeSmall: 12, // For captions or secondary information
  fontSizeLarge: 16, // For emphasized body text

  // Heading sizes - strategic use of larger sizes
  fontSizeHeading1: 32, // Key section headers
  fontSizeHeading2: 24, // Important subheadings
  fontSizeHeading3: 20, // Standard subheadings
  fontSizeHeading4: 16, // Minor subheadings
  fontSizeHeading5: 14, // Small subheadings

  // Line heights
  lineHeightHeading: 1.2, // Slightly tighter for headings
  lineHeightBody: 1.5, // Standard for body (matches Ant Design)
  lineHeightCode: 1.4, // Good for code readability

  // Letter spacing
  letterSpacingHeading: '-0.02em', // Subtle negative spacing for brand headings
  letterSpacingBody: '0', // Normal for body text

  // Font weights
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,
};

// Shared token overrides (common between light and dark themes)
export const sharedTokens: Partial<ThemeConfig['token']> = {
  fontFamily: typography.fontFamilyBody,
  fontSize: typography.fontSize,
  borderRadius: 4,
  wireframe: false,

  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
};

// Dark theme configuration based on brand guidelines
export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    ...sharedTokens,
    colorPrimary: colors.fluxAqua,
    colorInfo: colors.fluxAqua,
    colorSuccess: colors.alchemyGold,
    colorWarning: colors.warningAmber,
    colorError: colors.errorRed,
    colorTextBase: colors.lightGray1,
    colorBgBase: colors.obsidianBlack,
    colorBorder: colors.darkGray3,
  },
  components: {
    Button: {
      // Primary button states
      colorPrimary: colors.fluxAqua,
      colorPrimaryHover: colors.fluxAquaLight,
      colorPrimaryActive: colors.fluxAquaDark,
      
      // Default button states
      defaultBorderColor: colors.darkGray3,
      defaultColor: colors.lightGray1,
      defaultBg: colors.darkGray2,
      defaultHoverBorderColor: colors.fluxAqua,
      defaultHoverColor: colors.fluxAquaLight,
      
      // Disabled states
      colorBgContainerDisabled: colors.darkGray3,
      colorTextDisabled: colors.lightGray2,
    },
    Card: {
      colorBgContainer: colors.darkGray2,
      colorBorderSecondary: colors.darkGray3,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    Menu: {
      colorItemBg: colors.darkGray2,
      colorItemText: colors.lightGray1,
      colorItemTextSelected: colors.fluxAqua,
      colorItemBgSelected: `${colors.fluxAqua}20`, // 20% opacity
      colorItemTextHover: colors.fluxAquaLight,
      colorActiveBarWidth: 3,
      colorActiveBarBorderSize: 0,
      colorActiveBarHeight: 'calc(100% - 8px)',
    },
    Table: {
      colorBgContainer: colors.darkGray2,
      headerBg: colors.darkGray3,
      headerColor: colors.lightGray1,
      rowHoverBg: `${colors.fluxAqua}10`, // 10% opacity
      borderColor: colors.darkGray3,
      headerBorderRadius: 0,
    },
    Input: {
      colorBgContainer: colors.darkGray2,
      colorBorder: colors.darkGray3,
      colorText: colors.lightGray1,
      activeBorderColor: colors.fluxAqua,
      hoverBorderColor: colors.fluxAquaLight,
      activeShadow: `0 0 0 2px ${colors.fluxAqua}30`,
    },
    Select: {
      colorBgContainer: colors.darkGray2,
      colorBorder: colors.darkGray3,
      colorText: colors.lightGray1,
      colorTextPlaceholder: colors.lightGray2,
      colorPrimaryHover: colors.fluxAquaLight,
      optionSelectedBg: `${colors.fluxAqua}20`,
    },
    Modal: {
      contentBg: colors.darkGray2,
      headerBg: colors.darkGray2,
      titleColor: colors.lightGray1,
      contentPadding: 24,
      headerPadding: '16px 24px',
    },
    Tabs: {
      inkBarColor: colors.fluxAqua,
      cardGutter: 0,
      itemSelectedColor: colors.fluxAqua,
      itemHoverColor: colors.fluxAquaLight,
      itemActiveColor: colors.fluxAqua,
    },
    Tooltip: {
      colorBgDefault: colors.darkGray1,
      colorTextLightSolid: colors.lightGray1,
    },
    Message: {
      colorBgElevated: colors.darkGray2,
      colorText: colors.lightGray1,
    },
    Notification: {
      colorBgElevated: colors.darkGray2,
      colorText: colors.lightGray1,
    },
    Alert: {
      colorInfoBg: `${colors.fluxAqua}10`,
      colorInfoBorder: colors.fluxAqua,
      colorSuccessBg: `${colors.alchemyGold}10`,
      colorSuccessBorder: colors.alchemyGold,
      colorWarningBg: `${colors.warningAmber}10`,
      colorWarningBorder: colors.warningAmber,
      colorErrorBg: `${colors.errorRed}10`,
      colorErrorBorder: colors.errorRed,
    },
    Drawer: {
      colorBgElevated: colors.darkGray2,
      colorText: colors.lightGray1,
    },
  },
};

// Light theme configuration based on brand guidelines
export const lightTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    ...sharedTokens,
    colorPrimary: colors.fluxAqua,
    colorInfo: colors.fluxAqua,
    colorSuccess: colors.alchemyGold,
    colorWarning: colors.warningAmber,
    colorError: colors.errorRed,
    colorTextBase: colors.lightText,
    colorBgBase: colors.lightBg,
    colorBorder: colors.lightBorder,
  },
  components: {
    Button: {
      // Primary button states
      colorPrimary: colors.fluxAqua,
      colorPrimaryHover: colors.fluxAquaLight,
      colorPrimaryActive: colors.fluxAquaDark,
      
      // Default button states
      defaultBorderColor: colors.lightBorder,
      defaultColor: colors.lightText,
      defaultBg: colors.lightBgContainer,
      defaultHoverBorderColor: colors.fluxAqua,
      defaultHoverColor: colors.fluxAqua,
      
      // Disabled states
      colorBgContainerDisabled: colors.lightBorder,
      colorTextDisabled: colors.lightTextSecondary,
    },
    Card: {
      colorBgContainer: colors.lightBgElevated,
      colorBorderSecondary: colors.lightBorder,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    Menu: {
      colorItemBg: colors.lightBgElevated,
      colorItemText: colors.lightText,
      colorItemTextSelected: colors.fluxAqua,
      colorItemBgSelected: `${colors.fluxAqua}10`, // 10% opacity
      colorItemTextHover: colors.fluxAquaLight,
      colorActiveBarWidth: 3,
      colorActiveBarBorderSize: 0,
      colorActiveBarHeight: 'calc(100% - 8px)',
    },
    Table: {
      colorBgContainer: colors.lightBgElevated,
      headerBg: colors.lightBgContainer,
      headerColor: colors.lightText,
      rowHoverBg: `${colors.fluxAqua}10`, // 10% opacity
      borderColor: colors.lightBorder,
      headerBorderRadius: 0,
    },
    Input: {
      colorBgContainer: colors.lightBgContainer,
      colorBorder: colors.lightBorder,
      colorText: colors.lightText,
      activeBorderColor: colors.fluxAqua,
      hoverBorderColor: colors.fluxAquaLight,
      activeShadow: `0 0 0 2px ${colors.fluxAqua}30`,
    },
    Select: {
      colorBgContainer: colors.lightBgContainer,
      colorBorder: colors.lightBorder,
      colorText: colors.lightText,
      colorTextPlaceholder: colors.lightTextSecondary,
      colorPrimaryHover: colors.fluxAquaLight,
      optionSelectedBg: `${colors.fluxAqua}10`,
    },
    Modal: {
      contentBg: colors.lightBgElevated,
      headerBg: colors.lightBgElevated,
      titleColor: colors.lightText,
      contentPadding: 24,
      headerPadding: '16px 24px',
    },
    Tabs: {
      inkBarColor: colors.fluxAqua,
      cardGutter: 0,
      itemSelectedColor: colors.fluxAqua,
      itemHoverColor: colors.fluxAquaLight,
      itemActiveColor: colors.fluxAqua,
    },
    Tooltip: {
      colorBgDefault: colors.lightText,
      colorTextLightSolid: colors.lightBgElevated,
    },
    Message: {
      colorBgElevated: colors.lightBgElevated,
      colorText: colors.lightText,
    },
    Notification: {
      colorBgElevated: colors.lightBgElevated,
      colorText: colors.lightText,
    },
    Alert: {
      colorInfoBg: `${colors.fluxAqua}10`,
      colorInfoBorder: colors.fluxAqua,
      colorSuccessBg: `${colors.alchemyGold}10`,
      colorSuccessBorder: colors.alchemyGold,
      colorWarningBg: `${colors.warningAmber}10`,
      colorWarningBorder: colors.warningAmber,
      colorErrorBg: `${colors.errorRed}10`,
      colorErrorBorder: colors.errorRed,
    },
    Drawer: {
      colorBgElevated: colors.lightBgElevated,
      colorText: colors.lightText,
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
