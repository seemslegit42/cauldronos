import React, { useState } from 'react';
import { Button, Tooltip, Modal, Space, Typography, Divider } from '@cauldronos/ui';
import { RobotOutlined, LoadingOutlined, CloseOutlined, ThunderboltOutlined } from '@ant-design/icons';
import AIOutputBlock, { AIOutputType } from './AIOutputBlock';
import { useAI } from '../AIProvider';
import { useAIAssistant } from '../store/aiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

const { Text, Title, Paragraph } = Typography;

// Define Zod schema for AIAction
const AIActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  icon: z.any().optional(),
  prompt: z.string(),
  contextData: z.record(z.any()).optional(),
  outputType: z.enum([
    'text', 'markdown', 'code', 'table', 
    'list', 'action', 'error', 'loading', 'empty'
  ]).optional()
});

export type AIAction = z.infer<typeof AIActionSchema>;

// Define Zod schema for AIActionButtonProps
const AIActionButtonPropsSchema = z.object({
  action: AIActionSchema,
  size: z.enum(['small', 'middle', 'large']).optional(),
  type: z.enum(['default', 'primary', 'ghost', 'dashed', 'link', 'text']).optional(),
  shape: z.enum(['default', 'circle', 'round']).optional(),
  className: z.string().optional(),
  style: z.record(z.any()).optional(),
  showLabel: z.boolean().optional(),
  showTooltip: z.boolean().optional(),
  onActionComplete: z.function().args(z.any()).returns(z.void()).optional()
});

type AIActionButtonProps = z.infer<typeof AIActionButtonPropsSchema>;

/**
 * A button that triggers an AI action when clicked.
 * It opens a modal to display the AI's response.
 * This implementation uses Zustand for state management and React Query for data fetching.
 */
const AIActionButton: React.FC<AIActionButtonProps> = ({
  action,
  size = 'middle',
  type = 'default',
  shape = 'default',
  className = '',
  style = {},
  showLabel = true,
  showTooltip = true,
  onActionComplete
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [outputType, setOutputType] = useState<AIOutputType>('loading');
  
  // Get AI context from the provider and store
  const { contextData: globalContextData, isProcessing } = useAI();
  const { 
    addMessage, 
    useSwarm, 
    updateContextData, 
    sendMessage,
    sendMessageStreaming
  } = useAIAssistant();

  // Create a mutation for handling the AI action
  const actionMutation = useMutation({
    mutationFn: async () => {
      // Merge global context with action-specific context
      const mergedContext = {
        ...globalContextData,
        ...action.contextData,
        actionId: action.id,
        actionType: action.outputType || 'text'
      };
      
      // Update context data with action-specific context
      updateContextData(action.contextData || {});
      
      // Add user message to the conversation
      addMessage({
        role: 'user',
        content: action.prompt,
      });
      
      // Use the appropriate output type
      const outputType = action.outputType || 'text';
      
      // Send the message to the AI
      const response = await sendMessage(action.prompt, mergedContext);
      
      // Process the response based on the expected output type
      let processedResult;
      
      // If the response contains structured data in the content field
      if (response.content && typeof response.content === 'string') {
        try {
          // Check if the content is JSON
          if (response.content.trim().startsWith('{') || response.content.trim().startsWith('[')) {
            const jsonData = JSON.parse(response.content);
            
            // If the action expects a table or list or action output
            if (outputType === 'table' || outputType === 'list' || outputType === 'action') {
              processedResult = jsonData;
            } else {
              // For other types, keep the original content
              processedResult = response.content;
            }
          } else {
            // Not JSON, use as is
            processedResult = response.content;
          }
        } catch (e) {
          // If JSON parsing fails, use the content as is
          processedResult = response.content;
        }
      } else {
        // Use the response content directly
        processedResult = response.content;
      }
      
      return { result: processedResult, outputType };
    },
    onSuccess: (data) => {
      setResult(data.result);
      setOutputType(data.outputType as AIOutputType);
      
      // Call the completion callback if provided
      if (onActionComplete) {
        onActionComplete(data.result);
      }
    },
    onError: (error) => {
      console.error('Error executing AI action:', error);
      setResult('Sorry, there was an error processing your request. Please try again.');
      setOutputType('error');
    }
  });

  // Handle button click
  const handleClick = () => {
    setIsModalVisible(true);
    setOutputType('loading');
    setResult('Processing your request...');
    actionMutation.mutate();
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Determine which icon to use
  const buttonIcon = action.icon || (useSwarm ? <ThunderboltOutlined /> : <RobotOutlined />);

  // Render the button with optional tooltip
  const button = (
    <Button
      type={type}
      size={size}
      shape={shape}
      icon={buttonIcon}
      onClick={handleClick}
      className={`ai-action-button ${className}`}
      style={style}
      loading={actionMutation.isPending}
    >
      {showLabel && action.label}
    </Button>
  );

  return (
    <>
      {showTooltip ? (
        <Tooltip title={action.description}>
          {button}
        </Tooltip>
      ) : button}

      <Modal
        title={
          <div className="flex items-center">
            {action.icon || (useSwarm ? <ThunderboltOutlined className="mr-2" /> : <RobotOutlined className="mr-2" />)}
            <span>{action.label}</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
        className="ai-action-modal"
        closeIcon={<CloseOutlined />}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Paragraph className="mb-4">
              {action.description}
            </Paragraph>

            <Divider />

            <AIOutputBlock
              type={outputType}
              content={result}
              isStreaming={actionMutation.isPending && (outputType === 'text' || outputType === 'markdown')}
              title={actionMutation.isPending ? "Processing..." : "Result"}
            />
          </motion.div>
        </AnimatePresence>
      </Modal>
    </>
  );
};

export default AIActionButton;
