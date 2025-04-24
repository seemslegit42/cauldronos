import React, { useState, useEffect } from 'react';
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
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Empty, 
  Alert,
  Tabs,
  Divider,
  message
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  TeamOutlined, 
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import WorkspaceAccess from '../../auth/WorkspaceAccess';
import { WorkspaceMember } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceMembersPage: React.FC = () => {
  const { data: user } = useAuth();
  const { 
    currentWorkspace, 
    workspaceMembers, 
    workspaceConfig,
    addWorkspaceMember,
    removeWorkspaceMember,
    updateWorkspaceMemberRole,
    fetchWorkspaceMembers
  } = useWorkspaces();
  
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [isEditRoleModalVisible, setIsEditRoleModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(null);
  const [inviteForm] = Form.useForm();
  const [editRoleForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentWorkspace) {
      setIsLoading(true);
      fetchWorkspaceMembers(currentWorkspace.id)
        .finally(() => setIsLoading(false));
    }
  }, [currentWorkspace]);

  const showInviteModal = () => {
    inviteForm.resetFields();
    setIsInviteModalVisible(true);
  };

  const showEditRoleModal = (member: WorkspaceMember) => {
    setSelectedMember(member);
    editRoleForm.setFieldsValue({
      role: member.role
    });
    setIsEditRoleModalVisible(true);
  };

  const handleInviteCancel = () => {
    setIsInviteModalVisible(false);
  };

  const handleEditRoleCancel = () => {
    setIsEditRoleModalVisible(false);
    setSelectedMember(null);
  };

  const handleInvite = async () => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      const values = await inviteForm.validateFields();
      await addWorkspaceMember(currentWorkspace.id, values.email, values.role);
      setIsInviteModalVisible(false);
      inviteForm.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditRole = async () => {
    if (!currentWorkspace || !selectedMember) {
      message.error('No workspace or member selected');
      return;
    }
    
    try {
      const values = await editRoleForm.validateFields();
      await updateWorkspaceMemberRole(currentWorkspace.id, selectedMember.id, values.role);
      setIsEditRoleModalVisible(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      await removeWorkspaceMember(currentWorkspace.id, memberId);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const filteredMembers = workspaceMembers
    .filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchText.toLowerCase()) ||
        member.email.toLowerCase().includes(searchText.toLowerCase());
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'admin') return member.role === 'ADMIN' && matchesSearch;
      if (activeTab === 'manager') return member.role === 'MANAGER' && matchesSearch;
      if (activeTab === 'user') return member.role === 'USER' && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      // Sort by owner first, then by role importance, then by name
      if (a.isOwner && !b.isOwner) return -1;
      if (!a.isOwner && b.isOwner) return 1;
      
      const roleOrder = { 'ADMIN': 0, 'MANAGER': 1, 'USER': 2, 'GUEST': 3 };
      const roleA = roleOrder[a.role as keyof typeof roleOrder];
      const roleB = roleOrder[b.role as keyof typeof roleOrder];
      
      if (roleA !== roleB) return roleA - roleB;
      
      return a.name.localeCompare(b.name);
    });

  const columns = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: WorkspaceMember) => (
        <div className="flex items-center">
          <Avatar 
            icon={<UserOutlined />}
            src={record.avatarUrl}
            style={{ marginRight: '12px' }}
          />
          <div>
            <div className="font-medium flex items-center">
              {text}
              {record.isOwner && (
                <Tooltip title="Workspace Owner">
                  <CrownOutlined className="ml-2 text-yellow-500" />
                </Tooltip>
              )}
            </div>
            <Text type="secondary" className="text-xs">
              <MailOutlined className="mr-1" />
              {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color = 'default';
        if (role === 'ADMIN') color = 'red';
        if (role === 'MANAGER') color = 'green';
        if (role === 'USER') color = 'blue';
        if (role === 'GUEST') color = 'orange';
        
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Joined',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={date ? new Date(date).toLocaleString() : 'Never'}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {date ? new Date(date).toLocaleDateString() : 'Never'}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: WorkspaceMember) => {
        // Current user can't remove themselves or the owner
        const canRemove = user?.id !== record.userId && !record.isOwner;
        // Only admins can edit roles, and they can't edit the owner's role
        const canEditRole = !record.isOwner;
        
        return (
          <Space size="small">
            {canEditRole && (
              <Tooltip title="Edit Role">
                <Button 
                  icon={<EditOutlined />} 
                  size="small"
                  onClick={() => showEditRoleModal(record)}
                />
              </Tooltip>
            )}
            {canRemove && (
              <Popconfirm
                title="Remove this member?"
                description="This will remove the member from the workspace."
                onConfirm={() => handleRemoveMember(record.id)}
                okText="Remove"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
              >
                <Button 
                  icon={<DeleteOutlined />} 
                  size="small"
                  danger
                />
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <WorkspaceAccess>
        <div>
          <div className="mb-6">
            <Title level={2}>Workspace Members</Title>
            <Text type="secondary">
              Manage members and their roles in your workspace
            </Text>
          </div>

          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Input 
                  placeholder="Search members" 
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  style={{ width: 250 }}
                  className="mr-4"
                />
                <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                  <TabPane tab="All" key="all" />
                  <TabPane tab="Admins" key="admin" />
                  <TabPane tab="Managers" key="manager" />
                  <TabPane tab="Users" key="user" />
                </Tabs>
              </div>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={showInviteModal}
              >
                Invite Member
              </Button>
            </div>

            <Table 
              columns={columns} 
              dataSource={filteredMembers} 
              rowKey="id"
              loading={isLoading}
              locale={{
                emptyText: (
                  <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description={
                      <span>
                        No members found
                        {searchText && ' matching your search'}
                      </span>
                    }
                  />
                )
              }}
            />
          </Card>

          <Card>
            <Title level={4}>Member Roles & Permissions</Title>
            <Paragraph>
              Each role in the workspace has different permissions:
            </Paragraph>
            <div className="mb-4">
              <Tag color="red" className="mb-2 mr-2">ADMIN</Tag>
              <Text>Full access to all workspace settings and can manage members and roles.</Text>
            </div>
            <div className="mb-4">
              <Tag color="green" className="mb-2 mr-2">MANAGER</Tag>
              <Text>Can manage content and some settings, but cannot delete the workspace or manage admins.</Text>
            </div>
            <div className="mb-4">
              <Tag color="blue" className="mb-2 mr-2">USER</Tag>
              <Text>Can view and interact with content but cannot change workspace settings.</Text>
            </div>
            <div className="mb-4">
              <Tag color="orange" className="mb-2 mr-2">GUEST</Tag>
              <Text>Limited access to specific content only. Cannot modify workspace content.</Text>
            </div>
            
            <Divider />
            
            <Alert
              message="Default Role for New Members"
              description={
                <div>
                  <p>New members invited to this workspace will be assigned the <Tag>{workspaceConfig?.defaultRole || 'USER'}</Tag> role by default.</p>
                  <p>You can change this in the workspace settings.</p>
                </div>
              }
              type="info"
              showIcon
            />
          </Card>

          {/* Invite Member Modal */}
          <Modal
            title="Invite Member to Workspace"
            open={isInviteModalVisible}
            onCancel={handleInviteCancel}
            onOk={handleInvite}
            okText="Send Invitation"
          >
            <Form
              form={inviteForm}
              layout="vertical"
              name="invite_member_form"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter an email address' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input placeholder="colleague@example.com" />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                initialValue={workspaceConfig?.defaultRole || "USER"}
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="message"
                label="Personal Message (Optional)"
              >
                <Input.TextArea 
                  placeholder="Add a personal message to the invitation email" 
                  rows={3}
                />
              </Form.Item>
            </Form>
          </Modal>

          {/* Edit Role Modal */}
          <Modal
            title="Edit Member Role"
            open={isEditRoleModalVisible}
            onCancel={handleEditRoleCancel}
            onOk={handleEditRole}
            okText="Save Changes"
          >
            <Form
              form={editRoleForm}
              layout="vertical"
              name="edit_role_form"
            >
              <div className="mb-4">
                <Text strong>Member: </Text>
                <Text>{selectedMember?.name} ({selectedMember?.email})</Text>
              </div>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default WorkspaceMembersPage;import React, { useState, useEffect } from 'react';
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
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Empty, 
  Alert,
  Tabs,
  Divider,
  message
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  TeamOutlined, 
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import WorkspaceAccess from '../../auth/WorkspaceAccess';
import { WorkspaceMember } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceMembersPage: React.FC = () => {
  const { data: user } = useAuth();
  const { 
    currentWorkspace, 
    workspaceMembers, 
    workspaceConfig,
    addWorkspaceMember,
    removeWorkspaceMember,
    updateWorkspaceMemberRole,
    fetchWorkspaceMembers
  } = useWorkspaces();
  
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [isEditRoleModalVisible, setIsEditRoleModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(null);
  const [inviteForm] = Form.useForm();
  const [editRoleForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentWorkspace) {
      setIsLoading(true);
      fetchWorkspaceMembers(currentWorkspace.id)
        .finally(() => setIsLoading(false));
    }
  }, [currentWorkspace]);

  const showInviteModal = () => {
    inviteForm.resetFields();
    setIsInviteModalVisible(true);
  };

  const showEditRoleModal = (member: WorkspaceMember) => {
    setSelectedMember(member);
    editRoleForm.setFieldsValue({
      role: member.role
    });
    setIsEditRoleModalVisible(true);
  };

  const handleInviteCancel = () => {
    setIsInviteModalVisible(false);
  };

  const handleEditRoleCancel = () => {
    setIsEditRoleModalVisible(false);
    setSelectedMember(null);
  };

  const handleInvite = async () => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      const values = await inviteForm.validateFields();
      await addWorkspaceMember(currentWorkspace.id, values.email, values.role);
      setIsInviteModalVisible(false);
      inviteForm.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditRole = async () => {
    if (!currentWorkspace || !selectedMember) {
      message.error('No workspace or member selected');
      return;
    }
    
    try {
      const values = await editRoleForm.validateFields();
      await updateWorkspaceMemberRole(currentWorkspace.id, selectedMember.id, values.role);
      setIsEditRoleModalVisible(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      await removeWorkspaceMember(currentWorkspace.id, memberId);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const filteredMembers = workspaceMembers
    .filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchText.toLowerCase()) ||
        member.email.toLowerCase().includes(searchText.toLowerCase());
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'admin') return member.role === 'ADMIN' && matchesSearch;
      if (activeTab === 'manager') return member.role === 'MANAGER' && matchesSearch;
      if (activeTab === 'user') return member.role === 'USER' && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      // Sort by owner first, then by role importance, then by name
      if (a.isOwner && !b.isOwner) return -1;
      if (!a.isOwner && b.isOwner) return 1;
      
      const roleOrder = { 'ADMIN': 0, 'MANAGER': 1, 'USER': 2, 'GUEST': 3 };
      const roleA = roleOrder[a.role as keyof typeof roleOrder];
      const roleB = roleOrder[b.role as keyof typeof roleOrder];
      
      if (roleA !== roleB) return roleA - roleB;
      
      return a.name.localeCompare(b.name);
    });

  const columns = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: WorkspaceMember) => (
        <div className="flex items-center">
          <Avatar 
            icon={<UserOutlined />}
            src={record.avatarUrl}
            style={{ marginRight: '12px' }}
          />
          <div>
            <div className="font-medium flex items-center">
              {text}
              {record.isOwner && (
                <Tooltip title="Workspace Owner">
                  <CrownOutlined className="ml-2 text-yellow-500" />
                </Tooltip>
              )}
            </div>
            <Text type="secondary" className="text-xs">
              <MailOutlined className="mr-1" />
              {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color = 'default';
        if (role === 'ADMIN') color = 'red';
        if (role === 'MANAGER') color = 'green';
        if (role === 'USER') color = 'blue';
        if (role === 'GUEST') color = 'orange';
        
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Joined',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={date ? new Date(date).toLocaleString() : 'Never'}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {date ? new Date(date).toLocaleDateString() : 'Never'}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: WorkspaceMember) => {
        // Current user can't remove themselves or the owner
        const canRemove = user?.id !== record.userId && !record.isOwner;
        // Only admins can edit roles, and they can't edit the owner's role
        const canEditRole = !record.isOwner;
        
        return (
          <Space size="small">
            {canEditRole && (
              <Tooltip title="Edit Role">
                <Button 
                  icon={<EditOutlined />} 
                  size="small"
                  onClick={() => showEditRoleModal(record)}
                />
              </Tooltip>
            )}
            {canRemove && (
              <Popconfirm
                title="Remove this member?"
                description="This will remove the member from the workspace."
                onConfirm={() => handleRemoveMember(record.id)}
                okText="Remove"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
              >
                <Button 
                  icon={<DeleteOutlined />} 
                  size="small"
                  danger
                />
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <WorkspaceAccess>
        <div>
          <div className="mb-6">
            <Title level={2}>Workspace Members</Title>
            <Text type="secondary">
              Manage members and their roles in your workspace
            </Text>
          </div>

          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Input 
                  placeholder="Search members" 
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  style={{ width: 250 }}
                  className="mr-4"
                />
                <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                  <TabPane tab="All" key="all" />
                  <TabPane tab="Admins" key="admin" />
                  <TabPane tab="Managers" key="manager" />
                  <TabPane tab="Users" key="user" />
                </Tabs>
              </div>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={showInviteModal}
              >
                Invite Member
              </Button>
            </div>

            <Table 
              columns={columns} 
              dataSource={filteredMembers} 
              rowKey="id"
              loading={isLoading}
              locale={{
                emptyText: (
                  <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description={
                      <span>
                        No members found
                        {searchText && ' matching your search'}
                      </span>
                    }
                  />
                )
              }}
            />
          </Card>

          <Card>
            <Title level={4}>Member Roles & Permissions</Title>
            <Paragraph>
              Each role in the workspace has different permissions:
            </Paragraph>
            <div className="mb-4">
              <Tag color="red" className="mb-2 mr-2">ADMIN</Tag>
              <Text>Full access to all workspace settings and can manage members and roles.</Text>
            </div>
            <div className="mb-4">
              <Tag color="green" className="mb-2 mr-2">MANAGER</Tag>
              <Text>Can manage content and some settings, but cannot delete the workspace or manage admins.</Text>
            </div>
            <div className="mb-4">
              <Tag color="blue" className="mb-2 mr-2">USER</Tag>
              <Text>Can view and interact with content but cannot change workspace settings.</Text>
            </div>
            <div className="mb-4">
              <Tag color="orange" className="mb-2 mr-2">GUEST</Tag>
              <Text>Limited access to specific content only. Cannot modify workspace content.</Text>
            </div>
            
            <Divider />
            
            <Alert
              message="Default Role for New Members"
              description={
                <div>
                  <p>New members invited to this workspace will be assigned the <Tag>{workspaceConfig?.defaultRole || 'USER'}</Tag> role by default.</p>
                  <p>You can change this in the workspace settings.</p>
                </div>
              }
              type="info"
              showIcon
            />
          </Card>

          {/* Invite Member Modal */}
          <Modal
            title="Invite Member to Workspace"
            open={isInviteModalVisible}
            onCancel={handleInviteCancel}
            onOk={handleInvite}
            okText="Send Invitation"
          >
            <Form
              form={inviteForm}
              layout="vertical"
              name="invite_member_form"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter an email address' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input placeholder="colleague@example.com" />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                initialValue={workspaceConfig?.defaultRole || "USER"}
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="message"
                label="Personal Message (Optional)"
              >
                <Input.TextArea 
                  placeholder="Add a personal message to the invitation email" 
                  rows={3}
                />
              </Form.Item>
            </Form>
          </Modal>

          {/* Edit Role Modal */}
          <Modal
            title="Edit Member Role"
            open={isEditRoleModalVisible}
            onCancel={handleEditRoleCancel}
            onOk={handleEditRole}
            okText="Save Changes"
          >
            <Form
              form={editRoleForm}
              layout="vertical"
              name="edit_role_form"
            >
              <div className="mb-4">
                <Text strong>Member: </Text>
                <Text>{selectedMember?.name} ({selectedMember?.email})</Text>
              </div>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default WorkspaceMembersPage;import React, { useState, useEffect } from 'react';
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
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Empty, 
  Alert,
  Tabs,
  Divider,
  message
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  TeamOutlined, 
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import WorkspaceAccess from '../../auth/WorkspaceAccess';
import { WorkspaceMember } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceMembersPage: React.FC = () => {
  const { data: user } = useAuth();
  const { 
    currentWorkspace, 
    workspaceMembers, 
    workspaceConfig,
    addWorkspaceMember,
    removeWorkspaceMember,
    updateWorkspaceMemberRole,
    fetchWorkspaceMembers
  } = useWorkspaces();
  
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [isEditRoleModalVisible, setIsEditRoleModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(null);
  const [inviteForm] = Form.useForm();
  const [editRoleForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentWorkspace) {
      setIsLoading(true);
      fetchWorkspaceMembers(currentWorkspace.id)
        .finally(() => setIsLoading(false));
    }
  }, [currentWorkspace]);

  const showInviteModal = () => {
    inviteForm.resetFields();
    setIsInviteModalVisible(true);
  };

  const showEditRoleModal = (member: WorkspaceMember) => {
    setSelectedMember(member);
    editRoleForm.setFieldsValue({
      role: member.role
    });
    setIsEditRoleModalVisible(true);
  };

  const handleInviteCancel = () => {
    setIsInviteModalVisible(false);
  };

  const handleEditRoleCancel = () => {
    setIsEditRoleModalVisible(false);
    setSelectedMember(null);
  };

  const handleInvite = async () => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      const values = await inviteForm.validateFields();
      await addWorkspaceMember(currentWorkspace.id, values.email, values.role);
      setIsInviteModalVisible(false);
      inviteForm.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditRole = async () => {
    if (!currentWorkspace || !selectedMember) {
      message.error('No workspace or member selected');
      return;
    }
    
    try {
      const values = await editRoleForm.validateFields();
      await updateWorkspaceMemberRole(currentWorkspace.id, selectedMember.id, values.role);
      setIsEditRoleModalVisible(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      await removeWorkspaceMember(currentWorkspace.id, memberId);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const filteredMembers = workspaceMembers
    .filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchText.toLowerCase()) ||
        member.email.toLowerCase().includes(searchText.toLowerCase());
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'admin') return member.role === 'ADMIN' && matchesSearch;
      if (activeTab === 'manager') return member.role === 'MANAGER' && matchesSearch;
      if (activeTab === 'user') return member.role === 'USER' && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      // Sort by owner first, then by role importance, then by name
      if (a.isOwner && !b.isOwner) return -1;
      if (!a.isOwner && b.isOwner) return 1;
      
      const roleOrder = { 'ADMIN': 0, 'MANAGER': 1, 'USER': 2, 'GUEST': 3 };
      const roleA = roleOrder[a.role as keyof typeof roleOrder];
      const roleB = roleOrder[b.role as keyof typeof roleOrder];
      
      if (roleA !== roleB) return roleA - roleB;
      
      return a.name.localeCompare(b.name);
    });

  const columns = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: WorkspaceMember) => (
        <div className="flex items-center">
          <Avatar 
            icon={<UserOutlined />}
            src={record.avatarUrl}
            style={{ marginRight: '12px' }}
          />
          <div>
            <div className="font-medium flex items-center">
              {text}
              {record.isOwner && (
                <Tooltip title="Workspace Owner">
                  <CrownOutlined className="ml-2 text-yellow-500" />
                </Tooltip>
              )}
            </div>
            <Text type="secondary" className="text-xs">
              <MailOutlined className="mr-1" />
              {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color = 'default';
        if (role === 'ADMIN') color = 'red';
        if (role === 'MANAGER') color = 'green';
        if (role === 'USER') color = 'blue';
        if (role === 'GUEST') color = 'orange';
        
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Joined',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={date ? new Date(date).toLocaleString() : 'Never'}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {date ? new Date(date).toLocaleDateString() : 'Never'}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: WorkspaceMember) => {
        // Current user can't remove themselves or the owner
        const canRemove = user?.id !== record.userId && !record.isOwner;
        // Only admins can edit roles, and they can't edit the owner's role
        const canEditRole = !record.isOwner;
        
        return (
          <Space size="small">
            {canEditRole && (
              <Tooltip title="Edit Role">
                <Button 
                  icon={<EditOutlined />} 
                  size="small"
                  onClick={() => showEditRoleModal(record)}
                />
              </Tooltip>
            )}
            {canRemove && (
              <Popconfirm
                title="Remove this member?"
                description="This will remove the member from the workspace."
                onConfirm={() => handleRemoveMember(record.id)}
                okText="Remove"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
              >
                <Button 
                  icon={<DeleteOutlined />} 
                  size="small"
                  danger
                />
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <WorkspaceAccess>
        <div>
          <div className="mb-6">
            <Title level={2}>Workspace Members</Title>
            <Text type="secondary">
              Manage members and their roles in your workspace
            </Text>
          </div>

          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Input 
                  placeholder="Search members" 
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  style={{ width: 250 }}
                  className="mr-4"
                />
                <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                  <TabPane tab="All" key="all" />
                  <TabPane tab="Admins" key="admin" />
                  <TabPane tab="Managers" key="manager" />
                  <TabPane tab="Users" key="user" />
                </Tabs>
              </div>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={showInviteModal}
              >
                Invite Member
              </Button>
            </div>

            <Table 
              columns={columns} 
              dataSource={filteredMembers} 
              rowKey="id"
              loading={isLoading}
              locale={{
                emptyText: (
                  <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description={
                      <span>
                        No members found
                        {searchText && ' matching your search'}
                      </span>
                    }
                  />
                )
              }}
            />
          </Card>

          <Card>
            <Title level={4}>Member Roles & Permissions</Title>
            <Paragraph>
              Each role in the workspace has different permissions:
            </Paragraph>
            <div className="mb-4">
              <Tag color="red" className="mb-2 mr-2">ADMIN</Tag>
              <Text>Full access to all workspace settings and can manage members and roles.</Text>
            </div>
            <div className="mb-4">
              <Tag color="green" className="mb-2 mr-2">MANAGER</Tag>
              <Text>Can manage content and some settings, but cannot delete the workspace or manage admins.</Text>
            </div>
            <div className="mb-4">
              <Tag color="blue" className="mb-2 mr-2">USER</Tag>
              <Text>Can view and interact with content but cannot change workspace settings.</Text>
            </div>
            <div className="mb-4">
              <Tag color="orange" className="mb-2 mr-2">GUEST</Tag>
              <Text>Limited access to specific content only. Cannot modify workspace content.</Text>
            </div>
            
            <Divider />
            
            <Alert
              message="Default Role for New Members"
              description={
                <div>
                  <p>New members invited to this workspace will be assigned the <Tag>{workspaceConfig?.defaultRole || 'USER'}</Tag> role by default.</p>
                  <p>You can change this in the workspace settings.</p>
                </div>
              }
              type="info"
              showIcon
            />
          </Card>

          {/* Invite Member Modal */}
          <Modal
            title="Invite Member to Workspace"
            open={isInviteModalVisible}
            onCancel={handleInviteCancel}
            onOk={handleInvite}
            okText="Send Invitation"
          >
            <Form
              form={inviteForm}
              layout="vertical"
              name="invite_member_form"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter an email address' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input placeholder="colleague@example.com" />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                initialValue={workspaceConfig?.defaultRole || "USER"}
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="message"
                label="Personal Message (Optional)"
              >
                <Input.TextArea 
                  placeholder="Add a personal message to the invitation email" 
                  rows={3}
                />
              </Form.Item>
            </Form>
          </Modal>

          {/* Edit Role Modal */}
          <Modal
            title="Edit Member Role"
            open={isEditRoleModalVisible}
            onCancel={handleEditRoleCancel}
            onOk={handleEditRole}
            okText="Save Changes"
          >
            <Form
              form={editRoleForm}
              layout="vertical"
              name="edit_role_form"
            >
              <div className="mb-4">
                <Text strong>Member: </Text>
                <Text>{selectedMember?.name} ({selectedMember?.email})</Text>
              </div>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default WorkspaceMembersPage;import React, { useState, useEffect } from 'react';
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
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Empty, 
  Alert,
  Tabs,
  Divider,
  message
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  TeamOutlined, 
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import WorkspaceAccess from '../../auth/WorkspaceAccess';
import { WorkspaceMember } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceMembersPage: React.FC = () => {
  const { data: user } = useAuth();
  const { 
    currentWorkspace, 
    workspaceMembers, 
    workspaceConfig,
    addWorkspaceMember,
    removeWorkspaceMember,
    updateWorkspaceMemberRole,
    fetchWorkspaceMembers
  } = useWorkspaces();
  
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [isEditRoleModalVisible, setIsEditRoleModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(null);
  const [inviteForm] = Form.useForm();
  const [editRoleForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentWorkspace) {
      setIsLoading(true);
      fetchWorkspaceMembers(currentWorkspace.id)
        .finally(() => setIsLoading(false));
    }
  }, [currentWorkspace]);

  const showInviteModal = () => {
    inviteForm.resetFields();
    setIsInviteModalVisible(true);
  };

  const showEditRoleModal = (member: WorkspaceMember) => {
    setSelectedMember(member);
    editRoleForm.setFieldsValue({
      role: member.role
    });
    setIsEditRoleModalVisible(true);
  };

  const handleInviteCancel = () => {
    setIsInviteModalVisible(false);
  };

  const handleEditRoleCancel = () => {
    setIsEditRoleModalVisible(false);
    setSelectedMember(null);
  };

  const handleInvite = async () => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      const values = await inviteForm.validateFields();
      await addWorkspaceMember(currentWorkspace.id, values.email, values.role);
      setIsInviteModalVisible(false);
      inviteForm.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditRole = async () => {
    if (!currentWorkspace || !selectedMember) {
      message.error('No workspace or member selected');
      return;
    }
    
    try {
      const values = await editRoleForm.validateFields();
      await updateWorkspaceMemberRole(currentWorkspace.id, selectedMember.id, values.role);
      setIsEditRoleModalVisible(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      await removeWorkspaceMember(currentWorkspace.id, memberId);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const filteredMembers = workspaceMembers
    .filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchText.toLowerCase()) ||
        member.email.toLowerCase().includes(searchText.toLowerCase());
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'admin') return member.role === 'ADMIN' && matchesSearch;
      if (activeTab === 'manager') return member.role === 'MANAGER' && matchesSearch;
      if (activeTab === 'user') return member.role === 'USER' && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      // Sort by owner first, then by role importance, then by name
      if (a.isOwner && !b.isOwner) return -1;
      if (!a.isOwner && b.isOwner) return 1;
      
      const roleOrder = { 'ADMIN': 0, 'MANAGER': 1, 'USER': 2, 'GUEST': 3 };
      const roleA = roleOrder[a.role as keyof typeof roleOrder];
      const roleB = roleOrder[b.role as keyof typeof roleOrder];
      
      if (roleA !== roleB) return roleA - roleB;
      
      return a.name.localeCompare(b.name);
    });

  const columns = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: WorkspaceMember) => (
        <div className="flex items-center">
          <Avatar 
            icon={<UserOutlined />}
            src={record.avatarUrl}
            style={{ marginRight: '12px' }}
          />
          <div>
            <div className="font-medium flex items-center">
              {text}
              {record.isOwner && (
                <Tooltip title="Workspace Owner">
                  <CrownOutlined className="ml-2 text-yellow-500" />
                </Tooltip>
              )}
            </div>
            <Text type="secondary" className="text-xs">
              <MailOutlined className="mr-1" />
              {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color = 'default';
        if (role === 'ADMIN') color = 'red';
        if (role === 'MANAGER') color = 'green';
        if (role === 'USER') color = 'blue';
        if (role === 'GUEST') color = 'orange';
        
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Joined',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={date ? new Date(date).toLocaleString() : 'Never'}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {date ? new Date(date).toLocaleDateString() : 'Never'}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: WorkspaceMember) => {
        // Current user can't remove themselves or the owner
        const canRemove = user?.id !== record.userId && !record.isOwner;
        // Only admins can edit roles, and they can't edit the owner's role
        const canEditRole = !record.isOwner;
        
        return (
          <Space size="small">
            {canEditRole && (
              <Tooltip title="Edit Role">
                <Button 
                  icon={<EditOutlined />} 
                  size="small"
                  onClick={() => showEditRoleModal(record)}
                />
              </Tooltip>
            )}
            {canRemove && (
              <Popconfirm
                title="Remove this member?"
                description="This will remove the member from the workspace."
                onConfirm={() => handleRemoveMember(record.id)}
                okText="Remove"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
              >
                <Button 
                  icon={<DeleteOutlined />} 
                  size="small"
                  danger
                />
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <WorkspaceAccess>
        <div>
          <div className="mb-6">
            <Title level={2}>Workspace Members</Title>
            <Text type="secondary">
              Manage members and their roles in your workspace
            </Text>
          </div>

          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Input 
                  placeholder="Search members" 
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  style={{ width: 250 }}
                  className="mr-4"
                />
                <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                  <TabPane tab="All" key="all" />
                  <TabPane tab="Admins" key="admin" />
                  <TabPane tab="Managers" key="manager" />
                  <TabPane tab="Users" key="user" />
                </Tabs>
              </div>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={showInviteModal}
              >
                Invite Member
              </Button>
            </div>

            <Table 
              columns={columns} 
              dataSource={filteredMembers} 
              rowKey="id"
              loading={isLoading}
              locale={{
                emptyText: (
                  <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description={
                      <span>
                        No members found
                        {searchText && ' matching your search'}
                      </span>
                    }
                  />
                )
              }}
            />
          </Card>

          <Card>
            <Title level={4}>Member Roles & Permissions</Title>
            <Paragraph>
              Each role in the workspace has different permissions:
            </Paragraph>
            <div className="mb-4">
              <Tag color="red" className="mb-2 mr-2">ADMIN</Tag>
              <Text>Full access to all workspace settings and can manage members and roles.</Text>
            </div>
            <div className="mb-4">
              <Tag color="green" className="mb-2 mr-2">MANAGER</Tag>
              <Text>Can manage content and some settings, but cannot delete the workspace or manage admins.</Text>
            </div>
            <div className="mb-4">
              <Tag color="blue" className="mb-2 mr-2">USER</Tag>
              <Text>Can view and interact with content but cannot change workspace settings.</Text>
            </div>
            <div className="mb-4">
              <Tag color="orange" className="mb-2 mr-2">GUEST</Tag>
              <Text>Limited access to specific content only. Cannot modify workspace content.</Text>
            </div>
            
            <Divider />
            
            <Alert
              message="Default Role for New Members"
              description={
                <div>
                  <p>New members invited to this workspace will be assigned the <Tag>{workspaceConfig?.defaultRole || 'USER'}</Tag> role by default.</p>
                  <p>You can change this in the workspace settings.</p>
                </div>
              }
              type="info"
              showIcon
            />
          </Card>

          {/* Invite Member Modal */}
          <Modal
            title="Invite Member to Workspace"
            open={isInviteModalVisible}
            onCancel={handleInviteCancel}
            onOk={handleInvite}
            okText="Send Invitation"
          >
            <Form
              form={inviteForm}
              layout="vertical"
              name="invite_member_form"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter an email address' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input placeholder="colleague@example.com" />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                initialValue={workspaceConfig?.defaultRole || "USER"}
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="message"
                label="Personal Message (Optional)"
              >
                <Input.TextArea 
                  placeholder="Add a personal message to the invitation email" 
                  rows={3}
                />
              </Form.Item>
            </Form>
          </Modal>

          {/* Edit Role Modal */}
          <Modal
            title="Edit Member Role"
            open={isEditRoleModalVisible}
            onCancel={handleEditRoleCancel}
            onOk={handleEditRole}
            okText="Save Changes"
          >
            <Form
              form={editRoleForm}
              layout="vertical"
              name="edit_role_form"
            >
              <div className="mb-4">
                <Text strong>Member: </Text>
                <Text>{selectedMember?.name} ({selectedMember?.email})</Text>
              </div>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default WorkspaceMembersPage;import React, { useState, useEffect } from 'react';
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
  Tooltip, 
  Popconfirm, 
  Avatar, 
  Empty, 
  Alert,
  Tabs,
  Divider,
  message
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined, 
  TeamOutlined, 
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useWorkspaces } from '../../workspace/operations';
import { useAuth } from 'wasp/client/auth';
import RoleBasedAccess from '../../auth/RoleBasedAccess';
import WorkspaceAccess from '../../auth/WorkspaceAccess';
import { WorkspaceMember } from '../../workspace/types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const WorkspaceMembersPage: React.FC = () => {
  const { data: user } = useAuth();
  const { 
    currentWorkspace, 
    workspaceMembers, 
    workspaceConfig,
    addWorkspaceMember,
    removeWorkspaceMember,
    updateWorkspaceMemberRole,
    fetchWorkspaceMembers
  } = useWorkspaces();
  
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [isEditRoleModalVisible, setIsEditRoleModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(null);
  const [inviteForm] = Form.useForm();
  const [editRoleForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentWorkspace) {
      setIsLoading(true);
      fetchWorkspaceMembers(currentWorkspace.id)
        .finally(() => setIsLoading(false));
    }
  }, [currentWorkspace]);

  const showInviteModal = () => {
    inviteForm.resetFields();
    setIsInviteModalVisible(true);
  };

  const showEditRoleModal = (member: WorkspaceMember) => {
    setSelectedMember(member);
    editRoleForm.setFieldsValue({
      role: member.role
    });
    setIsEditRoleModalVisible(true);
  };

  const handleInviteCancel = () => {
    setIsInviteModalVisible(false);
  };

  const handleEditRoleCancel = () => {
    setIsEditRoleModalVisible(false);
    setSelectedMember(null);
  };

  const handleInvite = async () => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      const values = await inviteForm.validateFields();
      await addWorkspaceMember(currentWorkspace.id, values.email, values.role);
      setIsInviteModalVisible(false);
      inviteForm.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditRole = async () => {
    if (!currentWorkspace || !selectedMember) {
      message.error('No workspace or member selected');
      return;
    }
    
    try {
      const values = await editRoleForm.validateFields();
      await updateWorkspaceMemberRole(currentWorkspace.id, selectedMember.id, values.role);
      setIsEditRoleModalVisible(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!currentWorkspace) {
      message.error('No workspace selected');
      return;
    }

    try {
      await removeWorkspaceMember(currentWorkspace.id, memberId);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const filteredMembers = workspaceMembers
    .filter(member => {
      const matchesSearch = 
        member.name.toLowerCase().includes(searchText.toLowerCase()) ||
        member.email.toLowerCase().includes(searchText.toLowerCase());
      
      if (activeTab === 'all') return matchesSearch;
      if (activeTab === 'admin') return member.role === 'ADMIN' && matchesSearch;
      if (activeTab === 'manager') return member.role === 'MANAGER' && matchesSearch;
      if (activeTab === 'user') return member.role === 'USER' && matchesSearch;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      // Sort by owner first, then by role importance, then by name
      if (a.isOwner && !b.isOwner) return -1;
      if (!a.isOwner && b.isOwner) return 1;
      
      const roleOrder = { 'ADMIN': 0, 'MANAGER': 1, 'USER': 2, 'GUEST': 3 };
      const roleA = roleOrder[a.role as keyof typeof roleOrder];
      const roleB = roleOrder[b.role as keyof typeof roleOrder];
      
      if (roleA !== roleB) return roleA - roleB;
      
      return a.name.localeCompare(b.name);
    });

  const columns = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: WorkspaceMember) => (
        <div className="flex items-center">
          <Avatar 
            icon={<UserOutlined />}
            src={record.avatarUrl}
            style={{ marginRight: '12px' }}
          />
          <div>
            <div className="font-medium flex items-center">
              {text}
              {record.isOwner && (
                <Tooltip title="Workspace Owner">
                  <CrownOutlined className="ml-2 text-yellow-500" />
                </Tooltip>
              )}
            </div>
            <Text type="secondary" className="text-xs">
              <MailOutlined className="mr-1" />
              {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color = 'default';
        if (role === 'ADMIN') color = 'red';
        if (role === 'MANAGER') color = 'green';
        if (role === 'USER') color = 'blue';
        if (role === 'GUEST') color = 'orange';
        
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Joined',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          <span>
            {new Date(date).toLocaleDateString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => (
        <Tooltip title={date ? new Date(date).toLocaleString() : 'Never'}>
          <span>
            <ClockCircleOutlined className="mr-1" />
            {date ? new Date(date).toLocaleDateString() : 'Never'}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: WorkspaceMember) => {
        // Current user can't remove themselves or the owner
        const canRemove = user?.id !== record.userId && !record.isOwner;
        // Only admins can edit roles, and they can't edit the owner's role
        const canEditRole = !record.isOwner;
        
        return (
          <Space size="small">
            {canEditRole && (
              <Tooltip title="Edit Role">
                <Button 
                  icon={<EditOutlined />} 
                  size="small"
                  onClick={() => showEditRoleModal(record)}
                />
              </Tooltip>
            )}
            {canRemove && (
              <Popconfirm
                title="Remove this member?"
                description="This will remove the member from the workspace."
                onConfirm={() => handleRemoveMember(record.id)}
                okText="Remove"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
              >
                <Button 
                  icon={<DeleteOutlined />} 
                  size="small"
                  danger
                />
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      <WorkspaceAccess>
        <div>
          <div className="mb-6">
            <Title level={2}>Workspace Members</Title>
            <Text type="secondary">
              Manage members and their roles in your workspace
            </Text>
          </div>

          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Input 
                  placeholder="Search members" 
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  style={{ width: 250 }}
                  className="mr-4"
                />
                <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-0">
                  <TabPane tab="All" key="all" />
                  <TabPane tab="Admins" key="admin" />
                  <TabPane tab="Managers" key="manager" />
                  <TabPane tab="Users" key="user" />
                </Tabs>
              </div>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={showInviteModal}
              >
                Invite Member
              </Button>
            </div>

            <Table 
              columns={columns} 
              dataSource={filteredMembers} 
              rowKey="id"
              loading={isLoading}
              locale={{
                emptyText: (
                  <Empty 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description={
                      <span>
                        No members found
                        {searchText && ' matching your search'}
                      </span>
                    }
                  />
                )
              }}
            />
          </Card>

          <Card>
            <Title level={4}>Member Roles & Permissions</Title>
            <Paragraph>
              Each role in the workspace has different permissions:
            </Paragraph>
            <div className="mb-4">
              <Tag color="red" className="mb-2 mr-2">ADMIN</Tag>
              <Text>Full access to all workspace settings and can manage members and roles.</Text>
            </div>
            <div className="mb-4">
              <Tag color="green" className="mb-2 mr-2">MANAGER</Tag>
              <Text>Can manage content and some settings, but cannot delete the workspace or manage admins.</Text>
            </div>
            <div className="mb-4">
              <Tag color="blue" className="mb-2 mr-2">USER</Tag>
              <Text>Can view and interact with content but cannot change workspace settings.</Text>
            </div>
            <div className="mb-4">
              <Tag color="orange" className="mb-2 mr-2">GUEST</Tag>
              <Text>Limited access to specific content only. Cannot modify workspace content.</Text>
            </div>
            
            <Divider />
            
            <Alert
              message="Default Role for New Members"
              description={
                <div>
                  <p>New members invited to this workspace will be assigned the <Tag>{workspaceConfig?.defaultRole || 'USER'}</Tag> role by default.</p>
                  <p>You can change this in the workspace settings.</p>
                </div>
              }
              type="info"
              showIcon
            />
          </Card>

          {/* Invite Member Modal */}
          <Modal
            title="Invite Member to Workspace"
            open={isInviteModalVisible}
            onCancel={handleInviteCancel}
            onOk={handleInvite}
            okText="Send Invitation"
          >
            <Form
              form={inviteForm}
              layout="vertical"
              name="invite_member_form"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter an email address' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input placeholder="colleague@example.com" />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                initialValue={workspaceConfig?.defaultRole || "USER"}
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="message"
                label="Personal Message (Optional)"
              >
                <Input.TextArea 
                  placeholder="Add a personal message to the invitation email" 
                  rows={3}
                />
              </Form.Item>
            </Form>
          </Modal>

          {/* Edit Role Modal */}
          <Modal
            title="Edit Member Role"
            open={isEditRoleModalVisible}
            onCancel={handleEditRoleCancel}
            onOk={handleEditRole}
            okText="Save Changes"
          >
            <Form
              form={editRoleForm}
              layout="vertical"
              name="edit_role_form"
            >
              <div className="mb-4">
                <Text strong>Member: </Text>
                <Text>{selectedMember?.name} ({selectedMember?.email})</Text>
              </div>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="MANAGER">Manager</Option>
                  <Option value="USER">User</Option>
                  <Option value="GUEST">Guest</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default WorkspaceMembersPage;