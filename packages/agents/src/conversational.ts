--- src/ai/services/ConversationalService.ts
+++ src/ai/services/ConversationalService.ts
@@ -0,0 +1,301 @@
+import { AIMessage } from '../components/FloatingAIAssistant';
+import { StreamingTextResponse, Message as AIMessage_Vercel } from 'ai';
+import { ChatGroq } from '@langchain/groq';
+import { 
+  ChatPromptTemplate, 
+  MessagesPlaceholder, 
+  HumanMessagePromptTemplate, 
+  SystemMessagePromptTemplate 
+} from '@langchain/core/prompts';
+import { StringOutputParser } from '@langchain/core/output_parsers';
+import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';
+import { GROQ_MODELS } from './GroqService';
+import GroqSwarmService from './GroqSwarmService';
+
+// Define the service class for conversational workflows
+class ConversationalService {
+  private model: ChatGroq;
+  private swarmService: GroqSwarmService;
+  private apiKey: string;
+
+  constructor(apiKey: string = process.env.GROQ_API_KEY || '') {
+    this.apiKey = apiKey;
+    
+    // Initialize the Groq model
+    this.model = new ChatGroq({
+      apiKey: this.apiKey,
+      modelName: GROQ_MODELS.LLAMA3_70B,
+      temperature: 0.7,
+    });
+    
+    // Initialize the Groq Swarm service
+    this.swarmService = new GroqSwarmService();
+  }
+
+  /**
+   * Create a conversational chain using Langchain
+   * @param systemPrompt The system prompt
+   * @returns A runnable sequence
+   */
+  private createConversationalChain(systemPrompt: string) {
+    // Create a chat prompt template
+    const chatPrompt = ChatPromptTemplate.fromMessages([
+      SystemMessagePromptTemplate.fromTemplate(systemPrompt),
+      new MessagesPlaceholder("history"),
+      HumanMessagePromptTemplate.fromTemplate("{input}"),
+    ]);
+
+    // Create a runnable sequence
+    const chain = RunnableSequence.from([
+      {
+        input: (initialInput) => initialInput.input,
+        history: (initialInput) => initialInput.history,
+      },
+      {
+        input: RunnablePassthrough(),
+        history: RunnablePassthrough(),
+      },
+      chatPrompt,
+      this.model,
+      new StringOutputParser(),
+    ]);
+
+    return chain;
+  }
+
+  /**
+   * Convert Vercel AI SDK messages to Langchain messages
+   * @param messages The Vercel AI SDK messages
+   * @returns The Langchain messages
+   */
+  private convertVercelToLangchainMessages(messages: AIMessage_Vercel[]) {
+    return messages.map((message) => {
+      if (message.role === 'user') {
+        return {
+          type: 'human',
+          content: message.content,
+        };
+      } else if (message.role === 'assistant') {
+        return {
+          type: 'ai',
+          content: message.content,
+        };
+      } else if (message.role === 'system') {
+        return {
+          type: 'system',
+          content: message.content,
+        };
+      }
+      return {
+        type: 'human',
+        content: message.content,
+      };
+    });
+  }
+
+  /**
+   * Process a conversation using Langchain
+   * @param messages The conversation messages
+   * @param contextData Additional context data
+   * @returns A promise that resolves to an AI message
+   */
+  async processConversation(
+    messages: AIMessage_Vercel[],
+    contextData: Record<string, any> = {}
+  ): Promise<AIMessage> {
+    try {
+      // Get the system prompt based on context
+      const systemPrompt = this.getSystemPrompt(contextData);
+      
+      // Get the user's input (last message)
+      const userInput = messages[messages.length - 1].content;
+      
+      // Convert previous messages to Langchain format
+      const history = this.convertVercelToLangchainMessages(messages.slice(0, -1));
+      
+      // Create the conversational chain
+      const chain = this.createConversationalChain(systemPrompt);
+      
+      // Run the chain
+      const result = await chain.invoke({
+        input: userInput,
+        history,
+      });
+      
+      // Determine the message type based on content
+      let messageType: 'text' | 'markdown' | 'code' | 'error' = 'text';
+      if (result.includes('```')) {
+        messageType = 'markdown';
+      }
+
+      return {
+        id: `assistant-${Date.now()}`,
+        role: 'assistant',
+        content: result,
+        timestamp: new Date(),
+        type: messageType
+      };
+    } catch (error) {
+      console.error('Error processing conversation:', error);
+      return {
+        id: `error-${Date.now()}`,
+        role: 'assistant',
+        content: 'Sorry, I encountered an error processing your request. Please try again.',
+        timestamp: new Date(),
+        type: 'error'
+      };
+    }
+  }
+
+  /**
+   * Process a conversation with streaming using Langchain
+   * @param messages The conversation messages
+   * @param contextData Additional context data
+   * @returns A streaming text response
+   */
+  async processConversationStream(
+    messages: AIMessage_Vercel[],
+    contextData: Record<string, any> = {}
+  ): Promise<StreamingTextResponse> {
+    try {
+      // Get the system prompt based on context
+      const systemPrompt = this.getSystemPrompt(contextData);
+      
+      // Get the user's input (last message)
+      const userInput = messages[messages.length - 1].content;
+      
+      // Convert previous messages to Langchain format
+      const history = this.convertVercelToLangchainMessages(messages.slice(0, -1));
+      
+      // Create the conversational chain
+      const chain = this.createConversationalChain(systemPrompt);
+      
+      // Run the chain with streaming
+      const stream = await chain.stream({
+        input: userInput,
+        history,
+      });
+      
+      // Return a streaming response
+      return new StreamingTextResponse(stream);
+    } catch (error) {
+      console.error('Error processing conversation stream:', error);
+      throw error;
+    }
+  }
+
+  /**
+   * Process a conversation using Groq Swarm
+   * @param messages The conversation messages
+   * @param contextData Additional context data
+   * @returns A promise that resolves to an AI message
+   */
+  async processConversationWithSwarm(
+    messages: AIMessage_Vercel[],
+    contextData: Record<string, any> = {}
+  ): Promise<AIMessage> {
+    try {
+      // Get the last user message
+      const userMessage = messages[messages.length - 1].content;
+      
+      // Send the message to Groq Swarm
+      return await this.swarmService.sendMessage(userMessage, {
+        ...contextData,
+        previousMessages: messages.slice(0, -1)
+      });
+    } catch (error) {
+      console.error('Error processing conversation with Swarm:', error);
+      return {
+        id: `error-${Date.now()}`,
+        role: 'assistant',
+        content: 'Sorry, I encountered an error processing your request with Groq Swarm. Please try again.',
+        timestamp: new Date(),
+        type: 'error'
+      };
+    }
+  }
+
+  /**
+   * Process a conversation with streaming using Groq Swarm
+   * @param messages The conversation messages
+   * @param contextData Additional context data
+   * @param onChunk Callback for each chunk of the response
+   * @returns A promise that resolves to an AI message
+   */
+  async processConversationStreamWithSwarm(
+    messages: AIMessage_Vercel[],
+    contextData: Record<string, any> = {},
+    onChunk: (chunk: { content: string }) => void
+  ): Promise<AIMessage> {
+    try {
+      // Get the last user message
+      const userMessage = messages[messages.length - 1].content;
+      
+      // Send the message to Groq Swarm with streaming
+      return await this.swarmService.sendMessageStreaming(userMessage, {
+        ...contextData,
+        previousMessages: messages.slice(0, -1)
+      }, onChunk);
+    } catch (error) {
+      console.error('Error processing conversation stream with Swarm:', error);
+      return {
+        id: `error-${Date.now()}`,
+        role: 'assistant',
+        content: 'Sorry, I encountered an error processing your streaming request with Groq Swarm. Please try again.',
+        timestamp: new Date(),
+        type: 'error'
+      };
+    }
+  }
+
+  /**
+   * Get the system prompt based on context
+   * @param contextData The context data
+   * @returns The system prompt
+   */
+  private getSystemPrompt(contextData: Record<string, any>): string {
+    const currentPage = contextData.currentPage || 'unknown';
+    
+    let systemPrompt = `You are CauldronOS Assistant, a helpful AI assistant integrated into the CauldronOS platform. 
+You provide concise, accurate, and helpful responses to user queries.
+
+Current context:
+- Page: ${currentPage}
+- User role: ${contextData.userRole || 'User'}
+- Workspace: ${contextData.workspaceName || 'Default'}
+
+When responding:
+1. Be concise and to the point
+2. Provide specific, actionable information
+3. If you're unsure about something, be honest about your limitations
+4. Use markdown formatting for structured responses
+5. When appropriate, suggest relevant actions the user can take`;
+
+    // Add page-specific instructions
+    if (currentPage === 'Dashboard') {
+      systemPrompt += `\n\nYou're currently on the Dashboard page. You can help with:
+- Explaining metrics and data visualizations
+- Providing insights about workspace activity
+- Suggesting ways to improve workspace usage`;
+    } else if (currentPage === 'User Management') {
+      systemPrompt += `\n\nYou're currently on the User Management page. You can help with:
+- Explaining user roles and permissions
+- Suggesting user management strategies
+- Providing insights about user activity`;
+    } else if (currentPage === 'Modules') {
+      systemPrompt += `\n\nYou're currently on the Modules page. You can help with:
+- Explaining module functionality
+- Recommending modules based on user needs
+- Providing guidance on module configuration`;
+    } else if (currentPage === 'Workspace Settings') {
+      systemPrompt += `\n\nYou're currently on the Workspace Settings page. You can help with:
+- Explaining settings and their impact
+- Recommending optimal configurations
+- Providing guidance on workspace customization`;
+    }
+
+    return systemPrompt;
+  }
+}
+
+export default ConversationalService;