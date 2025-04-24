import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AIMessageRequest, AIMessageResponse } from '../../schemas/ai';
import { useAIStore } from '../store/aiStore';
import { AIMessage } from '../components/FloatingAIAssistant';
import apiClient from '../../api/apiClient';

/**
 * Hook for using AI operations with React Query
 */
export function useAIQuery() {
  const queryClient = useQueryClient();
  const { 
    addMessageToConversation, 
    setIsAILoading,
    selectedModel,
    useStreaming,
    useSwarm,
    useLangGraph,
    contextData
  } = useAIStore();

  /**
   * Send a message to the AI
   */
  const sendMessage = useMutation({
    mutationFn: async ({ 
      message, 
      conversationId, 
      config = {}, 
      additionalContext = {} 
    }: {
      message: string;
      conversationId?: string;
      config?: Partial<{
        model: string;
        temperature: number;
        maxTokens: number;
        useStreaming: boolean;
        useSwarm: boolean;
        useLangGraph: boolean;
      }>;
      additionalContext?: Record<string, any>;
    }) => {
      setIsAILoading(true);
      
      // Create the request payload
      const payload: AIMessageRequest = {
        message,
        conversationId,
        config: {
          model: config.model || selectedModel,
          temperature: config.temperature || 0.7,
          maxTokens: config.maxTokens || 2048,
          useStreaming: config.useStreaming !== undefined ? config.useStreaming : useStreaming,
          useSwarm: config.useSwarm !== undefined ? config.useSwarm : useSwarm,
          useLangGraph: config.useLangGraph !== undefined ? config.useLangGraph : useLangGraph,
        },
        contextData: { ...contextData, ...additionalContext },
      };
      
      // Make the API request
      const response = await apiClient.post<AIMessageResponse>('/api/ai/message', payload);
      
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Add the message to the conversation if a conversation ID was provided
      if (variables.conversationId && data.message) {
        addMessageToConversation(variables.conversationId, data.message);
      }
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      
      setIsAILoading(false);
    },
    onError: (error) => {
      console.error('Error sending message to AI:', error);
      setIsAILoading(false);
    },
  });

  /**
   * Stream a message from the AI
   */
  const streamMessage = async ({
    message,
    conversationId,
    config = {},
    additionalContext = {},
    onChunk = () => {},
  }: {
    message: string;
    conversationId?: string;
    config?: Partial<{
      model: string;
      temperature: number;
      maxTokens: number;
      useSwarm: boolean;
      useLangGraph: boolean;
    }>;
    additionalContext?: Record<string, any>;
    onChunk?: (chunk: any) => void;
  }): Promise<AIMessage> => {
    setIsAILoading(true);
    
    try {
      // Create the request payload
      const payload = {
        message,
        conversationId,
        config: {
          model: config.model || selectedModel,
          temperature: config.temperature || 0.7,
          maxTokens: config.maxTokens || 2048,
          useStreaming: true,
          useSwarm: config.useSwarm !== undefined ? config.useSwarm : useSwarm,
          useLangGraph: config.useLangGraph !== undefined ? config.useLangGraph : useLangGraph,
        },
        contextData: { ...contextData, ...additionalContext },
      };
      
      // Make the API request
      const response = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      // Process the streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }
      
      let accumulatedContent = '';
      let finalMessage: AIMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        type: 'text',
        isStreaming: true,
      };
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Convert the chunk to text
        const chunk = new TextDecoder().decode(value);
        
        try {
          // Parse the chunk as JSON
          const lines = chunk
            .split('\n')
            .filter((line) => line.trim() !== '' && line.trim() !== 'data: [DONE]');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6);
              const data = JSON.parse(jsonStr);
              
              if (data.content) {
                accumulatedContent += data.content;
                onChunk({
                  type: 'content',
                  content: data.content,
                  accumulatedContent,
                });
              }
            }
          }
        } catch (e) {
          console.error('Error parsing chunk:', e);
        }
      }
      
      // Determine the message type based on content
      let messageType: 'text' | 'markdown' | 'code' | 'error' = 'text';
      if (accumulatedContent.includes('```')) {
        messageType = 'markdown';
      }
      
      // Update the final message with the accumulated content
      finalMessage.content = accumulatedContent;
      finalMessage.type = messageType;
      finalMessage.isStreaming = false;
      
      // Add the message to the conversation if a conversation ID was provided
      if (conversationId) {
        addMessageToConversation(conversationId, finalMessage);
        
        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      }
      
      setIsAILoading(false);
      
      return finalMessage;
    } catch (error) {
      console.error('Error streaming message from AI:', error);
      setIsAILoading(false);
      
      return {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        type: 'error',
      };
    }
  };

  /**
   * Get conversations
   */
  const getConversations = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await apiClient.get<{ conversations: any[] }>('/api/ai/conversations');
      return response.data.conversations;
    },
  });

  /**
   * Get a conversation by ID
   */
  const getConversation = (id: string) => {
    return useQuery({
      queryKey: ['conversation', id],
      queryFn: async () => {
        const response = await apiClient.get<{ conversation: any }>(`/api/ai/conversations/${id}`);
        return response.data.conversation;
      },
      enabled: !!id,
    });
  };

  return {
    sendMessage,
    streamMessage,
    getConversations,
    getConversation,
  };
}