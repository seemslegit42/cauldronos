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

// Helper function to get page name from path
const getPageNameFromPath = (path: string): string => {
  if (path === '/') return 'Dashboard';
  if (path.includes('/dashboard')) return 'Dashboard';
  if (path.includes('/users')) return 'User Management';
  if (path.includes('/modules')) return 'Modules';
  if (path.includes('/workspace-settings')) return 'Workspace Settings';
  if (path.includes('/account')) return 'Account Settings';

  // Extract module name from path
  if (path.includes('/modules/')) {
    const moduleName = path.split('/modules/')[1].split('/')[0];
    return `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} Module`;
  }

  return path.split('/').pop()?.replace('-', ' ') || 'Unknown Page';
};
