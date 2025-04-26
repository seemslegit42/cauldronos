import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Switch, 
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Badge, 
  Empty, 
  Alert,
  Tabs,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  CheckCircleOutlined, 
  TeamOutlined, 
  SettingOutlined, 
  GlobalOutlined, 
  LockOutlined,
  SearchOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import { Link, useNavigate } from 'react-router-dom';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import { Workspace, CreateWorkspaceData, UpdateWorkspaceData } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceManagement: React.FC = () => {
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const { 
    workspaces, 
    createWorkspace, 
    updateWorkspace, 
    deleteWorkspace,
    isLoading
  } = useWorkspaces();
  
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Get workspace initials for avatar
  const getWorkspaceInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get color based on workspace name
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
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);
    
    return colors[hash % colors.length];
  };

  const showCreateModal = () => {
    createForm.resetFields();
    setIsCreateModalVisible(true);
  };

  const showEditModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    editForm.setFieldsValue({
      name: workspace.name,
      slug: workspace.slug,
      description: workspace.description,
      isPublic: workspace.isPublic
    });
    setIsEditModalVisible(true);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedWorkspace(null);
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      await createWorkspace(values as CreateWorkspaceData);
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEdit = async () => {
    if (!selectedWorkspace) return;
    
    try {
      const values = await editForm.validateFields();
      await updateWorkspace(selectedWorkspace.id, values as UpdateWorkspaceData);
      setIsEditModalVisible(false);
      setSelectedWorkspace(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (workspaceId: string) => {
    try {
      await deleteWorkspace(workspaceId);
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const handleWorkspaceSettings = (workspaceId: string) => {
    navigate(`/workspace-settings?id=${workspaceId}`);
  };

  const filteredWorkspaces = workspaces
    .filter(workspace => {
      const matchesSearch = 
        workspace.name.toLowerCase().includes(searchText.toLowerCase()) ||
        workspace.slug.toLowerCase().includes(searchText.toLowerCase()) ||
        (workspace.description && workspace.description.toLowerCase().includes(searchText.toLowerCase()));
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'owned') return workspace.ownerId === user?.id && matchesSearch;
      if (activeTab === 'member') return workspace.ownerId !== user?.id && matchesSearch;
      if (activeTab === 'public') return workspace.isPublic && matchesSearch;
      if (activeTab === 'private') return !workspace.isPublic && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

  const columns = [
    {
      title: 'Workspace',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Workspace) => (
        <div className="flex items-center">
          <Avatar 
            style={{ 
              backgroundColor: getWorkspaceColor(record.name),
              marginRight: '12px'
            }}
          >
            {getWorkspaceInitials(record.name)}
          </Avatar>
          <div>
            <div className="font-medium">{text}</div>
            <Text type="secondary" className="text-xs">
              {record.slug}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || <Text type="secondary">No description</Text>,
    },
    {
      title: 'Members',
      dataIndex: 'memberCount',
      key: 'memberCount',
      render: (count: number) => (
        <Tag icon={<TeamOutlined />} color="blue">
          {count}
        </Tag>
      ),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan: string) => (
        <Tag color={plan === 'free' ? 'default' : 'green'}>
          {plan.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Visibility',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic: boolean) => (
        isPublic ? 
          <Tag icon={<GlobalOutlined />} color="blue">Public</Tag> : 
          <Tag icon={<LockOutlined />} color="default">Private</Tag>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Workspace) => (
        <Space size="small">
          <Tooltip title="Workspace Settings">
            <Button 
              icon={<SettingOutlined />} 
              size="small"
              onClick={() => handleWorkspaceSettings(record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit Workspace">
            <Button 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this workspace?"
            description="This action cannot be undone. All data will be permanently deleted."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button 
              icon={<DeleteOutlined />} 
              size="small"
              danger
              disabled={record.ownerId !== user?.id}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <div>
        <div className="mb-6">
          <Title level={2}>Workspace Management</Title>
          <Text type="secondary">
            Create, manage, and organize your workspaces
          </Text>
        </div>

        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Input 
                placeholder="Search workspaces" 
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
                className="mr-4"
              />
              <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                <TabPane tab="All" key="all" />
                <TabPane tab="Owned" key="owned" />
                <TabPane tab="Member" key="member" />
                <TabPane tab="Public" key="public" />
                <TabPane tab="Private" key="private" />
              </Tabs>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              Create Workspace
            </Button>
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredWorkspaces} 
            rowKey="id"
            loading={isLoading}
            locale={{
              emptyText: (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description={
                    <span>
                      No workspaces found
                      {searchText && ' matching your search'}
                    </span>
                  }
                />
              )
            }}
          />
        </Card>

        <Card>
          <Title level={4}>Workspace Guidelines</Title>
          <Paragraph>
            Workspaces help you organize your work and collaborate with team members. Here are some best practices:
          </Paragraph>
          <ul className="list-disc pl-5 mb-4">
            <li>Create separate workspaces for different teams or projects</li>
            <li>Use descriptive names and add detailed descriptions</li>
            <li>Assign appropriate roles to workspace members</li>
            <li>Configure workspace-specific settings for security and notifications</li>
            <li>Regularly review and clean up unused workspaces</li>
          </ul>
          <Alert
            message="Need help with workspaces?"
            description="Check out our documentation for detailed guides on workspace management and best practices."
            type="info"
            showIcon
            action={
              <Button size="small" type="primary">
                View Documentation
              </Button>
            }
          />
        </Card>

        {/* Create Workspace Modal */}
        <Modal
          title="Create New Workspace"
          open={isCreateModalVisible}
          onCancel={handleCreateCancel}
          onOk={handleCreate}
          okText="Create"
        >
          <Form
            form={createForm}
            layout="vertical"
            name="create_workspace_form"
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
              extra="This will be used in URLs and cannot be changed later."
            >
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
              initialValue={false}
            >
              <Switch 
                checkedChildren={<GlobalOutlined />} 
                unCheckedChildren={<LockOutlined />} 
              />
              <Text className="ml-2 text-sm text-gray-500">
                Make workspace discoverable by other users
              </Text>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Workspace Modal */}
        <Modal
          title="Edit Workspace"
          open={isEditModalVisible}
          onCancel={handleEditCancel}
          onOk={handleEdit}
          okText="Save Changes"
        >
          <Form
            form={editForm}
            layout="vertical"
            name="edit_workspace_form"
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
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
          </Form>
        </Modal>
      </div>
    </RoleBasedAccess>
  );
};

export default WorkspaceManagement;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Switch, 
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Badge, 
  Empty, 
  Alert,
  Tabs,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  CheckCircleOutlined, 
  TeamOutlined, 
  SettingOutlined, 
  GlobalOutlined, 
  LockOutlined,
  SearchOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import { Link, useNavigate } from 'react-router-dom';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import { Workspace, CreateWorkspaceData, UpdateWorkspaceData } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceManagement: React.FC = () => {
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const { 
    workspaces, 
    createWorkspace, 
    updateWorkspace, 
    deleteWorkspace,
    isLoading
  } = useWorkspaces();
  
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Get workspace initials for avatar
  const getWorkspaceInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get color based on workspace name
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
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);
    
    return colors[hash % colors.length];
  };

  const showCreateModal = () => {
    createForm.resetFields();
    setIsCreateModalVisible(true);
  };

  const showEditModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    editForm.setFieldsValue({
      name: workspace.name,
      slug: workspace.slug,
      description: workspace.description,
      isPublic: workspace.isPublic
    });
    setIsEditModalVisible(true);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedWorkspace(null);
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      await createWorkspace(values as CreateWorkspaceData);
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEdit = async () => {
    if (!selectedWorkspace) return;
    
    try {
      const values = await editForm.validateFields();
      await updateWorkspace(selectedWorkspace.id, values as UpdateWorkspaceData);
      setIsEditModalVisible(false);
      setSelectedWorkspace(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (workspaceId: string) => {
    try {
      await deleteWorkspace(workspaceId);
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const handleWorkspaceSettings = (workspaceId: string) => {
    navigate(`/workspace-settings?id=${workspaceId}`);
  };

  const filteredWorkspaces = workspaces
    .filter(workspace => {
      const matchesSearch = 
        workspace.name.toLowerCase().includes(searchText.toLowerCase()) ||
        workspace.slug.toLowerCase().includes(searchText.toLowerCase()) ||
        (workspace.description && workspace.description.toLowerCase().includes(searchText.toLowerCase()));
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'owned') return workspace.ownerId === user?.id && matchesSearch;
      if (activeTab === 'member') return workspace.ownerId !== user?.id && matchesSearch;
      if (activeTab === 'public') return workspace.isPublic && matchesSearch;
      if (activeTab === 'private') return !workspace.isPublic && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

  const columns = [
    {
      title: 'Workspace',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Workspace) => (
        <div className="flex items-center">
          <Avatar 
            style={{ 
              backgroundColor: getWorkspaceColor(record.name),
              marginRight: '12px'
            }}
          >
            {getWorkspaceInitials(record.name)}
          </Avatar>
          <div>
            <div className="font-medium">{text}</div>
            <Text type="secondary" className="text-xs">
              {record.slug}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || <Text type="secondary">No description</Text>,
    },
    {
      title: 'Members',
      dataIndex: 'memberCount',
      key: 'memberCount',
      render: (count: number) => (
        <Tag icon={<TeamOutlined />} color="blue">
          {count}
        </Tag>
      ),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan: string) => (
        <Tag color={plan === 'free' ? 'default' : 'green'}>
          {plan.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Visibility',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic: boolean) => (
        isPublic ? 
          <Tag icon={<GlobalOutlined />} color="blue">Public</Tag> : 
          <Tag icon={<LockOutlined />} color="default">Private</Tag>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Workspace) => (
        <Space size="small">
          <Tooltip title="Workspace Settings">
            <Button 
              icon={<SettingOutlined />} 
              size="small"
              onClick={() => handleWorkspaceSettings(record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit Workspace">
            <Button 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this workspace?"
            description="This action cannot be undone. All data will be permanently deleted."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button 
              icon={<DeleteOutlined />} 
              size="small"
              danger
              disabled={record.ownerId !== user?.id}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <div>
        <div className="mb-6">
          <Title level={2}>Workspace Management</Title>
          <Text type="secondary">
            Create, manage, and organize your workspaces
          </Text>
        </div>

        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Input 
                placeholder="Search workspaces" 
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
                className="mr-4"
              />
              <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                <TabPane tab="All" key="all" />
                <TabPane tab="Owned" key="owned" />
                <TabPane tab="Member" key="member" />
                <TabPane tab="Public" key="public" />
                <TabPane tab="Private" key="private" />
              </Tabs>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              Create Workspace
            </Button>
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredWorkspaces} 
            rowKey="id"
            loading={isLoading}
            locale={{
              emptyText: (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description={
                    <span>
                      No workspaces found
                      {searchText && ' matching your search'}
                    </span>
                  }
                />
              )
            }}
          />
        </Card>

        <Card>
          <Title level={4}>Workspace Guidelines</Title>
          <Paragraph>
            Workspaces help you organize your work and collaborate with team members. Here are some best practices:
          </Paragraph>
          <ul className="list-disc pl-5 mb-4">
            <li>Create separate workspaces for different teams or projects</li>
            <li>Use descriptive names and add detailed descriptions</li>
            <li>Assign appropriate roles to workspace members</li>
            <li>Configure workspace-specific settings for security and notifications</li>
            <li>Regularly review and clean up unused workspaces</li>
          </ul>
          <Alert
            message="Need help with workspaces?"
            description="Check out our documentation for detailed guides on workspace management and best practices."
            type="info"
            showIcon
            action={
              <Button size="small" type="primary">
                View Documentation
              </Button>
            }
          />
        </Card>

        {/* Create Workspace Modal */}
        <Modal
          title="Create New Workspace"
          open={isCreateModalVisible}
          onCancel={handleCreateCancel}
          onOk={handleCreate}
          okText="Create"
        >
          <Form
            form={createForm}
            layout="vertical"
            name="create_workspace_form"
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
              extra="This will be used in URLs and cannot be changed later."
            >
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
              initialValue={false}
            >
              <Switch 
                checkedChildren={<GlobalOutlined />} 
                unCheckedChildren={<LockOutlined />} 
              />
              <Text className="ml-2 text-sm text-gray-500">
                Make workspace discoverable by other users
              </Text>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Workspace Modal */}
        <Modal
          title="Edit Workspace"
          open={isEditModalVisible}
          onCancel={handleEditCancel}
          onOk={handleEdit}
          okText="Save Changes"
        >
          <Form
            form={editForm}
            layout="vertical"
            name="edit_workspace_form"
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
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
          </Form>
        </Modal>
      </div>
    </RoleBasedAccess>
  );
};

export default WorkspaceManagement;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Switch, 
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Badge, 
  Empty, 
  Alert,
  Tabs,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  CheckCircleOutlined, 
  TeamOutlined, 
  SettingOutlined, 
  GlobalOutlined, 
  LockOutlined,
  SearchOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import { Link, useNavigate } from 'react-router-dom';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import { Workspace, CreateWorkspaceData, UpdateWorkspaceData } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceManagement: React.FC = () => {
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const { 
    workspaces, 
    createWorkspace, 
    updateWorkspace, 
    deleteWorkspace,
    isLoading
  } = useWorkspaces();
  
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Get workspace initials for avatar
  const getWorkspaceInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get color based on workspace name
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
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);
    
    return colors[hash % colors.length];
  };

  const showCreateModal = () => {
    createForm.resetFields();
    setIsCreateModalVisible(true);
  };

  const showEditModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    editForm.setFieldsValue({
      name: workspace.name,
      slug: workspace.slug,
      description: workspace.description,
      isPublic: workspace.isPublic
    });
    setIsEditModalVisible(true);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedWorkspace(null);
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      await createWorkspace(values as CreateWorkspaceData);
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEdit = async () => {
    if (!selectedWorkspace) return;
    
    try {
      const values = await editForm.validateFields();
      await updateWorkspace(selectedWorkspace.id, values as UpdateWorkspaceData);
      setIsEditModalVisible(false);
      setSelectedWorkspace(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (workspaceId: string) => {
    try {
      await deleteWorkspace(workspaceId);
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const handleWorkspaceSettings = (workspaceId: string) => {
    navigate(`/workspace-settings?id=${workspaceId}`);
  };

  const filteredWorkspaces = workspaces
    .filter(workspace => {
      const matchesSearch = 
        workspace.name.toLowerCase().includes(searchText.toLowerCase()) ||
        workspace.slug.toLowerCase().includes(searchText.toLowerCase()) ||
        (workspace.description && workspace.description.toLowerCase().includes(searchText.toLowerCase()));
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'owned') return workspace.ownerId === user?.id && matchesSearch;
      if (activeTab === 'member') return workspace.ownerId !== user?.id && matchesSearch;
      if (activeTab === 'public') return workspace.isPublic && matchesSearch;
      if (activeTab === 'private') return !workspace.isPublic && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

  const columns = [
    {
      title: 'Workspace',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Workspace) => (
        <div className="flex items-center">
          <Avatar 
            style={{ 
              backgroundColor: getWorkspaceColor(record.name),
              marginRight: '12px'
            }}
          >
            {getWorkspaceInitials(record.name)}
          </Avatar>
          <div>
            <div className="font-medium">{text}</div>
            <Text type="secondary" className="text-xs">
              {record.slug}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || <Text type="secondary">No description</Text>,
    },
    {
      title: 'Members',
      dataIndex: 'memberCount',
      key: 'memberCount',
      render: (count: number) => (
        <Tag icon={<TeamOutlined />} color="blue">
          {count}
        </Tag>
      ),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan: string) => (
        <Tag color={plan === 'free' ? 'default' : 'green'}>
          {plan.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Visibility',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic: boolean) => (
        isPublic ? 
          <Tag icon={<GlobalOutlined />} color="blue">Public</Tag> : 
          <Tag icon={<LockOutlined />} color="default">Private</Tag>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Workspace) => (
        <Space size="small">
          <Tooltip title="Workspace Settings">
            <Button 
              icon={<SettingOutlined />} 
              size="small"
              onClick={() => handleWorkspaceSettings(record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit Workspace">
            <Button 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this workspace?"
            description="This action cannot be undone. All data will be permanently deleted."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button 
              icon={<DeleteOutlined />} 
              size="small"
              danger
              disabled={record.ownerId !== user?.id}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <div>
        <div className="mb-6">
          <Title level={2}>Workspace Management</Title>
          <Text type="secondary">
            Create, manage, and organize your workspaces
          </Text>
        </div>

        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Input 
                placeholder="Search workspaces" 
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
                className="mr-4"
              />
              <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                <TabPane tab="All" key="all" />
                <TabPane tab="Owned" key="owned" />
                <TabPane tab="Member" key="member" />
                <TabPane tab="Public" key="public" />
                <TabPane tab="Private" key="private" />
              </Tabs>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              Create Workspace
            </Button>
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredWorkspaces} 
            rowKey="id"
            loading={isLoading}
            locale={{
              emptyText: (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description={
                    <span>
                      No workspaces found
                      {searchText && ' matching your search'}
                    </span>
                  }
                />
              )
            }}
          />
        </Card>

        <Card>
          <Title level={4}>Workspace Guidelines</Title>
          <Paragraph>
            Workspaces help you organize your work and collaborate with team members. Here are some best practices:
          </Paragraph>
          <ul className="list-disc pl-5 mb-4">
            <li>Create separate workspaces for different teams or projects</li>
            <li>Use descriptive names and add detailed descriptions</li>
            <li>Assign appropriate roles to workspace members</li>
            <li>Configure workspace-specific settings for security and notifications</li>
            <li>Regularly review and clean up unused workspaces</li>
          </ul>
          <Alert
            message="Need help with workspaces?"
            description="Check out our documentation for detailed guides on workspace management and best practices."
            type="info"
            showIcon
            action={
              <Button size="small" type="primary">
                View Documentation
              </Button>
            }
          />
        </Card>

        {/* Create Workspace Modal */}
        <Modal
          title="Create New Workspace"
          open={isCreateModalVisible}
          onCancel={handleCreateCancel}
          onOk={handleCreate}
          okText="Create"
        >
          <Form
            form={createForm}
            layout="vertical"
            name="create_workspace_form"
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
              extra="This will be used in URLs and cannot be changed later."
            >
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
              initialValue={false}
            >
              <Switch 
                checkedChildren={<GlobalOutlined />} 
                unCheckedChildren={<LockOutlined />} 
              />
              <Text className="ml-2 text-sm text-gray-500">
                Make workspace discoverable by other users
              </Text>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Workspace Modal */}
        <Modal
          title="Edit Workspace"
          open={isEditModalVisible}
          onCancel={handleEditCancel}
          onOk={handleEdit}
          okText="Save Changes"
        >
          <Form
            form={editForm}
            layout="vertical"
            name="edit_workspace_form"
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
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
          </Form>
        </Modal>
      </div>
    </RoleBasedAccess>
  );
};

export default WorkspaceManagement;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Switch, 
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Badge, 
  Empty, 
  Alert,
  Tabs,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  CheckCircleOutlined, 
  TeamOutlined, 
  SettingOutlined, 
  GlobalOutlined, 
  LockOutlined,
  SearchOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import { Link, useNavigate } from 'react-router-dom';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import { Workspace, CreateWorkspaceData, UpdateWorkspaceData } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceManagement: React.FC = () => {
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const { 
    workspaces, 
    createWorkspace, 
    updateWorkspace, 
    deleteWorkspace,
    isLoading
  } = useWorkspaces();
  
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Get workspace initials for avatar
  const getWorkspaceInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get color based on workspace name
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
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);
    
    return colors[hash % colors.length];
  };

  const showCreateModal = () => {
    createForm.resetFields();
    setIsCreateModalVisible(true);
  };

  const showEditModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    editForm.setFieldsValue({
      name: workspace.name,
      slug: workspace.slug,
      description: workspace.description,
      isPublic: workspace.isPublic
    });
    setIsEditModalVisible(true);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedWorkspace(null);
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      await createWorkspace(values as CreateWorkspaceData);
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEdit = async () => {
    if (!selectedWorkspace) return;
    
    try {
      const values = await editForm.validateFields();
      await updateWorkspace(selectedWorkspace.id, values as UpdateWorkspaceData);
      setIsEditModalVisible(false);
      setSelectedWorkspace(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (workspaceId: string) => {
    try {
      await deleteWorkspace(workspaceId);
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const handleWorkspaceSettings = (workspaceId: string) => {
    navigate(`/workspace-settings?id=${workspaceId}`);
  };

  const filteredWorkspaces = workspaces
    .filter(workspace => {
      const matchesSearch = 
        workspace.name.toLowerCase().includes(searchText.toLowerCase()) ||
        workspace.slug.toLowerCase().includes(searchText.toLowerCase()) ||
        (workspace.description && workspace.description.toLowerCase().includes(searchText.toLowerCase()));
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'owned') return workspace.ownerId === user?.id && matchesSearch;
      if (activeTab === 'member') return workspace.ownerId !== user?.id && matchesSearch;
      if (activeTab === 'public') return workspace.isPublic && matchesSearch;
      if (activeTab === 'private') return !workspace.isPublic && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

  const columns = [
    {
      title: 'Workspace',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Workspace) => (
        <div className="flex items-center">
          <Avatar 
            style={{ 
              backgroundColor: getWorkspaceColor(record.name),
              marginRight: '12px'
            }}
          >
            {getWorkspaceInitials(record.name)}
          </Avatar>
          <div>
            <div className="font-medium">{text}</div>
            <Text type="secondary" className="text-xs">
              {record.slug}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || <Text type="secondary">No description</Text>,
    },
    {
      title: 'Members',
      dataIndex: 'memberCount',
      key: 'memberCount',
      render: (count: number) => (
        <Tag icon={<TeamOutlined />} color="blue">
          {count}
        </Tag>
      ),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan: string) => (
        <Tag color={plan === 'free' ? 'default' : 'green'}>
          {plan.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Visibility',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic: boolean) => (
        isPublic ? 
          <Tag icon={<GlobalOutlined />} color="blue">Public</Tag> : 
          <Tag icon={<LockOutlined />} color="default">Private</Tag>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Workspace) => (
        <Space size="small">
          <Tooltip title="Workspace Settings">
            <Button 
              icon={<SettingOutlined />} 
              size="small"
              onClick={() => handleWorkspaceSettings(record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit Workspace">
            <Button 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this workspace?"
            description="This action cannot be undone. All data will be permanently deleted."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button 
              icon={<DeleteOutlined />} 
              size="small"
              danger
              disabled={record.ownerId !== user?.id}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <div>
        <div className="mb-6">
          <Title level={2}>Workspace Management</Title>
          <Text type="secondary">
            Create, manage, and organize your workspaces
          </Text>
        </div>

        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Input 
                placeholder="Search workspaces" 
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
                className="mr-4"
              />
              <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                <TabPane tab="All" key="all" />
                <TabPane tab="Owned" key="owned" />
                <TabPane tab="Member" key="member" />
                <TabPane tab="Public" key="public" />
                <TabPane tab="Private" key="private" />
              </Tabs>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              Create Workspace
            </Button>
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredWorkspaces} 
            rowKey="id"
            loading={isLoading}
            locale={{
              emptyText: (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description={
                    <span>
                      No workspaces found
                      {searchText && ' matching your search'}
                    </span>
                  }
                />
              )
            }}
          />
        </Card>

        <Card>
          <Title level={4}>Workspace Guidelines</Title>
          <Paragraph>
            Workspaces help you organize your work and collaborate with team members. Here are some best practices:
          </Paragraph>
          <ul className="list-disc pl-5 mb-4">
            <li>Create separate workspaces for different teams or projects</li>
            <li>Use descriptive names and add detailed descriptions</li>
            <li>Assign appropriate roles to workspace members</li>
            <li>Configure workspace-specific settings for security and notifications</li>
            <li>Regularly review and clean up unused workspaces</li>
          </ul>
          <Alert
            message="Need help with workspaces?"
            description="Check out our documentation for detailed guides on workspace management and best practices."
            type="info"
            showIcon
            action={
              <Button size="small" type="primary">
                View Documentation
              </Button>
            }
          />
        </Card>

        {/* Create Workspace Modal */}
        <Modal
          title="Create New Workspace"
          open={isCreateModalVisible}
          onCancel={handleCreateCancel}
          onOk={handleCreate}
          okText="Create"
        >
          <Form
            form={createForm}
            layout="vertical"
            name="create_workspace_form"
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
              extra="This will be used in URLs and cannot be changed later."
            >
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
              initialValue={false}
            >
              <Switch 
                checkedChildren={<GlobalOutlined />} 
                unCheckedChildren={<LockOutlined />} 
              />
              <Text className="ml-2 text-sm text-gray-500">
                Make workspace discoverable by other users
              </Text>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Workspace Modal */}
        <Modal
          title="Edit Workspace"
          open={isEditModalVisible}
          onCancel={handleEditCancel}
          onOk={handleEdit}
          okText="Save Changes"
        >
          <Form
            form={editForm}
            layout="vertical"
            name="edit_workspace_form"
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
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
          </Form>
        </Modal>
      </div>
    </RoleBasedAccess>
  );
};

export default WorkspaceManagement;import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Table, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Switch, 
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Badge, 
  Empty, 
  Alert,
  Tabs,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  CheckCircleOutlined, 
  TeamOutlined, 
  SettingOutlined, 
  GlobalOutlined, 
  LockOutlined,
  SearchOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import { Link, useNavigate } from 'react-router-dom';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import { Workspace, CreateWorkspaceData, UpdateWorkspaceData } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceManagement: React.FC = () => {
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const { 
    workspaces, 
    createWorkspace, 
    updateWorkspace, 
    deleteWorkspace,
    isLoading
  } = useWorkspaces();
  
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Get workspace initials for avatar
  const getWorkspaceInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get color based on workspace name
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
    
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);
    
    return colors[hash % colors.length];
  };

  const showCreateModal = () => {
    createForm.resetFields();
    setIsCreateModalVisible(true);
  };

  const showEditModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    editForm.setFieldsValue({
      name: workspace.name,
      slug: workspace.slug,
      description: workspace.description,
      isPublic: workspace.isPublic
    });
    setIsEditModalVisible(true);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedWorkspace(null);
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      await createWorkspace(values as CreateWorkspaceData);
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEdit = async () => {
    if (!selectedWorkspace) return;
    
    try {
      const values = await editForm.validateFields();
      await updateWorkspace(selectedWorkspace.id, values as UpdateWorkspaceData);
      setIsEditModalVisible(false);
      setSelectedWorkspace(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async (workspaceId: string) => {
    try {
      await deleteWorkspace(workspaceId);
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const handleWorkspaceSettings = (workspaceId: string) => {
    navigate(`/workspace-settings?id=${workspaceId}`);
  };

  const filteredWorkspaces = workspaces
    .filter(workspace => {
      const matchesSearch = 
        workspace.name.toLowerCase().includes(searchText.toLowerCase()) ||
        workspace.slug.toLowerCase().includes(searchText.toLowerCase()) ||
        (workspace.description && workspace.description.toLowerCase().includes(searchText.toLowerCase()));
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'owned') return workspace.ownerId === user?.id && matchesSearch;
      if (activeTab === 'member') return workspace.ownerId !== user?.id && matchesSearch;
      if (activeTab === 'public') return workspace.isPublic && matchesSearch;
      if (activeTab === 'private') return !workspace.isPublic && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

  const columns = [
    {
      title: 'Workspace',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Workspace) => (
        <div className="flex items-center">
          <Avatar 
            style={{ 
              backgroundColor: getWorkspaceColor(record.name),
              marginRight: '12px'
            }}
          >
            {getWorkspaceInitials(record.name)}
          </Avatar>
          <div>
            <div className="font-medium">{text}</div>
            <Text type="secondary" className="text-xs">
              {record.slug}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text || <Text type="secondary">No description</Text>,
    },
    {
      title: 'Members',
      dataIndex: 'memberCount',
      key: 'memberCount',
      render: (count: number) => (
        <Tag icon={<TeamOutlined />} color="blue">
          {count}
        </Tag>
      ),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan: string) => (
        <Tag color={plan === 'free' ? 'default' : 'green'}>
          {plan.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Visibility',
      dataIndex: 'isPublic',
      key: 'isPublic',
      render: (isPublic: boolean) => (
        isPublic ? 
          <Tag icon={<GlobalOutlined />} color="blue">Public</Tag> : 
          <Tag icon={<LockOutlined />} color="default">Private</Tag>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Workspace) => (
        <Space size="small">
          <Tooltip title="Workspace Settings">
            <Button 
              icon={<SettingOutlined />} 
              size="small"
              onClick={() => handleWorkspaceSettings(record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit Workspace">
            <Button 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this workspace?"
            description="This action cannot be undone. All data will be permanently deleted."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button 
              icon={<DeleteOutlined />} 
              size="small"
              danger
              disabled={record.ownerId !== user?.id}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <div>
        <div className="mb-6">
          <Title level={2}>Workspace Management</Title>
          <Text type="secondary">
            Create, manage, and organize your workspaces
          </Text>
        </div>

        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Input 
                placeholder="Search workspaces" 
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250 }}
                className="mr-4"
              />
              <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                <TabPane tab="All" key="all" />
                <TabPane tab="Owned" key="owned" />
                <TabPane tab="Member" key="member" />
                <TabPane tab="Public" key="public" />
                <TabPane tab="Private" key="private" />
              </Tabs>
            </div>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              Create Workspace
            </Button>
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredWorkspaces} 
            rowKey="id"
            loading={isLoading}
            locale={{
              emptyText: (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description={
                    <span>
                      No workspaces found
                      {searchText && ' matching your search'}
                    </span>
                  }
                />
              )
            }}
          />
        </Card>

        <Card>
          <Title level={4}>Workspace Guidelines</Title>
          <Paragraph>
            Workspaces help you organize your work and collaborate with team members. Here are some best practices:
          </Paragraph>
          <ul className="list-disc pl-5 mb-4">
            <li>Create separate workspaces for different teams or projects</li>
            <li>Use descriptive names and add detailed descriptions</li>
            <li>Assign appropriate roles to workspace members</li>
            <li>Configure workspace-specific settings for security and notifications</li>
            <li>Regularly review and clean up unused workspaces</li>
          </ul>
          <Alert
            message="Need help with workspaces?"
            description="Check out our documentation for detailed guides on workspace management and best practices."
            type="info"
            showIcon
            action={
              <Button size="small" type="primary">
                View Documentation
              </Button>
            }
          />
        </Card>

        {/* Create Workspace Modal */}
        <Modal
          title="Create New Workspace"
          open={isCreateModalVisible}
          onCancel={handleCreateCancel}
          onOk={handleCreate}
          okText="Create"
        >
          <Form
            form={createForm}
            layout="vertical"
            name="create_workspace_form"
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
              extra="This will be used in URLs and cannot be changed later."
            >
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
              initialValue={false}
            >
              <Switch 
                checkedChildren={<GlobalOutlined />} 
                unCheckedChildren={<LockOutlined />} 
              />
              <Text className="ml-2 text-sm text-gray-500">
                Make workspace discoverable by other users
              </Text>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Workspace Modal */}
        <Modal
          title="Edit Workspace"
          open={isEditModalVisible}
          onCancel={handleEditCancel}
          onOk={handleEdit}
          okText="Save Changes"
        >
          <Form
            form={editForm}
            layout="vertical"
            name="edit_workspace_form"
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
              <Input placeholder="my-workspace" addonBefore="cauldronos.app/" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea placeholder="Describe your workspace" rows={3} />
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
          </Form>
        </Modal>
      </div>
    </RoleBasedAccess>
  );
};

export default WorkspaceManagement;