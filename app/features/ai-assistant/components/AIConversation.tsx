import React, { useRef, useEffect } from 'react';
import { Bubble } from '@ant-design/x';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { motion } from 'framer-motion';

export const AIConversation: React.FC = () => {
  const { messages, isLoading } = useAIAssistant();
  const conversationEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  return (
    <div className="ai-conversation-container">
      <Bubble.List
        autoScroll
        items={messages.map((msg, index) => ({
          key: msg.id,
          content: msg.content,
          placement: msg.role === 'user' ? 'end' : 'start',
          avatar: msg.role === 'user' ? null : (
            <div className="ai-avatar">AI</div>
          ),
          typing: msg.role === 'assistant' && index === messages.length - 1 && isLoading,
          variant: 'filled',
          shape: 'round',
        }))}
      />
      
      <div ref={conversationEndRef} />
    </div>
  );
};
