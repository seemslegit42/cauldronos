import React from 'react';
import { Button, Tooltip, Badge } from '@cauldronos/ui';
import { RobotOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useAI } from '../AIProvider';

interface AIButtonProps {
  className?: string;
}

/**
 * A button that toggles the visibility of the AI Assistant.
 * It shows a badge when there are unread messages.
 */
const AIButton: React.FC<AIButtonProps> = ({ className }) => {
  const { toggleVisibility, isVisible, messages, useSwarm } = useAI();

  // Count unread messages (for badge)
  const unreadCount = messages.filter(msg => msg.role === 'assistant').length;

  return (
    <Tooltip title={isVisible ? "Hide AI Assistant" : "Show AI Assistant"}>
      <Badge count={unreadCount > 0 ? unreadCount : 0} offset={[-5, 5]}>
        <Button
          type="primary"
          shape="circle"
          icon={useSwarm ? <ThunderboltOutlined /> : <RobotOutlined />}
          onClick={toggleVisibility}
          className={className}
        />
      </Badge>
    </Tooltip>
  );
};

export default AIButton;
