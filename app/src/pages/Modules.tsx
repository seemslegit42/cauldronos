import React, { useState } from 'react';
import { 
  Card, 
  List, 
  Typography, 
  Button, 
  Tag, 
  Switch, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select,
  Tabs,
  Empty,
  Avatar,
  Tooltip,
  Badge,
  Divider,
  Row,
  Col,
  Rate,
  Progress,
  Dropdown,
  Menu
} from 'antd';
import { 
  AppstoreOutlined, 
  PlusOutlined, 
  SettingOutlined,
  InfoCircleOutlined,
  RobotOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  CalendarOutlined,
  MailOutlined,
  TeamOutlined,
  BarChartOutlined,
  DollarOutlined,
  CloudDownloadOutlined,
  StarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
  FilterOutlined,
  SearchOutlined,
  RobotOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  CalendarOutlined,
  MailOutlined,
  TeamOutlined,
  BarChartOutlined,
  DollarOutlined,
  CloudDownloadOutlined,
  StarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
  FilterOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useModules } from '../modules/ModuleRegistry';
import { Module, ModuleCategory } from '../modules/types';
import WorkspaceAccess from '../auth/WorkspaceAccess';
import RoleBasedAccess from '../auth/RoleBasedAccess';
import RoleBasedAccess from '../auth/RoleBasedAccess';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

// Enhanced mock available modules for installation
const availableModules: Module[] = [
  {
    id: 'new-1',
    name: 'Team Task Management',
    slug: 'tasks',
    description: 'Organize tasks, track progress, and manage projects with ease. Includes Kanban boards, task assignments, and deadline tracking.',
    version: '1.2.5',
    isCore: false,
    isPublic: true,
    category: 'productivity',
    path: '/modules/tasks',
    requiredRoles: ['USER'],
    menuIcon: undefined,
    menuLabel: 'Tasks',
    menuOrder: 40,
    isEnabled: false
  },
  {
    id: 'new-2',
    name: 'Team Chat',
    slug: 'chat',
    description: 'Real-time messaging platform for team communication. Features channels, direct messages, file sharing, and integrations., meetings, and deadlines. Includes team calendar sharing, reminders, and integration with other modules.',
    version: '1.1.2',
    isCore: false,
    isPublic: true,
    category: 'communication',
    path: '/modules/chat',
    requiredRoles: ['USER'],
    menuIcon: undefined,
    menuLabel: 'Chat',
    menuOrder: 50,
    isEnabled: false
  },
  {
    id: 'new-3',
    name: 'Calendar',
    slug: 'calendar',
    description: 'Schedule and manage events, meetings, and deadlines. Includes team calendar sharing, reminders, and integration with other modules.',
    version: '1.1.2',
    isCore: false,
    isPublic: true,
    category: 'productivity',
    path: '/modules/calendar',
    requiredRoles: ['USER'],
    menuIcon: undefined,
    menuLabel: 'Calendar',
    menuOrder: 60,
    isEnabled: false
  },
  {
    id: 'new-4',
    name: 'Analytics Dashboard',
    slug: 'analytics',
    description: 'Comprehensive analytics and reporting tools. Visualize data, track KPIs, and generate custom reports for your business.',
    version: '1.0.0',
    isCore: false,
    isPublic: true,
    category: 'analytics',
    path: '/modules/analytics',
    requiredRoles: ['MANAGER', 'ADMIN'],
    menuIcon: undefined,
    menuLabel: 'Analytics',
    menuOrder: 70,
    isEnabled: false
  },
  {
    id: 'new-5',
    name: 'Email Marketing',
    slug: 'email-marketing',
    description: 'Create, send, and track email campaigns. Includes templates, subscriber management, and performance analytics.',
    version: '0.9.5',
    isCore: false,
    isPublic: true,
    category: 'marketing',
    path: '/modules/email-marketing',
    requiredRoles: ['MANAGER', 'ADMIN'],
    menuIcon: undefined,
    menuLabel: 'Email Marketing',
    menuOrder: 80,
    isEnabled: false
  }
];

