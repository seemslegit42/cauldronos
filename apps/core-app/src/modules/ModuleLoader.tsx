import React, { Suspense, lazy, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { Result, Spin, Button, Typography, Card, Tabs } from 'antd';
import { useModules } from './ModuleRegistry';
import { useWorkspaces } from '../workspace/operations';
import { ModuleComponentProps, ModuleRoute } from './types';
import { SettingOutlined, AppstoreOutlined, ApiOutlined, LockOutlined } from '@ant-design/icons';
import RoleBasedAccess from '../auth/RoleBasedAccess';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Fallback component for when a module is loading
const ModuleLoading: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <Spin size="large" tip="Loading module..." />
  </div>
);

// Fallback component for when a module is not found
const ModuleNotFound: React.FC = () => (
  <Result
    status="404"
    title="Module Not Found"
    subTitle="Sorry, the module you are looking for does not exist or you don't have access to it."
    extra={
      <Button type="primary" href="/modules">
        Back to Modules
      </Button>
    }
  />
);

// Dynamic module components - in a real app, these would be loaded from the modules directory
const moduleComponents: Record<string, React.ComponentType<ModuleComponentProps>> = {
  crm: lazy(() => import('./placeholders/CrmModule')),
  wiki: lazy(() => import('./placeholders/WikiModule')),
  analytics: lazy(() => import('./placeholders/AnalyticsModule')),
  calendar: lazy(() => import('./placeholders/CalendarModule')),
  email: lazy(() => import('./placeholders/EmailModule')),
  invoicing: lazy(() => import('./placeholders/InvoicingModule'))
};

// Module settings components
const moduleSettingsComponents: Record<string, React.ComponentType<ModuleComponentProps>> = {
  crm: lazy(() => import('./placeholders/settings/CrmSettings')),
  wiki: lazy(() => import('./placeholders/settings/WikiSettings')),
  analytics: lazy(() => import('./placeholders/settings/AnalyticsSettings'))
};

// Module API documentation components
const moduleApiComponents: Record<string, React.ComponentType<ModuleComponentProps>> = {
  crm: lazy(() => import('./placeholders/api/CrmApi')),
  wiki: lazy(() => import('./placeholders/api/WikiApi')),
  analytics: lazy(() => import('./placeholders/api/AnalyticsApi'))
};

// Module permissions components
const modulePermissionsComponents: Record<string, React.ComponentType<ModuleComponentProps>> = {
  crm: lazy(() => import('./placeholders/permissions/CrmPermissions')),
  wiki: lazy(() => import('./placeholders/permissions/WikiPermissions')),
  analytics: lazy(() => import('./placeholders/permissions/AnalyticsPermissions'))
};

interface ModuleViewProps {
  moduleSlug: string;
  view?: string;
}

