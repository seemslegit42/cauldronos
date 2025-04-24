import React from 'react';
import { Card, Typography, Tabs, Table, Tag, Space, Divider, Button, Input } from 'antd';
import { CodeOutlined, CopyOutlined, ApiOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const AnalyticsApi: React.FC<ModuleComponentProps> = ({ module }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // API endpoints data
  const endpoints = [
    {
      key: '1',
      method: 'GET',
      path: '/api/modules/analytics/dashboard',
      description: 'Get dashboard analytics data',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '2',
      method: 'GET',
      path: '/api/modules/analytics/users',
      description: 'Get user analytics data',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '3',
      method: 'GET',
      path: '/api/modules/analytics/pageviews',
      description: 'Get page view analytics',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '4',
      method: 'GET',
      path: '/api/modules/analytics/events',
      description: 'Get event analytics',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '5',
      method: 'POST',
      path: '/api/modules/analytics/events',
      description: 'Track a custom event',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '6',
      method: 'GET',
      path: '/api/modules/analytics/reports',
      description: 'Get saved reports',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '7',
      method: 'POST',
      path: '/api/modules/analytics/reports',
      description: 'Create a new report',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '8',
      method: 'GET',
      path: '/api/modules/analytics/export',
      description: 'Export analytics data',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    }
  ];

  const columns = [
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => {
        let color = '';
        switch (method) {
          case 'GET':
            color = 'blue';
            break;
          case 'POST':
            color = 'green';
            break;
          case 'PUT':
            color = 'orange';
            break;
          case 'DELETE':
            color = 'red';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{method}</Tag>;
      },
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      render: (path: string) => (
        <Space>
          <Text code>{path}</Text>
          <Button 
            type="text" 
            icon={<CopyOutlined />} 
            onClick={() => copyToClipboard(path)}
            size="small"
          />
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Auth',
      dataIndex: 'auth',
      key: 'auth',
      render: (auth: boolean) => (
        auth ? <Tag color="green">Required</Tag> : <Tag color="orange">Optional</Tag>
      ),
    },
    {
      title: 'Roles',
      key: 'roles',
      dataIndex: 'roles',
      render: (roles: string[]) => (
        <>
          {roles.map(role => {
            let color = role === 'ADMIN' ? 'red' : role === 'MANAGER' ? 'blue' : 'green';
            return (
              <Tag color={color} key={role}>
                {role}
              </Tag>
            );
          })}
        </>
      ),
    }
  ];

  // Example request and response
  const dashboardExample = {
    request: `// Example: Get dashboard analytics data
fetch('/api/modules/analytics/dashboard?period=last30days', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    response: `// Success response
{
  "totalUsers": 1254,
  "activeUsers": 876,
  "newUsers": 124,
  "totalPageviews": 45678,
  "averageSessionDuration": 325,
  "bounceRate": 32.5,
  "topPages": [
    { "path": "/dashboard", "views": 12345 },
    { "path": "/modules", "views": 8765 },
    { "path": "/users", "views": 4321 }
  ],
  "userGrowth": [
    { "date": "2023-04-01", "users": 1100 },
    { "date": "2023-04-15", "users": 1180 },
    { "date": "2023-05-01", "users": 1254 }
  ],
  "period": "last30days",
  "timestamp": "2023-05-01T10:30:00Z"
}`
  };

  const eventExample = {
    request: `// Example: Track a custom event
fetch('/api/modules/analytics/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    eventName: 'file_download',
    category: 'user_action',
    properties: {
      fileId: 'file_12345',
      fileName: 'report.pdf',
      fileSize: 1024576
    }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    response: `// Success response
{
  "id": "event_6789",
  "eventName": "file_download",
  "category": "user_action",
  "properties": {
    "fileId": "file_12345",
    "fileName": "report.pdf",
    "fileSize": 1024576
  },
  "userId": "user_12345",
  "timestamp": "2023-05-01T11:45:00Z",
  "sessionId": "session_abcdef"
}`
  };

  return (
    <div>
      <Card>
        <Title level={3}>Analytics API Documentation</Title>
        <Paragraph>
          This documentation provides information about the Analytics module API endpoints. 
          Use these endpoints to integrate with the Analytics module and access analytics data, track events, and generate reports.
        </Paragraph>

        <Divider />

        <div className="mb-4">
          <Search placeholder="Search API endpoints" allowClear enterButton="Search" size="large" />
        </div>

        <Tabs defaultActiveKey="endpoints">
          <TabPane 
            tab={<span><ApiOutlined />Endpoints</span>} 
            key="endpoints"
          >
            <Table 
              columns={columns} 
              dataSource={endpoints} 
              pagination={false}
            />
          </TabPane>
          
          <TabPane 
            tab={<span><CodeOutlined />Examples</span>} 
            key="examples"
          >
            <Title level={4}>Dashboard API</Title>
            <Card className="mb-4">
              <Tabs defaultActiveKey="request">
                <TabPane tab="Request" key="request">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(dashboardExample.request)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {dashboardExample.request}
                    </pre>
                  </div>
                </TabPane>
                <TabPane tab="Response" key="response">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(dashboardExample.response)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {dashboardExample.response}
                    </pre>
                  </div>
                </TabPane>
              </Tabs>
            </Card>

            <Title level={4}>Event Tracking API</Title>
            <Card>
              <Tabs defaultActiveKey="request">
                <TabPane tab="Request" key="request">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(eventExample.request)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {eventExample.request}
                    </pre>
                  </div>
                </TabPane>
                <TabPane tab="Response" key="response">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(eventExample.response)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {eventExample.response}
                    </pre>
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AnalyticsApi;
