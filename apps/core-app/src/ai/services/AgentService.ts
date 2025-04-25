import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { 
  ChatPromptTemplate, 
  MessagesPlaceholder, 
  HumanMessagePromptTemplate, 
  SystemMessagePromptTemplate 
} from '@langchain/core/prompts';
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { BaseMessage } from '@langchain/core/messages';
import { Tool } from '@langchain/core/tools';
import { StructuredTool } from '@langchain/core/tools';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AI_CONFIG, AI_MODELS, SYSTEM_PROMPTS } from '../config/aiConfig';

// Define the types for agent memory
export interface AgentMemory {
  shortTerm: BaseMessage[];
  longTerm: {
    facts: string[];
    preferences: Record<string, any>;
    codebase: Record<string, any>;
  };
}

// Define the types for agent context
export interface AgentContext {
  sessionId: string;
  userId: string;
  projectId?: string;
  codeContext?: any;
  uiContext?: any;
  history?: BaseMessage[];
  memory?: AgentMemory;
}

// Define the types for agent configuration
export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  tools?: Tool[];
}

/**
 * AgentService - Core service for managing individual AI agents
 */
class AgentService {
  private models: Record<string, BaseChatModel>;
  private tools: Record<string, Tool>;
  private memory: Record<string, AgentMemory>;
  private defaultModel: string;

  constructor() {
    this.models = {};
    this.tools = {};
    this.memory = {};
    this.defaultModel = AI_MODELS.groq.llama3_70b;
    
    // Initialize default models
    this.initializeModels();
  }

  /**
   * Initialize the available models
   */
  private initializeModels() {
    // Initialize Groq models
    this.models[AI_MODELS.groq.llama3_8b] = new ChatGroq({
      apiKey: AI_CONFIG.groq.apiKey,
      modelName: AI_MODELS.groq.llama3_8b,
      temperature: 0.7,
      maxTokens: 2048,
    });
    
    this.models[AI_MODELS.groq.llama3_70b] = new ChatGroq({
      apiKey: AI_CONFIG.groq.apiKey,
      modelName: AI_MODELS.groq.llama3_70b,
      temperature: 0.7,
      maxTokens: 2048,
    });
    
    this.models[AI_MODELS.groq.mixtral_8x7b] = new ChatGroq({
      apiKey: AI_CONFIG.groq.apiKey,
      modelName: AI_MODELS.groq.mixtral_8x7b,
      temperature: 0.7,
      maxTokens: 2048,
    });
    
    // Initialize OpenAI models if API key is available
    if (AI_CONFIG.openai?.apiKey) {
      this.models[AI_MODELS.openai.gpt4_turbo] = new ChatOpenAI({
        apiKey: AI_CONFIG.openai.apiKey,
        modelName: AI_MODELS.openai.gpt4_turbo,
        temperature: 0.7,
        maxTokens: 2048,
      });
    }
    
    // Initialize Anthropic models if API key is available
    if (AI_CONFIG.anthropic?.apiKey) {
      this.models[AI_MODELS.anthropic.claude3_sonnet] = new ChatAnthropic({
        apiKey: AI_CONFIG.anthropic.apiKey,
        modelName: AI_MODELS.anthropic.claude3_sonnet,
        temperature: 0.7,
        maxTokens: 2048,
      });
    }
  }

  /**
   * Get a model instance by name
   * @param modelName The name of the model to get
   * @returns A model instance
   */
  getModel(modelName: string): BaseChatModel {
    if (!this.models[modelName]) {
      console.warn(`Model ${modelName} not found, using default model ${this.defaultModel}`);
      return this.models[this.defaultModel];
    }
    return this.models[modelName];
  }

  /**
   * Register a tool for use by agents
   * @param tool The tool to register
   */
  registerTool(tool: Tool) {
    this.tools[tool.name] = tool;
  }

  /**
   * Get a tool by name
   * @param name The name of the tool to get
   * @returns A tool instance
   */
  getTool(name: string): Tool | undefined {
    return this.tools[name];
  }

  /**
   * Get all available tools
   * @returns An array of tools
   */
  getAllTools(): Tool[] {
    return Object.values(this.tools);
  }

  /**
   * Create a new agent
   * @param config The agent configuration
   * @returns An agent instance
   */
  createAgent(config: AgentConfig) {
    const model = this.getModel(config.model);
    const tools = config.tools || [];
    
    // Create a prompt template
    const prompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(config.systemPrompt),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);
    
    // Create a chain
    const chain = RunnableSequence.from([
      {
        input: (input: string) => input,
        history: (input: string, config: { history: BaseMessage[] }) => config.history || [],
      },
      prompt,
      model,
      new StringOutputParser(),
    ]);
    
    return {
      id: config.id,
      name: config.name,
      description: config.description,
      run: async (input: string, context: AgentContext = { sessionId: '', userId: '' }) => {
        const history = context.history || [];
        const result = await chain.invoke({ 
          input, 
          history 
        });
        
        // Update history
        history.push(new HumanMessage(input));
        history.push(new AIMessage(result));
        
        return {
          output: result,
          history
        };
      },
      runWithTools: async (input: string, context: AgentContext = { sessionId: '', userId: '' }) => {
        // Implementation for running with tools
        // This is a simplified version - in a real implementation, you would use LangChain's agent executors
        return {
          output: "Tool execution not implemented yet",
          history: context.history || []
        };
      }
    };
  }

  /**
   * Initialize or get memory for an agent
   * @param agentId The ID of the agent
   * @returns The agent's memory
   */
  getMemory(agentId: string): AgentMemory {
    if (!this.memory[agentId]) {
      this.memory[agentId] = {
        shortTerm: [],
        longTerm: {
          facts: [],
          preferences: {},
          codebase: {}
        }
      };
    }
    return this.memory[agentId];
  }

  /**
   * Add a fact to an agent's long-term memory
   * @param agentId The ID of the agent
   * @param fact The fact to add
   */
  addFact(agentId: string, fact: string) {
    const memory = this.getMemory(agentId);
    memory.longTerm.facts.push(fact);
  }

  /**
   * Set a preference in an agent's long-term memory
   * @param agentId The ID of the agent
   * @param key The preference key
   * @param value The preference value
   */
  setPreference(agentId: string, key: string, value: any) {
    const memory = this.getMemory(agentId);
    memory.longTerm.preferences[key] = value;
  }

  /**
   * Add a message to an agent's short-term memory
   * @param agentId The ID of the agent
   * @param message The message to add
   */
  addMessage(agentId: string, message: BaseMessage) {
    const memory = this.getMemory(agentId);
    memory.shortTerm.push(message);
    
    // Limit short-term memory to last 20 messages
    if (memory.shortTerm.length > 20) {
      memory.shortTerm = memory.shortTerm.slice(-20);
    }
  }
}

export default new AgentService();
