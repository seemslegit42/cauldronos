import { ThemeConfig } from 'antd';
import { theme } from 'antd';
import { tokens } from './tokens';

const { darkAlgorithm, defaultAlgorithm } = theme;

/**
 * CauldronOS Theme Configuration
 * 
 * This file configures the Ant Design theme system using our design tokens.
 * It provides theme configurations for both light and dark modes.
 */

// Shared token overrides (common between light and dark themes)
export const sharedTokens: Partial<ThemeConfig['token']> = {
  fontFamily: tokens.typography.fontFamily.body,
  fontSize: parseInt(tokens.typography.fontSize.base),
  borderRadius: parseInt(tokens.borderRadius.DEFAULT),
  wireframe: false,
  
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: tokens.transitions.easing.out,
  motionEaseInOutCirc: tokens.transitions.easing.inOut,
};

// Dark theme configuration (Cyberpunk)
export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    ...sharedTokens,
    colorPrimary: tokens.colors.fluxAqua.DEFAULT,
    colorInfo: tokens.colors.info,
    colorSuccess: tokens.colors.success,
    colorWarning: tokens.colors.warning,
    colorError: tokens.colors.error,
    colorTextBase: tokens.colors.lightGray[1],
    colorBgBase: tokens.colors.obsidianBlack,
    colorBorder: tokens.colors.darkGray[3],
  },
  components: {
    Button: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
      algorithm: true,
      borderRadius: parseInt(tokens.borderRadius.DEFAULT),
      controlHeight: 40,
      colorPrimaryHover: tokens.colors.fluxAqua.light,
      colorPrimaryActive: tokens.colors.fluxAqua.dark,
    },
    Card: {
      colorBgContainer: tokens.colors.darkGray[1],
      borderRadius: parseInt(tokens.borderRadius.md),
      boxShadowTertiary: tokens.shadows.md,
    },
    Menu: {
      colorItemBg: 'transparent',
      colorItemText: tokens.colors.lightGray[1],
      colorItemTextSelected: tokens.colors.fluxAqua.DEFAULT,
      colorItemBgSelected: tokens.colors.darkGray[2],
      colorItemTextHover: tokens.colors.fluxAqua.light,
      colorItemBgHover: tokens.colors.darkGray[2],
    },
    Table: {
      colorBgContainer: tokens.colors.darkGray[1],
      headerBg: tokens.colors.darkGray[2],
      headerColor: tokens.colors.fluxAqua.DEFAULT,
      borderColor: tokens.colors.darkGray[3],
      rowHoverBg: tokens.colors.darkGray[2],
    },
    Input: {
      colorBgContainer: tokens.colors.darkGray[2],
      colorBorder: tokens.colors.darkGray[3],
      colorText: tokens.colors.lightGray[1],
      activeBorderColor: tokens.colors.fluxAqua.DEFAULT,
      hoverBorderColor: tokens.colors.fluxAqua.light,
    },
    Select: {
      colorBgContainer: tokens.colors.darkGray[2],
      colorBorder: tokens.colors.darkGray[3],
      colorText: tokens.colors.lightGray[1],
      colorTextPlaceholder: 'rgba(230, 230, 232, 0.45)',
      optionSelectedBg: tokens.colors.darkGray[3],
      optionActiveBg: tokens.colors.darkGray[3],
    },
    Modal: {
      contentBg: tokens.colors.darkGray[1],
      headerBg: tokens.colors.darkGray[1],
      titleColor: tokens.colors.lightGray[1],
      borderRadiusOuter: parseInt(tokens.borderRadius.md),
    },
    Tabs: {
      inkBarColor: tokens.colors.fluxAqua.DEFAULT,
      cardGutter: 0,
      itemSelectedColor: tokens.colors.fluxAqua.DEFAULT,
      itemHoverColor: tokens.colors.fluxAqua.light,
    },
    Layout: {
      bodyBg: tokens.colors.obsidianBlack,
      headerBg: tokens.colors.darkGray[1],
      siderBg: tokens.colors.darkGray[1],
    },
    Dropdown: {
      controlItemBgHover: tokens.colors.darkGray[3],
      controlItemBgActive: tokens.colors.darkGray[3],
    },
    Drawer: {
      colorBgElevated: tokens.colors.darkGray[1],
    },
    Message: {
      colorBgElevated: tokens.colors.darkGray[2],
    },
    Notification: {
      colorBgElevated: tokens.colors.darkGray[2],
    },
    Tag: {
      defaultBg: tokens.colors.darkGray[2],
      defaultColor: tokens.colors.lightGray[1],
    },
    Form: {
      labelColor: tokens.colors.lightGray[1],
      colorTextHeading: tokens.colors.lightGray[1],
    },
    Tooltip: {
      colorBgDefault: tokens.colors.darkGray[2],
      colorTextLightSolid: tokens.colors.lightGray[1],
    },
    Popover: {
      colorBgElevated: tokens.colors.darkGray[1],
      colorText: tokens.colors.lightGray[1],
    },
    DatePicker: {
      colorBgContainer: tokens.colors.darkGray[2],
      colorTextDisabled: tokens.colors.darkGray[3],
    },
    TimePicker: {
      colorBgContainer: tokens.colors.darkGray[2],
      colorTextDisabled: tokens.colors.darkGray[3],
    },
    Radio: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
    },
    Checkbox: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
    },
    Switch: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
    },
    Slider: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
      trackBg: tokens.colors.darkGray[3],
    },
    Steps: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
      colorText: tokens.colors.lightGray[1],
      colorTextDescription: tokens.colors.lightGray[2],
    },
    Collapse: {
      contentBg: tokens.colors.darkGray[1],
      headerBg: tokens.colors.darkGray[2],
    },
  },
};

