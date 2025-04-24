import React, { useState } from 'react';
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Tabs,
  Upload,
  message,
  Divider,
  Switch,
  Select,
  Space,
  Modal,
  Avatar,
  Row,
  Col,
  Alert,
  Progress,
  Badge,
  Tooltip,
  List,
  Tag,
  Menu
} from 'antd';
import {
  UploadOutlined,
  SaveOutlined,
  UserOutlined,
  LockOutlined,
  BellOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MailOutlined,
  GlobalOutlined,
  MobileOutlined,
  KeyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  HistoryOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAuth } from 'wasp/client/auth';
import WorkspaceAccess from '../auth/WorkspaceAccess';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Mock data for account activity
const accountActivity = [
  {
    id: '1',
    action: 'Logged in',
    device: 'Chrome on Windows',
    location: 'New York, USA',
    timestamp: '2023-04-20T10:30:00Z',
    ip: '192.168.1.1'
  },
  {
    id: '2',
    action: 'Changed password',
    device: 'Chrome on Windows',
    location: 'New York, USA',
    timestamp: '2023-04-15T14:45:00Z',
    ip: '192.168.1.1'
  },
  {
    id: '3',
    action: 'Updated profile',
    device: 'Chrome on Windows',
    location: 'New York, USA',
    timestamp: '2023-04-10T09:15:00Z',
    ip: '192.168.1.1'
  }
];

// Mock data for connected apps
const connectedApps = [
  {
    id: 'app-1',
    name: 'Google Calendar',
    icon: '🗓️',
    connectedAt: '2023-03-15T10:30:00Z',
    permissions: ['Read calendar', 'Create events']
  },
  {
    id: 'app-2',
    name: 'Slack',
    icon: '💬',
    connectedAt: '2023-03-20T14:45:00Z',
    permissions: ['Send messages', 'Read channels']
  }
];

// Mock data for notification settings
const notificationSettings = [
  {
    id: 'notif-1',
    type: 'Account Security',
    description: 'Password changes, login attempts',
    email: true,
    inApp: true
  },
  {
    id: 'notif-2',
    type: 'Workspace Updates',
    description: 'New members, role changes',
    email: true,
    inApp: true
  },
  {
    id: 'notif-3',
    type: 'Module Activity',
    description: 'Updates from modules you use',
    email: false,
    inApp: true
  },
  {
    id: 'notif-4',
    type: 'Marketing',
    description: 'New features, tips, and promotions',
    email: false,
    inApp: false
  }
];

