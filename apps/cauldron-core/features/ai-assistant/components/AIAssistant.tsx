import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIBubble } from './AIBubble';
import { AIConversation } from './AIConversation';
import { AIInput } from './AIInput';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { useAIAssistantStore } from '../store/aiAssistantStore';

export const AIAssistant: React.FC = () => {
  const { isOpen, toggleOpen } = useAIAssistantStore();
  const { sendMessage, isLoading } = useAIAssistant();
  
  // Handle keyboard shortcut to toggle assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+A to toggle assistant
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        toggleOpen();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleOpen]);
  
  return (
    <>
      <AIBubble />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-assistant-container"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="ai-assistant-header">
              <h3>AI Assistant</h3>
              <div className="ai-assistant-subtitle">
                Ask me anything about the application
              </div>
            </div>
            
            <div className="ai-assistant-content">
              <AIConversation />
            </div>
            
            <div className="ai-assistant-footer">
              <AIInput onSend={sendMessage} isLoading={isLoading} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
