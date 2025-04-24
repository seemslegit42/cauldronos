import { ReactNode } from 'react';
import { ButtonProps as ButtonProps$1, CardProps as CardProps$1, InputProps as InputProps$1, SelectProps as SelectProps$1, TableProps as TableProps$1, ModalProps as ModalProps$1, DrawerProps as DrawerProps$1, FormProps as FormProps$1, TabsProps as TabsProps$1 } from 'antd';
export * from 'antd';

/**
 * Types for the UI package
 */

/**
 * Button Props
 */
interface ButtonProps extends ButtonProps$1 {
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
interface CardProps extends CardProps$1 {
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
interface InputProps extends InputProps$1 {
    /**
     * Additional Tailwind classes
     */
    className?: string;
}
/**
 * Select Props
 */
interface SelectProps extends SelectProps$1 {
    /**
     * Additional Tailwind classes
     */
    className?: string;
}
/**
 * Table Props
 */
interface TableProps<T> extends TableProps$1<T> {
    /**
     * Additional Tailwind classes
     */
    className?: string;
}
/**
 * Modal Props
 */
interface ModalProps extends ModalProps$1 {
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
interface DrawerProps extends DrawerProps$1 {
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
interface FormProps extends FormProps$1 {
    /**
     * Additional Tailwind classes
     */
    className?: string;
}
/**
 * Tabs Props
 */
interface TabsProps extends TabsProps$1 {
    /**
     * Additional Tailwind classes
     */
    className?: string;
}
/**
 * Theme
 */
interface Theme {
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
interface AnimationProps {
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
interface LayoutProps {
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
interface PageProps {
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

/**
 * CauldronOS UI Package
 * A comprehensive UI system built with Ant Design X and Motion Intelligence
 */
declare const CauldronUI: {
    version: string;
    name: string;
};

export { type AnimationProps, type ButtonProps, type CardProps, CauldronUI, type DrawerProps, type FormProps, type InputProps, type LayoutProps, type ModalProps, type PageProps, type SelectProps, type TableProps, type TabsProps, type Theme };
