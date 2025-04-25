import { AIMessage } from '../components/FloatingAIAssistant';
import { AI_CONFIG, AI_MODELS, SYSTEM_PROMPTS } from '../config/aiConfig';
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

/**
 * Service for interacting with LangChain
 */
class LangChainService {
  private model: ChatGroq;

  constructor(
    apiKey: string = AI_CONFIG.groq.apiKey,
    modelName: string = AI_MODELS.groq.llama3_70b
  ) {
    this.model = new ChatGroq({
      apiKey,
      modelName,
      temperature: 0.7,
      maxTokens: 2048,
    });
  }

  /**
   * Create a chat prompt template
   * @param systemPrompt The system prompt
   * @returns A chat prompt template
   */
  createChatPrompt(systemPrompt: string = SYSTEM_PROMPTS.assistant) {
    return ChatPromptTemplate.fromMessages([
      ['system', systemPrompt],
      new MessagesPlaceholder('history'),
      ['human', '{input}'],
    ]);
  }

  /**
   * Create a chain for processing messages
   * @param systemPrompt The system prompt
   * @returns A runnable sequence
   */
  createChain(systemPrompt: string = SYSTEM_PROMPTS.assistant) {
    const prompt = this.createChatPrompt(systemPrompt);
    
    return RunnableSequence.from([
      prompt,
      this.model,
      new StringOutputParser(),
    ]);
  }

  /**
   * Send a message to the LangChain model
   * @param message The message to send
   * @param history The conversation history
   * @param contextData Additional context data
   * @returns A promise that resolves to an AI message
   */
  async sendMessage(
    message: string,
    history: AIMessage[] = [],
    contextData: Record<string, any> = {}
  ): Promise<AIMessage> {
    try {
      // Create the system prompt based on context
      const systemPrompt = this.getSystemPrompt(contextData);
      
      // Create the chain
      const chain = this.createChain(systemPrompt);
      
      // Convert history to LangChain format
      const historyMessages = history.map((msg) => {
        return msg.role === 'user' ? ['human', msg.content] : ['ai', msg.content];
      });
      
      // Invoke the chain
      const response = await chain.invoke({
        history: historyMessages,
        input: message,
      });
      
      // Determine the message type based on content
      let messageType: 'text' | 'markdown' | 'code' | 'error' = 'text';
      if (response.includes('```')) {
        messageType = 'markdown';
      }
      
      return {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        type: messageType,
      };
    } catch (error) {
      console.error('Error sending message to LangChain:', error);
      return {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        type: 'error',
      };
    }
  }

  /**
   * Get the system prompt based on context
   * @param contextData The context data
   * @returns The system prompt
   */
  private getSystemPrompt(contextData: Record<string, any>): string {
    const currentPage = contextData.currentPage || 'unknown';
    
    let systemPrompt = SYSTEM_PROMPTS.assistant;

    // Add page-specific instructions
    if (currentPage === 'Dashboard') {
      systemPrompt += `\n\nYou're currently on the Dashboard page. You can help with:
- Explaining metrics and data visualizations
- Providing insights about workspace activity
- Suggesting ways to improve workspace usage`;
    } else if (currentPage === 'User Management') {
      systemPrompt += `\n\nYou're currently on the User Management page. You can help with:
- Explaining user roles and permissions
- Suggesting user management strategies
- Providing insights about user activity`;
    } else if (currentPage === 'Modules') {
      systemPrompt += `\n\nYou're currently on the Modules page. You can help with:
- Explaining module functionality
- Recommending modules based on user needs
- Providing guidance on module configuration`;
    } else if (currentPage === 'Workspace Settings') {
      systemPrompt += `\n\nYou're currently on the Workspace Settings page. You can help with:
- Explaining settings and their impact
- Recommending optimal configurations
- Providing guidance on workspace customization`;
    }

    return systemPrompt;
  }
}

export default LangChainService;