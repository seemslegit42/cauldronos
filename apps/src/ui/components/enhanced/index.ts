/**
 * Enhanced UI Components
 * 
 * This file exports all enhanced UI components directly without using migration flags.
 * These components replace the standard Ant Design components with enhanced versions
 * that include cyberpunk styling, improved accessibility, and better integration with
 * the CauldronOS design system.
 */

// Import enhanced components
import Button from '../Button';
import Card from '../Card';
import Modal from '../Modal';
import { Input, Select, Checkbox, Switch, DatePicker, Upload, ZodForm, ZodFormItem } from '../form';
import { Table, List } from '../data-display';
import { PageContainer, ProLayout } from '../layout';
import { AICard, AIForm, AIInput, AITable } from '../ai';
import { Menu, Breadcrumb } from '../navigation';
import { Alert, Progress } from '../feedback';
import { Drawer } from '../overlay';

// Import utility components
import CodeHighlighter from '../CodeHighlighter';
import CodeExample from '../CodeExample';
import ResizablePanel from '../ResizablePanel';
import DraggableCard from '../DraggableCard';

// Import settings components
import UISettings from '../settings/UISettings';
import MigrationSettings from '../settings/MigrationSettings';

// Import example components
import CyberpunkDemo from '../examples/CyberpunkDemo';
import ZodFormExample from '../examples/ZodFormExample';

// Export enhanced components
export {
  // Core components
  Button,
  Card,
  Modal,
  
  // Form components
  Input,
  Select,
  Checkbox,
  Switch,
  DatePicker,
  Upload,
  ZodForm,
  ZodFormItem,
  
  // Data display components
  Table,
  List,
  
  // Layout components
  PageContainer,
  ProLayout,
  
  // Navigation components
  Menu,
  Breadcrumb,
  
  // Feedback components
  Alert,
  Progress,
  
  // Overlay components
  Drawer,
  
  // AI components
  AICard,
  AIForm,
  AIInput,
  AITable,
  
  // Utility components
  CodeHighlighter,
  CodeExample,
  ResizablePanel,
  DraggableCard,
  
  // Settings components
  UISettings,
  MigrationSettings,
  
  // Example components
  CyberpunkDemo,
  ZodFormExample,
};

// Export types
export type { ButtonProps } from '../Button';
export type { CardProps } from '../Card';
export type { ModalProps } from '../Modal';
export type { ZodFormProps, ZodFormItemProps } from '../form/ZodForm';
export type { AICardProps } from '../ai/AICard';
export type { CodeHighlighterProps } from '../CodeHighlighter';
export type { CodeExampleProps } from '../CodeExample';
export type { ResizablePanelProps } from '../ResizablePanel';
export type { DraggableCardProps } from '../DraggableCard';
export type { EnhancedMenuProps } from '../navigation/Menu';
export type { EnhancedBreadcrumbProps } from '../navigation/Breadcrumb';
export type { EnhancedAlertProps } from '../feedback/Alert';
export type { EnhancedProgressProps } from '../feedback/Progress';
export type { EnhancedDrawerProps } from '../overlay/Drawer';