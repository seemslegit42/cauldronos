import { useState } from 'react';
import { GeminiService } from '../ai/services/GeminiService';

export const useImageGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const geminiService = new GeminiService();

  const generateImage = async (prompt: string, options = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const image = await geminiService.generateImage(prompt, options);
      return image;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateImage,
    isLoading,
    error
  };
};