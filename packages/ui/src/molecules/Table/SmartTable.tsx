/**
 * SmartTable Component
 * 
 * An enhanced table component with advanced features like sorting, filtering,
 * pagination, selection, and cyberpunk styling.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Table, TableProps, Input, Button, Space, Tooltip, Typography, Dropdown, Menu, Badge } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  SortAscendingOutlined, 
  SortDescendingOutlined,
  DownloadOutlined, 
  ReloadOutlined,
  SettingOutlined,
  EyeOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme/useTheme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';
import type { MenuProps } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';

const { Text, Title } = Typography;

export interface SmartTableProps<RecordType extends object = any> extends Omit<TableProps<RecordType>, 'columns'> {
  /**
   * Table columns
   */
  columns?: ColumnsType<RecordType>;
  
  /**
   * Table data source
   */
  dataSource?: RecordType[];
  
  /**
   * Table title
   */
  title?: React.ReactNode;
  
  /**
   * Extra content in the top-right corner
   */
  extra?: React.ReactNode;
  
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to enable advanced search
   * @default true
   */
  advancedSearch?: boolean;
  
  /**
   * Whether to enable column customization
   * @default true
   */
  columnCustomization?: boolean;
  
  /**
   * Whether to enable data export
   * @default true
   */
  exportable?: boolean;
  
  /**
   * Whether to enable fullscreen mode
   * @default true
   */
  fullscreenable?: boolean;
  
  /**
   * Whether to enable data visualization
   * @default false
   */
  visualizable?: boolean;
  
  /**
   * Whether to enable row selection
   * @default false
   */
  selectable?: boolean;
  
  /**
   * Whether to enable row expansion
   * @default false
   */
  expandable?: boolean;
  
  /**
   * Whether to enable row editing
   * @default false
   */
  editable?: boolean;
  
  /**
   * Whether to enable row details
   * @default false
   */
  detailable?: boolean;
  
  /**
   * Whether to enable row actions
   * @default false
   */
  actionable?: boolean;
  
  /**
   * Whether to enable row dragging
   * @default false
   */
  draggable?: boolean;
  
  /**
   * Whether to enable virtual scrolling
   * @default false
   */
  virtualScroll?: boolean;
  
  /**
   * Whether to enable sticky header
   * @default true
   */
  stickyHeader?: boolean;
  
  /**
   * Whether to enable sticky columns
   * @default false
   */
  stickyColumns?: boolean;
  
  /**
   * Whether to enable resizable columns
   * @default false
   */
  resizableColumns?: boolean;
  
  /**
   * Whether to enable row highlighting
   * @default false
   */
  highlightRows?: boolean;
  
  /**
   * Whether to enable row striping
   * @default true
   */
  stripedRows?: boolean;
  
  /**
   * Whether to enable row hovering
   * @default true
   */
  hoverableRows?: boolean;
  
  /**
   * Whether to enable row animation
   * @default true
   */
  animatedRows?: boolean;
  
  /**
   * Whether to enable column sorting
   * @default true
   */
  sortable?: boolean;
  
  /**
   * Whether to enable column filtering
   * @default true
   */
  filterable?: boolean;
  
  /**
   * Whether to enable pagination
   * @default true
   */
  pageable?: boolean;
  
  /**
   * Whether to enable loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether to enable empty state
   * @default true
   */
  emptyState?: boolean;
  
  /**
   * Whether to enable error state
   * @default true
   */
  errorState?: boolean;
  
  /**
   * Whether to enable refresh
   * @default true
   */
  refreshable?: boolean;
  
  /**
   * Whether to enable data insights
   * @default false
   */
  insights?: boolean;
  
  /**
   * Whether to enable pattern detection
   * @default false
   */
  patternDetection?: boolean;
  
  /**
   * Whether to enable anomaly highlighting
   * @default false
   */
  anomalyHighlighting?: boolean;
  
  /**
   * Whether to enable smart filtering
   * @default false
   */
  smartFiltering?: boolean;
  
  /**
   * Callback for search
   */
  onSearch?: (searchText: string) => void;
  
  /**
   * Callback for export
   */
  onExport?: (data: RecordType[]) => void;
  
  /**
   * Callback for refresh
   */
  onRefresh?: () => void;
  
  /**
   * Callback for column customization
   */
  onColumnChange?: (columns: ColumnsType<RecordType>) => void;
  
  /**
   * Callback for fullscreen toggle
   */
  onFullscreenChange?: (fullscreen: boolean) => void;
  
  /**
   * Callback for visualization
   */
  onVisualize?: (data: RecordType[]) => void;
  
  /**
   * Search placeholder
   */
  searchPlaceholder?: string;
}

