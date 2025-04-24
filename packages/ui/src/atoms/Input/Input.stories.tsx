import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Space, Typography } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  SearchOutlined, 
  InfoCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons';

const { Title, Text } = Typography;

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['large', 'middle', 'small'],
    },
    status: {
      control: { type: 'select' },
      options: [undefined, 'error', 'warning'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'number', 'email', 'tel', 'url'],
    },
    disabled: { control: 'boolean' },
    bordered: { control: 'boolean' },
    cyberpunk: { control: 'boolean' },
    animated: { control: 'boolean' },
    glowOnFocus: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Basic input',
    size: 'middle',
    disabled: false,
    bordered: true,
    cyberpunk: false,
    animated: true,
    glowOnFocus: false,
  },
};

export const WithPrefix: Story = {
  args: {
    ...Default.args,
    placeholder: 'Input with prefix',
    prefix: <UserOutlined />,
  },
};

export const WithSuffix: Story = {
  args: {
    ...Default.args,
    placeholder: 'Input with suffix',
    suffix: <InfoCircleOutlined />,
  },
};

export const WithAddon: Story = {
  args: {
    ...Default.args,
    placeholder: 'Input with addon',
    addonBefore: 'http://',
    addonAfter: '.com',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithStatus: Story = {
  args: {
    ...Default.args,
    placeholder: 'Input with error status',
    status: 'error',
  },
};

export const Cyberpunk: Story = {
  args: {
    ...Default.args,
    placeholder: 'Cyberpunk input',
    cyberpunk: true,
  },
};

export const GlowOnFocus: Story = {
  args: {
    ...Default.args,
    placeholder: 'Input with glow effect on focus',
    glowOnFocus: true,
  },
};

export const Password: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '300px' }}>
      <Input.Password 
        placeholder="Password input" 
        prefix={<LockOutlined />}
      />
      <Input.Password 
        placeholder="Customized icons"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Input.Password 
        placeholder="Cyberpunk password" 
        cyberpunk 
        glowOnFocus
      />
    </Space>
  ),
};

export const TextArea: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '300px' }}>
      <Input.TextArea 
        placeholder="Basic textarea" 
        rows={4}
      />
      <Input.TextArea 
        placeholder="With auto-size"
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <Input.TextArea 
        placeholder="Cyberpunk textarea" 
        rows={4}
        cyberpunk 
        glowOnFocus
      />
    </Space>
  ),
};

export const Search: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '300px' }}>
      <Input.Search 
        placeholder="Basic search" 
      />
      <Input.Search 
        placeholder="Search with loading"
        loading
      />
      <Input.Search 
        placeholder="Search with enter button"
        enterButton
      />
      <Input.Search 
        placeholder="Search with custom button"
        enterButton="Search"
        prefix={<SearchOutlined />}
      />
      <Input.Search 
        placeholder="Cyberpunk search" 
        enterButton="Search"
        cyberpunk 
        glowOnFocus
      />
    </Space>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '300px' }}>
      <Input size="large" placeholder="Large input" prefix={<UserOutlined />} />
      <Input placeholder="Default input" prefix={<UserOutlined />} />
      <Input size="small" placeholder="Small input" prefix={<UserOutlined />} />
    </Space>
  ),
};

export const Group: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={5}>Basic Group</Title>
      <Input.Group>
        <Input style={{ width: '20%' }} defaultValue="http://" />
        <Input style={{ width: '60%' }} defaultValue="example.com" />
        <Input style={{ width: '20%' }} defaultValue="/path" />
      </Input.Group>
      
      <Title level={5}>Compact Mode</Title>
      <Input.Group compact>
        <Input style={{ width: '20%' }} defaultValue="http://" />
        <Input style={{ width: '60%' }} defaultValue="example.com" />
        <Input style={{ width: '20%' }} defaultValue="/path" />
      </Input.Group>
      
      <Title level={5}>With Cyberpunk Style</Title>
      <Input.Group compact>
        <Input style={{ width: '30%' }} defaultValue="Username" cyberpunk />
        <Input.Password style={{ width: '70%' }} defaultValue="password" cyberpunk />
      </Input.Group>
    </Space>
  ),
};

export const WithTooltip: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '300px' }}>
      <Input 
        placeholder="Input with tooltip" 
        suffix={
          <Text type="secondary" style={{ cursor: 'help' }}>
            <InfoCircleOutlined title="Extra information" />
          </Text>
        }
      />
    </Space>
  ),
};
