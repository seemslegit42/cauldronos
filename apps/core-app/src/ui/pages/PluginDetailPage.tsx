import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Card, 
  Tabs, 
  Button, 
  Space, 
  Tag, 
  Divider, 
  Descriptions, 
  Badge, 
  Switch,
  Empty,
  Skeleton,
  Alert,
  Breadcrumb
} from 'antd';
import { 
  ArrowLeftOutlined, 
  SettingOutlined, 
  AppstoreOutlined, 
  InfoCircleOutlined,
  PoweroffOutlined,
  DeleteOutlined,
  BlockOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlugins } from '../plugins/PluginRegistry';
import FeatureBlockManager from '../plugins/FeatureBlockManager';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const PluginDetailPage: React.FC = () => {
  const { pluginId } = useParams<{ pluginId: string }>();
  const navigate = useNavigate();
  const { plugins, enablePlugin, disablePlugin, isLoading } = usePlugins();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the plugin
  const plugin = plugins.find(p => p.id === pluginId);
  
  // Handle plugin not found
  if (!isLoading && !plugin) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/plugins')}
          >
            Back to Plugins
          </Button>
        </div>
        
        <Alert
          message="Plugin Not Found"
          description={`The plugin with ID "${pluginId}" could not be found.`}
          type="error"
          showIcon
        />
      </div>
    );
  }
  
  // Handle loading state
  if (isLoading || !plugin) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/plugins')}
          >
            Back to Plugins
          </Button>
        </div>
        
        <Card>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }
  
  // Toggle plugin status
  const handleStatusToggle = async (checked: boolean) => {
    if (checked) {
      await enablePlugin(plugin.id);
    } else {
      await disablePlugin(plugin.id);
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/dashboard')}>Dashboard</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/plugins')}>Plugins</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{plugin.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <Title level={2} className="mb-1">{plugin.name}</Title>
              <div className="flex items-center mb-4">
                <Text type="secondary" className="mr-2">v{plugin.version}</Text>
                <Tag color="blue">{plugin.category}</Tag>
                <Badge 
                  status={
                    plugin.status === 'active' ? 'success' : 
                    plugin.status === 'error' ? 'error' : 
                    plugin.status === 'loading' ? 'processing' : 'default'
                  } 
                  text={plugin.status} 
                  className="ml-2"
                />
              </div>
              <Paragraph>{plugin.description}</Paragraph>
            </div>
            
            <Space>
              <Switch 
                checked={plugin.status === 'active'} 
                onChange={handleStatusToggle}
                checkedChildren="Enabled"
                unCheckedChildren="Disabled"
              />
              <Button 
                icon={<SettingOutlined />} 
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </Button>
              <Button 
                icon={<DeleteOutlined />} 
                danger
                onClick={() => navigate(`/plugins/${plugin.id}/uninstall`)}
              >
                Uninstall
              </Button>
            </Space>
          </div>
        </Card>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <InfoCircleOutlined />
                Overview
              </span>
            } 
            key="overview"
          >
            <Card>
              <Descriptions title="Plugin Information" bordered column={2}>
                <Descriptions.Item label="ID">{plugin.id}</Descriptions.Item>
                <Descriptions.Item label="Version">{plugin.version}</Descriptions.Item>
                <Descriptions.Item label="Author">{plugin.author}</Descriptions.Item>
                <Descriptions.Item label="Category">{plugin.category}</Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge 
                    status={
                      plugin.status === 'active' ? 'success' : 
                      plugin.status === 'error' ? 'error' : 
                      plugin.status === 'loading' ? 'processing' : 'default'
                    } 
                    text={plugin.status} 
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Has Settings">
                  {plugin.hasSettings ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Has Permissions">
                  {plugin.hasPermissions ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Feature Blocks">
                  {plugin.featureBlocks?.length || 0}
                </Descriptions.Item>
              </Descriptions>
              
              <Divider />
              
              <Title level={4}>Plugin Preview</Title>
              <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mt-4">
                {plugin.render({
                  plugin,
                  config: plugin.config || plugin.defaultConfig,
                  context: {
                    workspace: { id: 'current-workspace', name: 'Current Workspace' },
                    user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                    theme: 'light',
                  },
                })}
              </div>
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <BlockOutlined />
                Feature Blocks
              </span>
            } 
            key="feature-blocks"
          >
            <Card>
              <FeatureBlockManager plugin={plugin} />
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <SettingOutlined />
                Settings
              </span>
            } 
            key="settings"
          >
            <Card>
              {plugin.hasSettings && plugin.renderSettings ? (
                plugin.renderSettings({
                  plugin,
                  config: plugin.config || plugin.defaultConfig,
                  context: {
                    workspace: { id: 'current-workspace', name: 'Current Workspace' },
                    user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                    theme: 'light',
                  },
                  onConfigChange: (newConfig) => {
                    // This would update the plugin configuration
                  },
                })
              ) : (
                <Empty description="This plugin does not have any settings" />
              )}
            </Card>
          </TabPane>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PluginDetailPage;import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Card, 
  Tabs, 
  Button, 
  Space, 
  Tag, 
  Divider, 
  Descriptions, 
  Badge, 
  Switch,
  Empty,
  Skeleton,
  Alert,
  Breadcrumb
} from 'antd';
import { 
  ArrowLeftOutlined, 
  SettingOutlined, 
  AppstoreOutlined, 
  InfoCircleOutlined,
  PoweroffOutlined,
  DeleteOutlined,
  BlockOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlugins } from '../plugins/PluginRegistry';
