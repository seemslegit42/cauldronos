# CauldronOS Plugin API Reference

This document provides a detailed reference for the CauldronOS Plugin API, including interfaces, functions, and examples.

## Table of Contents

1. [Core Types](#core-types)
2. [Plugin Registry API](#plugin-registry-api)
3. [Dynamic Loader API](#dynamic-loader-api)
4. [Feature Block Service API](#feature-block-service-api)
5. [Plugin Registration API](#plugin-registration-api)
6. [Component Props](#component-props)
7. [Utility Functions](#utility-functions)

## Core Types

### Plugin Categories

```typescript
export type PluginCategory = 
  | 'ui' 
  | 'data' 
  | 'integration' 
  | 'utility' 
  | 'analytics' 
  | 'security' 
  | 'communication' 
  | 'ai' 
  | 'feature'
  | 'other';
```

### Plugin Status

```typescript
export type PluginStatus = 'active' | 'inactive' | 'error' | 'loading';
```

### Plugin Interface

```typescript
export interface Plugin {
  // Core metadata
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: PluginCategory;
  
  // Status
  status: PluginStatus;
  
  // Configuration
  configSchema: z.ZodObject<any>;
  defaultConfig: Record<string, any>;
  config?: Record<string, any>;
  
  // UI
  icon?: ReactNode;
  
  // Capabilities
  hasSettings: boolean;
  hasPermissions: boolean;
  
  // Dependencies
  dependencies?: PluginDependency[];
  
  // Rendering
  render: (props: PluginRenderProps) => ReactNode;
  renderSettings?: (props: PluginSettingsProps) => ReactNode;
  
  // Feature blocks (optional)
  featureBlocks?: FeatureBlock[];
}
```

### Feature Block Interface

```typescript
export interface FeatureBlock {
  // Core metadata
  id: string;
  name: string;
  description: string;
  
  // Configuration
  configSchema: z.ZodObject<any>;
  defaultConfig: Record<string, any>;
  config?: Record<string, any>;
  
  // UI
  icon?: ReactNode;
  
  // Rendering
  render: (props: FeatureBlockRenderProps) => ReactNode;
  renderSettings?: (props: FeatureBlockSettingsProps) => ReactNode;
  
  // Status
  isEnabled: boolean;
  
  // Parent plugin reference
  pluginId: string;
}
```

### Plugin Registration Interface

```typescript
export interface PluginRegistration {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: PluginCategory;
  configSchema: z.ZodObject<any>;
  defaultConfig: Record<string, any>;
  icon?: ReactNode;
  hasSettings: boolean;
  hasPermissions: boolean;
  dependencies?: PluginDependency[];
  render: (props: PluginRenderProps) => ReactNode;
  renderSettings?: (props: PluginSettingsProps) => ReactNode;
  featureBlocks?: FeatureBlockRegistration[];
}
```

### Feature Block Registration Interface

```typescript
export interface FeatureBlockRegistration {
  id: string;
  name: string;
  description: string;
  configSchema: z.ZodObject<any>;
  defaultConfig: Record<string, any>;
  icon?: ReactNode;
  render: (props: FeatureBlockRenderProps) => ReactNode;
  renderSettings?: (props: FeatureBlockSettingsProps) => ReactNode;
}
```

### Plugin Manifest Interface

```typescript
export interface PluginManifest {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: PluginCategory;
  entryPoint: string;
  configSchema: Record<string, any>;
  defaultConfig: Record<string, any>;
  hasSettings: boolean;
  hasPermissions: boolean;
  dependencies?: PluginDependency[];
  iconUrl?: string;
  featureBlocks?: FeatureBlockManifest[];
}
```

### Feature Block Manifest Interface

```typescript
export interface FeatureBlockManifest {
  id: string;
  name: string;
  description: string;
  configSchema: Record<string, any>;
  defaultConfig: Record<string, any>;
  iconUrl?: string;
}
```

### Plugin Dependency Interface

```typescript
export interface PluginDependency {
  pluginId: string;
  version: string;
  isRequired: boolean;
}
```

### Plugin Store Item Interface

```typescript
export interface PluginStoreItem {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  category: PluginCategory;
  rating: number;
  downloads: number;
  price: number | 'free';
  tags: string[];
  isInstalled: boolean;
}
```

### Plugin Context Interface

```typescript
export interface PluginContext {
  workspace: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    email: string;
    role: string;
  };
  theme: 'light' | 'dark';
}
```

## Plugin Registry API

### Plugin Registry Context Type

```typescript
interface PluginRegistryContextType {
  plugins: Plugin[];
  availablePlugins: PluginStoreItem[];
  registerPlugin: (registration: PluginRegistration) => void;
  getPluginById: (id: string) => Plugin | undefined;
  installPlugin: (pluginId: string) => Promise<void>;
  uninstallPlugin: (pluginId: string) => Promise<void>;
  enablePlugin: (pluginId: string) => Promise<void>;
  disablePlugin: (pluginId: string) => Promise<void>;
  updatePluginConfig: (pluginId: string, config: Record<string, any>) => Promise<void>;
  enableFeatureBlock: (pluginId: string, blockId: string) => Promise<void>;
  disableFeatureBlock: (pluginId: string, blockId: string) => Promise<void>;
  updateFeatureBlockConfig: (pluginId: string, blockId: string, config: Record<string, any>) => Promise<void>;
  isLoading: boolean;
}
```

### usePlugins Hook

```typescript
export const usePlugins = () => useContext(PluginRegistryContext);
```

### Plugin Registry Provider

```typescript
export const PluginRegistryProvider: React.FC<{ children: ReactNode }>;
```

## Dynamic Loader API

### loadPluginFromUrl

```typescript
export async function loadPluginFromUrl(url: string): Promise<PluginRegistration>;
```

### validateManifest

```typescript
function validateManifest(data: any): PluginManifest;
```

### isPluginCompatible

```typescript
export function isPluginCompatible(pluginVersion: string, systemVersion: string): boolean;
```

### hasRequiredDependencies

```typescript
export function hasRequiredDependencies(
  dependencies: { pluginId: string; version: string; isRequired: boolean }[] | undefined,
  installedPlugins: { id: string; version: string }[]
): boolean;
```

## Feature Block Service API

### enableFeatureBlock

```typescript
export async function enableFeatureBlock(
  workspaceId: string,
  pluginId: string,
  blockId: string
): Promise<void>;
```

### disableFeatureBlock

```typescript
export async function disableFeatureBlock(
  workspaceId: string,
  pluginId: string,
  blockId: string
): Promise<void>;
```

### updateFeatureBlockConfig

```typescript
export async function updateFeatureBlockConfig(
  workspaceId: string,
  pluginId: string,
  blockId: string,
  config: Record<string, any>
): Promise<void>;
```

### getFeatureBlocks

```typescript
export function getFeatureBlocks(plugin: Plugin): FeatureBlock[];
```

### getFeatureBlockById

```typescript
export function getFeatureBlockById(plugin: Plugin, blockId: string): FeatureBlock | undefined;
```

### getEnabledFeatureBlocks

```typescript
export function getEnabledFeatureBlocks(plugin: Plugin): FeatureBlock[];
```

## Plugin Registration API

### registerBuiltInPlugins

```typescript
export function registerBuiltInPlugins(registerPlugin: (registration: PluginRegistration) => void): void;
```

### createPluginInstance

```typescript
export function createPluginInstance(registration: PluginRegistration): Plugin;
```

## Component Props

### Plugin Render Props

```typescript
export interface PluginRenderProps {
  plugin: Plugin;
  config: Record<string, any>;
  context: PluginContext;
}
```

### Plugin Settings Props

```typescript
export interface PluginSettingsProps {
  plugin: Plugin;
  config: Record<string, any>;
  context: PluginContext;
  onConfigChange: (newConfig: Record<string, any>) => void;
}
```

### Feature Block Render Props

```typescript
export interface FeatureBlockRenderProps {
  block: FeatureBlock;
  config: Record<string, any>;
  context: PluginContext;
}
```

### Feature Block Settings Props

```typescript
export interface FeatureBlockSettingsProps {
  block: FeatureBlock;
  config: Record<string, any>;
  context: PluginContext;
  onConfigChange: (newConfig: Record<string, any>) => void;
}
```

### Feature Block Card Props

```typescript
interface FeatureBlockCardProps {
  block: FeatureBlock;
  plugin: Plugin;
}
```

### Feature Block Manager Props

```typescript
interface FeatureBlockManagerProps {
  plugin: Plugin;
}
```

## Utility Functions

### Comparing Versions

```typescript
function compareVersions(version1: string, version2: string): -1 | 0 | 1;
```

### Validating Plugin IDs

```typescript
function isValidPluginId(id: string): boolean;
```

### Creating a Plugin Context

```typescript
function createPluginContext(
  workspaceId: string,
  userId: string,
  theme: 'light' | 'dark'
): PluginContext;
```

## Examples

### Creating a Simple Plugin

```typescript
import { z } from 'zod';
import { PluginRegistration } from '../plugins/types';

const SimplePlugin: PluginRegistration = {
  id: 'simple-plugin',
  name: 'Simple Plugin',
  description: 'A simple example plugin',
  version: '1.0.0',
  author: 'CauldronOS Team',
  category: 'utility',
  configSchema: z.object({
    message: z.string().default('Hello, World!'),
    showTimestamp: z.boolean().default(true),
  }),
  defaultConfig: {
    message: 'Hello, World!',
    showTimestamp: true,
  },
  hasSettings: true,
  hasPermissions: false,
  render: ({ plugin, config, context }) => (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{plugin.name}</h3>
      <p className="mb-2">{config.message}</p>
      {config.showTimestamp && (
        <p className="text-sm text-gray-500">
          Current time: {new Date().toLocaleTimeString()}
        </p>
      )}
    </div>
  ),
  renderSettings: ({ plugin, config, onConfigChange }) => (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Message</label>
        <input
          type="text"
          value={config.message}
          onChange={(e) => onConfigChange({ ...config, message: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.showTimestamp}
            onChange={(e) => onConfigChange({ ...config, showTimestamp: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm font-medium">Show Timestamp</span>
        </label>
      </div>
    </div>
  ),
};

export default SimplePlugin;
```

### Creating a Plugin with Feature Blocks

```typescript
import { z } from 'zod';
import { PluginRegistration, FeatureBlockRegistration } from '../plugins/types';

// Feature Block: Counter
const CounterBlock: FeatureBlockRegistration = {
  id: 'counter',
  name: 'Counter',
  description: 'A simple counter with increment and decrement buttons',
  configSchema: z.object({
    initialValue: z.number().default(0),
    step: z.number().default(1),
    minValue: z.number().default(0),
    maxValue: z.number().default(100),
  }),
  defaultConfig: {
    initialValue: 0,
    step: 1,
    minValue: 0,
    maxValue: 100,
  },
  render: ({ block, config }) => {
    const [count, setCount] = useState(config.initialValue);
    
    const increment = () => {
      setCount(prev => Math.min(prev + config.step, config.maxValue));
    };
    
    const decrement = () => {
      setCount(prev => Math.max(prev - config.step, config.minValue));
    };
    
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{block.name}</h3>
        <div className="flex items-center justify-center my-4">
          <button
            onClick={decrement}
            className="px-3 py-1 bg-gray-200 rounded-l"
            disabled={count <= config.minValue}
          >
            -
          </button>
          <div className="px-4 py-1 border-t border-b">
            {count}
          </div>
          <button
            onClick={increment}
            className="px-3 py-1 bg-gray-200 rounded-r"
            disabled={count >= config.maxValue}
          >
            +
          </button>
        </div>
      </div>
    );
  },
  renderSettings: ({ block, config, onConfigChange }) => (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Initial Value</label>
        <input
          type="number"
          value={config.initialValue}
          onChange={(e) => onConfigChange({ ...config, initialValue: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Step</label>
        <input
          type="number"
          value={config.step}
          onChange={(e) => onConfigChange({ ...config, step: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Min Value</label>
        <input
          type="number"
          value={config.minValue}
          onChange={(e) => onConfigChange({ ...config, minValue: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Max Value</label>
        <input
          type="number"
          value={config.maxValue}
          onChange={(e) => onConfigChange({ ...config, maxValue: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  ),
};

// Feature Block: Timer
const TimerBlock: FeatureBlockRegistration = {
  id: 'timer',
  name: 'Timer',
  description: 'A countdown timer with start, pause, and reset buttons',
  configSchema: z.object({
    duration: z.number().min(1).max(3600).default(60),
    showMilliseconds: z.boolean().default(false),
    autoStart: z.boolean().default(false),
  }),
  defaultConfig: {
    duration: 60,
    showMilliseconds: false,
    autoStart: false,
  },
  render: ({ block, config }) => {
    const [timeLeft, setTimeLeft] = useState(config.duration);
    const [isRunning, setIsRunning] = useState(config.autoStart);
    
    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
      
      if (isRunning) {
        interval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 0) {
              setIsRunning(false);
              return 0;
            }
            return prev - 0.1;
          });
        }, 100);
      }
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isRunning]);
    
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      const milliseconds = Math.floor((time % 1) * 10);
      
      return config.showMilliseconds
        ? `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds}`
        : `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{block.name}</h3>
        <div className="text-center my-4">
          <div className="text-3xl font-mono mb-4">
            {formatTime(timeLeft)}
          </div>
          <div className="flex justify-center space-x-2">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="px-3 py-1 bg-green-500 text-white rounded"
                disabled={timeLeft <= 0}
              >
                Start
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(false)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Pause
              </button>
            )}
            <button
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(config.duration);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  },
  renderSettings: ({ block, config, onConfigChange }) => (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Duration (seconds)</label>
        <input
          type="number"
          value={config.duration}
          onChange={(e) => onConfigChange({ ...config, duration: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.showMilliseconds}
            onChange={(e) => onConfigChange({ ...config, showMilliseconds: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm font-medium">Show Milliseconds</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.autoStart}
            onChange={(e) => onConfigChange({ ...config, autoStart: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm font-medium">Auto Start</span>
        </label>
      </div>
    </div>
  ),
};

// Main Plugin
const UtilityPlugin: PluginRegistration = {
  id: 'utility-plugin',
  name: 'Utility Plugin',
  description: 'A collection of utility components',
  version: '1.0.0',
  author: 'CauldronOS Team',
  category: 'utility',
  configSchema: z.object({
    title: z.string().default('Utility Tools'),
    description: z.string().default('A collection of useful utility tools'),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
  }),
  defaultConfig: {
    title: 'Utility Tools',
    description: 'A collection of useful utility tools',
    theme: 'system',
  },
  hasSettings: true,
  hasPermissions: false,
  render: ({ plugin, config, context }) => (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{config.title}</h2>
      <p className="mb-4">{config.description}</p>
      <div className="text-sm text-gray-500">
        Theme: {config.theme}
      </div>
    </div>
  ),
  renderSettings: ({ plugin, config, onConfigChange }) => (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={config.description}
          onChange={(e) => onConfigChange({ ...config, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Theme</label>
        <select
          value={config.theme}
          onChange={(e) => onConfigChange({ ...config, theme: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  ),
  featureBlocks: [
    CounterBlock,
    TimerBlock,
  ],
};

export default UtilityPlugin;
```

### Using the Plugin Registry

```typescript
import React from 'react';
import { usePlugins } from '../plugins/PluginRegistry';

function PluginList() {
  const { plugins, enablePlugin, disablePlugin } = usePlugins();
  
  return (
    <div>
      <h2>Installed Plugins</h2>
      <ul>
        {plugins.map(plugin => (
          <li key={plugin.id}>
            <div>
              <strong>{plugin.name}</strong> - {plugin.status}
            </div>
            <div>
              <button onClick={() => enablePlugin(plugin.id)}>Enable</button>
              <button onClick={() => disablePlugin(plugin.id)}>Disable</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PluginList;
```

### Managing Feature Blocks

```typescript
import React from 'react';
import { usePlugins } from '../plugins/PluginRegistry';

function FeatureBlockList({ pluginId }) {
  const { plugins, enableFeatureBlock, disableFeatureBlock } = usePlugins();
  const plugin = plugins.find(p => p.id === pluginId);
  
  if (!plugin) {
    return <div>Plugin not found</div>;
  }
  
  return (
    <div>
      <h2>{plugin.name} Feature Blocks</h2>
      <ul>
        {plugin.featureBlocks?.map(block => (
          <li key={block.id}>
            <div>
              <strong>{block.name}</strong> - {block.isEnabled ? 'Enabled' : 'Disabled'}
            </div>
            <div>
              <button onClick={() => enableFeatureBlock(plugin.id, block.id)}>Enable</button>
              <button onClick={() => disableFeatureBlock(plugin.id, block.id)}>Disable</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeatureBlockList;
```

### Loading a Plugin from URL

```typescript
import React, { useState } from 'react';
import { loadPluginFromUrl } from '../plugins/dynamicLoader';
import { usePlugins } from '../plugins/PluginRegistry';

function PluginLoader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { registerPlugin } = usePlugins();
  
  const handleLoadPlugin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const plugin = await loadPluginFromUrl(url);
      registerPlugin(plugin);
      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2>Load Plugin from URL</h2>
      <div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/plugins/my-plugin"
        />
        <button onClick={handleLoadPlugin} disabled={loading || !url}>
          {loading ? 'Loading...' : 'Load Plugin'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default PluginLoader;
```