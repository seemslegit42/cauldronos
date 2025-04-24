/**
 * EnhancedForm Component
 * 
 * A comprehensive form component that combines Zod validation, AI assistance,
 * and cyberpunk styling with animation effects.
 */

import React, { useState, useEffect } from 'react';
import { Form as AntForm, FormProps as AntFormProps, Button, Space, Tooltip, Typography, Divider } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { useForm, Controller, UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RobotOutlined, QuestionCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useTheme } from '../../theme/useTheme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';

const { Text, Title } = Typography;
const { Item: FormItem } = AntForm;

export interface EnhancedFormProps<TFormValues extends FieldValues = any, Schema extends z.ZodType<any, any> = any> 
  extends Omit<AntFormProps, 'form' | 'onFinish'> {
  /**
   * Zod schema for form validation
   */
  schema?: Schema;
  
  /**
   * Default values for the form
   */
  defaultValues?: Partial<TFormValues>;
  
  /**
   * Callback when form is submitted with valid data
   */
  onSubmit: SubmitHandler<TFormValues>;
  
  /**
   * External form instance if you want to control the form outside
   */
  form?: UseFormReturn<TFormValues>;
  
  /**
   * Whether to reset the form after successful submission
   * @default false
   */
  resetOnSubmit?: boolean;
  
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to animate form items
   * @default true
   */
  animated?: boolean;
  
  /**
   * Animation delay between form items in seconds
   * @default 0.05
   */
  staggerDelay?: number;
  
  /**
   * Whether to apply a glow effect on focus
   * @default false
   */
  glowOnFocus?: boolean;
  
  /**
   * Whether to show validation messages with animations
   * @default true
   */
  animatedValidation?: boolean;
  
  /**
   * Whether to enable AI assistance
   * @default false
   */
  aiAssistance?: boolean;
  
  /**
   * Callback for AI completion
   */
  onAIComplete?: (values: Partial<TFormValues>) => Promise<Partial<TFormValues>>;
  
  /**
   * Callback for AI validation
   */
  onAIValidate?: (values: Partial<TFormValues>) => Promise<{ valid: boolean; issues?: string[] }>;
  
  /**
   * Callback for AI suggestions
   */
  onAISuggest?: (fieldName: string, currentValue: any) => Promise<any>;
  
  /**
   * Whether to show the submit button
   * @default true
   */
  showSubmitButton?: boolean;
  
  /**
   * Text for the submit button
   * @default "Submit"
   */
  submitText?: React.ReactNode;
  
  /**
   * Whether to show the reset button
   * @default false
   */
  showResetButton?: boolean;
  
  /**
   * Text for the reset button
   * @default "Reset"
   */
  resetText?: React.ReactNode;
  
  /**
   * Whether to show the AI completion button
   * @default false
   */
  showAICompletionButton?: boolean;
  
  /**
   * Text for the AI completion button
   * @default "Complete with AI"
   */
  aiCompletionText?: React.ReactNode;
  
  /**
   * Whether to show the AI validation button
   * @default false
   */
  showAIValidationButton?: boolean;
  
  /**
   * Text for the AI validation button
   * @default "Validate with AI"
   */
  aiValidationText?: React.ReactNode;
  
  /**
   * The content of the form (form items)
   */
  children: React.ReactNode | ((methods: UseFormReturn<TFormValues>) => React.ReactNode);
}

/**
 * EnhancedForm component
 * 
 * A comprehensive form component that combines Zod validation, AI assistance,
 * and cyberpunk styling with animation effects.
 */
