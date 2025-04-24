import React, { useState } from 'react';
import { Form, Typography, Space, Switch, Tabs } from 'antd';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';
import { AIForm } from './AIForm';
import { AnimatedCard as Card, AnimatedInput as Input, AnimatedButton as Button } from '@ant-design/move';
import { UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

/**
 * Demo component for AIForm
 */
const AIFormDemo: React.FC = () => {
  const [cyberpunk, setCyberpunk] = useState(false);
  const [showAIAssistance, setShowAIAssistance] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [inlineValidation, setInlineValidation] = useState(true);
  const [submittedValues, setSubmittedValues] = useState<any>(null);

  // Define Zod schema for the form
  const userSchema = z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: z.string()
      .email('Please enter a valid email address'),
    phone: z.string()
      .min(10, 'Phone number must be at least 10 characters')
      .max(15, 'Phone number must be less than 15 characters')
      .regex(/^[0-9-+() ]+$/, 'Phone number can only contain digits, spaces, and the following characters: -+()'),
    country: z.string()
      .min(1, 'Please select a country'),
  });

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof userSchema>) => {
    console.log('Form values:', values);
    setSubmittedValues(values);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transitions.pageTransitionVariants}
      style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}
    >
      <motion.div variants={transitions.fadeInVariants}>
        <Title level={2}>AIForm Component</Title>
        <Text>Zod-powered form with AI assistance and validation</Text>
      </motion.div>

      <Space style={{ marginTop: 16, marginBottom: 16 }} wrap>
        <Space>
          <Text>Cyberpunk Style:</Text>
          <Switch checked={cyberpunk} onChange={setCyberpunk} />
        </Space>
        
        <Space>
          <Text>AI Assistance:</Text>
          <Switch checked={showAIAssistance} onChange={setShowAIAssistance} />
        </Space>
        
        <Space>
          <Text>Show Suggestions:</Text>
          <Switch checked={showSuggestions} onChange={setShowSuggestions} />
        </Space>
        
        <Space>
          <Text>Inline Validation:</Text>
          <Switch checked={inlineValidation} onChange={setInlineValidation} />
        </Space>
      </Space>

      <motion.div variants={transitions.slideUpVariants}>
        <Card
          title="User Registration Form"
          style={{ marginTop: 16 }}
          variant={cyberpunk ? 'cyber' : undefined}
          hoverEffect={cyberpunk ? 'glow' : 'lift'}
          glowColor="cyan"
        >
          <AIForm
            schema={userSchema}
            onSubmit={handleSubmit}
            layout="vertical"
            cyberpunk={cyberpunk}
            aiAssistance={showAIAssistance}
            showSuggestions={showSuggestions}
            inlineValidation={inlineValidation}
            showResetButton={true}
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
              <Input prefix={<GlobalOutlined />} placeholder="Enter your country" />
            </Form.Item>
          </AIForm>
        </Card>
      </motion.div>

      {submittedValues && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            title="Submitted Values"
            style={{ marginTop: 24 }}
            variant={cyberpunk ? 'cyber' : undefined}
          >
            <pre style={{ 
              background: cyberpunk ? '#1a1b23' : '#f5f5f5', 
              padding: 16, 
              borderRadius: 4,
              color: cyberpunk ? '#e6e6e8' : 'inherit'
            }}>
              {JSON.stringify(submittedValues, null, 2)}
            </pre>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AIFormDemo;