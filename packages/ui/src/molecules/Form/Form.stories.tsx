import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { 
  Input, 
  Button, 
  Select, 
  DatePicker, 
  Checkbox, 
  Radio, 
  Switch, 
  Slider, 
  InputNumber,
  Upload,
  Space,
  Divider,
  Typography,
  Card
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  UploadOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const meta: Meta<typeof Form> = {
  title: 'Molecules/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    cyberpunk: { control: 'boolean' },
    animated: { control: 'boolean' },
    staggerDelay: { control: 'number' },
    glowOnFocus: { control: 'boolean' },
    animatedValidation: { control: 'boolean' },
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'inline'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
    },
    labelCol: { control: 'object' },
    wrapperCol: { control: 'object' },
    colon: { control: 'boolean' },
    requiredMark: {
      control: { type: 'select' },
      options: [true, false, 'optional'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

// Basic form example
export const Default: Story = {
  render: () => {
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
      console.log('Form values:', values);
    };
    
    return (
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: 400 }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select a role">
            <Option value="admin">Administrator</Option>
            <Option value="user">User</Option>
            <Option value="guest">Guest</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  },
  args: {
    cyberpunk: false,
    animated: false,
    staggerDelay: 0.1,
    glowOnFocus: false,
    animatedValidation: true,
    layout: 'vertical',
    size: 'middle',
    colon: true,
    requiredMark: true,
  },
};

// Animated form example
export const AnimatedForm: Story = {
  render: () => {
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
      console.log('Form values:', values);
    };
    
    return (
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        animated
        staggerDelay={0.1}
        style={{ width: 400 }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select a role">
            <Option value="admin">Administrator</Option>
            <Option value="user">User</Option>
            <Option value="guest">Guest</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  },
  args: {
    cyberpunk: false,
    animated: true,
    staggerDelay: 0.1,
    glowOnFocus: false,
    animatedValidation: true,
    layout: 'vertical',
    size: 'middle',
    colon: true,
    requiredMark: true,
  },
};

// Cyberpunk form example
export const CyberpunkForm: Story = {
  render: () => {
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
      console.log('Form values:', values);
    };
    
    return (
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        cyberpunk
        glowOnFocus
        style={{ width: 400 }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select a role">
            <Option value="admin">Administrator</Option>
            <Option value="user">User</Option>
            <Option value="guest">Guest</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  },
  args: {
    cyberpunk: true,
    animated: false,
    staggerDelay: 0.1,
    glowOnFocus: true,
    animatedValidation: true,
    layout: 'vertical',
    size: 'middle',
    colon: true,
    requiredMark: true,
  },
};

// Horizontal layout form example
export const HorizontalLayout: Story = {
  render: () => {
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
      console.log('Form values:', values);
    };
    
    return (
      <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 500 }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select a role">
            <Option value="admin">Administrator</Option>
            <Option value="user">User</Option>
            <Option value="guest">Guest</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  },
  args: {
    cyberpunk: false,
    animated: false,
    staggerDelay: 0.1,
    glowOnFocus: false,
    animatedValidation: true,
    layout: 'horizontal',
    size: 'middle',
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    colon: true,
    requiredMark: true,
  },
};

// Inline layout form example
export const InlineLayout: Story = {
  render: () => {
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
      console.log('Form values:', values);
    };
    
    return (
      <Form
        form={form}
        onFinish={onFinish}
        layout="inline"
        style={{ width: 600 }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  },
  args: {
    cyberpunk: false,
    animated: false,
    staggerDelay: 0.1,
    glowOnFocus: false,
    animatedValidation: true,
    layout: 'inline',
    size: 'middle',
    colon: true,
    requiredMark: true,
  },
};

// Form with different sizes
export const FormSizes: Story = {
  render: () => {
    return (
      <Space direction="vertical" size="large" style={{ width: 400 }}>
        <Card title="Small Size">
          <Form size="small" layout="vertical">
            <Form.Item label="Username">
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="small">Submit</Button>
            </Form.Item>
          </Form>
        </Card>
        
        <Card title="Default Size">
          <Form layout="vertical">
            <Form.Item label="Username">
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        </Card>
        
        <Card title="Large Size">
          <Form size="large" layout="vertical">
            <Form.Item label="Username">
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large">Submit</Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    );
  },
};

// Complex form example
export const ComplexForm: Story = {
  render: () => {
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
      console.log('Form values:', values);
    };
    
    return (
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        animated
        staggerDelay={0.1}
        style={{ width: 600 }}
      >
        <Title level={4}>Personal Information</Title>
        <Paragraph>Please provide your personal details below.</Paragraph>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input prefix={<HomeOutlined />} placeholder="Address" />
        </Form.Item>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please enter your city' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: 'Please enter your state' }]}
            >
              <Input placeholder="State" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="zipCode"
              label="Zip Code"
              rules={[{ required: true, message: 'Please enter your zip code' }]}
            >
              <Input placeholder="Zip Code" />
            </Form.Item>
          </Col>
        </Row>
        
        <Divider />
        
        <Title level={4}>Account Information</Title>
        <Paragraph>Set up your account preferences.</Paragraph>
        
        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select your date of birth' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select your gender' }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
            <Radio value="prefer-not-to-say">Prefer not to say</Radio>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item
          name="preferences"
          label="Preferences"
        >
          <Checkbox.Group>
            <Checkbox value="email-notifications">Email Notifications</Checkbox>
            <Checkbox value="sms-notifications">SMS Notifications</Checkbox>
            <Checkbox value="marketing">Marketing Communications</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        
        <Form.Item
          name="bio"
          label="Bio"
        >
          <TextArea rows={4} placeholder="Tell us about yourself" />
        </Form.Item>
        
        <Form.Item
          name="avatar"
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload name="avatar" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
        </Form.Item>
        
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Submit
            </Button>
            <Button icon={<CloseOutlined />}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    );
  },
};

// Dynamic form example
export const DynamicForm: Story = {
  render: () => {
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
      console.log('Form values:', values);
    };
    
    return (
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: 600 }}
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space 
                  key={key} 
                  style={{ display: 'flex', marginBottom: 8 }} 
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'firstName']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'lastName']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'email']}
                    rules={[
                      { required: true, message: 'Missing email' },
                      { type: 'email', message: 'Invalid email' },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Button onClick={() => remove(name)} type="text" danger>
                    Remove
                  </Button>
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add User
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  },
};

// Form with validation example
export const FormValidation: Story = {
  render: () => {
    const [form] = Form.useForm();
    
    const onFinish = (values: any) => {
      console.log('Form values:', values);
    };
    
    return (
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        animatedValidation
        style={{ width: 400 }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: 'Please enter your username' },
            { min: 3, message: 'Username must be at least 3 characters' },
            { max: 20, message: 'Username cannot exceed 20 characters' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 8, message: 'Password must be at least 8 characters' },
            { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
            { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
            { pattern: /[0-9]/, message: 'Password must contain at least one number' },
            { pattern: /[^A-Za-z0-9]/, message: 'Password must contain at least one special character' },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        
        <Form.Item
          name="website"
          label="Website"
          rules={[
            { type: 'url', message: 'Please enter a valid URL' },
          ]}
        >
          <Input placeholder="Website (optional)" />
        </Form.Item>
        
        <Form.Item
          name="age"
          label="Age"
          rules={[
            { type: 'number', min: 18, message: 'You must be at least 18 years old' },
            { type: 'number', max: 120, message: 'Please enter a valid age' },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Age" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  },
};

// Helper components for the complex form
const { Row, Col } = require('antd');
