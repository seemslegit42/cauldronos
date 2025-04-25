import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Tabs, 
  Space, 
  Tag, 
  Divider, 
  Alert,
  Steps,
  Button,
  Tooltip
} from 'antd';
import { 
  RobotOutlined, 
  MessageOutlined, 
  BranchesOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  CodeOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import ConversationalWorkflow from '../ai/components/ConversationalWorkflow';
import { WorkflowStage, WorkflowContext } from '../ai/services/ConversationalWorkflowService';
import { AIMessage } from '../ai/components/FloatingAIAssistant';
import { useAIStore } from '../ai/store/aiStore';

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
const { Step } = Steps;

/**
 * ConversationalWorkflowDemo - A demo page for the conversational workflow system
 */
const ConversationalWorkflowDemo: React.FC = () => {
  // State for the active tab
  const [activeTab, setActiveTab] = useState<string>('demo');
  
  // Get the AI store
  const { 
    currentWorkflowStage, 
    setCurrentWorkflowStage,
    isAILoading
  } = useAIStore();
  
  // State for the last received message
  const [lastMessage, setLastMessage] = useState<AIMessage | null>(null);
  
  // Handle message received
  const handleMessageReceived = (message: AIMessage) => {
    setLastMessage(message);
    
    // Update the workflow stage if available
    if (message.metadata?.stage) {
      setCurrentWorkflowStage(message.metadata.stage as WorkflowStage);
    }
  };
  
  // Initial context for the workflow
  const initialContext: Partial<WorkflowContext> = {
    currentPage: 'Conversational Workflow Demo',
    userRole: 'Developer',
    workspaceName: 'CauldronOS',
    requiresReasoning: true
  };
  
  // Get the current step index
  const getCurrentStepIndex = (): number => {
    switch (currentWorkflowStage) {
      case WorkflowStage.INITIAL:
        return 0;
      case WorkflowStage.UNDERSTANDING:
        return 1;
      case WorkflowStage.PLANNING:
        return 2;
      case WorkflowStage.EXECUTION:
        return 3;
      case WorkflowStage.REFINEMENT:
        return 4;
      case WorkflowStage.COMPLETION:
        return 5;
      default:
        return 0;
    }
  };
  
  // Render the component
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Row align="middle" style={{ height: '100%' }}>
          <Col span={12}>
            <Space>
              <RobotOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={3} style={{ margin: 0 }}>
                Conversational Workflow System
              </Title>
              <Tag color="blue">Powered by Groq</Tag>
              <Tag color="green">Langchain</Tag>
              <Tag color="purple">Vercel AI SDK</Tag>
            </Space>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<InfoCircleOutlined />}>
                Documentation
              </Button>
              <Button icon={<SettingOutlined />}>
                Settings
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>
      
      <Layout>
        <Sider width={300} style={{ background: '#fff', padding: '24px' }}>
          <Title level={4}>Workflow Stages</Title>
          <Paragraph>
            The conversational workflow system progresses through different stages
            to provide a structured approach to problem-solving.
          </Paragraph>
          
          <Steps 
            direction="vertical" 
            current={getCurrentStepIndex()}
            status={isAILoading ? 'process' : 'finish'}
          >
            <Step 
              title="Initial" 
              description="Starting the conversation" 
              icon={<MessageOutlined />}
            />
            <Step 
              title="Understanding" 
              description="Comprehending the user's needs" 
              icon={<InfoCircleOutlined />}
            />
            <Step 
              title="Planning" 
              description="Developing a solution approach" 
              icon={<BranchesOutlined />}
            />
            <Step 
              title="Execution" 
              description="Implementing the solution" 
              icon={<CodeOutlined />}
            />
            <Step 
              title="Refinement" 
              description="Improving the solution" 
              icon={<SettingOutlined />}
            />
            <Step 
              title="Completion" 
              description="Finalizing the solution" 
              icon={<RobotOutlined />}
            />
          </Steps>
          
          <Divider />
          
          <Title level={4}>Current Stage</Title>
          <Tag color="blue" style={{ marginBottom: '16px', padding: '4px 8px' }}>
            {currentWorkflowStage}
          </Tag>
          
          {lastMessage && (
            <>
              <Title level={4}>Last Message</Title>
              <Card size="small">
                <Text strong>{lastMessage.role}:</Text>
                <Paragraph ellipsis={{ rows: 3 }}>
                  {lastMessage.content}
                </Paragraph>
              </Card>
            </>
          )}
        </Sider>
        
        <Content style={{ padding: '24px' }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Demo" key="demo">
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Alert
                    message="Conversational Workflow System"
                    description="This demo showcases a conversational workflow system using Langchain, Vercel AI SDK, and Groq as the inference backend, integrated with Ant Design X components and Groq Swarm."
                    type="info"
                    showIcon
                    style={{ marginBottom: '24px' }}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ConversationalWorkflow
                      title="AI Workflow Assistant"
                      description="Have a conversation with the AI assistant to solve problems using a structured workflow approach."
                      initialContext={initialContext}
                      onMessageReceived={handleMessageReceived}
                      style={{ width: '100%' }}
                    />
                  </motion.div>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tab="About" key="about">
              <Card>
                <Title level={3}>About the Conversational Workflow System</Title>
                <Paragraph>
                  This system demonstrates a sophisticated approach to AI conversations
                  by implementing a structured workflow that guides the interaction
                  through different stages:
                </Paragraph>
                
                <ul>
                  <li>
                    <Text strong>Initial:</Text> The conversation begins, establishing
                    context and user intent.
                  </li>
                  <li>
                    <Text strong>Understanding:</Text> The AI works to comprehend the
                    user's needs and requirements.
                  </li>
                  <li>
                    <Text strong>Planning:</Text> The AI develops a structured approach
                    to address the user's needs.
                  </li>
                  <li>
                    <Text strong>Execution:</Text> The AI implements the planned solution,
                    providing detailed information or code as needed.
                  </li>
                  <li>
                    <Text strong>Refinement:</Text> The solution is improved based on
                    user feedback and additional requirements.
                  </li>
                  <li>
                    <Text strong>Completion:</Text> The interaction concludes with a
                    finalized solution and summary.
                  </li>
                </ul>
                
                <Divider />
                
                <Title level={4}>Technology Stack</Title>
                <Paragraph>
                  This system is built using the following technologies:
                </Paragraph>
                
                <ul>
                  <li>
                    <Text strong>Langchain:</Text> For creating sophisticated AI chains
                    and workflows.
                  </li>
                  <li>
                    <Text strong>Vercel AI SDK:</Text> For streamlined AI integration
                    and streaming responses.
                  </li>
                  <li>
                    <Text strong>Groq:</Text> As the inference backend for fast and
                    efficient AI processing.
                  </li>
                  <li>
                    <Text strong>Ant Design X:</Text> For building the conversational
                    UI components.
                  </li>
                  <li>
                    <Text strong>Groq Swarm:</Text> For orchestrating multi-step AI tasks
                    and complex reasoning.
                  </li>
                  <li>
                    <Text strong>Zustand:</Text> For state management across components.
                  </li>
                  <li>
                    <Text strong>Framer Motion:</Text> For smooth animations and transitions.
                  </li>
                </ul>
              </Card>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ConversationalWorkflowDemo;