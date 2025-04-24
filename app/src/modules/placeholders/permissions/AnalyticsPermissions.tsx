import React from 'react';
import { Card, Typography, Table, Tag, Switch, Button, Space, Divider, Alert, Tabs, Select } from 'antd';
import { SaveOutlined, LockOutlined, UserOutlined, TeamOutlined, CrownOutlined, BarChartOutlined, FileOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const AnalyticsPermissions: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  // Mock permissions data
  const featurePermissions = [
    {
      key: 'analytics:dashboard:view',
      name: 'View Dashboard',
      description: 'Access the analytics dashboard',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'analytics:reports:view',
      name: 'View Reports',
      description: 'View analytics reports',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'analytics:reports:create',
      name: 'Create Reports',
      description: 'Create new analytics reports',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'analytics:reports:share',
      name: 'Share Reports',
      description: 'Share reports with other users',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'analytics:data:export',
      name: 'Export Data',
      description: 'Export analytics data',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'analytics:users:view',
      name: 'View User Analytics',
      description: 'View user-specific analytics data',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'analytics:events:track',
      name: 'Track Custom Events',
      description: 'Track custom analytics events',
      user: true,
      manager: true,
      admin: true
    },
    {
      key: 'analytics:settings:manage',
      name: 'Manage Analytics Settings',
      description: 'Configure analytics settings',
      user: false,
      manager: false,
      admin: true
    },
    {
      key: 'analytics:alerts:manage',
      name: 'Manage Analytics Alerts',
      description: 'Create and manage analytics alerts',
      user: false,
      manager: true,
      admin: true
    },
    {
      key: 'analytics:scheduled:reports',
      name: 'Schedule Reports',
      description: 'Create scheduled reports',
      user: false,
      manager: true,
      admin: true
    }
  ];

  // Mock data access permissions
  const dataAccessPermissions = [
    {
      key: 'data_1',
      name: 'User Data',
      description: 'User registration and activity data',
      user_access: 'none',
      manager_access: 'aggregated',
      admin_access: 'full'
    },
    {
      key: 'data_2',
      name: 'Page Views',
      description: 'Page view and navigation data',
      user_access: 'aggregated',
      manager_access: 'full',
      admin_access: 'full'
    },
    {
      key: 'data_3',
      name: 'Module Usage',
      description: 'Module usage statistics',
      user_access: 'aggregated',
      manager_access: 'full',
      admin_access: 'full'
    },
    {
      key: 'data_4',
      name: 'Performance Metrics',
      description: 'System performance data',
      user_access: 'none',
      manager_access: 'aggregated',
      admin_access: 'full'
    },
    {
      key: 'data_5',
      name: 'Financial Data',
      description: 'Revenue and billing data',
      user_access: 'none',
      manager_access: 'aggregated',
      admin_access: 'full'
    }
  ];

  const handleTogglePermission = (permissionKey: string, role: string, checked: boolean) => {
    console.log(`Toggle permission ${permissionKey} for role ${role} to ${checked}`);
    // In a real app, this would update the permission in the database
  };

  const handleChangeDataAccess = (dataKey: string, role: string, access: string) => {
    console.log(`Change data access for ${dataKey} for role ${role} to ${access}`);
    // In a real app, this would update the permission in the database
  };

  const handleSavePermissions = () => {
    console.log('Save permissions');
    // In a real app, this would save all permissions at once
  };

  const featureColumns = [
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

  const dataAccessColumns = [
    {
      title: 'Data Type',
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
      dataIndex: 'user_access',
      key: 'user_access',
      render: (access: string, record: any) => (
        <Select 
          value={access} 
          style={{ width: 120 }}
          onChange={(value) => handleChangeDataAccess(record.key, 'USER', value)}
        >
          <Option value="none">No Access</Option>
          <Option value="aggregated">Aggregated</Option>
          <Option value="full">Full Access</Option>
        </Select>
      ),
    },
    {
      title: <><TeamOutlined /> Manager</>,
      dataIndex: 'manager_access',
      key: 'manager_access',
      render: (access: string, record: any) => (
        <Select 
          value={access} 
          style={{ width: 120 }}
          onChange={(value) => handleChangeDataAccess(record.key, 'MANAGER', value)}
        >
          <Option value="none">No Access</Option>
          <Option value="aggregated">Aggregated</Option>
          <Option value="full">Full Access</Option>
        </Select>
      ),
    },
    {
      title: <><CrownOutlined /> Admin</>,
      dataIndex: 'admin_access',
      key: 'admin_access',
      render: (access: string) => (
        <Select value={access} style={{ width: 120 }} disabled>
          <Option value="full">Full Access</Option>
        </Select>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <Title level={3}>Analytics Module Permissions</Title>
            <Paragraph>
              Configure which roles have access to different Analytics module features and data.
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
          description={
            <div>
              <p>There are two types of permissions for the Analytics module:</p>
              <ul>
                <li><strong>Feature Permissions:</strong> Control access to specific features and actions</li>
                <li><strong>Data Access Permissions:</strong> Control the level of access to different types of data</li>
              </ul>
              <p>Data access levels:</p>
              <ul>
                <li><strong>No Access:</strong> Cannot view this data</li>
                <li><strong>Aggregated:</strong> Can view summarized data only</li>
                <li><strong>Full Access:</strong> Can view all data including individual records</li>
              </ul>
            </div>
          }
          type="info"
          showIcon
          icon={<LockOutlined />}
          className="mb-6"
        />

        <Tabs defaultActiveKey="feature">
          <TabPane 
            tab={<span><BarChartOutlined />Feature Permissions</span>} 
            key="feature"
          >
            <Table 
              columns={featureColumns} 
              dataSource={featurePermissions} 
              pagination={false}
              rowKey="key"
            />
          </TabPane>
          
          <TabPane 
            tab={<span><FileOutlined />Data Access Permissions</span>} 
            key="data"
          >
            <Table 
              columns={dataAccessColumns} 
              dataSource={dataAccessPermissions} 
              pagination={false}
              rowKey="key"
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

export default AnalyticsPermissions;
