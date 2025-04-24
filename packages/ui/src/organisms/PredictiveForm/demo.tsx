import React, { useState } from 'react';
import { Form, Select, Tabs, Typography, Space, Switch } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { PredictiveForm, EnhancedPredictiveForm } from './index';
import { AnimatedCard as Card, AnimatedInput as Input, AnimatedButton as Button } from '@ant-design/move';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

/**
 * Demo component for PredictiveForm and EnhancedPredictiveForm
 */
const PredictiveFormDemo: React.FC = () => {
  const [basicForm] = Form.useForm();
  const [enhancedForm] = Form.useForm();
  const [cyberpunk, setCyberpunk] = useState(false);
  const [showThoughts, setShowThoughts] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [voiceInput, setVoiceInput] = useState(true);

  // Simulate AI form completion
  const handleAIComplete = async (values: Record<string, any>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return completed values
    return {
      ...values,
      name: values.name || 'John Smith',
      email: values.email || 'john.smith@example.com',
      phone: values.phone || '555-123-4567',
      country: values.country || 'United States',
    };
  };

  // Simulate AI form validation
  const handleAIValidate = async (values: Record<string, any>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const issues: string[] = [];

    // Perform validation checks
    if (!values.name) {
      issues.push('Name is required');
    }

    if (!values.email) {
      issues.push('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      issues.push('Email format is invalid');
    }

    if (!values.phone) {
      issues.push('Phone number is required');
    }

    if (!values.country) {
      issues.push('Country is required');
    }

    // Return validation result
    return {
      valid: issues.length === 0,
      issues
    };
  };

  // Define predefined prompts
  const predefinedPrompts = [
    {
      key: 'fill-all',
      label: 'Fill All Fields',
      description: 'Fill in all form fields with sample data'
    },
    {
      key: 'validate',
      label: 'Validate Form',
      description: 'Check if the form is valid'
    },
    {
      key: 'clear',
      label: 'Clear Form',
      description: 'Clear all form fields'
    }
  ];

  // Handle prompt selection
  const handlePromptSelect = (promptKey: string) => {
    if (promptKey === 'fill-all') {
      enhancedForm.setFieldsValue({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '555-987-6543',
        country: 'Canada',
      });
    } else if (promptKey === 'validate') {
      handleAIValidate(enhancedForm.getFieldsValue()).then(result => {
        console.log('Validation result:', result);
      });
    } else if (promptKey === 'clear') {
      enhancedForm.resetFields();
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={transitions.pageTransitionVariants}
      style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}
    >
      <motion.div variants={transitions.fadeInVariants}>
        <Title level={2}>PredictiveForm Components</Title>
        <Text>AI-enhanced form components with intelligent features</Text>
      </motion.div>

      <Tabs defaultActiveKey="enhanced" style={{ marginTop: 24 }}>
        <TabPane tab="Basic PredictiveForm" key="basic">
          <motion.div variants={transitions.slideUpVariants}>
            <Card 
              title="Basic PredictiveForm" 
              style={{ marginTop: 16 }}
              hoverEffect="lift"
            >
              <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
                The original AI-enhanced form with smart defaults, suggestions, and insights.
              </Text>
            
            <PredictiveForm
              form={basicForm}
              layout="vertical"
              contextId="user-profile"
              learningMode="passive"
              showInsights={true}
              showAICompletion={true}
              showAIValidation={true}
              onAIComplete={handleAIComplete}
              onAIValidate={handleAIValidate}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>
              
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="Enter your email" />
              </Form.Item>
              
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input placeholder="Enter your phone number" />
              </Form.Item>
              
              <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                <Select placeholder="Select your country">
                  <Option value="United States">United States</Option>
                  <Option value="Canada">Canada</Option>
                  <Option value="United Kingdom">United Kingdom</Option>
                  <Option value="Australia">Australia</Option>
                </Select>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </PredictiveForm>
            </Card>
          </motion.div>
        </TabPane>
        
        <TabPane tab="Enhanced PredictiveForm" key="enhanced">
          <motion.div variants={transitions.slideUpVariants} custom={1}>
            <Card 
              title="Enhanced PredictiveForm with Ant Design X" 
              style={{ marginTop: 16 }}
              variant="cyber"
              hoverEffect="glow"
              glowColor="cyan"
            >
              <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
                Advanced AI-enhanced form with thought process visualization, voice input, chat assistance, and more.
              </Text>
            
            <Space style={{ marginBottom: 16 }} wrap>
              <Space>
                <Text>Cyberpunk Style:</Text>
                <Switch checked={cyberpunk} onChange={setCyberpunk} />
              </Space>
              
              <Space>
                <Text>Show AI Thoughts:</Text>
                <Switch checked={showThoughts} onChange={setShowThoughts} />
              </Space>
              
              <Space>
                <Text>AI Chat:</Text>
                <Switch checked={showChat} onChange={setShowChat} />
              </Space>
              
              <Space>
                <Text>Voice Input:</Text>
                <Switch checked={voiceInput} onChange={setVoiceInput} />
              </Space>
            </Space>
            
            <EnhancedPredictiveForm
              form={enhancedForm}
              layout="vertical"
              contextId="user-profile"
              learningMode="active"
              showInsights={true}
              showAICompletion={true}
              showAIValidation={true}
              onAIComplete={handleAIComplete}
              onAIValidate={handleAIValidate}
              cyberpunk={cyberpunk}
              aiModel="GPT-4"
              showThoughtProcess={showThoughts}
              showFieldHistory={true}
              enableVoiceInput={voiceInput}
              showRecommendations={true}
              showAIChat={showChat}
              predefinedPrompts={predefinedPrompts}
              onPromptSelect={handlePromptSelect}
              showFieldImportance={true}
              fieldImportance={{
                name: 'high',
                email: 'high',
                phone: 'medium',
                country: 'low'
              }}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="Enter your name" />
              </Form.Item>
              
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input prefix={<MailOutlined />} placeholder="Enter your email" />
              </Form.Item>
              
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
              </Form.Item>
              
              <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                <Select placeholder="Select your country">
                  <Option value="United States">United States</Option>
                  <Option value="Canada">Canada</Option>
                  <Option value="United Kingdom">United Kingdom</Option>
                  <Option value="Australia">Australia</Option>
                </Select>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </EnhancedPredictiveForm>
            </Card>
          </motion.div>
        </TabPane>
      </Tabs>
    </motion.div>
  );
};

export default PredictiveFormDemo;