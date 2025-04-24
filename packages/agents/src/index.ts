/**
 * Agents package - Cauldron AI v4.2 Stack
 */

// Core agent types
export { default as AIProvider } from './AIProvider';
export { default as AIAssistantProvider } from './AIAssistantProvider';

// Export services
export { default as AgentService } from './services/AgentService';
export { default as CrewService } from './services/CrewService';
export { default as SwarmService } from './services/SwarmService';
export { default as CopilotService } from './services/CopilotService';
export { default as GroqService } from './services/GroqService';

// Export types
export type { AgentConfig } from './services/AgentService';
export type { CrewConfig, CrewTaskConfig } from './services/CrewService';
export type {
  SwarmAgent,
  SwarmFunction,
  SwarmStep,
  SwarmWorkflow,
  SwarmMemoryConfig,
  SwarmExecutionResult,
  SwarmTaskResult
} from './services/SwarmService';
export type {
  CopilotConfig,
  CopilotTool,
  CopilotUIAction,
  CopilotContextProvider,
  CopilotMessage,
  CopilotAction,
  UIContext
} from './services/CopilotService';

// Export components
export { default as VisualCrewBuilder } from './components/visual-crew-builder/VisualCrewBuilder';
export { default as CrewBuilder } from './components/crew-builder/CrewBuilder';
export { default as CrewExecution } from './components/crew-builder/CrewExecution';
export { default as WorkflowEditor } from './components/workflow-editor/WorkflowEditor';
export { default as FloatingAIAssistant } from './components/FloatingAIAssistant';

// Export config
export { AI_CONFIG, AI_MODELS, SYSTEM_PROMPTS } from './config/aiConfig';

// Export templates
export { default as CrewTemplates } from './crews/CrewTemplates';
export { default as SpecializedAgents } from './agents/SpecializedAgents';

// Export package info
export const CauldronAgents = {
  version: '0.2.0',
  name: 'CauldronOS Agents - AI v4.2 Stack'
};