import React, { useState, useEffect } from 'react';
import { List, Typography, Avatar, Tag, Button, Space, Select, Tooltip, Drawer, Badge, Empty } from 'antd';
import { 
  ClockCircleOutlined, 
  UserOutlined, 
  BellOutlined, 
  FilterOutlined,
  FileAddOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { useWorkspaces } from './operations';

const { Text, Title } = Typography;
const { Option } = Select;

// Activity types and their corresponding icons
const activityIcons = {
  login: <LoginOutlined style={{ color: '#1890ff' }} />,
  create: <FileAddOutlined style={{ color: '#52c41a' }} />,
  update: <EditOutlined style={{ color: '#faad14' }} />,
  delete: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
  invite: <TeamOutlined style={{ color: '#722ed1' }} />,
  module: <AppstoreOutlined style={{ color: '#13c2c2' }} />,
  settings: <SettingOutlined style={{ color: '#fa8c16' }} />
};

// Mock data for activity feed
const mockActivities = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userAvatar: null,
    action: 'created',
    resourceType: 'document',
    resourceName: 'Q2 Marketing Plan',
    resourceId: 'doc_123',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    activityType: 'create'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    userAvatar: null,
    action: 'updated',
    resourceType: 'module',
    resourceName: 'CRM Module',
    resourceId: 'mod_456',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    activityType: 'update'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Bob Johnson',
    userAvatar: null,
    action: 'invited',
    resourceType: 'user',
    resourceName: 'Alice Williams',
    resourceId: 'user_789',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    activityType: 'invite'
  },
  {
    id: '4',
    userId: '4',
    userName: 'Alice Williams',
    userAvatar: null,
    action: 'deleted',
    resourceType: 'task',
    resourceName: 'Review design mockups',
    resourceId: 'task_101',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    activityType: 'delete'
  },
  {
    id: '5',
    userId: '5',
    userName: 'Charlie Brown',
    userAvatar: null,
    action: 'installed',
    resourceType: 'module',
    resourceName: 'Analytics Module',
    resourceId: 'mod_202',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    activityType: 'module'
  },
  {
    id: '6',
    userId: '1',
    userName: 'John Doe',
    userAvatar: null,
    action: 'updated',
    resourceType: 'settings',
    resourceName: 'Workspace Settings',
    resourceId: 'settings_303',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    activityType: 'settings'
  },
  {
    id: '7',
    userId: '2',
    userName: 'Jane Smith',
    userAvatar: null,
    action: 'logged in',
    resourceType: 'system',
    resourceName: '',
    resourceId: '',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    activityType: 'login'
  }
];

// Format relative time
const formatRelativeTime = (timestamp: string) => {
  const now = new Date();
  const activityTime = new Date(timestamp);
  const diffMs = now.getTime() - activityTime.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else {
    return activityTime.toLocaleDateString();
  }
};

