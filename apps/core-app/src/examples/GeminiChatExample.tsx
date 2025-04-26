import React from 'react';
import { Card, Typography, Divider } from 'antd';
import GeminiChat from '../ui/components/ai/GeminiChat';
import { SYSTEM_PROMPTS } from '../ai/config/aiConfig';

const { Title, Paragraph } = Typography;

/**
 * Example page demonstrating the GeminiChat component
 */
const GeminiChatExample: React.FC = () => {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <Title level={2}>Gemini AI Integration Examples</Title>
      <Paragraph>
        This page demonstrates different ways to use the Google Gemini API in your application.
      </Paragraph>

      <Divider />

      <Title level={3}>Basic Chat</Title>
      <Paragraph>
        A simple chat interface using the Gemini Flash model.
      </Paragraph>
      <GeminiChat 
        title="Gemini Chat" 
        placeholder="Ask anything..." 
      />

      <Divider />

      <Title level={3}>Developer Assistant</Title>
      <Paragraph>
        A specialized chat interface for developers using the Gemini Pro model.
      </Paragraph>
      <GeminiChat 
        title="Developer Assistant" 
        placeholder="Ask a coding question..." 
        defaultModel="gemini-2.0-pro-001"
        systemPrompt={SYSTEM_PROMPTS.developer}
      />

      <Divider />

      <Title level={3}>Data Analyst</Title>
      <Paragraph>
        A specialized chat interface for data analysis using the Gemini Pro model.
      </Paragraph>
      <GeminiChat 
        title="Data Analyst" 
        placeholder="Ask about data analysis..." 
        defaultModel="gemini-2.0-pro-001"
        systemPrompt={SYSTEM_PROMPTS.analyst}
      />
    </div>
  );
};

export default GeminiChatExample;
