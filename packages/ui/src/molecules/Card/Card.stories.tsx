import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Typography, Space, Button, Avatar, Tag, Divider } from 'antd';
import { UserOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    animated: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'cyber', 'terminal', 'glass'],
    },
    hoverEffect: {
      control: { type: 'select' },
      options: ['none', 'lift', 'glow', 'scale', 'border'],
    },
    glitchOnHover: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
    },
    bordered: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    style: { width: 300 },
    children: (
      <Paragraph>
        This is a basic card component with a title and content.
        It can be used to display information in a contained format.
      </Paragraph>
    ),
    animated: true,
    variant: 'default',
    hoverEffect: 'none',
    glitchOnHover: false,
    bordered: true,
    size: 'default',
    loading: false,
  },
};

export const WithMeta: Story = {
  args: {
    style: { width: 300 },
    cover: (
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    ),
    actions: [
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ],
    children: (
      <Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title="Card with Meta"
        description="This card uses the Card.Meta component to display structured content with an avatar, title, and description."
      />
    ),
  },
};

export const CyberVariant: Story = {
  args: {
    ...Default.args,
    title: 'Cyber Card',
    variant: 'cyber',
    children: (
      <Paragraph>
        This card uses the cyber variant styling, which gives it a futuristic, 
        cyberpunk-inspired appearance with neon accents and digital effects.
      </Paragraph>
    ),
  },
};

export const TerminalVariant: Story = {
  args: {
    ...Default.args,
    title: 'Terminal Card',
    variant: 'terminal',
    children: (
      <Paragraph>
        This card uses the terminal variant styling, which mimics the appearance
        of a command-line terminal with monospace fonts and a dark background.
      </Paragraph>
    ),
  },
};

export const GlassVariant: Story = {
  args: {
    ...Default.args,
    title: 'Glass Card',
    variant: 'glass',
    children: (
      <Paragraph>
        This card uses the glass variant styling, which creates a translucent,
        frosted glass effect that allows the background to show through.
      </Paragraph>
    ),
  },
};

export const LiftHoverEffect: Story = {
  args: {
    ...Default.args,
    title: 'Lift on Hover',
    hoverEffect: 'lift',
    children: (
      <Paragraph>
        This card lifts up when hovered, creating a subtle elevation effect
        that makes it appear to float above the page.
      </Paragraph>
    ),
  },
};

export const GlowHoverEffect: Story = {
  args: {
    ...Default.args,
    title: 'Glow on Hover',
    hoverEffect: 'glow',
    children: (
      <Paragraph>
        This card glows when hovered, creating a halo effect around the edges
        that draws attention to the card.
      </Paragraph>
    ),
  },
};

export const ScaleHoverEffect: Story = {
  args: {
    ...Default.args,
    title: 'Scale on Hover',
    hoverEffect: 'scale',
    children: (
      <Paragraph>
        This card scales up slightly when hovered, creating a subtle zoom effect
        that makes the card appear more prominent.
      </Paragraph>
    ),
  },
};

export const BorderHoverEffect: Story = {
  args: {
    ...Default.args,
    title: 'Border on Hover',
    hoverEffect: 'border',
    children: (
      <Paragraph>
        This card shows a highlighted border when hovered, creating a framing effect
        that draws attention to the card's boundaries.
      </Paragraph>
    ),
  },
};

export const GlitchOnHover: Story = {
  args: {
    ...Default.args,
    title: 'Glitch on Hover',
    glitchOnHover: true,
    children: (
      <Paragraph>
        This card displays a glitch animation when hovered, creating a digital distortion
        effect that gives it a cyberpunk feel.
      </Paragraph>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    title: 'Small Card',
    size: 'small',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    title: 'Loading Card',
    loading: true,
  },
};

export const WithTabs: Story = {
  render: () => (
    <Card
      style={{ width: 300 }}
      tabList={[
        {
          key: 'tab1',
          tab: 'Tab 1',
        },
        {
          key: 'tab2',
          tab: 'Tab 2',
        },
      ]}
      defaultActiveTabKey="tab1"
    >
      <div key="tab1">
        <Paragraph>
          This is the content of Tab 1. Cards can have tabs to organize content
          into different sections that can be switched between.
        </Paragraph>
      </div>
      <div key="tab2">
        <Paragraph>
          This is the content of Tab 2. Each tab can contain different content,
          allowing for a compact presentation of related information.
        </Paragraph>
      </div>
    </Card>
  ),
};

export const WithExtraContent: Story = {
  render: () => (
    <Card
      title="Card with Extra Content"
      extra={<Button type="link">More</Button>}
      style={{ width: 300 }}
    >
      <Paragraph>
        This card has extra content in the header, which can be used for actions
        or additional information related to the card's content.
      </Paragraph>
    </Card>
  ),
};

export const GridCards: Story = {
  render: () => (
    <Card title="Grid Card" style={{ width: 500 }}>
      <Card.Grid style={{ width: '50%' }}>
        <Paragraph>Grid Card Content</Paragraph>
      </Card.Grid>
      <Card.Grid style={{ width: '50%' }}>
        <Paragraph>Grid Card Content</Paragraph>
      </Card.Grid>
      <Card.Grid style={{ width: '33.33%' }}>
        <Paragraph>Grid Card Content</Paragraph>
      </Card.Grid>
      <Card.Grid style={{ width: '33.33%' }}>
        <Paragraph>Grid Card Content</Paragraph>
      </Card.Grid>
      <Card.Grid style={{ width: '33.33%' }}>
        <Paragraph>Grid Card Content</Paragraph>
      </Card.Grid>
    </Card>
  ),
};

export const InnerCards: Story = {
  render: () => (
    <Card title="Outer Card" style={{ width: 500 }}>
      <Paragraph>
        This is the content of the outer card. It can contain other cards as inner content.
      </Paragraph>
      <Card
        size="small"
        title="Inner Card 1"
        style={{ marginBottom: 16 }}
      >
        <Paragraph>
          This is the content of inner card 1.
        </Paragraph>
      </Card>
      <Card
        size="small"
        title="Inner Card 2"
      >
        <Paragraph>
          This is the content of inner card 2.
        </Paragraph>
      </Card>
    </Card>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <Card
      title="Project Overview"
      extra={<Button type="primary" size="small">Edit</Button>}
      style={{ width: 400 }}
      actions={[
        <Button type="text" icon={<UserOutlined />}>Team</Button>,
        <Button type="text" icon={<SettingOutlined />}>Settings</Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>Website Redesign</Title>
          <Tag color="blue">In Progress</Tag>
        </div>
        
        <Paragraph>
          Complete overhaul of the company website with new branding, improved UX,
          and mobile-first responsive design.
        </Paragraph>
        
        <Divider style={{ margin: '12px 0' }} />
        
        <Space>
          <div>
            <Text type="secondary">Deadline</Text>
            <div>June 30, 2023</div>
          </div>
          <Divider type="vertical" />
          <div>
            <Text type="secondary">Budget</Text>
            <div>$15,000</div>
          </div>
          <Divider type="vertical" />
          <div>
            <Text type="secondary">Team</Text>
            <div>
              <Avatar.Group>
                <Avatar icon={<UserOutlined />} />
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                <Avatar style={{ backgroundColor: '#87d068' }}>L</Avatar>
                <Avatar style={{ backgroundColor: '#1677ff' }}>+2</Avatar>
              </Avatar.Group>
            </div>
          </div>
        </Space>
      </Space>
    </Card>
  ),
};
