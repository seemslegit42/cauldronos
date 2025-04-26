import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Typography,
  Dropdown,
  Menu,
  Select,
  Badge
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  FundOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text } = Typography;

const Leads: React.FC = () => {
  const { leads, loading, createLead, updateLead, deleteLead } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [form] = Form.useForm();

  // Filter leads based on search text
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchText.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchText.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchText.toLowerCase()))
  );

  const showModal = (lead?: any) => {
    setEditingLead(lead || null);
    if (lead) {
      form.setFieldsValue(lead);
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 'new' });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingLead) {
        await updateLead(editingLead.id, values);
      } else {
        await createLead(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this lead?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteLead(id);
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'blue';
      case 'contacted':
        return 'purple';
      case 'qualified':
        return 'green';
      case 'unqualified':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <Badge color={getStatusColor(record.status)} className="mr-2" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2E1A47] flex items-center justify-center mr-2">
              <UserOutlined />
            </div>
            <span className="text-white">{text}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => (
        <div className="flex items-center">
          <MailOutlined className="mr-2 text-gray-400" />
          <a href={`mailto:${text}`} className="text-gray-300 hover:text-[#00B2C9]">{text}</a>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => text ? (
        <div className="flex items-center">
          <PhoneOutlined className="mr-2 text-gray-400" />
          <a href={`tel:${text}`} className="text-gray-300 hover:text-[#00B2C9]">{text}</a>
        </div>
      ) : '-',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (text: string) => text ? (
        <div className="flex items-center">
          <BankOutlined className="mr-2 text-gray-400" />
          <span>{text}</span>
        </div>
      ) : '-',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (text: string) => (
        <div className="flex items-center">
          <FundOutlined className="mr-2 text-gray-400" />
          <span>{text}</span>
        </div>
      ),
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
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => showModal(record)}>
                Edit
              </Menu.Item>
              <Menu.Item key="convert" icon={<UserOutlined />}>
                Convert to Contact
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
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
      className="leads-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Leads</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Add Lead
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search leads..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredLeads.length} leads found
              </Text>
            </Space>
          </div>

          <Table
            dataSource={filteredLeads}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} leads`
            }}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>

      <Modal
        title={editingLead ? 'Edit Lead' : 'Add New Lead'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingLead ? 'Save Changes' : 'Create Lead'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'new' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the lead name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="John Doe" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the lead email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="john.doe@example.com" />
          </Form.Item>
          
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input prefix={<PhoneOutlined />} placeholder="+1 (555) 123-4567" />
          </Form.Item>
          
          <Form.Item
            name="company"
            label="Company"
          >
            <Input prefix={<BankOutlined />} placeholder="Acme Inc." />
          </Form.Item>
          
          <Form.Item
            name="source"
            label="Lead Source"
            rules={[{ required: true, message: 'Please enter the lead source' }]}
          >
            <Select>
              <Select.Option value="Website">Website</Select.Option>
              <Select.Option value="Referral">Referral</Select.Option>
              <Select.Option value="Social Media">Social Media</Select.Option>
              <Select.Option value="Email Campaign">Email Campaign</Select.Option>
              <Select.Option value="Trade Show">Trade Show</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="new">New</Select.Option>
              <Select.Option value="contacted">Contacted</Select.Option>
              <Select.Option value="qualified">Qualified</Select.Option>
              <Select.Option value="unqualified">Unqualified</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Leads;import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Typography,
  Dropdown,
  Menu,
  Select,
  Badge
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  FundOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text } = Typography;

const Leads: React.FC = () => {
  const { leads, loading, createLead, updateLead, deleteLead } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [form] = Form.useForm();

  // Filter leads based on search text
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchText.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchText.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchText.toLowerCase()))
  );

  const showModal = (lead?: any) => {
    setEditingLead(lead || null);
    if (lead) {
      form.setFieldsValue(lead);
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 'new' });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingLead) {
        await updateLead(editingLead.id, values);
      } else {
        await createLead(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this lead?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteLead(id);
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'blue';
      case 'contacted':
        return 'purple';
      case 'qualified':
        return 'green';
      case 'unqualified':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <Badge color={getStatusColor(record.status)} className="mr-2" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2E1A47] flex items-center justify-center mr-2">
              <UserOutlined />
            </div>
            <span className="text-white">{text}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => (
        <div className="flex items-center">
          <MailOutlined className="mr-2 text-gray-400" />
          <a href={`mailto:${text}`} className="text-gray-300 hover:text-[#00B2C9]">{text}</a>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => text ? (
        <div className="flex items-center">
          <PhoneOutlined className="mr-2 text-gray-400" />
          <a href={`tel:${text}`} className="text-gray-300 hover:text-[#00B2C9]">{text}</a>
        </div>
      ) : '-',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (text: string) => text ? (
        <div className="flex items-center">
          <BankOutlined className="mr-2 text-gray-400" />
          <span>{text}</span>
        </div>
      ) : '-',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (text: string) => (
        <div className="flex items-center">
          <FundOutlined className="mr-2 text-gray-400" />
          <span>{text}</span>
        </div>
      ),
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
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => showModal(record)}>
                Edit
              </Menu.Item>
              <Menu.Item key="convert" icon={<UserOutlined />}>
                Convert to Contact
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
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
      className="leads-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Leads</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Add Lead
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search leads..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredLeads.length} leads found
              </Text>
            </Space>
          </div>

          <Table
            dataSource={filteredLeads}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} leads`
            }}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>

      <Modal
        title={editingLead ? 'Edit Lead' : 'Add New Lead'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingLead ? 'Save Changes' : 'Create Lead'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'new' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the lead name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="John Doe" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the lead email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="john.doe@example.com" />
          </Form.Item>
          
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input prefix={<PhoneOutlined />} placeholder="+1 (555) 123-4567" />
          </Form.Item>
          
          <Form.Item
            name="company"
            label="Company"
          >
            <Input prefix={<BankOutlined />} placeholder="Acme Inc." />
          </Form.Item>
          
          <Form.Item
            name="source"
            label="Lead Source"
            rules={[{ required: true, message: 'Please enter the lead source' }]}
          >
            <Select>
              <Select.Option value="Website">Website</Select.Option>
              <Select.Option value="Referral">Referral</Select.Option>
              <Select.Option value="Social Media">Social Media</Select.Option>
              <Select.Option value="Email Campaign">Email Campaign</Select.Option>
              <Select.Option value="Trade Show">Trade Show</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="new">New</Select.Option>
              <Select.Option value="contacted">Contacted</Select.Option>
              <Select.Option value="qualified">Qualified</Select.Option>
              <Select.Option value="unqualified">Unqualified</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Leads;import React, { useState } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Typography,
  Dropdown,
  Menu,
  Select,
  Badge
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  FundOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text } = Typography;

