import React, { useState } from 'react';
import { Form, FormProps, Space, Alert, Typography } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { useTheme } from '../../theme';
import { transitions } from '../../animations/transitions';
import { AnimatedButton as Button } from '@ant-design/move';
import { AIAssistant, Suggestions } from '@ant-design/x';

const { Text } = Typography;

export interface AIFormProps<T extends z.ZodType<any, any>> extends Omit<FormProps, 'onFinish'> {
  /**
   * Zod schema for form validation
   */
  schema: T;
  
  /**
   * Callback when form is submitted with valid data
   */
  onSubmit: (values: z.infer<T>) => void | Promise<void>;
  
  /**
   * The content of the form (form items)
   */
  children: React.ReactNode;
  
  /**
   * Whether to show AI assistance
   * @default true
   */
  aiAssistance?: boolean;
  
  /**
   * Whether to show field suggestions
   * @default true
   */
  showSuggestions?: boolean;
  
  /**
   * Whether to show validation errors inline
   * @default true
   */
  inlineValidation?: boolean;
  
  /**
   * Whether to validate on blur
   * @default true
   */
  validateOnBlur?: boolean;
  
  /**
   * Whether to validate on change
   * @default false
   */
  validateOnChange?: boolean;
  
  /**
   * Whether to show a submit button
   * @default true
   */
  showSubmitButton?: boolean;
  
  /**
   * Text for the submit button
   * @default "Submit"
   */
  submitText?: string;
  
  /**
   * Whether to show a reset button
   * @default false
   */
  showResetButton?: boolean;
  
  /**
   * Text for the reset button
   * @default "Reset"
   */
  resetText?: string;
  
  /**
   * Whether to use cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Custom style for the form
   */
  style?: React.CSSProperties;
  
  /**
   * Custom class name for the form
   */
  className?: string;
}

/**
 * AIForm component
 * 
 * A form component that uses Zod for validation and provides AI assistance.
 */
