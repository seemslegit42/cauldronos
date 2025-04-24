import { createStore } from './createStore';
import { useThemeStore } from '../styles/theme';

// Define the UI state
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    description?: string;
    duration?: number;
  }>;
}

// Define the UI actions
interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Create the UI store
export const useUIStore = createStore<UIState, UIActions>(
  // Initial state
  {
    sidebarOpen: true,
    theme: 'system',
    notifications: [],
  },
  // Actions
  (set) => ({
    toggleSidebar: () => set((state) => {
      state.sidebarOpen = !state.sidebarOpen;
    }),
    setSidebarOpen: (open) => set((state) => {
      state.sidebarOpen = open;
    }),
    setTheme: (theme) => set((state) => {
      // Sync with cyberpunk theme store
      const cyberpunkTheme = useThemeStore.getState();
      if (theme === 'dark' || theme === 'light') {
        cyberpunkTheme.setMode(theme);
      } else if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        cyberpunkTheme.setMode(prefersDark ? 'dark' : 'light');
      }
      
      state.theme = theme;
    }),
    addNotification: (notification) => set((state) => {
      state.notifications.push({
        id: crypto.randomUUID(),
        ...notification,
      });
    }),
    removeNotification: (id) => set((state) => {
      state.notifications = state.notifications.filter((n) => n.id !== id);
    }),
    clearNotifications: () => set((state) => {
      state.notifications = [];
    }),
  }),
  // Options
  {
    name: 'cauldronos-ui-storage',
    partialize: (state) => ({ theme: state.theme }),
  }
);

// Create selector hooks for better performance
export const useTheme = () => useUIStore((state) => state.theme);
export const useSidebar = () => ({
  isOpen: useUIStore((state) => state.sidebarOpen),
  toggle: useUIStore((state) => state.toggleSidebar),
  setOpen: useUIStore((state) => state.setSidebarOpen),
});
export const useNotifications = () => useUIStore((state) => state.notifications);
export const useNotificationActions = () => ({
  add: useUIStore((state) => state.addNotification),
  remove: useUIStore((state) => state.removeNotification),
  clear: useUIStore((state) => state.clearNotifications),
});
