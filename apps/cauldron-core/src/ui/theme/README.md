# Theme

This directory contains theme configuration and providers for CauldronOS.

## Files

- `theme.ts` - Theme configuration (colors, typography, etc.)
- `themeStore.ts` - Zustand store for theme state management
- `ThemeProvider.tsx` - Theme provider component
- `useTheme.ts` - Custom hook for accessing theme

## Usage

```jsx
// Using the theme provider
import { ThemeProvider } from '@ui/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

// Using the theme hook
import { useTheme } from '@ui/theme';

function Component() {
  const { mode, themeConfig, setMode } = useTheme();
  
  return (
    <div>
      <p>Current theme: {mode}</p>
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        Toggle theme
      </button>
    </div>
  );
}
```

## Theme Configuration

The theme follows the CauldronOS brand guidelines with:

- Void Purple, Flux Aqua, and Growth Green as primary colors
- Dark and light mode support
- Customized Ant Design components
- Typography system with Manrope, Inter, and JetBrains Mono
