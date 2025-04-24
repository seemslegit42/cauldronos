import React, { useEffect } from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import { useTheme } from './useTheme';
import './global.css';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { themeConfig, effectiveMode } = useTheme();

  // Load brand fonts based on guidelines
  useEffect(() => {
    // Add Manrope font for headings
    if (!document.getElementById('manrope-font')) {
      const manropeLink = document.createElement('link');
      manropeLink.id = 'manrope-font';
      manropeLink.rel = 'stylesheet';
      manropeLink.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap';
      document.head.appendChild(manropeLink);
    }
    
    // Add Inter font for body text
    if (!document.getElementById('inter-font')) {
      const interLink = document.createElement('link');
      interLink.id = 'inter-font';
      interLink.rel = 'stylesheet';
      interLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(interLink);
    }
    
    // Add JetBrains Mono font for code and technical content
    if (!document.getElementById('jetbrains-mono-font')) {
      const jetbrainsLink = document.createElement('link');
      jetbrainsLink.id = 'jetbrains-mono-font';
      jetbrainsLink.rel = 'stylesheet';
      jetbrainsLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(jetbrainsLink);
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