const AccountSettings: React.FC = () => {
  const { data: user } = useAuth();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [preferencesForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSaveProfile = async () => {
    try {
      setIsSubmitting(true);
      const values = await profileForm.validateFields();
      console.log('Update profile with values:', values);
      message.success('Profile updated successfully');
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setIsSubmitting(true);
      const values = await passwordForm.validateFields();
      console.log('Change password with values:', values);
      message.success('Password changed successfully');
      passwordForm.resetFields();
      setPasswordStrength(0);
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSavePreferences = async () => {
    try {
      setIsSubmitting(true);
      const values = await preferencesForm.validateFields();
      console.log('Update preferences with values:', values);
      message.success('Preferences updated successfully');
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      setIsSubmitting(true);
      const values = await notificationsForm.validateFields();
      console.log('Update notification settings with values:', values);
      message.success('Notification settings updated successfully');
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSecurity = async () => {
    try {
      setIsSubmitting(true);
      const values = await securityForm.validateFields();
      console.log('Update security settings with values:', values);
      message.success('Security settings updated successfully');
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setDeleteConfirmText('');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      console.log('Delete account');
      message.success('Account deletion request submitted');
      setIsDeleteModalVisible(false);
      setDeleteConfirmText('');
    } else {
      message.error('Confirmation text does not match');
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const checkPasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 20;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 20;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 20;

    // Contains number
    if (/[0-9]/.test(password)) strength += 20;

    // Contains special character
    if (/[^a-zA-Z0-9]/.test(password)) strength += 20;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthStatus = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength < 40) return 'exception';
    if (passwordStrength < 80) return 'normal';
    return 'success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 80) return 'Medium';
    return 'Strong';
  };

  const disconnectApp = (appId: string) => {
    Modal.confirm({
      title: 'Disconnect App',
      content: 'Are you sure you want to disconnect this app? You will need to reconnect it later if you want to use it again.',
      okText: 'Yes, Disconnect',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Disconnect app with ID:', appId);
        message.success('App disconnected successfully');
      }
    });
  };

  return (
    <WorkspaceAccess>
      <div>
        <div className="mb-6">
          <Title level={2}>Account Settings</Title>
          <Text type="secondary">
            Manage your personal account settings and preferences
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Card className="shadow-sm mb-4">
              <div className="flex flex-col items-center">
                <Avatar
                  size={80}
                  icon={<UserOutlined />}
                  src={user?.avatarUrl}
                  className="mb-4"
                />
                <Title level={4} className="mb-1">{user?.firstName} {user?.lastName}</Title>
                <Text type="secondary" className="mb-2">{user?.email}</Text>
                <Badge status="success" text="Active Account" />
              </div>

              <Divider />

              <Menu
                selectedKeys={[activeTab]}
                onClick={({ key }) => setActiveTab(key)}
                className="border-0"
              >
                <Menu.Item key="profile" icon={<UserOutlined />}>
                  Profile
                </Menu.Item>
                <Menu.Item key="password" icon={<LockOutlined />}>
                  Password
                </Menu.Item>
                <Menu.Item key="preferences" icon={<SettingOutlined />}>
                  Preferences
                </Menu.Item>
                <Menu.Item key="notifications" icon={<BellOutlined />}>
                  Notifications
                </Menu.Item>
                <Menu.Item key="security" icon={<KeyOutlined />}>
                  Security
                </Menu.Item>
                <Menu.Item key="danger" icon={<ExclamationCircleOutlined />} danger>
                  Danger Zone
                </Menu.Item>
              </Menu>

              <Divider />

              <Button
                icon={<LogoutOutlined />}
                block
                onClick={() => {
                  // In a real app, this would call the logout function
                  console.log('Logout');
                }}
              >
                Sign Out
              </Button>
            </Card>

            <Card className="shadow-sm">
              <Title level={5}>Account Status</Title>
              <div className="flex justify-between items-center mb-2">
                <Text>Email Verified</Text>
                <Badge status="success" text="Verified" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <Text>Account Type</Text>
                <Tag color="blue">{user?.role || 'USER'}</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </WorkspaceAccess>
  );
};

const handleSaveNotifications = async () => {
    try {
      setIsSubmitting(true);
      const values = await notificationsForm.validateFields();
      console.log('Update notification settings with values:', values);
      message.success('Notification settings updated successfully');
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSecurity = async () => {
    try {
      setIsSubmitting(true);
      const values = await securityForm.validateFields();
      console.log('Update security settings with values:', values);
      message.success('Security settings updated successfully');
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setDeleteConfirmText('');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === 'DELETE') {
      console.log('Delete account');
      message.success('Account deletion request submitted');
      setIsDeleteModalVisible(false);
      setDeleteConfirmText('');
    } else {
      message.error('Confirmation text does not match');
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const checkPasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 20;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 20;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 20;

    // Contains number
    if (/[0-9]/.test(password)) strength += 20;

    // Contains special character
    if (/[^a-zA-Z0-9]/.test(password)) strength += 20;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthStatus = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength < 40) return 'exception';
    if (passwordStrength < 80) return 'normal';
    return 'success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 80) return 'Medium';
    return 'Strong';
  };

  const disconnectApp = (appId: string) => {
    Modal.confirm({
      title: 'Disconnect App',
      content: 'Are you sure you want to disconnect this app? You will need to reconnect it later if you want to use it again.',
      okText: 'Yes, Disconnect',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Disconnect app with ID:', appId);
        message.success('App disconnected successfully');
      }
    });
  };

  return (
    <WorkspaceAccess>
      <div>
        <div className="mb-6">
          <Title level={2}>Account Settings</Title>
          <Text type="secondary">
            Manage your personal account settings and preferences
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Card className="shadow-sm mb-4">
              <div className="flex flex-col items-center">
                <Avatar
                  size={80}
                  icon={<UserOutlined />}
                  src={user?.avatarUrl}
                  className="mb-4"
                />
                <Title level={4} className="mb-1">{user?.firstName} {user?.lastName}</Title>
                <Text type="secondary" className="mb-2">{user?.email}</Text>
                <Badge status="success" text="Active Account" />
              </div>

              <Divider />

              <Menu
                selectedKeys={[activeTab]}
                onClick={({ key }) => setActiveTab(key)}
                className="border-0"
              >
                <Menu.Item key="profile" icon={<UserOutlined />}>
                  Profile
                </Menu.Item>
                <Menu.Item key="password" icon={<LockOutlined />}>
                  Password
                </Menu.Item>
                <Menu.Item key="preferences" icon={<SettingOutlined />}>
                  Preferences
                </Menu.Item>
                <Menu.Item key="notifications" icon={<BellOutlined />}>
                  Notifications
                </Menu.Item>
                <Menu.Item key="security" icon={<KeyOutlined />}>
                  Security
                </Menu.Item>
                <Menu.Item key="danger" icon={<ExclamationCircleOutlined />} danger>
                  Danger Zone
                </Menu.Item>
              </Menu>

              <Divider />

              <Button
                icon={<LogoutOutlined />}
                block
                onClick={() => {
                  // In a real app, this would call the logout function
                  console.log('Logout');
                }}
              >
                Sign Out
              </Button>
            </Card>

            <Card className="shadow-sm">
              <Title level={5}>Account Status</Title>
              <div className="flex justify-between items-center mb-2">
                <Text>Email Verified</Text>
                <Badge status="success" text="Verified" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <Text>Account Type</Text>
                <Tag color="blue">{user?.role || 'USER'}</Tag>
              </div>
              <div className="flex justify-between items-center">
                <Text>Member Since</Text>
                <Text>{new Date().toLocaleDateString()}</Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={18}>
            {activeTab === 'profile' && (
              <Card className="shadow-sm">
                <Title level={4}>Profile Information</Title>
                <Text type="secondary" className="mb-4 block">
                  Update your personal information and how it appears across the platform
                </Text>

                <Form
                  form={profileForm}
                  layout="vertical"
                  initialValues={{
                    email: user?.email,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    username: user?.username,
                    jobTitle: '',
                    company: '',
                    bio: ''
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                    extra="Your email is used for account-related notifications and cannot be changed"
                  >
                    <Input disabled prefix={<MailOutlined className="text-gray-400" />} />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                      >
                        <Input placeholder="username" prefix={<UserOutlined className="text-gray-400" />} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="jobTitle"
                        label="Job Title"
                      >
                        <Input placeholder="e.g. Product Manager" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="company"
                    label="Company"
                  >
                    <Input placeholder="Company name" />
                  </Form.Item>

                  <Form.Item
                    name="bio"
                    label="Bio"
                  >
                    <Input.TextArea
                      placeholder="Tell us a bit about yourself"
                      rows={3}
                      showCount
                      maxLength={200}
                    />
                  </Form.Item>

                  <Form.Item
                    name="avatar"
                    label="Profile Picture"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Recommended size: 256x256px. Max file size: 1MB."
                  >
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      maxCount={1}
                      beforeUpload={() => false}
                    >
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>

                  <Divider />

                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSaveProfile}
                      loading={isSubmitting}
                    >
                      Save Profile
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {activeTab === 'password' && (
              <Card className="shadow-sm">
                <Title level={4}>Change Password</Title>
                <Text type="secondary" className="mb-4 block">
                  Update your password to keep your account secure
                </Text>

                <Form
                  form={passwordForm}
                  layout="vertical"
                >
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please enter your current password' }]}
                  >
                    <Input.Password
                      placeholder="Current Password"
                      prefix={<LockOutlined className="text-gray-400" />}
                    />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: 'Please enter your new password' },
                      { min: 8, message: 'Password must be at least 8 characters' }
                    ]}
                    hasFeedback
                  >
                    <Input
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder="New Password"
                      prefix={<LockOutlined className="text-gray-400" />}
                      suffix={
                        <Button
                          type="text"
                          icon={passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="px-0"
                        />
                      }
                      onChange={e => checkPasswordStrength(e.target.value)}
                    />
                  </Form.Item>

                  {passwordStrength > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <Text>{getPasswordStrengthText()} Password</Text>
                        <Text>{passwordStrength}%</Text>
                      </div>
                      <Progress
                        percent={passwordStrength}
                        status={getPasswordStrengthStatus() as any}
                        showInfo={false}
                      />
                      <div className="mt-2 text-xs text-gray-500">
                        <InfoCircleOutlined className="mr-1" />
                        Strong passwords include a mix of uppercase letters, lowercase letters, numbers, and symbols
                      </div>
                    </div>
                  )}

                  <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    dependencies={['newPassword']}
                    hasFeedback
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
                      placeholder="Confirm New Password"
                      prefix={<LockOutlined className="text-gray-400" />}
                    />
                  </Form.Item>

                  <Divider />

                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={handleChangePassword}
                      loading={isSubmitting}
                    >
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {activeTab === 'preferences' && (
              <Card className="shadow-sm">
                <Title level={4}>User Preferences</Title>
                <Text type="secondary" className="mb-4 block">
                  Customize your experience across the platform
                </Text>

                <Form
                  form={preferencesForm}
                  layout="vertical"
                  initialValues={{
                    theme: user?.theme || 'system',
                    emailNotifications: true,
                    language: 'en-US',
                    timezone: 'America/New_York',
                    dateFormat: 'MM/DD/YYYY',
                    timeFormat: '12h'
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="theme"
                        label="Theme"
                      >
                        <Select>
                          <Option value="light">Light</Option>
                          <Option value="dark">Dark</Option>
                          <Option value="system">System Default</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="language"
                        label="Language"
                      >
                        <Select>
                          <Option value="en-US">English (US)</Option>
                          <Option value="fr-FR">French</Option>
                          <Option value="es-ES">Spanish</Option>
                          <Option value="de-DE">German</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="timezone"
                        label="Timezone"
                      >
                        <Select>
                          <Option value="America/New_York">Eastern Time (ET)</Option>
                          <Option value="America/Chicago">Central Time (CT)</Option>
                          <Option value="America/Denver">Mountain Time (MT)</Option>
                          <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
                          <Option value="Europe/London">London (GMT)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="dateFormat"
                        label="Date Format"
                      >
                        <Select>
                          <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                          <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                          <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="timeFormat"
                    label="Time Format"
                  >
                    <Select>
                      <Option value="12h">12-hour (1:30 PM)</Option>
                      <Option value="24h">24-hour (13:30)</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="startPage"
                    label="Default Start Page"
                  >
                    <Select>
                      <Option value="dashboard">Dashboard</Option>
                      <Option value="modules">Modules</Option>
                      <Option value="ai-assistant">AI Assistant</Option>
                    </Select>
                  </Form.Item>

                  <Divider />

                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSavePreferences}
                      loading={isSubmitting}
                    >
                      Save Preferences
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="shadow-sm">
                <Title level={4}>Notification Settings</Title>
                <Text type="secondary" className="mb-4 block">
                  Control which notifications you receive and how they are delivered
                </Text>

                <Form
                  form={notificationsForm}
                  layout="vertical"
                  initialValues={
                    notificationSettings.reduce((acc, setting) => {
                      acc[`email_${setting.id}`] = setting.email;
                      acc[`inApp_${setting.id}`] = setting.inApp;
                      return acc;
                    }, {} as Record<string, boolean>)
                  }
                >
                  <div className="mb-4 flex border-b pb-2">
                    <div className="flex-1 font-medium">Notification Type</div>
                    <div className="w-24 text-center font-medium">Email</div>
                    <div className="w-24 text-center font-medium">In-App</div>
                  </div>

                  {notificationSettings.map(setting => (
                    <div key={setting.id} className="mb-4 flex items-center border-b pb-4">
                      <div className="flex-1">
                        <div className="font-medium">{setting.type}</div>
                        <div className="text-xs text-gray-500">{setting.description}</div>
                      </div>
                      <div className="w-24 text-center">
                        <Form.Item
                          name={`email_${setting.id}`}
                          valuePropName="checked"
                          noStyle
                        >
                          <Switch size="small" />
                        </Form.Item>
                      </div>
                      <div className="w-24 text-center">
                        <Form.Item
                          name={`inApp_${setting.id}`}
                          valuePropName="checked"
                          noStyle
                        >
                          <Switch size="small" />
                        </Form.Item>
                      </div>
                    </div>
                  ))}

                  <Form.Item
                    name="digestFrequency"
                    label="Email Digest Frequency"
                    initialValue="daily"
                  >
                    <Select>
                      <Option value="never">Never</Option>
                      <Option value="daily">Daily</Option>
                      <Option value="weekly">Weekly</Option>
                    </Select>
                  </Form.Item>

                  <Divider />

                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSaveNotifications}
                      loading={isSubmitting}
                    >
                      Save Notification Settings
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {activeTab === 'security' && (
              <>
                <Card className="shadow-sm mb-4">
                  <Title level={4}>Security Settings</Title>
                  <Text type="secondary" className="mb-4 block">
                    Manage your account security and connected applications
                  </Text>

                  <Form
                    form={securityForm}
                    layout="vertical"
                    initialValues={{
                      twoFactorAuth: false,
                      sessionTimeout: '30',
                      loginNotifications: true
                    }}
                  >
                    <Form.Item
                      name="twoFactorAuth"
                      label="Two-Factor Authentication"
                      valuePropName="checked"
                      extra="Add an extra layer of security to your account by requiring a verification code in addition to your password"
                    >
                      <Switch />
                    </Form.Item>

                    <Form.Item
                      name="sessionTimeout"
                      label="Session Timeout"
                      extra="Automatically log out after a period of inactivity"
                    >
                      <Select>
                        <Option value="15">15 minutes</Option>
                        <Option value="30">30 minutes</Option>
                        <Option value="60">1 hour</Option>
                        <Option value="120">2 hours</Option>
                        <Option value="240">4 hours</Option>
                        <Option value="480">8 hours</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="loginNotifications"
                      label="Login Notifications"
                      valuePropName="checked"
                      extra="Receive email notifications when your account is accessed from a new device or location"
                    >
                      <Switch />
                    </Form.Item>

                    <Divider />

                    <Form.Item>
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={handleSaveSecurity}
                        loading={isSubmitting}
                      >
                        Save Security Settings
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>

                <Card className="shadow-sm mb-4">
                  <Title level={4}>Recent Activity</Title>
                  <List
                    dataSource={accountActivity}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.action}
                          description={
                            <div>
                              <div className="text-xs text-gray-500">
                                {item.device} • {item.location}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(item.timestamp).toLocaleString()}
                              </div>
                            </div>
                          }
                        />
                        <div>
                          {item.id === '1' ? (
                            <Badge status="success" text="Current Session" />
                          ) : (
                            <Button size="small" type="text">
                              Details
                            </Button>
                          )}
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>

                <Card className="shadow-sm">
                  <Title level={4}>Connected Applications</Title>
                  <Text type="secondary" className="mb-4 block">
                    These applications have access to your account
                  </Text>

                  {connectedApps.length > 0 ? (
                    <List
                      dataSource={connectedApps}
                      renderItem={app => (
                        <List.Item
                          actions={[
                            <Button
                              key="disconnect"
                              danger
                              onClick={() => disconnectApp(app.id)}
                            >
                              Disconnect
                            </Button>
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<div className="text-2xl">{app.icon}</div>}
                            title={app.name}
                            description={
                              <div>
                                <div className="text-xs text-gray-500">
                                  Connected on {new Date(app.connectedAt).toLocaleDateString()}
                                </div>
                                <div className="mt-1">
                                  {app.permissions.map((permission, index) => (
                                    <Tag key={index} className="mr-1 mb-1">{permission}</Tag>
                                  ))}
                                </div>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty description="No connected applications" />
                  )}

                  <div className="mt-4">
                    <Button type="primary">
                      Connect New App
                    </Button>
                  </div>
                </Card>
              </>
            )}

            {activeTab === 'danger' && (
              <Card className="shadow-sm bg-red-50">
                <Title level={4} className="text-red-500">Danger Zone</Title>
                <Alert
                  message="Warning: These actions are irreversible"
                  description="The following actions can result in permanent data loss. Please proceed with caution."
                  type="error"
                  showIcon
                  className="mb-6"
                />

                <div className="mb-6 border border-red-300 rounded-md p-4">
                  <Title level={5}>Delete Account</Title>
                  <Paragraph className="text-red-500">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </Paragraph>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={showDeleteModal}
                  >
                    Delete My Account
                  </Button>
                </div>

                <div className="border border-red-300 rounded-md p-4">
                  <Title level={5}>Export Personal Data</Title>
                  <Paragraph>
                    Download a copy of all your personal data before deleting your account.
                  </Paragraph>
                  <Button>
                    Export Data
                  </Button>
                </div>
              </Card>
            )}
          </Col>
        </Row>

        <Modal
          title={
            <div className="flex items-center text-red-500">
              <ExclamationCircleOutlined className="mr-2" />
              Delete Account
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
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== 'DELETE'}
            >
              Delete Account
            </Button>,
          ]}
        >
          <Alert
            message="Warning: This action cannot be undone"
            description="This will permanently delete your account, all your data, and remove you from all workspaces."
            type="error"
            showIcon
            className="mb-4"
          />
          <Paragraph>
            To confirm, please type <Text strong>DELETE</Text> in the field below:
          </Paragraph>
          <Input
            placeholder="Type DELETE to confirm"
            value={deleteConfirmText}
            onChange={e => setDeleteConfirmText(e.target.value)}
            className="mt-2"
            status={deleteConfirmText && deleteConfirmText !== 'DELETE' ? 'error' : ''}
          />
        </Modal>
              <div className="flex justify-between items-center">
                <Text>Member Since</Text>
                <Text>{new Date().toLocaleDateString()}</Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={18}>
            {activeTab === 'profile' && (
              <Card className="shadow-sm">
                <Title level={4}>Profile Information</Title>
                <Text type="secondary" className="mb-4 block">
                  Update your personal information and how it appears across the platform
                </Text>

                <Form
                  form={profileForm}
                  layout="vertical"
                  initialValues={{
                    email: user?.email,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    username: user?.username,
                    jobTitle: '',
                    company: '',
                    bio: ''
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                    extra="Your email is used for account-related notifications and cannot be changed"
                  >
                    <Input disabled prefix={<MailOutlined className="text-gray-400" />} />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                      >
                        <Input placeholder="username" prefix={<UserOutlined className="text-gray-400" />} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="jobTitle"
                        label="Job Title"
                      >
                        <Input placeholder="e.g. Product Manager" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="company"
                    label="Company"
                  >
                    <Input placeholder="Company name" />
                  </Form.Item>

                  <Form.Item
                    name="bio"
                    label="Bio"
                  >
                    <Input.TextArea
                      placeholder="Tell us a bit about yourself"
                      rows={3}
                      showCount
                      maxLength={200}
                    />
                  </Form.Item>

                  <Form.Item
                    name="avatar"
                    label="Profile Picture"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Recommended size: 256x256px. Max file size: 1MB."
                  >
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      maxCount={1}
                      beforeUpload={() => false}
                    >
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>

                  <Divider />

                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSaveProfile}
                      loading={isSubmitting}
                    >
                      Save Profile
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {activeTab === 'password' && (
              <Card className="shadow-sm">
                <Title level={4}>Change Password</Title>
                <Text type="secondary" className="mb-4 block">
                  Update your password to keep your account secure
                </Text>

                <Form
                  form={passwordForm}
                  layout="vertical"
                >
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please enter your current password' }]}
                  >
                    <Input.Password
                      placeholder="Current Password"
                      prefix={<LockOutlined className="text-gray-400" />}
                    />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: 'Please enter your new password' },
                      { min: 8, message: 'Password must be at least 8 characters' }
                    ]}
                    hasFeedback
                  >
                    <Input
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder="New Password"
                      prefix={<LockOutlined className="text-gray-400" />}
                      suffix={
                        <Button
                          type="text"
                          icon={passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="px-0"
                        />
                      }
                      onChange={e => checkPasswordStrength(e.target.value)}
                    />
                  </Form.Item>

                  {passwordStrength > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <Text>{getPasswordStrengthText()} Password</Text>
                        <Text>{passwordStrength}%</Text>
                      </div>
                      <Progress
                        percent={passwordStrength}
                        status={getPasswordStrengthStatus() as any}
                        showInfo={false}
                      />
                      <div className="mt-2 text-xs text-gray-500">
                        <InfoCircleOutlined className="mr-1" />
                        Strong passwords include a mix of uppercase letters, lowercase letters, numbers, and symbols
                      </div>
                    </div>
                  )}

                  <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    dependencies={['newPassword']}
                    hasFeedback
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
                      placeholder="Confirm New Password"
                      prefix={<LockOutlined className="text-gray-400" />}
                    />
                  </Form.Item>

                  <Divider />

                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={handleChangePassword}
                      loading={isSubmitting}
                    >
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {activeTab === 'preferences' && (
              <Card className="shadow-sm">
                <Title level={4}>User Preferences</Title>
                <Text type="secondary" className="mb-4 block">
                  Customize your experience across the platform
                </Text>

                <Form
                  form={preferencesForm}
                  layout="vertical"
                  initialValues={{
                    theme: user?.theme || 'system',
                    emailNotifications: true,
                    language: 'en-US',
                    timezone: 'America/New_York',
                    dateFormat: 'MM/DD/YYYY',
                    timeFormat: '12h'
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="theme"
                        label="Theme"
                      >
                        <Select>
                          <Option value="light">Light</Option>
                          <Option value="dark">Dark</Option>
                          <Option value="system">System Default</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="language"
                        label="Language"
                      >
                        <Select>
                          <Option value="en-US">English (US)</Option>
                          <Option value="fr-FR">French</Option>
                          <Option value="es-ES">Spanish</Option>
                          <Option value="de-DE">German</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="timezone"
                        label="Timezone"
                      >
                        <Select>
                          <Option value="America/New_York">Eastern Time (ET)</Option>
                          <Option value="America/Chicago">Central Time (CT)</Option>
                          <Option value="America/Denver">Mountain Time (MT)</Option>
                          <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
                          <Option value="Europe/London">London (GMT)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="dateFormat"
                        label="Date Format"
                      >
                        <Select>
                          <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                          <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                          <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="timeFormat"
                    label="Time Format"
                  >
                    <Select>
                      <Option value="12h">12-hour (1:30 PM)</Option>
                      <Option value="24h">24-hour (13:30)</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="startPage"
                    label="Default Start Page"
                  >
                    <Select>
                      <Option value="dashboard">Dashboard</Option>
                      <Option value="modules">Modules</Option>
                      <Option value="ai-assistant">AI Assistant</Option>
                    </Select>
                  </Form.Item>

                  <Divider />

                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSavePreferences}
                      loading={isSubmitting}
                    >
                      Save Preferences
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="shadow-sm">
                <Title level={4}>Notification Settings</Title>
                <Text type="secondary" className="mb-4 block">
                  Control which notifications you receive and how they are delivered
                </Text>

                <Form
                  form={notificationsForm}
                  layout="vertical"
                  initialValues={
                    notificationSettings.reduce((acc, setting) => {
                      acc[`email_${setting.id}`] = setting.email;
                      acc[`inApp_${setting.id}`] = setting.inApp;
                      return acc;
                    }, {} as Record<string, boolean>)
                  }
                >
                  <div className="mb-4 flex border-b pb-2">
                    <div className="flex-1 font-medium">Notification Type</div>
                    <div className="w-24 text-center font-medium">Email</div>
                    <div className="w-24 text-center font-medium">In-App</div>
                  </div>

                  {notificationSettings.map(setting => (
                    <div key={setting.id} className="mb-4 flex items-center border-b pb-4">
                      <div className="flex-1">
                        <div className="font-medium">{setting.type}</div>
                        <div className="text-xs text-gray-500">{setting.description}</div>
                      </div>
                      <div className="w-24 text-center">
                        <Form.Item
                          name={`email_${setting.id}`}
                          valuePropName="checked"
                          noStyle
                        >
                          <Switch size="small" />
                        </Form.Item>
                      </div>
                      <div className="w-24 text-center">
                        <Form.Item
                          name={`inApp_${setting.id}`}
                          valuePropName="checked"
                          noStyle
                        >
                          <Switch size="small" />
                        </Form.Item>
                      </div>
                    </div>
                  ))}

                  <Form.Item
                    name="digestFrequency"
                    label="Email Digest Frequency"
                    initialValue="daily"
                  >
                    <Select>
                      <Option value="never">Never</Option>
                      <Option value="daily">Daily</Option>
                      <Option value="weekly">Weekly</Option>
                    </Select>
                  </Form.Item>

                  <Divider />

                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSaveNotifications}
                      loading={isSubmitting}
                    >
                      Save Notification Settings
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {activeTab === 'security' && (
              <>
                <Card className="shadow-sm mb-4">
                  <Title level={4}>Security Settings</Title>
                  <Text type="secondary" className="mb-4 block">
                    Manage your account security and connected applications
                  </Text>

                  <Form
                    form={securityForm}
                    layout="vertical"
                    initialValues={{
                      twoFactorAuth: false,
                      sessionTimeout: '30',
                      loginNotifications: true
                    }}
                  >
                    <Form.Item
                      name="twoFactorAuth"
                      label="Two-Factor Authentication"
                      valuePropName="checked"
                      extra="Add an extra layer of security to your account by requiring a verification code in addition to your password"
                    >
                      <Switch />
                    </Form.Item>

                    <Form.Item
                      name="sessionTimeout"
                      label="Session Timeout"
                      extra="Automatically log out after a period of inactivity"
                    >
                      <Select>
                        <Option value="15">15 minutes</Option>
                        <Option value="30">30 minutes</Option>
                        <Option value="60">1 hour</Option>
                        <Option value="120">2 hours</Option>
                        <Option value="240">4 hours</Option>
                        <Option value="480">8 hours</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="loginNotifications"
                      label="Login Notifications"
                      valuePropName="checked"
                      extra="Receive email notifications when your account is accessed from a new device or location"
                    >
                      <Switch />
                    </Form.Item>

                    <Divider />

                    <Form.Item>
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={handleSaveSecurity}
                        loading={isSubmitting}
                      >
                        Save Security Settings
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>

                <Card className="shadow-sm mb-4">
                  <Title level={4}>Recent Activity</Title>
                  <List
                    dataSource={accountActivity}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.action}
                          description={
                            <div>
                              <div className="text-xs text-gray-500">
                                {item.device} • {item.location}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(item.timestamp).toLocaleString()}
                              </div>
                            </div>
                          }
                        />
                        <div>
                          {item.id === '1' ? (
                            <Badge status="success" text="Current Session" />
                          ) : (
                            <Button size="small" type="text">
                              Details
                            </Button>
                          )}
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>

                <Card className="shadow-sm">
                  <Title level={4}>Connected Applications</Title>
                  <Text type="secondary" className="mb-4 block">
                    These applications have access to your account
                  </Text>

                  {connectedApps.length > 0 ? (
                    <List
                      dataSource={connectedApps}
                      renderItem={app => (
                        <List.Item
                          actions={[
                            <Button
                              key="disconnect"
                              danger
                              onClick={() => disconnectApp(app.id)}
                            >
                              Disconnect
                            </Button>
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<div className="text-2xl">{app.icon}</div>}
                            title={app.name}
                            description={
                              <div>
                                <div className="text-xs text-gray-500">
                                  Connected on {new Date(app.connectedAt).toLocaleDateString()}
                                </div>
                                <div className="mt-1">
                                  {app.permissions.map((permission, index) => (
                                    <Tag key={index} className="mr-1 mb-1">{permission}</Tag>
                                  ))}
                                </div>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty description="No connected applications" />
                  )}

                  <div className="mt-4">
                    <Button type="primary">
                      Connect New App
                    </Button>
                  </div>
                </Card>
              </>
            )}

            {activeTab === 'danger' && (
              <Card className="shadow-sm bg-red-50">
                <Title level={4} className="text-red-500">Danger Zone</Title>
                <Alert
                  message="Warning: These actions are irreversible"
                  description="The following actions can result in permanent data loss. Please proceed with caution."
                  type="error"
                  showIcon
                  className="mb-6"
                />

                <div className="mb-6 border border-red-300 rounded-md p-4">
                  <Title level={5}>Delete Account</Title>
                  <Paragraph className="text-red-500">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </Paragraph>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={showDeleteModal}
                  >
                    Delete My Account
                  </Button>
                </div>

                <div className="border border-red-300 rounded-md p-4">
                  <Title level={5}>Export Personal Data</Title>
                  <Paragraph>
                    Download a copy of all your personal data before deleting your account.
                  </Paragraph>
                  <Button>
                    Export Data
                  </Button>
                </div>
              </Card>
            )}
          </Col>
        </Row>

        <Modal
          title={
            <div className="flex items-center text-red-500">
              <ExclamationCircleOutlined className="mr-2" />
              Delete Account
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
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== 'DELETE'}
            >
              Delete Account
            </Button>,
          ]}
        >
          <Alert
            message="Warning: This action cannot be undone"
            description="This will permanently delete your account, all your data, and remove you from all workspaces."
            type="error"
            showIcon
            className="mb-4"
          />
          <Paragraph>
            To confirm, please type <Text strong>DELETE</Text> in the field below:
          </Paragraph>
          <Input
            placeholder="Type DELETE to confirm"
            value={deleteConfirmText}
            onChange={e => setDeleteConfirmText(e.target.value)}
            className="mt-2"
            status={deleteConfirmText && deleteConfirmText !== 'DELETE' ? 'error' : ''}
          />
        </Modal>
      </div>
    </WorkspaceAccess>
  );
};

export default AccountSettings;
