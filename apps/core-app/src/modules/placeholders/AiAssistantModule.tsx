import React from 'react';
import { Card, Typography, Button, Space, Input, List, Avatar, Divider, Tag, Empty } from 'cauldronos-ui';
import { SendOutlined, RobotOutlined, UserOutlined, SettingOutlined, InfoCircleOutlined } from 'cauldronos-ui';
import { ModuleComponentProps } from '../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const AiAssistantModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  // Mock conversation data
  const conversations = [
    {
      id: '1',
      title: 'Help with marketing strategy',
      lastMessage: 'What are the best channels for B2B marketing?',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      title: 'Product roadmap planning',
      lastMessage: 'Can you help me prioritize features for our next release?',
      timestamp: '1 day ago',
      unread: false
    },
    {
      id: '3',
      title: 'Customer support automation',
      lastMessage: 'How can we use AI to improve our customer support?',
      timestamp: '3 days ago',
      unread: false
    }
  ];

  // Mock chat messages
  const messages = [
    {
      id: '1',
      sender: 'user',
      content: 'Hello, I need help with creating a marketing strategy for our new product launch.',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'assistant',
      content: 'I\'d be happy to help with your marketing strategy! To get started, could you tell me more about your product and target audience?',
      timestamp: '10:31 AM'
    },
    {
      id: '3',
      sender: 'user',
      content: 'We\'re launching a new SaaS tool for project management, targeting small to medium businesses.',
      timestamp: '10:32 AM'
    },
    {
      id: '4',
      sender: 'assistant',
      content: 'Great! For a SaaS project management tool targeting SMBs, I recommend a multi-channel approach:\n\n1. Content Marketing: Create blog posts, case studies, and guides on project management best practices\n2. Email Marketing: Set up a drip campaign for leads\n3. Social Media: Focus on LinkedIn and Twitter for B2B audience\n4. Webinars: Host educational sessions on project management\n5. Partnerships: Collaborate with complementary tools\n\nWould you like me to elaborate on any of these strategies?',
      timestamp: '10:34 AM'
    }
  ];

  return (
    <div className="flex h-[calc(100vh-200px)]">
      {/* Sidebar with conversations */}
      <Card className="w-1/4 mr-4 overflow-auto" bodyStyle={{ padding: 0, height: '100%' }}>
        <div className="p-4 border-b">
          <Title level={4} className="mb-0">Conversations</Title>
        </div>
        <List
          dataSource={conversations}
          renderItem={item => (
            <List.Item
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b"
              style={{ padding: '12px 16px' }}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<RobotOutlined />} />}
                title={
                  <div className="flex justify-between">
                    <span>{item.title}</span>
                    {item.unread && <Tag color="blue">New</Tag>}
                  </div>
                }
                description={
                  <div>
                    <div className="text-xs text-gray-500 truncate">{item.lastMessage}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.timestamp}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Main chat area */}
      <Card className="flex-1 flex flex-col" bodyStyle={{ padding: 0, height: '100%' }}>
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <Title level={4} className="mb-0">Help with marketing strategy</Title>
            <Text type="secondary">Started 2 hours ago</Text>
          </div>
          <Space>
            <Button icon={<SettingOutlined />} type="text">Settings</Button>
            <Button icon={<InfoCircleOutlined />} type="text">Help</Button>
          </Space>
        </div>

        <div className="flex-1 p-4 overflow-auto bg-gray-50 dark:bg-gray-900">
          {messages.map(message => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 dark:text-white shadow-sm'
                }`}
              >
                <div className="flex items-center mb-1">
                  <Avatar
                    size="small"
                    icon={message.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                    className="mr-2"
                  />
                  <Text
                    className={message.sender === 'user' ? 'text-white' : ''}
                    strong
                  >
                    {message.sender === 'user' ? 'You' : 'AI Assistant'}
                  </Text>
                  <Text
                    className={`ml-2 text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}
                  >
                    {message.timestamp}
                  </Text>
                </div>
                <div className="whitespace-pre-line">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <TextArea
            placeholder="Type your message here..."
            autoSize={{ minRows: 2, maxRows: 6 }}
            className="mb-2"
          />
          <div className="flex justify-between">
            <div>
              <Text type="secondary">AI Assistant is powered by GPT-4</Text>
            </div>
            <Button type="primary" icon={<SendOutlined />}>
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AiAssistantModule;