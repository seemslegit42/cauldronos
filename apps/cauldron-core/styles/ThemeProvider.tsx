import React, { useEffect } from 'react';
import { ConfigProvider, App, theme } from 'antd';
import { useThemeStore } from './themeStore';
import { StyleProvider } from '@ant-design/cssinjs';
import { MotionProvider } from '@/ui/animations/MotionProvider';

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
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={themeConfig}
        direction="ltr"
        // Enable CSS variable mode for better performance and customization
        cssVar={{
          prefix: 'cauldron',
        }}
        // Configure component defaults
        componentSize="middle"
        wave={{
          disabled: false,
        }}
      >
        <App
          className={`theme-${isDarkMode ? 'dark' : 'light'} theme-cyberpunk`}
          message={{ maxCount: 3 }}
          notification={{ placement: 'topRight' }}
        >
          <MotionProvider>
            {children}
          </MotionProvider>
        </App>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default ThemeProvider;
