/**
 * Agents package
 */

// Core agent types
export { default as AIProvider } from './AIProvider';
export { default as AIAssistantProvider } from './AIAssistantProvider';

// Export a simple placeholder for now to make the build pass
export const CauldronAgents = {
  version: '0.1.0',
  name: 'CauldronOS Agents'
};