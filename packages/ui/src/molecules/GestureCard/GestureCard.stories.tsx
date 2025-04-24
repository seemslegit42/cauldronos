import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GestureCard } from './GestureCard';
import { Typography, Space, Button, Tag } from 'antd';
import { UserOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const meta: Meta<typeof GestureCard> = {
  title: 'Molecules/GestureCard',
  component: GestureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    draggable: { control: 'boolean' },
    swipeable: { control: 'boolean' },
    pinchable: { control: 'boolean' },
    dragAxis: {
      control: { type: 'select' },
      options: ['x', 'y', 'both'],
    },
    cyberpunk: { control: 'boolean' },
    showGestureIndicators: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof GestureCard>;

export const Default: Story = {
  args: {
    title: 'Gesture Card',
    children: (
      <Paragraph>
        This is a card with gesture capabilities. Try interacting with it using different gestures.
      </Paragraph>
    ),
    draggable: true,
    swipeable: true,
    pinchable: false,
    dragAxis: 'both',
    cyberpunk: false,
    showGestureIndicators: true,
    style: { width: 300 },
  },
};

export const DraggableOnly: Story = {
  args: {
    ...Default.args,
    title: 'Draggable Card',
    draggable: true,
    swipeable: false,
    pinchable: false,
  },
};

export const SwipeableOnly: Story = {
  args: {
    ...Default.args,
    title: 'Swipeable Card',
    draggable: false,
    swipeable: true,
    pinchable: false,
    onSwipeLeft: () => console.log('Swiped left'),
    onSwipeRight: () => console.log('Swiped right'),
    onSwipeUp: () => console.log('Swiped up'),
    onSwipeDown: () => console.log('Swiped down'),
  },
};

export const PinchableOnly: Story = {
  args: {
    ...Default.args,
    title: 'Pinchable Card',
    draggable: false,
    swipeable: false,
    pinchable: true,
  },
};

export const CyberpunkStyle: Story = {
  args: {
    ...Default.args,
    title: 'Cyberpunk Card',
    cyberpunk: true,
  },
};

export const ComplexContent: Story = {
  args: {
    ...Default.args,
    title: (
      <Space>
        <UserOutlined />
        <span>User Profile</span>
      </Space>
    ),
    children: (
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong>John Doe</Text>
          <Tag color="blue">Premium</Tag>
        </div>
        <Paragraph>
          Software Engineer with 5 years of experience in React and TypeScript.
        </Paragraph>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size="small" icon={<SettingOutlined />}>Settings</Button>
          <Button size="small" icon={<BellOutlined />}>Notifications</Button>
        </div>
      </Space>
    ),
    style: { width: 300 },
  },
};

export const HorizontalDragOnly: Story = {
  args: {
    ...Default.args,
    title: 'Horizontal Drag',
    draggable: true,
    dragAxis: 'x',
    swipeable: false,
    pinchable: false,
  },
};

export const VerticalDragOnly: Story = {
  args: {
    ...Default.args,
    title: 'Vertical Drag',
    draggable: true,
    dragAxis: 'y',
    swipeable: false,
    pinchable: false,
  },
};

export const WithDragBounds: Story = {
  args: {
    ...Default.args,
    title: 'Bounded Drag',
    draggable: true,
    dragAxis: 'both',
    dragBounds: { left: -100, right: 100, top: -50, bottom: 50 },
    swipeable: false,
    pinchable: false,
  },
};
