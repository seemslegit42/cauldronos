import React, { useState } from 'react';
import { Card, Tabs, Typography, Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../types';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;
const { Option } = Select;

// Mock data for customers
const mockCustomers = [
  { id: '1', name: 'Acme Inc.', status: 'active', industry: 'Technology', revenue: '$1.2M', contacts: 3 },
  { id: '2', name: 'Beta Corp', status: 'lead', industry: 'Healthcare', revenue: '$3.5M', contacts: 2 },
  { id: '3', name: 'Gamma LLC', status: 'inactive', industry: 'Finance', revenue: '$850K', contacts: 1 },
  { id: '4', name: 'Delta Services', status: 'active', industry: 'Retail', revenue: '$2.1M', contacts: 5 },
];

// Mock data for contacts
const mockContacts = [
  { id: '1', name: 'John Doe', email: 'john@acme.com', phone: '555-1234', company: 'Acme Inc.', role: 'CEO' },
  { id: '2', name: 'Jane Smith', email: 'jane@acme.com', phone: '555-5678', company: 'Acme Inc.', role: 'CTO' },
  { id: '3', name: 'Bob Johnson', email: 'bob@beta.com', phone: '555-9012', company: 'Beta Corp', role: 'Sales Director' },
];

// Mock data for deals
const mockDeals = [
  { id: '1', name: 'Enterprise License', value: '$50,000', stage: 'proposal', company: 'Acme Inc.', probability: '60%' },
  { id: '2', name: 'Support Contract', value: '$25,000', stage: 'negotiation', company: 'Beta Corp', probability: '80%' },
  { id: '3', name: 'Software Implementation', value: '$75,000', stage: 'discovery', company: 'Delta Services', probability: '30%' },
];

const CrmModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [activeTab, setActiveTab] = useState('customers');
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [isDealModalVisible, setIsDealModalVisible] = useState(false);
  const [customerForm] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [dealForm] = Form.useForm();

  // Customer columns for the table
  const customerColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status', 
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          active: 'green',
          lead: 'blue',
          inactive: 'gray'
        };
        return <span style={{ color: statusColors[status] }}>{status.toUpperCase()}</span>;
      }
    },
    { title: 'Industry', dataIndex: 'industry', key: 'industry' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
    { title: 'Contacts', dataIndex: 'contacts', key: 'contacts' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} size="small" className="mr-2" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </span>
      ),
    },
  ];

  // Contact columns for the table
  const contactColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} size="small" className="mr-2" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </span>
      ),
    },
  ];

  // Deal columns for the table
  const dealColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { title: 'Stage', dataIndex: 'stage', key: 'stage' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Probability', dataIndex: 'probability', key: 'probability' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} size="small" className="mr-2" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </span>
      ),
    },
  ];

  // Handle customer form submission
  const handleCustomerSubmit = () => {
    customerForm.validateFields().then(values => {
      console.log('Customer form values:', values);
      message.success('Customer added successfully!');
      setIsCustomerModalVisible(false);
      customerForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Handle contact form submission
  const handleContactSubmit = () => {
    contactForm.validateFields().then(values => {
      console.log('Contact form values:', values);
      message.success('Contact added successfully!');
      setIsContactModalVisible(false);
      contactForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Handle deal form submission
  const handleDealSubmit = () => {
    dealForm.validateFields().then(values => {
      console.log('Deal form values:', values);
      message.success('Deal added successfully!');
      setIsDealModalVisible(false);
      dealForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  return (
    <div>
      <Card className="mb-6">
        <Title level={3}>CRM Dashboard</Title>
        <Paragraph>
          Manage your customers, contacts, and deals in one place. Track sales pipeline and customer interactions.
        </Paragraph>
      </Card>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Customers" key="customers">
          <div className="flex justify-between items-center mb-4">
            <Title level={4}>Customers</Title>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsCustomerModalVisible(true)}
            >
              Add Customer
            </Button>
          </div>
          <Table 
            columns={customerColumns} 
            dataSource={mockCustomers} 
            rowKey="id" 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>

        <TabPane tab="Contacts" key="contacts">
          <div className="flex justify-between items-center mb-4">
            <Title level={4}>Contacts</Title>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsContactModalVisible(true)}
            >
              Add Contact
            </Button>
          </div>
          <Table 
            columns={contactColumns} 
            dataSource={mockContacts} 
            rowKey="id" 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>

        <TabPane tab="Deals" key="deals">
          <div className="flex justify-between items-center mb-4">
            <Title level={4}>Deals</Title>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsDealModalVisible(true)}
            >
              Add Deal
            </Button>
          </div>
          <Table 
            columns={dealColumns} 
            dataSource={mockDeals} 
            rowKey="id" 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
      </Tabs>

      {/* Customer Modal */}
      <Modal
        title="Add Customer"
        open={isCustomerModalVisible}
        onOk={handleCustomerSubmit}
        onCancel={() => setIsCustomerModalVisible(false)}
      >
        <Form form={customerForm} layout="vertical">
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true, message: 'Please enter the company name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="lead">Lead</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="industry"
            label="Industry"
          >
            <Select>
              <Option value="Technology">Technology</Option>
              <Option value="Healthcare">Healthcare</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Retail">Retail</Option>
              <Option value="Manufacturing">Manufacturing</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="revenue"
            label="Annual Revenue"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Contact Modal */}
      <Modal
        title="Add Contact"
        open={isContactModalVisible}
        onOk={handleContactSubmit}
        onCancel={() => setIsContactModalVisible(false)}
      >
        <Form form={contactForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the contact name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select a company' }]}
          >
            <Select>
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.name}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Deal Modal */}
      <Modal
        title="Add Deal"
        open={isDealModalVisible}
        onOk={handleDealSubmit}
        onCancel={() => setIsDealModalVisible(false)}
      >
        <Form form={dealForm} layout="vertical">
          <Form.Item
            name="name"
            label="Deal Name"
            rules={[{ required: true, message: 'Please enter the deal name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: 'Please enter the deal value' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stage"
            label="Stage"
            rules={[{ required: true, message: 'Please select a stage' }]}
          >
            <Select>
              <Option value="discovery">Discovery</Option>
              <Option value="proposal">Proposal</Option>
              <Option value="negotiation">Negotiation</Option>
              <Option value="closed_won">Closed Won</Option>
              <Option value="closed_lost">Closed Lost</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select a company' }]}
          >
            <Select>
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.name}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="probability"
            label="Probability"
          >
            <Select>
              <Option value="10%">10%</Option>
              <Option value="30%">30%</Option>
              <Option value="50%">50%</Option>
              <Option value="60%">60%</Option>
              <Option value="80%">80%</Option>
              <Option value="100%">100%</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CrmModule;import React, { useState } from 'react';
import { Card, Tabs, Typography, Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../types';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;
const { Option } = Select;

// Mock data for customers
const mockCustomers = [
  { id: '1', name: 'Acme Inc.', status: 'active', industry: 'Technology', revenue: '$1.2M', contacts: 3 },
  { id: '2', name: 'Beta Corp', status: 'lead', industry: 'Healthcare', revenue: '$3.5M', contacts: 2 },
  { id: '3', name: 'Gamma LLC', status: 'inactive', industry: 'Finance', revenue: '$850K', contacts: 1 },
  { id: '4', name: 'Delta Services', status: 'active', industry: 'Retail', revenue: '$2.1M', contacts: 5 },
];

// Mock data for contacts
const mockContacts = [
  { id: '1', name: 'John Doe', email: 'john@acme.com', phone: '555-1234', company: 'Acme Inc.', role: 'CEO' },
  { id: '2', name: 'Jane Smith', email: 'jane@acme.com', phone: '555-5678', company: 'Acme Inc.', role: 'CTO' },
  { id: '3', name: 'Bob Johnson', email: 'bob@beta.com', phone: '555-9012', company: 'Beta Corp', role: 'Sales Director' },
];

// Mock data for deals
const mockDeals = [
  { id: '1', name: 'Enterprise License', value: '$50,000', stage: 'proposal', company: 'Acme Inc.', probability: '60%' },
  { id: '2', name: 'Support Contract', value: '$25,000', stage: 'negotiation', company: 'Beta Corp', probability: '80%' },
  { id: '3', name: 'Software Implementation', value: '$75,000', stage: 'discovery', company: 'Delta Services', probability: '30%' },
];

const CrmModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [activeTab, setActiveTab] = useState('customers');
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [isDealModalVisible, setIsDealModalVisible] = useState(false);
  const [customerForm] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [dealForm] = Form.useForm();

  // Customer columns for the table
  const customerColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status', 
      render: (status: string) => {
        const statusColors: Record<string, string> = {
          active: 'green',
          lead: 'blue',
          inactive: 'gray'
        };
        return <span style={{ color: statusColors[status] }}>{status.toUpperCase()}</span>;
      }
    },
    { title: 'Industry', dataIndex: 'industry', key: 'industry' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
    { title: 'Contacts', dataIndex: 'contacts', key: 'contacts' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} size="small" className="mr-2" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </span>
      ),
    },
  ];

  // Contact columns for the table
  const contactColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} size="small" className="mr-2" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </span>
      ),
    },
  ];

  // Deal columns for the table
  const dealColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { title: 'Stage', dataIndex: 'stage', key: 'stage' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Probability', dataIndex: 'probability', key: 'probability' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button icon={<EditOutlined />} size="small" className="mr-2" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </span>
      ),
    },
  ];

  // Handle customer form submission
  const handleCustomerSubmit = () => {
    customerForm.validateFields().then(values => {
      console.log('Customer form values:', values);
      message.success('Customer added successfully!');
      setIsCustomerModalVisible(false);
      customerForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Handle contact form submission
  const handleContactSubmit = () => {
    contactForm.validateFields().then(values => {
      console.log('Contact form values:', values);
      message.success('Contact added successfully!');
      setIsContactModalVisible(false);
      contactForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  // Handle deal form submission
  const handleDealSubmit = () => {
    dealForm.validateFields().then(values => {
      console.log('Deal form values:', values);
      message.success('Deal added successfully!');
      setIsDealModalVisible(false);
      dealForm.resetFields();
    }).catch(error => {
      console.error('Validation failed:', error);
    });
  };

  return (
    <div>
      <Card className="mb-6">
        <Title level={3}>CRM Dashboard</Title>
        <Paragraph>
          Manage your customers, contacts, and deals in one place. Track sales pipeline and customer interactions.
        </Paragraph>
      </Card>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Customers" key="customers">
          <div className="flex justify-between items-center mb-4">
            <Title level={4}>Customers</Title>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsCustomerModalVisible(true)}
            >
              Add Customer
            </Button>
          </div>
          <Table 
            columns={customerColumns} 
            dataSource={mockCustomers} 
            rowKey="id" 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>

        <TabPane tab="Contacts" key="contacts">
          <div className="flex justify-between items-center mb-4">
            <Title level={4}>Contacts</Title>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsContactModalVisible(true)}
            >
              Add Contact
            </Button>
          </div>
          <Table 
            columns={contactColumns} 
            dataSource={mockContacts} 
            rowKey="id" 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>

        <TabPane tab="Deals" key="deals">
          <div className="flex justify-between items-center mb-4">
            <Title level={4}>Deals</Title>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsDealModalVisible(true)}
            >
              Add Deal
            </Button>
          </div>
          <Table 
            columns={dealColumns} 
            dataSource={mockDeals} 
            rowKey="id" 
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
      </Tabs>

      {/* Customer Modal */}
      <Modal
        title="Add Customer"
        open={isCustomerModalVisible}
        onOk={handleCustomerSubmit}
        onCancel={() => setIsCustomerModalVisible(false)}
      >
        <Form form={customerForm} layout="vertical">
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true, message: 'Please enter the company name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="lead">Lead</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="industry"
            label="Industry"
          >
            <Select>
              <Option value="Technology">Technology</Option>
              <Option value="Healthcare">Healthcare</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Retail">Retail</Option>
              <Option value="Manufacturing">Manufacturing</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="revenue"
            label="Annual Revenue"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Contact Modal */}
      <Modal
        title="Add Contact"
        open={isContactModalVisible}
        onOk={handleContactSubmit}
        onCancel={() => setIsContactModalVisible(false)}
      >
        <Form form={contactForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the contact name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select a company' }]}
          >
            <Select>
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.name}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Deal Modal */}
      <Modal
        title="Add Deal"
        open={isDealModalVisible}
        onOk={handleDealSubmit}
        onCancel={() => setIsDealModalVisible(false)}
      >
        <Form form={dealForm} layout="vertical">
          <Form.Item
            name="name"
            label="Deal Name"
            rules={[{ required: true, message: 'Please enter the deal name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: 'Please enter the deal value' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stage"
            label="Stage"
            rules={[{ required: true, message: 'Please select a stage' }]}
          >
            <Select>
              <Option value="discovery">Discovery</Option>
              <Option value="proposal">Proposal</Option>
              <Option value="negotiation">Negotiation</Option>
              <Option value="closed_won">Closed Won</Option>
              <Option value="closed_lost">Closed Lost</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select a company' }]}
          >
            <Select>
              {mockCustomers.map(customer => (
                <Option key={customer.id} value={customer.name}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="probability"
            label="Probability"
          >
            <Select>
              <Option value="10%">10%</Option>
              <Option value="30%">30%</Option>
              <Option value="50%">50%</Option>
              <Option value="60%">60%</Option>
              <Option value="80%">80%</Option>
              <Option value="100%">100%</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CrmModule;