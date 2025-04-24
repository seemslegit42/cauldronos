# Theme Providers

This directory contains theme provider components for CauldronOS.

## Components

- `ThemeProvider` - Main theme provider component
- `ThemeContext` - Theme context for React context API
- `ThemeConfigProvider` - Theme configuration provider

## Usage

```jsx
import { ThemeProvider } from '@ui/theme/provider';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        App content
      </div>
    </ThemeProvider>
  );
}
```
