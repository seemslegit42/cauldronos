# CauldronOS Component Usage Guide

This guide provides instructions on how to use the enhanced UI components in the CauldronOS application.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Form Components](#form-components)
3. [Data Display Components](#data-display-components)
4. [Layout Components](#layout-components)
5. [AI Components](#ai-components)
6. [Animation Components](#animation-components)
7. [Best Practices](#best-practices)

## Getting Started

Import components from the UI library:

```jsx
import { 
  Button, 
  Card, 
  Input, 
  Table,
  ZodForm,
  AIInput,
  FadeIn
} from '@/ui/components';
```

## Form Components

### ZodForm

The `ZodForm` component integrates Zod schema validation with Ant Design's form components.

```jsx
import { z } from 'zod';
import { ZodForm, ZodFormItem, Input, Button } from '@/ui/components';

// Define your Zod schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
});

function UserForm() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <ZodForm
      schema={userSchema}
      onSubmit={handleSubmit}
      defaultValues={{ name: '', email: '', age: 0 }}
    >
      <ZodFormItem name="name" label="Name" required>
        <Input placeholder="Enter your name" />
      </ZodFormItem>
      
      <ZodFormItem name="email" label="Email" required>
        <Input placeholder="Enter your email" />
      </ZodFormItem>
      
      <ZodFormItem name="age" label="Age" required>
        <Input type="number" placeholder="Enter your age" />
      </ZodFormItem>
      
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </ZodForm>
  );
}
```

### Enhanced Form Components

All form components support animation and cyberpunk styling:

```jsx
// Button with cyberpunk styling and glow effect
<Button type="primary" cyberpunk glowOnHover>
  Submit
</Button>

// Input with animation
<Input animated placeholder="Enter your name" />

// Select with cyberpunk styling
<Select cyberpunk placeholder="Select an option">
  <Select.Option value="option1">Option 1</Select.Option>
  <Select.Option value="option2">Option 2</Select.Option>
</Select>

// Checkbox with animation
<Checkbox animated>Remember me</Checkbox>

// Switch with cyberpunk styling
<Switch cyberpunk />

// DatePicker with animation
<DatePicker animated />

// Upload with cyberpunk styling
<Upload cyberpunk>
  <Button>Upload File</Button>
</Upload>
```

## Data Display Components

### Card

Enhanced card component with hover effects and cyberpunk styling:

```jsx
<Card 
  title="User Profile" 
  hoverable 
  glowOnHover 
  cyberpunk
>
  <p>Card content goes here</p>
</Card>
```

### Table

Enhanced table component with row animations and AI filtering:

```jsx
import { AITable } from '@/ui/components';

const dataSource = [
  { id: 1, name: 'John Doe', age: 32, status: 'active' },
  { id: 2, name: 'Jane Smith', age: 28, status: 'inactive' },
  // ...more data
];

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

function UserTable() {
  const handleAIFilter = async (data) => {
    // Implement AI filtering logic here
    // This could call an API endpoint that processes the data based on the prompt
    return data.filter(item => item.status === 'active');
  };

  return (
    <AITable
      dataSource={dataSource}
      columns={columns}
      animateRows
      cyberpunk
      onAIFilter={handleAIFilter}
    />
  );
}
```

### List

Enhanced list component with staggered animations:

```jsx
import { List } from '@/ui/components';

const data = [
  'Item 1',
  'Item 2',
  'Item 3',
  // ...more items
];

function AnimatedList() {
  return (
    <List
      dataSource={data}
      animated
      staggerItems
      cyberpunk
      renderItem={(item) => (
        <List.Item>{item}</List.Item>
      )}
    />
  );
}
```

## Layout Components

### PageContainer

Enhanced page container with animations:

```jsx
import { PageContainer } from '@/ui/components';

function Dashboard() {
  return (
    <PageContainer
      title="Dashboard"
      animated
      cyberpunk
    >
      <p>Dashboard content goes here</p>
    </PageContainer>
  );
}
```

### ProLayout

Enhanced layout with animations and theme integration:

```jsx
import { ProLayout } from '@/ui/components';

function AppLayout({ children }) {
  return (
    <ProLayout
      title="CauldronOS"
      logo="/logo.svg"
      animated
      cyberpunk
      menu={{ defaultSelectedKeys: ['dashboard'] }}
      route={{
        routes: [
          {
            path: '/dashboard',
            name: 'Dashboard',
            icon: 'DashboardOutlined',
          },
          {
            path: '/users',
            name: 'Users',
            icon: 'UserOutlined',
          },
          // ...more routes
        ],
      }}
    >
      {children}
    </ProLayout>
  );
}
```

## AI Components

### AIInput

AI-enhanced input with typing suggestions and voice input:

```jsx
import { AIInput } from '@/ui/components';

function ChatInput() {
  const handleSubmit = async (value) => {
    console.log('Submitted:', value);
    // Send message to API
  };

  const handleAIAssist = async (value) => {
    // Get AI suggestions based on current input
    // This could call an API endpoint that returns suggestions
    return value + ' (AI suggested completion)';
  };

  return (
    <AIInput
      onSubmit={handleSubmit}
      onAIAssist={handleAIAssist}
      placeholder="Type a message..."
      showVoiceInput
      cyberpunk
    />
  );
}
```

### AIForm

AI-enhanced form with smart completion and validation:

```jsx
import { AIForm, Input, Button } from '@/ui/components';

function SmartForm() {
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  const handleAIComplete = async (values) => {
    // Call API to get AI-suggested completions
    return {
      ...values,
      // Add AI-suggested values for empty fields
      name: values.name || 'John Doe',
      email: values.email || 'john.doe@example.com',
    };
  };

  const handleAIValidate = async (values) => {
    // Call API to validate form with AI
    const issues = [];
    
    if (!values.email?.includes('@')) {
      issues.push('Email address is invalid');
    }
    
    return {
      valid: issues.length === 0,
      issues,
    };
  };

  return (
    <AIForm
      onFinish={handleSubmit}
      onAIComplete={handleAIComplete}
      onAIValidate={handleAIValidate}
      cyberpunk
    >
      <Form.Item name="name" label="Name">
        <Input placeholder="Enter your name" />
      </Form.Item>
      
      <Form.Item name="email" label="Email">
        <Input placeholder="Enter your email" />
      </Form.Item>
      
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </AIForm>
  );
}
```

### AITable

AI-enhanced table with smart filtering:

```jsx
import { AITable } from '@/ui/components';

function SmartTable() {
  const dataSource = [
    { id: 1, name: 'John Doe', status: 'active', priority: 'high' },
    { id: 2, name: 'Jane Smith', status: 'inactive', priority: 'medium' },
    // ...more data
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority' },
  ];

  const handleAIFilter = async (data) => {
    // This would typically call an API with the user's prompt
    // For this example, we'll just filter for high priority items
    return data.filter(item => item.priority === 'high');
  };

  const handleExport = (data) => {
    // Export data to CSV or other format
    console.log('Exporting data:', data);
  };

  return (
    <AITable
      dataSource={dataSource}
      columns={columns}
      onAIFilter={handleAIFilter}
      onExport={handleExport}
      cyberpunk
    />
  );
}
```

## Animation Components

### FadeIn

Fade in animation:

```jsx
import { FadeIn } from '@/ui/components';

function AnimatedContent() {
  return (
    <FadeIn duration={0.5} delay={0.2}>
      <div>This content will fade in</div>
    </FadeIn>
  );
}
```

### SlideIn

Slide in animation:

```jsx
import { SlideIn } from '@/ui/components';

function AnimatedContent() {
  return (
    <SlideIn direction="up" distance={30} duration={0.5} delay={0.2}>
      <div>This content will slide in from below</div>
    </SlideIn>
  );
}
```

### ScaleIn

Scale in animation:

```jsx
import { ScaleIn } from '@/ui/components';

function AnimatedContent() {
  return (
    <ScaleIn initialScale={0.9} duration={0.5} delay={0.2}>
      <div>This content will scale in</div>
    </ScaleIn>
  );
}
```

### Stagger

Staggered animation for lists:

```jsx
import { Stagger } from '@/ui/components';

function AnimatedList() {
  const items = [
    <div key="1">Item 1</div>,
    <div key="2">Item 2</div>,
    <div key="3">Item 3</div>,
  ];

  return (
    <Stagger staggerDelay={0.1} duration={0.5} delay={0.2}>
      {items}
    </Stagger>
  );
}
```

### PageTransition

Page transition animation:

```jsx
import { PageTransition } from '@/ui/components';

function Page() {
  return (
    <PageTransition>
      <div>This entire page will animate when it mounts/unmounts</div>
    </PageTransition>
  );
}
```

### AnimatedModal

Enhanced modal with animations:

```jsx
import { AnimatedModal, Button } from '@/ui/components';
import { useState } from 'react';

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <AnimatedModal
        title="Animated Modal"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        motionPreset="scale"
      >
        <p>Modal content goes here</p>
      </AnimatedModal>
    </>
  );
}
```

### AnimatedDrawer

Enhanced drawer with animations:

```jsx
import { AnimatedDrawer, Button } from '@/ui/components';
import { useState } from 'react';

function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
      
      <AnimatedDrawer
        title="Animated Drawer"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
      >
        <p>Drawer content goes here</p>
      </AnimatedDrawer>
    </>
  );
}
```

## Best Practices

1. **Use Zod for Form Validation**
   - Always use `ZodForm` with a schema for form validation
   - Define schemas in separate files for reusability

2. **Respect Reduced Motion Preferences**
   - All animation components automatically respect the user's reduced motion preferences
   - Test your UI with reduced motion enabled

3. **Consistent Styling**
   - Use the `cyberpunk` prop consistently across related components
   - Apply the same animation patterns throughout your application

4. **AI Integration**
   - Always provide fallbacks when AI features are not available
   - Make AI suggestions clear and distinguishable from user input
   - Allow users to easily override or ignore AI suggestions

5. **Performance**
   - Use the `animated` prop judiciously in lists with many items
   - Consider disabling animations for complex tables with many rows

6. **Accessibility**
   - Ensure all interactive elements have proper ARIA labels
   - Test keyboard navigation for all components
   - Maintain sufficient color contrast for text

7. **Responsive Design**
   - Test all components on different screen sizes
   - Use the responsive utilities provided in the styles

8. **Theme Integration**
   - Use the theme store for consistent theming
   - Access theme variables through CSS variables when needed