import React from 'react';
import { Card, Typography, Tabs, Table, Tag, Space, Divider, Button, Input } from 'antd';
import { CodeOutlined, CopyOutlined, ApiOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const WikiApi: React.FC<ModuleComponentProps> = ({ module }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // API endpoints data
  const endpoints = [
    {
      key: '1',
      method: 'GET',
      path: '/api/modules/wiki/pages',
      description: 'Get all wiki pages',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '2',
      method: 'GET',
      path: '/api/modules/wiki/pages/{id}',
      description: 'Get wiki page by ID',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '3',
      method: 'POST',
      path: '/api/modules/wiki/pages',
      description: 'Create a new wiki page',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '4',
      method: 'PUT',
      path: '/api/modules/wiki/pages/{id}',
      description: 'Update a wiki page',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '5',
      method: 'DELETE',
      path: '/api/modules/wiki/pages/{id}',
      description: 'Delete a wiki page',
      auth: true,
      roles: ['ADMIN']
    },
    {
      key: '6',
      method: 'GET',
      path: '/api/modules/wiki/categories',
      description: 'Get all categories',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '7',
      method: 'POST',
      path: '/api/modules/wiki/categories',
      description: 'Create a new category',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '8',
      method: 'GET',
      path: '/api/modules/wiki/pages/{id}/history',
      description: 'Get page version history',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '9',
      method: 'POST',
      path: '/api/modules/wiki/pages/{id}/comments',
      description: 'Add a comment to a page',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
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
  const pageExample = {
    request: `// Example: Create a new wiki page
fetch('/api/modules/wiki/pages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    title: 'Getting Started Guide',
    content: '# Getting Started\\n\\nThis is a guide to help you get started with our product.',
    categoryId: 'cat_12345',
    tags: ['guide', 'tutorial', 'beginner'],
    isPublished: true
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    response: `// Success response
{
  "id": "page_6789",
  "title": "Getting Started Guide",
  "content": "# Getting Started\\n\\nThis is a guide to help you get started with our product.",
  "categoryId": "cat_12345",
  "tags": ["guide", "tutorial", "beginner"],
  "isPublished": true,
  "createdBy": "user_12345",
  "createdAt": "2023-05-01T10:30:00Z",
  "updatedAt": "2023-05-01T10:30:00Z",
  "version": 1
}`
  };

  const commentExample = {
    request: `// Example: Add a comment to a wiki page
fetch('/api/modules/wiki/pages/page_6789/comments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    content: 'This guide was very helpful. Thanks for creating it!',
    parentId: null // For threaded comments, specify parent comment ID
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    response: `// Success response
{
  "id": "comment_1234",
  "pageId": "page_6789",
  "content": "This guide was very helpful. Thanks for creating it!",
  "parentId": null,
  "createdBy": "user_12345",
  "createdAt": "2023-05-01T11:45:00Z",
  "updatedAt": "2023-05-01T11:45:00Z"
}`
  };

  return (
    <div>
      <Card>
        <Title level={3}>Wiki API Documentation</Title>
        <Paragraph>
          This documentation provides information about the Wiki module API endpoints. 
          Use these endpoints to integrate with the Wiki module and manage pages, categories, and comments.
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
            <Title level={4}>Page API</Title>
            <Card className="mb-4">
              <Tabs defaultActiveKey="request">
                <TabPane tab="Request" key="request">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(pageExample.request)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {pageExample.request}
                    </pre>
                  </div>
                </TabPane>
                <TabPane tab="Response" key="response">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(pageExample.response)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {pageExample.response}
                    </pre>
                  </div>
                </TabPane>
              </Tabs>
            </Card>

            <Title level={4}>Comment API</Title>
            <Card>
              <Tabs defaultActiveKey="request">
                <TabPane tab="Request" key="request">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(commentExample.request)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {commentExample.request}
                    </pre>
                  </div>
                </TabPane>
                <TabPane tab="Response" key="response">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(commentExample.response)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {commentExample.response}
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

export default WikiApi;
