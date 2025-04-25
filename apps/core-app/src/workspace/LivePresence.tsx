import React, { useState, useEffect } from 'react';
import { Badge, Tooltip, Avatar, Popover, List, Typography, Button, Space, Tag, Divider } from 'antd';
import { UserOutlined, ClockCircleOutlined, TeamOutlined, EyeOutlined, HistoryOutlined } from '@ant-design/icons';
import { useWorkspaces } from './operations';
import { useAuth } from 'wasp/client/auth';

const { Text } = Typography;

// Mock data for online users
const mockOnlineUsers = [
  {
    id: '1',
    name: 'John Doe',
    avatarUrl: null,
    status: 'active',
    role: 'Admin',
    currentPage: '/dashboard',
    lastActive: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatarUrl: null,
    status: 'active',
    role: 'Manager',
    currentPage: '/users',
    lastActive: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Bob Johnson',
    avatarUrl: null,
    status: 'idle',
    role: 'User',
    currentPage: '/modules',
    lastActive: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    name: 'Alice Williams',
    avatarUrl: null,
    status: 'active',
    role: 'User',
    currentPage: '/dashboard',
    lastActive: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Charlie Brown',
    avatarUrl: null,
    status: 'active',
    role: 'Manager',
    currentPage: '/workspace-settings',
    lastActive: new Date().toISOString()
  }
];

// Mock data for recent activity
const mockRecentActivity = [
  {
    id: '1',
    userId: '2',
    userName: 'Jane Smith',
    action: 'updated',
    target: 'user settings',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    userId: '1',
    userName: 'John Doe',
    action: 'created',
    target: 'new module',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    userId: '5',
    userName: 'Charlie Brown',
    action: 'modified',
    target: 'workspace settings',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

interface LivePresenceProps {
  className?: string;
}

const LivePresence: React.FC<LivePresenceProps> = ({ className }) => {
  const { currentWorkspace } = useWorkspaces();
  const { data: user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState(mockOnlineUsers);
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity);
  const [activeTab, setActiveTab] = useState<'users' | 'activity'>('users');

  // In a real app, this would use WebSockets to get real-time updates
  useEffect(() => {
    // Simulate users coming online/going offline
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockOnlineUsers.length);
      const updatedUsers = [...onlineUsers];
      updatedUsers[randomIndex] = {
        ...updatedUsers[randomIndex],
        status: updatedUsers[randomIndex].status === 'active' ? 'idle' : 'active',
        lastActive: new Date().toISOString()
      };
      setOnlineUsers(updatedUsers);
    }, 30000);

    return () => clearInterval(interval);
  }, [onlineUsers]);

  // Simulate new activity
  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ['updated', 'created', 'modified', 'deleted', 'viewed'];
      const targets = ['user settings', 'module', 'workspace settings', 'document', 'dashboard'];

      const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomTarget = targets[Math.floor(Math.random() * targets.length)];

      const newActivity = {
        id: Date.now().toString(),
        userId: randomUser.id,
        userName: randomUser.name,
        action: randomAction,
        target: randomTarget,
        timestamp: new Date().toISOString()
      };

      setRecentActivity(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only 10 most recent
    }, 60000); // Add new activity every minute

    return () => clearInterval(interval);
  }, [onlineUsers]);

  const activeUsers = onlineUsers.filter(user => user.status === 'active');

  // Format relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleDateString();
  };

  // Get page name from path
  const getPageName = (path: string) => {
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/users') return 'User Management';
    if (path === '/modules') return 'Modules';
    if (path === '/workspace-settings') return 'Workspace Settings';
    if (path === '/account') return 'Account Settings';

    return path.split('/').pop()?.replace('-', ' ') || path;
  };

  // Get role color
  const getRoleColor = (role: string) => {
    if (role === 'Admin') return 'red';
    if (role === 'Manager') return 'blue';
    return 'default';
  };

  // Render users tab
  const renderUsersTab = () => (
    <List
      itemLayout="horizontal"
      dataSource={onlineUsers}
      renderItem={user => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Badge
                status={user.status === 'active' ? 'success' : 'warning'}
                offset={[0, 28]}
              >
                <Avatar icon={<UserOutlined />} src={user.avatarUrl} />
              </Badge>
            }
            title={
              <div className="flex items-center justify-between">
                <span>{user.name}</span>
                <Tag color={getRoleColor(user.role)}>{user.role}</Tag>
              </div>
            }
            description={
              <Space direction="vertical" size={0}>
                <Text type="secondary">
                  <ClockCircleOutlined className="mr-1" />
                  {user.status === 'active'
                    ? 'Currently active'
                    : `Last active ${formatRelativeTime(user.lastActive)}`
                  }
                </Text>
                <Text type="secondary">
                  <EyeOutlined className="mr-1" />
                  Viewing: {getPageName(user.currentPage)}
                </Text>
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );

  // Render activity tab
  const renderActivityTab = () => (
    <List
      itemLayout="horizontal"
      dataSource={recentActivity}
      renderItem={activity => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar icon={<UserOutlined />} />
            }
            title={
              <div className="flex items-center justify-between">
                <span>{activity.userName}</span>
                <Text type="secondary" className="text-xs">
                  {formatRelativeTime(activity.timestamp)}
                </Text>
              </div>
            }
            description={
              <Text>
                {activity.action} {activity.target}
              </Text>
            }
          />
        </List.Item>
      )}
    />
  );

  const content = (
    <div style={{ width: 350 }}>
      <div className="flex items-center justify-between mb-2">
        <Space>
          <Button
            type={activeTab === 'users' ? 'primary' : 'text'}
            size="small"
            icon={<TeamOutlined />}
            onClick={() => setActiveTab('users')}
          >
            Users ({activeUsers.length} online)
          </Button>
          <Button
            type={activeTab === 'activity' ? 'primary' : 'text'}
            size="small"
            icon={<HistoryOutlined />}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </Button>
        </Space>
      </div>

      <Divider className="my-2" />

      {activeTab === 'users' ? renderUsersTab() : renderActivityTab()}

      <div className="mt-2 text-right">
        <Button type="link" size="small" href="/users">
          {activeTab === 'users' ? 'View All Members' : 'View All Activity'}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      title={
        <div className="flex items-center">
          <TeamOutlined className="mr-2" />
          <span>{currentWorkspace?.name || 'Workspace'}</span>
        </div>
      }
      trigger="click"
      placement="bottomRight"
    >
      <div className={`cursor-pointer flex items-center ${className}`}>
        <Badge count={activeUsers.length} size="small">
          <Tooltip title={`${activeUsers.length} users online`}>
            <div className="text-sm flex items-center">
              <TeamOutlined className="mr-1" />
              <span>{activeUsers.length} online</span>
            </div>
          </Tooltip>
        </Badge>
      </div>
    </Popover>
  );
};

export default LivePresence;
