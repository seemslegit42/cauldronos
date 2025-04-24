import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Select, 
  Typography, 
  Tooltip, 
  Avatar,
  Dropdown,
  Menu,
  Badge,
  message
} from 'antd';
import { 
  UserOutlined, 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  MailOutlined,
  MoreOutlined,
  LockOutlined,
  UnlockOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../workspace/operations';
import { z } from 'zod';

const { Title, Text } = Typography;
const { Option } = Select;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

// User schema for validation
const userSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  role: z.enum(['ADMIN', 'MANAGER', 'USER']),
});

// Mock data for users
const mockUsers = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john.doe@example.com',
    role: 'ADMIN',
    status: 'active',
    lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    avatarUrl: null,
    isVerified: true
  },
  {
    id: '2',
    username: 'janesmith',
    email: 'jane.smith@example.com',
    role: 'MANAGER',
    status: 'active',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    avatarUrl: null,
    isVerified: true
  },
  {
    id: '3',
    username: 'bobwilson',
    email: 'bob.wilson@example.com',
    role: 'USER',
    status: 'active',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    avatarUrl: null,
    isVerified: true
  },
  {
    id: '4',
    username: 'alicejohnson',
    email: 'alice.johnson@example.com',
    role: 'USER',
    status: 'invited',
    lastActive: null,
    avatarUrl: null,
    isVerified: false
  },
  {
    id: '5',
    username: 'charliebrooks',
    email: 'charlie.brooks@example.com',
    role: 'USER',
    status: 'inactive',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    avatarUrl: null,
    isVerified: true
  }
];

// Format relative time
const formatRelativeTime = (timestamp: string | null) => {
  if (!timestamp) return 'Never';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day ago`;
  
  return date.toLocaleDateString();
};

// Get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'invited':
      return 'warning';
    case 'inactive':
      return 'default';
    default:
      return 'default';
  }
};

// Get role color
const getRoleColor = (role: string) => {
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

const Users: React.FC = () => {
  const { data: currentUser } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form] = Form.useForm();
  const [inviteForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        // const response = await fetch(`/api/workspaces/${currentWorkspace?.id}/users`);
        // const data = await response.json();
        
        // Using mock data for now
        const data = mockUsers;
        
        setUsers(data);
        setFilteredUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };
    
    if (currentWorkspace) {
      fetchUsers();
    }
  }, [currentWorkspace]);

  // Handle search
  useEffect(() => {
    const filtered = users.filter(user => 
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchText, users]);

  // Handle edit user
  const handleEditUser = (user: any) => {
    setEditingUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsModalVisible(true);
  };

  // Handle save user
  const handleSaveUser = async () => {
    try {
      const values = await form.validateFields();
      
      // In a real app, this would be an API call
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/users/${editingUser.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(values)
      // });
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === editingUser.id ? { ...user, ...values } : user
        )
      );
      
      setIsModalVisible(false);
      message.success('User updated successfully');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/users/${userId}`, {
      //   method: 'DELETE'
      // });
      
      // Update local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      message.success('User removed from workspace');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle invite user
  const handleInviteUser = async () => {
    try {
      const values = await inviteForm.validateFields();
      
      // Validate with zod
      userSchema.parse(values);
      
      // In a real app, this would be an API call
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/invites`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(values)
      // });
      
      // Update local state with a new mock user
      const newUser = {
        id: Date.now().toString(),
        username: values.username,
        email: values.email,
        role: values.role,
        status: 'invited',
        lastActive: null,
        avatarUrl: null,
        isVerified: false
      };
      
      setUsers(prevUsers => [...prevUsers, newUser]);
      setIsInviteModalVisible(false);
      inviteForm.resetFields();
      message.success('Invitation sent successfully');
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          message.error(`${err.path}: ${err.message}`);
        });
      } else {
        console.error('Error inviting user:', error);
        message.error('Failed to send invitation');
      }
    }
  };

  // Handle resend invitation
  const handleResendInvitation = async (userId: string) => {
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/workspaces/${currentWorkspace?.id}/invites/${userId}/resend`, {
      //   method: 'POST'
      // });
      
      message.success('Invitation resent successfully');
    } catch (error) {
      console.error('Error resending invitation:', error);
      message.error('Failed to resend invitation');
    }
  };

  // Table columns
  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <Avatar 
            src={record.avatarUrl} 
            icon={!record.avatarUrl && <UserOutlined />} 
            className="mr-3"
          />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={getRoleColor(role)}>{role}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: any) => (
        <div>
          <Badge 
            status={getStatusColor(status) as any} 
            text={status.charAt(0).toUpperCase() + status.slice(1)} 
          />
          {record.isVerified ? (
            <Tooltip title="Email Verified">
              <CheckCircleOutlined className="ml-2 text-green-500" />
            </Tooltip>
          ) : (
            <Tooltip title="Email Not Verified">
              <CloseCircleOutlined className="ml-2 text-gray-400" />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (lastActive: string) => formatRelativeTime(lastActive),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any) => {
        // Don't allow editing or deleting yourself
        const isSelf = record.id === currentUser?.id;
        
        const menu = (
          <Menu>
            <Menu.Item 
              key="edit" 
              icon={<EditOutlined />}
              onClick={() => handleEditUser(record)}
              disabled={isSelf}
            >
              Edit User
            </Menu.Item>
            {record.status === 'invited' && (
              <Menu.Item 
                key="resend" 
                icon={<MailOutlined />}
                onClick={() => handleResendInvitation(record.id)}
              >
                Resend Invitation
              </Menu.Item>
            )}
            <Menu.Item 
              key="delete" 
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDeleteUser(record.id)}
              disabled={isSelf}
            >
              Remove from Workspace
            </Menu.Item>
          </Menu>
        );
        
        return (
          <Space>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="text" icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <MainLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="mb-0">Users</Title>
          <Space>
            <Input
              placeholder="Search users..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsInviteModalVisible(true)}
            >
              Invite User
            </Button>
          </Space>
        </div>

        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`
          }}
        />

        {/* Edit User Modal */}
        <Modal
          title="Edit User"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={handleSaveUser}
          okText="Save"
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter a username' }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter an email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input prefix={<MailOutlined />} disabled />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select>
                <Option value="ADMIN">Admin</Option>
                <Option value="MANAGER">Manager</Option>
                <Option value="USER">User</Option>
              </Select>
            </Form.Item>
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
          </Form>
        </Modal>

        {/* Invite User Modal */}
        <Modal
          title="Invite User"
          open={isInviteModalVisible}
          onCancel={() => setIsInviteModalVisible(false)}
          onOk={handleInviteUser}
          okText="Send Invitation"
        >
          <Form
            form={inviteForm}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter an email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter a username' }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              initialValue="USER"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select>
                <Option value="ADMIN">Admin</Option>
                <Option value="MANAGER">Manager</Option>
                <Option value="USER">User</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </motion.div>
    </MainLayout>
  );
};

export default Users;