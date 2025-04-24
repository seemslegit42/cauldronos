import { createStore } from './createStore';
import { AIOutputType } from '../ai/components/AIOutputBlock';

// Define the AI message type
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: AIOutputType | 'loading' | 'error' | 'success';
  isStreaming?: boolean;
}

// Define the AI state
interface AIState {
  assistantOpen: boolean;
  messages: AIMessage[];
  isStreaming: boolean;
  useSwarm: boolean;
  contextData: Record<string, any>;
  isProcessing: boolean;
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
  setProcessing: (isProcessing: boolean) => void;
  sendMessage: (content: string, additionalContext?: Record<string, any>) => Promise<AIMessage>;
  sendMessageStreaming: (
    content: string, 
    additionalContext?: Record<string, any>,
    onChunk?: (chunk: any) => void
  ) => Promise<AIMessage>;
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
    isProcessing: false,
  },
  // Actions
  (set, get) => ({
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
    setProcessing: (isProcessing) => set((state) => {
      state.isProcessing = isProcessing;
    }),
    sendMessage: async (content, additionalContext) => {
      const state = get();
      
      // Add user message to the conversation
      const userMessage: AIMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
        type: 'text'
      };
      
      get().addMessage(userMessage);
      set(state => { state.isProcessing = true; });
      
      try {
        // Merge context data
        const mergedContext = { ...state.contextData, ...additionalContext };
        
        // This would be replaced with actual API call in a real implementation
        // Using a mock response for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const responseMessage: AIMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: `This is a response to: ${content}`,
          timestamp: new Date(),
          type: 'text'
        };
        
        get().addMessage(responseMessage);
        return responseMessage;
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage: AIMessage = {
          id: `error-${Date.now()}`,
          role: 'system',
          content: 'Sorry, there was an error processing your request.',
          timestamp: new Date(),
          type: 'error'
        };
        get().addMessage(errorMessage);
        return errorMessage;
      } finally {
        set(state => { state.isProcessing = false; });
      }
    },
    sendMessageStreaming: async (content, additionalContext, onChunk) => {
      const state = get();
      
      // Add user message to the conversation
      const userMessage: AIMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
        type: 'text'
      };
      
      get().addMessage(userMessage);
      
      // Create a placeholder for the assistant's response
      const placeholderId = `assistant-${Date.now()}`;
      const placeholderMessage: AIMessage = {
        id: placeholderId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        type: 'text',
        isStreaming: true
      };
      
      get().addMessage(placeholderMessage);
      set(state => { 
        state.isStreaming = true;
        state.isProcessing = true;
      });
      
      try {
        // Merge context data
        const mergedContext = { ...state.contextData, ...additionalContext };
        
        // This would be replaced with actual streaming API call
        // Using a mock streaming response for demonstration
        const fullResponse = `This is a streaming response to: ${content}. It will be delivered character by character to simulate streaming.`;
        let streamedContent = '';
        
        for (let i = 0; i < fullResponse.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 50));
          streamedContent += fullResponse[i];
          
          // Update the placeholder message with the new content
          get().updateMessage(placeholderId, { content: streamedContent });
          
          // Call the provided chunk handler if available
          if (onChunk) {
            onChunk({ content: fullResponse[i] });
          }
        }
        
        // Final message with complete content
        const finalMessage: AIMessage = {
          id: placeholderId,
          role: 'assistant',
          content: streamedContent,
          timestamp: new Date(),
          type: 'text',
          isStreaming: false
        };
        
        get().updateMessage(placeholderId, { isStreaming: false });
        return finalMessage;
      } catch (error) {
        console.error('Error streaming message:', error);
        const errorContent = 'Sorry, there was an error processing your request.';
        get().updateMessage(placeholderId, { 
          content: errorContent,
          type: 'error',
          isStreaming: false
        });
        
        return {
          id: placeholderId,
          role: 'system',
          content: errorContent,
          timestamp: new Date(),
          type: 'error'
        };
      } finally {
        set(state => { 
          state.isStreaming = false;
          state.isProcessing = false;
        });
      }
    }
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
  isProcessing: useAIStore((state) => state.isProcessing),
  sendMessage: useAIStore((state) => state.sendMessage),
  sendMessageStreaming: useAIStore((state) => state.sendMessageStreaming),
});
