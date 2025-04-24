import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Input, Button, Space, Typography, Divider, Row, Col, Select } from 'antd';
import { SendOutlined, ReloadOutlined } from '@ant-design/icons';
import { XChat, XChatList, XChatItem, XBubble, XChatMessage, XChatInput } from '@ant-design/x';
import useGroqSwarmLanggraph from '../hooks/useGroqSwarmLanggraph';
import LanggraphVisualizer from './LanggraphVisualizer';
import { AIMessage } from './FloatingAIAssistant';
import { LanggraphWorkflow } from '../services/GroqSwarmLanggraphService';

const { Title, Text } = Typography;
const { Option } = Select;

interface GroqSwarmLanggraphChatProps {
  title?: string;
  description?: string;
  initialContext?: Record<string, any>;
  onMessageReceived?: (message: AIMessage) => void;
  onNodeTransition?: (nodeId: string, nodeName: string) => void;
  className?: string;
  style?: React.CSSProperties;
  height?: number | string;
  showVisualizer?: boolean;
  apiUrl?: string;
  apiKey?: string;
  customWorkflows?: LanggraphWorkflow[];
}

/**
 * A component for chatting with Groq Swarm using Langgraph
 */
const GroqSwarmLanggraphChat: React.FC<GroqSwarmLanggraphChatProps> = ({
  title = 'Groq Swarm Langgraph Chat',
  description = 'Chat with Groq Swarm using Langgraph for complex reasoning',
  initialContext = {},
  onMessageReceived,
  onNodeTransition,
  className,
  style,
  height = 600,
  showVisualizer = true,
  apiUrl,
  apiKey,
  customWorkflows = []
}) => {
  const [inputValue, setInputValue] = useState('');
  const [workflowType, setWorkflowType] = useState<'reasoning' | 'research' | 'custom'>('reasoning');
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState<number>(0);
  const chatListRef = useRef<HTMLDivElement>(null);

  // Use the Groq Swarm Langgraph hook
  const {
    messages,
    isLoading,
    error,
    currentNodeId,
    nodeHistory,
    sendMessageToReasoningWorkflow,
    sendMessageToResearchWorkflow,
    executeWorkflowStreaming,
    resetConversation,
    service
  } = useGroqSwarmLanggraph({
    apiUrl,
    apiKey,
    onMessageReceived,
    onNodeTransition
  });

  // Get the current workflow
  const currentWorkflow = customWorkflows[selectedWorkflowIndex];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    try {
      if (workflowType === 'reasoning') {
        await sendMessageToReasoningWorkflow(inputValue, initialContext);
      } else if (workflowType === 'research') {
        await sendMessageToResearchWorkflow(inputValue, initialContext);
      } else if (workflowType === 'custom' && currentWorkflow) {
        await executeWorkflowStreaming(currentWorkflow, inputValue, initialContext);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInputValue('');
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle workflow type change
  const handleWorkflowTypeChange = (value: string) => {
    setWorkflowType(value as 'reasoning' | 'research' | 'custom');
  };

  // Handle custom workflow selection
  const handleCustomWorkflowChange = (value: number) => {
    setSelectedWorkflowIndex(value);
  };

  // Get the current graph
  const currentGraph = (() => {
    if (workflowType === 'reasoning') {
      return service.createReasoningWorkflow('').graph;
    } else if (workflowType === 'research') {
      return service.createResearchWorkflow('').graph;
    } else if (workflowType === 'custom' && currentWorkflow) {
      return currentWorkflow.graph;
    }
    return null;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
      style={{ ...style, height }}
    >
      <Row gutter={16} style={{ height: '100%' }}>
        <Col span={showVisualizer ? 16 : 24} style={{ height: '100%' }}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: 16 }}>
              <Title level={4}>{title}</Title>
              <Text type="secondary">{description}</Text>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Space>
                <Text>Workflow Type:</Text>
                <Select
                  value={workflowType}
                  onChange={handleWorkflowTypeChange}
                  style={{ width: 150 }}
                  disabled={isLoading}
                >
                  <Option value="reasoning">Reasoning</Option>
                  <Option value="research">Research</Option>
                  {customWorkflows.length > 0 && (
                    <Option value="custom">Custom</Option>
                  )}
                </Select>

                {workflowType === 'custom' && customWorkflows.length > 0 && (
                  <Select
                    value={selectedWorkflowIndex}
                    onChange={handleCustomWorkflowChange}
                    style={{ width: 200 }}
                    disabled={isLoading}
                  >
                    {customWorkflows.map((workflow, index) => (
                      <Option key={index} value={index}>
                        {workflow.name}
                      </Option>
                    ))}
                  </Select>
                )}

                <Button
                  icon={<ReloadOutlined />}
                  onClick={resetConversation}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              </Space>
            </div>

            <Divider style={{ margin: '8px 0' }} />

            <div
              ref={chatListRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '8px 0',
                marginBottom: 16
              }}
            >
              <XChat>
                <XChatList>
                  {messages.map((message) => (
                    <XChatItem
                      key={message.id}
                      type={message.role === 'user' ? 'self' : 'others'}
                    >
                      <XBubble>
                        <XChatMessage
                          type={message.type === 'markdown' ? 'markdown' : 'text'}
                          content={message.content}
                          loading={message.isStreaming}
                        />
                      </XBubble>
                    </XChatItem>
                  ))}
                </XChatList>
              </XChat>
            </div>

            <div>
              <XChatInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSend={handleSendMessage}
                disabled={isLoading}
                placeholder="Type your message..."
              />
            </div>

            {error && (
              <div style={{ marginTop: 16 }}>
                <Text type="danger">Error: {error.message}</Text>
              </div>
            )}
          </Card>
        </Col>

        {showVisualizer && currentGraph && (
          <Col span={8} style={{ height: '100%' }}>
            <LanggraphVisualizer
              graph={currentGraph}
              currentNodeId={currentNodeId}
              nodeHistory={nodeHistory}
              style={{ height: '100%' }}
            />
          </Col>
        )}
      </Row>
    </motion.div>
  );
};

export default GroqSwarmLanggraphChat;