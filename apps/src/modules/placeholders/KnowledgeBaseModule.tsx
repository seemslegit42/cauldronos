import React, { useState } from 'react';
import {
  Card,
  Typography,
  Button,
  Space,
  Input,
  Tree,
  List,
  Avatar,
  Tag,
  Breadcrumb,
  Tabs,
  Empty,
  Dropdown,
  Menu,
  Divider,
  Row,
  Col
} from 'cauldronos-ui';
import {
  FileTextOutlined,
  FolderOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownOutlined,
  StarOutlined,
  StarFilled,
  TeamOutlined,
  HistoryOutlined,
  LockOutlined,
  GlobalOutlined,
  EllipsisOutlined
} from 'cauldronos-ui';
import { ModuleComponentProps } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;
const { DirectoryTree } = Tree;

const KnowledgeBaseModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  // Mock data for knowledge base categories
  const treeData = [
    {
      title: 'Getting Started',
      key: 'getting-started',
      icon: <FolderOutlined />,
      children: [
        {
          title: 'Welcome Guide',
          key: 'welcome-guide',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'Quick Start Tutorial',
          key: 'quick-start',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: 'User Guides',
      key: 'user-guides',
      icon: <FolderOutlined />,
      children: [
        {
          title: 'Dashboard Overview',
          key: 'dashboard-overview',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'Managing Users',
          key: 'managing-users',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'Workspace Settings',
          key: 'workspace-settings',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: 'Modules',
      key: 'modules',
      icon: <FolderOutlined />,
      children: [
        {
          title: 'CRM Module',
          key: 'crm-module',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'AI Assistant Module',
          key: 'ai-assistant-module',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: 'Troubleshooting',
      key: 'troubleshooting',
      icon: <FolderOutlined />,
      children: [
        {
          title: 'Common Issues',
          key: 'common-issues',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'FAQ',
          key: 'faq',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
      ],
    },
  ];

  // Mock data for recent articles
  const recentArticles = [
    {
      id: '1',
      title: 'Getting Started with CauldronOS',
      category: 'Getting Started',
      author: 'Admin',
      lastUpdated: '2023-04-15',
      views: 245,
      isFavorite: true
    },
    {
      id: '2',
      title: 'How to Configure Workspace Settings',
      category: 'User Guides',
      author: 'Admin',
      lastUpdated: '2023-04-10',
      views: 187,
      isFavorite: false
    },
    {
      id: '3',
      title: 'Using the AI Assistant Module',
      category: 'Modules',
      author: 'Admin',
      lastUpdated: '2023-04-05',
      views: 156,
      isFavorite: true
    },
    {
      id: '4',
      title: 'Troubleshooting Login Issues',
      category: 'Troubleshooting',
      author: 'Admin',
      lastUpdated: '2023-03-28',
      views: 203,
      isFavorite: false
    }
  ];

  // Mock article content
  const articleContent = {
    'welcome-guide': {
      title: 'Welcome Guide',
      content: `
# Welcome to CauldronOS

CauldronOS is a modular operating system for micro-SaaS tools. This guide will help you get started with the platform and make the most of its features.

## What is CauldronOS?

CauldronOS is a flexible platform that allows you to:
- Manage multiple workspaces
- Install and configure various modules
- Collaborate with team members
- Customize your experience

## Key Features

- **Modular Architecture**: Install only the modules you need
- **Multi-tenant Support**: Manage multiple workspaces from a single account
- **Role-based Access Control**: Control who can access what
- **Customizable Interface**: Adapt the platform to your needs

## Next Steps

1. Complete your profile setup
2. Explore the dashboard
3. Install your first module
4. Invite team members

For more detailed instructions, check out the [Quick Start Tutorial](/modules/knowledge-base/quick-start).
      `,
      category: 'Getting Started',
      author: 'Admin',
      lastUpdated: '2023-04-15',
      views: 245,
      isFavorite: true
    }
  };

  const handleSelectArticle = (selectedKeys: React.Key[], info: any) => {
    if (info.node.isLeaf) {
      // In a real app, we would fetch the article content from the server
      setSelectedArticle(articleContent[selectedKeys[0]] || {
        title: info.node.title,
        content: `# ${info.node.title}\n\nThis is a placeholder for the ${info.node.title} article. Content coming soon.`,
        category: info.node.parent?.title || 'Uncategorized',
        author: 'Admin',
        lastUpdated: '2023-04-15',
        views: 0,
        isFavorite: false
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2}>Knowledge Base</Title>
            <Text type="secondary">
              Documentation, guides, and resources for CauldronOS
            </Text>
          </div>
          <Space>
            <Search
              placeholder="Search knowledge base..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              style={{ width: 300 }}
            />
            <Button type="primary" icon={<PlusOutlined />}>
              New Article
            </Button>
          </Space>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8} lg={6}>
          <Card className="mb-4">
            <DirectoryTree
              defaultExpandAll
              onSelect={handleSelectArticle}
              treeData={treeData}
            />
          </Card>

          <Card title="Recent Articles">
            <List
              itemLayout="horizontal"
              dataSource={recentArticles.slice(0, 3)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<FileTextOutlined />} />}
                    title={<a href="#">{item.title}</a>}
                    description={
                      <div className="text-xs text-gray-500">
                        <span>{item.category}</span>
                        <span className="mx-1">•</span>
                        <span>{item.lastUpdated}</span>
                      </div>
                    }
                  />
                  {item.isFavorite && <StarFilled className="text-yellow-500" />}
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={16} lg={18}>
          {selectedArticle ? (
            <Card>
              <div className="mb-4">
                <Breadcrumb>
                  <Breadcrumb.Item>Knowledge Base</Breadcrumb.Item>
                  <Breadcrumb.Item>{selectedArticle.category}</Breadcrumb.Item>
                  <Breadcrumb.Item>{selectedArticle.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <div className="flex justify-between items-center mb-6">
                <Title level={3}>{selectedArticle.title}</Title>
                <Space>
                  <Button icon={<EditOutlined />}>Edit</Button>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="1" icon={<StarOutlined />}>
                          Add to Favorites
                        </Menu.Item>
                        <Menu.Item key="2" icon={<HistoryOutlined />}>
                          View History
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="3" icon={<DeleteOutlined />} danger>
                          Delete
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <Button icon={<EllipsisOutlined />} />
                  </Dropdown>
                </Space>
              </div>

              <div className="flex items-center mb-4 text-sm text-gray-500">
                <Space>
                  <span><TeamOutlined /> {selectedArticle.author}</span>
                  <Divider type="vertical" />
                  <span><HistoryOutlined /> Updated {selectedArticle.lastUpdated}</span>
                  <Divider type="vertical" />
                  <span><EyeOutlined /> {selectedArticle.views} views</span>
                  <Divider type="vertical" />
                  <Tag icon={<GlobalOutlined />} color="blue">Public</Tag>
                </Space>
              </div>

              <div className="prose max-w-none">
                <Paragraph>
                  {selectedArticle.content.split('\n').map((line: string, index: number) => {
                    if (line.startsWith('# ')) {
                      return <Title level={1} key={index}>{line.substring(2)}</Title>;
                    } else if (line.startsWith('## ')) {
                      return <Title level={2} key={index}>{line.substring(3)}</Title>;
                    } else if (line.startsWith('- ')) {
                      return <div key={index} className="flex items-start mb-2">
                        <div className="mr-2">•</div>
                        <div>{line.substring(2)}</div>
                      </div>;
                    } else if (line.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return <Paragraph key={index}>{line}</Paragraph>;
                    }
                  })}
                </Paragraph>
              </div>
            </Card>
          ) : (
            <Card>
              <Tabs defaultActiveKey="featured">
                <TabPane tab="Featured Articles" key="featured">
                  <List
                    itemLayout="vertical"
                    dataSource={recentArticles}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Space key="views"><EyeOutlined /> {item.views} views</Space>,
                          <Space key="updated"><HistoryOutlined /> {item.lastUpdated}</Space>,
                          item.isFavorite ? <StarFilled key="star" className="text-yellow-500" /> : <StarOutlined key="star" />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<FileTextOutlined />} />}
                          title={<a href="#">{item.title}</a>}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <span className="ml-2 text-xs text-gray-500">By {item.author}</span>
                            </div>
                          }
                        />
                        <Paragraph ellipsis={{ rows: 2 }}>
                          This is a preview of the article content. Click on the title to read the full article.
                        </Paragraph>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="Most Viewed" key="most-viewed">
                  <List
                    itemLayout="vertical"
                    dataSource={[...recentArticles].sort((a, b) => b.views - a.views)}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Space key="views"><EyeOutlined /> {item.views} views</Space>,
                          <Space key="updated"><HistoryOutlined /> {item.lastUpdated}</Space>,
                          item.isFavorite ? <StarFilled key="star" className="text-yellow-500" /> : <StarOutlined key="star" />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<FileTextOutlined />} />}
                          title={<a href="#">{item.title}</a>}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <span className="ml-2 text-xs text-gray-500">By {item.author}</span>
                            </div>
                          }
                        />
                        <Paragraph ellipsis={{ rows: 2 }}>
                          This is a preview of the article content. Click on the title to read the full article.
                        </Paragraph>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="Recently Updated" key="recently-updated">
                  <List
                    itemLayout="vertical"
                    dataSource={[...recentArticles].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Space key="views"><EyeOutlined /> {item.views} views</Space>,
                          <Space key="updated"><HistoryOutlined /> {item.lastUpdated}</Space>,
                          item.isFavorite ? <StarFilled key="star" className="text-yellow-500" /> : <StarOutlined key="star" />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<FileTextOutlined />} />}
                          title={<a href="#">{item.title}</a>}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <span className="ml-2 text-xs text-gray-500">By {item.author}</span>
                            </div>
                          }
                        />
                        <Paragraph ellipsis={{ rows: 2 }}>
                          This is a preview of the article content. Click on the title to read the full article.
                        </Paragraph>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="My Favorites" key="favorites">
                  <List
                    itemLayout="vertical"
                    dataSource={recentArticles.filter(item => item.isFavorite)}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Space key="views"><EyeOutlined /> {item.views} views</Space>,
                          <Space key="updated"><HistoryOutlined /> {item.lastUpdated}</Space>,
                          <StarFilled key="star" className="text-yellow-500" />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<FileTextOutlined />} />}
                          title={<a href="#">{item.title}</a>}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <span className="ml-2 text-xs text-gray-500">By {item.author}</span>
                            </div>
                          }
                        />
                        <Paragraph ellipsis={{ rows: 2 }}>
                          This is a preview of the article content. Click on the title to read the full article.
                        </Paragraph>
                      </List.Item>
                    )}
                    locale={{
                      emptyText: (
                        <Empty
                          description="You haven't added any articles to your favorites yet"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )
                    }}
                  />
                </TabPane>
              </Tabs>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default KnowledgeBaseModule;import React, { useState } from 'react';
