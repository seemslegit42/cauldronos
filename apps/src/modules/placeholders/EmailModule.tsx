import React, { useState } from 'react';
import { Card, Typography, Table, Tag, Space, Button, Tabs, Statistic, Row, Col, Progress, Modal, Form, Input, Select, Upload } from 'antd';
import { 
  MailOutlined, 
  SendOutlined, 
  InboxOutlined, 
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { ModuleComponentProps } from '../types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

// Mock data for email campaigns
const mockCampaigns = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to Our Platform',
    status: 'active',
    sent: 1250,
    opened: 875,
    clicked: 432,
    createdAt: '2023-04-10T10:30:00Z'
  },
  {
    id: '2',
    name: 'Monthly Newsletter',
    subject: 'April Newsletter - Latest Updates',
    status: 'draft',
    sent: 0,
    opened: 0,
    clicked: 0,
    createdAt: '2023-04-15T14:45:00Z'
  },
  {
    id: '3',
    name: 'Product Announcement',
    subject: 'Introducing Our New Feature',
    status: 'scheduled',
    sent: 0,
    opened: 0,
    clicked: 0,
    createdAt: '2023-04-18T09:15:00Z',
    scheduledFor: '2023-05-01T09:00:00Z'
  },
  {
    id: '4',
    name: 'Feedback Request',
    subject: 'We Value Your Feedback',
    status: 'completed',
    sent: 2500,
    opened: 1875,
    clicked: 945,
    createdAt: '2023-03-20T16:20:00Z'
  }
];

// Mock data for email templates
const mockTemplates = [
  {
    id: '1',
    name: 'Welcome Email',
    description: 'Template for welcoming new users',
    createdAt: '2023-03-10T10:30:00Z'
  },
  {
    id: '2',
    name: 'Newsletter',
    description: 'Monthly newsletter template',
    createdAt: '2023-03-15T14:45:00Z'
  },
  {
    id: '3',
    name: 'Product Announcement',
    description: 'Template for announcing new products or features',
    createdAt: '2023-03-18T09:15:00Z'
  }
];

const EmailModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCancel = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      console.log('Create campaign with values:', values);
      setIsCreateModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'draft':
        return 'blue';
      case 'scheduled':
        return 'orange';
      case 'completed':
        return 'purple';
      default:
        return 'default';
    }
  };

  const campaignColumns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Sent',
      dataIndex: 'sent',
      key: 'sent',
    },
    {
      title: 'Open Rate',
      key: 'openRate',
      render: (text: string, record: any) => (
        record.sent > 0 ? `${Math.round((record.opened / record.sent) * 100)}%` : 'N/A'
      ),
    },
    {
      title: 'Click Rate',
      key: 'clickRate',
      render: (text: string, record: any) => (
        record.sent > 0 ? `${Math.round((record.clicked / record.sent) * 100)}%` : 'N/A'
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" icon={<CopyOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const templateColumns = [
    {
      title: 'Template',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" icon={<CopyOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>{module.name}</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Create Campaign
        </Button>
      </div>
      
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Campaigns"
              value={mockCampaigns.length}
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Emails Sent"
              value={mockCampaigns.reduce((sum, campaign) => sum + campaign.sent, 0)}
              prefix={<SendOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Average Open Rate"
              value={Math.round(
                (mockCampaigns.reduce((sum, campaign) => sum + campaign.opened, 0) / 
                mockCampaigns.reduce((sum, campaign) => sum + campaign.sent, 0)) * 100
              )}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Average Click Rate"
              value={Math.round(
                (mockCampaigns.reduce((sum, campaign) => sum + campaign.clicked, 0) / 
                mockCampaigns.reduce((sum, campaign) => sum + campaign.sent, 0)) * 100
              )}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      
      <Tabs defaultActiveKey="campaigns">
        <TabPane 
          tab={<span><MailOutlined />Campaigns</span>} 
          key="campaigns"
        >
          <Card>
            <Table 
              columns={campaignColumns} 
              dataSource={mockCampaigns} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><InboxOutlined />Templates</span>} 
          key="templates"
        >
          <Card>
            <div className="flex justify-end mb-4">
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
              >
                Create Template
              </Button>
            </div>
            <Table 
              columns={templateColumns} 
              dataSource={mockTemplates} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title="Create Email Campaign"
        open={isCreateModalVisible}
        onCancel={handleCancel}
        onOk={handleCreate}
        okText="Create"
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          name="create_campaign_form"
        >
          <Form.Item
            name="name"
            label="Campaign Name"
            rules={[{ required: true, message: 'Please enter a campaign name' }]}
          >
            <Input placeholder="Monthly Newsletter" />
          </Form.Item>
          
          <Form.Item
            name="subject"
            label="Email Subject"
            rules={[{ required: true, message: 'Please enter an email subject' }]}
          >
            <Input placeholder="Your May Newsletter is here!" />
          </Form.Item>
          
          <Form.Item
            name="template"
            label="Email Template"
            rules={[{ required: true, message: 'Please select a template' }]}
          >
            <Select placeholder="Select a template">
              {mockTemplates.map(template => (
                <Option key={template.id} value={template.id}>
                  {template.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="recipients"
            label="Recipients"
            rules={[{ required: true, message: 'Please select recipients' }]}
          >
            <Select 
              mode="multiple" 
              placeholder="Select recipient groups"
              options={[
                { label: 'All Users', value: 'all' },
                { label: 'Active Users', value: 'active' },
                { label: 'New Users', value: 'new' },
                { label: 'Premium Users', value: 'premium' }
              ]}
            />
          </Form.Item>
          
          <Form.Item
            name="schedule"
            label="Schedule"
            rules={[{ required: true, message: 'Please select when to send' }]}
          >
            <Select placeholder="When to send">
              <Option value="now">Send Immediately</Option>
              <Option value="schedule">Schedule for Later</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmailModule;
