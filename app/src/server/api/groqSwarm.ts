import { spawn } from 'child_process';
import { Request, Response } from 'express';
import path from 'path';

// Path to the Groq Swarm directory
const SWARM_DIR = path.resolve(process.cwd(), 'swarm-groq');

/**
 * API handler for Groq Swarm requests
 * This function spawns a Python process to run the Groq Swarm library
 */
export const groqSwarmHandler = async (req: Request, res: Response) => {
  try {
    const { messages, context_variables, agent, stream } = req.body;

    // Validate required parameters
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required and must be an array' });
    }

    if (!agent || typeof agent !== 'object') {
      return res.status(400).json({ error: 'Agent configuration is required' });
    }

    // Create a temporary JSON file with the request data
    const requestData = JSON.stringify({
      messages,
      context_variables: context_variables || {},
      agent,
      stream: !!stream
    });

    // Set up streaming response if requested
    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
    }

    // Spawn a Python process to run the Groq Swarm
    const pythonProcess = spawn('python', [
      path.join(SWARM_DIR, 'examples', 'api_bridge.py')
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
        console.error(`Groq Swarm Error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Groq Swarm process exited with code ${code}`);
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
        console.error(`Groq Swarm Error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Groq Swarm process exited with code ${code}`);
          return res.status(500).json({ error: errorData || 'An error occurred while processing the request' });
        }

        try {
          const result = JSON.parse(responseData);
          res.json(result);
        } catch (error) {
          console.error('Error parsing Groq Swarm response:', error);
          res.status(500).json({ error: 'Failed to parse Groq Swarm response' });
        }
      });
    }
  } catch (error) {
    console.error('Error in Groq Swarm handler:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

export default groqSwarmHandler;
