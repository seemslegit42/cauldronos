/**
 * PredictiveInput Component
 * 
 * An AI-enhanced input component that provides intelligent features like
 * suggestions, auto-completion, and validation.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Input, InputProps, Tooltip, Popover, Typography, Tag, Space, Button } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { RobotOutlined, BulbOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useTheme } from '../../theme/useTheme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';

const { Text } = Typography;
const { TextArea } = Input;

export interface PredictiveInputProps extends Omit<InputProps, 'onChange'> {
  /**
   * Input value
   */
  value?: string;
  
  /**
   * Default input value
   */
  defaultValue?: string;
  
  /**
   * Callback when input value changes
   */
  onChange?: (value: string) => void;
  
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to enable AI assistance
   * @default true
   */
  aiAssistance?: boolean;
  
  /**
   * Whether to show suggestions
   * @default true
   */
  showSuggestions?: boolean;
  
  /**
   * Whether to show validation
   * @default true
   */
  showValidation?: boolean;
  
  /**
   * Whether to show completion
   * @default false
   */
  showCompletion?: boolean;
  
  /**
   * Whether to use textarea instead of input
   * @default false
   */
  textarea?: boolean;
  
  /**
   * Number of rows for textarea
   * @default 3
   */
  rows?: number;
  
  /**
   * Callback for AI suggestions
   */
  onSuggest?: (value: string) => Promise<string[]>;
  
  /**
   * Callback for AI validation
   */
  onValidate?: (value: string) => Promise<{ valid: boolean; message?: string }>;
  
  /**
   * Callback for AI completion
   */
  onComplete?: (value: string) => Promise<string>;
  
  /**
   * Delay in milliseconds before triggering AI features
   * @default 500
   */
  aiDelay?: number;
  
  /**
   * Whether to apply a glow effect on focus
   * @default false
   */
  glowOnFocus?: boolean;
  
  /**
   * Whether to animate suggestions
   * @default true
   */
  animateSuggestions?: boolean;
}

/**
 * PredictiveInput component
 * 
 * An AI-enhanced input component that provides intelligent features like
 * suggestions, auto-completion, and validation.
 */
export const PredictiveInput: React.FC<PredictiveInputProps> = ({
  value,
  defaultValue,
  onChange,
  cyberpunk = false,
  aiAssistance = true,
  showSuggestions = true,
  showValidation = true,
  showCompletion = false,
  textarea = false,
  rows = 3,
  onSuggest,
  onValidate,
  onComplete,
  aiDelay = 500,
  glowOnFocus = false,
  animateSuggestions = true,
  className = '',
  ...props
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  // Internal state
  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [validation, setValidation] = useState<{ valid: boolean; message?: string } | null>(null);
  const [completion, setCompletion] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestionsPopover, setShowSuggestionsPopover] = useState(false);
  
  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<any>(null);
  
  // Update internal value when prop changes
  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);
  
  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    
    // Reset AI features
    setSuggestions([]);
    setValidation(null);
    setCompletion(null);
    
    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set new timer for AI features
    if (aiAssistance && newValue.trim()) {
      timerRef.current = setTimeout(() => {
        triggerAIFeatures(newValue);
      }, aiDelay);
    } else {
      setShowSuggestionsPopover(false);
    }
  };
  
  // Trigger AI features
  const triggerAIFeatures = async (value: string) => {
    if (!aiAssistance || !value.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Get suggestions
      if (showSuggestions && onSuggest) {
        const newSuggestions = await onSuggest(value);
        setSuggestions(newSuggestions);
        setShowSuggestionsPopover(newSuggestions.length > 0);
      }
      
      // Get validation
      if (showValidation && onValidate) {
        const validationResult = await onValidate(value);
        setValidation(validationResult);
      }
      
      // Get completion
      if (showCompletion && onComplete) {
        const completionResult = await onComplete(value);
        setCompletion(completionResult);
      }
    } catch (error) {
      console.error('Error triggering AI features:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onChange?.(suggestion);
    setShowSuggestionsPopover(false);
    
    // Focus input after selecting suggestion
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle completion click
  const handleCompletionClick = () => {
    if (completion) {
      setInputValue(completion);
      onChange?.(completion);
      setCompletion(null);
    }
  };
  
  // Get class names based on props
  const getClassNames = () => {
    return [
      'predictive-input',
      cyberpunk ? 'cyberpunk-input' : '',
      glowOnFocus ? 'glow-on-focus' : '',
      isFocused ? 'focused' : '',
      validation?.valid === false ? 'invalid' : '',
      validation?.valid === true ? 'valid' : '',
      className,
    ].filter(Boolean).join(' ');
  };
  
  // Render suggestions
  const renderSuggestions = () => {
    if (!showSuggestions || suggestions.length === 0) return null;
    
    return (
      <div className="predictive-input-suggestions">
        <Text type="secondary" className="suggestions-title">
          <BulbOutlined /> Suggestions:
        </Text>
        <Space wrap size={[8, 8]} className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={animateSuggestions && !reducedMotionEnabled ? { opacity: 0, scale: 0.9 } : undefined}
              animate={animateSuggestions && !reducedMotionEnabled ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: index * 0.05 }}
            >
              <Tag
                className={`suggestion-tag ${cyberpunk ? 'cyberpunk-tag' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Tag>
            </motion.div>
          ))}
        </Space>
      </div>
    );
  };
  
  // Render validation
  const renderValidation = () => {
    if (!showValidation || !validation) return null;
    
    return (
      <div className={`predictive-input-validation ${validation.valid ? 'valid' : 'invalid'}`}>
        {validation.valid ? (
          <Text type="success" className="validation-message">
            <CheckCircleOutlined /> {validation.message || 'Valid input'}
          </Text>
        ) : (
          <Text type="danger" className="validation-message">
            <CloseCircleOutlined /> {validation.message || 'Invalid input'}
          </Text>
        )}
      </div>
    );
  };
  
  // Render completion
  const renderCompletion = () => {
    if (!showCompletion || !completion) return null;
    
    return (
      <div className="predictive-input-completion">
        <Text type="secondary" className="completion-title">
          <RobotOutlined /> Suggested completion:
        </Text>
        <div className="completion-content">
          <Text className="completion-text">{completion}</Text>
          <Button
            size="small"
            type="link"
            className="completion-button"
            onClick={handleCompletionClick}
          >
            Use this
          </Button>
        </div>
      </div>
    );
  };
  
  // Render input
  const renderInput = () => {
    const inputProps = {
      ref: inputRef,
      value: inputValue,
      onChange: handleChange,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      className: getClassNames(),
      ...props,
    };
    
    if (textarea) {
      return <TextArea rows={rows} {...inputProps} />;
    }
    
    return <Input {...inputProps} />;
  };
  
  // Render AI indicator
  const renderAIIndicator = () => {
    if (!aiAssistance) return null;
    
    return (
      <Tooltip title="AI-enhanced input">
        <div className={`ai-indicator ${isLoading ? 'loading' : ''}`}>
          <RobotOutlined />
        </div>
      </Tooltip>
    );
  };
  
  return (
    <div className={`predictive-input-container ${cyberpunk ? 'cyberpunk' : ''}`}>
      <Popover
        open={showSuggestionsPopover}
        content={renderSuggestions()}
        placement="bottom"
        trigger="click"
        overlayClassName={`predictive-input-popover ${cyberpunk ? 'cyberpunk-popover' : ''}`}
      >
        <div className="input-wrapper">
          {renderInput()}
          {renderAIIndicator()}
        </div>
      </Popover>
      
      <AnimatePresence>
        {validation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderValidation()}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {completion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderCompletion()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PredictiveInput;