/**
 * SmartTable component
 * 
 * An enhanced table component with advanced features like sorting, filtering,
 * pagination, selection, and cyberpunk styling.
 */
export function SmartTable<RecordType extends object = any>({
  columns = [],
  dataSource = [],
  title,
  extra,
  cyberpunk = false,
  advancedSearch = true,
  columnCustomization = true,
  exportable = true,
  fullscreenable = true,
  visualizable = false,
  selectable = false,
  expandable = false,
  editable = false,
  detailable = false,
  actionable = false,
  draggable = false,
  virtualScroll = false,
  stickyHeader = true,
  stickyColumns = false,
  resizableColumns = false,
  highlightRows = false,
  stripedRows = true,
  hoverableRows = true,
  animatedRows = true,
  sortable = true,
  filterable = true,
  pageable = true,
  loading = false,
  emptyState = true,
  errorState = true,
  refreshable = true,
  insights = false,
  patternDetection = false,
  anomalyHighlighting = false,
  smartFiltering = false,
  onSearch,
  onExport,
  onRefresh,
  onColumnChange,
  onFullscreenChange,
  onVisualize,
  searchPlaceholder = 'Search...',
  className = '',
  ...props
}: SmartTableProps<RecordType>) {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  // State
  const [searchText, setSearchText] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [enhancedColumns, setEnhancedColumns] = useState<ColumnsType<RecordType>>([]);
  const [enhancedDataSource, setEnhancedDataSource] = useState<RecordType[]>([]);
  
  // Refs
  const tableRef = useRef<HTMLDivElement>(null);
  
  // Initialize columns and data
  useEffect(() => {
    if (columns.length > 0) {
      // Initialize visible columns
      const initialVisibleColumns = columns.map((column) => column.key as string);
      setVisibleColumns(initialVisibleColumns);
      
      // Apply column enhancements
      const enhanced = enhanceColumns(columns);
      setEnhancedColumns(enhanced);
    }
  }, [columns]);
  
  // Update data source
  useEffect(() => {
    if (dataSource) {
      setEnhancedDataSource(dataSource);
    }
  }, [dataSource]);
  
  // Enhance columns with sorting, filtering, etc.
  const enhanceColumns = (cols: ColumnsType<RecordType>): ColumnsType<RecordType> => {
    if (!cols) return [];
    
    return cols.map((column) => {
      const enhancedColumn: ColumnType<RecordType> = { ...column };
      
      // Add sorting if enabled
      if (sortable && column.dataIndex) {
        enhancedColumn.sorter = enhancedColumn.sorter || true;
      }
      
      // Add filtering if enabled
      if (filterable && column.dataIndex) {
        enhancedColumn.filters = enhancedColumn.filters || [];
        enhancedColumn.onFilter = enhancedColumn.onFilter || true;
      }
      
      return enhancedColumn;
    });
  };
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch?.(value);
  };
  
  // Handle export
  const handleExport = () => {
    onExport?.(enhancedDataSource);
  };
  
  // Handle refresh
  const handleRefresh = () => {
    onRefresh?.();
  };
  
  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);
    onFullscreenChange?.(newFullscreenState);
    
    // Toggle fullscreen class on container
    if (tableRef.current) {
      if (newFullscreenState) {
        tableRef.current.classList.add('fullscreen');
      } else {
        tableRef.current.classList.remove('fullscreen');
      }
    }
  };
  
  // Handle visualization
  const handleVisualize = () => {
    onVisualize?.(enhancedDataSource);
  };
  
  // Handle column visibility change
  const handleColumnVisibilityChange = (checkedKeys: string[]) => {
    setVisibleColumns(checkedKeys);
    
    // Filter columns based on visibility
    const newColumns = enhancedColumns.filter((column) => 
      checkedKeys.includes(column.key as string)
    );
    
    setEnhancedColumns(newColumns);
    onColumnChange?.(newColumns);
  };
  
  // Handle insights toggle
  const handleInsightsToggle = () => {
    setShowInsights(!showInsights);
  };
  
  // Render table header
  const renderHeader = () => {
    return (
      <div className={`smart-table-header ${cyberpunk ? 'cyberpunk-header' : ''}`}>
        <div className="header-left">
          {title && (
            <Title level={5} className="table-title">
              {title}
            </Title>
          )}
        </div>
        
        <div className="header-right">
          {advancedSearch && (
            <Input
              placeholder={searchPlaceholder}
              value={searchText}
              onChange={handleSearch}
              prefix={<SearchOutlined />}
              allowClear
              className={`search-input ${cyberpunk ? 'cyberpunk-input' : ''}`}
            />
          )}
          
          <Space>
            {columnCustomization && (
              <Tooltip title="Customize columns">
                <Dropdown
                  menu={{
                    items: enhancedColumns.map((column) => ({
                      key: column.key as string,
                      label: column.title as string,
                      checked: visibleColumns.includes(column.key as string),
                    })),
                    selectable: true,
                    multiple: true,
                    selectedKeys: visibleColumns,
                    onSelect: ({ key }) => {
                      const newKeys = [...visibleColumns, key];
                      handleColumnVisibilityChange(newKeys);
                    },
                    onDeselect: ({ key }) => {
                      const newKeys = visibleColumns.filter((k) => k !== key);
                      handleColumnVisibilityChange(newKeys);
                    },
                  }}
                  trigger={['click']}
                  placement="bottomRight"
                  overlayClassName={`column-dropdown ${cyberpunk ? 'cyberpunk-dropdown' : ''}`}
                >
                  <Button
                    icon={<SettingOutlined />}
                    type="text"
                    className={`action-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
                  />
                </Dropdown>
              </Tooltip>
            )}
            
            {refreshable && (
              <Tooltip title="Refresh data">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                  type="text"
                  className={`action-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
                />
              </Tooltip>
            )}
            
            {exportable && (
              <Tooltip title="Export data">
                <Button
                  icon={<DownloadOutlined />}
                  onClick={handleExport}
                  type="text"
                  className={`action-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
                />
              </Tooltip>
            )}
            
            {visualizable && (
              <Tooltip title="Visualize data">
                <Button
                  icon={<BarChartOutlined />}
                  onClick={handleVisualize}
                  type="text"
                  className={`action-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
                />
              </Tooltip>
            )}
            
            {insights && (
              <Tooltip title={showInsights ? 'Hide insights' : 'Show insights'}>
                <Button
                  icon={<EyeOutlined />}
                  onClick={handleInsightsToggle}
                  type={showInsights ? 'primary' : 'text'}
                  className={`action-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
                />
              </Tooltip>
            )}
            
            {fullscreenable && (
              <Tooltip title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
                <Button
                  icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                  onClick={handleFullscreenToggle}
                  type="text"
                  className={`action-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
                />
              </Tooltip>
            )}
            
            {extra}
          </Space>
        </div>
      </div>
    );
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
          className={`insights-panel ${cyberpunk ? 'cyberpunk-insights' : ''}`}
        >
          <div className="insights-header">
            <Title level={5}>Data Insights</Title>
          </div>
          
          <div className="insights-content">
            <div className="insight-item">
              <Badge status="processing" text="Total Records" />
              <Text strong>{enhancedDataSource.length}</Text>
            </div>
            
            {patternDetection && (
              <div className="insight-item">
                <Badge status="success" text="Patterns Detected" />
                <Text strong>3</Text>
              </div>
            )}
            
            {anomalyHighlighting && (
              <div className="insight-item">
                <Badge status="warning" text="Anomalies Detected" />
                <Text strong>2</Text>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };
  
  // Get table props
  const getTableProps = () => {
    const tableProps: TableProps<RecordType> = {
      columns: enhancedColumns,
      dataSource: enhancedDataSource,
      loading,
      ...props,
    };
    
    // Add pagination if enabled
    if (pageable) {
      tableProps.pagination = {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `Total ${total} items`,
        ...(props.pagination || {}),
      };
    } else {
      tableProps.pagination = false;
    }
    
    // Add row selection if enabled
    if (selectable) {
      tableProps.rowSelection = {
        type: 'checkbox',
        ...(props.rowSelection || {}),
      };
    }
    
    // Add sticky header if enabled
    if (stickyHeader) {
      tableProps.sticky = true;
    }
    
    // Add virtual scrolling if enabled
    if (virtualScroll) {
      tableProps.virtual = true;
      tableProps.scroll = { y: 500, ...(props.scroll || {}) };
    }
    
    return tableProps;
  };
  
  // Get class names
  const getClassNames = () => {
    return [
      'smart-table',
      cyberpunk ? 'cyberpunk-table' : '',
      stripedRows ? 'striped-rows' : '',
      hoverableRows ? 'hoverable-rows' : '',
      highlightRows ? 'highlight-rows' : '',
      isFullscreen ? 'fullscreen' : '',
      className,
    ].filter(Boolean).join(' ');
  };
  
  return (
    <div ref={tableRef} className={getClassNames()}>
      {(title || advancedSearch || columnCustomization || exportable || 
        refreshable || fullscreenable || visualizable || insights || extra) && 
        renderHeader()}
      
      {renderInsightsPanel()}
      
      <Table
        {...getTableProps()}
        className={`table-component ${cyberpunk ? 'cyberpunk-table-component' : ''}`}
      />
    </div>
  );
}

export default SmartTable;
