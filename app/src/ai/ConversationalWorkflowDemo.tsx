--- src/pages/ConversationalWorkflowDemo.tsx
+++ src/pages/ConversationalWorkflowDemo.tsx
@@ -0,0 +1,288 @@
+import React, { useState } from 'react';
+import { PageContainer } from '@ant-design/pro-components';
+import { Card, Typography, Tabs, Space, Alert, Switch, Select, Divider } from 'antd';
+import { InfoCircleOutlined, RobotOutlined, ApiOutlined, SettingOutlined } from '@ant-design/icons';
+import ConversationalUI from '../ai/components/ConversationalUI';
+import { useAIAssistant } from '../store/aiStore';
+
+const { Title, Paragraph, Text } = Typography;
+const { TabPane } = Tabs;
+
+/**
+ * A demo page for the conversational workflow
+ */
+const ConversationalWorkflowDemo: React.FC = () => {
+  // State
+  const [activeTab, setActiveTab] = useState('demo');
+  
+  // AI Store
+  const { useSwarm, setUseSwarm, updateContextData } = useAIAssistant();
+
+  return (
+    <PageContainer
+      header={{
+        title: 'Conversational Workflow',
+        subTitle: 'Powered by Langchain, Vercel AI SDK, and Groq',
+        ghost: true,
+      }}
+      tabList={[
+        {
+          tab: 'Demo',
+          key: 'demo',
+          icon: <RobotOutlined />,
+        },
+        {
+          tab: 'API',
+          key: 'api',
+          icon: <ApiOutlined />,
+        },
+        {
+          tab: 'Configuration',
+          key: 'config',
+          icon: <SettingOutlined />,
+        },
+      ]}
+      tabActiveKey={activeTab}
+      onTabChange={setActiveTab}
+    >
+      {activeTab === 'demo' && (
+        <Card>
+          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
+            <div>
+              <Title level={4}>Try the Conversational UI</Title>
+              <Paragraph>
+                This demo showcases a conversational workflow using Langchain and Vercel AI SDK,
+                with Groq as the inference backend. The UI is built with Ant Design Pro Components.
+              </Paragraph>
+              
+              <Alert
+                message="Groq Swarm Integration"
+                description="This demo also integrates Groq Swarm for orchestrating multi-step AI tasks. Toggle between Langchain and Groq Swarm in the settings tab of the chat interface."
+                type="info"
+                showIcon
+                icon={<InfoCircleOutlined />}
+                className="mb-4"
+              />
+              
+              <div className="flex items-center mb-4">
+                <Text strong className="mr-2">Use Groq Swarm:</Text>
+                <Switch 
+                  checked={useSwarm} 
+                  onChange={(checked) => setUseSwarm(checked)}
+                />
+              </div>
+              
+              <Paragraph>
+                <Text strong>Current Mode:</Text>{' '}
+                {useSwarm ? 'Groq Swarm (Multi-agent)' : 'Langchain (Single-agent)'}
+              </Paragraph>
+            </div>
+            
+            <div className="h-[600px]">
+              <ConversationalUI 
+                title="CauldronOS Assistant"
+                description="Ask me anything about CauldronOS or try out the conversational workflow."
+                contextData={{
+                  currentPage: 'Conversational Workflow Demo',
+                  userRole: 'Developer',
+                  workspaceName: 'Demo Workspace'
+                }}
+              />
+            </div>
+          </div>
+        </Card>
+      )}
+      
+      {activeTab === 'api' && (
+        <Card>
+          <Title level={4}>API Reference</Title>
+          <Paragraph>
+            The conversational workflow is built using the following components:
+          </Paragraph>
+          
+          <Divider orientation="left">Components</Divider>
+          <ul className="list-disc pl-6 mb-4">
+            <li>
+              <Text strong>ConversationalUI</Text> - A React component that provides a chat interface
+              using Ant Design Pro Components.
+            </li>
+            <li>
+              <Text strong>ConversationalService</Text> - A service that handles the conversational
+              workflow using Langchain and Vercel AI SDK.
+            </li>
+            <li>
+              <Text strong>GroqSwarmService</Text> - A service that integrates with Groq Swarm for
+              multi-agent workflows.
+            </li>
+          </ul>
+          
+          <Divider orientation="left">Usage</Divider>
+          <Paragraph>
+            To use the conversational workflow in your own components:
+          </Paragraph>
+          
+          <Card className="mb-4">
+            <pre className="language-tsx">
+              <code>{`import { ConversationalUI } from '../ai/components/ConversationalUI';
+
+// In your component
+<ConversationalUI 
+  title="Your Assistant"
+  description="Custom description"
+  contextData={{
+    currentPage: 'Your Page',
+    userRole: 'User Role',
+    // Add any other context data
+  }}
+/>
+`}</code>
+            </pre>
+          </Card>
+          
+          <Divider orientation="left">Advanced Usage</Divider>
+          <Paragraph>
+            For more advanced usage, you can directly use the ConversationalService:
+          </Paragraph>
+          
+          <Card>
+            <pre className="language-tsx">
+              <code>{`import ConversationalService from '../ai/services/ConversationalService';
+
+// Create an instance
+const conversationalService = new ConversationalService();
+
+// Process a conversation
+const response = await conversationalService.processConversation(
+  messages, // Array of messages
+  contextData // Additional context
+);
+
+// Process a conversation with streaming
+const streamingResponse = await conversationalService.processConversationStream(
+  messages, // Array of messages
+  contextData // Additional context
+);
+
+// Use Groq Swarm
+const swarmResponse = await conversationalService.processConversationWithSwarm(
+  messages, // Array of messages
+  contextData // Additional context
+);
+`}</code>
+            </pre>
+          </Card>
+        </Card>
+      )}
+      
+      {activeTab === 'config' && (
+        <Card>
+          <Title level={4}>Configuration</Title>
+          <Paragraph>
+            Configure the conversational workflow settings:
+          </Paragraph>
+          
+          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+            <Card title="Groq Swarm Settings" className="mb-4">
+              <div className="flex justify-between items-center mb-4">
+                <Text>Enable Groq Swarm</Text>
+                <Switch 
+                  checked={useSwarm} 
+                  onChange={(checked) => setUseSwarm(checked)}
+                />
+              </div>
+              
+              <Paragraph type="secondary">
+                Groq Swarm enables multi-step AI tasks with specialized agents working together.
+                When disabled, the system will use Langchain for conversational workflows.
+              </Paragraph>
+            </Card>
+            
+            <Card title="Context Settings" className="mb-4">
+              <div className="mb-4">
+                <Text strong>Current Page</Text>
+                <Select
+                  className="w-full mt-2"
+                  defaultValue="Conversational Workflow Demo"
+                  onChange={(value) => updateContextData({ currentPage: value })}
+                  options={[
+                    { label: 'Dashboard', value: 'Dashboard' },
+                    { label: 'User Management', value: 'User Management' },
+                    { label: 'Modules', value: 'Modules' },
+                    { label: 'Workspace Settings', value: 'Workspace Settings' },
+                    { label: 'Conversational Workflow Demo', value: 'Conversational Workflow Demo' },
+                  ]}
+                />
+              </div>
+              
+              <div className="mb-4">
+                <Text strong>User Role</Text>
+                <Select
+                  className="w-full mt-2"
+                  defaultValue="Developer"
+                  onChange={(value) => updateContextData({ userRole: value })}
+                  options={[
+                    { label: 'Admin', value: 'Admin' },
+                    { label: 'Developer', value: 'Developer' },
+                    { label: 'User', value: 'User' },
+                    { label: 'Guest', value: 'Guest' },
+                  ]}
+                />
+              </div>
+            </Card>
+            
+            <Card title="Model Settings" className="mb-4">
+              <div className="mb-4">
+                <Text strong>Default Model</Text>
+                <Select
+                  className="w-full mt-2"
+                  defaultValue="llama3-70b-8192"
+                  onChange={(value) => updateContextData({ defaultModel: value })}
+                  options={[
+                    { label: 'Llama 3 70B', value: 'llama3-70b-8192' },
+                    { label: 'Llama 3 8B', value: 'llama3-8b-8192' },
+                    { label: 'Gemma 2 9B', value: 'gemma2-9b-it' },
+                    { label: 'Mixtral', value: 'mixtral-8x7b-32768' },
+                    { label: 'Qwen', value: 'qwen-qwq-32b' },
+                  ]}
+                />
+              </div>
+              
+              <div className="mb-4">
+                <Text strong>Temperature</Text>
+                <Select
+                  className="w-full mt-2"
+                  defaultValue="0.7"
+                  onChange={(value) => updateContextData({ temperature: value })}
+                  options={[
+                    { label: 'Creative (0.9)', value: '0.9' },
+                    { label: 'Balanced (0.7)', value: '0.7' },
+                    { label: 'Precise (0.3)', value: '0.3' },
+                  ]}
+                />
+              </div>
+            </Card>
+            
+            <Card title="API Settings" className="mb-4">
+              <Alert
+                message="Environment Variables"
+                description="The API key for Groq is configured through environment variables. Make sure GROQ_API_KEY is set in your environment."
+                type="warning"
+                showIcon
+                className="mb-4"
+              />
+              
+              <Paragraph>
+                <Text strong>API Endpoint:</Text> /api/ai/chat
+              </Paragraph>
+              <Paragraph>
+                <Text strong>Swarm Endpoint:</Text> /api/ai/swarm
+              </Paragraph>
+            </Card>
+          </div>
+        </Card>
+      )}
+    </PageContainer>
+  );
+};
+
+export default ConversationalWorkflowDemo;