/**
 * Agents package
 */

// Core agent types
export { default as AIProvider, useAI } from './AIProvider';
export { default as AIAssistantProvider } from './AIAssistantProvider';

// Agent hooks
export * from './hooks';

// Agent services
export * from './services';

// Agent components
export * from './components';

// Crew system
export { default as CrewBuilder } from './components/crew-builder/CrewBuilder';
export { default as CrewExecution } from './components/crew-builder/CrewExecution';
export { default as CrewDemo } from './pages/CrewDemo';
export { default as SpecializedAgents } from './agents/SpecializedAgents';
export { default as CrewTemplates } from './crews/CrewTemplates';

// Agent store
export * from './store';