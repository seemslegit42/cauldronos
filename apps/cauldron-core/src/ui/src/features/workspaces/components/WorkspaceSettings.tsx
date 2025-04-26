import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Switch, Select, InputNumber, Space, Typography, Upload, message } from 'antd';
import { UploadOutlined, SaveOutlined, TeamOutlined, LockOutlined, BellOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useWorkspace } from '../hooks/useWorkspaces';
import { useParams } from 'react-router-dom';
import { PermissionGuard } from '../../auth/components/PermissionGuard';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Option } = Select;

export const WorkspaceSettings: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { workspace, isLoading } = useWorkspace(workspaceId);
  const [generalForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('general');
  
  if (isLoading || !workspace) {
    return <Card loading />;
  }
  
  const handleGeneralSubmit = async (values: any) => {
    // In a real app, this would update workspace settings
    message.success('Workspace settings updated successfully');
  };
  
  const handleSecuritySubmit = async (values: any) => {
    // In a real app, this would update security settings
    message.success('Security settings updated successfully');
  };
  
  const handleNotificationsSubmit = async (values: any) => {
    // In a real app, this would update notification settings
    message.success('Notification settings updated successfully');
  };
  
  return (
    <PermissionGuard permissions={['manage:workspaces']}>
      <Card title="Workspace Settings">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <AppstoreOutlined />
                General
              </span>
            }
            key="general"
          >
            <Form
              form={generalForm}
              layout="vertical"
              initialValues={{
                name: workspace.name,
                slug: workspace.slug,
                description: workspace.description || '',
                isPublic: workspace.isPublic || false,
              }}
              onFinish={handleGeneralSubmit}
            >
              <Title level={5}>Workspace Information</Title>
              
              <Form.Item
                name="name"
                label="Workspace Name"
                rules={[{ required: true, message: 'Please enter workspace name' }]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                name="slug"
                label="Workspace Slug"
                rules={[{ required: true, message: 'Please enter workspace slug' }]}
                extra="Used in URLs. Changing this will break existing links."
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                name="description"
                label="Description"
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              
              <Form.Item
                name="logoUrl"
                label="Logo"
                extra="Upload your workspace logo (recommended size: 128x128px)"
              >
                <Upload
                  name="logo"
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Upload Logo</Button>
                </Upload>
              </Form.Item>
              
              <Form.Item
                name="isPublic"
                label="Public Workspace"
                valuePropName="checked"
                extra="Make this workspace visible to all organization members"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                Members
              </span>
            }
            key="members"
          >
            <Title level={5}>Member Settings</Title>
            
            <Form
              layout="vertical"
              initialValues={{
                defaultRole: 'member',
                allowExternalMembers: true,
              }}
            >
              <Form.Item
                name="defaultRole"
                label="Default Role for New Members"
              >
                <Select>
                  <Option value="admin">Admin</Option>
                  <Option value="member">Member</Option>
                  <Option value="editor">Editor</Option>
                  <Option value="viewer">Viewer</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="allowExternalMembers"
                label="Allow External Members"
                valuePropName="checked"
                extra="Allow users outside your organization to be invited"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" icon={<SaveOutlined />}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <LockOutlined />
                Security
              </span>
            }
            key="security"
          >
            <Form
              form={securityForm}
              layout="vertical"
              initialValues={{
                twoFactorAuthRequired: false,
                sessionTimeout: 60,
                ipRestrictions: false,
              }}
              onFinish={handleSecuritySubmit}
            >
              <Title level={5}>Security Settings</Title>
              
              <Form.Item
                name="twoFactorAuthRequired"
                label="Require Two-Factor Authentication"
                valuePropName="checked"
                extra="Require all members to set up two-factor authentication"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="sessionTimeout"
                label="Session Timeout (minutes)"
                extra="Time of inactivity before users are logged out"
              >
                <InputNumber min={15} max={1440} />
              </Form.Item>
              
              <Form.Item
                name="ipRestrictions"
                label="IP Restrictions"
                valuePropName="checked"
                extra="Restrict access to specific IP addresses"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="allowedIpAddresses"
                label="Allowed IP Addresses"
                dependencies={['ipRestrictions']}
                style={{ display: securityForm.getFieldValue('ipRestrictions') ? 'block' : 'none' }}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter IP addresses, one per line"
                />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <BellOutlined />
                Notifications
              </span>
            }
            key="notifications"
          >
            <Form
              form={notificationsForm}
              layout="vertical"
              initialValues={{
                userJoined: true,
                userLeft: true,
                moduleInstalled: true,
                securityAlerts: true,
                weeklyDigest: true,
              }}
              onFinish={handleNotificationsSubmit}
            >
              <Title level={5}>Notification Settings</Title>
              <Text type="secondary">
                Configure which notifications are sent to workspace administrators
              </Text>
              
              <div style={{ marginTop: 24 }}>
                <Form.Item
                  name="userJoined"
                  label="User Joined"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="userLeft"
                  label="User Left"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="moduleInstalled"
                  label="Module Installed"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="securityAlerts"
                  label="Security Alerts"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="weeklyDigest"
                  label="Weekly Digest"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </div>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </PermissionGuard>
  );
};
