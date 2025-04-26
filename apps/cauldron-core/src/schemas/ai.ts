import { z } from 'zod';
import { AI_MODELS } from '../ai/config/aiConfig';

// Convert AI_MODELS to a flat array of model IDs
const flattenModels = (models: Record<string, Record<string, string>>) => {
  const result: string[] = [];
  Object.values(models).forEach((modelGroup) => {
    Object.values(modelGroup).forEach((modelId) => {
      result.push(modelId);
    });
  });
  return result;
};

// Create a list of available models
const availableModels = flattenModels(AI_MODELS);

// AI message schema
export const aiMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  timestamp: z.date(),
  type: z.enum(['text', 'markdown', 'code', 'error']).default('text'),
  isStreaming: z.boolean().optional(),
});

// AI conversation schema
export const aiConversationSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  messages: z.array(aiMessageSchema),
  metadata: z.record(z.any()).optional(),
});

// AI model selection schema
export const aiModelSchema = z.enum(availableModels);

// AI configuration schema
export const aiConfigSchema = z.object({
  model: aiModelSchema,
  temperature: z.number().min(0).max(1).default(0.7),
  maxTokens: z.number().int().positive().default(2048),
  topP: z.number().min(0).max(1).default(0.95),
  frequencyPenalty: z.number().min(0).max(2).default(0),
  presencePenalty: z.number().min(0).max(2).default(0),
  useStreaming: z.boolean().default(true),
  useSwarm: z.boolean().default(true),
  useLangGraph: z.boolean().default(false),
});

// AI message request schema
export const aiMessageRequestSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  conversationId: z.string().uuid().optional(),
  config: aiConfigSchema.partial().optional(),
  contextData: z.record(z.any()).optional(),
});

// AI message response schema
export const aiMessageResponseSchema = z.object({
  message: aiMessageSchema,
  conversation: aiConversationSchema.optional(),
});

// Types
export type AIMessage = z.infer<typeof aiMessageSchema>;
export type AIConversation = z.infer<typeof aiConversationSchema>;
export type AIModel = z.infer<typeof aiModelSchema>;
export type AIConfig = z.infer<typeof aiConfigSchema>;
export type AIMessageRequest = z.infer<typeof aiMessageRequestSchema>;
export type AIMessageResponse = z.infer<typeof aiMessageResponseSchema>;