import FeatureBlockManager from '../plugins/FeatureBlockManager';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const PluginDetailPage: React.FC = () => {
  const { pluginId } = useParams<{ pluginId: string }>();
  const navigate = useNavigate();
  const { plugins, enablePlugin, disablePlugin, isLoading } = usePlugins();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the plugin
  const plugin = plugins.find(p => p.id === pluginId);
  
  // Handle plugin not found
  if (!isLoading && !plugin) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/plugins')}
          >
            Back to Plugins
          </Button>
        </div>
        
        <Alert
          message="Plugin Not Found"
          description={`The plugin with ID "${pluginId}" could not be found.`}
          type="error"
          showIcon
        />
      </div>
    );
  }
  
  // Handle loading state
  if (isLoading || !plugin) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/plugins')}
          >
            Back to Plugins
          </Button>
        </div>
        
        <Card>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }
  
  // Toggle plugin status
  const handleStatusToggle = async (checked: boolean) => {
    if (checked) {
      await enablePlugin(plugin.id);
    } else {
      await disablePlugin(plugin.id);
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/dashboard')}>Dashboard</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/plugins')}>Plugins</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{plugin.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <Title level={2} className="mb-1">{plugin.name}</Title>
              <div className="flex items-center mb-4">
                <Text type="secondary" className="mr-2">v{plugin.version}</Text>
                <Tag color="blue">{plugin.category}</Tag>
                <Badge 
                  status={
                    plugin.status === 'active' ? 'success' : 
                    plugin.status === 'error' ? 'error' : 
                    plugin.status === 'loading' ? 'processing' : 'default'
                  } 
                  text={plugin.status} 
                  className="ml-2"
                />
              </div>
              <Paragraph>{plugin.description}</Paragraph>
            </div>
            
            <Space>
              <Switch 
                checked={plugin.status === 'active'} 
                onChange={handleStatusToggle}
                checkedChildren="Enabled"
                unCheckedChildren="Disabled"
              />
              <Button 
                icon={<SettingOutlined />} 
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </Button>
              <Button 
                icon={<DeleteOutlined />} 
                danger
                onClick={() => navigate(`/plugins/${plugin.id}/uninstall`)}
              >
                Uninstall
              </Button>
            </Space>
          </div>
        </Card>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <InfoCircleOutlined />
                Overview
              </span>
            } 
            key="overview"
          >
            <Card>
              <Descriptions title="Plugin Information" bordered column={2}>
                <Descriptions.Item label="ID">{plugin.id}</Descriptions.Item>
                <Descriptions.Item label="Version">{plugin.version}</Descriptions.Item>
                <Descriptions.Item label="Author">{plugin.author}</Descriptions.Item>
                <Descriptions.Item label="Category">{plugin.category}</Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge 
                    status={
                      plugin.status === 'active' ? 'success' : 
                      plugin.status === 'error' ? 'error' : 
                      plugin.status === 'loading' ? 'processing' : 'default'
                    } 
                    text={plugin.status} 
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Has Settings">
                  {plugin.hasSettings ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Has Permissions">
                  {plugin.hasPermissions ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Feature Blocks">
                  {plugin.featureBlocks?.length || 0}
                </Descriptions.Item>
              </Descriptions>
              
              <Divider />
              
              <Title level={4}>Plugin Preview</Title>
              <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mt-4">
                {plugin.render({
                  plugin,
                  config: plugin.config || plugin.defaultConfig,
                  context: {
                    workspace: { id: 'current-workspace', name: 'Current Workspace' },
                    user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                    theme: 'light',
                  },
                })}
              </div>
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <BlockOutlined />
                Feature Blocks
              </span>
            } 
            key="feature-blocks"
          >
            <Card>
              <FeatureBlockManager plugin={plugin} />
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <SettingOutlined />
                Settings
              </span>
            } 
            key="settings"
          >
            <Card>
              {plugin.hasSettings && plugin.renderSettings ? (
                plugin.renderSettings({
                  plugin,
                  config: plugin.config || plugin.defaultConfig,
                  context: {
                    workspace: { id: 'current-workspace', name: 'Current Workspace' },
                    user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                    theme: 'light',
                  },
                  onConfigChange: (newConfig) => {
                    // This would update the plugin configuration
                  },
                })
              ) : (
                <Empty description="This plugin does not have any settings" />
              )}
            </Card>
          </TabPane>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PluginDetailPage;import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Card, 
  Tabs, 
  Button, 
  Space, 
  Tag, 
  Divider, 
  Descriptions, 
  Badge, 
  Switch,
  Empty,
  Skeleton,
  Alert,
  Breadcrumb
} from 'antd';
import { 
  ArrowLeftOutlined, 
  SettingOutlined, 
  AppstoreOutlined, 
  InfoCircleOutlined,
  PoweroffOutlined,
  DeleteOutlined,
  BlockOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlugins } from '../plugins/PluginRegistry';
