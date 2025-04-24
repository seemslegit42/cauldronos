import React, { createContext, useState, useEffect, useContext } from 'react';
import { ConfigProvider, theme as antdTheme, App } from 'antd';
import { useWorkspaces } from '../workspace/operations';
import dayjs from 'dayjs';
import enUS from 'antd/locale/en_US';
import classNames from 'classnames';
import { useThemeStore, getCssVariables } from '../styles/theme';
import { lightThemeTokens, darkThemeTokens, lightComponentTokens, darkComponentTokens } from '../styles/antDesignTokens';

// Default theme
const defaultTheme = {
  primaryColor: '#1677ff',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#ff4d4f',
  infoColor: '#1677ff',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  borderRadius: 6,
  fontSize: 14,
  headerHeight: 64,
  sidebarWidth: 200,
  logoUrl: '',
  faviconUrl: '',
  customCss: '',
  isDarkMode: false
};

// Create context
interface ThemeContextType {
  theme: typeof defaultTheme;
  setTheme: (theme: typeof defaultTheme) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  themeStyle: 'cyberpunk';
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  toggleDarkMode: () => {},
  isDarkMode: false,
  themeStyle: 'cyberpunk'
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { currentWorkspace } = useWorkspaces();
  const [theme, setThemeState] = useState(defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedTheme) {
      try {
        setThemeState(JSON.parse(savedTheme));
      } catch (error) {
        console.error('Failed to parse saved theme', error);
      }
    }

    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Update theme when workspace changes
  useEffect(() => {
    if (currentWorkspace?.id) {
      // In a real app, this would fetch the workspace theme from the server
      // For now, we'll just use the saved theme
      const savedWorkspaceTheme = localStorage.getItem(`theme_${currentWorkspace.id}`);

      if (savedWorkspaceTheme) {
        try {
          setThemeState(JSON.parse(savedWorkspaceTheme));
        } catch (error) {
          console.error('Failed to parse saved workspace theme', error);
        }
      }
    }
  }, [currentWorkspace]);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));

    if (currentWorkspace?.id) {
      localStorage.setItem(`theme_${currentWorkspace.id}`, JSON.stringify(theme));
    }
  }, [theme, currentWorkspace]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());

    // Apply dark mode to body
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Set theme
  const setTheme = (newTheme: typeof defaultTheme) => {
    setThemeState(newTheme);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply custom CSS
  useEffect(() => {
    let styleElement = document.getElementById('custom-theme-css');

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'custom-theme-css';
      document.head.appendChild(styleElement);
    }

    // Generate CSS variables
    const cssVars = `
      :root {
        --primary-color: ${theme.primaryColor};
        --success-color: ${theme.successColor};
        --warning-color: ${theme.warningColor};
        --error-color: ${theme.errorColor};
        --info-color: ${theme.infoColor};
        --background-color: ${theme.backgroundColor};
        --text-color: ${theme.textColor};
        --border-radius: ${theme.borderRadius}px;
        --font-size: ${theme.fontSize}px;
        --header-height: ${theme.headerHeight}px;
        --sidebar-width: ${theme.sidebarWidth}px;
      }

      ${theme.customCss || ''}
    `;

    styleElement.textContent = cssVars;

    // Update favicon if provided
    if (theme.faviconUrl) {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.setAttribute('href', theme.faviconUrl);
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = theme.faviconUrl;
        document.head.appendChild(newFavicon);
      }
    }

    return () => {
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, [theme]);

  // Get theme mode from Zustand store
  const { mode: themeMode } = useThemeStore();

  // Configure Ant Design theme using our tokens
  const antTheme = {
    algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: isDarkMode ? darkThemeTokens : lightThemeTokens,
    components: isDarkMode ? darkComponentTokens : lightComponentTokens,
  };

  // Apply CSS variables for use outside of Ant Design components
  useEffect(() => {
    const cssVars = getCssVariables(isDarkMode ? 'dark' : 'light');
    const root = document.documentElement;

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [isDarkMode]);

  // Get theme style from Zustand store
  const { style: themeStyle } = useThemeStore();

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode, isDarkMode, themeStyle }}>
      <ConfigProvider
        theme={antTheme}
        locale={enUS}
        direction="ltr"
        componentSize="middle"
      >
        <App
          className={classNames({
            'dark-mode': isDarkMode,
            'light-mode': !isDarkMode,
            'theme-cyberpunk': true
          })}
          message={{ maxCount: 3 }}
          notification={{ placement: 'topRight' }}
        >
          {children}
        </App>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
