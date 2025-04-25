import { AIMessage } from '../components/FloatingAIAssistant';

// Define types for Groq Swarm integration
interface SwarmAgent {
  name: string;
  instructions: string;
  model?: string;
  functions?: Function[];
  tool_choice?: string | object;
  parallel_tool_calls?: boolean;
}

interface SwarmResponse {
  messages: any[];
  agent: SwarmAgent | null;
  context_variables: Record<string, any>;
}

interface SwarmFunction {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
}

// Define the service class for Groq Swarm integration
class GroqSwarmService {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string = '/api/ai/swarm', apiKey: string = '') {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  /**
   * Send a message to the Groq Swarm API
   * @param message The message to send
   * @param contextData Additional context data
   * @returns A promise that resolves to an AI message
   */
  async sendMessage(message: string, contextData: Record<string, any> = {}): Promise<AIMessage> {
    try {
      // Create the request payload
      const payload = {
        messages: [{ role: 'user', content: message }],
        context_variables: contextData,
        agent: {
          name: 'CauldronOS Assistant',
          instructions: this.getInstructions(contextData),
          model: 'llama3-70b-8192', // Default to Llama 3 70B
          functions: this.getAvailableFunctions(contextData)
        },
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
      
      // Convert the Swarm response to an AIMessage
      return this.convertToAIMessage(data);
    } catch (error) {
      console.error('Error sending message to Groq Swarm:', error);
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
   * Send a message to the Groq Swarm API with streaming
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
      // Create the request payload
      const payload = {
        messages: [{ role: 'user', content: message }],
        context_variables: contextData,
        agent: {
          name: 'CauldronOS Assistant',
          instructions: this.getInstructions(contextData),
          model: 'llama3-70b-8192', // Default to Llama 3 70B
          functions: this.getAvailableFunctions(contextData)
        },
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
          
          // Handle content chunks
          if (data.content) {
            accumulatedContent += data.content;
            onChunk({ 
              type: 'content', 
              content: data.content,
              accumulatedContent
            });
          }
          
          // Handle tool calls
          if (data.tool_calls) {
            onChunk({ 
              type: 'tool_calls', 
              tool_calls: data.tool_calls 
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
      console.error('Error sending streaming message to Groq Swarm:', error);
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
   * Convert a Swarm response to an AIMessage
   * @param response The Swarm response
   * @returns An AIMessage
   */
  private convertToAIMessage(response: SwarmResponse): AIMessage {
    // Find the last assistant message
    const lastAssistantMessage = response.messages
      .filter(msg => msg.role === 'assistant')
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
   * Get the instructions for the AI based on context
   * @param contextData The context data
   * @returns The instructions string
   */
  private getInstructions(contextData: Record<string, any>): string {
    const currentPage = contextData.currentPage || 'unknown';
    
    let instructions = `You are CauldronOS Assistant, a helpful AI assistant integrated into the CauldronOS platform. 
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
      instructions += `\n\nYou're currently on the Dashboard page. You can help with:
- Explaining metrics and data visualizations
- Providing insights about workspace activity
- Suggesting ways to improve workspace usage`;
    } else if (currentPage === 'User Management') {
      instructions += `\n\nYou're currently on the User Management page. You can help with:
- Explaining user roles and permissions
- Suggesting user management strategies
- Providing insights about user activity`;
    } else if (currentPage === 'Modules') {
      instructions += `\n\nYou're currently on the Modules page. You can help with:
- Explaining module functionality
- Recommending modules based on user needs
- Providing guidance on module configuration`;
    } else if (currentPage === 'Workspace Settings') {
      instructions += `\n\nYou're currently on the Workspace Settings page. You can help with:
- Explaining settings and their impact
- Recommending optimal configurations
- Providing guidance on workspace customization`;
    }

    return instructions;
  }

  /**
   * Get the available functions based on context
   * @param contextData The context data
   * @returns An array of available functions
   */
  private getAvailableFunctions(contextData: Record<string, any>): SwarmFunction[] {
    const currentPage = contextData.currentPage || 'unknown';
    const functions: SwarmFunction[] = [];

    // Add common functions
    functions.push({
      name: 'search_documentation',
      description: 'Search the documentation for information',
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

    // Add page-specific functions
    if (currentPage === 'Dashboard') {
      functions.push({
        name: 'analyze_metrics',
        description: 'Analyze dashboard metrics and provide insights',
        parameters: {
          type: 'object',
          properties: {
            metric: {
              type: 'string',
              description: 'The metric to analyze'
            },
            timeframe: {
              type: 'string',
              description: 'The timeframe to analyze (e.g., "last 7 days", "last month")'
            }
          },
          required: ['metric']
        }
      });
    } else if (currentPage === 'User Management') {
      functions.push({
        name: 'analyze_user_activity',
        description: 'Analyze user activity and provide insights',
        parameters: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'The user ID to analyze'
            },
            timeframe: {
              type: 'string',
              description: 'The timeframe to analyze (e.g., "last 7 days", "last month")'
            }
          },
          required: ['userId']
        }
      });
    }

    return functions;
  }
}

export default GroqSwarmService;
