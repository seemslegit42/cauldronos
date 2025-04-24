import React from 'react';
import { Row, Col, Card, Statistic, DatePicker, Space, Divider } from 'antd';
import { motion } from 'framer-motion';
import { 
  UserOutlined, 
  EyeOutlined, 
  RiseOutlined, 
  TeamOutlined 
} from '@ant-design/icons';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAnalyticsStore } from '../store/analyticsStore';

const { RangePicker } = DatePicker;

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

// Colors from the CauldronOS style guide
const COLORS = [
  '#3DAA9D', // Flux Aqua
  '#4A0D67', // Void Purple
  '#B8860B', // Alchemy Gold
  '#6A2D87', // Void Purple Light
  '#5DCABD', // Flux Aqua Light
  '#D8A62B', // Alchemy Gold Light
];

const OverviewDashboard = ({ data }: any) => {
  const { dateRange, setDateRange } = useAnalyticsStore();

  // Format data for charts
  const formatWeeklyData = () => {
    return data.weeklyStats.map((day: any) => ({
      date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      pageViews: day.totalPageViews,
      visitors: day.uniqueVisitors,
      newUsers: day.newUsers,
    })).reverse();
  };

  const formatSourceData = () => {
    const sources = data.dailyStats.sources.map((source: any) => ({
      name: source.name,
      value: source.count,
    }));
    return sources;
  };

  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setDateRange([dates[0].toDate(), dates[1].toDate()]);
    }
  };

  // Calculate totals
  const totalPageViews = data.weeklyStats.reduce((sum: number, day: any) => sum + day.totalPageViews, 0);
  const totalVisitors = data.weeklyStats.reduce((sum: number, day: any) => sum + day.uniqueVisitors, 0);
  const totalNewUsers = data.weeklyStats.reduce((sum: number, day: any) => sum + day.newUsers, 0);
  const conversionRate = totalVisitors > 0 ? (totalNewUsers / totalVisitors * 100).toFixed(2) : 0;

  const weeklyData = formatWeeklyData();
  const sourceData = formatSourceData();

  return (
    <div className="overview-dashboard">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col>
            <h2>Analytics Overview</h2>
          </Col>
          <Col>
            <RangePicker 
              value={[
                dateRange[0] ? dateRange[0] : null, 
                dateRange[1] ? dateRange[1] : null
              ]} 
              onChange={handleDateRangeChange} 
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <motion.div variants={cardVariants}>
              <Card>
                <Statistic 
                  title="Total Page Views" 
                  value={totalPageViews} 
                  prefix={<EyeOutlined />} 
                  valueStyle={{ color: '#3DAA9D' }} 
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <motion.div variants={cardVariants}>
              <Card>
                <Statistic 
                  title="Unique Visitors" 
                  value={totalVisitors} 
                  prefix={<UserOutlined />} 
                  valueStyle={{ color: '#4A0D67' }} 
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <motion.div variants={cardVariants}>
              <Card>
                <Statistic 
                  title="New Users" 
                  value={totalNewUsers} 
                  prefix={<TeamOutlined />} 
                  valueStyle={{ color: '#B8860B' }} 
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <motion.div variants={cardVariants}>
              <Card>
                <Statistic 
                  title="Conversion Rate" 
                  value={conversionRate} 
                  suffix="%" 
                  prefix={<RiseOutlined />} 
                  valueStyle={{ color: '#5DCABD' }} 
                />
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <motion.div variants={cardVariants}>
              <Card title="Traffic Overview">
                <div style={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={weeklyData}
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
                        dataKey="pageViews" 
                        name="Page Views"
                        stroke="#3DAA9D" 
                        fill="#3DAA9D" 
                        fillOpacity={0.3} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="visitors" 
                        name="Visitors"
                        stroke="#4A0D67" 
                        fill="#4A0D67" 
                        fillOpacity={0.3} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="newUsers" 
                        name="New Users"
                        stroke="#B8860B" 
                        fill="#B8860B" 
                        fillOpacity={0.3} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} lg={8}>
            <motion.div variants={cardVariants}>
              <Card title="Traffic Sources">
                <div style={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {sourceData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E1E1E', 
                          borderColor: '#2D2D2D',
                          color: '#E0E0E0'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <motion.div variants={cardVariants}>
              <Card title="Daily Metrics">
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                      <Bar dataKey="pageViews" name="Page Views" fill="#3DAA9D" />
                      <Bar dataKey="visitors" name="Visitors" fill="#4A0D67" />
                      <Bar dataKey="newUsers" name="New Users" fill="#B8860B" />
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

export default OverviewDashboard;