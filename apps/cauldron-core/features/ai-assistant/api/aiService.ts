import { XRequest } from '@ant-design/x';
import { Message } from '../types';

// Convert our messages to the format expected by the API
const formatMessages = (messages: Message[], moduleContext: string | null) => {
  const formattedMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
  
  // Add system message with module context if available
  if (moduleContext) {
    formattedMessages.unshift({
      role: 'system',
      content: `You are a helpful assistant. The user is currently in the following module context: ${moduleContext}. Use this context to provide more relevant answers.`
    });
  } else {
    formattedMessages.unshift({
      role: 'system',
      content: 'You are a helpful assistant for the application.'
    });
  }
  
  return formattedMessages;
};

// Create the XRequest instance
const createAIRequest = (apiUrl: string, model: string, apiKey: string) => {
  return XRequest({
    baseURL: apiUrl,
    model: model,
    dangerouslyApiKey: apiKey
  });
};

export const sendMessage = async (
  messages: Message[],
  moduleContext: string | null,
  apiUrl: string,
  model: string,
  apiKey: string,
  onUpdate: (content: string) => void,
  onComplete: (content: string) => void,
  onError: (error: Error) => void
) => {
  const formattedMessages = formatMessages(messages, moduleContext);
  const aiRequest = createAIRequest(apiUrl, model, apiKey);
  
  try {
    await aiRequest(
      {
        messages: formattedMessages,
        stream: true,
      },
      {
        onUpdate: (data) => {
          if (data.content) {
            onUpdate(data.content);
          }
        },
        onSuccess: (data) => {
          const lastMessage = data[data.length - 1];
          if (lastMessage && lastMessage.content) {
            onComplete(lastMessage.content);
          }
        },
        onError,
      }
    );
  } catch (error) {
    onError(error as Error);
  }
};
