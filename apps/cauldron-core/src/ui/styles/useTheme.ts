import { useEffect } from 'react';
import { useThemeStore, ThemeMode } from './themeStore';

export const useTheme = () => {
  const {
    mode,
    systemPreference,
    themeConfig,
    setMode,
    setSystemPreference,
    getEffectiveMode,
  } = useThemeStore();

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial system preference
    setSystemPreference(mediaQuery.matches ? 'dark' : 'light');
    
    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setSystemPreference]);

  // Apply theme to document when it changes
  useEffect(() => {
    const effectiveMode = getEffectiveMode();
    document.documentElement.setAttribute('data-theme', effectiveMode);
    
    // Apply the Inter font to body by default
    document.body.style.fontFamily = "'Inter', sans-serif";
  }, [mode, systemPreference, getEffectiveMode]);

  return {
    mode,
    effectiveMode: getEffectiveMode(),
    isDarkMode: getEffectiveMode() === 'dark',
    themeConfig,
    setTheme: setMode,
  };
};

export default useTheme;
