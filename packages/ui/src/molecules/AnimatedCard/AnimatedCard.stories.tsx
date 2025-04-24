import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedCard } from './AnimatedCard';
import { Typography, Button, Space, Avatar, Tag } from 'antd';
import { UserOutlined, CalendarOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const meta: Meta<typeof AnimatedCard> = {
  title: 'Molecules/AnimatedCard',
  component: AnimatedCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    animationVariant: {
      control: { type: 'select' },
      options: ['hover', 'pulse', 'glow', 'none'],
    },
    animateOnMount: { control: 'boolean' },
    delay: { control: 'number' },
    hoverAnimation: { control: 'object' },
    title: { control: 'text' },
    bordered: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedCard>;

const DefaultContent = () => (
  <div>
    <Paragraph>
      This is an animated card component with fluid animations and micro-interactions.
      Try hovering over the card to see the animation effect.
    </Paragraph>
    <Button type="primary">Action</Button>
  </div>
);

export const Default: Story = {
  args: {
    title: 'Animated Card',
    animationVariant: 'hover',
    animateOnMount: true,
    delay: 0,
    bordered: true,
    size: 'default',
    style: { width: 300 },
    children: <DefaultContent />,
  },
};

export const PulseAnimation: Story = {
  args: {
    ...Default.args,
    title: 'Pulse Animation',
    animationVariant: 'pulse',
  },
};

export const GlowAnimation: Story = {
  args: {
    ...Default.args,
    title: 'Glow Animation',
    animationVariant: 'glow',
  },
};

export const CustomHoverAnimation: Story = {
  args: {
    ...Default.args,
    title: 'Custom Hover Animation',
    animationVariant: 'hover',
    hoverAnimation: {
      scale: 1.05,
      y: -10,
      rotate: 2,
    },
  },
};

export const DelayedAnimation: Story = {
  args: {
    ...Default.args,
    title: 'Delayed Animation',
    delay: 0.5,
  },
};

export const NoAnimation: Story = {
  args: {
    ...Default.args,
    title: 'No Animation',
    animationVariant: 'none',
  },
};

export const SmallCard: Story = {
  args: {
    ...Default.args,
    title: 'Small Card',
    size: 'small',
  },
};

export const ComplexContent: Story = {
  args: {
    ...Default.args,
    title: (
      <Space>
        <Avatar icon={<UserOutlined />} />
        <span>User Profile</span>
      </Space>
    ),
    extra: <Button type="link">More</Button>,
    children: (
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text strong>John Doe</Text>
          <Tag color="blue">Premium</Tag>
        </div>
        <Paragraph>
          Software Engineer with 5 years of experience in React and TypeScript.
        </Paragraph>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Space>
            <CalendarOutlined /> <Text type="secondary">Joined 2021</Text>
          </Space>
          <Space>
            <Space>
              <HeartOutlined /> <Text>42</Text>
            </Space>
            <Space>
              <MessageOutlined /> <Text>24</Text>
            </Space>
          </Space>
        </div>
      </Space>
    ),
    style: { width: 300 },
  },
};
