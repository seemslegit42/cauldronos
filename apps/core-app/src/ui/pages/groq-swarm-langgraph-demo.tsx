import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import GroqSwarmLanggraphDemo from '../ai/GroqSwarmLanggraphDemo';

/**
 * Demo page for Groq Swarm Langgraph integration
 */
const GroqSwarmLanggraphDemoPage: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Groq Swarm Langgraph Demo',
        subTitle: 'Demonstration of Groq Swarm integration with Langgraph',
        ghost: true,
      }}
    >
      <GroqSwarmLanggraphDemo />
    </PageContainer>
  );
};

export default GroqSwarmLanggraphDemoPage;