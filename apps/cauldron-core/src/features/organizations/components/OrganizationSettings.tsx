import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Switch, Select, InputNumber, Space, Typography, Upload, message } from 'antd';
import { UploadOutlined, SaveOutlined, TeamOutlined, LockOutlined, BellOutlined, GlobalOutlined } from '@ant-design/icons';
import { useCurrentOrganization } from '../hooks/useOrganizations';
import { PermissionGuard } from '../../auth/components/PermissionGuard';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Option } = Select;

export const OrganizationSettings: React.FC = () => {
  const { organization, updateOrganization } = useCurrentOrganization();
  const [generalForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('general');
  
  if (!organization) {
    return <Card loading />;
  }
  
  const handleGeneralSubmit = async (values: any) => {
    try {
      await updateOrganization.mutateAsync({
        name: values.name,
        slug: values.slug,
        logoUrl: values.logoUrl,
      });
      message.success('Organization settings updated successfully');
    } catch (error) {
      message.error('Failed to update organization settings');
    }
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
    <PermissionGuard permissions={['manage:organizations']}>
      <Card title="Organization Settings">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <GlobalOutlined />
                General
              </span>
            }
            key="general"
          >
            <Form
              form={generalForm}
              layout="vertical"
              initialValues={{
                name: organization.name,
                slug: organization.slug,
                description: organization.description || '',
              }}
              onFinish={handleGeneralSubmit}
            >
              <Title level={5}>Organization Information</Title>
              
              <Form.Item
                name="name"
                label="Organization Name"
                rules={[{ required: true, message: 'Please enter organization name' }]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                name="slug"
                label="Organization Slug"
                rules={[{ required: true, message: 'Please enter organization slug' }]}
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
                extra="Upload your organization logo (recommended size: 128x128px)"
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
              
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={updateOrganization.isPending}
                >
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
                  <Option value="guest">Guest</Option>
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
                passwordPolicy: 'medium',
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
                name="passwordPolicy"
                label="Password Policy"
              >
                <Select>
                  <Option value="low">Low - Minimum 8 characters</Option>
                  <Option value="medium">Medium - Minimum 10 characters with numbers</Option>
                  <Option value="high">High - Minimum 12 characters with numbers and symbols</Option>
                </Select>
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
                workspaceCreated: true,
                billingUpdates: true,
                securityAlerts: true,
                weeklyDigest: true,
              }}
              onFinish={handleNotificationsSubmit}
            >
              <Title level={5}>Notification Settings</Title>
              <Text type="secondary">
                Configure which notifications are sent to organization administrators
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
                  name="workspaceCreated"
                  label="Workspace Created"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item
                  name="billingUpdates"
                  label="Billing Updates"
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
