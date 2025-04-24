# UI Utilities

This directory contains utility functions for UI-related tasks.

## Utilities

- `color.ts` - Color manipulation and conversion utilities
- `dom.ts` - DOM manipulation utilities
- `style.ts` - Style calculation and manipulation utilities
- `responsive.ts` - Responsive design utilities
- `accessibility.ts` - Accessibility utilities

## Usage

```jsx
// Using color utilities
import { darken, lighten, rgba } from '@ui/utils/color';

function Component() {
  return (
    <div style={{ 
      backgroundColor: darken('#3366FF', 0.2),
      color: lighten('#3366FF', 0.2),
      boxShadow: `0 2px 4px ${rgba('#000000', 0.2)}`
    }}>
      Styled content
    </div>
  );
}

// Using DOM utilities
import { getElementPosition } from '@ui/utils/dom';

function PositionedComponent() {
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref.current) {
      const position = getElementPosition(ref.current);
      console.log('Element position:', position);
    }
  }, []);
  
  return <div ref={ref}>Positioned element</div>;
}
```

## Creating New Utilities

When creating new utilities:

1. Create a new file or add to an existing file in the appropriate category
2. Export the utility functions
3. Add them to the exports in `index.ts`
4. Document the utilities with JSDoc comments
