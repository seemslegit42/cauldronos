import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { create } from 'zustand';
import { AIMessage } from '../components/FloatingAIAssistant';
import GroqSwarmLanggraphService, { LanggraphWorkflow } from '../services/GroqSwarmLanggraphService';

// Define the store state
interface GroqSwarmLanggraphState {
  messages: AIMessage[];
  isLoading: boolean;
  error: Error | null;
  currentNodeId: string | null;
  nodeHistory: string[];
  addMessage: (message: AIMessage) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setCurrentNodeId: (nodeId: string | null) => void;
  addToNodeHistory: (nodeId: string) => void;
  resetState: () => void;
}

// Create a Zustand store for managing state
const useGroqSwarmLanggraphStore = create<GroqSwarmLanggraphState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  currentNodeId: null,
  nodeHistory: [],
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setCurrentNodeId: (nodeId) => set({ currentNodeId: nodeId }),
  addToNodeHistory: (nodeId) => set((state) => ({ 
    nodeHistory: [...state.nodeHistory, nodeId] 
  })),
  resetState: () => set({ 
    messages: [], 
    isLoading: false, 
    error: null, 
    currentNodeId: null,
    nodeHistory: []
  })
}));

// Define the hook options
interface UseGroqSwarmLanggraphOptions {
  apiUrl?: string;
  apiKey?: string;
  onMessageReceived?: (message: AIMessage) => void;
  onNodeTransition?: (nodeId: string, nodeName: string) => void;
  onError?: (error: Error) => void;
}

/**
 * A hook for using the Groq Swarm Langgraph service
 * @param options The hook options
 * @returns The hook result
 */
export function useGroqSwarmLanggraph(options: UseGroqSwarmLanggraphOptions = {}) {
  const { 
    apiUrl = '/api/ai/swarm/langgraph', 
    apiKey = '',
    onMessageReceived,
    onNodeTransition,
    onError
  } = options;

  // Create the service
  const [service] = useState(() => new GroqSwarmLanggraphService(apiUrl, apiKey));

  // Get state from the store
  const { 
    messages, 
    isLoading, 
    error, 
    currentNodeId,
    nodeHistory,
    addMessage, 
    setLoading, 
    setError,
    setCurrentNodeId,
    addToNodeHistory,
    resetState
  } = useGroqSwarmLanggraphStore();

  // Create a mutation for executing a workflow
  const { mutateAsync: executeWorkflow } = useMutation({
    mutationFn: async ({ 
      workflow, 
      input, 
      context = {} 
    }: { 
      workflow: LanggraphWorkflow; 
      input: string; 
      context?: Record<string, any>; 
    }) => {
      return service.executeWorkflow(workflow, input, context);
    },
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      addMessage(data);
      onMessageReceived?.(data);
    },
    onError: (error: Error) => {
      setError(error);
      onError?.(error);
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  // Create a function for executing a workflow with streaming
  const executeWorkflowStreaming = useCallback(async (
    workflow: LanggraphWorkflow,
    input: string,
    context: Record<string, any> = {}
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Add the user message
      const userMessage: AIMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: input,
        timestamp: new Date(),
        type: 'text'
      };
      addMessage(userMessage);

      // Create a placeholder for the assistant message
      const placeholderId = `assistant-${Date.now()}`;
      const placeholderMessage: AIMessage = {
        id: placeholderId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        type: 'text',
        isStreaming: true
      };
      addMessage(placeholderMessage);

      // Execute the workflow with streaming
      const finalMessage = await service.executeWorkflowStreaming(
        workflow,
        input,
        context,
        (chunk) => {
          if (chunk.type === 'node_transition') {
            setCurrentNodeId(chunk.nodeId);
            addToNodeHistory(chunk.nodeId);
            onNodeTransition?.(chunk.nodeId, chunk.node.name);
          }

          if (chunk.type === 'content') {
            // Update the placeholder message with the accumulated content
            const updatedMessage: AIMessage = {
              ...placeholderMessage,
              content: chunk.accumulatedContent,
              type: chunk.accumulatedContent.includes('```') ? 'markdown' : 'text'
            };
            
            // Replace the placeholder message with the updated message
            useGroqSwarmLanggraphStore.setState((state) => ({
              messages: state.messages.map((msg) => 
                msg.id === placeholderId ? updatedMessage : msg
              )
            }));
          }
        }
      );

      // Replace the placeholder message with the final message
      useGroqSwarmLanggraphStore.setState((state) => ({
        messages: state.messages.map((msg) => 
          msg.id === placeholderId ? { ...finalMessage, id: placeholderId } : msg
        )
      }));

      onMessageReceived?.(finalMessage);
      return finalMessage;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      setError(errorObj);
      onError?.(errorObj);
      throw errorObj;
    } finally {
      setLoading(false);
    }
  }, [service, addMessage, setLoading, setError, onMessageReceived, onError, setCurrentNodeId, addToNodeHistory, onNodeTransition]);

  // Create a function for sending a message to a reasoning workflow
  const sendMessageToReasoningWorkflow = useCallback(async (
    message: string,
    context: Record<string, any> = {}
  ) => {
    // Create a reasoning workflow
    const workflow = service.createReasoningWorkflow(message);
    
    // Add the user message
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
      type: 'text'
    };
    addMessage(userMessage);
    
    // Execute the workflow with streaming
    return executeWorkflowStreaming(workflow, message, context);
  }, [service, addMessage, executeWorkflowStreaming]);

  // Create a function for sending a message to a research workflow
  const sendMessageToResearchWorkflow = useCallback(async (
    message: string,
    context: Record<string, any> = {}
  ) => {
    // Create a research workflow
    const workflow = service.createResearchWorkflow(message);
    
    // Add the user message
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
      type: 'text'
    };
    addMessage(userMessage);
    
    // Execute the workflow with streaming
    return executeWorkflowStreaming(workflow, message, context);
  }, [service, addMessage, executeWorkflowStreaming]);

  return {
    messages,
    isLoading,
    error,
    currentNodeId,
    nodeHistory,
    executeWorkflow,
    executeWorkflowStreaming,
    sendMessageToReasoningWorkflow,
    sendMessageToResearchWorkflow,
    resetConversation: resetState,
    service
  };
}

export default useGroqSwarmLanggraph;