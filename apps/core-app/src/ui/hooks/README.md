# UI Hooks

This directory contains custom React hooks for UI-related functionality.

## Hooks

- `useTheme` - Hook for accessing and manipulating theme
- `useMediaQuery` - Hook for responsive design
- `useBreakpoint` - Hook for detecting screen breakpoints
- `useElementSize` - Hook for measuring element dimensions
- `useScrollPosition` - Hook for tracking scroll position
- `useIntersectionObserver` - Hook for intersection observer API

## Usage

```jsx
import { useTheme, useMediaQuery } from '@ui/hooks';

function Component() {
  const { mode, setMode } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div>
      <p>Current theme: {mode}</p>
      <p>Is mobile: {isMobile ? 'Yes' : 'No'}</p>
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        Toggle theme
      </button>
    </div>
  );
}
```

## Creating New Hooks

When creating new hooks:

1. Create a new file with the hook name (e.g., `useCustomHook.ts`)
2. Export the hook from the file
3. Add it to the exports in `index.ts`
4. Document the hook with JSDoc comments
