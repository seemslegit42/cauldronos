import React, { useState } from 'react';
import { 
  Tabs, 
  Card, 
  List, 
  Button, 
  Typography, 
  Space, 
  Tag, 
  Input, 
  Select, 
  Badge, 
  Tooltip, 
  Empty, 
  Divider,
  Modal,
  Rate,
  Avatar,
  Switch
} from 'antd';
import { 
  AppstoreOutlined, 
  PlusOutlined, 
  SearchOutlined, 
  FilterOutlined, 
  DownloadOutlined,
  DeleteOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  StarOutlined,
  DollarOutlined,
  TagsOutlined,
  UserOutlined,
  CloudDownloadOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePlugins } from '../plugins/PluginRegistry';
import { Plugin, PluginStoreItem, PluginCategory } from '../plugins/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Plugin card component for installed plugins
const PluginCard: React.FC<{ plugin: Plugin }> = ({ plugin }) => {
  const navigate = useNavigate();
  const { enablePlugin, disablePlugin, uninstallPlugin } = usePlugins();
  const [isUninstallModalVisible, setIsUninstallModalVisible] = useState(false);

  const handleStatusToggle = (checked: boolean) => {
    if (checked) {
      enablePlugin(plugin.id);
    } else {
      disablePlugin(plugin.id);
    }
  };

  const showUninstallModal = () => {
    setIsUninstallModalVisible(true);
  };

  const handleUninstall = async () => {
    await uninstallPlugin(plugin.id);
    setIsUninstallModalVisible(false);
  };

  const statusColor = {
    active: 'success',
    inactive: 'default',
    error: 'error',
    loading: 'processing',
  };

  return (
    <Card 
      hoverable 
      className="h-full"
      actions={[
        <Tooltip title="Configure">
          <SettingOutlined key="setting" onClick={() => navigate(`/plugins/${plugin.id}/settings`)} />
        </Tooltip>,
        <Tooltip title={plugin.status === 'active' ? 'Disable' : 'Enable'}>
          <PoweroffOutlined 
            key="toggle" 
            onClick={() => handleStatusToggle(plugin.status !== 'active')} 
            className={plugin.status === 'active' ? 'text-green-500' : 'text-gray-400'}
          />
        </Tooltip>,
        <Tooltip title="Uninstall">
          <DeleteOutlined key="delete" onClick={showUninstallModal} className="text-red-500" />
        </Tooltip>,
      ]}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center">
            <Title level={4} className="mb-0 mr-2" onClick={() => navigate(`/plugins/${plugin.id}`)}>
              {plugin.name}
            </Title>
            <Badge status={statusColor[plugin.status] as any} />
          </div>
          <Text type="secondary">v{plugin.version}</Text>
        </div>
        <Switch 
          checked={plugin.status === 'active'} 
          onChange={handleStatusToggle} 
          className="ml-2"
        />
      </div>
      
      <Paragraph ellipsis={{ rows: 2 }} className="mb-3">
        {plugin.description}
      </Paragraph>
      
      <div className="flex flex-wrap gap-1 mt-2">
        <Tag color="blue">{plugin.category}</Tag>
        <Tag>{plugin.author}</Tag>
      </div>

      <Modal
        title="Uninstall Plugin"
        open={isUninstallModalVisible}
        onOk={handleUninstall}
        onCancel={() => setIsUninstallModalVisible(false)}
        okText="Uninstall"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to uninstall <strong>{plugin.name}</strong>?</p>
        <p>This action cannot be undone, and any data associated with this plugin may be lost.</p>
      </Modal>
    </Card>
  );
};

