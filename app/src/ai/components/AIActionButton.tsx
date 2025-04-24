import React, { useState } from 'react';
import { Button, Tooltip, Modal, Space, Typography, Divider } from 'cauldronos-ui';
import { RobotOutlined, LoadingOutlined, CloseOutlined } from 'cauldronos-ui';
import AIOutputBlock, { AIOutputType } from './AIOutputBlock';

const { Text, Title, Paragraph } = Typography;

export interface AIAction {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
  prompt: string;
  contextData?: Record<string, any>;
  outputType?: AIOutputType;
}

interface AIActionButtonProps {
  action: AIAction;
  size?: 'small' | 'middle' | 'large';
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  shape?: 'default' | 'circle' | 'round';
  className?: string;
  style?: React.CSSProperties;
  showLabel?: boolean;
  showTooltip?: boolean;
  onActionComplete?: (result: any) => void;
}

/**
 * A button that triggers an AI action when clicked.
 * It opens a modal to display the AI's response.
 */
const AIActionButton: React.FC<AIActionButtonProps> = ({
  action,
  size = 'middle',
  type = 'default',
  shape = 'default',
  className = '',
  style = {},
  showLabel = true,
  showTooltip = true,
  onActionComplete
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [outputType, setOutputType] = useState<AIOutputType>('loading');

  // Handle button click
  const handleClick = async () => {
    setIsModalVisible(true);
    setIsLoading(true);
    setOutputType('loading');
    setResult('Processing your request...');

    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate different response types based on the action
      let simulatedResult;
      let simulatedOutputType: AIOutputType = action.outputType || 'text';

      switch (action.id) {
        case 'analyze-users':
          simulatedResult = "Based on my analysis of user behavior:\n\n- 65% of users are active daily\n- 23% are weekly users\n- 12% haven't logged in for over 30 days\n\nThe most engaged users are in the Marketing and Sales departments. Consider reaching out to inactive users with a personalized email campaign.";
          simulatedOutputType = 'markdown';
          break;
        case 'summarize-data':
          simulatedResult = "## Data Summary\n\nTotal Records: 1,245\nTime Period: Last 30 days\n\n### Key Metrics:\n- Average Session Duration: 24 minutes\n- Conversion Rate: 3.2%\n- Bounce Rate: 42%\n\n### Recommendations:\n1. Focus on improving mobile experience\n2. Optimize checkout flow\n3. Add more product recommendations";
          simulatedOutputType = 'markdown';
          break;
        case 'generate-report':
          simulatedResult = {
            columns: [
              { title: 'Metric', dataIndex: 'metric', key: 'metric' },
              { title: 'Current', dataIndex: 'current', key: 'current' },
              { title: 'Previous', dataIndex: 'previous', key: 'previous' },
              { title: 'Change', dataIndex: 'change', key: 'change', render: (text: string) => {
                const value = parseFloat(text);
                return (
                  <Text type={value > 0 ? 'success' : value < 0 ? 'danger' : 'secondary'}>
                    {value > 0 ? '+' : ''}{text}%
                  </Text>
                );
              }}
            ],
            dataSource: [
              { key: '1', metric: 'Active Users', current: '1,245', previous: '1,180', change: '5.5' },
              { key: '2', metric: 'Revenue', current: '$45,678', previous: '$42,345', change: '7.9' },
              { key: '3', metric: 'Conversion Rate', current: '3.2%', previous: '3.5%', change: '-8.6' },
              { key: '4', metric: 'Avg. Session', current: '24 min', previous: '22 min', change: '9.1' }
            ]
          };
          simulatedOutputType = 'table';
          break;
        case 'suggest-actions':
          simulatedResult = [
            {
              label: 'Send Re-engagement Email',
              onClick: () => console.log('Sending re-engagement email'),
              type: 'primary',
              icon: <RobotOutlined />,
              tooltip: 'Send an email to inactive users'
            },
            {
              label: 'Generate Full Report',
              onClick: () => console.log('Generating full report'),
              type: 'default',
              tooltip: 'Create a detailed PDF report'
            },
            {
              label: 'Schedule Follow-up',
              onClick: () => console.log('Scheduling follow-up'),
              type: 'dashed',
              tooltip: 'Set a reminder to check progress'
            }
          ];
          simulatedOutputType = 'action';
          break;
        default:
          simulatedResult = `I've analyzed the ${action.id} and found some interesting patterns. Would you like me to provide more details or take any specific actions?`;
          simulatedOutputType = 'text';
      }

      setResult(simulatedResult);
      setOutputType(simulatedOutputType);

      if (onActionComplete) {
        onActionComplete(simulatedResult);
      }
    } catch (error) {
      console.error('Error executing AI action:', error);
      setResult('Sorry, there was an error processing your request. Please try again.');
      setOutputType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Render the button with optional tooltip
  const button = (
    <Button
      type={type}
      size={size}
      shape={shape}
      icon={<RobotOutlined />}
      onClick={handleClick}
      className={`ai-action-button ${className}`}
      style={style}
      loading={isLoading}
    >
      {showLabel && action.label}
    </Button>
  );

  return (
    <>
      {showTooltip ? (
        <Tooltip title={action.description}>
          {button}
        </Tooltip>
      ) : button}

      <Modal
        title={
          <div className="flex items-center">
            <RobotOutlined className="mr-2" />
            <span>{action.label}</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
        className="ai-action-modal"
        closeIcon={<CloseOutlined />}
      >
        <Paragraph className="mb-4">
          {action.description}
        </Paragraph>

        <Divider />

        <AIOutputBlock
          type={outputType}
          content={result}
          isStreaming={isLoading && (outputType === 'text' || outputType === 'markdown')}
        />
      </Modal>
    </>
  );
};

export default AIActionButton;
