import React from 'react';
import { Card, Form, Input, Switch, Select, Button, Divider, Typography, message } from 'antd';
import { ModuleComponentProps } from '../../types';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const CrmSettings: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [form] = Form.useForm();

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log('Settings form values:', values);
    message.success('CRM settings updated successfully!');
  };

  return (
    <Card title="CRM Module Settings">
      <Paragraph className="mb-6">
        Configure your CRM module settings. These settings will apply to all users in the {workspace.name} workspace.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          enableDeals: true,
          enableTasks: true,
          enableEmails: false,
          defaultView: 'customers',
          dealStages: ['discovery', 'proposal', 'negotiation', 'closed_won', 'closed_lost'],
          customerStatuses: ['lead', 'active', 'inactive'],
          enableCustomFields: false,
          enableIntegrations: false,
        }}
        onFinish={handleSubmit}
      >
        <Divider orientation="left">General Settings</Divider>
        
        <Form.Item
          name="defaultView"
          label="Default View"
          tooltip="The default tab that will be shown when users open the CRM module"
        >
          <Select>
            <Option value="customers">Customers</Option>
            <Option value="contacts">Contacts</Option>
            <Option value="deals">Deals</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="enableDeals"
          label="Enable Deals"
          valuePropName="checked"
          tooltip="Allow users to create and manage deals"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="enableTasks"
          label="Enable Tasks"
          valuePropName="checked"
          tooltip="Allow users to create and manage tasks related to customers and contacts"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="enableEmails"
          label="Enable Email Tracking"
          valuePropName="checked"
          tooltip="Track emails sent to customers and contacts"
        >
          <Switch />
        </Form.Item>

        <Divider orientation="left">Deal Settings</Divider>

        <Form.Item
          name="dealStages"
          label="Deal Stages"
          tooltip="The stages that a deal can go through in the sales pipeline"
        >
          <Select mode="tags" style={{ width: '100%' }}>
            <Option value="discovery">Discovery</Option>
            <Option value="proposal">Proposal</Option>
            <Option value="negotiation">Negotiation</Option>
            <Option value="closed_won">Closed Won</Option>
            <Option value="closed_lost">Closed Lost</Option>
          </Select>
        </Form.Item>

        <Divider orientation="left">Customer Settings</Divider>

        <Form.Item
          name="customerStatuses"
          label="Customer Statuses"
          tooltip="The statuses that a customer can have"
        >
          <Select mode="tags" style={{ width: '100%' }}>
            <Option value="lead">Lead</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Divider orientation="left">Advanced Settings</Divider>

        <Form.Item
          name="enableCustomFields"
          label="Enable Custom Fields"
          valuePropName="checked"
          tooltip="Allow users to create custom fields for customers, contacts, and deals"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="enableIntegrations"
          label="Enable Integrations"
          valuePropName="checked"
          tooltip="Enable integrations with other modules and external services"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CrmSettings;import React from 'react';
import { Card, Form, Input, Switch, Select, Button, Divider, Typography, message } from 'antd';
import { ModuleComponentProps } from '../../types';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const CrmSettings: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [form] = Form.useForm();

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log('Settings form values:', values);
    message.success('CRM settings updated successfully!');
  };

  return (
    <Card title="CRM Module Settings">
      <Paragraph className="mb-6">
        Configure your CRM module settings. These settings will apply to all users in the {workspace.name} workspace.
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          enableDeals: true,
          enableTasks: true,
          enableEmails: false,
          defaultView: 'customers',
          dealStages: ['discovery', 'proposal', 'negotiation', 'closed_won', 'closed_lost'],
          customerStatuses: ['lead', 'active', 'inactive'],
          enableCustomFields: false,
          enableIntegrations: false,
        }}
        onFinish={handleSubmit}
      >
        <Divider orientation="left">General Settings</Divider>
        
        <Form.Item
          name="defaultView"
          label="Default View"
          tooltip="The default tab that will be shown when users open the CRM module"
        >
          <Select>
            <Option value="customers">Customers</Option>
            <Option value="contacts">Contacts</Option>
            <Option value="deals">Deals</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="enableDeals"
          label="Enable Deals"
          valuePropName="checked"
          tooltip="Allow users to create and manage deals"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="enableTasks"
          label="Enable Tasks"
          valuePropName="checked"
          tooltip="Allow users to create and manage tasks related to customers and contacts"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="enableEmails"
          label="Enable Email Tracking"
          valuePropName="checked"
          tooltip="Track emails sent to customers and contacts"
        >
          <Switch />
        </Form.Item>

        <Divider orientation="left">Deal Settings</Divider>

        <Form.Item
          name="dealStages"
          label="Deal Stages"
          tooltip="The stages that a deal can go through in the sales pipeline"
        >
          <Select mode="tags" style={{ width: '100%' }}>
            <Option value="discovery">Discovery</Option>
            <Option value="proposal">Proposal</Option>
            <Option value="negotiation">Negotiation</Option>
            <Option value="closed_won">Closed Won</Option>
            <Option value="closed_lost">Closed Lost</Option>
          </Select>
        </Form.Item>

        <Divider orientation="left">Customer Settings</Divider>

        <Form.Item
          name="customerStatuses"
          label="Customer Statuses"
          tooltip="The statuses that a customer can have"
        >
          <Select mode="tags" style={{ width: '100%' }}>
            <Option value="lead">Lead</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Divider orientation="left">Advanced Settings</Divider>

        <Form.Item
          name="enableCustomFields"
          label="Enable Custom Fields"
          valuePropName="checked"
          tooltip="Allow users to create custom fields for customers, contacts, and deals"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="enableIntegrations"
          label="Enable Integrations"
          valuePropName="checked"
          tooltip="Enable integrations with other modules and external services"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CrmSettings;