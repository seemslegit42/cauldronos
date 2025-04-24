import { createGroq } from '@ai-sdk/groq';
import { generateText, streamText } from 'ai';
import { AIMessage } from '../components/FloatingAIAssistant';

// Create a Groq provider instance
const groq = createGroq({
  // The API key will be provided by environment variable GROQ_API_KEY
  // or can be overridden in the .env file
});

// Define the available Groq models
export const GROQ_MODELS = {
  LLAMA3_8B: 'llama3-8b-8192',
  LLAMA3_70B: 'llama3-70b-8192',
  GEMMA2_9B: 'gemma2-9b-it',
  MIXTRAL: 'mixtral-8x7b-32768',
  QWEN: 'qwen-qwq-32b',
  DEEPSEEK: 'deepseek-r1-distill-llama-70b'
};

// Define the service class for Groq integration
class GroqService {
  private defaultModel: string;

  constructor(defaultModel: string = GROQ_MODELS.LLAMA3_70B) {
    this.defaultModel = defaultModel;
  }

  /**
   * Send a message to the Groq API
   * @param message The message to send
   * @param contextData Additional context data
   * @returns A promise that resolves to an AI message
   */
  async sendMessage(message: string, contextData: Record<string, any> = {}): Promise<AIMessage> {
    try {
      // Create the system prompt based on context
      const systemPrompt = this.getSystemPrompt(contextData);
      
      // Generate text using the AI SDK
      const result = await generateText({
        model: groq(this.getModelForContext(contextData)),
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        maxTokens: 2048
      });
      
      // Determine the message type based on content
      let messageType: 'text' | 'markdown' | 'code' | 'error' = 'text';
      if (result.includes('```')) {
        messageType = 'markdown';
      }

      return {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: result,
        timestamp: new Date(),
        type: messageType
      };
    } catch (error) {
      console.error('Error sending message to Groq:', error);
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
   * Send a message to the Groq API with streaming
   * @param message The message to send
   * @param contextData Additional context data
   * @param onChunk Callback for each chunk of the response
   * @returns A promise that resolves to an AI message
   */
  async sendMessageStreaming(
    message: string, 
    contextData: Record<string, any> = {}, 
    onChunk: (chunk: { content: string }) => void
  ): Promise<AIMessage> {
    try {
      // Create the system prompt based on context
      const systemPrompt = this.getSystemPrompt(contextData);
      
      let accumulatedContent = '';
      
      // Stream text using the AI SDK
      const result = await streamText({
        model: groq(this.getModelForContext(contextData)),
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        maxTokens: 2048,
        onToken: (chunk) => {
          accumulatedContent += chunk.content;
          onChunk({ content: chunk.content });
        }
      });
      
      // Determine the message type based on content
      let messageType: 'text' | 'markdown' | 'code' | 'error' = 'text';
      if (result.includes('```')) {
        messageType = 'markdown';
      }

      return {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: result,
        timestamp: new Date(),
        type: messageType
      };
    } catch (error) {
      console.error('Error sending streaming message to Groq:', error);
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
   * Get the system prompt based on context
   * @param contextData The context data
   * @returns The system prompt
   */
  private getSystemPrompt(contextData: Record<string, any>): string {
    const currentPage = contextData.currentPage || 'unknown';
    
    let systemPrompt = `You are CauldronOS Assistant, a helpful AI assistant integrated into the CauldronOS platform. 
You provide concise, accurate, and helpful responses to user queries.

Current context:
- Page: ${currentPage}
- User role: ${contextData.userRole || 'User'}
- Workspace: ${contextData.workspaceName || 'Default'}

When responding:
1. Be concise and to the point
2. Provide specific, actionable information
3. If you're unsure about something, be honest about your limitations
4. Use markdown formatting for structured responses
5. When appropriate, suggest relevant actions the user can take`;

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

  /**
   * Get the appropriate model based on context
   * @param contextData The context data
   * @returns The model ID
   */
  private getModelForContext(contextData: Record<string, any>): string {
    // Use reasoning models for complex questions
    if (contextData.requiresReasoning) {
      return GROQ_MODELS.QWEN;
    }
    
    // Use the default model for most cases
    return this.defaultModel;
  }
}

export default GroqService;
