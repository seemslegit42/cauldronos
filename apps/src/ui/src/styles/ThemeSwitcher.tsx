import React from 'react';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { BulbOutlined, CheckOutlined } from '@ant-design/icons';
import { useTheme } from './useTheme';
import { ThemeMode } from './themeStore';

interface ThemeSwitcherProps {
  type?: 'dropdown' | 'buttons';
  size?: 'small' | 'middle' | 'large';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  type = 'dropdown',
  size = 'middle'
}) => {
  const { mode, setTheme } = useTheme();

  const handleThemeChange = (newMode: ThemeMode) => {
    setTheme(newMode);
  };

  if (type === 'buttons') {
    return (
      <Space>
        <Tooltip title="Light Theme">
          <Button
            type={mode === 'light' ? 'primary' : 'default'}
            size={size}
            onClick={() => handleThemeChange('light')}
            icon={mode === 'light' ? <CheckOutlined /> : null}
          >
            Light
          </Button>
        </Tooltip>
        <Tooltip title="Dark Theme">
          <Button
            type={mode === 'dark' ? 'primary' : 'default'}
            size={size}
            onClick={() => handleThemeChange('dark')}
            icon={mode === 'dark' ? <CheckOutlined /> : null}
          >
            Dark
          </Button>
        </Tooltip>
        <Tooltip title="Use System Settings">
          <Button
            type={mode === 'system' ? 'primary' : 'default'}
            size={size}
            onClick={() => handleThemeChange('system')}
            icon={mode === 'system' ? <CheckOutlined /> : null}
          >
            System
          </Button>
        </Tooltip>
      </Space>
    );
  }

  // Dropdown version
  const items = [
    {
      key: 'light',
      label: 'Light Theme',
      icon: mode === 'light' ? <CheckOutlined /> : null,
      onClick: () => handleThemeChange('light'),
    },
    {
      key: 'dark',
      label: 'Dark Theme',
      icon: mode === 'dark' ? <CheckOutlined /> : null,
      onClick: () => handleThemeChange('dark'),
    },
    {
      key: 'system',
      label: 'System Theme',
      icon: mode === 'system' ? <CheckOutlined /> : null,
      onClick: () => handleThemeChange('system'),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button type="text" icon={<BulbOutlined />} size={size} />
    </Dropdown>
  );
};

export default ThemeSwitcher;
