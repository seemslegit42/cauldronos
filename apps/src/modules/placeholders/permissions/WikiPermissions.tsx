import React from 'react';
import { Card, Typography, Table, Tag, Switch, Button, Space, Divider, Alert, Tabs } from 'antd';
import { SaveOutlined, LockOutlined, UserOutlined, TeamOutlined, CrownOutlined, FileTextOutlined, FolderOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const WikiPermissions: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  // Mock permissions data
  const rolePermissions = [
    {
      key: 'wiki:read',
      name: 'Read Wiki Pages',
      description: 'View wiki pages and content',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'wiki:create',
      name: 'Create Wiki Pages',
      description: 'Create new wiki pages',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'wiki:update',
      name: 'Update Wiki Pages',
      description: 'Edit existing wiki pages',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'wiki:delete',
      name: 'Delete Wiki Pages',
      description: 'Delete wiki pages',
      user: false,
      manager: false,
      admin: true
    },
    {
      key: 'wiki:comment',
      name: 'Comment on Pages',
      description: 'Add comments to wiki pages',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'wiki:categories:manage',
      name: 'Manage Categories',
      description: 'Create, edit, and delete categories',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'wiki:history:view',
      name: 'View Page History',
      description: 'View revision history of pages',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'wiki:history:restore',
      name: 'Restore Page Versions',
      description: 'Restore previous versions of pages',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'wiki:export',
      name: 'Export Wiki Content',
      description: 'Export wiki pages and content',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'wiki:templates:manage',
      name: 'Manage Templates',
      description: 'Create and manage page templates',
      user: false,
      manager: true,
      admin: true
    }
  ];

  // Mock category permissions
  const categoryPermissions = [
    {
      key: 'category_1',
      name: 'Getting Started',
      description: 'Onboarding and introduction guides',
      user_read: true,
      user_write: false,
      manager_read: true,
      manager_write: true,
      admin_read: true,
      admin_write: true
    },
    {
      key: 'category_2',
      name: 'User Guides',
      description: 'End-user documentation',
      user_read: true,
      user_write: false,
      manager_read: true,
      manager_write: true,
      admin_read: true,
      admin_write: true
    },
    {
      key: 'category_3',
      name: 'API Documentation',
      description: 'API reference and examples',
      user_read: true,
      user_write: false,
      manager_read: true,
      manager_write: true,
      admin_read: true,
      admin_write: true
    },
    {
      key: 'category_4',
      name: 'Internal Processes',
      description: 'Company internal processes',
      user_read: false,
      user_write: false,
      manager_read: true,
      manager_write: true,
      admin_read: true,
      admin_write: true
    },
    {
      key: 'category_5',
      name: 'Product Roadmap',
      description: 'Future plans and roadmap',
      user_read: false,
      user_write: false,
      manager_read: true,
      manager_write: false,
      admin_read: true,
      admin_write: true
    }
  ];

  const handleTogglePermission = (permissionKey: string, role: string, checked: boolean) => {
    console.log(`Toggle permission ${permissionKey} for role ${role} to ${checked}`);
    // In a real app, this would update the permission in the database
  };

  const handleToggleCategoryPermission = (categoryKey: string, role: string, permission: string, checked: boolean) => {
    console.log(`Toggle ${permission} permission for category ${categoryKey} for role ${role} to ${checked}`);
    // In a real app, this would update the permission in the database
  };

  const handleSavePermissions = () => {
    console.log('Save permissions');
    // In a real app, this would save all permissions at once
  };

  const roleColumns = [
    {
      title: 'Permission',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div>
          <div>{text}</div>
          <div className="text-xs text-gray-500">{record.description}</div>
        </div>
      ),
    },
    {
      title: <><UserOutlined /> User</>,
      dataIndex: 'user',
      key: 'user',
      render: (checked: boolean, record: any) => (
        <Switch 
          checked={checked} 
          onChange={(checked) => handleTogglePermission(record.key, 'USER', checked)}
        />
      ),
    },
    {
      title: <><TeamOutlined /> Manager</>,
      dataIndex: 'manager',
      key: 'manager',
      render: (checked: boolean, record: any) => (
        <Switch 
          checked={checked} 
          onChange={(checked) => handleTogglePermission(record.key, 'MANAGER', checked)}
        />
      ),
    },
    {
      title: <><CrownOutlined /> Admin</>,
      dataIndex: 'admin',
      key: 'admin',
      render: (checked: boolean) => (
        <Switch checked={checked} disabled />
      ),
    },
  ];

  const categoryColumns = [
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div>
          <div>{text}</div>
          <div className="text-xs text-gray-500">{record.description}</div>
        </div>
      ),
    },
    {
      title: <><UserOutlined /> User</>,
      children: [
        {
          title: 'Read',
          dataIndex: 'user_read',
          key: 'user_read',
          render: (checked: boolean, record: any) => (
            <Switch 
              checked={checked} 
              onChange={(checked) => handleToggleCategoryPermission(record.key, 'USER', 'read', checked)}
            />
          ),
        },
        {
          title: 'Write',
          dataIndex: 'user_write',
          key: 'user_write',
          render: (checked: boolean, record: any) => (
            <Switch 
              checked={checked} 
              onChange={(checked) => handleToggleCategoryPermission(record.key, 'USER', 'write', checked)}
            />
          ),
        }
      ]
    },
    {
      title: <><TeamOutlined /> Manager</>,
      children: [
        {
          title: 'Read',
          dataIndex: 'manager_read',
          key: 'manager_read',
          render: (checked: boolean, record: any) => (
            <Switch 
              checked={checked} 
              onChange={(checked) => handleToggleCategoryPermission(record.key, 'MANAGER', 'read', checked)}
            />
          ),
        },
        {
          title: 'Write',
          dataIndex: 'manager_write',
          key: 'manager_write',
          render: (checked: boolean, record: any) => (
            <Switch 
              checked={checked} 
              onChange={(checked) => handleToggleCategoryPermission(record.key, 'MANAGER', 'write', checked)}
            />
          ),
        }
      ]
    },
    {
      title: <><CrownOutlined /> Admin</>,
      children: [
        {
          title: 'Read',
          dataIndex: 'admin_read',
          key: 'admin_read',
          render: (checked: boolean) => (
            <Switch checked={checked} disabled />
          ),
        },
        {
          title: 'Write',
          dataIndex: 'admin_write',
          key: 'admin_write',
          render: (checked: boolean) => (
            <Switch checked={checked} disabled />
          ),
        }
      ]
    },
  ];

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <Title level={3}>Wiki Module Permissions</Title>
            <Paragraph>
              Configure which roles have access to different Wiki module features and categories.
            </Paragraph>
          </div>
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            onClick={handleSavePermissions}
          >
            Save Permissions
          </Button>
        </div>

        <Alert
          message="Permission Information"
          description="Permissions can be set at both the feature level and the category level. Category permissions override feature permissions."
          type="info"
          showIcon
          icon={<LockOutlined />}
          className="mb-6"
        />

        <Tabs defaultActiveKey="role">
          <TabPane 
            tab={<span><LockOutlined />Feature Permissions</span>} 
            key="role"
          >
            <Table 
              columns={roleColumns} 
              dataSource={rolePermissions} 
              pagination={false}
              rowKey="key"
            />
          </TabPane>
          
          <TabPane 
            tab={<span><FolderOutlined />Category Permissions</span>} 
            key="category"
          >
            <Table 
              columns={categoryColumns} 
              dataSource={categoryPermissions} 
              pagination={false}
              rowKey="key"
              bordered
            />
          </TabPane>
        </Tabs>

        <Divider />

        <div className="flex justify-end">
          <Space>
            <Button onClick={() => console.log('Reset to defaults')}>
              Reset to Defaults
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />}
              onClick={handleSavePermissions}
            >
              Save Permissions
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default WikiPermissions;