// Mock featured modules
const featuredModules = [
  {
    id: 'featured-1',
    name: 'AI Assistant',
    slug: 'ai-assistant',
    description: 'Powerful AI assistant to help with various tasks, answer questions, and provide insights based on your data.',
    version: '1.0.0',
    category: 'productivity',
    rating: 4.8,
    installations: 2450,
    icon: <RobotOutlined />,
    price: 'Free',
    isPopular: true
  },
  {
    id: 'featured-2',
    name: 'CRM',
    slug: 'crm',
    description: 'Complete customer relationship management system. Track leads, manage deals, and improve customer engagement.',
    version: '1.1.0',
    category: 'crm',
    rating: 4.7,
    installations: 3200,
    icon: <CustomerServiceOutlined />,
    price: 'Free',
    isPopular: true
  },
  {
    id: 'featured-3',
    name: 'Knowledge Base',
    slug: 'knowledge-base',
    description: 'Create and manage documentation, guides, and FAQs for your team and customers.',
    version: '1.0.2',
    category: 'productivity',
    rating: 4.5,
    installations: 1850,
    icon: <FileTextOutlined />,
    price: 'Free',
    isPopular: false
  }
];

// Function to get icon for module category
const getCategoryIcon = (category: ModuleCategory) => {
  switch (category) {
    case 'productivity':
      return <CalendarOutlined />;
    case 'communication':
      return <MailOutlined />;
    case 'analytics':
      return <BarChartOutlined />;
    case 'crm':
      return <CustomerServiceOutlined />;
    case 'finance':
      return <DollarOutlined />;
    case 'marketing':
      return <MailOutlined />;
    default:
      return <AppstoreOutlined />;
  }
};