export function AIForm<T extends z.ZodType<any, any>>({
  schema,
  onSubmit,
  children,
  aiAssistance = true,
  showSuggestions = true,
  inlineValidation = true,
  validateOnBlur = true,
  validateOnChange = false,
  showSubmitButton = true,
  submitText = 'Submit',
  showResetButton = false,
  resetText = 'Reset',
  cyberpunk = false,
  style,
  className,
  ...props
}: AIFormProps<T>) {
  const [form] = Form.useForm(props.form);
  const { token } = useTheme();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, any>>({});
  
  // Handle form submission
  const handleFinish = async (values: any) => {
    try {
      setIsSubmitting(true);
      setGeneralError(null);
      
      // Validate with Zod schema
      const validatedData = schema.parse(values);
      
      // Call onSubmit with validated data
      await onSubmit(validatedData);
      
      // Clear errors
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format Zod errors
        const formattedErrors: Record<string, string[]> = {};
        
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path].push(err.message);
        });
        
        setErrors(formattedErrors);
      } else {
        // Handle other errors
        setGeneralError('An unexpected error occurred. Please try again.');
        console.error('Form submission error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle form reset
  const handleReset = () => {
    form.resetFields();
    setErrors({});
    setGeneralError(null);
    setAiSuggestions({});
  };
  
  // Handle field blur for validation
  const handleFieldBlur = (fieldName: string) => {
    if (validateOnBlur) {
      const value = form.getFieldValue(fieldName);
      validateField(fieldName, value);
    }
  };
  
  // Handle field change for validation
  const handleFieldChange = (fieldName: string) => {
    if (validateOnChange) {
      const value = form.getFieldValue(fieldName);
      validateField(fieldName, value);
    }
  };
  
  // Validate a single field
  const validateField = (fieldName: string, value: any) => {
    try {
      // Create a partial schema for this field
      const fieldSchema = z.object({ [fieldName]: schema.shape[fieldName] });
      
      // Validate just this field
      fieldSchema.parse({ [fieldName]: value });
      
      // Clear errors for this field if validation passes
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format Zod errors for this field
        const fieldErrors = error.errors
          .filter((err) => err.path[0] === fieldName)
          .map((err) => err.message);
        
        if (fieldErrors.length > 0) {
          setErrors((prev) => ({
            ...prev,
            [fieldName]: fieldErrors,
          }));
        }
      }
    }
  };
  
  // Generate AI suggestions for a field
  const generateSuggestion = (fieldName: string, currentValue: any) => {
    // This would be connected to an AI service in a real implementation
    // For demo purposes, we'll use some simple logic
    
    if (fieldName === 'email' && typeof currentValue === 'string') {
      if (currentValue.includes('@') && !currentValue.includes('.')) {
        return `${currentValue}com`;
      }
    } else if (fieldName === 'name' && typeof currentValue === 'string') {
      if (currentValue.toLowerCase() === 'j') {
        return 'John';
      } else if (currentValue.toLowerCase() === 'm') {
        return 'Maria';
      }
    } else if (fieldName === 'phone' && typeof currentValue === 'string') {
      if (currentValue.length === 3) {
        return `${currentValue}-`;
      } else if (currentValue.length === 7) {
        return `${currentValue}-`;
      }
    }
    
    return null;
  };
  
  // Apply a suggestion to the form
  const applySuggestion = (fieldName: string, value: any) => {
    form.setFieldValue(fieldName, value);
    setAiSuggestions((prev) => {
      const newSuggestions = { ...prev };
      delete newSuggestions[fieldName];
      return newSuggestions;
    });
  };
  
  // Enhance children with validation and suggestions
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    
    // Only process Form.Item components
    if (child.type !== Form.Item && child.props?.['data-field-type'] !== 'form-item') {
      return child;
    }
    
    const fieldName = child.props.name;
    if (!fieldName) return child;
    
    // Get field errors
    const fieldErrors = errors[fieldName] || [];
    
    // Clone the child element with enhanced props
    return React.cloneElement(child, {
      ...child.props,
      validateStatus: fieldErrors.length > 0 ? 'error' : undefined,
      help: inlineValidation && fieldErrors.length > 0 ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {fieldErrors.map((error, index) => (
              <Text key={index} type="danger">{error}</Text>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : undefined,
      // Add event handlers to the input element
      children: React.Children.map(child.props.children, (inputChild) => {
        if (!React.isValidElement(inputChild)) return inputChild;
        
        return React.cloneElement(inputChild, {
          ...inputChild.props,
          onBlur: (e: any) => {
            handleFieldBlur(fieldName);
            if (inputChild.props.onBlur) inputChild.props.onBlur(e);
          },
          onChange: (e: any) => {
            handleFieldChange(fieldName);
            
            // Generate suggestions if enabled
            if (showSuggestions) {
              const value = e.target ? e.target.value : e;
              const suggestion = generateSuggestion(fieldName, value);
              
              if (suggestion) {
                setAiSuggestions((prev) => ({
                  ...prev,
                  [fieldName]: suggestion,
                }));
              } else {
                setAiSuggestions((prev) => {
                  const newSuggestions = { ...prev };
                  delete newSuggestions[fieldName];
                  return newSuggestions;
                });
              }
            }
            
            if (inputChild.props.onChange) inputChild.props.onChange(e);
          },
          // Add suggestion UI if available
          addonAfter: aiSuggestions[fieldName] ? (
            <Button
              size="small"
              type="link"
              onClick={() => applySuggestion(fieldName, aiSuggestions[fieldName])}
            >
              Use: {aiSuggestions[fieldName]}
            </Button>
          ) : inputChild.props.addonAfter,
        });
      }),
    });
  });
  
  return (
    <Form
      form={form}
      onFinish={handleFinish}
      style={style}
      className={className}
      {...props}
    >
      {/* General error message */}
      <AnimatePresence>
        {generalError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: 16 }}
          >
            <Alert
              message="Error"
              description={generalError}
              type="error"
              showIcon
              closable
              onClose={() => setGeneralError(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Assistant */}
      {aiAssistance && (
        <div style={{ marginBottom: 16 }}>
          <AIAssistant
            theme={cyberpunk ? 'cyber' : 'default'}
            message="I'll help you complete this form. Type in fields to see suggestions."
          />
        </div>
      )}
      
      {/* Form fields */}
      {enhancedChildren}
      
      {/* Form actions */}
      {(showSubmitButton || showResetButton) && (
        <Form.Item>
          <Space>
            {showSubmitButton && (
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                variant={cyberpunk ? 'cyber' : undefined}
                glowOnHover={cyberpunk}
              >
                {submitText}
              </Button>
            )}
            
            {showResetButton && (
              <Button
                htmlType="button"
                onClick={handleReset}
                variant={cyberpunk ? 'cyber' : undefined}
              >
                {resetText}
              </Button>
            )}
          </Space>
        </Form.Item>
      )}
    </Form>
  );
}