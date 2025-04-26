import { useState, useCallback } from 'react';
import { useAIAssistantStore } from '../store/aiAssistantStore';
import { sendMessage } from '../api/aiService';

// Default configuration - in a real app, these would come from environment variables
const DEFAULT_CONFIG = {
  apiUrl: 'https://api.groq.com/openai/v1',
  model: 'llama3-70b-8192',
  apiKey: process.env.GROQ_API_KEY || 'your-api-key-here' // This is just a placeholder
};

export const useAIAssistant = () => {
  const {
    isOpen,
    messages,
    currentModuleContext,
    isLoading,
    isSpeechInputActive,
    toggleOpen,
    addMessage,
    updateLastMessage,
    clearMessages,
    setIsLoading,
    setSpeechInputActive
  } = useAIAssistantStore();
  
  const [streamingContent, setStreamingContent] = useState('');
  
  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage({ role: 'user', content });
    
    // Set loading state
    setIsLoading(true);
    setStreamingContent('');
    
    // Add placeholder for assistant message
    addMessage({ role: 'assistant', content: '' });
    
    try {
      await sendMessage(
        [...messages, { id: 'temp', role: 'user', content, timestamp: Date.now() }],
        currentModuleContext,
        DEFAULT_CONFIG.apiUrl,
        DEFAULT_CONFIG.model,
        DEFAULT_CONFIG.apiKey,
        // On update (streaming)
        (newContent) => {
          setStreamingContent(newContent);
          updateLastMessage(newContent);
        },
        // On complete
        (finalContent) => {
          updateLastMessage(finalContent);
          setIsLoading(false);
          setStreamingContent('');
        },
        // On error
        (error) => {
          console.error('Error sending message:', error);
          updateLastMessage('Sorry, I encountered an error. Please try again.');
          setIsLoading(false);
          setStreamingContent('');
        }
      );
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setIsLoading(false);
      setStreamingContent('');
    }
  }, [messages, currentModuleContext, addMessage, updateLastMessage, setIsLoading]);
  
  return {
    isOpen,
    messages,
    currentModuleContext,
    isLoading,
    isSpeechInputActive,
    streamingContent,
    toggleOpen,
    sendMessage: handleSendMessage,
    clearMessages,
    setSpeechInputActive
  };
};
