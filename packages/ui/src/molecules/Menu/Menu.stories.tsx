import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { Space, Card, Typography, Switch, Divider } from 'antd';
import { 
  AppstoreOutlined, 
  MailOutlined, 
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  DashboardOutlined,
  BellOutlined,
  LogoutOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  StarOutlined,
  BarChartOutlined,
  CloudOutlined,
  LockOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// Create a wrapper component to control the menu state
const MenuDemo = ({
  mode = 'vertical',
  theme = 'dark',
  cyberpunk = false,
  animated = false,
  staggerDelay = 0.05,
  glowOnHover = false,
  glitchOnSelect = false,
  showHoverIndicators = true,
  style = {},
}) => {
  const [current, setCurrent] = useState('mail');
  
  const onClick = (e: any) => {
    console.log('Menu clicked:', e);
    setCurrent(e.key);
  };
  
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode={mode}
      theme={theme}
      cyberpunk={cyberpunk}
      animated={animated}
      staggerDelay={staggerDelay}
      glowOnHover={glowOnHover}
      glitchOnSelect={glitchOnSelect}
      showHoverIndicators={showHoverIndicators}
      style={style}
    >
      <Menu.Item key="mail" icon={<MailOutlined />}>
        Mail
      </Menu.Item>
      <Menu.Item key="app" icon={<AppstoreOutlined />}>
        App
      </Menu.Item>
      <Menu.SubMenu key="sub1" icon={<SettingOutlined />} title="Settings">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
        <Menu.SubMenu key="sub1-2" title="Submenu">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
    </Menu>
  );
};

const meta: Meta<typeof MenuDemo> = {
  title: 'Molecules/Menu',
  component: MenuDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'inline'],
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    cyberpunk: { control: 'boolean' },
    animated: { control: 'boolean' },
    staggerDelay: { control: 'number' },
    glowOnHover: { control: 'boolean' },
    glitchOnSelect: { control: 'boolean' },
    showHoverIndicators: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MenuDemo>;

export const Default: Story = {
  args: {
    mode: 'vertical',
    theme: 'dark',
    cyberpunk: false,
    animated: false,
    staggerDelay: 0.05,
    glowOnHover: false,
    glitchOnSelect: false,
    showHoverIndicators: true,
    style: { width: 256 },
  },
};

export const HorizontalMenu: Story = {
  args: {
    ...Default.args,
    mode: 'horizontal',
    style: { width: 500 },
  },
};

export const InlineMenu: Story = {
  args: {
    ...Default.args,
    mode: 'inline',
  },
};

export const LightTheme: Story = {
  args: {
    ...Default.args,
    theme: 'light',
  },
};

export const AnimatedMenu: Story = {
  args: {
    ...Default.args,
    animated: true,
    staggerDelay: 0.05,
  },
};

export const CyberpunkMenu: Story = {
  args: {
    ...Default.args,
    cyberpunk: true,
  },
};

export const GlowOnHover: Story = {
  args: {
    ...Default.args,
    glowOnHover: true,
  },
};

export const GlitchOnSelect: Story = {
  args: {
    ...Default.args,
    glitchOnSelect: true,
  },
};

export const FullFeatured: Story = {
  args: {
    ...Default.args,
    cyberpunk: true,
    animated: true,
    glowOnHover: true,
    glitchOnSelect: true,
  },
};

