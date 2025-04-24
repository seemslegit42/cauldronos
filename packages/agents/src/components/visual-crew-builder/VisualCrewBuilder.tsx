import React, { useState, useRef, useEffect } from 'react';
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
  Modal,
  Drawer,
  Steps,
  message,
  Collapse,
  Badge
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
  InfoCircleOutlined,
  CodeOutlined,
  ApiOutlined,
  SettingOutlined,
  BranchesOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  addEdge, 
  Node, 
  Edge, 
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import { CrewConfig, CrewTaskConfig } from '../../services/CrewService';
import { AgentConfig } from '../../services/AgentService';
import { AI_MODELS, SYSTEM_PROMPTS } from '../../config/aiConfig';
import CrewTemplates from '../../crews/CrewTemplates';
import SpecializedAgents from '../../agents/SpecializedAgents';
import AgentNode from './nodes/AgentNode';
import TaskNode from './nodes/TaskNode';
import ToolNode from './nodes/ToolNode';
import './VisualCrewBuilder.css';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Step } = Steps;
const { Panel } = Collapse;

// Define the node types for ReactFlow
const nodeTypes = {
  agentNode: AgentNode,
  taskNode: TaskNode,
  toolNode: ToolNode
};

// Define the types for visual crew builder props
interface VisualCrewBuilderProps {
  initialConfig?: CrewConfig;
  onSave?: (config: CrewConfig) => void;
  onRun?: (config: CrewConfig, input: string) => void;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * VisualCrewBuilder - A visual editor for creating and configuring AI agent crews
 * Enhanced with ReactFlow for visual workflow editing
 */
const VisualCrewBuilder: React.FC<VisualCrewBuilderProps> = ({
  initialConfig,
  onSave,
  onRun,
  readOnly = false,
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

  // State for ReactFlow nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // State for the current tab
  const [activeTab, setActiveTab] = useState('visual');

  // State for the run input
  const [runInput, setRunInput] = useState('');

  // State for the template selection modal
  const [templateModalVisible, setTemplateModalVisible] = useState(false);

  // State for the agent drawer
  const [agentDrawerVisible, setAgentDrawerVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentConfig | null>(null);

  // State for the task drawer
  const [taskDrawerVisible, setTaskDrawerVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CrewTaskConfig | null>(null);

  // State for the run modal
  const [runModalVisible, setRunModalVisible] = useState(false);

  // State for the wizard
  const [wizardVisible, setWizardVisible] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);

  // Form instances
  const [agentForm] = Form.useForm();
  const [taskForm] = Form.useForm();
  const [crewForm] = Form.useForm();

  // Ref for the flow container
  const flowRef = useRef(null);

  // Effect to initialize the flow with the crew configuration
  useEffect(() => {
    if (initialConfig) {
      setCrewConfig(initialConfig);
      initializeFlow(initialConfig);
    }
  }, [initialConfig]);

  // Initialize the flow with the crew configuration
  const initializeFlow = (config: CrewConfig) => {
    // Create nodes for agents
    const agentNodes = config.agents.map((agent, index) => ({
      id: agent.id,
      type: 'agentNode',
      position: { x: 100, y: 100 + index * 150 },
      data: { agent, onEdit: () => handleEditAgent(agent) }
    }));

    // Create nodes for tasks
    const taskNodes = config.tasks.map((task, index) => {
      const agent = config.agents.find(a => a.id === task.agentId);
      return {
        id: task.id,
        type: 'taskNode',
        position: { x: 400, y: 100 + index * 150 },
        data: { 
          task, 
          agent, 
          onEdit: () => handleEditTask(task) 
        }
      };
    });

    // Create edges for task dependencies
    const taskEdges = config.tasks.flatMap(task => {
      if (!task.dependencies || task.dependencies.length === 0) {
        return [];
      }
      
      return task.dependencies.map(depId => ({
        id: `${depId}-${task.id}`,
        source: depId,
        target: task.id,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }));
    });

    // Create edges for agent-task assignments
    const agentTaskEdges = config.tasks.map(task => ({
      id: `${task.agentId}-${task.id}`,
      source: task.agentId,
      target: task.id,
      type: 'smoothstep',
      style: { stroke: '#1890ff', strokeDasharray: '5 5' },
      animated: false,
    }));

    // Set nodes and edges
    setNodes([...agentNodes, ...taskNodes]);
    setEdges([...taskEdges, ...agentTaskEdges]);
  };

  // Handle connection between nodes
  const onConnect = (connection: Connection) => {
    // Add edge to the flow
    setEdges(eds => addEdge({
      ...connection,
      type: 'smoothstep',
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }, eds));

    // Update task dependencies
    if (connection.source && connection.target) {
      const updatedTasks = [...crewConfig.tasks];
      const targetTaskIndex = updatedTasks.findIndex(t => t.id === connection.target);
      
      if (targetTaskIndex >= 0) {
        const targetTask = updatedTasks[targetTaskIndex];
        const dependencies = targetTask.dependencies || [];
        
        if (!dependencies.includes(connection.source)) {
          updatedTasks[targetTaskIndex] = {
            ...targetTask,
            dependencies: [...dependencies, connection.source]
          };
          
          setCrewConfig({
            ...crewConfig,
            tasks: updatedTasks
          });
        }
      }
    }
  };

  // Handle adding an agent
  const handleAddAgent = () => {
    const newAgent: AgentConfig = {
      id: `agent_${Date.now()}`,
      name: '',
      description: '',
      systemPrompt: '',
      model: AI_MODELS.groq.llama3_70b,
      tools: []
    };
    
    setSelectedAgent(newAgent);
    agentForm.resetFields();
    setAgentDrawerVisible(true);
  };

  // Handle editing an agent
  const handleEditAgent = (agent: AgentConfig) => {
    setSelectedAgent(agent);
    agentForm.setFieldsValue(agent);
    setAgentDrawerVisible(true);
  };

  // Handle saving an agent
  const handleSaveAgent = (values: any) => {
    if (!selectedAgent) return;
    
    const updatedAgent = {
      ...selectedAgent,
      ...values
    };
    
    const updatedAgents = [...crewConfig.agents];
    const existingIndex = updatedAgents.findIndex(a => a.id === updatedAgent.id);
    
    if (existingIndex >= 0) {
      updatedAgents[existingIndex] = updatedAgent;
    } else {
      updatedAgents.push(updatedAgent);
      
      // Add node to the flow
      const newNode = {
        id: updatedAgent.id,
        type: 'agentNode',
        position: { 
          x: 100, 
          y: 100 + (updatedAgents.length - 1) * 150 
        },
        data: { 
          agent: updatedAgent, 
          onEdit: () => handleEditAgent(updatedAgent) 
        }
      };
      
      setNodes(nds => [...nds, newNode]);
    }
    
    setCrewConfig({
      ...crewConfig,
      agents: updatedAgents
    });
    
    setAgentDrawerVisible(false);
    message.success(`Agent "${updatedAgent.name}" saved successfully`);
  };

  // Handle deleting an agent
  const handleDeleteAgent = (agentId: string) => {
    // Check if the agent is used in any tasks
    const isUsed = crewConfig.tasks.some(task => task.agentId === agentId);
    
    if (isUsed) {
      Modal.confirm({
        title: 'Cannot Delete Agent',
        content: 'This agent is used in one or more tasks. Please remove those tasks first.',
        okText: 'OK',
        cancelButtonProps: { style: { display: 'none' } }
      });
      return;
    }
    
    // Remove the agent
    setCrewConfig({
      ...crewConfig,
      agents: crewConfig.agents.filter(agent => agent.id !== agentId)
    });
    
    // Remove the node from the flow
    setNodes(nds => nds.filter(node => node.id !== agentId));
    
    message.success('Agent deleted successfully');
  };

  // Handle adding a task
  const handleAddTask = () => {
    if (crewConfig.agents.length === 0) {
      Modal.confirm({
        title: 'No Agents Available',
        content: 'You need to create at least one agent before adding tasks.',
        okText: 'Add Agent',
        cancelText: 'Cancel',
        onOk: handleAddAgent
      });
      return;
    }
    
    const newTask: CrewTaskConfig = {
      id: `task_${Date.now()}`,
      description: '',
      agentId: crewConfig.agents[0].id,
      expectedOutput: '',
      dependencies: []
    };
    
    setSelectedTask(newTask);
    taskForm.resetFields();
    taskForm.setFieldsValue({
      agentId: crewConfig.agents[0].id
    });
    setTaskDrawerVisible(true);
  };

  // Handle editing a task
  const handleEditTask = (task: CrewTaskConfig) => {
    setSelectedTask(task);
    taskForm.setFieldsValue(task);
    setTaskDrawerVisible(true);
  };

  // Handle saving a task
  const handleSaveTask = (values: any) => {
    if (!selectedTask) return;
    
    const updatedTask = {
      ...selectedTask,
      ...values
    };
    
    const updatedTasks = [...crewConfig.tasks];
    const existingIndex = updatedTasks.findIndex(t => t.id === updatedTask.id);
    
    if (existingIndex >= 0) {
      updatedTasks[existingIndex] = updatedTask;
      
      // Update edges if agent changed
      if (updatedTask.agentId !== crewConfig.tasks[existingIndex].agentId) {
        // Remove old agent-task edge
        setEdges(eds => eds.filter(edge => 
          edge.id !== `${crewConfig.tasks[existingIndex].agentId}-${updatedTask.id}`
        ));
        
        // Add new agent-task edge
        setEdges(eds => [...eds, {
          id: `${updatedTask.agentId}-${updatedTask.id}`,
          source: updatedTask.agentId,
          target: updatedTask.id,
          type: 'smoothstep',
          style: { stroke: '#1890ff', strokeDasharray: '5 5' },
          animated: false,
        }]);
      }
    } else {
      updatedTasks.push(updatedTask);
      
      // Add node to the flow
      const agent = crewConfig.agents.find(a => a.id === updatedTask.agentId);
      const newNode = {
        id: updatedTask.id,
        type: 'taskNode',
        position: { 
          x: 400, 
          y: 100 + (updatedTasks.length - 1) * 150 
        },
        data: { 
          task: updatedTask, 
          agent, 
          onEdit: () => handleEditTask(updatedTask) 
        }
      };
      
      setNodes(nds => [...nds, newNode]);
      
      // Add agent-task edge
      setEdges(eds => [...eds, {
        id: `${updatedTask.agentId}-${updatedTask.id}`,
        source: updatedTask.agentId,
        target: updatedTask.id,
        type: 'smoothstep',
        style: { stroke: '#1890ff', strokeDasharray: '5 5' },
        animated: false,
      }]);
    }
    
    setCrewConfig({
      ...crewConfig,
      tasks: updatedTasks
    });
    
    setTaskDrawerVisible(false);
    message.success(`Task "${updatedTask.description}" saved successfully`);
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId: string) => {
    // Check if the task is a dependency for other tasks
    const isDependency = crewConfig.tasks.some(task => 
      task.dependencies && task.dependencies.includes(taskId)
    );
    
    if (isDependency) {
      Modal.confirm({
        title: 'Cannot Delete Task',
        content: 'This task is a dependency for other tasks. Please remove those dependencies first.',
        okText: 'OK',
        cancelButtonProps: { style: { display: 'none' } }
      });
      return;
    }
    
    // Remove the task
    setCrewConfig({
      ...crewConfig,
      tasks: crewConfig.tasks.filter(task => task.id !== taskId)
    });
    
    // Remove the node and related edges from the flow
    setNodes(nds => nds.filter(node => node.id !== taskId));
    setEdges(eds => eds.filter(edge => 
      edge.source !== taskId && edge.target !== taskId
    ));
    
    message.success('Task deleted successfully');
  };

  // Handle updating crew info
  const handleUpdateCrewInfo = (values: any) => {
    setCrewConfig(prev => ({
      ...prev,
      name: values.name,
      description: values.description,
      process: values.process,
      verbose: values.verbose
    }));
    
    message.success('Crew information updated successfully');
  };

  // Handle saving the crew
  const handleSaveCrew = () => {
    if (onSave) {
      onSave(crewConfig);
      message.success('Crew saved successfully');
    }
  };

  // Handle running the crew
  const handleRunCrew = () => {
    if (crewConfig.tasks.length === 0) {
      Modal.confirm({
        title: 'No Tasks Available',
        content: 'You need to create at least one task before running the crew.',
        okText: 'Add Task',
        cancelText: 'Cancel',
        onOk: handleAddTask
      });
      return;
    }
    
    setRunModalVisible(true);
  };

  // Handle confirming the run
  const handleConfirmRun = () => {
    if (onRun) {
      onRun(crewConfig, runInput);
    }
    setRunModalVisible(false);
  };

  // Handle loading a template
  const handleLoadTemplate = (template: CrewConfig) => {
    setCrewConfig({
      ...template,
      id: `crew_${Date.now()}`
    });
    
    initializeFlow(template);
    setTemplateModalVisible(false);
    message.success(`Template "${template.name}" loaded successfully`);
  };

  // Handle exporting the crew
  const handleExportCrew = () => {
    const dataStr = JSON.stringify(crewConfig, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${crewConfig.name.replace(/\s+/g, '-').toLowerCase()}-config.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    message.success('Crew configuration exported successfully');
  };

  // Handle starting the wizard
  const handleStartWizard = () => {
    setWizardStep(0);
    setWizardVisible(true);
  };

  // Handle wizard next step
  const handleWizardNext = () => {
    setWizardStep(prev => prev + 1);
  };

  // Handle wizard previous step
  const handleWizardPrev = () => {
    setWizardStep(prev => prev - 1);
  };

  // Handle wizard finish
  const handleWizardFinish = () => {
    setWizardVisible(false);
    message.success('Crew created successfully');
  };

  // Render the template selection modal
  const renderTemplateModal = () => (
    <Modal
      title="Load Template"
      open={templateModalVisible}
      onCancel={() => setTemplateModalVisible(false)}
      footer={null}
      width={700}
    >
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={Object.values(CrewTemplates)}
        renderItem={template => (
          <List.Item>
            <Card
              title={template.name}
              extra={
                <Button 
                  type="primary" 
                  size="small" 
                  onClick={() => handleLoadTemplate(template)}
                >
                  Load
                </Button>
              }
              hoverable
            >
              <Paragraph ellipsis={{ rows: 2 }}>
                {template.description}
              </Paragraph>
              <Space>
                <Badge count={template.agents.length} showZero>
                  <Tag icon={<TeamOutlined />}>Agents</Tag>
                </Badge>
                <Badge count={template.tasks.length} showZero>
                  <Tag icon={<ApartmentOutlined />}>Tasks</Tag>
                </Badge>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </Modal>
  );

  // Render the agent drawer
  const renderAgentDrawer = () => (
    <Drawer
      title={selectedAgent?.id.includes('agent_') && !crewConfig.agents.some(a => a.id === selectedAgent?.id) 
        ? 'Add Agent' 
        : 'Edit Agent'
      }
      open={agentDrawerVisible}
      onClose={() => setAgentDrawerVisible(false)}
      width={600}
      footer={
        <Space>
          <Button onClick={() => setAgentDrawerVisible(false)}>Cancel</Button>
          <Button type="primary" onClick={() => agentForm.submit()}>Save</Button>
        </Space>
      }
    >
      <Form
        form={agentForm}
        layout="vertical"
        onFinish={handleSaveAgent}
      >
        <Form.Item
          name="name"
          label="Agent Name"
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input placeholder="Enter agent name" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input placeholder="Enter agent description" />
        </Form.Item>
        
        <Form.Item
          name="model"
          label="AI Model"
          rules={[{ required: true, message: 'Please select a model' }]}
          initialValue={AI_MODELS.groq.llama3_70b}
        >
          <Select placeholder="Select AI model">
            <Option value={AI_MODELS.groq.llama3_8b}>Llama 3 (8B)</Option>
            <Option value={AI_MODELS.groq.llama3_70b}>Llama 3 (70B)</Option>
            <Option value={AI_MODELS.groq.mixtral_8x7b}>Mixtral 8x7B</Option>
            {AI_CONFIG.openai?.apiKey && (
              <>
                <Option value={AI_MODELS.openai.gpt35}>GPT-3.5 Turbo</Option>
                <Option value={AI_MODELS.openai.gpt4_turbo}>GPT-4 Turbo</Option>
              </>
            )}
            {AI_CONFIG.anthropic?.apiKey && (
              <>
                <Option value={AI_MODELS.anthropic.claude3_haiku}>Claude 3 Haiku</Option>
                <Option value={AI_MODELS.anthropic.claude3_sonnet}>Claude 3 Sonnet</Option>
              </>
            )}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="systemPrompt"
          label="System Prompt"
          rules={[{ required: true, message: 'Please enter a system prompt' }]}
        >
          <TextArea 
            placeholder="Enter system prompt" 
            rows={8} 
            showCount 
            maxLength={4000} 
          />
        </Form.Item>
        
        <Collapse ghost>
          <Panel header="Prompt Templates" key="promptTemplates">
            <List
              size="small"
              bordered
              dataSource={Object.entries(SYSTEM_PROMPTS)}
              renderItem={([key, prompt]) => (
                <List.Item
                  actions={[
                    <Button 
                      type="link" 
                      onClick={() => agentForm.setFieldsValue({ systemPrompt: prompt })}
                    >
                      Use
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    description={prompt.substring(0, 100) + '...'}
                  />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </Form>
    </Drawer>
  );

  // Render the task drawer
  const renderTaskDrawer = () => (
    <Drawer
      title={selectedTask?.id.includes('task_') && !crewConfig.tasks.some(t => t.id === selectedTask?.id) 
        ? 'Add Task' 
        : 'Edit Task'
      }
      open={taskDrawerVisible}
      onClose={() => setTaskDrawerVisible(false)}
      width={600}
      footer={
        <Space>
          <Button onClick={() => setTaskDrawerVisible(false)}>Cancel</Button>
          <Button type="primary" onClick={() => taskForm.submit()}>Save</Button>
        </Space>
      }
    >
      <Form
        form={taskForm}
        layout="vertical"
        onFinish={handleSaveTask}
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
            {crewConfig.tasks
              .filter(task => task.id !== selectedTask?.id)
              .map(task => (
                <Option key={task.id} value={task.id}>{task.description}</Option>
              ))
            }
          </Select>
        </Form.Item>
        
        <Form.Item
          name="contextData"
          label="Context Data (JSON)"
        >
          <TextArea 
            placeholder="Enter context data as JSON" 
            rows={4} 
          />
        </Form.Item>
      </Form>
    </Drawer>
  );

  // Render the run modal
  const renderRunModal = () => (
    <Modal
      title="Run Crew"
      open={runModalVisible}
      onOk={handleConfirmRun}
      onCancel={() => setRunModalVisible(false)}
      okText="Run"
      width={600}
    >
      <Form layout="vertical">
        <Form.Item
          label="Input"
          required
        >
          <TextArea 
            value={runInput}
            onChange={e => setRunInput(e.target.value)}
            placeholder="Enter input for the crew"
            rows={6}
          />
        </Form.Item>
        
        <Collapse ghost>
          <Panel header="Crew Configuration" key="crewConfig">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Name:</Text>
              <Text>{crewConfig.name}</Text>
              
              <Text strong>Description:</Text>
              <Text>{crewConfig.description}</Text>
              
              <Text strong>Process:</Text>
              <Text>{crewConfig.process}</Text>
              
              <Text strong>Agents:</Text>
              <List
                size="small"
                bordered
                dataSource={crewConfig.agents}
                renderItem={agent => (
                  <List.Item>
                    <Text>{agent.name}</Text>
                  </List.Item>
                )}
              />
              
              <Text strong>Tasks:</Text>
              <List
                size="small"
                bordered
                dataSource={crewConfig.tasks}
                renderItem={task => (
                  <List.Item>
                    <Text>{task.description}</Text>
                  </List.Item>
                )}
              />
            </Space>
          </Panel>
        </Collapse>
      </Form>
    </Modal>
  );

  // Render the wizard
  const renderWizard = () => (
    <Modal
      title="Crew Creation Wizard"
      open={wizardVisible}
      onCancel={() => setWizardVisible(false)}
      footer={null}
      width={800}
    >
      <Steps current={wizardStep} style={{ marginBottom: 24 }}>
        <Step title="Crew Info" description="Basic information" />
        <Step title="Agents" description="Add crew agents" />
        <Step title="Tasks" description="Define tasks" />
        <Step title="Review" description="Review and finish" />
      </Steps>
      
      <div className="wizard-content">
        {wizardStep === 0 && (
          <Form
            layout="vertical"
            initialValues={{
              name: crewConfig.name,
              description: crewConfig.description,
              process: crewConfig.process,
              verbose: crewConfig.verbose
            }}
            onFinish={handleWizardNext}
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
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Form>
        )}
        
        {wizardStep === 1 && (
          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddAgent}
              >
                Add Agent
              </Button>
              
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
                        icon={<EditOutlined />} 
                        onClick={() => handleEditAgent(agent)}
                      >
                        Edit
                      </Button>,
                      <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDeleteAgent(agent.id)}
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
            
            <div style={{ marginTop: 24 }}>
              <Space>
                <Button onClick={handleWizardPrev}>
                  Previous
                </Button>
                <Button 
                  type="primary" 
                  onClick={handleWizardNext}
                  disabled={crewConfig.agents.length === 0}
                >
                  Next
                </Button>
              </Space>
            </div>
          </div>
        )}
        
        {wizardStep === 2 && (
          <div>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddTask}
              >
                Add Task
              </Button>
              
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
                        icon={<EditOutlined />} 
                        onClick={() => handleEditTask(task)}
                      >
                        Edit
                      </Button>,
                      <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDeleteTask(task.id)}
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
            
            <div style={{ marginTop: 24 }}>
              <Space>
                <Button onClick={handleWizardPrev}>
                  Previous
                </Button>
                <Button 
                  type="primary" 
                  onClick={handleWizardNext}
                  disabled={crewConfig.tasks.length === 0}
                >
                  Next
                </Button>
              </Space>
            </div>
          </div>
        )}
        
        {wizardStep === 3 && (
          <div>
            <Card title="Crew Summary">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong>Name:</Text>
                <Text>{crewConfig.name}</Text>
                
                <Text strong>Description:</Text>
                <Text>{crewConfig.description}</Text>
                
                <Text strong>Process:</Text>
                <Text>{crewConfig.process}</Text>
                
                <Divider />
                
                <Text strong>Agents ({crewConfig.agents.length}):</Text>
                <List
                  size="small"
                  bordered
                  dataSource={crewConfig.agents}
                  renderItem={agent => (
                    <List.Item>
                      <Text>{agent.name} - {agent.description}</Text>
                    </List.Item>
                  )}
                />
                
                <Divider />
                
                <Text strong>Tasks ({crewConfig.tasks.length}):</Text>
                <List
                  size="small"
                  bordered
                  dataSource={crewConfig.tasks}
                  renderItem={task => (
                    <List.Item>
                      <Space direction="vertical">
                        <Text>{task.description}</Text>
                        <Text type="secondary">
                          Agent: {crewConfig.agents.find(a => a.id === task.agentId)?.name || task.agentId}
                        </Text>
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
                    </List.Item>
                  )}
                />
              </Space>
            </Card>
            
            <div style={{ marginTop: 24 }}>
              <Space>
                <Button onClick={handleWizardPrev}>
                  Previous
                </Button>
                <Button 
                  type="primary" 
                  onClick={handleWizardFinish}
                >
                  Finish
                </Button>
              </Space>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );

  return (
    <div className={`visual-crew-builder ${className}`} style={style}>
      <Card
        title={
          <Space>
            <TeamOutlined />
            <span>Visual Crew Builder</span>
          </Space>
        }
        extra={
          <Space>
            <Button 
              icon={<CopyOutlined />}
              onClick={() => setTemplateModalVisible(true)}
            >
              Templates
            </Button>
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
          </Space>
        }
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                <BranchesOutlined />
                Visual Editor
              </span>
            } 
            key="visual"
          >
            <div className="flow-container" ref={flowRef}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
              >
                <Controls />
                <MiniMap />
                <Background />
              </ReactFlow>
              
              <div className="flow-actions">
                <Space>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={handleAddAgent}
                  >
                    Add Agent
                  </Button>
                  <Button 
                    icon={<PlusOutlined />} 
                    onClick={handleAddTask}
                  >
                    Add Task
                  </Button>
                </Space>
              </div>
            </div>
          </TabPane>
          
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
              onFinish={handleUpdateCrewInfo}
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
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
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
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddAgent}
              >
                Add Agent
              </Button>
              
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
                        icon={<EditOutlined />} 
                        onClick={() => handleEditAgent(agent)}
                      >
                        Edit
                      </Button>,
                      <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDeleteAgent(agent.id)}
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
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddTask}
              >
                Add Task
              </Button>
              
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
                        icon={<EditOutlined />} 
                        onClick={() => handleEditTask(task)}
                      >
                        Edit
                      </Button>,
                      <Button 
                        type="link" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDeleteTask(task.id)}
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
                <CodeOutlined />
                JSON
              </span>
            } 
            key="json"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                icon={<ExportOutlined />} 
                onClick={handleExportCrew}
              >
                Export JSON
              </Button>
              
              <Card>
                <pre style={{ maxHeight: '500px', overflow: 'auto' }}>
                  {JSON.stringify(crewConfig, null, 2)}
                </pre>
              </Card>
            </Space>
          </TabPane>
        </Tabs>
      </Card>
      
      {/* Modals and Drawers */}
      {renderTemplateModal()}
      {renderAgentDrawer()}
      {renderTaskDrawer()}
      {renderRunModal()}
      {renderWizard()}
      
      {/* Quick Start Button */}
      <Button
        type="primary"
        icon={<QuestionCircleOutlined />}
        className="quick-start-button"
        onClick={handleStartWizard}
      >
        Quick Start
      </Button>
    </div>
  );
};

// Import AI_CONFIG from the config
import { AI_CONFIG } from '../../config/aiConfig';

export default VisualCrewBuilder;