export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ModuleContext {
  name: string;
  description: string;
  features: string;
}

export interface AIAssistantConfig {
  apiUrl: string;
  apiKey: string;
  model: string;
}
