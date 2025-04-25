import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Switch, 
  Button, 
  Space, 
  Tooltip, 
  Modal, 
  Divider, 
  Tag, 
  Empty,
  Collapse,
  List
} from 'antd';
import { 
  SettingOutlined, 
  InfoCircleOutlined, 
  PoweroffOutlined,
  AppstoreOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlugins } from './PluginRegistry';
import { FeatureBlock, Plugin } from './types';
import { 
  enableFeatureBlock, 
  disableFeatureBlock, 
  updateFeatureBlockConfig 
} from './featureBlockService';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface FeatureBlockCardProps {
  block: FeatureBlock;
  plugin: Plugin;
}

const FeatureBlockCard: React.FC<FeatureBlockCardProps> = ({ block, plugin }) => {
  const { plugins, updatePluginConfig } = usePlugins();
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(block.isEnabled);
  const [config, setConfig] = useState(block.config || block.defaultConfig);
  
  const handleToggle = async (checked: boolean) => {
    try {
      if (checked) {
        await enableFeatureBlock('current-workspace', plugin.id, block.id);
      } else {
        await disableFeatureBlock('current-workspace', plugin.id, block.id);
      }
      
      // Update local state
      setIsEnabled(checked);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, isEnabled: checked } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error toggling feature block:', error);
    }
  };
  
  const handleConfigChange = async (newConfig: Record<string, any>) => {
    try {
      await updateFeatureBlockConfig('current-workspace', plugin.id, block.id, newConfig);
      
      // Update local state
      setConfig(newConfig);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, config: newConfig } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error updating feature block config:', error);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        hoverable 
        className="mb-4"
        extra={
          <Switch 
            checked={isEnabled} 
            onChange={handleToggle}
          />
        }
        actions={[
          <Tooltip title="Configure">
            <SettingOutlined 
              key="setting" 
              onClick={() => setIsSettingsModalVisible(true)} 
            />
          </Tooltip>,
          <Tooltip title={isEnabled ? 'Disable' : 'Enable'}>
            <PoweroffOutlined 
              key="toggle" 
              onClick={() => handleToggle(!isEnabled)} 
              className={isEnabled ? 'text-green-500' : 'text-gray-400'}
            />
          </Tooltip>,
        ]}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <Title level={4} className="mb-1">{block.name}</Title>
            <Paragraph ellipsis={{ rows: 2 }} className="mb-3">
              {block.description}
            </Paragraph>
            <Tag color={isEnabled ? 'success' : 'default'}>
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Tag>
          </div>
          {block.icon && (
            <div className="ml-4">
              {block.icon}
            </div>
          )}
        </div>
        
        <Modal
          title={`${block.name} Settings`}
          open={isSettingsModalVisible}
          onCancel={() => setIsSettingsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsSettingsModalVisible(false)}>
              Cancel
            </Button>,
            <Button 
              key="save" 
              type="primary" 
              onClick={() => {
                setIsSettingsModalVisible(false);
              }}
            >
              Save
            </Button>,
          ]}
        >
          {block.renderSettings ? (
            block.renderSettings({
              block,
              config,
              context: {
                workspace: { id: 'current-workspace', name: 'Current Workspace' },
                user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                theme: 'light',
              },
              onConfigChange: handleConfigChange,
            })
          ) : (
            <div className="p-4 text-center">
              <Text type="secondary">No settings available for this feature block.</Text>
            </div>
          )}
        </Modal>
      </Card>
    </motion.div>
  );
};

interface FeatureBlockManagerProps {
  plugin: Plugin;
}

