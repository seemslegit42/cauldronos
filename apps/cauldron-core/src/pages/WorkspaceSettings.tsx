import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Form, 
  Input, 
  Button, 
  Tabs, 
  Switch, 
  Select, 
  Upload, 
  Divider, 
  Space, 
  Tag,
  Alert,
  List,
  Avatar,
  Badge,
  Tooltip,
  Modal
} from 'antd';
import { 
  UploadOutlined, 
  TeamOutlined, 
  SettingOutlined, 
  CreditCardOutlined, 
  GlobalOutlined, 
  LockOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { useWorkspaces } from '../workspace/operations';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

// Mock data for workspace members
const mockMembers = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john.doe@example.com',
    role: 'ADMIN',
    status: 'active',
    avatarUrl: null,
    joinedAt: '2023-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    username: 'janesmith',
    email: 'jane.smith@example.com',
    role: 'MANAGER',
    status: 'active',
    avatarUrl: null,
    joinedAt: '2023-02-20T00:00:00.000Z'
  },
  {
    id: '3',
    username: 'bobwilson',
    email: 'bob.wilson@example.com',
    role: 'USER',
    status: 'active',
    avatarUrl: null,
    joinedAt: '2023-03-10T00:00:00.000Z'
  }
];

// Mock data for billing plans
const billingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    features: [
      '3 team members',
      '5 modules',
      '1GB storage',
      'Community support'
    ],
    isCurrent: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12',
    period: 'per user/month',
    features: [
      'Unlimited team members',
      'All modules',
      '10GB storage',
      'Priority support',
      'Advanced analytics'
    ],
    isCurrent: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited everything',
      'Dedicated support',
      'Custom modules',
      'SSO & advanced security',
      'SLA guarantees'
    ],
    isCurrent: false
  }
];

// Get role color
const getRoleColor = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'red';
    case 'MANAGER':
      return 'blue';
    case 'USER':
      return 'green';
    default:
      return 'default';
  }
};

