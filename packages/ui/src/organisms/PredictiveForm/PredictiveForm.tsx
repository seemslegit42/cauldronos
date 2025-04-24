import React, { useState, useEffect, useCallback } from 'react';
import { Form, FormProps, Input, Select, DatePicker, Button, Space, Tooltip, Card, Alert, Progress, Badge, Popover, Typography } from 'antd';
import {
  InfoCircleOutlined,
  BulbOutlined,
  RobotOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  ThunderboltOutlined,
  SettingOutlined,
  LoadingOutlined
} from '@ant-design/icons';

const { Text } = Typography;
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme';
import { transitions } from '../../animations/transitions';
import { Insight, Suggestions, AIAssistant } from '../../mocks/ant-design-x';
import { AnimatedInput, AnimatedButton } from '../../mocks/ant-design-move';

export interface PredictiveFormProps extends FormProps {
  /**
   * Learning mode for the form
   * - passive: Only suggests based on patterns
   * - active: Learns from user input and adapts
   * - aggressive: Automatically applies suggestions
   * @default "passive"
   */
  learningMode?: 'passive' | 'active' | 'aggressive';

  /**
   * Context ID for the form to associate learning with specific forms
   */
  contextId?: string;

  /**
   * Whether to show suggestions
   * @default true
   */
  showSuggestions?: boolean;

  /**
   * Whether to show insights about the form data
   * @default false
   */
  showInsights?: boolean;

  /**
   * Whether to auto-validate fields as user types
   * @default true
   */
  autoValidate?: boolean;

  /**
   * Whether to show smart defaults
   * @default true
   */
  smartDefaults?: boolean;

  /**
   * Custom suggestion handler
   */
  onSuggestion?: (fieldName: string, value: any) => void;

  /**
   * Callback when AI completes the form
   */
  onAIComplete?: (values: Record<string, any>) => Promise<Record<string, any>>;

  /**
   * Callback when AI validates the form
   */
  onAIValidate?: (values: Record<string, any>) => Promise<{ valid: boolean; issues?: string[] }>;

  /**
   * Whether to show the AI completion button
   * @default false
   */
  showAICompletion?: boolean;

  /**
   * Whether to show the AI validation button
   * @default false
   */
  showAIValidation?: boolean;

  /**
   * Whether to show the form completion progress
   * @default true
   */
  showCompletionProgress?: boolean;

  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;

  /**
   * AI model to use for suggestions and completion
   * @default "default"
   */
  aiModel?: string;

  /**
   * Field dependencies for smart suggestions
   * Example: { city: ['country', 'state'], zipCode: ['city'] }
   */
  fieldDependencies?: Record<string, string[]>;
}

/**
 * PredictiveForm component
 *
 * An AI-enhanced form component that provides intelligent features like
 * smart defaults, suggestions, auto-validation, and insights.
 */
