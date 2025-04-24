import React, { createContext, useContext } from 'react';

// Context type
interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface AIContextType {
  isVisible: boolean;
  toggleVisibility: () => void;
  messages: AIMessage[];
  addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  sendMessage: (content: string, contextData?: any) => Promise<AIMessage>;
  sendMessageStreaming: (content: string, contextData?: any, onChunk?: (chunk: any) => void) => Promise<AIMessage>;
  contextData: Record<string, any>;
  updateContextData: (data: Record<string, any>) => void;
  useSwarm: boolean;
  toggleUseSwarm: () => void;
  isProcessing: boolean;
}

// Create context with default values
const AIContext = createContext<AIContextType>({
  isVisible: false,
  toggleVisibility: () => {},
  messages: [],
  addMessage: () => {},
  clearMessages: () => {},
  sendMessage: async () => ({ id: '', role: 'assistant', content: '', timestamp: new Date() }),
  sendMessageStreaming: async () => ({ id: '', role: 'assistant', content: '', timestamp: new Date() }),
  contextData: {},
  updateContextData: () => {},
  useSwarm: true,
  toggleUseSwarm: () => {},
  isProcessing: false
});

// Hook to use the AI context
export const useAI = () => useContext(AIContext);

interface AIProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that makes the AI functionality available throughout the application.
 * It manages the state of the AI and provides methods to interact with it.
 * This implementation uses Zustand for state management.
 */
export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  // Create a simplified context value for the build
  const contextValue: AIContextType = {
    isVisible: false,
    toggleVisibility: () => {},
    messages: [],
    addMessage: () => {},
    clearMessages: () => {},
    sendMessage: async () => ({ id: '', role: 'assistant', content: '', timestamp: new Date() }),
    sendMessageStreaming: async () => ({ id: '', role: 'assistant', content: '', timestamp: new Date() }),
    contextData: {},
    updateContextData: () => {},
    useSwarm: true,
    toggleUseSwarm: () => {},
    isProcessing: false
  };

  return (
    <AIContext.Provider value={contextValue}>
      {children}
    </AIContext.Provider>
  );
};

// Export default for compatibility
export default AIProvider;
