import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageTransition } from './PageTransition';
import { Card, Typography, Button, Space } from 'antd';

const { Title, Paragraph } = Typography;

const meta: Meta<typeof PageTransition> = {
  title: 'Animations/PageTransition',
  component: PageTransition,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['fade', 'slide', 'scale', 'flip', 'blur', 'perspective', 'swipe'],
    },
    direction: {
      control: { type: 'select' },
      options: ['up', 'down', 'left', 'right'],
    },
    gestureEnabled: { control: 'boolean' },
    perspective: { control: 'boolean' },
    cyberpunk: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PageTransition>;

const ExampleContent = () => (
  <Card style={{ width: 400 }}>
    <Title level={3}>Page Content</Title>
    <Paragraph>
      This is an example of content that would be wrapped in a PageTransition component.
      The transition will be applied when the page is mounted or unmounted.
    </Paragraph>
    <Space>
      <Button type="primary">Primary Action</Button>
      <Button>Secondary Action</Button>
    </Space>
  </Card>
);

export const Default: Story = {
  args: {
    type: 'fade',
    direction: 'up',
    gestureEnabled: false,
    perspective: false,
    cyberpunk: false,
    children: <ExampleContent />,
  },
};

export const SlideTransition: Story = {
  args: {
    ...Default.args,
    type: 'slide',
    direction: 'up',
  },
};

export const ScaleTransition: Story = {
  args: {
    ...Default.args,
    type: 'scale',
  },
};

export const FlipTransition: Story = {
  args: {
    ...Default.args,
    type: 'flip',
  },
};

export const BlurTransition: Story = {
  args: {
    ...Default.args,
    type: 'blur',
  },
};

export const PerspectiveTransition: Story = {
  args: {
    ...Default.args,
    type: 'perspective',
    perspective: true,
  },
};

export const SwipeTransition: Story = {
  args: {
    ...Default.args,
    type: 'swipe',
    direction: 'left',
  },
};

export const WithGestures: Story = {
  args: {
    ...Default.args,
    type: 'slide',
    gestureEnabled: true,
    onSwipeLeft: () => console.log('Swiped left'),
    onSwipeRight: () => console.log('Swiped right'),
  },
};

export const CyberpunkStyle: Story = {
  args: {
    ...Default.args,
    type: 'slide',
    cyberpunk: true,
  },
};
