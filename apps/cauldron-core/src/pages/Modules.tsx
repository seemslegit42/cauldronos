import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Button, 
  Switch, 
  Tabs, 
  Modal, 
  Empty, 
  Tag, 
  Tooltip, 
  Divider,
  Input,
  Badge
} from 'antd';
import { 
  AppstoreOutlined, 
  PlusOutlined, 
  SearchOutlined, 
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StarOutlined,
  StarFilled
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useModules } from '../modules/ModuleRegistry';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

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
      stiffness: 300,
      damping: 24
    }
  }
};

const Modules: React.FC = () => {
  const { modules, availableModules, installModule, uninstallModule, enableModule, disableModule } = useModules();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('installed');
  const [isInstallModalVisible, setIsInstallModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter modules based on search term
  const filteredInstalledModules = modules.filter(module => 
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailableModules = availableModules.filter(module => 
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle module toggle
  const handleModuleToggle = async (moduleId: string, enabled: boolean) => {
    try {
      setIsLoading(true);
      if (enabled) {
        await enableModule(moduleId);
      } else {
        await disableModule(moduleId);
      }
    } catch (error) {
      console.error('Error toggling module:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle module install
  const handleInstallModule = async () => {
    if (!selectedModule) return;
    
    try {
      setIsLoading(true);
      await installModule(selectedModule.id);
      setIsInstallModalVisible(false);
      setSelectedModule(null);
    } catch (error) {
      console.error('Error installing module:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle module uninstall
  const handleUninstallModule = async (moduleId: string) => {
    try {
      setIsLoading(true);
      await uninstallModule(moduleId);
    } catch (error) {
      console.error('Error uninstalling module:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show module details modal
  const showModuleDetails = (module: any) => {
    setSelectedModule(module);
    setIsInstallModalVisible(true);
  };

  // Render module card
  const renderModuleCard = (module: any, isInstalled: boolean) => {
    return (
      <Col xs={24} sm={12} lg={8} key={module.id}>
        <motion.div variants={itemVariants}>
          <Card 
            hoverable 
            className="h-full"
            actions={[
              isInstalled ? (
                <Tooltip title={module.isEnabled ? 'Disable Module' : 'Enable Module'}>
                  <Switch
                    checked={module.isEnabled}
                    onChange={(checked) => handleModuleToggle(module.id, checked)}
                    loading={isLoading}
                  />
                </Tooltip>
              ) : (
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => showModuleDetails(module)}
                  loading={isLoading}
                >
                  Install
                </Button>
              ),
              <Tooltip title="Module Details">
                <InfoCircleOutlined onClick={() => showModuleDetails(module)} />
              </Tooltip>,
              isInstalled && !module.isCore ? (
                <Tooltip title="Uninstall Module">
                  <Button 
                    type="text" 
                    danger
                    icon={<CloseCircleOutlined />} 
                    onClick={() => handleUninstallModule(module.id)}
                    loading={isLoading}
                  />
                </Tooltip>
              ) : (
                <Tooltip title={module.isCore ? 'Core Module' : 'Favorite'}>
                  {module.isCore ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                </Tooltip>
              )
            ]}
          >
            <div className="flex items-start">
              <div className="mr-4 text-2xl">
                {module.menuIcon || <AppstoreOutlined />}
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <Title level={5} className="mb-0 mr-2">{module.name}</Title>
                  {module.isCore && <Tag color="gold">Core</Tag>}
                  {isInstalled && module.isEnabled && <Badge status="success" text="Active" />}
                  {isInstalled && !module.isEnabled && <Badge status="default" text="Disabled" />}
                </div>
                <Paragraph ellipsis={{ rows: 2 }} className="text-sm text-gray-500">
                  {module.description}
                </Paragraph>
                <div className="mt-2">
                  <Tag color="blue">{module.category}</Tag>
                  <Tag color="purple">v{module.version}</Tag>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Col>
    );
  };

  return (
    <MainLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="mb-0">Modules</Title>
          <Search
            placeholder="Search modules..."
            allowClear
            onSearch={value => setSearchTerm(value)}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
          />
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="mb-6"
        >
          <TabPane 
            tab={
              <span>
                <CheckCircleOutlined />
                Installed ({modules.length})
              </span>
            } 
            key="installed"
          >
            {filteredInstalledModules.length > 0 ? (
              <Row gutter={[16, 16]}>
                {filteredInstalledModules.map(module => renderModuleCard(module, true))}
              </Row>
            ) : (
              <Empty 
                description={
                  searchTerm ? "No modules match your search" : "No modules installed yet"
                }
              />
            )}
          </TabPane>
          <TabPane 
            tab={
              <span>
                <AppstoreOutlined />
                Available ({availableModules.length})
              </span>
            } 
            key="available"
          >
            {filteredAvailableModules.length > 0 ? (
              <Row gutter={[16, 16]}>
                {filteredAvailableModules.map(module => renderModuleCard(module, false))}
              </Row>
            ) : (
              <Empty 
                description={
                  searchTerm ? "No modules match your search" : "No additional modules available"
                }
              />
            )}
          </TabPane>
        </Tabs>

        <Card className="mt-8">
          <div className="flex items-center mb-4">
            <AppstoreOutlined className="text-2xl mr-3" />
            <Title level={4} className="mb-0">Install New Module</Title>
          </div>
          <Paragraph>
            Extend your workspace functionality by installing new modules from the marketplace.
          </Paragraph>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setActiveTab('available')}
          >
            Browse Available Modules
          </Button>
        </Card>

        {/* Module Details Modal */}
        <Modal
          title={
            <div className="flex items-center">
              <div className="mr-3 text-xl">
                {selectedModule?.menuIcon || <AppstoreOutlined />}
              </div>
              <span>{selectedModule?.name}</span>
              {selectedModule?.isCore && <Tag color="gold" className="ml-2">Core</Tag>}
            </div>
          }
          open={isInstallModalVisible}
          onCancel={() => {
            setIsInstallModalVisible(false);
            setSelectedModule(null);
          }}
          footer={[
            <Button 
              key="cancel" 
              onClick={() => {
                setIsInstallModalVisible(false);
                setSelectedModule(null);
              }}
            >
              Cancel
            </Button>,
            selectedModule && !modules.find(m => m.id === selectedModule.id) ? (
              <Button 
                key="install" 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleInstallModule}
                loading={isLoading}
              >
                Install Module
              </Button>
            ) : (
              <Button 
                key="open" 
                type="primary"
                onClick={() => {
                  setIsInstallModalVisible(false);
                  // Navigate to module
                  if (selectedModule) {
                    window.location.href = selectedModule.path;
                  }
                }}
              >
                Open Module
              </Button>
            )
          ]}
          width={700}
        >
          {selectedModule && (
            <div>
              <Paragraph>{selectedModule.description}</Paragraph>
              
              <Divider />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text strong>Version:</Text>
                  <div>{selectedModule.version}</div>
                </div>
                <div>
                  <Text strong>Category:</Text>
                  <div>{selectedModule.category}</div>
                </div>
                <div>
                  <Text strong>Required Roles:</Text>
                  <div>
                    {selectedModule.requiredRoles.map((role: string) => (
                      <Tag key={role}>{role}</Tag>
                    ))}
                  </div>
                </div>
                <div>
                  <Text strong>Status:</Text>
                  <div>
                    {modules.find(m => m.id === selectedModule.id) ? (
                      selectedModule.isEnabled ? (
                        <Badge status="success" text="Active" />
                      ) : (
                        <Badge status="default" text="Disabled" />
                      )
                    ) : (
                      <Badge status="warning" text="Not Installed" />
                    )}
                  </div>
                </div>
              </div>
              
              <Divider />
              
              <Title level={5}>API Endpoints</Title>
              {selectedModule.apiEndpoints && selectedModule.apiEndpoints.length > 0 ? (
                <ul className="pl-5">
                  {selectedModule.apiEndpoints.map((endpoint: any, index: number) => (
                    <li key={index} className="mb-2">
                      <Tag color="blue">{endpoint.method}</Tag> {endpoint.path}
                      <div className="text-sm text-gray-500">{endpoint.description}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text type="secondary">No API endpoints defined</Text>
              )}
              
              {selectedModule.permissions && selectedModule.permissions.length > 0 && (
                <>
                  <Divider />
                  <Title level={5}>Permissions</Title>
                  <ul className="pl-5">
                    {selectedModule.permissions.map((permission: any) => (
                      <li key={permission.id} className="mb-2">
                        <Text strong>{permission.name}</Text>
                        <div className="text-sm text-gray-500">{permission.description}</div>
                        <div className="mt-1">
                          <Text type="secondary">Default roles: </Text>
                          {permission.defaultRoles.map((role: string) => (
                            <Tag key={role} color="green">{role}</Tag>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </Modal>
      </motion.div>
    </MainLayout>
  );
};

export default Modules;