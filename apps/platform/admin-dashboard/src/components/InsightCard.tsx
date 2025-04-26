import React, { useState } from 'react';
import { Card, Typography, Tag, Button, Space, Divider } from 'antd';
import { InfoCircleOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Metric {
  name: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

interface InsightProps {
  insight: {
    title: string;
    description: string;
    source: string;
    confidence: number;
    timestamp: Date;
    tags: string[];
    type: string;
    metrics?: Metric[];
    recommendations?: string[];
  };
  cyberpunk?: boolean;
  showRecommendations?: boolean;
  defaultExpanded?: boolean;
}

const InsightCard: React.FC<InsightProps> = ({
  insight,
  cyberpunk = false,
  showRecommendations = false,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className={`w-full ${
        cyberpunk ? 'border-blue-400 bg-gray-900 text-gray-100' : ''
      }`}
      title={
        <div className="flex justify-between items-center">
          <Title level={5} className={cyberpunk ? 'text-blue-400 m-0' : 'm-0'}>
            {insight.title}
          </Title>
          <Tag color={insight.type === 'anomaly' ? 'error' : 'processing'}>
            {insight.type}
          </Tag>
        </div>
      }
    >
      <Paragraph>{insight.description}</Paragraph>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {insight.tags.map((tag, index) => (
          <Tag key={index} color="blue">
            {tag}
          </Tag>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
        <Text>Source: {insight.source}</Text>
        <Text>Confidence: {(insight.confidence * 100).toFixed(0)}%</Text>
      </div>
      
      {insight.metrics && (
        <>
          <Divider className="my-2" />
          <div className="grid grid-cols-2 gap-2 mb-3">
            {insight.metrics.map((metric, index) => (
              <div key={index} className="flex flex-col">
                <Text type="secondary">{metric.name}</Text>
                <div className="flex items-center">
                  <Text strong className="mr-2">
                    {metric.value}
                  </Text>
                  {metric.changeType !== 'neutral' && (
                    <Tag
                      color={
                        metric.changeType === 'increase' ? 'success' : 'error'
                      }
                    >
                      {metric.change > 0 ? '+' : ''}
                      {metric.change}%
                    </Tag>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      {showRecommendations && insight.recommendations && (
        <>
          <Button
            type="link"
            onClick={toggleExpanded}
            icon={expanded ? <UpOutlined /> : <DownOutlined />}
            className="p-0"
          >
            {expanded ? 'Hide' : 'Show'} Recommendations
          </Button>
          
          {expanded && (
            <div className="mt-3">
              <Text strong>Recommendations:</Text>
              <ul className="pl-5 mt-1">
                {insight.recommendations.map((rec, index) => (
                  <li key={index}>
                    <Text>{rec}</Text>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default InsightCard;
