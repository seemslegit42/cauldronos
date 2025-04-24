import { Crew, Agent, Task, Process, Tool } from 'crewai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AI_CONFIG, AI_MODELS } from '../config/aiConfig';
import AgentService, { AgentConfig } from './AgentService';

// Define the types for crew configuration
export interface CrewConfig {
  id: string;
  name: string;
  description: string;
  agents: AgentConfig[];
  tasks: CrewTaskConfig[];
  process?: 'sequential' | 'hierarchical' | 'consensual';
  verbose?: boolean;
}

// Define the types for crew task configuration
export interface CrewTaskConfig {
  id: string;
  description: string;
  agentId: string;
  expectedOutput?: string;
  contextData?: Record<string, any>;
  dependencies?: string[];
}

// Define the types for crew execution result
export interface CrewResult {
  id: string;
  name: string;
  finalOutput: string;
  taskOutputs: Record<string, string>;
  agentOutputs: Record<string, string[]>;
  executionTime: number;
}

/**
 * CrewService - Service for orchestrating multi-agent crews using CrewAI
 */
class CrewService {
  private crews: Record<string, Crew>;
  private models: Record<string, BaseChatModel>;
  private defaultModel: string;

  constructor() {
    this.crews = {};
    this.models = {};
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
   * Create a new crew
   * @param config The crew configuration
   * @returns The created crew
   */
  createCrew(config: CrewConfig): Crew {
    // Create agents
    const agents = config.agents.map(agentConfig => {
      const model = this.getModel(agentConfig.model);
      
      return new Agent({
        name: agentConfig.name,
        description: agentConfig.description,
        goal: agentConfig.systemPrompt,
        backstory: `You are ${agentConfig.name}, an AI agent with the following description: ${agentConfig.description}`,
        llm: model,
        verbose: config.verbose || false,
        allowDelegation: true,
      });
    });
    
    // Create a map of agent IDs to agent instances
    const agentMap = agents.reduce((map, agent, index) => {
      map[config.agents[index].id] = agent;
      return map;
    }, {} as Record<string, Agent>);
    
    // Create tasks
    const tasks = config.tasks.map(taskConfig => {
      const agent = agentMap[taskConfig.agentId];
      if (!agent) {
        throw new Error(`Agent with ID ${taskConfig.agentId} not found`);
      }
      
      return new Task({
        description: taskConfig.description,
        agent: agent,
        expectedOutput: taskConfig.expectedOutput || 'A detailed analysis and response',
        context: taskConfig.contextData ? JSON.stringify(taskConfig.contextData) : undefined,
      });
    });
    
    // Create a map of task IDs to task instances
    const taskMap = tasks.reduce((map, task, index) => {
      map[config.tasks[index].id] = task;
      return map;
    }, {} as Record<string, Task>);
    
    // Set up task dependencies
    config.tasks.forEach((taskConfig, index) => {
      if (taskConfig.dependencies && taskConfig.dependencies.length > 0) {
        const task = tasks[index];
        const dependencyTasks = taskConfig.dependencies.map(depId => {
          const depTask = taskMap[depId];
          if (!depTask) {
            throw new Error(`Task with ID ${depId} not found`);
          }
          return depTask;
        });
        
        // Set dependencies
        task.dependsOn(dependencyTasks);
      }
    });
    
    // Create the crew
    const crew = new Crew({
      agents: agents,
      tasks: tasks,
      process: config.process as Process || Process.Sequential,
      verbose: config.verbose || false,
    });
    
    // Store the crew
    this.crews[config.id] = crew;
    
    return crew;
  }

  /**
   * Get a crew by ID
   * @param id The ID of the crew to get
   * @returns The crew instance
   */
  getCrew(id: string): Crew | undefined {
    return this.crews[id];
  }

  /**
   * Run a crew with input
   * @param id The ID of the crew to run
   * @param input The input for the crew
   * @returns The result of the crew execution
   */
  async runCrew(id: string, input: string): Promise<CrewResult> {
    const crew = this.getCrew(id);
    if (!crew) {
      throw new Error(`Crew with ID ${id} not found`);
    }
    
    const startTime = Date.now();
    
    // Run the crew
    const result = await crew.run(input);
    
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    // Format the result
    return {
      id,
      name: crew.name || id,
      finalOutput: result,
      taskOutputs: {}, // In a real implementation, you would track individual task outputs
      agentOutputs: {}, // In a real implementation, you would track individual agent outputs
      executionTime,
    };
  }

  /**
   * Run a crew with streaming output
   * @param id The ID of the crew to run
   * @param input The input for the crew
   * @param onUpdate Callback for updates
   * @returns The result of the crew execution
   */
  async runCrewWithStreaming(
    id: string, 
    input: string, 
    onUpdate: (update: any) => void
  ): Promise<CrewResult> {
    const crew = this.getCrew(id);
    if (!crew) {
      throw new Error(`Crew with ID ${id} not found`);
    }
    
    const startTime = Date.now();
    
    // Run the crew with streaming
    // Note: CrewAI doesn't natively support streaming yet, so this is a simplified implementation
    onUpdate({ type: 'start', message: 'Starting crew execution' });
    
    let result: string;
    try {
      result = await crew.run(input);
      
      // Simulate streaming updates
      onUpdate({ 
        type: 'progress', 
        message: 'Crew execution in progress',
        progress: 50
      });
      
      onUpdate({ 
        type: 'complete', 
        message: 'Crew execution complete',
        result
      });
    } catch (error) {
      onUpdate({ 
        type: 'error', 
        message: 'Error during crew execution',
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
    
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    // Format the result
    return {
      id,
      name: crew.name || id,
      finalOutput: result,
      taskOutputs: {}, // In a real implementation, you would track individual task outputs
      agentOutputs: {}, // In a real implementation, you would track individual agent outputs
      executionTime,
    };
  }

  /**
   * Create a predefined crew template
   * @param templateName The name of the template
   * @param customConfig Custom configuration options
   * @returns The created crew
   */
  createCrewFromTemplate(templateName: string, customConfig: Partial<CrewConfig> = {}): Crew {
    switch (templateName) {
      case 'lead-scoring':
        return this.createLeadScoringCrew(customConfig);
      case 'document-analysis':
        return this.createDocumentAnalysisCrew(customConfig);
      case 'competitive-intelligence':
        return this.createCompetitiveIntelligenceCrew(customConfig);
      case 'qa-ticket-review':
        return this.createQATicketReviewCrew(customConfig);
      case 'financial-compliance':
        return this.createFinancialComplianceCrew(customConfig);
      default:
        throw new Error(`Template ${templateName} not found`);
    }
  }

  /**
   * Create a Lead Scoring & Follow-Up Crew
   * @param customConfig Custom configuration options
   * @returns The created crew
   */
  private createLeadScoringCrew(customConfig: Partial<CrewConfig> = {}): Crew {
    const config: CrewConfig = {
      id: customConfig.id || 'lead-scoring-crew',
      name: customConfig.name || 'Lead Scoring & Follow-Up Crew',
      description: customConfig.description || 'A crew that scores leads and generates follow-up actions',
      agents: [
        {
          id: 'lead-researcher',
          name: 'Lead Researcher',
          description: 'Researches and analyzes lead information',
          systemPrompt: 'You are a Lead Researcher. Your job is to analyze lead information and extract key details about the lead, their company, and their needs.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'lead-scorer',
          name: 'Lead Scorer',
          description: 'Scores leads based on qualification criteria',
          systemPrompt: 'You are a Lead Scorer. Your job is to score leads based on qualification criteria such as budget, authority, need, and timeline.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'follow-up-strategist',
          name: 'Follow-Up Strategist',
          description: 'Creates personalized follow-up strategies',
          systemPrompt: 'You are a Follow-Up Strategist. Your job is to create personalized follow-up strategies based on lead information and score.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
      ],
      tasks: [
        {
          id: 'research-lead',
          description: 'Research and analyze the lead information',
          agentId: 'lead-researcher',
          expectedOutput: 'A detailed analysis of the lead information',
        },
        {
          id: 'score-lead',
          description: 'Score the lead based on qualification criteria',
          agentId: 'lead-scorer',
          expectedOutput: 'A lead score with justification',
          dependencies: ['research-lead'],
        },
        {
          id: 'create-follow-up',
          description: 'Create a personalized follow-up strategy',
          agentId: 'follow-up-strategist',
          expectedOutput: 'A personalized follow-up strategy',
          dependencies: ['score-lead'],
        },
      ],
      process: 'sequential',
      verbose: true,
      ...customConfig,
    };
    
    return this.createCrew(config);
  }

  /**
   * Create a Document Analysis Crew
   * @param customConfig Custom configuration options
   * @returns The created crew
   */
  private createDocumentAnalysisCrew(customConfig: Partial<CrewConfig> = {}): Crew {
    const config: CrewConfig = {
      id: customConfig.id || 'document-analysis-crew',
      name: customConfig.name || 'PDF & Contract Summarization Crew',
      description: customConfig.description || 'A crew that analyzes and summarizes documents and contracts',
      agents: [
        {
          id: 'document-extractor',
          name: 'Document Extractor',
          description: 'Extracts key information from documents',
          systemPrompt: 'You are a Document Extractor. Your job is to extract key information from documents, including main points, entities, and important clauses.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'legal-analyst',
          name: 'Legal Analyst',
          description: 'Analyzes legal implications and risks',
          systemPrompt: 'You are a Legal Analyst. Your job is to analyze legal implications, identify risks, and highlight important legal considerations in contracts and documents.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'summary-writer',
          name: 'Summary Writer',
          description: 'Creates concise summaries of documents',
          systemPrompt: 'You are a Summary Writer. Your job is to create concise, clear summaries of documents that highlight the most important information.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
      ],
      tasks: [
        {
          id: 'extract-information',
          description: 'Extract key information from the document',
          agentId: 'document-extractor',
          expectedOutput: 'Key information extracted from the document',
        },
        {
          id: 'analyze-legal',
          description: 'Analyze legal implications and risks',
          agentId: 'legal-analyst',
          expectedOutput: 'Legal analysis of the document',
          dependencies: ['extract-information'],
        },
        {
          id: 'write-summary',
          description: 'Create a concise summary of the document',
          agentId: 'summary-writer',
          expectedOutput: 'A concise summary of the document',
          dependencies: ['extract-information', 'analyze-legal'],
        },
      ],
      process: 'sequential',
      verbose: true,
      ...customConfig,
    };
    
    return this.createCrew(config);
  }

  /**
   * Create a Competitive Intelligence Crew
   * @param customConfig Custom configuration options
   * @returns The created crew
   */
  private createCompetitiveIntelligenceCrew(customConfig: Partial<CrewConfig> = {}): Crew {
    const config: CrewConfig = {
      id: customConfig.id || 'competitive-intelligence-crew',
      name: customConfig.name || 'Competitive Intelligence Crew',
      description: customConfig.description || 'A crew that gathers and analyzes competitive intelligence',
      agents: [
        {
          id: 'market-researcher',
          name: 'Market Researcher',
          description: 'Researches market trends and competitor information',
          systemPrompt: 'You are a Market Researcher. Your job is to research market trends, competitor information, and industry developments.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'competitor-analyst',
          name: 'Competitor Analyst',
          description: 'Analyzes competitor strengths, weaknesses, and strategies',
          systemPrompt: 'You are a Competitor Analyst. Your job is to analyze competitor strengths, weaknesses, opportunities, threats, and strategies.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'strategic-advisor',
          name: 'Strategic Advisor',
          description: 'Provides strategic recommendations based on competitive analysis',
          systemPrompt: 'You are a Strategic Advisor. Your job is to provide strategic recommendations based on competitive analysis and market research.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
      ],
      tasks: [
        {
          id: 'research-market',
          description: 'Research market trends and competitor information',
          agentId: 'market-researcher',
          expectedOutput: 'Market research report',
        },
        {
          id: 'analyze-competitors',
          description: 'Analyze competitor strengths, weaknesses, and strategies',
          agentId: 'competitor-analyst',
          expectedOutput: 'Competitor analysis report',
          dependencies: ['research-market'],
        },
        {
          id: 'provide-recommendations',
          description: 'Provide strategic recommendations',
          agentId: 'strategic-advisor',
          expectedOutput: 'Strategic recommendations',
          dependencies: ['analyze-competitors'],
        },
      ],
      process: 'sequential',
      verbose: true,
      ...customConfig,
    };
    
    return this.createCrew(config);
  }

  /**
   * Create a QA Ticket Review Crew
   * @param customConfig Custom configuration options
   * @returns The created crew
   */
  private createQATicketReviewCrew(customConfig: Partial<CrewConfig> = {}): Crew {
    const config: CrewConfig = {
      id: customConfig.id || 'qa-ticket-review-crew',
      name: customConfig.name || 'Product QA Ticket Review Crew',
      description: customConfig.description || 'A crew that reviews and prioritizes QA tickets',
      agents: [
        {
          id: 'bug-analyzer',
          name: 'Bug Analyzer',
          description: 'Analyzes bug reports and identifies root causes',
          systemPrompt: 'You are a Bug Analyzer. Your job is to analyze bug reports, identify root causes, and determine the severity and impact of issues.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'qa-prioritizer',
          name: 'QA Prioritizer',
          description: 'Prioritizes QA tickets based on impact and urgency',
          systemPrompt: 'You are a QA Prioritizer. Your job is to prioritize QA tickets based on impact, urgency, and resource requirements.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'fix-recommender',
          name: 'Fix Recommender',
          description: 'Recommends approaches to fix issues',
          systemPrompt: 'You are a Fix Recommender. Your job is to recommend approaches to fix issues, including potential code changes and testing strategies.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
      ],
      tasks: [
        {
          id: 'analyze-bug',
          description: 'Analyze the bug report and identify root causes',
          agentId: 'bug-analyzer',
          expectedOutput: 'Bug analysis report',
        },
        {
          id: 'prioritize-ticket',
          description: 'Prioritize the QA ticket based on impact and urgency',
          agentId: 'qa-prioritizer',
          expectedOutput: 'Ticket prioritization with justification',
          dependencies: ['analyze-bug'],
        },
        {
          id: 'recommend-fix',
          description: 'Recommend approaches to fix the issue',
          agentId: 'fix-recommender',
          expectedOutput: 'Fix recommendations',
          dependencies: ['analyze-bug', 'prioritize-ticket'],
        },
      ],
      process: 'sequential',
      verbose: true,
      ...customConfig,
    };
    
    return this.createCrew(config);
  }

  /**
   * Create a Financial Compliance Crew
   * @param customConfig Custom configuration options
   * @returns The created crew
   */
  private createFinancialComplianceCrew(customConfig: Partial<CrewConfig> = {}): Crew {
    const config: CrewConfig = {
      id: customConfig.id || 'financial-compliance-crew',
      name: customConfig.name || 'Financial Compliance Audit Crew',
      description: customConfig.description || 'A crew that audits financial data for compliance issues',
      agents: [
        {
          id: 'data-analyzer',
          name: 'Data Analyzer',
          description: 'Analyzes financial data for patterns and anomalies',
          systemPrompt: 'You are a Data Analyzer. Your job is to analyze financial data for patterns, anomalies, and potential issues.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'compliance-expert',
          name: 'Compliance Expert',
          description: 'Evaluates compliance with financial regulations',
          systemPrompt: 'You are a Compliance Expert. Your job is to evaluate compliance with financial regulations and identify potential violations.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
        {
          id: 'risk-assessor',
          name: 'Risk Assessor',
          description: 'Assesses risks and recommends mitigation strategies',
          systemPrompt: 'You are a Risk Assessor. Your job is to assess risks associated with compliance issues and recommend mitigation strategies.',
          model: AI_MODELS.groq.llama3_70b,
          tools: [],
        },
      ],
      tasks: [
        {
          id: 'analyze-data',
          description: 'Analyze financial data for patterns and anomalies',
          agentId: 'data-analyzer',
          expectedOutput: 'Financial data analysis report',
        },
        {
          id: 'evaluate-compliance',
          description: 'Evaluate compliance with financial regulations',
          agentId: 'compliance-expert',
          expectedOutput: 'Compliance evaluation report',
          dependencies: ['analyze-data'],
        },
        {
          id: 'assess-risk',
          description: 'Assess risks and recommend mitigation strategies',
          agentId: 'risk-assessor',
          expectedOutput: 'Risk assessment and mitigation recommendations',
          dependencies: ['evaluate-compliance'],
        },
      ],
      process: 'sequential',
      verbose: true,
      ...customConfig,
    };
    
    return this.createCrew(config);
  }
}

export default new CrewService();