interface ActivityFeedProps {
  maxItems?: number;
  showFilters?: boolean;
  showHeader?: boolean;
  className?: string;
  drawerMode?: boolean;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  maxItems = 5, 
  showFilters = false, 
  showHeader = true,
  className = '',
  drawerMode = false
}) => {
  const { currentWorkspace } = useWorkspaces();
  const [activities, setActivities] = useState(mockActivities);
  const [filteredActivities, setFilteredActivities] = useState(mockActivities);
  const [activityTypeFilter, setActivityTypeFilter] = useState<string[]>([]);
  const [userFilter, setUserFilter] = useState<string[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  
  // In a real app, this would fetch activities from an API
  useEffect(() => {
    // Filter activities based on selected filters
    let filtered = [...activities];
    
    if (activityTypeFilter.length > 0) {
      filtered = filtered.filter(activity => activityTypeFilter.includes(activity.activityType));
    }
    
    if (userFilter.length > 0) {
      filtered = filtered.filter(activity => userFilter.includes(activity.userId));
    }
    
    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setFilteredActivities(filtered);
  }, [activities, activityTypeFilter, userFilter]);
  
  // Get unique users for the filter
  const uniqueUsers = Array.from(new Set(activities.map(activity => activity.userId)))
    .map(userId => {
      const activity = activities.find(a => a.userId === userId);
      return {
        id: userId,
        name: activity?.userName || ''
      };
    });
  
  // Activity types for the filter
  const activityTypes = [
    { value: 'login', label: 'Login' },
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'delete', label: 'Delete' },
    { value: 'invite', label: 'Invite' },
    { value: 'module', label: 'Module' },
    { value: 'settings', label: 'Settings' }
  ];
  
  const handleActivityTypeChange = (values: string[]) => {
    setActivityTypeFilter(values);
  };
  
  const handleUserChange = (values: string[]) => {
    setUserFilter(values);
  };
  
  const showDrawer = () => {
    setDrawerVisible(true);
  };
  
  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  
  const renderActivityItem = (activity: typeof mockActivities[0]) => (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar icon={<UserOutlined />} src={activity.userAvatar} />
        }
        title={
          <div className="flex items-center justify-between">
            <span>
              <Text strong>{activity.userName}</Text>
              <Text> {activity.action} </Text>
              <Text strong>{activity.resourceName}</Text>
            </span>
            <Tooltip title={new Date(activity.timestamp).toLocaleString()}>
              <Text type="secondary">{formatRelativeTime(activity.timestamp)}</Text>
            </Tooltip>
          </div>
        }
        description={
          <div className="flex items-center mt-1">
            <Tag color="blue">{activity.resourceType}</Tag>
            {activityIcons[activity.activityType as keyof typeof activityIcons]}
          </div>
        }
      />
    </List.Item>
  );
  
  const activityFeedContent = (
    <>
      {showHeader && (
        <div className="flex justify-between items-center mb-4">
          <Title level={5} className="m-0">Recent Activity</Title>
          {!drawerMode && (
            <Button type="link" onClick={showDrawer} icon={<BellOutlined />}>
              View All
            </Button>
          )}
        </div>
      )}
      
      {showFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          <Select
            mode="multiple"
            placeholder="Filter by activity type"
            style={{ minWidth: 200, marginRight: 8, flex: 1 }}
            onChange={handleActivityTypeChange}
            value={activityTypeFilter}
            maxTagCount={2}
          >
            {activityTypes.map(type => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
          
          <Select
            mode="multiple"
            placeholder="Filter by user"
            style={{ minWidth: 200, flex: 1 }}
            onChange={handleUserChange}
            value={userFilter}
            maxTagCount={2}
          >
            {uniqueUsers.map(user => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
      
      {filteredActivities.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={drawerMode ? filteredActivities : filteredActivities.slice(0, maxItems)}
          renderItem={renderActivityItem}
        />
      ) : (
        <Empty description="No activities found" />
      )}
      
      {!drawerMode && filteredActivities.length > maxItems && (
        <div className="text-center mt-2">
          <Button type="link" onClick={showDrawer}>
            View all {filteredActivities.length} activities
          </Button>
        </div>
      )}
    </>
  );
  
  // Drawer for full activity feed
  const activityDrawer = (
    <Drawer
      title={`Activity Feed - ${currentWorkspace?.name || 'Workspace'}`}
      placement="right"
      onClose={closeDrawer}
      open={drawerVisible}
      width={400}
      extra={
        <Space>
          <Button icon={<FilterOutlined />} onClick={() => {}}>
            Filters
          </Button>
        </Space>
      }
    >
      <ActivityFeed 
        showFilters={true} 
        showHeader={false} 
        drawerMode={true} 
      />
    </Drawer>
  );
  
  return (
    <div className={className}>
      {activityFeedContent}
      {!drawerMode && activityDrawer}
    </div>
  );
};

export default ActivityFeed;
