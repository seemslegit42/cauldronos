import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Form, 
  Input, 
  Button, 
  Tabs, 
  Switch, 
  Upload, 
  Divider, 
  Space, 
  List,
  Avatar,
  Tag,
  Alert,
  Modal,
  Select
} from 'antd';
import { 
  UploadOutlined, 
  UserOutlined, 
  LockOutlined, 
  BellOutlined, 
  EyeOutlined, 
  EyeInvisibleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  GlobalOutlined,
  SettingOutlined,
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from 'wasp/client/auth';
import { useTheme } from '../ui/theme/useTheme';

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

// Mock data for user sessions
const mockSessions = [
  {
    id: '1',
    device: 'Chrome on Windows',
    ip: '192.168.1.1',
    location: 'New York, USA',
    lastActive: new Date(Date.now() - 1000 * 60).toISOString(), // 1 minute ago
    isCurrent: true
  },
  {
    id: '2',
    device: 'Safari on macOS',
    ip: '192.168.1.2',
    location: 'San Francisco, USA',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isCurrent: false
  },
  {
    id: '3',
    device: 'Firefox on Ubuntu',
    ip: '192.168.1.3',
    location: 'London, UK',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    isCurrent: false
  }
];

// Format relative time
const formatRelativeTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day ago`;
  
  return date.toLocaleDateString();
};

const AccountSettings: React.FC = () => {
  const { data: user, updateUserProfile } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [sessions] = useState(mockSessions);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Initialize form with current user data
  useEffect(() => {
    if (user) {
      profileForm.setFieldsValue({
        username: user.username,
        email: user.email,
        name: user.name || '',
        bio: user.bio || '',
        language: user.language || 'en-US',
        darkMode: isDarkMode
      });
    }
  }, [user, profileForm, isDarkMode]);

  // Handle profile form submission
  const handleProfileSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // await updateUserProfile(values);
      
      console.log('Updating profile with values:', values);
      
      // Update theme if changed
      if (values.darkMode !== isDarkMode) {
        toggleTheme();
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsLoading(false);
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // await updatePassword(values.currentPassword, values.newPassword);
      
      console.log('Updating password');
      
      passwordForm.resetFields();
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating password:', error);
      setIsLoading(false);
    }
  };

  // Handle session revoke
  const handleRevokeSession = (sessionId: string) => {
    confirm({
      title: 'Revoke Session',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to revoke this session? The user will be logged out immediately.',
      onOk() {
        console.log('Revoking session:', sessionId);
      }
    });
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'delete my account') {
      return;
    }
    
    // In a real app, this would be an API call
    // await deleteAccount();
    
    console.log('Deleting account');
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
        <Title level={2} className="mb-6">Account Settings</Title>
        
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="mb-6"
        >
          <TabPane 
            tab={
              <span>
                <UserOutlined />
                Profile
              </span>
            } 
            key="profile"
          >
            <Card>
              <Form
                form={profileForm}
                layout="vertical"
                onFinish={handleProfileSubmit}
              >
                <div className="flex items-center mb-6">
                  <Avatar 
                    size={64} 
                    src={user?.avatarUrl}
                    icon={!user?.avatarUrl && <UserOutlined />}
                    className="mr-4"
                  />
                  <Upload
                    name="avatar"
                    listType="picture"
                    maxCount={1}
                    showUploadList={false}
                    beforeUpload={() => false}
                  >
                    <Button icon={<UploadOutlined />}>Change Avatar</Button>
                  </Upload>
                </div>
                
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Please enter your username' }]}
                >
                  <Input prefix={<UserOutlined />} />
                </Form.Item>
                
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input disabled />
                </Form.Item>
                
                <Form.Item
                  name="name"
                  label="Full Name"
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="bio"
                  label="Bio"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
                
                <Form.Item
                  name="language"
                  label="Language"
                  initialValue="en-US"
                >
                  <Select>
                    <Option value="en-US">English (US)</Option>
                    <Option value="en-GB">English (UK)</Option>
                    <Option value="es">Spanish</Option>
                    <Option value="fr">French</Option>
                    <Option value="de">German</Option>
                    <Option value="ja">Japanese</Option>
                    <Option value="zh-CN">Chinese (Simplified)</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="darkMode"
                  label="Theme"
                  valuePropName="checked"
                >
                  <Switch 
                    checkedChildren={<MoonOutlined />} 
                    unCheckedChildren={<SunOutlined />} 
                    defaultChecked={isDarkMode}
                  />
                  <Text className="ml-2 text-sm text-gray-500">
                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
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
                <LockOutlined />
                Security
              </span>
            } 
            key="security"
          >
            <Card title="Change Password" className="mb-6">
              <Form
                form={passwordForm}
                layout="vertical"
                onFinish={handlePasswordSubmit}
              >
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[{ required: true, message: 'Please enter your current password' }]}
                >
                  <Input.Password 
                    prefix={<LockOutlined />}
                    iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: 'Please enter your new password' },
                    { min: 8, message: 'Password must be at least 8 characters' }
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined />}
                    iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                
                <Form.Item
                  name="confirmPassword"
                  label="Confirm New Password"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your new password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match'));
                      },
                    }),
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined />}
                    iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Update Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            
            <Card title="Active Sessions" className="mb-6">
              <List
                itemLayout="horizontal"
                dataSource={sessions}
                renderItem={item => (
                  <List.Item
                    actions={[
                      !item.isCurrent && (
                        <Button 
                          danger 
                          onClick={() => handleRevokeSession(item.id)}
                        >
                          Revoke
                        </Button>
                      )
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <div className="flex items-center">
                          <span className="mr-2">{item.device}</span>
                          {item.isCurrent && <Tag color="green">Current</Tag>}
                        </div>
                      }
                      description={
                        <div>
                          <div>IP: {item.ip} • Location: {item.location}</div>
                          <div className="text-xs text-gray-500">
                            Last active: {formatRelativeTime(item.lastActive)}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
              <Button danger>Revoke All Other Sessions</Button>
            </Card>
            
            <Card title="Two-Factor Authentication">
              <Paragraph>
                Add an extra layer of security to your account by enabling two-factor authentication.
              </Paragraph>
              <Button type="primary">Enable 2FA</Button>
            </Card>
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
            <Card>
              <Title level={4}>Email Notifications</Title>
              
              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    id: 'email_workspace_updates',
                    title: 'Workspace Updates',
                    description: 'Receive emails about important workspace changes',
                    enabled: true
                  },
                  {
                    id: 'email_mentions',
                    title: 'Mentions',
                    description: 'Receive emails when you are mentioned in comments',
                    enabled: true
                  },
                  {
                    id: 'email_direct_messages',
                    title: 'Direct Messages',
                    description: 'Receive emails for new direct messages',
                    enabled: false
                  },
                  {
                    id: 'email_marketing',
                    title: 'Marketing',
                    description: 'Receive emails about new features and promotions',
                    enabled: false
                  }
                ]}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Switch defaultChecked={item.enabled} />
                    ]}
                  >
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
              
              <Divider />
              
              <Title level={4}>In-App Notifications</Title>
              
              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    id: 'app_workspace_updates',
                    title: 'Workspace Updates',
                    description: 'Receive notifications about important workspace changes',
                    enabled: true
                  },
                  {
                    id: 'app_mentions',
                    title: 'Mentions',
                    description: 'Receive notifications when you are mentioned in comments',
                    enabled: true
                  },
                  {
                    id: 'app_direct_messages',
                    title: 'Direct Messages',
                    description: 'Receive notifications for new direct messages',
                    enabled: true
                  },
                  {
                    id: 'app_task_assignments',
                    title: 'Task Assignments',
                    description: 'Receive notifications when you are assigned a task',
                    enabled: true
                  }
                ]}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Switch defaultChecked={item.enabled} />
                    ]}
                  >
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <SettingOutlined />
                Preferences
              </span>
            } 
            key="preferences"
          >
            <Card>
              <Title level={4}>Display</Title>
              
              <Form layout="vertical">
                <Form.Item
                  name="theme"
                  label="Theme"
                  initialValue={isDarkMode ? 'dark' : 'light'}
                >
                  <Select onChange={(value) => {
                    if ((value === 'dark' && !isDarkMode) || (value === 'light' && isDarkMode)) {
                      toggleTheme();
                    }
                  }}>
                    <Option value="light">Light</Option>
                    <Option value="dark">Dark</Option>
                    <Option value="system">System Default</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="density"
                  label="Interface Density"
                  initialValue="default"
                >
                  <Select>
                    <Option value="compact">Compact</Option>
                    <Option value="default">Default</Option>
                    <Option value="comfortable">Comfortable</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="animations"
                  label="Animations"
                  valuePropName="checked"
                  initialValue={true}
                >
                  <Switch />
                  <Text className="ml-2 text-sm text-gray-500">
                    Enable animations and transitions
                  </Text>
                </Form.Item>
              </Form>
              
              <Divider />
              
              <Title level={4}>Accessibility</Title>
              
              <Form layout="vertical">
                <Form.Item
                  name="reducedMotion"
                  label="Reduced Motion"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch />
                  <Text className="ml-2 text-sm text-gray-500">
                    Reduce or eliminate motion effects
                  </Text>
                </Form.Item>
                
                <Form.Item
                  name="highContrast"
                  label="High Contrast"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch />
                  <Text className="ml-2 text-sm text-gray-500">
                    Increase contrast for better visibility
                  </Text>
                </Form.Item>
                
                <Form.Item
                  name="fontSize"
                  label="Font Size"
                  initialValue="default"
                >
                  <Select>
                    <Option value="small">Small</Option>
                    <Option value="default">Default</Option>
                    <Option value="large">Large</Option>
                    <Option value="x-large">Extra Large</Option>
                  </Select>
                </Form.Item>
              </Form>
              
              <Button type="primary" className="mt-4">
                Save Preferences
              </Button>
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
              
              <Title level={4}>Delete Account</Title>
              <Paragraph>
                Permanently delete your account and all of your data. This action cannot be undone.
              </Paragraph>
              <Button danger onClick={showDeleteConfirm}>Delete Account</Button>
            </Card>
          </TabPane>
        </Tabs>
        
        {/* Delete Account Modal */}
        <Modal
          title={
            <div className="flex items-center text-red-500">
              <ExclamationCircleOutlined className="mr-2" />
              Delete Account
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
              disabled={deleteConfirmText !== 'delete my account'}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          ]}
        >
          <Paragraph>
            This action <Text strong>cannot be undone</Text>. This will permanently delete your
            account and remove your access to all workspaces.
          </Paragraph>
          
          <Paragraph>
            Please type <Text code>delete my account</Text> to confirm:
          </Paragraph>
          
          <Input
            value={deleteConfirmText}
            onChange={e => setDeleteConfirmText(e.target.value)}
            placeholder="delete my account"
            className="mb-4"
          />
        </Modal>
      </motion.div>
    </MainLayout>
  );
};

export default AccountSettings;