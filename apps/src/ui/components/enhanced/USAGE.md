# Enhanced UI Components Usage Guide

This guide explains how to use the enhanced UI components in your application.

## Getting Started

Import enhanced components directly from the UI package:

```tsx
// Import all components
import { Button, Card, Modal, ZodForm } from '@/ui/components/enhanced';

// Use the components in your application
const MyComponent = () => (
  <div>
    <Button variant="cyber">Enhanced Button</Button>
    <Card variant="terminal">Enhanced Card</Card>
    <Modal variant="glass">Enhanced Modal</Modal>
  </div>
);
```

## Component Categories

### Core Components

```tsx
import { Button, Card, Modal } from '@/ui/components/enhanced';

// Button with cyberpunk styling
<Button variant="cyber" glowOnHover>Cyber Button</Button>

// Card with terminal styling
<Card variant="terminal">Terminal Card</Card>

// Modal with glass styling
<Modal variant="glass">Glass Modal</Modal>
```

### Navigation Components

```tsx
import { Menu, Breadcrumb } from '@/ui/components/enhanced';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

// Enhanced menu with cyberpunk styling
<Menu
  variant="cyber"
  glowOnHover
  mode="horizontal"
  defaultSelectedKeys={['1']}
>
  <Menu.Item key="1" icon={<HomeOutlined />}>
    Home
  </Menu.Item>
  <Menu.Item key="2" icon={<UserOutlined />}>
    Profile
  </Menu.Item>
</Menu>

// Enhanced breadcrumb with terminal styling
<Breadcrumb variant="terminal">
  <Breadcrumb.Item>Home</Breadcrumb.Item>
  <Breadcrumb.Item>User</Breadcrumb.Item>
  <Breadcrumb.Item>Profile</Breadcrumb.Item>
</Breadcrumb>
```

### Feedback Components

```tsx
import { Alert, Progress } from '@/ui/components/enhanced';

// Enhanced alert with cyberpunk styling
<Alert
  variant="cyber"
  glowEffect
  message="Success"
  description="This is a success message with cyberpunk styling."
  type="success"
  showIcon
/>

// Enhanced progress with terminal styling
<Progress
  variant="terminal"
  glowEffect
  percent={75}
  status="active"
/>

// Enhanced circle progress
<Progress
  variant="cyber"
  type="circle"
  percent={75}
  pulseEffect
/>
```

### Overlay Components

```tsx
import { Drawer, Modal } from '@/ui/components/enhanced';
import { useState } from 'react';

// Enhanced drawer with glass styling
const [visible, setVisible] = useState(false);

<Button onClick={() => setVisible(true)}>
  Open Drawer
</Button>

<Drawer
  variant="glass"
  glowEffect
  title="Glass Drawer"
  placement="right"
  onClose={() => setVisible(false)}
  visible={visible}
>
  <p>Drawer content with glass styling</p>
</Drawer>
```

### Form Components

```tsx
import { 
  ZodForm, 
  ZodFormItem, 
  Input, 
  Select, 
  Checkbox, 
  Switch, 
  DatePicker, 
  Upload 
} from '@/ui/components/enhanced';
import { z } from 'zod';

// Define your form schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  birthdate: z.date(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms',
  }),
});

// Use the form components
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
      
      <ZodFormItem name="birthdate" label="Birth Date" required>
        <DatePicker />
      </ZodFormItem>
      
      <ZodFormItem name="agreeToTerms" valuePropName="checked">
        <Checkbox>I agree to the terms and conditions</Checkbox>
      </ZodFormItem>
      
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </ZodForm>
  );
};
```

### Data Display Components

```tsx
import { Table, List } from '@/ui/components/enhanced';

// Enhanced table
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
];

<Table columns={columns} dataSource={data} />

// Enhanced list
const listData = [
  {
    title: 'Item 1',
    description: 'Description for item 1',
  },
  {
    title: 'Item 2',
    description: 'Description for item 2',
  },
];

<List
  itemLayout="horizontal"
  dataSource={listData}
  renderItem={(item) => (
    <List.Item>
      <List.Item.Meta
        title={item.title}
        description={item.description}
      />
    </List.Item>
  )}
/>
```

