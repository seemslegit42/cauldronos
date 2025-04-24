import React from 'react';
import { Card, Tabs, Table, Button, Space, Tag, Typography, Progress, Statistic, Row, Col } from 'antd';
import {
  RobotOutlined,
  ApiOutlined,
  BarChartOutlined,
  SettingOutlined,
  PlusOutlined,
  SyncOutlined
} from '@ant-design/icons';
import PageTransition from '@/components/PageTransition';
import AISearchBar from '@/components/AISearchBar';
import InsightCard from '@/components/InsightCard';
import { useIntl } from 'umi';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const AIPage: React.FC = () => {
  const intl = useIntl();

  // Sample data for AI models
  const models = [
    {
      key: '1',
      name: 'GPT-4',
      type: 'Text Generation',
      status: 'Active',
      version: '1.0.0',
      lastUpdated: '2023-04-10',
      usage: 85,
    },
    {
      key: '2',
      name: 'DALL-E 3',
      type: 'Image Generation',
      status: 'Active',
      version: '2.1.0',
      lastUpdated: '2023-04-05',
      usage: 72,
    },
    {
      key: '3',
      name: 'Whisper',
      type: 'Speech Recognition',
      status: 'Inactive',
      version: '1.5.0',
      lastUpdated: '2023-03-20',
      usage: 45,
    },
    {
      key: '4',
      name: 'Codex',
      type: 'Code Generation',
      status: 'Active',
      version: '0.9.0',
      lastUpdated: '2023-04-12',
      usage: 60,
    },
  ];

  // Table columns for AI models
  const modelColumns = [
    {
      title: intl.formatMessage({ id: 'ai.model.name' }),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: intl.formatMessage({ id: 'ai.model.type' }),
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Text Generation', value: 'Text Generation' },
        { text: 'Image Generation', value: 'Image Generation' },
        { text: 'Speech Recognition', value: 'Speech Recognition' },
        { text: 'Code Generation', value: 'Code Generation' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: intl.formatMessage({ id: 'ai.model.status' }),
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const color = status === 'Active' ? 'green' : 'gray';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: intl.formatMessage({ id: 'ai.model.version' }),
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: intl.formatMessage({ id: 'ai.model.lastUpdated' }),
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
    },
    {
      title: intl.formatMessage({ id: 'ai.model.usage' }),
      dataIndex: 'usage',
      key: 'usage',
      sorter: (a, b) => a.usage - b.usage,
      render: (usage) => <Progress percent={usage} size="small" />,
    },
    {
      title: intl.formatMessage({ id: 'common.actions' }),
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">
            {intl.formatMessage({ id: 'common.edit' })}
          </Button>
          {record.status === 'Active' ? (
            <Button type="link" size="small" danger>
              {intl.formatMessage({ id: 'ai.model.deactivate' })}
            </Button>
          ) : (
            <Button type="link" size="small">
              {intl.formatMessage({ id: 'ai.model.activate' })}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Sample data for AI insights
  const insights = [
    {
      title: 'Model Performance Trend',
      description: 'GPT-4 has shown a 15% improvement in response quality over the last month based on user feedback.',
      source: 'AI Analytics',
      confidence: 0.92,
      timestamp: new Date(),
      tags: ['GPT-4', 'Performance', 'Quality'],
      type: 'trend',
      metrics: [
        {
          name: 'Response Quality',
          value: '92%',
          change: 15.0,
          changeType: 'increase',
        },
        {
          name: 'Response Time',
          value: '1.2s',
          change: 8.0,
          changeType: 'decrease',
        },
      ],
      recommendations: [
        'Continue with the current model configuration',
        'Consider increasing resource allocation during peak hours',
        'Monitor for any regression in specialized domains',
      ],
    },
    {
      title: 'Usage Pattern Anomaly',
      description: 'Unusual spike in DALL-E 3 usage detected during off-hours (2AM-4AM). This may indicate automated batch processing or potential abuse.',
      source: 'Security Monitoring',
      confidence: 0.85,
      timestamp: new Date(),
      tags: ['DALL-E 3', 'Security', 'Usage'],
      type: 'anomaly',
      metrics: [
        {
          name: 'Off-hours Usage',
          value: '+320%',
          change: 320.0,
          changeType: 'increase',
        },
        {
          name: 'Request Pattern',
          value: 'Automated',
          change: 0,
          changeType: 'neutral',
        },
      ],
      recommendations: [
        'Investigate source of automated requests',
        'Consider implementing rate limiting for off-hours',
        'Review authentication logs for suspicious activity',
      ],
    },
  ];

  return (
    <PageTransition type="fade" cyberpunk>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="flex justify-between items-center">
          <Title level={2}>{intl.formatMessage({ id: 'ai.title' })}</Title>
          <Space>
            <Button icon={<SyncOutlined />}>
              {intl.formatMessage({ id: 'ai.sync' })}
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              {intl.formatMessage({ id: 'ai.model.add' })}
            </Button>
          </Space>
        </div>

        <AISearchBar
          placeholder={intl.formatMessage({ id: 'ai.search' })}
          onSearch={(query) => console.log('Search query:', query)}
          recentSearches={true}
          maxRecentSearches={5}
          suggestionsSource="ai"
          scope="ai"
          allowVoiceInput={true}
          cyberpunk={true}
        />

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-900 border-gray-700 shadow-md">
              <Statistic
                title={intl.formatMessage({ id: 'ai.stats.totalModels' })}
                value={4}
                prefix={<RobotOutlined />}
                valueStyle={{ color: '#1677ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-900 border-gray-700 shadow-md">
              <Statistic
                title={intl.formatMessage({ id: 'ai.stats.activeModels' })}
                value={3}
                prefix={<ApiOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-900 border-gray-700 shadow-md">
              <Statistic
                title={intl.formatMessage({ id: 'ai.stats.totalRequests' })}
                value={12458}
                prefix={<BarChartOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-900 border-gray-700 shadow-md">
              <Statistic
                title={intl.formatMessage({ id: 'ai.stats.avgResponseTime' })}
                value={1.2}
                suffix="s"
                prefix={<SettingOutlined />}
                valueStyle={{ color: '#eb2f96' }}
              />
            </Card>
          </Col>
        </Row>

        <Card className="bg-gray-900 border-gray-700 shadow-md">
          <Tabs defaultActiveKey="models">
            <TabPane
              tab={
                <span>
                  <RobotOutlined />
                  {intl.formatMessage({ id: 'ai.models' })}
                </span>
              }
              key="models"
            >
              <Table
                dataSource={models}
                columns={modelColumns}
                pagination={{ pageSize: 10 }}
                className="bg-gray-900"
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <SettingOutlined />
                  {intl.formatMessage({ id: 'ai.settings' })}
                </span>
              }
              key="settings"
            >
              <Paragraph className="text-gray-400">
                {intl.formatMessage({ id: 'ai.settings.description' })}
              </Paragraph>

              {/* AI Settings content would go here */}
            </TabPane>

            <TabPane
              tab={
                <span>
                  <BarChartOutlined />
                  {intl.formatMessage({ id: 'ai.analytics' })}
                </span>
              }
              key="analytics"
            >
              <Row gutter={[16, 16]}>
                {insights.map((insight, index) => (
                  <Col xs={24} md={12} key={index}>
                    <InsightCard
                      insight={insight}
                      cyberpunk={true}
                      showRecommendations={true}
                      defaultExpanded={false}
                    />
                  </Col>
                ))}
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </Space>
    </PageTransition>
  );
};

export default AIPage;
