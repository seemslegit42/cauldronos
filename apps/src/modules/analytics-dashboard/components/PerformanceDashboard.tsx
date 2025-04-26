import React from 'react';
import { Row, Col, Card, Statistic, Progress, Space, Select, Divider } from 'antd';
import { motion } from 'framer-motion';
import { 
  ClockCircleOutlined, 
  ThunderboltOutlined, 
  LoadingOutlined, 
  WarningOutlined 
} from '@ant-design/icons';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';

const { Option } = Select;

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Generate performance data
const generatePerformanceData = () => {
  const data = [];
  for (let day = 0; day < 30; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      loadTime: (Math.random() * 2 + 0.5).toFixed(2),
      errorRate: (Math.random() * 2).toFixed(2),
      serverResponse: (Math.random() * 0.5 + 0.1).toFixed(2),
      cpuUsage: Math.floor(Math.random() * 40) + 20,
      memoryUsage: Math.floor(Math.random() * 30) + 30,
    });
  }
  return data.reverse();
};

// Generate error distribution data
const generateErrorDistributionData = () => {
  return [
    { name: '404 Not Found', value: Math.floor(Math.random() * 50) + 10 },
    { name: '500 Server Error', value: Math.floor(Math.random() * 30) + 5 },
    { name: 'API Timeout', value: Math.floor(Math.random() * 20) + 15 },
    { name: 'Authentication', value: Math.floor(Math.random() * 25) + 8 },
    { name: 'Validation', value: Math.floor(Math.random() * 40) + 20 },
  ];
};

// Generate page load time data
const generatePageLoadData = () => {
  const pages = ['Dashboard', 'Projects', 'Documents', 'Settings', 'Profile', 'Analytics'];
  return pages.map(page => ({
    page,
    loadTime: (Math.random() * 2 + 0.5).toFixed(2),
    resourceCount: Math.floor(Math.random() * 50) + 10,
    size: Math.floor(Math.random() * 2000) + 500,
  }));
};

// Generate correlation data
const generateCorrelationData = () => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    const loadTime = Math.random() * 3 + 0.5;
    data.push({
      loadTime,
      userCount: Math.floor((Math.random() * 100) + 10 - loadTime * 20),
      errorRate: loadTime > 2 ? loadTime * 2 : loadTime * 0.5,
      z: Math.floor(Math.random() * 100) + 1,
    });
  }
  return data;
};

