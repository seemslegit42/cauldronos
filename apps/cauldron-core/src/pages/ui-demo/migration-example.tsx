import React, { useState } from 'react';
import { Typography, Divider, Space, Row, Col, Tabs, Form, Input, Button as AntButton } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { ZodForm, ZodFormItem } from '@/ui/components/form/ZodForm';
import { Input as EnhancedInput } from '@/ui/components/form/Input';
import { Button } from '@/ui/components/Button';
import { Card } from '@/ui/components/Card';
import { z } from 'zod';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

/**
 * Example page demonstrating how to migrate from standard Ant Design components
 * to the enhanced UI components with cyberpunk styling
 */
const MigrationExample: React.FC = () => {
  const [form] = Form.useForm();
  const [submittedValues, setSubmittedValues] = useState<any>(null);

  // Define Zod schema for the enhanced form
  const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Please enter a valid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters').max(500),
  });

  // Handle form submission for the original form
  const handleOriginalSubmit = (values: any) => {
    setSubmittedValues(values);
  };

  // Handle form submission for the enhanced form
  const handleEnhancedSubmit = (values: any) => {
    setSubmittedValues(values);
  };

  return (
    <PageContainer
      header={{
        title: 'Migration Example',
        subTitle: 'Compare original and enhanced components',
      }}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Title level={2}>Component Migration Example</Title>
          <Paragraph>
            This page demonstrates how to migrate from standard Ant Design components to the
            enhanced UI components with cyberpunk styling. The example below shows a simple
            contact form implemented with both approaches.
          </Paragraph>
        </Col>

        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Side by Side Comparison" key="1">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Card title="Original Implementation">
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleOriginalSubmit}
                    >
                      <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                          { required: true, message: 'Please enter your name' },
                          { min: 2, message: 'Name must be at least 2 characters' },
                        ]}
                      >
                        <Input placeholder="Enter your name" />
                      </Form.Item>

                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' },
                        ]}
                      >
                        <Input placeholder="Enter your email" />
                      </Form.Item>

                      <Form.Item
                        name="message"
                        label="Message"
                        rules={[
                          { required: true, message: 'Please enter your message' },
                          { min: 10, message: 'Message must be at least 10 characters' },
                        ]}
                      >
                        <Input.TextArea
                          placeholder="Enter your message"
                          rows={4}
                        />
                      </Form.Item>

                      <Form.Item>
                        <AntButton type="primary" htmlType="submit">
                          Submit
                        </AntButton>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>

                <Col xs={24} md={12}>
                  <Card
                    title="Enhanced Implementation"
                    variant="cyber"
                    hoverEffect="glow"
                  >
                    <ZodForm
                      schema={formSchema}
                      onSubmit={handleEnhancedSubmit}
                    >
                      <ZodFormItem
                        name="name"
                        label="Name"
                        required
                      >
                        <EnhancedInput placeholder="Enter your name" />
                      </ZodFormItem>

                      <ZodFormItem
                        name="email"
                        label="Email"
                        required
                      >
                        <EnhancedInput placeholder="Enter your email" />
                      </ZodFormItem>

                      <ZodFormItem
                        name="message"
                        label="Message"
                        required
                      >
                        <EnhancedInput.TextArea
                          placeholder="Enter your message"
                          rows={4}
                        />
                      </ZodFormItem>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          variant="cyber"
                          glowOnHover
                        >
                          Submit
                        </Button>
                      </div>
                    </ZodForm>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Code Comparison" key="2">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Card title="Original Implementation">
                    <pre style={{ background: '#f5f5f5', padding: '16px', overflow: 'auto' }}>
{`import { Form, Input, Button } from 'antd';

const MyForm = () => {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    console.log('Form values:', values);
  };
  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Please enter your name' },
          { min: 2, message: 'Name must be at least 2 characters' },
        ]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        name="message"
        label="Message"
        rules={[
          { required: true, message: 'Please enter your message' },
          { min: 10, message: 'Message must be at least 10 characters' },
        ]}
      >
        <Input.TextArea
          placeholder="Enter your message"
          rows={4}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};`}
                    </pre>
                  </Card>
                </Col>

                <Col xs={24} md={12}>
                  <Card
                    title="Enhanced Implementation"
                    variant="cyber"
                  >
                    <pre style={{ background: '#1e1e1e', color: '#e0e0e0', padding: '16px', overflow: 'auto' }}>
{`import { ZodForm, ZodFormItem } from '@/ui/components/form/ZodForm';
import { Input } from '@/ui/components/form/Input';
import { Button } from '@/ui/components/Button';
import { z } from 'zod';

// Define Zod schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const MyForm = () => {
  const handleSubmit = (data) => {
    console.log('Form values:', data);
  };
  
  return (
    <ZodForm
      schema={formSchema}
      onSubmit={handleSubmit}
    >
      <ZodFormItem
        name="name"
        label="Name"
        required
      >
        <Input placeholder="Enter your name" />
      </ZodFormItem>

      <ZodFormItem
        name="email"
        label="Email"
        required
      >
        <Input placeholder="Enter your email" />
      </ZodFormItem>

      <ZodFormItem
        name="message"
        label="Message"
        required
      >
        <Input.TextArea
          placeholder="Enter your message"
          rows={4}
        />
      </ZodFormItem>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          htmlType="submit"
          variant="cyber"
          glowOnHover
        >
          Submit
        </Button>
      </div>
    </ZodForm>
  );
};`}
                    </pre>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>

        {submittedValues && (
          <Col span={24}>
            <Card title="Form Submission Result" variant="cyber">
              <pre style={{ background: '#1e1e1e', color: '#e0e0e0', padding: '16px', overflow: 'auto' }}>
                {JSON.stringify(submittedValues, null, 2)}
              </pre>
            </Card>
          </Col>
        )}

        <Col span={24}>
          <Card title="Migration Benefits">
            <Row gutter={[24, 16]}>
              <Col xs={24} md={8}>
                <Title level={4}>Improved Developer Experience</Title>
                <ul>
                  <li>Type-safe form validation with Zod</li>
                  <li>Simplified form state management</li>
                  <li>Reduced boilerplate code</li>
                  <li>Better error handling</li>
                </ul>
              </Col>
              
              <Col xs={24} md={8}>
                <Title level={4}>Enhanced User Experience</Title>
                <ul>
                  <li>Consistent cyberpunk styling</li>
                  <li>Smooth animations and transitions</li>
                  <li>Improved feedback with glow effects</li>
                  <li>Accessibility improvements</li>
                </ul>
              </Col>
              
              <Col xs={24} md={8}>
                <Title level={4}>Maintainability</Title>
                <ul>
                  <li>Centralized UI state management</li>
                  <li>Consistent component API</li>
                  <li>Better separation of concerns</li>
                  <li>Easier to extend and customize</li>
                </ul>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default MigrationExample;