// Light theme configuration (still with cyberpunk accents)
export const lightTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    ...sharedTokens,
    colorPrimary: tokens.colors.fluxAqua.DEFAULT,
    colorInfo: tokens.colors.info,
    colorSuccess: tokens.colors.success,
    colorWarning: tokens.colors.warning,
    colorError: tokens.colors.error,
    colorTextBase: '#202124',
    colorBgBase: '#FFFFFF',
    colorBorder: '#E1E2E6',
  },
  components: {
    Button: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
      algorithm: true,
      borderRadius: parseInt(tokens.borderRadius.DEFAULT),
      controlHeight: 40,
      colorPrimaryHover: tokens.colors.fluxAqua.light,
      colorPrimaryActive: tokens.colors.fluxAqua.dark,
    },
    Card: {
      colorBgContainer: '#FFFFFF',
      borderRadius: parseInt(tokens.borderRadius.md),
      boxShadowTertiary: tokens.shadows.md,
    },
    Menu: {
      colorItemBg: 'transparent',
      colorItemText: '#202124',
      colorItemTextSelected: tokens.colors.fluxAqua.DEFAULT,
      colorItemBgSelected: '#F5F5F7',
      colorItemTextHover: tokens.colors.fluxAqua.light,
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
      activeBorderColor: tokens.colors.fluxAqua.DEFAULT,
      hoverBorderColor: tokens.colors.fluxAqua.light,
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
      borderRadiusOuter: parseInt(tokens.borderRadius.md),
    },
    Tabs: {
      inkBarColor: tokens.colors.fluxAqua.DEFAULT,
      cardGutter: 0,
      itemSelectedColor: tokens.colors.fluxAqua.DEFAULT,
      itemHoverColor: tokens.colors.fluxAqua.light,
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
    Form: {
      labelColor: '#202124',
      colorTextHeading: '#202124',
    },
    Tooltip: {
      colorBgDefault: '#202124',
      colorTextLightSolid: '#FFFFFF',
    },
    Popover: {
      colorBgElevated: '#FFFFFF',
      colorText: '#202124',
    },
    DatePicker: {
      colorBgContainer: '#FFFFFF',
      colorTextDisabled: '#E1E2E6',
    },
    TimePicker: {
      colorBgContainer: '#FFFFFF',
      colorTextDisabled: '#E1E2E6',
    },
    Radio: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
    },
    Checkbox: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
    },
    Switch: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
    },
    Slider: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
      trackBg: '#E1E2E6',
    },
    Steps: {
      colorPrimary: tokens.colors.fluxAqua.DEFAULT,
      colorText: '#202124',
      colorTextDescription: 'rgba(32, 33, 36, 0.65)',
    },
    Collapse: {
      contentBg: '#FFFFFF',
      headerBg: '#F5F5F7',
    },
  },
};

