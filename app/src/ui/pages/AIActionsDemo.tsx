import React, { useState } from 'react';
import { Card, Typography, Divider, Space, Button, Tabs, Alert, Row, Col } from 'cauldronos-ui';
import { 
  RobotOutlined, 
  ThunderboltOutlined, 
  BarChartOutlined, 
  FileTextOutlined,
  BulbOutlined,
  QuestionCircleOutlined,
  ToolOutlined,
  SearchOutlined
} from 'cauldronos-ui';
import { motion, AnimatePresence } from 'framer-motion';
import AIActionButton, { AIAction } from '../ai/components/AIActionButton';
import AIActionButtons, { 
  AIAssistantButton, 
  AIAnalyzeButton, 
  AISearchButton 
} from '../ai/components/AIActionButtons';
import AIOutputBlock, { AIOutputType } from '../ai/components/AIOutputBlock';
import { useAI } from '../ai/AIProvider';
import { useAIAssistant } from '../store/aiStore';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// Define Zod schema for demo actions
const DemoActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  icon: z.any(),
  prompt: z.string(),
  outputType: z.enum(['text', 'markdown', 'code', 'table', 'list', 'action', 'error', 'loading', 'empty'])
});

// Define custom AI actions for the demo
const demoActions: AIAction[] = [
  {
    id: 'analyze-users',
    label: 'Analyze Users',
    description: 'Analyze user behavior and provide insights',
    icon: <BarChartOutlined />,
    prompt: 'Analyze our user data and provide insights on user behavior, engagement, and retention.',
    outputType: 'markdown'
  },
  {
    id: 'generate-report',
    label: 'Generate Report',
    description: 'Generate a summary report of key metrics',
    icon: <FileTextOutlined />,
    prompt: 'Generate a summary report of our key metrics including user growth, engagement, and revenue.',
    outputType: 'table'
  },
  {
    id: 'suggest-improvements',
    label: 'Suggest Improvements',
    description: 'Get AI suggestions for improving the platform',
    icon: <BulbOutlined />,
    prompt: 'Based on common patterns and best practices, what improvements could we make to our platform?',
    outputType: 'markdown'
  },
  {
    id: 'explain-metrics',
    label: 'Explain Metrics',
    description: 'Get an explanation of key metrics',
    icon: <QuestionCircleOutlined />,
    prompt: 'Explain our key metrics in simple terms and why they matter.',
    outputType: 'markdown'
  }
];

// Validate demo actions with Zod
demoActions.forEach(action => {
  try {
    DemoActionSchema.parse(action);
  } catch (error) {
    console.error(`Invalid action: ${action.id}`, error);
  }
});

/**
 * A demo page showcasing different ways to use AI action buttons
 * This implementation uses Zustand for state management, React Query for data fetching,
 * Zod for validation, and Framer Motion for animations.
 */
const AIActionsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [lastActionResult, setLastActionResult] = useState<any>(null);
  const [lastActionType, setLastActionType] = useState<AIOutputType>('text');
  
  // Get AI context from the provider and store
  const { useSwarm, isProcessing } = useAI();
  const { toggleUseSwarm } = useAIAssistant();
  
  // Get React Query client for potential cache invalidation
  const queryClient = useQueryClient();
  
  // Handle action completion
  const handleActionComplete = (actionId: string, result: any) => {
    console.log(`Action ${actionId} completed with result:`, result);
    setLastActionResult(result);
    
    // Determine the output type based on the action ID
    if (actionId === 'generate-report') {
      setLastActionType('table');
    } else if (actionId === 'suggest-actions') {
      setLastActionType('action');
    } else {
      setLastActionType('markdown');
    }
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  const resultVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 }
  };
  
  return (
    <div className="p-6">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
      >
        <Title level={2}>AI Actions Demo</Title>
        <Paragraph>
          This page demonstrates how to connect AI actions to buttons in your application.
          You can use these components to add AI capabilities to your UI with minimal effort.
        </Paragraph>
        
        <Alert
          message="AI Engine Selection"
          description={
            <div>
              <Paragraph>
                You are currently using {useSwarm ? 'Groq Swarm' : 'Standard AI'} for processing AI actions.
              </Paragraph>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="primary" 
                  icon={useSwarm ? <ThunderboltOutlined /> : <RobotOutlined />}
                  onClick={toggleUseSwarm}
                  loading={isProcessing}
                >
                  Switch to {useSwarm ? 'Standard AI' : 'Groq Swarm'}
                </Button>
              </motion.div>
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: '24px' }}
        />
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Individual Buttons" key="1">
            <Card title="Individual AI Action Buttons" className="mb-6">
              <Paragraph>
                Use individual AI action buttons to add specific AI capabilities to your UI.
                Each button triggers a specific AI action when clicked.
              </Paragraph>
              
              <Space wrap className="mb-4">
                {demoActions.map((action) => (
                  <motion.div
                    key={action.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AIActionButton
                      action={action}
                      type="default"
                      onActionComplete={(result) => handleActionComplete(action.id, result)}
                    />
                  </motion.div>
                ))}
              </Space>
              
              <Divider />
              
              <Paragraph>
                You can customize the appearance of the buttons:
              </Paragraph>
              
              <Space wrap className="mb-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <AIActionButton
                    action={demoActions[0]}
                    type="primary"
                    shape="round"
                    onActionComplete={(result) => handleActionComplete(demoActions[0].id, result)}
                  />
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <AIActionButton
                    action={demoActions[1]}
                    type="dashed"
                    onActionComplete={(result) => handleActionComplete(demoActions[1].id, result)}
                  />
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <AIActionButton
                    action={demoActions[2]}
                    type="text"
                    onActionComplete={(result) => handleActionComplete(demoActions[2].id, result)}
                  />
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <AIActionButton
                    action={demoActions[3]}
                    type="link"
                    onActionComplete={(result) => handleActionComplete(demoActions[3].id, result)}
                  />
                </motion.div>
              </Space>
              
              <Divider />
              
              <Paragraph>
                You can also use icon-only buttons:
              </Paragraph>
              
              <Space wrap>
                {demoActions.map((action) => (
                  <motion.div
                    key={`icon-${action.id}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AIActionButton
                      action={action}
                      type="primary"
                      shape="circle"
                      showLabel={false}
                      onActionComplete={(result) => handleActionComplete(action.id, result)}
                    />
                  </motion.div>
                ))}
              </Space>
            </Card>
          </TabPane>
          
          <TabPane tab="Button Collections" key="2">
            <Card title="AI Action Button Collections" className="mb-6">
              <Paragraph>
                Use the AIActionButtons component to display a collection of AI action buttons.
                This component makes it easy to add multiple AI actions to your UI.
              </Paragraph>
              
              <Divider orientation="left">Default Collection</Divider>
              <AIActionButtons 
                onActionComplete={handleActionComplete}
              />
              
              <Divider orientation="left">Custom Actions</Divider>
              <AIActionButtons 
                actions={demoActions}
                onActionComplete={handleActionComplete}
              />
              
              <Divider orientation="left">Styled Collections</Divider>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="Primary Buttons" size="small">
                    <AIActionButtons 
                      actions={demoActions.slice(0, 2)}
                      type="primary"
                      onActionComplete={handleActionComplete}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Ghost Buttons" size="small">
                    <AIActionButtons 
                      actions={demoActions.slice(2, 4)}
                      type="ghost"
                      onActionComplete={handleActionComplete}
                    />
                  </Card>
                </Col>
              </Row>
              
              <Divider orientation="left">Vertical Layout</Divider>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card title="Icon Only" size="small">
                    <AIActionButtons 
                      actions={demoActions}
                      direction="vertical"
                      showLabels={false}
                      shape="circle"
                      type="primary"
                      onActionComplete={handleActionComplete}
                    />
                  </Card>
                </Col>
                <Col span={16}>
                  <Card title="With Labels" size="small">
                    <AIActionButtons 
                      actions={demoActions}
                      direction="vertical"
                      type="default"
                      onActionComplete={handleActionComplete}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </TabPane>
          
          <TabPane tab="Specialized Buttons" key="3">
            <Card title="Specialized AI Buttons" className="mb-6">
              <Paragraph>
                Use specialized AI buttons for common AI tasks.
                These buttons are pre-configured for specific use cases.
              </Paragraph>
              
              <Divider orientation="left">AI Assistant Button</Divider>
              <Space>
                <AIAssistantButton />
                <Text>Click to open the AI Assistant</Text>
              </Space>
              
              <Divider orientation="left">AI Analyze Button</Divider>
              <Space>
                <AIAnalyzeButton 
                  contextData={{ view: 'dashboard', metrics: ['users', 'revenue', 'engagement'] }}
                  onAnalysisComplete={(result) => {
                    setLastActionResult(result);
                    setLastActionType('markdown');
                  }}
                />
                <Text>Click to analyze the current view</Text>
              </Space>
              
              <Divider orientation="left">AI Search Button</Divider>
              <Space>
                <AISearchButton 
                  searchQuery="user engagement strategies"
                  onSearchComplete={(result) => {
                    setLastActionResult(result);
                    setLastActionType('markdown');
                  }}
                />
                <Text>Click to search with AI assistance</Text>
              </Space>
            </Card>
          </TabPane>
        </Tabs>
        
        <AnimatePresence>
          {lastActionResult && (
            <motion.div
              key="result-card"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={resultVariants}
              transition={{ duration: 0.3 }}
            >
              <Card title="Last Action Result" className="mt-6">
                <AIOutputBlock
                  type={lastActionType}
                  content={lastActionResult}
                />
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AIActionsDemo;