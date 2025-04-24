import { AIMessage } from '../components/FloatingAIAssistant';
import { GROQ_MODELS } from './GroqService';
import GroqSwarmLanggraphService from './GroqSwarmLanggraphService';

// Define types for Groq Swarm integration
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
 * A service for integrating with Groq Swarm for multi-step AI tasks
 */
class GroqSwarmIntegration {
  private apiUrl: string;
  private apiKey: string;
  private langgraphService: GroqSwarmLanggraphService;

  constructor(apiUrl: string = '/api/ai/swarm', apiKey: string = '') {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.langgraphService = new GroqSwarmLanggraphService('/api/ai/swarm/langgraph', apiKey);
  }

  /**
   * Execute a Swarm workflow
   * @param workflow The workflow to execute
   * @param initialInput The initial input
   * @param contextData Additional context data
   * @returns A promise that resolves to the final output
   */
  async executeWorkflow(
    workflow: SwarmWorkflow,
    initialInput: string,
    contextData: Record<string, any> = {}
  ): Promise<AIMessage> {
    try {
      // Check if we should use Langgraph for this workflow
      if (contextData.useLanggraph) {
        // Convert the workflow to a Langgraph workflow
        const langgraphWorkflow = this.langgraphService.createLinearWorkflow(
          workflow.name,
          workflow.description,
          workflow.steps,
          workflow.contextVariables
        );
        
        // Execute the Langgraph workflow
        return this.langgraphService.executeWorkflow(langgraphWorkflow, initialInput, contextData);
      }
      
      // Merge context variables
      const context = {
        ...workflow.contextVariables,
        ...contextData
      };
      
      // Initialize the input for the first step
      let currentInput = initialInput;
      let finalOutput: AIMessage = {
        id: `workflow-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        type: 'text'
      };
      
      // Execute each step in sequence
      for (let i = 0; i < workflow.steps.length; i++) {
        const step = workflow.steps[i];
        
        // Update the input with the current input
        const stepInput = step.input.replace('{input}', currentInput);
        
        // Execute the step
        const response = await this.executeStep(step, stepInput, context);
        
        // Update the current input for the next step
        currentInput = response.content;
        
        // If this is the last step, set the final output
        if (i === workflow.steps.length - 1) {
          finalOutput = response;
        }
      }
      
      return finalOutput;
    } catch (error) {
      console.error('Error executing workflow:', error);
      return {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error executing the workflow. Please try again.',
        timestamp: new Date(),
        type: 'error'
      };
    }
  }

  /**
   * Execute a Swarm workflow with streaming
   * @param workflow The workflow to execute
   * @param initialInput The initial input
   * @param contextData Additional context data
   * @param onChunk Callback for each chunk of the response
   * @returns A promise that resolves to the final output
   */
  async executeWorkflowStreaming(
    workflow: SwarmWorkflow,
    initialInput: string,
    contextData: Record<string, any> = {},
    onChunk: (chunk: any) => void
  ): Promise<AIMessage> {
    try {
      // Check if we should use Langgraph for this workflow
      if (contextData.useLanggraph) {
        // Convert the workflow to a Langgraph workflow
        const langgraphWorkflow = this.langgraphService.createLinearWorkflow(
          workflow.name,
          workflow.description,
          workflow.steps,
          workflow.contextVariables
        );
        
        // Execute the Langgraph workflow with streaming
        return this.langgraphService.executeWorkflowStreaming(
          langgraphWorkflow, 
          initialInput, 
          contextData,
          onChunk
        );
      }
      
      // If not using Langgraph, execute the workflow without streaming
      // This is a simplified implementation - in a real application, you would implement
      // streaming for the non-Langgraph case as well
      onChunk({ type: 'start' });
      
      const result = await this.executeWorkflow(workflow, initialInput, contextData);
      
      onChunk({ 
        type: 'content', 
        content: result.content,
        accumulatedContent: result.content
      });
      
      onChunk({ type: 'end' });
      
      return result;
    } catch (error) {
      console.error('Error executing streaming workflow:', error);
      return {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error executing the workflow. Please try again.',
        timestamp: new Date(),
        type: 'error'
      };
    }
  }

  /**
   * Execute a single step in a workflow
   * @param step The step to execute
   * @param input The input for the step
   * @param contextData Additional context data
   * @returns A promise that resolves to an AI message
   */
  private async executeStep(
    step: SwarmStep,
    input: string,
    contextData: Record<string, any> = {}
  ): Promise<AIMessage> {
    try {
      // Create the request payload
      const payload = {
        messages: [{ role: 'user', content: input }],
        context_variables: contextData,
        agent: {
          ...step.agent,
          model: step.agent.model || GROQ_MODELS.LLAMA3_70B
        },
        max_tokens: step.maxTokens || 2048,
        temperature: step.temperature || 0.7,
        stream: false
      };

      // Make the API request
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Find the last assistant message
      const lastAssistantMessage = data.messages
        .filter((msg: any) => msg.role === 'assistant')
        .pop();

      if (!lastAssistantMessage) {
        return {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'No response received from the assistant.',
          timestamp: new Date(),
          type: 'error'
        };
      }

      // Determine the message type based on content
      let messageType: 'text' | 'markdown' | 'code' | 'error' = 'text';
      const content = lastAssistantMessage.content || '';

      if (content.includes('```')) {
        messageType = 'markdown';
      }

      return {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: content,
        timestamp: new Date(),
        type: messageType
      };
    } catch (error) {
      console.error('Error executing step:', error);
      return {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error executing this step. Please try again.',
        timestamp: new Date(),
        type: 'error'
      };
    }
  }

