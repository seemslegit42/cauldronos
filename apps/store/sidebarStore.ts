import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  // State
  collapsed: boolean;
  
  // Actions
  toggleCollapsed: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      // Initial state
      collapsed: false,
      
      // Actions
      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      setCollapsed: (collapsed) => set({ collapsed }),
    }),
    {
      name: 'sidebar-storage',
      partialize: (state) => ({ collapsed: state.collapsed }),
    }
  )
);