const Modules: React.FC = () => {
  const { modules } = useModules();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('installed');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const handleToggleModule = (moduleId: string, enabled: boolean) => {
    // In a real app, this would update the module status in the database
    console.log(`Toggle module ${moduleId} to ${enabled ? 'enabled' : 'disabled'}`);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleInstall = async () => {
    try {
      const values = await form.validateFields();
      console.log('Install module with values:', values);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const showDetailsModal = (module: any) => {
    setSelectedModule(module);
    setIsDetailsModalVisible(true);
  };

  const handleDetailsCancel = () => {
    setIsDetailsModalVisible(false);
    setSelectedModule(null);
  };

  const getCategoryColor = (category: ModuleCategory) => {
    switch (category) {
      case 'productivity':
        return 'blue';
      case 'communication':
        return 'green';
      case 'analytics':
        return 'purple';
      case 'crm':
        return 'orange';
      case 'marketing':
        return 'magenta';
      case 'finance':
        return 'gold';
      default:
        return 'default';
    }
  };

  // Filter modules based on category and search text
  const filteredAvailableModules = availableModules.filter(module => {
    const matchesCategory = categoryFilter === 'all' || module.category === categoryFilter;
    const matchesSearch = !searchText || 
      module.name.toLowerCase().includes(searchText.toLowerCase()) || 
      module.description.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Combined modules for "All" tab
  const allModules = [...modules, ...featuredModules.map(m => ({
    ...m,
    isEnabled: false,
    isCore: false,
    isPublic: true,
    requiredRoles: ['USER'],
    path: `/modules/${m.slug}`,
    menuLabel: m.name,
    menuOrder: 100
  }))];

  return (
    <WorkspaceAccess>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={2}>Modules</Title>
            <Text type="secondary">
              Manage and install modules for your workspace
            </Text>
           <Dropdown
                        key="more"
                        overlay={
                          <Menu>
                            <Menu.Item key="details" onClick={() => showDetailsModal(module)}>
                              <InfoCircleOutlined /> View Details
                            </Menu.Item>
                            <Menu.Item key="uninstall" danger>
                              <CloseCircleOutlined /> Uninstall
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={['click']}
                      >
                        <EllipsisOutlined />
                      </Dropdown>
                    ]}
                  >
                    <div className="flex items-start mb-3">
                      <Avatar 
                        size={40}
                        icon={getCategoryIcon(module.category)} 
                        style={{ 
                          backgroundColor: module.isCore ? '#1677ff' : '#52c41a',
                          marginRight: '12px'
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <Title level={5} className="mb-0">{module.name}</Title>
                          <Switch
                            size="small"
                            checked={module.isEnabled}
                            onChange={(checked) => handleToggleModule(module.id, checked)}
                          />
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Tag color={getCategoryColor(module.category)}>
                            {module.category}
                          </Tag>
                          <span className="ml-1">v{module.version}</span>
                        </div>
                      </div>
                    </div>
                    <Paragraph ellipsis={{ rows: 3 }} className="text-sm">
                      {module.description || 'No description available'}
                    </Paragraph>
                    <div className="flex justify-between items-center mt-2">
                      {module.isCore && <Badge color="blue" text="Core" />}
                      {!module.isCore && <span />}
                      <Text type="secondary" className="text-xs">
                        {module.isEnabled ? 'Active' : 'Disabled'}
                      </Text>
                    </div>
                  </Card>
                </List.Item>
              )}
              locale={{
                emptyText: (
                  <Empty 
                    description="No modules installed yet" 
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Button type="primary" onClick={showModal}>
                      Browse Modules
                    </Button>
                  </Empty>
                )
              }}
            />
          </>
        )}
        
        {activeTab === 'featured' && (
          <>
            <div className="mb-6">
              <Title level={4}>Featured Modules</Title>
              <Text type="secondary">
                Recommended modules to enhance your workspace
              </Text>
            </div>

            <Row gutter={[16, 16]}>
              {featuredModules.map(module => (
                <Col xs={24} md={8} key={module.id}>
                  <Card 
                    hoverable 
                    className="h-full shadow-sm transition-all hover:shadow-md"
                    cover={
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center text-white">
                        <div className="text-4xl mb-2">
                          {module.icon}
                        </div>
                        <Title level={4} className="text-white mb-0">
                          {module.name}
                        </Title>
                        <div className="flex justify-center items-center mt-2">
                          <Rate disabled defaultValue={module.rating} allowHalf className="text-sm" />
                          <Text className="ml-2 text-white">({module.rating})</Text>
                        </div>
                      </div>
                    }
                    actions={[
                      <Link to={`/modules/${module.slug}`} key="try">
                        Try Now
                      </Link>,
                      <Button 
                        type="link" 
                        key="details" 
                        onClick={() => showDetailsModal(module)}
                      >
                        Details
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <div className="flex justify-between items-center">
                          <span>{module.price}</span>
                          {module.isPopular && (
                            <Tag color="orange">Popular</Tag>
                          )}
                        </div>
                      }
                      description={
                        <>
                          <Paragraph ellipsis={{ rows: 3 }} className="mt-2">
                            {module.description}
                          </Paragraph>
                          <div className="flex justify-between items-center mt-2">
                            <Tag color={getCategoryColor(module.category as ModuleCategory)}>
                              {module.category}
                            </Tag>
                            <Text type="secondary" className="text-xs">
                              {module.installations.toLocaleString()} installs
                            </Text>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
        
        {activeTab === 'marketplace' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <Title level={4} className="mb-0">Module Marketplace</Title>
              <Space>
                <Select 
                  defaultValue="all" 
                  style={{ width: 150 }} 
                  onChange={value => setCategoryFilter(value)}
                  suffixIcon={<FilterOutlined />}
                >
                  <Option value="all">All Categories</Option>
                  <Option value="productivity">Productivity</Option>
                  <Option value="communication">Communication</Option>
                  <Option value="analytics">Analytics</Option>
                  <Option value="crm">CRM</Option>
                  <Option value="marketing">Marketing</Option>
                </Select>
              </Space>
            </div>

            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }}
              dataSource={filteredAvailableModules}
              renderItem={module => (
                <List.Item>
                  <Card
                    hoverable
                    className="h-full shadow-sm transition-all hover:shadow-md"
                    actions={[
                      <Button 
                        type="primary" 
                        key="install" 
                        size="small" 
                        icon={<CloudDownloadOutlined />}
                        onClick={() => {
                          setSelectedModule(module);
                          showModal();
                        }}
                      >
                        Install
                      </Button>,
                      <Button 
                        type="text" 
                        key="info" 
                        icon={<InfoCircleOutlined />} 
                        size="small"
                        onClick={() => showDetailsModal(module)}
                      >
                        Details
                      </Button>,
                    ]}
                  >
                    <div className="flex items-start mb-3">
                      <Avatar 
                        size={40}
                        icon={getCategoryIcon(module.category)} 
                        style={{ 
                          backgroundColor: '#722ed1',
                          marginRight: '12px'
                        }}
                      />
                      <div>
                        <Title level={5} className="mb-0">{module.name}</Title>
                        <div className="flex items-center text-xs text-gray-500">
                          <Tag color={getCategoryColor(module.category)}>
                            {module.category}
                          </Tag>
                          <span className="ml-1">v{module.version}</span>
                        </div>
                      </div>
                    </div>
                    <Paragraph ellipsis={{ rows: 3 }} className="text-sm">
                      {module.description || 'No description available'}
                    </Paragraph>
                    <div className="flex justify-between items-center mt-2">
                      <Text type="secondary" className="text-xs">
                        Free
                      </Text>
                      <div className="flex items-center">
                        <StarOutlined className="text-yellow-500 mr-1" />
                        <Text className="text-xs">4.5</Text>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
              locale={{
                emptyText: (
                  <Empty 
                    description="No modules found matching your criteria" 
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )
              }}
            />
          </>
        )}

        {activeTab === 'all' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <Title level={4} className="mb-0">All Available Modules</Title>
              <Space>
                <Select 
                  defaultValue="all" 
                  style={{ width: 150 }} 
                  onChange={value => setCategoryFilter(value)}
                  suffixIcon={<FilterOutlined />}
                >
                  <Option value="all">All Categories</Option>
                  <Option value="productivity">Productivity</Option>
                  <Option value="communication">Communication</Option>
                  <Option value="analytics">Analytics</Option>
                  <Option value="crm">CRM</Option>
                  <Option value="marketing">Marketing</Option>
                </Select>
              </Space>
            </div>

            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }}
              dataSource={allModules}
              renderItem={module => {
                const isInstalled = modules.some(m => m.slug === module.slug);
                return (
                  <List.Item>
                    <Card
                      hoverable
                      className="h-full shadow-sm transition-all hover:shadow-md"
                      actions={[
                        isInstalled ? (
                          <Link to={`/modules/${module.slug}`} key="open">
                            Open
                          </Link>
                        ) : (
                          <Button 
                            type="primary" 
                            key="install" 
                            size="small" 
                            icon={<CloudDownloadOutlined />}
                            onClick={() => {
                              setSelectedModule(module);
                              showModal();
                            }}
                          >
                            Install
                          </Button>
                        ),
                        <Button 
                          type="text" 
                          key="info" 
                          icon={<InfoCircleOutlined />} 
                          size="small"
                          onClick={() => showDetailsModal(module)}
                        >
                          Details
                        </Button>,
                      ]}
                    >
                      <div className="flex items-start mb-3">
                        <Avatar 
                          size={40}
                          icon={getCategoryIcon(module.category)} 
                          style={{ 
                            backgroundColor: isInstalled ? '#52c41a' : '#722ed1',
                            marginRight: '12px'
                          }}
                        />
                        <div>
                          <div className="flex items-center">
                            <Title level={5} className="mb-0 mr-2">{module.name}</Title>
                            {isInstalled && (
                              <Tooltip title="Installed">
                                <CheckCircleOutlined className="text-green-500" />
                              </Tooltip>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Tag color={getCategoryColor(module.category)}>
                              {module.category}
                            </Tag>
                            <span className="ml-1">v{module.version}</span>
                          </div>
                        </div>
                      </div>
                      <Paragraph ellipsis={{ rows: 2 }} className="text-sm">
                        {module.description || 'No description available'}
                      </Paragraph>
                    </Card>
                  </List.Item>
                );
              }}
            />
          </>
        )}

        {/* Install Module Modal */}
        <Modal
          title="Install </div>
          <Space>
            <Search
              placeholder="Search modules..."
              allowClear
              onSearch={value => setSearchText(value)}
              style={{ width: 250 }}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={showModal}
            >
              Install New Module
            </Button>
          </Space>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-6">
          <TabPane tab="Installed" key="installed" />
          <TabPane tab="Featured" key="featured" />
          <TabPane tab="Marketplace" key="marketplace" />
          <TabPane tab="All" key="all" />
        </Tabs>

        {activeTab === 'installed' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <Title level={4} className="mb-0">Your Installed Modules</Title>
              <Space>
                <Select 
                  defaultValue="all" 
                  style={{ width: 150 }} 
                  onChange={value => setCategoryFilter(value)}
                  suffixIcon={<FilterOutlined />}
                >
                  <Option value="all">All Categories</Option>
                  <Option value="productivity">Productivity</Option>
                  <Option value="communication">Communication</Option>
                  <Option value="analytics">Analytics</Option>
                  <Option value="crm">CRM</Option>
                  <Option value="marketing">Marketing</Option>
                </Select>
              </Space>
            </div>

            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
              dataSource={modules}
              renderItem={module => (
                <List.Item>
                  <Card
                    hoverable
          width={600}
                    className="h-full shadow-sm transition-all hover:shadow-md"
            initialValues={{
              moduleId: selectedModule?.id,
              permissions: ['USER', 'MANAGER', 'ADMIN'],
              enabled: true
            }}
                    actions={[
                      <Link to={`/modules/${module.slug}`} key="open">
                        Open
                      </Link>,
                      <Link to={`/modules/${module.slug}/settings`} key="setting">
                        <SettingOutlined />
                      </Link>,
                      <Dropdown
                        key="more"
                        overlay={
                          <Menu>
                            <Menu.Item key="details" onClick={() => showDetailsModal(module)}>
                              <InfoCircleOutlined /> View Details
                            </Menu.Item>
                            <Menu.Item key="uninstall" danger>
                              <CloseCircleOutlined /> Uninstall
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={['click']}
                      >
                        <EllipsisOutlined />
                      </Dropdown>
                    ]}
                  >
                    <div className="flex items-start mb-3">
                      <Avatar 
   ze={40}
                        icon={getCategoryIcon(module.category)} 
                        style={{ 
                          backgroundColor: module.isCore ? '#1677ff' : '#52c41a',
                          marginRight: '12px'
                        }}
                      />
                      <div className="flex-1">

            <Divider />
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <Title level={5}>Installation Notes</Title>
              <Text type="secondary">
                Installing this module will:
              </Text>
              <ul className="list-disc pl-5 mt-2">
                <li>Add the module to your workspace</li>
                <li>Make it available to users with the selected roles</li>
                <li>Add it to your sidebar navigation if enabled</li>
              </ul>
              <Text type="secondary" className="block mt-2">
                You can change these settings later in the module settings.
              </Text>
            </div>
          </Form>
        </Modal>

        {/* Module Details Modal */}
        <Modal
          title={selectedModule?.name}
          open={isDetailsModalVisible}
          onCancel={handleDetailsCancel}
          footer={[
            <Button key="close" onClick={handleDetailsCancel}>
              Close
            </Button>,
            <Button 
              key="install" 
              type="primary"
              onClick={() => {
                handleDetailsCancel();
                showModal();
              }}
            >
              Install Module
            </Button>,
          ]}
          width={700}
        >
          {selectedModule && (
            <>
              <div className="flex items-start mb-4">
                <Avatar 
                  size={64}
                  icon={getCategoryIcon(selectedModule.category)} 
                  style={{ 
                    backgroundColor: '#722ed1',
                    marginRight: '16px'
                  }}
                />
                <div>
                  <div className="flex items-center">
                    <Title level={4} className="mb-0 mr-2">{selectedModule.name}</Title>
                    <Tag color={getCategoryColor(selectedModule.category)}>
                      {selectedModule.category}
                    </Tag>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span>Version {selectedModule.version}</span>
                    {selectedModule.rating && (
                      <>
                        <Divider type="vertical" />
                        <Rate disabled defaultValue={selectedModule.rating} allowHalf className="text-xs" />
                        <span className="ml-1">({selectedModule.rating})</span>
                      </>
                    )}
                    {selectedModule.installations && (
                      <>
                        <Divider type="vertical" />
                        <span>{selectedModule.installations.toLocaleString()} installations</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Divider />

              <Title level={5}>Description</Title>
              <Paragraph>
                {selectedModule.description}
              </Paragraph>

              <Divider />

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Title level={5}>Features</Title>
                  <ul className="list-disc pl-5">
                    <li>Feature 1 of the module</li>
                    <li>Feature 2 of the module</li>
                    <li>Feature 3 of the module</li>
                    <li>Feature 4 of the module</li>
                  </ul>
                </Col>
                <Col span={12}>
                  <Title level={5}>Requirements</Title>
                  <ul className="list-disc pl-5">
                    <li>CauldronOS v1.0 or higher</li>
                    <li>User role: {selectedModule.requiredRoles?.join(', ') || 'Any'}</li>
                    <li>Storage: Minimal</li>
                  </ul>
                </Col>
              </Row>

              <Divider />

              <Title level={5}>Compatibility</Title>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>CauldronOS</span>
                  <span>100%</span>
                </div>
                <Progress percent={100} size="small" status="active" />
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Other Modules</span>
                  <span>85%</span>
                </div>
                <Progress percent={85} size="small" status="active" />
              </div>

              <Divider />

              <div className="flex justify-between items-center">
                <Text type="secondary">
                  Last updated: April 15, 2023
                </Text>
                <Text type="secondary">
                  Developer: CauldronOS Team
                </Text>
              </div>
            </>
          )}              <div className="flex justify-between items-center">
                          <Title level={5} className="mb-0">{module.name}</Title>
                          <Switch
                            size="small"
                            checked={module.isEnabled}
                            onChange={(checked) => handleToggleModule(module.id, checked)}
                          />
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Tag color={getCategoryColor(module.category)}>
                            {module.category}
                          </Tag>
                          <span className="ml-1">v{module.version}</span>
                        </div>
                      </div>
                    </div>
                    <Paragraph ellipsis={{ rows: 3 }} className="text-sm">
                      {module.description || 'No description available'}
                    </Paragraph>
                    <div className="flex justify-between items-center mt-2">
                      {module.isCore && <Badge color="blue" text="Core" />}
                      {!module.isCore && <span />}
                      <Text type="secondary" className="text-xs">
                        {module.isEnabled ? 'Active' : 'Disabled'}
                      </Text>
                    </div>
                  </Card>
                </List.Item>
              )}
              locale={{
                emptyText: (
                  <Empty 
                    description="No modules installed yet" 
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Button type="primary" onClick={showModal}>
                      Browse Modules
                    </Button>
                  </Empty>
                )
              }}
            />
          </>
        )}
        
        {activeTab === 'featured' && (
          <>
            <div className="mb-6">
              <Title level={4}>Featured Modules</Title>
              <Text type="secondary">
                Recommended modules to enhance your workspace
              </Text>
            </div>

            <Row gutter={[16, 16]}>
              {featuredModules.map(module => (
                <Col xs={24} md={8} key={module.id}>
                  <Card 
                    hoverable 
                    className="h-full shadow-sm transition-all hover:shadow-md"
                    cover={
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center text-white">
                        <div className="text-4xl mb-2">
                          {module.icon}
                        </div>
                        <Title level={4} className="text-white mb-0">
                          {module.name}
                        </Title>
                        <div className="flex justify-center items-center mt-2">
                          <Rate disabled defaultValue={module.rating} allowHalf className="text-sm" />
                          <Text className="ml-2 text-white">({module.rating})</Text>
                        </div>
                      </div>
                    }
                    actions={[
                      <Link to={`/modules/${module.slug}`} key="try">
                        Try Now
                      </Link>,
                      <Button 
                        type="link" 
                        key="details" 
                        onClick={() => showDetailsModal(module)}
                      >
                        Details
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <div className="flex justify-between items-center">
                          <span>{module.price}</span>
                          {module.isPopular && (
                            <Tag color="orange">Popular</Tag>
                          )}
                        </div>
                      }
                      description={
                        <>
                          <Paragraph ellipsis={{ rows: 3 }} className="mt-2">
                            {module.description}
                          </Paragraph>
                          <div className="flex justify-between items-center mt-2">
                            <Tag color={getCategoryColor(module.category as ModuleCategory)}>
                              {module.category}
                            </Tag>
                            <Text type="secondary" className="text-xs">
                              {module.installations.toLocaleString()} installs
                            </Text>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
        
        {activeTab === 'marketplace' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <Title level={4} className="mb-0">Module Marketplace</Title>
              <Space>
                <Select 
                  defaultValue="all" 
                  style={{ width: 150 }} 
                  onChange={value => setCategoryFilter(value)}
                  suffixIcon={<FilterOutlined />}
                >
                  <Option value="all">All Categories</Option>
                  <Option value="productivity">Productivity</Option>
                  <Option value="communication">Communication</Option>
                  <Option value="analytics">Analytics</Option>
                  <Option value="crm">CRM</Option>
                  <Option value="marketing">Marketing</Option>
                </Select>
              </Space>
            </div>

            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }}
              dataSource={filteredAvailableModules}
              renderItem={module => (
                <List.Item>
                  <Card
                    hoverable
                    className="h-full shadow-sm transition-all hover:shadow-md"
                    actions={[
                      <Button 
                        type="primary" 
                        key="install" 
                        size="small" 
                        icon={<CloudDownloadOutlined />}
                        onClick={() => {
                          setSelectedModule(module);
                          showModal();
                        }}
                      >
                        Install
                      </Button>,
                      <Button 
                        type="text" 
                        key="info" 
                        icon={<InfoCircleOutlined />} 
                        size="small"
                        onClick={() => showDetailsModal(module)}
                      >
                        Details
                      </Button>,
                    ]}
                  >
                    <div className="flex items-start mb-3">
                      <Avatar 
                        size={40}
                        icon={getCategoryIcon(module.category)} 
                        style={{ 
                          backgroundColor: '#722ed1',
                          marginRight: '12px'
                        }}
                      />
                      <div>
                        <Title level={5} className="mb-0">{module.name}</Title>
                        <div className="flex items-center text-xs text-gray-500">
                          <Tag color={getCategoryColor(module.category)}>
                            {module.category}
                          </Tag>
                          <span className="ml-1">v{module.version}</span>
                        </div>
                      </div>
                    </div>
                    <Paragraph ellipsis={{ rows: 3 }} className="text-sm">
                      {module.description || 'No description available'}
                    </Paragraph>
                    <div className="flex justify-between items-center mt-2">
                      <Text type="secondary" className="text-xs">
                        Free
                      </Text>
                      <div className="flex items-center">
                        <StarOutlined className="text-yellow-500 mr-1" />
                        <Text className="text-xs">4.5</Text>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
              locale={{
                emptyText: (
                  <Empty 
                    description="No modules found matching your criteria" 
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )
              }}
            />
          </>
        )}

        {activeTab === 'all' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <Title level={4} className="mb-0">All Available Modules</Title>
              <Space>
                <Select 
                  defaultValue="all" 
                  style={{ width: 150 }} 
                  onChange={value => setCategoryFilter(value)}
                  suffixIcon={<FilterOutlined />}
                >
                  <Option value="all">All Categories</Option>
                  <Option value="productivity">Productivity</Option>
                  <Option value="communication">Communication</Option>
                  <Option value="analytics">Analytics</Option>
                  <Option value="crm">CRM</Option>
                  <Option value="marketing">Marketing</Option>
                </Select>
              </Space>
            </div>

            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }}
              dataSource={allModules}
              renderItem={module => {
                const isInstalled = modules.some(m => m.slug === module.slug);
                return (
                  <List.Item>
                    <Card
                      hoverable
                      className="h-full shadow-sm transition-all hover:shadow-md"
                      actions={[
                        isInstalled ? (
                          <Link to={`/modules/${module.slug}`} key="open">
                            Open
                          </Link>
                        ) : (
                          <Button 
                            type="primary" 
                            key="install" 
                            size="small" 
                            icon={<CloudDownloadOutlined />}
                            onClick={() => {
                              setSelectedModule(module);
                              showModal();
                            }}
                          >
                            Install
                          </Button>
                        ),
                        <Button 
                          type="text" 
                          key="info" 
                          icon={<InfoCircleOutlined />} 
                          size="small"
                          onClick={() => showDetailsModal(module)}
                        >
                          Details
                        </Button>,
                      ]}
                    >
                      <div className="flex items-start mb-3">
                        <Avatar 
                          size={40}
                          icon={getCategoryIcon(module.category)} 
                          style={{ 
                            backgroundColor: isInstalled ? '#52c41a' : '#722ed1',
                            marginRight: '12px'
                          }}
                        />
                        <div>
                          <div className="flex items-center">
                            <Title level={5} className="mb-0 mr-2">{module.name}</Title>
                            {isInstalled && (
                              <Tooltip title="Installed">
                                <CheckCircleOutlined className="text-green-500" />
                              </Tooltip>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Tag color={getCategoryColor(module.category)}>
                              {module.category}
                            </Tag>
                            <span className="ml-1">v{module.version}</span>
                          </div>
                        </div>
                      </div>
                      <Paragraph ellipsis={{ rows: 2 }} className="text-sm">
                        {module.description || 'No description available'}
                      </Paragraph>
                    </Card>
                  </List.Item>
                );
              }}
            />
          </>
        )}

        {/* Install Module Modal */}
        <Modal
          title="Install Module"
          open={isModalVisible}
          onCancel={handleCancel}
          onOk={handleInstall}
          okText="Install"
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            name="install_module_form"
            initialValues={{
              moduleId: selectedModule?.id,
              permissions: ['USER', 'MANAGER', 'ADMIN'],
              enabled: true
            }}
          >
            <Form.Item
              name="moduleId"
              label="Select Module"
              rules={[{ required: true, message: 'Please select a module to install' }]}
            >
              <Select placeholder="Select a module">
                {availableModules.map(module => (
                  <Option key={module.id} value={module.id}>
                    {module.name} - v{module.version}
                  </Option>
                ))}
                {featuredModules.map(module => (
                  <Option key={module.id} value={module.id}>
                    {module.name} - v{module.version}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="permissions"
              label="Who can access this module"
              rules={[{ required: true, message: 'Please select at least one role' }]}
            >
              <Select mode="multiple" placeholder="Select roles">
                <Option value="USER">Users</Option>
                <Option value="MANAGER">Managers</Option>
                <Option value="ADMIN">Admins</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="enabled"
              label="Enable after installation"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Divider />
            
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <Title level={5}>Installation Notes</Title>
              <Text type="secondary">
                Installing this module will:
              </Text>
              <ul className="list-disc pl-5 mt-2">
                <li>Add the module to your workspace</li>
                <li>Make it available to users with the selected roles</li>
                <li>Add it to your sidebar navigation if enabled</li>
              </ul>
              <Text type="secondary" className="block mt-2">
                You can change these settings later in the module settings.
              </Text>
            </div>
          </Form>
        </Modal>

        {/* Module Details Modal */}
        <Modal
          title={selectedModule?.name}
          open={isDetailsModalVisible}
          onCancel={handleDetailsCancel}
          footer={[
            <Button key="close" onClick={handleDetailsCancel}>
              Close
            </Button>,
            <Button 
              key="install" 
              type="primary"
              onClick={() => {
                handleDetailsCancel();
                showModal();
              }}
            >
              Install Module
            </Button>,
          ]}
          width={700}
        >
          {selectedModule && (
            <>
              <div className="flex items-start mb-4">
                <Avatar 
                  size={64}
                  icon={getCategoryIcon(selectedModule.category)} 
                  style={{ 
                    backgroundColor: '#722ed1',
                    marginRight: '16px'
                  }}
                />
                <div>
                  <div className="flex items-center">
                    <Title level={4} className="mb-0 mr-2">{selectedModule.name}</Title>
                    <Tag color={getCategoryColor(selectedModule.category)}>
                      {selectedModule.category}
                    </Tag>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span>Version {selectedModule.version}</span>
                    {selectedModule.rating && (
                      <>
                        <Divider type="vertical" />
                        <Rate disabled defaultValue={selectedModule.rating} allowHalf className="text-xs" />
                        <span className="ml-1">({selectedModule.rating})</span>
                      </>
                    )}
                    {selectedModule.installations && (
                      <>
                        <Divider type="vertical" />
                        <span>{selectedModule.installations.toLocaleString()} installations</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Divider />

              <Title level={5}>Description</Title>
              <Paragraph>
                {selectedModule.description}
              </Paragraph>

              <Divider />

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Title level={5}>Features</Title>
                  <ul className="list-disc pl-5">
                    <li>Feature 1 of the module</li>
                    <li>Feature 2 of the module</li>
                    <li>Feature 3 of the module</li>
                    <li>Feature 4 of the module</li>
                  </ul>
                </Col>
                <Col span={12}>
                  <Title level={5}>Requirements</Title>
                  <ul className="list-disc pl-5">
                    <li>CauldronOS v1.0 or higher</li>
                    <li>User role: {selectedModule.requiredRoles?.join(', ') || 'Any'}</li>
                    <li>Storage: Minimal</li>
                  </ul>
                </Col>
              </Row>

              <Divider />

              <Title level={5}>Compatibility</Title>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>CauldronOS</span>
                  <span>100%</span>
                </div>
                <Progress percent={100} size="small" status="active" />
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Other Modules</span>
                  <span>85%</span>
                </div>
                <Progress percent={85} size="small" status="active" />
              </div>

              <Divider />

              <div className="flex justify-between items-center">
                <Text type="secondary">
                  Last updated: April 15, 2023
                </Text>
                <Text type="secondary">
                  Developer: CauldronOS Team
                </Text>
              </div>
            </>
          )}
        </Modal>
      </div>
    </WorkspaceAccess>
  );
};

export default Modules;
