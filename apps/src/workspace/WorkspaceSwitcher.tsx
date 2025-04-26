import React, { useState } from 'react';
import { Dropdown, Button, Menu, Modal, Form, Input, Typography, Avatar, Badge, Divider, Select, Switch, Tooltip } from 'antd';
import { 
  DownOutlined, 
  PlusOutlined, 
  TeamOutlined, 
  CheckOutlined, 
  GlobalOutlined, 
  LockOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useWorkspaces } from './operations';
import { Link } from 'react-router-dom';
import { CreateWorkspaceData } from './types';

const { Title, Text } = Typography;
const { Option } = Select;

const WorkspaceSwitcher: React.FC = () => {
  const { currentWorkspace, workspaces, switchWorkspace, createWorkspace, isLoading } = useWorkspaces();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleMenuClick = (workspaceId: string) => {
    switchWorkspace(workspaceId);
  };

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await createWorkspace(values as CreateWorkspaceData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Get workspace initials for avatar
  const getWorkspaceInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get color based on workspace name
  const getWorkspaceColor = (name: string) => {
    const colors = [
      '#1677ff', // blue
      '#52c41a', // green
      '#722ed1', // purple
      '#eb2f96', // pink
      '#fa8c16', // orange
      '#13c2c2', // cyan
      '#f5222d', // red
    ];
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);
    
    return colors[hash % colors.length];
  };

  const menuItems = [
    {
      key: 'header',
      label: (
        <div className="px-4 py-2 font-medium border-b flex justify-between items-center">
          <span>Switch Workspace</span>
          <Link to="/workspace/manage">
            <Button type="text" size="small" icon={<SettingOutlined />} />
          </Link>
        </div>
      ),
      disabled: true,
    },
    ...workspaces.map(workspace => ({
      key: workspace.id,
      label: (
        <div 
          onClick={() => handleMenuClick(workspace.id)}
          className={`py-2 px-4 flex items-center ${currentWorkspace?.id === workspace.id ? 'bg-blue-50 dark:bg-blue-900' : ''}`}
        >
          <Avatar 
            style={{ 
              backgroundColor: getWorkspaceColor(workspace.name),
              marginRight: '12px'
            }}
            src={workspace.logoUrl || undefined}
          >
            {!workspace.logoUrl && getWorkspaceInitials(workspace.name)}
          </Avatar>
          <div className="flex-1">
            <div className="font-medium flex items-center">
              {workspace.name}
              {workspace.isPublic && (
                <Tooltip title="Public Workspace">
                  <GlobalOutlined className="ml-2 text-blue-500" />
                </Tooltip>
              )}
              {currentWorkspace?.id === workspace.id && (
                <CheckOutlined className="ml-2 text-blue-500" />
              )}
            </div>
            <Text type="secondary" className="text-xs">
              {workspace.memberCount} members • {workspace.plan?.toUpperCase() || 'FREE'}
            </Text>
          </div>
        </div>
      )
    })),
    {
      type: 'divider' as const,
    },
    {
      key: 'manage',
      label: (
        <Link to="/workspace/manage" className="py-2 px-4 text-gray-600 dark:text-gray-400 flex items-center">
          <Avatar 
            style={{ 
              backgroundColor: '#f0f0f0',
              color: '#595959',
              marginRight: '12px'
            }}
            icon={<SettingOutlined />}
          />
          <span>Manage Workspaces</span>
        </Link>
      )
    },
    {
      key: 'create',
      label: (
        <div onClick={showModal} className="py-2 px-4 text-blue-600 dark:text-blue-400 flex items-center">
          <Avatar 
            style={{ 
              backgroundColor: '#e6f4ff',
              color: '#1677ff',
              marginRight: '12px'
            }}
            icon={<PlusOutlined />}
          />
          <span>Create New Workspace</span>
        </div>
      )
    }
  ];

  return (
    <>
      <Dropdown 
        menu={{ items: menuItems }} 
        trigger={['click']}
        dropdownRender={(menu) => (
          <div className="bg-white rounded-md shadow-lg overflow-hidden" style={{ width: '300px' }}>
            {React.cloneElement(menu as React.ReactElement)}
          </div>
        )}
      >
        <Button className="flex items-center">
          {currentWorkspace && (
            <Avatar 
              style={{ 
                backgroundColor: getWorkspaceColor(currentWorkspace.name),
                marginRight: '8px'
              }}
              size="small"
              src={currentWorkspace.logoUrl || undefined}
            >
              {!currentWorkspace.logoUrl && getWorkspaceInitials(currentWorkspace.name)}
            </Avatar>
          )}
          <span className="mr-2 max-w-[150px] truncate">
            {currentWorkspace?.name || 'Select Workspace'}
          </span>
          <DownOutlined />
        </Button>
      </Dropdown>

      <Modal
        title="Create New Workspace"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleCreate}
        okText="Create"
        confirmLoading={isLoading}
      >
        <Form
          form={form}
          layout="vertical"
          name="create_workspace_form"
        >
          <Form.Item
            name="name"
            label="Workspace Name"
            rules={[{ required: true, message: 'Please enter a workspace name' }]}
          >
            <Input placeholder="My Workspace" />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Workspace Slug"
            rules={[
              { required: true, message: 'Please enter a workspace slug' },
              { pattern: /^[a-z0-9-]+$/, message: 'Slug can only contain lowercase letters, numbers, and hyphens' }
            ]}
            extra="This will be used in URLs and cannot be changed later."
          >
            <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Describe your workspace" rows={3} />
          </Form.Item>
          <Form.Item
            name="defaultRole"
            label="Default Role for New Members"
            initialValue="USER"
          >
            <Select>
              <Option value="USER">User</Option>
              <Option value="MANAGER">Manager</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="isPublic"
            label="Workspace Visibility"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch 
              checkedChildren={<GlobalOutlined />} 
              unCheckedChildren={<LockOutlined />} 
            />
            <Text className="ml-2 text-sm text-gray-500">
              Make workspace discoverable by other users
            </Text>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default WorkspaceSwitcher;
