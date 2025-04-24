import { createStore } from './createStore';

// Define the AI message type
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'loading' | 'error' | 'success';
}

// Define the AI state
interface AIState {
  assistantOpen: boolean;
  messages: AIMessage[];
  isStreaming: boolean;
  useSwarm: boolean;
  contextData: Record<string, any>;
}

// Define the AI actions
interface AIActions {
  toggleAssistant: () => void;
  setAssistantOpen: (open: boolean) => void;
  addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<AIMessage>) => void;
  clearMessages: () => void;
  setStreaming: (isStreaming: boolean) => void;
  toggleUseSwarm: () => void;
  setUseSwarm: (useSwarm: boolean) => void;
  updateContextData: (data: Record<string, any>) => void;
}

// Create the AI store
export const useAIStore = createStore<AIState, AIActions>(
  // Initial state
  {
    assistantOpen: false,
    messages: [],
    isStreaming: false,
    useSwarm: true,
    contextData: {},
  },
  // Actions
  (set) => ({
    toggleAssistant: () => set((state) => {
      state.assistantOpen = !state.assistantOpen;
    }),
    setAssistantOpen: (open) => set((state) => {
      state.assistantOpen = open;
    }),
    addMessage: (message) => set((state) => {
      state.messages.push({
        id: crypto.randomUUID(),
        ...message,
        timestamp: new Date(),
      });
    }),
    updateMessage: (id, updates) => set((state) => {
      const index = state.messages.findIndex((m) => m.id === id);
      if (index !== -1) {
        state.messages[index] = { ...state.messages[index], ...updates };
      }
    }),
    clearMessages: () => set((state) => {
      state.messages = [];
    }),
    setStreaming: (isStreaming) => set((state) => {
      state.isStreaming = isStreaming;
    }),
    toggleUseSwarm: () => set((state) => {
      state.useSwarm = !state.useSwarm;
    }),
    setUseSwarm: (useSwarm) => set((state) => {
      state.useSwarm = useSwarm;
    }),
    updateContextData: (data) => set((state) => {
      state.contextData = { ...state.contextData, ...data };
    }),
  }),
  // Options
  {
    name: 'cauldronos-ai-storage',
    partialize: (state) => ({ 
      messages: state.messages,
      useSwarm: state.useSwarm,
    }),
  }
);

// Create selector hooks for better performance
export const useAIAssistant = () => ({
  isOpen: useAIStore((state) => state.assistantOpen),
  toggle: useAIStore((state) => state.toggleAssistant),
  setOpen: useAIStore((state) => state.setAssistantOpen),
  messages: useAIStore((state) => state.messages),
  addMessage: useAIStore((state) => state.addMessage),
  updateMessage: useAIStore((state) => state.updateMessage),
  clearMessages: useAIStore((state) => state.clearMessages),
  isStreaming: useAIStore((state) => state.isStreaming),
  setStreaming: useAIStore((state) => state.setStreaming),
  useSwarm: useAIStore((state) => state.useSwarm),
  toggleUseSwarm: useAIStore((state) => state.toggleUseSwarm),
  setUseSwarm: useAIStore((state) => state.setUseSwarm),
  contextData: useAIStore((state) => state.contextData),
  updateContextData: useAIStore((state) => state.updateContextData),
});
