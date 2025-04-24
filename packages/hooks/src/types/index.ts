/**
 * Types for the hooks package
 */

import { RefObject } from 'react';

/**
 * Use Media Query Options
 */
export interface UseMediaQueryOptions {
  defaultValue?: boolean;
}

/**
 * Use Local Storage Options
 */
export interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

/**
 * Use Session Storage Options
 */
export interface UseSessionStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

/**
 * Use Debounce Options
 */
export interface UseDebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * Use Throttle Options
 */
export interface UseThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

/**
 * Use Intersection Observer Options
 */
export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Use Intersection Observer Return
 */
export interface UseIntersectionObserverReturn {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

/**
 * Use Click Outside Options
 */
export interface UseClickOutsideOptions {
  enabled?: boolean;
  eventType?: 'mousedown' | 'mouseup' | 'click' | 'touchstart' | 'touchend';
}

/**
 * Use Hover Options
 */
export interface UseHoverOptions {
  enabled?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

/**
 * Use Hover Return
 */
export interface UseHoverReturn {
  isHovered: boolean;
  hoverProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

/**
 * Use Focus Options
 */
export interface UseFocusOptions {
  enabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

/**
 * Use Focus Return
 */
export interface UseFocusReturn {
  isFocused: boolean;
  focusProps: {
    onFocus: () => void;
    onBlur: () => void;
  };
}

/**
 * Use Scroll Options
 */
export interface UseScrollOptions {
  threshold?: number;
  element?: RefObject<HTMLElement>;
}

/**
 * Use Scroll Return
 */
export interface UseScrollReturn {
  scrollX: number;
  scrollY: number;
  scrollDirection: 'up' | 'down' | 'left' | 'right' | 'none';
  isScrolling: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
  isAtLeft: boolean;
  isAtRight: boolean;
}

/**
 * Use Resize Options
 */
export interface UseResizeOptions {
  debounce?: number;
}

/**
 * Use Resize Return
 */
export interface UseResizeReturn {
  width: number;
  height: number;
}

/**
 * Use Keyboard Options
 */
export interface UseKeyboardOptions {
  enabled?: boolean;
  eventType?: 'keydown' | 'keyup' | 'keypress';
  target?: RefObject<HTMLElement> | Window | Document;
}

/**
 * Use Keyboard Return
 */
export interface UseKeyboardReturn {
  key: string | null;
  keyCode: number | null;
  isPressed: boolean;
}

/**
 * Use Form Options
 */
export interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * Use Form Return
 */
export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, touched: boolean) => void;
  resetForm: () => void;
}/**
 * Types for the hooks package
 */

import { RefObject } from 'react';

/**
 * Use Media Query Options
 */
export interface UseMediaQueryOptions {
  defaultValue?: boolean;
}

/**
 * Use Local Storage Options
 */
export interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

/**
 * Use Session Storage Options
 */
export interface UseSessionStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

/**
 * Use Debounce Options
 */
export interface UseDebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * Use Throttle Options
 */
export interface UseThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

/**
 * Use Intersection Observer Options
 */
export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Use Intersection Observer Return
 */
export interface UseIntersectionObserverReturn {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

/**
 * Use Click Outside Options
 */
export interface UseClickOutsideOptions {
  enabled?: boolean;
  eventType?: 'mousedown' | 'mouseup' | 'click' | 'touchstart' | 'touchend';
}

/**
 * Use Hover Options
 */
export interface UseHoverOptions {
  enabled?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

/**
 * Use Hover Return
 */
export interface UseHoverReturn {
  isHovered: boolean;
  hoverProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

/**
 * Use Focus Options
 */
export interface UseFocusOptions {
  enabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

/**
 * Use Focus Return
 */
export interface UseFocusReturn {
  isFocused: boolean;
  focusProps: {
    onFocus: () => void;
    onBlur: () => void;
  };
}

/**
 * Use Scroll Options
 */
export interface UseScrollOptions {
  threshold?: number;
  element?: RefObject<HTMLElement>;
}

/**
 * Use Scroll Return
 */
export interface UseScrollReturn {
  scrollX: number;
  scrollY: number;
  scrollDirection: 'up' | 'down' | 'left' | 'right' | 'none';
  isScrolling: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
  isAtLeft: boolean;
  isAtRight: boolean;
}

/**
 * Use Resize Options
 */
export interface UseResizeOptions {
  debounce?: number;
}

/**
 * Use Resize Return
 */
export interface UseResizeReturn {
  width: number;
  height: number;
}

/**
 * Use Keyboard Options
 */
export interface UseKeyboardOptions {
  enabled?: boolean;
  eventType?: 'keydown' | 'keyup' | 'keypress';
  target?: RefObject<HTMLElement> | Window | Document;
}

/**
 * Use Keyboard Return
 */
export interface UseKeyboardReturn {
  key: string | null;
  keyCode: number | null;
  isPressed: boolean;
}

/**
 * Use Form Options
 */
export interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * Use Form Return
 */
export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, touched: boolean) => void;
  resetForm: () => void;
}