import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Steps, 
  Divider, 
  Space, 
  Tag, 
  Collapse, 
  Spin, 
  Alert,
  Button
} from 'antd';
import { 
  CheckCircleOutlined, 
  SyncOutlined, 
  ClockCircleOutlined, 
  RobotOutlined,
  FileTextOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { CrewConfig, CrewResult } from '../../services/CrewService';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

// Define the types for crew execution props
interface CrewExecutionProps {
  crewConfig: CrewConfig;
  result?: CrewResult;
  isRunning: boolean;
  progress?: number;
  onRerun?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CrewExecution - A component for displaying the execution of an AI agent crew
 */
const CrewExecution: React.FC<CrewExecutionProps> = ({
  crewConfig,
  result,
  isRunning,
  progress = 0,
  onRerun,
  className = '',
  style = {}
}) => {
  // Calculate the current step based on progress
  const currentStep = Math.floor((crewConfig.tasks.length * progress) / 100);

  return (
    <Card 
      className={`crew-execution ${className}`} 
      style={style}
      title={
        <Space>
          <RobotOutlined />
          <span>Crew Execution: {crewConfig.name}</span>
        </Space>
      }
      extra={
        result && (
          <Button 
            icon={<ReloadOutlined />} 
            onClick={onRerun}
          >
            Run Again
          </Button>
        )
      }
    >
      {isRunning ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="Crew Execution in Progress"
            description="The AI agent crew is currently working on your request. This may take a few moments depending on the complexity of the tasks."
            type="info"
            showIcon
          />
          
          <Divider>Progress</Divider>
          
          <Steps current={currentStep} status="process" progressDot>
            {crewConfig.tasks.map((task, index) => {
              const agent = crewConfig.agents.find(a => a.id === task.agentId);
              
              return (
                <Step 
                  key={task.id} 
                  title={task.description}
                  description={agent?.name || task.agentId}
                  status={
                    index < currentStep 
                      ? 'finish' 
                      : index === currentStep 
                        ? 'process' 
                        : 'wait'
                  }
                  icon={
                    index < currentStep 
                      ? <CheckCircleOutlined /> 
                      : index === currentStep 
                        ? <SyncOutlined spin /> 
                        : <ClockCircleOutlined />
                  }
                />
              );
            })}
          </Steps>
          
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Spin size="large" />
            <Paragraph style={{ marginTop: 10 }}>
              Processing... {Math.round(progress)}%
            </Paragraph>
          </div>
        </Space>
      ) : result ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="Crew Execution Complete"
            description={`The AI agent crew has completed all tasks in ${result.executionTime / 1000} seconds.`}
            type="success"
            showIcon
          />
          
          <Divider>Result</Divider>
          
          <Card>
            <Title level={5}>
              <FileTextOutlined /> Final Output
            </Title>
            <Paragraph>
              {result.finalOutput}
            </Paragraph>
          </Card>
          
          <Divider>Task Execution</Divider>
          
          <Steps current={crewConfig.tasks.length} status="finish" direction="vertical">
            {crewConfig.tasks.map((task, index) => {
              const agent = crewConfig.agents.find(a => a.id === task.agentId);
              
              return (
                <Step 
                  key={task.id} 
                  title={task.description}
                  description={
                    <Space direction="vertical">
                      <Text>Agent: {agent?.name || task.agentId}</Text>
                      {task.expectedOutput && (
                        <Text>Expected Output: {task.expectedOutput}</Text>
                      )}
                      <Tag color="success">Completed</Tag>
                    </Space>
                  }
                  icon={<CheckCircleOutlined />}
                />
              );
            })}
          </Steps>
        </Space>
      ) : (
        <Alert
          message="No Execution Data"
          description="Run the crew to see execution results here."
          type="info"
          showIcon
        />
      )}
    </Card>
  );
};

export default CrewExecution;
