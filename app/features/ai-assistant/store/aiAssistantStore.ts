import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '../types';

interface AIAssistantState {
  isOpen: boolean;
  messages: Message[];
  currentModuleContext: string | null;
  isLoading: boolean;
  isSpeechInputActive: boolean;
  
  // Actions
  toggleOpen: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateLastMessage: (content: string) => void;
  clearMessages: () => void;
  setCurrentModuleContext: (context: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSpeechInputActive: (active: boolean) => void;
}

export const useAIAssistantStore = create<AIAssistantState>()(
  persist(
    (set) => ({
      isOpen: false,
      messages: [],
      currentModuleContext: null,
      isLoading: false,
      isSpeechInputActive: false,
      
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, { 
          ...message, 
          id: Date.now().toString(), 
          timestamp: Date.now() 
        }] 
      })),
      
      updateLastMessage: (content) => set((state) => {
        const messages = [...state.messages];
        if (messages.length > 0) {
          const lastIndex = messages.length - 1;
          messages[lastIndex] = {
            ...messages[lastIndex],
            content
          };
        }
        return { messages };
      }),
      
      clearMessages: () => set({ messages: [] }),
      
      setCurrentModuleContext: (context) => set({ currentModuleContext: context }),
      
      setIsLoading: (isLoading) => set({ isLoading }),
      
      setSpeechInputActive: (active) => set({ isSpeechInputActive: active }),
    }),
    {
      name: 'ai-assistant-storage',
      partialize: (state) => ({ 
        messages: state.messages,
        currentModuleContext: state.currentModuleContext 
      }),
    }
  )
);
