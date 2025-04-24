/**
 * EnhancedList Component
 * 
 * An enhanced list component with advanced features like animations,
 * filtering, sorting, and cyberpunk styling.
 */

import React, { useState, useEffect } from 'react';
import { List, ListProps, Input, Button, Space, Typography, Dropdown, Menu, Empty, Skeleton } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SearchOutlined, 
  FilterOutlined, 
  SortAscendingOutlined, 
  SortDescendingOutlined,
  ReloadOutlined,
  SettingOutlined,
  DownOutlined,
  UpOutlined,
  PlusOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { useTheme } from '../../theme/useTheme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';
import type { MenuProps } from 'antd';

const { Text, Title } = Typography;

export interface EnhancedListProps<T> extends Omit<ListProps<T>, 'dataSource'> {
  /**
   * List data source
   */
  dataSource?: T[];
  
  /**
   * List title
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
   * Whether to enable search
   * @default true
   */
  searchable?: boolean;
  
  /**
   * Whether to enable filtering
   * @default true
   */
  filterable?: boolean;
  
  /**
   * Whether to enable sorting
   * @default true
   */
  sortable?: boolean;
  
  /**
   * Whether to enable refresh
   * @default true
   */
  refreshable?: boolean;
  
  /**
   * Whether to enable add item
   * @default false
   */
  addable?: boolean;
  
  /**
   * Whether to enable item selection
   * @default false
   */
  selectable?: boolean;
  
  /**
   * Whether to enable item expansion
   * @default false
   */
  expandable?: boolean;
  
  /**
   * Whether to enable item actions
   * @default false
   */
  actionable?: boolean;
  
  /**
   * Whether to enable item dragging
   * @default false
   */
  draggable?: boolean;
  
  /**
   * Whether to enable virtual scrolling
   * @default false
   */
  virtualScroll?: boolean;
  
  /**
   * Whether to enable item animation
   * @default true
   */
  animatedItems?: boolean;
  
  /**
   * Whether to enable empty state
   * @default true
   */
  emptyState?: boolean;
  
  /**
   * Whether to enable loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether to enable error state
   * @default true
   */
  errorState?: boolean;
  
  /**
   * Error message to display when error is true
   */
  errorMessage?: React.ReactNode;
  
  /**
   * Whether to show a grid layout
   * @default false
   */
  grid?: boolean;
  
  /**
   * Number of columns in grid layout
   * @default 3
   */
  columns?: number;
  
  /**
   * Whether to show a compact layout
   * @default false
   */
  compact?: boolean;
  
  /**
   * Filter options
   */
  filterOptions?: {
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }[];
  
  /**
   * Sort options
   */
  sortOptions?: {
    key: string;
    label: string;
    defaultOrder?: 'ascend' | 'descend';
  }[];
  
  /**
   * Callback for search
   */
  onSearch?: (searchText: string) => void;
  
  /**
   * Callback for filter
   */
  onFilter?: (filters: Record<string, string[]>) => void;
  
  /**
   * Callback for sort
   */
  onSort?: (sorter: { key: string; order: 'ascend' | 'descend' }) => void;
  
  /**
   * Callback for refresh
   */
  onRefresh?: () => void;
  
  /**
   * Callback for add item
   */
  onAdd?: () => void;
  
  /**
   * Callback for item selection
   */
  onSelect?: (selectedItems: T[]) => void;
  
  /**
   * Search placeholder
   */
  searchPlaceholder?: string;
  
  /**
   * Empty state content
   */
  emptyContent?: React.ReactNode;
  
  /**
   * Error state content
   */
  errorContent?: React.ReactNode;
  
  /**
   * Whether to show the header
   * @default true
   */
  showHeader?: boolean;
  
  /**
   * Whether to show the footer
   * @default false
   */
  showFooter?: boolean;
  
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Whether to show item hover effect
   * @default true
   */
  hoverEffect?: boolean;
  
  /**
   * Whether to show item dividers
   * @default true
   */
  showDividers?: boolean;
  
