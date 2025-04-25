--- src/pages/GroqSwarmDemo.tsx
+++ src/pages/GroqSwarmDemo.tsx
@@ -0,0 +1,319 @@
+import React, { useState } from 'react';
+import { PageContainer } from '@ant-design/pro-components';
+import { Card, Typography, Tabs, Space, Alert, Divider, Row, Col } from 'antd';
+import { InfoCircleOutlined, RobotOutlined, ApiOutlined, SettingOutlined } from '@ant-design/icons';
+import SwarmWorkflowUI from '../ai/components/SwarmWorkflowUI';
+import ConversationalUI from '../ai/components/ConversationalUI';
+
+const { Title, Paragraph, Text } = Typography;
+const { TabPane } = Tabs;
+
+/**
+ * A demo page for Groq Swarm integration
+ */
+const GroqSwarmDemo: React.FC = () => {
+  // State
+  const [activeTab, setActiveTab] = useState('demo');
+
+  return (
+    <PageContainer
+      header={{
+        title: 'Groq Swarm Integration',
+        subTitle: 'Orchestrating multi-step AI tasks with specialized agents',
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
+          tab: 'Architecture',
+          key: 'architecture',
+          icon: <SettingOutlined />,
+        },
+      ]}
+      tabActiveKey={activeTab}
+      onTabChange={setActiveTab}
+    >
+      {activeTab === 'demo' && (
+        <Card>
+          <Alert
+            message="Groq Swarm"
+            description="Groq Swarm enables multi-step AI tasks with specialized agents working together. This demo showcases how to use Groq Swarm for complex workflows."
+            type="info"
+            showIcon
+            icon={<InfoCircleOutlined />}
+            className="mb-6"
+          />
+          
+          <Row gutter={[24, 24]}>
+            <Col xs={24} lg={12}>
+              <Title level={4}>Workflow Execution</Title>
+              <Paragraph>
+                This demo showcases how to execute multi-step workflows using Groq Swarm.
+                Each workflow consists of multiple steps, with each step handled by a specialized agent.
+              </Paragraph>
+              
+              <div className="h-[700px]">
+                <SwarmWorkflowUI 
+                  title="Groq Swarm Workflow"
+                  description="Execute multi-step AI tasks with specialized agents. Each step in the workflow is handled by a different agent with specific instructions."
+                  contextData={{
+                    currentPage: 'Groq Swarm Demo',
+                    userRole: 'Developer',
+                    workspaceName: 'Demo Workspace'
+                  }}
+                />
+              </div>
+            </Col>
+            
+            <Col xs={24} lg={12}>
+              <Title level={4}>Conversational Interface</Title>
+              <Paragraph>
+                This demo showcases how to use Groq Swarm in a conversational interface.
+                The conversation is handled by a swarm of agents working together.
+              </Paragraph>
+              
+              <div className="h-[700px]">
+                <ConversationalUI 
+                  title="Swarm-Powered Assistant"
+                  description="This assistant is powered by Groq Swarm, enabling more complex reasoning and multi-step tasks."
+                  contextData={{
+                    currentPage: 'Groq Swarm Demo',
+                    userRole: 'Developer',
+                    workspaceName: 'Demo Workspace',
+                    useSwarm: true
+                  }}
+                />
+              </div>
+            </Col>
+          </Row>
+        </Card>
+      )}
+      
+      {activeTab === 'api' && (
+        <Card>
+          <Title level={4}>API Reference</Title>
+          <Paragraph>
+            The Groq Swarm integration provides a set of APIs for orchestrating multi-step AI tasks.
+          </Paragraph>
+          
+          <Divider orientation="left">Core Components</Divider>
+          <ul className="list-disc pl-6 mb-4">
+            <li>
+              <Text strong>GroqSwarmIntegration</Text> - A service for integrating with Groq Swarm
+              for multi-step AI tasks.
+            </li>
+            <li>
+              <Text strong>SwarmWorkflowUI</Text> - A UI component for executing Groq Swarm workflows.
+            </li>
+            <li>
+              <Text strong>GroqSwarmService</Text> - A service for communicating with the Groq Swarm API.
+            </li>
+          </ul>
+          
+          <Divider orientation="left">Usage</Divider>
+          <Paragraph>
+            To use the Groq Swarm integration in your own components:
+          </Paragraph>
+          
+          <Card className="mb-4">
+            <pre className="language-tsx">
+              <code>{`import GroqSwarmIntegration from '../ai/services/GroqSwarmIntegration';
+import SwarmWorkflowUI from '../ai/components/SwarmWorkflowUI';
+
+// Create a workflow
+const swarmIntegration = new GroqSwarmIntegration();
+const workflow = swarmIntegration.createWorkflow(
+  'My Workflow',
+  'A workflow for a specific task',
+  'The task description'
+);
+
+// Execute a workflow
+const result = await swarmIntegration.executeWorkflow(
+  workflow,
+  'Initial input',
+  contextData
+);
+
+// In your component
+<SwarmWorkflowUI 
+  title="My Workflow"
+  description="Custom description"
+  contextData={{
+    // Add context data
+  }}
+/>
+`}</code>
+            </pre>
+          </Card>
+          
+          <Divider orientation="left">Custom Workflows</Divider>
+          <Paragraph>
+            You can create custom workflows with specific steps:
+          </Paragraph>
+          
+          <Card>
+            <pre className="language-tsx">
+              <code>{`import GroqSwarmIntegration, { SwarmStep } from '../ai/services/GroqSwarmIntegration';
+
+// Define custom steps
+const steps: SwarmStep[] = [
+  {
+    agent: {
+      name: 'Research Agent',
+      instructions: 'You are a research agent. Your job is to gather information on the topic.',
+      model: 'llama3-70b-8192'
+    },
+    input: '{input}',
+    expectedOutput: 'Research findings',
+    temperature: 0.3
+  },
+  {
+    agent: {
+      name: 'Analysis Agent',
+      instructions: 'You are an analysis agent. Your job is to analyze the research findings.',
+      model: 'llama3-70b-8192'
+    },
+    input: '{input}',
+    expectedOutput: 'Analysis results',
+    temperature: 0.7
+  },
+  {
+    agent: {
+      name: 'Summary Agent',
+      instructions: 'You are a summary agent. Your job is to summarize the analysis.',
+      model: 'llama3-70b-8192'
+    },
+    input: '{input}',
+    expectedOutput: 'Final summary',
+    temperature: 0.5
+  }
+];
+
+// Create a custom workflow
+const swarmIntegration = new GroqSwarmIntegration();
+const workflow = swarmIntegration.createCustomWorkflow(
+  'Custom Workflow',
+  'A custom workflow with specific steps',
+  steps,
+  contextData
+);
+
+// Execute the workflow
+const result = await swarmIntegration.executeWorkflow(
+  workflow,
+  'Initial input',
+  contextData
+);
+`}</code>
+            </pre>
+          </Card>
+        </Card>
+      )}
+      
+      {activeTab === 'architecture' && (
+        <Card>
+          <Title level={4}>Architecture</Title>
+          <Paragraph>
+            The Groq Swarm integration is built on a modular architecture that enables
+            flexible and extensible multi-step AI workflows.
+          </Paragraph>
+          
+          <Divider orientation="left">Components</Divider>
+          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+            <Card title="Core Services" className="mb-4">
+              <ul className="list-disc pl-6">
+                <li>
+                  <Text strong>GroqSwarmIntegration</Text> - Orchestrates multi-step workflows
+                  using specialized agents.
+                </li>
+                <li>
+                  <Text strong>GroqSwarmService</Text> - Communicates with the Groq Swarm API
+                  to execute individual steps.
+                </li>
+                <li>
+                  <Text strong>ConversationalService</Text> - Integrates Langchain and Vercel AI SDK
+                  with Groq Swarm for conversational workflows.
+                </li>
+              </ul>
+            </Card>
+            
+            <Card title="UI Components" className="mb-4">
+              <ul className="list-disc pl-6">
+                <li>
+                  <Text strong>SwarmWorkflowUI</Text> - A UI component for executing and visualizing
+                  Groq Swarm workflows.
+                </li>
+                <li>
+                  <Text strong>ConversationalUI</Text> - A conversational interface that can use
+                  either Langchain or Groq Swarm.
+                </li>
+              </ul>
+            </Card>
+            
+            <Card title="API Layer" className="mb-4">
+              <ul className="list-disc pl-6">
+                <li>
+                  <Text strong>conversationalApi.ts</Text> - API routes for handling conversational
+                  workflows and Groq Swarm requests.
+                </li>
+              </ul>
+            </Card>
+            
+            <Card title="State Management" className="mb-4">
+              <ul className="list-disc pl-6">
+                <li>
+                  <Text strong>aiStore.ts</Text> - Zustand store for managing AI state, including
+                  messages, streaming state, and Swarm configuration.
+                </li>
+              </ul>
+            </Card>
+          </div>
+          
+          <Divider orientation="left">Workflow Execution</Divider>
+          <Paragraph>
+            The workflow execution process follows these steps:
+          </Paragraph>
+          
+          <ol className="list-decimal pl-6 mb-4">
+            <li>
+              <Text strong>Workflow Creation</Text> - A workflow is created with specific steps,
+              each with its own agent, instructions, and parameters.
+            </li>
+            <li>
+              <Text strong>Step Execution</Text> - Each step is executed in sequence, with the
+              output of one step becoming the input for the next.
+            </li>
+            <li>
+              <Text strong>Agent Specialization</Text> - Each agent is specialized for a specific
+              task, with tailored instructions and parameters.
+            </li>
+            <li>
+              <Text strong>Result Aggregation</Text> - The final result is the output of the last
+              step in the workflow.
+            </li>
+          </ol>
+          
+          <Alert
+            message="Integration with Existing Systems"
+            description="The Groq Swarm integration is designed to work seamlessly with existing systems, including Langchain, Vercel AI SDK, and Ant Design Pro Components. It can be used as a standalone system or integrated into larger applications."
+            type="info"
+            showIcon
+            className="mb-4"
+          />
+        </Card>
+      )}
+    </PageContainer>
+  );
+};
+
+export default GroqSwarmDemo;