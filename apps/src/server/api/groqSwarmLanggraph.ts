import { spawn } from 'child_process';
import { Request, Response } from 'express';
import path from 'path';
import * as z from 'zod';
import { ensureArgsSchemaOrThrowHttpError } from '../validation';

// Path to the Groq Swarm directory
const SWARM_DIR = path.resolve(process.cwd(), 'swarm-groq');

// Define the schema for the request body
const LanggraphNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  agent: z.object({
    name: z.string(),
    instructions: z.string(),
    model: z.string().optional(),
    functions: z.array(z.any()).optional(),
    tool_choice: z.union([z.string(), z.record(z.any())]).optional(),
    parallel_tool_calls: z.boolean().optional()
  }),
  next: z.array(z.string()).optional(),
  condition: z.string().optional()
});

const LanggraphEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  condition: z.string().optional()
});

const LanggraphGraphSchema = z.object({
  nodes: z.array(LanggraphNodeSchema),
  edges: z.array(LanggraphEdgeSchema),
  entryNode: z.string(),
  exitNode: z.string()
});

const LanggraphWorkflowSchema = z.object({
  name: z.string(),
  description: z.string(),
  graph: LanggraphGraphSchema
});

const RequestBodySchema = z.object({
  workflow: LanggraphWorkflowSchema,
  input: z.string(),
  context_variables: z.record(z.any()).optional(),
  stream: z.boolean().optional()
});

/**
 * API handler for Groq Swarm Langgraph requests
 * This function spawns a Python process to run the Groq Swarm Langgraph library
 */
export const groqSwarmLanggraphHandler = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedBody = ensureArgsSchemaOrThrowHttpError(RequestBodySchema, req.body);
    const { workflow, input, context_variables, stream } = validatedBody;

    // Set up streaming response if requested
    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
    }

    // Create a temporary JSON file with the request data
    const requestData = JSON.stringify({
      workflow,
      input,
      context_variables: context_variables || {},
      stream: !!stream
    });

    // Spawn a Python process to run the Groq Swarm Langgraph
    const pythonProcess = spawn('python', [
      path.join(SWARM_DIR, 'examples', 'langgraph_bridge.py')
    ], {
      cwd: SWARM_DIR,
      env: {
        ...process.env,
        PYTHONPATH: SWARM_DIR
      }
    });

    // Send the request data to the Python process
    pythonProcess.stdin.write(requestData);
    pythonProcess.stdin.end();

    // Handle streaming response
    if (stream) {
      pythonProcess.stdout.on('data', (data) => {
        const chunk = data.toString();
        res.write(chunk);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Groq Swarm Langgraph Error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Groq Swarm Langgraph process exited with code ${code}`);
        }
        res.end();
      });
    } else {
      // Handle non-streaming response
      let responseData = '';
      let errorData = '';

      pythonProcess.stdout.on('data', (data) => {
        responseData += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorData += data.toString();
        console.error(`Groq Swarm Langgraph Error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Groq Swarm Langgraph process exited with code ${code}`);
          return res.status(500).json({ error: errorData || 'An error occurred while processing the request' });
        }

        try {
          const result = JSON.parse(responseData);
          res.json(result);
        } catch (error) {
          console.error('Error parsing Groq Swarm Langgraph response:', error);
          res.status(500).json({ error: 'Failed to parse Groq Swarm Langgraph response' });
        }
      });
    }
  } catch (error) {
    console.error('Error in Groq Swarm Langgraph handler:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

export default groqSwarmLanggraphHandler;