import FeatureBlockManager from '../plugins/FeatureBlockManager';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const PluginDetailPage: React.FC = () => {
  const { pluginId } = useParams<{ pluginId: string }>();
  const navigate = useNavigate();
  const { plugins, enablePlugin, disablePlugin, isLoading } = usePlugins();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the plugin
  const plugin = plugins.find(p => p.id === pluginId);
  
  // Handle plugin not found
  if (!isLoading && !plugin) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/plugins')}
          >
            Back to Plugins
          </Button>
        </div>
        
        <Alert
          message="Plugin Not Found"
          description={`The plugin with ID "${pluginId}" could not be found.`}
          type="error"
          showIcon
        />
      </div>
    );
  }
  
  // Handle loading state
  if (isLoading || !plugin) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/plugins')}
          >
            Back to Plugins
          </Button>
        </div>
        
        <Card>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }
  
  // Toggle plugin status
  const handleStatusToggle = async (checked: boolean) => {
    if (checked) {
      await enablePlugin(plugin.id);
    } else {
      await disablePlugin(plugin.id);
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/dashboard')}>Dashboard</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/plugins')}>Plugins</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{plugin.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <Title level={2} className="mb-1">{plugin.name}</Title>
              <div className="flex items-center mb-4">
                <Text type="secondary" className="mr-2">v{plugin.version}</Text>
                <Tag color="blue">{plugin.category}</Tag>
                <Badge 
                  status={
                    plugin.status === 'active' ? 'success' : 
                    plugin.status === 'error' ? 'error' : 
                    plugin.status === 'loading' ? 'processing' : 'default'
                  } 
                  text={plugin.status} 
                  className="ml-2"
                />
              </div>
              <Paragraph>{plugin.description}</Paragraph>
            </div>
            
            <Space>
              <Switch 
                checked={plugin.status === 'active'} 
                onChange={handleStatusToggle}
                checkedChildren="Enabled"
                unCheckedChildren="Disabled"
              />
              <Button 
                icon={<SettingOutlined />} 
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </Button>
              <Button 
                icon={<DeleteOutlined />} 
                danger
                onClick={() => navigate(`/plugins/${plugin.id}/uninstall`)}
              >
                Uninstall
              </Button>
            </Space>
          </div>
        </Card>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <InfoCircleOutlined />
                Overview
              </span>
            } 
            key="overview"
          >
            <Card>
              <Descriptions title="Plugin Information" bordered column={2}>
                <Descriptions.Item label="ID">{plugin.id}</Descriptions.Item>
                <Descriptions.Item label="Version">{plugin.version}</Descriptions.Item>
                <Descriptions.Item label="Author">{plugin.author}</Descriptions.Item>
                <Descriptions.Item label="Category">{plugin.category}</Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge 
                    status={
                      plugin.status === 'active' ? 'success' : 
                      plugin.status === 'error' ? 'error' : 
                      plugin.status === 'loading' ? 'processing' : 'default'
                    } 
                    text={plugin.status} 
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Has Settings">
                  {plugin.hasSettings ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Has Permissions">
                  {plugin.hasPermissions ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Feature Blocks">
                  {plugin.featureBlocks?.length || 0}
                </Descriptions.Item>
              </Descriptions>
              
              <Divider />
              
              <Title level={4}>Plugin Preview</Title>
              <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mt-4">
                {plugin.render({
                  plugin,
                  config: plugin.config || plugin.defaultConfig,
                  context: {
                    workspace: { id: 'current-workspace', name: 'Current Workspace' },
                    user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                    theme: 'light',
                  },
                })}
              </div>
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <BlockOutlined />
                Feature Blocks
              </span>
            } 
            key="feature-blocks"
          >
            <Card>
              <FeatureBlockManager plugin={plugin} />
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <SettingOutlined />
                Settings
              </span>
            } 
            key="settings"
          >
            <Card>
              {plugin.hasSettings && plugin.renderSettings ? (
                plugin.renderSettings({
                  plugin,
                  config: plugin.config || plugin.defaultConfig,
                  context: {
                    workspace: { id: 'current-workspace', name: 'Current Workspace' },
                    user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                    theme: 'light',
                  },
                  onConfigChange: (newConfig) => {
                    // This would update the plugin configuration
                  },
                })
              ) : (
                <Empty description="This plugin does not have any settings" />
              )}
            </Card>
          </TabPane>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PluginDetailPage;import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Card, 
  Tabs, 
  Button, 
  Space, 
  Tag, 
  Divider, 
  Descriptions, 
  Badge, 
  Switch,
  Empty,
  Skeleton,
  Alert,
  Breadcrumb
} from 'antd';
import { 
  ArrowLeftOutlined, 
  SettingOutlined, 
  AppstoreOutlined, 
  InfoCircleOutlined,
  PoweroffOutlined,
  DeleteOutlined,
  BlockOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlugins } from '../plugins/PluginRegistry';
