import React from 'react';
import { Space, Tooltip, Button } from '@cauldronos/ui';
import { 
  RobotOutlined, 
  BarChartOutlined, 
  FileTextOutlined, 
  BulbOutlined,
  ThunderboltOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  ToolOutlined
} from '@ant-design/icons';
import AIActionButton, { AIAction } from './AIActionButton';
import { useAI } from '../AIProvider';
import { useAIAssistant } from '../store/aiStore';
import { motion } from 'framer-motion';
import { z } from 'zod';

// Define common AI actions
const commonActions: AIAction[] = [
  {
    id: 'analyze-data',
    label: 'Analyze Data',
    description: 'Analyze the current data and provide insights',
    icon: <BarChartOutlined />,
    prompt: 'Analyze the current data and provide insights and recommendations.',
    outputType: 'markdown'
  },
  {
    id: 'generate-report',
    label: 'Generate Report',
    description: 'Generate a summary report of the current view',
    icon: <FileTextOutlined />,
    prompt: 'Generate a summary report of the current data and metrics.',
    outputType: 'table'
  },
  {
    id: 'suggest-actions',
    label: 'Suggest Actions',
    description: 'Get AI suggestions for next steps',
    icon: <BulbOutlined />,
    prompt: 'Based on the current state, what actions should I take next?',
    outputType: 'action'
  },
  {
    id: 'explain-data',
    label: 'Explain',
    description: 'Get an explanation of the current view',
    icon: <QuestionCircleOutlined />,
    prompt: 'Explain what I\'m looking at in simple terms.',
    outputType: 'markdown'
  },
  {
    id: 'optimize',
    label: 'Optimize',
    description: 'Get optimization suggestions',
    icon: <ToolOutlined />,
    prompt: 'How can I optimize this process or workflow?',
    outputType: 'markdown'
  }
];

// Define Zod schema for AIActionButtonsProps
const AIActionButtonsPropsSchema = z.object({
  actions: z.array(z.any()).optional(),
  size: z.enum(['small', 'middle', 'large']).optional(),
  type: z.enum(['default', 'primary', 'ghost', 'dashed', 'link', 'text']).optional(),
  shape: z.enum(['default', 'circle', 'round']).optional(),
  showLabels: z.boolean().optional(),
  showTooltips: z.boolean().optional(),
  direction: z.enum(['horizontal', 'vertical']).optional(),
  className: z.string().optional(),
  style: z.record(z.any()).optional(),
  contextData: z.record(z.any()).optional(),
  onActionComplete: z.function().args(z.string(), z.any()).returns(z.void()).optional()
});

export type AIActionButtonsProps = z.infer<typeof AIActionButtonsPropsSchema>;

/**
 * A component that displays a collection of AI action buttons.
 * It can use predefined actions or custom actions provided via props.
 * This implementation uses Zustand for state management and Zod for validation.
 */
const AIActionButtons: React.FC<AIActionButtonsProps> = ({
  actions,
  size = 'middle',
  type = 'default',
  shape = 'default',
  showLabels = true,
  showTooltips = true,
  direction = 'horizontal',
  className = '',
  style = {},
  contextData = {},
  onActionComplete
}) => {
  const { contextData: globalContextData } = useAI();
  const { contextData: storeContextData } = useAIAssistant();
  
  // Merge context data from all sources
  const mergedContextData = {
    ...globalContextData,
    ...storeContextData,
    ...contextData
  };
  
  // Use provided actions or default to common actions
  const buttonsToShow = actions || commonActions;
  
  // Handle action completion
  const handleActionComplete = (action: AIAction, result: any) => {
    if (onActionComplete) {
      onActionComplete(action.id, result);
    }
  };
  
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Space 
        direction={direction} 
        className={`ai-action-buttons ${className}`}
        style={style}
        wrap={direction === 'horizontal'}
      >
        {buttonsToShow.map((action) => (
          <motion.div key={action.id} variants={itemVariants}>
            <AIActionButton
              action={{
                ...action,
                contextData: {
                  ...mergedContextData,
                  ...action.contextData
                }
              }}
              size={size}
              type={type}
              shape={shape}
              showLabel={showLabels}
              showTooltip={showTooltips}
              onActionComplete={(result) => handleActionComplete(action, result)}
            />
          </motion.div>
        ))}
      </Space>
    </motion.div>
  );
};

