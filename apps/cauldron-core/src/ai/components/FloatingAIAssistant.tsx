import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Card,
  Input,
  List,
  Avatar,
  Typography,
  Divider,
  Space,
  Tooltip,
  Badge,
  Popover
} from 'cauldronos-ui';
import {
  RobotOutlined,
  SendOutlined,
  UserOutlined,
  CloseOutlined,
  ExpandOutlined,
  CompressOutlined,
  PushpinOutlined,
  MinusOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined
} from 'cauldronos-ui';
import Draggable from 'react-draggable';
import { useLocation } from 'react-router-dom';
import StreamableText from './StreamableText';
import AIOutputBlock, { AIOutputType } from './AIOutputBlock';

const { Text, Paragraph, Title } = Typography;
const { TextArea } = Input;

// Message types
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string | any;
  timestamp: Date;
  type?: AIOutputType;
  isStreaming?: boolean;
}

interface FloatingAIAssistantProps {
  initialMessages?: AIMessage[];
  onSendMessage?: (message: string, contextData?: any) => Promise<AIMessage>;
  contextData?: Record<string, any>;
}

/**
 * A floating, draggable AI assistant that can be accessed from anywhere in the application.
 * It can be minimized, expanded, and pinned to different positions.
 */
const FloatingAIAssistant: React.FC<FloatingAIAssistantProps> = ({
  initialMessages = [],
  onSendMessage,
  contextData = {}
}) => {
  // State
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<AIMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<any>(null);
  const location = useLocation();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when assistant becomes visible
  useEffect(() => {
    if (isVisible && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isVisible, isMinimized]);

  // Add contextual greeting when location changes
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      const path = location.pathname;
      let greeting = "Hello! I'm your AI assistant. How can I help you today?";

      // Customize greeting based on current page
      if (path.includes('/dashboard')) {
        greeting = "I see you're on the Dashboard. Would you like me to help you analyze your data or explain any metrics?";
      } else if (path.includes('/users')) {
        greeting = "Looking at user management? I can help you analyze user behavior or suggest engagement strategies.";
      } else if (path.includes('/modules')) {
        greeting = "Browsing modules? I can recommend modules based on your usage patterns or help you configure them.";
      } else if (path.includes('/settings')) {
        greeting = "In settings? I can suggest optimal configurations or explain what different settings do.";
      }

      // Add greeting message
      setMessages([
        {
          id: `greeting-${Date.now()}`,
          role: 'assistant',
          content: greeting,
          timestamp: new Date(),
          type: 'text'
        }
      ]);
    }
  }, [location, isVisible, messages.length]);

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setIsMinimized(false);
    }
  };

  // Toggle minimized state
  const toggleMinimized = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  // Toggle expanded state
  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Toggle pinned state
  const togglePinned = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
  };

  // Handle drag stop
  const handleDragStop = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Add typing indicator
    const typingIndicator: AIMessage = {
      id: `typing-${Date.now()}`,
      role: 'assistant',
      content: 'Thinking...',
      timestamp: new Date(),
      type: 'loading'
    };

    setMessages(prev => [...prev, typingIndicator]);

    try {
      let response: AIMessage;

      if (onSendMessage) {
        // Use provided callback
        response = await onSendMessage(inputValue, {
          ...contextData,
          currentPath: location.pathname
        });
      } else {
        // Simulate response
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate a contextual response based on the input
        let responseContent = '';
        let responseType: AIOutputType = 'text';

        if (inputValue.toLowerCase().includes('analyze') || inputValue.toLowerCase().includes('report')) {
          responseContent = "I've analyzed your data and found some interesting patterns:\n\n- User engagement is up 15% this month\n- Your most active module is CRM\n- There's an opportunity to improve onboarding completion rates\n\nWould you like me to generate a detailed report?";
          responseType = 'markdown';
        } else if (inputValue.toLowerCase().includes('help') || inputValue.toLowerCase().includes('how')) {
          responseContent = "I'd be happy to help! Here are some things I can do:\n\n1. Analyze data and generate reports\n2. Explain features and settings\n3. Suggest optimizations for your workspace\n4. Help troubleshoot issues\n\nJust let me know what you need assistance with.";
          responseType = 'markdown';
        } else if (inputValue.toLowerCase().includes('code') || inputValue.toLowerCase().includes('example')) {
          responseContent = `Here's an example of how you could implement that:

\`\`\`javascript
// Example code
const analyzeData = async (dataset) => {
  const results = await processData(dataset);
  return {
    summary: generateSummary(results),
    recommendations: generateRecommendations(results),
    visualizations: generateCharts(results)
  };
};

// Usage
const analysis = await analyzeData(yourData);
console.log(analysis.summary);
\`\`\`

Would you like me to explain how this works?`;
          responseType = 'markdown';
        } else {
          responseContent = `I understand you're asking about "${inputValue}". Based on your current context, I can help you with that. Would you like me to provide more specific information or take any actions?`;
          responseType = 'text';
        }

        response = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: responseContent,
          timestamp: new Date(),
          type: responseType
        };
      }

      // Remove typing indicator and add response
      setMessages(prev => prev.filter(msg => msg.id !== typingIndicator.id));
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);

      // Remove typing indicator and add error message
      setMessages(prev => prev.filter(msg => msg.id !== typingIndicator.id));
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again.',
          timestamp: new Date(),
          type: 'error'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Clear conversation
  const handleClearConversation = () => {
    setMessages([]);
  };

  // Render message
  const renderMessage = (message: AIMessage) => {
    const isUser = message.role === 'user';

    return (
      <List.Item className={`message ${isUser ? 'user-message' : 'assistant-message'}`}>
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
          {!isUser && (
            <Avatar
              icon={<RobotOutlined />}
              style={{ backgroundColor: '#1677ff' }}
              className="mr-2 mt-1"
            />
          )}

          <div className={`message-content ${isUser ? 'ml-12' : 'mr-12'}`} style={{ maxWidth: '80%' }}>
            {isUser ? (
              <div className="bg-blue-50 p-3 rounded-lg">
                <Text>{message.content}</Text>
              </div>
            ) : (
              <div className="bg-gray-50 p-3 rounded-lg">
                {message.type === 'loading' ? (
                  <AIOutputBlock type="loading" content={message.content} />
                ) : message.type === 'markdown' || message.type === 'code' ? (
                  <AIOutputBlock
                    type={message.type}
                    content={message.content}
                    isStreaming={message.isStreaming}
                  />
                ) : (
                  <StreamableText
                    content={message.content}
                    isStreaming={message.isStreaming}
                    variant="paragraph"
                    style={{ margin: 0 }}
                  />
                )}
              </div>
            )}

            <Text type="secondary" className={`text-xs mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </div>

          {isUser && (
            <Avatar
              icon={<UserOutlined />}
              style={{ backgroundColor: '#52c41a' }}
              className="ml-2 mt-1"
            />
          )}
        </div>
      </List.Item>
    );
  };

  // Render the assistant button
  const assistantButton = (
    <Tooltip title="AI Assistant">
      <Badge dot={messages.length > 0} offset={[-5, 5]}>
        <Button
          type="primary"
          shape="circle"
          icon={<RobotOutlined />}
          size="large"
          onClick={toggleVisibility}
          className="ai-assistant-button"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        />
      </Badge>
    </Tooltip>
  );

  // Determine assistant size based on state
  const getAssistantSize = () => {
    if (isMinimized) {
      return { width: '300px', height: '60px' };
    } else if (isExpanded) {
      return { width: '600px', height: '80vh' };
    } else {
      return { width: '400px', height: '500px' };
    }
  };

  // Render the assistant
  const assistant = isVisible && (
    <Draggable
      handle=".ai-assistant-header"
      defaultPosition={{ x: 0, y: 0 }}
      position={isPinned ? position : undefined}
      onStop={handleDragStop}
      bounds="body"
      disabled={isExpanded}
    >
      <Card
        className="ai-assistant-card"
        style={{
          ...getAssistantSize(),
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          transition: 'width 0.3s, height 0.3s'
        }}
        bodyStyle={{
          padding: 0,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div
          className="ai-assistant-header"
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'move',
            backgroundColor: '#1677ff',
            color: 'white'
          }}
        >
          <div className="flex items-center">
            <RobotOutlined className="mr-2" />
            <Text strong style={{ color: 'white' }}>
              AI Assistant
            </Text>
          </div>

          <Space>
            <Tooltip title={isPinned ? 'Unpin' : 'Pin'}>
              <Button
                type="text"
                icon={<PushpinOutlined style={{ color: isPinned ? 'white' : 'rgba(255, 255, 255, 0.65)' }} />}
                size="small"
                onClick={togglePinned}
              />
            </Tooltip>

            <Tooltip title={isMinimized ? 'Expand' : 'Minimize'}>
              <Button
                type="text"
                icon={<MinusOutlined style={{ color: 'white' }} />}
                size="small"
                onClick={toggleMinimized}
              />
            </Tooltip>

            <Tooltip title={isExpanded ? 'Shrink' : 'Fullscreen'}>
              <Button
                type="text"
                icon={
                  isExpanded ? (
                    <CompressOutlined style={{ color: 'white' }} />
                  ) : (
                    <ExpandOutlined style={{ color: 'white' }} />
                  )
                }
                size="small"
                onClick={toggleExpanded}
              />
            </Tooltip>

            <Tooltip title="Close">
              <Button
                type="text"
                icon={<CloseOutlined style={{ color: 'white' }} />}
                size="small"
                onClick={toggleVisibility}
              />
            </Tooltip>
          </Space>
        </div>

        {!isMinimized && (
          <>
            <div
              className="ai-assistant-messages"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                backgroundColor: '#f9f9f9'
              }}
            >
              {messages.length > 0 ? (
                <List
                  itemLayout="horizontal"
                  dataSource={messages}
                  renderItem={renderMessage}
                  split={false}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Avatar
                    icon={<RobotOutlined />}
                    size={64}
                    style={{ backgroundColor: '#1677ff', marginBottom: '16px' }}
                  />
                  <Title level={4}>How can I help you today?</Title>
                  <Paragraph type="secondary">
                    Ask me anything about your workspace, data, or how to use features.
                  </Paragraph>
                  <div className="mt-4">
                    <Button type="link" onClick={() => setInputValue('Help me analyze my data')}>
                      Help me analyze my data
                    </Button>
                    <Button type="link" onClick={() => setInputValue('What can you do?')}>
                      What can you do?
                    </Button>
                    <Button type="link" onClick={() => setInputValue('Show me some examples')}>
                      Show me some examples
                    </Button>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div
              className="ai-assistant-input"
              style={{
                padding: '16px',
                borderTop: '1px solid #f0f0f0',
                backgroundColor: 'white'
              }}
            >
              <div className="flex">
                <TextArea
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  disabled={isTyping}
                  style={{ flex: 1 }}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  style={{ marginLeft: '8px', alignSelf: 'flex-end' }}
                />
              </div>

              <div className="flex justify-between mt-2">
                <Tooltip title="Clear conversation">
                  <Button
                    type="text"
                    size="small"
                    onClick={handleClearConversation}
                    disabled={messages.length === 0}
                  >
                    Clear
                  </Button>
                </Tooltip>

                <Space>
                  <Popover
                    content={
                      <div style={{ maxWidth: '250px' }}>
                        <Paragraph>
                          I can help you with:
                        </Paragraph>
                        <ul className="ml-4">
                          <li>Analyzing data and trends</li>
                          <li>Explaining features and settings</li>
                          <li>Generating reports and summaries</li>
                          <li>Providing recommendations</li>
                          <li>Answering questions about your workspace</li>
                        </ul>
                      </div>
                    }
                    title="About AI Assistant"
                    trigger="click"
                  >
                    <Button type="text" size="small" icon={<InfoCircleOutlined />}>
                      Help
                    </Button>
                  </Popover>

                  <Tooltip title="Settings">
                    <Button type="text" size="small" icon={<SettingOutlined />} />
                  </Tooltip>
                </Space>
              </div>
            </div>
          </>
        )}
      </Card>
    </Draggable>
  );

  return (
    <>
      {assistantButton}
      {assistant}
    </>
  );
};

export default FloatingAIAssistant;
