# Accessibility Guide for CauldronOS UI

This guide provides information on how to create accessible components using the CauldronOS UI package.

## Table of Contents

1. [Introduction](#introduction)
2. [Accessibility Features](#accessibility-features)
3. [Using the useAccessibility Hook](#using-the-useaccessibility-hook)
4. [ARIA Attributes](#aria-attributes)
5. [Keyboard Navigation](#keyboard-navigation)
6. [Screen Reader Support](#screen-reader-support)
7. [Focus Management](#focus-management)
8. [Reduced Motion](#reduced-motion)
9. [High Contrast Mode](#high-contrast-mode)
10. [Testing Accessibility](#testing-accessibility)
11. [Best Practices](#best-practices)

## Introduction

Accessibility is a core principle of the CauldronOS UI package. All components are designed to be accessible to users with disabilities, including those who use screen readers, keyboard navigation, or have visual impairments.

## Accessibility Features

The CauldronOS UI package includes the following accessibility features:

- ARIA attributes for screen reader support
- Keyboard navigation
- Focus management
- Reduced motion support
- High contrast mode
- Screen reader announcements

## Using the useAccessibility Hook

The `useAccessibility` hook provides a set of utilities for creating accessible components:

```tsx
import { useAccessibility } from '@cauldronos/ui';

const MyComponent = () => {
  const {
    keyboardEnabled,
    screenReaderEnabled,
    highContrastEnabled,
    reducedMotionEnabled,
    focusVisibleEnabled,
    announce,
    createKeyHandler,
    createAriaAttributes,
    createFocusTrap,
  } = useAccessibility({
    enableKeyboard: true,
    enableScreenReader: true,
    enableHighContrast: false,
    enableReducedMotion: false,
    enableFocusVisible: true,
  });
  
  // Use the utilities in your component
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
};
```

## ARIA Attributes

The `createAriaAttributes` function from the `useAccessibility` hook can be used to create ARIA attributes for your components:

```tsx
import { useAccessibility } from '@cauldronos/ui';
import { createButtonAriaAttributes } from '@cauldronos/ui';

const MyButton = () => {
  const { createAriaAttributes } = useAccessibility();
  
  const buttonAriaAttributes = createAriaAttributes(
    createButtonAriaAttributes('My Button', false, false)
  );
  
  return (
    <button {...buttonAriaAttributes}>
      My Button
    </button>
  );
};
```

The UI package provides the following ARIA attribute creators:

- `createButtonAriaAttributes`
- `createDialogAriaAttributes`
- `createMenuAriaAttributes`
- `createTabAriaAttributes`
- `createTabPanelAriaAttributes`
- `createTooltipAriaAttributes`
- `createProgressBarAriaAttributes`
- `createSearchAriaAttributes`
- `createListboxAriaAttributes`
- `createOptionAriaAttributes`

## Keyboard Navigation

The `createKeyHandler` function from the `useAccessibility` hook can be used to create keyboard event handlers:

```tsx
import { useAccessibility, KeyCodes } from '@cauldronos/ui';

const MyComponent = () => {
  const { createKeyHandler } = useAccessibility();
  
  const handleKeyDown = createKeyHandler(
    [KeyCodes.ENTER, KeyCodes.SPACE],
    () => {
      // Handle key press
    },
    { preventDefault: true }
  );
  
  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      Press Enter or Space
    </div>
  );
};
```

The UI package provides the following keyboard handler creators:

- `createKeyboardHandler`
- `createButtonKeyHandler`
- `createArrowKeyHandler`
- `createEscapeKeyHandler`
- `createTabKeyHandler`

## Screen Reader Support

The `announce` function from the `useAccessibility` hook can be used to announce messages to screen readers:

```tsx
import { useAccessibility } from '@cauldronos/ui';

const MyComponent = () => {
  const { announce } = useAccessibility();
  
  const handleAction = () => {
    // Perform action
    announce('Action completed successfully');
  };
  
  return (
    <button onClick={handleAction}>
      Perform Action
    </button>
  );
};
```

## Focus Management

The `createFocusTrap` function from the `useAccessibility` hook can be used to create a focus trap for modals and dialogs:

```tsx
import { useAccessibility } from '@cauldronos/ui';

const MyModal = () => {
  const { createFocusTrap } = useAccessibility();
  
  const focusTrap = createFocusTrap('modal-container');
  
  return (
    <div
      id="modal-container"
      onKeyDown={focusTrap.onKeyDown}
    >
      {/* Modal content */}
    </div>
  );
};
```

## Reduced Motion

The `reducedMotionEnabled` property from the `useAccessibility` hook can be used to check if reduced motion is enabled:

```tsx
import { useAccessibility } from '@cauldronos/ui';

const MyAnimation = () => {
  const { reducedMotionEnabled } = useAccessibility();
  
  return (
    <div>
      {reducedMotionEnabled ? (
        <div>Static Content</div>
      ) : (
        <AnimatedContent />
      )}
    </div>
  );
};
```

## High Contrast Mode

The `highContrastEnabled` property from the `useAccessibility` hook can be used to check if high contrast mode is enabled:

```tsx
import { useAccessibility } from '@cauldronos/ui';

const MyComponent = () => {
  const { highContrastEnabled } = useAccessibility();
  
  return (
    <div style={{ 
      color: highContrastEnabled ? '#ffffff' : '#333333',
      backgroundColor: highContrastEnabled ? '#000000' : '#f5f5f5',
    }}>
      {/* Component content */}
    </div>
  );
};
```

## Testing Accessibility

The UI package includes Storybook with the `@storybook/addon-a11y` addon for testing accessibility:

```bash
# Start Storybook
pnpm storybook
```

The addon will check your components for accessibility issues and provide suggestions for fixing them.

## Best Practices

Here are some best practices for creating accessible components:

1. **Use Semantic HTML**: Use the appropriate HTML elements for their intended purpose.
2. **Provide Alternative Text**: Always provide alternative text for images and icons.
3. **Use ARIA Attributes**: Use ARIA attributes to provide additional information to screen readers.
4. **Support Keyboard Navigation**: Ensure all interactive elements can be accessed and used with a keyboard.
5. **Manage Focus**: Manage focus to ensure users can navigate through the application using a keyboard.
6. **Test with Screen Readers**: Test your components with screen readers to ensure they are accessible.
7. **Support Reduced Motion**: Provide alternatives for users who prefer reduced motion.
8. **Support High Contrast Mode**: Ensure your components are usable in high contrast mode.
9. **Use Sufficient Color Contrast**: Ensure there is sufficient contrast between text and background colors.
10. **Provide Clear Instructions**: Provide clear instructions for complex interactions.

## Resources

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Web Docs: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
