import React from 'react';
import { Card, Typography, Tree, Input, Button, Space, Divider } from 'antd';
import { 
  FileOutlined, 
  FolderOutlined, 
  EditOutlined, 
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { ModuleComponentProps } from '../types';

const { Title, Paragraph } = Typography;
const { DirectoryTree } = Tree;
const { Search } = Input;

// Mock data for Wiki
const treeData = [
  {
    title: 'Getting Started',
    key: 'getting-started',
    icon: <FolderOutlined />,
    children: [
      {
        title: 'Introduction',
        key: 'introduction',
        icon: <FileOutlined />,
      },
      {
        title: 'Installation',
        key: 'installation',
        icon: <FileOutlined />,
      },
    ],
  },
  {
    title: 'User Guide',
    key: 'user-guide',
    icon: <FolderOutlined />,
    children: [
      {
        title: 'Dashboard',
        key: 'dashboard',
        icon: <FileOutlined />,
      },
      {
        title: 'Modules',
        key: 'modules',
        icon: <FileOutlined />,
      },
    ],
  },
  {
    title: 'API Documentation',
    key: 'api-docs',
    icon: <FolderOutlined />,
    children: [
      {
        title: 'Authentication',
        key: 'authentication',
        icon: <FileOutlined />,
      },
      {
        title: 'Endpoints',
        key: 'endpoints',
        icon: <FileOutlined />,
      },
    ],
  },
];

const WikiModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [selectedKey, setSelectedKey] = React.useState<string>('introduction');

  const onSelect = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      setSelectedKey(selectedKeys[0] as string);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>{module.name}</Title>
        <Space>
          <Button icon={<EditOutlined />}>Edit</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            New Page
          </Button>
        </Space>
      </div>
      
      <div className="flex gap-6">
        <div className="w-1/4">
          <Card>
            <Search
              placeholder="Search wiki..."
              allowClear
              enterButton={<SearchOutlined />}
              className="mb-4"
            />
            <DirectoryTree
              defaultExpandAll
              onSelect={onSelect}
              treeData={treeData}
              selectedKeys={[selectedKey]}
            />
          </Card>
        </div>
        
        <div className="w-3/4">
          <Card>
            <Title level={3}>Introduction</Title>
            <Divider />
            <Paragraph>
              Welcome to CauldronOS Wiki! This is a comprehensive guide to help you get started with our platform.
            </Paragraph>
            <Paragraph>
              CauldronOS is a modular, extensible operating system for micro-SaaS tools. It provides a reusable shell for launching internal tools or B2B SaaS modules, with tenant isolation and role-based access control.
            </Paragraph>
            <Title level={4}>Key Features</Title>
            <Paragraph>
              <ul>
                <li>Multi-tenant architecture with workspaces</li>
                <li>Role-based access control (Admin, Manager, User)</li>
                <li>Modular system for extensibility</li>
                <li>Dark/light mode support</li>
                <li>Comprehensive user and workspace management</li>
              </ul>
            </Paragraph>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WikiModule;
