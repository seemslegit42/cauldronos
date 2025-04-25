import { ChatGroq } from '@langchain/groq';
import { 
  ChatPromptTemplate, 
  HumanMessagePromptTemplate, 
  SystemMessagePromptTemplate,
  MessagesPlaceholder
} from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';
import { AIMessage } from '../components/FloatingAIAssistant';
import { StreamingTextResponse, Message as AIMessage_Vercel, createStreamableUI } from 'ai';
import GroqSwarmService from './GroqSwarmService';
import { createGroq } from '@ai-sdk/groq';
import { generateText, streamText } from 'ai';

// Import the GROQ_MODELS from the GroqService to maintain consistency
import { GROQ_MODELS } from './GroqService';

// Define workflow stages
export enum WorkflowStage {
  INITIAL = 'initial',
  UNDERSTANDING = 'understanding',
  PLANNING = 'planning',
  EXECUTION = 'execution',
  REFINEMENT = 'refinement',
  COMPLETION = 'completion'
}

// Define workflow context
export interface WorkflowContext {
  stage: WorkflowStage;
  history: AIMessage[];
  metadata: Record<string, any>;
  currentPage?: string;
  userRole?: string;
  workspaceName?: string;
  requiresReasoning?: boolean;
}

// Create a Groq provider instance
const groq = createGroq({
  // The API key will be provided by environment variable GROQ_API_KEY
});

/**
 * ConversationalWorkflowService - Manages AI conversations with a workflow approach
 * using Langchain, Vercel AI SDK, and Groq
 */
class ConversationalWorkflowService {
  private model: string;
  private swarmService: GroqSwarmService;
  private chatModel: ChatGroq;
  private workflowChain: RunnableSequence;
  private systemPromptTemplate: string;

