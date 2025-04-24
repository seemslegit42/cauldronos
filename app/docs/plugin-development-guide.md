# CauldronOS Plugin Development Guide

This guide will walk you through the process of creating plugins for CauldronOS, from basic concepts to advanced techniques.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Plugin Structure](#plugin-structure)
4. [Feature Blocks](#feature-blocks)
5. [Configuration](#configuration)
6. [UI Development](#ui-development)
7. [Testing](#testing)
8. [Publishing](#publishing)
9. [Advanced Techniques](#advanced-techniques)
10. [Troubleshooting](#troubleshooting)

## Introduction

CauldronOS plugins are modular components that extend the functionality of the platform. They can be simple UI widgets or complex applications with multiple feature blocks. This guide will help you understand how to create, test, and publish plugins for CauldronOS.

### Key Concepts

- **Plugin**: A self-contained module that adds functionality to CauldronOS
- **Feature Block**: A modular component within a plugin that can be enabled/disabled independently
- **Plugin Registry**: The central system that manages plugins and their lifecycle
- **Dynamic Loading**: The ability to load plugins from external sources at runtime

## Getting Started

### Prerequisites

- Node.js 16 or higher
- Familiarity with React and TypeScript
- Basic understanding of Zod for schema validation

### Setting Up Your Development Environment

1. Clone the CauldronOS Plugin Development Kit:

```bash
git clone https://github.com/cauldronos/plugin-dev-kit.git
cd plugin-dev-kit
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Create a new plugin:

```bash
npm run create-plugin my-plugin
```

This will create a new plugin template in the `src/plugins/my-plugin` directory.

## Plugin Structure

A basic plugin consists of the following files:

```
my-plugin/
├── index.ts        # Main plugin file
├── manifest.json   # Plugin metadata
├── components/     # React components
│   └── ...
├── hooks/          # Custom hooks
│   └── ...
└── utils/          # Utility functions
    └── ...
```

### index.ts

The main plugin file exports the plugin registration:

```typescript
import { PluginRegistration } from '../types';
import MainComponent from './components/MainComponent';
import SettingsComponent from './components/SettingsComponent';

const MyPlugin: PluginRegistration = {
  id: 'my-plugin',
  name: 'My Plugin',
  description: 'A description of my plugin',
  version: '1.0.0',
  author: 'Your Name',
  category: 'utility',
  configSchema: z.object({
    // Define your configuration schema here
  }),
  defaultConfig: {
    // Define default configuration values here
  },
  hasSettings: true,
  hasPermissions: false,
  render: MainComponent,
  renderSettings: SettingsComponent,
  featureBlocks: [
    // Define feature blocks here
  ],
};

export default MyPlugin;
```

### manifest.json

The manifest file contains metadata about your plugin:

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "description": "A description of my plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "category": "utility",
  "entryPoint": "index.js",
  "configSchema": {
    // Define your configuration schema here
  },
  "defaultConfig": {
    // Define default configuration values here
  },
  "hasSettings": true,
  "hasPermissions": false,
  "featureBlocks": [
    // Define feature blocks here
  ]
}
```

## Feature Blocks

Feature blocks are modular components within a plugin that can be enabled or disabled independently. They allow users to customize their experience by choosing which features they want to use.

### Creating a Feature Block

```typescript
import { FeatureBlockRegistration } from '../types';
import FeatureComponent from './components/FeatureComponent';
import FeatureSettingsComponent from './components/FeatureSettingsComponent';

const MyFeatureBlock: FeatureBlockRegistration = {
  id: 'my-feature-block',
  name: 'My Feature Block',
  description: 'A description of my feature block',
  configSchema: z.object({
    // Define your configuration schema here
  }),
  defaultConfig: {
    // Define default configuration values here
  },
  icon: <MyIcon />,
  render: FeatureComponent,
  renderSettings: FeatureSettingsComponent,
};

export default MyFeatureBlock;
```

### Adding Feature Blocks to a Plugin

```typescript
import { PluginRegistration } from '../types';
import MyFeatureBlock from './feature-blocks/MyFeatureBlock';
import AnotherFeatureBlock from './feature-blocks/AnotherFeatureBlock';

const MyPlugin: PluginRegistration = {
  // ... other plugin properties
  featureBlocks: [
    MyFeatureBlock,
    AnotherFeatureBlock,
  ],
};

export default MyPlugin;
```

## Configuration

Plugins and feature blocks use Zod schemas for configuration validation. This ensures that configuration values are of the expected types and within valid ranges.

### Defining a Configuration Schema

```typescript
import { z } from 'zod';

const configSchema = z.object({
  // String with default value
  name: z.string().default('Default Name'),
  
  // Number with min and max values
  count: z.number().min(0).max(100).default(10),
  
  // Boolean with default value
  isEnabled: z.boolean().default(true),
  
  // Enum of allowed values
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  
  // Array of strings
  tags: z.array(z.string()).default([]),
  
  // Nested object
  advanced: z.object({
    timeout: z.number().min(100).max(5000).default(1000),
    retries: z.number().min(0).max(10).default(3),
  }).default({}),
});
```

### Accessing Configuration in Components

```typescript
function MyComponent({ plugin, config, context }) {
  return (
    <div>
      <h2>{config.name}</h2>
      <p>Count: {config.count}</p>
      <p>Enabled: {config.isEnabled ? 'Yes' : 'No'}</p>
      <p>Theme: {config.theme}</p>
      <p>Tags: {config.tags.join(', ')}</p>
      <p>Timeout: {config.advanced.timeout}ms</p>
      <p>Retries: {config.advanced.retries}</p>
    </div>
  );
}
```

### Creating a Settings Component

```typescript
function MySettingsComponent({ plugin, config, onConfigChange }) {
  return (
    <form>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={config.name}
          onChange={(e) => onConfigChange({ ...config, name: e.target.value })}
        />
      </div>
      <div>
        <label>Count:</label>
        <input
          type="number"
          min="0"
          max="100"
          value={config.count}
          onChange={(e) => onConfigChange({ ...config, count: Number(e.target.value) })}
        />
      </div>
      {/* Other settings... */}
    </form>
  );
}
```

## UI Development

CauldronOS uses React for UI development, along with Ant Design for UI components and Tailwind CSS for styling.

### Using Ant Design Components

```typescript
import { Card, Button, Input, Select, Switch } from 'antd';

function MyComponent({ plugin, config, context }) {
  return (
    <Card title={plugin.name} bordered={false}>
      <p>{plugin.description}</p>
      <div>
        <Button type="primary">Click Me</Button>
      </div>
      <div>
        <Input placeholder="Enter text" />
      </div>
      <div>
        <Select defaultValue="option1">
          <Select.Option value="option1">Option 1</Select.Option>
          <Select.Option value="option2">Option 2</Select.Option>
        </Select>
      </div>
      <div>
        <Switch defaultChecked />
      </div>
    </Card>
  );
}
```

### Using Tailwind CSS

```typescript
function MyComponent({ plugin, config, context }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {plugin.name}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {plugin.description}
      </p>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Primary Button
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          Secondary Button
        </button>
      </div>
    </div>
  );
}
```

### Using Framer Motion for Animations

```typescript
import { motion } from 'framer-motion';

function MyComponent({ plugin, config, context }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-white rounded-lg shadow"
    >
      <h2 className="text-xl font-bold mb-2">{plugin.name}</h2>
      <p>{plugin.description}</p>
    </motion.div>
  );
}
```

## Testing

Testing is an important part of plugin development. CauldronOS provides tools for testing plugins in isolation and in the context of the application.

### Unit Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(
      <MyComponent
        plugin={{
          id: 'test-plugin',
          name: 'Test Plugin',
          description: 'A test plugin',
        }}
        config={{
          name: 'Test Name',
          count: 10,
          isEnabled: true,
        }}
        context={{
          workspace: { id: 'test-workspace', name: 'Test Workspace' },
          user: { id: 'test-user', email: 'test@example.com', role: 'admin' },
          theme: 'light',
        }}
      />
    );
    
    expect(screen.getByText('Test Plugin')).toBeInTheDocument();
    expect(screen.getByText('A test plugin')).toBeInTheDocument();
    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText('Count: 10')).toBeInTheDocument();
    expect(screen.getByText('Enabled: Yes')).toBeInTheDocument();
  });
  
  it('handles button clicks', () => {
    const handleClick = jest.fn();
    
    render(
      <MyComponent
        plugin={{
          id: 'test-plugin',
          name: 'Test Plugin',
          description: 'A test plugin',
        }}
        config={{
          name: 'Test Name',
          count: 10,
          isEnabled: true,
        }}
        context={{
          workspace: { id: 'test-workspace', name: 'Test Workspace' },
          user: { id: 'test-user', email: 'test@example.com', role: 'admin' },
          theme: 'light',
        }}
        onClick={handleClick}
      />
    );
    
    fireEvent.click(screen.getByText('Click Me'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { PluginRegistryProvider } from '../plugins/PluginRegistry';
import MyPlugin from './MyPlugin';
import PluginRenderer from '../components/PluginRenderer';

describe('MyPlugin Integration', () => {
  it('renders and functions correctly in the plugin registry', () => {
    render(
      <PluginRegistryProvider>
        <PluginRenderer plugin={MyPlugin} />
      </PluginRegistryProvider>
    );
    
    // Test plugin rendering
    expect(screen.getByText('My Plugin')).toBeInTheDocument();
    
    // Test plugin interactions
    fireEvent.click(screen.getByText('Click Me'));
    
    // Test plugin state changes
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
```

## Publishing

Once your plugin is ready, you can publish it to the CauldronOS Plugin Registry or distribute it as a standalone package.

### Building Your Plugin

```bash
npm run build-plugin my-plugin
```

This will create a production-ready build of your plugin in the `dist/plugins/my-plugin` directory.

### Publishing to the CauldronOS Plugin Registry

```bash
npm run publish-plugin my-plugin
```

This will publish your plugin to the CauldronOS Plugin Registry, making it available to all CauldronOS users.

### Distributing as a Standalone Package

1. Create a package.json file:

```json
{
  "name": "cauldronos-plugin-my-plugin",
  "version": "1.0.0",
  "description": "My CauldronOS Plugin",
  "main": "dist/index.js",
  "files": [
    "dist",
    "manifest.json"
  ],
  "scripts": {
    "build": "tsc"
  },
  "keywords": [
    "cauldronos",
    "plugin"
  ],
  "author": "Your Name",
  "license": "MIT",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "zod": "^3.0.0"
  }
}
```

2. Build your plugin:

```bash
npm run build
```

3. Publish to npm:

```bash
npm publish
```

## Advanced Techniques

### State Management with Zustand

CauldronOS recommends using Zustand for state management in plugins:

```typescript
import create from 'zustand';

interface MyPluginState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useMyPluginStore = create<MyPluginState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

function MyComponent() {
  const { count, increment, decrement, reset } = useMyPluginStore();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### API Calls with TanStack React Query

CauldronOS recommends using TanStack React Query for API calls:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function MyComponent() {
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['myData'],
    queryFn: async () => {
      const response = await fetch('/api/my-data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
  });
  
  const mutation = useMutation({
    mutationFn: async (newData) => {
      const response = await fetch('/api/my-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myData'] });
    },
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div>
      <h2>My Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => mutation.mutate({ value: 'new value' })}>
        Update Data
      </button>
    </div>
  );
}
```

### Form Validation with Zod

CauldronOS recommends using Zod for form validation:

```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old'),
});

type FormData = z.infer<typeof formSchema>;

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Age</label>
        <input type="number" {...register('age', { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Using Groq Swarm for AI Tasks

CauldronOS provides integration with Groq Swarm for AI tasks:

```typescript
import { useGroqSwarm } from 'cauldronos/ai';

function MyAIComponent() {
  const { runTask, isLoading, result, error } = useGroqSwarm();
  
  const handleRunTask = async () => {
    await runTask({
      tasks: [
        {
          type: 'text-generation',
          prompt: 'Write a short story about a robot learning to paint.',
          parameters: {
            max_tokens: 500,
            temperature: 0.7,
          },
        },
        {
          type: 'image-generation',
          prompt: 'A robot painting a landscape',
          parameters: {
            size: '512x512',
            style: 'realistic',
          },
        },
      ],
    });
  };
  
  return (
    <div>
      <button onClick={handleRunTask} disabled={isLoading}>
        {isLoading ? 'Running...' : 'Run AI Task'}
      </button>
      
      {error && <div>Error: {error.message}</div>}
      
      {result && (
        <div>
          <h3>Generated Text</h3>
          <p>{result.tasks[0].output}</p>
          
          <h3>Generated Image</h3>
          <img src={result.tasks[1].output} alt="Generated by AI" />
        </div>
      )}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

#### Plugin Not Loading

- Check that your plugin ID is unique
- Verify that your manifest.json is valid
- Ensure that your entryPoint path is correct
- Check for JavaScript errors in the console

#### Feature Blocks Not Appearing

- Verify that your feature blocks are correctly defined
- Check that your feature block IDs are unique
- Ensure that your feature blocks are included in the plugin's featureBlocks array

#### Configuration Not Working

- Check that your configSchema is valid
- Verify that your defaultConfig matches the schema
- Ensure that you're using the config parameter in your render function

#### UI Issues

- Check for CSS conflicts
- Verify that you're using the correct Ant Design components
- Ensure that your components are responsive

### Getting Help

If you encounter issues that aren't covered in this guide, you can:

- Check the [CauldronOS Plugin Development Forum](https://forum.cauldronos.com/plugin-development)
- Join the [CauldronOS Discord Server](https://discord.gg/cauldronos)
- Open an issue on the [CauldronOS Plugin Development Kit GitHub repository](https://github.com/cauldronos/plugin-dev-kit/issues)
- Contact the CauldronOS Plugin Development Team at plugins@cauldronos.com