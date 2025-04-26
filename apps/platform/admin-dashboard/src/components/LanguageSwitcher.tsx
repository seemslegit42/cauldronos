import React from 'react';
import { Dropdown, Button, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { setLocale, getLocale, useIntl } from 'umi';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * LanguageSwitcher component
 *
 * Provides a dropdown menu for switching between languages.
 * Currently only supports English.
 */
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const intl = useIntl();
  const currentLocale = getLocale();

  const handleLocaleChange = (locale: string) => {
    setLocale(locale, false);
  };

  // Available languages - English only
  const locales = [
    {
      key: 'en-US',
      label: 'English',
      icon: '🇺🇸',
    },
  ];

  // Dropdown menu items
  const items: MenuProps['items'] = locales.map((locale) => ({
    key: locale.key,
    label: (
      <div className="flex items-center">
        <span className="mr-2">{locale.icon}</span>
        {locale.label}
      </div>
    ),
    onClick: () => handleLocaleChange(locale.key),
  }));

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Dropdown
        menu={{ items, selectedKeys: [currentLocale] }}
        placement="bottomRight"
        trigger={['click']}
        dropdownRender={(menu) => (
          <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden shadow-lg shadow-cyan-500/20">
            {menu}
          </div>
        )}
      >
        <Button
          type="text"
          icon={<GlobalOutlined className="text-cyan-400" />}
          className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors duration-300"
        >
          <span className="ml-1">
            {locales.find(locale => locale.key === currentLocale)?.label || 'English'}
          </span>
        </Button>
      </Dropdown>
    </motion.div>
  );
};

export default LanguageSwitcher;
