# Theme Hooks

This directory contains theme-related React hooks for CauldronOS.

## Hooks

- `useTheme` - Hook for accessing and manipulating theme
- `useThemeMode` - Hook for accessing and changing theme mode
- `useThemeColors` - Hook for accessing theme colors
- `useThemeTypography` - Hook for accessing theme typography

## Usage

```jsx
import { useTheme, useThemeColors } from '@ui/theme/hooks';

function ThemedComponent() {
  const { mode, setMode, toggleMode } = useTheme();
  const { primary, secondary, text } = useThemeColors();
  
  return (
    <div style={{ color: text }}>
      <p>Current theme: {mode}</p>
      <button 
        style={{ backgroundColor: primary, color: 'white' }}
        onClick={toggleMode}
      >
        Toggle Theme
      </button>
    </div>
  );
}
```
