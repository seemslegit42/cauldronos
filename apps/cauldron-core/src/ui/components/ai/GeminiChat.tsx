import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Spin, Typography, Card, Space, Select, Divider } from 'antd';
import { SendOutlined, RobotOutlined, LoadingOutlined } from '@ant-design/icons';
import GeminiService from '../../../ai/services/GeminiService';
import { AI_MODELS, SYSTEM_PROMPTS } from '../../../ai/config/aiConfig';
import { AIMessage } from '../../../ai/components/FloatingAIAssistant';

const { Text, Title, Paragraph } = Typography;
const { Option } = Select;

interface GeminiChatProps {
  apiKey?: string;
  defaultModel?: string;
  systemPrompt?: string;
  placeholder?: string;
  title?: string;
  showModelSelector?: boolean;
}

/**
 * A chat component that uses the Gemini API
 */
const GeminiChat: React.FC<GeminiChatProps> = ({
  apiKey,
  defaultModel = AI_MODELS.gemini.gemini_flash,
  systemPrompt = SYSTEM_PROMPTS.assistant,
  placeholder = 'Ask Gemini something...',
  title = 'Gemini Chat',
  showModelSelector = true,
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiService = useRef<GeminiService>(new GeminiService(apiKey, selectedModel));

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse]);

  // Update the Gemini service when the API key or model changes
  useEffect(() => {
    geminiService.current = new GeminiService(apiKey, selectedModel);
  }, [apiKey, selectedModel]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    // Add user message to chat
    const userMessage: AIMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setCurrentResponse('');

    try {
      // Stream the response
      await geminiService.current.sendMessageStream(
        input,
        (chunk) => {
          setCurrentResponse((prev) => prev + chunk);
        },
        messages,
        systemPrompt
      );

      // Add the complete response to messages
      if (currentResponse) {
        const assistantMessage: AIMessage = {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: currentResponse,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setCurrentResponse('');
      }
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      setCurrentResponse('Sorry, there was an error processing your request.');
    } finally {
      setLoading(false);
    }
  };

  // Handle model change
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  return (
    <Card
      title={
        <Space>
          <RobotOutlined />
          <span>{title}</span>
        </Space>
      }
      extra={
        showModelSelector && (
          <Select
            value={selectedModel}
            onChange={handleModelChange}
            style={{ width: 200 }}
            disabled={loading}
          >
            <Option value={AI_MODELS.gemini.gemini_flash}>Gemini Flash</Option>
            <Option value={AI_MODELS.gemini.gemini_pro}>Gemini Pro</Option>
            <Option value={AI_MODELS.gemini.gemini_ultra}>Gemini Ultra</Option>
          </Select>
        )
      }
      style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}
    >
      <div className="gemini-chat-messages" style={{ minHeight: 300, maxHeight: 500, overflowY: 'auto' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <RobotOutlined style={{ fontSize: 48, opacity: 0.5 }} />
            <Paragraph style={{ marginTop: 16, opacity: 0.5 }}>
              Start a conversation with Gemini
            </Paragraph>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              style={{
                padding: 12,
                marginBottom: 12,
                borderRadius: 8,
                backgroundColor: message.role === 'user' ? '#f0f2f5' : '#e6f7ff',
                textAlign: message.role === 'user' ? 'right' : 'left',
              }}
            >
              <Text strong>{message.role === 'user' ? 'You' : 'Gemini'}</Text>
              <Paragraph style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>
                {message.content}
              </Paragraph>
            </div>
          ))
        )}

        {/* Current streaming response */}
        {currentResponse && (
          <div
            className="message assistant-message"
            style={{
              padding: 12,
              marginBottom: 12,
              borderRadius: 8,
              backgroundColor: '#e6f7ff',
            }}
          >
            <Text strong>Gemini</Text>
            <Paragraph style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>
              {currentResponse}
            </Paragraph>
          </div>
        )}

        {/* Loading indicator */}
        {loading && !currentResponse && (
          <div style={{ textAlign: 'center', padding: 16 }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <Divider />

      <div className="gemini-chat-input" style={{ display: 'flex', marginTop: 16 }}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder={placeholder}
          disabled={loading}
          style={{ flex: 1 }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          disabled={!input.trim() || loading}
          style={{ marginLeft: 8 }}
        >
          Send
        </Button>
      </div>
    </Card>
  );
};

export default GeminiChat;
