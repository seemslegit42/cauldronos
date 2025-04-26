import React from 'react';
import { ModuleComponentProps } from '../types';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs, Typography, Spin } from 'antd';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import UsersDashboard from './components/UsersDashboard';
import TeamsDashboard from './components/TeamsDashboard';
import UserActivityDashboard from './components/UserActivityDashboard';
import { useUsersTeamsStore } from './store/usersTeamsStore';

const { Title } = Typography;
const { TabPane } = Tabs;

// Define the schema for users and teams data
const usersTeamsDataSchema = z.object({
  users: z.array(
    z.object({
      id: z.string(),
      username: z.string(),
      email: z.string().email(),
      role: z.string(),
      status: z.string(),
      lastActive: z.string().optional(),
      createdAt: z.string(),
      teamId: z.string().optional(),
    })
  ),
  teams: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      memberCount: z.number(),
      createdAt: z.string(),
      leaderId: z.string().optional(),
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

const UsersTeamsDashboardModule: React.FC<ModuleComponentProps> = ({ module, workspace }) => {
  const { activeTab, setActiveTab } = useUsersTeamsStore();

  // Fetch users and teams data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['users-teams', workspace.id],
    queryFn: async () => {
      // In a real app, this would be an API call
      // For now, we'll return mock data
      const mockData = {
        users: Array.from({ length: 50 }, (_, i) => ({
          id: `user-${i + 1}`,
          username: `user${i + 1}`,
          email: `user${i + 1}@example.com`,
          role: i < 5 ? 'ADMIN' : i < 15 ? 'MANAGER' : 'USER',
          status: Math.random() > 0.2 ? 'ACTIVE' : 'INACTIVE',
          lastActive: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
          teamId: `team-${Math.floor(Math.random() * 10) + 1}`,
        })),
        teams: Array.from({ length: 10 }, (_, i) => ({
          id: `team-${i + 1}`,
          name: `Team ${i + 1}`,
          description: `This is team ${i + 1}`,
          memberCount: Math.floor(Math.random() * 10) + 2,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
          leaderId: `user-${Math.floor(Math.random() * 5) + 1}`,
        })),
      };
      
      return usersTeamsDataSchema.parse(mockData);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" tip="Loading users and teams data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Title level={4} type="danger">Error loading users and teams data</Title>
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
        className="users-teams-dashboard"
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange} size="large">
          <TabPane tab="Users" key="users">
            <motion.div variants={itemVariants}>
              <UsersDashboard data={data} />
            </motion.div>
          </TabPane>
          <TabPane tab="Teams" key="teams">
            <motion.div variants={itemVariants}>
              <TeamsDashboard data={data} />
            </motion.div>
          </TabPane>
          <TabPane tab="User Activity" key="user-activity">
            <motion.div variants={itemVariants}>
              <UserActivityDashboard data={data} />
            </motion.div>
          </TabPane>
        </Tabs>
      </motion.div>
    </PageContainer>
  );
};

export default UsersTeamsDashboardModule;