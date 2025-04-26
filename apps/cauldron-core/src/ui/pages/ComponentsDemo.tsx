import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Button, 
  Space, 
  Divider, 
  DatePicker, 
  Form, 
  Input, 
  Select, 
  Switch, 
  Tabs, 
  Table, 
  Tag, 
  message, 
  notification 
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  InfoCircleOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import ResizablePanel from '../components/ResizablePanel';
import DraggableCard from '../components/DraggableCard';
import { cx, formatDate, fromNow, getColorFromString, getInitials } from '../utils/styleUtils';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

const demoUsers: DemoUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastActive: dayjs().subtract(2, 'hour').toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    status: 'Active',
    lastActive: dayjs().subtract(1, 'day').toISOString()
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'Inactive',
    lastActive: dayjs().subtract(5, 'day').toISOString()
  }
];

const ComponentsDemo: React.FC = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  
  const showMessage = () => {
    message.success('This is a success message');
  };
  
  const showNotification = () => {
    notification.info({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
      placement: 'topRight'
    });
  };
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color = 'blue';
        if (role === 'Admin') color = 'red';
        if (role === 'Manager') color = 'green';
        return <Tag color={color}>{role}</Tag>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Active' ? 'green' : 'volcano';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => <span>{fromNow(date)}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: DemoUser) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];
  
  return (
    <div>
      <Title level={2}>Components Demo</Title>
      <Paragraph>
        This page demonstrates the usage of Ant Design components with the newly installed packages.
      </Paragraph>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Ant Design Components" key="1">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card title="Basic Form" className="shadow-sm">
              <Form
                form={form}
                layout="vertical"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input prefix={<InfoCircleOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                
                <Form.Item
                  label="Role"
                  name="role"
                >
                  <Select placeholder="Select a role">
                    <Option value="admin">Admin</Option>
                    <Option value="manager">Manager</Option>
                    <Option value="user">User</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  label="Date"
                  name="date"
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                
                <Form.Item
                  label="Active"
                  name="active"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            
            <Card title="Data Table" className="shadow-sm">
              <Table columns={columns} dataSource={demoUsers} rowKey="id" />
            </Card>
            
            <Card title="Notifications" className="shadow-sm">
              <Space>
                <Button type="primary" onClick={showMessage}>
                  Show Message
                </Button>
                <Button onClick={showNotification}>
                  Show Notification
                </Button>
              </Space>
            </Card>
          </Space>
        </TabPane>
        
        <TabPane tab="Custom Components" key="2">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={3}>Resizable Panel</Title>
            <div style={{ height: '300px', position: 'relative' }}>
              <ResizablePanel
                title="Resizable Panel"
                defaultWidth={400}
                defaultHeight={200}
                minWidth={200}
                minHeight={100}
                maxWidth={600}
                maxHeight={400}
              >
                <p>This panel can be resized by dragging the bottom-right corner.</p>
                <p>Try resizing this panel to see how it works!</p>
              </ResizablePanel>
            </div>
            
            <Divider />
            
            <Title level={3}>Draggable Card</Title>
            <div style={{ height: '300px', position: 'relative', border: '1px dashed #ccc', borderRadius: '4px' }}>
              <DraggableCard
                title="Draggable Card"
                defaultPosition={{ x: 50, y: 50 }}
                bounds="parent"
                style={{ width: 300 }}
              >
                <p>This card can be dragged around by its header.</p>
                <p>Try dragging this card to see how it works!</p>
              </DraggableCard>
            </div>
            
            <Divider />
            
            <Title level={3}>Utility Functions</Title>
            <Card className="shadow-sm">
              <Space direction="vertical">
                <Text strong>Date Formatting:</Text>
                <Text>Current Date: {formatDate(new Date())}</Text>
                <Text>Relative Time: {fromNow('2023-01-01')}</Text>
                
                <Divider />
                
                <Text strong>Conditional Classes:</Text>
                <div className={cx('p-4 rounded', {
                  'bg-blue-100': activeTab === '2',
                  'text-blue-700': activeTab === '2',
                  'bg-gray-100': activeTab !== '2',
                  'text-gray-700': activeTab !== '2'
                })}>
                  This div has conditional classes based on the active tab.
                </div>
                
                <Divider />
                
                <Text strong>Color Generation:</Text>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['John Doe', 'Jane Smith', 'Bob Johnson'].map(name => (
                    <div
                      key={name}
                      style={{
                        backgroundColor: getColorFromString(name),
                        color: 'white',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      {getInitials(name)}
                    </div>
                  ))}
                </div>
              </Space>
            </Card>
          </Space>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ComponentsDemo;
