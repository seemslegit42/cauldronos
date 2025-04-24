import React from 'react';
import { Card, Typography, Space, Tooltip, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, ApartmentOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './WorkflowEditor.css';

const { Text, Paragraph } = Typography;

// Define the types for task node props
interface TaskNodeProps {
  task: any;
  agent: any;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  readOnly?: boolean;
}

/**
 * TaskNode - A visual representation of a task in the workflow editor
 */
const TaskNode: React.FC<TaskNodeProps> = ({
  task,
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

  return (
    <motion.div
      className={`task-node ${isSelected ? 'selected' : ''}`}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layoutId={`task-${task.id}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-task-id={task.id}
    >
      <Card 
        className="task-card"
        bordered={false}
        actions={!readOnly ? [
          <Tooltip title="Edit Task">
            <EditOutlined key="edit" onClick={(e) => { e.stopPropagation(); onEdit(); }} />
          </Tooltip>,
          <Tooltip title="Delete Task">
            <DeleteOutlined key="delete" onClick={(e) => { e.stopPropagation(); onDelete(); }} />
          </Tooltip>
        ] : undefined}
      >
        <div className="task-header">
          <ApartmentOutlined className="task-icon" />
          <Text strong className="task-name">Task {index + 1}</Text>
        </div>
        
        <Paragraph className="task-description" ellipsis={{ rows: 2 }}>
          {task.description}
        </Paragraph>
        
        <div className="task-details">
          <Tag color="blue">{agent?.name || 'Unknown Agent'}</Tag>
          
          {task.dependencies && task.dependencies.length > 0 && (
            <div className="task-dependencies">
              <Text type="secondary" className="dependencies-label">
                Dependencies: {task.dependencies.length}
              </Text>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskNode;
