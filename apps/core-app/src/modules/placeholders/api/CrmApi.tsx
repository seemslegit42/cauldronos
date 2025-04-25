import React from 'react';
import { Card, Typography, Tabs, Table, Tag, Space, Divider, Button, Input } from 'antd';
import { CodeOutlined, CopyOutlined, ApiOutlined } from '@ant-design/icons';
import { ModuleComponentProps } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const CrmApi: React.FC<ModuleComponentProps> = ({ module }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // API endpoints data
  const endpoints = [
    {
      key: '1',
      method: 'GET',
      path: '/api/modules/crm/customers',
      description: 'Get all customers',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '2',
      method: 'GET',
      path: '/api/modules/crm/customers/{id}',
      description: 'Get customer by ID',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '3',
      method: 'POST',
      path: '/api/modules/crm/customers',
      description: 'Create a new customer',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '4',
      method: 'PUT',
      path: '/api/modules/crm/customers/{id}',
      description: 'Update a customer',
      auth: true,
      roles: ['MANAGER', 'ADMIN']
    },
    {
      key: '5',
      method: 'DELETE',
      path: '/api/modules/crm/customers/{id}',
      description: 'Delete a customer',
      auth: true,
      roles: ['ADMIN']
    },
    {
      key: '6',
      method: 'GET',
      path: '/api/modules/crm/deals',
      description: 'Get all deals',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '7',
      method: 'POST',
      path: '/api/modules/crm/deals',
      description: 'Create a new deal',
      auth: true,
      roles: ['USER', 'MANAGER', 'ADMIN']
    },
    {
      key: '8',
      method: 'GET',
      path: '/api/modules/crm/activities',
      description: 'Get all activities',
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
  const customerExample = {
    request: `// Example: Create a new customer
fetch('/api/modules/crm/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    name: 'Acme Corp',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    type: 'company',
    status: 'active'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    response: `// Success response
{
  "id": "cust_12345",
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Main St, Anytown, USA",
  "type": "company",
  "status": "active",
  "createdAt": "2023-05-01T10:30:00Z",
  "updatedAt": "2023-05-01T10:30:00Z"
}`
  };

  const dealExample = {
    request: `// Example: Create a new deal
fetch('/api/modules/crm/deals', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    title: 'Enterprise Package',
    customerId: 'cust_12345',
    value: 5000,
    currency: 'USD',
    stage: 'proposal',
    expectedCloseDate: '2023-06-15'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    response: `// Success response
{
  "id": "deal_6789",
  "title": "Enterprise Package",
  "customerId": "cust_12345",
  "value": 5000,
  "currency": "USD",
  "stage": "proposal",
  "expectedCloseDate": "2023-06-15",
  "createdAt": "2023-05-01T11:45:00Z",
  "updatedAt": "2023-05-01T11:45:00Z"
}`
  };

  return (
    <div>
      <Card>
        <Title level={3}>CRM API Documentation</Title>
        <Paragraph>
          This documentation provides information about the CRM module API endpoints. 
          Use these endpoints to integrate with the CRM module and manage customers, deals, and activities.
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
            <Title level={4}>Customer API</Title>
            <Card className="mb-4">
              <Tabs defaultActiveKey="request">
                <TabPane tab="Request" key="request">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(customerExample.request)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {customerExample.request}
                    </pre>
                  </div>
                </TabPane>
                <TabPane tab="Response" key="response">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(customerExample.response)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {customerExample.response}
                    </pre>
                  </div>
                </TabPane>
              </Tabs>
            </Card>

            <Title level={4}>Deal API</Title>
            <Card>
              <Tabs defaultActiveKey="request">
                <TabPane tab="Request" key="request">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(dealExample.request)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {dealExample.request}
                    </pre>
                  </div>
                </TabPane>
                <TabPane tab="Response" key="response">
                  <div className="relative">
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      onClick={() => copyToClipboard(dealExample.response)}
                      className="absolute top-2 right-2"
                    />
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                      {dealExample.response}
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

export default CrmApi;
