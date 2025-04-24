import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ThemeProvider from './ThemeProvider';
import { useTheme } from './ThemeProvider';
import { Button, Card, Typography, Space, Switch, Divider, Radio, ColorPicker, InputNumber } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

// Create a wrapper component to use the theme context
const ThemeDemo = () => {
  const { theme, setTheme, toggleDarkMode, isDarkMode } = useTheme();
  
  const handlePrimaryColorChange = (color: any) => {
    setTheme({
      ...theme,
      primaryColor: color.toHexString(),
    });
  };
  
  const handleBorderRadiusChange = (value: number | null) => {
    if (value !== null) {
      setTheme({
        ...theme,
        borderRadius: value,
      });
    }
  };
  
  const handleFontSizeChange = (value: number | null) => {
    if (value !== null) {
      setTheme({
        ...theme,
        fontSize: value,
      });
    }
  };
  
  return (
    <Card title="Theme Settings" style={{ width: 500 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong>Dark Mode</Text>
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<BulbOutlined />}
          />
        </div>
        
        <Divider />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong>Primary Color</Text>
          <ColorPicker
            value={theme.primaryColor}
            onChange={handlePrimaryColorChange}
            showText
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong>Border Radius</Text>
          <InputNumber
            min={0}
            max={20}
            value={theme.borderRadius}
            onChange={handleBorderRadiusChange}
            addonAfter="px"
            style={{ width: 120 }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong>Font Size</Text>
          <InputNumber
            min={12}
            max={20}
            value={theme.fontSize}
            onChange={handleFontSizeChange}
            addonAfter="px"
            style={{ width: 120 }}
          />
        </div>
        
        <Divider />
        
        <Title level={4}>Preview</Title>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card title="Sample Card" size="small">
            <Paragraph>
              This is a sample card with the current theme settings.
            </Paragraph>
            <Space>
              <Button type="primary">Primary Button</Button>
              <Button>Default Button</Button>
              <Button type="dashed">Dashed Button</Button>
            </Space>
          </Card>
          
          <Space>
            <Button type="primary">Primary</Button>
            <Button type="default">Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
          </Space>
          
          <Space>
            <Button type="primary" danger>Danger</Button>
            <Button danger>Danger Default</Button>
            <Button type="dashed" danger>Danger Dashed</Button>
            <Button type="text" danger>Danger Text</Button>
            <Button type="link" danger>Danger Link</Button>
          </Space>
        </Space>
      </Space>
    </Card>
  );
};

const meta: Meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
