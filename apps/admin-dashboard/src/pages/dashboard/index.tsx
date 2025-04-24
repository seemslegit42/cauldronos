import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Button, Table, Tag } from 'antd';
import {
  UserOutlined,
  RiseOutlined,
  FallOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  BulbOutlined,
  SearchOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { 
  PageTransition, 
  InsightCard, 
  AISearchBar, 
  GestureCard,
  PredictiveForm
} from '@cauldronos/ui';
import { Form, Input, Select, DatePicker } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for statistics
  const stats = [
    {
      title: 'Total Users',
      value: 1234,
      icon: <UserOutlined />,
      change: 12.5,
      changeType: 'increase',
    },
    {
      title: 'Active Modules',
      value: 42,
      icon: <AppstoreOutlined />,
      change: 8.3,
      changeType: 'increase',
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      icon: <ClockCircleOutlined />,
      change: 0.1,
      changeType: 'decrease',
    },
  ];

  // Sample data for recent activities
  const recentActivities = [
    {
      key: '1',
      user: 'John Doe',
      action: 'Created a new module',
      time: '2 hours ago',
      status: 'success',
    },
    {
      key: '2',
      user: 'Jane Smith',
      action: 'Updated user settings',
      time: '4 hours ago',
      status: 'info',
    },
    {
      key: '3',
      user: 'Bob Johnson',
      action: 'Deleted a record',
      time: '1 day ago',
      status: 'warning',
    },
    {
      key: '4',
      user: 'Alice Brown',
      action: 'Added new user',
      time: '2 days ago',
      status: 'success',
    },
  ];

  // Table columns for recent activities
  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'warning') color = 'orange';
        if (status === 'info') color = 'blue';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  // Sample insights data
  const insights = [
    {
      title: 'User Growth Trend',
      description: 'User growth has increased by 12.5% in the last month, which is 5% higher than the previous month. This suggests that recent marketing campaigns have been effective.',
      source: 'User Analytics',
      confidence: 0.85,
      timestamp: new Date(),
      tags: ['Users', 'Growth', 'Marketing'],
      type: 'trend',
      metrics: [
        {
          name: 'Current Month',
          value: '12.5%',
          change: 5.0,
          changeType: 'increase',
        },
        {
          name: 'Previous Month',
          value: '7.5%',
          change: 0,
          changeType: 'neutral',
        },
        {
          name: 'Average',
          value: '8.2%',
          change: 0,
          changeType: 'neutral',
        },
      ],
      recommendations: [
        'Continue current marketing strategies',
        'Focus on user retention to maintain growth',
        'Analyze which channels are driving the most growth',
      ],
    },
    {
      title: 'System Performance Alert',
      description: 'Database response time has increased by 15% in the last 24 hours. This could indicate a potential performance issue that needs attention.',
      source: 'System Monitoring',
      confidence: 0.75,
      timestamp: new Date(),
      tags: ['Performance', 'Database', 'Alert'],
      type: 'anomaly',
      metrics: [
        {
          name: 'Response Time',
          value: '250ms',
          change: 15.0,
          changeType: 'increase',
        },
        {
          name: 'CPU Usage',
          value: '78%',
          change: 12.0,
          changeType: 'increase',
        },
        {
          name: 'Memory',
          value: '65%',
          change: 5.0,
          changeType: 'increase',
        },
      ],
      recommendations: [
        'Check database query performance',
        'Consider scaling up database resources',
        'Review recent code changes that might affect performance',
      ],
    },
  ];

  // Handle AI search
  const handleAISearch = async (query: string) => {
    console.log('Searching for:', query);
    setSearchQuery(query);
    // In a real implementation, this would call an API
    return [
      `User statistics for "${query}"`,
      `System performance related to "${query}"`,
      `Recent activities involving "${query}"`,
    ];
  };

  // Handle form submission with AI
  const handleFormSubmit = (values: any) => {
    console.log('Form submitted:', values);
  };

  // Handle AI form completion
  const handleAIComplete = async (values: any) => {
    // In a real implementation, this would call an AI API
    return {
      ...values,
      name: values.name || 'New Module',
      description: values.description || 'AI-generated description for the new module',
      category: values.category || 'General',
      status: values.status || 'Active',
      startDate: values.startDate || new Date(),
    };
  };

  // Handle AI form validation
  const handleAIValidate = async (values: any) => {
    // In a real implementation, this would call an AI API
    const issues = [];
    
    if (!values.name) {
      issues.push('Module name is required');
    }
    
    if (values.name && values.name.length < 3) {
      issues.push('Module name should be at least 3 characters');
    }
    
    if (!values.category) {
      issues.push('Category is required');
    }
    
    return {
      valid: issues.length === 0,
      issues,
    };
  };

  return (
    <PageTransition type="slide" direction="up" cyberpunk>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="flex justify-between items-center">
          <Title level={2}>Dashboard</Title>
          <Button type="primary" icon={<BulbOutlined />}>AI Assistant</Button>
        </div>

        <AISearchBar
          placeholder="Search for users, modules, or activities..."
          onSearch={(query) => console.log('Search query:', query)}
          onAISearch={handleAISearch}
          recentSearches={true}
          maxRecentSearches={5}
          suggestionsSource="ai"
          scope="global"
          allowVoiceInput={true}
          cyberpunk={true}
        />

        <Paragraph className="text-gray-400">
          Welcome to the CauldronOS Admin Dashboard. Here's an overview of your system.
        </Paragraph>

        <Row gutter={[16, 16]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <GestureCard
                title={
                  <div className="flex items-center text-gray-300">
                    <span className="mr-2">{stat.icon}</span>
                    {stat.title}
                  </div>
                }
                draggable={true}
                swipeable={true}
                cyberpunk={true}
              >
                <Statistic
                  value={stat.value}
                  valueStyle={{ color: '#1677ff', fontWeight: 'bold' }}
                  suffix={
                    <div className="ml-2">
                      {stat.changeType === 'increase' ? (
                        <Tag color="green" className="flex items-center">
                          <RiseOutlined /> {stat.change}%
                        </Tag>
                      ) : (
                        <Tag color="red" className="flex items-center">
                          <FallOutlined /> {stat.change}%
                        </Tag>
                      )}
                    </div>
                  }
                />
              </GestureCard>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <InsightCard
              insight={insights[0]}
              cyberpunk={true}
              showRecommendations={true}
              defaultExpanded={false}
            />
          </Col>
          <Col xs={24} md={12}>
            <InsightCard
              insight={insights[1]}
              cyberpunk={true}
              showRecommendations={true}
              defaultExpanded={false}
            />
          </Col>
        </Row>

        <Card
          title="Recent Activities"
          className="bg-gray-900 border-gray-700 shadow-md"
          extra={<Button type="link">View All</Button>}
        >
          <Table
            dataSource={recentActivities}
            columns={columns}
            pagination={false}
            className="bg-gray-900"
          />
        </Card>

        <Card
          title="Create New Module"
          className="bg-gray-900 border-gray-700 shadow-md"
        >
          <PredictiveForm
            onFinish={handleFormSubmit}
            learningMode="active"
            contextId="module-form"
            showSuggestions={true}
            showInsights={true}
            autoValidate={true}
            smartDefaults={true}
            showAICompletion={true}
            showAIValidation={true}
            onAIComplete={handleAIComplete}
            onAIValidate={handleAIValidate}
            cyberpunk={true}
            fieldDependencies={{
              status: ['category'],
            }}
          >
            <Form.Item name="name" label="Module Name" rules={[{ required: true }]}>
              <Input placeholder="Enter module name" />
            </Form.Item>
            
            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Enter module description" rows={4} />
            </Form.Item>
            
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Select placeholder="Select a category">
                <Option value="general">General</Option>
                <Option value="security">Security</Option>
                <Option value="analytics">Analytics</Option>
                <Option value="communication">Communication</Option>
              </Select>
            </Form.Item>
            
            <Form.Item name="status" label="Status">
              <Select placeholder="Select status">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </Form.Item>
            
            <Form.Item name="startDate" label="Start Date">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Module
              </Button>
            </Form.Item>
          </PredictiveForm>
        </Card>
      </Space>
    </PageTransition>
  );
};

export default DashboardPage;
