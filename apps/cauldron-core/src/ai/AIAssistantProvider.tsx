import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FloatingAIAssistant, { AIMessage } from './components/FloatingAIAssistant';

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
  // State
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [contextData, setContextData] = useState<Record<string, any>>({});
  
  // Get current location
  const location = useLocation();
  
  // Update context data when location changes
  useEffect(() => {
    setContextData(prev => ({
      ...prev,
      currentPath: location.pathname,
      currentPage: getPageNameFromPath(location.pathname)
    }));
  }, [location]);
  
  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  // Add a message
  const addMessage = (message: AIMessage) => {
    setMessages(prev => [...prev, message]);
  };
  
  // Clear all messages
  const clearMessages = () => {
    setMessages([]);
  };
  
  // Send a message and get a response
  const sendMessage = async (content: string, additionalContext?: any): Promise<AIMessage> => {
    // In a real implementation, this would call an API endpoint
    // For now, we'll simulate a response
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a contextual response based on the input and context
    const mergedContext = { ...contextData, ...additionalContext };
    const currentPage = mergedContext.currentPage || 'unknown';
    
    let responseContent = '';
    
    // Generate response based on content and context
    if (content.toLowerCase().includes('help') || content.toLowerCase().includes('what can you do')) {
      responseContent = `I can help you with various tasks related to ${currentPage}. Here are some examples:

1. **Data Analysis**: I can analyze your data and provide insights
2. **Feature Explanations**: I can explain how different features work
3. **Recommendations**: I can suggest optimizations based on your usage
4. **Troubleshooting**: I can help you solve common issues

Just let me know what you need help with!`;
    } else if (content.toLowerCase().includes('analyze') || content.toLowerCase().includes('data')) {
      responseContent = `Based on my analysis of your ${currentPage} data:

- You've seen a 15% increase in activity over the past month
- Your most active users are in the Marketing department
- There's an opportunity to improve onboarding completion rates

Would you like me to generate a more detailed report?`;
    } else {
      responseContent = `I understand you're asking about "${content}" in the context of ${currentPage}. 

Based on your current workspace data, I can provide specific insights or take actions related to this. Would you like me to:

1. Provide more detailed information
2. Generate a report
3. Suggest specific actions

Let me know how I can best assist you.`;
    }
    
    // Create response message
    const response: AIMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      type: 'markdown'
    };
    
    // Add response to messages
    addMessage(response);
    
    return response;
  };
  
  // Update context data
  const updateContextData = (data: Record<string, any>) => {
    setContextData(prev => ({ ...prev, ...data }));
  };
  
  // Create context value
  const contextValue: AIAssistantContextType = {
    isVisible,
    toggleVisibility,
    messages,
    addMessage,
    clearMessages,
    sendMessage,
    contextData,
    updateContextData
  };
  
  return (
    <AIAssistantContext.Provider value={contextValue}>
      {children}
      <FloatingAIAssistant
        initialMessages={messages}
        onSendMessage={sendMessage}
        contextData={contextData}
      />
    </AIAssistantContext.Provider>
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
