import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import LangGraphService from '../services/LangGraphService';
import { AIMessage } from '../components/FloatingAIAssistant';

/**
 * Hook for using LangGraph in React components
 */
export function useLangGraph() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Create a LangGraph service instance
  const service = new LangGraphService();
  
  // Create a reasoning workflow
  const reasoningWorkflow = service.createReasoningWorkflow('Reasoning Workflow');
  
  // Create a research workflow
  const researchWorkflow = service.createResearchWorkflow('Research Workflow');
  
  /**
   * Handle node transitions
   */
  const handleNodeTransition = useCallback((nodeId: string, nodeName: string) => {
    setCurrentNode(`${nodeName} (${nodeId})`);
  }, []);
  
  /**
   * Send a message to the reasoning workflow
   */
  const sendToReasoningWorkflow = useCallback(async (message: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message to the conversation
      const userMessage: AIMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: message,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Convert messages to LangGraph format
      const history = messages.map(msg => {
        return msg.role === 'user' ? ['human', msg.content] : ['ai', msg.content];
      });
      
      // Execute the workflow
      const response = await service.executeWorkflow(
        reasoningWorkflow,
        message,
        history,
        handleNodeTransition
      );
      
      // Add the response to the conversation
      setMessages(prev => [...prev, response]);
      
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      
      // Add error message to the conversation
      const errorMessage: AIMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
      
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  }, [messages, reasoningWorkflow, service, handleNodeTransition]);
  
  /**
   * Send a message to the research workflow
   */
  const sendToResearchWorkflow = useCallback(async (message: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message to the conversation
      const userMessage: AIMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: message,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Convert messages to LangGraph format
      const history = messages.map(msg => {
        return msg.role === 'user' ? ['human', msg.content] : ['ai', msg.content];
      });
      
      // Execute the workflow
      const response = await service.executeWorkflow(
        researchWorkflow,
        message,
        history,
        handleNodeTransition
      );
      
      // Add the response to the conversation
      setMessages(prev => [...prev, response]);
      
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      
      // Add error message to the conversation
      const errorMessage: AIMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
      
      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  }, [messages, researchWorkflow, service, handleNodeTransition]);
  
  /**
   * Clear all messages
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentNode(null);
  }, []);
  
  return {
    messages,
    currentNode,
    isLoading,
    error,
    sendToReasoningWorkflow,
    sendToResearchWorkflow,
    clearMessages,
  };
}

export default useLangGraph;