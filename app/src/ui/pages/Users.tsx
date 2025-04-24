import React, { useState } from 'react';
import {
  Card,
  Table,
  Typography,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Avatar,
  Dropdown,
  Menu,
  message,
  Tabs,
  Badge,
  Tooltip,
  Divider,
  Alert,
  Row,
  Col,
  Statistic,
  Progress
} from 'antd';
import {
  UserOutlined,
  PlusOutlined,
  MoreOutlined,
  MailOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useAuth } from 'wasp/client/auth';
import RoleBasedAccess from '../auth/RoleBasedAccess';
import WorkspaceAccess from '../auth/WorkspaceAccess';
import { UserRole } from '../modules/types';
import AIActionButton from '../ai/components/AIActionButton';
import { useAI } from '../ai/AIProvider';

const { Title, Text, Paragraph, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

// Enhanced mock data for users
const mockUsers = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'ADMIN',
    avatarUrl: null,
    lastActive: '2023-04-20T10:30:00Z',
    status: 'active',
    joinDate: '2023-02-10',
    modules: ['CRM', 'Knowledge Base'],
    activityScore: 78,
    joinDate: '2023-01-15',
    modules: ['CRM', 'AI Assistant', 'Knowledge Base'],
    activityScore: 92
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'MANAGER',
    avatarUrl: null,
    lastActive: '2023-04-19T14:45:00Z',
    status: 'active',
    joinDate: '2023-03-05',
    modules: ['CRM'],
    activityScore: 65,
    joinDate: '2023-02-10',
    modules: ['CRM', 'Knowledge Base'],
    activityScore: 78
  },
  {
    id: '3',
    email: 'bob.johnson@example.com',
    firstName: 'Bob',
    lastName: 'Johnson',
    role: 'USER',
    avatarUrl: null,
    lastActive: '2023-04-18T09:15:00Z',
    status: 'active',
    joinDate: '2023-03-05',
    modules: ['CRM'],
    activityScore: 65
  },
  {
    id: '4',
    email: 'alice.williams@example.com',
    firstName: 'Alice',
    lastName: 'Williams',
    role: 'USER',
    avatarUrl: null,
    lastActive: '2023-04-15T16:20:00Z',
    status: 'inactive',
    joinDate: '2023-03-20',
    modules: [],
    activityScore: 0
  },
  {
    id: '5',
    email: 'michael.brown@example.com',
    firstName: 'Michael',
    lastName: 'Brown',
    role: 'USER',
    avatarUrl: null,
    lastActive: '2023-04-17T11:30:00Z',
    status: 'active',
    joinDate: '2023-03-25',
    modules: ['AI Assistant'],
    activityScore: 45
  },
  {
    id: '6',
    email: 'sarah.davis@example.com',
    firstName: 'Sarah',
    lastName: 'Davis',
    role: 'MANAGER',
    avatarUrl: null,
    lastActive: '2023-04-19T09:00:00Z',
    status: 'active',
    joinDate: '2023-02-15',
    modules: ['CRM', 'AI Assistant', 'Knowledge Base'],
    activityScore: 85
  }
];

// Mock pending invitations
const pendingInvitations = [
  {
    id: 'inv-1',
    email: 'david.miller@example.com',
    role: 'USER',
    invitedBy: 'John Doe',
    invitedAt: '2023-04-18T14:30:00Z',
    status: 'pending'
  },
  {
    id: 'inv-2',
    email: 'emily.clark@example.com',
    role: 'MANAGER',
    invitedBy: 'John Doe',
    invitedAt: '2023-04-19T10:15:00Z',
    status: 'pending'
  }
];

