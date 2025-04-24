/**
 * Ant Design Theme Configuration for Cyberpunk Theme
 * 
 * This file configures Ant Design's theme tokens to match our cyberpunk aesthetic.
 */

import type { ThemeConfig } from 'antd';
import { tokens, cyberpunkColors, cyberpunkLightColors } from './tokens';

/**
 * Generate Ant Design theme tokens for dark mode
 */
export const darkThemeTokens = {
  // Colors
  colorPrimary: cyberpunkColors.primary.base,
  colorSuccess: cyberpunkColors.status.success,
  colorWarning: cyberpunkColors.status.warning,
  colorError: cyberpunkColors.status.error,
  colorInfo: cyberpunkColors.status.info,
  
  // Text colors
  colorText: cyberpunkColors.text.primary,
  colorTextSecondary: cyberpunkColors.text.secondary,
  colorTextTertiary: cyberpunkColors.text.tertiary,
  colorTextQuaternary: cyberpunkColors.text.disabled,
  
  // Background colors
  colorBgBase: cyberpunkColors.background.darkest,
  colorBgContainer: cyberpunkColors.background.dark,
  colorBgElevated: cyberpunkColors.background.elevated,
  colorBgLayout: cyberpunkColors.background.darker,
  colorBgSpotlight: cyberpunkColors.background.medium,
  
  // Border colors
  colorBorder: cyberpunkColors.border.medium,
  colorBorderSecondary: cyberpunkColors.border.light,
  
  // Font
  fontFamily: tokens.typography.fontFamily.base,
  fontFamilyCode: tokens.typography.fontFamily.mono,
  
  // Border radius
  borderRadius: parseInt(tokens.borderRadius.default.replace('rem', '')) * 16,
  borderRadiusLG: parseInt(tokens.borderRadius.lg.replace('rem', '')) * 16,
  borderRadiusSM: parseInt(tokens.borderRadius.sm.replace('rem', '')) * 16,
  
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  
  // Control height
  controlHeight: 36,
  
  // Animation
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: tokens.transitions.timing.easeOut,
  motionEaseInOutCirc: tokens.transitions.timing.easeInOut,
  motionEaseOut: tokens.transitions.timing.easeOut,
  motionEaseInOut: tokens.transitions.timing.easeInOut,
  motionEaseInBack: tokens.transitions.timing.easeIn,
  motionEaseOutBack: tokens.transitions.timing.easeOut,
  
  // Line height
  lineHeight: tokens.typography.lineHeight.normal,
  lineHeightLG: tokens.typography.lineHeight.relaxed,
  lineHeightSM: tokens.typography.lineHeight.snug,
  
  // Wireframe mode (disabled for cyberpunk theme)
  wireframe: false,
};

/**
 * Generate Ant Design theme tokens for light mode
 */
export const lightThemeTokens = {
  // Colors
  colorPrimary: cyberpunkLightColors.primary.base,
  colorSuccess: cyberpunkLightColors.status.success,
  colorWarning: cyberpunkLightColors.status.warning,
  colorError: cyberpunkLightColors.status.error,
  colorInfo: cyberpunkLightColors.status.info,
  
  // Text colors
  colorText: cyberpunkLightColors.text.primary,
  colorTextSecondary: cyberpunkLightColors.text.secondary,
  colorTextTertiary: cyberpunkLightColors.text.tertiary,
  colorTextQuaternary: cyberpunkLightColors.text.disabled,
  
  // Background colors
  colorBgBase: cyberpunkLightColors.background.darkest,
  colorBgContainer: cyberpunkLightColors.background.dark,
  colorBgElevated: cyberpunkLightColors.background.elevated,
  colorBgLayout: cyberpunkLightColors.background.darker,
  colorBgSpotlight: cyberpunkLightColors.background.medium,
  
  // Border colors
  colorBorder: cyberpunkLightColors.border.medium,
  colorBorderSecondary: cyberpunkLightColors.border.light,
  
  // Font
  fontFamily: tokens.typography.fontFamily.base,
  fontFamilyCode: tokens.typography.fontFamily.mono,
  
  // Border radius
  borderRadius: parseInt(tokens.borderRadius.default.replace('rem', '')) * 16,
  borderRadiusLG: parseInt(tokens.borderRadius.lg.replace('rem', '')) * 16,
  borderRadiusSM: parseInt(tokens.borderRadius.sm.replace('rem', '')) * 16,
  
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  
  // Control height
  controlHeight: 36,
  
  // Animation
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: tokens.transitions.timing.easeOut,
  motionEaseInOutCirc: tokens.transitions.timing.easeInOut,
  motionEaseOut: tokens.transitions.timing.easeOut,
  motionEaseInOut: tokens.transitions.timing.easeInOut,
  motionEaseInBack: tokens.transitions.timing.easeIn,
  motionEaseOutBack: tokens.transitions.timing.easeOut,
  
  // Line height
  lineHeight: tokens.typography.lineHeight.normal,
  lineHeightLG: tokens.typography.lineHeight.relaxed,
  lineHeightSM: tokens.typography.lineHeight.snug,
  
  // Wireframe mode (disabled for cyberpunk theme)
  wireframe: false,
};

