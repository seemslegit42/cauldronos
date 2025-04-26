import React from 'react';
import { Typography, Card, Divider, Space, Row, Col, Alert, Table, Button, Form, Input, Tag } from 'antd';
import { InfoCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import './AntDesignTypographyShowcase.css';

const { Title, Text, Paragraph } = Typography;

/**
 * AntDesignTypographyShowcase demonstrates how to balance Ant Design's typography
 * with CauldronOS brand personality.
 */
const AntDesignTypographyShowcase: React.FC = () => {
  // Sample data for the table
  const dataSource = [
    {
      key: '1',
      agent: 'Data Retrieval Agent',
      status: 'Active',
      tasks: 42,
      lastActive: '2 minutes ago',
    },
    {
      key: '2',
      agent: 'Content Generation Agent',
      status: 'Learning',
      tasks: 18,
      lastActive: '5 minutes ago',
    },
    {
      key: '3',
      agent: 'Workflow Automation Agent',
      status: 'Idle',
      tasks: 7,
      lastActive: '1 hour ago',
    },
  ];
  
  const columns = [
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'Active') {
          return <Tag color="success">{status}</Tag>;
        } else if (status === 'Learning') {
          return <Tag color="processing">{status}</Tag>;
        } else {
          return <Tag color="default">{status}</Tag>;
        }
      },
    },
    {
      title: 'Tasks',
      dataIndex: 'tasks',
      key: 'tasks',
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
  ];

  return (
    <div className="ant-design-typography-showcase">
      <Title level={2}>Balancing Ant Design with Brand Personality</Title>
      <Paragraph>
        This showcase demonstrates how to use Ant Design components while infusing CauldronOS brand personality
        in strategic places.
      </Paragraph>
      
      <Divider orientation="left">Dashboard Example</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card>
            <h2 className="dashboard-title">AI Agent Activity <span className="witty-message">(It's Learning, Be Patient)</span></h2>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Alert Messages</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Alert
            message="Success"
            description="Your agent has been deployed successfully. It's now ready to do your bidding. (Within ethical boundaries, of course.)"
            type="success"
            showIcon
            icon={<CheckCircleOutlined />}
          />
        </Col>
        
        <Col xs={24} md={8}>
          <Alert
            message="Information"
            description="This is a standard Ant Design alert with a touch of CauldronOS personality. Just enough to be noticed, not enough to be annoying."
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
          />
        </Col>
        
        <Col xs={24} md={8}>
          <Alert
            className="brand-alert"
            message="Warning"
            description="You're about to deploy code written by an AI. (Cross your fingers.)"
            type="warning"
            showIcon
            icon={<WarningOutlined />}
          />
        </Col>
      </Row>
      
      <Divider orientation="left">Form Elements</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card>
            <h3 className="section-title">Configuration Settings</h3>
            <Form layout="vertical">
              <Form.Item 
                label="API Key" 
                tooltip={{ 
                  title: 'Your secret key. Keep it safe. (Unlike that one character in that one movie...)', 
                  icon: <InfoCircleOutlined /> 
                }}
              >
                <Input.Password placeholder="Enter your API key" />
              </Form.Item>
              
              <Form.Item 
                label="Model Name"
                tooltip="The AI model to use for this agent"
              >
                <Input placeholder="e.g., gpt-4-turbo" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary">Save Configuration</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card>
            <h3 className="section-title">Code Example</h3>
            <div className="brand-code">
              <pre>
{`// Deploy your agent
function deployAgent(config) {
  // Magic happens here
  // (Don't ask too many questions)
  return {
    status: "deployed",
    message: "Your agent is now live!"
  };
}`}
              </pre>
            </div>
            <div className="witty-message mt-2">
              Yes, there's more code than this. We're just showing the interesting bits.
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Empty States</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card className="empty-state">
            <div className="empty-icon">📊</div>
            <Title level={4}>No Analytics Data Yet</Title>
            <Paragraph>Go do something awesome, then come back.</Paragraph>
            <Button type="primary">Create Your First Report</Button>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Loading States</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className="loading-state">
            <div className="loading-spinner"></div>
            <Paragraph className="loading-text">
              Brewing awesome... Estimated time: Less than your last coffee break.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card className="loading-state">
            <div className="loading-spinner"></div>
            <Paragraph className="loading-text">
              Distilling data... (Don't worry, we're not gonna sell it.)
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AntDesignTypographyShowcase;
