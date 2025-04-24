/**
 * Types for the agents package
 */

import { AIOutputType } from '../components/AIOutputBlock';

/**
 * AI Message Request
 */
export interface AIMessageRequest {
  message: string;
  conversationId?: string;
  config?: {
    model: string;
    temperature: number;
    maxTokens: number;
    useStreaming: boolean;
    useSwarm: boolean;
    useLangGraph: boolean;
  };
  contextData?: Record<string, any>;
}

/**
 * AI Message Response
 */
export interface AIMessageResponse {
  message: AIMessage;
  conversationId?: string;
}

/**
 * AI Message
 */
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string | any;
  timestamp: Date;
  type?: AIOutputType;
  isStreaming?: boolean;
}

/**
 * AI Action
 */
export interface AIAction {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
  prompt: string;
  contextData?: Record<string, any>;
  outputType?: AIOutputType;
}

/**
 * Workflow Stage
 */
export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  prompt: string;
  nextStage?: string | ((context: WorkflowContext) => string);
  outputProcessor?: (output: string, context: WorkflowContext) => any;
  required?: boolean;
  contextUpdater?: (context: WorkflowContext) => WorkflowContext;
}

/**
 * Workflow Context
 */
export interface WorkflowContext {
  [key: string]: any;
  currentStage?: string;
  history?: {
    stage: string;
    input?: string;
    output?: string;
    timestamp: Date;
  }[];
}

/**
 * Langgraph Node
 */
export interface LanggraphNode {
  id: string;
  type: 'agent' | 'task' | 'decision' | 'start' | 'end';
  name: string;
  description?: string;
  position: { x: number; y: number };
  data?: any;
}

/**
 * Langgraph Edge
 */
export interface LanggraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

/**
 * Langgraph Workflow
 */
export interface LanggraphWorkflow {
  id: string;
  name: string;
  description: string;
  nodes: LanggraphNode[];
  edges: LanggraphEdge[];
  config?: Record<string, any>;
}

/**
 * Swarm Step
 */
export interface SwarmStep {
  id: string;
  name: string;
  description: string;
  agent: string;
  task: string;
  input?: string | ((context: any) => string);
  output?: (result: string, context: any) => any;
  next?: string | ((result: string, context: any) => string);
}

/**
 * Swarm Config
 */
export interface SwarmConfig {
  maxSteps: number;
  temperature: number;
  model: string;
  agents: {
    [key: string]: {
      name: string;
      description: string;
      systemPrompt: string;
    };
  };
}

/**
 * Swarm Result
 */
export interface SwarmResult {
  steps: {
    id: string;
    agent: string;
    task: string;
    input: string;
    output: string;
    timestamp: Date;
  }[];
  finalOutput: string;
  success: boolean;
  error?: string;
}

export * from '../components/AIOutputBlock';/**
 * Types for the agents package
 */

import { AIOutputType } from '../components/AIOutputBlock';

/**
 * AI Message Request
 */
export interface AIMessageRequest {
  message: string;
  conversationId?: string;
  config?: {
    model: string;
    temperature: number;
    maxTokens: number;
    useStreaming: boolean;
    useSwarm: boolean;
    useLangGraph: boolean;
  };
  contextData?: Record<string, any>;
}

/**
 * AI Message Response
 */
export interface AIMessageResponse {
  message: AIMessage;
  conversationId?: string;
}

/**
 * AI Message
 */
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string | any;
  timestamp: Date;
  type?: AIOutputType;
  isStreaming?: boolean;
}

/**
 * AI Action
 */
export interface AIAction {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
  prompt: string;
  contextData?: Record<string, any>;
  outputType?: AIOutputType;
}

/**
 * Workflow Stage
 */
export interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  prompt: string;
  nextStage?: string | ((context: WorkflowContext) => string);
  outputProcessor?: (output: string, context: WorkflowContext) => any;
  required?: boolean;
  contextUpdater?: (context: WorkflowContext) => WorkflowContext;
}

/**
 * Workflow Context
 */
export interface WorkflowContext {
  [key: string]: any;
  currentStage?: string;
  history?: {
    stage: string;
    input?: string;
    output?: string;
    timestamp: Date;
  }[];
}

/**
 * Langgraph Node
 */
export interface LanggraphNode {
  id: string;
  type: 'agent' | 'task' | 'decision' | 'start' | 'end';
  name: string;
  description?: string;
  position: { x: number; y: number };
  data?: any;
}

/**
 * Langgraph Edge
 */
export interface LanggraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

/**
 * Langgraph Workflow
 */
export interface LanggraphWorkflow {
  id: string;
  name: string;
  description: string;
  nodes: LanggraphNode[];
  edges: LanggraphEdge[];
  config?: Record<string, any>;
}

/**
 * Swarm Step
 */
export interface SwarmStep {
  id: string;
  name: string;
  description: string;
  agent: string;
  task: string;
  input?: string | ((context: any) => string);
  output?: (result: string, context: any) => any;
  next?: string | ((result: string, context: any) => string);
}

/**
 * Swarm Config
 */
export interface SwarmConfig {
  maxSteps: number;
  temperature: number;
  model: string;
  agents: {
    [key: string]: {
      name: string;
      description: string;
      systemPrompt: string;
    };
  };
}

/**
 * Swarm Result
 */
export interface SwarmResult {
  steps: {
    id: string;
    agent: string;
    task: string;
    input: string;
    output: string;
    timestamp: Date;
  }[];
  finalOutput: string;
  success: boolean;
  error?: string;
}

export * from '../components/AIOutputBlock';