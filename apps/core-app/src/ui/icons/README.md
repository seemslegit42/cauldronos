# Icons

This directory contains custom icons and icon utilities for CauldronOS.

## Components

- Custom icon components
- Icon utilities and helpers
- Icon sets specific to CauldronOS

## Usage

```jsx
// Using icons
import { CustomIcon, AnotherIcon } from '@ui/icons';

function Component() {
  return (
    <div>
      <CustomIcon size={24} color="primary" />
      <AnotherIcon size={16} color="secondary" />
    </div>
  );
}

// Using icon utilities
import { createIcon } from '@ui/icons';

const MyIcon = createIcon({
  path: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  viewBox: '0 0 24 24',
});
```

## Icon Guidelines

- Icons should be consistent in style and design
- Use SVG format for all icons
- Support color customization
- Support size customization
- Include accessibility attributes

## Adding New Icons

1. Create a new icon component in the appropriate file
2. Export it from the file
3. Add it to the exports in `index.ts`
4. Document the icon with JSDoc comments
