import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { CrewDemo } from '../../components/CrewDemo';

/**
 * CrewDemoPage - A page for demonstrating the AI agent crew system
 */
const CrewDemoPage: React.FC = () => {
  return (
    <PageContainer
      title="AI Agent Crew System"
      subTitle="Create and orchestrate specialized AI agent crews"
    >
      <CrewDemo />
    </PageContainer>
  );
};

export default CrewDemoPage;
