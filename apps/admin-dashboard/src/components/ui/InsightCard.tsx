import React from 'react';
import { Card, Typography, Tag, Space, List } from 'antd';

const { Title, Paragraph, Text } = Typography;

interface Metric {
  name: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

interface Insight {
  title: string;
  description: string;
  source: string;
  confidence: number;
  timestamp: Date;
  tags: string[];
  type: string;
  metrics: Metric[];
  recommendations: string[];
}

interface InsightCardProps {
  insight: Insight;
  cyberpunk?: boolean;
  showRecommendations?: boolean;
  defaultExpanded?: boolean;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  cyberpunk = false,
  showRecommendations = true,
  defaultExpanded = false
}) => {
  return (
    <Card title={insight.title} className="bg-gray-900 border-gray-700 shadow-md">
      <Paragraph>{insight.description}</Paragraph>
      <Space>
        {insight.tags.map((tag, index) => (
          <Tag key={index} color="blue">{tag}</Tag>
        ))}
      </Space>
      {showRecommendations && (
        <List
          size="small"
          header={<Text strong>Recommendations</Text>}
          dataSource={insight.recommendations}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      )}
    </Card>
  );
};

export default InsightCard;
