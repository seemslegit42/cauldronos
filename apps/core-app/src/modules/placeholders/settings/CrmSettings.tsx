import React from 'react';
import { Card, Typography, Form, Input, Switch, Select, Button, Divider, Space, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const CrmSettings: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log('Save CRM settings with values:', values);
      // In a real app, this would be an API call
      // await fetch(`/api/workspaces/${workspace.id}/modules/${module.id}/settings`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div>
      <Card>
        <Title level={3}>CRM Module Settings</Title>
        <Paragraph className="mb-6">
          Configure your CRM module settings to match your business needs.
        </Paragraph>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            customFields: true,
            leadScoring: true,
            autoAssignment: false,
            defaultView: 'list',
            pipelineStages: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
            requiredFields: ['name', 'email', 'phone'],
            emailIntegration: true,
            calendarIntegration: true
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="customFields"
                label="Custom Fields"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Allow users to create custom fields for contacts and deals
              </Text>

              <Form.Item
                name="leadScoring"
                label="Lead Scoring"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Enable automatic lead scoring based on activity
              </Text>

              <Form.Item
                name="autoAssignment"
                label="Automatic Lead Assignment"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Automatically assign new leads to team members
              </Text>
            </Col>

            <Col span={12}>
              <Form.Item
                name="defaultView"
                label="Default View"
              >
                <Select>
                  <Option value="list">List View</Option>
                  <Option value="kanban">Kanban View</Option>
                  <Option value="calendar">Calendar View</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="pipelineStages"
                label="Pipeline Stages"
              >
                <Select mode="tags" placeholder="Add pipeline stages">
                  <Option value="Lead">Lead</Option>
                  <Option value="Qualified">Qualified</Option>
                  <Option value="Proposal">Proposal</Option>
                  <Option value="Negotiation">Negotiation</Option>
                  <Option value="Closed Won">Closed Won</Option>
                  <Option value="Closed Lost">Closed Lost</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="requiredFields"
                label="Required Fields"
              >
                <Select mode="multiple" placeholder="Select required fields">
                  <Option value="name">Name</Option>
                  <Option value="email">Email</Option>
                  <Option value="phone">Phone</Option>
                  <Option value="company">Company</Option>
                  <Option value="address">Address</Option>
                  <Option value="source">Source</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Title level={4}>Integrations</Title>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="emailIntegration"
                label="Email Integration"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Connect with email to track conversations
              </Text>
            </Col>

            <Col span={12}>
              <Form.Item
                name="calendarIntegration"
                label="Calendar Integration"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Connect with calendar to schedule meetings
              </Text>
            </Col>
          </Row>

          <Divider />

          <Form.Item>
            <Button 
              type="primary" 
              icon={<SaveOutlined />}
              onClick={handleSave}
            >
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CrmSettings;
