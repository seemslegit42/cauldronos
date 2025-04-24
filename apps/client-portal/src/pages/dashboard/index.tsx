import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Button, Table, Tag, Avatar, Progress } from 'antd';
import {
  UserOutlined,
  RiseOutlined,
  FallOutlined,
  ClockCircleOutlined,
  BulbOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { 
  PageTransition, 
  InsightCard, 
  AISearchBar, 
  GestureCard,
  PredictiveForm
} from '@cauldronos/ui';

const { Title, Paragraph, Text } = Typography;

const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for statistics
  const stats = [
    {
      title: 'Projects',
      value: 8,
      icon: <FileTextOutlined />,
      change: 2,
      changeType: 'increase',
    },
    {
      title: 'Tasks Completed',
      value: 42,
      icon: <CheckCircleOutlined />,
      change: 12.3,
      changeType: 'increase',
    },
    {
      title: 'Notifications',
      value: 5,
      icon: <BellOutlined />,
      change: 3,
      changeType: 'increase',
    },
  ];

  // Sample data for recent activities
  const recentActivities = [
    {
      key: '1',
      user: 'System',
      action: 'Project "Website Redesign" updated',
      time: '2 hours ago',
      status: 'info',
    },
    {
      key: '2',
      user: 'Admin',
      action: 'New task assigned to you',
      time: '4 hours ago',
      status: 'success',
    },
    {
      key: '3',
      user: 'System',
      action: 'Payment processed',
      time: '1 day ago',
      status: 'success',
    },
    {
      key: '4',
      user: 'Admin',
      action: 'Document requires your review',
      time: '2 days ago',
      status: 'warning',
    },
  ];

  // Table columns for recent activities
  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          {user}
        </Space>
      ),
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

  // Sample projects data
  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      progress: 75,
      status: 'In Progress',
      dueDate: '2023-12-15',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      progress: 40,
      status: 'In Progress',
      dueDate: '2024-01-30',
    },
    {
      id: 3,
      name: 'Brand Identity Update',
      progress: 90,
      status: 'Almost Complete',
      dueDate: '2023-11-30',
    },
    {
      id: 4,
      name: 'Content Strategy',
      progress: 20,
      status: 'Just Started',
      dueDate: '2024-02-28',
    },
  ];

  // Sample insights data
  const insights = [
    {
      title: 'Project Progress Insights',
      description: 'Your "Website Redesign" project is ahead of schedule by 5 days. The team has completed 75% of tasks, which is 10% more than expected at this stage.',
      source: 'Project Analytics',
      confidence: 0.85,
      timestamp: new Date(),
      tags: ['Projects', 'Performance', 'Timeline'],
      type: 'trend',
      metrics: [
        {
          name: 'Completion',
          value: '75%',
          change: 10.0,
          changeType: 'increase',
        },
        {
          name: 'Timeline',
          value: '5 days',
          change: 15,
          changeType: 'increase',
        },
        {
          name: 'Budget',
          value: 'On track',
          change: 0,
          changeType: 'neutral',
        },
      ],
      recommendations: [
        'Consider allocating resources to other projects',
        'Review quality metrics to ensure standards are maintained',
        'Prepare for early delivery discussions',
      ],
    },
    {
      title: 'Task Completion Trend',
      description: 'Your task completion rate has increased by 15% this month compared to last month. This suggests improved productivity and workflow efficiency.',
      source: 'Task Analytics',
      confidence: 0.78,
      timestamp: new Date(),
      tags: ['Tasks', 'Productivity', 'Efficiency'],
      type: 'trend',
      metrics: [
        {
          name: 'Current Month',
          value: '42 tasks',
          change: 15.0,
          changeType: 'increase',
        },
        {
          name: 'Previous Month',
          value: '36 tasks',
          change: 0,
          changeType: 'neutral',
        },
        {
          name: 'Average Time',
          value: '2.5 days',
          change: 12.0,
          changeType: 'decrease',
        },
      ],
      recommendations: [
        'Maintain current workflow processes',
        'Share best practices with team members',
        'Consider taking on additional tasks if capacity allows',
      ],
    },
  ];

  // Handle AI search
  const handleAISearch = async (query: string) => {
    console.log('Searching for:', query);
    setSearchQuery(query);
    // In a real implementation, this would call an API
    return [
      `Project information for "${query}"`,
      `Tasks related to "${query}"`,
      `Documents containing "${query}"`,
    ];
  };

  return (
    <PageTransition type="slide" direction="up" cyberpunk>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="flex justify-between items-center">
          <Title level={2}>Client Dashboard</Title>
          <Button type="primary" icon={<BulbOutlined />}>AI Assistant</Button>
        </div>

        <AISearchBar
          placeholder="Search for projects, tasks, or documents..."
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
          Welcome to your client portal. Here's an overview of your projects and activities.
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
          title="Your Projects"
          className="bg-gray-900 border-gray-700 shadow-md"
          extra={<Button type="link">View All Projects</Button>}
        >
          <Row gutter={[16, 16]}>
            {projects.map(project => (
              <Col xs={24} sm={12} key={project.id}>
                <Card 
                  size="small" 
                  title={project.name}
                  extra={<Tag color={project.progress > 70 ? 'green' : project.progress > 30 ? 'blue' : 'orange'}>{project.status}</Tag>}
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text type="secondary">Progress:</Text>
                      <Progress percent={project.progress} status={project.progress === 100 ? 'success' : 'active'} />
                    </div>
                    <div>
                      <Text type="secondary">Due Date: {project.dueDate}</Text>
                    </div>
                    <Button type="link" style={{ padding: 0 }}>View Details</Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

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
      </Space>
    </PageTransition>
  );
};

export default DashboardPage;
