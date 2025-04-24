import React, { useState } from 'react';
import { Form, Input, Switch, Button, Select, Space, Typography, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { CreateWorkspaceData, UpdateWorkspaceData, Workspace } from '../types';
import { UserRole } from '../../auth/permissions/types';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface WorkspaceFormProps {
  initialValues?: Workspace;
  onSubmit: (data: CreateWorkspaceData | UpdateWorkspaceData) => Promise<void>;
  isSubmitting: boolean;
  mode: 'create' | 'edit';
}

const WorkspaceForm: React.FC<WorkspaceFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
  mode
}) => {
  const [form] = Form.useForm();
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSubmit = async (values: any) => {
    try {
      // In a real app, you would upload the logo file to a storage service
      // and get back a URL to store in the workspace
      let logoUrl = initialValues?.logoUrl;
      if (logoFile) {
        // This would be an API call to upload the file
        // logoUrl = await uploadFile(logoFile);
        logoUrl = URL.createObjectURL(logoFile); // Just for demo purposes
      }

      const data = {
        ...values,
        logoUrl
      };

      await onSubmit(data);
      
      if (mode === 'create') {
        form.resetFields();
        setLogoFile(null);
      }
    } catch (error) {
      console.error('Error submitting workspace form:', error);
    }
  };

  const handleLogoChange = (info: any) => {
    if (info.file.status === 'done') {
      setLogoFile(info.file.originFileObj);
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues || { isPublic: false, defaultRole: 'USER' }}
      onFinish={handleSubmit}
    >
      <Title level={4}>{mode === 'create' ? 'Create New Workspace' : 'Edit Workspace'}</Title>
      
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
        tooltip="This will be used in URLs and must be unique"
      >
        <Input placeholder="my-workspace" />
      </Form.Item>
      
      <Form.Item
        name="description"
        label="Description"
      >
        <TextArea 
          placeholder="Describe the purpose of this workspace" 
          rows={3}
          maxLength={500}
          showCount
        />
      </Form.Item>
      
      <Form.Item
        name="logoUrl"
        label="Workspace Logo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="logo"
          listType="picture"
          maxCount={1}
          onChange={handleLogoChange}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
              message.error('You can only upload image files!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              message.error('Image must be smaller than 2MB!');
            }
            return isImage && isLt2M;
          }}
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
              onSuccess?.('ok');
            }, 0);
          }}
        >
          <Button icon={<UploadOutlined />}>Upload Logo</Button>
        </Upload>
      </Form.Item>
      
      <Form.Item
        name="isPublic"
        label="Public Workspace"
        valuePropName="checked"
        tooltip="Public workspaces can be discovered by other users"
      >
        <Switch />
      </Form.Item>
      
      <Form.Item
        name="defaultRole"
        label="Default Member Role"
        tooltip="The default role assigned to new members"
      >
        <Select>
          <Option value="USER">User</Option>
          <Option value="MANAGER">Manager</Option>
          <Option value="ADMIN">Admin</Option>
        </Select>
      </Form.Item>
      
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {mode === 'create' ? 'Create Workspace' : 'Save Changes'}
          </Button>
          {mode === 'edit' && (
            <Button onClick={() => form.resetFields()}>
              Reset
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default WorkspaceForm;
