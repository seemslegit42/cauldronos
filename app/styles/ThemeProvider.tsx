import React, { useEffect } from 'react';
import { ConfigProvider, App } from 'antd';
import { useThemeStore } from './themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { themeConfig, getEffectiveMode, applyTheme } = useThemeStore();
  const isDarkMode = getEffectiveMode() === 'dark';
  
  // Apply theme on mount and when it changes
  useEffect(() => {
    applyTheme();
  }, [applyTheme, isDarkMode]);
  
  return (
    <ConfigProvider
      theme={themeConfig}
      direction="ltr"
    >
      <App
        className={`theme-${isDarkMode ? 'dark' : 'light'} theme-cyberpunk`}
        message={{ maxCount: 3 }}
        notification={{ placement: 'topRight' }}
      >
        {children}
      </App>
    </ConfigProvider>
  );
};

export default ThemeProvider;
