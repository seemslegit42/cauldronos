import React, { useState } from 'react';
import { Card, Typography, Table, Tag, Space, Button, Tabs, Statistic, Row, Col, Modal, Form, Input, Select, DatePicker, InputNumber, Divider } from 'antd';
import { 
  DollarOutlined, 
  FileTextOutlined, 
  UserOutlined, 
  PlusOutlined,
  PrinterOutlined,
  DownloadOutlined,
  SendOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import { ModuleComponentProps } from '../types';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

// Mock data for invoices
const mockInvoices = [
  {
    id: '1',
    number: 'INV-001',
    client: 'Acme Corp',
    amount: 1250.00,
    status: 'paid',
    issueDate: '2023-04-10',
    dueDate: '2023-05-10',
    paidDate: '2023-04-25'
  },
  {
    id: '2',
    number: 'INV-002',
    client: 'Wayne Enterprises',
    amount: 3750.50,
    status: 'pending',
    issueDate: '2023-04-15',
    dueDate: '2023-05-15'
  },
  {
    id: '3',
    number: 'INV-003',
    client: 'Stark Industries',
    amount: 5000.00,
    status: 'overdue',
    issueDate: '2023-03-20',
    dueDate: '2023-04-20'
  },
  {
    id: '4',
    number: 'INV-004',
    client: 'Daily Planet',
    amount: 1800.75,
    status: 'draft',
    issueDate: '2023-04-28',
    dueDate: '2023-05-28'
  }
];

// Mock data for clients
const mockClients = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'billing@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA'
  },
  {
    id: '2',
    name: 'Wayne Enterprises',
    email: 'accounts@wayne.com',
    phone: '+1 (555) 987-6543',
    address: '1007 Mountain Drive, Gotham City, USA'
  },
  {
    id: '3',
    name: 'Stark Industries',
    email: 'finance@stark.com',
    phone: '+1 (555) 456-7890',
    address: '200 Park Avenue, New York, USA'
  },
  {
    id: '4',
    name: 'Daily Planet',
    email: 'accounting@dailyplanet.com',
    phone: '+1 (555) 789-0123',
    address: '1000 Broadway, Metropolis, USA'
  }
];

const InvoicingModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
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
      console.log('Create invoice with values:', values);
      setIsCreateModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'green';
      case 'pending':
        return 'blue';
      case 'overdue':
        return 'red';
      case 'draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const invoiceColumns = [
    {
      title: 'Invoice #',
      dataIndex: 'number',
      key: 'number',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
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
      title: 'Issue Date',
      dataIndex: 'issueDate',
      key: 'issueDate',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<PrinterOutlined />} />
          <Button type="text" icon={<DownloadOutlined />} />
          <Button type="text" icon={<SendOutlined />} />
          <Button type="text" icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  const clientColumns = [
    {
      title: 'Client',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  // Calculate total amounts
  const totalPaid = mockInvoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
    
  const totalPending = mockInvoices
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
    
  const totalOverdue = mockInvoices
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>{module.name}</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Create Invoice
        </Button>
      </div>
      
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Paid"
              value={totalPaid}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Pending"
              value={totalPending}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Overdue"
              value={totalOverdue}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Clients"
              value={mockClients.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Tabs defaultActiveKey="invoices">
        <TabPane 
          tab={<span><FileTextOutlined />Invoices</span>} 
          key="invoices"
        >
          <Card>
            <Table 
              columns={invoiceColumns} 
              dataSource={mockInvoices} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><UserOutlined />Clients</span>} 
          key="clients"
        >
          <Card>
            <div className="flex justify-end mb-4">
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
              >
                Add Client
              </Button>
            </div>
            <Table 
              columns={clientColumns} 
              dataSource={mockClients} 
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title="Create Invoice"
        open={isCreateModalVisible}
        onCancel={handleCancel}
        onOk={handleCreate}
        okText="Create"
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          name="create_invoice_form"
        >
          <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: 'Please select a client' }]}
          >
            <Select placeholder="Select a client">
              {mockClients.map(client => (
                <Option key={client.id} value={client.id}>
                  {client.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="issueDate"
                label="Issue Date"
                rules={[{ required: true, message: 'Please select issue date' }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dueDate"
                label="Due Date"
                rules={[{ required: true, message: 'Please select due date' }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider>Invoice Items</Divider>
          
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      rules={[{ required: true, message: 'Missing description' }]}
                    >
                      <Input placeholder="Item description" style={{ width: 300 }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      rules={[{ required: true, message: 'Missing quantity' }]}
                    >
                      <InputNumber placeholder="Qty" min={1} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'unitPrice']}
                      rules={[{ required: true, message: 'Missing unit price' }]}
                    >
                      <InputNumber 
                        placeholder="Unit price" 
                        min={0} 
                        step={0.01}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                    <Button 
                      type="text" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => remove(name)} 
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    block 
                    icon={<PlusOutlined />}
                  >
                    Add Item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="notes"
                label="Notes"
              >
                <TextArea rows={4} placeholder="Invoice notes" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                initialValue="draft"
              >
                <Select>
                  <Option value="draft">Draft</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="paid">Paid</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="paymentTerms"
                label="Payment Terms"
                initialValue="net30"
              >
                <Select>
                  <Option value="net15">Net 15</Option>
                  <Option value="net30">Net 30</Option>
                  <Option value="net60">Net 60</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default InvoicingModule;
