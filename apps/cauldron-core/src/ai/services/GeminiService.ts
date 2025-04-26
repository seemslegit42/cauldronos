import { GoogleGenAI } from '@google/genai';
import { AIMessage } from '../components/FloatingAIAssistant';
import { AI_CONFIG, AI_MODELS, SYSTEM_PROMPTS } from '../config/aiConfig';

/**
 * Service for interacting with Google's Gemini API
 */
class GeminiService {
  private client: GoogleGenAI;
  private defaultModel: string;

  /**
   * Create a new GeminiService instance
   * @param apiKey The API key to use for authentication
   * @param defaultModel The default model to use
   */
  constructor(
    apiKey: string = AI_CONFIG.gemini.apiKey,
    defaultModel: string = AI_CONFIG.gemini.defaultModel
  ) {
    this.client = new GoogleGenAI({ apiKey });
    this.defaultModel = defaultModel;
  }

  /**
   * Get a model instance
   * @param modelName The name of the model to use
   * @returns A model instance
   */
  getModel(modelName: string = this.defaultModel) {
    return this.client.models.getGenerativeModel({ model: modelName });
  }

  /**
   * Generate content using the Gemini API
   * @param prompt The prompt to generate content from
   * @param modelName The name of the model to use
   * @returns The generated content
   */
  async generateContent(prompt: string, modelName: string = this.defaultModel): Promise<string> {
    try {
      const model = this.getModel(modelName);
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error generating content with Gemini:', error);
      throw error;
    }
  }

  /**
   * Generate content with streaming
   * @param prompt The prompt to generate content from
   * @param modelName The name of the model to use
   * @returns An async generator that yields content chunks
   */
  async *generateContentStream(prompt: string, modelName: string = this.defaultModel) {
    try {
      const model = this.getModel(modelName);
      const result = await model.generateContentStream(prompt);
      
      for await (const chunk of result.stream) {
        yield chunk.text();
      }
    } catch (error) {
      console.error('Error streaming content with Gemini:', error);
      throw error;
    }
  }

  /**
   * Send a message to the Gemini model
   * @param message The message to send
   * @param history Previous messages in the conversation
   * @param systemPrompt The system prompt to use
   * @returns A promise that resolves to an AI message
   */
  async sendMessage(
    message: string,
    history: AIMessage[] = [],
    systemPrompt: string = SYSTEM_PROMPTS.assistant
  ): Promise<AIMessage> {
    try {
      const model = this.getModel();
      const chat = model.startChat({
        history: this.formatChatHistory(history),
        systemInstruction: systemPrompt,
      });

      const result = await chat.sendMessage(message);
      const responseText = result.response.text();

      return {
        id: `gemini_${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      throw error;
    }
  }

  /**
   * Send a message to the Gemini model with streaming
   * @param message The message to send
   * @param onChunk Callback for each chunk of the response
   * @param history Previous messages in the conversation
   * @param systemPrompt The system prompt to use
   * @returns A promise that resolves to an AI message
   */
  async sendMessageStream(
    message: string,
    onChunk: (chunk: string) => void,
    history: AIMessage[] = [],
    systemPrompt: string = SYSTEM_PROMPTS.assistant
  ): Promise<AIMessage> {
    try {
      const model = this.getModel();
      const chat = model.startChat({
        history: this.formatChatHistory(history),
        systemInstruction: systemPrompt,
      });

      const result = await chat.sendMessageStream(message);
      let fullResponse = '';

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        onChunk(chunkText);
      }

      return {
        id: `gemini_${Date.now()}`,
        role: 'assistant',
        content: fullResponse,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Error streaming message from Gemini:', error);
      throw error;
    }
  }

  /**
   * Generate an image using Gemini's Imagen
   * @param prompt The prompt to generate an image from
   * @param options Optional configuration for image generation
   * @returns A promise that resolves to the generated image data
   */
  async generateImage(prompt: string, options: {
    model?: string;
    size?: 'landscape' | 'portrait' | 'square';
    quality?: 'preview' | 'standard' | 'hd';
  } = {}) {
    try {
      const model = this.client.models.getGenerativeModel({ 
        model: options.model || 'imagen-3'
      });

      const result = await model.generateImage({
        prompt,
        size: options.size || 'square',
        quality: options.quality || 'standard'
      });

      return result.image;
    } catch (error) {
      console.error('Error generating image with Imagen:', error);
      throw error;
    }
  }

  /**
   * Format chat history for the Gemini API
   * @param history The chat history to format
   * @returns Formatted chat history for the Gemini API
   */
  private formatChatHistory(history: AIMessage[]) {
    return history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));
  }

  /**
   * Create a function calling chat
   * @param functionDeclarations Array of function declarations
   * @param systemPrompt The system prompt to use
   * @returns A chat instance configured for function calling
   */
  createFunctionCallingChat(
    functionDeclarations: any[],
    systemPrompt: string = SYSTEM_PROMPTS.assistant
  ) {
    const model = this.getModel();
    return model.startChat({
      systemInstruction: systemPrompt,
      tools: [{ functionDeclarations }],
    });
  }

  /**
   * Execute a function call with Gemini
   * @param prompt The user prompt
   * @param functionDeclarations Array of function declarations
   * @param functionCallHandler Function to handle the function call
   * @returns The final response after function calling
   */
  async executeFunctionCall(
    prompt: string,
    functionDeclarations: any[],
    functionCallHandler: (name: string, args: any) => Promise<any>
  ): Promise<string> {
    try {
      const model = this.getModel();
      const chat = model.startChat({
        tools: [{ functionDeclarations }],
      });

      // Send the initial message
      const result = await chat.sendMessage(prompt);
      
      // Check if there's a function call
      if (result.functionCalls && result.functionCalls.length > 0) {
        const functionCall = result.functionCalls[0];
        
        // Execute the function
        const functionResponse = await functionCallHandler(
          functionCall.name,
          functionCall.args
        );
        
        // Send the function response back to the model
        const finalResponse = await chat.sendMessage({
          functionResponse: {
            name: functionCall.name,
            response: { content: JSON.stringify(functionResponse) },
          },
        });
        
        return finalResponse.response.text();
      }
      
      return result.response.text();
    } catch (error) {
      console.error('Error executing function call with Gemini:', error);
      throw error;
    }
  }
}

export default GeminiService;
