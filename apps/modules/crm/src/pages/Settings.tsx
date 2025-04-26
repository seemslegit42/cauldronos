import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Form, 
  Switch, 
  Button, 
  Tabs, 
  Input, 
  Select, 
  Divider,
  Space,
  Table,
  Tag,
  Modal,
  message,
  InputNumber
} from 'antd';
import { 
  SaveOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  SettingOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const { module, workspace } = useCrmStore();
  const [form] = Form.useForm();
  const [pipelineForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock pipeline stages
  const [pipelineStages, setPipelineStages] = useState([
    { id: '1', name: 'Prospecting', order: 1, probability: 10, color: 'blue' },
    { id: '2', name: 'Qualification', order: 2, probability: 30, color: 'purple' },
    { id: '3', name: 'Proposal', order: 3, probability: 50, color: 'cyan' },
    { id: '4', name: 'Negotiation', order: 4, probability: 70, color: 'orange' },
    { id: '5', name: 'Closed Won', order: 5, probability: 100, color: 'green' },
    { id: '6', name: 'Closed Lost', order: 6, probability: 0, color: 'red' }
  ]);

  const [editingStage, setEditingStage] = useState<any>(null);

  const showModal = (stage?: any) => {
    setEditingStage(stage || null);
    if (stage) {
      pipelineForm.setFieldsValue(stage);
    } else {
      pipelineForm.resetFields();
      pipelineForm.setFieldsValue({ 
        order: pipelineStages.length + 1,
        probability: 50,
        color: 'blue'
      });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    pipelineForm.resetFields();
  };

  const handlePipelineSubmit = async () => {
    try {
      const values = await pipelineForm.validateFields();
      
      if (editingStage) {
        // Update existing stage
        setPipelineStages(prev => 
          prev.map(stage => stage.id === editingStage.id ? { ...stage, ...values } : stage)
        );
      } else {
        // Add new stage
        setPipelineStages(prev => [
          ...prev, 
          { 
            id: Math.random().toString(36).substring(2, 11),
            ...values
          }
        ]);
      }
      
      setIsModalVisible(false);
      pipelineForm.resetFields();
      message.success(`Pipeline stage ${editingStage ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDeleteStage = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this pipeline stage?',
      content: 'This action cannot be undone and may affect existing deals.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setPipelineStages(prev => prev.filter(stage => stage.id !== id));
        message.success('Pipeline stage deleted successfully');
      }
    });
  };

  const handleSaveSettings = (values: any) => {
    console.log('Saving settings:', values);
    message.success('Settings saved successfully');
  };

  // Pipeline stages table columns
  const pipelineColumns = [
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      sorter: (a: any, b: any) => a.order - b.order,
    },
    {
      title: 'Stage Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Tag color={record.color} className="py-1 px-2">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (text: number) => `${text}%`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteStage(record.id)}
            disabled={record.name === 'Closed Won' || record.name === 'Closed Lost'}
          />
        </Space>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="settings-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">CRM Settings</Title>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          onClick={() => form.submit()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Save Settings
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="general" className="settings-tabs">
            <TabPane 
              tab={
                <span>
                  <SettingOutlined /> General
                </span>
              } 
              key="general"
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  enableLeads: true,
                  enableDeals: true,
                  enableTasks: true,
                  enableEmails: true,
                  enableReports: true,
                  contactsPerPage: 10,
                  defaultCurrency: 'USD'
                }}
                onFinish={handleSaveSettings}
              >
                <Title level={4} className="text-white mb-4">Module Features</Title>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="enableLeads"
                    label={<Text className="text-white">Enable Leads Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableDeals"
                    label={<Text className="text-white">Enable Deals Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableTasks"
                    label={<Text className="text-white">Enable Tasks Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableEmails"
                    label={<Text className="text-white">Enable Email Integration</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableReports"
                    label={<Text className="text-white">Enable Reports</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
                
                <Divider className="bg-gray-700" />
                
                <Title level={4} className="text-white mb-4">Display Settings</Title>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="contactsPerPage"
                    label={<Text className="text-white">Contacts Per Page</Text>}
                    rules={[{ required: true, message: 'Please enter contacts per page' }]}
                  >
                    <Select>
                      <Select.Option value={10}>10</Select.Option>
                      <Select.Option value={20}>20</Select.Option>
                      <Select.Option value={50}>50</Select.Option>
                      <Select.Option value={100}>100</Select.Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    name="defaultCurrency"
                    label={<Text className="text-white">Default Currency</Text>}
                    rules={[{ required: true, message: 'Please select default currency' }]}
                  >
                    <Select>
                      <Select.Option value="USD">USD ($)</Select.Option>
                      <Select.Option value="EUR">EUR (€)</Select.Option>
                      <Select.Option value="GBP">GBP (£)</Select.Option>
                      <Select.Option value="JPY">JPY (¥)</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </Form>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <DatabaseOutlined /> Pipeline
                </span>
              } 
              key="pipeline"
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={4} className="text-white m-0">Sales Pipeline Stages</Title>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => showModal()}
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Add Stage
                </Button>
              </div>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure the stages in your sales pipeline. The order determines the progression of deals.
              </Paragraph>
              
              <Table
                dataSource={pipelineStages}
                columns={pipelineColumns}
                rowKey="id"
                pagination={false}
                className="pipeline-stages-table"
              />
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <UserOutlined /> Permissions
                </span>
              } 
              key="permissions"
            >
              <Title level={4} className="text-white mb-4">Role Permissions</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure which roles have access to different CRM features.
              </Paragraph>
              
              <Table
                dataSource={[
                  { id: '1', name: 'Read CRM Data', admin: true, manager: true, user: true },
                  { id: '2', name: 'Write CRM Data', admin: true, manager: true, user: true },
                  { id: '3', name: 'Delete CRM Data', admin: true, manager: true, user: false },
                  { id: '4', name: 'Manage Pipeline', admin: true, manager: true, user: false },
                  { id: '5', name: 'Export Data', admin: true, manager: true, user: false },
                  { id: '6', name: 'View Reports', admin: true, manager: true, user: true },
                  { id: '7', name: 'Manage Settings', admin: true, manager: false, user: false },
                ]}
                columns={[
                  {
                    title: 'Permission',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Admin',
                    dataIndex: 'admin',
                    key: 'admin',
                    render: (value: boolean) => (
                      <Switch checked={value} disabled />
                    ),
                  },
                  {
                    title: 'Manager',
                    dataIndex: 'manager',
                    key: 'manager',
                    render: (value: boolean) => (
                      <Switch checked={value} />
                    ),
                  },
                  {
                    title: 'User',
                    dataIndex: 'user',
                    key: 'user',
                    render: (value: boolean) => (
                      <Switch checked={value} />
                    ),
                  },
                ]}
                rowKey="id"
                pagination={false}
                className="permissions-table"
              />
              
              <div className="flex justify-end mt-4">
                <Button 
                  type="primary" 
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Save Permissions
                </Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <MailOutlined /> Email Templates
                </span>
              } 
              key="email"
            >
              <Title level={4} className="text-white mb-4">Email Templates</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure email templates for automated communications with contacts and leads.
              </Paragraph>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Welcome Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent to new contacts when they are added to the CRM.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Follow-up Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent as a follow-up after initial contact.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Deal Won Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent when a deal is marked as won.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Monthly Newsletter</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Monthly newsletter sent to all active contacts.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Add Template
                </Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <LockOutlined /> API Access
                </span>
              } 
              key="api"
            >
              <Title level={4} className="text-white mb-4">API Access</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Manage API keys and access for integrating with external systems.
              </Paragraph>
              
              <Card className="bg-gray-900 border-gray-700 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Text strong className="text-white">API Key</Text>
                  <Button size="small">Regenerate</Button>
                </div>
                <Input.Password
                  value="api_12345678901234567890"
                  readOnly
                  className="mb-2"
                />
                <Text className="text-gray-400 block">
                  This key provides full access to the CRM API. Keep it secure.
                </Text>
              </Card>
              
              <Title level={5} className="text-white mb-2">API Endpoints</Title>
              
              <Table
                dataSource={[
                  { id: '1', path: '/api/modules/crm/contacts', method: 'GET', description: 'Get all contacts' },
                  { id: '2', path: '/api/modules/crm/contacts/:id', method: 'GET', description: 'Get contact by ID' },
                  { id: '3', path: '/api/modules/crm/contacts', method: 'POST', description: 'Create a new contact' },
                  { id: '4', path: '/api/modules/crm/contacts/:id', method: 'PUT', description: 'Update a contact' },
                  { id: '5', path: '/api/modules/crm/contacts/:id', method: 'DELETE', description: 'Delete a contact' },
                  { id: '6', path: '/api/modules/crm/leads', method: 'GET', description: 'Get all leads' },
                  { id: '7', path: '/api/modules/crm/deals', method: 'GET', description: 'Get all deals' },
                ]}
                columns={[
                  {
                    title: 'Endpoint',
                    dataIndex: 'path',
                    key: 'path',
                  },
                  {
                    title: 'Method',
                    dataIndex: 'method',
                    key: 'method',
                    render: (method: string) => (
                      <Tag color={
                        method === 'GET' ? 'blue' : 
                        method === 'POST' ? 'green' : 
                        method === 'PUT' ? 'orange' : 
                        method === 'DELETE' ? 'red' : 
                        'default'
                      }>
                        {method}
                      </Tag>
                    ),
                  },
                  {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                  },
                ]}
                rowKey="id"
                pagination={false}
                className="api-endpoints-table"
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title={editingStage ? 'Edit Pipeline Stage' : 'Add Pipeline Stage'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handlePipelineSubmit}
        okText={editingStage ? 'Save Changes' : 'Add Stage'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={pipelineForm}
          layout="vertical"
          initialValues={{ 
            order: pipelineStages.length + 1,
            probability: 50,
            color: 'blue'
          }}
        >
          <Form.Item
            name="name"
            label="Stage Name"
            rules={[{ required: true, message: 'Please enter the stage name' }]}
          >
            <Input placeholder="e.g., Discovery" />
          </Form.Item>
          
          <Form.Item
            name="order"
            label="Order"
            rules={[{ required: true, message: 'Please enter the stage order' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="probability"
            label="Default Probability (%)"
            rules={[{ required: true, message: 'Please enter the default probability' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: 'Please select a color' }]}
          >
            <Select>
              <Select.Option value="blue">Blue</Select.Option>
              <Select.Option value="purple">Purple</Select.Option>
              <Select.Option value="cyan">Cyan</Select.Option>
              <Select.Option value="green">Green</Select.Option>
              <Select.Option value="orange">Orange</Select.Option>
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="volcano">Volcano</Select.Option>
              <Select.Option value="gold">Gold</Select.Option>
              <Select.Option value="lime">Lime</Select.Option>
              <Select.Option value="magenta">Magenta</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Settings;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Form, 
  Switch, 
  Button, 
  Tabs, 
  Input, 
  Select, 
  Divider,
  Space,
  Table,
  Tag,
  Modal,
  message,
  InputNumber
} from 'antd';
import { 
  SaveOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  SettingOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const { module, workspace } = useCrmStore();
  const [form] = Form.useForm();
  const [pipelineForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock pipeline stages
  const [pipelineStages, setPipelineStages] = useState([
    { id: '1', name: 'Prospecting', order: 1, probability: 10, color: 'blue' },
    { id: '2', name: 'Qualification', order: 2, probability: 30, color: 'purple' },
    { id: '3', name: 'Proposal', order: 3, probability: 50, color: 'cyan' },
    { id: '4', name: 'Negotiation', order: 4, probability: 70, color: 'orange' },
    { id: '5', name: 'Closed Won', order: 5, probability: 100, color: 'green' },
    { id: '6', name: 'Closed Lost', order: 6, probability: 0, color: 'red' }
  ]);

  const [editingStage, setEditingStage] = useState<any>(null);

  const showModal = (stage?: any) => {
    setEditingStage(stage || null);
    if (stage) {
      pipelineForm.setFieldsValue(stage);
    } else {
      pipelineForm.resetFields();
      pipelineForm.setFieldsValue({ 
        order: pipelineStages.length + 1,
        probability: 50,
        color: 'blue'
      });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    pipelineForm.resetFields();
  };

  const handlePipelineSubmit = async () => {
    try {
      const values = await pipelineForm.validateFields();
      
      if (editingStage) {
        // Update existing stage
        setPipelineStages(prev => 
          prev.map(stage => stage.id === editingStage.id ? { ...stage, ...values } : stage)
        );
      } else {
        // Add new stage
        setPipelineStages(prev => [
          ...prev, 
          { 
            id: Math.random().toString(36).substring(2, 11),
            ...values
          }
        ]);
      }
      
      setIsModalVisible(false);
      pipelineForm.resetFields();
      message.success(`Pipeline stage ${editingStage ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDeleteStage = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this pipeline stage?',
      content: 'This action cannot be undone and may affect existing deals.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setPipelineStages(prev => prev.filter(stage => stage.id !== id));
        message.success('Pipeline stage deleted successfully');
      }
    });
  };

  const handleSaveSettings = (values: any) => {
    console.log('Saving settings:', values);
    message.success('Settings saved successfully');
  };

  // Pipeline stages table columns
  const pipelineColumns = [
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      sorter: (a: any, b: any) => a.order - b.order,
    },
    {
      title: 'Stage Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Tag color={record.color} className="py-1 px-2">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (text: number) => `${text}%`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteStage(record.id)}
            disabled={record.name === 'Closed Won' || record.name === 'Closed Lost'}
          />
        </Space>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="settings-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">CRM Settings</Title>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          onClick={() => form.submit()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Save Settings
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="general" className="settings-tabs">
            <TabPane 
              tab={
                <span>
                  <SettingOutlined /> General
                </span>
              } 
              key="general"
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  enableLeads: true,
                  enableDeals: true,
                  enableTasks: true,
                  enableEmails: true,
                  enableReports: true,
                  contactsPerPage: 10,
                  defaultCurrency: 'USD'
                }}
                onFinish={handleSaveSettings}
              >
                <Title level={4} className="text-white mb-4">Module Features</Title>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="enableLeads"
                    label={<Text className="text-white">Enable Leads Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableDeals"
                    label={<Text className="text-white">Enable Deals Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableTasks"
                    label={<Text className="text-white">Enable Tasks Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableEmails"
                    label={<Text className="text-white">Enable Email Integration</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableReports"
                    label={<Text className="text-white">Enable Reports</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
                
                <Divider className="bg-gray-700" />
                
                <Title level={4} className="text-white mb-4">Display Settings</Title>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="contactsPerPage"
                    label={<Text className="text-white">Contacts Per Page</Text>}
                    rules={[{ required: true, message: 'Please enter contacts per page' }]}
                  >
                    <Select>
                      <Select.Option value={10}>10</Select.Option>
                      <Select.Option value={20}>20</Select.Option>
                      <Select.Option value={50}>50</Select.Option>
                      <Select.Option value={100}>100</Select.Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    name="defaultCurrency"
                    label={<Text className="text-white">Default Currency</Text>}
                    rules={[{ required: true, message: 'Please select default currency' }]}
                  >
                    <Select>
                      <Select.Option value="USD">USD ($)</Select.Option>
                      <Select.Option value="EUR">EUR (€)</Select.Option>
                      <Select.Option value="GBP">GBP (£)</Select.Option>
                      <Select.Option value="JPY">JPY (¥)</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </Form>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <DatabaseOutlined /> Pipeline
                </span>
              } 
              key="pipeline"
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={4} className="text-white m-0">Sales Pipeline Stages</Title>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => showModal()}
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Add Stage
                </Button>
              </div>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure the stages in your sales pipeline. The order determines the progression of deals.
              </Paragraph>
              
              <Table
                dataSource={pipelineStages}
                columns={pipelineColumns}
                rowKey="id"
                pagination={false}
                className="pipeline-stages-table"
              />
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <UserOutlined /> Permissions
                </span>
              } 
              key="permissions"
            >
              <Title level={4} className="text-white mb-4">Role Permissions</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure which roles have access to different CRM features.
              </Paragraph>
              
              <Table
                dataSource={[
                  { id: '1', name: 'Read CRM Data', admin: true, manager: true, user: true },
                  { id: '2', name: 'Write CRM Data', admin: true, manager: true, user: true },
                  { id: '3', name: 'Delete CRM Data', admin: true, manager: true, user: false },
                  { id: '4', name: 'Manage Pipeline', admin: true, manager: true, user: false },
                  { id: '5', name: 'Export Data', admin: true, manager: true, user: false },
                  { id: '6', name: 'View Reports', admin: true, manager: true, user: true },
                  { id: '7', name: 'Manage Settings', admin: true, manager: false, user: false },
                ]}
                columns={[
                  {
                    title: 'Permission',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Admin',
                    dataIndex: 'admin',
                    key: 'admin',
                    render: (value: boolean) => (
                      <Switch checked={value} disabled />
                    ),
                  },
                  {
                    title: 'Manager',
                    dataIndex: 'manager',
                    key: 'manager',
                    render: (value: boolean) => (
                      <Switch checked={value} />
                    ),
                  },
                  {
                    title: 'User',
                    dataIndex: 'user',
                    key: 'user',
                    render: (value: boolean) => (
                      <Switch checked={value} />
                    ),
                  },
                ]}
                rowKey="id"
                pagination={false}
                className="permissions-table"
              />
              
              <div className="flex justify-end mt-4">
                <Button 
                  type="primary" 
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Save Permissions
                </Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <MailOutlined /> Email Templates
                </span>
              } 
              key="email"
            >
              <Title level={4} className="text-white mb-4">Email Templates</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure email templates for automated communications with contacts and leads.
              </Paragraph>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Welcome Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent to new contacts when they are added to the CRM.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Follow-up Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent as a follow-up after initial contact.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Deal Won Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent when a deal is marked as won.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Monthly Newsletter</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Monthly newsletter sent to all active contacts.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Add Template
                </Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <LockOutlined /> API Access
                </span>
              } 
              key="api"
            >
              <Title level={4} className="text-white mb-4">API Access</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Manage API keys and access for integrating with external systems.
              </Paragraph>
              
              <Card className="bg-gray-900 border-gray-700 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Text strong className="text-white">API Key</Text>
                  <Button size="small">Regenerate</Button>
                </div>
                <Input.Password
                  value="api_12345678901234567890"
                  readOnly
                  className="mb-2"
                />
                <Text className="text-gray-400 block">
                  This key provides full access to the CRM API. Keep it secure.
                </Text>
              </Card>
              
              <Title level={5} className="text-white mb-2">API Endpoints</Title>
              
              <Table
                dataSource={[
                  { id: '1', path: '/api/modules/crm/contacts', method: 'GET', description: 'Get all contacts' },
                  { id: '2', path: '/api/modules/crm/contacts/:id', method: 'GET', description: 'Get contact by ID' },
                  { id: '3', path: '/api/modules/crm/contacts', method: 'POST', description: 'Create a new contact' },
                  { id: '4', path: '/api/modules/crm/contacts/:id', method: 'PUT', description: 'Update a contact' },
                  { id: '5', path: '/api/modules/crm/contacts/:id', method: 'DELETE', description: 'Delete a contact' },
                  { id: '6', path: '/api/modules/crm/leads', method: 'GET', description: 'Get all leads' },
                  { id: '7', path: '/api/modules/crm/deals', method: 'GET', description: 'Get all deals' },
                ]}
                columns={[
                  {
                    title: 'Endpoint',
                    dataIndex: 'path',
                    key: 'path',
                  },
                  {
                    title: 'Method',
                    dataIndex: 'method',
                    key: 'method',
                    render: (method: string) => (
                      <Tag color={
                        method === 'GET' ? 'blue' : 
                        method === 'POST' ? 'green' : 
                        method === 'PUT' ? 'orange' : 
                        method === 'DELETE' ? 'red' : 
                        'default'
                      }>
                        {method}
                      </Tag>
                    ),
                  },
                  {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                  },
                ]}
                rowKey="id"
                pagination={false}
                className="api-endpoints-table"
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title={editingStage ? 'Edit Pipeline Stage' : 'Add Pipeline Stage'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handlePipelineSubmit}
        okText={editingStage ? 'Save Changes' : 'Add Stage'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={pipelineForm}
          layout="vertical"
          initialValues={{ 
            order: pipelineStages.length + 1,
            probability: 50,
            color: 'blue'
          }}
        >
          <Form.Item
            name="name"
            label="Stage Name"
            rules={[{ required: true, message: 'Please enter the stage name' }]}
          >
            <Input placeholder="e.g., Discovery" />
          </Form.Item>
          
          <Form.Item
            name="order"
            label="Order"
            rules={[{ required: true, message: 'Please enter the stage order' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="probability"
            label="Default Probability (%)"
            rules={[{ required: true, message: 'Please enter the default probability' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: 'Please select a color' }]}
          >
            <Select>
              <Select.Option value="blue">Blue</Select.Option>
              <Select.Option value="purple">Purple</Select.Option>
              <Select.Option value="cyan">Cyan</Select.Option>
              <Select.Option value="green">Green</Select.Option>
              <Select.Option value="orange">Orange</Select.Option>
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="volcano">Volcano</Select.Option>
              <Select.Option value="gold">Gold</Select.Option>
              <Select.Option value="lime">Lime</Select.Option>
              <Select.Option value="magenta">Magenta</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Settings;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Form, 
  Switch, 
  Button, 
  Tabs, 
  Input, 
  Select, 
  Divider,
  Space,
  Table,
  Tag,
  Modal,
  message,
  InputNumber
} from 'antd';
import { 
  SaveOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  SettingOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const { module, workspace } = useCrmStore();
  const [form] = Form.useForm();
  const [pipelineForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock pipeline stages
  const [pipelineStages, setPipelineStages] = useState([
    { id: '1', name: 'Prospecting', order: 1, probability: 10, color: 'blue' },
    { id: '2', name: 'Qualification', order: 2, probability: 30, color: 'purple' },
    { id: '3', name: 'Proposal', order: 3, probability: 50, color: 'cyan' },
    { id: '4', name: 'Negotiation', order: 4, probability: 70, color: 'orange' },
    { id: '5', name: 'Closed Won', order: 5, probability: 100, color: 'green' },
    { id: '6', name: 'Closed Lost', order: 6, probability: 0, color: 'red' }
  ]);

  const [editingStage, setEditingStage] = useState<any>(null);

  const showModal = (stage?: any) => {
    setEditingStage(stage || null);
    if (stage) {
      pipelineForm.setFieldsValue(stage);
    } else {
      pipelineForm.resetFields();
      pipelineForm.setFieldsValue({ 
        order: pipelineStages.length + 1,
        probability: 50,
        color: 'blue'
      });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    pipelineForm.resetFields();
  };

  const handlePipelineSubmit = async () => {
    try {
      const values = await pipelineForm.validateFields();
      
      if (editingStage) {
        // Update existing stage
        setPipelineStages(prev => 
          prev.map(stage => stage.id === editingStage.id ? { ...stage, ...values } : stage)
        );
      } else {
        // Add new stage
        setPipelineStages(prev => [
          ...prev, 
          { 
            id: Math.random().toString(36).substring(2, 11),
            ...values
          }
        ]);
      }
      
      setIsModalVisible(false);
      pipelineForm.resetFields();
      message.success(`Pipeline stage ${editingStage ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDeleteStage = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this pipeline stage?',
      content: 'This action cannot be undone and may affect existing deals.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setPipelineStages(prev => prev.filter(stage => stage.id !== id));
        message.success('Pipeline stage deleted successfully');
      }
    });
  };

  const handleSaveSettings = (values: any) => {
    console.log('Saving settings:', values);
    message.success('Settings saved successfully');
  };

  // Pipeline stages table columns
  const pipelineColumns = [
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      sorter: (a: any, b: any) => a.order - b.order,
    },
    {
      title: 'Stage Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Tag color={record.color} className="py-1 px-2">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (text: number) => `${text}%`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteStage(record.id)}
            disabled={record.name === 'Closed Won' || record.name === 'Closed Lost'}
          />
        </Space>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="settings-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">CRM Settings</Title>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          onClick={() => form.submit()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Save Settings
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="general" className="settings-tabs">
            <TabPane 
              tab={
                <span>
                  <SettingOutlined /> General
                </span>
              } 
              key="general"
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  enableLeads: true,
                  enableDeals: true,
                  enableTasks: true,
                  enableEmails: true,
                  enableReports: true,
                  contactsPerPage: 10,
                  defaultCurrency: 'USD'
                }}
                onFinish={handleSaveSettings}
              >
                <Title level={4} className="text-white mb-4">Module Features</Title>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="enableLeads"
                    label={<Text className="text-white">Enable Leads Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableDeals"
                    label={<Text className="text-white">Enable Deals Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableTasks"
                    label={<Text className="text-white">Enable Tasks Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableEmails"
                    label={<Text className="text-white">Enable Email Integration</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableReports"
                    label={<Text className="text-white">Enable Reports</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
                
                <Divider className="bg-gray-700" />
                
                <Title level={4} className="text-white mb-4">Display Settings</Title>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="contactsPerPage"
                    label={<Text className="text-white">Contacts Per Page</Text>}
                    rules={[{ required: true, message: 'Please enter contacts per page' }]}
                  >
                    <Select>
                      <Select.Option value={10}>10</Select.Option>
                      <Select.Option value={20}>20</Select.Option>
                      <Select.Option value={50}>50</Select.Option>
                      <Select.Option value={100}>100</Select.Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    name="defaultCurrency"
                    label={<Text className="text-white">Default Currency</Text>}
                    rules={[{ required: true, message: 'Please select default currency' }]}
                  >
                    <Select>
                      <Select.Option value="USD">USD ($)</Select.Option>
                      <Select.Option value="EUR">EUR (€)</Select.Option>
                      <Select.Option value="GBP">GBP (£)</Select.Option>
                      <Select.Option value="JPY">JPY (¥)</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </Form>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <DatabaseOutlined /> Pipeline
                </span>
              } 
              key="pipeline"
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={4} className="text-white m-0">Sales Pipeline Stages</Title>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => showModal()}
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Add Stage
                </Button>
              </div>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure the stages in your sales pipeline. The order determines the progression of deals.
              </Paragraph>
              
              <Table
                dataSource={pipelineStages}
                columns={pipelineColumns}
                rowKey="id"
                pagination={false}
                className="pipeline-stages-table"
              />
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <UserOutlined /> Permissions
                </span>
              } 
              key="permissions"
            >
              <Title level={4} className="text-white mb-4">Role Permissions</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure which roles have access to different CRM features.
              </Paragraph>
              
              <Table
                dataSource={[
                  { id: '1', name: 'Read CRM Data', admin: true, manager: true, user: true },
                  { id: '2', name: 'Write CRM Data', admin: true, manager: true, user: true },
                  { id: '3', name: 'Delete CRM Data', admin: true, manager: true, user: false },
                  { id: '4', name: 'Manage Pipeline', admin: true, manager: true, user: false },
                  { id: '5', name: 'Export Data', admin: true, manager: true, user: false },
                  { id: '6', name: 'View Reports', admin: true, manager: true, user: true },
                  { id: '7', name: 'Manage Settings', admin: true, manager: false, user: false },
                ]}
                columns={[
                  {
                    title: 'Permission',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Admin',
                    dataIndex: 'admin',
                    key: 'admin',
                    render: (value: boolean) => (
                      <Switch checked={value} disabled />
                    ),
                  },
                  {
                    title: 'Manager',
                    dataIndex: 'manager',
                    key: 'manager',
                    render: (value: boolean) => (
                      <Switch checked={value} />
                    ),
                  },
                  {
                    title: 'User',
                    dataIndex: 'user',
                    key: 'user',
                    render: (value: boolean) => (
                      <Switch checked={value} />
                    ),
                  },
                ]}
                rowKey="id"
                pagination={false}
                className="permissions-table"
              />
              
              <div className="flex justify-end mt-4">
                <Button 
                  type="primary" 
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Save Permissions
                </Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <MailOutlined /> Email Templates
                </span>
              } 
              key="email"
            >
              <Title level={4} className="text-white mb-4">Email Templates</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure email templates for automated communications with contacts and leads.
              </Paragraph>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Welcome Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent to new contacts when they are added to the CRM.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Follow-up Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent as a follow-up after initial contact.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Deal Won Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent when a deal is marked as won.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Monthly Newsletter</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Monthly newsletter sent to all active contacts.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Add Template
                </Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <LockOutlined /> API Access
                </span>
              } 
              key="api"
            >
              <Title level={4} className="text-white mb-4">API Access</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Manage API keys and access for integrating with external systems.
              </Paragraph>
              
              <Card className="bg-gray-900 border-gray-700 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Text strong className="text-white">API Key</Text>
                  <Button size="small">Regenerate</Button>
                </div>
                <Input.Password
                  value="api_12345678901234567890"
                  readOnly
                  className="mb-2"
                />
                <Text className="text-gray-400 block">
                  This key provides full access to the CRM API. Keep it secure.
                </Text>
              </Card>
              
              <Title level={5} className="text-white mb-2">API Endpoints</Title>
              
              <Table
                dataSource={[
                  { id: '1', path: '/api/modules/crm/contacts', method: 'GET', description: 'Get all contacts' },
                  { id: '2', path: '/api/modules/crm/contacts/:id', method: 'GET', description: 'Get contact by ID' },
                  { id: '3', path: '/api/modules/crm/contacts', method: 'POST', description: 'Create a new contact' },
                  { id: '4', path: '/api/modules/crm/contacts/:id', method: 'PUT', description: 'Update a contact' },
                  { id: '5', path: '/api/modules/crm/contacts/:id', method: 'DELETE', description: 'Delete a contact' },
                  { id: '6', path: '/api/modules/crm/leads', method: 'GET', description: 'Get all leads' },
                  { id: '7', path: '/api/modules/crm/deals', method: 'GET', description: 'Get all deals' },
                ]}
                columns={[
                  {
                    title: 'Endpoint',
                    dataIndex: 'path',
                    key: 'path',
                  },
                  {
                    title: 'Method',
                    dataIndex: 'method',
                    key: 'method',
                    render: (method: string) => (
                      <Tag color={
                        method === 'GET' ? 'blue' : 
                        method === 'POST' ? 'green' : 
                        method === 'PUT' ? 'orange' : 
                        method === 'DELETE' ? 'red' : 
                        'default'
                      }>
                        {method}
                      </Tag>
                    ),
                  },
                  {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                  },
                ]}
                rowKey="id"
                pagination={false}
                className="api-endpoints-table"
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title={editingStage ? 'Edit Pipeline Stage' : 'Add Pipeline Stage'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handlePipelineSubmit}
        okText={editingStage ? 'Save Changes' : 'Add Stage'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={pipelineForm}
          layout="vertical"
          initialValues={{ 
            order: pipelineStages.length + 1,
            probability: 50,
            color: 'blue'
          }}
        >
          <Form.Item
            name="name"
            label="Stage Name"
            rules={[{ required: true, message: 'Please enter the stage name' }]}
          >
            <Input placeholder="e.g., Discovery" />
          </Form.Item>
          
          <Form.Item
            name="order"
            label="Order"
            rules={[{ required: true, message: 'Please enter the stage order' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="probability"
            label="Default Probability (%)"
            rules={[{ required: true, message: 'Please enter the default probability' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: 'Please select a color' }]}
          >
            <Select>
              <Select.Option value="blue">Blue</Select.Option>
              <Select.Option value="purple">Purple</Select.Option>
              <Select.Option value="cyan">Cyan</Select.Option>
              <Select.Option value="green">Green</Select.Option>
              <Select.Option value="orange">Orange</Select.Option>
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="volcano">Volcano</Select.Option>
              <Select.Option value="gold">Gold</Select.Option>
              <Select.Option value="lime">Lime</Select.Option>
              <Select.Option value="magenta">Magenta</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Settings;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Form, 
  Switch, 
  Button, 
  Tabs, 
  Input, 
  Select, 
  Divider,
  Space,
  Table,
  Tag,
  Modal,
  message,
  InputNumber
} from 'antd';
import { 
  SaveOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  SettingOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const { module, workspace } = useCrmStore();
  const [form] = Form.useForm();
  const [pipelineForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock pipeline stages
  const [pipelineStages, setPipelineStages] = useState([
    { id: '1', name: 'Prospecting', order: 1, probability: 10, color: 'blue' },
    { id: '2', name: 'Qualification', order: 2, probability: 30, color: 'purple' },
    { id: '3', name: 'Proposal', order: 3, probability: 50, color: 'cyan' },
    { id: '4', name: 'Negotiation', order: 4, probability: 70, color: 'orange' },
    { id: '5', name: 'Closed Won', order: 5, probability: 100, color: 'green' },
    { id: '6', name: 'Closed Lost', order: 6, probability: 0, color: 'red' }
  ]);

  const [editingStage, setEditingStage] = useState<any>(null);

  const showModal = (stage?: any) => {
    setEditingStage(stage || null);
    if (stage) {
      pipelineForm.setFieldsValue(stage);
    } else {
      pipelineForm.resetFields();
      pipelineForm.setFieldsValue({ 
        order: pipelineStages.length + 1,
        probability: 50,
        color: 'blue'
      });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    pipelineForm.resetFields();
  };

  const handlePipelineSubmit = async () => {
    try {
      const values = await pipelineForm.validateFields();
      
      if (editingStage) {
        // Update existing stage
        setPipelineStages(prev => 
          prev.map(stage => stage.id === editingStage.id ? { ...stage, ...values } : stage)
        );
      } else {
        // Add new stage
        setPipelineStages(prev => [
          ...prev, 
          { 
            id: Math.random().toString(36).substring(2, 11),
            ...values
          }
        ]);
      }
      
      setIsModalVisible(false);
      pipelineForm.resetFields();
      message.success(`Pipeline stage ${editingStage ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDeleteStage = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this pipeline stage?',
      content: 'This action cannot be undone and may affect existing deals.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setPipelineStages(prev => prev.filter(stage => stage.id !== id));
        message.success('Pipeline stage deleted successfully');
      }
    });
  };

  const handleSaveSettings = (values: any) => {
    console.log('Saving settings:', values);
    message.success('Settings saved successfully');
  };

  // Pipeline stages table columns
  const pipelineColumns = [
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      sorter: (a: any, b: any) => a.order - b.order,
    },
    {
      title: 'Stage Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Tag color={record.color} className="py-1 px-2">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (text: number) => `${text}%`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteStage(record.id)}
            disabled={record.name === 'Closed Won' || record.name === 'Closed Lost'}
          />
        </Space>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="settings-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">CRM Settings</Title>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          onClick={() => form.submit()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Save Settings
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="general" className="settings-tabs">
            <TabPane 
              tab={
                <span>
                  <SettingOutlined /> General
                </span>
              } 
              key="general"
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  enableLeads: true,
                  enableDeals: true,
                  enableTasks: true,
                  enableEmails: true,
                  enableReports: true,
                  contactsPerPage: 10,
                  defaultCurrency: 'USD'
                }}
                onFinish={handleSaveSettings}
              >
                <Title level={4} className="text-white mb-4">Module Features</Title>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="enableLeads"
                    label={<Text className="text-white">Enable Leads Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableDeals"
                    label={<Text className="text-white">Enable Deals Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableTasks"
                    label={<Text className="text-white">Enable Tasks Management</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableEmails"
                    label={<Text className="text-white">Enable Email Integration</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  
                  <Form.Item
                    name="enableReports"
                    label={<Text className="text-white">Enable Reports</Text>}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
                
                <Divider className="bg-gray-700" />
                
                <Title level={4} className="text-white mb-4">Display Settings</Title>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="contactsPerPage"
                    label={<Text className="text-white">Contacts Per Page</Text>}
                    rules={[{ required: true, message: 'Please enter contacts per page' }]}
                  >
                    <Select>
                      <Select.Option value={10}>10</Select.Option>
                      <Select.Option value={20}>20</Select.Option>
                      <Select.Option value={50}>50</Select.Option>
                      <Select.Option value={100}>100</Select.Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    name="defaultCurrency"
                    label={<Text className="text-white">Default Currency</Text>}
                    rules={[{ required: true, message: 'Please select default currency' }]}
                  >
                    <Select>
                      <Select.Option value="USD">USD ($)</Select.Option>
                      <Select.Option value="EUR">EUR (€)</Select.Option>
                      <Select.Option value="GBP">GBP (£)</Select.Option>
                      <Select.Option value="JPY">JPY (¥)</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </Form>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <DatabaseOutlined /> Pipeline
                </span>
              } 
              key="pipeline"
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={4} className="text-white m-0">Sales Pipeline Stages</Title>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => showModal()}
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Add Stage
                </Button>
              </div>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure the stages in your sales pipeline. The order determines the progression of deals.
              </Paragraph>
              
              <Table
                dataSource={pipelineStages}
                columns={pipelineColumns}
                rowKey="id"
                pagination={false}
                className="pipeline-stages-table"
              />
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <UserOutlined /> Permissions
                </span>
              } 
              key="permissions"
            >
              <Title level={4} className="text-white mb-4">Role Permissions</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure which roles have access to different CRM features.
              </Paragraph>
              
              <Table
                dataSource={[
                  { id: '1', name: 'Read CRM Data', admin: true, manager: true, user: true },
                  { id: '2', name: 'Write CRM Data', admin: true, manager: true, user: true },
                  { id: '3', name: 'Delete CRM Data', admin: true, manager: true, user: false },
                  { id: '4', name: 'Manage Pipeline', admin: true, manager: true, user: false },
                  { id: '5', name: 'Export Data', admin: true, manager: true, user: false },
                  { id: '6', name: 'View Reports', admin: true, manager: true, user: true },
                  { id: '7', name: 'Manage Settings', admin: true, manager: false, user: false },
                ]}
                columns={[
                  {
                    title: 'Permission',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Admin',
                    dataIndex: 'admin',
                    key: 'admin',
                    render: (value: boolean) => (
                      <Switch checked={value} disabled />
                    ),
                  },
                  {
                    title: 'Manager',
                    dataIndex: 'manager',
                    key: 'manager',
                    render: (value: boolean) => (
                      <Switch checked={value} />
                    ),
                  },
                  {
                    title: 'User',
                    dataIndex: 'user',
                    key: 'user',
                    render: (value: boolean) => (
                      <Switch checked={value} />
                    ),
                  },
                ]}
                rowKey="id"
                pagination={false}
                className="permissions-table"
              />
              
              <div className="flex justify-end mt-4">
                <Button 
                  type="primary" 
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Save Permissions
                </Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <MailOutlined /> Email Templates
                </span>
              } 
              key="email"
            >
              <Title level={4} className="text-white mb-4">Email Templates</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Configure email templates for automated communications with contacts and leads.
              </Paragraph>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Welcome Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent to new contacts when they are added to the CRM.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Follow-up Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent as a follow-up after initial contact.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Deal Won Email</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Sent when a deal is marked as won.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <Text strong className="text-white">Monthly Newsletter</Text>
                    <Button type="text" icon={<EditOutlined />} />
                  </div>
                  <Text className="text-gray-400 block mb-2">
                    Monthly newsletter sent to all active contacts.
                  </Text>
                  <div className="flex justify-end">
                    <Button size="small">Preview</Button>
                  </div>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  className="bg-[#00B67F] hover:bg-[#00A070]"
                >
                  Add Template
                </Button>
              </div>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <LockOutlined /> API Access
                </span>
              } 
              key="api"
            >
              <Title level={4} className="text-white mb-4">API Access</Title>
              
              <Paragraph className="text-gray-400 mb-4">
                Manage API keys and access for integrating with external systems.
              </Paragraph>
              
              <Card className="bg-gray-900 border-gray-700 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Text strong className="text-white">API Key</Text>
                  <Button size="small">Regenerate</Button>
                </div>
                <Input.Password
                  value="api_12345678901234567890"
                  readOnly
                  className="mb-2"
                />
                <Text className="text-gray-400 block">
                  This key provides full access to the CRM API. Keep it secure.
                </Text>
              </Card>
              
              <Title level={5} className="text-white mb-2">API Endpoints</Title>
              
              <Table
                dataSource={[
                  { id: '1', path: '/api/modules/crm/contacts', method: 'GET', description: 'Get all contacts' },
                  { id: '2', path: '/api/modules/crm/contacts/:id', method: 'GET', description: 'Get contact by ID' },
                  { id: '3', path: '/api/modules/crm/contacts', method: 'POST', description: 'Create a new contact' },
                  { id: '4', path: '/api/modules/crm/contacts/:id', method: 'PUT', description: 'Update a contact' },
                  { id: '5', path: '/api/modules/crm/contacts/:id', method: 'DELETE', description: 'Delete a contact' },
                  { id: '6', path: '/api/modules/crm/leads', method: 'GET', description: 'Get all leads' },
                  { id: '7', path: '/api/modules/crm/deals', method: 'GET', description: 'Get all deals' },
                ]}
                columns={[
                  {
                    title: 'Endpoint',
                    dataIndex: 'path',
                    key: 'path',
                  },
                  {
                    title: 'Method',
                    dataIndex: 'method',
                    key: 'method',
                    render: (method: string) => (
                      <Tag color={
                        method === 'GET' ? 'blue' : 
                        method === 'POST' ? 'green' : 
                        method === 'PUT' ? 'orange' : 
                        method === 'DELETE' ? 'red' : 
                        'default'
                      }>
                        {method}
                      </Tag>
                    ),
                  },
                  {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                  },
                ]}
                rowKey="id"
                pagination={false}
                className="api-endpoints-table"
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title={editingStage ? 'Edit Pipeline Stage' : 'Add Pipeline Stage'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handlePipelineSubmit}
        okText={editingStage ? 'Save Changes' : 'Add Stage'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={pipelineForm}
          layout="vertical"
          initialValues={{ 
            order: pipelineStages.length + 1,
            probability: 50,
            color: 'blue'
          }}
        >
          <Form.Item
            name="name"
            label="Stage Name"
            rules={[{ required: true, message: 'Please enter the stage name' }]}
          >
            <Input placeholder="e.g., Discovery" />
          </Form.Item>
          
          <Form.Item
            name="order"
            label="Order"
            rules={[{ required: true, message: 'Please enter the stage order' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="probability"
            label="Default Probability (%)"
            rules={[{ required: true, message: 'Please enter the default probability' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: 'Please select a color' }]}
          >
            <Select>
              <Select.Option value="blue">Blue</Select.Option>
              <Select.Option value="purple">Purple</Select.Option>
              <Select.Option value="cyan">Cyan</Select.Option>
              <Select.Option value="green">Green</Select.Option>
              <Select.Option value="orange">Orange</Select.Option>
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="volcano">Volcano</Select.Option>
              <Select.Option value="gold">Gold</Select.Option>
              <Select.Option value="lime">Lime</Select.Option>
              <Select.Option value="magenta">Magenta</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Settings;