  constructor(model: string = GROQ_MODELS.LLAMA3_70B) {
    this.model = model;
    this.swarmService = new GroqSwarmService();
    
    // Define the system prompt template
    this.systemPromptTemplate = `
You are CauldronOS Assistant, a helpful AI assistant integrated into the CauldronOS platform.
You provide concise, accurate, and helpful responses to user queries.

Current context:
- Page: {currentPage}
- User role: {userRole}
- Workspace: {workspaceName}
- Current workflow stage: {stage}

When responding:
1. Be concise and to the point
2. Provide specific, actionable information
3. If you're unsure about something, be honest about your limitations
4. Use markdown formatting for structured responses
5. When appropriate, suggest relevant actions the user can take

For the current workflow stage ({stage}), focus on:
- INITIAL: Establishing context and understanding the user's initial request
- UNDERSTANDING: Clarifying requirements and ensuring you fully understand the user's needs
- PLANNING: Outlining a structured approach to solve the problem
- EXECUTION: Implementing the solution with detailed explanations or code
- REFINEMENT: Improving the solution based on feedback
- COMPLETION: Summarizing the solution and providing next steps
`;
    
    // Initialize the Groq chat model
    this.chatModel = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      modelName: this.model,
      temperature: 0.7,
      maxTokens: 2048
    });

    // Create the workflow chain
    this.workflowChain = this.createWorkflowChain();
  }

  /**
   * Create the Langchain workflow chain
   */
  private createWorkflowChain(): RunnableSequence {
    // Create the system prompt template
    const systemPromptTemplate = SystemMessagePromptTemplate.fromTemplate(this.systemPromptTemplate);

    // Create the chat prompt with history support
    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemPromptTemplate,
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}")
    ]);

    // Create the workflow chain
    return RunnableSequence.from([
      {
        input: (input) => input.input,
        history: (input) => input.history || [],
        currentPage: (input) => input.context?.currentPage || "unknown",
        userRole: (input) => input.context?.userRole || "User",
        workspaceName: (input) => input.context?.workspaceName || "Default",
        stage: (input) => input.context?.stage || WorkflowStage.INITIAL
      },
      chatPrompt,
      this.chatModel,
      new StringOutputParser()
    ]);
  }

  /**
   * Process a message through the workflow
   * @param message The user message
   * @param context The workflow context
   * @returns A promise that resolves to an AI message
   */
  async processMessage(message: string, context: WorkflowContext): Promise<AIMessage> {
    try {
      // Determine the appropriate workflow stage
      const stage = this.determineWorkflowStage(message, context);
      
      // Update the context with the new stage
      const updatedContext = {
        ...context,
        stage
      };
      
      // Convert history to Langchain format if it exists
      const history = this.convertHistoryToLangchainFormat(updatedContext.history || []);
      
      // Process the message through the workflow chain
      const result = await this.workflowChain.invoke({
        input: message,
        history,
        context: updatedContext
      });
      
      // Determine the message type based on content
      let messageType: 'text' | 'markdown' | 'code' | 'error' = 'text';
      if (result.includes('```')) {
        messageType = 'markdown';
      }

      // Create the AI message
      const aiMessage: AIMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: result,
        timestamp: new Date(),
        type: messageType,
        metadata: {
          stage,
          workflow: true
        }
      };
      
      return aiMessage;
    } catch (error) {
      console.error('Error processing message through workflow:', error);
      return {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        type: 'error'
      };
    }
  }

  /**
   * Process a message through the workflow with streaming
   * @param messages Array of messages in the conversation
   * @param context The workflow context
   * @returns A StreamingTextResponse
   */
  async processMessageStream(
    messages: AIMessage_Vercel[],
    context: WorkflowContext
  ): Promise<StreamingTextResponse> {
    try {
      // Get the last user message
      const lastMessage = messages[messages.length - 1];
      
      // Determine the appropriate workflow stage
      const stage = this.determineWorkflowStage(lastMessage.content, context);
      
      // Update the context with the new stage
      const updatedContext = {
        ...context,
        stage
      };
      
      // Use the Groq Swarm service for complex workflows
      if (stage === WorkflowStage.PLANNING || stage === WorkflowStage.EXECUTION) {
        return await this.useSwarmForComplexWorkflow(messages, updatedContext);
      }
      
      // For simpler stages, use the Vercel AI SDK directly for better streaming performance
      const systemPrompt = this.getFormattedSystemPrompt(updatedContext);
      
      // Create the UI stream for better integration with Ant Design X
      const ui = createStreamableUI();
      
      // Start the streaming process
      const stream = await streamText({
        model: groq(this.model),
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        maxTokens: 2048,
        onStreamStart: () => {
          // Update UI to show streaming has started
          ui.update(<div className="streaming-indicator">Thinking...</div>);
        },
        onToken: (token) => {
          // Update UI with each token
          ui.append(token.content);
        },
        onStreamEnd: () => {
          // Update UI to show streaming has ended
          ui.done();
        }
      });
      
      // Return a streaming response with UI components
      return new StreamingTextResponse(stream, { ui });
    } catch (error) {
      console.error('Error processing streaming message through workflow:', error);
      // Create a readable stream with an error message
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode('Sorry, I encountered an error processing your request. Please try again.'));
          controller.close();
        }
      });
      
      return new StreamingTextResponse(stream);
    }
  }

  /**
   * Use Groq Swarm for complex workflow stages
   * @param messages The messages
   * @param context The workflow context
   * @returns A StreamingTextResponse
   */
  private async useSwarmForComplexWorkflow(
    messages: AIMessage_Vercel[],
    context: WorkflowContext
  ): Promise<StreamingTextResponse> {
    // Extract the last user message
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    
    if (!lastUserMessage) {
      throw new Error('No user message found');
    }
    
    // Create a transform stream to modify the response
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    
    // Create the UI stream for better integration with Ant Design X
    const ui = createStreamableUI();
    
    // Start the streaming process
    this.swarmService.sendMessageStreaming(
      lastUserMessage.content,
      {
        currentPage: context.currentPage,
        userRole: context.userRole,
        workspaceName: context.workspaceName,
        workflowStage: context.stage,
        requiresReasoning: true
      },
      (chunk) => {
        // Process the chunk
        if (chunk.type === 'start') {
          ui.update(<div className="streaming-indicator">Processing with Groq Swarm...</div>);
        } else if (chunk.type === 'content') {
          // Write the chunk to the stream
          writer.write(encoder.encode(chunk.content));
          // Update the UI
          ui.append(chunk.content);
        } else if (chunk.type === 'end') {
          ui.done();
          writer.close();
        } else if (chunk.type === 'tool_calls') {
          // Handle tool calls if needed
          ui.update(<div className="tool-call-indicator">Using tools to process your request...</div>);
        }
      }
    ).catch(error => {
      console.error('Error in swarm streaming:', error);
      writer.write(encoder.encode('Sorry, I encountered an error processing your request. Please try again.'));
      writer.close();
      ui.done();
    });
    
    // Return a streaming response with UI components
    return new StreamingTextResponse(readable, { ui });
  }

  /**
   * Get a formatted system prompt based on the context
   * @param context The workflow context
   * @returns The formatted system prompt
   */
  private getFormattedSystemPrompt(context: WorkflowContext): string {
    return this.systemPromptTemplate
      .replace('{currentPage}', context.currentPage || 'unknown')
      .replace('{userRole}', context.userRole || 'User')
      .replace('{workspaceName}', context.workspaceName || 'Default')
      .replace('{stage}', context.stage);
  }

  /**
   * Convert history to Langchain format
   * @param history The history array
   * @returns The history in Langchain format
   */
  private convertHistoryToLangchainFormat(history: AIMessage[]): any[] {
    return history.map(msg => {
      if (msg.role === 'user') {
        return {
          type: 'human',
          content: msg.content
        };
      } else if (msg.role === 'assistant') {
        return {
          type: 'ai',
          content: msg.content
        };
      } else if (msg.role === 'system') {
        return {
          type: 'system',
          content: msg.content
        };
      }
      return null;
    }).filter(Boolean);
  }

  /**
   * Determine the appropriate workflow stage based on the message and context
   * @param message The user message
   * @param context The workflow context
   * @returns The workflow stage
   */
  private determineWorkflowStage(message: string, context: WorkflowContext): WorkflowStage {
    const currentStage = context.stage || WorkflowStage.INITIAL;
    const messageContent = message.toLowerCase();
    const historyLength = context.history?.length || 0;
    
    // Check for explicit stage transitions in the message
    const stageKeywords = {
      [WorkflowStage.PLANNING]: ['plan', 'strategy', 'approach', 'how would you plan', 'let\'s plan'],
      [WorkflowStage.EXECUTION]: ['execute', 'implement', 'build', 'create', 'develop', 'code'],
      [WorkflowStage.REFINEMENT]: ['refine', 'improve', 'enhance', 'optimize', 'revise'],
      [WorkflowStage.COMPLETION]: ['complete', 'finish', 'conclude', 'summarize', 'finalize']
    };
    
    // Check for explicit stage transitions
    for (const [stage, keywords] of Object.entries(stageKeywords)) {
      if (keywords.some(keyword => messageContent.includes(keyword))) {
        return stage as WorkflowStage;
      }
    }
    
    // Progressive stage transitions based on conversation depth and current stage
    const stageProgressionMap = {
      [WorkflowStage.INITIAL]: {
        nextStage: WorkflowStage.UNDERSTANDING,
        threshold: 0
      },
      [WorkflowStage.UNDERSTANDING]: {
        nextStage: WorkflowStage.PLANNING,
        threshold: 2
      },
      [WorkflowStage.PLANNING]: {
        nextStage: WorkflowStage.EXECUTION,
        threshold: 4
      },
      [WorkflowStage.EXECUTION]: {
        nextStage: WorkflowStage.REFINEMENT,
        threshold: 6
      },
      [WorkflowStage.REFINEMENT]: {
        nextStage: WorkflowStage.COMPLETION,
        threshold: 8
      }
    };
    
    // Check if we should progress to the next stage
    const progression = stageProgressionMap[currentStage];
    if (progression && historyLength >= progression.threshold) {
      return progression.nextStage;
    }
    
    // Stay in the current stage
    return currentStage;
  }
}

export default ConversationalWorkflowService;