// Complex menu example
export const ComplexMenu: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [current, setCurrent] = useState('dashboard');
    
    const onClick = (e: any) => {
      console.log('Menu clicked:', e);
      setCurrent(e.key);
    };
    
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
    
    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    
    return (
      <Card title="Dashboard Navigation" style={{ width: 300 }}>
        <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Collapsed:</Text>
            <Switch checked={collapsed} onChange={toggleCollapsed} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text>Theme:</Text>
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </div>
        </Space>
        
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          theme={theme}
          inlineCollapsed={collapsed}
          cyberpunk
          animated
          glowOnHover
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          
          <Menu.SubMenu key="user" icon={<UserOutlined />} title="User Management">
            <Menu.Item key="user:list">User List</Menu.Item>
            <Menu.Item key="user:add">Add User</Menu.Item>
            <Menu.Item key="user:roles">Roles & Permissions</Menu.Item>
          </Menu.SubMenu>
          
          <Menu.SubMenu key="content" icon={<FileOutlined />} title="Content">
            <Menu.Item key="content:pages">Pages</Menu.Item>
            <Menu.Item key="content:posts">Posts</Menu.Item>
            <Menu.Item key="content:media">Media Library</Menu.Item>
          </Menu.SubMenu>
          
          <Menu.SubMenu key="analytics" icon={<BarChartOutlined />} title="Analytics">
            <Menu.Item key="analytics:overview">Overview</Menu.Item>
            <Menu.Item key="analytics:reports">Reports</Menu.Item>
            <Menu.Item key="analytics:export">Export Data</Menu.Item>
          </Menu.SubMenu>
          
          <Menu.Divider />
          
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          
          <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
            Help & Support
          </Menu.Item>
          
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Card>
    );
  },
};

// E-commerce menu example
export const EcommerceMenu: Story = {
  render: () => {
    const [current, setCurrent] = useState('home');
    
    const onClick = (e: any) => {
      console.log('Menu clicked:', e);
      setCurrent(e.key);
    };
    
    return (
      <Card title="E-commerce Navigation" style={{ width: 600 }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          theme="light"
          animated
          glowOnHover
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          
          <Menu.SubMenu key="shop" icon={<ShoppingCartOutlined />} title="Shop">
            <Menu.Item key="shop:all">All Products</Menu.Item>
            <Menu.ItemGroup title="Categories">
              <Menu.Item key="shop:electronics">Electronics</Menu.Item>
              <Menu.Item key="shop:clothing">Clothing</Menu.Item>
              <Menu.Item key="shop:home">Home & Garden</Menu.Item>
              <Menu.Item key="shop:books">Books</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Collections">
              <Menu.Item key="shop:new">New Arrivals</Menu.Item>
              <Menu.Item key="shop:sale">Sale</Menu.Item>
              <Menu.Item key="shop:trending">Trending</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
          
          <Menu.Item key="wishlist" icon={<HeartOutlined />}>
            Wishlist
          </Menu.Item>
          
          <Menu.Item key="orders" icon={<FileOutlined />}>
            Orders
          </Menu.Item>
          
          <Menu.Item key="account" icon={<UserOutlined />}>
            Account
          </Menu.Item>
          
          <Menu.Item key="search" style={{ marginLeft: 'auto' }} icon={<SearchOutlined />}>
            Search
          </Menu.Item>
        </Menu>
      </Card>
    );
  },
};

// Mobile menu example
export const MobileMenu: Story = {
  render: () => {
    const [current, setCurrent] = useState('home');
    
    const onClick = (e: any) => {
      console.log('Menu clicked:', e);
      setCurrent(e.key);
    };
    
    return (
      <Card title="Mobile Navigation" style={{ width: 300 }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          theme="dark"
          cyberpunk
          animated
          glowOnHover
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          
          <Menu.Item key="search" icon={<SearchOutlined />}>
            Search
          </Menu.Item>
          
          <Menu.Item key="favorites" icon={<StarOutlined />}>
            Favorites
          </Menu.Item>
          
          <Menu.Item key="notifications" icon={<BellOutlined />}>
            Notifications
          </Menu.Item>
          
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
        </Menu>
        
        <Divider>OR</Divider>
        
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          theme="dark"
          cyberpunk
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Menu.Item key="home" icon={<HomeOutlined />} />
          <Menu.Item key="search" icon={<SearchOutlined />} />
          <Menu.Item key="favorites" icon={<StarOutlined />} />
          <Menu.Item key="notifications" icon={<BellOutlined />} />
          <Menu.Item key="profile" icon={<UserOutlined />} />
        </Menu>
      </Card>
    );
  },
};
