import { AIMessage } from '../components/FloatingAIAssistant';
import { AI_CONFIG, AI_MODELS, SYSTEM_PROMPTS } from '../config/aiConfig';
import { StreamingTextResponse, Message as VercelMessage } from 'ai';

/**
 * Service for interacting with the Vercel AI SDK
 */
class VercelAIService {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor(
    apiKey: string = AI_CONFIG.vercel.apiKey,
    baseUrl: string = AI_CONFIG.vercel.baseUrl,
    model: string = AI_MODELS.openai.gpt4_turbo
  ) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.model = model;
  }

  /**
   * Convert AIMessages to Vercel AI SDK format
   * @param messages Array of AIMessages
   * @returns Array of Vercel AI SDK messages
   */
  private convertToVercelMessages(messages: AIMessage[]): VercelMessage[] {
    return messages.map((message) => ({
      id: message.id,
      role: message.role as 'user' | 'assistant' | 'system',
      content: message.content,
    }));
  }

  /**
   * Convert Vercel AI SDK messages to AIMessages
   * @param messages Array of Vercel AI SDK messages
   * @returns Array of AIMessages
   */
  private convertToAIMessages(messages: VercelMessage[]): AIMessage[] {
    return messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      timestamp: new Date(),
      type: 'text',
    }));
  }

  /**
   * Send a message to the AI model
   * @param message The message to send
   * @param contextData Additional context data
   * @returns A promise that resolves to an AI message
   */
  async sendMessage(message: string, contextData: Record<string, any> = {}): Promise<AIMessage> {
    try {
      // Create the messages array
      const messages: VercelMessage[] = [
        {
          id: 'system-1',
          role: 'system',
          content: SYSTEM_PROMPTS.assistant,
        },
        {
          id: `user-${Date.now()}`,
          role: 'user',
          content: message,
        },
      ];

      // Make the API request
      const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message;

      return {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: assistantMessage.content,
        timestamp: new Date(),
        type: 'text',
      };
    } catch (error) {
      console.error('Error sending message to Vercel AI:', error);
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
   * Send a message to the AI model with streaming
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
      // Create the messages array
      const messages: VercelMessage[] = [
        {
          id: 'system-1',
          role: 'system',
          content: SYSTEM_PROMPTS.assistant,
        },
        {
          id: `user-${Date.now()}`,
          role: 'user',
          content: message,
        },
      ];

      // Make the API request
      const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: true,
        }),
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
        isStreaming: true,
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Convert the chunk to text
        const chunk = new TextDecoder().decode(value);

        try {
          // Parse the chunk as JSON
          const lines = chunk
            .split('\n')
            .filter((line) => line.trim() !== '' && line.trim() !== 'data: [DONE]');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6);
              const data = JSON.parse(jsonStr);

              if (data.choices && data.choices[0].delta.content) {
                const content = data.choices[0].delta.content;
                accumulatedContent += content;
                onChunk({
                  type: 'content',
                  content,
                  accumulatedContent,
                });
              }
            }
          }
        } catch (e) {
          console.error('Error parsing chunk:', e);
        }
      }

      // Update the final message with the accumulated content
      finalMessage.content = accumulatedContent;
      finalMessage.isStreaming = false;

      return finalMessage;
    } catch (error) {
      console.error('Error sending streaming message to Vercel AI:', error);
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
   * Create a streaming text response from a ReadableStream
   * @param stream The ReadableStream
   * @returns A StreamingTextResponse
   */
  createStreamingResponse(stream: ReadableStream): StreamingTextResponse {
    return new StreamingTextResponse(stream);
  }
}

export default VercelAIService;