import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTheme } from './theme';
import { ThemeConfig } from 'antd';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  systemPreference: 'light' | 'dark';
  themeConfig: ThemeConfig;
  setMode: (mode: ThemeMode) => void;
  setSystemPreference: (preference: 'light' | 'dark') => void;
  getEffectiveMode: () => 'light' | 'dark';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      systemPreference: 'dark', // Default to dark for corporate cyberpunk feel
      themeConfig: getTheme('dark'), // Default theme config
      
      setMode: (mode: ThemeMode) => {
        const effectiveMode = mode === 'system' ? get().systemPreference : mode;
        set({
          mode,
          themeConfig: getTheme(effectiveMode),
        });
        
        // Apply theme class to document for global CSS variables
        document.documentElement.setAttribute('data-theme', effectiveMode);
      },
      
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
            
            // Apply theme class to document for global CSS variables
            document.documentElement.setAttribute('data-theme', preference);
          }
          
          return newState;
        });
      },
      
      getEffectiveMode: () => {
        const state = get();
        return state.mode === 'system' ? state.systemPreference : state.mode;
      },
    }),
    {
      name: 'cauldron-theme-storage',
      partialize: (state) => ({ mode: state.mode }),
    }
  )
);
