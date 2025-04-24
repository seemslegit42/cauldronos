import React from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme';
import { useAccessibility } from '../../hooks/useAccessibility';

export interface InputProps extends AntInputProps {
  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;

  /**
   * Whether to animate the input on focus
   * @default true
   */
  animated?: boolean;

  /**
   * Whether to show a glow effect on focus
   * @default false
   */
  glowOnFocus?: boolean;
}

const { Group } = AntInput;

/**
 * Enhanced Input component with animation and accessibility features
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    cyberpunk = false,
    animated = true,
    glowOnFocus = false,
    className = '',
    ...props
  }, ref) => {
    const { token } = useTheme();
    const { reducedMotionEnabled } = useAccessibility();

    const inputClassName = `
      ${className}
      ${cyberpunk ? 'cyberpunk-input' : ''}
      ${glowOnFocus ? 'glow-focus' : ''}
    `;

    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotionEnabled || !animated) {
      return (
        <AntInput
          ref={ref}
          className={inputClassName}
          {...props}
        />
      );
    }

    // Use motion for animated inputs
    const MotionInput = motion(AntInput);

    return (
      <MotionInput
        ref={ref}
        className={inputClassName}
        whileFocus={{
          scale: 1.01,
          boxShadow: glowOnFocus ? `0 0 8px ${token.colorPrimary}` : undefined,
          transition: { duration: 0.2 }
        }}
        {...props}
      />
    );
  }
);

/**
 * Enhanced TextArea component with animation and accessibility features
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({
    cyberpunk = false,
    animated = true,
    glowOnFocus = false,
    className = '',
    ...props
  }, ref) => {
    const { token } = useTheme();
    const { reducedMotionEnabled } = useAccessibility();

    const textAreaClassName = `
      ${className}
      ${cyberpunk ? 'cyberpunk-input' : ''}
      ${glowOnFocus ? 'glow-focus' : ''}
    `;

    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotionEnabled || !animated) {
      return (
        <AntInput.TextArea
          ref={ref}
          className={textAreaClassName}
          {...props}
        />
      );
    }

    // Use motion for animated text areas
    const MotionTextArea = motion(AntInput.TextArea);

    return (
      <MotionTextArea
        ref={ref}
        className={textAreaClassName}
        whileFocus={{
          scale: 1.01,
          boxShadow: glowOnFocus ? `0 0 8px ${token.colorPrimary}` : undefined,
          transition: { duration: 0.2 }
        }}
        {...props}
      />
    );
  }
);

/**
 * Enhanced Password component with animation and accessibility features
 */
export const Password = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    cyberpunk = false,
    animated = true,
    glowOnFocus = false,
    className = '',
    ...props
  }, ref) => {
    const { token } = useTheme();
    const { reducedMotionEnabled } = useAccessibility();

    const passwordClassName = `
      ${className}
      ${cyberpunk ? 'cyberpunk-input' : ''}
      ${glowOnFocus ? 'glow-focus' : ''}
    `;

    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotionEnabled || !animated) {
      return (
        <AntInput.Password
          ref={ref}
          className={passwordClassName}
          {...props}
        />
      );
    }

    // Use motion for animated password inputs
    const MotionPassword = motion(AntInput.Password);

    return (
      <MotionPassword
        ref={ref}
        className={passwordClassName}
        whileFocus={{
          scale: 1.01,
          boxShadow: glowOnFocus ? `0 0 8px ${token.colorPrimary}` : undefined,
          transition: { duration: 0.2 }
        }}
        {...props}
      />
    );
  }
);

/**
 * Enhanced Search component with animation and accessibility features
 */
export const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    cyberpunk = false,
    animated = true,
    glowOnFocus = false,
    className = '',
    ...props
  }, ref) => {
    const { token } = useTheme();
    const { reducedMotionEnabled } = useAccessibility();

    const searchClassName = `
      ${className}
      ${cyberpunk ? 'cyberpunk-input' : ''}
      ${glowOnFocus ? 'glow-focus' : ''}
    `;

    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotionEnabled || !animated) {
      return (
        <AntInput.Search
          ref={ref}
          className={searchClassName}
          {...props}
        />
      );
    }

    // Use motion for animated search inputs
    const MotionSearch = motion(AntInput.Search);

    return (
      <MotionSearch
        ref={ref}
        className={searchClassName}
        whileFocus={{
          scale: 1.01,
          boxShadow: glowOnFocus ? `0 0 8px ${token.colorPrimary}` : undefined,
          transition: { duration: 0.2 }
        }}
        {...props}
      />
    );
  }
);

// Assign components to Input
Input.TextArea = TextArea;
Input.Password = Password;
Input.Search = Search;
Input.Group = Group;

Input.displayName = 'Input';
TextArea.displayName = 'TextArea';
Password.displayName = 'Password';
Search.displayName = 'Search';

export default Input;
