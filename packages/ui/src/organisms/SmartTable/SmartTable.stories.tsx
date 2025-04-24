import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SmartTable } from './SmartTable';
import { Button, Tag, Space, Avatar, Tooltip } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const meta: Meta<typeof SmartTable> = {
  title: 'Organisms/SmartTable',
  component: SmartTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    insights: { control: 'boolean' },
    patternDetection: { control: 'boolean' },
    anomalyHighlighting: { control: 'boolean' },
    smartFiltering: { control: 'boolean' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SmartTable>;

// Sample data for the table
const generateData = (count: number) => {
  const statuses = ['active', 'inactive', 'pending', 'archived'];
  const types = ['basic', 'premium', 'enterprise'];
  
  return Array.from({ length: count }, (_, i) => ({
    key: i.toString(),
    id: i + 1,
    name: `User ${i + 1}`,
    age: Math.floor(Math.random() * 50) + 20,
    email: `user${i + 1}@example.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.floor(Math.random() * 2000) + 100,
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }));
};

// Sample columns for the table
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: any, b: any) => a.id - b.id,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <Space>
        <Avatar icon={<UserOutlined />} />
        {text}
      </Space>
    ),
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      let color = 'green';
      if (status === 'inactive') color = 'volcano';
      if (status === 'pending') color = 'geekblue';
      if (status === 'archived') color = 'gray';
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
      { text: 'Pending', value: 'pending' },
      { text: 'Archived', value: 'archived' },
    ],
    onFilter: (value: string, record: any) => record.status.indexOf(value) === 0,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => {
      let color = 'blue';
      if (type === 'premium') color = 'purple';
      if (type === 'enterprise') color = 'gold';
      return <Tag color={color}>{type.toUpperCase()}</Tag>;
    },
    filters: [
      { text: 'Basic', value: 'basic' },
      { text: 'Premium', value: 'premium' },
      { text: 'Enterprise', value: 'enterprise' },
    ],
    onFilter: (value: string, record: any) => record.type.indexOf(value) === 0,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: number) => `$${amount.toFixed(2)}`,
    sorter: (a: any, b: any) => a.amount - b.amount,
  },
  {
    title: 'Last Login',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
    sorter: (a: any, b: any) => new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime(),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_: any, record: any) => (
      <Space size="small">
        <Tooltip title="View">
          <Button type="text" icon={<EyeOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="Edit">
          <Button type="text" icon={<EditOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="Delete">
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Tooltip>
      </Space>
    ),
  },
];

export const Default: Story = {
  args: {
    columns,
    dataSource: generateData(10),
    title: 'User Data',
    insights: false,
    patternDetection: false,
    anomalyHighlighting: false,
    smartFiltering: false,
    pagination: { pageSize: 5 },
    style: { width: 1000 },
  },
};

export const WithInsights: Story = {
  args: {
    ...Default.args,
    insights: true,
  },
};

export const WithPatternDetection: Story = {
  args: {
    ...Default.args,
    patternDetection: true,
  },
};

export const WithAnomalyHighlighting: Story = {
  args: {
    ...Default.args,
    anomalyHighlighting: true,
  },
};

export const WithSmartFiltering: Story = {
  args: {
    ...Default.args,
    smartFiltering: true,
  },
};

export const FullFeatured: Story = {
  args: {
    ...Default.args,
    insights: true,
    patternDetection: true,
    anomalyHighlighting: true,
    smartFiltering: true,
  },
};

export const LargeDataset: Story = {
  args: {
    ...Default.args,
    dataSource: generateData(100),
    pagination: { pageSize: 10 },
  },
};

export const WithCustomExtra: Story = {
  args: {
    ...Default.args,
    extra: (
      <Space>
        <Button type="primary">Export</Button>
        <Button>Import</Button>
      </Space>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    ...Default.args,
    title: undefined,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};