### Layout Components

```tsx
import { PageContainer, ProLayout } from '@/ui/components/enhanced';

// Page container
<PageContainer
  title="Page Title"
  subTitle="Page Subtitle"
  breadcrumb={{ routes: [{ path: '/', breadcrumbName: 'Home' }] }}
>
  <div>Page content</div>
</PageContainer>

// Pro layout
<ProLayout
  title="CauldronOS"
  logo="/logo.svg"
  menu={{ defaultSelectedKeys: ['1'] }}
>
  <div>Layout content</div>
</ProLayout>
```

### AI Components

```tsx
import { AICard, AIForm, AIInput, AITable } from '@/ui/components/enhanced';

// AI card
<AICard
  title="AI-Generated Content"
  description="This is AI-generated content."
  model="Groq Swarm"
  confidence={0.85}
  tags={["AI", "Generated"]}
/>

// AI form
<AIForm
  onSubmit={(prompt) => console.log('AI prompt submitted:', prompt)}
  models={['Groq Swarm', 'OpenAI']}
  defaultModel="Groq Swarm"
>
  <AIInput placeholder="Ask AI a question..." />
</AIForm>

// AI table
<AITable
  columns={[
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ]}
  dataSource={[
    { key: '1', name: 'John Brown', age: 32, address: 'New York' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London' },
  ]}
  aiGenerated={true}
  model="Groq Swarm"
  confidence={0.92}
/>
```

### Utility Components

```tsx
import { 
  CodeHighlighter, 
  CodeExample, 
  ResizablePanel, 
  DraggableCard 
} from '@/ui/components/enhanced';

// Code highlighter
<CodeHighlighter
  language="javascript"
  code="const greeting = 'Hello, world!';"
/>

// Code example
<CodeExample
  title="JavaScript Example"
  code="const greeting = 'Hello, world!';"
  language="javascript"
/>

// Resizable panel
<ResizablePanel
  defaultSize={300}
  minSize={200}
  maxSize={500}
>
  <div>Resizable content</div>
</ResizablePanel>

// Draggable card
<DraggableCard
  title="Draggable Card"
  defaultPosition={{ x: 100, y: 100 }}
>
  <div>Draggable content</div>
</DraggableCard>
```

## Using with Zustand State Management

```tsx
import { Button } from '@/ui/components/enhanced';
import { useUIStore } from '@/ui/store/uiStore';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useUIStore();
  
  return (
    <Button onClick={toggleDarkMode}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </Button>
  );
};
```

## Using with Framer Motion Animations

```tsx
import { Card } from '@/ui/components/enhanced';
import { motion } from 'framer-motion';
import { transitions } from '@/ui/animations/transitions';

const AnimatedCard = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={transitions.fadeIn}
  >
    <Card>Animated content</Card>
  </motion.div>
);
```

## Using with TanStack React Query

```tsx
import { Table } from '@/ui/components/enhanced';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await fetch('/api/users');
  return response.json();
};

const UsersTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
  ];
  
  return <Table columns={columns} dataSource={data} />;
};
```

## Using with Groq Swarm

```tsx
import { AICard, AIForm, AIInput } from '@/ui/components/enhanced';
import { useGroqSwarm } from '@/ai/hooks/useGroqSwarm';

const AIAssistant = () => {
  const { 
    generateResponse, 
    isLoading, 
    response 
  } = useGroqSwarm();
  
  const handleSubmit = async (prompt) => {
    await generateResponse(prompt);
  };
  
  return (
    <div>
      <AIForm onSubmit={handleSubmit}>
        <AIInput placeholder="Ask a question..." />
      </AIForm>
      
      {isLoading && <div>Generating response...</div>}
      
      {response && (
        <AICard
          title="AI Response"
          description={response}
          model="Groq Swarm"
        />
      )}
    </div>
  );
};
```