import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Button,
  Space,
  Tabs,
  Table,
  Tag,
  Avatar,
  Input,
  Select,
  Dropdown,
  Menu,
  Empty,
  Statistic,
  Row,
  Col,
  Progress,
  Badge,
  Tooltip,
  Divider
} from 'antd';
import {
  CustomerServiceOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
  EllipsisOutlined,
  SearchOutlined,
  FilterOutlined,
  TeamOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { ModuleComponentProps } from '../types';
import LivePresence from '../../workspace/LivePresence';
import ActivityFeed from '../../workspace/ActivityFeed';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const CrmModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  // Mock data for customers
  const customers = [
    {
      id: '1',
      name: 'Acme Corporation',
      contact: 'John Smith',
      email: 'john@acmecorp.com',
      phone: '(555) 123-4567',
      status: 'active',
      type: 'enterprise',
      lastContact: '2023-04-15'
    },
    {
      id: '2',
      name: 'TechStart Inc.',
      contact: 'Sarah Johnson',
      email: 'sarah@techstart.io',
      phone: '(555) 987-6543',
      status: 'active',
      type: 'startup',
      lastContact: '2023-04-18'
    },
    {
      id: '3',
      name: 'Global Services Ltd.',
      contact: 'Michael Brown',
      email: 'michael@globalservices.com',
      phone: '(555) 456-7890',
      status: 'inactive',
      type: 'enterprise',
      lastContact: '2023-03-22'
    },
    {
      id: '4',
      name: 'Local Business Co.',
      contact: 'Emily Davis',
      email: 'emily@localbusiness.co',
      phone: '(555) 234-5678',
      status: 'active',
      type: 'small',
      lastContact: '2023-04-20'
    }
  ];

  // Mock data for deals
  const deals = [
    {
      id: '1',
      customer: 'Acme Corporation',
      title: 'Enterprise License Renewal',
      value: 15000,
      stage: 'proposal',
      probability: 70,
      expectedCloseDate: '2023-05-15'
    },
    {
      id: '2',
      customer: 'TechStart Inc.',
      title: 'New Software Implementation',
      value: 8500,
      stage: 'negotiation',
      probability: 60,
      expectedCloseDate: '2023-05-30'
    },
    {
      id: '3',
      customer: 'Global Services Ltd.',
      title: 'Consulting Services',
      value: 12000,
      stage: 'discovery',
      probability: 30,
      expectedCloseDate: '2023-06-15'
    }
  ];

  // Customer table columns
  const customerColumns = [
    {
      title: 'Company',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <Avatar
            icon={<TeamOutlined />}
            style={{ backgroundColor: '#1677ff', marginRight: '8px' }}
          />
          <div>
            <div>{text}</div>
            <div className="text-xs text-gray-500">{record.contact}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'email',
      key: 'contact',
      render: (text: string, record: any) => (
        <div>
          <div className="flex items-center">
            <MailOutlined className="mr-1 text-gray-500" />
            <span>{text}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <PhoneOutlined className="mr-1" />
            <span>{record.phone}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        let color = 'default';
        if (type === 'enterprise') color = 'blue';
        if (type === 'startup') color = 'green';
        if (type === 'small') color = 'orange';

        return <Tag color={color}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Contact',
      dataIndex: 'lastContact',
      key: 'lastContact',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">View Details</Menu.Item>
              <Menu.Item key="2">Edit</Menu.Item>
              <Menu.Item key="3">Add Deal</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="4" danger>Delete</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Deal table columns
  const dealColumns = [
    {
      title: 'Deal',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <Avatar
            icon={<DollarOutlined />}
            style={{ backgroundColor: '#52c41a', marginRight: '8px' }}
          />
          <div>
            <div>{text}</div>
            <div className="text-xs text-gray-500">{record.customer}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => {
        let color = 'default';
        if (stage === 'discovery') color = 'blue';
        if (stage === 'proposal') color = 'purple';
        if (stage === 'negotiation') color = 'orange';
        if (stage === 'closed') color = 'green';

        return <Tag color={color}>{stage.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (probability: number) => (
        <Progress
          percent={probability}
          size="small"
          status={probability > 50 ? "active" : "exception"}
          strokeColor={probability > 70 ? '#52c41a' : probability > 30 ? '#faad14' : '#ff4d4f'}
        />
      ),
    },
    {
      title: 'Expected Close',
      dataIndex: 'expectedCloseDate',
      key: 'expectedCloseDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">View Details</Menu.Item>
              <Menu.Item key="2">Edit</Menu.Item>
              <Menu.Item key="3">Mark as Won</Menu.Item>
              <Menu.Item key="4">Mark as Lost</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="5" danger>Delete</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2}>CRM</Title>
            <Text type="secondary">
              Manage your customers, deals, and sales pipeline
            </Text>
          </div>
          <Space>
            <Button icon={<PlusOutlined />}>Add Customer</Button>
            <Button type="primary" icon={<PlusOutlined />}>Add Deal</Button>
          </Space>
        </div>
      </div>

      {/* Dashboard Stats */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={customers.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Deals"
              value={deals.length}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pipeline Value"
              value={deals.reduce((sum, deal) => sum + deal.value, 0)}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#722ed1' }}
              formatter={value => `$${Number(value).toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={68}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#fa8c16' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="customers">
        <TabPane tab="Customers" key="customers">
          <Card>
            <div className="mb-4 flex justify-between">
              <Input
                placeholder="Search customers..."
                prefix={<SearchOutlined />}
                style={{ width: 300 }}
              />
              <Space>
                <Select defaultValue="all" style={{ width: 120 }}>
                  <Option value="all">All Types</Option>
                  <Option value="enterprise">Enterprise</Option>
                  <Option value="startup">Startup</Option>
                  <Option value="small">Small Business</Option>
                </Select>
                <Button icon={<FilterOutlined />}>Filter</Button>
              </Space>
            </div>
            <Table
              columns={customerColumns}
              dataSource={customers}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Deals" key="deals">
          <Card>
            <div className="mb-4 flex justify-between">
              <Input
                placeholder="Search deals..."
                prefix={<SearchOutlined />}
                style={{ width: 300 }}
              />
              <Space>
                <Select defaultValue="all" style={{ width: 120 }}>
                  <Option value="all">All Stages</Option>
                  <Option value="discovery">Discovery</Option>
                  <Option value="proposal">Proposal</Option>
                  <Option value="negotiation">Negotiation</Option>
                  <Option value="closed">Closed</Option>
                </Select>
                <Button icon={<FilterOutlined />}>Filter</Button>
              </Space>
            </div>
            <Table
              columns={dealColumns}
              dataSource={deals}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Activities" key="activities">
          <Card>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" align="center">
                  <Title level={5}>Activity Tracking Coming Soon</Title>
                  <Text type="secondary">
                    Track calls, emails, meetings, and other customer interactions
                  </Text>
                  <Button type="primary" disabled>
                    Add Activity
                  </Button>
                </Space>
              }
            />
          </Card>
        </TabPane>

        <TabPane tab="Reports" key="reports">
          <Card>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" align="center">
                  <Title level={5}>CRM Reports Coming Soon</Title>
                  <Text type="secondary">
                    Generate detailed reports on sales performance, customer acquisition, and more
                  </Text>
                  <Button type="primary" disabled>
                    Generate Report
                  </Button>
                </Space>
              }
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

const CrmModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  // Mock data for customers
  const customers = [
    {
      id: '1',
      name: 'Acme Corporation',
      contact: 'John Smith',
      email: 'john@acmecorp.com',
      phone: '(555) 123-4567',
      status: 'active',
      type: 'enterprise',
      lastContact: '2023-04-15'
    },
    {
      id: '2',
      name: 'TechStart Inc.',
      contact: 'Sarah Johnson',
      email: 'sarah@techstart.io',
      phone: '(555) 987-6543',
      status: 'active',
      type: 'startup',
      lastContact: '2023-04-18'
    },
    {
      id: '3',
      name: 'Global Services Ltd.',
      contact: 'Michael Brown',
      email: 'michael@globalservices.com',
      phone: '(555) 456-7890',
      status: 'inactive',
      type: 'enterprise',
      lastContact: '2023-03-22'
    },
    {
      id: '4',
      name: 'Local Business Co.',
      contact: 'Emily Davis',
      email: 'emily@localbusiness.co',
      phone: '(555) 234-5678',
      status: 'active',
      type: 'small',
      lastContact: '2023-04-20'
    }
  ];

  // Mock data for deals
  const deals = [
    {
      id: '1',
      customer: 'Acme Corporation',
      title: 'Enterprise License Renewal',
      value: 15000,
      stage: 'proposal',
      probability: 70,
      expectedCloseDate: '2023-05-15'
    },
    {
      id: '2',
      customer: 'TechStart Inc.',
      title: 'New Software Implementation',
      value: 8500,
      stage: 'negotiation',
      probability: 60,
      expectedCloseDate: '2023-05-30'
    },
    {
      id: '3',
      customer: 'Global Services Ltd.',
      title: 'Consulting Services',
      value: 12000,
      stage: 'discovery',
      probability: 30,
      expectedCloseDate: '2023-06-15'
    }
  ];

  // Customer table columns
  const customerColumns = [
    {
      title: 'Company',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <Avatar
            icon={<TeamOutlined />}
            style={{ backgroundColor: '#1677ff', marginRight: '8px' }}
          />
          <div>
            <div>{text}</div>
            <div className="text-xs text-gray-500">{record.contact}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'email',
      key: 'contact',
      render: (text: string, record: any) => (
        <div>
          <div className="flex items-center">
            <MailOutlined className="mr-1 text-gray-500" />
            <span>{text}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <PhoneOutlined className="mr-1" />
            <span>{record.phone}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        let color = 'default';
        if (type === 'enterprise') color = 'blue';
        if (type === 'startup') color = 'green';
        if (type === 'small') color = 'orange';

        return <Tag color={color}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Contact',
      dataIndex: 'lastContact',
      key: 'lastContact',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">View Details</Menu.Item>
              <Menu.Item key="2">Edit</Menu.Item>
              <Menu.Item key="3">Add Deal</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="4" danger>Delete</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Deal table columns
  const dealColumns = [
    {
      title: 'Deal',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <Avatar
            icon={<DollarOutlined />}
            style={{ backgroundColor: '#52c41a', marginRight: '8px' }}
          />
          <div>
            <div>{text}</div>
            <div className="text-xs text-gray-500">{record.customer}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => {
        let color = 'default';
        if (stage === 'discovery') color = 'blue';
        if (stage === 'proposal') color = 'purple';
        if (stage === 'negotiation') color = 'orange';
        if (stage === 'closed') color = 'green';

        return <Tag color={color}>{stage.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (probability: number) => (
        <Progress
          percent={probability}
          size="small"
          status={probability > 50 ? "active" : "exception"}
          strokeColor={probability > 70 ? '#52c41a' : probability > 30 ? '#faad14' : '#ff4d4f'}
        />
      ),
    },
    {
      title: 'Expected Close',
      dataIndex: 'expectedCloseDate',
      key: 'expectedCloseDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">View Details</Menu.Item>
              <Menu.Item key="2">Edit</Menu.Item>
              <Menu.Item key="3">Mark as Won</Menu.Item>
              <Menu.Item key="4">Mark as Lost</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="5" danger>Delete</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2}>CRM</Title>
            <Text type="secondary">
              Manage your customers, deals, and sales pipeline
            </Text>
          </div>
          <Space>
            <Button icon={<PlusOutlined />}>Add Customer</Button>
            <Button type="primary" icon={<PlusOutlined />}>Add Deal</Button>
          </Space>
        </div>
      </div>

      {/* Dashboard Stats */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={customers.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Deals"
              value={deals.length}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pipeline Value"
              value={deals.reduce((sum, deal) => sum + deal.value, 0)}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#722ed1' }}
              formatter={value => `$${Number(value).toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={68}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#fa8c16' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="customers">
        <TabPane tab="Customers" key="customers">
          <Card>
            <div className="mb-4 flex justify-between">
              <Input
                placeholder="Search customers..."
                prefix={<SearchOutlined />}
                style={{ width: 300 }}
              />
              <Space>
                <Select defaultValue="all" style={{ width: 120 }}>
                  <Option value="all">All Types</Option>
                  <Option value="enterprise">Enterprise</Option>
                  <Option value="startup">Startup</Option>
                  <Option value="small">Small Business</Option>
                </Select>
                <Button icon={<FilterOutlined />}>Filter</Button>
              </Space>
            </div>
            <Table
              columns={customerColumns}
              dataSource={customers}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Deals" key="deals">
          <Card>
            <div className="mb-4 flex justify-between">
              <Input
                placeholder="Search deals..."
                prefix={<SearchOutlined />}
                style={{ width: 300 }}
              />
              <Space>
                <Select defaultValue="all" style={{ width: 120 }}>
                  <Option value="all">All Stages</Option>
                  <Option value="discovery">Discovery</Option>
                  <Option value="proposal">Proposal</Option>
                  <Option value="negotiation">Negotiation</Option>
                  <Option value="closed">Closed</Option>
                </Select>
                <Button icon={<FilterOutlined />}>Filter</Button>
              </Space>
            </div>
            <Table
              columns={dealColumns}
              dataSource={deals}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Activities" key="activities">
          <Card>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" align="center">
                  <Title level={5}>Activity Tracking Coming Soon</Title>
                  <Text type="secondary">
                    Track calls, emails, meetings, and other customer interactions
                  </Text>
                  <Button type="primary" disabled>
                    Add Activity
                  </Button>
                </Space>
              }
            />
          </Card>
        </TabPane>

        <TabPane tab="Reports" key="reports">
          <Card>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" align="center">
                  <Title level={5}>CRM Reports Coming Soon</Title>
                  <Text type="secondary">
                    Generate detailed reports on sales performance, customer acquisition, and more
                  </Text>
                  <Button type="primary" disabled>
                    Generate Report
                  </Button>
                </Space>
              }
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