/**
 * Component-specific token overrides for dark mode
 */
export const darkComponentTokens = {
  Button: {
    colorPrimaryHover: cyberpunkColors.primary.light,
    colorPrimaryActive: cyberpunkColors.primary.dark,
    algorithm: true, // Enable algorithm
    borderRadius: parseInt(tokens.borderRadius.default.replace('rem', '')) * 16,
    controlOutline: `0 0 0 2px ${cyberpunkColors.effects.glow.primary}`,
    colorBgContainer: 'transparent',
    colorBorder: cyberpunkColors.border.medium,
  },
  Card: {
    colorBgContainer: cyberpunkColors.background.card,
    borderRadius: parseInt(tokens.borderRadius.lg.replace('rem', '')) * 16,
    boxShadowTertiary: tokens.shadows.md,
    colorBorderSecondary: cyberpunkColors.border.light,
  },
  Menu: {
    colorItemBg: 'transparent',
    colorItemText: cyberpunkColors.text.secondary,
    colorItemTextSelected: cyberpunkColors.primary.base,
    colorItemBgSelected: `${cyberpunkColors.primary.base}10`, // 10% opacity
    colorItemTextHover: cyberpunkColors.primary.light,
    colorItemBgHover: `${cyberpunkColors.primary.base}10`, // 10% opacity
    colorActiveBarWidth: 3,
    colorActiveBarHeight: 0, // Use border-left instead of border-bottom
    colorActiveBarBorderSize: 0,
  },
  Input: {
    colorBgContainer: cyberpunkColors.background.medium,
    colorBorder: cyberpunkColors.border.medium,
    activeBorderColor: cyberpunkColors.primary.base,
    hoverBorderColor: cyberpunkColors.primary.light,
    activeShadow: `0 0 0 2px ${cyberpunkColors.effects.glow.primary}`,
  },
  Select: {
    colorBgContainer: cyberpunkColors.background.medium,
    colorBorder: cyberpunkColors.border.medium,
    colorPrimaryHover: cyberpunkColors.primary.light,
    colorTextPlaceholder: cyberpunkColors.text.disabled,
    controlItemBgActive: `${cyberpunkColors.primary.base}20`, // 20% opacity
    controlItemBgHover: `${cyberpunkColors.primary.base}10`, // 10% opacity
  },
  Table: {
    colorBgContainer: cyberpunkColors.background.card,
    headerBg: cyberpunkColors.background.medium,
    headerColor: cyberpunkColors.text.secondary,
    headerSortActiveBg: cyberpunkColors.background.elevated,
    rowHoverBg: `${cyberpunkColors.primary.base}10`, // 10% opacity
    borderColor: cyberpunkColors.border.light,
  },
  Tabs: {
    inkBarColor: cyberpunkColors.primary.base,
    itemSelectedColor: cyberpunkColors.primary.base,
    itemHoverColor: cyberpunkColors.primary.light,
    itemActiveColor: cyberpunkColors.primary.base,
  },
  Modal: {
    contentBg: cyberpunkColors.background.card,
    headerBg: cyberpunkColors.background.card,
    titleColor: cyberpunkColors.text.primary,
    titleFontSize: parseInt(tokens.typography.fontSize.lg.replace('rem', '')) * 16,
    borderRadiusLG: parseInt(tokens.borderRadius.lg.replace('rem', '')) * 16,
  },
  Drawer: {
    colorBgElevated: cyberpunkColors.background.card,
    colorText: cyberpunkColors.text.primary,
  },
  Message: {
    colorBgElevated: cyberpunkColors.background.elevated,
    colorText: cyberpunkColors.text.primary,
    colorSuccess: cyberpunkColors.status.success,
    colorError: cyberpunkColors.status.error,
    colorWarning: cyberpunkColors.status.warning,
    colorInfo: cyberpunkColors.status.info,
  },
  Notification: {
    colorBgElevated: cyberpunkColors.background.elevated,
    colorText: cyberpunkColors.text.primary,
    colorSuccess: cyberpunkColors.status.success,
    colorError: cyberpunkColors.status.error,
    colorWarning: cyberpunkColors.status.warning,
    colorInfo: cyberpunkColors.status.info,
  },
  Tooltip: {
    colorBgDefault: cyberpunkColors.background.elevated,
    colorTextLightSolid: cyberpunkColors.text.primary,
  },
  Popover: {
    colorBgElevated: cyberpunkColors.background.elevated,
    colorText: cyberpunkColors.text.primary,
  },
  Form: {
    labelColor: cyberpunkColors.text.secondary,
    colorError: cyberpunkColors.status.error,
    colorWarning: cyberpunkColors.status.warning,
    colorSuccess: cyberpunkColors.status.success,
  },
};

/**
 * Component-specific token overrides for light mode
 */
