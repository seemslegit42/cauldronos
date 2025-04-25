import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Tabs, 
  Button, 
  Space, 
  Divider, 
  Row, 
  Col, 
  Input, 
  Select,
  Switch,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
  Slider,
  Rate,
  Upload,
  Tag,
  Badge,
  Avatar,
  Alert,
  Progress,
  Tooltip,
  Popover,
  Drawer,
  Modal,
  Table,
  List,
  Collapse,
  Steps,
  Result,
  Statistic,
  Empty,
  Spin
} from 'antd';
import { 
  UserOutlined, 
  UploadOutlined, 
  DownloadOutlined, 
  SearchOutlined, 
  PlusOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { useTheme } from '../ui/theme/useTheme';
import { cyberpunkColors } from '../ui/design-system/tokens';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;
const { Step } = Steps;
const { RangePicker } = DatePicker;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};

// Sample data for tables
const tableData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['developer', 'admin'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['designer'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['manager'],
  },
];

const tableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <>
        {tags.map(tag => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const DevPlayground: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('components');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggle loading state
  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Show drawer
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  // Close drawer
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Render color palette
  const renderColorPalette = () => {
    const colors = [
      { name: 'Primary', color: cyberpunkColors.primary.base },
      { name: 'Primary Light', color: cyberpunkColors.primary.light },
      { name: 'Primary Dark', color: cyberpunkColors.primary.dark },
      { name: 'Secondary', color: cyberpunkColors.secondary.base },
      { name: 'Secondary Light', color: cyberpunkColors.secondary.light },
      { name: 'Secondary Dark', color: cyberpunkColors.secondary.dark },
      { name: 'Accent Yellow', color: cyberpunkColors.accent.yellow },
      { name: 'Accent Green', color: cyberpunkColors.accent.green },
      { name: 'Accent Purple', color: cyberpunkColors.accent.purple },
      { name: 'Accent Orange', color: cyberpunkColors.accent.orange },
      { name: 'Success', color: cyberpunkColors.status.success },
      { name: 'Warning', color: cyberpunkColors.status.warning },
      { name: 'Error', color: cyberpunkColors.status.error },
      { name: 'Info', color: cyberpunkColors.status.info },
    ];

    const backgroundColors = [
      { name: 'Background Darkest', color: cyberpunkColors.background.darkest },
      { name: 'Background Darker', color: cyberpunkColors.background.darker },
      { name: 'Background Dark', color: cyberpunkColors.background.dark },
      { name: 'Background Medium', color: cyberpunkColors.background.medium },
      { name: 'Background Light', color: cyberpunkColors.background.light },
      { name: 'Background Card', color: cyberpunkColors.background.card },
      { name: 'Background Elevated', color: cyberpunkColors.background.elevated },
    ];

    return (
      <div>
        <Title level={4}>Brand Colors</Title>
        <Row gutter={[16, 16]}>
          {colors.map(color => (
            <Col xs={12} sm={8} md={6} lg={4} key={color.name}>
              <div className="mb-4">
                <div 
                  style={{ 
                    backgroundColor: color.color, 
                    height: 80, 
                    borderRadius: 4,
                    marginBottom: 8
                  }} 
                />
                <div className="text-sm font-medium">{color.name}</div>
                <div className="text-xs text-gray-500">{color.color}</div>
              </div>
            </Col>
          ))}
        </Row>

        <Title level={4} className="mt-8">Background Colors</Title>
        <Row gutter={[16, 16]}>
          {backgroundColors.map(color => (
            <Col xs={12} sm={8} md={6} lg={4} key={color.name}>
              <div className="mb-4">
                <div 
                  style={{ 
                    backgroundColor: color.color, 
                    height: 80, 
                    borderRadius: 4,
                    marginBottom: 8,
                    border: '1px solid rgba(0,0,0,0.1)'
                  }} 
                />
                <div className="text-sm font-medium">{color.name}</div>
                <div className="text-xs text-gray-500">{color.color}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  // Render typography
  const renderTypography = () => {
    return (
      <div>
        <Title>h1. Heading</Title>
        <Title level={2}>h2. Heading</Title>
        <Title level={3}>h3. Heading</Title>
        <Title level={4}>h4. Heading</Title>
        <Title level={5}>h5. Heading</Title>
        
        <Divider />
        
        <Paragraph>
          This is a paragraph of text. It demonstrates the default text styling.
          <Text strong> This text is strong.</Text>
          <Text italic> This text is italic.</Text>
          <Text underline> This text is underlined.</Text>
          <Text mark> This text is marked.</Text>
          <Text code> This text is code.</Text>
          <Text keyboard> This text is keyboard.</Text>
          <Text delete> This text is deleted.</Text>
          <Text type="secondary"> This is secondary text.</Text>
          <Text type="success"> This is success text.</Text>
          <Text type="warning"> This is warning text.</Text>
          <Text type="danger"> This is danger text.</Text>
        </Paragraph>
        
        <Paragraph>
          <ul>
            <li>Unordered list item 1</li>
            <li>Unordered list item 2</li>
            <li>Unordered list item 3</li>
          </ul>
        </Paragraph>
        
        <Paragraph>
          <ol>
            <li>Ordered list item 1</li>
            <li>Ordered list item 2</li>
            <li>Ordered list item 3</li>
          </ol>
        </Paragraph>
        
        <Paragraph>
          <blockquote>This is a blockquote. It typically contains a quote from another source.</blockquote>
        </Paragraph>
        
        <Paragraph>
          <pre>This is preformatted text.</pre>
        </Paragraph>
      </div>
    );
  };

  // Render form components
  const renderFormComponents = () => {
    return (
      <div>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Basic Inputs">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input placeholder="Basic input" />
                <Input prefix={<UserOutlined />} placeholder="Input with icon" />
                <Input.Password placeholder="Password input" />
                <Input.TextArea placeholder="Textarea" rows={4} />
                <Input.Search placeholder="Search input" />
                <Input addonBefore="http://" addonAfter=".com" placeholder="Website" />
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Select & Options">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select placeholder="Basic select" style={{ width: '100%' }}>
                  <Option value="option1">Option 1</Option>
                  <Option value="option2">Option 2</Option>
                  <Option value="option3">Option 3</Option>
                </Select>
                
                <Select 
                  mode="multiple" 
                  placeholder="Multiple select" 
                  style={{ width: '100%' }}
                  defaultValue={['option1']}
                >
                  <Option value="option1">Option 1</Option>
                  <Option value="option2">Option 2</Option>
                  <Option value="option3">Option 3</Option>
                </Select>
                
                <Select 
                  mode="tags" 
                  placeholder="Tags select" 
                  style={{ width: '100%' }}
                >
                  <Option value="tag1">Tag 1</Option>
                  <Option value="tag2">Tag 2</Option>
                  <Option value="tag3">Tag 3</Option>
                </Select>
                
                <Radio.Group defaultValue="a">
                  <Radio value="a">Option A</Radio>
                  <Radio value="b">Option B</Radio>
                  <Radio value="c">Option C</Radio>
                </Radio.Group>
                
                <Checkbox.Group 
                  options={['Apple', 'Pear', 'Orange']} 
                  defaultValue={['Apple']} 
                />
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Date & Time">
              <Space direction="vertical" style={{ width: '100%' }}>
                <DatePicker style={{ width: '100%' }} />
                <RangePicker style={{ width: '100%' }} />
                <TimePicker style={{ width: '100%' }} />
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Other Inputs">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Slider defaultValue={30} />
                <Rate defaultValue={3.5} allowHalf />
                <Switch defaultChecked />
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // Render data display components
  const renderDataDisplayComponents = () => {
    return (
      <div>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Table">
              <Table 
                dataSource={tableData} 
                columns={tableColumns} 
                size="small" 
                pagination={{ pageSize: 2 }}
              />
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="List">
              <List
                itemLayout="horizontal"
                dataSource={tableData}
                renderItem={item => (
                  <List.Item
                    actions={[<a key="edit">edit</a>, <a key="delete">delete</a>]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={<a>{item.name}</a>}
                      description={`${item.age} years old, lives in ${item.address}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Tags & Badges">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Tag>Tag 1</Tag>
                  <Tag color="magenta">magenta</Tag>
                  <Tag color="red">red</Tag>
                  <Tag color="volcano">volcano</Tag>
                  <Tag color="orange">orange</Tag>
                  <Tag color="gold">gold</Tag>
                  <Tag color="lime">lime</Tag>
                  <Tag color="green">green</Tag>
                  <Tag color="cyan">cyan</Tag>
                  <Tag color="blue">blue</Tag>
                  <Tag color="geekblue">geekblue</Tag>
                  <Tag color="purple">purple</Tag>
                </div>
                
                <div>
                  <Badge count={5}>
                    <Avatar shape="square" size="large" />
                  </Badge>
                  <Badge count={0} showZero>
                    <Avatar shape="square" size="large" />
                  </Badge>
                  <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
                    <Avatar shape="square" size="large" />
                  </Badge>
                </div>
                
                <div>
                  <Badge status="success" text="Success" />
                  <Badge status="error" text="Error" />
                  <Badge status="default" text="Default" />
                  <Badge status="processing" text="Processing" />
                  <Badge status="warning" text="Warning" />
                </div>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Collapse & Steps">
              <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                  <p>Panel content 1</p>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                  <p>Panel content 2</p>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                  <p>Panel content 3</p>
                </Panel>
              </Collapse>
              
              <Divider />
              
              <Steps current={1}>
                <Step title="Finished" description="This is a description." />
                <Step title="In Progress" description="This is a description." />
                <Step title="Waiting" description="This is a description." />
              </Steps>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // Render feedback components
  const renderFeedbackComponents = () => {
    return (
      <div>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Alerts">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Alert message="Success Alert" type="success" showIcon />
                <Alert message="Info Alert" type="info" showIcon />
                <Alert message="Warning Alert" type="warning" showIcon />
                <Alert message="Error Alert" type="error" showIcon />
                <Alert
                  message="Success Alert with Description"
                  description="This is a success alert with detailed description."
                  type="success"
                  showIcon
                />
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Progress & Spin">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Progress percent={30} />
                <Progress percent={50} status="active" />
                <Progress percent={70} status="exception" />
                <Progress percent={100} />
                <Progress type="circle" percent={75} />
                <Progress type="dashboard" percent={75} />
                
                <Divider />
                
                <Space>
                  <Spin />
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                  <Spin tip="Loading...">
                    <div className="p-8 bg-gray-100 rounded">Content in loading state</div>
                  </Spin>
                </Space>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Result & Empty">
              <Result
                status="success"
                title="Successfully Completed"
                subTitle="Order number: 2017182818828182881"
                extra={[
                  <Button type="primary" key="console">
                    Go Console
                  </Button>,
                  <Button key="buy">Buy Again</Button>,
                ]}
              />
              
              <Divider />
              
              <Empty description="No data" />
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Statistic">
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Active Users" value={112893} />
                </Col>
                <Col span={12}>
                  <Statistic title="Account Balance" value={112893} precision={2} />
                </Col>
              </Row>
              
              <Divider />
              
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // Render overlay components
  const renderOverlayComponents = () => {
    return (
      <div>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Tooltips & Popovers">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space>
                  <Tooltip title="This is a tooltip">
                    <Button>Tooltip</Button>
                  </Tooltip>
                  
                  <Popover 
                    content={<div>Popover content</div>} 
                    title="Popover Title"
                  >
                    <Button>Popover</Button>
                  </Popover>
                </Space>
                
                <Space>
                  <Tooltip placement="topLeft" title="Top Left">
                    <Button>TL</Button>
                  </Tooltip>
                  <Tooltip placement="top" title="Top">
                    <Button>Top</Button>
                  </Tooltip>
                  <Tooltip placement="topRight" title="Top Right">
                    <Button>TR</Button>
                  </Tooltip>
                </Space>
                
                <Space>
                  <Tooltip placement="leftTop" title="Left Top">
                    <Button>LT</Button>
                  </Tooltip>
                  <Tooltip placement="left" title="Left">
                    <Button>Left</Button>
                  </Tooltip>
                  <Tooltip placement="leftBottom" title="Left Bottom">
                    <Button>LB</Button>
                  </Tooltip>
                </Space>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="Modal & Drawer">
              <Space>
                <Button type="primary" onClick={showModal}>
                  Open Modal
                </Button>
                <Button onClick={showDrawer}>
                  Open Drawer
                </Button>
              </Space>
              
              <Modal
                title="Basic Modal"
                open={isModalVisible}
                onOk={closeModal}
                onCancel={closeModal}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
              
              <Drawer
                title="Basic Drawer"
                placement="right"
                onClose={closeDrawer}
                open={isDrawerVisible}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Drawer>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // Render button components
  const renderButtonComponents = () => {
    return (
      <div>
        <Card title="Button Types">
          <Space wrap>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
          </Space>
        </Card>
        
        <Card title="Button Sizes" className="mt-6">
          <Space wrap>
            <Button type="primary" size="large">Large</Button>
            <Button type="primary">Default</Button>
            <Button type="primary" size="small">Small</Button>
          </Space>
        </Card>
        
        <Card title="Button States" className="mt-6">
          <Space wrap>
            <Button type="primary" loading>Loading</Button>
            <Button type="primary" disabled>Disabled</Button>
            <Button type="primary" danger>Danger</Button>
            <Button type="primary" ghost>Ghost</Button>
            <Button type="primary" onClick={toggleLoading} loading={loading}>
              Click me!
            </Button>
          </Space>
        </Card>
        
        <Card title="Button with Icons" className="mt-6">
          <Space wrap>
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
            <Button icon={<DownloadOutlined />}>Download</Button>
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            <Button type="primary" shape="round" icon={<DownloadOutlined />}>
              Download
            </Button>
          </Space>
        </Card>
        
        <Card title="Button Groups" className="mt-6">
          <Space direction="vertical">
            <Space.Compact>
              <Button type="primary">Button 1</Button>
              <Button type="primary">Button 2</Button>
              <Button type="primary">Button 3</Button>
            </Space.Compact>
            
            <Space.Compact>
              <Button type="primary" icon={<SearchOutlined />}>Search</Button>
              <Button type="primary" icon={<SettingOutlined />}>Settings</Button>
              <Button type="primary" icon={<DownloadOutlined />}>Download</Button>
            </Space.Compact>
          </Space>
        </Card>
      </div>
    );
  };

  return (
    <MainLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="mb-0">Developer Playground</Title>
          <Space>
            <Select 
              defaultValue={isDarkMode ? 'dark' : 'light'} 
              style={{ width: 120 }}
              onChange={(value) => {
                // This would toggle theme in a real implementation
                console.log('Theme changed to:', value);
              }}
            >
              <Option value="light">Light Mode</Option>
              <Option value="dark">Dark Mode</Option>
            </Select>
          </Space>
        </div>
        
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="mb-6"
        >
          <TabPane 
            tab={
              <span>
                <AppstoreOutlined />
                Components
              </span>
            } 
            key="components"
          >
            <Tabs defaultActiveKey="buttons">
              <TabPane tab="Buttons" key="buttons">
                {renderButtonComponents()}
              </TabPane>
              <TabPane tab="Form Components" key="form">
                {renderFormComponents()}
              </TabPane>
              <TabPane tab="Data Display" key="data">
                {renderDataDisplayComponents()}
              </TabPane>
              <TabPane tab="Feedback" key="feedback">
                {renderFeedbackComponents()}
              </TabPane>
              <TabPane tab="Overlays" key="overlays">
                {renderOverlayComponents()}
              </TabPane>
            </Tabs>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <BgColorsOutlined />
                Design System
              </span>
            } 
            key="design"
          >
            <Tabs defaultActiveKey="colors">
              <TabPane tab="Colors" key="colors">
                {renderColorPalette()}
              </TabPane>
              <TabPane tab="Typography" key="typography">
                {renderTypography()}
              </TabPane>
            </Tabs>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                <ThunderboltOutlined />
                Animations
              </span>
            } 
            key="animations"
          >
            <Card title="Framer Motion Examples">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <Card title="Fade In">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="bg-blue-100 p-4 rounded"
                    >
                      Fade In Animation
                    </motion.div>
                  </Card>
                </Col>
                
                <Col xs={24} md={8}>
                  <Card title="Slide In">
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                      className="bg-green-100 p-4 rounded"
                    >
                      Slide In Animation
                    </motion.div>
                  </Card>
                </Col>
                
                <Col xs={24} md={8}>
                  <Card title="Scale">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                      className="bg-purple-100 p-4 rounded"
                    >
                      Scale Animation
                    </motion.div>
                  </Card>
                </Col>
                
                <Col xs={24} md={8}>
                  <Card title="Hover Effects">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-100 p-4 rounded cursor-pointer"
                    >
                      Hover and Tap Me
                    </motion.div>
                  </Card>
                </Col>
                
                <Col xs={24} md={8}>
                  <Card title="Staggered Children">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.2
                          }
                        }
                      }}
                    >
                      {[0, 1, 2, 3].map(index => (
                        <motion.div
                          key={index}
                          variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: {
                              y: 0,
                              opacity: 1
                            }
                          }}
                          className="bg-red-100 p-2 rounded mb-2"
                        >
                          Item {index + 1}
                        </motion.div>
                      ))}
                    </motion.div>
                  </Card>
                </Col>
                
                <Col xs={24} md={8}>
                  <Card title="Keyframes">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 0],
                        borderRadius: ["0%", "50%", "0%"]
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="bg-pink-100 p-4 rounded w-16 h-16 mx-auto"
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default DevPlayground;