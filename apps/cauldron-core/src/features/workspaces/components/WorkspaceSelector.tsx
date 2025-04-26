import React, { useState } from 'react';
import { Select, Button, Avatar, Typography, Space, Dropdown, Menu, Modal, Form, Input } from 'antd';
import { PlusOutlined, DownOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import { useWorkspaces } from '../hooks/useWorkspaces';
import { useNavigate } from 'react-router-dom';
import { useCurrentOrganization } from '../../organizations/hooks/useOrganizations';
import { CreateWorkspaceData } from '../types';

const { Text } = Typography;
const { Option } = Select;

export const WorkspaceSelector: React.FC = () => {
  const { organization } = useCurrentOrganization();
  const { workspaces, createWorkspace } = useWorkspaces(organization?.id);
  const navigate = useNavigate();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | undefined>(
    workspaces?.[0]?.id
  );

  const handleWorkspaceChange = (workspaceId: string) => {
    if (workspaceId === 'create') {
      setIsCreateModalVisible(true);
      return;
    }
    
    setSelectedWorkspaceId(workspaceId);
    navigate(`/workspaces/${workspaceId}`);
  };

  const handleCreateWorkspace = async (values: CreateWorkspaceData) => {
    if (!organization?.id) return;
    
    try {
      const newWorkspace = await createWorkspace.mutateAsync({
        ...values,
        organizationId: organization.id,
      });
      
      setIsCreateModalVisible(false);
      form.resetFields();
      
      // Navigate to the new workspace
      if (newWorkspace?.id) {
        setSelectedWorkspaceId(newWorkspace.id);
        navigate(`/workspaces/${newWorkspace.id}`);
      }
    } catch (error) {
      console.error('Failed to create workspace:', error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate(`/workspaces/${selectedWorkspaceId}/settings`)}>
        Workspace Settings
      </Menu.Item>
      <Menu.Item key="members" icon={<TeamOutlined />} onClick={() => navigate(`/workspaces/${selectedWorkspaceId}/members`)}>
        Manage Members
      </Menu.Item>
    </Menu>
  );

  if (!organization) {
    return null;
  }

  return (
    <>
      <Space>
        <Select
          style={{ width: 200 }}
          value={selectedWorkspaceId}
          onChange={handleWorkspaceChange}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <div style={{ padding: '8px', borderTop: '1px solid #e8e8e8' }}>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => setIsCreateModalVisible(true)}
                >
                  Create Workspace
                </Button>
              </div>
            </div>
          )}
        >
          {workspaces.map((workspace) => (
            <Option key={workspace.id} value={workspace.id}>
              <Space>
                <Avatar size="small" src={workspace.logoUrl} style={{ backgroundColor: '#52c41a' }}>
                  {workspace.name.charAt(0)}
                </Avatar>
                <Text>{workspace.name}</Text>
              </Space>
            </Option>
          ))}
        </Select>
        
        {selectedWorkspaceId && (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" size="small" icon={<DownOutlined />} />
          </Dropdown>
        )}
      </Space>

      <Modal
        title="Create Workspace"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateWorkspace}
        >
          <Form.Item
            name="name"
            label="Workspace Name"
            rules={[{ required: true, message: 'Please enter workspace name' }]}
          >
            <Input placeholder="Enter workspace name" />
          </Form.Item>
          
          <Form.Item
            name="slug"
            label="Workspace Slug"
            help="Used in URLs. Leave blank to generate automatically."
          >
            <Input placeholder="Enter workspace slug" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Enter workspace description" rows={3} />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={createWorkspace.isPending}>
                Create
              </Button>
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
