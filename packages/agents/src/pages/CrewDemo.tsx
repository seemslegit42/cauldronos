import React, { useState } from 'react';
import { 
  Typography, 
  Layout, 
  Card, 
  Space, 
  Divider, 
  Alert, 
  Row, 
  Col,
  Tabs,
  Button,
  message
} from 'antd';
import { 
  TeamOutlined, 
  RobotOutlined, 
  ApartmentOutlined,
  PlayCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import CrewBuilder from '../components/crew-builder/CrewBuilder';
import CrewExecution from '../components/crew-builder/CrewExecution';
import CrewService, { CrewConfig, CrewResult } from '../services/CrewService';
import CrewTemplates from '../crews/CrewTemplates';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

/**
 * CrewDemo - A demo page for the AI agent crew system
 */
const CrewDemo: React.FC = () => {
  // State for the current crew configuration
  const [crewConfig, setCrewConfig] = useState<CrewConfig>(CrewTemplates.ContentCreationCrew);
  
  // State for the execution result
  const [executionResult, setExecutionResult] = useState<CrewResult | undefined>(undefined);
  
  // State for the execution status
  const [isRunning, setIsRunning] = useState(false);
  
  // State for the execution progress
  const [progress, setProgress] = useState(0);

  // Handle saving a crew configuration
  const handleSaveCrew = (config: CrewConfig) => {
    setCrewConfig(config);
    message.success('Crew configuration saved');
  };

  // Handle running a crew
  const handleRunCrew = async (config: CrewConfig, input: string) => {
    try {
      setIsRunning(true);
      setProgress(0);
      setExecutionResult(undefined);
      
      // Create progress updater
      const updateProgress = () => {
        setProgress(prev => {
          const newProgress = prev + (100 - prev) * 0.1;
          return newProgress > 95 ? 95 : newProgress;
        });
      };
      
      // Start progress updates
      const progressInterval = setInterval(updateProgress, 1000);
      
      // Run the crew
      const result = await CrewService.runCrew(config.id, input);
      
      // Stop progress updates
      clearInterval(progressInterval);
      setProgress(100);
      
      // Set the result
      setExecutionResult(result);
    } catch (error) {
      message.error('Error running crew: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Card>
            <Title level={2}>
              <TeamOutlined /> AI Agent Crew System
            </Title>
            <Paragraph>
              This demo showcases a simple crew system with specialized AI agents working together to complete tasks.
              You can create and configure crews, assign tasks to agents, and run the crews to see them in action.
            </Paragraph>
            <Alert
              message="How It Works"
              description={
                <ul>
                  <li>Each crew consists of multiple specialized AI agents with different capabilities</li>
                  <li>Tasks are assigned to specific agents and can depend on other tasks</li>
                  <li>Crews can work in sequential, hierarchical, or consensual processes</li>
                  <li>The system uses CrewAI and Groq for orchestrating the agents</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </Card>

          <Row gutter={24}>
            <Col xs={24} lg={12}>
              <CrewBuilder
                initialConfig={crewConfig}
                onSave={handleSaveCrew}
                onRun={handleRunCrew}
              />
            </Col>
            <Col xs={24} lg={12}>
              <CrewExecution
                crewConfig={crewConfig}
                result={executionResult}
                isRunning={isRunning}
                progress={progress}
                onRerun={() => handleRunCrew(crewConfig, 'Please run the crew again with the same input.')}
              />
            </Col>
          </Row>

          <Card title="Available Crew Templates">
            <Tabs defaultActiveKey="content">
              <TabPane 
                tab={
                  <span>
                    <FileTextOutlined />
                    Content Creation
                  </span>
                } 
                key="content"
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Title level={4}>{CrewTemplates.ContentCreationCrew.name}</Title>
                  <Paragraph>{CrewTemplates.ContentCreationCrew.description}</Paragraph>
                  <Divider>Agents</Divider>
                  <Row gutter={[16, 16]}>
                    {CrewTemplates.ContentCreationCrew.agents.map(agent => (
                      <Col xs={24} md={8} key={agent.id}>
                        <Card size="small" title={agent.name}>
                          <Paragraph>{agent.description}</Paragraph>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Divider>Tasks</Divider>
                  <Row gutter={[16, 16]}>
                    {CrewTemplates.ContentCreationCrew.tasks.map(task => (
                      <Col xs={24} key={task.id}>
                        <Card size="small" title={task.description}>
                          <Paragraph>
                            <Text strong>Agent: </Text>
                            {CrewTemplates.ContentCreationCrew.agents.find(a => a.id === task.agentId)?.name || task.agentId}
                          </Paragraph>
                          {task.expectedOutput && (
                            <Paragraph>
                              <Text strong>Expected Output: </Text>
                              {task.expectedOutput}
                            </Paragraph>
                          )}
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    onClick={() => {
                      setCrewConfig(CrewTemplates.ContentCreationCrew);
                      message.success('Content Creation Crew template loaded');
                    }}
                  >
                    Use This Template
                  </Button>
                </Space>
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <BarChartOutlined />
                    Data Analysis
                  </span>
                } 
                key="data"
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Title level={4}>{CrewTemplates.DataAnalysisCrew.name}</Title>
                  <Paragraph>{CrewTemplates.DataAnalysisCrew.description}</Paragraph>
                  <Divider>Agents</Divider>
                  <Row gutter={[16, 16]}>
                    {CrewTemplates.DataAnalysisCrew.agents.map(agent => (
                      <Col xs={24} md={8} key={agent.id}>
                        <Card size="small" title={agent.name}>
                          <Paragraph>{agent.description}</Paragraph>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Divider>Tasks</Divider>
                  <Row gutter={[16, 16]}>
                    {CrewTemplates.DataAnalysisCrew.tasks.map(task => (
                      <Col xs={24} key={task.id}>
                        <Card size="small" title={task.description}>
                          <Paragraph>
                            <Text strong>Agent: </Text>
                            {CrewTemplates.DataAnalysisCrew.agents.find(a => a.id === task.agentId)?.name || task.agentId}
                          </Paragraph>
                          {task.expectedOutput && (
                            <Paragraph>
                              <Text strong>Expected Output: </Text>
                              {task.expectedOutput}
                            </Paragraph>
                          )}
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    onClick={() => {
                      setCrewConfig(CrewTemplates.DataAnalysisCrew);
                      message.success('Data Analysis Crew template loaded');
                    }}
                  >
                    Use This Template
                  </Button>
                </Space>
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <BulbOutlined />
                    Problem Solving
                  </span>
                } 
                key="problem"
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Title level={4}>{CrewTemplates.ProblemSolvingCrew.name}</Title>
                  <Paragraph>{CrewTemplates.ProblemSolvingCrew.description}</Paragraph>
                  <Divider>Agents</Divider>
                  <Row gutter={[16, 16]}>
                    {CrewTemplates.ProblemSolvingCrew.agents.map(agent => (
                      <Col xs={24} md={8} key={agent.id}>
                        <Card size="small" title={agent.name}>
                          <Paragraph>{agent.description}</Paragraph>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Divider>Tasks</Divider>
                  <Row gutter={[16, 16]}>
                    {CrewTemplates.ProblemSolvingCrew.tasks.map(task => (
                      <Col xs={24} key={task.id}>
                        <Card size="small" title={task.description}>
                          <Paragraph>
                            <Text strong>Agent: </Text>
                            {CrewTemplates.ProblemSolvingCrew.agents.find(a => a.id === task.agentId)?.name || task.agentId}
                          </Paragraph>
                          {task.expectedOutput && (
                            <Paragraph>
                              <Text strong>Expected Output: </Text>
                              {task.expectedOutput}
                            </Paragraph>
                          )}
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    onClick={() => {
                      setCrewConfig(CrewTemplates.ProblemSolvingCrew);
                      message.success('Problem Solving Crew template loaded');
                    }}
                  >
                    Use This Template
                  </Button>
                </Space>
              </TabPane>
            </Tabs>
          </Card>
        </Space>
      </Content>
    </Layout>
  );
};

export default CrewDemo;
