# UI/UX Migration Guide

This guide explains how to migrate from the previous scattered UI/UX structure to the new unified structure and adopt the enhanced UI components with cyberpunk styling.

## Directory Structure Changes

The UI/UX files have been reorganized into a unified structure under the `app/ui` directory:

### Previous Structure

- `app/ui` - Some UI components
- `app/components` - Admin components
- `app/src/components` - Brand showcase and utility components
- `app/layouts` - Main layout component
- `app/src/layout` - Layout components
- `app/styles` - Some style files
- `app/ui/src/styles` - More style files
- `app/ui/src/pages/dashboard` - Dashboard components
- `app/src/pages/dashboard` - More dashboard components

### New Structure

- `app/ui/components/` - All UI components organized by category
- `app/ui/layouts/` - All layout components organized by type
- `app/ui/styles/` - All styles and style utilities
- `app/ui/theme/` - All theme-related files

## Import Path Changes

Update your import paths to use the new structure:

### Before

```jsx
// Components
import { Button } from '@ui';
import { MetricsOverview } from '../../components/admin';
import { CodeHighlighter } from '../../src/components';

// Layouts
import { MainLayout } from '../../layouts';
import { Sidebar } from '../../src/layout';

// Styles
import { useTheme } from '../../styles/useTheme';
```

### After

```jsx
// Components
import { Button } from '@ui';
import { MetricsOverview } from '@ui/components/admin';
import { CodeHighlighter } from '@ui/components/utility';

// Layouts
import { MainLayout } from '@ui/layouts/main';
import { Sidebar } from '@ui/layouts/main';

// Styles and Theme
import { useTheme } from '@ui/theme/hooks';
```

## Component Categories

Components are now organized into the following categories:

- `admin` - Admin-specific components
- `brand` - Brand showcase components
- `dashboard` - Dashboard components
- `data-display` - Data display components
- `feedback` - Feedback components
- `form` - Form components
- `navigation` - Navigation components
- `overlay` - Overlay components
- `utility` - Utility components

## Layout Categories

Layouts are now organized into the following categories:

- `main` - Main application layouts
- `dashboard` - Dashboard-specific layouts
- `admin` - Admin-specific layouts

## Adding New Components

1. Identify the appropriate category for your component
2. Create a new component file in the corresponding directory
3. Export it from the directory's index.ts file
4. If needed, update the main index.js file in the root of the UI package

## Enhanced UI Components

We've enhanced several core components with cyberpunk styling, animation support, and improved accessibility. Here's how to migrate to these enhanced components:

### Migrating to Enhanced Button

#### Before:
```jsx
import { Button } from 'antd';

const MyComponent = () => {
  return <Button type="primary">Click Me</Button>;
};
```

#### After:
```jsx
import { Button } from '@ui/components/Button';

const MyComponent = () => {
  return (
    <Button 
      type="primary" 
      variant="cyber" 
      glowOnHover
      animated
    >
      Click Me
    </Button>
  );
};
```

### Migrating to Enhanced Card

#### Before:
```jsx
import { Card } from 'antd';

const MyComponent = () => {
  return (
    <Card title="Card Title">
      <p>Card content</p>
    </Card>
  );
};
```

#### After:
```jsx
import { Card } from '@ui/components/Card';

const MyComponent = () => {
  return (
    <Card 
      title="Card Title"
      variant="cyber"
      hoverEffect="glow"
      animated
    >
      <p>Card content</p>
    </Card>
  );
};
```

### Migrating to Enhanced Modal

#### Before:
```jsx
import { Modal } from 'antd';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Modal 
      title="Modal Title" 
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <p>Modal content</p>
    </Modal>
  );
};
```

#### After:
```jsx
import { CyberpunkModal as Modal } from '@ui/components';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Modal 
      title="Modal Title" 
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      variant="cyber"
      glowEffect
      animated
    >
      <p>Modal content</p>
    </Modal>
  );
};
```

### Using Zod Form Validation

#### Before:
```jsx
import { Form, Input, Button } from 'antd';

const MyForm = () => {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    console.log('Form values:', values);
  };
  
  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item 
        name="email" 
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
};
```

#### After:
```jsx
import { ZodForm, ZodFormItem } from '@ui/components/form/ZodForm';
import { Input } from '@ui/components/form/Input';
import { Button } from '@ui/components/Button';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email')
});

const MyForm = () => {
  const handleSubmit = (data) => {
    console.log('Form values:', data);
  };
  
  return (
    <ZodForm schema={formSchema} onSubmit={handleSubmit}>
      <ZodFormItem name="email" label="Email" required>
        <Input placeholder="Enter your email" />
      </ZodFormItem>
      <Button type="primary" htmlType="submit">Submit</Button>
    </ZodForm>
  );
};
```

## Migration Strategy

To minimize disruption, we recommend:

1. **Start with new features and pages**
   - Use the enhanced components for new development
   - This allows you to get familiar with the new API without affecting existing code

2. **Migrate existing components gradually**
   - Start with simple, isolated components
   - Test thoroughly after each migration
   - Use feature flags if needed to toggle between old and new implementations

3. **Update global styles last**
   - Once most components are migrated, update global styles to apply cyberpunk theme consistently

4. **Monitor performance**
   - The animation features may impact performance on lower-end devices
   - Use the `reducedMotion` feature for users who prefer reduced motion

## Questions?

If you have any questions about the new structure or need help migrating your components, please contact the UI/UX team.
