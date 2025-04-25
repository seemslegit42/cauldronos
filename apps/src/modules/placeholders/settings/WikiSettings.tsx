import React from 'react';
import { Card, Typography, Form, Input, Switch, Select, Button, Divider, Space, Row, Col, Radio } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const WikiSettings: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log('Save Wiki settings with values:', values);
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
        <Title level={3}>Wiki Module Settings</Title>
        <Paragraph className="mb-6">
          Configure your Wiki module settings to match your documentation needs.
        </Paragraph>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            allowComments: true,
            allowAttachments: true,
            versionHistory: true,
            defaultEditor: 'markdown',
            accessControl: 'workspace',
            notifyOnChanges: true,
            allowExport: true,
            allowTemplates: true
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="allowComments"
                label="Allow Comments"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Allow users to comment on wiki pages
              </Text>

              <Form.Item
                name="allowAttachments"
                label="Allow Attachments"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Allow users to attach files to wiki pages
              </Text>

              <Form.Item
                name="versionHistory"
                label="Version History"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Track changes and maintain version history
              </Text>
            </Col>

            <Col span={12}>
              <Form.Item
                name="defaultEditor"
                label="Default Editor"
              >
                <Radio.Group>
                  <Radio value="markdown">Markdown</Radio>
                  <Radio value="wysiwyg">WYSIWYG</Radio>
                  <Radio value="code">Code</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="accessControl"
                label="Access Control"
              >
                <Select>
                  <Option value="workspace">Workspace Members Only</Option>
                  <Option value="role">Role-Based</Option>
                  <Option value="custom">Custom Permissions</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="notifyOnChanges"
                label="Notify on Changes"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Send notifications when pages are updated
              </Text>
            </Col>
          </Row>

          <Divider />

          <Title level={4}>Content Settings</Title>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="allowExport"
                label="Allow Export"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Allow users to export wiki content
              </Text>
            </Col>

            <Col span={12}>
              <Form.Item
                name="allowTemplates"
                label="Allow Templates"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Allow users to create and use page templates
              </Text>
            </Col>
          </Row>

          <Form.Item
            name="homePageContent"
            label="Default Home Page Content"
          >
            <TextArea rows={4} placeholder="Enter default content for new wiki home pages" />
          </Form.Item>

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

export default WikiSettings;
