import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTheme, getCssVariables } from './theme';
import { ThemeConfig } from 'antd';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeStyle = 'cyberpunk';

interface ThemeState {
  // Theme state
  mode: ThemeMode;
  systemPreference: 'light' | 'dark';
  themeConfig: ThemeConfig;
  style: ThemeStyle;
  
  // Theme actions
  setMode: (mode: ThemeMode) => void;
  setSystemPreference: (preference: 'light' | 'dark') => void;
  setStyle: (style: ThemeStyle) => void;
  
  // Helpers
  getEffectiveMode: () => 'light' | 'dark';
  applyTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Default state
      mode: 'system',
      systemPreference: 'dark', // Default to dark for corporate cyberpunk feel
      themeConfig: getTheme('dark'), // Default theme config
      style: 'cyberpunk', // Currently only supporting cyberpunk style
      
      // Set theme mode (light, dark, or system)
      setMode: (mode: ThemeMode) => {
        const effectiveMode = mode === 'system' ? get().systemPreference : mode;
        set({
          mode,
          themeConfig: getTheme(effectiveMode),
        });
        
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', effectiveMode);
        get().applyTheme();
      },
      
      // Set system preference (used when mode is 'system')
      setSystemPreference: (preference: 'light' | 'dark') => {
        set((state) => {
          const newState = {
            systemPreference: preference,
          };
          
          // If current mode is 'system', also update the theme config
          if (state.mode === 'system') {
            Object.assign(newState, {
              themeConfig: getTheme(preference),
            });
            
            // Apply theme to document
            document.documentElement.setAttribute('data-theme', preference);
            setTimeout(() => get().applyTheme(), 0);
          }
          
          return newState;
        });
      },
      
      // Set theme style (currently only 'cyberpunk')
      setStyle: (style: ThemeStyle) => {
        set({ style });
        setTimeout(() => get().applyTheme(), 0);
      },
      
      // Get the effective theme mode (resolves 'system' to actual preference)
      getEffectiveMode: () => {
        const state = get();
        return state.mode === 'system' ? state.systemPreference : state.mode;
      },
      
      // Apply theme CSS variables to document root
      applyTheme: () => {
        const effectiveMode = get().getEffectiveMode();
        const cssVars = getCssVariables(effectiveMode);
        const root = document.documentElement;
        
        // Apply CSS variables
        Object.entries(cssVars).forEach(([key, value]) => {
          root.style.setProperty(key, value);
        });
        
        // Apply theme class
        root.classList.remove('theme-light', 'theme-dark');
        root.classList.add(`theme-${effectiveMode}`);
        
        // Apply cyberpunk style class
        root.classList.add('theme-cyberpunk');
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute(
            'content',
            effectiveMode === 'dark' ? '#0D0D0F' : '#FFFFFF'
          );
        }
      },
    }),
    {
      name: 'cauldron-theme-storage',
      partialize: (state) => ({
        mode: state.mode,
        style: state.style,
      }),
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  // Check for system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeStore = useThemeStore.getState();
  
  // Set system preference based on browser/OS setting
  themeStore.setSystemPreference(prefersDark ? 'dark' : 'light');
  
  // Apply initial theme
  themeStore.applyTheme();
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    themeStore.setSystemPreference(e.matches ? 'dark' : 'light');
  });
}
