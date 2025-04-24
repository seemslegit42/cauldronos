import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CyberpunkCardX } from './CyberpunkCardX';
import { Typography, Space, Button, Statistic } from 'antd';
import { RocketOutlined, ThunderboltOutlined, LineChartOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const meta: Meta<typeof CyberpunkCardX> = {
  title: 'Molecules/CyberpunkCardX',
  component: CyberpunkCardX,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    glowColor: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info'],
    },
    glowOnHover: { control: 'boolean' },
    alwaysGlow: { control: 'boolean' },
    pulseGlow: { control: 'boolean' },
    scanlines: { control: 'boolean' },
    borderHighlight: { control: 'boolean' },
    glitchOnHover: { control: 'boolean' },
    glowIntensity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    borderStyle: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'],
    },
    perspective: { control: 'boolean' },
    aiPowered: { control: 'boolean' },
    showAiInsights: { control: 'boolean' },
    gestureEnabled: { control: 'boolean' },
    draggable: { control: 'boolean' },
    swipeable: { control: 'boolean' },
    parallaxEffect: { control: 'boolean' },
    floatingAction: { control: 'boolean' },
    showBadge: { control: 'boolean' },
    badgeStatus: {
      control: { type: 'select' },
      options: ['success', 'processing', 'default', 'error', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CyberpunkCardX>;

// Sample AI insights
const sampleAiInsights = [
  'This card contains important metrics for your project',
  'User engagement has increased by 15% since last month',
  'Consider adding more detailed analytics for better insights',
];

export const Default: Story = {
  args: {
    title: 'Cyberpunk Card X',
    glowColor: 'primary',
    glowOnHover: true,
    alwaysGlow: false,
    pulseGlow: false,
    scanlines: true,
    borderHighlight: true,
    glitchOnHover: false,
    glowIntensity: 0.5,
    borderStyle: 'solid',
    perspective: false,
    aiPowered: false,
    aiModel: 'default',
    aiInsights: sampleAiInsights,
    showAiInsights: false,
    gestureEnabled: false,
    draggable: false,
    swipeable: false,
    parallaxEffect: false,
    floatingAction: false,
    showBadge: false,
    badgeContent: 'New',
    badgeStatus: 'default',
    style: { width: 300 },
    children: (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Paragraph>
          This is a basic Cyberpunk Card X component with default settings.
        </Paragraph>
        <Button type="primary">Action</Button>
      </Space>
    ),
  },
};

export const WithGlowEffects: Story = {
  args: {
    ...Default.args,
    title: 'Glowing Card',
    glowColor: 'accent',
    glowOnHover: true,
    pulseGlow: true,
    glowIntensity: 0.7,
    children: (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Paragraph>
          This card features enhanced glow effects with pulsing animation.
        </Paragraph>
        <Button type="primary" icon={<ThunderboltOutlined />}>
          Energize
        </Button>
      </Space>
    ),
  },
};

export const WithAIFeatures: Story = {
  args: {
    ...Default.args,
    title: 'AI-Powered Card',
    glowColor: 'info',
    aiPowered: true,
    aiModel: 'GPT-4',
    aiInsights: sampleAiInsights,
    showAiInsights: true,
    children: (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Paragraph>
          This card is enhanced with AI capabilities, providing insights and intelligent features.
        </Paragraph>
        <Statistic 
          title="User Engagement" 
          value={85} 
          suffix="%" 
          valueStyle={{ color: '#00F0FF' }}
          prefix={<LineChartOutlined />} 
        />
      </Space>
    ),
  },
};

export const WithGestureInteractions: Story = {
  args: {
    ...Default.args,
    title: 'Interactive Card',
    glowColor: 'success',
    gestureEnabled: true,
    draggable: true,
    swipeable: true,
    parallaxEffect: true,
    children: (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Paragraph>
          This card supports gesture interactions. Try dragging it or using the parallax effect by moving your mouse over it.
        </Paragraph>
        <Button type="primary" icon={<RocketOutlined />}>
          Launch
        </Button>
      </Space>
    ),
  },
};

export const WithBadgeAndFloatingAction: Story = {
  args: {
    ...Default.args,
    title: 'Featured Card',
    glowColor: 'warning',
    showBadge: true,
    badgeContent: 'Featured',
    badgeStatus: 'warning',
    floatingAction: true,
    children: (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Paragraph>
          This card includes a badge and a floating action button for quick actions.
        </Paragraph>
        <Text type="secondary">
          Click the floating action button to perform a primary action.
        </Text>
      </Space>
    ),
  },
};

export const FullFeatured: Story = {
  args: {
    ...Default.args,
    title: 'Ultimate Cyberpunk Card',
    glowColor: 'accent',
    glowOnHover: true,
    pulseGlow: true,
    scanlines: true,
    borderHighlight: true,
    glitchOnHover: true,
    glowIntensity: 0.8,
    perspective: true,
    aiPowered: true,
    aiModel: 'GPT-4',
    aiInsights: [
      ...sampleAiInsights,
      'This card demonstrates all available features',
      'Combining multiple effects creates a unique user experience',
    ],
    showAiInsights: true,
    gestureEnabled: true,
    parallaxEffect: true,
    floatingAction: true,
    showBadge: true,
    badgeContent: 'Premium',
    badgeStatus: 'success',
    children: (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Title level={5}>Ultimate Cyberpunk Experience</Title>
        <Paragraph>
          This card showcases all available features of the CyberpunkCardX component,
          combining AI capabilities, animations, and interactive elements.
        </Paragraph>
        <Statistic 
          title="Power Level" 
          value={9000} 
          valueStyle={{ color: '#BD00FF' }}
          prefix={<ThunderboltOutlined />} 
        />
        <Button type="primary" block>
          Experience Now
        </Button>
      </Space>
    ),
  },
};
