/**
 * FormField Component
 * 
 * A flexible form field component that combines validation, accessibility,
 * and styling with support for various input types.
 */

import React, { useState } from 'react';
import { Form, Input, Select, Checkbox, Switch, DatePicker, InputNumber, Radio, Slider, Upload } from 'antd';
import { InfoCircleOutlined, EyeOutlined, EyeInvisibleOutlined, UploadOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme/useTheme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';
import type { FormItemProps } from 'antd';
import type { Rule } from 'antd/es/form';

const { Item } = Form;
const { TextArea } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;

export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'password' 
  | 'number' 
  | 'select' 
  | 'multiselect' 
  | 'checkbox' 
  | 'checkboxgroup' 
  | 'radio' 
  | 'switch' 
  | 'date' 
  | 'daterange' 
  | 'time' 
  | 'slider' 
  | 'upload' 
  | 'custom';

export interface OptionType {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  children?: OptionType[];
}

export interface FormFieldProps extends Omit<FormItemProps, 'children'> {
  /**
   * Type of the form field
   * @default 'text'
   */
  type?: FieldType;
  
  /**
   * Input placeholder
   */
  placeholder?: string;
  
  /**
   * Whether the field is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the field is read-only
   * @default false
   */
  readOnly?: boolean;
  
  /**
   * Options for select, multiselect, radio, and checkboxgroup
   */
  options?: OptionType[];
  
  /**
   * Additional help tooltip text
   */
  tooltip?: React.ReactNode;
  
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to apply a glow effect on focus
   * @default false
   */
  glowOnFocus?: boolean;
  
  /**
   * Whether to animate validation messages
   * @default true
   */
  animatedValidation?: boolean;
  
  /**
   * Custom input component (for type='custom')
   */
  customInput?: React.ReactNode;
  
  /**
   * Additional props for the input component
   */
  inputProps?: any;
  
  /**
   * Callback when value changes
   */
  onChange?: (value: any) => void;
  
  /**
   * Callback when field is focused
   */
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  
  /**
   * Callback when field is blurred
   */
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  
  /**
   * Number of rows for textarea
   * @default 4
   */
  rows?: number;
  
  /**
   * Min value for number and slider
   */
  min?: number;
  
  /**
   * Max value for number and slider
   */
  max?: number;
  
  /**
   * Step value for number and slider
   */
  step?: number;
  
  /**
   * Format for date and time
   */
  format?: string;
  
  /**
   * Whether to show validation status icon
   * @default true
   */
  showValidationStatus?: boolean;
  
  /**
   * Whether to show clear button
   * @default false
   */
  allowClear?: boolean;
  
  /**
   * Whether to show count for textarea
   * @default false
   */
  showCount?: boolean;
  
  /**
   * Maximum length for text inputs
   */
  maxLength?: number;
  
  /**
   * Whether to auto focus the field
   * @default false
   */
  autoFocus?: boolean;
  
  /**
   * Whether to auto size textarea
   * @default false
   */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  
  /**
   * Whether to show password toggle for password fields
   * @default true
   */
  showPasswordToggle?: boolean;
  
  /**
   * Upload button text for upload fields
   * @default 'Upload'
   */
  uploadButtonText?: React.ReactNode;
  
  /**
   * Upload accept attribute for upload fields
   */
  accept?: string;
  
  /**
   * Whether to show upload list for upload fields
   * @default true
   */
  showUploadList?: boolean;
  
  /**
   * Maximum number of files for upload fields
   */
  maxCount?: number;
  
  /**
   * Whether to support multiple files for upload fields
   * @default false
   */
  multiple?: boolean;
}

/**
 * FormField component
 * 
 * A flexible form field component that combines validation, accessibility,
 * and styling with support for various input types.
 */
export const FormField: React.FC<FormFieldProps> = ({
  type = 'text',
  placeholder,
  disabled = false,
  readOnly = false,
  options = [],
  tooltip,
  cyberpunk = false,
  glowOnFocus = false,
  animatedValidation = true,
  customInput,
  inputProps = {},
  onChange,
  onFocus,
  onBlur,
  rows = 4,
  min,
  max,
  step,
  format,
  showValidationStatus = true,
  allowClear = false,
  showCount = false,
  maxLength,
  autoFocus = false,
  autoSize = false,
  showPasswordToggle = true,
  uploadButtonText = 'Upload',
  accept,
  showUploadList = true,
  maxCount,
  multiple = false,
  className = '',
  ...props
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  // Get class names based on props
  const getClassNames = () => {
    return [
      'form-field',
      cyberpunk ? 'cyberpunk-form-field' : '',
      glowOnFocus ? 'glow-on-focus' : '',
      className,
    ].filter(Boolean).join(' ');
  };
  
  // Get input component based on type
  const getInputComponent = () => {
    const commonProps = {
      placeholder,
      disabled,
      readOnly,
      onChange,
      onFocus,
      onBlur,
      autoFocus,
      ...inputProps,
    };
    
    switch (type) {
      case 'textarea':
        return (
          <TextArea
            rows={rows}
            allowClear={allowClear}
            showCount={showCount}
            maxLength={maxLength}
            autoSize={autoSize}
            {...commonProps}
          />
        );
        
      case 'password':
        return (
          <Input.Password
            visibilityToggle={showPasswordToggle}
            iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            {...commonProps}
          />
        );
        
      case 'number':
        return (
          <InputNumber
            min={min}
            max={max}
            step={step}
            style={{ width: '100%' }}
            {...commonProps}
          />
        );
        
      case 'select':
        return (
          <Select
            allowClear={allowClear}
            options={options}
            {...commonProps}
          />
        );
        
      case 'multiselect':
        return (
          <Select
            mode="multiple"
            allowClear={allowClear}
            options={options}
            {...commonProps}
          />
        );
        
      case 'checkbox':
        return <Checkbox {...commonProps}>{inputProps.label}</Checkbox>;
        
      case 'checkboxgroup':
        return <CheckboxGroup options={options} {...commonProps} />;
        
      case 'radio':
        return <RadioGroup options={options} {...commonProps} />;
        
      case 'switch':
        return <Switch {...commonProps} />;
        
      case 'date':
        return (
          <DatePicker
            style={{ width: '100%' }}
            format={format}
            allowClear={allowClear}
            {...commonProps}
          />
        );
        
      case 'daterange':
        return (
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            format={format}
            allowClear={allowClear}
            {...commonProps}
          />
        );
        
      case 'time':
        return (
          <DatePicker.TimePicker
            style={{ width: '100%' }}
            format={format || 'HH:mm:ss'}
            allowClear={allowClear}
            {...commonProps}
          />
        );
        
      case 'slider':
        return (
          <Slider
            min={min}
            max={max}
            step={step}
            {...commonProps}
          />
        );
        
      case 'upload':
        return (
          <Upload
            accept={accept}
            showUploadList={showUploadList}
            maxCount={maxCount}
            multiple={multiple}
            {...commonProps}
          >
            <Button icon={<UploadOutlined />}>{uploadButtonText}</Button>
          </Upload>
        );
        
      case 'custom':
        return customInput;
        
      case 'text':
      default:
        return (
          <Input
            allowClear={allowClear}
            maxLength={maxLength}
            {...commonProps}
          />
        );
    }
  };
  
  // Get form item props
  const getFormItemProps = () => {
    const formItemProps: FormItemProps = {
      ...props,
      className: getClassNames(),
    };
    
    // Add tooltip if provided
    if (tooltip) {
      formItemProps.tooltip = (
        <span>
          {tooltip}
        </span>
      );
    }
    
    // Handle validation status display
    if (!showValidationStatus) {
      formItemProps.hasFeedback = false;
    }
    
    return formItemProps;
  };
  
  return (
    <Item {...getFormItemProps()}>
      {getInputComponent()}
    </Item>
  );
};

export default FormField;
