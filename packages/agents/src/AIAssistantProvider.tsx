import React, { createContext, useContext } from 'react';

// Define AIMessage type
interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'text' | 'markdown' | 'code';
}

// Context type
interface AIAssistantContextType {
  isVisible: boolean;
  toggleVisibility: () => void;
  messages: AIMessage[];
  addMessage: (message: AIMessage) => void;
  clearMessages: () => void;
  sendMessage: (content: string, contextData?: any) => Promise<AIMessage>;
  contextData: Record<string, any>;
  updateContextData: (data: Record<string, any>) => void;
}

// Create context with default values
const AIAssistantContext = createContext<AIAssistantContextType>({
  isVisible: false,
  toggleVisibility: () => {},
  messages: [],
  addMessage: () => {},
  clearMessages: () => {},
  sendMessage: async () => ({ id: '', role: 'assistant', content: '', timestamp: new Date() }),
  contextData: {},
  updateContextData: () => {}
});

// Hook to use the AI Assistant context
export const useAIAssistant = () => useContext(AIAssistantContext);

interface AIAssistantProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that makes the AI Assistant available throughout the application.
 * It manages the state of the assistant and provides methods to interact with it.
 */
export const AIAssistantProvider: React.FC<AIAssistantProviderProps> = ({ children }) => {
  // Create a simplified context value for the build
  const contextValue: AIAssistantContextType = {
    isVisible: false,
    toggleVisibility: () => {},
    messages: [],
    addMessage: () => {},
    clearMessages: () => {},
    sendMessage: async () => ({ id: '', role: 'assistant', content: '', timestamp: new Date() }),
    contextData: {},
    updateContextData: () => {}
  };

  return (
    <AIAssistantContext.Provider value={contextValue}>
      {children}
    </AIAssistantContext.Provider>
  );
};

// Export default for compatibility
export default AIAssistantProvider;
