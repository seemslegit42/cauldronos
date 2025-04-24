import { AIMessage } from '../components/FloatingAIAssistant';
import { GROQ_MODELS } from './GroqService';
import { SwarmAgent, SwarmFunction, SwarmWorkflow, SwarmStep } from './GroqSwarmIntegration';

// Define types for Langgraph integration
export interface LanggraphNode {
  id: string;
  name: string;
  description: string;
  agent: SwarmAgent;
  next?: string[];
  condition?: string;
}

export interface LanggraphEdge {
  from: string;
  to: string;
  condition?: string;
}

export interface LanggraphGraph {
  nodes: LanggraphNode[];
  edges: LanggraphEdge[];
  entryNode: string;
  exitNode: string;
}

export interface LanggraphWorkflow extends SwarmWorkflow {
  graph: LanggraphGraph;
}

/**
 * A service for integrating with Groq Swarm using Langgraph for complex workflows
 */
class GroqSwarmLanggraphService {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string = '/api/ai/swarm/langgraph', apiKey: string = '') {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  /**
   * Execute a Langgraph workflow
   * @param workflow The workflow to execute
   * @param initialInput The initial input
   * @param contextData Additional context data
   * @returns A promise that resolves to the final output
   */
  async executeWorkflow(
    workflow: LanggraphWorkflow,
    initialInput: string,
    contextData: Record<string, any> = {}
  ): Promise<AIMessage> {
    try {
      // Merge context variables
      const context = {
        ...workflow.contextVariables,
        ...contextData
      };
      
      // Create the request payload
      const payload = {
        workflow: {
          name: workflow.name,
          description: workflow.description,
          graph: workflow.graph
        },
        input: initialInput,
        context_variables: context,
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
      
      // Convert the response to an AIMessage
      return this.convertToAIMessage(data);
    } catch (error) {
      console.error('Error executing Langgraph workflow:', error);
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
   * Execute a Langgraph workflow with streaming
   * @param workflow The workflow to execute
   * @param initialInput The initial input
   * @param contextData Additional context data
   * @param onChunk Callback for each chunk of the response
   * @returns A promise that resolves to the final output
   */
  async executeWorkflowStreaming(
    workflow: LanggraphWorkflow,
    initialInput: string,
    contextData: Record<string, any> = {},
    onChunk: (chunk: any) => void
  ): Promise<AIMessage> {
    try {
      // Merge context variables
      const context = {
        ...workflow.contextVariables,
        ...contextData
      };
      
      // Create the request payload
      const payload = {
        workflow: {
          name: workflow.name,
          description: workflow.description,
          graph: workflow.graph
        },
        input: initialInput,
        context_variables: context,
        stream: true
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

      // Process the streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      let accumulatedContent = '';
      let finalMessage: AIMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        type: 'text',
        isStreaming: true
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Convert the chunk to text
        const chunk = new TextDecoder().decode(value);
        
        try {
          // Parse the chunk as JSON
          const data = JSON.parse(chunk);
          
          // Check if this is a delimiter
          if (data.delim === 'start') {
            // Streaming started
            onChunk({ type: 'start' });
            continue;
          } else if (data.delim === 'end') {
            // Streaming ended
            onChunk({ type: 'end' });
            continue;
          } else if (data.response) {
            // Final response
            finalMessage = this.convertToAIMessage(data.response);
            break;
          }
          
          // Handle node transitions
          if (data.node) {
            onChunk({ 
              type: 'node_transition', 
              node: data.node,
              nodeId: data.node_id
            });
          }
          
          // Handle content chunks
          if (data.content) {
            accumulatedContent += data.content;
            onChunk({ 
              type: 'content', 
              content: data.content,
              accumulatedContent,
              nodeId: data.node_id
            });
          }
          
          // Handle tool calls
          if (data.tool_calls) {
            onChunk({ 
              type: 'tool_calls', 
              tool_calls: data.tool_calls,
              nodeId: data.node_id
            });
          }
        } catch (e) {
          console.error('Error parsing chunk:', e);
        }
      }

      // Update the final message with the accumulated content
      finalMessage.content = accumulatedContent || finalMessage.content;
      finalMessage.isStreaming = false;
      
      return finalMessage;
    } catch (error) {
      console.error('Error executing streaming Langgraph workflow:', error);
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
   * Convert a response to an AIMessage
   * @param response The response
   * @returns An AIMessage
   */
  private convertToAIMessage(response: any): AIMessage {
    // Find the last assistant message
    const lastAssistantMessage = response.messages
      ?.filter((msg: any) => msg.role === 'assistant')
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
  }

  /**
   * Create a linear workflow with Langgraph
   * @param name The name of the workflow
   * @param description The description of the workflow
   * @param steps The steps in the workflow
   * @param contextVariables Additional context variables
   * @returns A Langgraph workflow
   */
  createLinearWorkflow(
    name: string,
    description: string,
    steps: SwarmStep[],
    contextVariables: Record<string, any> = {}
  ): LanggraphWorkflow {
    // Create nodes for each step
    const nodes: LanggraphNode[] = steps.map((step, index) => ({
      id: `step_${index}`,
      name: step.agent.name || `Step ${index + 1}`,
      description: step.expectedOutput || `Step ${index + 1}`,
      agent: step.agent
    }));

    // Create edges connecting the nodes in sequence
    const edges: LanggraphEdge[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        from: nodes[i].id,
        to: nodes[i + 1].id
      });
    }

    return {
      name,
      description,
      steps,
      contextVariables,
      graph: {
        nodes,
        edges,
        entryNode: nodes[0].id,
        exitNode: nodes[nodes.length - 1].id
      }
    };
  }

  /**
   * Create a branching workflow with Langgraph
   * @param name The name of the workflow
   * @param description The description of the workflow
   * @param nodes The nodes in the workflow
   * @param edges The edges connecting the nodes
   * @param entryNode The entry node ID
   * @param exitNode The exit node ID
   * @param contextVariables Additional context variables
   * @returns A Langgraph workflow
   */
  createBranchingWorkflow(
    name: string,
    description: string,
    nodes: LanggraphNode[],
    edges: LanggraphEdge[],
    entryNode: string,
    exitNode: string,
    contextVariables: Record<string, any> = {}
  ): LanggraphWorkflow {
    // Convert nodes to steps
    const steps: SwarmStep[] = nodes.map(node => ({
      agent: node.agent,
      input: '{input}',
      expectedOutput: node.description
    }));

    return {
      name,
      description,
      steps,
      contextVariables,
      graph: {
        nodes,
        edges,
        entryNode,
        exitNode
      }
    };
  }

  /**
   * Create a default reasoning workflow with Langgraph
   * @param task The task to perform
   * @returns A Langgraph workflow
   */
  createReasoningWorkflow(task: string): LanggraphWorkflow {
    // Create a workflow with four nodes:
    // 1. Understanding - Understand the task
    // 2. Planning - Create a plan
    // 3. Execution - Execute the plan
    // 4. Review - Review the results

    const nodes: LanggraphNode[] = [
      {
        id: 'understanding',
        name: 'Understanding',
        description: 'Understand the task and requirements',
        agent: {
          name: 'Understanding Agent',
          instructions: `You are an understanding agent. Your job is to analyze the user's request and ensure you fully understand what they're asking for.
          
Current task: ${task}

Your output should include:
1. A clear restatement of what the user is asking for
2. Any clarifying questions you might have
3. Identification of key requirements and constraints`,
          model: GROQ_MODELS.LLAMA3_70B
        }
      },
      {
        id: 'planning',
        name: 'Planning',
        description: 'Create a plan to accomplish the task',
        agent: {
          name: 'Planning Agent',
          instructions: `You are a planning agent. Your job is to create a detailed plan for how to accomplish the task.
          
Current task: ${task}

Your output should be a markdown-formatted plan with:
1. A step-by-step breakdown of how to accomplish the task
2. Identification of potential challenges
3. Resources or information needed`,
          model: GROQ_MODELS.LLAMA3_70B
        }
      },
      {
        id: 'execution',
        name: 'Execution',
        description: 'Execute the plan and generate the solution',
        agent: {
          name: 'Execution Agent',
          instructions: `You are an execution agent. Your job is to carry out the plan and generate the requested content or solution.
          
Follow the plan step by step and generate the requested output. Be thorough and detailed in your work.`,
          model: GROQ_MODELS.LLAMA3_70B
        }
      },
      {
        id: 'review',
        name: 'Review',
        description: 'Review the solution and provide a final response',
        agent: {
          name: 'Review Agent',
          instructions: `You are a review agent. Your job is to review the output and ensure it meets the user's requirements.
          
Evaluate this output for:
1. Completeness - Does it fully address the user's request?
2. Accuracy - Is the information correct?
3. Clarity - Is it easy to understand?
4. Formatting - Is it well-structured and properly formatted?

Provide a final, polished response that addresses any issues you find.`,
          model: GROQ_MODELS.LLAMA3_70B
        }
      }
    ];

    const edges: LanggraphEdge[] = [
      {
        from: 'understanding',
        to: 'planning'
      },
      {
        from: 'planning',
        to: 'execution'
      },
      {
        from: 'execution',
        to: 'review'
      }
    ];

    return this.createBranchingWorkflow(
      'Reasoning Workflow',
      `A workflow for ${task}`,
      nodes,
      edges,
      'understanding',
      'review'
    );
  }

  /**
   * Create a research workflow with Langgraph
   * @param topic The topic to research
   * @returns A Langgraph workflow
   */
  createResearchWorkflow(topic: string): LanggraphWorkflow {
    // Create a workflow with five nodes:
    // 1. Question Analysis - Analyze the research question
    // 2. Information Gathering - Gather information
    // 3. Analysis - Analyze the information
    // 4. Synthesis - Synthesize the information
    // 5. Conclusion - Draw conclusions

    const nodes: LanggraphNode[] = [
      {
        id: 'question_analysis',
        name: 'Question Analysis',
        description: 'Analyze the research question',
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
        }
      },
      {
        id: 'information_gathering',
        name: 'Information Gathering',
        description: 'Gather information on the topic',
        agent: {
          name: 'Information Gatherer',
          instructions: `You are an information gatherer. Your job is to gather relevant information on the research topic.
          
Based on the question analysis, gather information that addresses the key questions. Include:
1. Key facts and data points
2. Different perspectives on the topic
3. Relevant theories or frameworks
4. Historical context if applicable`,
          model: GROQ_MODELS.LLAMA3_70B
        }
      },
      {
        id: 'analysis',
        name: 'Analysis',
        description: 'Analyze the gathered information',
        agent: {
          name: 'Information Analyzer',
          instructions: `You are an information analyzer. Your job is to critically analyze the gathered information.
          
Analyze the information for:
1. Patterns and trends
2. Contradictions or inconsistencies
3. Strengths and weaknesses of different perspectives
4. Gaps in the information`,
          model: GROQ_MODELS.LLAMA3_70B
        }
      },
      {
        id: 'synthesis',
        name: 'Synthesis',
        description: 'Synthesize the analyzed information',
        agent: {
          name: 'Information Synthesizer',
          instructions: `You are an information synthesizer. Your job is to synthesize the analyzed information into a coherent whole.
          
Create a synthesis that:
1. Integrates different perspectives
2. Resolves contradictions where possible
3. Addresses the key questions identified earlier
4. Presents a unified understanding of the topic`,
          model: GROQ_MODELS.LLAMA3_70B
        }
      },
      {
        id: 'conclusion',
        name: 'Conclusion',
        description: 'Draw conclusions from the research',
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
        }
      }
    ];

    const edges: LanggraphEdge[] = [
      {
        from: 'question_analysis',
        to: 'information_gathering'
      },
      {
        from: 'information_gathering',
        to: 'analysis'
      },
      {
        from: 'analysis',
        to: 'synthesis'
      },
      {
        from: 'synthesis',
        to: 'conclusion'
      }
    ];

    return this.createBranchingWorkflow(
      'Research Workflow',
      `A research workflow for ${topic}`,
      nodes,
      edges,
      'question_analysis',
      'conclusion'
    );
  }
}

export default GroqSwarmLanggraphService;