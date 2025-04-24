import React from 'react';
import { Card, Typography, Tabs, Table, Tag } from 'antd';
import { ModuleComponentProps } from '../../types';
// Import SyntaxHighlighter and a style
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
// Import languages you want to use
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

// Register the languages you want to use
SyntaxHighlighter.registerLanguage('json', json);

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const CrmApi: React.FC<ModuleComponentProps> = ({ module }) => {
  // API endpoints
  const apiEndpoints = [
    {
      path: '/api/modules/crm/customers',
      method: 'GET',
      description: 'Get all customers',
      requiresAuth: true,
      requiredRoles: ['USER'],
      parameters: [],
      responseExample: `{
  "customers": [
    {
      "id": "1",
      "name": "Acme Inc.",
      "status": "active",
      "industry": "Technology",
      "revenue": "$1.2M",
      "createdAt": "2023-01-15T12:00:00Z",
      "updatedAt": "2023-05-20T09:30:00Z"
    },
    // ...more customers
  ]
}`
    },
    {
      path: '/api/modules/crm/customers',
      method: 'POST',
      description: 'Create a new customer',
      requiresAuth: true,
      requiredRoles: ['USER'],
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Customer name' },
        { name: 'status', type: 'string', required: true, description: 'Customer status (active, lead, inactive)' },
        { name: 'industry', type: 'string', required: false, description: 'Customer industry' },
        { name: 'revenue', type: 'string', required: false, description: 'Annual revenue' }
      ],
      responseExample: `{
  "customer": {
    "id": "123",
    "name": "New Company",
    "status": "lead",
    "industry": "Healthcare",
    "revenue": "$500K",
    "createdAt": "2023-06-10T14:25:00Z",
    "updatedAt": "2023-06-10T14:25:00Z"
  }
}`
    }
  ];

  // Columns for the API endpoints table
  const columns = [
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => {
        const colorMap: Record<string, string> = {
          GET: 'blue',
          POST: 'green',
          PUT: 'orange',
          DELETE: 'red',
          PATCH: 'purple'
        };
        return <Tag color={colorMap[method]}>{method}</Tag>;
      }
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Auth',
      dataIndex: 'requiresAuth',
      key: 'requiresAuth',
      render: (requiresAuth: boolean) => requiresAuth ? <Tag color="green">Required</Tag> : <Tag color="gray">Not Required</Tag>
    },
    {
      title: 'Roles',
      dataIndex: 'requiredRoles',
      key: 'requiredRoles',
      render: (roles: string[]) => (
        <>
          {roles.map(role => (
            <Tag key={role} color="blue">{role}</Tag>
          ))}
        </>
      )
    }
  ];

  // Render parameter table for an endpoint
  const renderParameters = (parameters: any[]) => {
    if (parameters.length === 0) {
      return <Paragraph>No parameters required.</Paragraph>;
    }

    const paramColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: 'Required',
        dataIndex: 'required',
        key: 'required',
        render: (required: boolean) => required ? <Tag color="red">Required</Tag> : <Tag color="gray">Optional</Tag>
      },
      {
        title: 'Location',
        dataIndex: 'inPath',
        key: 'inPath',
        render: (inPath: boolean) => inPath ? <Tag color="blue">Path</Tag> : <Tag color="green">Body</Tag>
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
      }
    ];

    return (
      <Table
        columns={paramColumns}
        dataSource={parameters}
        pagination={false}
        size="small"
        rowKey="name"
      />
    );
  };

  // Render detailed documentation for each endpoint
  const renderEndpointDetails = () => {
    return (
      <Tabs defaultActiveKey="0">
        {apiEndpoints.map((endpoint, index) => (
          <TabPane
            tab={`${endpoint.method} ${endpoint.path}`}
            key={index.toString()}
          >
            <Card>
              <Title level={4}>{endpoint.description}</Title>
              <Paragraph>
                <Text strong>Endpoint: </Text>
                <Tag color="blue">{endpoint.method}</Tag> {endpoint.path}
              </Paragraph>
              <Paragraph>
                <Text strong>Authentication: </Text>
                {endpoint.requiresAuth ? 'Required' : 'Not Required'}
              </Paragraph>
              <Paragraph>
                <Text strong>Required Roles: </Text>
                {endpoint.requiredRoles.map(role => (
                  <Tag key={role} color="blue">{role}</Tag>
                ))}
              </Paragraph>

              <Title level={5}>Parameters</Title>
              {renderParameters(endpoint.parameters)}

              <Title level={5} className="mt-4">Response Example</Title>
              <SyntaxHighlighter 
                language="json" 
                style={oneLight}
                showLineNumbers={true}
                showInlineLineNumbers={true}
                wrapLongLines={true}
              >
                {endpoint.responseExample}
              </SyntaxHighlighter>
            </Card>
          </TabPane>
        ))}
      </Tabs>
    );
  };

  return (
    <div>
      <Card className="mb-6">
        <Title level={3}>CRM API Documentation</Title>
        <Paragraph>
          This documentation provides details about the API endpoints available for the CRM module.
          Use these endpoints to integrate with the CRM functionality from external applications.
        </Paragraph>
      </Card>

      <Card title="API Endpoints Overview" className="mb-6">
        <Table
          columns={columns}
          dataSource={apiEndpoints}
          rowKey={(record) => `${record.method}-${record.path}`}
          pagination={false}
        />
      </Card>

      <Card title="Detailed API Documentation">
        {renderEndpointDetails()}
      </Card>
    </div>
  );
};

export default CrmApi;
