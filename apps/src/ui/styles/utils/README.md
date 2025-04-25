# Style Utilities

This directory contains style utility functions for CauldronOS.

## Files

- `colorUtils.ts` - Color manipulation utilities
- `styleUtils.ts` - General style utilities
- `responsiveUtils.ts` - Responsive design utilities
- `animationUtils.ts` - Animation utilities

## Usage

```jsx
import { darken, lighten, rgba } from '@ui/styles/utils/colorUtils';
import { getResponsiveValue } from '@ui/styles/utils/responsiveUtils';

function StyledComponent() {
  return (
    <div
      style={{
        backgroundColor: darken('#3366FF', 0.2),
        color: lighten('#3366FF', 0.2),
        boxShadow: `0 2px 4px ${rgba('#000000', 0.2)}`,
        padding: getResponsiveValue({ xs: 8, sm: 16, md: 24, lg: 32 })
      }}
    >
      Styled content
    </div>
  );
}
```
