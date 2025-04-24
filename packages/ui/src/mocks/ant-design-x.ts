import React from 'react';
import { Card, Typography, Button } from 'antd';
import { BulbOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Mock Insight component
export const Insight: React.FC<any> = ({
  insights = [],
  title = 'Insights',
  theme = 'default',
  glowEffect = false,
  onClose,
  style = {},
  ...props
}) => {
  return (
    <Card
      size="small"
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BulbOutlined style={{ marginRight: 8 }} />
          {title}
        </div>
      }
      extra={
        onClose && (
          <Button
            type="text"
            icon={<CloseCircleOutlined />}
            onClick={onClose}
            size="small"
          />
        )
      }
      style={{
        borderColor: theme === 'cyber' ? '#1677ff' : undefined,
        backgroundColor: theme === 'cyber' ? 'rgba(22, 119, 255, 0.1)' : undefined,
        boxShadow: glowEffect ? '0 0 10px rgba(22, 119, 255, 0.5)' : undefined,
        ...style
      }}
      {...props}
    >
      <ul style={{ paddingLeft: 20, margin: 0 }}>
        {insights.map((insight: string, index: number) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </Card>
  );
};

// Mock Suggestions component
export const Suggestions: React.FC<any> = ({
  suggestions = [],
  onApply,
  ...props
}) => {
  return (
    <Card size="small" title="Suggestions" {...props}>
      <ul style={{ paddingLeft: 20, margin: 0 }}>
        {suggestions.map((suggestion: any, index: number) => (
          <li key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>{suggestion.text}</Text>
              {onApply && (
                <Button size="small" type="link" onClick={() => onApply(suggestion)}>
                  Apply
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

// Mock AIAssistant component
export const AIAssistant: React.FC<any> = ({
  children,
  ...props
}) => {
  return (
    <div className="ai-assistant" {...props}>
      {children}
    </div>
  );
};

export default {
  Insight,
  Suggestions,
  AIAssistant
};
