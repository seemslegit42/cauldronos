import { useState, useCallback, useEffect, useRef } from 'react';
import { useAIStore } from '../store/aiStore';
import { AIMessage } from '../components/FloatingAIAssistant';
import { WorkflowContext, WorkflowStage } from '../services/ConversationalWorkflowService';
import { Message, useChat, UseChatOptions } from 'ai';
import ConversationalWorkflowService from '../services/ConversationalWorkflowService';

/**
 * Hook options for useConversationalWorkflow
 */
interface UseConversationalWorkflowOptions {
  initialContext?: Partial<WorkflowContext>;
  onMessageReceived?: (message: AIMessage) => void;
  onError?: (error: Error) => void;
  onStageChange?: (stage: WorkflowStage) => void;
  useLocalProcessing?: boolean;
  apiEndpoint?: string;
}

/**
 * Hook for using the conversational workflow in React components
 */
export const useConversationalWorkflow = (options: UseConversationalWorkflowOptions = {}) => {
  // Destructure options
  const { 
    initialContext = {}, 
    onMessageReceived, 
    onError,
    onStageChange,
    useLocalProcessing = false,
    apiEndpoint = '/api/conversationalWorkflow'
  } = options;
  
  // State for messages and loading
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [streamingContent, setStreamingContent] = useState<string>('');
  
  // Get the AI store
  const { 
    addMessageToConversation, 
    setCurrentWorkflowStage,
    activeConversationId
  } = useAIStore();
  
  // State for the workflow context
  const [workflowContext, setWorkflowContext] = useState<WorkflowContext>({
    stage: WorkflowStage.INITIAL,
    history: [],
    metadata: {},
    ...initialContext
  });
  
  // Create a ref for the workflow service for local processing
  const workflowServiceRef = useRef<ConversationalWorkflowService | null>(null);
  
  // Initialize the workflow service if using local processing
  useEffect(() => {
    if (useLocalProcessing && !workflowServiceRef.current) {
      workflowServiceRef.current = new ConversationalWorkflowService();
    }
  }, [useLocalProcessing]);
  
  // Use the Vercel AI SDK's useChat hook for API-based processing
  const {
    messages: chatMessages,
    append: appendMessage,
    isLoading: isChatLoading,
    error: chatError,
    setMessages: setChatMessages,
    reload: reloadChat
  } = useChat({
    api: apiEndpoint,
    id: activeConversationId || undefined,
    body: {
      context: workflowContext
    },
    onResponse: (response) => {
      // Handle streaming response if needed
    },
    onFinish: (message) => {
      // Convert the message to our format
      const aiMessage: AIMessage = {
        id: message.id,
        role: 'assistant',
        content: message.content,
        timestamp: new Date(),
        type: message.content.includes('```') ? 'markdown' : 'text',
        metadata: {
          stage: workflowContext.stage,
          workflow: true
        }
      };
      
      // Add the message to our state
      setMessages(prev => [...prev, aiMessage]);
      
      // Add the message to the active conversation if available
      if (activeConversationId) {
        addMessageToConversation(activeConversationId, aiMessage);
      }
      
      // Call the onMessageReceived callback if provided
      if (onMessageReceived) {
        onMessageReceived(aiMessage);
      }
    },
    onError: (err) => {
      setError(err);
      if (onError) onError(err);
    }
  });
  
  // Update the workflow stage when it changes
  useEffect(() => {
    if (onStageChange && workflowContext.stage) {
      onStageChange(workflowContext.stage);
    }
    
    // Update the global workflow stage
    setCurrentWorkflowStage(workflowContext.stage);
  }, [workflowContext.stage, onStageChange, setCurrentWorkflowStage]);
  
  /**
   * Process a message locally using the workflow service
   */
  const processMessageLocally = async (content: string, userMessage: AIMessage): Promise<AIMessage> => {
    if (!workflowServiceRef.current) {
      throw new Error('Workflow service not initialized');
    }
    
    // Update the workflow context with the new message
    const updatedContext: WorkflowContext = {
      ...workflowContext,
      history: [...workflowContext.history, userMessage]
    };
    
    // Process the message
    const aiMessage = await workflowServiceRef.current.processMessage(content, updatedContext);
    
    // Update the workflow context
    setWorkflowContext({
      ...updatedContext,
      stage: aiMessage.metadata?.stage || updatedContext.stage,
      history: [...updatedContext.history, aiMessage]
    });
    
    return aiMessage;
  };
  
  /**
   * Send a message to the conversational workflow
   */
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    // Create the user message
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      type: 'text'
    };
    
    // Update the messages state
    setMessages(prev => [...prev, userMessage]);
    
    // Add the message to the active conversation if available
    if (activeConversationId) {
      addMessageToConversation(activeConversationId, userMessage);
    }
    
    // Set loading state
    setIsLoading(true);
    setError(null);
    
    try {
      let aiMessage: AIMessage;
      
      if (useLocalProcessing) {
        // Process the message locally
        aiMessage = await processMessageLocally(content, userMessage);
      } else {
        // Process the message via API using the useChat hook
        await appendMessage({
          role: 'user',
          content,
          id: userMessage.id
        });
        
        // The response will be handled by the onFinish callback of useChat
        // Return early as we don't need to update state here
        return userMessage;
      }
      
      // Update the messages state (only for local processing)
      if (useLocalProcessing) {
        setMessages(prev => [...prev, aiMessage]);
        
        // Add the message to the active conversation if available
        if (activeConversationId) {
          addMessageToConversation(activeConversationId, aiMessage);
        }
        
        // Call the onMessageReceived callback if provided
        if (onMessageReceived) {
          onMessageReceived(aiMessage);
        }
      }
      
      return aiMessage;
    } catch (err) {
      console.error('Error sending message:', err);
      
      // Set the error state
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      
      // Call the onError callback if provided
      if (onError) {
        onError(error);
      }
      
      // Create an error message
      const errorMessage: AIMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        type: 'error'
      };
      
      // Update the messages state
      setMessages(prev => [...prev, errorMessage]);
      
      // Add the message to the active conversation if available
      if (activeConversationId) {
        addMessageToConversation(activeConversationId, errorMessage);
      }
      
      return errorMessage;
    } finally {
      // Clear loading state
      setIsLoading(false);
    }
  }, [
    isLoading, 
    workflowContext, 
    activeConversationId, 
    addMessageToConversation, 
    onMessageReceived, 
    onError,
    useLocalProcessing,
    appendMessage
  ]);
  
  /**
   * Reset the conversation
   */
  const resetConversation = useCallback(() => {
    setMessages([]);
    setWorkflowContext({
      stage: WorkflowStage.INITIAL,
      history: [],
      metadata: {},
      ...initialContext
    });
    setError(null);
    setStreamingContent('');
    
    // Reset the chat messages if using API
    if (!useLocalProcessing) {
      setChatMessages([]);
    }
  }, [initialContext, useLocalProcessing, setChatMessages]);
  
  /**
   * Update the workflow context
   */
  const updateWorkflowContext = useCallback((updates: Partial<WorkflowContext>) => {
    setWorkflowContext(prev => ({
      ...prev,
      ...updates
    }));
  }, []);
  
  /**
   * Determine if a message contains code blocks
   */
  const containsCodeBlock = useCallback((content: string): boolean => {
    return content.includes('```');
  }, []);
  
  /**
   * Get the current workflow stage
   */
  const getCurrentStage = useCallback((): WorkflowStage => {
    return workflowContext.stage;
  }, [workflowContext.stage]);
  
  /**
   * Get the progress percentage of the current workflow stage
   */
  const getStageProgress = useCallback((): number => {
    const stageProgressMap: Record<WorkflowStage, number> = {
      [WorkflowStage.INITIAL]: 0,
      [WorkflowStage.UNDERSTANDING]: 20,
      [WorkflowStage.PLANNING]: 40,
      [WorkflowStage.EXECUTION]: 60,
      [WorkflowStage.REFINEMENT]: 80,
      [WorkflowStage.COMPLETION]: 100
    };
    
    return stageProgressMap[workflowContext.stage] || 0;
  }, [workflowContext.stage]);
  
  // Return the hook values
  return {
    messages,
    isLoading: isLoading || isChatLoading,
    error: error || chatError,
    workflowContext,
    streamingContent,
    sendMessage,
    resetConversation,
    updateWorkflowContext,
    containsCodeBlock,
    getCurrentStage,
    getStageProgress
  };
};

export default useConversationalWorkflow;