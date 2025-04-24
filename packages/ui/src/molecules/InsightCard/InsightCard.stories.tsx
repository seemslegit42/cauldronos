import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { InsightCard } from './InsightCard';

const meta: Meta<typeof InsightCard> = {
  title: 'Molecules/InsightCard',
  component: InsightCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    showSource: { control: 'boolean' },
    showConfidence: { control: 'boolean' },
    showTimestamp: { control: 'boolean' },
    showTags: { control: 'boolean' },
    showMetrics: { control: 'boolean' },
    showRecommendations: { control: 'boolean' },
    showActions: { control: 'boolean' },
    refreshable: { control: 'boolean' },
    isPinned: { control: 'boolean' },
    cyberpunk: { control: 'boolean' },
    defaultExpanded: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof InsightCard>;

// Sample insight data
const trendInsight = {
  title: 'User Growth Trend',
  description: 'User growth has increased by 12.5% in the last month, which is 5% higher than the previous month. This suggests that recent marketing campaigns have been effective.',
  source: 'User Analytics',
  confidence: 0.85,
  timestamp: new Date(),
  tags: ['Users', 'Growth', 'Marketing'],
  type: 'trend',
  metrics: [
    {
      name: 'Current Month',
      value: '12.5%',
      change: 5.0,
      changeType: 'increase',
    },
    {
      name: 'Previous Month',
      value: '7.5%',
      change: 0,
      changeType: 'neutral',
    },
    {
      name: 'Average',
      value: '8.2%',
      change: 0,
      changeType: 'neutral',
    },
  ],
  recommendations: [
    'Continue current marketing strategies',
    'Focus on user retention to maintain growth',
    'Analyze which channels are driving the most growth',
  ],
};

const anomalyInsight = {
  title: 'System Performance Alert',
  description: 'Database response time has increased by 15% in the last 24 hours. This could indicate a potential performance issue that needs attention.',
  source: 'System Monitoring',
  confidence: 0.75,
  timestamp: new Date(),
  tags: ['Performance', 'Database', 'Alert'],
  type: 'anomaly',
  metrics: [
    {
      name: 'Response Time',
      value: '250ms',
      change: 15.0,
      changeType: 'increase',
    },
    {
      name: 'CPU Usage',
      value: '78%',
      change: 12.0,
      changeType: 'increase',
    },
    {
      name: 'Memory',
      value: '65%',
      change: 5.0,
      changeType: 'increase',
    },
  ],
  recommendations: [
    'Check database query performance',
    'Consider scaling up database resources',
    'Review recent code changes that might affect performance',
  ],
};

const predictionInsight = {
  title: 'Revenue Forecast',
  description: 'Based on current trends, revenue is projected to increase by 8.3% in the next quarter. This is in line with the annual growth target of 10%.',
  source: 'Financial Analytics',
  confidence: 0.92,
  timestamp: new Date(),
  tags: ['Revenue', 'Forecast', 'Finance'],
  type: 'prediction',
  metrics: [
    {
      name: 'Projected Growth',
      value: '8.3%',
      change: 1.2,
      changeType: 'increase',
    },
    {
      name: 'Target',
      value: '10.0%',
      change: 0,
      changeType: 'neutral',
    },
    {
      name: 'Previous Quarter',
      value: '7.1%',
      change: 0,
      changeType: 'neutral',
    },
  ],
  recommendations: [
    'Continue current sales strategies',
    'Focus on high-value customer segments',
    'Prepare for increased demand in the next quarter',
  ],
};

export const TrendInsight: Story = {
  args: {
    insight: trendInsight,
    loading: false,
    showSource: true,
    showConfidence: true,
    showTimestamp: true,
    showTags: true,
    showMetrics: true,
    showRecommendations: true,
    showActions: true,
    refreshable: true,
    isPinned: false,
    cyberpunk: false,
    defaultExpanded: false,
    onRefresh: () => console.log('Refresh clicked'),
    onPin: () => console.log('Pin clicked'),
    onShare: () => console.log('Share clicked'),
  },
};

export const AnomalyInsight: Story = {
  args: {
    ...TrendInsight.args,
    insight: anomalyInsight,
  },
};

export const PredictionInsight: Story = {
  args: {
    ...TrendInsight.args,
    insight: predictionInsight,
  },
};

export const Loading: Story = {
  args: {
    ...TrendInsight.args,
    loading: true,
  },
};

export const Expanded: Story = {
  args: {
    ...TrendInsight.args,
    defaultExpanded: true,
  },
};

export const CyberpunkStyle: Story = {
  args: {
    ...TrendInsight.args,
    cyberpunk: true,
  },
};

export const Pinned: Story = {
  args: {
    ...TrendInsight.args,
    isPinned: true,
  },
};

export const MinimalInfo: Story = {
  args: {
    ...TrendInsight.args,
    showSource: false,
    showConfidence: false,
    showTimestamp: false,
    showTags: false,
    showActions: false,
  },
};
