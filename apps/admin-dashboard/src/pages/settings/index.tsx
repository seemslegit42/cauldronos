import React from 'react';
import { Card, Tabs, Form, Input, Switch, Button, Select, Space, Typography, Divider } from 'antd';
import {
  SettingOutlined,
  SecurityScanOutlined,
  BellOutlined,
  ApiOutlined,
  GlobalOutlined,
  SaveOutlined
} from '@ant-design/icons';
import PageTransition from '@/components/PageTransition';
import { useIntl } from 'umi';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const SettingsPage: React.FC = () => {
  const intl = useIntl();

  return (
    <PageTransition type="fade" cyberpunk>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>{intl.formatMessage({ id: 'settings.title' })}</Title>

        <Card className="bg-gray-900 border-gray-700 shadow-md">
          <Tabs defaultActiveKey="general">
            <TabPane
              tab={
                <span>
                  <SettingOutlined />
                  {intl.formatMessage({ id: 'settings.general' })}
                </span>
              }
              key="general"
            >
              <Form layout="vertical">
                <Title level={4}>{intl.formatMessage({ id: 'settings.general' })}</Title>
                <Paragraph className="text-gray-400">
                  {intl.formatMessage({ id: 'settings.general.description' })}
                </Paragraph>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.siteName' })}
                  name="siteName"
                  initialValue="CauldronOS Admin"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.siteDescription' })}
                  name="siteDescription"
                  initialValue="Administration dashboard for CauldronOS"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.timezone' })}
                  name="timezone"
                  initialValue="UTC"
                >
                  <Select>
                    <Option value="UTC">UTC</Option>
                    <Option value="America/New_York">America/New_York</Option>
                    <Option value="Europe/London">Europe/London</Option>
                    <Option value="Asia/Tokyo">Asia/Tokyo</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.maintenance' })}
                  name="maintenance"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>

                <Button type="primary" icon={<SaveOutlined />}>
                  {intl.formatMessage({ id: 'common.save' })}
                </Button>
              </Form>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <SecurityScanOutlined />
                  {intl.formatMessage({ id: 'settings.security' })}
                </span>
              }
              key="security"
            >
              <Form layout="vertical">
                <Title level={4}>{intl.formatMessage({ id: 'settings.security' })}</Title>
                <Paragraph className="text-gray-400">
                  {intl.formatMessage({ id: 'settings.security.description' })}
                </Paragraph>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.twoFactor' })}
                  name="twoFactor"
                  valuePropName="checked"
                  initialValue={true}
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.sessionTimeout' })}
                  name="sessionTimeout"
                  initialValue="30"
                >
                  <Select>
                    <Option value="15">15 minutes</Option>
                    <Option value="30">30 minutes</Option>
                    <Option value="60">1 hour</Option>
                    <Option value="120">2 hours</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.passwordPolicy' })}
                  name="passwordPolicy"
                  initialValue="strong"
                >
                  <Select>
                    <Option value="basic">Basic</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="strong">Strong</Option>
                    <Option value="custom">Custom</Option>
                  </Select>
                </Form.Item>

                <Button type="primary" icon={<SaveOutlined />}>
                  {intl.formatMessage({ id: 'common.save' })}
                </Button>
              </Form>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <BellOutlined />
                  {intl.formatMessage({ id: 'settings.notifications' })}
                </span>
              }
              key="notifications"
            >
              <Form layout="vertical">
                <Title level={4}>{intl.formatMessage({ id: 'settings.notifications' })}</Title>
                <Paragraph className="text-gray-400">
                  {intl.formatMessage({ id: 'settings.notifications.description' })}
                </Paragraph>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.emailNotifications' })}
                  name="emailNotifications"
                  valuePropName="checked"
                  initialValue={true}
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.pushNotifications' })}
                  name="pushNotifications"
                  valuePropName="checked"
                  initialValue={true}
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.notificationFrequency' })}
                  name="notificationFrequency"
                  initialValue="immediate"
                >
                  <Select>
                    <Option value="immediate">Immediate</Option>
                    <Option value="hourly">Hourly digest</Option>
                    <Option value="daily">Daily digest</Option>
                    <Option value="weekly">Weekly digest</Option>
                  </Select>
                </Form.Item>

                <Button type="primary" icon={<SaveOutlined />}>
                  {intl.formatMessage({ id: 'common.save' })}
                </Button>
              </Form>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <ApiOutlined />
                  {intl.formatMessage({ id: 'settings.integrations' })}
                </span>
              }
              key="integrations"
            >
              <Form layout="vertical">
                <Title level={4}>{intl.formatMessage({ id: 'settings.integrations' })}</Title>
                <Paragraph className="text-gray-400">
                  {intl.formatMessage({ id: 'settings.integrations.description' })}
                </Paragraph>

                <Form.Item
                  label="API Key"
                  name="apiKey"
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Webhook URL"
                  name="webhookUrl"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Enable External API"
                  name="enableExternalApi"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>

                <Button type="primary" icon={<SaveOutlined />}>
                  {intl.formatMessage({ id: 'common.save' })}
                </Button>
              </Form>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <GlobalOutlined />
                  {intl.formatMessage({ id: 'settings.localization' })}
                </span>
              }
              key="localization"
            >
              <Form layout="vertical">
                <Title level={4}>{intl.formatMessage({ id: 'settings.localization' })}</Title>
                <Paragraph className="text-gray-400">
                  {intl.formatMessage({ id: 'settings.localization.description' })}
                </Paragraph>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.defaultLanguage' })}
                  name="defaultLanguage"
                  initialValue="en-US"
                >
                  <Select>
                    <Option value="en-US">English (US)</Option>
                    <Option value="zh-CN">Chinese (Simplified)</Option>
                    <Option value="es-ES">Spanish</Option>
                    <Option value="fr-FR">French</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.dateFormat' })}
                  name="dateFormat"
                  initialValue="MM/DD/YYYY"
                >
                  <Select>
                    <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                    <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                    <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={intl.formatMessage({ id: 'settings.timeFormat' })}
                  name="timeFormat"
                  initialValue="12h"
                >
                  <Select>
                    <Option value="12h">12-hour (AM/PM)</Option>
                    <Option value="24h">24-hour</Option>
                  </Select>
                </Form.Item>

                <Button type="primary" icon={<SaveOutlined />}>
                  {intl.formatMessage({ id: 'common.save' })}
                </Button>
              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </Space>
    </PageTransition>
  );
};

export default SettingsPage;
