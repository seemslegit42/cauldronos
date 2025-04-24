import React from 'react';
import { Form as AntForm, FormProps as AntFormProps } from 'antd';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useAccessibility } from '../../hooks/useAccessibility';
import { transitions } from '../../animations/transitions';

export interface FormProps extends AntFormProps {
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to animate form items on mount
   * @default false
   */
  animated?: boolean;
  
  /**
   * Animation delay between form items in seconds
   * @default 0.1
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
}

/**
 * Enhanced Form component with animation and styling options
 */
export const Form: React.FC<FormProps> = ({
  cyberpunk = false,
  animated = false,
  staggerDelay = 0.1,
  glowOnFocus = false,
  animatedValidation = true,
  className = '',
  children,
  ...props
}) => {
  const { token } = useTheme();
  const { reducedMotionEnabled } = useAccessibility();
  
  // Get class names based on props
  const getClassNames = () => {
    return [
      className,
      cyberpunk ? 'cyberpunk-form' : '',
      glowOnFocus ? 'glow-on-focus' : '',
    ].filter(Boolean).join(' ');
  };
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotionEnabled || !animated) {
    return (
      <AntForm
        className={getClassNames()}
        {...props}
      >
        {children}
      </AntForm>
    );
  }
  
  // Process children to add animations
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      
      // If it's a Form.Item, wrap it with motion
      if (child.type === AntForm.Item) {
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
            {React.cloneElement(child, {
              ...child.props,
              className: `${child.props.className || ''} ${cyberpunk ? 'cyberpunk-form-item' : ''} ${glowOnFocus ? 'glow-on-focus-item' : ''}`,
            })}
          </motion.div>
        );
      }
      
      // If it has children, process them recursively
      if (child.props.children) {
        return React.cloneElement(child, {
          ...child.props,
          children: processChildren(child.props.children),
        });
      }
      
      return child;
    });
  };
  
  return (
    <AntForm
      className={getClassNames()}
      {...props}
    >
      {processChildren(children)}
    </AntForm>
  );
};

// Re-export Form components
Form.Item = AntForm.Item;
Form.List = AntForm.List;
Form.ErrorList = AntForm.ErrorList;
Form.Provider = AntForm.Provider;
Form.useForm = AntForm.useForm;
Form.useFormInstance = AntForm.useFormInstance;
Form.useWatch = AntForm.useWatch;

export default Form;
