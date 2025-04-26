import React, { useState, useEffect } from 'react';
import { 
  Drawer, 
  Typography, 
  Tabs, 
  Button, 
  Input, 
  List, 
  Space, 
  Divider, 
  Empty, 
  Tag,
  Collapse,
  Card
} from 'antd';
import { 
  QuestionCircleOutlined, 
  SearchOutlined, 
  BookOutlined, 
  VideoCameraOutlined, 
  RobotOutlined,
  CloseOutlined,
  LinkOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import ReactMarkdown from 'react-markdown';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Search } = Input;

// Mock documentation data
const mockDocs = {
  '/dashboard': {
    title: 'Dashboard',
    description: 'The dashboard provides an overview of your workspace activity and modules.',
    sections: [
      {
        title: 'Overview',
        content: `
# Dashboard Overview

The dashboard is your central hub for monitoring workspace activity and accessing your modules.

## Key Features

- **Activity Feed**: View recent actions in your workspace
- **Module Usage**: See which modules are being used the most
- **User Activity**: Monitor active users in your workspace
- **Quick Stats**: Get a quick overview of your workspace metrics
        `
      },
      {
        title: 'Customizing Your Dashboard',
        content: `
# Customizing Your Dashboard

You can customize your dashboard to show the information that's most relevant to you.

## Available Tabs

- **Overview**: General workspace information
- **Activity**: Detailed activity feed with filtering options
- **Modules**: Module usage statistics and analytics
- **Users**: User activity and engagement metrics
        `
      }
    ],
    videos: [
      {
        title: 'Dashboard Overview',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      }
    ],
    faqs: [
      {
        question: 'How is the activity feed populated?',
        answer: 'The activity feed shows actions performed by users in your workspace, such as creating content, updating settings, or installing modules.'
      },
      {
        question: 'Can I customize which metrics appear on my dashboard?',
        answer: 'Currently, the dashboard metrics are fixed, but we plan to add customization options in a future update.'
      },
      {
        question: 'How often is the dashboard data refreshed?',
        answer: 'Dashboard data is refreshed automatically every 5 minutes. You can manually refresh by reloading the page.'
      }
    ]
  },
  '/modules': {
    title: 'Modules',
    description: 'Browse, install, and manage modules for your workspace.',
    sections: [
      {
        title: 'Module Management',
        content: `
# Module Management

Modules extend the functionality of your workspace with additional features.

## Managing Modules

- **Install**: Browse the module marketplace and install new modules
- **Configure**: Customize module settings to fit your needs
- **Enable/Disable**: Control which modules are active in your workspace
- **Uninstall**: Remove modules you no longer need
        `
      },
      {
        title: 'Module Marketplace',
        content: `
# Module Marketplace

The module marketplace contains a variety of modules to enhance your workspace.

## Categories

- **Productivity**: Tools to help you work more efficiently
- **Communication**: Tools for team collaboration and messaging
- **Analytics**: Data visualization and reporting tools
- **CRM**: Customer relationship management tools
- **Finance**: Invoicing, billing, and financial management tools
        `
      }
    ],
    videos: [
      {
        title: 'Installing Your First Module',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      }
    ],
    faqs: [
      {
        question: 'Are modules included in my subscription?',
        answer: 'Basic modules are included in all plans. Premium modules may require an additional subscription or a higher-tier plan.'
      },
      {
        question: 'Can I develop my own modules?',
        answer: 'Yes, you can develop custom modules using our Module SDK. Visit the Dev Playground for more information.'
      },
      {
        question: 'How do I update a module?',
        answer: 'Module updates are applied automatically when available. You can also manually check for updates on the module details page.'
      }
    ]
  },
  '/users': {
    title: 'Users',
    description: 'Manage users and permissions in your workspace.',
    sections: [
      {
        title: 'User Management',
        content: `
# User Management

The Users page allows you to manage members of your workspace.

## Key Features

- **Invite Users**: Add new members to your workspace
- **Manage Roles**: Assign roles to control access levels
- **View Activity**: See when users were last active
- **Remove Users**: Remove members from your workspace
        `
      },
      {
        title: 'User Roles',
        content: `
# User Roles

User roles determine what actions members can perform in your workspace.

## Available Roles

- **Admin**: Full access to all features and settings
- **Manager**: Can manage content and some settings
- **User**: Basic access to use the platform
        `
      }
    ],
    videos: [
      {
        title: 'Managing User Permissions',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      }
    ],
    faqs: [
      {
        question: 'How many users can I add to my workspace?',
        answer: 'The number of users depends on your subscription plan. Free plans typically allow up to 10 users, while paid plans offer more.'
      },
      {
        question: 'Can I set custom permissions for users?',
        answer: 'Currently, permissions are tied to roles. Custom permissions are planned for a future update.'
      },
      {
        question: 'How do I transfer ownership of a workspace?',
        answer: 'Workspace ownership can be transferred by contacting our support team.'
      }
    ]
  },
  '/workspace-settings': {
    title: 'Workspace Settings',
    description: 'Configure your workspace settings and preferences.',
    sections: [
      {
        title: 'General Settings',
        content: `
# General Settings

Configure the basic settings for your workspace.

## Available Settings

- **Workspace Name**: Change the name of your workspace
- **Workspace Slug**: Update the URL slug for your workspace
- **Description**: Add a description for your workspace
- **Logo**: Upload a custom logo for your workspace
        `
      },
      {
        title: 'Security Settings',
        content: `
# Security Settings

Configure security settings for your workspace.

## Available Settings

- **Two-Factor Authentication**: Require 2FA for all members
- **Password Policy**: Set password strength requirements
- **Session Timeout**: Set how long users stay logged in
- **IP Restrictions**: Limit access to specific IP addresses
        `
      }
    ],
    videos: [
      {
        title: 'Configuring Your Workspace',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      }
    ],
    faqs: [
      {
        question: 'How do I change my workspace URL?',
        answer: 'You can change your workspace URL by updating the workspace slug in the General Settings tab.'
      },
      {
        question: 'Can I have multiple workspaces?',
        answer: 'Yes, you can create and manage multiple workspaces from the workspace switcher in the top navigation bar.'
      },
      {
        question: 'How do I delete my workspace?',
        answer: 'Workspace deletion is available in the Danger Zone section of the General Settings tab. This action is irreversible.'
      }
    ]
  },
  '/workspace-settings/theme': {
    title: 'Theme Settings',
    description: 'Customize the appearance of your workspace.',
    sections: [
      {
        title: 'Theme Customization',
        content: `
# Theme Customization

Personalize the look and feel of your workspace with custom themes.

## Available Customizations

- **Colors**: Set primary, success, warning, and error colors
- **Layout**: Adjust border radius, font size, and other layout settings
- **Branding**: Upload custom logos and favicons
- **Custom CSS**: Add custom CSS for advanced customization
        `
      },
      {
        title: 'Theme Management',
        content: `
# Theme Management

Save, export, and import themes for your workspace.

## Key Features

- **Save Themes**: Save your customizations as a theme
- **Export Themes**: Export themes to share with others
- **Import Themes**: Import themes from other workspaces
- **Reset to Default**: Revert to the default theme
        `
      }
    ],
    videos: [
      {
        title: 'Creating a Custom Theme',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      }
    ],
    faqs: [
      {
        question: 'Will my theme apply to all users in my workspace?',
        answer: 'Yes, themes are applied workspace-wide and will be seen by all members.'
      },
      {
        question: 'Can users set their own themes?',
        answer: 'Currently, themes are set at the workspace level. Individual user themes are planned for a future update.'
      },
      {
        question: 'Are there any pre-built themes available?',
        answer: 'We offer a selection of pre-built themes that you can use as a starting point for your customizations.'
      }
    ]
  },
  '/account': {
    title: 'Account Settings',
    description: 'Manage your personal account settings and preferences.',
    sections: [
      {
        title: 'Profile Settings',
        content: `
# Profile Settings

Update your personal profile information.

## Available Settings

- **Name**: Update your display name
- **Email**: Change your email address
- **Avatar**: Upload a profile picture
- **Bio**: Add a short bio about yourself
        `
      },
      {
        title: 'Security Settings',
        content: `
# Security Settings

Manage your account security settings.

## Available Settings

- **Password**: Change your password
- **Two-Factor Authentication**: Enable or disable 2FA
- **Connected Devices**: View and manage devices logged into your account
- **API Keys**: Generate and manage API keys for integrations
        `
      }
    ],
    videos: [
      {
        title: 'Securing Your Account',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      }
    ],
    faqs: [
      {
        question: 'How do I change my email address?',
        answer: 'You can change your email address in the Profile Settings tab. A verification email will be sent to your new address.'
      },
      {
        question: 'What happens if I lose my 2FA device?',
        answer: 'If you lose your 2FA device, you can use your recovery codes to regain access. If you don\'t have recovery codes, contact support.'
      },
      {
        question: 'Can I have multiple accounts?',
        answer: 'Yes, you can create multiple accounts with different email addresses, but we recommend using the workspace feature instead.'
      }
    ]
  }
};

