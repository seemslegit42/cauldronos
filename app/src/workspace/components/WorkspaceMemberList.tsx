import React, { useState } from 'react';
import { Table, Button, Space, Tag, Avatar, Typography, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { UserAddOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { WorkspaceMember } from '../types';
import { useWorkspaceMembers } from '../operations';
import { cx, fromNow, getColorFromString, getInitials } from '../../utils/styleUtils';

const { Title, Text } = Typography;
const { Option } = Select;

interface WorkspaceMemberListProps {
  workspaceId: string;
  currentUserId?: string;
}

const WorkspaceMemberList: React.FC<WorkspaceMemberListProps> = ({
  workspaceId,
  currentUserId
}) => {
  const { 
    members, 
    isLoading, 
    inviteMember, 
    removeMember, 
    updateMemberRole,
    isInviting,
    isRemoving,
    isUpdatingRole
  } = useWorkspaceMembers(workspaceId);
  
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(null);
  const [inviteForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const handleInvite = async (values: { email: string; role: string }) => {
    try {
      await inviteMember(values.email, values.role);
      setIsInviteModalOpen(false);
      inviteForm.resetFields();
    } catch (error) {
      console.error('Error inviting member:', error);
    }
  };

  const handleRemove = async (memberId: string) => {
    try {
      await removeMember(memberId);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const handleEditRole = async (values: { role: string }) => {
    if (!selectedMember) return;
    
    try {
      await updateMemberRole(selectedMember.id, values.role);
      setIsEditModalOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error updating member role:', error);
    }
  };

  const openEditModal = (member: WorkspaceMember) => {
    setSelectedMember(member);
    editForm.setFieldsValue({ role: member.role });
    setIsEditModalOpen(true);
  };

  const columns = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: WorkspaceMember) => (
        <Space>
          {record.avatarUrl ? (
            <Avatar src={record.avatarUrl} />
          ) : (
            <Avatar style={{ backgroundColor: getColorFromString(name) }}>
              {getInitials(name)}
            </Avatar>
          )}
          <div>
            <Text strong>{name}</Text>
            <div>
              <Text type="secondary">{record.email}</Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, record: WorkspaceMember) => {
        let color = 'blue';
        if (role === 'ADMIN') color = 'red';
        if (role === 'MANAGER') color = 'green';
        
        return (
          <Space>
            <Tag color={color}>{role}</Tag>
            {record.isOwner && <Tag color="gold">OWNER</Tag>}
          </Space>
        );
      },
    },
    {
      title: 'Joined',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (date: string) => fromNow(date),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => date ? fromNow(date) : 'Never',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: WorkspaceMember) => {
        const isCurrentUser = record.userId === currentUserId;
        const isOwner = record.isOwner;
        
        return (
          <Space>
            {!isOwner && (
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => openEditModal(record)}
                disabled={isUpdatingRole}
              >
                Edit Role
              </Button>
            )}
            {!isCurrentUser && !isOwner && (
              <Popconfirm
                title="Remove member"
                description="Are you sure you want to remove this member from the workspace?"
                onConfirm={() => handleRemove(record.id)}
                okText="Yes"
                cancelText="No"
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
                  loading={isRemoving}
                >
                  Remove
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Workspace Members</Title>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setIsInviteModalOpen(true)}
        >
          Invite Member
        </Button>
      </div>
      
      <Table
        dataSource={members}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={false}
      />
      
      {/* Invite Member Modal */}
      <Modal
        title="Invite Member"
        open={isInviteModalOpen}
        onCancel={() => setIsInviteModalOpen(false)}
        footer={null}
      >
        <Form
          form={inviteForm}
          layout="vertical"
          onFinish={handleInvite}
          initialValues={{ role: 'USER' }}
        >
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter an email address' },
              { type: 'email', message: 'Please enter a valid email address' }
            ]}
          >
            <Input placeholder="user@example.com" />
          </Form.Item>
          
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Option value="USER">User</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="ADMIN">Admin</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={isInviting}>
                Send Invitation
              </Button>
              <Button onClick={() => setIsInviteModalOpen(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Edit Member Role Modal */}
      <Modal
        title="Edit Member Role"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
        }}
        footer={null}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditRole}
        >
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Option value="USER">User</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="ADMIN">Admin</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={isUpdatingRole}>
                Update Role
              </Button>
              <Button onClick={() => {
                setIsEditModalOpen(false);
                setSelectedMember(null);
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WorkspaceMemberList;
