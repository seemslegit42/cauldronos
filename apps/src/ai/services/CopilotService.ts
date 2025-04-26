import { CopilotKit } from '@copilotkit/react-core';
import { AIMessage } from '../components/FloatingAIAssistant';
import { AI_CONFIG, AI_MODELS } from '../config/aiConfig';
import AgentService, { AgentConfig } from './AgentService';
import CrewService, { CrewConfig } from './CrewService';

// Define types for Copilot configuration
export interface CopilotConfig {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  model: string;
  tools?: any[];
  uiCapabilities?: {
    canManipulateDOM: boolean;
    canNavigate: boolean;
    canAccessForms: boolean;
    canExecuteActions: boolean;
  };
}

// Define types for UI context
export interface UIContext {
  currentView: string;
  selectedElement?: string;
  viewportSize?: {
    width: number;
    height: number;
  };
  theme?: 'light' | 'dark';
  uiState?: any;
}

/**
 * CopilotService - Service for managing UI-based AI interactions using CopilotKit
 */
class CopilotService {
  private copilotKit: CopilotKit | null = null;
  private agentService: typeof AgentService;
  private crewService: typeof CrewService;
  private copilots: Record<string, CopilotConfig>;
  private activeCopilotId: string | null = null;
  private uiContext: UIContext;

  constructor() {
    this.agentService = AgentService;
    this.crewService = CrewService;
    this.copilots = {};
    this.activeCopilotId = null;
    this.uiContext = {
      currentView: 'home',
    };
  }

  /**
   * Initialize the CopilotKit instance
   * @param apiKey The API key to use
   * @param baseUrl The base URL for the API
   */
  initialize(apiKey: string = AI_CONFIG.groq.apiKey, baseUrl: string = AI_CONFIG.groq.baseUrl) {
    // In a real implementation, you would initialize CopilotKit here
    // This is a simplified implementation
    console.log('Initializing CopilotKit');
  }

  /**
   * Register a copilot
   * @param config The copilot configuration
   */
  registerCopilot(config: CopilotConfig) {
    this.copilots[config.id] = config;
  }

  /**
   * Get a copilot by ID
   * @param id The ID of the copilot to get
   * @returns The copilot configuration
   */
  getCopilot(id: string): CopilotConfig | undefined {
    return this.copilots[id];
  }

  /**
   * Set the active copilot
   * @param id The ID of the copilot to set as active
   */
  setActiveCopilot(id: string) {
    if (!this.copilots[id]) {
      throw new Error(`Copilot with ID ${id} not found`);
    }
    this.activeCopilotId = id;
  }

  /**
   * Get the active copilot
   * @returns The active copilot configuration
   */
  getActiveCopilot(): CopilotConfig | null {
    if (!this.activeCopilotId) {
      return null;
    }
    return this.copilots[this.activeCopilotId];
  }

  /**
   * Update the UI context
   * @param context The UI context to update
   */
  updateUIContext(context: Partial<UIContext>) {
    this.uiContext = {
      ...this.uiContext,
      ...context,
    };
  }

  /**
   * Get the current UI context
   * @returns The current UI context
   */
  getUIContext(): UIContext {
    return this.uiContext;
  }

