import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * Mock CrewDemo component for development
 */
export const CrewDemo: React.FC = () => {
  return (
    <Card>
      <Title level={3}>AI Agent Crew System</Title>
      <Paragraph>
        This is a placeholder for the AI Agent Crew System. In production, this would be replaced with the actual CrewDemo component from the @cauldronos/agents package.
      </Paragraph>
    </Card>
  );
};

export default CrewDemo;
