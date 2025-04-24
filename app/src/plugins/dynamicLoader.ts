import { z } from 'zod';
import { PluginManifest, PluginRegistration } from './types';

/**
 * Load a plugin from a URL
 * @param url The URL of the plugin
 * @returns A promise that resolves to the plugin registration
 */
export async function loadPluginFromUrl(url: string): Promise<PluginRegistration> {
  try {
    // Fetch the plugin manifest
    const manifestResponse = await fetch(`${url}/manifest.json`);
    if (!manifestResponse.ok) {
      throw new Error(`Failed to fetch plugin manifest: ${manifestResponse.statusText}`);
    }

    const manifestData = await manifestResponse.json();
    
    // Validate the manifest
    const manifest = validateManifest(manifestData);
    
    // Load the plugin module
    const moduleUrl = `${url}/${manifest.entryPoint}`;
    const module = await import(/* @vite-ignore */ moduleUrl);
    
    // Create the plugin registration
    const registration: PluginRegistration = {
      id: manifest.id,
      name: manifest.name,
      description: manifest.description,
      version: manifest.version,
      author: manifest.author,
      category: manifest.category,
      configSchema: z.object(manifest.configSchema),
      defaultConfig: manifest.defaultConfig,
      hasSettings: manifest.hasSettings,
      hasPermissions: manifest.hasPermissions,
      dependencies: manifest.dependencies,
      render: module.default.render,
      renderSettings: module.default.renderSettings,
    };
    
    return registration;
  } catch (error) {
    console.error('Error loading plugin:', error);
    throw new Error(`Failed to load plugin: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate a plugin manifest
 * @param data The manifest data to validate
 * @returns The validated manifest
 */
function validateManifest(data: any): PluginManifest {
  // Define the manifest schema
  const manifestSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    version: z.string(),
    author: z.string(),
    category: z.enum([
      'ui', 
      'data', 
      'integration', 
      'utility', 
      'analytics', 
      'security', 
      'communication', 
      'ai', 
      'other'
    ]),
    entryPoint: z.string(),
    configSchema: z.record(z.any()),
    defaultConfig: z.record(z.any()),
    hasSettings: z.boolean(),
    hasPermissions: z.boolean(),
    dependencies: z.array(z.object({
      pluginId: z.string(),
      version: z.string(),
      isRequired: z.boolean(),
    })).optional(),
    iconUrl: z.string().optional(),
  });
  
  // Validate the manifest
  return manifestSchema.parse(data);
}

/**
 * Check if a plugin is compatible with the current system
 * @param pluginVersion The plugin version
 * @param systemVersion The system version
 * @returns True if the plugin is compatible, false otherwise
 */
export function isPluginCompatible(pluginVersion: string, systemVersion: string): boolean {
  // Parse the versions
  const pluginParts = pluginVersion.split('.').map(Number);
  const systemParts = systemVersion.split('.').map(Number);
  
  // Compare major versions
  if (pluginParts[0] !== systemParts[0]) {
    return false;
  }
  
  // Compare minor versions
  if (pluginParts[1] > systemParts[1]) {
    return false;
  }
  
  return true;
}

/**
 * Check if a plugin has all required dependencies
 * @param dependencies The plugin dependencies
 * @param installedPlugins The installed plugins
 * @returns True if all required dependencies are satisfied, false otherwise
 */
export function hasRequiredDependencies(
  dependencies: { pluginId: string; version: string; isRequired: boolean }[] | undefined,
  installedPlugins: { id: string; version: string }[]
): boolean {
  if (!dependencies) {
    return true;
  }
  
  // Check each required dependency
  for (const dependency of dependencies) {
    if (dependency.isRequired) {
      const installedPlugin = installedPlugins.find(p => p.id === dependency.pluginId);
      
      if (!installedPlugin) {
        return false;
      }
      
      if (!isPluginCompatible(dependency.version, installedPlugin.version)) {
        return false;
      }
    }
  }
  
  return true;
}
