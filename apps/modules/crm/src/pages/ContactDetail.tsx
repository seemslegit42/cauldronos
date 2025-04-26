import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Typography, 
  Tabs, 
  Descriptions, 
  Tag, 
  Timeline, 
  Empty, 
  Spin,
  Divider,
  Avatar,
  Space,
  Modal,
  Form,
  Input,
  Select
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  BankOutlined, 
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, deals, loading, updateContact, deleteContact } = useCrmStore();
  const [contact, setContact] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const foundContact = contacts.find(c => c.id === id);
      if (foundContact) {
        setContact(foundContact);
        form.setFieldsValue(foundContact);
      }
    }
  }, [id, contacts, form]);

  if (loading || !contact) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" tip="Loading contact details..." />
      </div>
    );
  }

  // Get deals for this contact
  const contactDeals = deals.filter(deal => deal.contactId === contact.id);

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteContact(contact.id);
        navigate('/modules/crm/contacts');
      }
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateContact(contact.id, values);
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

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

  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'note',
      content: 'Added a new note about upcoming meeting',
      date: '2023-05-15T10:30:00.000Z',
      user: 'John Smith'
    },
    {
      id: '2',
      type: 'email',
      content: 'Sent follow-up email about proposal',
      date: '2023-05-10T14:45:00.000Z',
      user: 'Jane Doe'
    },
    {
      id: '3',
      type: 'call',
      content: 'Had a 30-minute call discussing requirements',
      date: '2023-05-05T09:15:00.000Z',
      user: 'John Smith'
    },
    {
      id: '4',
      type: 'task',
      content: 'Completed task: Send product brochure',
      date: '2023-05-01T16:20:00.000Z',
      user: 'John Smith'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="contact-detail-page"
    >
      <div className="flex items-center mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/modules/crm/contacts')}
          className="mr-4"
        >
          Back to Contacts
        </Button>
        <Title level={2} className="text-white m-0 flex-grow">Contact Details</Title>
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
              <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                className="mb-4 bg-[#2E1A47]"
              />
              <Title level={3} className="text-white text-center m-0">
                {contact.name}
              </Title>
              <Text className="text-gray-400 text-center">
                {contact.title || 'No title'} at {contact.company || 'No company'}
              </Text>
              <Tag 
                color={contact.status === 'active' ? 'green' : 'red'} 
                className="mt-2"
              >
                {contact.status.toUpperCase()}
              </Tag>
            </div>
            
            <div className="md:w-3/4 md:pl-6">
              <Descriptions 
                layout="vertical" 
                column={{ xs: 1, sm: 2, md: 3 }}
                className="contact-details"
              >
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Email</Text>}
                >
                  <div className="flex items-center">
                    <MailOutlined className="mr-2 text-[#00B2C9]" />
                    <a href={`mailto:${contact.email}`} className="text-white hover:text-[#00B2C9]">
                      {contact.email}
                    </a>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Phone</Text>}
                >
                  {contact.phone ? (
                    <div className="flex items-center">
                      <PhoneOutlined className="mr-2 text-[#00B2C9]" />
                      <a href={`tel:${contact.phone}`} className="text-white hover:text-[#00B2C9]">
                        {contact.phone}
                      </a>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No phone number</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Company</Text>}
                >
                  {contact.company ? (
                    <div className="flex items-center">
                      <BankOutlined className="mr-2 text-[#00B2C9]" />
                      <Text className="text-white">{contact.company}</Text>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No company</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Created</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Last Updated</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.updatedAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Deals</Text>}
                >
                  <div className="flex items-center">
                    <ShoppingCartOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">{contactDeals.length} deals</Text>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="deals" className="text-white">
            <TabPane 
              tab={
                <span>
                  <ShoppingCartOutlined /> Deals ({contactDeals.length})
                </span>
              } 
              key="deals"
            >
              {contactDeals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactDeals.map(deal => (
                    <Card 
                      key={deal.id} 
                      className="bg-gray-900 border-gray-700"
                      title={
                        <div className="flex items-center justify-between">
                          <Text className="text-white">{deal.name}</Text>
                          <Tag color={
                            deal.stage === 'closed-won' ? 'green' : 
                            deal.stage === 'closed-lost' ? 'red' : 
                            'blue'
                          }>
                            {deal.stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                          </Tag>
                        </div>
                      }
                    >
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={<Text className="text-gray-400">Value</Text>}>
                          <Text className="text-white">${deal.value.toLocaleString()}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text className="text-gray-400">Probability</Text>}>
                          <Text className="text-white">{deal.probability}%</Text>
                        </Descriptions.Item>
                        {deal.expectedCloseDate && (
                          <Descriptions.Item label={<Text className="text-gray-400">Expected Close</Text>}>
                            <Text className="text-white">
                              {new Date(deal.expectedCloseDate).toLocaleDateString()}
                            </Text>
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Card>
                  ))}
                </div>
              ) : (
                <Empty 
                  description={<Text className="text-gray-400">No deals found for this contact</Text>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <CommentOutlined /> Activity
                </span>
              } 
              key="activity"
            >
              <Timeline className="mt-4">
                {activities.map(activity => (
                  <Timeline.Item 
                    key={activity.id}
                    color={
                      activity.type === 'note' ? 'blue' : 
                      activity.type === 'email' ? 'green' : 
                      activity.type === 'call' ? 'orange' : 
                      'purple'
                    }
                  >
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <Text strong className="text-white">
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Text>
                        <Text className="text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </Text>
                      </div>
                      <Paragraph className="text-gray-300 mt-1">
                        {activity.content}
                      </Paragraph>
                      <Text className="text-gray-400 text-sm">
                        by {activity.user}
                      </Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <FileTextOutlined /> Notes
                </span>
              } 
              key="notes"
            >
              <Empty 
                description={<Text className="text-gray-400">No notes found for this contact</Text>}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title="Edit Contact"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Save Changes"
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
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

export default ContactDetail;import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Typography, 
  Tabs, 
  Descriptions, 
  Tag, 
  Timeline, 
  Empty, 
  Spin,
  Divider,
  Avatar,
  Space,
  Modal,
  Form,
  Input,
  Select
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  BankOutlined, 
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, deals, loading, updateContact, deleteContact } = useCrmStore();
  const [contact, setContact] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const foundContact = contacts.find(c => c.id === id);
      if (foundContact) {
        setContact(foundContact);
        form.setFieldsValue(foundContact);
      }
    }
  }, [id, contacts, form]);

  if (loading || !contact) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" tip="Loading contact details..." />
      </div>
    );
  }

  // Get deals for this contact
  const contactDeals = deals.filter(deal => deal.contactId === contact.id);

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteContact(contact.id);
        navigate('/modules/crm/contacts');
      }
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateContact(contact.id, values);
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

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

  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'note',
      content: 'Added a new note about upcoming meeting',
      date: '2023-05-15T10:30:00.000Z',
      user: 'John Smith'
    },
    {
      id: '2',
      type: 'email',
      content: 'Sent follow-up email about proposal',
      date: '2023-05-10T14:45:00.000Z',
      user: 'Jane Doe'
    },
    {
      id: '3',
      type: 'call',
      content: 'Had a 30-minute call discussing requirements',
      date: '2023-05-05T09:15:00.000Z',
      user: 'John Smith'
    },
    {
      id: '4',
      type: 'task',
      content: 'Completed task: Send product brochure',
      date: '2023-05-01T16:20:00.000Z',
      user: 'John Smith'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="contact-detail-page"
    >
      <div className="flex items-center mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/modules/crm/contacts')}
          className="mr-4"
        >
          Back to Contacts
        </Button>
        <Title level={2} className="text-white m-0 flex-grow">Contact Details</Title>
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
              <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                className="mb-4 bg-[#2E1A47]"
              />
              <Title level={3} className="text-white text-center m-0">
                {contact.name}
              </Title>
              <Text className="text-gray-400 text-center">
                {contact.title || 'No title'} at {contact.company || 'No company'}
              </Text>
              <Tag 
                color={contact.status === 'active' ? 'green' : 'red'} 
                className="mt-2"
              >
                {contact.status.toUpperCase()}
              </Tag>
            </div>
            
            <div className="md:w-3/4 md:pl-6">
              <Descriptions 
                layout="vertical" 
                column={{ xs: 1, sm: 2, md: 3 }}
                className="contact-details"
              >
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Email</Text>}
                >
                  <div className="flex items-center">
                    <MailOutlined className="mr-2 text-[#00B2C9]" />
                    <a href={`mailto:${contact.email}`} className="text-white hover:text-[#00B2C9]">
                      {contact.email}
                    </a>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Phone</Text>}
                >
                  {contact.phone ? (
                    <div className="flex items-center">
                      <PhoneOutlined className="mr-2 text-[#00B2C9]" />
                      <a href={`tel:${contact.phone}`} className="text-white hover:text-[#00B2C9]">
                        {contact.phone}
                      </a>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No phone number</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Company</Text>}
                >
                  {contact.company ? (
                    <div className="flex items-center">
                      <BankOutlined className="mr-2 text-[#00B2C9]" />
                      <Text className="text-white">{contact.company}</Text>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No company</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Created</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Last Updated</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.updatedAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Deals</Text>}
                >
                  <div className="flex items-center">
                    <ShoppingCartOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">{contactDeals.length} deals</Text>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="deals" className="text-white">
            <TabPane 
              tab={
                <span>
                  <ShoppingCartOutlined /> Deals ({contactDeals.length})
                </span>
              } 
              key="deals"
            >
              {contactDeals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactDeals.map(deal => (
                    <Card 
                      key={deal.id} 
                      className="bg-gray-900 border-gray-700"
                      title={
                        <div className="flex items-center justify-between">
                          <Text className="text-white">{deal.name}</Text>
                          <Tag color={
                            deal.stage === 'closed-won' ? 'green' : 
                            deal.stage === 'closed-lost' ? 'red' : 
                            'blue'
                          }>
                            {deal.stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                          </Tag>
                        </div>
                      }
                    >
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={<Text className="text-gray-400">Value</Text>}>
                          <Text className="text-white">${deal.value.toLocaleString()}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text className="text-gray-400">Probability</Text>}>
                          <Text className="text-white">{deal.probability}%</Text>
                        </Descriptions.Item>
                        {deal.expectedCloseDate && (
                          <Descriptions.Item label={<Text className="text-gray-400">Expected Close</Text>}>
                            <Text className="text-white">
                              {new Date(deal.expectedCloseDate).toLocaleDateString()}
                            </Text>
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Card>
                  ))}
                </div>
              ) : (
                <Empty 
                  description={<Text className="text-gray-400">No deals found for this contact</Text>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <CommentOutlined /> Activity
                </span>
              } 
              key="activity"
            >
              <Timeline className="mt-4">
                {activities.map(activity => (
                  <Timeline.Item 
                    key={activity.id}
                    color={
                      activity.type === 'note' ? 'blue' : 
                      activity.type === 'email' ? 'green' : 
                      activity.type === 'call' ? 'orange' : 
                      'purple'
                    }
                  >
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <Text strong className="text-white">
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Text>
                        <Text className="text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </Text>
                      </div>
                      <Paragraph className="text-gray-300 mt-1">
                        {activity.content}
                      </Paragraph>
                      <Text className="text-gray-400 text-sm">
                        by {activity.user}
                      </Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <FileTextOutlined /> Notes
                </span>
              } 
              key="notes"
            >
              <Empty 
                description={<Text className="text-gray-400">No notes found for this contact</Text>}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title="Edit Contact"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Save Changes"
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
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

export default ContactDetail;import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Typography, 
  Tabs, 
  Descriptions, 
  Tag, 
  Timeline, 
  Empty, 
  Spin,
  Divider,
  Avatar,
  Space,
  Modal,
  Form,
  Input,
  Select
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  BankOutlined, 
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, deals, loading, updateContact, deleteContact } = useCrmStore();
  const [contact, setContact] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const foundContact = contacts.find(c => c.id === id);
      if (foundContact) {
        setContact(foundContact);
        form.setFieldsValue(foundContact);
      }
    }
  }, [id, contacts, form]);

  if (loading || !contact) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" tip="Loading contact details..." />
      </div>
    );
  }

  // Get deals for this contact
  const contactDeals = deals.filter(deal => deal.contactId === contact.id);

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteContact(contact.id);
        navigate('/modules/crm/contacts');
      }
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateContact(contact.id, values);
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

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

  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'note',
      content: 'Added a new note about upcoming meeting',
      date: '2023-05-15T10:30:00.000Z',
      user: 'John Smith'
    },
    {
      id: '2',
      type: 'email',
      content: 'Sent follow-up email about proposal',
      date: '2023-05-10T14:45:00.000Z',
      user: 'Jane Doe'
    },
    {
      id: '3',
      type: 'call',
      content: 'Had a 30-minute call discussing requirements',
      date: '2023-05-05T09:15:00.000Z',
      user: 'John Smith'
    },
    {
      id: '4',
      type: 'task',
      content: 'Completed task: Send product brochure',
      date: '2023-05-01T16:20:00.000Z',
      user: 'John Smith'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="contact-detail-page"
    >
      <div className="flex items-center mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/modules/crm/contacts')}
          className="mr-4"
        >
          Back to Contacts
        </Button>
        <Title level={2} className="text-white m-0 flex-grow">Contact Details</Title>
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
              <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                className="mb-4 bg-[#2E1A47]"
              />
              <Title level={3} className="text-white text-center m-0">
                {contact.name}
              </Title>
              <Text className="text-gray-400 text-center">
                {contact.title || 'No title'} at {contact.company || 'No company'}
              </Text>
              <Tag 
                color={contact.status === 'active' ? 'green' : 'red'} 
                className="mt-2"
              >
                {contact.status.toUpperCase()}
              </Tag>
            </div>
            
            <div className="md:w-3/4 md:pl-6">
              <Descriptions 
                layout="vertical" 
                column={{ xs: 1, sm: 2, md: 3 }}
                className="contact-details"
              >
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Email</Text>}
                >
                  <div className="flex items-center">
                    <MailOutlined className="mr-2 text-[#00B2C9]" />
                    <a href={`mailto:${contact.email}`} className="text-white hover:text-[#00B2C9]">
                      {contact.email}
                    </a>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Phone</Text>}
                >
                  {contact.phone ? (
                    <div className="flex items-center">
                      <PhoneOutlined className="mr-2 text-[#00B2C9]" />
                      <a href={`tel:${contact.phone}`} className="text-white hover:text-[#00B2C9]">
                        {contact.phone}
                      </a>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No phone number</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Company</Text>}
                >
                  {contact.company ? (
                    <div className="flex items-center">
                      <BankOutlined className="mr-2 text-[#00B2C9]" />
                      <Text className="text-white">{contact.company}</Text>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No company</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Created</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Last Updated</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.updatedAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Deals</Text>}
                >
                  <div className="flex items-center">
                    <ShoppingCartOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">{contactDeals.length} deals</Text>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="deals" className="text-white">
            <TabPane 
              tab={
                <span>
                  <ShoppingCartOutlined /> Deals ({contactDeals.length})
                </span>
              } 
              key="deals"
            >
              {contactDeals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactDeals.map(deal => (
                    <Card 
                      key={deal.id} 
                      className="bg-gray-900 border-gray-700"
                      title={
                        <div className="flex items-center justify-between">
                          <Text className="text-white">{deal.name}</Text>
                          <Tag color={
                            deal.stage === 'closed-won' ? 'green' : 
                            deal.stage === 'closed-lost' ? 'red' : 
                            'blue'
                          }>
                            {deal.stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                          </Tag>
                        </div>
                      }
                    >
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={<Text className="text-gray-400">Value</Text>}>
                          <Text className="text-white">${deal.value.toLocaleString()}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text className="text-gray-400">Probability</Text>}>
                          <Text className="text-white">{deal.probability}%</Text>
                        </Descriptions.Item>
                        {deal.expectedCloseDate && (
                          <Descriptions.Item label={<Text className="text-gray-400">Expected Close</Text>}>
                            <Text className="text-white">
                              {new Date(deal.expectedCloseDate).toLocaleDateString()}
                            </Text>
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Card>
                  ))}
                </div>
              ) : (
                <Empty 
                  description={<Text className="text-gray-400">No deals found for this contact</Text>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <CommentOutlined /> Activity
                </span>
              } 
              key="activity"
            >
              <Timeline className="mt-4">
                {activities.map(activity => (
                  <Timeline.Item 
                    key={activity.id}
                    color={
                      activity.type === 'note' ? 'blue' : 
                      activity.type === 'email' ? 'green' : 
                      activity.type === 'call' ? 'orange' : 
                      'purple'
                    }
                  >
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <Text strong className="text-white">
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Text>
                        <Text className="text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </Text>
                      </div>
                      <Paragraph className="text-gray-300 mt-1">
                        {activity.content}
                      </Paragraph>
                      <Text className="text-gray-400 text-sm">
                        by {activity.user}
                      </Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <FileTextOutlined /> Notes
                </span>
              } 
              key="notes"
            >
              <Empty 
                description={<Text className="text-gray-400">No notes found for this contact</Text>}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title="Edit Contact"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Save Changes"
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
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

export default ContactDetail;import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Typography, 
  Tabs, 
  Descriptions, 
  Tag, 
  Timeline, 
  Empty, 
  Spin,
  Divider,
  Avatar,
  Space,
  Modal,
  Form,
  Input,
  Select
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  BankOutlined, 
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, deals, loading, updateContact, deleteContact } = useCrmStore();
  const [contact, setContact] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const foundContact = contacts.find(c => c.id === id);
      if (foundContact) {
        setContact(foundContact);
        form.setFieldsValue(foundContact);
      }
    }
  }, [id, contacts, form]);

  if (loading || !contact) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" tip="Loading contact details..." />
      </div>
    );
  }

  // Get deals for this contact
  const contactDeals = deals.filter(deal => deal.contactId === contact.id);

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteContact(contact.id);
        navigate('/modules/crm/contacts');
      }
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateContact(contact.id, values);
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

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

  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'note',
      content: 'Added a new note about upcoming meeting',
      date: '2023-05-15T10:30:00.000Z',
      user: 'John Smith'
    },
    {
      id: '2',
      type: 'email',
      content: 'Sent follow-up email about proposal',
      date: '2023-05-10T14:45:00.000Z',
      user: 'Jane Doe'
    },
    {
      id: '3',
      type: 'call',
      content: 'Had a 30-minute call discussing requirements',
      date: '2023-05-05T09:15:00.000Z',
      user: 'John Smith'
    },
    {
      id: '4',
      type: 'task',
      content: 'Completed task: Send product brochure',
      date: '2023-05-01T16:20:00.000Z',
      user: 'John Smith'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="contact-detail-page"
    >
      <div className="flex items-center mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/modules/crm/contacts')}
          className="mr-4"
        >
          Back to Contacts
        </Button>
        <Title level={2} className="text-white m-0 flex-grow">Contact Details</Title>
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
              <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                className="mb-4 bg-[#2E1A47]"
              />
              <Title level={3} className="text-white text-center m-0">
                {contact.name}
              </Title>
              <Text className="text-gray-400 text-center">
                {contact.title || 'No title'} at {contact.company || 'No company'}
              </Text>
              <Tag 
                color={contact.status === 'active' ? 'green' : 'red'} 
                className="mt-2"
              >
                {contact.status.toUpperCase()}
              </Tag>
            </div>
            
            <div className="md:w-3/4 md:pl-6">
              <Descriptions 
                layout="vertical" 
                column={{ xs: 1, sm: 2, md: 3 }}
                className="contact-details"
              >
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Email</Text>}
                >
                  <div className="flex items-center">
                    <MailOutlined className="mr-2 text-[#00B2C9]" />
                    <a href={`mailto:${contact.email}`} className="text-white hover:text-[#00B2C9]">
                      {contact.email}
                    </a>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Phone</Text>}
                >
                  {contact.phone ? (
                    <div className="flex items-center">
                      <PhoneOutlined className="mr-2 text-[#00B2C9]" />
                      <a href={`tel:${contact.phone}`} className="text-white hover:text-[#00B2C9]">
                        {contact.phone}
                      </a>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No phone number</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Company</Text>}
                >
                  {contact.company ? (
                    <div className="flex items-center">
                      <BankOutlined className="mr-2 text-[#00B2C9]" />
                      <Text className="text-white">{contact.company}</Text>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No company</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Created</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Last Updated</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.updatedAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Deals</Text>}
                >
                  <div className="flex items-center">
                    <ShoppingCartOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">{contactDeals.length} deals</Text>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="deals" className="text-white">
            <TabPane 
              tab={
                <span>
                  <ShoppingCartOutlined /> Deals ({contactDeals.length})
                </span>
              } 
              key="deals"
            >
              {contactDeals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactDeals.map(deal => (
                    <Card 
                      key={deal.id} 
                      className="bg-gray-900 border-gray-700"
                      title={
                        <div className="flex items-center justify-between">
                          <Text className="text-white">{deal.name}</Text>
                          <Tag color={
                            deal.stage === 'closed-won' ? 'green' : 
                            deal.stage === 'closed-lost' ? 'red' : 
                            'blue'
                          }>
                            {deal.stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                          </Tag>
                        </div>
                      }
                    >
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={<Text className="text-gray-400">Value</Text>}>
                          <Text className="text-white">${deal.value.toLocaleString()}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text className="text-gray-400">Probability</Text>}>
                          <Text className="text-white">{deal.probability}%</Text>
                        </Descriptions.Item>
                        {deal.expectedCloseDate && (
                          <Descriptions.Item label={<Text className="text-gray-400">Expected Close</Text>}>
                            <Text className="text-white">
                              {new Date(deal.expectedCloseDate).toLocaleDateString()}
                            </Text>
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Card>
                  ))}
                </div>
              ) : (
                <Empty 
                  description={<Text className="text-gray-400">No deals found for this contact</Text>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <CommentOutlined /> Activity
                </span>
              } 
              key="activity"
            >
              <Timeline className="mt-4">
                {activities.map(activity => (
                  <Timeline.Item 
                    key={activity.id}
                    color={
                      activity.type === 'note' ? 'blue' : 
                      activity.type === 'email' ? 'green' : 
                      activity.type === 'call' ? 'orange' : 
                      'purple'
                    }
                  >
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <Text strong className="text-white">
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Text>
                        <Text className="text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </Text>
                      </div>
                      <Paragraph className="text-gray-300 mt-1">
                        {activity.content}
                      </Paragraph>
                      <Text className="text-gray-400 text-sm">
                        by {activity.user}
                      </Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <FileTextOutlined /> Notes
                </span>
              } 
              key="notes"
            >
              <Empty 
                description={<Text className="text-gray-400">No notes found for this contact</Text>}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title="Edit Contact"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Save Changes"
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
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

export default ContactDetail;import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Typography, 
  Tabs, 
  Descriptions, 
  Tag, 
  Timeline, 
  Empty, 
  Spin,
  Divider,
  Avatar,
  Space,
  Modal,
  Form,
  Input,
  Select
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  BankOutlined, 
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, deals, loading, updateContact, deleteContact } = useCrmStore();
  const [contact, setContact] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const foundContact = contacts.find(c => c.id === id);
      if (foundContact) {
        setContact(foundContact);
        form.setFieldsValue(foundContact);
      }
    }
  }, [id, contacts, form]);

  if (loading || !contact) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" tip="Loading contact details..." />
      </div>
    );
  }

  // Get deals for this contact
  const contactDeals = deals.filter(deal => deal.contactId === contact.id);

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteContact(contact.id);
        navigate('/modules/crm/contacts');
      }
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateContact(contact.id, values);
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

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

  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'note',
      content: 'Added a new note about upcoming meeting',
      date: '2023-05-15T10:30:00.000Z',
      user: 'John Smith'
    },
    {
      id: '2',
      type: 'email',
      content: 'Sent follow-up email about proposal',
      date: '2023-05-10T14:45:00.000Z',
      user: 'Jane Doe'
    },
    {
      id: '3',
      type: 'call',
      content: 'Had a 30-minute call discussing requirements',
      date: '2023-05-05T09:15:00.000Z',
      user: 'John Smith'
    },
    {
      id: '4',
      type: 'task',
      content: 'Completed task: Send product brochure',
      date: '2023-05-01T16:20:00.000Z',
      user: 'John Smith'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="contact-detail-page"
    >
      <div className="flex items-center mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/modules/crm/contacts')}
          className="mr-4"
        >
          Back to Contacts
        </Button>
        <Title level={2} className="text-white m-0 flex-grow">Contact Details</Title>
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
              <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                className="mb-4 bg-[#2E1A47]"
              />
              <Title level={3} className="text-white text-center m-0">
                {contact.name}
              </Title>
              <Text className="text-gray-400 text-center">
                {contact.title || 'No title'} at {contact.company || 'No company'}
              </Text>
              <Tag 
                color={contact.status === 'active' ? 'green' : 'red'} 
                className="mt-2"
              >
                {contact.status.toUpperCase()}
              </Tag>
            </div>
            
            <div className="md:w-3/4 md:pl-6">
              <Descriptions 
                layout="vertical" 
                column={{ xs: 1, sm: 2, md: 3 }}
                className="contact-details"
              >
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Email</Text>}
                >
                  <div className="flex items-center">
                    <MailOutlined className="mr-2 text-[#00B2C9]" />
                    <a href={`mailto:${contact.email}`} className="text-white hover:text-[#00B2C9]">
                      {contact.email}
                    </a>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Phone</Text>}
                >
                  {contact.phone ? (
                    <div className="flex items-center">
                      <PhoneOutlined className="mr-2 text-[#00B2C9]" />
                      <a href={`tel:${contact.phone}`} className="text-white hover:text-[#00B2C9]">
                        {contact.phone}
                      </a>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No phone number</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Company</Text>}
                >
                  {contact.company ? (
                    <div className="flex items-center">
                      <BankOutlined className="mr-2 text-[#00B2C9]" />
                      <Text className="text-white">{contact.company}</Text>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No company</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Created</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Last Updated</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.updatedAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Deals</Text>}
                >
                  <div className="flex items-center">
                    <ShoppingCartOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">{contactDeals.length} deals</Text>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="deals" className="text-white">
            <TabPane 
              tab={
                <span>
                  <ShoppingCartOutlined /> Deals ({contactDeals.length})
                </span>
              } 
              key="deals"
            >
              {contactDeals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactDeals.map(deal => (
                    <Card 
                      key={deal.id} 
                      className="bg-gray-900 border-gray-700"
                      title={
                        <div className="flex items-center justify-between">
                          <Text className="text-white">{deal.name}</Text>
                          <Tag color={
                            deal.stage === 'closed-won' ? 'green' : 
                            deal.stage === 'closed-lost' ? 'red' : 
                            'blue'
                          }>
                            {deal.stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                          </Tag>
                        </div>
                      }
                    >
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={<Text className="text-gray-400">Value</Text>}>
                          <Text className="text-white">${deal.value.toLocaleString()}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text className="text-gray-400">Probability</Text>}>
                          <Text className="text-white">{deal.probability}%</Text>
                        </Descriptions.Item>
                        {deal.expectedCloseDate && (
                          <Descriptions.Item label={<Text className="text-gray-400">Expected Close</Text>}>
                            <Text className="text-white">
                              {new Date(deal.expectedCloseDate).toLocaleDateString()}
                            </Text>
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Card>
                  ))}
                </div>
              ) : (
                <Empty 
                  description={<Text className="text-gray-400">No deals found for this contact</Text>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <CommentOutlined /> Activity
                </span>
              } 
              key="activity"
            >
              <Timeline className="mt-4">
                {activities.map(activity => (
                  <Timeline.Item 
                    key={activity.id}
                    color={
                      activity.type === 'note' ? 'blue' : 
                      activity.type === 'email' ? 'green' : 
                      activity.type === 'call' ? 'orange' : 
                      'purple'
                    }
                  >
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <Text strong className="text-white">
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Text>
                        <Text className="text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </Text>
                      </div>
                      <Paragraph className="text-gray-300 mt-1">
                        {activity.content}
                      </Paragraph>
                      <Text className="text-gray-400 text-sm">
                        by {activity.user}
                      </Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <FileTextOutlined /> Notes
                </span>
              } 
              key="notes"
            >
              <Empty 
                description={<Text className="text-gray-400">No notes found for this contact</Text>}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title="Edit Contact"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Save Changes"
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
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

export default ContactDetail;import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Typography, 
  Tabs, 
  Descriptions, 
  Tag, 
  Timeline, 
  Empty, 
  Spin,
  Divider,
  Avatar,
  Space,
  Modal,
  Form,
  Input,
  Select
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  BankOutlined, 
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  CalendarOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contacts, deals, loading, updateContact, deleteContact } = useCrmStore();
  const [contact, setContact] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const foundContact = contacts.find(c => c.id === id);
      if (foundContact) {
        setContact(foundContact);
        form.setFieldsValue(foundContact);
      }
    }
  }, [id, contacts, form]);

  if (loading || !contact) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" tip="Loading contact details..." />
      </div>
    );
  }

  // Get deals for this contact
  const contactDeals = deals.filter(deal => deal.contactId === contact.id);

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this contact?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteContact(contact.id);
        navigate('/modules/crm/contacts');
      }
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateContact(contact.id, values);
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

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

  // Mock activity data
  const activities = [
    {
      id: '1',
      type: 'note',
      content: 'Added a new note about upcoming meeting',
      date: '2023-05-15T10:30:00.000Z',
      user: 'John Smith'
    },
    {
      id: '2',
      type: 'email',
      content: 'Sent follow-up email about proposal',
      date: '2023-05-10T14:45:00.000Z',
      user: 'Jane Doe'
    },
    {
      id: '3',
      type: 'call',
      content: 'Had a 30-minute call discussing requirements',
      date: '2023-05-05T09:15:00.000Z',
      user: 'John Smith'
    },
    {
      id: '4',
      type: 'task',
      content: 'Completed task: Send product brochure',
      date: '2023-05-01T16:20:00.000Z',
      user: 'John Smith'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="contact-detail-page"
    >
      <div className="flex items-center mb-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/modules/crm/contacts')}
          className="mr-4"
        >
          Back to Contacts
        </Button>
        <Title level={2} className="text-white m-0 flex-grow">Contact Details</Title>
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
              <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                className="mb-4 bg-[#2E1A47]"
              />
              <Title level={3} className="text-white text-center m-0">
                {contact.name}
              </Title>
              <Text className="text-gray-400 text-center">
                {contact.title || 'No title'} at {contact.company || 'No company'}
              </Text>
              <Tag 
                color={contact.status === 'active' ? 'green' : 'red'} 
                className="mt-2"
              >
                {contact.status.toUpperCase()}
              </Tag>
            </div>
            
            <div className="md:w-3/4 md:pl-6">
              <Descriptions 
                layout="vertical" 
                column={{ xs: 1, sm: 2, md: 3 }}
                className="contact-details"
              >
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Email</Text>}
                >
                  <div className="flex items-center">
                    <MailOutlined className="mr-2 text-[#00B2C9]" />
                    <a href={`mailto:${contact.email}`} className="text-white hover:text-[#00B2C9]">
                      {contact.email}
                    </a>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Phone</Text>}
                >
                  {contact.phone ? (
                    <div className="flex items-center">
                      <PhoneOutlined className="mr-2 text-[#00B2C9]" />
                      <a href={`tel:${contact.phone}`} className="text-white hover:text-[#00B2C9]">
                        {contact.phone}
                      </a>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No phone number</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Company</Text>}
                >
                  {contact.company ? (
                    <div className="flex items-center">
                      <BankOutlined className="mr-2 text-[#00B2C9]" />
                      <Text className="text-white">{contact.company}</Text>
                    </div>
                  ) : (
                    <Text className="text-gray-500">No company</Text>
                  )}
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Created</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Last Updated</Text>}
                >
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">
                      {new Date(contact.updatedAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Descriptions.Item>
                
                <Descriptions.Item 
                  label={<Text className="text-gray-400">Deals</Text>}
                >
                  <div className="flex items-center">
                    <ShoppingCartOutlined className="mr-2 text-[#00B2C9]" />
                    <Text className="text-white">{contactDeals.length} deals</Text>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <Tabs defaultActiveKey="deals" className="text-white">
            <TabPane 
              tab={
                <span>
                  <ShoppingCartOutlined /> Deals ({contactDeals.length})
                </span>
              } 
              key="deals"
            >
              {contactDeals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactDeals.map(deal => (
                    <Card 
                      key={deal.id} 
                      className="bg-gray-900 border-gray-700"
                      title={
                        <div className="flex items-center justify-between">
                          <Text className="text-white">{deal.name}</Text>
                          <Tag color={
                            deal.stage === 'closed-won' ? 'green' : 
                            deal.stage === 'closed-lost' ? 'red' : 
                            'blue'
                          }>
                            {deal.stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                          </Tag>
                        </div>
                      }
                    >
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label={<Text className="text-gray-400">Value</Text>}>
                          <Text className="text-white">${deal.value.toLocaleString()}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<Text className="text-gray-400">Probability</Text>}>
                          <Text className="text-white">{deal.probability}%</Text>
                        </Descriptions.Item>
                        {deal.expectedCloseDate && (
                          <Descriptions.Item label={<Text className="text-gray-400">Expected Close</Text>}>
                            <Text className="text-white">
                              {new Date(deal.expectedCloseDate).toLocaleDateString()}
                            </Text>
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Card>
                  ))}
                </div>
              ) : (
                <Empty 
                  description={<Text className="text-gray-400">No deals found for this contact</Text>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <CommentOutlined /> Activity
                </span>
              } 
              key="activity"
            >
              <Timeline className="mt-4">
                {activities.map(activity => (
                  <Timeline.Item 
                    key={activity.id}
                    color={
                      activity.type === 'note' ? 'blue' : 
                      activity.type === 'email' ? 'green' : 
                      activity.type === 'call' ? 'orange' : 
                      'purple'
                    }
                  >
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <Text strong className="text-white">
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </Text>
                        <Text className="text-gray-400">
                          {new Date(activity.date).toLocaleDateString()}
                        </Text>
                      </div>
                      <Paragraph className="text-gray-300 mt-1">
                        {activity.content}
                      </Paragraph>
                      <Text className="text-gray-400 text-sm">
                        by {activity.user}
                      </Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <FileTextOutlined /> Notes
                </span>
              } 
              key="notes"
            >
              <Empty 
                description={<Text className="text-gray-400">No notes found for this contact</Text>}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </TabPane>
          </Tabs>
        </Card>
      </motion.div>

      <Modal
        title="Edit Contact"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Save Changes"
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
      >
        <Form
          form={form}
          layout="vertical"
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

export default ContactDetail;