import React from 'react';
import { Card, Table, Button, Space, Tag, Typography, Input, Row, Col, Progress } from 'antd';
import {
  AppstoreOutlined,
  SearchOutlined,
  PlusOutlined,
  ReloadOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import PageTransition from '@/components/PageTransition';
import { useIntl } from 'umi';

const { Title, Paragraph } = Typography;

const ModulesPage: React.FC = () => {
  const intl = useIntl();

  // Sample data for modules
  const modules = [
    {
      key: '1',
      name: 'User Management',
      category: 'Core',
      version: '1.2.0',
      status: 'Active',
      author: 'CauldronOS Team',
      lastUpdated: '2023-04-10',
      health: 95,
    },
    {
      key: '2',
      name: 'Analytics Dashboard',
      category: 'Analytics',
      version: '0.9.5',
      status: 'Active',
      author: 'Data Team',
      lastUpdated: '2023-04-05',
      health: 87,
    },
    {
      key: '3',
      name: 'Payment Gateway',
      category: 'Finance',
      version: '2.0.1',
      status: 'Inactive',
      author: 'Finance Team',
      lastUpdated: '2023-03-15',
      health: 0,
    },
    {
      key: '4',
      name: 'Content Management',
      category: 'Core',
      version: '1.5.0',
      status: 'Active',
      author: 'CauldronOS Team',
      lastUpdated: '2023-04-12',
      health: 92,
    },
    {
      key: '5',
      name: 'Notification System',
      category: 'Communication',
      version: '1.1.0',
      status: 'Active',
      author: 'Communication Team',
      lastUpdated: '2023-04-08',
      health: 90,
    },
  ];

  // Table columns
  const columns = [
    {
      title: intl.formatMessage({ id: 'modules.name' }),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: intl.formatMessage({ id: 'modules.category' }),
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Core', value: 'Core' },
        { text: 'Analytics', value: 'Analytics' },
        { text: 'Finance', value: 'Finance' },
        { text: 'Communication', value: 'Communication' },
      ],
      onFilter: (value, record) => record.category === value,
      render: (category) => {
        let color = 'blue';
        if (category === 'Core') color = 'purple';
        if (category === 'Analytics') color = 'cyan';
        if (category === 'Finance') color = 'green';
        if (category === 'Communication') color = 'orange';
        return <Tag color={color}>{category}</Tag>;
      },
    },
    {
      title: intl.formatMessage({ id: 'modules.version' }),
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: intl.formatMessage({ id: 'modules.status' }),
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
      title: intl.formatMessage({ id: 'modules.author' }),
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: intl.formatMessage({ id: 'modules.lastUpdated' }),
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
    },
    {
      title: intl.formatMessage({ id: 'modules.health' }),
      dataIndex: 'health',
      key: 'health',
      sorter: (a, b) => a.health - b.health,
      render: (health) => {
        let color = 'green';
        if (health < 90) color = 'lime';
        if (health < 80) color = 'orange';
        if (health < 70) color = 'red';
        if (health === 0) return <Tag color="gray">N/A</Tag>;

        return <Progress percent={health} size="small" strokeColor={color} />;
      },
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
              {intl.formatMessage({ id: 'modules.deactivate' })}
            </Button>
          ) : (
            <Button type="link" size="small">
              {intl.formatMessage({ id: 'modules.activate' })}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageTransition type="fade" cyberpunk>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="flex justify-between items-center">
          <Title level={2}>{intl.formatMessage({ id: 'modules.title' })}</Title>
          <Space>
            <Button icon={<ReloadOutlined />}>
              {intl.formatMessage({ id: 'modules.refresh' })}
            </Button>
            <Button icon={<DownloadOutlined />}>
              {intl.formatMessage({ id: 'modules.install' })}
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              {intl.formatMessage({ id: 'modules.add' })}
            </Button>
          </Space>
        </div>

        <Paragraph className="text-gray-400">
          {intl.formatMessage({ id: 'modules.description' })}
        </Paragraph>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-900 border-gray-700 shadow-md">
              <div className="text-center">
                <AppstoreOutlined style={{ fontSize: '24px', color: '#1677ff' }} />
                <div className="mt-2 text-lg font-bold">5</div>
                <div className="text-gray-400">{intl.formatMessage({ id: 'modules.total' })}</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-900 border-gray-700 shadow-md">
              <div className="text-center">
                <AppstoreOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                <div className="mt-2 text-lg font-bold">4</div>
                <div className="text-gray-400">{intl.formatMessage({ id: 'modules.active' })}</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-900 border-gray-700 shadow-md">
              <div className="text-center">
                <AppstoreOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                <div className="mt-2 text-lg font-bold">1</div>
                <div className="text-gray-400">{intl.formatMessage({ id: 'modules.inactive' })}</div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-gray-900 border-gray-700 shadow-md">
              <div className="text-center">
                <AppstoreOutlined style={{ fontSize: '24px', color: '#eb2f96' }} />
                <div className="mt-2 text-lg font-bold">2</div>
                <div className="text-gray-400">{intl.formatMessage({ id: 'modules.updates' })}</div>
              </div>
            </Card>
          </Col>
        </Row>

        <Card className="bg-gray-900 border-gray-700 shadow-md">
          <div className="mb-4">
            <Input
              placeholder={intl.formatMessage({ id: 'common.search' })}
              prefix={<SearchOutlined />}
              className="max-w-md"
            />
          </div>
          <Table
            dataSource={modules}
            columns={columns}
            pagination={{ pageSize: 10 }}
            className="bg-gray-900"
          />
        </Card>
      </Space>
    </PageTransition>
  );
};

export default ModulesPage;
