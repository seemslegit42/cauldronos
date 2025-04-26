import React, { useState } from 'react';
import { Form, Input, Switch, Button, Select, Space, Typography, InputNumber, Card, Tabs, Divider, Alert } from 'antd';
import { SaveOutlined, SecurityScanOutlined, BellOutlined, TeamOutlined, DatabaseOutlined } from '@ant-design/icons';
import { WorkspaceConfig } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface WorkspaceConfigPanelProps {
  workspaceId: string;
  config: WorkspaceConfig;
  onSave: (config: Partial<WorkspaceConfig>) => Promise<void>;
  isLoading: boolean;
}

const WorkspaceConfigPanel: React.FC<WorkspaceConfigPanelProps> = ({
  workspaceId,
  config,
  onSave,
  isLoading
}) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  const [ipRestrictions, setIpRestrictions] = useState(config.securitySettings.ipRestrictions);

  const handleSubmit = async (values: any) => {
    try {
      // Transform form values into config structure
      const updatedConfig: Partial<WorkspaceConfig> = {
        defaultRole: values.defaultRole,
        allowPublicModules: values.allowPublicModules,
        allowExternalMembers: values.allowExternalMembers,
        dataRetentionDays: values.dataRetentionDays,
        securitySettings: {
          twoFactorAuthRequired: values.twoFactorAuthRequired,
          passwordPolicy: values.passwordPolicy,
          sessionTimeout: values.sessionTimeout,
          ipRestrictions: values.ipRestrictions,
          allowedIpAddresses: values.allowedIpAddresses?.split(',').map((ip: string) => ip.trim()) || []
        },
        notificationSettings: {
          userJoined: values.userJoined,
          userLeft: values.userLeft,
          moduleInstalled: values.moduleInstalled,
          billingUpdates: values.billingUpdates,
          securityAlerts: values.securityAlerts,
          weeklyDigest: values.weeklyDigest
        }
      };
      
      await onSave(updatedConfig);
    } catch (error) {
      console.error('Error saving workspace config:', error);
    }
  };

  // Flatten the config object for the form
  const initialValues = {
    defaultRole: config.defaultRole,
    allowPublicModules: config.allowPublicModules,
    allowExternalMembers: config.allowExternalMembers,
    dataRetentionDays: config.dataRetentionDays,
    twoFactorAuthRequired: config.securitySettings.twoFactorAuthRequired,
    passwordPolicy: config.securitySettings.passwordPolicy,
    sessionTimeout: config.securitySettings.sessionTimeout,
    ipRestrictions: config.securitySettings.ipRestrictions,
    allowedIpAddresses: config.securitySettings.allowedIpAddresses?.join(', ') || '',
    userJoined: config.notificationSettings.userJoined,
    userLeft: config.notificationSettings.userLeft,
    moduleInstalled: config.notificationSettings.moduleInstalled,
    billingUpdates: config.notificationSettings.billingUpdates,
    securityAlerts: config.notificationSettings.securityAlerts,
    weeklyDigest: config.notificationSettings.weeklyDigest
  };

  return (
    <Card className="workspace-config-panel">
      <Title level={4}>Workspace Configuration</Title>
      <Paragraph>
        Configure settings for this workspace including security, notifications, and access control.
      </Paragraph>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={<span><TeamOutlined /> Access Control</span>} 
            key="1"
          >
            <Form.Item
              name="defaultRole"
              label="Default Member Role"
              tooltip="The default role assigned to new members"
            >
              <Select>
                <Option value="USER">User</Option>
                <Option value="MANAGER">Manager</Option>
                <Option value="ADMIN">Admin</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="allowPublicModules"
              label="Allow Public Modules"
              valuePropName="checked"
              tooltip="Allow members to install public modules from the marketplace"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="allowExternalMembers"
              label="Allow External Members"
              valuePropName="checked"
              tooltip="Allow members from outside your organization"
            >
              <Switch />
            </Form.Item>
          </TabPane>
          
          <TabPane 
            tab={<span><SecurityScanOutlined /> Security</span>} 
            key="2"
          >
            <Form.Item
              name="twoFactorAuthRequired"
              label="Require Two-Factor Authentication"
              valuePropName="checked"
              tooltip="Require all members to set up 2FA"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="passwordPolicy"
              label="Password Policy"
              tooltip="Set the strength requirements for passwords"
            >
              <Select>
                <Option value="low">Low - Minimum 6 characters</Option>
                <Option value="medium">Medium - Minimum 8 characters with numbers</Option>
                <Option value="high">High - Minimum 10 characters with numbers, symbols, and mixed case</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="sessionTimeout"
              label="Session Timeout (minutes)"
              tooltip="How long until inactive users are logged out"
            >
              <InputNumber min={5} max={1440} />
            </Form.Item>
            
            <Form.Item
              name="ipRestrictions"
              label="IP Restrictions"
              valuePropName="checked"
              tooltip="Restrict access to specific IP addresses"
            >
              <Switch onChange={setIpRestrictions} />
            </Form.Item>
            
            {ipRestrictions && (
              <Form.Item
                name="allowedIpAddresses"
                label="Allowed IP Addresses"
                tooltip="Comma-separated list of allowed IP addresses"
                rules={[
                  {
                    pattern: /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(,\s*\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})*$/,
                    message: 'Please enter valid IP addresses separated by commas'
                  }
                ]}
              >
                <Input placeholder="192.168.1.1, 10.0.0.1" />
              </Form.Item>
            )}
          </TabPane>
          
          <TabPane 
            tab={<span><DatabaseOutlined /> Data</span>} 
            key="3"
          >
            <Form.Item
              name="dataRetentionDays"
              label="Data Retention Period (days)"
              tooltip="How long to keep data before automatic deletion"
            >
              <InputNumber min={1} max={3650} />
            </Form.Item>
            
            <Alert
              message="Data Retention Policy"
              description="This setting controls how long data is kept in the workspace before being automatically deleted. Set to a higher value to keep data longer, or a lower value to automatically clean up old data."
              type="info"
              showIcon
              className="mb-4"
            />
          </TabPane>
          
          <TabPane 
            tab={<span><BellOutlined /> Notifications</span>} 
            key="4"
          >
            <Form.Item
              name="userJoined"
              label="User Joined"
              valuePropName="checked"
              tooltip="Notify when a new user joins the workspace"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="userLeft"
              label="User Left"
              valuePropName="checked"
              tooltip="Notify when a user leaves the workspace"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="moduleInstalled"
              label="Module Installed"
              valuePropName="checked"
              tooltip="Notify when a new module is installed"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="billingUpdates"
              label="Billing Updates"
              valuePropName="checked"
              tooltip="Notify about billing changes or updates"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="securityAlerts"
              label="Security Alerts"
              valuePropName="checked"
              tooltip="Notify about security-related events"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="weeklyDigest"
              label="Weekly Digest"
              valuePropName="checked"
              tooltip="Send a weekly summary of workspace activity"
            >
              <Switch />
            </Form.Item>
          </TabPane>
        </Tabs>
        
        <Divider />
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />}
            loading={isLoading}
          >
            Save Configuration
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default WorkspaceConfigPanel;
