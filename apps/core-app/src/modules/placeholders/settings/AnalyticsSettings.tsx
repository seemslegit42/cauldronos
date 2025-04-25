import React from 'react';
import { Card, Typography, Form, Input, Switch, Select, Button, Divider, Space, Row, Col, InputNumber } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const AnalyticsSettings: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log('Save Analytics settings with values:', values);
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
        <Title level={3}>Analytics Module Settings</Title>
        <Paragraph className="mb-6">
          Configure your Analytics module settings to customize data collection and reporting.
        </Paragraph>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            dataRetentionPeriod: 90,
            defaultDateRange: 'last30days',
            enableRealTimeData: true,
            enableExport: true,
            enableScheduledReports: true,
            defaultChartType: 'bar',
            trackPageViews: true,
            trackEvents: true,
            trackUsers: true,
            anonymizeIPs: true
          }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="dataRetentionPeriod"
                label="Data Retention Period (days)"
              >
                <InputNumber min={1} max={365} className="w-full" />
              </Form.Item>

              <Form.Item
                name="defaultDateRange"
                label="Default Date Range"
              >
                <Select>
                  <Option value="today">Today</Option>
                  <Option value="yesterday">Yesterday</Option>
                  <Option value="last7days">Last 7 Days</Option>
                  <Option value="last30days">Last 30 Days</Option>
                  <Option value="thisMonth">This Month</Option>
                  <Option value="lastMonth">Last Month</Option>
                  <Option value="custom">Custom</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="defaultChartType"
                label="Default Chart Type"
              >
                <Select>
                  <Option value="bar">Bar Chart</Option>
                  <Option value="line">Line Chart</Option>
                  <Option value="pie">Pie Chart</Option>
                  <Option value="area">Area Chart</Option>
                  <Option value="table">Table</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="enableRealTimeData"
                label="Enable Real-Time Data"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Show real-time data updates in dashboards
              </Text>

              <Form.Item
                name="enableExport"
                label="Enable Data Export"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Allow users to export analytics data
              </Text>

              <Form.Item
                name="enableScheduledReports"
                label="Enable Scheduled Reports"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Allow users to schedule automated reports
              </Text>
            </Col>
          </Row>

          <Divider />

          <Title level={4}>Tracking Settings</Title>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="trackPageViews"
                label="Track Page Views"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Track user page views
              </Text>

              <Form.Item
                name="trackEvents"
                label="Track Events"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Track user interactions and events
              </Text>
            </Col>

            <Col span={12}>
              <Form.Item
                name="trackUsers"
                label="Track Users"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Track individual user activity
              </Text>

              <Form.Item
                name="anonymizeIPs"
                label="Anonymize IP Addresses"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Text type="secondary" className="block mb-4">
                Anonymize IP addresses for privacy
              </Text>
            </Col>
          </Row>

          <Divider />

          <Form.Item
            name="customDimensions"
            label="Custom Dimensions"
          >
            <Select mode="tags" placeholder="Add custom dimensions to track">
              <Option value="location">Location</Option>
              <Option value="device">Device</Option>
              <Option value="browser">Browser</Option>
              <Option value="referrer">Referrer</Option>
              <Option value="campaign">Campaign</Option>
            </Select>
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

export default AnalyticsSettings;