// CSS variables for use outside of Ant Design components
export const getCssVariables = (mode: 'light' | 'dark') => {
  const colors = mode === 'dark' ? {
    // Dark mode variables
    '--color-bg-base': tokens.colors.obsidianBlack,
    '--color-bg-container': tokens.colors.darkGray[1],
    '--color-bg-elevated': tokens.colors.darkGray[2],
    '--color-bg-layout': tokens.colors.obsidianBlack,
    '--color-text-base': tokens.colors.lightGray[1],
    '--color-text-secondary': 'rgba(230, 230, 232, 0.75)',
    '--color-text-tertiary': 'rgba(230, 230, 232, 0.45)',
    '--color-border': tokens.colors.darkGray[3],
    '--color-primary': tokens.colors.fluxAqua.DEFAULT,
    '--color-secondary': tokens.colors.voidPurple.DEFAULT,
    '--color-accent': tokens.colors.purple,
    '--color-success': tokens.colors.success,
    '--color-warning': tokens.colors.warning,
    '--color-error': tokens.colors.error,
    '--color-info': tokens.colors.info,
    '--gradient-primary': tokens.gradients.primary,
    '--gradient-secondary': tokens.gradients.secondary,
    '--shadow-base': tokens.shadows.DEFAULT,
    '--shadow-elevated': tokens.shadows.lg,
    '--glow-primary': tokens.shadows['glow-primary'],
    '--glow-cyan': tokens.shadows['glow-cyan'],
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
    '--color-primary': tokens.colors.fluxAqua.DEFAULT,
    '--color-secondary': tokens.colors.voidPurple.DEFAULT,
    '--color-accent': tokens.colors.purple,
    '--color-success': tokens.colors.success,
    '--color-warning': tokens.colors.warning,
    '--color-error': tokens.colors.error,
    '--color-info': tokens.colors.info,
    '--gradient-primary': tokens.gradients.primary,
    '--gradient-secondary': tokens.gradients.secondary,
    '--shadow-base': tokens.shadows.DEFAULT,
    '--shadow-elevated': tokens.shadows.lg,
    '--glow-primary': tokens.shadows['glow-primary'],
    '--glow-cyan': tokens.shadows['glow-cyan'],
  };

  return {
    ...colors,
    // Typography variables (same for both modes)
    '--font-family-heading': tokens.typography.fontFamily.heading,
    '--font-family-body': tokens.typography.fontFamily.body,
    '--font-family-code': tokens.typography.fontFamily.code,
    '--font-size-xs': tokens.typography.fontSize.xs,
    '--font-size-sm': tokens.typography.fontSize.sm,
    '--font-size-base': tokens.typography.fontSize.base,
    '--font-size-lg': tokens.typography.fontSize.lg,
    '--font-size-xl': tokens.typography.fontSize.xl,
    '--font-size-2xl': tokens.typography.fontSize['2xl'],
    '--font-size-3xl': tokens.typography.fontSize['3xl'],
    '--font-size-4xl': tokens.typography.fontSize['4xl'],
    '--font-size-5xl': tokens.typography.fontSize['5xl'],
    '--font-size-6xl': tokens.typography.fontSize['6xl'],
    '--font-weight-normal': tokens.typography.fontWeight.normal,
    '--font-weight-medium': tokens.typography.fontWeight.medium,
    '--font-weight-semibold': tokens.typography.fontWeight.semibold,
    '--font-weight-bold': tokens.typography.fontWeight.bold,
    '--line-height-none': tokens.typography.lineHeight.none,
    '--line-height-tight': tokens.typography.lineHeight.tight,
    '--line-height-snug': tokens.typography.lineHeight.snug,
    '--line-height-normal': tokens.typography.lineHeight.normal,
    '--line-height-relaxed': tokens.typography.lineHeight.relaxed,
    '--line-height-loose': tokens.typography.lineHeight.loose,
    // Spacing variables
    '--spacing-0': tokens.spacing[0],
    '--spacing-0.5': tokens.spacing[0.5],
    '--spacing-1': tokens.spacing[1],
    '--spacing-2': tokens.spacing[2],
    '--spacing-3': tokens.spacing[3],
    '--spacing-4': tokens.spacing[4],
    '--spacing-5': tokens.spacing[5],
    '--spacing-6': tokens.spacing[6],
    '--spacing-7': tokens.spacing[7],
    '--spacing-8': tokens.spacing[8],
    '--spacing-9': tokens.spacing[9],
    '--spacing-10': tokens.spacing[10],
    '--spacing-12': tokens.spacing[12],
    '--spacing-16': tokens.spacing[16],
    '--spacing-20': tokens.spacing[20],
    '--spacing-24': tokens.spacing[24],
    // Border radius
    '--border-radius-none': tokens.borderRadius.none,
    '--border-radius-sm': tokens.borderRadius.sm,
    '--border-radius-default': tokens.borderRadius.DEFAULT,
    '--border-radius-md': tokens.borderRadius.md,
    '--border-radius-lg': tokens.borderRadius.lg,
    '--border-radius-xl': tokens.borderRadius.xl,
    '--border-radius-2xl': tokens.borderRadius['2xl'],
    '--border-radius-3xl': tokens.borderRadius['3xl'],
    '--border-radius-full': tokens.borderRadius.full,
    // Transitions
    '--transition-duration-75': tokens.transitions.duration[75],
    '--transition-duration-100': tokens.transitions.duration[100],
    '--transition-duration-150': tokens.transitions.duration[150],
    '--transition-duration-200': tokens.transitions.duration[200],
    '--transition-duration-300': tokens.transitions.duration[300],
    '--transition-duration-500': tokens.transitions.duration[500],
    '--transition-duration-700': tokens.transitions.duration[700],
    '--transition-duration-1000': tokens.transitions.duration[1000],
    '--transition-easing-linear': tokens.transitions.easing.linear,
    '--transition-easing-in': tokens.transitions.easing.in,
    '--transition-easing-out': tokens.transitions.easing.out,
    '--transition-easing-in-out': tokens.transitions.easing.inOut,
    '--transition-easing-bounce': tokens.transitions.easing.bounce,
    '--transition-easing-elastic': tokens.transitions.easing.elastic,
  };
};

// Get theme based on mode
export const getTheme = (mode: 'light' | 'dark'): ThemeConfig => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

export default {
  tokens,
  darkTheme,
  lightTheme,
  getTheme,
  getCssVariables,
};