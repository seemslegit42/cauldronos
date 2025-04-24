import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { setLocale, getLocale, useIntl } from 'umi';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const intl = useIntl();
  const currentLocale = getLocale();
  
  const handleLocaleChange = (locale: string) => {
    setLocale(locale, false);
  };
  
  const locales = [
    {
      key: 'en-US',
      label: 'English',
      icon: '🇺🇸',
    },
    {
      key: 'zh-CN',
      label: '中文',
      icon: '🇨🇳',
    },
  ];
  
  const menu = (
    <Menu
      selectedKeys={[currentLocale]}
      onClick={({ key }) => handleLocaleChange(key)}
      className="bg-gray-800 border border-gray-700"
    >
      {locales.map((locale) => (
        <Menu.Item key={locale.key} className="text-gray-300 hover:text-white hover:bg-gray-700">
          <div className="flex items-center">
            <span className="mr-2">{locale.icon}</span>
            {locale.label}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
  
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Button 
          type="text" 
          icon={<GlobalOutlined />}
          className="flex items-center text-gray-300 hover:text-white"
        >
          <span className="ml-1">
            {locales.find(locale => locale.key === currentLocale)?.label || 'Language'}
          </span>
        </Button>
      </Dropdown>
    </motion.div>
  );
};

export default LanguageSwitcher;
