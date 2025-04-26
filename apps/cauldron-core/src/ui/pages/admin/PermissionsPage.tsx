import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Tabs,
  Typography,
  Input,
  Select,
  Modal,
  Form,
  message,
  Tooltip,
  Divider,
  Result
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  LockOutlined,
  TeamOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useAuth } from 'wasp/client/auth';
import { PermissionCategory, UserRole } from '../../auth/permissions/types';
import { PermissionBasedAccess } from '../../auth/permissions';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Mock data for permissions
const mockPermissions = [
  {
    id: '1',
    name: 'Access Admin Panel',
    slug: 'admin:access',
    description: 'Access the admin panel and system settings',
    category: PermissionCategory.SYSTEM,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Manage Users',
    slug: 'users:manage',
    description: 'Create, update, and delete users',
    category: PermissionCategory.SYSTEM,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Create Workspace',
    slug: 'workspace:create',
    description: 'Create a new workspace',
    category: PermissionCategory.WORKSPACE,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Access Module',
    slug: 'module:access',
    description: 'Access a module',
    category: PermissionCategory.MODULE,
    createdAt: new Date().toISOString()
  }
];

// Mock data for role permissions
const mockRolePermissions = {
  ADMIN: ['admin:access', 'users:manage', 'workspace:create', 'module:access'],
  MANAGER: ['workspace:create', 'module:access'],
  USER: ['module:access'],
  GUEST: []
};

