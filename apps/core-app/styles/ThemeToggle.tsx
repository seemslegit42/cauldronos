import React from 'react';
import { Switch, Tooltip, Select } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useThemeStore, ThemeMode } from './themeStore';
import useTheme from './useTheme';

interface ThemeToggleProps {
  showModeSelect?: boolean;
  size?: 'small' | 'default';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showModeSelect = false,
  size = 'default',
}) => {
  const { mode, setMode } = useThemeStore();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <div className="theme-toggle">
      {showModeSelect ? (
        <Select
          value={mode}
          onChange={setMode}
          size={size}
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' },
          ]}
          style={{ width: 100 }}
        />
      ) : (
        <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<BulbFilled />}
            size={size}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default ThemeToggle;
