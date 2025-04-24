import { StreamingTextResponse, Message } from 'ai';
import ConversationalWorkflowService, { 
  WorkflowContext, 
  WorkflowStage 
} from '@cauldronos/agents/services/ConversationalWorkflowService';
import { z } from 'zod';

// Initialize the workflow service
const workflowService = new ConversationalWorkflowService();

// Define validation schemas using Zod
const MessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  name: z.string().optional()
});

const StreamRequestSchema = z.object({
  messages: z.array(MessageSchema),
  context: z.object({
    stage: z.nativeEnum(WorkflowStage).optional(),
    history: z.array(z.any()).optional(),
    metadata: z.record(z.any()).optional(),
    currentPage: z.string().optional(),
    userRole: z.string().optional(),
    workspaceName: z.string().optional(),
    requiresReasoning: z.boolean().optional()
  }).optional()
});

const NonStreamRequestSchema = z.object({
  message: z.string(),
  context: z.object({
    stage: z.nativeEnum(WorkflowStage).optional(),
    history: z.array(z.any()).optional(),
    metadata: z.record(z.any()).optional(),
    currentPage: z.string().optional(),
    userRole: z.string().optional(),
    workspaceName: z.string().optional(),
    requiresReasoning: z.boolean().optional()
  }).optional()
});

/**
 * API handler for conversational workflow
 * @param req The request object
 * @returns A streaming text response
 */
export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Validate the request body
    const validationResult = StreamRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request body', 
          details: validationResult.error.format() 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const { messages, context = {} } = validationResult.data;
    
    // Create the workflow context
    const workflowContext: WorkflowContext = {
      stage: context.stage || WorkflowStage.INITIAL,
      history: context.history || [],
      metadata: context.metadata || {},
      currentPage: context.currentPage,
      userRole: context.userRole,
      workspaceName: context.workspaceName,
      requiresReasoning: context.requiresReasoning
    };
    
    // Process the message through the workflow with streaming
    return await workflowService.processMessageStream(messages, workflowContext);
  } catch (error) {
    console.error('Error in conversational workflow API:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred processing your request',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * API handler for non-streaming conversational workflow
 * @param req The request object
 * @returns A JSON response
 */
export async function processWorkflow(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Validate the request body
    const validationResult = NonStreamRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request body', 
          details: validationResult.error.format() 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const { message, context = {} } = validationResult.data;
    
    // Create the workflow context
    const workflowContext: WorkflowContext = {
      stage: context.stage || WorkflowStage.INITIAL,
      history: context.history || [],
      metadata: context.metadata || {},
      currentPage: context.currentPage,
      userRole: context.userRole,
      workspaceName: context.workspaceName,
      requiresReasoning: context.requiresReasoning
    };
    
    // Process the message through the workflow
    const result = await workflowService.processMessage(message, workflowContext);
    
    // Return the result
    return new Response(
      JSON.stringify({
        ...result,
        success: true
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in conversational workflow API:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred processing your request',
        message: error instanceof Error ? error.message : 'Unknown error',
        success: false
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}