  /**
   * Create a workflow for a specific task
   * @param name The name of the workflow
   * @param description The description of the workflow
   * @param task The task to perform
   * @param useLanggraph Whether to use Langgraph for this workflow
   * @returns A workflow
   */
  createWorkflow(
    name: string,
    description: string,
    task: string,
    useLanggraph: boolean = false
  ): SwarmWorkflow {
    // If using Langgraph, create a reasoning workflow
    if (useLanggraph) {
      const langgraphWorkflow = this.langgraphService.createReasoningWorkflow(task);
      
      // Convert the Langgraph workflow to a Swarm workflow
      return {
        name: langgraphWorkflow.name,
        description: langgraphWorkflow.description,
        steps: langgraphWorkflow.steps,
        contextVariables: {
          ...langgraphWorkflow.contextVariables,
          useLanggraph: true
        }
      };
    }
    
    // Create a default workflow with three steps:
    // 1. Planning - Analyze the task and create a plan
    // 2. Execution - Execute the plan
    // 3. Review - Review the results and provide a final response
    return {
      name,
      description,
      steps: [
        {
          agent: {
            name: 'Planner',
            instructions: `You are a planning agent. Your job is to analyze the user's request and create a detailed plan for how to accomplish it. Break down complex tasks into smaller steps.
            
Current task: ${task}

Your output should be a markdown-formatted plan with:
1. A clear understanding of what the user is asking for
2. A step-by-step breakdown of how to accomplish it
3. Any clarifying questions that might be needed
4. Identification of potential challenges`,
            model: GROQ_MODELS.LLAMA3_70B
          },
          input: '{input}',
          expectedOutput: 'A detailed plan for accomplishing the task',
          temperature: 0.3
        },
        {
          agent: {
            name: 'Executor',
            instructions: `You are an execution agent. Your job is to carry out the plan provided to you and generate the requested content or solution.
            
The plan you need to execute is:

{input}

Follow the plan step by step and generate the requested output. Be thorough and detailed in your work.`,
            model: GROQ_MODELS.LLAMA3_70B
          },
          input: '{input}',
          expectedOutput: 'The executed result of the plan',
          temperature: 0.7
        },
        {
          agent: {
            name: 'Reviewer',
            instructions: `You are a review agent. Your job is to review the output provided and ensure it meets the user's requirements. Provide a final, polished response.
            
The output to review is:

{input}

Evaluate this output for:
1. Completeness - Does it fully address the user's request?
2. Accuracy - Is the information correct?
3. Clarity - Is it easy to understand?
4. Formatting - Is it well-structured and properly formatted?

Provide a final, polished response that addresses any issues you find.`,
            model: GROQ_MODELS.LLAMA3_70B
          },
          input: '{input}',
          expectedOutput: 'A final, polished response',
          temperature: 0.3
        }
      ]
    };
  }

