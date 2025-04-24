import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Input,
  Select,
  message,
  Tabs,
  Tooltip,
  Alert
} from 'antd';
import {
  LockOutlined,
  TeamOutlined,
  AppstoreOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../../workspace/operations';
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
    category: PermissionCategory.SYSTEM
  },
  {
    id: '2',
    name: 'Manage Users',
    slug: 'users:manage',
    description: 'Create, update, and delete users',
    category: PermissionCategory.SYSTEM
  },
  {
    id: '3',
    name: 'Create Workspace',
    slug: 'workspace:create',
    description: 'Create a new workspace',
    category: PermissionCategory.WORKSPACE
  },
  {
    id: '4',
    name: 'Access Module',
    slug: 'module:access',
    description: 'Access a module',
    category: PermissionCategory.MODULE
  }
];

// Mock data for workspace permissions
const mockWorkspacePermissions = {
  'workspace:create': {
    ADMIN: true,
    MANAGER: true,
    USER: false,
    GUEST: false
  },
  'workspace:update': {
    ADMIN: true,
    MANAGER: true,
    USER: false,
    GUEST: false
  },
  'module:access': {
    ADMIN: true,
    MANAGER: true,
    USER: true,
    GUEST: true
  }
};

const WorkspacePermissionsPage: React.FC = () => {
  const { data: user } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  const [permissions, setPermissions] = useState(mockPermissions);
  const [workspacePermissions, setWorkspacePermissions] = useState(mockWorkspacePermissions);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('1');

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

  // Fetch workspace permissions
  useEffect(() => {
    if (currentWorkspace) {
      // In a real app, this would be an API call
      // const fetchWorkspacePermissions = async () => {
      //   const response = await fetch(`/api/workspaces/${currentWorkspace.id}/permissions`);
      //   const data = await response.json();
      //   setWorkspacePermissions(data);
      // };
      // fetchWorkspacePermissions();
    }
  }, [currentWorkspace]);

  // Filter permissions based on search text
  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchText.toLowerCase()) ||
      permission.slug.toLowerCase().includes(searchText.toLowerCase()) ||
      permission.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle workspace permission toggle
  const handleWorkspacePermissionToggle = async (permissionSlug: string, role: UserRole, checked: boolean) => {
    try {
      if (!currentWorkspace) {
        message.error('No workspace selected');
        return;
      }

      // In a real app, this would be an API call
      // await fetch(`/api/workspaces/${currentWorkspace.id}/permissions`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ permissionSlug, role, enabled: checked })
      // });
      
      // Update local state
      setWorkspacePermissions({
        ...workspacePermissions,
        [permissionSlug]: {
          ...workspacePermissions[permissionSlug as keyof typeof workspacePermissions],
          [role]: checked
        }
      });
      
      message.success(`Permission ${checked ? 'granted to' : 'revoked from'} ${role} role in this workspace`);
    } catch (error) {
      console.error('Error updating workspace permission:', error);
    }
  };

  // Workspace permissions table columns
  const workspacePermissionColumns = [
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
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {permission.description}
          </Text>
        </Space>
      )
    },
    {
      title: 'Category',
      dataIndex: 'permission',
      key: 'category',
      render: (permission: any) => {
        let color = 'default';
        let icon = null;
        
        switch (permission.category) {
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
            {permission.category.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Admin',
      key: 'admin',
      render: (_, record: any) => {
        const permissionConfig = workspacePermissions[record.permission.slug as keyof typeof workspacePermissions];
        return (
          <Select
            value={permissionConfig && permissionConfig.ADMIN ? 'yes' : 'no'}
            onChange={(value) =>
              handleWorkspacePermissionToggle(record.permission.slug, UserRole.ADMIN, value === 'yes')
            }
            style={{ width: 100 }}
            disabled={record.permission.category === PermissionCategory.SYSTEM}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        );
      }
    },
    {
      title: 'Manager',
      key: 'manager',
      render: (_, record: any) => {
        const permissionConfig = workspacePermissions[record.permission.slug as keyof typeof workspacePermissions];
        return (
          <Select
            value={permissionConfig && permissionConfig.MANAGER ? 'yes' : 'no'}
            onChange={(value) =>
              handleWorkspacePermissionToggle(record.permission.slug, UserRole.MANAGER, value === 'yes')
            }
            style={{ width: 100 }}
            disabled={record.permission.category === PermissionCategory.SYSTEM}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        );
      }
    },
    {
      title: 'User',
      key: 'user',
      render: (_, record: any) => {
        const permissionConfig = workspacePermissions[record.permission.slug as keyof typeof workspacePermissions];
        return (
          <Select
            value={permissionConfig && permissionConfig.USER ? 'yes' : 'no'}
            onChange={(value) =>
              handleWorkspacePermissionToggle(record.permission.slug, UserRole.USER, value === 'yes')
            }
            style={{ width: 100 }}
            disabled={record.permission.category === PermissionCategory.SYSTEM}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        );
      }
    },
    {
      title: 'Guest',
      key: 'guest',
      render: (_, record: any) => {
        const permissionConfig = workspacePermissions[record.permission.slug as keyof typeof workspacePermissions];
        return (
          <Select
            value={permissionConfig && permissionConfig.GUEST ? 'yes' : 'no'}
            onChange={(value) =>
              handleWorkspacePermissionToggle(record.permission.slug, UserRole.GUEST, value === 'yes')
            }
            style={{ width: 100 }}
            disabled={record.permission.category === PermissionCategory.SYSTEM}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        );
      }
    }
  ];

  // Transform permissions for workspace permissions table
  const workspacePermissionsData = filteredPermissions
    .filter(permission => permission.category !== PermissionCategory.SYSTEM)
    .map((permission) => ({
      key: permission.id,
      permission
    }));

  return (
    <PermissionBasedAccess
      requiredPermissions={['workspace:update']}
      workspaceId={currentWorkspace?.id}
      fallback={
        <Card>
          <Result
            status="403"
            title="Permission Denied"
            subTitle="You don't have permission to manage workspace permissions."
            extra={
              <Button type="primary" href="/dashboard">
                Back to Dashboard
              </Button>
            }
          />
        </Card>
      }
    >
      <div className="workspace-permissions-page">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <Title level={2}>Workspace Permissions</Title>
            <Space>
              <Text>
                Workspace: <strong>{currentWorkspace?.name || 'No workspace selected'}</strong>
              </Text>
            </Space>
          </div>

          <Alert
            message="Workspace Permissions"
            description={
              <div>
                <p>
                  Customize which roles have access to which permissions in this workspace. These settings override the
                  default system-wide role permissions.
                </p>
                <p>
                  <strong>Note:</strong> System permissions cannot be modified at the workspace level.
                </p>
              </div>
            }
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            className="mb-4"
          />

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
            columns={workspacePermissionColumns}
            dataSource={workspacePermissionsData}
            rowKey="key"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </PermissionBasedAccess>
  );
};

export default WorkspacePermissionsPage;
