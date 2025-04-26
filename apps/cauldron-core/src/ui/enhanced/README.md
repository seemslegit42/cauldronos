# Enhanced UI Components

This directory contains enhanced versions of standard UI components for CauldronOS.

## Usage

Import enhanced components directly from the UI package:

```tsx
// Import all enhanced components
import { Button, Card, Modal, ZodForm } from '@/ui/enhanced';

// Or import specific enhanced components
import { Button } from '@/ui/components/Button';
import { Card } from '@/ui/components/Card';
import { Modal } from '@/ui/components/Modal';
```

## Available Enhanced Components

### Core Components

- **Button** - Enhanced button with cyberpunk styling options
- **Card** - Enhanced card with terminal and glass variants
- **Modal** - Enhanced modal with cyberpunk styling

### Form Components

- **Input** - Enhanced input with validation
- **Select** - Enhanced select with improved styling
- **Checkbox** - Enhanced checkbox with cyberpunk styling
- **Switch** - Enhanced switch with glow effects
- **DatePicker** - Enhanced date picker with cyberpunk styling
- **Upload** - Enhanced upload component
- **ZodForm** - Form component with Zod schema validation
- **ZodFormItem** - Form item component for use with ZodForm

### Data Display Components

- **Table** - Enhanced table with improved styling
- **List** - Enhanced list with cyberpunk styling

### Layout Components

- **PageContainer** - Enhanced page container
- **ProLayout** - Enhanced layout for professional applications

### AI Components

- **AICard** - Card component for displaying AI-generated content
- **AIForm** - Form component for AI interactions
- **AIInput** - Input component for AI prompts
- **AITable** - Table component for displaying AI-generated data

## Component Features

Enhanced components include the following features:

- **Cyberpunk Styling** - Unique cyberpunk aesthetic with glow effects
- **Dark Mode Support** - Optimized for dark mode
- **Accessibility** - Improved accessibility features
- **Animation** - Smooth animations with Framer Motion
- **Validation** - Form validation with Zod schemas
- **State Management** - Integration with Zustand for state management

## Examples

### Button Example

```tsx
import { Button } from '@/ui/enhanced';

const MyComponent = () => (
  <div>
    <Button variant="cyber" glowOnHover>
      Cyber Button
    </Button>
    
    <Button variant="terminal">
      Terminal Button
    </Button>
    
    <Button variant="glass">
      Glass Button
    </Button>
  </div>
);
```

### Form Example with Zod Validation

```tsx
import { ZodForm, ZodFormItem, Input, Button } from '@/ui/enhanced';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

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
      
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </ZodForm>
  );
};
```

### AI Component Example

```tsx
import { AICard } from '@/ui/enhanced';

const MyComponent = () => (
  <AICard
    title="AI-Generated Content"
    description="This is AI-generated content."
    model="Groq Swarm"
    confidence={0.85}
    tags={["AI", "Generated"]}
  />
);
```