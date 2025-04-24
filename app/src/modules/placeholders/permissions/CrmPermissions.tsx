import React from 'react';
import { Card, Typography, Table, Tag, Switch, Button, Space, Divider, Alert } from 'antd';
import { SaveOutlined, LockOutlined, UserOutlined, TeamOutlined, CrownOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../../types';

const { Title, Text, Paragraph } = Typography;

const CrmPermissions: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  // Mock permissions data
  const permissions = [
    {
      key: 'crm:read',
      name: 'Read CRM Data',
      description: 'View customers and contacts',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'crm:create',
      name: 'Create CRM Data',
      description: 'Create new customers and contacts',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'crm:update',
      name: 'Update CRM Data',
      description: 'Update existing customers and contacts',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'crm:delete',
      name: 'Delete CRM Data',
      description: 'Delete customers and contacts',
      user: false,
      manager: false,
      admin: true
    },
    {
      key: 'crm:export',
      name: 'Export CRM Data',
      description: 'Export customers and contacts data',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'crm:import',
      name: 'Import CRM Data',
      description: 'Import customers and contacts data',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'crm:deals:read',
      name: 'Read Deals',
      description: 'View deals and opportunities',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'crm:deals:create',
      name: 'Create Deals',
      description: 'Create new deals and opportunities',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'crm:deals:update',
      name: 'Update Deals',
      description: 'Update existing deals and opportunities',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'crm:deals:delete',
      name: 'Delete Deals',
      description: 'Delete deals and opportunities',
      user: false,
      manager: false,
      admin: true
    }
  ];

  const handleTogglePermission = (permissionKey: string, role: string, checked: boolean) => {
    console.log(`Toggle permission ${permissionKey} for role ${role} to ${checked}`);
    // In a real app, this would update the permission in the database
    // await fetch(`/api/workspaces/${workspace.id}/modules/${module.id}/permissions`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ permissionKey, role, enabled: checked })
    // });
  };

  const handleSavePermissions = () => {
    console.log('Save permissions');
    // In a real app, this would save all permissions at once
    // await fetch(`/api/workspaces/${workspace.id}/modules/${module.id}/permissions/save`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ permissions })
    // });
  };

  const columns = [
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

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <Title level={3}>CRM Module Permissions</Title>
            <Paragraph>
              Configure which roles have access to different CRM module features.
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
          description="Admins always have all permissions. Managers typically have most permissions except for destructive actions. Users have limited permissions focused on day-to-day operations."
          type="info"
          showIcon
          icon={<LockOutlined />}
          className="mb-6"
        />

        <Table 
          columns={columns} 
          dataSource={permissions} 
          pagination={false}
          rowKey="key"
        />

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

export default CrmPermissions;
