# Styles

This directory contains global styles and utilities for CauldronOS.

## Files

- `global.less` - Global styles and CSS variables
- `typography.ts` - Typography styles and utilities
- `colors.ts` - Color definitions and utilities
- `spacing.ts` - Spacing system and utilities
- `animations.ts` - Animation definitions and utilities

## Usage

```jsx
// Using global styles
import '@ui/styles/global.less';

// Using style utilities
import { colors, typography, spacing } from '@ui/styles';

function Component() {
  return (
    <div style={{ 
      color: colors.primary, 
      fontSize: typography.fontSize.lg,
      padding: spacing.md
    }}>
      Styled content
    </div>
  );
}
```

## Style System

The style system follows the CauldronOS design guidelines:

- 8px base grid system
- Responsive breakpoints
- Consistent color palette
- Typography scale
- Animation presets
