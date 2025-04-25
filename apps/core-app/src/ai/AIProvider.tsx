import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../workspace/operations';
import FloatingAIAssistant from './components/FloatingAIAssistant';
import { useAIAssistant, AIMessage } from '../store/aiStore';
import { useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

// Context type
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
  // Get state and actions from the Zustand store
  const {
    isOpen,
    toggle,
    messages,
    addMessage,
    clearMessages,
    useSwarm,
    toggleUseSwarm,
    contextData,
    updateContextData,
    sendMessage,
    sendMessageStreaming,
    isProcessing
  } = useAIAssistant();
  
  // Get React Query client for potential cache invalidation
  const queryClient = useQueryClient();
  
  // Get current location, auth, and workspace
  const location = useLocation();
  const { data: user } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  
  // Update context data when location, user, or workspace changes
  useEffect(() => {
    updateContextData({
      currentPath: location.pathname,
      currentPage: getPageNameFromPath(location.pathname),
      userRole: user?.role || 'USER',
      userId: user?.id,
      userName: user?.username,
      workspaceId: currentWorkspace?.id,
      workspaceName: currentWorkspace?.name
    });
  }, [location, user, currentWorkspace, updateContextData]);
  
  // Create context value from the Zustand store
  const contextValue: AIContextType = {
    isVisible: isOpen,
    toggleVisibility: toggle,
    messages,
    addMessage,
    clearMessages,
    sendMessage,
    sendMessageStreaming,
    contextData,
    updateContextData,
    useSwarm,
    toggleUseSwarm,
    isProcessing
  };
  
  return (
    <AIContext.Provider value={contextValue}>
      <AnimatePresence>
        {children}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FloatingAIAssistant
          initialMessages={messages}
          onSendMessage={sendMessageStreaming}
          contextData={contextData}
        />
      </motion.div>
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
