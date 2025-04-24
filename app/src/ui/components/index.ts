// Export all component categories
export * from './form';
export * from './data-display';
export * from './layout';
export * from './ai';
export * from './feedback';
export * from './navigation';
export * from './overlay';
export * from './utility';
export * from './admin';
export * from './dashboard';
export * from './brand';

// Export all enhanced components
export * from './enhanced';

// Export existing components
export { default as CodeHighlighter } from './CodeHighlighter';
export { default as CodeExample } from './CodeExample';
export { default as ResizablePanel } from './ResizablePanel';
export { default as DraggableCard } from './DraggableCard';

// Export enhanced components directly (without migration flags)
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Modal, default as CyberpunkModal } from './Modal';
export { default as AICard } from './ai/AICard';
export { default as UISettings } from './settings/UISettings';

// Export settings components
export { default as MigrationSettings } from './settings/MigrationSettings';

// Export example components
export { default as CyberpunkDemo } from './examples/CyberpunkDemo';
export { default as ZodFormExample } from './examples/ZodFormExample';

// Export types
export type { CodeHighlighterProps } from './CodeHighlighter';
export type { CodeExampleProps } from './CodeExample';
export type { ResizablePanelProps } from './ResizablePanel';
export type { DraggableCardProps } from './DraggableCard';
export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
export type { ModalProps } from './Modal';
export type { AICardProps } from './ai/AICard';
export type { ZodFormProps, ZodFormItemProps } from './form/ZodForm';

// Re-export Motion components
export * from '@/ui/animations';

// Re-export common Ant Design components
// Note: Modal is exported as CyberpunkModal from our enhanced components
export {
  // Navigation
  Menu,
  Pagination,
  Steps,
  Breadcrumb,
  Dropdown,
  
  // Data Entry
  AutoComplete,
  Cascader,
  ColorPicker,
  // DatePicker is exported from our form components
  Mentions,
  Radio,
  Rate,
  Slider,
  TimePicker,
  Transfer,
  TreeSelect,
  
  // Data Display
  Collapse,
  Carousel,
  
  // Feedback
  Alert,
  Drawer,
  Message,
  // Modal is exported as CyberpunkModal from our enhanced components
  Notification,
  Popconfirm,
  Progress,
  Result,
  Skeleton,
  Spin,
  
  // Other
  Affix,
  App,
  ConfigProvider,
  FloatButton,
  Tour,
  Typography,
  QRCode,
  Watermark,
} from 'antd';

// Re-export Ant Design Pro components
export {
  ProCard,
  ProDescriptions,
  ProList,
  ProTable,
  StatisticCard,
} from '@ant-design/pro-components';
