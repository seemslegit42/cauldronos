import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'cauldron-theme-storage',
    }
  )
);

export const useTheme = () => {
  const { mode, setMode } = useThemeStore();
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Set dark mode based on theme mode
  useEffect(() => {
    const effectiveTheme = mode === 'system' ? systemTheme : mode;
    setIsDarkMode(effectiveTheme === 'dark');
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
  }, [mode, systemTheme]);

  // Corporate cyberpunk theme
  const theme = {
    // Base colors
    colorPrimary: '#00b0ff', // Electric blue
    colorSuccess: '#00e676', // Neon green
    colorWarning: '#ffab00', // Amber
    colorError: '#ff1744', // Bright red
    
    // Text colors
    colorText: isDarkMode ? '#e0e0e0' : '#212121',
    colorTextSecondary: isDarkMode ? '#9e9e9e' : '#757575',
    
    // Background colors
    colorBgBase: isDarkMode ? '#121212' : '#ffffff',
    colorBgContainer: isDarkMode ? '#1e1e1e' : '#f5f5f5',
    colorBgElevated: isDarkMode ? '#2d2d2d' : '#ffffff',
    
    // Border colors
    colorBorder: isDarkMode ? '#333333' : '#e0e0e0',
    colorBorderSecondary: isDarkMode ? '#424242' : '#f0f0f0',
  };

  return {
    theme,
    isDarkMode,
    mode,
    setMode,
  };
};
