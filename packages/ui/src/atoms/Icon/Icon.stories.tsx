import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { Space, Card, Divider, Typography } from 'antd';

const { Title, Text } = Typography;

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    size: { control: 'number' },
    color: { control: 'color' },
    cyberpunk: { control: 'boolean' },
    animated: { control: 'boolean' },
    animationType: {
      control: { type: 'select' },
      options: ['pulse', 'spin', 'bounce', 'shake'],
    },
    glow: { control: 'boolean' },
    glitch: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'UserOutlined',
    size: 24,
    color: undefined,
    cyberpunk: false,
    animated: false,
    animationType: 'pulse',
    glow: false,
    glitch: false,
  },
};

export const Colored: Story = {
  args: {
    ...Default.args,
    name: 'HeartOutlined',
    color: '#ff4d4f',
  },
};

export const Cyberpunk: Story = {
  args: {
    ...Default.args,
    name: 'RobotOutlined',
    cyberpunk: true,
  },
};

export const Animated: Story = {
  args: {
    ...Default.args,
    name: 'LoadingOutlined',
    animated: true,
    animationType: 'spin',
  },
};

export const Glow: Story = {
  args: {
    ...Default.args,
    name: 'BulbOutlined',
    glow: true,
    color: '#faad14',
  },
};

export const Glitch: Story = {
  args: {
    ...Default.args,
    name: 'BugOutlined',
    glitch: true,
  },
};

export const Combined: Story = {
  args: {
    ...Default.args,
    name: 'ThunderboltOutlined',
    cyberpunk: true,
    animated: true,
    animationType: 'pulse',
    glow: true,
  },
};

export const IconGallery: Story = {
  render: () => {
    // Common icon categories
    const categories = [
      {
        title: 'Direction Icons',
        icons: [
          'ArrowUpOutlined',
          'ArrowDownOutlined',
          'ArrowLeftOutlined',
          'ArrowRightOutlined',
          'CaretUpOutlined',
          'CaretDownOutlined',
          'CaretLeftOutlined',
          'CaretRightOutlined',
          'UpOutlined',
          'DownOutlined',
          'LeftOutlined',
          'RightOutlined',
        ],
      },
      {
        title: 'Suggestion Icons',
        icons: [
          'CheckOutlined',
          'CloseOutlined',
          'PlusOutlined',
          'MinusOutlined',
          'InfoOutlined',
          'ExclamationOutlined',
          'QuestionOutlined',
          'WarningOutlined',
          'CheckCircleOutlined',
          'CloseCircleOutlined',
          'InfoCircleOutlined',
          'ExclamationCircleOutlined',
        ],
      },
      {
        title: 'Edit Icons',
        icons: [
          'EditOutlined',
          'FormOutlined',
          'CopyOutlined',
          'ScissorOutlined',
          'DeleteOutlined',
          'SnippetsOutlined',
          'DiffOutlined',
          'HighlightOutlined',
          'AlignCenterOutlined',
          'AlignLeftOutlined',
          'AlignRightOutlined',
          'BgColorsOutlined',
        ],
      },
      {
        title: 'Data Icons',
        icons: [
          'AreaChartOutlined',
          'PieChartOutlined',
          'BarChartOutlined',
          'LineChartOutlined',
          'RadarChartOutlined',
          'HeatMapOutlined',
          'FundOutlined',
          'StockOutlined',
          'RiseOutlined',
          'FallOutlined',
          'DotChartOutlined',
          'BoxPlotOutlined',
        ],
      },
      {
        title: 'Brand and Logos',
        icons: [
          'AndroidOutlined',
          'AppleOutlined',
          'WindowsOutlined',
          'IeOutlined',
          'ChromeOutlined',
          'GithubOutlined',
          'AliwangwangOutlined',
          'DingdingOutlined',
          'WeiboOutlined',
          'TwitterOutlined',
          'YoutubeOutlined',
          'FacebookOutlined',
        ],
      },
    ];
    
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={3}>Icon Gallery</Title>
        <Text>A collection of commonly used icons from Ant Design.</Text>
        
        {categories.map((category) => (
          <Card 
            key={category.title} 
            title={category.title}
            style={{ marginBottom: 16 }}
          >
            <Space wrap>
              {category.icons.map((iconName) => (
                <Card 
                  key={iconName} 
                  size="small"
                  style={{ width: 120, textAlign: 'center' }}
                >
                  <Space direction="vertical" size="small">
                    <Icon name={iconName} size={24} />
                    <Text style={{ fontSize: 12 }}>{iconName}</Text>
                  </Space>
                </Card>
              ))}
            </Space>
          </Card>
        ))}
      </Space>
    );
  },
};

export const AnimationTypes: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={3}>Animation Types</Title>
      <Text>Different animation types available for icons.</Text>
      
      <Space wrap>
        <Card size="small" title="Pulse" style={{ width: 120, textAlign: 'center' }}>
          <Icon name="HeartOutlined" size={32} animated animationType="pulse" color="#ff4d4f" />
        </Card>
        
        <Card size="small" title="Spin" style={{ width: 120, textAlign: 'center' }}>
          <Icon name="LoadingOutlined" size={32} animated animationType="spin" color="#1677ff" />
        </Card>
        
        <Card size="small" title="Bounce" style={{ width: 120, textAlign: 'center' }}>
          <Icon name="RocketOutlined" size={32} animated animationType="bounce" color="#722ed1" />
        </Card>
        
        <Card size="small" title="Shake" style={{ width: 120, textAlign: 'center' }}>
          <Icon name="BellOutlined" size={32} animated animationType="shake" color="#faad14" />
        </Card>
      </Space>
    </Space>
  ),
};

export const StyleVariations: Story = {
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={3}>Style Variations</Title>
      <Text>Different styling options for icons.</Text>
      
      <Space wrap>
        <Card size="small" title="Default" style={{ width: 120, textAlign: 'center' }}>
          <Icon name="StarOutlined" size={32} />
        </Card>
        
        <Card size="small" title="Colored" style={{ width: 120, textAlign: 'center' }}>
          <Icon name="StarOutlined" size={32} color="#faad14" />
        </Card>
        
        <Card size="small" title="Cyberpunk" style={{ width: 120, textAlign: 'center' }}>
          <Icon name="StarOutlined" size={32} cyberpunk />
        </Card>
        
        <Card size="small" title="Glow" style={{ width: 120, textAlign: 'center' }}>
          <Icon name="StarOutlined" size={32} glow color="#faad14" />
        </Card>
        
        <Card size="small" title="Glitch" style={{ width: 120, textAlign: 'center' }}>
          <Icon name="StarOutlined" size={32} glitch />
        </Card>
        
        <Card size="small" title="Combined" style={{ width: 120, textAlign: 'center' }}>
          <Icon 
            name="StarOutlined" 
            size={32} 
            cyberpunk 
            animated 
            animationType="pulse" 
            glow 
          />
        </Card>
      </Space>
    </Space>
  ),
};
