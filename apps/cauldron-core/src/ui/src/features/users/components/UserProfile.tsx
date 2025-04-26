import React, { useState } from 'react';
import { Card, Avatar, Typography, Tabs, Button, Form, Input, Space, Divider, Upload, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { useAuth, useUserProfile } from '../../auth/hooks/useAuth';
import { useTheme } from '../../../core/hooks/useTheme';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { userProfile, isLoading } = useUserProfile();
  const { mode, setMode } = useTheme();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileUpdate = (values: any) => {
    // In a real app, this would update the user profile
    message.success('Profile updated successfully');
  };

  const handlePasswordUpdate = (values: any) => {
    // In a real app, this would update the user password
    message.success('Password updated successfully');
    passwordForm.resetFields();
  };

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
    message.success(`Theme changed to ${newMode}`);
  };

  if (isLoading || !userProfile) {
    return <Card loading />;
  }

  return (
    <Card>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Avatar size={80} src={userProfile.imageUrl} icon={<UserOutlined />} />
        <Title level={3} style={{ marginTop: 16, marginBottom: 4 }}>
          {userProfile.fullName}
        </Title>
        <Text type="secondary">{userProfile.email}</Text>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Profile" key="profile">
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              firstName: userProfile.firstName,
              lastName: userProfile.lastName,
              email: userProfile.email,
              bio: userProfile.bio,
              location: userProfile.location,
              website: userProfile.website,
              company: userProfile.company,
              jobTitle: userProfile.jobTitle,
            }}
            onFinish={handleProfileUpdate}
          >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <Title level={5}>Profile Picture</Title>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={() => false}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </div>

              <div>
                <Title level={5}>Personal Information</Title>
                <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    style={{ width: '48%' }}
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    style={{ width: '48%' }}
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                  >
                    <Input />
                  </Form.Item>
                </Space>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} disabled />
                </Form.Item>

                <Form.Item name="bio" label="Bio">
                  <Input.TextArea rows={4} />
                </Form.Item>
              </div>

              <div>
                <Title level={5}>Professional Information</Title>
                <Form.Item name="company" label="Company">
                  <Input />
                </Form.Item>
                <Form.Item name="jobTitle" label="Job Title">
                  <Input />
                </Form.Item>
              </div>

              <div>
                <Title level={5}>Contact Information</Title>
                <Form.Item name="location" label="Location">
                  <Input />
                </Form.Item>
                <Form.Item name="website" label="Website">
                  <Input />
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save Changes
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </TabPane>

        <TabPane tab="Security" key="security">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <Title level={5}>Change Password</Title>
              <Form
                form={passwordForm}
                layout="vertical"
                onFinish={handlePasswordUpdate}
              >
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[{ required: true, message: 'Please enter your current password' }]}
                >
                  <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: 'Please enter your new password' },
                    { min: 8, message: 'Password must be at least 8 characters' },
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} />
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
                  <Input.Password prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Password
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <Divider />

            <div>
              <Title level={5}>Two-Factor Authentication</Title>
              <Text>Enhance your account security by enabling two-factor authentication.</Text>
              <div style={{ marginTop: 16 }}>
                <Button type="primary">Enable 2FA</Button>
              </div>
            </div>
          </Space>
        </TabPane>

        <TabPane tab="Preferences" key="preferences">
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <Title level={5}>Theme</Title>
              <Space>
                <Button
                  type={mode === 'light' ? 'primary' : 'default'}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </Button>
                <Button
                  type={mode === 'dark' ? 'primary' : 'default'}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </Button>
                <Button
                  type={mode === 'system' ? 'primary' : 'default'}
                  onClick={() => handleThemeChange('system')}
                >
                  System
                </Button>
              </Space>
            </div>

            <Divider />

            <div>
              <Title level={5}>Notifications</Title>
              <Form layout="vertical">
                <Form.Item name="emailNotifications" valuePropName="checked">
                  <div>
                    <Text>Email Notifications</Text>
                    <div>
                      <Button type="link">Configure</Button>
                    </div>
                  </div>
                </Form.Item>
                <Form.Item name="pushNotifications" valuePropName="checked">
                  <div>
                    <Text>Push Notifications</Text>
                    <div>
                      <Button type="link">Configure</Button>
                    </div>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Space>
        </TabPane>
      </Tabs>
    </Card>
  );
};
