import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Import migration feature flags interface
import { MigrationFeatureFlags } from '../utils/migrationUtils';

export interface UIState {
  // Theme preferences
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Animation preferences
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  
  // UI density
  uiDensity: 'compact' | 'default' | 'comfortable';
  setUIDensity: (density: 'compact' | 'default' | 'comfortable') => void;
  
  // Sidebar state
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Notifications
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  
  // UI effects
  glowEffectsEnabled: boolean;
  toggleGlowEffects: () => void;
  
  scanlineEffectsEnabled: boolean;
  toggleScanlineEffects: () => void;
  
  glitchEffectsEnabled: boolean;
  toggleGlitchEffects: () => void;
  
  // Migration feature flags
  migrationFlags?: MigrationFeatureFlags;
  setMigrationFlags: (flags: MigrationFeatureFlags) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Theme preferences
      isDarkMode: true, // Default to dark mode for cyberpunk feel
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Animation preferences
      reducedMotion: false,
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      
      // UI density
      uiDensity: 'default',
      setUIDensity: (density) => set({ uiDensity: density }),
      
      // Sidebar state
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
      
      // Notifications
      notificationsEnabled: true,
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      
      // UI effects
      glowEffectsEnabled: true,
      toggleGlowEffects: () => set((state) => ({ glowEffectsEnabled: !state.glowEffectsEnabled })),
      
      scanlineEffectsEnabled: false,
      toggleScanlineEffects: () => set((state) => ({ scanlineEffectsEnabled: !state.scanlineEffectsEnabled })),
      
      glitchEffectsEnabled: true,
      toggleGlitchEffects: () => set((state) => ({ glitchEffectsEnabled: !state.glitchEffectsEnabled })),
      
      // Migration feature flags - all features enabled for full migration
      migrationFlags: {
        useEnhancedButtons: true,
        useEnhancedCards: true,
        useEnhancedModals: true,
        useEnhancedForms: true,
        useEnhancedInputs: true,
        useEnhancedTables: true,
        useEnhancedMenus: true,
        useEnhancedLayouts: true,
        useCyberpunkTheme: true,
      },
      setMigrationFlags: (flags) => set({ migrationFlags: flags }),
    }),
    {
      name: 'cauldron-ui-preferences',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        reducedMotion: state.reducedMotion,
        uiDensity: state.uiDensity,
        isSidebarCollapsed: state.isSidebarCollapsed,
        notificationsEnabled: state.notificationsEnabled,
        glowEffectsEnabled: state.glowEffectsEnabled,
        scanlineEffectsEnabled: state.scanlineEffectsEnabled,
        glitchEffectsEnabled: state.glitchEffectsEnabled,
        migrationFlags: state.migrationFlags,
      }),
    }
  )
);

export default useUIStore;import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UIState {
  // Theme preferences
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Animation preferences
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  
  // UI density
  uiDensity: 'compact' | 'default' | 'comfortable';
  setUIDensity: (density: 'compact' | 'default' | 'comfortable') => void;
  
  // Sidebar state
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Notifications
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  
  // UI effects
  glowEffectsEnabled: boolean;
  toggleGlowEffects: () => void;
  
  scanlineEffectsEnabled: boolean;
  toggleScanlineEffects: () => void;
  
  glitchEffectsEnabled: boolean;
  toggleGlitchEffects: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Theme preferences
      isDarkMode: true, // Default to dark mode for cyberpunk feel
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Animation preferences
      reducedMotion: false,
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      
      // UI density
      uiDensity: 'default',
      setUIDensity: (density) => set({ uiDensity: density }),
      
      // Sidebar state
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
      
      // Notifications
      notificationsEnabled: true,
      toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
      
      // UI effects
      glowEffectsEnabled: true,
      toggleGlowEffects: () => set((state) => ({ glowEffectsEnabled: !state.glowEffectsEnabled })),
      
      scanlineEffectsEnabled: false,
      toggleScanlineEffects: () => set((state) => ({ scanlineEffectsEnabled: !state.scanlineEffectsEnabled })),
      
      glitchEffectsEnabled: true,
      toggleGlitchEffects: () => set((state) => ({ glitchEffectsEnabled: !state.glitchEffectsEnabled })),
    }),
    {
      name: 'cauldron-ui-preferences',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        reducedMotion: state.reducedMotion,
        uiDensity: state.uiDensity,
        isSidebarCollapsed: state.isSidebarCollapsed,
        notificationsEnabled: state.notificationsEnabled,
        glowEffectsEnabled: state.glowEffectsEnabled,
        scanlineEffectsEnabled: state.scanlineEffectsEnabled,
        glitchEffectsEnabled: state.glitchEffectsEnabled,
      }),
    }
  )
);

export default useUIStore;