  /**
   * Whether to show item numbers
   * @default false
   */
  showItemNumbers?: boolean;
  
  /**
   * Whether to show item badges
   * @default false
   */
  showItemBadges?: boolean;
  
  /**
   * Function to get item badge
   */
  getItemBadge?: (item: T) => { count?: number; text?: string; status?: 'success' | 'processing' | 'default' | 'error' | 'warning' };
  
  /**
   * Function to get item key
   */
  getItemKey?: (item: T) => string | number;
  
  /**
   * Function to get item actions
   */
  getItemActions?: (item: T) => React.ReactNode[];
  
  /**
   * Function to get expanded content
   */
  getExpandedContent?: (item: T) => React.ReactNode;
  
  /**
   * Function to check if item is expanded
   */
  isItemExpanded?: (item: T) => boolean;
  
  /**
   * Function to toggle item expansion
   */
  toggleItemExpansion?: (item: T) => void;
}

/**
 * EnhancedList component
 * 
 * An enhanced list component with advanced features like animations,
 * filtering, sorting, and cyberpunk styling.
 */
export function EnhancedList<T extends Record<string, any> = any>({
  dataSource = [],
  title,
  extra,
  cyberpunk = false,
  searchable = true,
  filterable = true,
  sortable = true,
  refreshable = true,
  addable = false,
  selectable = false,
  expandable = false,
  actionable = false,
  draggable = false,
  virtualScroll = false,
  animatedItems = true,
  emptyState = true,
  loading = false,
  errorState = true,
  errorMessage,
  grid = false,
  columns = 3,
  compact = false,
  filterOptions = [],
  sortOptions = [],
  onSearch,
  onFilter,
  onSort,
  onRefresh,
  onAdd,
  onSelect,
  searchPlaceholder = 'Search...',
  emptyContent,
  errorContent,
  showHeader = true,
  showFooter = false,
  footer,
  hoverEffect = true,
  showDividers = true,
  showItemNumbers = false,
  showItemBadges = false,
  getItemBadge,
  getItemKey,
  getItemActions,
  getExpandedContent,
  isItemExpanded,
  toggleItemExpansion,
  className = '',
  ...props
}: EnhancedListProps<T>) {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  // State
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [activeSorter, setActiveSorter] = useState<{ key: string; order: 'ascend' | 'descend' } | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());
  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());
  const [error, setError] = useState<boolean>(false);
  
  // Initialize sorter
  useEffect(() => {
    if (sortOptions.length > 0) {
      const defaultSorter = sortOptions.find(option => option.defaultOrder);
      if (defaultSorter) {
        setActiveSorter({
          key: defaultSorter.key,
          order: defaultSorter.defaultOrder || 'ascend',
        });
      }
    }
  }, [sortOptions]);
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch?.(value);
  };
  
  // Handle filter
  const handleFilter = (key: string, values: string[]) => {
    const newFilters = { ...activeFilters, [key]: values };
    if (values.length === 0) {
      delete newFilters[key];
    }
    setActiveFilters(newFilters);
    onFilter?.(newFilters);
  };
  
  // Handle sort
  const handleSort = (key: string) => {
    let order: 'ascend' | 'descend' = 'ascend';
    
    if (activeSorter?.key === key) {
      order = activeSorter.order === 'ascend' ? 'descend' : 'ascend';
    }
    
    const newSorter = { key, order };
    setActiveSorter(newSorter);
    onSort?.(newSorter);
  };
  
  // Handle refresh
  const handleRefresh = () => {
    onRefresh?.();
  };
  
  // Handle add
  const handleAdd = () => {
    onAdd?.();
  };
  
  // Handle item expansion
  const handleItemExpansion = (item: T) => {
    if (toggleItemExpansion) {
      toggleItemExpansion(item);
      return;
    }
    
    const key = getItemKey ? getItemKey(item) : item.id || item.key;
    const newExpandedItems = new Set(expandedItems);
    
    if (newExpandedItems.has(key)) {
      newExpandedItems.delete(key);
    } else {
      newExpandedItems.add(key);
    }
    
    setExpandedItems(newExpandedItems);
  };
  
  // Handle item selection
  const handleItemSelection = (item: T) => {
    const key = getItemKey ? getItemKey(item) : item.id || item.key;
    const newSelectedItems = new Set(selectedItems);
    
    if (newSelectedItems.has(key)) {
      newSelectedItems.delete(key);
    } else {
      newSelectedItems.add(key);
    }
    
    setSelectedItems(newSelectedItems);
    
    const selectedItemsList = dataSource.filter(item => {
      const itemKey = getItemKey ? getItemKey(item) : item.id || item.key;
      return newSelectedItems.has(itemKey);
    });
    
    onSelect?.(selectedItemsList);
  };
  
  // Check if item is expanded
  const checkItemExpanded = (item: T) => {
    if (isItemExpanded) {
      return isItemExpanded(item);
    }
    
    const key = getItemKey ? getItemKey(item) : item.id || item.key;
    return expandedItems.has(key);
  };
  
  // Check if item is selected
  const checkItemSelected = (item: T) => {
    const key = getItemKey ? getItemKey(item) : item.id || item.key;
    return selectedItems.has(key);
  };
  
  // Get class names
  const getClassNames = () => {
    return [
      'enhanced-list',
      cyberpunk ? 'cyberpunk-list' : '',
      grid ? 'grid-list' : '',
      compact ? 'compact-list' : '',
      hoverEffect ? 'hover-effect' : '',
      showDividers ? 'show-dividers' : '',
      className,
    ].filter(Boolean).join(' ');
  };
  
  // Render list header
  const renderHeader = () => {
    if (!showHeader) return null;
    
    return (
      <div className={`list-header ${cyberpunk ? 'cyberpunk-header' : ''}`}>
        <div className="header-left">
          {title && (
            <Title level={5} className="list-title">
              {title}
            </Title>
          )}
        </div>
        
        <div className="header-right">
          {searchable && (
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
            {filterable && filterOptions.length > 0 && (
              <Dropdown
                menu={{
                  items: filterOptions.map(filter => ({
                    key: filter.key,
                    label: filter.label,
                    children: filter.options.map(option => ({
                      key: `${filter.key}-${option.value}`,
                      label: (
                        <div>
                          <Checkbox
                            checked={activeFilters[filter.key]?.includes(option.value)}
                            onChange={e => {
                              const values = activeFilters[filter.key] || [];
                              if (e.target.checked) {
                                handleFilter(filter.key, [...values, option.value]);
                              } else {
                                handleFilter(
                                  filter.key,
                                  values.filter(v => v !== option.value)
                                );
                              }
                            }}
                          >
                            {option.label}
                          </Checkbox>
                        </div>
                      ),
                    })),
                  })),
                }}
                trigger={['click']}
                placement="bottomRight"
                overlayClassName={`filter-dropdown ${cyberpunk ? 'cyberpunk-dropdown' : ''}`}
              >
                <Button
                  icon={<FilterOutlined />}
                  type={Object.keys(activeFilters).length > 0 ? 'primary' : 'default'}
                  className={`filter-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
                >
                  Filter
                  <DownOutlined />
                </Button>
              </Dropdown>
            )}
            
            {sortable && sortOptions.length > 0 && (
              <Dropdown
                menu={{
                  items: sortOptions.map(sort => ({
                    key: sort.key,
                    label: (
                      <div onClick={() => handleSort(sort.key)}>
                        {sort.label}
                        {activeSorter?.key === sort.key && (
                          <span style={{ marginLeft: 8 }}>
                            {activeSorter.order === 'ascend' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                          </span>
                        )}
                      </div>
                    ),
                  })),
                }}
                trigger={['click']}
                placement="bottomRight"
                overlayClassName={`sort-dropdown ${cyberpunk ? 'cyberpunk-dropdown' : ''}`}
              >
                <Button
                  icon={activeSorter ? (activeSorter.order === 'ascend' ? <SortAscendingOutlined /> : <SortDescendingOutlined />) : <SortAscendingOutlined />}
                  type={activeSorter ? 'primary' : 'default'}
                  className={`sort-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
                >
                  Sort
                  <DownOutlined />
                </Button>
              </Dropdown>
            )}
            
            {refreshable && (
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                className={`refresh-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
              />
            )}
            
            {addable && (
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={handleAdd}
                className={`add-button ${cyberpunk ? 'cyberpunk-button' : ''}`}
              >
                Add
              </Button>
            )}
            
            {extra}
          </Space>
        </div>
      </div>
    );
  };
  
  // Render list footer
  const renderFooter = () => {
    if (!showFooter && !footer) return null;
    
    return (
      <div className={`list-footer ${cyberpunk ? 'cyberpunk-footer' : ''}`}>
        {footer}
      </div>
    );
  };
  
  // Render empty state
  const renderEmpty = () => {
    if (!emptyState) return null;
    
    return emptyContent || <Empty description="No data" />;
  };
  
  // Render error state
  const renderError = () => {
    if (!errorState || !error) return null;
    
    return (
      errorContent || (
        <div className="list-error">
          <Text type="danger">{errorMessage || 'An error occurred'}</Text>
          {refreshable && (
            <Button type="primary" danger onClick={handleRefresh}>
              Retry
            </Button>
          )}
        </div>
      )
    );
  };
  
  // Render list item
  const renderItem = (item: T, index: number) => {
    const itemKey = getItemKey ? getItemKey(item) : item.id || item.key || index;
    const isExpanded = expandable && checkItemExpanded(item);
    const isSelected = selectable && checkItemSelected(item);
    
    // Get item actions
    const actions = actionable && getItemActions ? getItemActions(item) : [];
    
    // Get item badge
    const badge = showItemBadges && getItemBadge ? getItemBadge(item) : null;
    
    // Render item content
    const itemContent = (
      <div className={`list-item-content ${isSelected ? 'selected' : ''}`}>
        {showItemNumbers && (
          <div className="item-number">{index + 1}</div>
        )}
        
        {props.renderItem?.(item, index)}
        
        {expandable && (
          <Button
            type="text"
            icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
            onClick={() => handleItemExpansion(item)}
            className="expand-button"
          />
        )}
        
        {actionable && actions && actions.length > 0 && (
          <div className="item-actions">
            {actions}
          </div>
        )}
      </div>
    );
    
    // Render expanded content
    const expandedContent = expandable && isExpanded && getExpandedContent ? (
      <div className="expanded-content">
        {getExpandedContent(item)}
      </div>
    ) : null;
    
    // Apply animation if enabled
    if (animatedItems && !reducedMotionEnabled) {
      return (
        <motion.div
          key={itemKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`list-item-wrapper ${isExpanded ? 'expanded' : ''}`}
          onClick={selectable ? () => handleItemSelection(item) : undefined}
        >
          {itemContent}
          <AnimatePresence>
            {expandedContent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {expandedContent}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }
    
    return (
      <div
        key={itemKey}
        className={`list-item-wrapper ${isExpanded ? 'expanded' : ''}`}
        onClick={selectable ? () => handleItemSelection(item) : undefined}
      >
        {itemContent}
        {expandedContent}
      </div>
    );
  };
  
  // Get list props
  const getListProps = () => {
    const listProps: ListProps<T> = {
      dataSource,
      renderItem: renderItem,
      loading: loading ? { spinning: true, indicator: <Skeleton active /> } : false,
      locale: { emptyText: renderEmpty() },
      ...props,
    };
    
    // Add grid props if grid is enabled
    if (grid) {
      listProps.grid = {
        gutter: 16,
        xs: 1,
        sm: 2,
        md: columns,
        lg: columns,
        xl: columns,
        xxl: columns,
        ...(props.grid || {}),
      };
    }
    
    return listProps;
  };
  
  // Render the list
  return (
    <div className={getClassNames()}>
      {renderHeader()}
      
      {error ? (
        renderError()
      ) : (
        <List {...getListProps()} />
      )}
      
      {renderFooter()}
    </div>
  );
}

export default EnhancedList;
