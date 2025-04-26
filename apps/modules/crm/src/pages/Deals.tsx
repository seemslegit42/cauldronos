import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Input, 
  Space, 
  Modal, 
  Form, 
  Select,
  DatePicker,
  InputNumber,
  Tabs,
  Tag,
  Progress,
  Dropdown,
  Menu
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Deals: React.FC = () => {
  const { deals, contacts, loading, createDeal, updateDeal, deleteDeal } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDeal, setEditingDeal] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [form] = Form.useForm();

  // Filter deals based on search text
  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (deal?: any) => {
    setEditingDeal(deal || null);
    if (deal) {
      form.setFieldsValue({
        ...deal,
        expectedCloseDate: deal.expectedCloseDate ? new Date(deal.expectedCloseDate) : undefined
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ 
        stage: 'prospecting',
        probability: 10
      });
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
      
      if (editingDeal) {
        await updateDeal(editingDeal.id, values);
      } else {
        await createDeal(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this deal?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteDeal(id);
      }
    });
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'blue';
      case 'qualification':
        return 'purple';
      case 'proposal':
        return 'cyan';
      case 'negotiation':
        return 'orange';
      case 'closed-won':
        return 'green';
      case 'closed-lost':
        return 'red';
      default:
        return 'default';
    }
  };

  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? contact.name : 'Unknown Contact';
  };

  // Group deals by stage for kanban view
  const dealsByStage = {
    prospecting: filteredDeals.filter(d => d.stage === 'prospecting'),
    qualification: filteredDeals.filter(d => d.stage === 'qualification'),
    proposal: filteredDeals.filter(d => d.stage === 'proposal'),
    negotiation: filteredDeals.filter(d => d.stage === 'negotiation'),
    'closed-won': filteredDeals.filter(d => d.stage === 'closed-won'),
    'closed-lost': filteredDeals.filter(d => d.stage === 'closed-lost')
  };

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const newStage = destination.droppableId;
    
    // Update deal stage
    updateDeal(draggableId, { 
      stage: newStage,
      // Update probability based on stage
      probability: newStage === 'closed-won' ? 100 : 
                  newStage === 'closed-lost' ? 0 :
                  newStage === 'negotiation' ? 70 :
                  newStage === 'proposal' ? 50 :
                  newStage === 'qualification' ? 30 : 10
    });
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

  // Render deal card
  const renderDealCard = (deal: any) => (
    <Card 
      key={deal.id}
      className="mb-3 bg-gray-900 border-gray-700 shadow hover:shadow-md transition-shadow"
      bodyStyle={{ padding: '12px' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <Text strong className="text-white block mb-1">
            {deal.name}
          </Text>
          <Text className="text-gray-400 block mb-1">
            <UserOutlined className="mr-1" /> {getContactName(deal.contactId)}
          </Text>
          <Text className="text-[#00B2C9] block mb-2">
            <DollarOutlined className="mr-1" /> ${deal.value.toLocaleString()}
          </Text>
          {deal.expectedCloseDate && (
            <Text className="text-gray-400 block text-xs">
              <CalendarOutlined className="mr-1" /> 
              Expected close: {new Date(deal.expectedCloseDate).toLocaleDateString()}
            </Text>
          )}
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => showModal(deal)}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => handleDelete(deal.id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" size="small" icon={<MoreOutlined />} />
        </Dropdown>
      </div>
      <Progress 
        percent={deal.probability} 
        size="small" 
        status={
          deal.stage === 'closed-won' ? 'success' : 
          deal.stage === 'closed-lost' ? 'exception' : 
          'active'
        }
        strokeColor={{
          '0%': '#00B67F',
          '100%': '#00B2C9',
        }}
      />
    </Card>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="deals-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Deals</Title>
        <Space>
          <Button 
            onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
          >
            {viewMode === 'kanban' ? 'List View' : 'Kanban View'}
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            className="bg-[#00B67F] hover:bg-[#00A070]"
          >
            Add Deal
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search deals..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredDeals.length} deals • Total value: ${filteredDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
              </Text>
            </Space>
          </div>

          {viewMode === 'kanban' ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(dealsByStage).map(([stage, stageDeals]) => (
                  <div key={stage} className="kanban-column">
                    <div className="mb-3 flex justify-between items-center">
                      <Tag color={getStageColor(stage)} className="text-sm py-1 px-2">
                        {stage.replace('-', ' ').toUpperCase()}
                      </Tag>
                      <Text className="text-gray-400 text-sm">
                        {stageDeals.length} • ${stageDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
                      </Text>
                    </div>
                    <Droppable droppableId={stage}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="kanban-deals min-h-[200px]"
                        >
                          {stageDeals.map((deal, index) => (
                            <Draggable key={deal.id} draggableId={deal.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {renderDealCard(deal)}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          ) : (
            <Tabs defaultActiveKey="all" className="deals-tabs">
              <TabPane tab="All Deals" key="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
              <TabPane tab="My Deals" key="my">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.slice(0, 2).map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
              <TabPane tab="Closing This Month" key="closing">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.filter(deal => 
                    deal.expectedCloseDate && 
                    new Date(deal.expectedCloseDate).getMonth() === new Date().getMonth()
                  ).map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
            </Tabs>
          )}
        </Card>
      </motion.div>

      <Modal
        title={editingDeal ? 'Edit Deal' : 'Add New Deal'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingDeal ? 'Save Changes' : 'Create Deal'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ 
            stage: 'prospecting',
            probability: 10
          }}
        >
          <Form.Item
            name="name"
            label="Deal Name"
            rules={[{ required: true, message: 'Please enter the deal name' }]}
          >
            <Input prefix={<ShoppingCartOutlined />} placeholder="Enterprise Software License" />
          </Form.Item>
          
          <Form.Item
            name="value"
            label="Deal Value"
            rules={[{ required: true, message: 'Please enter the deal value' }]}
          >
            <InputNumber
              prefix="$"
              min={0}
              step={1000}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              placeholder="10,000"
            />
          </Form.Item>
          
          <Form.Item
            name="contactId"
            label="Contact"
            rules={[{ required: true, message: 'Please select a contact' }]}
          >
            <Select placeholder="Select a contact">
              {contacts.map(contact => (
                <Select.Option key={contact.id} value={contact.id}>
                  {contact.name} {contact.company ? `(${contact.company})` : ''}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="stage"
              label="Stage"
              rules={[{ required: true, message: 'Please select a stage' }]}
            >
              <Select>
                <Select.Option value="prospecting">Prospecting</Select.Option>
                <Select.Option value="qualification">Qualification</Select.Option>
                <Select.Option value="proposal">Proposal</Select.Option>
                <Select.Option value="negotiation">Negotiation</Select.Option>
                <Select.Option value="closed-won">Closed Won</Select.Option>
                <Select.Option value="closed-lost">Closed Lost</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="probability"
              label="Probability (%)"
              rules={[{ required: true, message: 'Please enter the probability' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
          </div>
          
          <Form.Item
            name="expectedCloseDate"
            label="Expected Close Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Deals;import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Input, 
  Space, 
  Modal, 
  Form, 
  Select,
  DatePicker,
  InputNumber,
  Tabs,
  Tag,
  Progress,
  Dropdown,
  Menu
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Deals: React.FC = () => {
  const { deals, contacts, loading, createDeal, updateDeal, deleteDeal } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDeal, setEditingDeal] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [form] = Form.useForm();

  // Filter deals based on search text
  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (deal?: any) => {
    setEditingDeal(deal || null);
    if (deal) {
      form.setFieldsValue({
        ...deal,
        expectedCloseDate: deal.expectedCloseDate ? new Date(deal.expectedCloseDate) : undefined
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ 
        stage: 'prospecting',
        probability: 10
      });
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
      
      if (editingDeal) {
        await updateDeal(editingDeal.id, values);
      } else {
        await createDeal(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this deal?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteDeal(id);
      }
    });
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'blue';
      case 'qualification':
        return 'purple';
      case 'proposal':
        return 'cyan';
      case 'negotiation':
        return 'orange';
      case 'closed-won':
        return 'green';
      case 'closed-lost':
        return 'red';
      default:
        return 'default';
    }
  };

  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? contact.name : 'Unknown Contact';
  };

  // Group deals by stage for kanban view
  const dealsByStage = {
    prospecting: filteredDeals.filter(d => d.stage === 'prospecting'),
    qualification: filteredDeals.filter(d => d.stage === 'qualification'),
    proposal: filteredDeals.filter(d => d.stage === 'proposal'),
    negotiation: filteredDeals.filter(d => d.stage === 'negotiation'),
    'closed-won': filteredDeals.filter(d => d.stage === 'closed-won'),
    'closed-lost': filteredDeals.filter(d => d.stage === 'closed-lost')
  };

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const newStage = destination.droppableId;
    
    // Update deal stage
    updateDeal(draggableId, { 
      stage: newStage,
      // Update probability based on stage
      probability: newStage === 'closed-won' ? 100 : 
                  newStage === 'closed-lost' ? 0 :
                  newStage === 'negotiation' ? 70 :
                  newStage === 'proposal' ? 50 :
                  newStage === 'qualification' ? 30 : 10
    });
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

  // Render deal card
  const renderDealCard = (deal: any) => (
    <Card 
      key={deal.id}
      className="mb-3 bg-gray-900 border-gray-700 shadow hover:shadow-md transition-shadow"
      bodyStyle={{ padding: '12px' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <Text strong className="text-white block mb-1">
            {deal.name}
          </Text>
          <Text className="text-gray-400 block mb-1">
            <UserOutlined className="mr-1" /> {getContactName(deal.contactId)}
          </Text>
          <Text className="text-[#00B2C9] block mb-2">
            <DollarOutlined className="mr-1" /> ${deal.value.toLocaleString()}
          </Text>
          {deal.expectedCloseDate && (
            <Text className="text-gray-400 block text-xs">
              <CalendarOutlined className="mr-1" /> 
              Expected close: {new Date(deal.expectedCloseDate).toLocaleDateString()}
            </Text>
          )}
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => showModal(deal)}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => handleDelete(deal.id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" size="small" icon={<MoreOutlined />} />
        </Dropdown>
      </div>
      <Progress 
        percent={deal.probability} 
        size="small" 
        status={
          deal.stage === 'closed-won' ? 'success' : 
          deal.stage === 'closed-lost' ? 'exception' : 
          'active'
        }
        strokeColor={{
          '0%': '#00B67F',
          '100%': '#00B2C9',
        }}
      />
    </Card>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="deals-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Deals</Title>
        <Space>
          <Button 
            onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
          >
            {viewMode === 'kanban' ? 'List View' : 'Kanban View'}
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            className="bg-[#00B67F] hover:bg-[#00A070]"
          >
            Add Deal
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search deals..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredDeals.length} deals • Total value: ${filteredDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
              </Text>
            </Space>
          </div>

          {viewMode === 'kanban' ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(dealsByStage).map(([stage, stageDeals]) => (
                  <div key={stage} className="kanban-column">
                    <div className="mb-3 flex justify-between items-center">
                      <Tag color={getStageColor(stage)} className="text-sm py-1 px-2">
                        {stage.replace('-', ' ').toUpperCase()}
                      </Tag>
                      <Text className="text-gray-400 text-sm">
                        {stageDeals.length} • ${stageDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
                      </Text>
                    </div>
                    <Droppable droppableId={stage}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="kanban-deals min-h-[200px]"
                        >
                          {stageDeals.map((deal, index) => (
                            <Draggable key={deal.id} draggableId={deal.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {renderDealCard(deal)}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          ) : (
            <Tabs defaultActiveKey="all" className="deals-tabs">
              <TabPane tab="All Deals" key="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
              <TabPane tab="My Deals" key="my">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.slice(0, 2).map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
              <TabPane tab="Closing This Month" key="closing">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.filter(deal => 
                    deal.expectedCloseDate && 
                    new Date(deal.expectedCloseDate).getMonth() === new Date().getMonth()
                  ).map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
            </Tabs>
          )}
        </Card>
      </motion.div>

      <Modal
        title={editingDeal ? 'Edit Deal' : 'Add New Deal'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingDeal ? 'Save Changes' : 'Create Deal'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ 
            stage: 'prospecting',
            probability: 10
          }}
        >
          <Form.Item
            name="name"
            label="Deal Name"
            rules={[{ required: true, message: 'Please enter the deal name' }]}
          >
            <Input prefix={<ShoppingCartOutlined />} placeholder="Enterprise Software License" />
          </Form.Item>
          
          <Form.Item
            name="value"
            label="Deal Value"
            rules={[{ required: true, message: 'Please enter the deal value' }]}
          >
            <InputNumber
              prefix="$"
              min={0}
              step={1000}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              placeholder="10,000"
            />
          </Form.Item>
          
          <Form.Item
            name="contactId"
            label="Contact"
            rules={[{ required: true, message: 'Please select a contact' }]}
          >
            <Select placeholder="Select a contact">
              {contacts.map(contact => (
                <Select.Option key={contact.id} value={contact.id}>
                  {contact.name} {contact.company ? `(${contact.company})` : ''}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="stage"
              label="Stage"
              rules={[{ required: true, message: 'Please select a stage' }]}
            >
              <Select>
                <Select.Option value="prospecting">Prospecting</Select.Option>
                <Select.Option value="qualification">Qualification</Select.Option>
                <Select.Option value="proposal">Proposal</Select.Option>
                <Select.Option value="negotiation">Negotiation</Select.Option>
                <Select.Option value="closed-won">Closed Won</Select.Option>
                <Select.Option value="closed-lost">Closed Lost</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="probability"
              label="Probability (%)"
              rules={[{ required: true, message: 'Please enter the probability' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
          </div>
          
          <Form.Item
            name="expectedCloseDate"
            label="Expected Close Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Deals;import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Input, 
  Space, 
  Modal, 
  Form, 
  Select,
  DatePicker,
  InputNumber,
  Tabs,
  Tag,
  Progress,
  Dropdown,
  Menu
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Deals: React.FC = () => {
  const { deals, contacts, loading, createDeal, updateDeal, deleteDeal } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDeal, setEditingDeal] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [form] = Form.useForm();

  // Filter deals based on search text
  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (deal?: any) => {
    setEditingDeal(deal || null);
    if (deal) {
      form.setFieldsValue({
        ...deal,
        expectedCloseDate: deal.expectedCloseDate ? new Date(deal.expectedCloseDate) : undefined
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ 
        stage: 'prospecting',
        probability: 10
      });
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
      
      if (editingDeal) {
        await updateDeal(editingDeal.id, values);
      } else {
        await createDeal(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this deal?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteDeal(id);
      }
    });
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'blue';
      case 'qualification':
        return 'purple';
      case 'proposal':
        return 'cyan';
      case 'negotiation':
        return 'orange';
      case 'closed-won':
        return 'green';
      case 'closed-lost':
        return 'red';
      default:
        return 'default';
    }
  };

  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? contact.name : 'Unknown Contact';
  };

  // Group deals by stage for kanban view
  const dealsByStage = {
    prospecting: filteredDeals.filter(d => d.stage === 'prospecting'),
    qualification: filteredDeals.filter(d => d.stage === 'qualification'),
    proposal: filteredDeals.filter(d => d.stage === 'proposal'),
    negotiation: filteredDeals.filter(d => d.stage === 'negotiation'),
    'closed-won': filteredDeals.filter(d => d.stage === 'closed-won'),
    'closed-lost': filteredDeals.filter(d => d.stage === 'closed-lost')
  };

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const newStage = destination.droppableId;
    
    // Update deal stage
    updateDeal(draggableId, { 
      stage: newStage,
      // Update probability based on stage
      probability: newStage === 'closed-won' ? 100 : 
                  newStage === 'closed-lost' ? 0 :
                  newStage === 'negotiation' ? 70 :
                  newStage === 'proposal' ? 50 :
                  newStage === 'qualification' ? 30 : 10
    });
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

  // Render deal card
  const renderDealCard = (deal: any) => (
    <Card 
      key={deal.id}
      className="mb-3 bg-gray-900 border-gray-700 shadow hover:shadow-md transition-shadow"
      bodyStyle={{ padding: '12px' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <Text strong className="text-white block mb-1">
            {deal.name}
          </Text>
          <Text className="text-gray-400 block mb-1">
            <UserOutlined className="mr-1" /> {getContactName(deal.contactId)}
          </Text>
          <Text className="text-[#00B2C9] block mb-2">
            <DollarOutlined className="mr-1" /> ${deal.value.toLocaleString()}
          </Text>
          {deal.expectedCloseDate && (
            <Text className="text-gray-400 block text-xs">
              <CalendarOutlined className="mr-1" /> 
              Expected close: {new Date(deal.expectedCloseDate).toLocaleDateString()}
            </Text>
          )}
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => showModal(deal)}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => handleDelete(deal.id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" size="small" icon={<MoreOutlined />} />
        </Dropdown>
      </div>
      <Progress 
        percent={deal.probability} 
        size="small" 
        status={
          deal.stage === 'closed-won' ? 'success' : 
          deal.stage === 'closed-lost' ? 'exception' : 
          'active'
        }
        strokeColor={{
          '0%': '#00B67F',
          '100%': '#00B2C9',
        }}
      />
    </Card>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="deals-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Deals</Title>
        <Space>
          <Button 
            onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
          >
            {viewMode === 'kanban' ? 'List View' : 'Kanban View'}
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            className="bg-[#00B67F] hover:bg-[#00A070]"
          >
            Add Deal
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search deals..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredDeals.length} deals • Total value: ${filteredDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
              </Text>
            </Space>
          </div>

          {viewMode === 'kanban' ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(dealsByStage).map(([stage, stageDeals]) => (
                  <div key={stage} className="kanban-column">
                    <div className="mb-3 flex justify-between items-center">
                      <Tag color={getStageColor(stage)} className="text-sm py-1 px-2">
                        {stage.replace('-', ' ').toUpperCase()}
                      </Tag>
                      <Text className="text-gray-400 text-sm">
                        {stageDeals.length} • ${stageDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
                      </Text>
                    </div>
                    <Droppable droppableId={stage}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="kanban-deals min-h-[200px]"
                        >
                          {stageDeals.map((deal, index) => (
                            <Draggable key={deal.id} draggableId={deal.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {renderDealCard(deal)}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          ) : (
            <Tabs defaultActiveKey="all" className="deals-tabs">
              <TabPane tab="All Deals" key="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
              <TabPane tab="My Deals" key="my">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.slice(0, 2).map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
              <TabPane tab="Closing This Month" key="closing">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.filter(deal => 
                    deal.expectedCloseDate && 
                    new Date(deal.expectedCloseDate).getMonth() === new Date().getMonth()
                  ).map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
            </Tabs>
          )}
        </Card>
      </motion.div>

      <Modal
        title={editingDeal ? 'Edit Deal' : 'Add New Deal'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingDeal ? 'Save Changes' : 'Create Deal'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ 
            stage: 'prospecting',
            probability: 10
          }}
        >
          <Form.Item
            name="name"
            label="Deal Name"
            rules={[{ required: true, message: 'Please enter the deal name' }]}
          >
            <Input prefix={<ShoppingCartOutlined />} placeholder="Enterprise Software License" />
          </Form.Item>
          
          <Form.Item
            name="value"
            label="Deal Value"
            rules={[{ required: true, message: 'Please enter the deal value' }]}
          >
            <InputNumber
              prefix="$"
              min={0}
              step={1000}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              placeholder="10,000"
            />
          </Form.Item>
          
          <Form.Item
            name="contactId"
            label="Contact"
            rules={[{ required: true, message: 'Please select a contact' }]}
          >
            <Select placeholder="Select a contact">
              {contacts.map(contact => (
                <Select.Option key={contact.id} value={contact.id}>
                  {contact.name} {contact.company ? `(${contact.company})` : ''}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="stage"
              label="Stage"
              rules={[{ required: true, message: 'Please select a stage' }]}
            >
              <Select>
                <Select.Option value="prospecting">Prospecting</Select.Option>
                <Select.Option value="qualification">Qualification</Select.Option>
                <Select.Option value="proposal">Proposal</Select.Option>
                <Select.Option value="negotiation">Negotiation</Select.Option>
                <Select.Option value="closed-won">Closed Won</Select.Option>
                <Select.Option value="closed-lost">Closed Lost</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="probability"
              label="Probability (%)"
              rules={[{ required: true, message: 'Please enter the probability' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
          </div>
          
          <Form.Item
            name="expectedCloseDate"
            label="Expected Close Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Deals;import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Input, 
  Space, 
  Modal, 
  Form, 
  Select,
  DatePicker,
  InputNumber,
  Tabs,
  Tag,
  Progress,
  Dropdown,
  Menu
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Deals: React.FC = () => {
  const { deals, contacts, loading, createDeal, updateDeal, deleteDeal } = useCrmStore();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDeal, setEditingDeal] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [form] = Form.useForm();

  // Filter deals based on search text
  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (deal?: any) => {
    setEditingDeal(deal || null);
    if (deal) {
      form.setFieldsValue({
        ...deal,
        expectedCloseDate: deal.expectedCloseDate ? new Date(deal.expectedCloseDate) : undefined
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ 
        stage: 'prospecting',
        probability: 10
      });
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
      
      if (editingDeal) {
        await updateDeal(editingDeal.id, values);
      } else {
        await createDeal(values);
      }
      
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this deal?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteDeal(id);
      }
    });
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'blue';
      case 'qualification':
        return 'purple';
      case 'proposal':
        return 'cyan';
      case 'negotiation':
        return 'orange';
      case 'closed-won':
        return 'green';
      case 'closed-lost':
        return 'red';
      default:
        return 'default';
    }
  };

  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? contact.name : 'Unknown Contact';
  };

  // Group deals by stage for kanban view
  const dealsByStage = {
    prospecting: filteredDeals.filter(d => d.stage === 'prospecting'),
    qualification: filteredDeals.filter(d => d.stage === 'qualification'),
    proposal: filteredDeals.filter(d => d.stage === 'proposal'),
    negotiation: filteredDeals.filter(d => d.stage === 'negotiation'),
    'closed-won': filteredDeals.filter(d => d.stage === 'closed-won'),
    'closed-lost': filteredDeals.filter(d => d.stage === 'closed-lost')
  };

  // Handle drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const newStage = destination.droppableId;
    
    // Update deal stage
    updateDeal(draggableId, { 
      stage: newStage,
      // Update probability based on stage
      probability: newStage === 'closed-won' ? 100 : 
                  newStage === 'closed-lost' ? 0 :
                  newStage === 'negotiation' ? 70 :
                  newStage === 'proposal' ? 50 :
                  newStage === 'qualification' ? 30 : 10
    });
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

  // Render deal card
  const renderDealCard = (deal: any) => (
    <Card 
      key={deal.id}
      className="mb-3 bg-gray-900 border-gray-700 shadow hover:shadow-md transition-shadow"
      bodyStyle={{ padding: '12px' }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <Text strong className="text-white block mb-1">
            {deal.name}
          </Text>
          <Text className="text-gray-400 block mb-1">
            <UserOutlined className="mr-1" /> {getContactName(deal.contactId)}
          </Text>
          <Text className="text-[#00B2C9] block mb-2">
            <DollarOutlined className="mr-1" /> ${deal.value.toLocaleString()}
          </Text>
          {deal.expectedCloseDate && (
            <Text className="text-gray-400 block text-xs">
              <CalendarOutlined className="mr-1" /> 
              Expected close: {new Date(deal.expectedCloseDate).toLocaleDateString()}
            </Text>
          )}
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => showModal(deal)}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => handleDelete(deal.id)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" size="small" icon={<MoreOutlined />} />
        </Dropdown>
      </div>
      <Progress 
        percent={deal.probability} 
        size="small" 
        status={
          deal.stage === 'closed-won' ? 'success' : 
          deal.stage === 'closed-lost' ? 'exception' : 
          'active'
        }
        strokeColor={{
          '0%': '#00B67F',
          '100%': '#00B2C9',
        }}
      />
    </Card>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="deals-page"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">Deals</Title>
        <Space>
          <Button 
            onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
          >
            {viewMode === 'kanban' ? 'List View' : 'Kanban View'}
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            className="bg-[#00B67F] hover:bg-[#00A070]"
          >
            Add Deal
          </Button>
        </Space>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search deals..."
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={e => setSearchText(e.target.value)}
              className="max-w-md"
              allowClear
            />
            <Space>
              <Text className="text-gray-400">
                {filteredDeals.length} deals • Total value: ${filteredDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
              </Text>
            </Space>
          </div>

          {viewMode === 'kanban' ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(dealsByStage).map(([stage, stageDeals]) => (
                  <div key={stage} className="kanban-column">
                    <div className="mb-3 flex justify-between items-center">
                      <Tag color={getStageColor(stage)} className="text-sm py-1 px-2">
                        {stage.replace('-', ' ').toUpperCase()}
                      </Tag>
                      <Text className="text-gray-400 text-sm">
                        {stageDeals.length} • ${stageDeals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
                      </Text>
                    </div>
                    <Droppable droppableId={stage}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="kanban-deals min-h-[200px]"
                        >
                          {stageDeals.map((deal, index) => (
                            <Draggable key={deal.id} draggableId={deal.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {renderDealCard(deal)}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          ) : (
            <Tabs defaultActiveKey="all" className="deals-tabs">
              <TabPane tab="All Deals" key="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
              <TabPane tab="My Deals" key="my">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.slice(0, 2).map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
              <TabPane tab="Closing This Month" key="closing">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDeals.filter(deal => 
                    deal.expectedCloseDate && 
                    new Date(deal.expectedCloseDate).getMonth() === new Date().getMonth()
                  ).map(deal => renderDealCard(deal))}
                </div>
              </TabPane>
            </Tabs>
          )}
        </Card>
      </motion.div>

      <Modal
        title={editingDeal ? 'Edit Deal' : 'Add New Deal'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingDeal ? 'Save Changes' : 'Create Deal'}
        okButtonProps={{ className: 'bg-[#00B67F] hover:bg-[#00A070]' }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ 
            stage: 'prospecting',
            probability: 10
          }}
        >
          <Form.Item
            name="name"
            label="Deal Name"
            rules={[{ required: true, message: 'Please enter the deal name' }]}
          >
            <Input prefix={<ShoppingCartOutlined />} placeholder="Enterprise Software License" />
          </Form.Item>
          
          <Form.Item
            name="value"
            label="Deal Value"
            rules={[{ required: true, message: 'Please enter the deal value' }]}
          >
            <InputNumber
              prefix="$"
              min={0}
              step={1000}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
              placeholder="10,000"
            />
          </Form.Item>
          
          <Form.Item
            name="contactId"
            label="Contact"
            rules={[{ required: true, message: 'Please select a contact' }]}
          >
            <Select placeholder="Select a contact">
              {contacts.map(contact => (
                <Select.Option key={contact.id} value={contact.id}>
                  {contact.name} {contact.company ? `(${contact.company})` : ''}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="stage"
              label="Stage"
              rules={[{ required: true, message: 'Please select a stage' }]}
            >
              <Select>
                <Select.Option value="prospecting">Prospecting</Select.Option>
                <Select.Option value="qualification">Qualification</Select.Option>
                <Select.Option value="proposal">Proposal</Select.Option>
                <Select.Option value="negotiation">Negotiation</Select.Option>
                <Select.Option value="closed-won">Closed Won</Select.Option>
                <Select.Option value="closed-lost">Closed Lost</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="probability"
              label="Probability (%)"
              rules={[{ required: true, message: 'Please enter the probability' }]}
            >
              <InputNumber min={0} max={100} style={{ width: '100%' }} />
            </Form.Item>
          </div>
          
          <Form.Item
            name="expectedCloseDate"
            label="Expected Close Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default Deals;