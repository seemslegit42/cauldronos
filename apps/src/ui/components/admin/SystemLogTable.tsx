import React, { useState } from 'react';
import { Table, Card, Typography, Tag, Button, Space, Input, DatePicker, Select, Tooltip, Badge } from 'antd';
import { 
  SearchOutlined, 
  ReloadOutlined, 
  DownloadOutlined, 
  FilterOutlined,
  EyeOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import type { TableProps } from 'antd/es/table';
import { motion } from 'framer-motion';
import useTheme from '../../styles/useTheme';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
  source: string;
  details?: string;
  userId?: string;
  userName?: string;
  ip?: string;
  userAgent?: string;
}

export interface SystemLogTableProps {
  logs?: LogEntry[];
  loading?: boolean;
  title?: string;
  subtitle?: string;
  onRefresh?: () => void;
  onViewDetails?: (log: LogEntry) => void;
  onDelete?: (logId: string) => void;
  onDownload?: () => void;
  pagination?: TableProps<LogEntry>['pagination'];
}

const SystemLogTable: React.FC<SystemLogTableProps> = ({
  logs = [],
  loading = false,
  title = 'System Logs',
  subtitle = 'Recent system events and activities',
  onRefresh,
  onViewDetails,
  onDelete,
  onDownload,
  pagination = { pageSize: 10 },
}) => {
  const { colors, isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [filterLevel, setFilterLevel] = useState<string[]>([]);
  const [filterSource, setFilterSource] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[any, any]>([null, null]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique sources for filter
  const sources = Array.from(new Set(logs.map(log => log.source)));

  // Filter logs based on search, level, source, and date range
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchText === '' || 
      log.message.toLowerCase().includes(searchText.toLowerCase()) ||
      (log.userName && log.userName.toLowerCase().includes(searchText.toLowerCase())) ||
      (log.userId && log.userId.toLowerCase().includes(searchText.toLowerCase()));
    
    const matchesLevel = filterLevel.length === 0 || filterLevel.includes(log.level);
    
    const matchesSource = filterSource.length === 0 || filterSource.includes(log.source);
    
    const matchesDateRange = !dateRange[0] || !dateRange[1] || 
      (new Date(log.timestamp) >= dateRange[0] && new Date(log.timestamp) <= dateRange[1]);
    
    return matchesSearch && matchesLevel && matchesSource && matchesDateRange;
  });

  // Get level tag color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info':
        return { color: colors.info, icon: <InfoCircleOutlined /> };
      case 'warning':
        return { color: colors.warning, icon: <WarningOutlined /> };
      case 'error':
        return { color: colors.error, icon: <CloseCircleOutlined /> };
      case 'success':
        return { color: colors.success, icon: <CheckCircleOutlined /> };
      default:
        return { color: colors.info, icon: <InfoCircleOutlined /> };
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level: string) => {
        const { color, icon } = getLevelColor(level);
        return (
          <Tag 
            color={color} 
            icon={icon}
            style={{ 
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}
          >
            {level}
          </Tag>
        );
      },
      filters: [
        { text: 'Info', value: 'info' },
        { text: 'Warning', value: 'warning' },
        { text: 'Error', value: 'error' },
        { text: 'Success', value: 'success' },
      ],
      onFilter: (value: string, record: LogEntry) => record.level === value,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
      render: (timestamp: string) => {
        const date = new Date(timestamp);
        return (
          <Text style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
            {date.toLocaleString()}
          </Text>
        );
      },
      sorter: (a: LogEntry, b: LogEntry) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (message: string) => (
        <Text ellipsis={{ tooltip: message }}>
          {message}
        </Text>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 150,
      render: (source: string) => (
        <Tag color={isDarkMode ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 136, 255, 0.1)'} style={{ color: colors.text }}>
          {source}
        </Tag>
      ),
      filters: sources.map(source => ({ text: source, value: source })),
      onFilter: (value: string, record: LogEntry) => record.source === value,
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      render: (userName: string, record: LogEntry) => (
        userName ? (
          <Tooltip title={`ID: ${record.userId}`}>
            <Text>{userName}</Text>
          </Tooltip>
        ) : (
          <Text type="secondary">System</Text>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record: LogEntry) => (
        <Space>
          {onViewDetails && (
            <Tooltip title="View Details">
              <Button 
                type="text" 
                icon={<EyeOutlined />} 
                onClick={() => onViewDetails(record)}
                size="small"
              />
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Delete Log">
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />} 
                onClick={() => onDelete(record.id)}
                size="small"
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        title={
          <div>
            <Title level={4} style={{ margin: 0 }}>{title}</Title>
            {subtitle && <Text type="secondary">{subtitle}</Text>}
          </div>
        }
        extra={
          <Space>
            <Button
              icon={<FilterOutlined />}
              onClick={() => setShowFilters(!showFilters)}
              type={showFilters ? 'primary' : 'default'}
            >
              Filters
            </Button>
            {onRefresh && (
              <Button 
                icon={<ReloadOutlined />} 
                onClick={onRefresh}
                loading={loading}
              >
                Refresh
              </Button>
            )}
            {onDownload && (
              <Button 
                icon={<DownloadOutlined />} 
                onClick={onDownload}
              >
                Export
              </Button>
            )}
          </Space>
        }
        style={{ 
          borderRadius: '8px',
          overflow: 'hidden',
          border: `1px solid ${colors.border}`,
        }}
      >
        {showFilters && (
          <div style={{ marginBottom: '16px', padding: '16px', background: isDarkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)', borderRadius: '4px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space wrap>
                <Input
                  placeholder="Search logs..."
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  prefix={<SearchOutlined />}
                  style={{ width: 200 }}
                  allowClear
                />
                <Select
                  mode="multiple"
                  placeholder="Filter by level"
                  value={filterLevel}
                  onChange={setFilterLevel}
                  style={{ minWidth: 150 }}
                  allowClear
                >
                  <Option value="info">Info</Option>
                  <Option value="warning">Warning</Option>
                  <Option value="error">Error</Option>
                  <Option value="success">Success</Option>
                </Select>
                <Select
                  mode="multiple"
                  placeholder="Filter by source"
                  value={filterSource}
                  onChange={setFilterSource}
                  style={{ minWidth: 150 }}
                  allowClear
                >
                  {sources.map(source => (
                    <Option key={source} value={source}>{source}</Option>
                  ))}
                </Select>
                <RangePicker
                  onChange={(dates) => setDateRange(dates)}
                  style={{ width: 250 }}
                />
              </Space>
              <div>
                <Text type="secondary">
                  Showing {filteredLogs.length} of {logs.length} logs
                </Text>
                {(searchText || filterLevel.length > 0 || filterSource.length > 0 || (dateRange[0] && dateRange[1])) && (
                  <Button 
                    type="link" 
                    onClick={() => {
                      setSearchText('');
                      setFilterLevel([]);
                      setFilterSource([]);
                      setDateRange([null, null]);
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </Space>
          </div>
        )}

        <Table
          columns={columns}
          dataSource={filteredLogs}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          scroll={{ x: 'max-content' }}
          size="middle"
          rowClassName={(record) => {
            if (record.level === 'error') return 'error-row';
            if (record.level === 'warning') return 'warning-row';
            return '';
          }}
        />
      </Card>
    </motion.div>
  );
};

export default SystemLogTable;
