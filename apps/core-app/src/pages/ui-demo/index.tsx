import React from 'react';
import { Typography, Divider, Space, Row, Col, Tabs } from 'antd';
import { CyberpunkDemo, ZodFormExample, UISettings } from '@/ui/components';
import { MigrationSettings } from '@/ui/components/settings/MigrationSettings';
import { MigrationExample } from '@/ui/examples/MigrationExample';
import { PageContainer } from '@ant-design/pro-components';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

/**
 * UI Demo page showcasing the new UI/UX system
 */
const UIDemo: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'UI/UX System Demo',
        subTitle: 'Explore the new cyberpunk-themed UI components',
      }}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Title level={2}>CauldronOS UI System</Title>
          <Paragraph>
            This page demonstrates the new UI/UX system with cyberpunk styling, animation support,
            and AI-native components. The system is built on top of Ant Design and uses Framer Motion
            for animations, Zod for form validation, and Zustand for state management.
          </Paragraph>
        </Col>

        <Col span={24}>
          <Divider orientation="left">Component Showcase</Divider>
          <CyberpunkDemo />
        </Col>

        <Col span={24}>
          <Divider orientation="left">Form Validation with Zod</Divider>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <ZodFormExample />
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={4}>About Zod Form Validation</Title>
                <Paragraph>
                  The form on the left uses Zod for schema validation. Zod is a TypeScript-first schema
                  validation library that allows you to define your form schema once and get both runtime
                  validation and static type checking.
                </Paragraph>
                <Paragraph>
                  Key benefits:
                </Paragraph>
                <ul>
                  <li>Type inference: TypeScript automatically infers the shape of your data</li>
                  <li>Composable schemas: Build complex schemas from simple ones</li>
                  <li>Detailed error messages: Get precise error messages for validation failures</li>
                  <li>Integration with React Hook Form: Seamless integration with form state management</li>
                </ul>
              </Space>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Divider orientation="left">Settings</Divider>
          <Tabs defaultActiveKey="1">
            <TabPane tab="UI Settings" key="1">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <UISettings />
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Title level={4}>Customizable UI Preferences</Title>
                    <Paragraph>
                      The UI Settings panel allows users to customize their UI experience. These settings
                      are stored in a Zustand store and persisted in localStorage, so they'll be remembered
                      across sessions.
                    </Paragraph>
                    <Paragraph>
                      Key features:
                    </Paragraph>
                    <ul>
                      <li>Dark mode toggle: Switch between light and dark themes</li>
                      <li>Reduced motion: Disable animations for users who prefer reduced motion</li>
                      <li>UI density: Choose between compact, default, and comfortable layouts</li>
                      <li>Visual effects: Toggle glow, scanline, and glitch effects</li>
                    </ul>
                  </Space>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Migration Settings" key="2">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <MigrationSettings />
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Title level={4}>Gradual Migration Controls</Title>
                    <Paragraph>
                      The Migration Settings panel allows you to control which enhanced components
                      are enabled. This makes it possible to gradually migrate to the new UI system
                      without disrupting the entire application at once.
                    </Paragraph>
                    <Paragraph>
                      Key features:
                    </Paragraph>
                    <ul>
                      <li>Component toggles: Enable or disable specific enhanced components</li>
                      <li>Bulk actions: Enable or disable all components at once</li>
                      <li>Progress tracking: See how far along you are in the migration</li>
                      <li>Persistent settings: Settings are remembered across sessions</li>
                    </ul>
                  </Space>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
        
        <Col span={24}>
          <Divider orientation="left">Migration Example</Divider>
          <MigrationExample />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default UIDemo;