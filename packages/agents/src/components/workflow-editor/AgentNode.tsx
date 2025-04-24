import React from 'react';
import { Card, Typography, Space, Tooltip, Button } from 'antd';
import { EditOutlined, DeleteOutlined, RobotOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './WorkflowEditor.css';

const { Text, Paragraph } = Typography;

// Define the types for agent node props
interface AgentNodeProps {
  agent: any;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  readOnly?: boolean;
}

/**
 * AgentNode - A visual representation of an agent in the workflow editor
 */
const AgentNode: React.FC<AgentNodeProps> = ({
  agent,
  index,
  isSelected,
  onClick,
  onEdit,
  onDelete,
  readOnly = false
}) => {
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: index * 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  // Get the model name for display
  const getModelDisplayName = (modelId: string) => {
    if (modelId.includes('llama3-8b')) return 'Llama 3 8B';
    if (modelId.includes('llama3-70b')) return 'Llama 3 70B';
    if (modelId.includes('mixtral-8x7b')) return 'Mixtral 8x7B';
    if (modelId.includes('gpt-4')) return 'GPT-4 Turbo';
    if (modelId.includes('claude')) return 'Claude 3';
    return modelId;
  };

  return (
    <motion.div
      className={`agent-node ${isSelected ? 'selected' : ''}`}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layoutId={`agent-${agent.id}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="agent-card"
        bordered={false}
        actions={!readOnly ? [
          <Tooltip title="Edit Agent">
            <EditOutlined key="edit" onClick={(e) => { e.stopPropagation(); onEdit(); }} />
          </Tooltip>,
          <Tooltip title="Delete Agent">
            <DeleteOutlined key="delete" onClick={(e) => { e.stopPropagation(); onDelete(); }} />
          </Tooltip>
        ] : undefined}
      >
        <div className="agent-header">
          <RobotOutlined className="agent-icon" />
          <Text strong className="agent-name">{agent.name}</Text>
        </div>
        
        <Paragraph className="agent-description" ellipsis={{ rows: 2 }}>
          {agent.description}
        </Paragraph>
        
        <div className="agent-details">
          <Text type="secondary" className="agent-model">
            Model: {getModelDisplayName(agent.model)}
          </Text>
        </div>
      </Card>
    </motion.div>
  );
};

export default AgentNode;
