import React from 'react';
import { Card, Typography, Table, Switch, Button, Select, Form, Divider, message } from 'antd';
import { ModuleComponentProps } from '../../types';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const CrmPermissions: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [form] = Form.useForm();

  // Mock permissions data
  const permissions = [
    {
      id: 'crm:read',
      name: 'Read CRM Data',
      description: 'View customers, contacts, and deals',
      roles: {
        ADMIN: true,
        MANAGER: true,
        USER: true
      }
    },
    {
      id: 'crm:write',
      name: 'Write CRM Data',
      description: 'Create and update customers, contacts, and deals',
      roles: {
        ADMIN: true,
        MANAGER: true,
        USER: false
      }
    },
    {
      id: 'crm:delete',
      name: 'Delete CRM Data',
      description: 'Delete customers, contacts, and deals',
      roles: {
        ADMIN: true,
        MANAGER: false,
        USER: false
      }
    },
    {
      id: 'crm:export',
      name: 'Export CRM Data',
      description: 'Export customers, contacts, and deals to CSV/Excel',
      roles: {
        ADMIN: true,
        MANAGER: true,
        USER: false
      }
    },
    {
      id: 'crm:import',
      name: 'Import CRM Data',
      description: 'Import customers, contacts, and deals from CSV/Excel',
      roles: {
        ADMIN: true,
        MANAGER: false,
        USER: false
      }
    },
    {
      id: 'crm:settings',
      name: 'Manage CRM Settings',
      description: 'Change CRM module settings',
      roles: {
        ADMIN: true,
        MANAGER: false,
        USER: false
      }
    }
  ];

  // Handle permission change
  const handlePermissionChange = (permissionId: string, role: string, checked: boolean) => {
    console.log(`Permission ${permissionId} for role ${role} set to ${checked}`);
    // In a real app, this would update the permission in the database
    message.success(`Permission updated successfully`);
  };

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log('Role permissions form values:', values);
    message.success('Role permissions updated successfully!');
  };

  // Columns for the permissions table
  const columns = [
    {
      title: 'Permission',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          <div><Text type="secondary">{record.description}</Text></div>
        </div>
      )
    },
    {
      title: 'Admin',
      dataIndex: ['roles', 'ADMIN'],
      key: 'admin',
      render: (checked: boolean, record: any) => (
        <Switch
          checked={checked}
          onChange={(checked) => handlePermissionChange(record.id, 'ADMIN', checked)}
          disabled={record.id === 'crm:read' && checked} // Can't disable read for admin
        />
      )
    },
    {
      title: 'Manager',
      dataIndex: ['roles', 'MANAGER'],
      key: 'manager',
      render: (checked: boolean, record: any) => (
        <Switch
          checked={checked}
          onChange={(checked) => handlePermissionChange(record.id, 'MANAGER', checked)}
        />
      )
    },
    {
      title: 'User',
      dataIndex: ['roles', 'USER'],
      key: 'user',
      render: (checked: boolean, record: any) => (
        <Switch
          checked={checked}
          onChange={(checked) => handlePermissionChange(record.id, 'USER', checked)}
        />
      )
    }
  ];

  return (
    <div>
      <Card className="mb-6">
        <Title level={3}>CRM Module Permissions</Title>
        <Paragraph>
          Manage permissions for the CRM module in the {workspace.name} workspace.
          Control which roles can access different features of the CRM module.
        </Paragraph>
      </Card>

      <Card title="Permission Matrix" className="mb-6">
        <Table
          columns={columns}
          dataSource={permissions}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card title="Role-Based Access">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            defaultRole: 'USER',
            customRoles: []
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="defaultRole"
            label="Default Role for New Users"
            tooltip="The role that will be assigned to new users by default"
          >
            <Select>
              <Option value="ADMIN">Admin</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="USER">User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="customRoles"
            label="Custom Roles"
            tooltip="Create custom roles with specific permissions"
          >
            <Select mode="tags" style={{ width: '100%' }} placeholder="Add custom roles">
              <Option value="SALES">Sales</Option>
              <Option value="SUPPORT">Support</Option>
              <Option value="READONLY">Read Only</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Permissions
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CrmPermissions;import React from 'react';
import { Card, Typography, Table, Switch, Button, Select, Form, Divider, message } from 'antd';
import { ModuleComponentProps } from '../../types';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const CrmPermissions: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [form] = Form.useForm();

  // Mock permissions data
  const permissions = [
    {
      id: 'crm:read',
      name: 'Read CRM Data',
      description: 'View customers, contacts, and deals',
      roles: {
        ADMIN: true,
        MANAGER: true,
        USER: true
      }
    },
    {
      id: 'crm:write',
      name: 'Write CRM Data',
      description: 'Create and update customers, contacts, and deals',
      roles: {
        ADMIN: true,
        MANAGER: true,
        USER: false
      }
    },
    {
      id: 'crm:delete',
      name: 'Delete CRM Data',
      description: 'Delete customers, contacts, and deals',
      roles: {
        ADMIN: true,
        MANAGER: false,
        USER: false
      }
    },
    {
      id: 'crm:export',
      name: 'Export CRM Data',
      description: 'Export customers, contacts, and deals to CSV/Excel',
      roles: {
        ADMIN: true,
        MANAGER: true,
        USER: false
      }
    },
    {
      id: 'crm:import',
      name: 'Import CRM Data',
      description: 'Import customers, contacts, and deals from CSV/Excel',
      roles: {
        ADMIN: true,
        MANAGER: false,
        USER: false
      }
    },
    {
      id: 'crm:settings',
      name: 'Manage CRM Settings',
      description: 'Change CRM module settings',
      roles: {
        ADMIN: true,
        MANAGER: false,
        USER: false
      }
    }
  ];

  // Handle permission change
  const handlePermissionChange = (permissionId: string, role: string, checked: boolean) => {
    console.log(`Permission ${permissionId} for role ${role} set to ${checked}`);
    // In a real app, this would update the permission in the database
    message.success(`Permission updated successfully`);
  };

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log('Role permissions form values:', values);
    message.success('Role permissions updated successfully!');
  };

  // Columns for the permissions table
  const columns = [
    {
      title: 'Permission',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          <div><Text type="secondary">{record.description}</Text></div>
        </div>
      )
    },
    {
      title: 'Admin',
      dataIndex: ['roles', 'ADMIN'],
      key: 'admin',
      render: (checked: boolean, record: any) => (
        <Switch
          checked={checked}
          onChange={(checked) => handlePermissionChange(record.id, 'ADMIN', checked)}
          disabled={record.id === 'crm:read' && checked} // Can't disable read for admin
        />
      )
    },
    {
      title: 'Manager',
      dataIndex: ['roles', 'MANAGER'],
      key: 'manager',
      render: (checked: boolean, record: any) => (
        <Switch
          checked={checked}
          onChange={(checked) => handlePermissionChange(record.id, 'MANAGER', checked)}
        />
      )
    },
    {
      title: 'User',
      dataIndex: ['roles', 'USER'],
      key: 'user',
      render: (checked: boolean, record: any) => (
        <Switch
          checked={checked}
          onChange={(checked) => handlePermissionChange(record.id, 'USER', checked)}
        />
      )
    }
  ];

  return (
    <div>
      <Card className="mb-6">
        <Title level={3}>CRM Module Permissions</Title>
        <Paragraph>
          Manage permissions for the CRM module in the {workspace.name} workspace.
          Control which roles can access different features of the CRM module.
        </Paragraph>
      </Card>

      <Card title="Permission Matrix" className="mb-6">
        <Table
          columns={columns}
          dataSource={permissions}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card title="Role-Based Access">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            defaultRole: 'USER',
            customRoles: []
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="defaultRole"
            label="Default Role for New Users"
            tooltip="The role that will be assigned to new users by default"
          >
            <Select>
              <Option value="ADMIN">Admin</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="USER">User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="customRoles"
            label="Custom Roles"
            tooltip="Create custom roles with specific permissions"
          >
            <Select mode="tags" style={{ width: '100%' }} placeholder="Add custom roles">
              <Option value="SALES">Sales</Option>
              <Option value="SUPPORT">Support</Option>
              <Option value="READONLY">Read Only</Option>
            </Select>
          </Form.Item>

          <Divider />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Permissions
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CrmPermissions;