  /**
   * Send a message to the active copilot
   * @param message The message to send
   * @param contextData Additional context data
   * @returns A promise that resolves to an AI message
   */
  async sendMessage(message: string, contextData: Record<string, any> = {}): Promise<AIMessage> {
    try {
      const activeCopilot = this.getActiveCopilot();
      if (!activeCopilot) {
        throw new Error('No active copilot');
      }
      
      // Create an agent configuration from the copilot configuration
      const agentConfig: AgentConfig = {
        id: activeCopilot.id,
        name: activeCopilot.name,
        description: activeCopilot.description,
        systemPrompt: this.getEnhancedSystemPrompt(activeCopilot.systemPrompt),
        model: activeCopilot.model,
        tools: activeCopilot.tools,
      };
      
      // Create an agent
      const agent = this.agentService.createAgent(agentConfig);
      
      // Run the agent
      const result = await agent.run(message, {
        sessionId: `session_${Date.now()}`,
        userId: contextData.userId || 'anonymous',
        uiContext: this.uiContext,
      });
      
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: result.output,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error in CopilotService.sendMessage:', error);
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again later.',
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Send a message to the active copilot with streaming
   * @param message The message to send
   * @param contextData Additional context data
   * @param onChunk Callback for each chunk of the response
   * @returns A promise that resolves to an AI message
   */
  async sendMessageStreaming(
    message: string,
    contextData: Record<string, any> = {},
    onChunk: (chunk: any) => void
  ): Promise<AIMessage> {
    try {
      // This is a simplified implementation - in a real implementation, you would use streaming
      onChunk({ type: 'start' });
      
      const result = await this.sendMessage(message, contextData);
      
      onChunk({
        type: 'content',
        content: result.content,
        accumulatedContent: result.content,
      });
      
      return result;
    } catch (error) {
      console.error('Error in CopilotService.sendMessageStreaming:', error);
      
      onChunk({
        type: 'error',
        error: error instanceof Error ? error.message : String(error),
      });
      
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again later.',
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Execute a UI action
   * @param action The action to execute
   * @param contextData Additional context data
   * @returns A promise that resolves to the result of the action
   */
  async executeUIAction(action: string, contextData: Record<string, any> = {}): Promise<any> {
    try {
      const activeCopilot = this.getActiveCopilot();
      if (!activeCopilot) {
        throw new Error('No active copilot');
      }
      
      // Check if the copilot has the required UI capabilities
      if (!activeCopilot.uiCapabilities?.canExecuteActions) {
        throw new Error('Copilot does not have permission to execute UI actions');
      }
      
      // In a real implementation, you would execute the action here
      console.log(`Executing UI action: ${action}`);
      
      return {
        success: true,
        message: `Action ${action} executed successfully`,
      };
    } catch (error) {
      console.error('Error in CopilotService.executeUIAction:', error);
      throw error;
    }
  }

  /**
   * Create a default UI copilot
   * @returns The created copilot configuration
   */
  createDefaultUICopilot(): CopilotConfig {
    const config: CopilotConfig = {
      id: 'default-ui-copilot',
      name: 'CauldronOS UI Copilot',
      description: 'A helpful AI assistant that can interact with the UI',
      systemPrompt: `You are CauldronOS UI Copilot, a helpful AI assistant integrated into the CauldronOS platform.
You can help users navigate the UI, fill out forms, and perform actions.
Always be concise, accurate, and helpful in your responses.`,
      model: AI_MODELS.groq.llama3_70b,
      tools: [],
      uiCapabilities: {
        canManipulateDOM: true,
        canNavigate: true,
        canAccessForms: true,
        canExecuteActions: true,
      },
    };
    
    this.registerCopilot(config);
    this.setActiveCopilot(config.id);
    
    return config;
  }

  /**
   * Create a developer copilot
   * @returns The created copilot configuration
   */
  createDeveloperCopilot(): CopilotConfig {
    const config: CopilotConfig = {
      id: 'developer-copilot',
      name: 'CauldronOS Developer Copilot',
      description: 'A helpful AI assistant for developers',
      systemPrompt: `You are CauldronOS Developer Copilot, a helpful AI assistant for developers.
You can help with code generation, debugging, and providing technical guidance.
Always be concise, accurate, and helpful in your responses.`,
      model: AI_MODELS.groq.llama3_70b,
      tools: [],
      uiCapabilities: {
        canManipulateDOM: false,
        canNavigate: false,
        canAccessForms: false,
        canExecuteActions: false,
      },
    };
    
    this.registerCopilot(config);
    
    return config;
  }

  /**
   * Get an enhanced system prompt with UI context
   * @param basePrompt The base system prompt
   * @returns An enhanced system prompt with UI context
   */
  private getEnhancedSystemPrompt(basePrompt: string): string {
    return `${basePrompt}

Current UI Context:
- Current View: ${this.uiContext.currentView}
${this.uiContext.selectedElement ? `- Selected Element: ${this.uiContext.selectedElement}` : ''}
${this.uiContext.viewportSize ? `- Viewport Size: ${this.uiContext.viewportSize.width}x${this.uiContext.viewportSize.height}` : ''}
${this.uiContext.theme ? `- Theme: ${this.uiContext.theme}` : ''}
`;
  }
}

export default new CopilotService();
