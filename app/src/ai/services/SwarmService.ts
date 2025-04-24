import { AIMessage } from '../components/FloatingAIAssistant';
import { GROQ_MODELS } from './GroqService';
import { AI_CONFIG } from '../config/aiConfig';
import CrewService, { CrewConfig, CrewTaskConfig } from './CrewService';

// Define types for Swarm integration
export interface SwarmAgent {
  name: string;
  instructions: string;
  model?: string;
  functions?: SwarmFunction[];
  tool_choice?: string | object;
  parallel_tool_calls?: boolean;
}

export interface SwarmFunction {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
}

export interface SwarmStep {
  agent: SwarmAgent;
  input: string;
  expectedOutput: string;
  maxTokens?: number;
  temperature?: number;
}

export interface SwarmWorkflow {
  name: string;
  description: string;
  steps: SwarmStep[];
  contextVariables?: Record<string, any>;
}

/**
 * SwarmService - Legacy compatibility layer for Groq Swarm
 * This service provides compatibility with the existing Groq Swarm implementation
 * while leveraging the new CrewAI-based architecture
 */
class SwarmService {
  private apiUrl: string;
  private apiKey: string;
  private crewService: typeof CrewService;

  constructor(
    apiUrl: string = '/api/ai/swarm', 
    apiKey: string = AI_CONFIG.groq.apiKey
  ) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.crewService = CrewService;
  }

  /**
   * Get instructions for an agent based on context
   * @param contextData Additional context data
   * @returns Instructions for the agent
   */
  getInstructions(contextData: Record<string, any> = {}): string {
    // Base instructions
    let instructions = `You are CauldronOS Assistant, a helpful AI assistant integrated into the CauldronOS platform.
You provide concise, accurate, and helpful responses to user queries.`;
    
    // Add context-specific instructions
    if (contextData.module) {
      instructions += `\n\nYou are currently in the ${contextData.module} module.`;
    }
    
    if (contextData.user) {
      instructions += `\n\nYou are assisting ${contextData.user.name}, who is a ${contextData.user.role}.`;
    }
    
    if (contextData.task) {
      instructions += `\n\nThe current task is: ${contextData.task}`;
    }
    
    return instructions;
  }

  /**
   * Get available functions for an agent based on context
   * @param contextData Additional context data
   * @returns Available functions for the agent
   */
  getAvailableFunctions(contextData: Record<string, any> = {}): SwarmFunction[] {
    const functions: SwarmFunction[] = [];
    
    // Add search function
    functions.push({
      name: 'search',
      description: 'Search for information',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query'
          }
        },
        required: ['query']
      }
    });
    
    // Add context-specific functions
    if (contextData.module === 'analytics') {
      functions.push({
        name: 'getAnalyticsData',
        description: 'Get analytics data',
        parameters: {
          type: 'object',
          properties: {
            metric: {
              type: 'string',
              description: 'The metric to get data for'
            },
            timeRange: {
              type: 'string',
              description: 'The time range for the data'
            }
          },
          required: ['metric']
        }
      });
    }
    
    return functions;
  }

  /**
   * Send a message to the Swarm API
   * @param message The message to send
   * @param contextData Additional context data
   * @returns A promise that resolves to an AI message
   */
  async sendMessage(message: string, contextData: Record<string, any> = {}): Promise<AIMessage> {
    try {
      // Convert the Swarm request to a Crew request
      const crewConfig = this.convertToCrewConfig(message, contextData);
      
      // Create and run the crew
      const crew = this.crewService.createCrew(crewConfig);
      const result = await this.crewService.runCrew(crewConfig.id, message);
      
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: result.finalOutput,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error in SwarmService.sendMessage:', error);
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again later.',
        timestamp: Date.now()
      };
    }
  }

  /**
   * Send a message to the Swarm API with streaming
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
      // Convert the Swarm request to a Crew request
      const crewConfig = this.convertToCrewConfig(message, contextData);
      
      // Create the crew
      const crew = this.crewService.createCrew(crewConfig);
      
      // Initialize response content
      let responseContent = '';
      
      // Run the crew with streaming
      const result = await this.crewService.runCrewWithStreaming(
        crewConfig.id,
        message,
        (update) => {
          if (update.type === 'progress' || update.type === 'complete') {
            // For progress or complete updates, send the content
            if (update.type === 'complete' && update.result) {
              responseContent = update.result;
            }
            
            onChunk({
              type: 'content',
              content: update.type === 'complete' ? update.result : update.message,
              accumulatedContent: update.type === 'complete' ? update.result : responseContent + update.message
            });
          } else if (update.type === 'error') {
            // For error updates, send the error
            onChunk({
              type: 'error',
              error: update.error
            });
          } else {
            // For other updates, send the update as is
            onChunk(update);
          }
        }
      );
      
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: result.finalOutput,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error in SwarmService.sendMessageStreaming:', error);
      
      // Send error chunk
      onChunk({
        type: 'error',
        error: error instanceof Error ? error.message : String(error)
      });
      
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again later.',
        timestamp: Date.now()
      };
    }
  }

  /**
   * Execute a Swarm workflow
   * @param workflow The workflow to execute
   * @param initialInput The initial input
   * @param contextData Additional context data
   * @returns A promise that resolves to an AI message
   */
  async executeWorkflow(
    workflow: SwarmWorkflow,
    initialInput: string,
    contextData: Record<string, any> = {}
  ): Promise<AIMessage> {
    try {
      // Convert the Swarm workflow to a Crew configuration
      const crewConfig = this.convertWorkflowToCrewConfig(workflow, contextData);
      
      // Create and run the crew
      const crew = this.crewService.createCrew(crewConfig);
      const result = await this.crewService.runCrew(crewConfig.id, initialInput);
      
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: result.finalOutput,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error in SwarmService.executeWorkflow:', error);
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an error while executing the workflow. Please try again later.',
        timestamp: Date.now()
      };
    }
  }

  /**
   * Execute a Swarm workflow with streaming
   * @param workflow The workflow to execute
   * @param initialInput The initial input
   * @param contextData Additional context data
   * @param onChunk Callback for each chunk of the response
   * @returns A promise that resolves to an AI message
   */
  async executeWorkflowStreaming(
    workflow: SwarmWorkflow,
    initialInput: string,
    contextData: Record<string, any> = {},
    onChunk: (chunk: any) => void
  ): Promise<AIMessage> {
    try {
      // Convert the Swarm workflow to a Crew configuration
      const crewConfig = this.convertWorkflowToCrewConfig(workflow, contextData);
      
      // Create the crew
      const crew = this.crewService.createCrew(crewConfig);
      
      // Initialize response content
      let responseContent = '';
      
      // Run the crew with streaming
      const result = await this.crewService.runCrewWithStreaming(
        crewConfig.id,
        initialInput,
        (update) => {
          if (update.type === 'progress' || update.type === 'complete') {
            // For progress or complete updates, send the content
            if (update.type === 'complete' && update.result) {
              responseContent = update.result;
            }
            
            onChunk({
              type: 'content',
              content: update.type === 'complete' ? update.result : update.message,
              accumulatedContent: update.type === 'complete' ? update.result : responseContent + update.message
            });
          } else if (update.type === 'error') {
            // For error updates, send the error
            onChunk({
              type: 'error',
              error: update.error
            });
          } else {
            // For other updates, send the update as is
            onChunk(update);
          }
        }
      );
      
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: result.finalOutput,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error in SwarmService.executeWorkflowStreaming:', error);
      
      // Send error chunk
      onChunk({
        type: 'error',
        error: error instanceof Error ? error.message : String(error)
      });
      
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an error while executing the workflow. Please try again later.',
        timestamp: Date.now()
      };
    }
  }

  /**
   * Convert a Swarm request to a Crew configuration
   * @param message The message to send
   * @param contextData Additional context data
   * @returns A Crew configuration
   */
  private convertToCrewConfig(message: string, contextData: Record<string, any> = {}): CrewConfig {
    // Create a unique ID for the crew
    const crewId = `crew_${Date.now()}`;
    
    // Create a default agent configuration
    const agentConfig = {
      id: 'assistant',
      name: 'CauldronOS Assistant',
      description: 'A helpful AI assistant integrated into the CauldronOS platform',
      systemPrompt: this.getInstructions(contextData),
      model: contextData.model || GROQ_MODELS.LLAMA3_70B,
      tools: [],
    };
    
    // Create a default task configuration
    const taskConfig = {
      id: 'respond',
      description: `Respond to the user's message: ${message}`,
      agentId: 'assistant',
      expectedOutput: 'A helpful response to the user',
      contextData,
    };
    
    // Create the crew configuration
    return {
      id: crewId,
      name: 'Single Agent Crew',
      description: 'A crew with a single agent for responding to user messages',
      agents: [agentConfig],
      tasks: [taskConfig],
      process: 'sequential',
      verbose: false,
    };
  }

  /**
   * Convert a Swarm workflow to a Crew configuration
   * @param workflow The workflow to convert
   * @param contextData Additional context data
   * @returns A Crew configuration
   */
  private convertWorkflowToCrewConfig(
    workflow: SwarmWorkflow,
    contextData: Record<string, any> = {}
  ): CrewConfig {
    // Create a unique ID for the crew
    const crewId = `crew_${Date.now()}`;
    
    // Create agent configurations
    const agents = workflow.steps.map((step, index) => {
      return {
        id: `agent_${index}`,
        name: step.agent.name,
        description: `Agent for step ${index + 1} of the workflow`,
        systemPrompt: step.agent.instructions,
        model: step.agent.model || GROQ_MODELS.LLAMA3_70B,
        tools: [],
      };
    });
    
    // Create task configurations
    const tasks: CrewTaskConfig[] = workflow.steps.map((step, index) => {
      return {
        id: `task_${index}`,
        description: step.input,
        agentId: `agent_${index}`,
        expectedOutput: step.expectedOutput,
        contextData: {
          ...contextData,
          ...workflow.contextVariables,
          temperature: step.temperature,
          maxTokens: step.maxTokens,
        },
        dependencies: index > 0 ? [`task_${index - 1}`] : undefined,
      };
    });
    
    // Create the crew configuration
    return {
      id: crewId,
      name: workflow.name,
      description: workflow.description,
      agents,
      tasks,
      process: 'sequential',
      verbose: true,
    };
  }
}

export default new SwarmService();
