import React, { ReactNode } from 'react';
import { Form, FormProps } from 'antd';

interface PredictiveFormProps extends FormProps {
  children: ReactNode;
  learningMode?: 'active' | 'passive' | 'none';
  contextId?: string;
  showSuggestions?: boolean;
  showInsights?: boolean;
  autoValidate?: boolean;
  smartDefaults?: boolean;
  showAICompletion?: boolean;
  showAIValidation?: boolean;
  onAIComplete?: (values: any) => Promise<any>;
  onAIValidate?: (values: any) => Promise<{ valid: boolean; issues: string[] }>;
  cyberpunk?: boolean;
  fieldDependencies?: Record<string, string[]>;
}

export const PredictiveForm: React.FC<PredictiveFormProps> = ({
  children,
  learningMode = 'passive',
  contextId,
  showSuggestions = false,
  showInsights = false,
  autoValidate = false,
  smartDefaults = false,
  showAICompletion = false,
  showAIValidation = false,
  onAIComplete,
  onAIValidate,
  cyberpunk = false,
  fieldDependencies,
  ...formProps
}) => {
  return <Form {...formProps}>{children}</Form>;
};

export default PredictiveForm;
