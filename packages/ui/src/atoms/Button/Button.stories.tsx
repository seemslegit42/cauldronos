import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Space } from 'antd';
import { 
  SearchOutlined, 
  DownloadOutlined, 
  UserOutlined, 
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'default', 'dashed', 'link', 'text'],
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'middle', 'small'],
    },
    shape: {
      control: { type: 'select' },
      options: ['default', 'circle', 'round'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'cyber', 'ghost', 'text'],
    },
    danger: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    ghost: { control: 'boolean' },
    block: { control: 'boolean' },
    animated: { control: 'boolean' },
    glowOnHover: { control: 'boolean' },
    glitchOnHover: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    type: 'default',
    size: 'middle',
    shape: 'default',
    variant: 'default',
    danger: false,
    disabled: false,
    loading: false,
    ghost: false,
    block: false,
    animated: true,
    glowOnHover: false,
    glitchOnHover: false,
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    children: 'Primary Button',
    type: 'primary',
  },
};

export const Dashed: Story = {
  args: {
    ...Default.args,
    children: 'Dashed Button',
    type: 'dashed',
  },
};

export const Link: Story = {
  args: {
    ...Default.args,
    children: 'Link Button',
    type: 'link',
  },
};

export const Text: Story = {
  args: {
    ...Default.args,
    children: 'Text Button',
    type: 'text',
  },
};

export const Danger: Story = {
  args: {
    ...Default.args,
    children: 'Danger Button',
    danger: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    children: 'Loading Button',
    loading: true,
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    children: 'Search',
    icon: <SearchOutlined />,
  },
};

export const IconOnly: Story = {
  args: {
    ...Default.args,
    icon: <SearchOutlined />,
    shape: 'circle',
  },
};

export const CyberVariant: Story = {
  args: {
    ...Default.args,
    children: 'Cyber Button',
    variant: 'cyber',
    type: 'primary',
  },
};

export const GhostVariant: Story = {
  args: {
    ...Default.args,
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const GlowOnHover: Story = {
  args: {
    ...Default.args,
    children: 'Glow on Hover',
    glowOnHover: true,
    type: 'primary',
  },
};

export const GlitchOnHover: Story = {
  args: {
    ...Default.args,
    children: 'Glitch on Hover',
    glitchOnHover: true,
    type: 'primary',
  },
};

export const ButtonSizes: Story = {
  render: () => (
    <Space direction="vertical">
      <Space>
        <Button size="large">Large Button</Button>
        <Button>Default Button</Button>
        <Button size="small">Small Button</Button>
      </Space>
      <Space>
        <Button type="primary" size="large">Large Primary</Button>
        <Button type="primary">Default Primary</Button>
        <Button type="primary" size="small">Small Primary</Button>
      </Space>
    </Space>
  ),
};

export const ButtonShapes: Story = {
  render: () => (
    <Space>
      <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      <Button type="primary" shape="round" icon={<SearchOutlined />}>Search</Button>
      <Button type="primary" icon={<SearchOutlined />}>Search</Button>
    </Space>
  ),
};

export const ButtonGroup: Story = {
  render: () => (
    <Space direction="vertical">
      <Space>
        <Button.Group>
          <Button type="primary">Left</Button>
          <Button type="primary">Middle</Button>
          <Button type="primary">Right</Button>
        </Button.Group>
      </Space>
      <Space>
        <Button.Group>
          <Button icon={<UserOutlined />}>Profile</Button>
          <Button icon={<SettingOutlined />}>Settings</Button>
        </Button.Group>
      </Space>
    </Space>
  ),
};

export const BlockButton: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" block>Primary Block Button</Button>
      <Button block>Default Block Button</Button>
      <Button type="dashed" block>Dashed Block Button</Button>
      <Button type="link" block>Link Block Button</Button>
    </Space>
  ),
};

export const ActionButtons: Story = {
  render: () => (
    <Space>
      <Button type="primary" icon={<PlusOutlined />}>Add</Button>
      <Button type="primary" icon={<DownloadOutlined />}>Download</Button>
      <Button danger icon={<DeleteOutlined />}>Delete</Button>
    </Space>
  ),
};
