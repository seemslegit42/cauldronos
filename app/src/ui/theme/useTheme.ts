import { useThemeStore, ThemeMode, ThemeStyle } from './themeStore';
import { cyberpunkColors, typography } from './theme';

// Hook for using theme in components
export const useTheme = () => {
  const {
    mode,
    systemPreference,
    style,
    setMode,
    setStyle,
    getEffectiveMode,
  } = useThemeStore();
  
  // Get the effective theme mode (resolves 'system' to actual preference)
  const effectiveMode = getEffectiveMode();
  const isDarkMode = effectiveMode === 'dark';
  
  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setMode(isDarkMode ? 'light' : 'dark');
  };
  
  // Get theme colors based on current mode
  const colors = {
    // Primary colors
    primary: isDarkMode ? cyberpunkColors.cyan : cyberpunkColors.blue,
    secondary: isDarkMode ? cyberpunkColors.blue : cyberpunkColors.cyan,
    accent: cyberpunkColors.purple,
    
    // Background colors
    background: isDarkMode ? cyberpunkColors.black : '#FFFFFF',
    backgroundElevated: isDarkMode ? cyberpunkColors.darkGray : '#FFFFFF',
    backgroundHighlight: isDarkMode ? cyberpunkColors.mediumGray : '#F5F5F7',
    
    // Text colors
    text: isDarkMode ? cyberpunkColors.white : '#202124',
    textSecondary: isDarkMode ? 'rgba(230, 230, 232, 0.75)' : 'rgba(32, 33, 36, 0.75)',
    textDisabled: isDarkMode ? 'rgba(230, 230, 232, 0.45)' : 'rgba(32, 33, 36, 0.45)',
    
    // Border colors
    border: isDarkMode ? cyberpunkColors.lightGray : '#E1E2E6',
    
    // Functional colors
    success: cyberpunkColors.success,
    warning: cyberpunkColors.warning,
    error: cyberpunkColors.error,
    info: isDarkMode ? cyberpunkColors.info : cyberpunkColors.blue,
    
    // Gradients
    gradientPrimary: cyberpunkColors.gradientCyan,
    gradientSecondary: cyberpunkColors.gradientPurple,
  };
  
  // Return theme properties and actions
  return {
    mode,
    systemPreference,
    style,
    isDarkMode,
    colors,
    typography,
    setMode,
    setStyle,
    toggleDarkMode,
  };
};

export default useTheme;
