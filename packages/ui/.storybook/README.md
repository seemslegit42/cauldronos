# CauldronOS UI Storybook

This Storybook contains documentation and examples for all the components in the CauldronOS UI package.

## Getting Started

To run the Storybook locally:

```bash
cd packages/ui
pnpm storybook
```

This will start the Storybook server on port 6006. You can access it at http://localhost:6006.

## Structure

The Storybook is organized by component type:

- **Atoms**: Basic building blocks (Button, Input, Typography, etc.)
- **Molecules**: Combinations of atoms (Card, AnimatedCard, AISearchBar, InsightCard, GestureCard, etc.)
- **Organisms**: Complex components (Header, Sidebar, SmartTable, PredictiveForm, etc.)
- **Templates**: Page layouts (DashboardLayout, AuthLayout, etc.)
- **Theme**: Theme-related utilities and components
- **Animations**: Animation components and utilities
- **Hooks**: Custom React hooks for accessibility and more

## Features

### AI-Native Components

The Storybook includes documentation and examples for all AI-native components:

- **AISearchBar**: An intelligent search bar with AI-powered suggestions
- **InsightCard**: A card component for displaying AI-generated insights
- **PredictiveForm**: An AI-enhanced form component with smart defaults and validation

### Animation Components

The Storybook includes documentation and examples for all animation components:

- **PageTransition**: An enhanced page transition component
- **AnimatedCard**: A card component with fluid animations
- **GestureCard**: A card component with gesture-based interactions

### Accessibility

The Storybook includes the a11y addon for testing accessibility. Each component has been designed with accessibility in mind, and the Storybook provides information on how to use the components in an accessible way.

## Customizing the Theme

You can customize the theme using the ThemeProvider component. The Storybook includes examples of how to use the ThemeProvider to change the theme of your application.

## Testing Components

You can test components directly in the Storybook by interacting with them in the Canvas tab. You can also view the component's props and documentation in the Docs tab.

## Building the Storybook

To build the Storybook for deployment:

```bash
cd packages/ui
pnpm build-storybook
```

This will create a static version of the Storybook in the `storybook-static` directory, which you can deploy to any static hosting service.

## Contributing

When adding new components to the UI package, please also add a corresponding story to the Storybook. This helps document the component and provides examples of how to use it.

### Creating a New Story

1. Create a new file in the component's directory named `ComponentName.stories.tsx`
2. Import the component and any necessary dependencies
3. Define the component's props and examples
4. Export the story

Example:

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Category/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define the component's props
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // Define the default props
  },
};

export const Variant: Story = {
  args: {
    // Define variant props
  },
};
```

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Ant Design Documentation](https://ant.design/components/overview)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Accessibility Guide](../docs/accessibility-guide.md)
- [Component Guide](../docs/component-guide.md)
