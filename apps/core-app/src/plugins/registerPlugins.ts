import { PluginRegistration, Plugin } from './types';
import FeaturePluginExample from './examples/FeaturePluginExample';

// List of built-in plugins to register
const builtInPlugins: PluginRegistration[] = [
  FeaturePluginExample,
  // Add more built-in plugins here
];

/**
 * Register built-in plugins
 * @param registerPlugin Function to register a plugin
 */
export function registerBuiltInPlugins(registerPlugin: (registration: PluginRegistration) => void): void {
  builtInPlugins.forEach(plugin => {
    registerPlugin(plugin);
  });
}

/**
 * Create a plugin instance from a registration
 * @param registration The plugin registration
 * @returns A plugin instance
 */
export function createPluginInstance(registration: PluginRegistration): Plugin {
  // Create feature blocks if they exist
  const featureBlocks = registration.featureBlocks?.map(block => ({
    ...block,
    isEnabled: false, // Default to disabled
    pluginId: registration.id,
    config: block.defaultConfig,
  }));
  
  // Create the plugin instance
  const plugin: Plugin = {
    ...registration,
    status: 'inactive',
    config: registration.defaultConfig,
    featureBlocks,
  };
  
  return plugin;
}import { PluginRegistration, Plugin } from './types';
import FeaturePluginExample from './examples/FeaturePluginExample';

// List of built-in plugins to register
const builtInPlugins: PluginRegistration[] = [
  FeaturePluginExample,
  // Add more built-in plugins here
];

/**
 * Register built-in plugins
 * @param registerPlugin Function to register a plugin
 */
export function registerBuiltInPlugins(registerPlugin: (registration: PluginRegistration) => void): void {
  builtInPlugins.forEach(plugin => {
    registerPlugin(plugin);
  });
}

/**
 * Create a plugin instance from a registration
 * @param registration The plugin registration
 * @returns A plugin instance
 */
export function createPluginInstance(registration: PluginRegistration): Plugin {
  // Create feature blocks if they exist
  const featureBlocks = registration.featureBlocks?.map(block => ({
    ...block,
    isEnabled: false, // Default to disabled
    pluginId: registration.id,
    config: block.defaultConfig,
  }));
  
  // Create the plugin instance
  const plugin: Plugin = {
    ...registration,
    status: 'inactive',
    config: registration.defaultConfig,
    featureBlocks,
  };
  
  return plugin;
}import { PluginRegistration, Plugin } from './types';
import FeaturePluginExample from './examples/FeaturePluginExample';

// List of built-in plugins to register
const builtInPlugins: PluginRegistration[] = [
  FeaturePluginExample,
  // Add more built-in plugins here
];

/**
 * Register built-in plugins
 * @param registerPlugin Function to register a plugin
 */
export function registerBuiltInPlugins(registerPlugin: (registration: PluginRegistration) => void): void {
  builtInPlugins.forEach(plugin => {
    registerPlugin(plugin);
  });
}

/**
 * Create a plugin instance from a registration
 * @param registration The plugin registration
 * @returns A plugin instance
 */
export function createPluginInstance(registration: PluginRegistration): Plugin {
  // Create feature blocks if they exist
  const featureBlocks = registration.featureBlocks?.map(block => ({
    ...block,
    isEnabled: false, // Default to disabled
    pluginId: registration.id,
    config: block.defaultConfig,
  }));
  
  // Create the plugin instance
  const plugin: Plugin = {
    ...registration,
    status: 'inactive',
    config: registration.defaultConfig,
    featureBlocks,
  };
  
  return plugin;
}import { PluginRegistration, Plugin } from './types';
import FeaturePluginExample from './examples/FeaturePluginExample';

// List of built-in plugins to register
const builtInPlugins: PluginRegistration[] = [
  FeaturePluginExample,
  // Add more built-in plugins here
];

/**
 * Register built-in plugins
 * @param registerPlugin Function to register a plugin
 */
export function registerBuiltInPlugins(registerPlugin: (registration: PluginRegistration) => void): void {
  builtInPlugins.forEach(plugin => {
    registerPlugin(plugin);
  });
}

/**
 * Create a plugin instance from a registration
 * @param registration The plugin registration
 * @returns A plugin instance
 */
export function createPluginInstance(registration: PluginRegistration): Plugin {
  // Create feature blocks if they exist
  const featureBlocks = registration.featureBlocks?.map(block => ({
    ...block,
    isEnabled: false, // Default to disabled
    pluginId: registration.id,
    config: block.defaultConfig,
  }));
  
  // Create the plugin instance
  const plugin: Plugin = {
    ...registration,
    status: 'inactive',
    config: registration.defaultConfig,
    featureBlocks,
  };
  
  return plugin;
}