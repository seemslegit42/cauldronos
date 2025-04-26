import React, { useState } from 'react';
import { Card, Typography, Tabs, Space, Alert, Divider, Button } from 'antd';
import { InfoCircleOutlined, ExperimentOutlined, CodeOutlined } from '@ant-design/icons';
import GroqSwarmLanggraphChat from './components/GroqSwarmLanggraphChat';
import GroqSwarmLanggraphService from './services/GroqSwarmLanggraphService';
import { AIMessage } from './components/FloatingAIAssistant';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

/**
 * A demo page for the Groq Swarm Langgraph integration
 */
const GroqSwarmLanggraphDemo: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);

  // Create a service instance for creating custom workflows
  const service = new GroqSwarmLanggraphService();

  // Create custom workflows
  const customWorkflows = [
    service.createReasoningWorkflow('Custom reasoning workflow'),
    service.createResearchWorkflow('Custom research workflow')
  ];

  // Handle message received
  const handleMessageReceived = (message: AIMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  // Handle node transition
  const handleNodeTransition = (nodeId: string, nodeName: string) => {
    setCurrentNode(`${nodeName} (${nodeId})`);
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <Title level={2}>Groq Swarm Langgraph Integration</Title>
        <Paragraph>
          This demo showcases the integration of Groq Swarm with Langgraph for complex AI workflows.
          Langgraph enables the creation of sophisticated multi-step AI processes with branching logic and state management.
        </Paragraph>

        <Alert
          message="Experimental Feature"
          description="This is an experimental feature that demonstrates the capabilities of Groq Swarm with Langgraph. The integration requires a Python backend with the Groq Swarm library installed."
          type="info"
          showIcon
          icon={<ExperimentOutlined />}
          style={{ marginBottom: 24 }}
        />

        <Tabs defaultActiveKey="demo">
          <TabPane
            tab={
              <span>
                <ExperimentOutlined />
                Demo
              </span>
            }
            key="demo"
          >
            <div style={{ marginBottom: 16 }}>
              <Title level={4}>Langgraph Workflow Demo</Title>
              <Paragraph>
                Try out the Groq Swarm Langgraph integration by sending a message. The workflow will process your message through multiple steps, with each step handled by a specialized agent.
              </Paragraph>
              <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
                <Text strong>Current Node:</Text>
                <Text>{currentNode || 'None'}</Text>
              </Space>
            </div>

            <GroqSwarmLanggraphChat
              title="Groq Swarm Langgraph Chat"
              description="Chat with Groq Swarm using Langgraph for complex reasoning"
              initialContext={{
                currentPage: 'Langgraph Demo',
                userRole: 'User',
                workspaceName: 'Demo Workspace'
              }}
              onMessageReceived={handleMessageReceived}
              onNodeTransition={handleNodeTransition}
              height={600}
              showVisualizer={true}
              customWorkflows={customWorkflows}
            />
          </TabPane>

          <TabPane
            tab={
              <span>
                <InfoCircleOutlined />
                About
              </span>
            }
            key="about"
          >
            <Title level={4}>About Groq Swarm Langgraph</Title>
            <Paragraph>
              Groq Swarm Langgraph is an integration that combines the power of Groq's high-performance AI models with Langgraph's workflow orchestration capabilities. This integration enables the creation of sophisticated AI workflows with multiple steps, branching logic, and state management.
            </Paragraph>

            <Divider />

            <Title level={4}>Key Features</Title>
            <ul>
              <li>
                <Text strong>Multi-step Workflows:</Text> Break down complex tasks into smaller, more manageable steps
              </li>
              <li>
                <Text strong>Specialized Agents:</Text> Use different agents with specific instructions for each step
              </li>
              <li>
                <Text strong>Branching Logic:</Text> Create workflows with conditional branching based on intermediate results
              </li>
              <li>
                <Text strong>Visualization:</Text> Visualize the workflow and track progress through each step
              </li>
              <li>
                <Text strong>Streaming Responses:</Text> Get real-time updates as the workflow progresses
              </li>
            </ul>

            <Divider />

            <Title level={4}>Use Cases</Title>
            <ul>
              <li>
                <Text strong>Complex Reasoning:</Text> Break down complex reasoning tasks into multiple steps
              </li>
              <li>
                <Text strong>Research:</Text> Conduct thorough research with multiple stages of analysis
              </li>
              <li>
                <Text strong>Content Creation:</Text> Create high-quality content with planning, drafting, and editing stages
              </li>
              <li>
                <Text strong>Decision Making:</Text> Make decisions with multiple stages of analysis and evaluation
              </li>
            </ul>
          </TabPane>

          <TabPane
            tab={
              <span>
                <CodeOutlined />
                Implementation
              </span>
            }
            key="implementation"
          >
            <Title level={4}>Implementation Details</Title>
            <Paragraph>
              The Groq Swarm Langgraph integration is implemented using the following components:
            </Paragraph>

            <ul>
              <li>
                <Text strong>GroqSwarmLanggraphService:</Text> A service for creating and executing Langgraph workflows
              </li>
              <li>
                <Text strong>useGroqSwarmLanggraph:</Text> A React hook for using the service in React components
              </li>
              <li>
                <Text strong>GroqSwarmLanggraphChat:</Text> A React component for chatting with Groq Swarm using Langgraph
              </li>
              <li>
                <Text strong>LanggraphVisualizer:</Text> A React component for visualizing Langgraph workflows
              </li>
              <li>
                <Text strong>API Route Handler:</Text> A server-side handler for processing Langgraph requests
              </li>
            </ul>

            <Divider />

            <Title level={4}>Architecture</Title>
            <Paragraph>
              The architecture follows a client-server model:
            </Paragraph>

            <ul>
              <li>
                <Text strong>Client:</Text> React components and hooks for creating and visualizing workflows
              </li>
              <li>
                <Text strong>Server:</Text> Express API route handler for processing Langgraph requests
              </li>
              <li>
                <Text strong>Python Backend:</Text> Python script for executing Langgraph workflows using the Groq Swarm library
              </li>
            </ul>

            <Divider />

            <Title level={4}>Integration with Existing Components</Title>
            <Paragraph>
              The Groq Swarm Langgraph integration is designed to work seamlessly with existing components:
            </Paragraph>

            <ul>
              <li>
                <Text strong>Zustand:</Text> Used for state management across components
              </li>
              <li>
                <Text strong>TanStack React Query:</Text> Used for API calls and caching
              </li>
              <li>
                <Text strong>Zod:</Text> Used for schema validation
              </li>
              <li>
                <Text strong>Framer Motion:</Text> Used for animations
              </li>
              <li>
                <Text strong>Ant Design Pro Components:</Text> Used for UI elements
              </li>
            </ul>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default GroqSwarmLanggraphDemo;