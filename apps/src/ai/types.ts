/**
 * Core types for the AI agent system
 */

export enum AgentType {
  DEVELOPER = 'developer',
  UI = 'ui',
}

export enum AgentCapability {
  CODE_GENERATION = 'code_generation',
  UI_MANIPULATION = 'ui_manipulation',
  MEMORY = 'memory',
  PLUGIN_AWARENESS = 'plugin_awareness',
}

export interface AgentConfig {
  id: string;
  name: string;
  type: AgentType;
  capabilities: AgentCapability[];
  model: string;
  description: string;
  systemPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AgentContext {
  sessionId: string;
  userId: string;
  projectId?: string;
  codeContext?: CodeContext;
  uiContext?: UIContext;
  history?: Message[];
}

export interface CodeContext {
  files?: CodeFile[];
  currentFile?: string;
  selection?: {
    startLine: number;
    endLine: number;
    content: string;
  };
  language?: string;
  projectStructure?: any;
}

export interface UIContext {
  currentView?: string;
  selectedElement?: string;
  viewportSize?: {
    width: number;
    height: number;
  };
  theme?: 'light' | 'dark';
  uiState?: any;
}

export interface CodeFile {
  path: string;
  content: string;
  language: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  metadata?: any;
}

export interface AgentResponse {
  message: Message;
  actions?: AgentAction[];
}

export interface AgentAction {
  type: AgentActionType;
  payload: any;
}

export enum AgentActionType {
  GENERATE_CODE = 'generate_code',
  MODIFY_CODE = 'modify_code',
  MANIPULATE_UI = 'manipulate_ui',
  NAVIGATE = 'navigate',
  EXECUTE_COMMAND = 'execute_command',
  SEARCH_CODEBASE = 'search_codebase',
}

export interface AgentMemory {
  shortTerm: Message[];
  longTerm: {
    facts: string[];
    preferences: Record<string, any>;
    codebase: Record<string, any>;
  };
}

export interface AugmentCodePlugin {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  apiEndpoints: Record<string, string>;
}