export const lightComponentTokens = {
  Button: {
    colorPrimaryHover: cyberpunkLightColors.primary.light,
    colorPrimaryActive: cyberpunkLightColors.primary.dark,
    algorithm: true, // Enable algorithm
    borderRadius: parseInt(tokens.borderRadius.default.replace('rem', '')) * 16,
    controlOutline: `0 0 0 2px ${cyberpunkLightColors.effects.glow.primary}`,
    colorBgContainer: 'transparent',
    colorBorder: cyberpunkLightColors.border.medium,
  },
  Card: {
    colorBgContainer: cyberpunkLightColors.background.card,
    borderRadius: parseInt(tokens.borderRadius.lg.replace('rem', '')) * 16,
    boxShadowTertiary: tokens.shadows.md,
    colorBorderSecondary: cyberpunkLightColors.border.light,
  },
  Menu: {
    colorItemBg: 'transparent',
    colorItemText: cyberpunkLightColors.text.secondary,
    colorItemTextSelected: cyberpunkLightColors.primary.base,
    colorItemBgSelected: `${cyberpunkLightColors.primary.base}10`, // 10% opacity
    colorItemTextHover: cyberpunkLightColors.primary.light,
    colorItemBgHover: `${cyberpunkLightColors.primary.base}10`, // 10% opacity
    colorActiveBarWidth: 3,
    colorActiveBarHeight: 0, // Use border-left instead of border-bottom
    colorActiveBarBorderSize: 0,
  },
  Input: {
    colorBgContainer: cyberpunkLightColors.background.medium,
    colorBorder: cyberpunkLightColors.border.medium,
    activeBorderColor: cyberpunkLightColors.primary.base,
    hoverBorderColor: cyberpunkLightColors.primary.light,
    activeShadow: `0 0 0 2px ${cyberpunkLightColors.effects.glow.primary}`,
  },
  Select: {
    colorBgContainer: cyberpunkLightColors.background.medium,
    colorBorder: cyberpunkLightColors.border.medium,
    colorPrimaryHover: cyberpunkLightColors.primary.light,
    colorTextPlaceholder: cyberpunkLightColors.text.disabled,
    controlItemBgActive: `${cyberpunkLightColors.primary.base}20`, // 20% opacity
    controlItemBgHover: `${cyberpunkLightColors.primary.base}10`, // 10% opacity
  },
  Table: {
    colorBgContainer: cyberpunkLightColors.background.card,
    headerBg: cyberpunkLightColors.background.medium,
    headerColor: cyberpunkLightColors.text.secondary,
    headerSortActiveBg: cyberpunkLightColors.background.elevated,
    rowHoverBg: `${cyberpunkLightColors.primary.base}10`, // 10% opacity
    borderColor: cyberpunkLightColors.border.light,
  },
  Tabs: {
    inkBarColor: cyberpunkLightColors.primary.base,
    itemSelectedColor: cyberpunkLightColors.primary.base,
    itemHoverColor: cyberpunkLightColors.primary.light,
    itemActiveColor: cyberpunkLightColors.primary.base,
  },
  Modal: {
    contentBg: cyberpunkLightColors.background.card,
    headerBg: cyberpunkLightColors.background.card,
    titleColor: cyberpunkLightColors.text.primary,
    titleFontSize: parseInt(tokens.typography.fontSize.lg.replace('rem', '')) * 16,
    borderRadiusLG: parseInt(tokens.borderRadius.lg.replace('rem', '')) * 16,
  },
  Drawer: {
    colorBgElevated: cyberpunkLightColors.background.card,
    colorText: cyberpunkLightColors.text.primary,
  },
  Message: {
    colorBgElevated: cyberpunkLightColors.background.elevated,
    colorText: cyberpunkLightColors.text.primary,
    colorSuccess: cyberpunkLightColors.status.success,
    colorError: cyberpunkLightColors.status.error,
    colorWarning: cyberpunkLightColors.status.warning,
    colorInfo: cyberpunkLightColors.status.info,
  },
  Notification: {
    colorBgElevated: cyberpunkLightColors.background.elevated,
    colorText: cyberpunkLightColors.text.primary,
    colorSuccess: cyberpunkLightColors.status.success,
    colorError: cyberpunkLightColors.status.error,
    colorWarning: cyberpunkLightColors.status.warning,
    colorInfo: cyberpunkLightColors.status.info,
  },
  Tooltip: {
    colorBgDefault: cyberpunkLightColors.background.elevated,
    colorTextLightSolid: cyberpunkLightColors.text.primary,
  },
  Popover: {
    colorBgElevated: cyberpunkLightColors.background.elevated,
    colorText: cyberpunkLightColors.text.primary,
  },
  Form: {
    labelColor: cyberpunkLightColors.text.secondary,
    colorError: cyberpunkLightColors.status.error,
    colorWarning: cyberpunkLightColors.status.warning,
    colorSuccess: cyberpunkLightColors.status.success,
  },
};

/**
 * Get the complete theme configuration for Ant Design
 * @param mode - The theme mode ('light' or 'dark')
 * @returns The Ant Design theme configuration
 */
export const getThemeConfig = (mode: 'light' | 'dark'): ThemeConfig => {
  return {
    token: mode === 'dark' ? darkThemeTokens : lightThemeTokens,
    components: mode === 'dark' ? darkComponentTokens : lightComponentTokens,
  };
};

export default getThemeConfig;
