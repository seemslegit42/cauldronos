import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Define types for our store
type AIMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

type ThemeMode = 'light' | 'dark' | 'system'

// Define the store state
interface AppState {
  // UI state
  ui: {
    sidebarOpen: boolean
    theme: ThemeMode
  }
  // AI state
  ai: {
    assistantOpen: boolean
    messages: AIMessage[]
    isStreaming: boolean
  }
}

// Define actions as a separate interface for better organization
interface AppActions {
  // UI actions
  toggleSidebar: () => void
  setTheme: (theme: ThemeMode) => void
  
  // AI actions
  toggleAssistant: () => void
  addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void
  clearMessages: () => void
  setStreaming: (isStreaming: boolean) => void
}

// Combine state and actions
type AppStore = AppState & AppActions

// Create the store with immer for easier state updates
export const useAppStore = create<AppStore>()(
  immer(
    persist(
      (set) => ({
        // Initial state
        ui: {
          sidebarOpen: true,
          theme: 'system',
        },
        ai: {
          assistantOpen: false,
          messages: [],
          isStreaming: false,
        },
        
        // UI actions
        toggleSidebar: () => set((state) => {
          state.ui.sidebarOpen = !state.ui.sidebarOpen
        }),
        setTheme: (theme) => set((state) => {
          state.ui.theme = theme
        }),
        
        // AI actions
        toggleAssistant: () => set((state) => {
          state.ai.assistantOpen = !state.ai.assistantOpen
        }),
        addMessage: (message) => set((state) => {
          state.ai.messages.push({
            id: crypto.randomUUID(),
            ...message,
            timestamp: new Date(),
          })
        }),
        clearMessages: () => set((state) => {
          state.ai.messages = []
        }),
        setStreaming: (isStreaming) => set((state) => {
          state.ai.isStreaming = isStreaming
        }),
      }),
      {
        name: 'cauldronos-app-storage',
        partialize: (state) => ({
          ui: { theme: state.ui.theme },
          ai: { messages: state.ai.messages },
        }),
      }
    )
  )
)

// Create selector hooks for better performance
export const useTheme = () => useAppStore((state) => state.ui.theme)
export const useThemeActions = () => useAppStore((state) => state.setTheme)

export const useSidebar = () => ({
  isOpen: useAppStore((state) => state.ui.sidebarOpen),
  toggle: useAppStore((state) => state.toggleSidebar),
})

export const useAI = () => ({
  isOpen: useAppStore((state) => state.ai.assistantOpen),
  messages: useAppStore((state) => state.ai.messages),
  isStreaming: useAppStore((state) => state.ai.isStreaming),
  toggle: useAppStore((state) => state.toggleAssistant),
  addMessage: useAppStore((state) => state.addMessage),
  clearMessages: useAppStore((state) => state.clearMessages),
  setStreaming: useAppStore((state) => state.setStreaming),
})
