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
  Form,
  Input,
  Select,
  Switch,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
  InputNumber,
  Slider,
  Rate,
  Upload,
  message,
  Alert,
  Spin,
  Progress,
  Tag,
  Badge,
  Avatar,
  List,
  Table,
  Drawer,
  Modal,
  Popconfirm,
  Tooltip,
  Collapse
} from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  UserOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  CodeOutlined,
  ExperimentOutlined,
  RocketOutlined,
  AppstoreOutlined,
  ToolOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import RoleBasedAccess from '../auth/RoleBasedAccess';
import WorkspaceAccess from '../auth/WorkspaceAccess';
import ModuleScaffolder from '../modules/ModuleScaffolder';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const DevPlayground: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('module-scaffolder');
  const [generatedModule, setGeneratedModule] = useState<any>(null);

  const handleModuleGenerated = (moduleData: any) => {
    console.log('Module generated:', moduleData);
    setGeneratedModule(moduleData);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Operation completed successfully');
    }, 2000);
  };

  // Sample data for table
  const dataSource = [
    {
      key: '1',
      name: 'John Doe',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <RoleBasedAccess allowedRoles={['ADMIN']}>
      <WorkspaceAccess>
      <div>
        <div className="mb-6">
          <Title level={2}>Developer Playground</Title>
          <Text type="secondary">
            Explore and test Ant Design components for your modules
          </Text>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span>
                <CodeOutlined /> Module Scaffolder
              </span>
            }
            key="module-scaffolder"
          >
            <ModuleScaffolder onComplete={handleModuleGenerated} />
          </TabPane>

          <TabPane tab="Basic Components" key="components">
            <Card>
              <Title level={4}>Buttons</Title>
              <Space wrap>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button>
                <Button type="primary" danger>Danger Button</Button>
                <Button type="primary" icon={<SearchOutlined />}>Search</Button>
                <Button type="primary" loading>Loading</Button>
              </Space>

              <Divider />

              <Title level={4}>Typography</Title>
              <Title level={1}>h1. Ant Design</Title>
              <Title level={2}>h2. Ant Design</Title>
              <Title level={3}>h3. Ant Design</Title>
              <Title level={4}>h4. Ant Design</Title>
              <Title level={5}>h5. Ant Design</Title>
              <Paragraph>
                This is a paragraph with <Text strong>strong</Text> text,
                <Text mark>marked</Text> text, <Text code>code</Text> text,
                <Text keyboard>keyboard</Text> text, <Text underline>underlined</Text> text,
                <Text delete>deleted</Text> text, and <Text type="secondary">secondary</Text> text.
              </Paragraph>

              <Divider />

              <Title level={4}>Icons</Title>
              <Space>
                <UserOutlined />
                <SettingOutlined />
                <SearchOutlined />
                <UploadOutlined />
                <PlusOutlined />
                <InfoCircleOutlined />
              </Space>
            </Card>

            <Card className="mt-4">
              <Title level={4}>Form Elements</Title>
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Input">
                      <Input placeholder="Basic input" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Select">
                      <Select placeholder="Select option">
                        <Option value="option1">Option 1</Option>
                        <Option value="option2">Option 2</Option>
                        <Option value="option3">Option 3</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="InputNumber">
                      <InputNumber min={1} max={10} defaultValue={3} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="DatePicker">
                      <DatePicker className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="RangePicker">
                      <RangePicker className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="TimePicker">
                      <TimePicker className="w-full" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="TextArea">
                      <TextArea rows={4} placeholder="Textarea input" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Switch">
                      <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item label="Checkbox">
                      <Checkbox>Checkbox</Checkbox>
                    </Form.Item>
                    <Form.Item label="Radio">
                      <Radio.Group defaultValue="a">
                        <Radio value="a">Option A</Radio>
                        <Radio value="b">Option B</Radio>
                        <Radio value="c">Option C</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Slider">
                      <Slider defaultValue={30} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Rate">
                      <Rate defaultValue={3} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Upload">
                  <Upload.Dragger maxCount={1} beforeUpload={() => false}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>

          <TabPane tab="Data Display" key="data">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Alert">
                  <Space direction="vertical" className="w-full">
                    <Alert message="Success Text" type="success" />
                    <Alert message="Info Text" type="info" />
                    <Alert message="Warning Text" type="warning" />
                    <Alert message="Error Text" type="error" />
                    <Alert
                      message="Success Tips"
                      description="Detailed description and advice about successful copywriting."
                      type="success"
                      showIcon
                    />
                  </Space>
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Progress">
                  <Space direction="vertical" className="w-full">
                    <Progress percent={30} />
                    <Progress percent={50} status="active" />
                    <Progress percent={70} status="exception" />
                    <Progress percent={100} />
                    <Progress type="circle" percent={75} />
                    <Progress type="dashboard" percent={75} />
                  </Space>
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Tags & Badges">
                  <Space direction="vertical">
                    <Space wrap>
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
                    </Space>
                    <Divider />
                    <Space>
                      <Badge count={5}>
                        <Avatar shape="square" size="large" />
                      </Badge>
                      <Badge count={0} showZero>
                        <Avatar shape="square" size="large" />
                      </Badge>
                      <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
                        <Avatar shape="square" size="large" />
                      </Badge>
                    </Space>
                  </Space>
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Collapse">
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
                </Card>
              </Col>

              <Col span={24}>
                <Card title="Table">
                  <Table dataSource={dataSource} columns={columns} />
                </Card>
              </Col>

              <Col span={12}>
                <Card title="List">
                  <List
                    itemLayout="horizontal"
                    dataSource={dataSource}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={<a href="https://ant.design">{item.name}</a>}
                          description={item.address}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Loading States">
                  <Space direction="vertical" className="w-full">
                    <Spin />
                    <Spin tip="Loading...">
                      <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                      />
                    </Spin>
                    <div className="text-center">
                      <Button type="primary" loading={loading} onClick={simulateLoading}>
                        Click me to load
                      </Button>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Feedback & Modals" key="feedback">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="Modal & Drawer">
                  <Space>
                    <Button type="primary" onClick={showModal}>
                      Open Modal
                    </Button>
                    <Button onClick={showDrawer}>Open Drawer</Button>
                    <Popconfirm
                      title="Are you sure you want to delete this item?"
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger>Delete with confirmation</Button>
                    </Popconfirm>
                    <Tooltip title="This is a tooltip">
                      <Button>Hover me</Button>
                    </Tooltip>
                  </Space>

                  <Modal
                    title="Basic Modal"
                    open={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
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

              <Col span={24}>
                <Card title="Message & Notification">
                  <Space>
                    <Button onClick={() => message.success('This is a success message')}>
                      Success Message
                    </Button>
                    <Button onClick={() => message.error('This is an error message')}>
                      Error Message
                    </Button>
                    <Button onClick={() => message.warning('This is a warning message')}>
                      Warning Message
                    </Button>
                    <Button onClick={() => message.info('This is an info message')}>
                      Info Message
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default DevPlayground;
