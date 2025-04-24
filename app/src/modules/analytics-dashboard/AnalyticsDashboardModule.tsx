import React from 'react';
import { ModuleComponentProps } from '../types';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs, Typography, Spin } from 'antd';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import OverviewDashboard from './components/OverviewDashboard';
import UserActivityDashboard from './components/UserActivityDashboard';
import PerformanceDashboard from './components/PerformanceDashboard';
import { useAnalyticsStore } from './store/analyticsStore';

const { Title } = Typography;
const { TabPane } = Tabs;

// Define the schema for analytics data
const analyticsDataSchema = z.object({
  dailyStats: z.object({
    id: z.string(),
    date: z.string(),
    totalPageViews: z.number(),
    uniqueVisitors: z.number(),
    newUsers: z.number(),
    totalUsers: z.number(),
    sources: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        count: z.number(),
      })
    ),
  }),
  weeklyStats: z.array(
    z.object({
      id: z.string(),
      date: z.string(),
      totalPageViews: z.number(),
      uniqueVisitors: z.number(),
      newUsers: z.number(),
      totalUsers: z.number(),
      sources: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          count: z.number(),
        })
      ),
    })
  ),
});

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const AnalyticsDashboardModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const { activeTab, setActiveTab } = useAnalyticsStore();

  // Fetch analytics data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['analytics', workspace.id],
    queryFn: async () => {
      const response = await fetch(`/api/analytics/stats?workspaceId=${workspace.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      const data = await response.json();
      return analyticsDataSchema.parse(data);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" tip="Loading analytics data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Title level={4} type="danger">Error loading analytics data</Title>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <PageContainer
      title={
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title level={3}>{module.name}</Title>
        </motion.div>
      }
      subTitle={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {module.description}
        </motion.div>
      }
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="analytics-dashboard"
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange} size="large">
          <TabPane tab="Overview" key="overview">
            <motion.div variants={itemVariants}>
              <OverviewDashboard data={data} />
            </motion.div>
          </TabPane>
          <TabPane tab="User Activity" key="user-activity">
            <motion.div variants={itemVariants}>
              <UserActivityDashboard data={data} />
            </motion.div>
          </TabPane>
          <TabPane tab="Performance" key="performance">
            <motion.div variants={itemVariants}>
              <PerformanceDashboard data={data} />
            </motion.div>
          </TabPane>
        </Tabs>
      </motion.div>
    </PageContainer>
  );
};

export default AnalyticsDashboardModule;