const PermissionsPage: React.FC = () => {
  const { data: user } = useAuth();
  const [permissions, setPermissions] = useState(mockPermissions);
  const [rolePermissions, setRolePermissions] = useState(mockRolePermissions);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState<any>(null);
  const [form] = Form.useForm();

  // Fetch permissions
  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchPermissions = async () => {
    //   const response = await fetch('/api/permissions');
    //   const data = await response.json();
    //   setPermissions(data);
    // };
    // fetchPermissions();
  }, []);

  // Fetch role permissions
  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchRolePermissions = async () => {
    //   const response = await fetch('/api/role-permissions');
    //   const data = await response.json();
    //   setRolePermissions(data);
    // };
    // fetchRolePermissions();
  }, []);

  // Filter permissions based on search text
  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchText.toLowerCase()) ||
      permission.slug.toLowerCase().includes(searchText.toLowerCase()) ||
      permission.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle permission creation/update
  const handleSavePermission = async () => {
    try {
      const values = await form.validateFields();

      // In a real app, this would be an API call
      if (editingPermission) {
        // Update permission
        // await fetch(`/api/permissions/${editingPermission.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(values)
        // });

        // Update local state
        setPermissions(
          permissions.map((p) =>
            p.id === editingPermission.id ? { ...p, ...values } : p
          )
        );

        message.success('Permission updated successfully');
      } else {
        // Create permission
        // const response = await fetch('/api/permissions', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(values)
        // });
        // const newPermission = await response.json();

        // Create a mock new permission
        const newPermission = {
          id: Math.random().toString(),
          ...values,
          createdAt: new Date().toISOString()
        };

        // Update local state
        setPermissions([...permissions, newPermission]);

        message.success('Permission created successfully');
      }

      // Close modal and reset form
      setIsModalVisible(false);
      form.resetFields();
      setEditingPermission(null);
    } catch (error) {
      console.error('Error saving permission:', error);
    }
  };

  // Handle permission deletion
  const handleDeletePermission = async (id: string) => {
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/permissions/${id}`, {
      //   method: 'DELETE'
      // });

      // Update local state
      setPermissions(permissions.filter((p) => p.id !== id));

      message.success('Permission deleted successfully');
    } catch (error) {
      console.error('Error deleting permission:', error);
    }
  };

  // Handle role permission toggle
  const handleRolePermissionToggle = async (role: string, permissionSlug: string, checked: boolean) => {
    try {
      // In a real app, this would be an API call
      // await fetch('/api/role-permissions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ role, permissionSlug, enabled: checked })
      // });

      // Update local state
      const updatedRolePermissions = { ...rolePermissions };
      if (checked) {
        updatedRolePermissions[role as keyof typeof rolePermissions] = [
          ...updatedRolePermissions[role as keyof typeof rolePermissions],
          permissionSlug
        ];
      } else {
        updatedRolePermissions[role as keyof typeof rolePermissions] = updatedRolePermissions[
          role as keyof typeof rolePermissions
        ].filter((slug) => slug !== permissionSlug);
      }

      setRolePermissions(updatedRolePermissions);

      message.success(`Permission ${checked ? 'granted to' : 'revoked from'} ${role} role`);
    } catch (error) {
      console.error('Error updating role permission:', error);
    }
  };

  // Permission table columns
  const permissionColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.slug}
          </Text>
        </Space>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        let color = 'default';
        let icon = null;

        switch (category) {
          case PermissionCategory.SYSTEM:
            color = 'red';
            icon = <LockOutlined />;
            break;
          case PermissionCategory.WORKSPACE:
            color = 'blue';
            icon = <TeamOutlined />;
            break;
          case PermissionCategory.MODULE:
            color = 'green';
            icon = <AppstoreOutlined />;
            break;
        }

        return (
          <Tag color={color} icon={icon}>
            {category.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPermission(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeletePermission(record.id)}
          />
        </Space>
      )
    }
  ];

  // Role permissions table columns
  const rolePermissionColumns = [
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
      render: (permission: any) => (
        <Space direction="vertical" size={0}>
          <Text strong>{permission.name}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {permission.slug}
          </Text>
        </Space>
      )
    },
    {
      title: 'Admin',
      key: 'admin',
      render: (_, record: any) => (
        <Select
          value={rolePermissions.ADMIN.includes(record.permission.slug) ? 'yes' : 'no'}
          onChange={(value) =>
            handleRolePermissionToggle('ADMIN', record.permission.slug, value === 'yes')
          }
          style={{ width: 100 }}
        >
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>
      )
    },
    {
      title: 'Manager',
      key: 'manager',
      render: (_, record: any) => (
        <Select
          value={rolePermissions.MANAGER.includes(record.permission.slug) ? 'yes' : 'no'}
          onChange={(value) =>
            handleRolePermissionToggle('MANAGER', record.permission.slug, value === 'yes')
          }
          style={{ width: 100 }}
        >
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>
      )
    },
    {
      title: 'User',
      key: 'user',
      render: (_, record: any) => (
        <Select
          value={rolePermissions.USER.includes(record.permission.slug) ? 'yes' : 'no'}
          onChange={(value) =>
            handleRolePermissionToggle('USER', record.permission.slug, value === 'yes')
          }
          style={{ width: 100 }}
        >
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>
      )
    },
    {
      title: 'Guest',
      key: 'guest',
      render: (_, record: any) => (
        <Select
          value={rolePermissions.GUEST.includes(record.permission.slug) ? 'yes' : 'no'}
          onChange={(value) =>
            handleRolePermissionToggle('GUEST', record.permission.slug, value === 'yes')
          }
          style={{ width: 100 }}
        >
          <Option value="yes">Yes</Option>
          <Option value="no">No</Option>
        </Select>
      )
    }
  ];

  // Transform permissions for role permissions table
  const rolePermissionsData = permissions.map((permission) => ({
    key: permission.id,
    permission
  }));

  return (
    <PermissionBasedAccess
      requiredPermissions={['permissions:manage']}
      fallback={
        <Card>
          <Result
            status="403"
            title="Permission Denied"
            subTitle="You don't have permission to access this page."
            extra={
              <Button type="primary" href="/dashboard">
                Back to Dashboard
              </Button>
            }
          />
        </Card>
      }
    >
      <div className="permissions-page">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <Title level={2}>Permissions Management</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingPermission(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Create Permission
            </Button>
          </div>

          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane
              tab={
                <span>
                  <LockOutlined />
                  Permissions
                </span>
              }
              key="1"
            >
              <div className="mb-4">
                <Input.Search
                  placeholder="Search permissions..."
                  allowClear
                  enterButton
                  onSearch={setSearchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <Table
                columns={permissionColumns}
                dataSource={filteredPermissions}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>

            <TabPane
              tab={
                <span>
                  <TeamOutlined />
                  Role Permissions
                </span>
              }
              key="2"
            >
              <div className="mb-4">
                <Text>
                  Manage which roles have access to which permissions. Changes here will affect all users with the
                  corresponding role.
                </Text>
              </div>

              <Table
                columns={rolePermissionColumns}
                dataSource={rolePermissionsData}
                rowKey="key"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>
          </Tabs>
        </Card>

        {/* Permission Form Modal */}
        <Modal
          title={editingPermission ? 'Edit Permission' : 'Create Permission'}
          open={isModalVisible}
          onOk={handleSavePermission}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
            setEditingPermission(null);
          }}
          okText={editingPermission ? 'Update' : 'Create'}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter a name' }]}
            >
              <Input placeholder="e.g., Manage Users" />
            </Form.Item>

            <Form.Item
              name="slug"
              label={
                <span>
                  Slug{' '}
                  <Tooltip title="A unique identifier for this permission. Use lowercase letters, numbers, and colons for namespacing.">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                { required: true, message: 'Please enter a slug' },
                {
                  pattern: /^[a-z0-9:]+$/,
                  message: 'Slug must contain only lowercase letters, numbers, and colons'
                }
              ]}
            >
              <Input placeholder="e.g., users:manage" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea placeholder="Describe what this permission allows" rows={3} />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder="Select a category">
                <Option value={PermissionCategory.SYSTEM}>System</Option>
                <Option value={PermissionCategory.WORKSPACE}>Workspace</Option>
                <Option value={PermissionCategory.MODULE}>Module</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PermissionBasedAccess>
  );
};

export default PermissionsPage;
