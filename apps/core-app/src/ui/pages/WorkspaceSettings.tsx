// ... other imports
import { BgColorsOutlined } from '@ant-design/icons'; // Add if not present
import ThemeSettings from '../theme/ThemeSettings'; // Import the component

// ... inside the WorkspaceSettings component function

return (
  <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER']}>
    <WorkspaceAccess>
      <div>
        <div className="mb-6">
          <Title level={2}>Workspace Settings</Title>
          <Text type="secondary">
            Manage your workspace settings and preferences
          </Text>
        </div>

        {/* Keep activeTab state */}
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                General
              </span>
            }
            key="general"
          >
            {/* ... existing General tab content ... */}
          </TabPane>

          <TabPane
            tab={
              <span>
                <TeamOutlined />
                Members
              </span>
            }
            key="members"
          >
            {/* ... existing Members tab content ... */}
          </TabPane>

          <TabPane
            tab={
              <span>
                <CreditCardOutlined />
                Billing
              </span>
            }
            key="billing"
          >
            {/* ... existing Billing tab content ... */}
          </TabPane>

          <TabPane
            tab={
              <span>
                <SecurityScanOutlined />
                Security
              </span>
            }
            key="security"
          >
            {/* ... existing Security tab content ... */}
          </TabPane>

          <TabPane
            tab={
              <span>
                <BellOutlined />
                Notifications
              </span>
            }
            key="notifications"
          >
            {/* ... existing Notifications tab content ... */}
          </TabPane>

          {/* ***** ADD THEME TAB ***** */}
          <TabPane
            tab={
              <span>
                <BgColorsOutlined />
                Theme
              </span>
            }
            key="theme"
          >
            <ThemeSettings isAdmin={true} />
            {/* Assuming ThemeSettings handles its own saving or uses a context */}
            {/* Pass necessary props if ThemeSettings needs workspace context */}
          </TabPane>
          {/* ***** END ADD THEME TAB ***** */}

        </Tabs>

        {/* ... existing Modal ... */}
      </div>
    </WorkspaceAccess>
  </RoleBasedAccess>
);

// ... rest of the component
import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Divider,
  Space,
  Alert,
  Descriptions,
  Badge,
  Row,
  Col,
  Avatar,
  Table,
  Modal,
  Input,
  Button,
  Statistic,
  Progress
} from 'antd';
import {
  UploadOutlined,
  SaveOutlined,
  CreditCardOutlined,
  TeamOutlined,
  SettingOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  GlobalOutlined,
  BellOutlined,
  CloudOutlined,
  DatabaseOutlined,
  SecurityScanOutlined,
  DownloadOutlined,
  BgColorsOutlined
} from '@ant-design/icons';
import { useWorkspaces, useWorkspaceStats, useWorkspaceActivity, useWorkspaceMembers } from '../workspace/operations';
import RoleBasedAccess from '../auth/RoleBasedAccess';
import { useAuth } from 'wasp/client/auth';
import WorkspaceAccess from '../auth/WorkspaceAccess';
import WorkspaceForm from '../workspace/components/WorkspaceForm';
import WorkspaceMemberList from '../workspace/components/WorkspaceMemberList';
import WorkspaceConfigPanel from '../workspace/components/WorkspaceConfigPanel';
import ThemeSettings from '../theme/ThemeSettings';
import { cx, getColorFromString, getInitials } from '../utils/styleUtils';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

// Mock data for workspace usage
const workspaceUsage = {
  storage: {
    used: 2.4,
    total: 5,
    unit: 'GB'
  },
  users: {
    used: 6,
    total: 10
  },
  modules: {
    used: 3,
    total: 'Unlimited'
  }
};

// Mock data for workspace activity
const workspaceActivity = [
  {
    id: '1',
    action: 'Updated workspace settings',
    user: 'John Doe',
    timestamp: '2023-04-20T10:30:00Z'
  },
  {
    id: '2',
    action: 'Added new user',
    user: 'John Doe',
    timestamp: '2023-04-19T14:45:00Z'
  },
  {
    id: '3',
    action: 'Changed workspace plan',
    user: 'Jane Smith',
    timestamp: '2023-04-18T09:15:00Z'
  }
];

// Mock data for available plans
const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic features for small teams',
    features: [
      '5 GB Storage',
      'Up to 10 Users',
      'Basic Modules',
      'Community Support'
    ],
    isPopular: false,
    isCurrentPlan: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    description: 'Advanced features for growing teams',
    features: [
      '20 GB Storage',
      'Up to 50 Users',
      'All Modules',
      'Priority Support',
      'Advanced Analytics'
    ],
    isPopular: true,
    isCurrentPlan: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49,
    description: 'Complete solution for large organizations',
    features: [
      'Unlimited Storage',
      'Unlimited Users',
      'All Modules',
      'Premium Support',
      'Advanced Security',
      'Custom Integrations'
    ],
    isPopular: false,
    isCurrentPlan: false
  }
];

