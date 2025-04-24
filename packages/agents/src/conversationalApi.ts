import { StreamingTextResponse, Message } from 'ai';
import ConversationalService from './services/ConversationalService';
import GroqSwarmService from './services/GroqSwarmService';
+
+// Initialize services
+const conversationalService = new ConversationalService();
+const swarmService = new GroqSwarmService();
+
+/**
+ * Process a chat request
+ * @param req The request object
+ * @returns The response
+ */
+export async function processChat(req: Request) {
+  try {
+    // Parse the request body
+    const { messages, useSwarm = false, contextData = {} } = await req.json();
+    
+    // Validate the request
+    if (!messages || !Array.isArray(messages)) {
+      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
+        status: 400,
+        headers: { 'Content-Type': 'application/json' }
+      });
+    }
+    
+    // Check if streaming is requested
+    const isStreaming = req.headers.get('accept') === 'text/event-stream';
+    
+    if (isStreaming) {
+      // Handle streaming response
+      if (useSwarm) {
+        // For Swarm, we need to handle streaming differently
+        // as it doesn't directly support StreamingTextResponse
+        const response = new Response(
+          new ReadableStream({
+            async start(controller) {
+              try {
+                // Process the message with streaming
+                await swarmService.sendMessageStreaming(
+                  messages[messages.length - 1].content,
+                  {
+                    ...contextData,
+                    previousMessages: messages.slice(0, -1)
+                  },
+                  (chunk) => {
+                    // Send the chunk to the client
+                    if (chunk.content) {
+                      controller.enqueue(
+                        `data: ${JSON.stringify({ text: chunk.content })}\n\n`
+                      );
+                    }
+                  }
+                );
+                
+                // Signal the end of the stream
+                controller.enqueue('data: [DONE]\n\n');
+                controller.close();
+              } catch (error) {
+                console.error('Error in streaming response:', error);
+                controller.enqueue(
+                  `data: ${JSON.stringify({ error: 'An error occurred during streaming' })}\n\n`
+                );
+                controller.close();
+              }
+            }
+          }),
+          {
+            headers: {
+              'Content-Type': 'text/event-stream',
+              'Cache-Control': 'no-cache',
+              'Connection': 'keep-alive'
+            }
+          }
+        );
+        
+        return response;
+      } else {
+        // Use Langchain with streaming
+        return conversationalService.processConversationStream(
+          messages,
+          contextData
+        );
+      }
+    } else {
+      // Handle non-streaming response
+      let response;
+      
+      if (useSwarm) {
+        // Use Groq Swarm
+        response = await swarmService.sendMessage(
+          messages[messages.length - 1].content,
+          {
+            ...contextData,
+            previousMessages: messages.slice(0, -1)
+          }
+        );
+      } else {
+        // Use Langchain
+        response = await conversationalService.processConversation(
+          messages,
+          contextData
+        );
+      }
+      
+      return new Response(JSON.stringify(response), {
+        headers: { 'Content-Type': 'application/json' }
+      });
+    }
+  } catch (error) {
+    console.error('Error processing chat request:', error);
+    return new Response(JSON.stringify({ error: 'An error occurred' }), {
+      status: 500,
+      headers: { 'Content-Type': 'application/json' }
+    });
+  }
+}
+
+/**
+ * Process a swarm request
+ * @param req The request object
+ * @returns The response
+ */
+export async function processSwarm(req: Request) {
+  try {
+    // Parse the request body
+    const { messages, agent, context_variables = {}, stream = false } = await req.json();
+    
+    // Validate the request
+    if (!messages || !Array.isArray(messages)) {
+      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
+        status: 400,
+        headers: { 'Content-Type': 'application/json' }
+      });
+    }
+    
+    // Get the last user message
+    const userMessage = messages[messages.length - 1].content;
+    
+    if (stream) {
+      // Handle streaming response
+      const response = new Response(
+        new ReadableStream({
+          async start(controller) {
+            try {
+              // Send start delimiter
+              controller.enqueue(
+                `data: ${JSON.stringify({ delim: 'start' })}\n\n`
+              );
+              
+              // Process the message with streaming
+              await swarmService.sendMessageStreaming(
+                userMessage,
+                {
+                  ...context_variables,
+                  agent,
+                  previousMessages: messages.slice(0, -1)
+                },
+                (chunk) => {
+                  // Send the chunk to the client
+                  if (chunk.content) {
+                    controller.enqueue(
+                      `data: ${JSON.stringify({ content: chunk.content })}\n\n`
+                    );
+                  } else if (chunk.tool_calls) {
+                    controller.enqueue(
+                      `data: ${JSON.stringify({ tool_calls: chunk.tool_calls })}\n\n`
+                    );
+                  }
+                }
+              );
+              
+              // Send end delimiter
+              controller.enqueue(
+                `data: ${JSON.stringify({ delim: 'end' })}\n\n`
+              );
+              
+              controller.close();
+            } catch (error) {
+              console.error('Error in streaming response:', error);
+              controller.enqueue(
+                `data: ${JSON.stringify({ error: 'An error occurred during streaming' })}\n\n`
+              );
+              controller.close();
+            }
+          }
+        }),
+        {
+          headers: {
+            'Content-Type': 'text/event-stream',
+            'Cache-Control': 'no-cache',
+            'Connection': 'keep-alive'
+          }
+        }
+      );
+      
+      return response;
+    } else {
+      // Handle non-streaming response
+      const response = await swarmService.sendMessage(
+        userMessage,
+        {
+          ...context_variables,
+          agent,
+          previousMessages: messages.slice(0, -1)
+        }
+      );
+      
+      return new Response(JSON.stringify(response), {
+        headers: { 'Content-Type': 'application/json' }
+      });
+    }
+  } catch (error) {
+    console.error('Error processing swarm request:', error);
+    return new Response(JSON.stringify({ error: 'An error occurred' }), {
+      status: 500,
+      headers: { 'Content-Type': 'application/json' }
+    });
+  }
+}