// Plugin store item card
const PluginStoreItemCard: React.FC<{ plugin: PluginStoreItem }> = ({ plugin }) => {
  const navigate = useNavigate();
  const { installPlugin } = usePlugins();
  const [isInstalling, setIsInstalling] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await installPlugin(plugin.id);
      navigate(`/plugins/${plugin.id}`);
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <Card 
      hoverable 
      className="h-full"
      actions={[
        <Tooltip title="View Details">
          <InfoCircleOutlined key="info" onClick={() => setIsDetailsModalVisible(true)} />
        </Tooltip>,
        plugin.isInstalled ? (
          <Tooltip title="Already Installed">
            <CheckCircleOutlined key="installed" className="text-green-500" />
          </Tooltip>
        ) : (
          <Tooltip title={plugin.price === 'free' ? 'Install (Free)' : `Install ($${plugin.price})`}>
            <Button 
              type="link" 
              icon={<DownloadOutlined />} 
              loading={isInstalling}
              onClick={handleInstall}
              className="text-blue-500"
            >
              {plugin.price === 'free' ? 'Install' : `$${plugin.price}`}
            </Button>
          </Tooltip>
        ),
      ]}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <Title level={4} className="mb-0" onClick={() => setIsDetailsModalVisible(true)}>
            {plugin.name}
          </Title>
          <div className="flex items-center">
            <Rate disabled defaultValue={plugin.rating} className="text-sm" />
            <Text type="secondary" className="ml-2">({plugin.downloads})</Text>
          </div>
        </div>
        {plugin.price === 'free' ? (
          <Tag color="green">Free</Tag>
        ) : (
          <Tag color="blue">${plugin.price}</Tag>
        )}
      </div>
      
      <Paragraph ellipsis={{ rows: 2 }} className="mb-3">
        {plugin.description}
      </Paragraph>
      
      <div className="flex flex-wrap gap-1 mt-2">
        <Tag color="blue">{plugin.category}</Tag>
        <Tag>{plugin.author}</Tag>
        {plugin.tags.slice(0, 3).map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {plugin.tags.length > 3 && <Tag>+{plugin.tags.length - 3}</Tag>}
      </div>

      <Modal
        title={plugin.name}
        open={isDetailsModalVisible}
        onCancel={() => setIsDetailsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailsModalVisible(false)}>
            Close
          </Button>,
          !plugin.isInstalled && (
            <Button 
              key="install" 
              type="primary" 
              loading={isInstalling} 
              onClick={handleInstall}
            >
              {plugin.price === 'free' ? 'Install' : `Install ($${plugin.price})`}
            </Button>
          ),
        ]}
        width={700}
      >
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Avatar size={64} icon={<AppstoreOutlined />} className="mr-4" />
              <div>
                <Title level={4} className="mb-0">{plugin.name}</Title>
                <Text type="secondary">v{plugin.version}</Text>
              </div>
            </div>
            <div className="text-right">
              {plugin.price === 'free' ? (
                <Tag color="green" className="text-lg px-3 py-1">Free</Tag>
              ) : (
                <Tag color="blue" className="text-lg px-3 py-1">${plugin.price}</Tag>
              )}
              {plugin.isInstalled && (
                <div className="mt-2">
                  <Tag color="success" icon={<CheckCircleOutlined />}>Installed</Tag>
                </div>
              )}
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Text type="secondary"><UserOutlined className="mr-1" /> Author</Text>
              <div>{plugin.author}</div>
            </div>
            <div>
              <Text type="secondary"><StarOutlined className="mr-1" /> Rating</Text>
              <div><Rate disabled defaultValue={plugin.rating} /> ({plugin.rating})</div>
            </div>
            <div>
              <Text type="secondary"><CloudDownloadOutlined className="mr-1" /> Downloads</Text>
              <div>{plugin.downloads.toLocaleString()}</div>
            </div>
          </div>

          <Divider />

          <div className="mb-4">
            <Title level={5}>Description</Title>
            <Paragraph>{plugin.description}</Paragraph>
          </div>

          <div className="mb-4">
            <Title level={5}>Category</Title>
            <Tag color="blue" className="text-md">{plugin.category}</Tag>
          </div>

          <div>
            <Title level={5}>Tags</Title>
            <div className="flex flex-wrap gap-2">
              {plugin.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

// Main Plugin Manager component
const PluginManager: React.FC = () => {
  const { plugins, availablePlugins, isLoading } = usePlugins();
  const [activeTab, setActiveTab] = useState('installed');
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<PluginCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  // Filter installed plugins
  const filteredInstalledPlugins = plugins.filter(plugin => {
    const matchesSearch = 
      searchText === '' || 
      plugin.name.toLowerCase().includes(searchText.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || plugin.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && plugin.status === 'active') ||
      (statusFilter === 'inactive' && plugin.status === 'inactive');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filter store plugins
  const filteredStorePlugins = availablePlugins.filter(plugin => {
    const matchesSearch = 
      searchText === '' || 
      plugin.name.toLowerCase().includes(searchText.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || plugin.category === categoryFilter;
    const matchesPrice = priceFilter === 'all' || 
      (priceFilter === 'free' && plugin.price === 'free') ||
      (priceFilter === 'paid' && plugin.price !== 'free');
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Plugin Manager</Title>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="mb-6"
        tabBarExtraContent={
          <Space>
            <Input
              placeholder="Search plugins..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <Select
              placeholder="Category"
              style={{ width: 150 }}
              value={categoryFilter}
              onChange={setCategoryFilter}
            >
              <Option value="all">All Categories</Option>
              <Option value="ui">UI</Option>
              <Option value="data">Data</Option>
              <Option value="integration">Integration</Option>
              <Option value="utility">Utility</Option>
              <Option value="analytics">Analytics</Option>
              <Option value="security">Security</Option>
              <Option value="communication">Communication</Option>
              <Option value="ai">AI</Option>
              <Option value="other">Other</Option>
            </Select>
            {activeTab === 'installed' ? (
              <Select
                placeholder="Status"
                style={{ width: 120 }}
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            ) : (
              <Select
                placeholder="Price"
                style={{ width: 120 }}
                value={priceFilter}
                onChange={setPriceFilter}
              >
                <Option value="all">All Prices</Option>
                <Option value="free">Free</Option>
                <Option value="paid">Paid</Option>
              </Select>
            )}
          </Space>
        }
      >
        <TabPane 
          tab={
            <span>
              <AppstoreOutlined />
              Installed Plugins
            </span>
          } 
          key="installed"
        >
          {filteredInstalledPlugins.length === 0 ? (
            <Empty 
              description="No plugins found" 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInstalledPlugins.map(plugin => (
                <PluginCard key={plugin.id} plugin={plugin} />
              ))}
            </div>
          )}
        </TabPane>
        <TabPane 
          tab={
            <span>
              <PlusOutlined />
              Plugin Store
            </span>
          } 
          key="store"
        >
          {filteredStorePlugins.length === 0 ? (
            <Empty 
              description="No plugins found" 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStorePlugins.map(plugin => (
                <PluginStoreItemCard key={plugin.id} plugin={plugin} />
              ))}
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PluginManager;
