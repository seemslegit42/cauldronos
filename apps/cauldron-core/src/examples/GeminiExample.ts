import GeminiService from '../ai/services/GeminiService';
import { AI_MODELS } from '../ai/config/aiConfig';

/**
 * Example usage of the GeminiService
 */
async function geminiExample() {
  // Create a new GeminiService instance
  const geminiService = new GeminiService();

  try {
    // Example 1: Simple text generation
    console.log('Example 1: Simple text generation');
    const textResponse = await geminiService.generateContent(
      'Explain quantum computing in simple terms',
      AI_MODELS.gemini.gemini_flash
    );
    console.log(textResponse);
    console.log('\n---\n');

    // Example 2: Chat conversation
    console.log('Example 2: Chat conversation');
    const chatResponse = await geminiService.sendMessage(
      'What are the best practices for React performance optimization?'
    );
    console.log(chatResponse.content);
    console.log('\n---\n');

    // Example 3: Streaming response
    console.log('Example 3: Streaming response');
    await geminiService.sendMessageStream(
      'Write a short poem about technology',
      (chunk) => {
        process.stdout.write(chunk);
      }
    );
    console.log('\n\n---\n');

    // Example 4: Function calling
    console.log('Example 4: Function calling');
    
    // Define a function declaration for weather information
    const getWeatherFunctionDeclaration = {
      name: 'getWeather',
      description: 'Get the current weather in a given location',
      parameters: {
        type: 'OBJECT',
        properties: {
          location: {
            type: 'STRING',
            description: 'The city and state, e.g., San Francisco, CA',
          },
          unit: {
            type: 'STRING',
            description: 'The temperature unit to use. Infer this from the user query. Default is celsius.',
            enum: ['celsius', 'fahrenheit'],
          },
        },
        required: ['location'],
      },
    };

    // Mock function to handle the weather request
    const handleWeatherFunction = async (name: string, args: any) => {
      console.log(`Function called: ${name}`);
      console.log('Arguments:', args);
      
      // This would normally call a real weather API
      return {
        location: args.location,
        temperature: 72,
        unit: args.unit || 'celsius',
        condition: 'sunny',
        humidity: 45,
        windSpeed: 10,
      };
    };

    const functionCallResult = await geminiService.executeFunctionCall(
      'What\'s the weather like in San Francisco?',
      [getWeatherFunctionDeclaration],
      handleWeatherFunction
    );
    
    console.log(functionCallResult);
  } catch (error) {
    console.error('Error in Gemini example:', error);
  }
}

// Uncomment to run the example
// geminiExample();

export default geminiExample;