const Leads: React.FC = () => {
  const { leads, loading, createLead, updateLead, deleteLead } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [form] = Form.useForm();

  // Filter leads based on search text
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchText.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchText.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchText.toLowerCase()))
  );

  const showModal = (lead?: any) => {
    setEditingLead(lead || null);
    if (lead) {
      form.setFieldsValue(lead);
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 'new' });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingLead) {
        await updateLead(editingLead.id, values);
      } else {
        await createLead(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this lead?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteLead(id);
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'blue';
      case 'contacted':
        return 'purple';
      case 'qualified':
        return 'green';
      case 'unqualified':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <Badge color={getStatusColor(record.status)} className="mr-2" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2E1A47] flex items-center justify-center mr-2">
              <UserOutlined />
            </div>
            <span className="text-white">{text}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => (
        <div className="flex items-center">
          <MailOutlined className="mr-2 text-gray-400" />
          <a href={`mailto:${text}`} className="text-gray-300 hover:text-[#00B2C9]">{text}</a>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => text ? (
        <div className="flex items-center">
          <PhoneOutlined className="mr-2 text-gray-400" />
          <a href={`tel:${text}`} className="text-gray-300 hover:text-[#00B2C9]">{text}</a>
        </div>
      ) : '-',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (text: string) => text ? (
        <div className="flex items-center">
          <BankOutlined className="mr-2 text-gray-400" />
          <span>{text}</span>
        </div>
      ) : '-',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (text: string) => (
        <div className="flex items-center">
          <FundOutlined className="mr-2 text-gray-400" />
          <span>{text}</span>
        </div>
      ),
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
      title: 'Actions',
      key: 'actions',
      render: (_, record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => showModal(record)}>
                Edit
              </Menu.Item>
              <Menu.Item key="convert" icon={<UserOutlined />}>
                Convert to Contact
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
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
      className="leads-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Leads</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Add Lead
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search leads..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredLeads.length} leads found
              </Text>
            </Space>
          </div>

          <Table
            dataSource={filteredLeads}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} leads`
            }}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>

      <Modal
        title={editingLead ? 'Edit Lead' : 'Add New Lead'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingLead ? 'Save Changes' : 'Create Lead'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'new' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the lead name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="John Doe" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the lead email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="john.doe@example.com" />
          </Form.Item>
          
          <Form.Item
            name="phone"
            label="Phone"
          >
            <Input prefix={<PhoneOutlined />} placeholder="+1 (555) 123-4567" />
          </Form.Item>
          
          <Form.Item
            name="company"
            label="Company"
          >
            <Input prefix={<BankOutlined />} placeholder="Acme Inc." />
          </Form.Item>
          
          <Form.Item
            name="source"
            label="Lead Source"
            rules={[{ required: true, message: 'Please enter the lead source' }]}
          >
            <Select>
              <Select.Option value="Website">Website</Select.Option>
              <Select.Option value="Referral">Referral</Select.Option>
              <Select.Option value="Social Media">Social Media</Select.Option>
              <Select.Option value="Email Campaign">Email Campaign</Select.Option>
              <Select.Option value="Trade Show">Trade Show</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="new">New</Select.Option>
              <Select.Option value="contacted">Contacted</Select.Option>
              <Select.Option value="qualified">Qualified</Select.Option>
              <Select.Option value="unqualified">Unqualified</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Leads;