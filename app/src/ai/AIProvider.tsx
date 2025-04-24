import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../workspace/operations';
import FloatingAIAssistant, { AIMessage } from './components/FloatingAIAssistant';
import GroqService from './services/GroqService';
import GroqSwarmService from './services/GroqSwarmService';

// Create service instances
const groqService = new GroqService();
const groqSwarmService = new GroqSwarmService();

// Context type
interface AIContextType {
  isVisible: boolean;
  toggleVisibility: () => void;
  messages: AIMessage[];
  addMessage: (message: AIMessage) => void;
  clearMessages: () => void;
  sendMessage: (content: string, contextData?: any) => Promise<AIMessage>;
  sendMessageStreaming: (content: string, contextData?: any, onChunk: (chunk: any) => void) => Promise<AIMessage>;
  contextData: Record<string, any>;
  updateContextData: (data: Record<string, any>) => void;
  useSwarm: boolean;
  toggleUseSwarm: () => void;
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
  toggleUseSwarm: () => {}
});

// Hook to use the AI context
export const useAI = () => useContext(AIContext);

interface AIProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that makes the AI functionality available throughout the application.
 * It manages the state of the AI and provides methods to interact with it.
 */
export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  // State
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [contextData, setContextData] = useState<Record<string, any>>({});
  const [useSwarm, setUseSwarm] = useState(true);
  
  // Get current location, auth, and workspace
  const location = useLocation();
  const { data: user } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  
  // Update context data when location, user, or workspace changes
  useEffect(() => {
    setContextData(prev => ({
      ...prev,
      currentPath: location.pathname,
      currentPage: getPageNameFromPath(location.pathname),
      userRole: user?.role || 'USER',
      userId: user?.id,
      userName: user?.username,
      workspaceId: currentWorkspace?.id,
      workspaceName: currentWorkspace?.name
    }));
  }, [location, user, currentWorkspace]);
  
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
  
  // Toggle between Groq and Groq Swarm
  const toggleUseSwarm = () => {
    setUseSwarm(!useSwarm);
  };
  
  // Send a message and get a response
  const sendMessage = async (content: string, additionalContext?: any): Promise<AIMessage> => {
    // Add user message to the conversation
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      type: 'text'
    };
    addMessage(userMessage);
    
    // Merge context data
    const mergedContext = { ...contextData, ...additionalContext };
    
    // Use the appropriate service based on the useSwarm flag
    const service = useSwarm ? groqSwarmService : groqService;
    const response = await service.sendMessage(content, mergedContext);
    
    // Add the response to the conversation
    addMessage(response);
    
    return response;
  };
  
  // Send a message with streaming and get a response
  const sendMessageStreaming = async (
    content: string, 
    additionalContext?: any,
    onChunk?: (chunk: any) => void
  ): Promise<AIMessage> => {
    // Add user message to the conversation
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      type: 'text'
    };
    addMessage(userMessage);
    
    // Create a placeholder for the assistant's response
    const placeholderMessage: AIMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      type: 'text',
      isStreaming: true
    };
    addMessage(placeholderMessage);
    
    // Merge context data
    const mergedContext = { ...contextData, ...additionalContext };
    
    // Use the appropriate service based on the useSwarm flag
    const service = useSwarm ? groqSwarmService : groqService;
    
    // Define the chunk handler
    const handleChunk = (chunk: any) => {
      // Update the placeholder message with the new content
      setMessages(prev => {
        const updatedMessages = [...prev];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        
        if (lastMessage.id === placeholderMessage.id) {
          if (chunk.content) {
            lastMessage.content += chunk.content;
          }
        }
        
        return updatedMessages;
      });
      
      // Call the provided chunk handler if available
      if (onChunk) {
        onChunk(chunk);
      }
    };
    
    // Send the message with streaming
    const response = await service.sendMessageStreaming(content, mergedContext, handleChunk);
    
    // Replace the placeholder message with the final response
    setMessages(prev => {
      const updatedMessages = [...prev];
      const lastMessageIndex = updatedMessages.findIndex(msg => msg.id === placeholderMessage.id);
      
      if (lastMessageIndex !== -1) {
        updatedMessages[lastMessageIndex] = {
          ...response,
          id: placeholderMessage.id
        };
      }
      
      return updatedMessages;
    });
    
    return response;
  };
  
  // Update context data
  const updateContextData = (data: Record<string, any>) => {
    setContextData(prev => ({ ...prev, ...data }));
  };
  
  // Create context value
  const contextValue: AIContextType = {
    isVisible,
    toggleVisibility,
    messages,
    addMessage,
    clearMessages,
    sendMessage,
    sendMessageStreaming,
    contextData,
    updateContextData,
    useSwarm,
    toggleUseSwarm
  };
  
  return (
    <AIContext.Provider value={contextValue}>
      {children}
      <FloatingAIAssistant
        initialMessages={messages}
        onSendMessage={sendMessageStreaming}
        contextData={contextData}
      />
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