import {
  Card,
  Typography,
  Button,
  Space,
  Input,
  Tree,
  List,
  Avatar,
  Tag,
  Breadcrumb,
  Tabs,
  Empty,
  Dropdown,
  Menu,
  Divider,
  Row,
  Col
} from 'antd';
import {
  FileTextOutlined,
  FolderOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownOutlined,
  StarOutlined,
  StarFilled,
  TeamOutlined,
  HistoryOutlined,
  LockOutlined,
  GlobalOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { ModuleComponentProps } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;
const { DirectoryTree } = Tree;

const KnowledgeBaseModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  // Mock data for knowledge base categories
  const treeData = [
    {
      title: 'Getting Started',
      key: 'getting-started',
      icon: <FolderOutlined />,
      children: [
        {
          title: 'Welcome Guide',
          key: 'welcome-guide',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'Quick Start Tutorial',
          key: 'quick-start',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: 'User Guides',
      key: 'user-guides',
      icon: <FolderOutlined />,
      children: [
        {
          title: 'Dashboard Overview',
          key: 'dashboard-overview',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'Managing Users',
          key: 'managing-users',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'Workspace Settings',
          key: 'workspace-settings',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: 'Modules',
      key: 'modules',
      icon: <FolderOutlined />,
      children: [
        {
          title: 'CRM Module',
          key: 'crm-module',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'AI Assistant Module',
          key: 'ai-assistant-module',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
      ],
    },
    {
      title: 'Troubleshooting',
      key: 'troubleshooting',
      icon: <FolderOutlined />,
      children: [
        {
          title: 'Common Issues',
          key: 'common-issues',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
        {
          title: 'FAQ',
          key: 'faq',
          icon: <FileTextOutlined />,
          isLeaf: true,
        },
      ],
    },
  ];

  // Mock data for recent articles
  const recentArticles = [
    {
      id: '1',
      title: 'Getting Started with CauldronOS',
      category: 'Getting Started',
      author: 'Admin',
      lastUpdated: '2023-04-15',
      views: 245,
      isFavorite: true
    },
    {
      id: '2',
      title: 'How to Configure Workspace Settings',
      category: 'User Guides',
      author: 'Admin',
      lastUpdated: '2023-04-10',
      views: 187,
      isFavorite: false
    },
    {
      id: '3',
      title: 'Using the AI Assistant Module',
      category: 'Modules',
      author: 'Admin',
      lastUpdated: '2023-04-05',
      views: 156,
      isFavorite: true
    },
    {
      id: '4',
      title: 'Troubleshooting Login Issues',
      category: 'Troubleshooting',
      author: 'Admin',
      lastUpdated: '2023-03-28',
      views: 203,
      isFavorite: false
    }
  ];

  // Mock article content
  const articleContent = {
    'welcome-guide': {
      title: 'Welcome Guide',
      content: `
# Welcome to CauldronOS

CauldronOS is a modular operating system for micro-SaaS tools. This guide will help you get started with the platform and make the most of its features.

## What is CauldronOS?

CauldronOS is a flexible platform that allows you to:
- Manage multiple workspaces
- Install and configure various modules
- Collaborate with team members
- Customize your experience

## Key Features

- **Modular Architecture**: Install only the modules you need
- **Multi-tenant Support**: Manage multiple workspaces from a single account
- **Role-based Access Control**: Control who can access what
- **Customizable Interface**: Adapt the platform to your needs

## Next Steps

1. Complete your profile setup
2. Explore the dashboard
3. Install your first module
4. Invite team members

For more detailed instructions, check out the [Quick Start Tutorial](/modules/knowledge-base/quick-start).
      `,
      category: 'Getting Started',
      author: 'Admin',
      lastUpdated: '2023-04-15',
      views: 245,
      isFavorite: true
    }
  };

  const handleSelectArticle = (selectedKeys: React.Key[], info: any) => {
    if (info.node.isLeaf) {
      // In a real app, we would fetch the article content from the server
      setSelectedArticle(articleContent[selectedKeys[0]] || {
        title: info.node.title,
        content: `# ${info.node.title}\n\nThis is a placeholder for the ${info.node.title} article. Content coming soon.`,
        category: info.node.parent?.title || 'Uncategorized',
        author: 'Admin',
        lastUpdated: '2023-04-15',
        views: 0,
        isFavorite: false
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2}>Knowledge Base</Title>
            <Text type="secondary">
              Documentation, guides, and resources for CauldronOS
            </Text>
          </div>
          <Space>
            <Search
              placeholder="Search knowledge base..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              style={{ width: 300 }}
            />
            <Button type="primary" icon={<PlusOutlined />}>
              New Article
            </Button>
          </Space>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8} lg={6}>
          <Card className="mb-4">
            <DirectoryTree
              defaultExpandAll
              onSelect={handleSelectArticle}
              treeData={treeData}
            />
          </Card>

          <Card title="Recent Articles">
            <List
              itemLayout="horizontal"
              dataSource={recentArticles.slice(0, 3)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<FileTextOutlined />} />}
                    title={<a href="#">{item.title}</a>}
                    description={
                      <div className="text-xs text-gray-500">
                        <span>{item.category}</span>
                        <span className="mx-1">•</span>
                        <span>{item.lastUpdated}</span>
                      </div>
                    }
                  />
                  {item.isFavorite && <StarFilled className="text-yellow-500" />}
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={16} lg={18}>
          {selectedArticle ? (
            <Card>
              <div className="mb-4">
                <Breadcrumb>
                  <Breadcrumb.Item>Knowledge Base</Breadcrumb.Item>
                  <Breadcrumb.Item>{selectedArticle.category}</Breadcrumb.Item>
                  <Breadcrumb.Item>{selectedArticle.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <div className="flex justify-between items-center mb-6">
                <Title level={3}>{selectedArticle.title}</Title>
                <Space>
                  <Button icon={<EditOutlined />}>Edit</Button>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="1" icon={<StarOutlined />}>
                          Add to Favorites
                        </Menu.Item>
                        <Menu.Item key="2" icon={<HistoryOutlined />}>
                          View History
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="3" icon={<DeleteOutlined />} danger>
                          Delete
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <Button icon={<EllipsisOutlined />} />
                  </Dropdown>
                </Space>
              </div>

              <div className="flex items-center mb-4 text-sm text-gray-500">
                <Space>
                  <span><TeamOutlined /> {selectedArticle.author}</span>
                  <Divider type="vertical" />
                  <span><HistoryOutlined /> Updated {selectedArticle.lastUpdated}</span>
                  <Divider type="vertical" />
                  <span><EyeOutlined /> {selectedArticle.views} views</span>
                  <Divider type="vertical" />
                  <Tag icon={<GlobalOutlined />} color="blue">Public</Tag>
                </Space>
              </div>

              <div className="prose max-w-none">
                <Paragraph>
                  {selectedArticle.content.split('\n').map((line: string, index: number) => {
                    if (line.startsWith('# ')) {
                      return <Title level={1} key={index}>{line.substring(2)}</Title>;
                    } else if (line.startsWith('## ')) {
                      return <Title level={2} key={index}>{line.substring(3)}</Title>;
                    } else if (line.startsWith('- ')) {
                      return <div key={index} className="flex items-start mb-2">
                        <div className="mr-2">•</div>
                        <div>{line.substring(2)}</div>
                      </div>;
                    } else if (line.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return <Paragraph key={index}>{line}</Paragraph>;
                    }
                  })}
                </Paragraph>
              </div>
            </Card>
          ) : (
            <Card>
              <Tabs defaultActiveKey="featured">
                <TabPane tab="Featured Articles" key="featured">
                  <List
                    itemLayout="vertical"
                    dataSource={recentArticles}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Space key="views"><EyeOutlined /> {item.views} views</Space>,
                          <Space key="updated"><HistoryOutlined /> {item.lastUpdated}</Space>,
                          item.isFavorite ? <StarFilled key="star" className="text-yellow-500" /> : <StarOutlined key="star" />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<FileTextOutlined />} />}
                          title={<a href="#">{item.title}</a>}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <span className="ml-2 text-xs text-gray-500">By {item.author}</span>
                            </div>
                          }
                        />
                        <Paragraph ellipsis={{ rows: 2 }}>
                          This is a preview of the article content. Click on the title to read the full article.
                        </Paragraph>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="Most Viewed" key="most-viewed">
                  <List
                    itemLayout="vertical"
                    dataSource={[...recentArticles].sort((a, b) => b.views - a.views)}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Space key="views"><EyeOutlined /> {item.views} views</Space>,
                          <Space key="updated"><HistoryOutlined /> {item.lastUpdated}</Space>,
                          item.isFavorite ? <StarFilled key="star" className="text-yellow-500" /> : <StarOutlined key="star" />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<FileTextOutlined />} />}
                          title={<a href="#">{item.title}</a>}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <span className="ml-2 text-xs text-gray-500">By {item.author}</span>
                            </div>
                          }
                        />
                        <Paragraph ellipsis={{ rows: 2 }}>
                          This is a preview of the article content. Click on the title to read the full article.
                        </Paragraph>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="Recently Updated" key="recently-updated">
                  <List
                    itemLayout="vertical"
                    dataSource={[...recentArticles].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Space key="views"><EyeOutlined /> {item.views} views</Space>,
                          <Space key="updated"><HistoryOutlined /> {item.lastUpdated}</Space>,
                          item.isFavorite ? <StarFilled key="star" className="text-yellow-500" /> : <StarOutlined key="star" />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<FileTextOutlined />} />}
                          title={<a href="#">{item.title}</a>}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <span className="ml-2 text-xs text-gray-500">By {item.author}</span>
                            </div>
                          }
                        />
                        <Paragraph ellipsis={{ rows: 2 }}>
                          This is a preview of the article content. Click on the title to read the full article.
                        </Paragraph>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="My Favorites" key="favorites">
                  <List
                    itemLayout="vertical"
                    dataSource={recentArticles.filter(item => item.isFavorite)}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Space key="views"><EyeOutlined /> {item.views} views</Space>,
                          <Space key="updated"><HistoryOutlined /> {item.lastUpdated}</Space>,
                          <StarFilled key="star" className="text-yellow-500" />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<FileTextOutlined />} />}
                          title={<a href="#">{item.title}</a>}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <span className="ml-2 text-xs text-gray-500">By {item.author}</span>
                            </div>
                          }
                        />
                        <Paragraph ellipsis={{ rows: 2 }}>
                          This is a preview of the article content. Click on the title to read the full article.
                        </Paragraph>
                      </List.Item>
                    )}
                    locale={{
                      emptyText: (
                        <Empty
                          description="You haven't added any articles to your favorites yet"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )
                    }}
                  />
                </TabPane>
              </Tabs>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default KnowledgeBaseModule;