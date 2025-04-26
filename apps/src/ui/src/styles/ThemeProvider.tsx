import React, { useEffect } from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import { useTheme } from './useTheme';
import './global.css';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { themeConfig, effectiveMode } = useTheme();

  // Load Roboto Mono font
  useEffect(() => {
    // Add link for Roboto Mono font if not already present
    if (!document.getElementById('roboto-mono-font')) {
      const link = document.createElement('link');
      link.id = 'roboto-mono-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <ConfigProvider theme={themeConfig}>
      <AntdApp>
        {children}
      </AntdApp>
    </ConfigProvider>
  );
};

export default ThemeProvider;