// Main module view component
const ModuleView: React.FC<ModuleViewProps> = ({ moduleSlug, view }) => {
  const { getModuleBySlug, getModuleApiEndpoints } = useModules();
  const { currentWorkspace } = useWorkspaces();
  const navigate = useNavigate();

  const module = getModuleBySlug(moduleSlug);

  if (!module) {
    return <ModuleNotFound />;
  }

  // Get the appropriate component based on the view
  let Component: React.ComponentType<ModuleComponentProps> | null = null;

  if (view === 'settings') {
    Component = moduleSettingsComponents[moduleSlug] || null;
  } else if (view === 'api') {
    Component = moduleApiComponents[moduleSlug] || null;
  } else if (view === 'permissions') {
    Component = modulePermissionsComponents[moduleSlug] || null;
  } else {
    Component = moduleComponents[moduleSlug] || null;
  }

  if (!Component) {
    return <ModuleNotFound />;
  }

  // Track module access
  useEffect(() => {
    // In a real app, this would be an API call
    // fetch(`/api/workspaces/${currentWorkspace?.id}/modules/${module.id}/access`, {
    //   method: 'POST'
    // });
    console.log(`Module ${moduleSlug} accessed`);
  }, [moduleSlug, currentWorkspace]);

  const workspace = currentWorkspace || {
    id: '1',
    name: 'Default Workspace',
    slug: 'default'
  };

  const handleTabChange = (key: string) => {
    if (key === 'main') {
      navigate(`/modules/${moduleSlug}`);
    } else {
      navigate(`/modules/${moduleSlug}/${key}`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>{module.name}</Title>
        <div>
          <Button
            type="primary"
            onClick={() => navigate(`/modules/${moduleSlug}/settings`)}
            icon={<SettingOutlined />}
          >
            Module Settings
          </Button>
        </div>
      </div>

      <Tabs
        activeKey={view || 'main'}
        onChange={handleTabChange}
        className="mb-6"
      >
        <TabPane
          tab={<span><AppstoreOutlined />Main</span>}
          key="main"
        />
        <TabPane
          tab={<span><SettingOutlined />Settings</span>}
          key="settings"
        />
        <TabPane
          tab={<span><ApiOutlined />API</span>}
          key="api"
        />
        <TabPane
          tab={<span><LockOutlined />Permissions</span>}
          key="permissions"
        />
      </Tabs>

      <Suspense fallback={<ModuleLoading />}>
        <Component module={module} workspace={workspace} />
      </Suspense>
    </div>
  );
};

// Main module loader component
const ModuleLoader: React.FC = () => {
  const { moduleSlug, view } = useParams<{ moduleSlug: string; view?: string }>();
  const { isLoading } = useModules();

  if (isLoading) {
    return <ModuleLoading />;
  }

  if (!moduleSlug) {
    return <ModuleNotFound />;
  }

  return (
    <RoleBasedAccess allowedRoles={['USER', 'MANAGER', 'ADMIN']}>
      <ModuleView moduleSlug={moduleSlug} view={view} />
    </RoleBasedAccess>
  );
};

// Create placeholder components for modules that don't exist yet
const createPlaceholderModule = (name: string) => {
  const PlaceholderModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => (
    <Card>
      <Result
        icon={<AppstoreOutlined />}
        title={`${name} Module`}
        subTitle={`This is a placeholder for the ${name} module. In a real application, this would be a fully functional module.`}
        extra={[
          <Button key="settings" href={`/modules/${module.slug}/settings`}>
            Module Settings
          </Button>,
          <Button key="api" href={`/modules/${module.slug}/api`}>
            API Documentation
          </Button>
        ]}
      />
    </Card>
  );
  return PlaceholderModule;
};

// Create placeholder settings component
const createPlaceholderSettings = (name: string) => {
  const PlaceholderSettings: React.FC<ModuleComponentProps> = ({ module }) => (
    <Card title={`${name} Settings`}>
      <Text>Configure your {name} module settings here.</Text>
    </Card>
  );
  return PlaceholderSettings;
};

// Create placeholder API documentation component
const createPlaceholderApi = (name: string) => {
  const PlaceholderApi: React.FC<ModuleComponentProps> = ({ module }) => (
    <Card title={`${name} API Documentation`}>
      <Text>API documentation for the {name} module.</Text>
    </Card>
  );
  return PlaceholderApi;
};

// Create placeholder permissions component
const createPlaceholderPermissions = (name: string) => {
  const PlaceholderPermissions: React.FC<ModuleComponentProps> = ({ module }) => (
    <Card title={`${name} Permissions`}>
      <Text>Manage permissions for the {name} module.</Text>
    </Card>
  );
  return PlaceholderPermissions;
};

// Dynamically create placeholder components for modules that don't have implementations
['calendar', 'email', 'invoicing'].forEach(slug => {
  if (!moduleComponents[slug]) {
    moduleComponents[slug] = createPlaceholderModule(slug.charAt(0).toUpperCase() + slug.slice(1));
  }
  if (!moduleSettingsComponents[slug]) {
    moduleSettingsComponents[slug] = createPlaceholderSettings(slug.charAt(0).toUpperCase() + slug.slice(1));
  }
  if (!moduleApiComponents[slug]) {
    moduleApiComponents[slug] = createPlaceholderApi(slug.charAt(0).toUpperCase() + slug.slice(1));
  }
  if (!modulePermissionsComponents[slug]) {
    modulePermissionsComponents[slug] = createPlaceholderPermissions(slug.charAt(0).toUpperCase() + slug.slice(1));
  }
});

export default ModuleLoader;
