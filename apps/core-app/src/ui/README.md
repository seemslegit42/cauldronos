# CauldronOS UI Package

This package contains UI components, themes, and styles for CauldronOS based on Ant Design and the CauldronOS design system.

## Features

- **Unified Design System**: Consistent tokens for colors, typography, spacing, and more
- **Cyberpunk Theme**: Dark and light mode variants with a unique cyberpunk aesthetic
- **Enhanced Components**: Form components with Zod schema validation
- **Animation System**: Comprehensive animation system with presets for common animations
- **AI-Native Components**: Components designed specifically for AI-driven interfaces
- **Accessibility**: Support for reduced motion preferences and other accessibility features
- **State Management**: Zustand-based state management for UI preferences

## Directory Structure

The UI package follows a unified directory structure:

### Components

- `/components` - All UI components
  - `/components/admin` - Admin-specific components
  - `/components/brand` - Brand showcase components
  - `/components/dashboard` - Dashboard components
  - `/components/data-display` - Data display components
  - `/components/feedback` - Feedback components
  - `/components/form` - Form components
  - `/components/navigation` - Navigation components
  - `/components/overlay` - Overlay components
  - `/components/utility` - Utility components

### Layouts

- `/layouts` - Layout components
  - `/layouts/main` - Main application layouts
  - `/layouts/dashboard` - Dashboard-specific layouts
  - `/layouts/admin` - Admin-specific layouts

### Styles

- `/styles` - Styles and style utilities
  - `/styles/global` - Global styles
  - `/styles/utils` - Style utility functions

### Theme

- `/theme` - Theme configuration
  - `/theme/provider` - Theme providers
  - `/theme/hooks` - Theme-related hooks

## Installation

The package is already installed as a local dependency in the main app.

## Usage

Import components from the UI package:

```jsx
// Import components
import { Button, Table, DatePicker } from '@ui';
import { UserOutlined } from '@ui';

// Import from specific categories
import { MetricsCard } from '@ui/components/dashboard';
import { MainLayout } from '@ui/layouts/main';
import { useTheme } from '@ui/theme/hooks';

// Import enhanced components
import { Button } from '@ui/components/Button';
import { Card } from '@ui/components/Card';
import { Modal } from '@ui/components/Modal';
import { AICard } from '@ui/components/ai/AICard';

// Import form components with Zod validation
import { ZodForm, ZodFormItem } from '@ui/components/form/ZodForm';
import { Input } from '@ui/components/form/Input';
import { Select } from '@ui/components/form/Select';

// Import animation utilities
import { useMotion } from '@ui/animations/MotionProvider';
import { transitions } from '@ui/animations/transitions';
import { motion } from 'framer-motion';

// Import UI state management
import { useUIStore } from '@ui/store/uiStore';
```

### Cyberpunk Styling

The UI system includes several cyberpunk-themed variants:

```jsx
// Cyber button
<Button variant="cyber" glowOnHover>Cyber Button</Button>

// Terminal card
<Card variant="terminal">Terminal Card</Card>

// Glass modal
<Modal variant="glass">Glass Modal</Modal>
```

### Form Validation with Zod

```jsx
import { ZodForm, ZodFormItem } from '@ui/components/form/ZodForm';
import { Input } from '@ui/components/form/Input';
import { z } from 'zod';

// Define your form schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

// Use the form
const MyForm = () => {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <ZodForm schema={formSchema} onSubmit={handleSubmit}>
      <ZodFormItem name="name" label="Name" required>
        <Input placeholder="Enter your name" />
      </ZodFormItem>
      
      <ZodFormItem name="email" label="Email" required>
        <Input placeholder="Enter your email" />
      </ZodFormItem>
      
      <Button type="primary" htmlType="submit">Submit</Button>
    </ZodForm>
  );
};
```

### AI-Native Components

Components designed specifically for AI-driven interfaces:

```jsx
import { AICard } from '@ui/components/ai/AICard';

<AICard
  title="AI-Generated Content"
  description="This is AI-generated content."
  model="Groq Swarm"
  confidence={0.85}
  tags={["AI", "Generated"]}
/>
```

## Brand Identity

CauldronOS branding includes:
- Abstract Node Hex logo
- Manrope for headings
- Inter for body text
- JetBrains Mono for code
- Void Purple, Flux Aqua, and Growth Green as primary colors
- Confident, witty brand voice

## Adding New Components

1. Identify the appropriate category for your component
2. Create a new component file in the corresponding directory
3. Export it from the directory's index.ts file
4. If needed, update the main index.js file in the root of the UI package

## Ant Design Documentation

For more information on Ant Design components, see the [Ant Design documentation](https://ant.design/components/overview/).