const Users: React.FC = () => {
  const { data: user } = useAuth();
  const { useSwarm } = useAI();
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [inviteForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  // Define AI actions for the users page
  const userAIActions = [
    {
      id: 'analyze-user-behavior',
      label: 'Analyze User Behavior',
      description: 'Get AI insights about user activity and engagement patterns',
      icon: <UserOutlined />,
      prompt: 'Analyze the user behavior data and provide insights about activity patterns, engagement levels, and potential improvements.',
      outputType: 'markdown'
    },
    {
      id: 'suggest-role-assignments',
      label: 'Suggest Role Assignments',
      description: 'Get AI recommendations for optimal user role assignments',
      icon: <UserSwitchOutlined />,
      prompt: 'Based on the current user roles and activity patterns, what role assignments would you recommend for optimal team structure?',
      outputType: 'markdown'
    },
    {
      id: 'identify-inactive-users',
      label: 'Identify Inactive Users',
      description: 'Get AI analysis of inactive users and re-engagement strategies',
      icon: <ClockCircleOutlined />,
      prompt: 'Identify inactive users in the workspace and suggest strategies for re-engaging them.',
      outputType: 'markdown'
    }
  ];

  const showInviteModal = () => {
    setIsInviteModalVisible(true);
  };

  const handleInviteCancel = () => {
    setIsInviteModalVisible(false);
    inviteForm.resetFields();
  };

  const handleInvite = async () => {
    try {
      const values = await inviteForm.validateFields();
      console.log('Invite user with values:', values);
      message.success(`Invitation sent to ${values.email}`);
      setIsInviteModalVisible(false);
      inviteForm.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const showEditModal = (user: any) => {
    setSelectedUser(user);
    editForm.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedUser(null);
  };

  const handleEdit = async () => {
    try {
      const values = await editForm.validateFields();
      console.log('Edit user with values:', values);
      message.success(`User ${selectedUser.email} updated successfully`);
      setIsEditModalVisible(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDeleteUser = (userId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to remove this user?',
      content: 'This action cannot be undone.',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      okText: 'Yes, Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Delete user with ID:', userId);
        message.success('User removed successfully');
      }
    });
  };

  const handleResetPassword = (userId: string) => {
    Modal.confirm({
      title: 'Reset Password',
      content: 'Are you sure you want to send a password reset email to this user?',
      icon: <InfoCircleOutlined />,
      okText: 'Yes, Send Email',
      cancelText: 'Cancel',
      onOk() {
        console.log('Reset password for user with ID:', userId);
        message.success('Password reset email sent');
      }
    });
  };

  const handleResendInvitation = (invitationId: string) => {
    console.log('Resend invitation with ID:', invitationId);
    message.success('Invitation resent successfully');
  };

  const handleCancelInvitation = (invitationId: string) => {
    Modal.confirm({
      title: 'Cancel Invitation',
      content: 'Are you sure you want to cancel this invitation?',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      okText: 'Yes, Cancel Invitation',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('Cancel invitation with ID:', invitationId);
        message.success('Invitation cancelled successfully');
      }
    });
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return 'red';
      case 'MANAGER':
        return 'blue';
      case 'USER':
        return 'green';
      default:
        return 'default';
    }
  };

  // Filter users based on role, status, and search text
  const filteredUsers = mockUsers.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesSearch = !searchText ||   filters: [
        { text: 'Admin', value: 'ADMIN' },
        { text: 'Manager', value: 'MANAGER' },
        { text: 'User', value: 'USER' }
      ],
      onFilter: (value: string, record: any) => record.role === value
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={status === 'active' ? 'success' : 'default'}
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' }
      ],
      onFilter: (value: string, record: any) => record.status === value
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string, record: any) => (
        <div>
          <div>{new Date(date).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {record.status === 'active' ? 'Online' : 'Offline'}
          </div>
        </div>
      ),
      sorter: (a: any, b: any) => new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()
    },
    {
      title: 'Modules',
      key: 'modules',
      render: (record: any) => (
        <div>
          {record.modules.length > 0 ? (
            <Space size={[0, 4]} wrap>
              {record.modules.slice(0, 2).map((module: string) => (
                <Tag key={module}>{module}</Tag>
              ))}
              {record.modules.length > 2 && (
                <Tooltip title={record.modules.slice(2).join(', ')}>
                  <Tag>+{record.modules.length - 2}</Tag>
                </Tooltip>
              )}
            </Space>
          ) : (
            <Text type="secondary" className="text-xs">No modules</Text>
          )}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={() => showEditModal(record)}
              >
                Edit User
              </Menu.Item>
              <Menu.Item
                key="reset"
                icon={<LockOutlined />}
                onClick={() => handleResetPassword(record.id)}
              >
                Reset Password
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                key="delete"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDeleteUser(record.id)}
                disabled={record.id === user?.id}
              >
                Remove User
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Invitation table columns
  const invitationColumns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <div className="flex items-center">
          <Avatar
            icon={<MailOutlined />}
            className="mr-2"
            style={{ backgroundColor: '#faad14' }}
          />
          <Text>{email}</Text>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => (
        <Tag color={getRoleColor(role)}>{role}</Tag>
      ),
    },
    {
      title: 'Invited By',
      dataIndex: 'invitedBy',
      key: 'invitedBy',
    },
    {
      title: 'Date Sent',
      dataIndex: 'invitedAt',
      key: 'invitedAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="orange">PENDING</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            size="small"
            icon={<MailOutlined />}
            onClick={() => handleResendInvitation(record.id)}
          >
            Resend
          </Button>
          <Button
            size="small"
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => handleCancelInvitation(record.id)}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER']}>
      <WorkspaceAccess>
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Title level={2}>Users</Title>
              <Text type="secondary">
                Manage users and their permissions in your workspace
              </Text>
            </div>
            <Space>
              <Search
                placeholder="Search users..."
                allowClear
                onSearch={value => setSearchText(value)}
                style={{ width: 250 }}
              />
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={showInviteModal}
              >
                Invite User
              </Button>
            </Space>
          </div>

          {/* AI Action Buttons */}
          <div className="mb-6">
            <Space wrap>
              {userAIActions.map(action => (
                <AIActionButton
                  key={action.id}
                  action={action}
                  type="default"
                  size="middle"
                />
              ))}
            </Space>
          </div>

          {/* User Stats */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="shadow-sm">
                <Statistic
                  title="Total Users"
                  value={mockUsers.length}
                  prefix={<TeamOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#1677ff' }}
                />
                <div className="mt-2">
                  <Text type="secondary" className="text-xs">
                    {mockUsers.filter(u => u.status === 'active').length} active users
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="shadow-sm">
                <Statistic
                  title="Admins & Managers"
                  value={mockUsers.filter(u => u.role === 'ADMIN' || u.role === 'MANAGER').length}
                  prefix={<UserSwitchOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#722ed1' }}
                />
                <div className="mt-2">
                  <Text type="secondary" className="text-xs">
                    {mockUsers.filter(u => u.role === 'ADMIN').length} admins, {mockUsers.filter(u => u.role === 'MANAGER').length} managers
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="shadow-sm">
                <Statistic
                  title="Pending Invitations"
                  value={pendingInvitations.length}
                  prefix={<MailOutlined className="text-orange-500" />}
                  valueStyle={{ color: '#fa8c16' }}
                />
                <div className="mt-2">
                  <Text type="secondary" className="text-xs">
                    {pendingInvitations.filter(i => i.role === 'MANAGER').length} managers, {pendingInvitations.filter(i => i.role === 'USER').length} users
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="shadow-sm">
                <Statistic
                  title="Active Today"
                  value={mockUsers.filter(u => {
                    const lastActive = new Date(u.lastActive);
                    const today = new Date();
                    return lastActive.toDateString() === today.toDateString();
                  }).length}
                  prefix={<ClockCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <div className="mt-2">
                  <Text type="secondary" className="text-xs">
                    {Math.round(mockUsers.filter(u => {
                      const lastActive = new Date(u.lastActive);
                      const today = new Date();
                      return lastActive.toDateString() === today.toDateString();
                    }).length / mockUsers.length * 100)}% of total users
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>

          <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-4">
            <TabPane tab="All Users" key="all" />
            <TabPane tab="Admins & Managers" key="admins" />
            <TabPane tab="Regular Users" key="users" />
            <TabPane tab="Pending Invitations" key="pending" />
          </Tabs>

          {activeTab !== 'pending' && (
            <div className="flex justify-between items-center mb-4">
              <div>
                <Text>
                  {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
                </Text>
              </div>
              <Space>
                <Select
                  defaultValue="all"
                  style={{ width: 120 }}
                  onChange={value => setRoleFilter(value)}
                >
                  <Option value="all">All Roles</Option>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                </Select>
                <Select
                  defaultValue="all"
                  style={{ width: 120 }}
                  onChange={value => setStatusFilter(value)}
                >
                  <Option value="all">All Status</Option>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Space>
            </div>
          )}

          <Card className="shadow-sm">
            {activeTab === 'all' && (
              <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            )}

            {activeTab === 'admins' && (
              <Table
                columns={columns}
                dataSource={filteredUsers.filter(u => u.role === 'ADMIN' || u.role === 'MANAGER')}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            )}

            {activeTab === 'users' && (
              <Table
                columns={columns}
                dataSource={filteredUsers.filter(u => u.role === 'USER')}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            )}

            {activeTab === 'pending' && (
              <>
                <Alert
                  message="Pending Invitations"
                  description="These users have been invited but have not yet accepted their invitations."
                  type="info"
                  showIcon
                  className="mb-4"
                />
                <Table
                  columns={invitationColumns}
                  dataSource={pendingInvitations}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              </>
            )}
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchText.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  // User table columns
  const columns = [
    {
      title: 'User',
      dataIndex: 'email',
      key: 'user',
      render: (_: string, record: any) => (
        <div className="flex items-center">
          <Avatar
            icon={<UserOutlined />}
            src={record.avatarUrl}
            className="mr-2"
            size="large"
            style={{
              backgroundColor: record.status === 'active' ? '#1677ff' : '#d9d9d9'
            }}
          />
          <div>
            <div className="font-medium">{record.firstName} {record.lastName}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
            width={600}
        </div>
      ),
      sorter: (a: any, b: any) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => (
        <Tag color={getRoleColor(role)}>{role}</Tag>
      ),
      filters: [
        { text: 'Admin', value: 'ADMIN' },
        { text: 'Manager', value: 'MANAGER' },
        { text: 'User', value: 'USER' }
      ],
      onFilter: (value: string, record: any) => record.role === value
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={status === 'active' ? 'success' : 'default'}
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' }
      ],
      onFilter: (value: string, record: any) => record.status === value
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string, record: any) => (
        <div>
          <div>{new Date(date).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500"odules"
                label="Module Access"
                initialValue={['CRM']}
              >
                <Select mode="multiple" placeholder="Select modules">
                  <Option value="CRM">CRM</Option>
                  <Option value="AI Assistant">AI Assistant</Option>
                  <Option value="Knowledge Base">Knowledge Base</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="message"
                label="Personal Message (Optional)"
              >
                <Input.TextArea
                  placeholder="Add a personal message to the invitation email"
                  rows={3}
                />
              </Form.Item>

              <Divider />

              <div className="bg-gray-50 p-4 rounded-md">
                <Title level={5}>What happens next?</Title>
                <Paragraph className="text-sm text-gray-500">
                  An invitation email will be sent to the user with instructions to create an account.
                  They will have access to the selected modules and permissions based on their role.
                </Paragraph>
              </div>
            {record.status === 'active' ? 'Online' : 'Offline'}
          </div>
        </div>
      ),
      sorter: (a: any, b: any) => new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()
    },
    {
      title: 'Modules',
      key: 'modules',
      render: (record: any) => (
        <div>
          {record.modules.length > 0 ? (
            <Space size={[0, 4]} wrap>
              {record.modules.slice(0, 2).map((module: string) => (
                <Tag key={module}>{module}</Tag>
              ))}
              {record.modules.length > 2 && (
                <Tooltip title={record.modules.slice(2).join(', ')}>
                  <Tag>+{record.modules.length - 2}</Tag>
                </Tooltip>
              )}
            </Space>
          ) : (
            <Text type="secondary" className="text-xs">No modules</Text>
          )}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={() => showEditModal(record)}
              >
                Edit User
              </Menu.Item>
              <Menu.Item
                key="reset"
                icon={<LockOutlined />}
                onClick={() => handleResetPassword(record.id)}
              div className="flex items-center mb-4">
                  <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    src={selectedUser.avatarUrl}
                    style={{
                      backgroundColor: selectedUser.status === 'active' ? '#1677ff' : '#d9d9d9',
                      marginRight: '16px'
                    }}
                  />
                  <div>
                    <Title level={4} className="mb-0">{selectedUser.firstName} {selectedUser.lastName}</Title>
                    <Text type="secondary">{selectedUser.email}</Text>
                  </div>
                </div>

                <Divider />

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter an email address' },
                    { type: 'email', message: 'Please enter a valid email address' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} disabled />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="role"
                      label="Role"
                      rules={[{ required: true, message: 'Please select a role' }]}
                    >
                      <Select>
                        <Option value="USER">User</Option>
                        <Option value="MANAGER">Manager</Option>
                        <Option value="ADMIN">Admin</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="status"
                      label="Status"
                      rules={[{ required: true, message: 'Please select a status' }]}
                    >
                      <Select>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="modules"
                  label="Module Access"
                  initialValue={selectedUser.modules}
                >
                  <Select mode="multiple" placeholder="Select modules">
                    <Option value="CRM">CRM</Option>
                    <Option value="AI Assistant">AI Assistant</Option>
                    <Option value="Knowledge Base">Knowledge Base</Option>
                  </Select>
                </Form.Item>

                <Divider />

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <Text strong>User Activity</Text>
                      <div className="text-sm text-gray-500">
                        Last active: {new Date(selectedUser.lastActive).toLocaleString()}
                      </div>
                    </div>
                    <Progress
                      type="circle"
                      percent={selectedUser.activityScore}
                      width={50}
                      format={percent => `${percent}%`}
                      status={
                        selectedUser.activityScore > 70 ? "success" :
                        selectedUser.activityScore > 40 ? "normal" :
                        "exception"
                      }
                    />
                  </div>
                </div>
                Reset Password
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                key="delete"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDeleteUser(record.id)}
                disabled={record.id === user?.id}
              >
                Remove User
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Invitation table columns
  const invitationColumns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <div className="flex items-center">
          <Avatar
            icon={<MailOutlined />}
            className="mr-2"
            style={{ backgroundColor: '#faad14' }}
          />
          <Text>{email}</Text>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => (
        <Tag color={getRoleColor(role)}>{role}</Tag>
      ),
    },
    {
      title: 'Invited By',
      dataIndex: 'invitedBy',
      key: 'invitedBy',
    },
    {
      title: 'Date Sent',
      dataIndex: 'invitedAt',
      key: 'invitedAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="orange">PENDING</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            size="small"
            icon={<MailOutlined />}
            onClick={() => handleResendInvitation(record.id)}
          >
            Resend
          </Button>
          <Button
            size="small"
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => handleCancelInvitation(record.id)}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER']}>
      <WorkspaceAccess>
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Title level={2}>Users</Title>
              <Text type="secondary">
                Manage users and their permissions in your workspace
              </Text>
            </div>
            <Space>
              <Search
                placeholder="Search users..."
                allowClear
                onSearch={value => setSearchText(value)}
                style={{ width: 250 }}
              />
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={showInviteModal}
              >
                Invite User
              </Button>
            </Space>
          </div>

          {/* User Stats */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="shadow-sm">
                <Statistic
                  title="Total Users"
                  value={mockUsers.length}
                  prefix={<TeamOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#1677ff' }}
                />
                <div className="mt-2">
                  <Text type="secondary" className="text-xs">
                    {mockUsers.filter(u => u.status === 'active').length} active users
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="shadow-sm">
                <Statistic
                  title="Admins & Managers"
                  value={mockUsers.filter(u => u.role === 'ADMIN' || u.role === 'MANAGER').length}
                  prefix={<UserSwitchOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#722ed1' }}
                />
                <div className="mt-2">
                  <Text type="secondary" className="text-xs">
                    {mockUsers.filter(u => u.role === 'ADMIN').length} admins, {mockUsers.filter(u => u.role === 'MANAGER').length} managers
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="shadow-sm">
                <Statistic
                  title="Pending Invitations"
                  value={pendingInvitations.length}
                  prefix={<MailOutlined className="text-orange-500" />}
                  valueStyle={{ color: '#fa8c16' }}
                />
                <div className="mt-2">
                  <Text type="secondary" className="text-xs">
                    {pendingInvitations.filter(i => i.role === 'MANAGER').length} managers, {pendingInvitations.filter(i => i.role === 'USER').length} users
                  </Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card hoverable className="shadow-sm">
                <Statistic
                  title="Active Today"
                  value={mockUsers.filter(u => {
                    const lastActive = new Date(u.lastActive);
                    const today = new Date();
                    return lastActive.toDateString() === today.toDateString();
                  }).length}
                  prefix={<ClockCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <div className="mt-2">
                  <Text type="secondary" className="text-xs">
                    {Math.round(mockUsers.filter(u => {
                      const lastActive = new Date(u.lastActive);
                      const today = new Date();
                      return lastActive.toDateString() === today.toDateString();
                    }).length / mockUsers.length * 100)}% of total users
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>

          <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-4">
            <TabPane tab="All Users" key="all" />
            <TabPane tab="Admins & Managers" key="admins" />
            <TabPane tab="Regular Users" key="users" />
            <TabPane tab="Pending Invitations" key="pending" />
          </Tabs>

          {activeTab !== 'pending' && (
            <div className="flex justify-between items-center mb-4">
              <div>
                <Text>
                  {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
                </Text>
              </div>
              <Space>
                <Select
                  defaultValue="all"
                  style={{ width: 120 }}
                  onChange={value => setRoleFilter(value)}
                >
                  <Option value="all">All Roles</Option>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                </Select>
                <Select
                  defaultValue="all"
                  style={{ width: 120 }}
                  onChange={value => setStatusFilter(value)}
                >
                  <Option value="all">All Status</Option>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Space>
            </div>
          )}

          <Card className="shadow-sm">
            {activeTab === 'all' && (
              <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            )}

            {activeTab === 'admins' && (
              <Table
                columns={columns}
                dataSource={filteredUsers.filter(u => u.role === 'ADMIN' || u.role === 'MANAGER')}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            )}

            {activeTab === 'users' && (
              <Table
                columns={columns}
                dataSource={filteredUsers.filter(u => u.role === 'USER')}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            )}

            {activeTab === 'pending' && (
              <>
                <Alert
                  message="Pending Invitations"
                  description="These users have been invited but have not yet accepted their invitations."
                  type="info"
                  showIcon
                  className="mb-4"
                />
                <Table
                  columns={invitationColumns}
                  dataSource={pendingInvitations}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              </>
            )}
          </Card>

          <Modal
            title="Invite User"
            open={isInviteModalVisible}
            onCancel={handleInviteCancel}
            onOk={handleInvite}
            okText="Send Invitation"
            width={600}
          >
            <Form
              form={inviteForm}
              layout="vertical"
              name="invite_user_form"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter an email address' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="user@example.com" />
              </Form.Item>

              <Form.Item
                name="role"
                label="Role"
                initialValue="USER"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="USER">User</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="ADMIN">Admin</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="modules"
                label="Module Access"
                initialValue={['CRM']}
              >
                <Select mode="multiple" placeholder="Select modules">
                  <Option value="CRM">CRM</Option>
                  <Option value="AI Assistant">AI Assistant</Option>
                  <Option value="Knowledge Base">Knowledge Base</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="message"
                label="Personal Message (Optional)"
              >
                <Input.TextArea
                  placeholder="Add a personal message to the invitation email"
                  rows={3}
                />
              </Form.Item>

              <Divider />

              <div className="bg-gray-50 p-4 rounded-md">
                <Title level={5}>What happens next?</Title>
                <Paragraph className="text-sm text-gray-500">
                  An invitation email will be sent to the user with instructions to create an account.
                  They will have access to the selected modules and permissions based on their role.
                </Paragraph>
              </div>
            </Form>
          </Modal>

          <Modal
            title="Edit User"
            open={isEditModalVisible}
            onCancel={handleEditCancel}
            onOk={handleEdit}
            okText="Save Changes"
            width={600}
          >
            {selectedUser && (
              <Form
                form={editForm}
                layout="vertical"
                name="edit_user_form"
              >
                <div className="flex items-center mb-4">
                  <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    src={selectedUser.avatarUrl}
                    style={{
                      backgroundColor: selectedUser.status === 'active' ? '#1677ff' : '#d9d9d9',
                      marginRight: '16px'
                    }}
                  />
                  <div>
                    <Title level={4} className="mb-0">{selectedUser.firstName} {selectedUser.lastName}</Title>
                    <Text type="secondary">{selectedUser.email}</Text>
                  </div>
                </div>

                <Divider />

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter an email address' },
                    { type: 'email', message: 'Please enter a valid email address' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} disabled />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="role"
                      label="Role"
                      rules={[{ required: true, message: 'Please select a role' }]}
                    >
                      <Select>
                        <Option value="USER">User</Option>
                        <Option value="MANAGER">Manager</Option>
                        <Option value="ADMIN">Admin</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="status"
                      label="Status"
                      rules={[{ required: true, message: 'Please select a status' }]}
                    >
                      <Select>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="modules"
                  label="Module Access"
                  initialValue={selectedUser.modules}
                >
                  <Select mode="multiple" placeholder="Select modules">
                    <Option value="CRM">CRM</Option>
                    <Option value="AI Assistant">AI Assistant</Option>
                    <Option value="Knowledge Base">Knowledge Base</Option>
                  </Select>
                </Form.Item>

                <Divider />

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <Text strong>User Activity</Text>
                      <div className="text-sm text-gray-500">
                        Last active: {new Date(selectedUser.lastActive).toLocaleString()}
                      </div>
                    </div>
                    <Progress
                      type="circle"
                      percent={selectedUser.activityScore}
                      width={50}
                      format={percent => `${percent}%`}
                      status={
                        selectedUser.activityScore > 70 ? "success" :
                        selectedUser.activityScore > 40 ? "normal" :
                        "exception"
                      }
                    />
                  </div>
                </div>
              </Form>
            )}
          </Modal>
        </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default Users;
