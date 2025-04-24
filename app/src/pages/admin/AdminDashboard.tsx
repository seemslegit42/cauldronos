import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Button,
  Space,
  Tabs,
  Table,
  Tag,
  Divider,
  Avatar,
  Badge,
  Tooltip,
  Alert
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LockOutlined,
  AuditOutlined,
  DashboardOutlined,
  BellOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { useAuth } from 'wasp/client/auth';
import { Link } from 'react-router-dom';
import { PermissionBasedAccess } from '../../auth/permissions';
import { UserRole } from '../../auth/permissions/types';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Mock data for users
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.ADMIN,
    isAdmin: true,
    createdAt: '2023-01-01T00:00:00.000Z',
    lastActive: '2023-06-15T14:30:00.000Z',
    status: 'active'
  },
  {
    id: '2',
    email: 'manager@example.com',
    username: 'manager',
    firstName: 'Manager',
    lastName: 'User',
    role: UserRole.MANAGER,
    isAdmin: false,
    createdAt: '2023-02-15T00:00:00.000Z',
    lastActive: '2023-06-14T10:15:00.000Z',
    status: 'active'
  },
  {
    id: '3',
    email: 'user@example.com',
    username: 'user',
    firstName: 'Regular',
    lastName: 'User',
    role: UserRole.USER,
    isAdmin: false,
    createdAt: '2023-03-20T00:00:00.000Z',
    lastActive: '2023-06-10T09:45:00.000Z',
    status: 'active'
  },
  {
    id: '4',
    email: 'guest@example.com',
    username: 'guest',
    firstName: 'Guest',
    lastName: 'User',
    role: UserRole.GUEST,
    isAdmin: false,
    createdAt: '2023-04-10T00:00:00.000Z',
    lastActive: '2023-05-20T16:30:00.000Z',
    status: 'inactive'
  }
];

// Mock data for workspaces
const mockWorkspaces = [
  {
    id: '1',
    name: 'Main Workspace',
    slug: 'main',
    memberCount: 10,
    moduleCount: 5,
    plan: 'pro',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastActive: '2023-06-15T14:30:00.000Z'
  },
  {
    id: '2',
    name: 'Marketing Team',
    slug: 'marketing',
    memberCount: 5,
    moduleCount: 3,
    plan: 'starter',
    createdAt: '2023-02-15T00:00:00.000Z',
    lastActive: '2023-06-14T10:15:00.000Z'
  },
  {
    id: '3',
    name: 'Development Team',
    slug: 'dev',
    memberCount: 8,
    moduleCount: 4,
    plan: 'pro',
    createdAt: '2023-03-20T00:00:00.000Z',
    lastActive: '2023-06-10T09:45:00.000Z'
  }
];

// Mock data for audit logs
const mockAuditLogs = [
  {
    id: '1',
    userId: '1',
    username: 'admin',
    action: 'create',
    entityType: 'user',
    entityId: '4',
    details: { email: 'guest@example.com', role: 'GUEST' },
    createdAt: '2023-06-15T14:30:00.000Z',
    ipAddress: '192.168.1.1'
  },
  {
    id: '2',
    userId: '1',
    username: 'admin',
    action: 'update',
    entityType: 'workspace',
    entityId: '2',
    details: { name: 'Marketing Team', previousName: 'Marketing' },
    createdAt: '2023-06-14T10:15:00.000Z',
    ipAddress: '192.168.1.1'
  },
  {
    id: '3',
    userId: '2',
    username: 'manager',
    action: 'install',
    entityType: 'module',
    entityId: 'crm',
    details: { workspace: 'Marketing Team' },
    createdAt: '2023-06-13T09:45:00.000Z',
    ipAddress: '192.168.1.2'
  },
  {
    id: '4',
    userId: '3',
    username: 'user',
    action: 'login',
    entityType: 'auth',
    entityId: null,
    details: { method: 'email' },
    createdAt: '2023-06-12T16:30:00.000Z',
    ipAddress: '192.168.1.3'
  }
];

