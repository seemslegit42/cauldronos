--- src/ai/components/ConversationalUI.tsx
+++ src/ai/components/ConversationalUI.tsx
@@ -0,0 +1,459 @@
+import React, { useState, useRef, useEffect } from 'react';
+import { 
+  Card, 
+  Input, 
+  Button, 
+  Avatar, 
+  Typography, 
+  Space, 
+  Divider, 
+  Tooltip, 
+  Badge, 
+  Spin, 
+  Switch,
+  Select,
+  Tabs
+} from 'antd';
+import { 
+  SendOutlined, 
+  RobotOutlined, 
+  UserOutlined, 
+  DeleteOutlined, 
+  SettingOutlined,
+  InfoCircleOutlined,
+  CopyOutlined,
+  DownloadOutlined,
+  SyncOutlined
+} from '@ant-design/icons';
+import { ProCard } from '@ant-design/pro-components';
+import { motion, AnimatePresence } from 'framer-motion';
+import { useAIAssistant } from '../../store/aiStore';
+import AIOutputBlock from './AIOutputBlock';
+import StreamableText from './StreamableText';
+import { AIMessage } from './FloatingAIAssistant';
+import ConversationalService from '../services/ConversationalService';
+
+const { Text, Title, Paragraph } = Typography;
+const { TextArea } = Input;
+const { TabPane } = Tabs;
+
+interface ConversationalUIProps {
+  title?: string;
+  description?: string;
+  contextData?: Record<string, any>;
+  onSendMessage?: (message: string, contextData?: any) => Promise<AIMessage>;
+  className?: string;
+  style?: React.CSSProperties;
+}
+
+/**
+ * A conversational UI component that uses Ant Design Pro Components
+ * and integrates with Langchain and Vercel AI SDK
+ */
+const ConversationalUI: React.FC<ConversationalUIProps> = ({
+  title = 'AI Assistant',
+  description = 'Ask me anything about CauldronOS',
+  contextData = {},
+  onSendMessage,
+  className = '',
+  style = {}
+}) => {
+  // State
+  const [inputValue, setInputValue] = useState('');
+  const [isTyping, setIsTyping] = useState(false);
+  const [selectedModel, setSelectedModel] = useState('llama3-70b-8192');
+  const [activeTab, setActiveTab] = useState('chat');
+  
+  // Refs
+  const messagesEndRef = useRef<HTMLDivElement>(null);
+  const inputRef = useRef<any>(null);
+  
+  // AI Store
+  const { 
+    messages, 
+    addMessage, 
+    updateMessage, 
+    clearMessages, 
+    isStreaming, 
+    setStreaming,
+    useSwarm,
+    toggleUseSwarm,
+    updateContextData
+  } = useAIAssistant();
+  
+  // Conversational Service
+  const conversationalService = new ConversationalService();
+
+  // Scroll to bottom when messages change
+  useEffect(() => {
+    if (messagesEndRef.current) {
+      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
+    }
+  }, [messages]);
+
+  // Focus input on mount
+  useEffect(() => {
+    if (inputRef.current) {
+      setTimeout(() => {
+        inputRef.current.focus();
+      }, 100);
+    }
+  }, []);
+
+  // Update context data when props change
+  useEffect(() => {
+    updateContextData(contextData);
+  }, [contextData, updateContextData]);
+
+  // Handle input change
+  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
+    setInputValue(e.target.value);
+  };
+
+  // Handle key press (Enter to send)
+  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
+    if (e.key === 'Enter' && !e.shiftKey) {
+      e.preventDefault();
+      handleSendMessage();
+    }
+  };
+
+  // Send message
+  const handleSendMessage = async () => {
+    if (!inputValue.trim()) return;
+
+    // Add user message
+    const userMessageId = crypto.randomUUID();
+    addMessage({
+      role: 'user',
+      content: inputValue,
+      type: 'text'
+    });
+
+    // Clear input
+    setInputValue('');
+    setIsTyping(true);
+    setStreaming(true);
+
+    // Add typing indicator
+    const typingIndicatorId = crypto.randomUUID();
+    addMessage({
+      role: 'assistant',
+      content: 'Thinking...',
+      type: 'loading'
+    });
+
+    try {
+      let response: AIMessage;
+
+      if (onSendMessage) {
+        // Use provided callback
+        response = await onSendMessage(inputValue, {
+          ...contextData,
+          model: selectedModel
+        });
+      } else {
+        // Use the conversational service
+        const vercelMessages = messages.map(msg => ({
+          role: msg.role,
+          content: msg.content
+        }));
+        
+        // Add the current user message
+        vercelMessages.push({
+          role: 'user',
+          content: inputValue
+        });
+
+        if (useSwarm) {
+          // Use Groq Swarm
+          response = await conversationalService.processConversationWithSwarm(
+            vercelMessages,
+            {
+              ...contextData,
+              model: selectedModel
+            }
+          );
+        } else {
+          // Use Langchain
+          response = await conversationalService.processConversation(
+            vercelMessages,
+            {
+              ...contextData,
+              model: selectedModel
+            }
+          );
+        }
+      }
+
+      // Remove typing indicator
+      const filteredMessages = messages.filter(msg => msg.id !== typingIndicatorId);
+      
+      // Add response
+      addMessage({
+        role: 'assistant',
+        content: response.content,
+        type: response.type
+      });
+    } catch (error) {
+      console.error('Error sending message:', error);
+
+      // Remove typing indicator and add error message
+      const filteredMessages = messages.filter(msg => msg.id !== typingIndicatorId);
+      
+      addMessage({
+        role: 'assistant',
+        content: 'Sorry, I encountered an error processing your request. Please try again.',
+        type: 'error'
+      });
+    } finally {
+      setIsTyping(false);
+      setStreaming(false);
+    }
+  };
+
+  // Clear conversation
+  const handleClearConversation = () => {
+    clearMessages();
+  };
+
+  // Copy conversation
+  const handleCopyConversation = () => {
+    const conversationText = messages
+      .map(msg => `${msg.role === 'user' ? 'You' : 'Assistant'}: ${msg.content}`)
+      .join('\n\n');
+    
+    navigator.clipboard.writeText(conversationText);
+  };
+
+  // Download conversation
+  const handleDownloadConversation = () => {
+    const conversationText = messages
+      .map(msg => `${msg.role === 'user' ? 'You' : 'Assistant'}: ${msg.content}`)
+      .join('\n\n');
+    
+    const blob = new Blob([conversationText], { type: 'text/plain' });
+    const url = URL.createObjectURL(blob);
+    const a = document.createElement('a');
+    a.href = url;
+    a.download = `conversation-${new Date().toISOString().slice(0, 10)}.txt`;
+    document.body.appendChild(a);
+    a.click();
+    document.body.removeChild(a);
+    URL.revokeObjectURL(url);
+  };
+
+  // Toggle Swarm
+  const handleToggleSwarm = () => {
+    toggleUseSwarm();
+  };
+
+  // Render message
+  const renderMessage = (message: AIMessage, index: number) => {
+    const isUser = message.role === 'user';
+
+    return (
+      <motion.div
+        key={message.id || index}
+        initial={{ opacity: 0, y: 20 }}
+        animate={{ opacity: 1, y: 0 }}
+        transition={{ duration: 0.3 }}
+        className={`message ${isUser ? 'user-message' : 'assistant-message'}`}
+        style={{ marginBottom: 16 }}
+      >
+        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
+          {!isUser && (
+            <Avatar
+              icon={<RobotOutlined />}
+              style={{ backgroundColor: '#1677ff' }}
+              className="mr-2 mt-1"
+            />
+          )}
+
+          <div className={`message-content ${isUser ? 'ml-12' : 'mr-12'}`} style={{ maxWidth: '80%' }}>
+            {isUser ? (
+              <div className="bg-blue-50 p-3 rounded-lg">
+                <Text>{message.content}</Text>
+              </div>
+            ) : (
+              <div className="bg-gray-50 p-3 rounded-lg">
+                {message.type === 'loading' ? (
+                  <AIOutputBlock type="loading" content={message.content} />
+                ) : message.type === 'markdown' || message.type === 'code' ? (
+                  <AIOutputBlock
+                    type={message.type}
+                    content={message.content}
+                    isStreaming={message.isStreaming}
+                  />
+                ) : (
+                  <StreamableText
+                    content={message.content}
+                    isStreaming={message.isStreaming}
+                    variant="paragraph"
+                    style={{ margin: 0 }}
+                  />
+                )}
+              </div>
+            )}
+
+            <Text type="secondary" className={`text-xs mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
+              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
+            </Text>
+          </div>
+
+          {isUser && (
+            <Avatar
+              icon={<UserOutlined />}
+              style={{ backgroundColor: '#52c41a' }}
+              className="ml-2 mt-1"
+            />
+          )}
+        </div>
+      </motion.div>
+    );
+  };
+
+  return (
+    <ProCard
+      className={`conversational-ui ${className}`}
+      style={{
+        height: '100%',
+        display: 'flex',
+        flexDirection: 'column',
+        ...style
+      }}
+      headerBordered
+      title={
+        <Space>
+          <RobotOutlined />
+          <span>{title}</span>
+        </Space>
+      }
+      extra={
+        <Space>
+          <Tooltip title="Clear conversation">
+            <Button
+              icon={<DeleteOutlined />}
+              onClick={handleClearConversation}
+              disabled={messages.length === 0}
+            />
+          </Tooltip>
+          <Tooltip title="Copy conversation">
+            <Button
+              icon={<CopyOutlined />}
+              onClick={handleCopyConversation}
+              disabled={messages.length === 0}
+            />
+          </Tooltip>
+          <Tooltip title="Download conversation">
+            <Button
+              icon={<DownloadOutlined />}
+              onClick={handleDownloadConversation}
+              disabled={messages.length === 0}
+            />
+          </Tooltip>
+        </Space>
+      }
+    >
+      <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-4">
+        <TabPane tab="Chat" key="chat" />
+        <TabPane tab="Settings" key="settings" />
+      </Tabs>
+
+      {activeTab === 'chat' ? (
+        <>
+          <div
+            className="messages-container"
+            style={{
+              flex: 1,
+              overflowY: 'auto',
+              padding: '0 16px',
+              marginBottom: 16
+            }}
+          >
+            {messages.length === 0 ? (
+              <div className="flex flex-col items-center justify-center h-full">
+                <RobotOutlined style={{ fontSize: 48, color: '#1677ff', marginBottom: 16 }} />
+                <Title level={4}>{title}</Title>
+                <Paragraph type="secondary" style={{ textAlign: 'center' }}>
+                  {description}
+                </Paragraph>
+              </div>
+            ) : (
+              messages.map((message, index) => renderMessage(message, index))
+            )}
+            <div ref={messagesEndRef} />
+          </div>
+
+          <Divider style={{ margin: '8px 0' }} />
+
+          <div className="input-container" style={{ padding: '0 16px 16px' }}>
+            <div className="flex items-center">
+              <TextArea
+                ref={inputRef}
+                value={inputValue}
+                onChange={handleInputChange}
+                onKeyDown={handleKeyPress}
+                placeholder="Type your message..."
+                autoSize={{ minRows: 1, maxRows: 4 }}
+                disabled={isTyping}
+                style={{ flex: 1, marginRight: 8 }}
+              />
+              <Button
+                type="primary"
+                icon={<SendOutlined />}
+                onClick={handleSendMessage}
+                disabled={!inputValue.trim() || isTyping}
+              />
+            </div>
+            <div className="flex justify-between items-center mt-2">
+              <Text type="secondary" className="text-xs">
+                {useSwarm ? 'Using Groq Swarm' : 'Using Langchain'}
+              </Text>
+              <Space>
+                <Select
+                  value={selectedModel}
+                  onChange={setSelectedModel}
+                  style={{ width: 150 }}
+                  options={[
+                    { label: 'Llama 3 70B', value: 'llama3-70b-8192' },
+                    { label: 'Llama 3 8B', value: 'llama3-8b-8192' },
+                    { label: 'Gemma 2 9B', value: 'gemma2-9b-it' },
+                    { label: 'Mixtral', value: 'mixtral-8x7b-32768' },
+                    { label: 'Qwen', value: 'qwen-qwq-32b' },
+                  ]}
+                />
+              </Space>
+            </div>
+          </div>
+        </>
+      ) : (
+        <div className="settings-container" style={{ padding: '0 16px' }}>
+          <ProCard title="Model Settings" className="mb-4">
+            <div className="flex justify-between items-center mb-4">
+              <Text>Use Groq Swarm</Text>
+              <Switch checked={useSwarm} onChange={handleToggleSwarm} />
+            </div>
+            <Paragraph type="secondary">
+              Groq Swarm enables multi-step AI tasks with specialized agents working together.
+              When disabled, the system will use Langchain for conversational workflows.
+            </Paragraph>
+          </ProCard>
+
+          <ProCard title="About">
+            <Paragraph>
+              This conversational UI is powered by Langchain and Vercel AI SDK, with Groq as the inference backend.
+              It uses Ant Design Pro Components for the user interface and Zustand for state management.
+            </Paragraph>
+            <Paragraph>
+              <InfoCircleOutlined className="mr-2" />
+              For more information, check the documentation.
+            </Paragraph>
+          </ProCard>
+        </div>
+      )}
+    </ProCard>
+  );
+};
+
+export default ConversationalUI;