export function EnhancedForm<TFormValues extends FieldValues = any, Schema extends z.ZodType<any, any> = any>({
  schema,
  defaultValues,
  onSubmit,
  form: externalForm,
  resetOnSubmit = false,
  cyberpunk = false,
  animated = true,
  staggerDelay = 0.05,
  glowOnFocus = false,
  animatedValidation = true,
  aiAssistance = false,
  onAIComplete,
  onAIValidate,
  onAISuggest,
  showSubmitButton = true,
  submitText = 'Submit',
  showResetButton = false,
  resetText = 'Reset',
  showAICompletionButton = false,
  aiCompletionText = 'Complete with AI',
  showAIValidationButton = false,
  aiValidationText = 'Validate with AI',
  children,
  className = '',
  ...props
}: EnhancedFormProps<TFormValues, Schema>) {
  const { isDarkMode } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  // Initialize form with react-hook-form
  const methods = externalForm || useForm<TFormValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
    mode: 'onTouched',
  });
  
  const { handleSubmit, reset, formState, getValues, setValue } = methods;
  
  // AI states
  const [aiCompleting, setAiCompleting] = useState(false);
  const [aiValidating, setAiValidating] = useState(false);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const [showValidationResults, setShowValidationResults] = useState(false);
  
  // Handle form submission
  const onSubmitHandler: SubmitHandler<TFormValues> = async (data) => {
    try {
      await onSubmit(data);
      if (resetOnSubmit) {
        reset(defaultValues);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  // Handle AI form completion
  const handleAIComplete = async () => {
    if (!onAIComplete || aiCompleting) return;
    
    try {
      setAiCompleting(true);
      const currentValues = getValues();
      const completedValues = await onAIComplete(currentValues);
      
      // Update form with AI-completed values
      Object.entries(completedValues).forEach(([key, value]) => {
        setValue(key as any, value);
      });
    } catch (error) {
      console.error('Error completing form with AI:', error);
    } finally {
      setAiCompleting(false);
    }
  };
  
  // Handle AI form validation
  const handleAIValidate = async () => {
    if (!onAIValidate || aiValidating) return;
    
    try {
      setAiValidating(true);
      setShowValidationResults(false);
      
      const currentValues = getValues();
      const validationResult = await onAIValidate(currentValues);
      
      setValidationIssues(validationResult.issues || []);
      setShowValidationResults(true);
    } catch (error) {
      console.error('Error validating form with AI:', error);
    } finally {
      setAiValidating(false);
    }
  };
  
  // Get class names based on props
  const getClassNames = () => {
    return [
      'enhanced-form',
      cyberpunk ? 'cyberpunk-form' : '',
      glowOnFocus ? 'glow-on-focus' : '',
      isDarkMode ? 'dark-mode' : '',
      className,
    ].filter(Boolean).join(' ');
  };
  
  // Skip animation if reduced motion is enabled or animated is false
  const shouldAnimate = animated && !reducedMotionEnabled;
  
  // Render form buttons
  const renderFormButtons = () => (
    <FormItem>
      <Space>
        {showSubmitButton && (
          <Button
            type="primary"
            htmlType="submit"
            loading={formState.isSubmitting}
            className={cyberpunk ? 'cyberpunk-button' : ''}
          >
            {submitText}
          </Button>
        )}
        
        {showResetButton && (
          <Button
            onClick={() => reset(defaultValues)}
            className={cyberpunk ? 'cyberpunk-button' : ''}
          >
            {resetText}
          </Button>
        )}
        
        {aiAssistance && showAICompletionButton && onAIComplete && (
          <Button
            icon={<RobotOutlined />}
            onClick={handleAIComplete}
            loading={aiCompleting}
            className={cyberpunk ? 'cyberpunk-button cyberpunk-button-ai' : ''}
          >
            {aiCompletionText}
          </Button>
        )}
        
        {aiAssistance && showAIValidationButton && onAIValidate && (
          <Button
            icon={<QuestionCircleOutlined />}
            onClick={handleAIValidate}
            loading={aiValidating}
            className={cyberpunk ? 'cyberpunk-button cyberpunk-button-ai' : ''}
          >
            {aiValidationText}
          </Button>
        )}
      </Space>
    </FormItem>
  );
  
  // Render AI validation results
  const renderValidationResults = () => (
    <AnimatePresence>
      {showValidationResults && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          id="ai-validation-results"
        >
          <Divider orientation="left">AI Validation Results</Divider>
          
          {validationIssues.length === 0 ? (
            <div className="ai-validation-success">
              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
              <Text type="success">Form looks good! No issues found.</Text>
            </div>
          ) : (
            <div className="ai-validation-issues">
              <CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
              <Text type="danger">Found {validationIssues.length} issue(s):</Text>
              <ul className="ai-validation-list">
                {validationIssues.map((issue, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Text type="danger">{issue}</Text>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  // Render form content
  const renderFormContent = () => {
    // If children is a function, call it with methods
    if (typeof children === 'function') {
      return children(methods);
    }
    
    // Otherwise, render children directly
    if (!shouldAnimate) {
      return children;
    }
    
    // Apply staggered animation to form items
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      return (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: index * staggerDelay,
              },
            },
          }}
        >
          {child}
        </motion.div>
      );
    });
  };
  
  return (
    <div className={getClassNames()}>
      <AntForm
        layout={props.layout || 'vertical'}
        onFinish={handleSubmit(onSubmitHandler)}
        {...props}
      >
        {renderFormContent()}
        {renderFormButtons()}
        {aiAssistance && renderValidationResults()}
        
        {formState.isSubmitSuccessful && animatedValidation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="form-success-message"
          >
            <Text type="success">Form submitted successfully!</Text>
          </motion.div>
        )}
      </AntForm>
    </div>
  );
}

export interface EnhancedFormItemProps {
  /**
   * Name of the form field
   */
  name: string;
  
  /**
   * Label for the form field
   */
  label?: React.ReactNode;
  
  /**
   * Help text for the form field
   */
  help?: React.ReactNode;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Whether to apply cyberpunk styling
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to apply a glow effect on focus
   */
  glowOnFocus?: boolean;
  
  /**
   * The form field component
   */
  children: React.ReactElement;
}

/**
 * EnhancedFormItem component
 * 
 * A form item component that integrates with react-hook-form and displays validation errors.
 */
export const EnhancedFormItem: React.FC<EnhancedFormItemProps> = ({
  name,
  label,
  help,
  required,
  className = '',
  cyberpunk = false,
  glowOnFocus = false,
  children,
}) => {
  // Get class names based on props
  const getClassNames = () => {
    return [
      'enhanced-form-item',
      cyberpunk ? 'cyberpunk-form-item' : '',
      glowOnFocus ? 'glow-on-focus' : '',
      className,
    ].filter(Boolean).join(' ');
  };
  
  return (
    <FormItem
      label={label}
      help={help}
      required={required}
      className={getClassNames()}
      validateStatus={undefined}
    >
      <Controller
        name={name}
        render={({ field, fieldState }) => {
          const childProps = {
            ...field,
            status: fieldState.invalid ? 'error' : undefined,
          };
          
          return (
            <>
              {React.cloneElement(children, childProps)}
              {fieldState.error && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="form-item-error"
                  >
                    <Text type="danger" className="text-xs mt-1">
                      {fieldState.error.message}
                    </Text>
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          );
        }}
      />
    </FormItem>
  );
};

export default EnhancedForm;
