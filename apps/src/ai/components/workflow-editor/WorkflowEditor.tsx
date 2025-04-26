import React, { useState, useRef, useEffect } from 'react';
import { Card, Typography, Button, Space, Divider, Tooltip, Modal, Form, Input, Select, Switch } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined, PlayCircleOutlined, CopyOutlined, ExportOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { CrewConfig, CrewTaskConfig } from '../../services/CrewService';
import { AI_MODELS } from '../../config/aiConfig';
import AgentNode from './AgentNode';
import TaskNode from './TaskNode';
import ConnectionLine from './ConnectionLine';
import './WorkflowEditor.css';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Define the types for workflow editor props
interface WorkflowEditorProps {
  initialConfig?: CrewConfig;
  onSave?: (config: CrewConfig) => void;
  onRun?: (config: CrewConfig, input: string) => void;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * WorkflowEditor - A visual editor for creating and editing AI agent crews
 */
const WorkflowEditor: React.FC<WorkflowEditorProps> = ({
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

  // State for the editor
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isAgentModalVisible, setIsAgentModalVisible] = useState(false);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isRunModalVisible, setIsRunModalVisible] = useState(false);
  const [runInput, setRunInput] = useState('');
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for the editor
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Effect to initialize the editor
  useEffect(() => {
    if (initialConfig) {
      setCrewConfig(initialConfig);
    }
  }, [initialConfig]);

  // Handler for adding a new agent
  const handleAddAgent = () => {
    setEditingAgent({
      id: `agent_${Date.now()}`,
      name: '',
      description: '',
      systemPrompt: '',
      model: AI_MODELS.groq.llama3_70b,
      tools: []
    });
    setIsAgentModalVisible(true);
  };

  // Handler for editing an agent
  const handleEditAgent = (agentId: string) => {
    const agent = crewConfig.agents.find(a => a.id === agentId);
    if (agent) {
      setEditingAgent({ ...agent });
      setIsAgentModalVisible(true);
    }
  };

