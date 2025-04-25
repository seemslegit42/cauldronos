import React, { useState } from 'react';
import { Form, FormProps, Button, Space, Tooltip, Typography, Divider } from 'antd';
import { RobotOutlined, QuestionCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';
import { FadeIn, SlideIn } from '@/ui/animations';

const { Text, Title } = Typography;

export interface AIFormProps extends FormProps {
  onAIComplete?: (values: any) => Promise<any>;
  onAIValidate?: (values: any) => Promise<{ valid: boolean; issues?: string[] }>;
  onAISuggest?: (fieldName: string, currentValue: any) => Promise<any>;
  aiEnabled?: boolean;
  cyberpunk?: boolean;
  children: React.ReactNode;
}

/**
 * AI-enhanced form component with smart completion and validation
 */
export const AIForm: React.FC<AIFormProps> = ({
  onAIComplete,
  onAIValidate,
  onAISuggest,
  aiEnabled = true,
  cyberpunk = false,
  children,
  className = '',
  ...props
}) => {
  const { reducedMotion } = useMotion();
  const [form] = Form.useForm(props.form);
  const [aiCompleting, setAiCompleting] = useState(false);
  const [aiValidating, setAiValidating] = useState(false);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const [showValidationResults, setShowValidationResults] = useState(false);

  // Handle AI form completion
  const handleAIComplete = async () => {
    if (!onAIComplete || aiCompleting) return;

    try {
      setAiCompleting(true);
      const currentValues = form.getFieldsValue();
      const completedValues = await onAIComplete(currentValues);
      form.setFieldsValue(completedValues);
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
      
      const currentValues = form.getFieldsValue();
      const validationResult = await onAIValidate(currentValues);
      
      setValidationIssues(validationResult.issues || []);
      setShowValidationResults(true);
      
      // Automatically scroll to validation results
      setTimeout(() => {
        const validationElement = document.getElementById('ai-validation-results');
        if (validationElement) {
          validationElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } catch (error) {
      console.error('Error validating form with AI:', error);
    } finally {
      setAiValidating(false);
    }
  };

  return (
    <div className={`ai-form-container ${cyberpunk ? 'cyberpunk' : ''} ${className}`}>
      {aiEnabled && (
        <div className="ai-form-toolbar">
          <Space>
            <Tooltip title="Let AI complete the form based on existing information">
              <Button
                icon={<RobotOutlined />}
                onClick={handleAIComplete}
                loading={aiCompleting}
                type="default"
              >
                AI Complete
              </Button>
            </Tooltip>
            
            {onAIValidate && (
              <Tooltip title="Ask AI to validate your form entries">
                <Button
                  icon={<QuestionCircleOutlined />}
                  onClick={handleAIValidate}
                  loading={aiValidating}
                  type="default"
                >
                  AI Validate
                </Button>
              </Tooltip>
            )}
          </Space>
        </div>
      )}
      
      <Form
        form={form}
        {...props}
      >
        {children}
        
        {/* AI Validation Results */}
        <AnimatePresence>
          {showValidationResults && (
            <SlideIn direction="up">
              <div id="ai-validation-results" className="ai-validation-results">
                <Divider>
                  <RobotOutlined /> AI Validation Results
                </Divider>
                
                {validationIssues.length === 0 ? (
                  <div className="validation-success">
                    <CheckCircleOutlined className="success-icon" />
                    <Text strong>All form fields look good!</Text>
                  </div>
                ) : (
                  <div className="validation-issues">
                    <CloseCircleOutlined className="issues-icon" />
                    <Title level={5}>Please address these issues:</Title>
                    <ul>
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
              </div>
            </SlideIn>
          )}
        </AnimatePresence>
      </Form>
    </div>
  );
};

export default AIForm;