import React, { Suspense, lazy, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Result, 
  Spin, 
  Button, 
  Typography, 
  Card, 
  Tabs, 
  Badge, 
  Space, 
  Tag, 
  Tooltip 
} from 'antd';
import { 
  SettingOutlined, 
  AppstoreOutlined, 
  LockOutlined, 
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { usePlugins } from './PluginRegistry';
import { Plugin, PluginStatus } from './types';
import { RoleBasedAccess } from '../auth/components';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Loading component
const PluginLoading: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <Spin size="large" tip="Loading plugin..." />
  </div>
);

// Plugin not found component
const PluginNotFound: React.FC = () => (
  <Result
    status="404"
    title="Plugin Not Found"
    subTitle="Sorry, the plugin you are looking for does not exist or is not installed."
    extra={
      <Button type="primary" href="/plugins">
        Go to Plugins
      </Button>
    }
  />
);

// Status badge component
const StatusBadge: React.FC<{ status: PluginStatus }> = ({ status }) => {
  const statusConfig = {
    active: { color: 'success', text: 'Active', icon: <CheckCircleOutlined /> },
    inactive: { color: 'default', text: 'Inactive', icon: <CloseCircleOutlined /> },
    error: { color: 'error', text: 'Error', icon: <WarningOutlined /> },
    loading: { color: 'processing', text: 'Loading', icon: <LoadingOutlined spin /> },
  };

  const config = statusConfig[status];

  return (
    <Badge 
      status={config.color as any} 
      text={
        <Space>
          {config.icon}
          <span>{config.text}</span>
        </Space>
      } 
    />
  );
};

interface PluginViewProps {
  pluginId: string;
  view?: string;
}

// Main plugin view component
const PluginView: React.FC<PluginViewProps> = ({ pluginId, view }) => {
  const { getPluginById, updatePluginConfig } = usePlugins();
  const navigate = useNavigate();
  const [activePlugin, setActivePlugin] = useState<Plugin | undefined>(undefined);

  // Get the plugin
  useEffect(() => {
    const plugin = getPluginById(pluginId);
    setActivePlugin(plugin);
  }, [pluginId, getPluginById]);

  if (!activePlugin) {
    return <PluginNotFound />;
  }

  // Handle tab change
  const handleTabChange = (key: string) => {
    navigate(`/plugins/${pluginId}${key === 'main' ? '' : `/${key}`}`);
  };

  // Handle config change
  const handleConfigChange = (newConfig: Record<string, any>) => {
    updatePluginConfig(pluginId, newConfig);
  };

  // Determine which view to render
  const renderContent = () => {
    if (view === 'settings' && activePlugin.renderSettings) {
      return activePlugin.renderSettings({
        plugin: activePlugin,
        config: activePlugin.config || activePlugin.defaultConfig,
        context: {
          workspace: { id: '', name: '' },
          user: { id: '', email: '', role: '' },
          theme: 'light',
        },
        onConfigChange: handleConfigChange,
      });
    }

    return activePlugin.render({
      plugin: activePlugin,
      config: activePlugin.config || activePlugin.defaultConfig,
      context: {
        workspace: { id: '', name: '' },
        user: { id: '', email: '', role: '' },
        theme: 'light',
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Title level={2} className="mb-0 mr-3">{activePlugin.name}</Title>
          <StatusBadge status={activePlugin.status} />
        </div>
        <Space>
          {activePlugin.hasSettings && (
            <Button
              onClick={() => navigate(`/plugins/${pluginId}/settings`)}
              icon={<SettingOutlined />}
            >
              Settings
            </Button>
          )}
        </Space>
      </div>

      <Card className="mb-4">
        <div className="flex justify-between">
          <div>
            <Text className="block text-gray-500 dark:text-gray-400 mb-2">{activePlugin.description}</Text>
            <Space className="mt-2">
              <Tag color="blue">v{activePlugin.version}</Tag>
              <Tag color="purple">{activePlugin.category}</Tag>
              <Tag>By {activePlugin.author}</Tag>
            </Space>
          </div>
          <div>
            <Tooltip title="Plugin Information">
              <Button 
                type="text" 
                icon={<InfoCircleOutlined />} 
                onClick={() => navigate(`/plugins/${pluginId}/info`)}
              />
            </Tooltip>
          </div>
        </div>
      </Card>

      <Tabs
        activeKey={view || 'main'}
        onChange={handleTabChange}
        className="mb-6"
      >
        <TabPane
          tab={<span><AppstoreOutlined />Main</span>}
          key="main"
        />
        {activePlugin.hasSettings && (
          <TabPane
            tab={<span><SettingOutlined />Settings</span>}
            key="settings"
          />
        )}
        {activePlugin.hasPermissions && (
          <TabPane
            tab={<span><LockOutlined />Permissions</span>}
            key="permissions"
          />
        )}
        <TabPane
          tab={<span><InfoCircleOutlined />Info</span>}
          key="info"
        />
      </Tabs>

      <Suspense fallback={<PluginLoading />}>
        {renderContent()}
      </Suspense>
    </div>
  );
};

// Main plugin loader component
const PluginLoader: React.FC = () => {
  const { pluginId, view } = useParams<{ pluginId: string; view?: string }>();
  const { isLoading } = usePlugins();

  if (isLoading) {
    return <PluginLoading />;
  }

  if (!pluginId) {
    return <PluginNotFound />;
  }

  return (
    <RoleBasedAccess allowedRoles={['USER', 'MANAGER', 'ADMIN']}>
      <PluginView pluginId={pluginId} view={view} />
    </RoleBasedAccess>
  );
};

export default PluginLoader;
