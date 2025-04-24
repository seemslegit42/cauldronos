import React from 'react';
import { Card, Table, Button, Space, Tag, Typography, Input } from 'antd';
import { UserOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import PageTransition from '@/components/PageTransition';
import { useIntl } from 'umi';

const { Title } = Typography;

const UsersPage: React.FC = () => {
  const intl = useIntl();

  // Sample data for users
  const users = [
    {
      key: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-04-15 14:30',
    },
    {
      key: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2023-04-14 09:15',
    },
    {
      key: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2023-03-28 11:45',
    },
    {
      key: '4',
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2023-04-12 16:20',
    },
  ];

  // Table columns
  const columns = [
    {
      title: intl.formatMessage({ id: 'users.name' }),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: intl.formatMessage({ id: 'users.email' }),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: intl.formatMessage({ id: 'users.role' }),
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Manager', value: 'Manager' },
        { text: 'User', value: 'User' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color = 'blue';
        if (role === 'Admin') color = 'red';
        if (role === 'Manager') color = 'orange';
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: intl.formatMessage({ id: 'users.status' }),
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
      title: intl.formatMessage({ id: 'users.lastLogin' }),
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: (a, b) => new Date(a.lastLogin) - new Date(b.lastLogin),
    },
    {
      title: intl.formatMessage({ id: 'common.actions' }),
      key: 'actions',
      render: () => (
        <Space size="small">
          <Button type="link" size="small">
            {intl.formatMessage({ id: 'common.edit' })}
          </Button>
          <Button type="link" size="small" danger>
            {intl.formatMessage({ id: 'common.delete' })}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageTransition type="fade" cyberpunk>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="flex justify-between items-center">
          <Title level={2}>{intl.formatMessage({ id: 'users.title' })}</Title>
          <Button type="primary" icon={<PlusOutlined />}>
            {intl.formatMessage({ id: 'users.add' })}
          </Button>
        </div>

        <Card className="bg-gray-900 border-gray-700 shadow-md">
          <div className="mb-4">
            <Input
              placeholder={intl.formatMessage({ id: 'common.search' })}
              prefix={<SearchOutlined />}
              className="max-w-md"
            />
          </div>
          <Table
            dataSource={users}
            columns={columns}
            pagination={{ pageSize: 10 }}
            className="bg-gray-900"
          />
        </Card>
      </Space>
    </PageTransition>
  );
};

export default UsersPage;