import FeatureBlockManager from '../plugins/FeatureBlockManager';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const PluginDetailPage: React.FC = () => {
  const { pluginId } = useParams<{ pluginId: string }>();
  const navigate = useNavigate();
  const { plugins, enablePlugin, disablePlugin, isLoading } = usePlugins();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the plugin
  const plugin = plugins.find(p => p.id === pluginId);
  
  // Handle plugin not found
  if (!isLoading && !plugin) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/plugins')}
          >
            Back to Plugins
          </Button>
        </div>
        
        <Alert
          message="Plugin Not Found"
          description={`The plugin with ID "${pluginId}" could not be found.`}
          type="error"
          showIcon
        />
      </div>
    );
  }
  
  // Handle loading state
  if (isLoading || !plugin) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/plugins')}
          >
            Back to Plugins
          </Button>
        </div>
        
        <Card>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }
  
  // Toggle plugin status
  const handleStatusToggle = async (checked: boolean) => {
    if (checked) {
      await enablePlugin(plugin.id);
    } else {
      await disablePlugin(plugin.id);
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/dashboard')}>Dashboard</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/plugins')}>Plugins</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{plugin.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <Title level={2} className="mb-1">{plugin.name}</Title>
              <div className="flex items-center mb-4">
                <Text type="secondary" className="mr-2">v{plugin.version}</Text>
                <Tag color="blue">{plugin.category}</Tag>
                <Badge 
                  status={
                    plugin.status === 'active' ? 'success' : 
                    plugin.status === 'error' ? 'error' : 
                    plugin.status === 'loading' ? 'processing' : 'default'
                  } 
                  text={plugin.status} 
                  className="ml-2"
                />
              </div>
              <Paragraph>{plugin.description}</Paragraph>
            </div>
            
            <Space>
              <Switch 
                checked={plugin.status === 'active'} 
                onChange={handleStatusToggle}
                checkedChildren="Enabled"
                unCheckedChildren="Disabled"
              />
              <Button 
                icon={<SettingOutlined />} 
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </Button>
              <Button 
                icon={<DeleteOutlined />} 
                danger
                onClick={() => navigate(`/plugins/${plugin.id}/uninstall`)}
              >
                Uninstall
              </Button>
            </Space>
          </div>
        </Card>
        
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <InfoCircleOutlined />
                Overview
              </span>
            } 
            key="overview"
          >
            <Card>
              <Descriptions title="Plugin Information" bordered column={2}>
                <Descriptions.Item label="ID">{plugin.id}</Descriptions.Item>
                <Descriptions.Item label="Version">{plugin.version}</Descriptions.Item>
                <Descriptions.Item label="Author">{plugin.author}</Descriptions.Item>
                <Descriptions.Item label="Category">{plugin.category}</Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge 
                    status={
                      plugin.status === 'active' ? 'success' : 
                      plugin.status === 'error' ? 'error' : 
                      plugin.status === 'loading' ? 'processing' : 'default'
                    } 
                    text={plugin.status} 
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Has Settings">
                  {plugin.hasSettings ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Has Permissions">
                  {plugin.hasPermissions ? 'Yes' : 'No'}
                </Descriptions.Item>
                <Descriptions.Item label="Feature Blocks">
                  {plugin.featureBlocks?.length || 0}
                </Descriptions.Item>
              </Descriptions>
              
              <Divider />
              
              <Title level={4}>Plugin Preview</Title>
              <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mt-4">
                {plugin.render({
                  plugin,
                  config: plugin.config || plugin.defaultConfig,
                  context: {
                    workspace: { id: 'current-workspace', name: 'Current Workspace' },
                    user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                    theme: 'light',
                  },
                })}
              </div>
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <BlockOutlined />
                Feature Blocks
              </span>
            } 
            key="feature-blocks"
          >
            <Card>
              <FeatureBlockManager plugin={plugin} />
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <SettingOutlined />
                Settings
              </span>
            } 
            key="settings"
          >
            <Card>
              {plugin.hasSettings && plugin.renderSettings ? (
                plugin.renderSettings({
                  plugin,
                  config: plugin.config || plugin.defaultConfig,
                  context: {
                    workspace: { id: 'current-workspace', name: 'Current Workspace' },
                    user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                    theme: 'light',
                  },
                  onConfigChange: (newConfig) => {
                    // This would update the plugin configuration
                  },
                })
              ) : (
                <Empty description="This plugin does not have any settings" />
              )}
            </Card>
          </TabPane>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PluginDetailPage;