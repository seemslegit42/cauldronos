import React, { useState, useEffect } from 'react';
import { Table, TableProps, Card, Button, Space, Tooltip, Badge } from 'antd';
import { InfoCircleOutlined, LineChartOutlined, FilterOutlined, SettingOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme';

export interface SmartTableProps<RecordType extends object = any> extends Omit<TableProps<RecordType>, 'columns'> {
  /**
   * Table columns configuration
   */
  columns: any[];
  
  /**
   * Enable AI insights for the table data
   * @default false
   */
  insights?: boolean;
  
  /**
   * Enable pattern detection in the data
   * @default false
   */
  patternDetection?: boolean;
  
  /**
   * Highlight anomalies in the data
   * @default false
   */
  anomalyHighlighting?: boolean;
  
  /**
   * Enable smart filtering based on data patterns
   * @default false
   */
  smartFiltering?: boolean;
  
  /**
   * Title for the table
   */
  title?: React.ReactNode;
  
  /**
   * Extra content to render in the header
   */
  extra?: React.ReactNode;
}

/**
 * SmartTable component
 * 
 * An AI-enhanced table component that provides intelligent features like
 * data insights, pattern detection, anomaly highlighting, and smart filtering.
 */
export const SmartTable = <RecordType extends object = any>({
  columns = [],
  dataSource = [],
  insights = false,
  patternDetection = false,
  anomalyHighlighting = false,
  smartFiltering = false,
  title,
  extra,
  ...props
}: SmartTableProps<RecordType>) => {
  const { token } = useTheme();
  const [showInsights, setShowInsights] = useState(false);
  const [enhancedColumns, setEnhancedColumns] = useState(columns);
  const [enhancedDataSource, setEnhancedDataSource] = useState(dataSource);
  
  // Process columns and data to add AI features
  useEffect(() => {
    if (!columns.length || !dataSource?.length) return;
    
    // Process columns to add highlighting and tooltips
    const processedColumns = columns.map(column => ({
      ...column,
      render: column.render || ((text: any, record: any) => {
        // Add anomaly highlighting if enabled
        if (anomalyHighlighting && isAnomaly(text, column.dataIndex, record)) {
          return (
            <Tooltip title="This value appears to be an anomaly based on the data pattern">
              <Badge color={token.colorWarning} dot>
                <span style={{ color: token.colorWarning }}>{text}</span>
              </Badge>
            </Tooltip>
          );
        }
        
        // Add pattern highlighting if enabled
        if (patternDetection && isPartOfPattern(text, column.dataIndex, record)) {
          return (
            <Tooltip title="This value is part of a detected pattern">
              <Badge color={token.colorInfo} dot>
                <span>{text}</span>
              </Badge>
            </Tooltip>
          );
        }
        
        return text;
      })
    }));
    
    setEnhancedColumns(processedColumns);
    setEnhancedDataSource(dataSource);
  }, [columns, dataSource, anomalyHighlighting, patternDetection, token]);
  
  // Mock functions for demo purposes
  const isAnomaly = (value: any, field: string, record: any) => {
    // In a real implementation, this would use statistical analysis or ML
    // For demo, just flag some random values
    return field === 'age' && value > 80 || 
           field === 'amount' && value > 1000 ||
           Math.random() < 0.05; // 5% chance for any value
  };
  
  const isPartOfPattern = (value: any, field: string, record: any) => {
    // In a real implementation, this would use pattern recognition algorithms
    // For demo, just flag some values based on simple rules
    return field === 'status' && value === 'active' ||
           field === 'type' && value === 'premium' ||
           Math.random() < 0.1; // 10% chance for any value
  };
  
  // Mock insights for demo purposes
  const getInsights = () => {
    return [
      "20% of the data shows higher than average values",
      "There's a strong correlation between column A and column B",
      "3 potential anomalies detected in the dataset",
      "Data shows an upward trend over time"
    ];
  };
  
  // Render insights panel
  const renderInsightsPanel = () => {
    if (!insights || !showInsights) return null;
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            size="small" 
            style={{ 
              marginBottom: 16, 
              borderColor: token.colorPrimary,
              backgroundColor: `${token.colorPrimary}10`
            }}
          >
            <h4 style={{ margin: '0 0 8px' }}>AI Insights</h4>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {getInsights().map((insight, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {insight}
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </AnimatePresence>
    );
  };
  
  // Render table header with AI controls
  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          {title && <h3 style={{ margin: 0 }}>{title}</h3>}
        </div>
        <Space>
          {insights && (
            <Button 
              type={showInsights ? "primary" : "default"}
              icon={<InfoCircleOutlined />}
              onClick={() => setShowInsights(!showInsights)}
            >
              Insights
            </Button>
          )}
          {patternDetection && (
            <Tooltip title="Pattern detection is enabled">
              <Button icon={<LineChartOutlined />} />
            </Tooltip>
          )}
          {smartFiltering && (
            <Tooltip title="Smart filtering is enabled">
              <Button icon={<FilterOutlined />} />
            </Tooltip>
          )}
          <Button icon={<SettingOutlined />} />
          {extra}
        </Space>
      </div>
    );
  };
  
  return (
    <div>
      {(title || insights || patternDetection || smartFiltering || extra) && renderHeader()}
      {renderInsightsPanel()}
      <Table
        columns={enhancedColumns}
        dataSource={enhancedDataSource}
        {...props}
      />
    </div>
  );
};

export default SmartTable;
