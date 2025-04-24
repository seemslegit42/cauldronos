/**
 * Types for the UI package
 */

import { ReactNode } from 'react';
import type { ButtonProps as AntButtonProps } from 'antd';
import type { CardProps as AntCardProps } from 'antd';
import type { InputProps as AntInputProps } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd';
import type { TableProps as AntTableProps } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';
import type { DrawerProps as AntDrawerProps } from 'antd';
import type { FormProps as AntFormProps } from 'antd';
import type { TabsProps as AntTabsProps } from 'antd';

/**
 * Button Props
 */
export interface ButtonProps extends AntButtonProps {
  /**
   * Apply motion animation to button
   */
  animate?: boolean;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Card Props
 */
export interface CardProps extends AntCardProps {
  /**
   * Apply motion animation to card
   */
  animate?: boolean;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Input Props
 */
export interface InputProps extends AntInputProps {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Select Props
 */
export interface SelectProps extends AntSelectProps {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Table Props
 */
export interface TableProps<T> extends AntTableProps<T> {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Modal Props
 */
export interface ModalProps extends AntModalProps {
  /**
   * Apply motion animation to modal
   */
  animate?: boolean;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Drawer Props
 */
export interface DrawerProps extends AntDrawerProps {
  /**
   * Apply motion animation to drawer
   */
  animate?: boolean;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Form Props
 */
export interface FormProps extends AntFormProps {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Tabs Props
 */
export interface TabsProps extends AntTabsProps {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Theme
 */
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    text: string;
    border: string;
    [key: string]: string;
  };
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    [key: string]: string;
  };
  fontWeights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    [key: string]: number;
  };
  lineHeights: {
    none: number;
    tight: number;
    normal: number;
    loose: number;
    [key: string]: number;
  };
  space: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    [key: string]: string;
  };
  radii: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
    [key: string]: string;
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    [key: string]: string;
  };
  zIndices: {
    hide: number;
    auto: string;
    base: number;
    docked: number;
    dropdown: number;
    sticky: number;
    banner: number;
    overlay: number;
    modal: number;
    popover: number;
    skipLink: number;
    toast: number;
    tooltip: number;
    [key: string]: number | string;
  };
  transitions: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    [key: string]: string;
  };
}

/**
 * Animation Props
 */
export interface AnimationProps {
  /**
   * Animation variant
   */
  variant?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'zoom' | 'bounce' | 'pulse' | 'custom';
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Custom animation properties
   */
  custom?: Record<string, any>;
  /**
   * Children to animate
   */
  children: ReactNode;
}

/**
 * Layout Props
 */
export interface LayoutProps {
  /**
   * Children to render
   */
  children: ReactNode;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Page Props
 */
export interface PageProps {
  /**
   * Page title
   */
  title?: string;
  /**
   * Page description
   */
  description?: string;
  /**
   * Children to render
   */
  children: ReactNode;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

export * from 'antd';/**
 * Types for the UI package
 */

import { ReactNode } from 'react';
import type { ButtonProps as AntButtonProps } from 'antd';
import type { CardProps as AntCardProps } from 'antd';
import type { InputProps as AntInputProps } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd';
import type { TableProps as AntTableProps } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';
import type { DrawerProps as AntDrawerProps } from 'antd';
import type { FormProps as AntFormProps } from 'antd';
import type { TabsProps as AntTabsProps } from 'antd';

/**
 * Button Props
 */
export interface ButtonProps extends AntButtonProps {
  /**
   * Apply motion animation to button
   */
  animate?: boolean;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Card Props
 */
export interface CardProps extends AntCardProps {
  /**
   * Apply motion animation to card
   */
  animate?: boolean;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Input Props
 */
export interface InputProps extends AntInputProps {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Select Props
 */
export interface SelectProps extends AntSelectProps {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Table Props
 */
export interface TableProps<T> extends AntTableProps<T> {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Modal Props
 */
export interface ModalProps extends AntModalProps {
  /**
   * Apply motion animation to modal
   */
  animate?: boolean;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Drawer Props
 */
export interface DrawerProps extends AntDrawerProps {
  /**
   * Apply motion animation to drawer
   */
  animate?: boolean;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Form Props
 */
export interface FormProps extends AntFormProps {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Tabs Props
 */
export interface TabsProps extends AntTabsProps {
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Theme
 */
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    text: string;
    border: string;
    [key: string]: string;
  };
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    [key: string]: string;
  };
  fontWeights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    [key: string]: number;
  };
  lineHeights: {
    none: number;
    tight: number;
    normal: number;
    loose: number;
    [key: string]: number;
  };
  space: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    [key: string]: string;
  };
  radii: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
    [key: string]: string;
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    [key: string]: string;
  };
  zIndices: {
    hide: number;
    auto: string;
    base: number;
    docked: number;
    dropdown: number;
    sticky: number;
    banner: number;
    overlay: number;
    modal: number;
    popover: number;
    skipLink: number;
    toast: number;
    tooltip: number;
    [key: string]: number | string;
  };
  transitions: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    [key: string]: string;
  };
}

/**
 * Animation Props
 */
export interface AnimationProps {
  /**
   * Animation variant
   */
  variant?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'zoom' | 'bounce' | 'pulse' | 'custom';
  /**
   * Animation duration in seconds
   */
  duration?: number;
  /**
   * Animation delay in seconds
   */
  delay?: number;
  /**
   * Custom animation properties
   */
  custom?: Record<string, any>;
  /**
   * Children to animate
   */
  children: ReactNode;
}

/**
 * Layout Props
 */
export interface LayoutProps {
  /**
   * Children to render
   */
  children: ReactNode;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

/**
 * Page Props
 */
export interface PageProps {
  /**
   * Page title
   */
  title?: string;
  /**
   * Page description
   */
  description?: string;
  /**
   * Children to render
   */
  children: ReactNode;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

export * from 'antd';