const WorkspaceSettings: React.FC = () => {
  const { data: user } = useAuth();
  const {
    currentWorkspace,
    updateWorkspace,
    deleteWorkspace,
    isUpdating,
    isDeleting
  } = useWorkspaces();

  const { stats, isLoading: isLoadingStats } = useWorkspaceStats(currentWorkspace?.id);
  const { activities, isLoading: isLoadingActivities } = useWorkspaceActivity(currentWorkspace?.id, 5);
  const { members, isLoading: isLoadingMembers } = useWorkspaceMembers(currentWorkspace?.id);

  const [activeTab, setActiveTab] = useState('general');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [workspaceConfig, setWorkspaceConfig] = useState({
    defaultRole: 'USER',
    allowPublicModules: true,
    allowExternalMembers: true,
    dataRetentionDays: 90,
    securitySettings: {
      twoFactorAuthRequired: false,
      passwordPolicy: 'medium',
      sessionTimeout: 30,
      ipRestrictions: false,
      allowedIpAddresses: []
    },
    notificationSettings: {
      userJoined: true,
      userLeft: true,
      moduleInstalled: true,
      billingUpdates: true,
      securityAlerts: true,
      weeklyDigest: false
    }
  });

  // Update workspace config when workspace changes
  useEffect(() => {
    if (currentWorkspace) {
      // In a real app, you would fetch the config from the API
      // For now, we'll just use the default config
      setWorkspaceConfig({
        ...workspaceConfig,
        defaultRole: currentWorkspace.defaultRole || 'USER'
      });
    }
  }, [currentWorkspace]);

  const handleUpdateWorkspace = async (data: any) => {
    if (!currentWorkspace) {
      return;
    }

    try {
      await updateWorkspace(currentWorkspace.id, data);
    } catch (error) {
      console.error('Error updating workspace:', error);
    }
  };

  const handleUpdateWorkspaceConfig = async (config: any) => {
    if (!currentWorkspace) {
      return;
    }

    try {
      // In a real app, you would call an API to update the config
      setWorkspaceConfig({
        ...workspaceConfig,
        ...config
      });
    } catch (error) {
      console.error('Error updating workspace config:', error);
    }
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setDeleteConfirmText('');
  };

  const handleDeleteWorkspace = async () => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    if (deleteConfirmText === currentWorkspace.name) {
      try {
        await deleteWorkspace(currentWorkspace.id);
        setIsDeleteModalVisible(false);
        setDeleteConfirmText('');
        // Navigate to workspace selection or dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Error deleting workspace:', error);
      }
    } else {
      message.error('Workspace name does not match');
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const getWorkspaceInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'WS';
  };

  const getWorkspaceColor = (name: string) => {
    const colors = [
      '#1677ff', // blue
      '#52c41a', // green
      '#722ed1', // purple
      '#eb2f96', // pink
      '#fa8c16', // orange
      '#13c2c2', // cyan
      '#f5222d', // red
    ];

    const hash = name?.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0) || 0;

    return colors[hash % colors.length];
  };

  const activityColumns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER']}>
      <WorkspaceAccess>
        <div>
          <div className="mb-6">
            <Title level={2}>Workspace Settings</Title>
            <Text type="secondary">
              Manage your workspace settings and preferences
            </Text>
          </div>

          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane
              tab={
                <span>
                  <SettingOutlined />
                  General
                </span>
              }
              key="general"
            >
              <Card className="shadow-sm">
                <div className="flex items-center mb-6">
                  {currentWorkspace?.logoUrl ? (
                    <Avatar
                      size={64}
                      src={currentWorkspace.logoUrl}
                      style={{ marginRight: '16px' }}
                    />
                  ) : (
                    <Avatar
                      size={64}
                      style={{
                        backgroundColor: getColorFromString(currentWorkspace?.name || 'Default'),
                        marginRight: '16px'
                      }}
                    >
                      {getInitials(currentWorkspace?.name || 'Default')}
                    </Avatar>
                  )}
                  <div>
                    <Title level={4} className="mb-0">{currentWorkspace?.name || 'Default Workspace'}</Title>
                    <Text type="secondary">
                      Created {currentWorkspace?.createdAt && new Date(currentWorkspace.createdAt).toLocaleDateString()} • {currentWorkspace?.memberCount || 0} members
                    </Text>
                  </div>
                </div>

                <WorkspaceForm
                  initialValues={currentWorkspace}
                  onSubmit={handleUpdateWorkspace}
                  isSubmitting={isUpdating}
                  mode="edit"
                />
              </Card>

              <Card className="mt-6 shadow-sm">
                <Title level={4}>Workspace Usage</Title>
                <Row gutter={16} className="mt-4">
                  <Col span={8}>
                    <Card className="text-center">
                      <Statistic
                        title="Storage"
                        value={stats?.storage.used || 0}
                        suffix={`/ ${stats?.storage.total || 0} ${stats?.storage.unit || 'GB'}`}
                      />
                      <Progress
                        percent={Math.round(((stats?.storage.used || 0) / (stats?.storage.total || 1)) * 100)}
                        status="active"
                        className="mt-2"
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card className="text-center">
                      <Statistic
                        title="Users"
                        value={stats?.users.used || 0}
                        suffix={`/ ${stats?.users.total || 0}`}
                      />
                      <Progress
                        percent={Math.round(((stats?.users.used || 0) / (stats?.users.total || 1)) * 100)}
                        status="active"
                        className="mt-2"
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card className="text-center">
                      <Statistic
                        title="Modules"
                        value={stats?.modules.used || 0}
                        suffix={`/ ${stats?.modules.total || 0}`}
                      />
                      <Progress
                        percent={typeof stats?.modules.total === 'string' ? 100 : Math.round(((stats?.modules.used || 0) / (stats?.modules.total as number || 1)) * 100)}
                        status="success"
                        className="mt-2"
                      />
                    </Card>
                  </Col>
                </Row>
              </Card>

              <Card className="mt-6 shadow-sm">
                <Title level={4}>Recent Activity</Title>
                <Table
                  columns={activityColumns}
                  dataSource={activities}
                  rowKey="id"
                  pagination={false}
                  loading={isLoadingActivities}
                />
              </Card>

              <Card className="mt-6 shadow-sm bg-red-50">
                <Title level={4} className="text-red-500">Danger Zone</Title>
                <Paragraph className="text-red-500">
                  Once you delete a workspace, there is no going back. Please be certain.
                </Paragraph>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={showDeleteModal}
                >
                  Delete Workspace
                </Button>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <TeamOutlined />
                  Members
                </span>
              }
              key="members"
            >
              <Card className="shadow-sm">
                <WorkspaceMemberList
                  workspaceId={currentWorkspace?.id || ''}
                  currentUserId={user?.id}
                />
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <CreditCardOutlined />
                  Billing
                </span>
              }
              key="billing"
            >
              <Card className="shadow-sm">
                <div className="mb-6">
                  <Title level={4}>Current Plan</Title>
                  <Descriptions bordered>
                    <Descriptions.Item label="Plan" span={3}>
                      <Tag color="blue">{currentWorkspace?.plan?.toUpperCase() || 'FREE'}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                      <Badge
                        status={currentWorkspace?.subscriptionStatus === 'active' ? 'success' : 'warning'}
                        text={currentWorkspace?.subscriptionStatus?.toUpperCase() || 'FREE'}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item label="Billing Cycle" span={3}>
                      Monthly
                    </Descriptions.Item>
                    <Descriptions.Item label="Next Billing Date" span={3}>
                      {currentWorkspace?.subscriptionStatus === 'active'
                        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
                        : 'N/A'
                      }
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <Divider />

                <div className="mb-6">
                  <Title level={4}>Available Plans</Title>
                  <Row gutter={16} className="mt-4">
                    {plans.map(plan => (
                      <Col span={8} key={plan.id}>
                        <Card
                          className={`h-full ${plan.isPopular ? 'border-blue-500' : ''}`}
                          title={
                            <div className="text-center">
                              <div className="text-xl font-bold">{plan.name}</div>
                              <div className="text-3xl font-bold mt-2">
                                ${plan.price}<span className="text-sm text-gray-500">/month</span>
                              </div>
                            </div>
                          }
                          extra={plan.isPopular && <Tag color="blue">Popular</Tag>}
                          actions={[
                            plan.isCurrentPlan ? (
                              <Button disabled>Current Plan</Button>
                            ) : (
                              <Button
                                type="primary"
                                onClick={() => setSelectedPlan(plan.id)}
                              >
                                {plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                              </Button>
                            )
                          ]}
                        >
                          <div className="text-sm text-gray-500 text-center mb-4">
                            {plan.description}
                          </div>
                          <ul className="list-disc pl-5">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="mb-2">{feature}</li>
                            ))}
                          </ul>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>

                <Divider />

                <div className="mb-6">
                  <Title level={4}>Billing Information</Title>
                  <Form
                    form={billingForm}
                    layout="vertical"
                    initialValues={{
                      billingEmail: currentWorkspace?.billingEmail || user?.email,
                      billingName: currentWorkspace?.billingName,
                      billingAddress: currentWorkspace?.billingAddress,
                      billingPhone: currentWorkspace?.billingPhone,
                      billingCountry: 'US'
                    }}
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="billingEmail"
                          label="Billing Email"
                          rules={[
                            { required: true, message: 'Please enter a billing email' },
                            { type: 'email', message: 'Please enter a valid email address' }
                          ]}
                        >
                          <Input placeholder="billing@example.com" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="billingName"
                          label="Billing Name"
                          rules={[{ required: true, message: 'Please enter a billing name' }]}
                        >
                          <Input placeholder="Company Name or Full Name" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="billingCountry"
                          label="Country"
                          rules={[{ required: true, message: 'Please select a country' }]}
                        >
                          <Select>
                            <Option value="US">United States</Option>
                            <Option value="CA">Canada</Option>
                            <Option value="UK">United Kingdom</Option>
                            <Option value="AU">Australia</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="billingPhone"
                          label="Billing Phone"
                        >
                          <Input placeholder="+1 (555) 123-4567" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name="billingAddress"
                      label="Billing Address"
                      rules={[{ required: true, message: 'Please enter a billing address' }]}
                    >
                      <TextArea placeholder="Full billing address" rows={3} />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={handleSaveBilling}
                        loading={isSubmitting}
                      >
                        Save Billing Information
                      </Button>
                    </Form.Item>
                  </Form>
                </div>

                <Divider />

                <div>
                  <Title level={4}>Payment Methods</Title>
                  <Alert
                    message="No payment methods on file"
                    description="Add a payment method to upgrade to a paid plan."
                    type="info"
                    showIcon
                    action={
                      <Button size="small" type="primary" icon={<PlusOutlined />}>
                        Add Payment Method
                      </Button>
                    }
                  />
                </div>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <SecurityScanOutlined />
                  Security & Config
                </span>
              }
              key="security"
            >
              <WorkspaceConfigPanel
                workspaceId={currentWorkspace?.id || ''}
                config={workspaceConfig}
                onSave={handleUpdateWorkspaceConfig}
                isLoading={false}
              />

              <Card className="mt-6 shadow-sm">
                <Title level={4}>Data & Privacy</Title>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Data Storage Location">
                    <Space>
                      <CloudOutlined />
                      US East (N. Virginia)
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Data Encryption">
                    <Space>
                      <LockOutlined />
                      Enabled (AES-256)
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Backup Frequency">
                    <Space>
                      <DatabaseOutlined />
                      Daily
                    </Space>
                  </Descriptions.Item>
                </Descriptions>

                <div className="mt-4">
                  <Button icon={<DownloadOutlined />}>
                    Download Data Export
                  </Button>
                </div>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <BgColorsOutlined />
                  Theme
                </span>
              }
              key="theme"
            >
              <ThemeSettings isAdmin={true} />
            </TabPane>
          </Tabs>

          <Modal
            title={
              <div className="flex items-center text-red-500">
                <ExclamationCircleOutlined className="mr-2" />
                Delete Workspace
              </div>
            }
            open={isDeleteModalVisible}
            onCancel={handleDeleteCancel}
            footer={[
              <Button key="cancel" onClick={handleDeleteCancel}>
                Cancel
              </Button>,
              <Button
                key="delete"
                danger
                type="primary"
                onClick={handleDeleteWorkspace}
                disabled={deleteConfirmText !== currentWorkspace?.name}
                loading={isDeleting}
              >
                Delete Workspace
              </Button>,
            ]}
          >
            <Alert
              message="Warning: This action cannot be undone"
              description="This will permanently delete your workspace, all its data, and remove all members."
              type="error"
              showIcon
              className="mb-4"
            />
            <Paragraph>
              To confirm, please type the workspace name: <Text strong>{currentWorkspace?.name}</Text>
            </Paragraph>
            <Input
              placeholder="Type workspace name to confirm"
              value={deleteConfirmText}
              onChange={e => setDeleteConfirmText(e.target.value)}
              className="mt-2"
              status={deleteConfirmText && deleteConfirmText !== currentWorkspace?.name ? 'error' : ''}
            />
          </Modal>
        </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default WorkspaceSettings;
