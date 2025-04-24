import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PredictiveForm } from './PredictiveForm';
import { Form, Input, Select, DatePicker, Button, InputNumber, Checkbox, Radio } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const meta: Meta<typeof PredictiveForm> = {
  title: 'Organisms/PredictiveForm',
  component: PredictiveForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    learningMode: {
      control: { type: 'select' },
      options: ['passive', 'active', 'aggressive'],
    },
    showSuggestions: { control: 'boolean' },
    showInsights: { control: 'boolean' },
    autoValidate: { control: 'boolean' },
    smartDefaults: { control: 'boolean' },
    showAICompletion: { control: 'boolean' },
    showAIValidation: { control: 'boolean' },
    showCompletionProgress: { control: 'boolean' },
    cyberpunk: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PredictiveForm>;

// Mock AI complete function
const mockAIComplete = async (values: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    ...values,
    name: values.name || 'John Doe',
    email: values.email || 'john.doe@example.com',
    age: values.age || 30,
    occupation: values.occupation || 'Software Engineer',
    bio: values.bio || 'Experienced software engineer with a passion for building user-friendly applications.',
    interests: values.interests || ['Technology', 'Travel'],
    startDate: values.startDate || new Date(),
    notifications: values.notifications !== undefined ? values.notifications : true,
  };
};

// Mock AI validate function
const mockAIValidate = async (values: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const issues = [];
  
  if (!values.name) {
    issues.push('Name is required');
  }
  
  if (values.email && !values.email.includes('@')) {
    issues.push('Email must be valid');
  }
  
  if (values.age && (values.age < 18 || values.age > 100)) {
    issues.push('Age must be between 18 and 100');
  }
  
  return {
    valid: issues.length === 0,
    issues,
  };
};

export const Default: Story = {
  args: {
    learningMode: 'passive',
    contextId: 'user-form',
    showSuggestions: true,
    showInsights: true,
    autoValidate: true,
    smartDefaults: true,
    showAICompletion: true,
    showAIValidation: true,
    showCompletionProgress: true,
    cyberpunk: false,
    onAIComplete: mockAIComplete,
    onAIValidate: mockAIValidate,
    onFinish: (values) => console.log('Form submitted:', values),
    fieldDependencies: {
      bio: ['occupation'],
      notifications: ['email'],
    },
    style: { width: 500 },
  },
  render: (args) => (
    <PredictiveForm {...args}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>
      
      <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
        <Input placeholder="Enter your email" />
      </Form.Item>
      
      <Form.Item name="age" label="Age">
        <InputNumber placeholder="Enter your age" style={{ width: '100%' }} />
      </Form.Item>
      
      <Form.Item name="occupation" label="Occupation">
        <Select placeholder="Select your occupation">
          <Option value="software-engineer">Software Engineer</Option>
          <Option value="designer">Designer</Option>
          <Option value="product-manager">Product Manager</Option>
          <Option value="data-scientist">Data Scientist</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      
      <Form.Item name="bio" label="Bio">
        <TextArea placeholder="Tell us about yourself" rows={4} />
      </Form.Item>
      
      <Form.Item name="interests" label="Interests">
        <Select mode="multiple" placeholder="Select your interests">
          <Option value="technology">Technology</Option>
          <Option value="travel">Travel</Option>
          <Option value="food">Food</Option>
          <Option value="sports">Sports</Option>
          <Option value="music">Music</Option>
          <Option value="art">Art</Option>
        </Select>
      </Form.Item>
      
      <Form.Item name="startDate" label="Start Date">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      
      <Form.Item name="notifications" valuePropName="checked">
        <Checkbox>Receive email notifications</Checkbox>
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </PredictiveForm>
  ),
};

export const ActiveLearning: Story = {
  ...Default,
  args: {
    ...Default.args,
    learningMode: 'active',
  },
};

export const AggressiveLearning: Story = {
  ...Default,
  args: {
    ...Default.args,
    learningMode: 'aggressive',
  },
};

export const CyberpunkStyle: Story = {
  ...Default,
  args: {
    ...Default.args,
    cyberpunk: true,
  },
};

export const SimpleForm: Story = {
  args: {
    ...Default.args,
    showInsights: false,
    showAICompletion: false,
    showAIValidation: false,
  },
  render: (args) => (
    <PredictiveForm {...args}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>
      
      <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
        <Input placeholder="Enter your email" />
      </Form.Item>
      
      <Form.Item name="message" label="Message">
        <TextArea placeholder="Enter your message" rows={4} />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </PredictiveForm>
  ),
};

export const AdvancedForm: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <PredictiveForm {...args}>
      <Form.Item name="title" label="Title">
        <Radio.Group>
          <Radio value="mr">Mr</Radio>
          <Radio value="mrs">Mrs</Radio>
          <Radio value="ms">Ms</Radio>
          <Radio value="dr">Dr</Radio>
        </Radio.Group>
      </Form.Item>
      
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>
      
      <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
        <Input placeholder="Enter your email" />
      </Form.Item>
      
      <Form.Item name="phone" label="Phone">
        <Input placeholder="Enter your phone number" />
      </Form.Item>
      
      <Form.Item name="address" label="Address">
        <Input.TextArea placeholder="Enter your address" rows={2} />
      </Form.Item>
      
      <Form.Item name="dateRange" label="Date Range">
        <RangePicker style={{ width: '100%' }} />
      </Form.Item>
      
      <Form.Item name="preferences" label="Preferences">
        <Checkbox.Group options={[
          { label: 'Email Updates', value: 'email' },
          { label: 'SMS Notifications', value: 'sms' },
          { label: 'Marketing Communications', value: 'marketing' },
        ]} />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </PredictiveForm>
  ),
};