const AdminDashboard: React.FC = () => {
  const { data: user } = useAuth();
  const [activeTab, setActiveTab] = useState('1');
  const [users, setUsers] = useState(mockUsers);
  const [workspaces, setWorkspaces] = useState(mockWorkspaces);
  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);

  // Fetch data
  useEffect(() => {
    // In a real app, these would be API calls
    // const fetchUsers = async () => {
    //   const response = await fetch('/api/admin/users');
    //   const data = await response.json();
    //   setUsers(data);
    // };
    // fetchUsers();
    //
    // const fetchWorkspaces = async () => {
    //   const response = await fetch('/api/admin/workspaces');
    //   const data = await response.json();
    //   setWorkspaces(data);
    // };
    // fetchWorkspaces();
    //
    // const fetchAuditLogs = async () => {
    //   const response = await fetch('/api/admin/audit-logs');
    //   const data = await response.json();
    //   setAuditLogs(data);
    // };
    // fetchAuditLogs();
  }, []);

  // User table columns
  const userColumns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
      render: (_: string, record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Space direction="vertical" size={0}>
            <Text strong>{record.firstName} {record.lastName}</Text>
            <Text type="secondary">{record.email}</Text>
          </Space>
        </Space>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => {
        let color = 'default';
        switch (role) {
          case UserRole.ADMIN:
            color = 'red';
            break;
          case UserRole.MANAGER:
            color = 'blue';
            break;
          case UserRole.USER:
            color = 'green';
            break;
          case UserRole.GUEST:
            color = 'gray';
            break;
        }
        return <Tag color={color}>{role}</Tag>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'active') {
          return <Badge status="success" text="Active" />;
        }
        return <Badge status="default" text="Inactive" />;
      }
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small">
            Edit
          </Button>
          <Button type="link" size="small" danger>
            Deactivate
          </Button>
        </Space>
      )
    }
  ];

  // Workspace table columns
  const workspaceColumns = [
    {
      title: 'Workspace',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: any) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1677ff' }}>
            {record.name.charAt(0)}
          </Avatar>
          <Space direction="vertical" size={0}>
            <Text strong>{record.name}</Text>
            <Text type="secondary">{record.slug}</Text>
          </Space>
        </Space>
      )
    },
    {
      title: 'Members',
      dataIndex: 'memberCount',
      key: 'memberCount'
    },
    {
      title: 'Modules',
      dataIndex: 'moduleCount',
      key: 'moduleCount'
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan: string) => {
        let color = 'default';
        switch (plan) {
          case 'pro':
            color = 'blue';
            break;
          case 'starter':
            color = 'green';
            break;
          case 'free':
            color = 'gray';
            break;
        }
        return <Tag color={color}>{plan.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small">
            View
          </Button>
          <Button type="link" size="small">
            Edit
          </Button>
        </Space>
      )
    }
  ];

  // Audit log table columns
  const auditLogColumns = [
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString()
    },
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => {
        let color = 'default';
        let icon = null;

        switch (action) {
          case 'create':
            color = 'green';
            icon = <CheckCircleOutlined />;
            break;
          case 'update':
            color = 'blue';
            icon = <ExclamationCircleOutlined />;
            break;
          case 'delete':
            color = 'red';
            icon = <CloseCircleOutlined />;
            break;
          case 'login':
            color = 'purple';
            icon = <UserOutlined />;
            break;
          case 'install':
            color = 'cyan';
            icon = <AppstoreOutlined />;
            break;
        }

        return (
          <Tag color={color} icon={icon}>
            {action.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Entity',
      dataIndex: 'entityType',
      key: 'entityType',
      render: (entityType: string, record: any) => (
        <Space>
          <Text>{entityType}</Text>
          {record.entityId && <Text type="secondary">({record.entityId})</Text>}
        </Space>
      )
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (details: any) => (
        <Tooltip title={<pre>{JSON.stringify(details, null, 2)}</pre>}>
          <Button type="link" size="small">
            View Details
          </Button>
        </Tooltip>
      )
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress'
    }
  ];

  return (
    <PermissionBasedAccess
      requiredPermissions={['admin:access']}
      fallback={
        <Card>
          <Result
            status="403"
            title="Permission Denied"
            subTitle="You don't have permission to access the admin panel."
            extra={
              <Button type="primary" href="/dashboard">
                Back to Dashboard
              </Button>
            }
          />
        </Card>
      }
    >
      <div className="admin-dashboard">
        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Title level={2}>Admin Dashboard</Title>
            <Space>
              <Button type="primary" icon={<SettingOutlined />} href="/admin/settings">
                System Settings
              </Button>
            </Space>
          </div>

          <Alert
            message="Admin Access"
            description="This dashboard provides administrative tools for managing users, workspaces, and system settings. Use these tools with caution as they affect the entire system."
            type="warning"
            showIcon
            className="mb-4"
          />

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Statistic
                  title="Total Users"
                  value={users.length}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#1677ff' }}
                />
                <div className="mt-2">
                  <Text type="secondary">
                    {users.filter(u => u.status === 'active').length} active
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Statistic
                  title="Workspaces"
                  value={workspaces.length}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <div className="mt-2">
                  <Text type="secondary">
                    {workspaces.filter(w => w.plan === 'pro').length} on Pro plan
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Statistic
                  title="Modules"
                  value={12} {/* Mock value */}
                  prefix={<AppstoreOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
                <div className="mt-2">
                  <Text type="secondary">
                    8 active installations
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable>
                <Statistic
                  title="Audit Logs"
                  value={auditLogs.length}
                  prefix={<AuditOutlined />}
                  valueStyle={{ color: '#fa8c16' }}
                />
                <div className="mt-2">
                  <Text type="secondary">
                    Last 7 days
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane
              tab={
                <span>
                  <UserOutlined />
                  Users
                </span>
              }
              key="1"
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={4}>User Management</Title>
                <Space>
                  <Button type="primary" icon={<UserOutlined />}>
                    Create User
                  </Button>
                  <Button icon={<SettingOutlined />}>
                    User Settings
                  </Button>
                </Space>
              </div>
              <Table
                columns={userColumns}
                dataSource={users}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <TeamOutlined />
                  Workspaces
                </span>
              }
              key="2"
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={4}>Workspace Management</Title>
                <Space>
                  <Button type="primary" icon={<TeamOutlined />}>
                    Create Workspace
                  </Button>
                  <Button icon={<SettingOutlined />}>
                    Workspace Settings
                  </Button>
                </Space>
              </div>
              <Table
                columns={workspaceColumns}
                dataSource={workspaces}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <LockOutlined />
                  Permissions
                </span>
              }
              key="3"
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={4}>Permission Management</Title>
                <Button type="primary" icon={<LockOutlined />} href="/admin/permissions">
                  Manage Permissions
                </Button>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="Role Permissions" bordered={false}>
                    <p>Manage which permissions are assigned to each role in the system.</p>
                    <Button type="primary" href="/admin/permissions">
                      Manage Role Permissions
                    </Button>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="Workspace Permissions" bordered={false}>
                    <p>Configure workspace-specific permission overrides.</p>
                    <Button type="primary" href="/workspace-permissions">
                      Manage Workspace Permissions
                    </Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <AuditOutlined />
                  Audit Logs
                </span>
              }
              key="4"
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={4}>Audit Logs</Title>
                <Space>
                  <Button icon={<SettingOutlined />}>
                    Log Settings
                  </Button>
                  <Button icon={<DownloadOutlined />}>
                    Export Logs
                  </Button>
                </Space>
              </div>
              <Table
                columns={auditLogColumns}
                dataSource={auditLogs}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </PermissionBasedAccess>
  );
};

export default AdminDashboard;
