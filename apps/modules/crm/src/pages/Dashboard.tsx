import React from 'react';
import { Card, Row, Col, Statistic, Table, Progress, Typography, Button } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  ShoppingCartOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { contacts, leads, deals, loading } = useCrmStore();

  // Calculate statistics
  const activeContacts = contacts.filter(c => c.status === 'active').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const totalDealsValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const openDealsValue = deals
    .filter(d => !['closed-won', 'closed-lost'].includes(d.stage))
    .reduce((sum, deal) => sum + deal.value, 0);
  
  // Calculate deal stages
  const dealStages = {
    prospecting: deals.filter(d => d.stage === 'prospecting').length,
    qualification: deals.filter(d => d.stage === 'qualification').length,
    proposal: deals.filter(d => d.stage === 'proposal').length,
    negotiation: deals.filter(d => d.stage === 'negotiation').length,
    'closed-won': deals.filter(d => d.stage === 'closed-won').length,
    'closed-lost': deals.filter(d => d.stage === 'closed-lost').length,
  };

  // Recent deals for table
  const recentDeals = [...deals]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const dealColumns = [
    {
      title: 'Deal',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => (
        <Text className={
          stage === 'closed-won' ? 'text-green-500' : 
          stage === 'closed-lost' ? 'text-red-500' : 
          'text-gray-300'
        }>
          {stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
        </Text>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (probability: number) => (
        <Progress percent={probability} size="small" strokeColor={{
          '0%': '#00B67F',
          '100%': '#00B2C9',
        }} />
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="crm-dashboard"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">CRM Dashboard</Title>
        <Button type="primary" className="bg-[#00B67F] hover:bg-[#00A070]">
          Create New Deal
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Total Contacts</Text>}
                value={contacts.length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<UserOutlined />}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 12%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Active Leads</Text>}
                value={leads.length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<TeamOutlined />}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 5%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Open Deals</Text>}
                value={deals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage)).length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<ShoppingCartOutlined />}
                suffix={
                  <Text className="text-red-500 text-sm">
                    <ArrowDownOutlined /> 2%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Pipeline Value</Text>}
                value={openDealsValue}
                valueStyle={{ color: '#00B2C9' }}
                prefix="$"
                precision={0}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 8%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Deal Pipeline */}
      <motion.div variants={itemVariants}>
        <Card 
          title={<Text className="text-white">Deal Pipeline</Text>} 
          className="mb-6 bg-gray-800 border-gray-700 shadow-lg"
        >
          <Row gutter={[8, 16]} className="deal-pipeline">
            {Object.entries(dealStages).map(([stage, count]) => (
              <Col key={stage} xs={24} sm={12} md={4}>
                <Card 
                  className={`text-center h-full border-l-4 ${
                    stage === 'closed-won' ? 'border-l-green-500' : 
                    stage === 'closed-lost' ? 'border-l-red-500' : 
                    'border-l-blue-500'
                  } bg-gray-900 border-gray-700`}
                >
                  <Statistic
                    title={
                      <Text className="text-gray-400">
                        {stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                      </Text>
                    }
                    value={count}
                    valueStyle={{ color: '#fff' }}
                  />
                  {stage !== 'closed-lost' && stage !== 'closed-won' && (
                    <Text className="text-gray-400 block mt-2">
                      {count > 0 
                        ? `$${deals.filter(d => d.stage === stage).reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}`
                        : '$0'
                      }
                    </Text>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </motion.div>

      {/* Recent Deals */}
      <motion.div variants={itemVariants}>
        <Card 
          title={<Text className="text-white">Recent Deals</Text>} 
          className="mb-6 bg-gray-800 border-gray-700 shadow-lg"
        >
          <Table
            dataSource={recentDeals}
            columns={dealColumns}
            rowKey="id"
            pagination={false}
            loading={loading}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;import React from 'react';
import { Card, Row, Col, Statistic, Table, Progress, Typography, Button } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  ShoppingCartOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { contacts, leads, deals, loading } = useCrmStore();

  // Calculate statistics
  const activeContacts = contacts.filter(c => c.status === 'active').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const totalDealsValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const openDealsValue = deals
    .filter(d => !['closed-won', 'closed-lost'].includes(d.stage))
    .reduce((sum, deal) => sum + deal.value, 0);
  
  // Calculate deal stages
  const dealStages = {
    prospecting: deals.filter(d => d.stage === 'prospecting').length,
    qualification: deals.filter(d => d.stage === 'qualification').length,
    proposal: deals.filter(d => d.stage === 'proposal').length,
    negotiation: deals.filter(d => d.stage === 'negotiation').length,
    'closed-won': deals.filter(d => d.stage === 'closed-won').length,
    'closed-lost': deals.filter(d => d.stage === 'closed-lost').length,
  };

  // Recent deals for table
  const recentDeals = [...deals]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const dealColumns = [
    {
      title: 'Deal',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => (
        <Text className={
          stage === 'closed-won' ? 'text-green-500' : 
          stage === 'closed-lost' ? 'text-red-500' : 
          'text-gray-300'
        }>
          {stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
        </Text>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (probability: number) => (
        <Progress percent={probability} size="small" strokeColor={{
          '0%': '#00B67F',
          '100%': '#00B2C9',
        }} />
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="crm-dashboard"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">CRM Dashboard</Title>
        <Button type="primary" className="bg-[#00B67F] hover:bg-[#00A070]">
          Create New Deal
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Total Contacts</Text>}
                value={contacts.length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<UserOutlined />}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 12%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Active Leads</Text>}
                value={leads.length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<TeamOutlined />}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 5%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Open Deals</Text>}
                value={deals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage)).length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<ShoppingCartOutlined />}
                suffix={
                  <Text className="text-red-500 text-sm">
                    <ArrowDownOutlined /> 2%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Pipeline Value</Text>}
                value={openDealsValue}
                valueStyle={{ color: '#00B2C9' }}
                prefix="$"
                precision={0}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 8%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Deal Pipeline */}
      <motion.div variants={itemVariants}>
        <Card 
          title={<Text className="text-white">Deal Pipeline</Text>} 
          className="mb-6 bg-gray-800 border-gray-700 shadow-lg"
        >
          <Row gutter={[8, 16]} className="deal-pipeline">
            {Object.entries(dealStages).map(([stage, count]) => (
              <Col key={stage} xs={24} sm={12} md={4}>
                <Card 
                  className={`text-center h-full border-l-4 ${
                    stage === 'closed-won' ? 'border-l-green-500' : 
                    stage === 'closed-lost' ? 'border-l-red-500' : 
                    'border-l-blue-500'
                  } bg-gray-900 border-gray-700`}
                >
                  <Statistic
                    title={
                      <Text className="text-gray-400">
                        {stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                      </Text>
                    }
                    value={count}
                    valueStyle={{ color: '#fff' }}
                  />
                  {stage !== 'closed-lost' && stage !== 'closed-won' && (
                    <Text className="text-gray-400 block mt-2">
                      {count > 0 
                        ? `$${deals.filter(d => d.stage === stage).reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}`
                        : '$0'
                      }
                    </Text>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </motion.div>

      {/* Recent Deals */}
      <motion.div variants={itemVariants}>
        <Card 
          title={<Text className="text-white">Recent Deals</Text>} 
          className="mb-6 bg-gray-800 border-gray-700 shadow-lg"
        >
          <Table
            dataSource={recentDeals}
            columns={dealColumns}
            rowKey="id"
            pagination={false}
            loading={loading}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;import React from 'react';
import { Card, Row, Col, Statistic, Table, Progress, Typography, Button } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  ShoppingCartOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { contacts, leads, deals, loading } = useCrmStore();

  // Calculate statistics
  const activeContacts = contacts.filter(c => c.status === 'active').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const totalDealsValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const openDealsValue = deals
    .filter(d => !['closed-won', 'closed-lost'].includes(d.stage))
    .reduce((sum, deal) => sum + deal.value, 0);
  
  // Calculate deal stages
  const dealStages = {
    prospecting: deals.filter(d => d.stage === 'prospecting').length,
    qualification: deals.filter(d => d.stage === 'qualification').length,
    proposal: deals.filter(d => d.stage === 'proposal').length,
    negotiation: deals.filter(d => d.stage === 'negotiation').length,
    'closed-won': deals.filter(d => d.stage === 'closed-won').length,
    'closed-lost': deals.filter(d => d.stage === 'closed-lost').length,
  };

  // Recent deals for table
  const recentDeals = [...deals]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const dealColumns = [
    {
      title: 'Deal',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => (
        <Text className={
          stage === 'closed-won' ? 'text-green-500' : 
          stage === 'closed-lost' ? 'text-red-500' : 
          'text-gray-300'
        }>
          {stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
        </Text>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (probability: number) => (
        <Progress percent={probability} size="small" strokeColor={{
          '0%': '#00B67F',
          '100%': '#00B2C9',
        }} />
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="crm-dashboard"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">CRM Dashboard</Title>
        <Button type="primary" className="bg-[#00B67F] hover:bg-[#00A070]">
          Create New Deal
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Total Contacts</Text>}
                value={contacts.length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<UserOutlined />}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 12%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Active Leads</Text>}
                value={leads.length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<TeamOutlined />}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 5%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Open Deals</Text>}
                value={deals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage)).length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<ShoppingCartOutlined />}
                suffix={
                  <Text className="text-red-500 text-sm">
                    <ArrowDownOutlined /> 2%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Pipeline Value</Text>}
                value={openDealsValue}
                valueStyle={{ color: '#00B2C9' }}
                prefix="$"
                precision={0}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 8%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Deal Pipeline */}
      <motion.div variants={itemVariants}>
        <Card 
          title={<Text className="text-white">Deal Pipeline</Text>} 
          className="mb-6 bg-gray-800 border-gray-700 shadow-lg"
        >
          <Row gutter={[8, 16]} className="deal-pipeline">
            {Object.entries(dealStages).map(([stage, count]) => (
              <Col key={stage} xs={24} sm={12} md={4}>
                <Card 
                  className={`text-center h-full border-l-4 ${
                    stage === 'closed-won' ? 'border-l-green-500' : 
                    stage === 'closed-lost' ? 'border-l-red-500' : 
                    'border-l-blue-500'
                  } bg-gray-900 border-gray-700`}
                >
                  <Statistic
                    title={
                      <Text className="text-gray-400">
                        {stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                      </Text>
                    }
                    value={count}
                    valueStyle={{ color: '#fff' }}
                  />
                  {stage !== 'closed-lost' && stage !== 'closed-won' && (
                    <Text className="text-gray-400 block mt-2">
                      {count > 0 
                        ? `$${deals.filter(d => d.stage === stage).reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}`
                        : '$0'
                      }
                    </Text>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </motion.div>

      {/* Recent Deals */}
      <motion.div variants={itemVariants}>
        <Card 
          title={<Text className="text-white">Recent Deals</Text>} 
          className="mb-6 bg-gray-800 border-gray-700 shadow-lg"
        >
          <Table
            dataSource={recentDeals}
            columns={dealColumns}
            rowKey="id"
            pagination={false}
            loading={loading}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;import React from 'react';
import { Card, Row, Col, Statistic, Table, Progress, Typography, Button } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  ShoppingCartOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined 
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useCrmStore } from '../store/crmStore';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { contacts, leads, deals, loading } = useCrmStore();

  // Calculate statistics
  const activeContacts = contacts.filter(c => c.status === 'active').length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const totalDealsValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const openDealsValue = deals
    .filter(d => !['closed-won', 'closed-lost'].includes(d.stage))
    .reduce((sum, deal) => sum + deal.value, 0);
  
  // Calculate deal stages
  const dealStages = {
    prospecting: deals.filter(d => d.stage === 'prospecting').length,
    qualification: deals.filter(d => d.stage === 'qualification').length,
    proposal: deals.filter(d => d.stage === 'proposal').length,
    negotiation: deals.filter(d => d.stage === 'negotiation').length,
    'closed-won': deals.filter(d => d.stage === 'closed-won').length,
    'closed-lost': deals.filter(d => d.stage === 'closed-lost').length,
  };

  // Recent deals for table
  const recentDeals = [...deals]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const dealColumns = [
    {
      title: 'Deal',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => (
        <Text className={
          stage === 'closed-won' ? 'text-green-500' : 
          stage === 'closed-lost' ? 'text-red-500' : 
          'text-gray-300'
        }>
          {stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
        </Text>
      ),
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (probability: number) => (
        <Progress percent={probability} size="small" strokeColor={{
          '0%': '#00B67F',
          '100%': '#00B2C9',
        }} />
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="crm-dashboard"
    >
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="text-white m-0">CRM Dashboard</Title>
        <Button type="primary" className="bg-[#00B67F] hover:bg-[#00A070]">
          Create New Deal
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Total Contacts</Text>}
                value={contacts.length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<UserOutlined />}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 12%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Active Leads</Text>}
                value={leads.length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<TeamOutlined />}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 5%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Open Deals</Text>}
                value={deals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage)).length}
                valueStyle={{ color: '#00B2C9' }}
                prefix={<ShoppingCartOutlined />}
                suffix={
                  <Text className="text-red-500 text-sm">
                    <ArrowDownOutlined /> 2%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <Statistic
                title={<Text className="text-gray-400">Pipeline Value</Text>}
                value={openDealsValue}
                valueStyle={{ color: '#00B2C9' }}
                prefix="$"
                precision={0}
                suffix={
                  <Text className="text-green-500 text-sm">
                    <ArrowUpOutlined /> 8%
                  </Text>
                }
              />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Deal Pipeline */}
      <motion.div variants={itemVariants}>
        <Card 
          title={<Text className="text-white">Deal Pipeline</Text>} 
          className="mb-6 bg-gray-800 border-gray-700 shadow-lg"
        >
          <Row gutter={[8, 16]} className="deal-pipeline">
            {Object.entries(dealStages).map(([stage, count]) => (
              <Col key={stage} xs={24} sm={12} md={4}>
                <Card 
                  className={`text-center h-full border-l-4 ${
                    stage === 'closed-won' ? 'border-l-green-500' : 
                    stage === 'closed-lost' ? 'border-l-red-500' : 
                    'border-l-blue-500'
                  } bg-gray-900 border-gray-700`}
                >
                  <Statistic
                    title={
                      <Text className="text-gray-400">
                        {stage.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                      </Text>
                    }
                    value={count}
                    valueStyle={{ color: '#fff' }}
                  />
                  {stage !== 'closed-lost' && stage !== 'closed-won' && (
                    <Text className="text-gray-400 block mt-2">
                      {count > 0 
                        ? `$${deals.filter(d => d.stage === stage).reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}`
                        : '$0'
                      }
                    </Text>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </motion.div>

      {/* Recent Deals */}
      <motion.div variants={itemVariants}>
        <Card 
          title={<Text className="text-white">Recent Deals</Text>} 
          className="mb-6 bg-gray-800 border-gray-700 shadow-lg"
        >
          <Table
            dataSource={recentDeals}
            columns={dealColumns}
            rowKey="id"
            pagination={false}
            loading={loading}
            className="bg-gray-900"
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;