import { ThemeConfig } from 'antd';
import { cyberpunkColors } from './theme';

// Define the Ant Design theme tokens for light mode
export const lightThemeTokens: ThemeConfig['token'] = {
  // Colors
  colorPrimary: cyberpunkColors.cyan,
  colorSuccess: cyberpunkColors.success,
  colorWarning: cyberpunkColors.warning,
  colorError: cyberpunkColors.error,
  colorInfo: cyberpunkColors.info,
  
  // Base colors
  colorText: '#1C2434',
  colorTextSecondary: 'rgba(28, 36, 52, 0.75)',
  colorTextTertiary: 'rgba(28, 36, 52, 0.45)',
  colorTextQuaternary: 'rgba(28, 36, 52, 0.25)',
  
  // Background colors
  colorBgBase: '#FFFFFF',
  colorBgContainer: '#F7F9FC',
  colorBgElevated: '#FFFFFF',
  colorBgLayout: '#F1F5F9',
  
  // Border colors
  colorBorder: '#E2E8F0',
  colorBorderSecondary: '#EDF2F7',
  
  // Font
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: 14,
  
  // Border radius
  borderRadius: 6,
  
  // Animation
  motionDurationMid: '0.2s',
  motionDurationSlow: '0.3s',
  
  // Shadows
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  boxShadowSecondary: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

// Define the Ant Design theme tokens for dark mode
export const darkThemeTokens: ThemeConfig['token'] = {
  // Colors
  colorPrimary: cyberpunkColors.cyan,
  colorSuccess: cyberpunkColors.success,
  colorWarning: cyberpunkColors.warning,
  colorError: cyberpunkColors.error,
  colorInfo: cyberpunkColors.info,
  
  // Base colors
  colorText: cyberpunkColors.white,
  colorTextSecondary: 'rgba(230, 230, 232, 0.75)',
  colorTextTertiary: 'rgba(230, 230, 232, 0.45)',
  colorTextQuaternary: 'rgba(230, 230, 232, 0.25)',
  
  // Background colors
  colorBgBase: cyberpunkColors.black,
  colorBgContainer: cyberpunkColors.darkGray,
  colorBgElevated: cyberpunkColors.mediumGray,
  colorBgLayout: cyberpunkColors.black,
  
  // Border colors
  colorBorder: cyberpunkColors.lightGray,
  colorBorderSecondary: 'rgba(42, 45, 58, 0.5)',
  
  // Font
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: 14,
  
  // Border radius
  borderRadius: 6,
  
  // Animation
  motionDurationMid: '0.2s',
  motionDurationSlow: '0.3s',
  
  // Shadows
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
  boxShadowSecondary: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
};

// Define the Ant Design component tokens for light mode
export const lightComponentTokens: ThemeConfig['components'] = {
  Button: {
    colorPrimary: cyberpunkColors.cyan,
    algorithm: true,
  },
  Input: {
    colorBgContainer: '#FFFFFF',
    colorBorder: '#E2E8F0',
  },
  Select: {
    colorBgContainer: '#FFFFFF',
    colorBorder: '#E2E8F0',
  },
  Table: {
    colorBgContainer: '#FFFFFF',
    headerBg: '#F7F9FC',
  },
  Card: {
    colorBgContainer: '#FFFFFF',
  },
  Modal: {
    colorBgElevated: '#FFFFFF',
  },
  Drawer: {
    colorBgElevated: '#FFFFFF',
  },
};

// Define the Ant Design component tokens for dark mode
export const darkComponentTokens: ThemeConfig['components'] = {
  Button: {
    colorPrimary: cyberpunkColors.cyan,
    algorithm: true,
  },
  Input: {
    colorBgContainer: cyberpunkColors.darkGray,
    colorBorder: cyberpunkColors.lightGray,
  },
  Select: {
    colorBgContainer: cyberpunkColors.darkGray,
    colorBorder: cyberpunkColors.lightGray,
  },
  Table: {
    colorBgContainer: cyberpunkColors.darkGray,
    headerBg: cyberpunkColors.mediumGray,
  },
  Card: {
    colorBgContainer: cyberpunkColors.darkGray,
  },
  Modal: {
    colorBgElevated: cyberpunkColors.darkGray,
  },
  Drawer: {
    colorBgElevated: cyberpunkColors.darkGray,
  },
};
