import React from 'react';
import { Card, Typography, Row, Col, Statistic, DatePicker, Select, Divider } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  RiseOutlined, 
  DollarOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { ModuleComponentProps } from '../types';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AnalyticsModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>{module.name}</Title>
        <div className="flex gap-4">
          <RangePicker />
          <Select defaultValue="daily" style={{ width: 120 }}>
            <Option value="hourly">Hourly</Option>
            <Option value="daily">Daily</Option>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
          </Select>
        </div>
      </div>
      
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={1254}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Workspaces"
              value={42}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Modules"
              value={18}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={9280}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="User Growth">
            <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              [User Growth Chart Placeholder]
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Module Usage">
            <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              [Module Usage Chart Placeholder]
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Activity Timeline">
            <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              [Activity Timeline Chart Placeholder]
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsModule;
