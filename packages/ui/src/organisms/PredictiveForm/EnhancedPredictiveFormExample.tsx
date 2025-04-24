import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Divider, Typography, Card, Space } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  HomeOutlined, 
  GlobalOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  LockOutlined,
  FireOutlined,
  ReadOutlined,
  RocketOutlined
} from '@ant-design/icons';
import EnhancedPredictiveForm from './EnhancedPredictiveForm';
import { z } from 'zod';

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * Example component demonstrating the EnhancedPredictiveForm with Ant Design X features
 */
const EnhancedPredictiveFormExample: React.FC = () => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [showCyberpunk, setShowCyberpunk] = useState(false);
  const [showThoughtProcess, setShowThoughtProcess] = useState(true);
  const [showFieldHistory, setShowFieldHistory] = useState(true);
  const [enableVoiceInput, setEnableVoiceInput] = useState(true);
  const [showAIChat, setShowAIChat] = useState(true);

  // Define form validation schema with Zod
  const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().optional(),
    country: z.string().min(1, 'Please select a country'),
    birthdate: z.date().optional(),
    creditCard: z.string().regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, 'Credit card must be in format: XXXX-XXXX-XXXX-XXXX'),
    cvv: z.string().length(3, 'CVV must be 3 digits'),
    expiryDate: z.date().refine(date => date > new Date(), 'Expiry date must be in the future'),
  });

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log('Form submitted:', values);
    setFormValues(values);
  };

  // Simulate AI form completion
  const handleAIComplete = async (values: Record<string, any>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return completed values
    return {
      ...values,
      name: values.name || 'John Smith',
      email: values.email || 'john.smith@example.com',
      phone: values.phone || '555-123-4567',
      address: values.address || '123 Main Street, Apt 4B',
      country: values.country || 'United States',
      birthdate: values.birthdate || new Date('1985-06-15'),
      creditCard: values.creditCard || '4111-1111-1111-1111',
      cvv: values.cvv || '123',
      expiryDate: values.expiryDate || new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
    };
  };

  // Simulate AI form validation
  const handleAIValidate = async (values: Record<string, any>) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

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

    if (values.creditCard && !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(values.creditCard)) {
      issues.push('Credit card format should be XXXX-XXXX-XXXX-XXXX');
    }

    if (values.cvv && !/^\d{3}$/.test(values.cvv)) {
      issues.push('CVV should be 3 digits');
    }

    if (values.expiryDate && new Date(values.expiryDate) <= new Date()) {
      issues.push('Expiry date should be in the future');
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
      key: 'fill-personal',
      label: (
        <Space>
          <UserOutlined />
          <span>Fill Personal Info</span>
        </Space>
      ),
      description: 'Fill in my personal information fields'
    },
    {
      key: 'fill-payment',
      label: (
        <Space>
          <CreditCardOutlined />
          <span>Fill Payment Info</span>
        </Space>
      ),
      description: 'Fill in my payment information fields'
    },
    {
      key: 'validate-form',
      label: (
        <Space>
          <FireOutlined />
          <span>Validate Form</span>
        </Space>
      ),
      description: 'Validate all my form entries'
    }
  ];

  // Handle prompt selection
  const handlePromptSelect = (promptKey: string) => {
    console.log('Prompt selected:', promptKey);
    
    if (promptKey === 'fill-personal') {
      form.setFieldsValue({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '555-987-6543',
        address: '456 Oak Avenue',
        country: 'Canada',
        birthdate: new Date('1990-03-22'),
      });
    } else if (promptKey === 'fill-payment') {
      form.setFieldsValue({
        creditCard: '5555-4444-3333-2222',
        cvv: '456',
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3)),
      });
    } else if (promptKey === 'validate-form') {
      handleAIValidate(form.getFieldsValue()).then(result => {
        console.log('Validation result:', result);
      });
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <Title level={2}>Enhanced Predictive Form</Title>
      <Text type="secondary">
        An AI-powered form with smart suggestions, validation, and assistance
      </Text>

      <Divider />

      <Space style={{ marginBottom: 16 }} wrap>
        <Button 
          type={showCyberpunk ? 'primary' : 'default'} 
          onClick={() => setShowCyberpunk(!showCyberpunk)}
        >
          {showCyberpunk ? 'Disable' : 'Enable'} Cyberpunk Style
        </Button>
        <Button 
          type={showThoughtProcess ? 'primary' : 'default'} 
          onClick={() => setShowThoughtProcess(!showThoughtProcess)}
        >
          {showThoughtProcess ? 'Hide' : 'Show'} AI Thoughts
        </Button>
        <Button 
          type={showFieldHistory ? 'primary' : 'default'} 
          onClick={() => setShowFieldHistory(!showFieldHistory)}
        >
          {showFieldHistory ? 'Hide' : 'Show'} Field History
        </Button>
        <Button 
          type={enableVoiceInput ? 'primary' : 'default'} 
          onClick={() => setEnableVoiceInput(!enableVoiceInput)}
        >
          {enableVoiceInput ? 'Disable' : 'Enable'} Voice Input
        </Button>
        <Button 
          type={showAIChat ? 'primary' : 'default'} 
          onClick={() => setShowAIChat(!showAIChat)}
        >
          {showAIChat ? 'Hide' : 'Show'} AI Chat
        </Button>
      </Space>

      <EnhancedPredictiveForm
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        contextId="payment-form"
        learningMode="active"
        showInsights={true}
        showAICompletion={true}
        showAIValidation={true}
        onAIComplete={handleAIComplete}
        onAIValidate={handleAIValidate}
        cyberpunk={showCyberpunk}
        aiModel="GPT-4"
        showThoughtProcess={showThoughtProcess}
        showFieldHistory={showFieldHistory}
        enableVoiceInput={enableVoiceInput}
        showRecommendations={true}
        showAIChat={showAIChat}
        predefinedPrompts={predefinedPrompts}
        onPromptSelect={handlePromptSelect}
        showFieldImportance={true}
        fieldImportance={{
          name: 'high',
          email: 'high',
          phone: 'medium',
          address: 'low',
          country: 'medium',
          creditCard: 'high',
          cvv: 'high',
          expiryDate: 'medium'
        }}
        fieldDependencies={{
          cvv: ['creditCard'],
          expiryDate: ['creditCard']
        }}
      >
        <Title level={4}>Personal Information</Title>
        <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
          <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email' }]}>
          <Input prefix={<MailOutlined />} placeholder="Enter your email address" />
        </Form.Item>

        <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
          <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input prefix={<HomeOutlined />} placeholder="Enter your address" />
        </Form.Item>

        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <Select placeholder="Select your country">
            <Option value="United States">United States</Option>
            <Option value="Canada">Canada</Option>
            <Option value="United Kingdom">United Kingdom</Option>
            <Option value="Australia">Australia</Option>
            <Option value="Germany">Germany</Option>
            <Option value="France">France</Option>
            <Option value="Japan">Japan</Option>
            <Option value="China">China</Option>
          </Select>
        </Form.Item>

        <Form.Item name="birthdate" label="Date of Birth">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Divider />

        <Title level={4}>Payment Information</Title>
        <Form.Item name="creditCard" label="Credit Card Number" rules={[{ required: true }]}>
          <Input prefix={<CreditCardOutlined />} placeholder="XXXX-XXXX-XXXX-XXXX" />
        </Form.Item>

        <Form.Item name="cvv" label="CVV" rules={[{ required: true }]}>
          <Input prefix={<LockOutlined />} placeholder="123" maxLength={3} />
        </Form.Item>

        <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
          <DatePicker picker="month" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </EnhancedPredictiveForm>

      {Object.keys(formValues).length > 0 && (
        <Card title="Submitted Form Values" style={{ marginTop: 24 }}>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </Card>
      )}
    </div>
  );
};

export default EnhancedPredictiveFormExample;