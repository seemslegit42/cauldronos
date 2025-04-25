import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  XChat, 
  XChatItem, 
  XChatInput, 
  XChatList, 
  XChatMessage, 
  XBubble,
  XStream,
  XChatInputActionProps,
  XChatInputProps,
  XChatListProps,
  XChatMessageProps,
  XChatItemProps,
  XChatProps
} from '@ant-design/x';
import { Card, Typography, Tag, Space, Spin, Button, Tooltip, Dropdown, Menu, Progress } from 'antd';
import { 
  SendOutlined, 
  RobotOutlined, 
  UserOutlined, 
  InfoCircleOutlined,
  ReloadOutlined,
  SettingOutlined,
  BranchesOutlined,
  MoreOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExportOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import ConversationalWorkflowService, { 
  WorkflowStage, 
  WorkflowContext 
} from '../services/ConversationalWorkflowService';
import { AIMessage } from '../components/FloatingAIAssistant';
import { useAIStore } from '../store/aiStore';
import useConversationalWorkflow from '../hooks/useConversationalWorkflow';

const { Title, Text, Paragraph } = Typography;

// Define the props for the ConversationalWorkflow component
interface ConversationalWorkflowProps {
  title?: string;
  description?: string;
  initialContext?: Partial<WorkflowContext>;
  onMessageSent?: (message: string) => void;
  onMessageReceived?: (message: AIMessage) => void;
  onStageChange?: (stage: WorkflowStage) => void;
  className?: string;
  style?: React.CSSProperties;
  showStageIndicator?: boolean;
  showStageProgress?: boolean;
  height?: number | string;
  useApi?: boolean;
}

/**
 * ConversationalWorkflow - A component for conversational AI workflows
 * using Ant Design X and Groq
 */
const ConversationalWorkflow: React.FC<ConversationalWorkflowProps> = ({
  title = 'AI Conversation',
  description = 'Have a conversation with the AI assistant',
  initialContext = {},
  onMessageSent,
  onMessageReceived,
  onStageChange,
  className,
  style,
  showStageIndicator = true,
  showStageProgress = true,
  height = 500,
  useApi = false
}) => {
  // Use the conversational workflow hook
  const {
    messages,
    isLoading,
    error,
    workflowContext,
    sendMessage,
    resetConversation,
    updateWorkflowContext
  } = useConversationalWorkflow({
    initialContext,
    onMessageReceived,
    onStageChange,
    onError: (error) => console.error('Workflow error:', error)
  });
  
  // Local state
  const [inputValue, setInputValue] = useState<string>('');
  const [streamingContent, setStreamingContent] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  
  // Get the AI store
  const { setActiveConversation } = useAIStore();
  
  // Initialize the conversation in the AI store
  useEffect(() => {
    setActiveConversation({
      id: `workflow-${Date.now()}`,
      title: title,
      messages: []
    });
  }, [title, setActiveConversation]);
  
  // Handle sending a message
  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    // Call the onMessageSent callback if provided
    if (onMessageSent) {
      onMessageSent(content);
    }
    
    // Clear the input
    setInputValue('');
    
    // Start streaming indicator
    setIsStreaming(true);
    setStreamingContent('');
    
    // Send the message
    await sendMessage(content);
    
    // End streaming indicator
    setIsStreaming(false);
  }, [isLoading, onMessageSent, sendMessage]);
  
  // Handle input key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  }, [handleSendMessage, inputValue]);
  
  // Get the stage color
  const getStageColor = (stage: WorkflowStage): string => {
    switch (stage) {
      case WorkflowStage.INITIAL:
        return 'blue';
      case WorkflowStage.UNDERSTANDING:
        return 'cyan';
      case WorkflowStage.PLANNING:
        return 'green';
      case WorkflowStage.EXECUTION:
        return 'orange';
      case WorkflowStage.REFINEMENT:
        return 'purple';
      case WorkflowStage.COMPLETION:
        return 'magenta';
      default:
        return 'default';
    }
  };
  
  // Get the stage display name
  const getStageDisplayName = (stage: WorkflowStage): string => {
    switch (stage) {
      case WorkflowStage.INITIAL:
        return 'Initial';
      case WorkflowStage.UNDERSTANDING:
        return 'Understanding';
      case WorkflowStage.PLANNING:
        return 'Planning';
      case WorkflowStage.EXECUTION:
        return 'Execution';
      case WorkflowStage.REFINEMENT:
        return 'Refinement';
      case WorkflowStage.COMPLETION:
        return 'Completion';
      default:
        return 'Unknown';
    }
  };
  
  // Get the stage progress percentage
  const getStageProgress = (): number => {
    switch (workflowContext.stage) {
      case WorkflowStage.INITIAL:
        return 0;
      case WorkflowStage.UNDERSTANDING:
        return 20;
      case WorkflowStage.PLANNING:
        return 40;
      case WorkflowStage.EXECUTION:
        return 60;
      case WorkflowStage.REFINEMENT:
        return 80;
      case WorkflowStage.COMPLETION:
        return 100;
      default:
        return 0;
    }
  };
  
  // Handle message actions
  const handleMessageAction = (messageId: string, action: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;
    
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(message.content);
        break;
      case 'delete':
        // In a real implementation, you would remove the message
        break;
      case 'export':
        // In a real implementation, you would export the message
        break;
      default:
        break;
    }
  };
  
  // Render the component
  return (
    <Card 
      className={className}
      style={{ 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        ...style 
      }}
      title={
        <Space>
          <Title level={4} style={{ margin: 0 }}>{title}</Title>
          {showStageIndicator && (
            <Tag color={getStageColor(workflowContext.stage)}>
              {getStageDisplayName(workflowContext.stage)}
            </Tag>
          )}
        </Space>
      }
      extra={
        <Space>
          {showStageProgress && (
            <Progress 
              type="circle" 
              percent={getStageProgress()} 
              size={24} 
              strokeColor={getStageColor(workflowContext.stage)}
              style={{ marginRight: '8px' }}
            />
          )}
          <Tooltip title="Workflow Information">
            <Button 
              icon={<BranchesOutlined />} 
              type="text"
            />
          </Tooltip>
          <Tooltip title="Settings">
            <Button 
              icon={<SettingOutlined />} 
              type="text"
            />
          </Tooltip>
          <Tooltip title="Reset Conversation">
            <Button 
              icon={<ReloadOutlined />} 
              type="text"
              onClick={resetConversation}
            />
          </Tooltip>
        </Space>
      }
    >
      <Text type="secondary" style={{ marginBottom: '16px', display: 'block' }}>
        {description}
      </Text>
      
      <XChat style={{ height: typeof height === 'number' ? `${height}px` : height }}>
        <XChatList>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <XChatItem 
                  key={message.id}
                  type={message.role === 'user' ? 'self' : 'others'}
                  avatar={message.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                  actions={message.role === 'assistant' ? [
                    <Dropdown 
                      key="more" 
                      menu={{
                        items: [
                          {
                            key: 'copy',
                            label: 'Copy',
                            icon: <CopyOutlined />,
                            onClick: () => handleMessageAction(message.id, 'copy')
                          },
                          {
                            key: 'delete',
                            label: 'Delete',
                            icon: <DeleteOutlined />,
                            onClick: () => handleMessageAction(message.id, 'delete')
                          },
                          {
                            key: 'export',
                            label: 'Export',
                            icon: <ExportOutlined />,
                            onClick: () => handleMessageAction(message.id, 'export')
                          }
                        ]
                      }}
                      trigger={['click']}
                    >
                      <MoreOutlined />
                    </Dropdown>
                  ] : undefined}
                >
                  {message.type === 'markdown' ? (
                    <XBubble>
                      <XChatMessage 
                        type="markdown"
                        content={message.content}
                      />
                    </XBubble>
                  ) : message.type === 'error' ? (
                    <XBubble type="error">
                      <XChatMessage 
                        type="error"
                        content={message.content}
                      />
                    </XBubble>
                  ) : (
                    <XBubble>
                      <XChatMessage 
                        type="text"
                        content={message.content}
                      />
                    </XBubble>
                  )}
                  
                  {message.metadata?.stage && showStageIndicator && (
                    <Tag 
                      color={getStageColor(message.metadata.stage as WorkflowStage)}
                      style={{ marginTop: '8px' }}
                    >
                      {getStageDisplayName(message.metadata.stage as WorkflowStage)}
                    </Tag>
                  )}
                </XChatItem>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <XChatItem
                type="others"
                avatar={<RobotOutlined />}
              >
                {isStreaming && streamingContent ? (
                  <XStream content={streamingContent} />
                ) : (
                  <XBubble>
                    <Spin size="small" />
                  </XBubble>
                )}
              </XChatItem>
            </motion.div>
          )}
        </XChatList>
        
        <XChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={() => handleSendMessage(inputValue)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          placeholder="Type your message here..."
          actions={[
            <Tooltip key="send" title="Send Message">
              <Button 
                type="primary" 
                shape="circle" 
                icon={<SendOutlined />} 
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
              />
            </Tooltip>
          ]}
        />
      </XChat>
      
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: '16px' }}
        >
          <Tag color="red" style={{ padding: '4px 8px' }}>
            Error: {error.message}
          </Tag>
        </motion.div>
      )}
    </Card>
  );
};

export default ConversationalWorkflow;