// Default documentation for pages without specific docs
const defaultDocs = {
  title: 'Documentation',
  description: 'Learn how to use this page and its features.',
  sections: [
    {
      title: 'Getting Started',
      content: `
# Getting Started

Welcome to CauldronOS! This page doesn't have specific documentation yet, but here are some general tips to help you get started.

## Navigation

- Use the sidebar to navigate between different sections
- Use the top navigation bar to access your account and workspace settings
- Use the search bar to find specific content
      `
    }
  ],
  videos: [],
  faqs: [
    {
      question: 'Where can I find more help?',
      answer: 'You can find more help by clicking the Help button in the top navigation bar or by visiting our support center.'
    },
    {
      question: 'How do I report a bug?',
      answer: 'You can report bugs by clicking the Help button and selecting "Report a Bug" or by contacting our support team.'
    }
  ]
};

interface DocsDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const DocsDrawer: React.FC<DocsDrawerProps> = ({ visible, onClose }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('docs');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const [currentDocs, setCurrentDocs] = useState<any>(defaultDocs);
  
  // Update docs when location changes
  useEffect(() => {
    const path = location.pathname;
    setCurrentPath(path);
    
    // Find the most specific matching path
    const matchingPaths = Object.keys(mockDocs)
      .filter(docPath => path.startsWith(docPath))
      .sort((a, b) => b.length - a.length); // Sort by length descending to get most specific match first
    
    if (matchingPaths.length > 0) {
      setCurrentDocs(mockDocs[matchingPaths[0] as keyof typeof mockDocs]);
    } else {
      setCurrentDocs(defaultDocs);
    }
  }, [location]);
  
  // Filter content based on search query
  const filteredSections = searchQuery
    ? currentDocs.sections.filter((section: any) => 
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentDocs.sections;
  
  const filteredFaqs = searchQuery
    ? currentDocs.faqs.filter((faq: any) => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentDocs.faqs;
  
  const filteredVideos = searchQuery
    ? currentDocs.videos.filter((video: any) => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentDocs.videos;
  
  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  
  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <Space>
            <QuestionCircleOutlined />
            <span>{currentDocs.title} Documentation</span>
          </Space>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={500}
      className="docs-drawer"
      bodyStyle={{ padding: '16px', overflowY: 'auto' }}
    >
      <div className="mb-4">
        <Search
          placeholder="Search documentation"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Paragraph className="mb-4">
        {currentDocs.description}
      </Paragraph>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={<span><BookOutlined /> Documentation</span>} 
          key="docs"
        >
          {filteredSections.length > 0 ? (
            <Collapse defaultActiveKey={[filteredSections[0]?.title]} expandIconPosition="end" expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}>
              {filteredSections.map((section: any, index: number) => (
                <Panel header={section.title} key={section.title}>
                  <div className="markdown-content">
                    <ReactMarkdown>{section.content}</ReactMarkdown>
                  </div>
                </Panel>
              ))}
            </Collapse>
          ) : (
            <Empty description="No documentation found" />
          )}
        </TabPane>
        
        <TabPane 
          tab={<span><VideoCameraOutlined /> Videos</span>} 
          key="videos"
        >
          {filteredVideos.length > 0 ? (
            <List
              itemLayout="vertical"
              dataSource={filteredVideos}
              renderItem={(video: any) => (
                <List.Item
                  key={video.title}
                  extra={
                    <div style={{ width: 200, height: 112 }}>
                      <ReactPlayer
                        url={video.url}
                        width="100%"
                        height="100%"
                        light={video.thumbnail}
                        controls
                      />
                    </div>
                  }
                >
                  <List.Item.Meta
                    title={video.title}
                    description={
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        <LinkOutlined /> Watch on YouTube
                      </a>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No videos found" />
          )}
        </TabPane>
        
        <TabPane 
          tab={<span><RobotOutlined /> FAQs</span>} 
          key="faqs"
        >
          {filteredFaqs.length > 0 ? (
            <Collapse defaultActiveKey={[]} expandIconPosition="end" expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}>
              {filteredFaqs.map((faq: any, index: number) => (
                <Panel header={faq.question} key={index}>
                  <Paragraph>{faq.answer}</Paragraph>
                </Panel>
              ))}
            </Collapse>
          ) : (
            <Empty description="No FAQs found" />
          )}
        </TabPane>
      </Tabs>
      
      <Divider />
      
      <div className="mt-4">
        <Title level={5}>Need more help?</Title>
        <Space direction="vertical" className="w-full">
          <Button type="primary" icon={<RobotOutlined />} block>
            Ask AI Assistant
          </Button>
          <Button icon={<LinkOutlined />} block>
            Visit Support Center
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};

export default DocsDrawer;
