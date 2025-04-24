import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import { Space, Divider } from 'antd';

const { Title, Text, Paragraph, Link } = Typography;

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    cyberpunk: { control: 'boolean' },
    animated: { control: 'boolean' },
    delay: { control: 'number' },
    glow: { control: 'boolean' },
    glitch: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '600px' }}>
      <Title>h1. CauldronOS Typography</Title>
      <Title level={2}>h2. CauldronOS Typography</Title>
      <Title level={3}>h3. CauldronOS Typography</Title>
      <Title level={4}>h4. CauldronOS Typography</Title>
      <Title level={5}>h5. CauldronOS Typography</Title>
      <Paragraph>
        CauldronOS UI provides a comprehensive set of design principles, guidelines, and components
        for building modern, accessible, and intelligent user interfaces. This is a paragraph that
        demonstrates the typography styles.
      </Paragraph>
      <Paragraph>
        <Text strong>This is strong text.</Text>
        <br />
        <Text italic>This is italic text.</Text>
        <br />
        <Text underline>This is underlined text.</Text>
        <br />
        <Text delete>This is deleted text.</Text>
        <br />
        <Text mark>This is marked text.</Text>
        <br />
        <Text code>This is code text.</Text>
        <br />
        <Text keyboard>This is keyboard text.</Text>
        <br />
        <Link href="https://ant.design" target="_blank">
          This is a link to Ant Design
        </Link>
      </Paragraph>
    </Space>
  ),
};

export const TextTypes: Story = {
  render: () => (
    <Space direction="vertical">
      <Text>Default Text</Text>
      <Text type="secondary">Secondary Text</Text>
      <Text type="success">Success Text</Text>
      <Text type="warning">Warning Text</Text>
      <Text type="danger">Danger Text</Text>
      <Text disabled>Disabled Text</Text>
    </Space>
  ),
};

export const EditableText: Story = {
  render: () => (
    <Space direction="vertical">
      <Text editable={{ onChange: (value) => console.log(value) }}>
        This is an editable text.
      </Text>
      <Text copyable>This is a copyable text.</Text>
      <Text
        copyable={{
          text: 'Custom text to copy',
          onCopy: () => console.log('Text copied'),
        }}
      >
        This has custom copy text.
      </Text>
    </Space>
  ),
};

export const EllipsisText: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '300px' }}>
      <Text ellipsis>
        This very long text will be truncated with an ellipsis when it exceeds the width of its container.
        Hover over it to see the full text.
      </Text>
      <Text
        ellipsis={{
          rows: 2,
          expandable: true,
          onExpand: () => console.log('Expanded'),
        }}
      >
        This very long text will be truncated with an ellipsis after 2 rows.
        Click on the expand button to see the full text.
        This is a very long text that demonstrates the ellipsis feature.
        It will be truncated after 2 rows and can be expanded.
      </Text>
    </Space>
  ),
};

export const CyberpunkTypography: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '600px' }}>
      <Title cyberpunk>Cyberpunk Title</Title>
      <Title level={2} cyberpunk>Cyberpunk Subtitle</Title>
      <Paragraph cyberpunk>
        This is a paragraph with cyberpunk styling. It features a futuristic look with neon-like
        effects and a distinct color scheme that evokes a high-tech, dystopian aesthetic.
      </Paragraph>
      <Text cyberpunk>Cyberpunk Text</Text>
      <Link cyberpunk href="#">Cyberpunk Link</Link>
    </Space>
  ),
};

export const AnimatedTypography: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '600px' }}>
      <Title animated>Animated Title</Title>
      <Title level={2} animated delay={0.1}>Animated Subtitle (delay 0.1s)</Title>
      <Title level={3} animated delay={0.2}>Animated Subtitle (delay 0.2s)</Title>
      <Paragraph animated delay={0.3}>
        This is an animated paragraph that fades in with a slight delay. Animation can be used to
        create a more engaging user experience and draw attention to important content.
      </Paragraph>
      <Space>
        <Text animated delay={0.4}>Animated Text</Text>
        <Link animated delay={0.5} href="#">Animated Link</Link>
      </Space>
    </Space>
  ),
};

export const GlowEffect: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '600px' }}>
      <Title glow>Glowing Title</Title>
      <Title level={2} glow>Glowing Subtitle</Title>
      <Paragraph glow>
        This paragraph has a glow effect that makes it stand out from the rest of the content.
        The glow effect can be used to highlight important information or create a specific mood.
      </Paragraph>
      <Text glow>Glowing Text</Text>
      <Link glow href="#">Glowing Link</Link>
    </Space>
  ),
};

export const GlitchEffect: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '600px' }}>
      <Title glitch>Glitching Title</Title>
      <Title level={2} glitch>Glitching Subtitle</Title>
      <Paragraph glitch>
        This paragraph has a glitch effect that creates a distorted, digital appearance.
        The glitch effect can be used to create a sense of unease or to emphasize a cyberpunk aesthetic.
      </Paragraph>
      <Text glitch>Glitching Text</Text>
      <Link glitch href="#">Glitching Link</Link>
    </Space>
  ),
};

export const CombinedEffects: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '600px' }}>
      <Title cyberpunk animated glow>Cyberpunk Animated Glowing Title</Title>
      <Paragraph cyberpunk animated delay={0.2}>
        This paragraph combines cyberpunk styling with animation for a dynamic effect.
        It fades in with a slight delay and features the distinctive cyberpunk aesthetic.
      </Paragraph>
      <Text cyberpunk glow>Cyberpunk Glowing Text</Text>
      <Link cyberpunk animated glow href="#">Cyberpunk Animated Glowing Link</Link>
    </Space>
  ),
};
