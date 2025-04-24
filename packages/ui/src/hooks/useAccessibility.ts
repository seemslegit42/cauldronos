import { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { KeyCodes, AriaAttributes } from '../utils/accessibility';

/**
 * Options for the useAccessibility hook
 */
export interface UseAccessibilityOptions {
  /**
   * Whether to enable keyboard navigation
   * @default true
   */
  enableKeyboard?: boolean;
  
  /**
   * Whether to enable screen reader announcements
   * @default true
   */
  enableScreenReader?: boolean;
  
  /**
   * Whether to enable high contrast mode
   * @default false
   */
  enableHighContrast?: boolean;
  
  /**
   * Whether to enable reduced motion
   * @default false
   */
  enableReducedMotion?: boolean;
  
  /**
   * Whether to enable focus visible
   * @default true
   */
  enableFocusVisible?: boolean;
}

/**
 * Result of the useAccessibility hook
 */
export interface UseAccessibilityResult {
  /**
   * Whether keyboard navigation is enabled
   */
  keyboardEnabled: boolean;
  
  /**
   * Whether screen reader announcements are enabled
   */
  screenReaderEnabled: boolean;
  
  /**
   * Whether high contrast mode is enabled
   */
  highContrastEnabled: boolean;
  
  /**
   * Whether reduced motion is enabled
   */
  reducedMotionEnabled: boolean;
  
  /**
   * Whether focus visible is enabled
   */
  focusVisibleEnabled: boolean;
  
  /**
   * Announce a message to screen readers
   */
  announce: (message: string, assertive?: boolean) => void;
  
  /**
   * Create a keyboard event handler for specific keys
   */
  createKeyHandler: (
    keys: string[],
    callback: (event: KeyboardEvent) => void,
    options?: { stopPropagation?: boolean; preventDefault?: boolean }
  ) => (event: KeyboardEvent) => void;
  
  /**
   * Create ARIA attributes for a component
   */
  createAriaAttributes: (attributes: AriaAttributes) => AriaAttributes;
  
  /**
   * Create a focus trap for a component
   */
  createFocusTrap: (containerId: string) => {
    onKeyDown: (event: KeyboardEvent) => void;
    onFocus: () => void;
    onBlur: () => void;
  };
}

/**
 * Hook for managing accessibility features
 * 
 * @param options - Accessibility options
 * @returns - Accessibility utilities
 */
export const useAccessibility = (
  options: UseAccessibilityOptions = {}
): UseAccessibilityResult => {
  const {
    enableKeyboard = true,
    enableScreenReader = true,
    enableHighContrast = false,
    enableReducedMotion = false,
    enableFocusVisible = true,
  } = options;
  
  // Check for system preferences
  const [systemPreferences, setSystemPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
  });
  
  // Check for system preferences on mount
  useEffect(() => {
    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSystemPreferences(prev => ({
      ...prev,
      reducedMotion: reducedMotionQuery.matches,
    }));
    
    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: more)');
    setSystemPreferences(prev => ({
      ...prev,
      highContrast: highContrastQuery.matches,
    }));
    
    // Listen for changes to reduced motion preference
    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      setSystemPreferences(prev => ({
        ...prev,
        reducedMotion: event.matches,
      }));
    };
    
    // Listen for changes to high contrast preference
    const handleHighContrastChange = (event: MediaQueryListEvent) => {
      setSystemPreferences(prev => ({
        ...prev,
        highContrast: event.matches,
      }));
    };
    
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    highContrastQuery.addEventListener('change', handleHighContrastChange);
    
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, []);
  
  // Announce a message to screen readers
  const announce = useCallback((message: string, assertive = false) => {
    if (!enableScreenReader) return;
    
    // Create an aria-live region if it doesn't exist
    let liveRegion = document.getElementById('accessibility-live-region');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'accessibility-live-region';
      liveRegion.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.margin = '-1px';
      liveRegion.style.padding = '0';
      liveRegion.style.overflow = 'hidden';
      liveRegion.style.clip = 'rect(0, 0, 0, 0)';
      liveRegion.style.whiteSpace = 'nowrap';
      liveRegion.style.border = '0';
      document.body.appendChild(liveRegion);
    }
    
    // Update the live region with the message
    liveRegion.textContent = '';
    
    // Use setTimeout to ensure the screen reader picks up the change
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = message;
      }
    }, 50);
  }, [enableScreenReader]);
  
  // Create a keyboard event handler for specific keys
  const createKeyHandler = useCallback(
    (
      keys: string[],
      callback: (event: KeyboardEvent) => void,
      options: { stopPropagation?: boolean; preventDefault?: boolean } = {}
    ) => {
      const { stopPropagation = false, preventDefault = false } = options;
      
      return (event: KeyboardEvent) => {
        if (!enableKeyboard) return;
        
        if (keys.includes(event.key)) {
          if (stopPropagation) {
            event.stopPropagation();
          }
          
          if (preventDefault) {
            event.preventDefault();
          }
          
          callback(event);
        }
      };
    },
    [enableKeyboard]
  );
  
  // Create ARIA attributes for a component
  const createAriaAttributes = useCallback(
    (attributes: AriaAttributes): AriaAttributes => {
      if (!enableScreenReader) return {};
      
      return attributes;
    },
    [enableScreenReader]
  );
  
  // Create a focus trap for a component
  const createFocusTrap = useCallback(
    (containerId: string) => {
      return {
        onKeyDown: (event: KeyboardEvent) => {
          if (!enableKeyboard) return;
          
          if (event.key === KeyCodes.TAB) {
            const container = document.getElementById(containerId);
            
            if (!container) return;
            
            const focusableElements = container.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        },
        onFocus: () => {
          // Focus handling logic
        },
        onBlur: () => {
          // Blur handling logic
        },
      };
    },
    [enableKeyboard]
  );
  
  return {
    keyboardEnabled: enableKeyboard,
    screenReaderEnabled: enableScreenReader,
    highContrastEnabled: enableHighContrast || systemPreferences.highContrast,
    reducedMotionEnabled: enableReducedMotion || systemPreferences.reducedMotion,
    focusVisibleEnabled: enableFocusVisible,
    announce,
    createKeyHandler,
    createAriaAttributes,
    createFocusTrap,
  };
};

export default useAccessibility;
