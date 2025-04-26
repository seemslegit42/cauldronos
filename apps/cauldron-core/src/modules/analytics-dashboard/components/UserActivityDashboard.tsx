import React, { useState } from 'react';
import { Row, Col, Card, Table, Tag, Button, Space, Select, DatePicker, Input } from 'antd';
import { motion } from 'framer-motion';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useAnalyticsStore } from '../store/analyticsStore';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Mock user activity data
const generateMockUserData = () => {
  const users = [];
  const actions = ['Login', 'View Page', 'Edit Document', 'Create Project', 'Share Content', 'Download File'];
  const pages = ['Dashboard', 'Projects', 'Documents', 'Settings', 'Profile', 'Analytics'];
  
  for (let i = 1; i <= 100; i++) {
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomPage = pages[Math.floor(Math.random() * pages.length)];
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 7));
    
    users.push({
      key: i.toString(),
      userId: `user_${i}`,
      username: `User ${i}`,
      action: randomAction,
      page: randomPage,
      timestamp: randomDate.toISOString(),
      duration: Math.floor(Math.random() * 300) + 10, // 10-310 seconds
      device: Math.random() > 0.7 ? 'Mobile' : 'Desktop',
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
    });
  }
  
  return users;
};

// Generate activity by hour data
const generateActivityByHourData = () => {
  const data = [];
  for (let hour = 0; hour < 24; hour++) {
    data.push({
      hour: `${hour}:00`,
      activeUsers: Math.floor(Math.random() * 50) + 10,
      sessions: Math.floor(Math.random() * 80) + 20,
    });
  }
  return data;
};

// Generate activity by page data
const generateActivityByPageData = () => {
  const pages = ['Dashboard', 'Projects', 'Documents', 'Settings', 'Profile', 'Analytics'];
  return pages.map(page => ({
    page,
    views: Math.floor(Math.random() * 1000) + 100,
    avgTimeSpent: Math.floor(Math.random() * 300) + 30,
    bounceRate: Math.floor(Math.random() * 30) + 10,
  }));
};

const UserActivityDashboard = ({ data }: any) => {
  const { dateRange, setDateRange } = useAnalyticsStore();
  const [searchText, setSearchText] = useState('');
  const [filteredInfo, setFilteredInfo] = useState<any>({});
  const [sortedInfo, setSortedInfo] = useState<any>({});
  
  // Mock data
  const userActivityData = generateMockUserData();
  const activityByHourData = generateActivityByHourData();
  const activityByPageData = generateActivityByPageData();
  
  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setDateRange([dates[0].toDate(), dates[1].toDate()]);
    }
  };
  
  const handleSearch = (value: string) => {
    setSearchText(value);
  };
  
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  
  const handleReset = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setSearchText('');
  };
  
  // Filter data based on search text
  const filteredData = userActivityData.filter((item: any) => 
    item.username.toLowerCase().includes(searchText.toLowerCase()) ||
    item.action.toLowerCase().includes(searchText.toLowerCase()) ||
    item.page.toLowerCase().includes(searchText.toLowerCase())
  );
  
  // Table columns
  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
      sorter: (a: any, b: any) => a.username.localeCompare(b.username),
      sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      filters: [
        ...new Set(userActivityData.map((item: any) => item.action))
      ].map(action => ({ text: action, value: action })),
      filteredValue: filteredInfo.action || null,
      onFilter: (value: any, record: any) => record.action === value,
    },
    {
      title: 'Page',
      dataIndex: 'page',
      key: 'page',
      filters: [
        ...new Set(userActivityData.map((item: any) => item.page))
      ].map(page => ({ text: page, value: page })),
      filteredValue: filteredInfo.page || null,
      onFilter: (value: any, record: any) => record.page === value,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => new Date(text).toLocaleString(),
      sorter: (a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      sortOrder: sortedInfo.columnKey === 'timestamp' && sortedInfo.order,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} sec`,
      sorter: (a: any, b: any) => a.duration - b.duration,
      sortOrder: sortedInfo.columnKey === 'duration' && sortedInfo.order,
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      render: (device: string) => (
        <Tag color={device === 'Mobile' ? '#3DAA9D' : '#4A0D67'}>
          {device}
        </Tag>
      ),
      filters: [
        { text: 'Mobile', value: 'Mobile' },
        { text: 'Desktop', value: 'Desktop' },
      ],
      filteredValue: filteredInfo.device || null,
      onFilter: (value: any, record: any) => record.device === value,
    },
  ];
  
  return (
    <div className="user-activity-dashboard">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col>
            <h2>User Activity</h2>
          </Col>
          <Col>
            <Space>
              <RangePicker 
                value={[
                  dateRange[0] ? dateRange[0] : null, 
                  dateRange[1] ? dateRange[1] : null
                ]} 
                onChange={handleDateRangeChange} 
              />
              <Select defaultValue="all" style={{ width: 120 }}>
                <Option value="all">All Users</Option>
                <Option value="active">Active Users</Option>
                <Option value="new">New Users</Option>
              </Select>
            </Space>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <motion.div variants={cardVariants}>
              <Card title="Activity by Hour">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={activityByHourData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                      <XAxis dataKey="hour" stroke="#9E9E9E" />
                      <YAxis stroke="#9E9E9E" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E1E1E', 
                          borderColor: '#2D2D2D',
                          color: '#E0E0E0'
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="activeUsers" 
                        name="Active Users" 
                        stroke="#3DAA9D" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sessions" 
                        name="Sessions" 
                        stroke="#4A0D67" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div variants={cardVariants}>
              <Card title="Activity by Page">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={activityByPageData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                      <XAxis type="number" stroke="#9E9E9E" />
                      <YAxis dataKey="page" type="category" stroke="#9E9E9E" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E1E1E', 
                          borderColor: '#2D2D2D',
                          color: '#E0E0E0'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="views" name="Page Views" fill="#3DAA9D" />
                      <Bar dataKey="avgTimeSpent" name="Avg. Time (sec)" fill="#B8860B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <motion.div variants={cardVariants}>
              <Card title="User Activity Log">
                <Space style={{ marginBottom: 16 }}>
                  <Input
                    placeholder="Search users, actions, or pages"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => handleSearch(e.target.value)}
                    style={{ width: 300 }}
                  />
                  <Button 
                    icon={<FilterOutlined />} 
                    onClick={handleReset}
                  >
                    Reset Filters
                  </Button>
                </Space>
                <Table 
                  columns={columns} 
                  dataSource={filteredData} 
                  onChange={handleChange}
                  pagination={{ pageSize: 10 }}
                  scroll={{ x: 'max-content' }}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default UserActivityDashboard;