--- src/ai/components/SwarmWorkflowUI.tsx
+++ src/ai/components/SwarmWorkflowUI.tsx
@@ -0,0 +1,407 @@
+import React, { useState } from 'react';
+import { 
+  Card, 
+  Input, 
+  Button, 
+  Typography, 
+  Space, 
+  Steps, 
+  Divider, 
+  Spin, 
+  Alert, 
+  Select,
+  Tag,
+  Tooltip
+} from 'antd';
+import { 
+  SendOutlined, 
+  RobotOutlined, 
+  CheckCircleOutlined, 
+  SyncOutlined,
+  InfoCircleOutlined,
+  PlusOutlined,
+  MinusOutlined
+} from '@ant-design/icons';
+import { ProCard } from '@ant-design/pro-components';
+import { motion } from 'framer-motion';
+import AIOutputBlock from './AIOutputBlock';
+import GroqSwarmIntegration, { SwarmWorkflow, SwarmStep } from '../services/GroqSwarmIntegration';
+import { AIMessage } from './FloatingAIAssistant';
+
+const { Text, Title, Paragraph } = Typography;
+const { TextArea } = Input;
+const { Step } = Steps;
+
+interface SwarmWorkflowUIProps {
+  title?: string;
+  description?: string;
+  contextData?: Record<string, any>;
+  className?: string;
+  style?: React.CSSProperties;
+}
+
+/**
+ * A UI component for Groq Swarm workflows
+ */
+const SwarmWorkflowUI: React.FC<SwarmWorkflowUIProps> = ({
+  title = 'Groq Swarm Workflow',
+  description = 'Execute multi-step AI tasks with specialized agents',
+  contextData = {},
+  className = '',
+  style = {}
+}) => {
+  // State
+  const [inputValue, setInputValue] = useState('');
+  const [isProcessing, setIsProcessing] = useState(false);
+  const [currentStep, setCurrentStep] = useState(0);
+  const [workflow, setWorkflow] = useState<SwarmWorkflow | null>(null);
+  const [result, setResult] = useState<AIMessage | null>(null);
+  const [workflowType, setWorkflowType] = useState('default');
+  const [customSteps, setCustomSteps] = useState<SwarmStep[]>([]);
+  
+  // Swarm Integration
+  const swarmIntegration = new GroqSwarmIntegration();
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
+      handleExecuteWorkflow();
+    }
+  };
+
+  // Execute workflow
+  const handleExecuteWorkflow = async () => {
+    if (!inputValue.trim()) return;
+
+    setIsProcessing(true);
+    setCurrentStep(0);
+    setResult(null);
+
+    try {
+      // Create a workflow based on the input
+      const newWorkflow = workflowType === 'custom' && customSteps.length > 0
+        ? swarmIntegration.createCustomWorkflow(
+            'Custom Workflow',
+            'A custom workflow with user-defined steps',
+            customSteps,
+            contextData
+          )
+        : swarmIntegration.createWorkflow(
+            'Default Workflow',
+            'A default workflow with planning, execution, and review steps',
+            inputValue
+          );
+      
+      setWorkflow(newWorkflow);
+      
+      // Execute the workflow
+      let stepIndex = 0;
+      for (const step of newWorkflow.steps) {
+        setCurrentStep(stepIndex);
+        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate step transition
+        stepIndex++;
+      }
+      
+      // Get the final result
+      const finalResult = await swarmIntegration.executeWorkflow(
+        newWorkflow,
+        inputValue,
+        contextData
+      );
+      
+      setResult(finalResult);
+      setCurrentStep(newWorkflow.steps.length);
+    } catch (error) {
+      console.error('Error executing workflow:', error);
+      setResult({
+        id: `error-${Date.now()}`,
+        role: 'assistant',
+        content: 'Sorry, I encountered an error executing the workflow. Please try again.',
+        timestamp: new Date(),
+        type: 'error'
+      });
+    } finally {
+      setIsProcessing(false);
+    }
+  };
+
+  // Add a custom step
+  const handleAddStep = () => {
+    setCustomSteps([
+      ...customSteps,
+      {
+        agent: {
+          name: `Agent ${customSteps.length + 1}`,
+          instructions: 'You are a helpful AI assistant. Provide a detailed response to the user query.',
+          model: 'llama3-70b-8192'
+        },
+        input: '{input}',
+        expectedOutput: 'A detailed response',
+        temperature: 0.7
+      }
+    ]);
+  };
+
+  // Remove a custom step
+  const handleRemoveStep = (index: number) => {
+    setCustomSteps(customSteps.filter((_, i) => i !== index));
+  };
+
+  // Update a custom step
+  const handleUpdateStep = (index: number, field: string, value: any) => {
+    const updatedSteps = [...customSteps];
+    
+    if (field === 'name') {
+      updatedSteps[index].agent.name = value;
+    } else if (field === 'instructions') {
+      updatedSteps[index].agent.instructions = value;
+    } else if (field === 'model') {
+      updatedSteps[index].agent.model = value;
+    } else if (field === 'temperature') {
+      updatedSteps[index].temperature = parseFloat(value);
+    }
+    
+    setCustomSteps(updatedSteps);
+  };
+
+  return (
+    <ProCard
+      className={`swarm-workflow-ui ${className}`}
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
+          <Select
+            value={workflowType}
+            onChange={setWorkflowType}
+            options={[
+              { label: 'Default Workflow', value: 'default' },
+              { label: 'Custom Workflow', value: 'custom' }
+            ]}
+            style={{ width: 150 }}
+          />
+        </Space>
+      }
+    >
+      <div className="mb-4">
+        <Paragraph>{description}</Paragraph>
+        
+        {workflowType === 'custom' && (
+          <div className="mb-4">
+            <div className="flex justify-between items-center mb-2">
+              <Title level={5}>Custom Workflow Steps</Title>
+              <Button 
+                type="primary" 
+                icon={<PlusOutlined />} 
+                onClick={handleAddStep}
+                size="small"
+              >
+                Add Step
+              </Button>
+            </div>
+            
+            {customSteps.length === 0 ? (
+              <Alert
+                message="No Steps Defined"
+                description="Add steps to create a custom workflow. Each step will be executed in sequence."
+                type="info"
+                showIcon
+              />
+            ) : (
+              <div className="space-y-4">
+                {customSteps.map((step, index) => (
+                  <Card 
+                    key={index} 
+                    size="small" 
+                    title={
+                      <div className="flex justify-between items-center">
+                        <span>Step {index + 1}: {step.agent.name}</span>
+                        <Button 
+                          danger 
+                          icon={<MinusOutlined />} 
+                          onClick={() => handleRemoveStep(index)}
+                          size="small"
+                        />
+                      </div>
+                    }
+                  >
+                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
+                      <div>
+                        <Text strong>Agent Name:</Text>
+                        <Input 
+                          value={step.agent.name} 
+                          onChange={(e) => handleUpdateStep(index, 'name', e.target.value)}
+                          className="mt-1 mb-2"
+                        />
+                        
+                        <Text strong>Instructions:</Text>
+                        <TextArea 
+                          value={step.agent.instructions} 
+                          onChange={(e) => handleUpdateStep(index, 'instructions', e.target.value)}
+                          rows={3}
+                          className="mt-1"
+                        />
+                      </div>
+                      
+                      <div>
+                        <Text strong>Model:</Text>
+                        <Select
+                          value={step.agent.model}
+                          onChange={(value) => handleUpdateStep(index, 'model', value)}
+                          options={[
+                            { label: 'Llama 3 70B', value: 'llama3-70b-8192' },
+                            { label: 'Llama 3 8B', value: 'llama3-8b-8192' },
+                            { label: 'Gemma 2 9B', value: 'gemma2-9b-it' },
+                            { label: 'Mixtral', value: 'mixtral-8x7b-32768' },
+                            { label: 'Qwen', value: 'qwen-qwq-32b' },
+                          ]}
+                          className="w-full mt-1 mb-2"
+                        />
+                        
+                        <Text strong>Temperature:</Text>
+                        <Select
+                          value={step.temperature?.toString()}
+                          onChange={(value) => handleUpdateStep(index, 'temperature', value)}
+                          options={[
+                            { label: 'Creative (0.9)', value: '0.9' },
+                            { label: 'Balanced (0.7)', value: '0.7' },
+                            { label: 'Precise (0.3)', value: '0.3' },
+                          ]}
+                          className="w-full mt-1"
+                        />
+                      </div>
+                    </div>
+                  </Card>
+                ))}
+              </div>
+            )}
+            
+            <Divider />
+          </div>
+        )}
+        
+        <div className="mb-4">
+          <Text strong>Task Description:</Text>
+          <TextArea
+            value={inputValue}
+            onChange={handleInputChange}
+            onKeyDown={handleKeyPress}
+            placeholder="Describe the task you want to accomplish..."
+            autoSize={{ minRows: 3, maxRows: 6 }}
+            disabled={isProcessing}
+            className="mt-2"
+          />
+        </div>
+        
+        <div className="flex justify-end">
+          <Button
+            type="primary"
+            icon={<SendOutlined />}
+            onClick={handleExecuteWorkflow}
+            loading={isProcessing}
+            disabled={!inputValue.trim() || (workflowType === 'custom' && customSteps.length === 0)}
+          >
+            Execute Workflow
+          </Button>
+        </div>
+      </div>
+      
+      {(workflow || isProcessing) && (
+        <div className="mt-4">
+          <Divider orientation="left">Workflow Execution</Divider>
+          
+          <Steps
+            current={currentStep}
+            status={isProcessing ? 'process' : (result ? 'finish' : 'wait')}
+            className="mb-8"
+          >
+            {workflow ? (
+              workflow.steps.map((step, index) => (
+                <Step
+                  key={index}
+                  title={step.agent.name}
+                  description={
+                    <div className="text-xs">
+                      <Tag color="blue">{step.agent.model}</Tag>
+                    </div>
+                  }
+                  icon={
+                    currentStep === index && isProcessing ? (
+                      <SyncOutlined spin />
+                    ) : (
+                      index < currentStep ? <CheckCircleOutlined /> : undefined
+                    )
+                  }
+                />
+              ))
+            ) : (
+              <>
+                <Step title="Planning" icon={<SyncOutlined spin />} />
+                <Step title="Execution" />
+                <Step title="Review" />
+              </>
+            )}
+          </Steps>
+          
+          {isProcessing && !result && (
+            <div className="text-center py-8">
+              <Spin size="large" />
+              <Paragraph className="mt-4">
+                {currentStep === 0
+                  ? 'Planning the approach...'
+                  : currentStep === 1
+                  ? 'Executing the plan...'
+                  : 'Reviewing the results...'}
+              </Paragraph>
+            </div>
+          )}
+          
+          {result && (
+            <motion.div
+              initial={{ opacity: 0, y: 20 }}
+              animate={{ opacity: 1, y: 0 }}
+              transition={{ duration: 0.5 }}
+            >
+              <ProCard title="Result" className="mb-4">
+                {result.type === 'error' ? (
+                  <Alert
+                    message="Error"
+                    description={result.content}
+                    type="error"
+                    showIcon
+                  />
+                ) : result.type === 'markdown' || result.type === 'code' ? (
+                  <AIOutputBlock
+                    type={result.type}
+                    content={result.content}
+                  />
+                ) : (
+                  <Paragraph>{result.content}</Paragraph>
+                )}
+              </ProCard>
+            </motion.div>
+          )}
+        </div>
+      )}
+    </ProCard>
+  );
+};
+
+export default SwarmWorkflowUI;