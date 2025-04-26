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
  Select
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
  TeamOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Contacts: React.FC = () => {
  const { contacts, loading, createContact, updateContact, deleteContact } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [form] = Form.useForm();

  // Filter contacts based on search text
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchText.toLowerCase()) ||
    (contact.company && contact.company.toLowerCase().includes(searchText.toLowerCase()))
  );

  const showModal = (contact?: any) => {
    setEditingContact(contact || null);
    if (contact) {
      form.setFieldsValue(contact);
    } else {
      form.resetFields();
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
      
      if (editingContact) {
        await updateContact(editingContact.id, values);
      } else {
        await createContact(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteContact(id);
      }
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Link to={`/modules/crm/contacts/${record.id}`} className="text-[#00B2C9] hover:text-[#00D9F5]">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2E1A47] flex items-center justify-center mr-2">
              <UserOutlined />
            </div>
            {text}
          </div>
        </Link>
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => text ? (
        <div className="flex items-center">
          <TeamOutlined className="mr-2 text-gray-400" />
          <span>{text}</span>
        </div>
      ) : '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
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
      className="contacts-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Contacts</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Add Contact
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search contacts..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredContacts.length} contacts found
              </Text>
            </Space>
          </div>

          <Table
            dataSource={filteredContacts}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} contacts`
            }}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>

      <Modal
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingContact ? 'Save Changes' : 'Create Contact'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the contact name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="John Doe" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the contact email' },
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
            name="title"
            label="Job Title"
          >
            <Input prefix={<TeamOutlined />} placeholder="CEO" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Contacts;import React, { useState } from 'react';
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
  Select
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
  TeamOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Contacts: React.FC = () => {
  const { contacts, loading, createContact, updateContact, deleteContact } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [form] = Form.useForm();

  // Filter contacts based on search text
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchText.toLowerCase()) ||
    (contact.company && contact.company.toLowerCase().includes(searchText.toLowerCase()))
  );

  const showModal = (contact?: any) => {
    setEditingContact(contact || null);
    if (contact) {
      form.setFieldsValue(contact);
    } else {
      form.resetFields();
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
      
      if (editingContact) {
        await updateContact(editingContact.id, values);
      } else {
        await createContact(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteContact(id);
      }
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Link to={`/modules/crm/contacts/${record.id}`} className="text-[#00B2C9] hover:text-[#00D9F5]">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2E1A47] flex items-center justify-center mr-2">
              <UserOutlined />
            </div>
            {text}
          </div>
        </Link>
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => text ? (
        <div className="flex items-center">
          <TeamOutlined className="mr-2 text-gray-400" />
          <span>{text}</span>
        </div>
      ) : '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
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
      className="contacts-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Contacts</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Add Contact
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search contacts..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredContacts.length} contacts found
              </Text>
            </Space>
          </div>

          <Table
            dataSource={filteredContacts}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} contacts`
            }}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>

      <Modal
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingContact ? 'Save Changes' : 'Create Contact'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the contact name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="John Doe" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the contact email' },
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
            name="title"
            label="Job Title"
          >
            <Input prefix={<TeamOutlined />} placeholder="CEO" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Contacts;import React, { useState } from 'react';
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
  Select
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
  TeamOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Contacts: React.FC = () => {
  const { contacts, loading, createContact, updateContact, deleteContact } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [form] = Form.useForm();

  // Filter contacts based on search text
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchText.toLowerCase()) ||
    (contact.company && contact.company.toLowerCase().includes(searchText.toLowerCase()))
  );

  const showModal = (contact?: any) => {
    setEditingContact(contact || null);
    if (contact) {
      form.setFieldsValue(contact);
    } else {
      form.resetFields();
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
      
      if (editingContact) {
        await updateContact(editingContact.id, values);
      } else {
        await createContact(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteContact(id);
      }
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Link to={`/modules/crm/contacts/${record.id}`} className="text-[#00B2C9] hover:text-[#00D9F5]">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2E1A47] flex items-center justify-center mr-2">
              <UserOutlined />
            </div>
            {text}
          </div>
        </Link>
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => text ? (
        <div className="flex items-center">
          <TeamOutlined className="mr-2 text-gray-400" />
          <span>{text}</span>
        </div>
      ) : '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
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
      className="contacts-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Contacts</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
          className="bg-[#00B67F] hover:bg-[#00A070]"
        >
          Add Contact
        </Button>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search contacts..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredContacts.length} contacts found
              </Text>
            </Space>
          </div>

          <Table
            dataSource={filteredContacts}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} contacts`
            }}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>

      <Modal
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingContact ? 'Save Changes' : 'Create Contact'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the contact name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="John Doe" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the contact email' },
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
            name="title"
            label="Job Title"
          >
            <Input prefix={<TeamOutlined />} placeholder="CEO" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Contacts;