  /**
   * Create a custom workflow with specific steps
   * @param name The name of the workflow
   * @param description The description of the workflow
   * @param steps The steps in the workflow
   * @param contextVariables Additional context variables
   * @param useLanggraph Whether to use Langgraph for this workflow
   * @returns A workflow
   */
  createCustomWorkflow(
    name: string,
    description: string,
    steps: SwarmStep[],
    contextVariables: Record<string, any> = {},
    useLanggraph: boolean = false
  ): SwarmWorkflow {
    // If using Langgraph, create a linear workflow
    if (useLanggraph) {
      const langgraphWorkflow = this.langgraphService.createLinearWorkflow(
        name,
        description,
        steps,
        {
          ...contextVariables,
          useLanggraph: true
        }
      );
      
      // Convert the Langgraph workflow to a Swarm workflow
      return {
        name: langgraphWorkflow.name,
        description: langgraphWorkflow.description,
        steps: langgraphWorkflow.steps,
        contextVariables: langgraphWorkflow.contextVariables
      };
    }
    
    return {
      name,
      description,
      steps,
      contextVariables
    };
  }

  /**
   * Create a research workflow
   * @param topic The topic to research
   * @param useLanggraph Whether to use Langgraph for this workflow
   * @returns A workflow
   */
  createResearchWorkflow(
    topic: string,
    useLanggraph: boolean = false
  ): SwarmWorkflow {
    // If using Langgraph, create a research workflow
    if (useLanggraph) {
      const langgraphWorkflow = this.langgraphService.createResearchWorkflow(topic);
      
      // Convert the Langgraph workflow to a Swarm workflow
      return {
        name: langgraphWorkflow.name,
        description: langgraphWorkflow.description,
        steps: langgraphWorkflow.steps,
        contextVariables: {
          ...langgraphWorkflow.contextVariables,
          useLanggraph: true
        }
      };
    }
    
    // Create a default research workflow with five steps
    return {
      name: 'Research Workflow',
      description: `A research workflow for ${topic}`,
      steps: [
        {
          agent: {
            name: 'Question Analyzer',
            instructions: `You are a research question analyzer. Your job is to analyze the research topic and break it down into key components.
            
Research topic: ${topic}

Your output should include:
1. A clear restatement of the research topic
2. Key questions that need to be answered
3. Scope and limitations of the research
4. Key terms that need to be defined or explored`,
            model: GROQ_MODELS.LLAMA3_70B
          },
          input: '{input}',
          expectedOutput: 'Analysis of the research question',
          temperature: 0.3
        },
        {
          agent: {
            name: 'Information Gatherer',
            instructions: `You are an information gatherer. Your job is to gather relevant information on the research topic.
            
Based on the question analysis, gather information that addresses the key questions. Include:
1. Key facts and data points
2. Different perspectives on the topic
3. Relevant theories or frameworks
4. Historical context if applicable`,
            model: GROQ_MODELS.LLAMA3_70B
          },
          input: '{input}',
          expectedOutput: 'Gathered information',
          temperature: 0.7
        },
        {
          agent: {
            name: 'Information Analyzer',
            instructions: `You are an information analyzer. Your job is to critically analyze the gathered information.
            
Analyze the information for:
1. Patterns and trends
2. Contradictions or inconsistencies
3. Strengths and weaknesses of different perspectives
4. Gaps in the information`,
            model: GROQ_MODELS.LLAMA3_70B
          },
          input: '{input}',
          expectedOutput: 'Analysis of the information',
          temperature: 0.5
        },
        {
          agent: {
            name: 'Information Synthesizer',
            instructions: `You are an information synthesizer. Your job is to synthesize the analyzed information into a coherent whole.
            
Create a synthesis that:
1. Integrates different perspectives
2. Resolves contradictions where possible
3. Addresses the key questions identified earlier
4. Presents a unified understanding of the topic`,
            model: GROQ_MODELS.LLAMA3_70B
          },
          input: '{input}',
          expectedOutput: 'Synthesis of the information',
          temperature: 0.5
        },
        {
          agent: {
            name: 'Conclusion Drawer',
            instructions: `You are a conclusion drawer. Your job is to draw conclusions from the research and present a final response.
            
Your conclusion should:
1. Directly address the original research topic
2. Summarize key findings
3. Highlight implications or applications
4. Identify areas for further research
5. Present a well-structured, comprehensive response to the original question`,
            model: GROQ_MODELS.LLAMA3_70B
          },
          input: '{input}',
          expectedOutput: 'Final research conclusions',
          temperature: 0.3
        }
      ]
    };
  }

  /**
   * Get the Langgraph service
   * @returns The Langgraph service
   */
  getLanggraphService(): GroqSwarmLanggraphService {
    return this.langgraphService;
  }
}

export default GroqSwarmIntegration;