const PerformanceDashboard = ({ data }: any) => {
  // Mock data
  const performanceData = generatePerformanceData();
  const errorDistributionData = generateErrorDistributionData();
  const pageLoadData = generatePageLoadData();
  const correlationData = generateCorrelationData();
  
  // Calculate averages
  const avgLoadTime = parseFloat(
    (performanceData.reduce((sum, item) => sum + parseFloat(item.loadTime), 0) / performanceData.length).toFixed(2)
  );
  const avgErrorRate = parseFloat(
    (performanceData.reduce((sum, item) => sum + parseFloat(item.errorRate), 0) / performanceData.length).toFixed(2)
  );
  const avgServerResponse = parseFloat(
    (performanceData.reduce((sum, item) => sum + parseFloat(item.serverResponse), 0) / performanceData.length).toFixed(2)
  );
  const avgCpuUsage = Math.floor(
    performanceData.reduce((sum, item) => sum + item.cpuUsage, 0) / performanceData.length
  );
  
  return (
    <div className="performance-dashboard">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col>
            <h2>Performance Metrics</h2>
          </Col>
          <Col>
            <Select defaultValue="30days" style={{ width: 150 }}>
              <Option value="7days">Last 7 Days</Option>
              <Option value="30days">Last 30 Days</Option>
              <Option value="90days">Last 90 Days</Option>
            </Select>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <motion.div variants={cardVariants}>
              <Card>
                <Statistic 
                  title="Avg. Load Time" 
                  value={avgLoadTime} 
                  suffix="s" 
                  prefix={<ClockCircleOutlined />} 
                  valueStyle={{ color: avgLoadTime > 1.5 ? '#EF476F' : '#3DAA9D' }} 
                />
                <Progress 
                  percent={100 - (avgLoadTime / 3 * 100)} 
                  status={avgLoadTime > 1.5 ? "exception" : "active"} 
                  showInfo={false} 
                  strokeColor={avgLoadTime > 1.5 ? '#EF476F' : '#3DAA9D'} 
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <motion.div variants={cardVariants}>
              <Card>
                <Statistic 
                  title="Error Rate" 
                  value={avgErrorRate} 
                  suffix="%" 
                  prefix={<WarningOutlined />} 
                  valueStyle={{ color: avgErrorRate > 1 ? '#EF476F' : '#3DAA9D' }} 
                />
                <Progress 
                  percent={100 - (avgErrorRate / 5 * 100)} 
                  status={avgErrorRate > 1 ? "exception" : "active"} 
                  showInfo={false} 
                  strokeColor={avgErrorRate > 1 ? '#EF476F' : '#3DAA9D'} 
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <motion.div variants={cardVariants}>
              <Card>
                <Statistic 
                  title="Server Response" 
                  value={avgServerResponse} 
                  suffix="s" 
                  prefix={<ThunderboltOutlined />} 
                  valueStyle={{ color: avgServerResponse > 0.3 ? '#FFD166' : '#3DAA9D' }} 
                />
                <Progress 
                  percent={100 - (avgServerResponse / 0.6 * 100)} 
                  status={avgServerResponse > 0.3 ? "normal" : "active"} 
                  showInfo={false} 
                  strokeColor={avgServerResponse > 0.3 ? '#FFD166' : '#3DAA9D'} 
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <motion.div variants={cardVariants}>
              <Card>
                <Statistic 
                  title="CPU Usage" 
                  value={avgCpuUsage} 
                  suffix="%" 
                  prefix={<LoadingOutlined />} 
                  valueStyle={{ color: avgCpuUsage > 60 ? '#EF476F' : '#3DAA9D' }} 
                />
                <Progress 
                  percent={avgCpuUsage} 
                  status={avgCpuUsage > 60 ? "exception" : "active"} 
                  showInfo={false} 
                  strokeColor={avgCpuUsage > 60 ? '#EF476F' : '#3DAA9D'} 
                />
              </Card>
            </motion.div>
          </Col>
        </Row>
        
        <Divider />
        
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <motion.div variants={cardVariants}>
              <Card title="Performance Trends">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                      <XAxis dataKey="date" stroke="#9E9E9E" />
                      <YAxis stroke="#9E9E9E" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E1E1E', 
                          borderColor: '#2D2D2D',
                          color: '#E0E0E0'
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="loadTime" 
                        name="Load Time (s)" 
                        stroke="#3DAA9D" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="errorRate" 
                        name="Error Rate (%)" 
                        stroke="#EF476F" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="serverResponse" 
                        name="Server Response (s)" 
                        stroke="#B8860B" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div variants={cardVariants}>
              <Card title="Resource Usage">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={performanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                      <XAxis dataKey="date" stroke="#9E9E9E" />
                      <YAxis stroke="#9E9E9E" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E1E1E', 
                          borderColor: '#2D2D2D',
                          color: '#E0E0E0'
                        }} 
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="cpuUsage" 
                        name="CPU Usage (%)" 
                        stroke="#4A0D67" 
                        fill="#4A0D67" 
                        fillOpacity={0.3} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="memoryUsage" 
                        name="Memory Usage (%)" 
                        stroke="#3DAA9D" 
                        fill="#3DAA9D" 
                        fillOpacity={0.3} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <motion.div variants={cardVariants}>
              <Card title="Page Load Time vs. User Count">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                      <XAxis 
                        type="number" 
                        dataKey="loadTime" 
                        name="Load Time (s)" 
                        stroke="#9E9E9E"
                        label={{ 
                          value: 'Load Time (s)', 
                          position: 'insideBottomRight', 
                          offset: -5,
                          fill: '#9E9E9E'
                        }} 
                      />
                      <YAxis 
                        type="number" 
                        dataKey="userCount" 
                        name="User Count" 
                        stroke="#9E9E9E"
                        label={{ 
                          value: 'User Count', 
                          angle: -90, 
                          position: 'insideLeft',
                          fill: '#9E9E9E'
                        }} 
                      />
                      <ZAxis 
                        type="number" 
                        dataKey="z" 
                        range={[60, 400]} 
                        name="Error Rate" 
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{ 
                          backgroundColor: '#1E1E1E', 
                          borderColor: '#2D2D2D',
                          color: '#E0E0E0'
                        }}
                        formatter={(value, name) => [value, name]} 
                      />
                      <Legend />
                      <Scatter 
                        name="Performance Correlation" 
                        data={correlationData} 
                        fill="#3DAA9D" 
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div variants={cardVariants}>
              <Card title="Page Load Performance">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={pageLoadData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                      <XAxis type="number" stroke="#9E9E9E" />
                      <YAxis dataKey="page" type="category" stroke="#9E9E9E" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E1E1E', 
                          borderColor: '#2D2D2D',
                          color: '#E0E0E0'
                        }} 
                      />
                      <Legend />
                      <Bar 
                        dataKey="loadTime" 
                        name="Load Time (s)" 
                        fill="#3DAA9D" 
                      />
                      <Bar 
                        dataKey="resourceCount" 
                        name="Resource Count" 
                        fill="#4A0D67" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default PerformanceDashboard;