const FeatureBlockManager: React.FC<FeatureBlockManagerProps> = ({ plugin }) => {
  const featureBlocks = plugin.featureBlocks || [];
  const enabledBlocks = featureBlocks.filter(block => block.isEnabled);
  const disabledBlocks = featureBlocks.filter(block => !block.isEnabled);
  
  return (
    <div className="feature-block-manager">
      <div className="mb-6">
        <Title level={3}>Feature Blocks</Title>
        <Text type="secondary">
          Enable or disable feature blocks for this plugin. Each block provides specific functionality.
        </Text>
      </div>
      
      {featureBlocks.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No feature blocks available for this plugin"
        />
      ) : (
        <div>
          <Collapse defaultActiveKey={['enabled', 'disabled']}>
            <Panel 
              header={
                <div className="flex items-center">
                  <AppstoreOutlined className="mr-2" />
                  <span>Enabled Blocks ({enabledBlocks.length})</span>
                </div>
              } 
              key="enabled"
            >
              {enabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No enabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={enabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
            
            <Panel 
              header={
                <div className="flex items-center">
                  <MinusOutlined className="mr-2" />
                  <span>Disabled Blocks ({disabledBlocks.length})</span>
                </div>
              } 
              key="disabled"
            >
              {disabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No disabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={disabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default FeatureBlockManager;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Switch, 
  Button, 
  Space, 
  Tooltip, 
  Modal, 
  Divider, 
  Tag, 
  Empty,
  Collapse,
  List
} from 'antd';
import { 
  SettingOutlined, 
  InfoCircleOutlined, 
  PoweroffOutlined,
  AppstoreOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlugins } from './PluginRegistry';
import { FeatureBlock, Plugin } from './types';
import { 
  enableFeatureBlock, 
  disableFeatureBlock, 
  updateFeatureBlockConfig 
} from './featureBlockService';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface FeatureBlockCardProps {
  block: FeatureBlock;
  plugin: Plugin;
}

const FeatureBlockCard: React.FC<FeatureBlockCardProps> = ({ block, plugin }) => {
  const { plugins, updatePluginConfig } = usePlugins();
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(block.isEnabled);
  const [config, setConfig] = useState(block.config || block.defaultConfig);
  
  const handleToggle = async (checked: boolean) => {
    try {
      if (checked) {
        await enableFeatureBlock('current-workspace', plugin.id, block.id);
      } else {
        await disableFeatureBlock('current-workspace', plugin.id, block.id);
      }
      
      // Update local state
      setIsEnabled(checked);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, isEnabled: checked } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error toggling feature block:', error);
    }
  };
  
  const handleConfigChange = async (newConfig: Record<string, any>) => {
    try {
      await updateFeatureBlockConfig('current-workspace', plugin.id, block.id, newConfig);
      
      // Update local state
      setConfig(newConfig);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, config: newConfig } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error updating feature block config:', error);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        hoverable 
        className="mb-4"
        extra={
          <Switch 
            checked={isEnabled} 
            onChange={handleToggle}
          />
        }
        actions={[
          <Tooltip title="Configure">
            <SettingOutlined 
              key="setting" 
              onClick={() => setIsSettingsModalVisible(true)} 
            />
          </Tooltip>,
          <Tooltip title={isEnabled ? 'Disable' : 'Enable'}>
            <PoweroffOutlined 
              key="toggle" 
              onClick={() => handleToggle(!isEnabled)} 
              className={isEnabled ? 'text-green-500' : 'text-gray-400'}
            />
          </Tooltip>,
        ]}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <Title level={4} className="mb-1">{block.name}</Title>
            <Paragraph ellipsis={{ rows: 2 }} className="mb-3">
              {block.description}
            </Paragraph>
            <Tag color={isEnabled ? 'success' : 'default'}>
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Tag>
          </div>
          {block.icon && (
            <div className="ml-4">
              {block.icon}
            </div>
          )}
        </div>
        
        <Modal
          title={`${block.name} Settings`}
          open={isSettingsModalVisible}
          onCancel={() => setIsSettingsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsSettingsModalVisible(false)}>
              Cancel
            </Button>,
            <Button 
              key="save" 
              type="primary" 
              onClick={() => {
                setIsSettingsModalVisible(false);
              }}
            >
              Save
            </Button>,
          ]}
        >
          {block.renderSettings ? (
            block.renderSettings({
              block,
              config,
              context: {
                workspace: { id: 'current-workspace', name: 'Current Workspace' },
                user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                theme: 'light',
              },
              onConfigChange: handleConfigChange,
            })
          ) : (
            <div className="p-4 text-center">
              <Text type="secondary">No settings available for this feature block.</Text>
            </div>
          )}
        </Modal>
      </Card>
    </motion.div>
  );
};

interface FeatureBlockManagerProps {
  plugin: Plugin;
}

const FeatureBlockManager: React.FC<FeatureBlockManagerProps> = ({ plugin }) => {
  const featureBlocks = plugin.featureBlocks || [];
  const enabledBlocks = featureBlocks.filter(block => block.isEnabled);
  const disabledBlocks = featureBlocks.filter(block => !block.isEnabled);
  
  return (
    <div className="feature-block-manager">
      <div className="mb-6">
        <Title level={3}>Feature Blocks</Title>
        <Text type="secondary">
          Enable or disable feature blocks for this plugin. Each block provides specific functionality.
        </Text>
      </div>
      
      {featureBlocks.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No feature blocks available for this plugin"
        />
      ) : (
        <div>
          <Collapse defaultActiveKey={['enabled', 'disabled']}>
            <Panel 
              header={
                <div className="flex items-center">
                  <AppstoreOutlined className="mr-2" />
                  <span>Enabled Blocks ({enabledBlocks.length})</span>
                </div>
              } 
              key="enabled"
            >
              {enabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No enabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={enabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
            
            <Panel 
              header={
                <div className="flex items-center">
                  <MinusOutlined className="mr-2" />
                  <span>Disabled Blocks ({disabledBlocks.length})</span>
                </div>
              } 
              key="disabled"
            >
              {disabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No disabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={disabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default FeatureBlockManager;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Switch, 
  Button, 
  Space, 
  Tooltip, 
  Modal, 
  Divider, 
  Tag, 
  Empty,
  Collapse,
  List
} from 'antd';
import { 
  SettingOutlined, 
  InfoCircleOutlined, 
  PoweroffOutlined,
  AppstoreOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlugins } from './PluginRegistry';
import { FeatureBlock, Plugin } from './types';
import { 
  enableFeatureBlock, 
  disableFeatureBlock, 
  updateFeatureBlockConfig 
} from './featureBlockService';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface FeatureBlockCardProps {
  block: FeatureBlock;
  plugin: Plugin;
}

const FeatureBlockCard: React.FC<FeatureBlockCardProps> = ({ block, plugin }) => {
  const { plugins, updatePluginConfig } = usePlugins();
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(block.isEnabled);
  const [config, setConfig] = useState(block.config || block.defaultConfig);
  
  const handleToggle = async (checked: boolean) => {
    try {
      if (checked) {
        await enableFeatureBlock('current-workspace', plugin.id, block.id);
      } else {
        await disableFeatureBlock('current-workspace', plugin.id, block.id);
      }
      
      // Update local state
      setIsEnabled(checked);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, isEnabled: checked } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error toggling feature block:', error);
    }
  };
  
  const handleConfigChange = async (newConfig: Record<string, any>) => {
    try {
      await updateFeatureBlockConfig('current-workspace', plugin.id, block.id, newConfig);
      
      // Update local state
      setConfig(newConfig);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, config: newConfig } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error updating feature block config:', error);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        hoverable 
        className="mb-4"
        extra={
          <Switch 
            checked={isEnabled} 
            onChange={handleToggle}
          />
        }
        actions={[
          <Tooltip title="Configure">
            <SettingOutlined 
              key="setting" 
              onClick={() => setIsSettingsModalVisible(true)} 
            />
          </Tooltip>,
          <Tooltip title={isEnabled ? 'Disable' : 'Enable'}>
            <PoweroffOutlined 
              key="toggle" 
              onClick={() => handleToggle(!isEnabled)} 
              className={isEnabled ? 'text-green-500' : 'text-gray-400'}
            />
          </Tooltip>,
        ]}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <Title level={4} className="mb-1">{block.name}</Title>
            <Paragraph ellipsis={{ rows: 2 }} className="mb-3">
              {block.description}
            </Paragraph>
            <Tag color={isEnabled ? 'success' : 'default'}>
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Tag>
          </div>
          {block.icon && (
            <div className="ml-4">
              {block.icon}
            </div>
          )}
        </div>
        
        <Modal
          title={`${block.name} Settings`}
          open={isSettingsModalVisible}
          onCancel={() => setIsSettingsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsSettingsModalVisible(false)}>
              Cancel
            </Button>,
            <Button 
              key="save" 
              type="primary" 
              onClick={() => {
                setIsSettingsModalVisible(false);
              }}
            >
              Save
            </Button>,
          ]}
        >
          {block.renderSettings ? (
            block.renderSettings({
              block,
              config,
              context: {
                workspace: { id: 'current-workspace', name: 'Current Workspace' },
                user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                theme: 'light',
              },
              onConfigChange: handleConfigChange,
            })
          ) : (
            <div className="p-4 text-center">
              <Text type="secondary">No settings available for this feature block.</Text>
            </div>
          )}
        </Modal>
      </Card>
    </motion.div>
  );
};

interface FeatureBlockManagerProps {
  plugin: Plugin;
}

const FeatureBlockManager: React.FC<FeatureBlockManagerProps> = ({ plugin }) => {
  const featureBlocks = plugin.featureBlocks || [];
  const enabledBlocks = featureBlocks.filter(block => block.isEnabled);
  const disabledBlocks = featureBlocks.filter(block => !block.isEnabled);
  
  return (
    <div className="feature-block-manager">
      <div className="mb-6">
        <Title level={3}>Feature Blocks</Title>
        <Text type="secondary">
          Enable or disable feature blocks for this plugin. Each block provides specific functionality.
        </Text>
      </div>
      
      {featureBlocks.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No feature blocks available for this plugin"
        />
      ) : (
        <div>
          <Collapse defaultActiveKey={['enabled', 'disabled']}>
            <Panel 
              header={
                <div className="flex items-center">
                  <AppstoreOutlined className="mr-2" />
                  <span>Enabled Blocks ({enabledBlocks.length})</span>
                </div>
              } 
              key="enabled"
            >
              {enabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No enabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={enabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
            
            <Panel 
              header={
                <div className="flex items-center">
                  <MinusOutlined className="mr-2" />
                  <span>Disabled Blocks ({disabledBlocks.length})</span>
                </div>
              } 
              key="disabled"
            >
              {disabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No disabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={disabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default FeatureBlockManager;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Switch, 
  Button, 
  Space, 
  Tooltip, 
  Modal, 
  Divider, 
  Tag, 
  Empty,
  Collapse,
  List
} from 'antd';
import { 
  SettingOutlined, 
  InfoCircleOutlined, 
  PoweroffOutlined,
  AppstoreOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlugins } from './PluginRegistry';
import { FeatureBlock, Plugin } from './types';
import { 
  enableFeatureBlock, 
  disableFeatureBlock, 
  updateFeatureBlockConfig 
} from './featureBlockService';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface FeatureBlockCardProps {
  block: FeatureBlock;
  plugin: Plugin;
}

const FeatureBlockCard: React.FC<FeatureBlockCardProps> = ({ block, plugin }) => {
  const { plugins, updatePluginConfig } = usePlugins();
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(block.isEnabled);
  const [config, setConfig] = useState(block.config || block.defaultConfig);
  
  const handleToggle = async (checked: boolean) => {
    try {
      if (checked) {
        await enableFeatureBlock('current-workspace', plugin.id, block.id);
      } else {
        await disableFeatureBlock('current-workspace', plugin.id, block.id);
      }
      
      // Update local state
      setIsEnabled(checked);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, isEnabled: checked } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error toggling feature block:', error);
    }
  };
  
  const handleConfigChange = async (newConfig: Record<string, any>) => {
    try {
      await updateFeatureBlockConfig('current-workspace', plugin.id, block.id, newConfig);
      
      // Update local state
      setConfig(newConfig);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, config: newConfig } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error updating feature block config:', error);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        hoverable 
        className="mb-4"
        extra={
          <Switch 
            checked={isEnabled} 
            onChange={handleToggle}
          />
        }
        actions={[
          <Tooltip title="Configure">
            <SettingOutlined 
              key="setting" 
              onClick={() => setIsSettingsModalVisible(true)} 
            />
          </Tooltip>,
          <Tooltip title={isEnabled ? 'Disable' : 'Enable'}>
            <PoweroffOutlined 
              key="toggle" 
              onClick={() => handleToggle(!isEnabled)} 
              className={isEnabled ? 'text-green-500' : 'text-gray-400'}
            />
          </Tooltip>,
        ]}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <Title level={4} className="mb-1">{block.name}</Title>
            <Paragraph ellipsis={{ rows: 2 }} className="mb-3">
              {block.description}
            </Paragraph>
            <Tag color={isEnabled ? 'success' : 'default'}>
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Tag>
          </div>
          {block.icon && (
            <div className="ml-4">
              {block.icon}
            </div>
          )}
        </div>
        
        <Modal
          title={`${block.name} Settings`}
          open={isSettingsModalVisible}
          onCancel={() => setIsSettingsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsSettingsModalVisible(false)}>
              Cancel
            </Button>,
            <Button 
              key="save" 
              type="primary" 
              onClick={() => {
                setIsSettingsModalVisible(false);
              }}
            >
              Save
            </Button>,
          ]}
        >
          {block.renderSettings ? (
            block.renderSettings({
              block,
              config,
              context: {
                workspace: { id: 'current-workspace', name: 'Current Workspace' },
                user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                theme: 'light',
              },
              onConfigChange: handleConfigChange,
            })
          ) : (
            <div className="p-4 text-center">
              <Text type="secondary">No settings available for this feature block.</Text>
            </div>
          )}
        </Modal>
      </Card>
    </motion.div>
  );
};

interface FeatureBlockManagerProps {
  plugin: Plugin;
}

const FeatureBlockManager: React.FC<FeatureBlockManagerProps> = ({ plugin }) => {
  const featureBlocks = plugin.featureBlocks || [];
  const enabledBlocks = featureBlocks.filter(block => block.isEnabled);
  const disabledBlocks = featureBlocks.filter(block => !block.isEnabled);
  
  return (
    <div className="feature-block-manager">
      <div className="mb-6">
        <Title level={3}>Feature Blocks</Title>
        <Text type="secondary">
          Enable or disable feature blocks for this plugin. Each block provides specific functionality.
        </Text>
      </div>
      
      {featureBlocks.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No feature blocks available for this plugin"
        />
      ) : (
        <div>
          <Collapse defaultActiveKey={['enabled', 'disabled']}>
            <Panel 
              header={
                <div className="flex items-center">
                  <AppstoreOutlined className="mr-2" />
                  <span>Enabled Blocks ({enabledBlocks.length})</span>
                </div>
              } 
              key="enabled"
            >
              {enabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No enabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={enabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
            
            <Panel 
              header={
                <div className="flex items-center">
                  <MinusOutlined className="mr-2" />
                  <span>Disabled Blocks ({disabledBlocks.length})</span>
                </div>
              } 
              key="disabled"
            >
              {disabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No disabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={disabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default FeatureBlockManager;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Switch, 
  Button, 
  Space, 
  Tooltip, 
  Modal, 
  Divider, 
  Tag, 
  Empty,
  Collapse,
  List
} from 'antd';
import { 
  SettingOutlined, 
  InfoCircleOutlined, 
  PoweroffOutlined,
  AppstoreOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlugins } from './PluginRegistry';
import { FeatureBlock, Plugin } from './types';
import { 
  enableFeatureBlock, 
  disableFeatureBlock, 
  updateFeatureBlockConfig 
} from './featureBlockService';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface FeatureBlockCardProps {
  block: FeatureBlock;
  plugin: Plugin;
}

const FeatureBlockCard: React.FC<FeatureBlockCardProps> = ({ block, plugin }) => {
  const { plugins, updatePluginConfig } = usePlugins();
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(block.isEnabled);
  const [config, setConfig] = useState(block.config || block.defaultConfig);
  
  const handleToggle = async (checked: boolean) => {
    try {
      if (checked) {
        await enableFeatureBlock('current-workspace', plugin.id, block.id);
      } else {
        await disableFeatureBlock('current-workspace', plugin.id, block.id);
      }
      
      // Update local state
      setIsEnabled(checked);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, isEnabled: checked } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error toggling feature block:', error);
    }
  };
  
  const handleConfigChange = async (newConfig: Record<string, any>) => {
    try {
      await updateFeatureBlockConfig('current-workspace', plugin.id, block.id, newConfig);
      
      // Update local state
      setConfig(newConfig);
      
      // Update the plugin's feature blocks
      const updatedFeatureBlocks = plugin.featureBlocks?.map(b => 
        b.id === block.id ? { ...b, config: newConfig } : b
      );
      
      // Update the plugin
      if (updatedFeatureBlocks) {
        const updatedPlugin = { ...plugin, featureBlocks: updatedFeatureBlocks };
        // This would update the plugin in the registry
        // In a real app, this would be handled by the PluginRegistry
      }
    } catch (error) {
      console.error('Error updating feature block config:', error);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        hoverable 
        className="mb-4"
        extra={
          <Switch 
            checked={isEnabled} 
            onChange={handleToggle}
          />
        }
        actions={[
          <Tooltip title="Configure">
            <SettingOutlined 
              key="setting" 
              onClick={() => setIsSettingsModalVisible(true)} 
            />
          </Tooltip>,
          <Tooltip title={isEnabled ? 'Disable' : 'Enable'}>
            <PoweroffOutlined 
              key="toggle" 
              onClick={() => handleToggle(!isEnabled)} 
              className={isEnabled ? 'text-green-500' : 'text-gray-400'}
            />
          </Tooltip>,
        ]}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <Title level={4} className="mb-1">{block.name}</Title>
            <Paragraph ellipsis={{ rows: 2 }} className="mb-3">
              {block.description}
            </Paragraph>
            <Tag color={isEnabled ? 'success' : 'default'}>
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Tag>
          </div>
          {block.icon && (
            <div className="ml-4">
              {block.icon}
            </div>
          )}
        </div>
        
        <Modal
          title={`${block.name} Settings`}
          open={isSettingsModalVisible}
          onCancel={() => setIsSettingsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsSettingsModalVisible(false)}>
              Cancel
            </Button>,
            <Button 
              key="save" 
              type="primary" 
              onClick={() => {
                setIsSettingsModalVisible(false);
              }}
            >
              Save
            </Button>,
          ]}
        >
          {block.renderSettings ? (
            block.renderSettings({
              block,
              config,
              context: {
                workspace: { id: 'current-workspace', name: 'Current Workspace' },
                user: { id: 'current-user', email: 'user@example.com', role: 'admin' },
                theme: 'light',
              },
              onConfigChange: handleConfigChange,
            })
          ) : (
            <div className="p-4 text-center">
              <Text type="secondary">No settings available for this feature block.</Text>
            </div>
          )}
        </Modal>
      </Card>
    </motion.div>
  );
};

interface FeatureBlockManagerProps {
  plugin: Plugin;
}

const FeatureBlockManager: React.FC<FeatureBlockManagerProps> = ({ plugin }) => {
  const featureBlocks = plugin.featureBlocks || [];
  const enabledBlocks = featureBlocks.filter(block => block.isEnabled);
  const disabledBlocks = featureBlocks.filter(block => !block.isEnabled);
  
  return (
    <div className="feature-block-manager">
      <div className="mb-6">
        <Title level={3}>Feature Blocks</Title>
        <Text type="secondary">
          Enable or disable feature blocks for this plugin. Each block provides specific functionality.
        </Text>
      </div>
      
      {featureBlocks.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No feature blocks available for this plugin"
        />
      ) : (
        <div>
          <Collapse defaultActiveKey={['enabled', 'disabled']}>
            <Panel 
              header={
                <div className="flex items-center">
                  <AppstoreOutlined className="mr-2" />
                  <span>Enabled Blocks ({enabledBlocks.length})</span>
                </div>
              } 
              key="enabled"
            >
              {enabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No enabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={enabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
            
            <Panel 
              header={
                <div className="flex items-center">
                  <MinusOutlined className="mr-2" />
                  <span>Disabled Blocks ({disabledBlocks.length})</span>
                </div>
              } 
              key="disabled"
            >
              {disabledBlocks.length === 0 ? (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No disabled feature blocks"
                  className="my-4"
                />
              ) : (
                <List
                  dataSource={disabledBlocks}
                  renderItem={block => (
                    <List.Item>
                      <FeatureBlockCard block={block} plugin={plugin} />
                    </List.Item>
                  )}
                />
              )}
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default FeatureBlockManager;