const WorkspaceSettings: React.FC = () => {
  const { currentWorkspace, updateWorkspace } = useWorkspaces();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [members] = useState(mockMembers);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // await updateWorkspace(currentWorkspace?.id, values);
      
      console.log('Updating workspace with values:', values);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating workspace:', error);
      setIsLoading(false);
    }
  };

  // Initialize form with current workspace data
  React.useEffect(() => {
    if (currentWorkspace) {
      form.setFieldsValue({
        name: currentWorkspace.name,
        slug: currentWorkspace.slug,
        description: currentWorkspace.description,
        isPublic: currentWorkspace.isPublic,
        defaultRole: currentWorkspace.defaultRole || 'USER'
      });
    }
  }, [currentWorkspace, form]);

  // Handle delete workspace
  const handleDeleteWorkspace = () => {
    if (deleteConfirmText !== currentWorkspace?.name) {
      return;
    }
    
    // In a real app, this would be an API call
    // await deleteWorkspace(currentWorkspace?.id);
    
    console.log('Deleting workspace:', currentWorkspace?.id);
    setIsDeleteModalVisible(false);
  };

  // Show delete confirmation
  const showDeleteConfirm = () => {
    setIsDeleteModalVisible(true);
  };

  return (
    <MainLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Title level={2} className="mb-6">Workspace Settings</Title>
        
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="mb-6"
        >
          <TabPane 
            tab={
              <span>
                <SettingOutlined />
                General
              </span>
            } 
            key="general"
          >
            <Card>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="name"
                  label="Workspace Name"
                  rules={[{ required: true, message: 'Please enter a workspace name' }]}
                >
                  <Input placeholder="My Workspace" />
                </Form.Item>
                
                <Form.Item
                  name="slug"
                  label="Workspace Slug"
                  rules={[
                    { required: true, message: 'Please enter a workspace slug' },
                    { pattern: /^[a-z0-9-]+$/, message: 'Slug can only contain lowercase letters, numbers, and hyphens' }
                  ]}
                  extra="This will be used in URLs."
                >
                  <Input placeholder="my-workspace" addonBefore="cauldronos.app/" disabled />
                </Form.Item>
                
                <Form.Item
                  name="description"
                  label="Description"
                >
                  <Input.TextArea placeholder="Describe your workspace" rows={3} />
                </Form.Item>
                
                <Form.Item
                  name="logoUrl"
                  label="Workspace Logo"
                >
                  <Upload
                    name="logo"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false}
                  >
                    <Button icon={<UploadOutlined />}>Upload Logo</Button>
                  </Upload>
                </Form.Item>
                
                <Form.Item
                  name="defaultRole"
                  label="Default Role for New Members"
                  initialValue="USER"
                >
                  <Select>
                    <Option value="USER">User</Option>
                    <Option value="MANAGER">Manager</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="isPublic"
                  label="Workspace Visibility"
                  valuePropName="checked"
                >
                  <Switch 
                    checkedChildren={<GlobalOutlined />} 
                    unCheckedChildren={<LockOutlined />} 
                  />
                  <Text className="ml-2 text-sm text-gray-500">
                    Make workspace discoverable by other users
                  </Text>
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
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
            <Card>
              <div className="flex justify-between items-center mb-4">
                <Title level={4} className="mb-0">Workspace Members</Title>
                <Button type="primary" icon={<PlusOutlined />}>
                  Invite Member
                </Button>
              </div>
              
              <List
                itemLayout="horizontal"
                dataSource={members}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Select 
                        defaultValue={item.role} 
                        style={{ width: 120 }}
                        disabled={item.id === '1'} // Disable for workspace owner
                      >
                        <Option value="ADMIN">Admin</Option>
                        <Option value="MANAGER">Manager</Option>
                        <Option value="USER">User</Option>
                      </Select>,
                      item.id !== '1' && (
                        <Button 
                          type="text" 
                          danger 
                          icon={<DeleteOutlined />}
                          title="Remove from workspace"
                        />
                      )
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar 
                          src={item.avatarUrl} 
                          icon={!item.avatarUrl && <UserOutlined />}
                        />
                      }
                      title={
                        <div className="flex items-center">
                          <span className="mr-2">{item.username}</span>
                          <Tag color={getRoleColor(item.role)}>{item.role}</Tag>
                          {item.id === '1' && (
                            <Tooltip title="Workspace Owner">
                              <Badge status="processing" />
                            </Tooltip>
                          )}
                        </div>
                      }
                      description={
                        <div>
                          <div>{item.email}</div>
                          <div className="text-xs text-gray-500">
                            Joined {new Date(item.joinedAt).toLocaleDateString()}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
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
            <Card>
              <Title level={4}>Current Plan</Title>
              <Paragraph>
                You are currently on the <Tag color="blue">{currentWorkspace?.plan || 'Free'}</Tag> plan.
              </Paragraph>
              
              <Divider />
              
              <Title level={4}>Available Plans</Title>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {billingPlans.map(plan => (
                  <Card 
                    key={plan.id} 
                    title={plan.name}
                    extra={plan.isCurrent && <Tag color="green">Current</Tag>}
                    className={plan.isCurrent ? 'border-blue-500' : ''}
                  >
                    <div className="text-2xl font-bold mb-2">{plan.price}</div>
                    {plan.period && <div className="text-sm text-gray-500 mb-4">{plan.period}</div>}
                    
                    <ul className="pl-5 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="mb-1">{feature}</li>
                      ))}
                    </ul>
                    
                    <Button 
                      type={plan.isCurrent ? 'default' : 'primary'} 
                      block
                      disabled={plan.isCurrent}
                    >
                      {plan.isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                    </Button>
                  </Card>
                ))}
              </div>
              
              <Divider />
              
              <Title level={4}>Billing Information</Title>
              <Paragraph>
                Manage your billing information and view past invoices.
              </Paragraph>
              <Space>
                <Button>Update Payment Method</Button>
                <Button>View Invoices</Button>
              </Space>
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <DeleteOutlined />
                Danger Zone
              </span>
            } 
            key="danger"
          >
            <Card>
              <Alert
                message="Danger Zone"
                description="Actions here can't be undone. Be careful!"
                type="error"
                showIcon
                className="mb-6"
              />
              
              <Title level={4}>Delete Workspace</Title>
              <Paragraph>
                Permanently delete this workspace and all of its data. This action cannot be undone.
              </Paragraph>
              <Button danger onClick={showDeleteConfirm}>Delete Workspace</Button>
            </Card>
          </TabPane>
        </Tabs>
        
        {/* Delete Workspace Modal */}
        <Modal
          title={
            <div className="flex items-center text-red-500">
              <ExclamationCircleOutlined className="mr-2" />
              Delete Workspace
            </div>
          }
          open={isDeleteModalVisible}
          onCancel={() => setIsDeleteModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
              Cancel
            </Button>,
            <Button 
              key="delete" 
              danger 
              type="primary"
              disabled={deleteConfirmText !== currentWorkspace?.name}
              onClick={handleDeleteWorkspace}
            >
              Delete Workspace
            </Button>
          ]}
        >
          <Paragraph>
            This action <Text strong>cannot be undone</Text>. This will permanently delete the
            <Text strong> {currentWorkspace?.name}</Text> workspace, all of its data, and remove all
            team members from the workspace.
          </Paragraph>
          
          <Paragraph>
            Please type <Text code>{currentWorkspace?.name}</Text> to confirm:
          </Paragraph>
          
          <Input
            value={deleteConfirmText}
            onChange={e => setDeleteConfirmText(e.target.value)}
            placeholder={currentWorkspace?.name}
            className="mb-4"
          />
        </Modal>
      </motion.div>
    </MainLayout>
  );
};

export default WorkspaceSettings;