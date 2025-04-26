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
  Alert,
  Divider,
  Result
} from 'antd';
import {
  LockOutlined,
  TeamOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAuth } from 'wasp/client/auth';
import { useWorkspaces } from '../../workspace/operations';
import { useModules } from '../../modules/ModuleRegistry';
import { PermissionCategory, UserRole } from '../../auth/permissions/types';
import { PermissionBasedAccess } from '../../auth/permissions';
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Mock data for module permissions
const mockModulePermissions = {
  'module:access': {
    ADMIN: true,
    MANAGER: true,
    USER: true,
    GUEST: true
  },
  'module:configure': {
    ADMIN: true,
    MANAGER: true,
    USER: false,
    GUEST: false
  },
  'module:data:create': {
    ADMIN: true,
    MANAGER: true,
    USER: true,
    GUEST: false
  },
  'module:data:read': {
    ADMIN: true,
    MANAGER: true,
    USER: true,
    GUEST: true
  },
  'module:data:update': {
    ADMIN: true,
    MANAGER: true,
    USER: true,
    GUEST: false
  },
  'module:data:delete': {
    ADMIN: true,
    MANAGER: true,
    USER: false,
    GUEST: false
  }
};

const ModulePermissionsPage: React.FC = () => {
  const { data: user } = useAuth();
  const { currentWorkspace } = useWorkspaces();
  const { modules, getModuleBySlug } = useModules();
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  
  const [modulePermissions, setModulePermissions] = useState(mockModulePermissions);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('1');
  
  // Get the current module
  const currentModule = moduleSlug ? getModuleBySlug(moduleSlug) : null;

  // Fetch module permissions
  useEffect(() => {
    if (currentWorkspace && currentModule) {
      // In a real app, this would be an API call
      // const fetchModulePermissions = async () => {
      //   const response = await fetch(`/api/workspaces/${currentWorkspace.id}/modules/${currentModule.id}/permissions`);
      //   const data = await response.json();
      //   setModulePermissions(data);
      // };
      // fetchModulePermissions();
    }
  }, [currentWorkspace, currentModule]);

  // Handle module permission toggle
  const handleModulePermissionToggle = async (permissionSlug: string, role: UserRole, checked: boolean) => {
    try {
      if (!currentWorkspace || !currentModule) {
        message.error('No workspace or module selected');
        return;
      }

      // In a real app, this would be an API call
      // await fetch(`/api/workspaces/${currentWorkspace.id}/modules/${currentModule.id}/permissions`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ permissionSlug, role, enabled: checked })
      // });
      
      // Update local state
      setModulePermissions({
        ...modulePermissions,
        [permissionSlug]: {
          ...modulePermissions[permissionSlug as keyof typeof modulePermissions],
          [role]: checked
        }
      });
      
      message.success(`Permission ${checked ? 'granted to' : 'revoked from'} ${role} role for this module`);
    } catch (error) {
      console.error('Error updating module permission:', error);
    }
  };

  // Module permissions table columns
  const modulePermissionColumns = [
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
      render: (permission: string) => {
        let name = '';
        let description = '';
        
        switch (permission) {
          case 'module:access':
            name = 'Access Module';
            description = 'Access this module';
            break;
          case 'module:configure':
            name = 'Configure Module';
            description = 'Configure module settings';
            break;
          case 'module:data:create':
            name = 'Create Data';
            description = 'Create data within this module';
            break;
          case 'module:data:read':
            name = 'Read Data';
            description = 'Read data within this module';
            break;
          case 'module:data:update':
            name = 'Update Data';
            description = 'Update data within this module';
            break;
          case 'module:data:delete':
            name = 'Delete Data';
            description = 'Delete data within this module';
            break;
        }
        
        return (
          <Space direction="vertical" size={0}>
            <Text strong>{name}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {permission}
            </Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {description}
            </Text>
          </Space>
        );
      }
    },
    {
      title: 'Admin',
      key: 'admin',
      render: (_, record: any) => {
        const permissionConfig = modulePermissions[record.permission as keyof typeof modulePermissions];
        return (
          <Select
            value={permissionConfig && permissionConfig.ADMIN ? 'yes' : 'no'}
            onChange={(value) =>
              handleModulePermissionToggle(record.permission, UserRole.ADMIN, value === 'yes')
            }
            style={{ width: 100 }}
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
        const permissionConfig = modulePermissions[record.permission as keyof typeof modulePermissions];
        return (
          <Select
            value={permissionConfig && permissionConfig.MANAGER ? 'yes' : 'no'}
            onChange={(value) =>
              handleModulePermissionToggle(record.permission, UserRole.MANAGER, value === 'yes')
            }
            style={{ width: 100 }}
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
        const permissionConfig = modulePermissions[record.permission as keyof typeof modulePermissions];
        return (
          <Select
            value={permissionConfig && permissionConfig.USER ? 'yes' : 'no'}
            onChange={(value) =>
              handleModulePermissionToggle(record.permission, UserRole.USER, value === 'yes')
            }
            style={{ width: 100 }}
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
        const permissionConfig = modulePermissions[record.permission as keyof typeof modulePermissions];
        return (
          <Select
            value={permissionConfig && permissionConfig.GUEST ? 'yes' : 'no'}
            onChange={(value) =>
              handleModulePermissionToggle(record.permission, UserRole.GUEST, value === 'yes')
            }
            style={{ width: 100 }}
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        );
      }
    }
  ];

  // Transform module permissions for table
  const modulePermissionsData = Object.keys(modulePermissions)
    .filter(permission => 
      permission.toLowerCase().includes(searchText.toLowerCase())
    )
    .map(permission => ({
      key: permission,
      permission
    }));

  if (!currentModule) {
    return (
      <Card>
        <Result
          status="404"
          title="Module Not Found"
          subTitle="The module you are looking for does not exist or you don't have access to it."
          extra={
            <Button type="primary" href="/modules">
              View All Modules
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <PermissionBasedAccess
      requiredPermissions={['module:configure']}
      workspaceId={currentWorkspace?.id}
      fallback={
        <Card>
          <Result
            status="403"
            title="Permission Denied"
            subTitle="You don't have permission to manage module permissions."
            extra={
              <Button type="primary" href="/dashboard">
                Back to Dashboard
              </Button>
            }
          />
        </Card>
      }
    >
      <div className="module-permissions-page">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <Title level={2}>Module Permissions</Title>
            <Space>
              <Text>
                Module: <strong>{currentModule?.name || 'No module selected'}</strong>
              </Text>
              <Divider type="vertical" />
              <Text>
                Workspace: <strong>{currentWorkspace?.name || 'No workspace selected'}</strong>
              </Text>
            </Space>
          </div>

          <Alert
            message="Module Permissions"
            description={
              <div>
                <p>
                  Customize which roles have access to which permissions for this module in the current workspace.
                  These settings override the default workspace-wide permissions.
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
            columns={modulePermissionColumns}
            dataSource={modulePermissionsData}
            rowKey="key"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </PermissionBasedAccess>
  );
};

export default ModulePermissionsPage;
