import { NextApiRequest, NextApiResponse } from 'next';
import groqSwarmLanggraphHandler from '../../../../server/api/groqSwarmLanggraph';

/**
 * API route for Groq Swarm Langgraph
 * @param req The request object
 * @param res The response object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await groqSwarmLanggraphHandler(req as any, res as any);
  } catch (error) {
    console.error('Error in Groq Swarm Langgraph API route:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

// Configure the API route to handle streaming responses
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
    responseLimit: false,
  },
};