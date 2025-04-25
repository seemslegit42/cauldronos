import React, { useState } from 'react';
import { Table, TableProps, Input, Button, Tooltip, Space, Typography } from 'antd';
import { SearchOutlined, FilterOutlined, SortAscendingOutlined, DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';

const { Text } = Typography;

export interface AITableProps<RecordType extends object = any> extends TableProps<RecordType> {
  onSearch?: (searchText: string) => void;
  onAIFilter?: (data: RecordType[]) => Promise<RecordType[]>;
  onExport?: (data: RecordType[]) => void;
  searchPlaceholder?: string;
  aiEnabled?: boolean;
  cyberpunk?: boolean;
  loading?: boolean;
}

/**
 * AI-enhanced table component with smart filtering and search
 */
export function AITable<RecordType extends object = any>({
  dataSource,
  onSearch,
  onAIFilter,
  onExport,
  searchPlaceholder = 'Search...',
  aiEnabled = true,
  cyberpunk = false,
  loading = false,
  className = '',
  ...props
}: AITableProps<RecordType>) {
  const { reducedMotion } = useMotion();
  const [searchText, setSearchText] = useState('');
  const [aiFiltering, setAiFiltering] = useState(false);
  const [aiFilteredData, setAiFilteredData] = useState<RecordType[] | null>(null);
  const [aiFilterPrompt, setAiFilterPrompt] = useState('');

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle AI filtering
  const handleAIFilter = async () => {
    if (!onAIFilter || !dataSource || aiFiltering) return;

    try {
      setAiFiltering(true);
      const prompt = window.prompt('Describe what you want to filter (e.g., "Show only items with high priority")');
      
      if (!prompt) {
        setAiFiltering(false);
        return;
      }

      setAiFilterPrompt(prompt);
      const filteredData = await onAIFilter(dataSource);
      setAiFilteredData(filteredData);
    } catch (error) {
      console.error('Error applying AI filter:', error);
    } finally {
      setAiFiltering(false);
    }
  };

  // Handle export
  const handleExport = () => {
    if (!onExport) return;
    
    const dataToExport = aiFilteredData || dataSource;
    if (dataToExport) {
      onExport(dataToExport);
    }
  };

  // Reset AI filter
  const resetAIFilter = () => {
    setAiFilteredData(null);
    setAiFilterPrompt('');
  };

  // Determine which data to display
  const displayData = aiFilteredData || dataSource;

  return (
    <div className={`ai-table-container ${cyberpunk ? 'cyberpunk' : ''} ${className}`}>
      <div className="ai-table-toolbar">
        <Input
          prefix={<SearchOutlined />}
          placeholder={searchPlaceholder}
          value={searchText}
          onChange={handleSearchChange}
          className="ai-table-search"
          allowClear
        />
        
        <Space>
          {aiEnabled && (
            <Tooltip title="AI Filter">
              <Button
                icon={<FilterOutlined />}
                onClick={handleAIFilter}
                loading={aiFiltering}
                type={aiFilteredData ? 'primary' : 'default'}
              >
                AI Filter
              </Button>
            </Tooltip>
          )}
          
          {onExport && (
            <Tooltip title="Export Data">
              <Button
                icon={<DownloadOutlined />}
                onClick={handleExport}
              >
                Export
              </Button>
            </Tooltip>
          )}
        </Space>
      </div>
      
      {aiFilterPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="ai-filter-indicator"
        >
          <Text type="secondary">
            <FilterOutlined /> AI Filter: "{aiFilterPrompt}"
          </Text>
          <Button 
            type="text" 
            icon={<ReloadOutlined />} 
            size="small" 
            onClick={resetAIFilter}
          >
            Reset
          </Button>
        </motion.div>
      )}
      
      <Table
        dataSource={displayData}
        loading={loading || aiFiltering}
        {...props}
      />
    </div>
  );
}

export default AITable;