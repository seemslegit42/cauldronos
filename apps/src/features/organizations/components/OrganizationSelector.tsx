import React, { useState } from 'react';
import { Select, Button, Avatar, Typography, Space, Dropdown, Menu, Modal, Form, Input } from 'antd';
import { PlusOutlined, DownOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import { useOrganizations, useCurrentOrganization } from '../hooks/useOrganizations';
import { useNavigate } from 'react-router-dom';
import { Organization } from '../types';

const { Text, Title } = Typography;
const { Option } = Select;

export const OrganizationSelector: React.FC = () => {
  const { organizations, switchOrganization } = useOrganizations();
  const { organization } = useCurrentOrganization();
  const navigate = useNavigate();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOrganizationChange = async (organizationId: string) => {
    if (organizationId === 'create') {
      setIsCreateModalVisible(true);
      return;
    }
    
    await switchOrganization(organizationId);
  };

  const handleCreateOrganization = async (values: { name: string; slug?: string }) => {
    // In a real app, this would create an organization via Clerk
    // For now, just close the modal
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const menu = (
    <Menu>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate('/settings/organization')}>
        Organization Settings
      </Menu.Item>
      <Menu.Item key="members" icon={<TeamOutlined />} onClick={() => navigate('/settings/members')}>
        Manage Members
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Space>
        <Select
          style={{ width: 200 }}
          value={organization?.id}
          onChange={handleOrganizationChange}
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
                  Create Organization
                </Button>
              </div>
            </div>
          )}
        >
          {organizations.map((org) => (
            <Option key={org.id} value={org.id}>
              <Space>
                <Avatar size="small" src={org.logoUrl} style={{ backgroundColor: '#1890ff' }}>
                  {org.name.charAt(0)}
                </Avatar>
                <Text>{org.name}</Text>
              </Space>
            </Option>
          ))}
        </Select>
        
        {organization && (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" size="small" icon={<DownOutlined />} />
          </Dropdown>
        )}
      </Space>

      <Modal
        title="Create Organization"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateOrganization}
        >
          <Form.Item
            name="name"
            label="Organization Name"
            rules={[{ required: true, message: 'Please enter organization name' }]}
          >
            <Input placeholder="Enter organization name" />
          </Form.Item>
          
          <Form.Item
            name="slug"
            label="Organization Slug"
            help="Used in URLs. Leave blank to generate automatically."
          >
            <Input placeholder="Enter organization slug" />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
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