// Define Zod schema for AIAssistantButtonProps
const AIAssistantButtonPropsSchema = z.object({
  size: z.enum(['small', 'middle', 'large']).optional(),
  type: z.enum(['default', 'primary', 'ghost', 'dashed', 'link', 'text']).optional(),
  shape: z.enum(['default', 'circle', 'round']).optional(),
  className: z.string().optional(),
  style: z.record(z.any()).optional(),
  tooltip: z.string().optional()
});

type AIAssistantButtonProps = z.infer<typeof AIAssistantButtonPropsSchema>;

/**
 * A component that displays a single AI assistant button that opens the AI assistant.
 */
export const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({
  size = 'middle',
  type = 'primary',
  shape = 'circle',
  className = '',
  style = {},
  tooltip = 'AI Assistant'
}) => {
  const { toggle: toggleVisibility } = useAIAssistant();
  const { useSwarm } = useAI();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Tooltip title={tooltip}>
        <Button
          type={type as any}
          size={size}
          shape={shape}
          className={className}
          style={style}
          onClick={toggleVisibility}
          icon={useSwarm ? <ThunderboltOutlined /> : <RobotOutlined />}
        />
      </Tooltip>
    </motion.div>
  );
};

// Define Zod schema for AIAnalyzeButtonProps
const AIAnalyzeButtonPropsSchema = z.object({
  size: z.enum(['small', 'middle', 'large']).optional(),
  type: z.enum(['default', 'primary', 'ghost', 'dashed', 'link', 'text']).optional(),
  shape: z.enum(['default', 'circle', 'round']).optional(),
  showLabel: z.boolean().optional(),
  className: z.string().optional(),
  style: z.record(z.any()).optional(),
  contextData: z.record(z.any()).optional(),
  onAnalysisComplete: z.function().args(z.any()).returns(z.void()).optional()
});

type AIAnalyzeButtonProps = z.infer<typeof AIAnalyzeButtonPropsSchema>;

/**
 * A component that displays a button to analyze the current view.
 */
export const AIAnalyzeButton: React.FC<AIAnalyzeButtonProps> = (props) => {
  const analyzeAction: AIAction = {
    id: 'analyze-view',
    label: 'Analyze',
    description: 'Analyze the current view and provide insights',
    icon: <BarChartOutlined />,
    prompt: 'Analyze what I\'m currently looking at and provide insights.',
    outputType: 'markdown',
    contextData: props.contextData
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AIActionButton
        action={analyzeAction}
        size={props.size}
        type={props.type}
        shape={props.shape}
        showLabel={props.showLabel}
        className={props.className}
        style={props.style}
        onActionComplete={props.onAnalysisComplete}
      />
    </motion.div>
  );
};

// Define Zod schema for AISearchButtonProps
const AISearchButtonPropsSchema = z.object({
  size: z.enum(['small', 'middle', 'large']).optional(),
  type: z.enum(['default', 'primary', 'ghost', 'dashed', 'link', 'text']).optional(),
  shape: z.enum(['default', 'circle', 'round']).optional(),
  showLabel: z.boolean().optional(),
  className: z.string().optional(),
  style: z.record(z.any()).optional(),
  searchQuery: z.string().optional(),
  onSearchComplete: z.function().args(z.any()).returns(z.void()).optional()
});

type AISearchButtonProps = z.infer<typeof AISearchButtonPropsSchema>;

/**
 * A component that displays a button to search with AI assistance.
 */
export const AISearchButton: React.FC<AISearchButtonProps> = (props) => {
  const searchAction: AIAction = {
    id: 'ai-search',
    label: 'AI Search',
    description: 'Search with AI assistance',
    icon: <SearchOutlined />,
    prompt: `Search for: ${props.searchQuery || '[Please provide a search query]'}`,
    outputType: 'markdown',
    contextData: {
      searchQuery: props.searchQuery
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AIActionButton
        action={searchAction}
        size={props.size}
        type={props.type}
        shape={props.shape}
        showLabel={props.showLabel}
        className={props.className}
        style={props.style}
        onActionComplete={props.onSearchComplete}
      />
    </motion.div>
  );
};

export default AIActionButtons;