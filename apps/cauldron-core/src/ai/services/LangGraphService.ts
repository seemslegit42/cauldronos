import { AIMessage } from '../components/FloatingAIAssistant';
import { AI_CONFIG, AI_MODELS, SYSTEM_PROMPTS } from '../config/aiConfig';
import { ChatGroq } from '@langchain/groq';
import { StateGraph, END } from '@langchain/langgraph';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

/**
 * Service for interacting with LangGraph
 */
class LangGraphService {
  private apiKey: string;
  private modelName: string;

  constructor(
    apiKey: string = AI_CONFIG.groq.apiKey,
    modelName: string = AI_MODELS.groq.llama3_70b
  ) {
    this.apiKey = apiKey;
    this.modelName = modelName;
  }

  /**
   * Create a model for a specific role
   * @param role The role for the model
   * @returns A ChatGroq model
   */
  createModel(role: string = 'assistant') {
    return new ChatGroq({
      apiKey: this.apiKey,
      modelName: this.modelName,
      temperature: 0.7,
      maxTokens: 2048,
    });
  }

  /**
   * Create a node for the graph
   * @param role The role for the node
   * @param systemPrompt The system prompt
   * @returns A runnable sequence
   */
  createNode(role: string, systemPrompt: string) {
    const model = this.createModel(role);
    
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt],
      new MessagesPlaceholder('history'),
      ['human', '{input}'],
    ]);
    
    return RunnableSequence.from([
      prompt,
      model,
      new StringOutputParser(),
    ]);
  }

  /**
   * Create a reasoning workflow
   * @param name The name of the workflow
   * @returns A state graph
   */
  createReasoningWorkflow(name: string) {
    // Create the graph
    const workflow = new StateGraph({
      channels: {
        input: {
          value: '',
        },
        history: {
          value: [],
        },
        output: {
          value: '',
        },
      },
    });
    
    // Add nodes to the graph
    workflow.addNode('understand', this.createNode(
      'understanding',
      'You are an understanding agent. Your job is to understand the user query and extract key information.'
    ));
    
    workflow.addNode('research', this.createNode(
      'research',
      'You are a research agent. Your job is to research the topic and gather relevant information.'
    ));
    
    workflow.addNode('reason', this.createNode(
      'reasoning',
      'You are a reasoning agent. Your job is to reason about the information and draw conclusions.'
    ));
    
    workflow.addNode('respond', this.createNode(
      'response',
      'You are a response agent. Your job is to craft a helpful response based on the reasoning.'
    ));
    
    // Define the edges
    workflow.addEdge('understand', 'research');
    workflow.addEdge('research', 'reason');
    workflow.addEdge('reason', 'respond');
    workflow.addEdge('respond', END);
    
    // Set the entry point
    workflow.setEntryPoint('understand');
    
    return workflow.compile();
  }

  /**
   * Create a research workflow
   * @param name The name of the workflow
   * @returns A state graph
   */
  createResearchWorkflow(name: string) {
    // Create the graph
    const workflow = new StateGraph({
      channels: {
        input: {
          value: '',
        },
        history: {
          value: [],
        },
        output: {
          value: '',
        },
      },
    });
    
    // Add nodes to the graph
    workflow.addNode('understand', this.createNode(
      'understanding',
      'You are an understanding agent. Your job is to understand the research question and extract key information.'
    ));
    
    workflow.addNode('plan', this.createNode(
      'planning',
      'You are a planning agent. Your job is to create a research plan with specific steps.'
    ));
    
    workflow.addNode('search', this.createNode(
      'search',
      'You are a search agent. Your job is to search for relevant information based on the plan.'
    ));
    
    workflow.addNode('analyze', this.createNode(
      'analysis',
      'You are an analysis agent. Your job is to analyze the information and identify patterns and insights.'
    ));
    
    workflow.addNode('synthesize', this.createNode(
      'synthesis',
      'You are a synthesis agent. Your job is to synthesize the analysis into a coherent narrative.'
    ));
    
    workflow.addNode('respond', this.createNode(
      'response',
      'You are a response agent. Your job is to craft a comprehensive response based on the synthesis.'
    ));
    
    // Define the edges
    workflow.addEdge('understand', 'plan');
    workflow.addEdge('plan', 'search');
    workflow.addEdge('search', 'analyze');
    workflow.addEdge('analyze', 'synthesize');
    workflow.addEdge('synthesize', 'respond');
    workflow.addEdge('respond', END);
    
    // Set the entry point
    workflow.setEntryPoint('understand');
    
    return workflow.compile();
  }

  /**
   * Execute a workflow
   * @param workflow The workflow to execute
   * @param input The input message
   * @param history The conversation history
   * @param onNodeTransition Callback for node transitions
   * @returns A promise that resolves to an AI message
   */
  async executeWorkflow(
    workflow: any,
    input: string,
    history: any[] = [],
    onNodeTransition?: (nodeId: string, nodeName: string) => void
  ): Promise<AIMessage> {
    try {
      // Create the event handler for node transitions
      const eventHandler = (event: any) => {
        if (event.type === 'node-transition' && onNodeTransition) {
          onNodeTransition(event.node.id, event.node.name || event.node.id);
        }
      };
      
      // Execute the workflow
      const result = await workflow.invoke(
        {
          input,
          history,
        },
        {
          callbacks: [
            {
              handleEvent: eventHandler,
            },
          ],
        }
      );
      
      // Extract the output
      const output = result.output || '';
      
      // Determine the message type based on content
      let messageType: 'text' | 'markdown' | 'code' | 'error' = 'text';
      if (output.includes('```')) {
        messageType = 'markdown';
      }
      
      return {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: output,
        timestamp: new Date(),
        type: messageType,
      };
    } catch (error) {
      console.error('Error executing LangGraph workflow:', error);
      return {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        type: 'error',
      };
    }
  }
}

export default LangGraphService;