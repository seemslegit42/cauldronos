# CauldronOS Plugin System Documentation

## Overview

The CauldronOS Plugin System provides a flexible and extensible way to add new functionality to the application through plugins and feature blocks. This documentation covers the architecture, usage, and development guidelines for working with the plugin system.

## Table of Contents

1. [Architecture](#architecture)
2. [Plugin Structure](#plugin-structure)
3. [Feature Blocks](#feature-blocks)
4. [Plugin Registry](#plugin-registry)
5. [Dynamic Loading](#dynamic-loading)
6. [Plugin Management UI](#plugin-management-ui)
7. [Creating Plugins](#creating-plugins)
8. [Creating Feature Blocks](#creating-feature-blocks)
9. [Plugin Configuration](#plugin-configuration)
10. [Best Practices](#best-practices)

## Architecture

The plugin system consists of several key components:

- **Plugin Types**: Core interfaces and types that define the structure of plugins and feature blocks
- **Plugin Registry**: Central store for managing plugin state and operations
- **Dynamic Loader**: Handles loading plugins from external sources
- **Feature Block Service**: Manages feature block operations
- **Plugin Manager UI**: User interface for browsing, installing, and configuring plugins
- **Feature Block Manager**: Component for managing feature blocks within a plugin

### Component Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Plugin Manager │     │ Plugin Registry │     │  Dynamic Loader │
│       UI        │────▶│    (Context)    │◀────│                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                               ▲  │
                               │  ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Feature Block  │     │  Plugin Types   │     │ Feature Block   │
│    Manager      │────▶│  & Interfaces   │◀────│    Service      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Plugin Structure

A plugin in CauldronOS is defined by the `Plugin` interface and consists of:

### Core Metadata
- `id`: Unique identifier for the plugin
- `name`: Display name of the plugin
- `description`: Description of what the plugin does
- `version`: Version string (semver format)
- `author`: Author of the plugin
- `category`: Category the plugin belongs to

### Status and Configuration
- `status`: Current status (active, inactive, error, loading)
- `configSchema`: Zod schema for validating configuration
- `defaultConfig`: Default configuration values
- `config`: Current configuration values

### UI and Rendering
- `icon`: Optional icon for the plugin
- `render`: Function to render the plugin's UI
- `renderSettings`: Function to render the plugin's settings UI

### Feature Blocks
- `featureBlocks`: Optional array of feature blocks provided by the plugin

## Feature Blocks

Feature blocks are modular components within a plugin that can be individually enabled or disabled. They provide specific functionality that can be composed to create a customized experience.

### Feature Block Structure
- `id`: Unique identifier for the feature block
- `name`: Display name of the feature block
- `description`: Description of what the feature block does
- `configSchema`: Zod schema for validating configuration
- `defaultConfig`: Default configuration values
- `config`: Current configuration values
- `icon`: Optional icon for the feature block
- `render`: Function to render the feature block's UI
- `renderSettings`: Function to render the feature block's settings UI
- `isEnabled`: Whether the feature block is currently enabled
- `pluginId`: Reference to the parent plugin

## Plugin Registry

The Plugin Registry is a React context that provides access to plugin-related functionality throughout the application. It manages the state of all plugins and provides methods for interacting with them.

### Key Functions
- `registerPlugin`: Register a new plugin
- `getPluginById`: Get a plugin by its ID
- `installPlugin`: Install a plugin
- `uninstallPlugin`: Uninstall a plugin
- `enablePlugin`: Enable a plugin
- `disablePlugin`: Disable a plugin
- `updatePluginConfig`: Update a plugin's configuration
- `enableFeatureBlock`: Enable a feature block
- `disableFeatureBlock`: Disable a feature block
- `updateFeatureBlockConfig`: Update a feature block's configuration

### Usage Example

```tsx
import { usePlugins } from '../plugins/PluginRegistry';

function MyComponent() {
  const { 
    plugins, 
    enablePlugin, 
    disablePlugin,
    enableFeatureBlock,
    disableFeatureBlock 
  } = usePlugins();
  
  // Use plugin functions...
}
```

## Dynamic Loading

The dynamic loader allows loading plugins from external sources, such as URLs. It handles fetching plugin manifests, validating them, and creating plugin registrations.

### Loading Process
1. Fetch the plugin manifest from the specified URL
2. Validate the manifest against the expected schema
3. Load the plugin module from the entry point specified in the manifest
4. Process any feature blocks defined in the manifest
5. Create a plugin registration with the loaded data

### Usage Example

```tsx
import { loadPluginFromUrl } from '../plugins/dynamicLoader';

async function loadPlugin() {
  try {
    const plugin = await loadPluginFromUrl('https://example.com/plugins/my-plugin');
    // Register the plugin...
  } catch (error) {
    console.error('Failed to load plugin:', error);
  }
}
```

## Plugin Management UI

The plugin management UI consists of several components:

### Plugin Manager
- Browse available plugins
- Install and uninstall plugins
- Filter plugins by category, status, etc.

### Plugin Detail Page
- View detailed information about a plugin
- Enable or disable the plugin
- Configure plugin settings
- Manage feature blocks

### Feature Block Manager
- View all feature blocks for a plugin
- Enable or disable individual feature blocks
- Configure feature block settings

## Creating Plugins

To create a new plugin for CauldronOS, follow these steps:

### 1. Define the Plugin Registration

```tsx
import { z } from 'zod';
import { PluginRegistration } from '../plugins/types';

const MyPlugin: PluginRegistration = {
  id: 'my-plugin',
  name: 'My Plugin',
  description: 'A description of my plugin',
  version: '1.0.0',
  author: 'Your Name',
  category: 'utility',
  configSchema: z.object({
    setting1: z.string().default('default value'),
    setting2: z.boolean().default(true),
  }),
  defaultConfig: {
    setting1: 'default value',
    setting2: true,
  },
  hasSettings: true,
  hasPermissions: false,
  render: ({ plugin, config, context }) => (
    <div>
      <h2>{plugin.name}</h2>
      <p>{plugin.description}</p>
      <p>Setting 1: {config.setting1}</p>
      <p>Setting 2: {config.setting2 ? 'Enabled' : 'Disabled'}</p>
    </div>
  ),
  renderSettings: ({ plugin, config, onConfigChange }) => (
    <form>
      <div>
        <label>Setting 1:</label>
        <input
          type="text"
          value={config.setting1}
          onChange={(e) => onConfigChange({ ...config, setting1: e.target.value })}
        />
      </div>
      <div>
        <label>Setting 2:</label>
        <input
          type="checkbox"
          checked={config.setting2}
          onChange={(e) => onConfigChange({ ...config, setting2: e.target.checked })}
        />
      </div>
    </form>
  ),
  featureBlocks: [], // Optional feature blocks
};

export default MyPlugin;
```

### 2. Register the Plugin

#### For Built-in Plugins

Add your plugin to the `builtInPlugins` array in `registerPlugins.ts`:

```tsx
import MyPlugin from './examples/MyPlugin';

const builtInPlugins: PluginRegistration[] = [
  FeaturePluginExample,
  MyPlugin,
  // Add more built-in plugins here
];
```

#### For External Plugins

Create a manifest.json file:

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
    "setting1": { "type": "string", "default": "default value" },
    "setting2": { "type": "boolean", "default": true }
  },
  "defaultConfig": {
    "setting1": "default value",
    "setting2": true
  },
  "hasSettings": true,
  "hasPermissions": false,
  "featureBlocks": [] 
}
```

And create an index.js file that exports your plugin:

```js
export default {
  render: ({ plugin, config, context }) => {
    // Render function...
  },
  renderSettings: ({ plugin, config, onConfigChange }) => {
    // Settings render function...
  }
};
```

## Creating Feature Blocks

To add feature blocks to your plugin:

### 1. Define Feature Block Registrations

```tsx
import { FeatureBlockRegistration } from '../plugins/types';

const MyFeatureBlock: FeatureBlockRegistration = {
  id: 'my-feature-block',
  name: 'My Feature Block',
  description: 'A description of my feature block',
  configSchema: z.object({
    option1: z.string().default('default'),
    option2: z.number().min(0).max(100).default(50),
  }),
  defaultConfig: {
    option1: 'default',
    option2: 50,
  },
  icon: <MyIcon />,
  render: ({ block, config, context }) => (
    <div>
      <h3>{block.name}</h3>
      <p>{block.description}</p>
      <p>Option 1: {config.option1}</p>
      <p>Option 2: {config.option2}</p>
    </div>
  ),
  renderSettings: ({ block, config, onConfigChange }) => (
    <form>
      <div>
        <label>Option 1:</label>
        <input
          type="text"
          value={config.option1}
          onChange={(e) => onConfigChange({ ...config, option1: e.target.value })}
        />
      </div>
      <div>
        <label>Option 2:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={config.option2}
          onChange={(e) => onConfigChange({ ...config, option2: Number(e.target.value) })}
        />
      </div>
    </form>
  ),
};
```

### 2. Add Feature Blocks to Your Plugin

```tsx
const MyPlugin: PluginRegistration = {
  // ... other plugin properties
  featureBlocks: [
    MyFeatureBlock,
    // Add more feature blocks here
  ],
};
```

### 3. For External Plugins

Add feature blocks to your manifest.json:

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  // ... other plugin properties
  "featureBlocks": [
    {
      "id": "my-feature-block",
      "name": "My Feature Block",
      "description": "A description of my feature block",
      "configSchema": {
        "option1": { "type": "string", "default": "default" },
        "option2": { "type": "number", "default": 50, "min": 0, "max": 100 }
      },
      "defaultConfig": {
        "option1": "default",
        "option2": 50
      },
      "iconUrl": "icon.svg"
    }
  ]
}
```

And implement the feature blocks in your index.js:

```js
export default {
  render: ({ plugin, config, context }) => {
    // Plugin render function...
  },
  renderSettings: ({ plugin, config, onConfigChange }) => {
    // Plugin settings render function...
  },
  featureBlocks: {
    'my-feature-block': {
      icon: MyIcon,
      render: ({ block, config, context }) => {
        // Feature block render function...
      },
      renderSettings: ({ block, config, onConfigChange }) => {
        // Feature block settings render function...
      }
    }
  }
};
```

## Plugin Configuration

Plugins and feature blocks use Zod schemas for configuration validation. This ensures that configuration values are of the expected types and within valid ranges.

### Configuration Schema Example

```tsx
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

### Accessing Configuration

In render functions, the configuration is provided as a parameter:

```tsx
render: ({ plugin, config, context }) => (
  <div>
    <h2>{config.name}</h2>
    <p>Count: {config.count}</p>
    <p>Enabled: {config.isEnabled ? 'Yes' : 'No'}</p>
    <p>Theme: {config.theme}</p>
    <p>Tags: {config.tags.join(', ')}</p>
    <p>Timeout: {config.advanced.timeout}ms</p>
    <p>Retries: {config.advanced.retries}</p>
  </div>
)
```

### Updating Configuration

In settings render functions, use the `onConfigChange` callback to update configuration:

```tsx
renderSettings: ({ plugin, config, onConfigChange }) => (
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
)
```

## Best Practices

### Plugin Development

1. **Unique IDs**: Ensure plugin and feature block IDs are unique and descriptive
2. **Versioning**: Use semantic versioning for your plugins
3. **Error Handling**: Implement proper error handling in render functions
4. **Performance**: Keep render functions efficient to avoid performance issues
5. **Responsive Design**: Ensure your plugin UI works well on different screen sizes
6. **Accessibility**: Make your plugin UI accessible to all users
7. **Theming**: Support both light and dark themes
8. **Documentation**: Document your plugin's features and configuration options

### Feature Block Design

1. **Single Responsibility**: Each feature block should have a single, well-defined purpose
2. **Independence**: Feature blocks should work independently of each other
3. **Configurability**: Make feature blocks configurable for flexibility
4. **Reusability**: Design feature blocks to be reusable across different contexts
5. **Graceful Degradation**: Handle cases where dependencies or services are unavailable

### Configuration Management

1. **Validation**: Use Zod schemas to validate configuration values
2. **Defaults**: Provide sensible default values for all configuration options
3. **Constraints**: Define min/max values and other constraints for numeric values
4. **Enums**: Use enums for configuration options with a fixed set of values
5. **Documentation**: Document the purpose and valid values for each configuration option

### Security Considerations

1. **Input Validation**: Validate all user inputs to prevent injection attacks
2. **Permissions**: Implement proper permission checks for sensitive operations
3. **Sandboxing**: Consider sandboxing external plugins to prevent malicious code execution
4. **Data Access**: Limit plugins' access to sensitive data
5. **Updates**: Keep plugins updated to address security vulnerabilities