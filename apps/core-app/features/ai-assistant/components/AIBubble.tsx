import React from 'react';
import { Button } from 'antd';
import { RobotOutlined, CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIAssistant } from '../hooks/useAIAssistant';

export const AIBubble: React.FC = () => {
  const { isOpen, toggleOpen } = useAIAssistant();
  
  return (
    <motion.div
      className="ai-bubble-container"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={isOpen ? <CloseOutlined /> : <RobotOutlined />}
        onClick={toggleOpen}
        className="ai-bubble-button"
      />
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="ai-bubble-hint"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ delay: 0.2 }}
          >
            Ask me anything
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