export const PredictiveForm: React.FC<PredictiveFormProps> = ({
  children,
  learningMode = 'passive',
  contextId,
  showSuggestions = true,
  showInsights = false,
  autoValidate = true,
  smartDefaults = true,
  onSuggestion,
  form,
  initialValues,
  onAIComplete,
  onAIValidate,
  showAICompletion = false,
  showAIValidation = false,
  showCompletionProgress = true,
  cyberpunk = false,
  aiModel = 'default',
  fieldDependencies = {},
  ...props
}) => {
  const [formInstance] = Form.useForm(form);
  const { token } = useTheme();
  const [suggestions, setSuggestions] = useState<Record<string, any>>({});
  const [insights, setInsights] = useState<string[]>([]);
  const [showInsightsPanel, setShowInsightsPanel] = useState(false);
  const [isAICompleting, setIsAICompleting] = useState(false);
  const [isAIValidating, setIsAIValidating] = useState(false);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const [showValidationIssues, setShowValidationIssues] = useState(false);
  const [completionProgress, setCompletionProgress] = useState(0);
  const [fieldStatus, setFieldStatus] = useState<Record<string, 'empty' | 'partial' | 'complete'>>({});

  // Initialize form with smart defaults if enabled
  useEffect(() => {
    if (smartDefaults && contextId) {
      // In a real implementation, this would fetch learned defaults from a service
      // For demo, just set some mock defaults if initialValues aren't provided
      const mockDefaults = getMockDefaults(contextId);
      if (!initialValues && Object.keys(mockDefaults).length > 0) {
        formInstance.setFieldsValue(mockDefaults);
      }
    }
  }, [smartDefaults, contextId, formInstance, initialValues]);

  // Generate insights when form values change
  useEffect(() => {
    if (showInsights) {
      const currentValues = formInstance.getFieldsValue(true);
      const newInsights = generateInsights(currentValues, contextId);
      setInsights(newInsights);
    }
  }, [showInsights, formInstance, contextId]);

  // Mock function to get defaults based on context
  const getMockDefaults = (contextId: string) => {
    // In a real implementation, this would come from a learning system
    const defaults: Record<string, any> = {};

    if (contextId === 'user-profile') {
      defaults.country = 'United States';
      defaults.language = 'English';
      defaults.timezone = 'America/New_York';
    } else if (contextId === 'payment-form') {
      defaults.currency = 'USD';
      defaults.paymentMethod = 'credit-card';
    } else if (contextId === 'content-preferences') {
      defaults.theme = 'dark';
      defaults.notifications = true;
    }

    return defaults;
  };

  // Mock function to generate field suggestions
  const generateSuggestion = (fieldName: string, currentValue: any) => {
    // In a real implementation, this would use ML to generate suggestions
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

  // Mock function to generate insights
  const generateInsights = (values: Record<string, any>, contextId?: string) => {
    // In a real implementation, this would use ML to generate insights
    const newInsights: string[] = [];

    if (Object.keys(values).length > 0) {
      if (values.email && !values.email.includes('@')) {
        newInsights.push('Email address is missing the @ symbol');
      }

      if (values.password && values.password.length < 8) {
        newInsights.push('Consider using a stronger password (at least 8 characters)');
      }

      if (values.name && values.name.split(' ').length < 2) {
        newInsights.push('Consider providing your full name');
      }

      if (contextId === 'user-profile' && !values.phone) {
        newInsights.push('Adding a phone number improves account security');
      }

      if (contextId === 'payment-form' && values.savePaymentInfo) {
        newInsights.push('Your payment information will be securely stored for future purchases');
      }
    }

    return newInsights;
  };

  // Handle field value changes
  const handleValuesChange = (changedValues: Record<string, any>) => {
    if (showSuggestions) {
      const fieldName = Object.keys(changedValues)[0];
      const currentValue = changedValues[fieldName];

      const suggestion = generateSuggestion(fieldName, currentValue);
      if (suggestion) {
        setSuggestions(prev => ({
          ...prev,
          [fieldName]: suggestion
        }));

        if (onSuggestion) {
          onSuggestion(fieldName, suggestion);
        }
      } else {
        setSuggestions(prev => {
          const newSuggestions = { ...prev };
          delete newSuggestions[fieldName];
          return newSuggestions;
        });
      }
    }

    // Call the original onValuesChange if provided
    if (props.onValuesChange) {
      props.onValuesChange(changedValues, formInstance.getFieldsValue(true));
    }
  };

  // Apply a suggestion to the form
  const applySuggestion = (fieldName: string, value: any) => {
    formInstance.setFieldValue(fieldName, value);
    setSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[fieldName];
      return newSuggestions;
    });

    // Update field status
    updateFieldStatus(fieldName, value);
  };

  // Update field status based on value
  const updateFieldStatus = useCallback((fieldName: string, value: any) => {
    let status: 'empty' | 'partial' | 'complete' = 'empty';

    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'string') {
        status = value.length > 3 ? 'complete' : 'partial';
      } else if (typeof value === 'object' && Object.keys(value).length > 0) {
        status = 'complete';
      } else {
        status = 'complete';
      }
    }

    setFieldStatus(prev => ({
      ...prev,
      [fieldName]: status
    }));
  }, []);

  // Calculate form completion progress
  useEffect(() => {
    if (showCompletionProgress) {
      const values = formInstance.getFieldsValue(true);
      const fieldNames = Object.keys(values);

      if (fieldNames.length === 0) return;

      let completedFields = 0;
      let partialFields = 0;

      fieldNames.forEach(fieldName => {
        const value = values[fieldName];
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'string' && value.length <= 3) {
            partialFields += 1;
          } else {
            completedFields += 1;
          }
        }

        // Update field status
        updateFieldStatus(fieldName, value);
      });

      const progress = Math.round(((completedFields + (partialFields * 0.5)) / fieldNames.length) * 100);
      setCompletionProgress(progress);
    }
  }, [formInstance, showCompletionProgress, updateFieldStatus]);

  // Handle AI form completion
  const handleAIComplete = async () => {
    if (!onAIComplete) return;

    setIsAICompleting(true);

    try {
      const currentValues = formInstance.getFieldsValue(true);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setCompletionProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 10);
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      // Call the AI completion handler
      const completedValues = await onAIComplete(currentValues);

      // Clear the progress interval
      clearInterval(progressInterval);

      // Update the form with the completed values
      formInstance.setFieldsValue(completedValues);

      // Update field status for all fields
      Object.entries(completedValues).forEach(([fieldName, value]) => {
        updateFieldStatus(fieldName, value);
      });

      // Set completion progress to 100%
      setCompletionProgress(100);

      // Generate insights based on the completed form
      if (showInsights) {
        const newInsights = generateInsights(completedValues, contextId);
        setInsights(newInsights);
        setShowInsightsPanel(true);
      }
    } catch (error) {
      console.error('Error completing form with AI:', error);
    } finally {
      setIsAICompleting(false);
    }
  };

  // Handle AI form validation
  const handleAIValidate = async () => {
    if (!onAIValidate) return;

    setIsAIValidating(true);
    setValidationIssues([]);

    try {
      const currentValues = formInstance.getFieldsValue(true);

      // Call the AI validation handler
      const result = await onAIValidate(currentValues);

      if (!result.valid && result.issues && result.issues.length > 0) {
        setValidationIssues(result.issues);
        setShowValidationIssues(true);
      } else {
        // Show success message
        setValidationIssues(['Form validation passed successfully!']);
        setShowValidationIssues(true);
      }
    } catch (error) {
      console.error('Error validating form with AI:', error);
      setValidationIssues(['An error occurred during validation.']);
      setShowValidationIssues(true);
    } finally {
      setIsAIValidating(false);
    }
  };

  // Render insights panel
  const renderInsightsPanel = () => {
    if (!showInsights || insights.length === 0) return null;

    return (
      <AnimatePresence>
        {showInsightsPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={transitions.slideUp.transition}
            style={{ overflow: 'hidden' }}
          >
            {cyberpunk ? (
              <Insight
                insights={insights}
                title="Form Insights"
                theme="cyber"
                glowEffect
                onClose={() => setShowInsightsPanel(false)}
                style={{
                  marginBottom: 16,
                  borderColor: token.colorPrimary,
                  backgroundColor: `${token.colorPrimary}10`
                }}
              />
            ) : (
              <Card
                size="small"
                style={{
                  marginBottom: 16
                }}
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BulbOutlined style={{ marginRight: 8 }} />
                    Form Insights
                  </div>
                }
                extra={
                  <Button
                  type="text"
                  icon={<CloseCircleOutlined />}
                  onClick={() => setShowInsightsPanel(false)}
                  size="small"
                />
              }
            >
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {insights.map((insight, index) => (
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
        )}
      </AnimatePresence>
    );
  };

  // Render validation issues panel
  const renderValidationPanel = () => {
    if (validationIssues.length === 0) return null;

    const isSuccess = validationIssues.length === 1 && validationIssues[0].includes('success');

    return (
      <AnimatePresence>
        {showValidationIssues && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <Alert
              type={isSuccess ? "success" : "warning"}
              message="AI Validation Results"
              description={
                <ul style={{ paddingLeft: 20, margin: '8px 0 0 0' }}>
                  {validationIssues.map((issue, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {issue}
                    </motion.li>
                  ))}
                </ul>
              }
              showIcon
              closable
              onClose={() => setShowValidationIssues(false)}
              style={{ marginBottom: 16 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Render completion progress
  const renderCompletionProgress = () => {
    if (!showCompletionProgress) return null;

    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <Text type="secondary">Form Completion</Text>
          <Text strong>{completionProgress}%</Text>
        </div>
        <Progress
          percent={completionProgress}
          size="small"
          status={completionProgress === 100 ? "success" : "active"}
          strokeColor={
            completionProgress < 30 ? token.colorError :
            completionProgress < 70 ? token.colorWarning :
            token.colorSuccess
          }
        />
      </div>
    );
  };

  // Enhance children with suggestions and auto-validation
  const enhanceChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;

      // Handle Form.Item
      if (child.type === Form.Item) {
        const fieldName = child.props.name;
        const childrenWithSuggestions = React.Children.map(child.props.children, innerChild => {
          if (!React.isValidElement(innerChild)) return innerChild;

          // Add suggestion to Input components
          if (innerChild.type === Input && fieldName && suggestions[fieldName]) {
            return React.cloneElement(innerChild, {
              suffix: (
                <Space>
                  {fieldStatus[fieldName] === 'complete' && (
                    <Badge status="success" />
                  )}
                  {fieldStatus[fieldName] === 'partial' && (
                    <Badge status="processing" />
                  )}
                  <Tooltip title="Click to apply suggestion">
                    <Button
                      type="text"
                      size="small"
                      icon={<CheckCircleOutlined />}
                      onClick={() => applySuggestion(fieldName, suggestions[fieldName])}
                      style={{ color: token.colorPrimary }}
                    />
                  </Tooltip>
                </Space>
              ),
              placeholder: innerChild.props.placeholder || `Enter ${fieldName}`,
              autoComplete: innerChild.props.autoComplete || 'off',
              status: learningMode === 'aggressive' && suggestions[fieldName] ? 'warning' : undefined,
              className: cyberpunk ? 'cyberpunk-input' : '',
            });
          }

          // Add status indicators to other input types
          if ((innerChild.type === Input ||
               innerChild.type === Select ||
               innerChild.type === DatePicker) &&
              fieldName && fieldStatus[fieldName]) {

            const props: any = {
              className: cyberpunk ? 'cyberpunk-input' : '',
            };

            // Add suffix for Input components
            if (innerChild.type === Input) {
              props.suffix = (
                <Badge
                  status={
                    fieldStatus[fieldName] === 'complete' ? 'success' :
                    fieldStatus[fieldName] === 'partial' ? 'processing' :
                    'default'
                  }
                />
              );
            }

            return React.cloneElement(innerChild, props);
          }

          return innerChild;
        });

        // Check if this field has dependencies
        const hasDependencies = fieldDependencies[child.props.name];

        return React.cloneElement(child, {
          children: childrenWithSuggestions,
          validateTrigger: autoValidate ? ['onChange', 'onBlur'] : child.props.validateTrigger,
          extra: hasDependencies ? (
            <Text type="secondary" style={{ fontSize: '0.85em' }}>
              <InfoCircleOutlined style={{ marginRight: 4 }} />
              This field depends on: {hasDependencies.join(', ')}
            </Text>
          ) : child.props.extra,
        });
      }

      // Recursively process nested children
      if (child.props.children) {
        const enhancedChildren = enhanceChildren(child.props.children);
        return React.cloneElement(child, { children: enhancedChildren });
      }

      return child;
    });
  };

  // Render AI action buttons
  const renderAIActions = () => {
    if (!showAICompletion && !showAIValidation) return null;

    return (
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Space>
          {showAIValidation && onAIValidate && (
            <Button
              type="default"
              icon={isAIValidating ? <LoadingOutlined /> : <CheckCircleOutlined />}
              onClick={handleAIValidate}
              loading={isAIValidating}
              className={cyberpunk ? 'cyberpunk-button' : ''}
            >
              AI Validate
            </Button>
          )}

          {showAICompletion && onAIComplete && (
            <Button
              type="primary"
              icon={isAICompleting ? <LoadingOutlined /> : <ThunderboltOutlined />}
              onClick={handleAIComplete}
              loading={isAICompleting}
              className={cyberpunk ? 'cyberpunk-button' : ''}
            >
              AI Complete
            </Button>
          )}
        </Space>
      </div>
    );
  };

  // Render AI model info
  const renderAIModelInfo = () => {
    if (!showAICompletion && !showAIValidation) return null;

    return (
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <RobotOutlined />
          <Text type="secondary">AI Model: {aiModel}</Text>
        </Space>

        <Popover
          title="AI Form Assistant"
          content={
            <div style={{ maxWidth: 300 }}>
              <p>This form is enhanced with AI capabilities:</p>
              <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
                {showAICompletion && (
                  <li>AI can complete the form based on partial information</li>
                )}
                {showAIValidation && (
                  <li>AI can validate the form for logical consistency</li>
                )}
                {showSuggestions && (
                  <li>AI provides smart suggestions as you type</li>
                )}
                {showInsights && (
                  <li>AI generates insights about your form data</li>
                )}
              </ul>
              <p>Learning Mode: <strong>{learningMode}</strong></p>
            </div>
          }
          trigger="click"
        >
          <Button type="text" icon={<QuestionCircleOutlined />} size="small">
            AI Info
          </Button>
        </Popover>
      </div>
    );
  };

  return (
    <div className={`predictive-form ${cyberpunk ? 'cyberpunk' : ''}`}>
      {renderAIModelInfo()}

      {renderCompletionProgress()}

      {renderValidationPanel()}

      {(showInsights && insights.length > 0) && (
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="text"
            icon={<BulbOutlined />}
            onClick={() => setShowInsightsPanel(!showInsightsPanel)}
          >
            {showInsightsPanel ? 'Hide Insights' : 'Show Insights'}
          </Button>
        </div>
      )}

      {renderInsightsPanel()}

      {learningMode === 'active' && (
        <Alert
          message="AI Learning Mode: Active"
          description="This form learns from your input to provide better suggestions in the future."
          type="info"
          showIcon
          icon={<RobotOutlined />}
          style={{ marginBottom: 16 }}
          closable
        />
      )}

      {learningMode === 'aggressive' && (
        <Alert
          message="AI Learning Mode: Aggressive"
          description="This form will automatically apply AI suggestions when they are highly confident."
          type="warning"
          showIcon
          icon={<ThunderboltOutlined />}
          style={{ marginBottom: 16 }}
          closable
        />
      )}

      <Form
        form={formInstance}
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
        {...props}
      >
        {enhanceChildren(children)}
      </Form>

      {renderAIActions()}

      <style jsx>{`
        .predictive-form.cyberpunk .cyberpunk-input {
          border-color: ${token.colorPrimary};
          background-color: ${token.colorBgContainer};
        }

        .predictive-form.cyberpunk .cyberpunk-input:focus,
        .predictive-form.cyberpunk .cyberpunk-input:hover {
          border-color: ${token.colorPrimary};
          box-shadow: 0 0 5px ${token.colorPrimary};
        }

        .predictive-form.cyberpunk .cyberpunk-button {
          border-color: ${token.colorPrimary};
          background-color: transparent;
          color: ${token.colorPrimary};
        }

        .predictive-form.cyberpunk .cyberpunk-button:hover {
          background-color: ${token.colorPrimary}20;
          box-shadow: 0 0 5px ${token.colorPrimary};
        }

        .predictive-form.cyberpunk .ant-form-item-label > label {
          color: ${token.colorTextSecondary};
        }
      `}</style>
    </div>
  );
};

export default PredictiveForm;