  // Handler for deleting an agent
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
  };

  // Handler for saving an agent
  const handleSaveAgent = (values: any) => {
    const updatedAgents = [...crewConfig.agents];
    const existingIndex = updatedAgents.findIndex(a => a.id === editingAgent.id);
    
    if (existingIndex >= 0) {
      // Update existing agent
      updatedAgents[existingIndex] = {
        ...updatedAgents[existingIndex],
        ...values
      };
    } else {
      // Add new agent
      updatedAgents.push({
        id: editingAgent.id,
        ...values
      });
    }
    
    setCrewConfig({
      ...crewConfig,
      agents: updatedAgents
    });
    
    setIsAgentModalVisible(false);
  };

  // Handler for adding a new task
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

    setEditingTask({
      id: `task_${Date.now()}`,
      description: '',
      agentId: crewConfig.agents[0].id,
      expectedOutput: '',
      contextData: {},
      dependencies: []
    });
    setIsTaskModalVisible(true);
  };

  // Handler for editing a task
  const handleEditTask = (taskId: string) => {
    const task = crewConfig.tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask({ ...task });
      setIsTaskModalVisible(true);
    }
  };

  // Handler for deleting a task
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
  };

  // Handler for saving a task
  const handleSaveTask = (values: any) => {
    const updatedTasks = [...crewConfig.tasks];
    const existingIndex = updatedTasks.findIndex(t => t.id === editingTask.id);
    
    if (existingIndex >= 0) {
      // Update existing task
      updatedTasks[existingIndex] = {
        ...updatedTasks[existingIndex],
        ...values
      };
    } else {
      // Add new task
      updatedTasks.push({
        id: editingTask.id,
        ...values
      });
    }
    
    setCrewConfig({
      ...crewConfig,
      tasks: updatedTasks
    });
    
    setIsTaskModalVisible(false);
  };

  // Handler for saving the crew configuration
  const handleSaveCrew = () => {
    if (onSave) {
      onSave(crewConfig);
    }
  };

  // Handler for running the crew
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

    setIsRunModalVisible(true);
  };

  // Handler for confirming the run
  const handleConfirmRun = () => {
    if (onRun) {
      onRun(crewConfig, runInput);
    }
    setIsRunModalVisible(false);
  };

  // Handler for exporting the crew configuration
  const handleExportCrew = () => {
    const dataStr = JSON.stringify(crewConfig, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${crewConfig.name.replace(/\s+/g, '-').toLowerCase()}-config.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Render the connection lines between tasks
  const renderConnectionLines = () => {
    return crewConfig.tasks.flatMap(task => {
      if (!task.dependencies || task.dependencies.length === 0) {
        return [];
      }
      
      return task.dependencies.map(depId => {
        const sourceTask = crewConfig.tasks.find(t => t.id === depId);
        if (!sourceTask) {
          return null;
        }
        
        return (
          <ConnectionLine
            key={`${depId}-${task.id}`}
            sourceId={depId}
            targetId={task.id}
            sourceType="task"
            targetType="task"
          />
        );
      }).filter(Boolean);
    });
  };

  // Render the agent nodes
  const renderAgentNodes = () => {
    return crewConfig.agents.map((agent, index) => (
      <AgentNode
        key={agent.id}
        agent={agent}
        index={index}
        isSelected={selectedNodeId === agent.id}
        onClick={() => setSelectedNodeId(agent.id)}
        onEdit={() => handleEditAgent(agent.id)}
        onDelete={() => handleDeleteAgent(agent.id)}
        readOnly={readOnly}
      />
    ));
  };

  // Render the task nodes
  const renderTaskNodes = () => {
    return crewConfig.tasks.map((task, index) => {
      const agent = crewConfig.agents.find(a => a.id === task.agentId);
      return (
        <TaskNode
          key={task.id}
          task={task}
          agent={agent}
          index={index}
          isSelected={selectedNodeId === task.id}
          onClick={() => setSelectedNodeId(task.id)}
          onEdit={() => handleEditTask(task.id)}
          onDelete={() => handleDeleteTask(task.id)}
          readOnly={readOnly}
        />
      );
    });
  };

  return (
    <div 
      className={`workflow-editor ${className}`} 
      style={style}
      ref={editorRef}
    >
      {/* Editor Header */}
      <div className="workflow-editor-header">
        <div className="workflow-editor-title">
          <Title level={4}>{crewConfig.name || 'New Crew'}</Title>
          <Text type="secondary">{crewConfig.description || 'A new AI agent crew'}</Text>
        </div>
        <div className="workflow-editor-actions">
          <Space>
            {!readOnly && (
              <>
                <Button 
                  type="primary" 
                  icon={<SaveOutlined />} 
                  onClick={handleSaveCrew}
                >
                  Save
                </Button>
                <Button 
                  icon={<PlayCircleOutlined />} 
                  onClick={handleRunCrew}
                >
                  Run
                </Button>
              </>
            )}
            <Button 
              icon={<ExportOutlined />} 
              onClick={handleExportCrew}
            >
              Export
            </Button>
          </Space>
        </div>
      </div>

      <Divider />

      {/* Editor Canvas */}
      <div className="workflow-editor-canvas">
        {/* Connection Lines */}
        <div className="workflow-editor-connections">
          {renderConnectionLines()}
        </div>

        {/* Agent Nodes */}
        <div className="workflow-editor-agents">
          <Title level={5} className="section-title">Agents</Title>
          <div className="agent-nodes">
            <AnimatePresence>
              {renderAgentNodes()}
            </AnimatePresence>
            
            {!readOnly && (
              <motion.div
                className="add-node-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddAgent}
                >
                  Add Agent
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Task Nodes */}
        <div className="workflow-editor-tasks">
          <Title level={5} className="section-title">Tasks</Title>
          <div className="task-nodes">
            <AnimatePresence>
              {renderTaskNodes()}
            </AnimatePresence>
            
            {!readOnly && (
              <motion.div
                className="add-node-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="dashed" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddTask}
                >
                  Add Task
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Agent Modal */}
      <Modal
        title={editingAgent?.id.includes('agent_') && !crewConfig.agents.some(a => a.id === editingAgent?.id) ? 'Add Agent' : 'Edit Agent'}
        open={isAgentModalVisible}
        onCancel={() => setIsAgentModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          layout="vertical"
          initialValues={editingAgent || {}}
          onFinish={handleSaveAgent}
        >
          <Form.Item
            name="name"
            label="Agent Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="e.g., Research Agent" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input placeholder="e.g., Researches and analyzes information" />
          </Form.Item>
          
          <Form.Item
            name="systemPrompt"
            label="System Prompt"
            rules={[{ required: true, message: 'Please enter a system prompt' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="e.g., You are a Research Agent. Your job is to analyze information and provide insights." 
            />
          </Form.Item>
          
          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: 'Please select a model' }]}
          >
            <Select placeholder="Select a model">
              <Option value={AI_MODELS.groq.llama3_8b}>Llama 3 8B</Option>
              <Option value={AI_MODELS.groq.llama3_70b}>Llama 3 70B</Option>
              <Option value={AI_MODELS.groq.mixtral_8x7b}>Mixtral 8x7B</Option>
              <Option value={AI_MODELS.openai.gpt4_turbo}>GPT-4 Turbo</Option>
              <Option value={AI_MODELS.anthropic.claude3_sonnet}>Claude 3 Sonnet</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => setIsAgentModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Task Modal */}
      <Modal
        title={editingTask?.id.includes('task_') && !crewConfig.tasks.some(t => t.id === editingTask?.id) ? 'Add Task' : 'Edit Task'}
        open={isTaskModalVisible}
        onCancel={() => setIsTaskModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          layout="vertical"
          initialValues={editingTask || {}}
          onFinish={handleSaveTask}
        >
          <Form.Item
            name="description"
            label="Task Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="e.g., Research and analyze the given topic" 
            />
          </Form.Item>
          
          <Form.Item
            name="agentId"
            label="Assigned Agent"
            rules={[{ required: true, message: 'Please select an agent' }]}
          >
            <Select placeholder="Select an agent">
              {crewConfig.agents.map(agent => (
                <Option key={agent.id} value={agent.id}>{agent.name}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="expectedOutput"
            label="Expected Output"
          >
            <Input placeholder="e.g., A detailed analysis report" />
          </Form.Item>
          
          <Form.Item
            name="dependencies"
            label="Dependencies"
          >
            <Select
              mode="multiple"
              placeholder="Select dependent tasks"
              allowClear
            >
              {crewConfig.tasks
                .filter(task => task.id !== editingTask?.id)
                .map(task => (
                  <Option key={task.id} value={task.id}>{task.description}</Option>
                ))
              }
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => setIsTaskModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Run Modal */}
      <Modal
        title="Run Crew"
        open={isRunModalVisible}
        onOk={handleConfirmRun}
        onCancel={() => setIsRunModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item
            label="Input"
            required
          >
            <TextArea 
              rows={4} 
              value={runInput}
              onChange={e => setRunInput(e.target.value)}
              placeholder="Enter the input for the crew" 
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WorkflowEditor;
