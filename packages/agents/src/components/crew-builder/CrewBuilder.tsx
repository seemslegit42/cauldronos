import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Space, 
  Divider, 
  Form, 
  Input, 
  Select, 
  Switch,
  Tabs,
  List,
  Tag,
  Tooltip,
  Modal
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  EditOutlined, 
  SaveOutlined, 
  PlayCircleOutlined, 
  CopyOutlined, 
  ExportOutlined,
  TeamOutlined,
  RobotOutlined,
  ApartmentOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { CrewConfig, CrewTaskConfig } from '../../services/CrewService';
import { AgentConfig } from '../../services/AgentService';
import { AI_MODELS } from '../../config/aiConfig';
import CrewTemplates from '../../crews/CrewTemplates';
import SpecializedAgents from '../../agents/SpecializedAgents';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

// Define the types for crew builder props
interface CrewBuilderProps {
  initialConfig?: CrewConfig;
  onSave?: (config: CrewConfig) => void;
  onRun?: (config: CrewConfig, input: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CrewBuilder - A component for creating and configuring AI agent crews
 */
const CrewBuilder: React.FC<CrewBuilderProps> = ({
  initialConfig,
  onSave,
  onRun,
  className = '',
  style = {}
}) => {
  // State for the crew configuration
  const [crewConfig, setCrewConfig] = useState<CrewConfig>(initialConfig || {
    id: `crew_${Date.now()}`,
    name: 'New Crew',
    description: 'A new AI agent crew',
    agents: [],
    tasks: [],
    process: 'sequential',
    verbose: true
  });

  // State for the current tab
  const [activeTab, setActiveTab] = useState('info');

  // State for the run input
  const [runInput, setRunInput] = useState('');

  // State for the template selection modal
  const [templateModalVisible, setTemplateModalVisible] = useState(false);

  // Form instance
  const [form] = Form.useForm();

  // Handle crew info change
  const handleCrewInfoChange = (values: any) => {
    setCrewConfig(prev => ({
      ...prev,
      name: values.name,
      description: values.description,
      process: values.process,
      verbose: values.verbose
    }));
  };

  // Handle adding an agent
  const handleAddAgent = (agent: AgentConfig) => {
    setCrewConfig(prev => ({
      ...prev,
      agents: [...prev.agents, agent]
    }));
  };

  // Handle removing an agent
  const handleRemoveAgent = (agentId: string) => {
    setCrewConfig(prev => ({
      ...prev,
      agents: prev.agents.filter(agent => agent.id !== agentId)
    }));
  };

  // Handle adding a task
  const handleAddTask = (values: any) => {
    const newTask: CrewTaskConfig = {
      id: `task_${Date.now()}`,
      description: values.description,
      agentId: values.agentId,
      expectedOutput: values.expectedOutput,
      dependencies: values.dependencies || []
    };

    setCrewConfig(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));

    form.resetFields(['description', 'agentId', 'expectedOutput', 'dependencies']);
  };

  // Handle removing a task
  const handleRemoveTask = (taskId: string) => {
    setCrewConfig(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId)
    }));
  };

  // Handle saving the crew
  const handleSaveCrew = () => {
    if (onSave) {
      onSave(crewConfig);
    }
  };

  // Handle running the crew
  const handleRunCrew = () => {
    if (onRun) {
      onRun(crewConfig, runInput);
    }
  };

  // Handle loading a template
  const handleLoadTemplate = (template: CrewConfig) => {
    setCrewConfig({
      ...template,
      id: `crew_${Date.now()}`
    });
    setTemplateModalVisible(false);
  };

  return (
    <Card 
      className={`crew-builder ${className}`} 
      style={style}
      title={
        <Space>
          <TeamOutlined />
          <span>Crew Builder</span>
        </Space>
      }
      extra={
        <Space>
          <Button 
            icon={<SaveOutlined />} 
            onClick={handleSaveCrew}
          >
            Save
          </Button>
          <Button 
            type="primary"
            icon={<PlayCircleOutlined />} 
            onClick={handleRunCrew}
          >
            Run
          </Button>
          <Button
            icon={<CopyOutlined />}
            onClick={() => setTemplateModalVisible(true)}
          >
            Templates
          </Button>
        </Space>
      }
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={
            <span>
              <InfoCircleOutlined />
              Crew Info
            </span>
          } 
          key="info"
        >
          <Form
            layout="vertical"
            initialValues={{
              name: crewConfig.name,
              description: crewConfig.description,
              process: crewConfig.process,
              verbose: crewConfig.verbose
            }}
            onValuesChange={handleCrewInfoChange}
          >
            <Form.Item
              name="name"
              label="Crew Name"
              rules={[{ required: true, message: 'Please enter a crew name' }]}
            >
              <Input placeholder="Enter crew name" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter a description' }]}
            >
              <TextArea 
                placeholder="Enter crew description" 
                rows={3} 
              />
            </Form.Item>

            <Form.Item
              name="process"
              label="Process Type"
              rules={[{ required: true, message: 'Please select a process type' }]}
            >
              <Select placeholder="Select process type">
                <Option value="sequential">Sequential</Option>
                <Option value="hierarchical">Hierarchical</Option>
                <Option value="consensual">Consensual</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="verbose"
              label="Verbose Mode"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <RobotOutlined />
              Agents
            </span>
          } 
          key="agents"
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card size="small" title="Available Agents">
              <List
                size="small"
                dataSource={Object.values(SpecializedAgents)}
                renderItem={agent => (
                  <List.Item
                    actions={[
                      <Button 
                        type="link" 
                        icon={<PlusOutlined />} 
                        onClick={() => handleAddAgent(agent)}
                      >
                        Add
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={agent.name}
                      description={agent.description}
                    />
                  </List.Item>
                )}
              />
            </Card>

            <Divider>Crew Agents</Divider>

            <List
              size="small"
              bordered
              dataSource={crewConfig.agents}
              locale={{ emptyText: 'No agents added yet' }}
              renderItem={agent => (
                <List.Item
                  actions={[
                    <Button 
                      type="link" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => handleRemoveAgent(agent.id)}
                    >
                      Remove
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={agent.name}
                    description={agent.description}
                  />
                </List.Item>
              )}
            />
          </Space>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <ApartmentOutlined />
              Tasks
            </span>
          } 
          key="tasks"
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card size="small" title="Add Task">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleAddTask}
              >
                <Form.Item
                  name="description"
                  label="Task Description"
                  rules={[{ required: true, message: 'Please enter a task description' }]}
                >
                  <Input placeholder="Enter task description" />
                </Form.Item>

                <Form.Item
                  name="agentId"
                  label="Assigned Agent"
                  rules={[{ required: true, message: 'Please select an agent' }]}
                >
                  <Select placeholder="Select agent">
                    {crewConfig.agents.map(agent => (
                      <Option key={agent.id} value={agent.id}>{agent.name}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="expectedOutput"
                  label="Expected Output"
                >
                  <Input placeholder="Enter expected output" />
                </Form.Item>

                <Form.Item
                  name="dependencies"
                  label="Dependencies"
                >
                  <Select
                    mode="multiple"
                    placeholder="Select dependencies"
                    allowClear
                  >
                    {crewConfig.tasks.map(task => (
                      <Option key={task.id} value={task.id}>{task.description}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<PlusOutlined />}
                  >
                    Add Task
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Divider>Crew Tasks</Divider>

            <List
              size="small"
              bordered
              dataSource={crewConfig.tasks}
              locale={{ emptyText: 'No tasks added yet' }}
              renderItem={task => (
                <List.Item
                  actions={[
                    <Button 
                      type="link" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => handleRemoveTask(task.id)}
                    >
                      Remove
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={task.description}
                    description={
                      <Space direction="vertical">
                        <Text type="secondary">
                          Agent: {crewConfig.agents.find(a => a.id === task.agentId)?.name || task.agentId}
                        </Text>
                        {task.expectedOutput && (
                          <Text type="secondary">
                            Expected Output: {task.expectedOutput}
                          </Text>
                        )}
                        {task.dependencies && task.dependencies.length > 0 && (
                          <Space>
                            <Text type="secondary">Dependencies:</Text>
                            {task.dependencies.map(depId => (
                              <Tag key={depId}>
                                {crewConfig.tasks.find(t => t.id === depId)?.description || depId}
                              </Tag>
                            ))}
                          </Space>
                        )}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Space>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <PlayCircleOutlined />
              Run
            </span>
          } 
          key="run"
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Form layout="vertical">
              <Form.Item
                label="Input"
                help="Enter the input for the crew to process"
              >
                <TextArea 
                  rows={4} 
                  placeholder="Enter input for the crew" 
                  value={runInput}
                  onChange={e => setRunInput(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  icon={<PlayCircleOutlined />} 
                  onClick={handleRunCrew}
                  disabled={!runInput.trim() || crewConfig.agents.length === 0 || crewConfig.tasks.length === 0}
                >
                  Run Crew
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </TabPane>
      </Tabs>

      {/* Template Selection Modal */}
      <Modal
        title="Select a Template"
        open={templateModalVisible}
        onCancel={() => setTemplateModalVisible(false)}
        footer={null}
        width={600}
      >
        <List
          dataSource={Object.values(CrewTemplates)}
          renderItem={template => (
            <List.Item
              actions={[
                <Button 
                  type="primary" 
                  onClick={() => handleLoadTemplate(template)}
                >
                  Use Template
                </Button>
              ]}
            >
              <List.Item.Meta
                title={template.name}
                description={template.description}
              />
            </List.Item>
          )}
        />
      </Modal>
    </Card>
  );
};

export default CrewBuilder;
