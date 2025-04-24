# @cauldronos/agents

This package contains AI agent blueprints, interfaces, and utilities for the CauldronOS platform.

## Features

- **Agent Types**: Type definitions and interfaces for AI agents
- **Agent Providers**: React context providers for agent state management
- **Agent Hooks**: React hooks for interacting with AI agents
- **Agent Services**: Service implementations for different AI providers
- **Agent Components**: UI components for agent interactions

## Usage

```tsx
import { 
  AgentProvider, 
  useAgent, 
  ConversationalUI 
} from '@cauldronos/agents';

// Use the agent provider in your app
const MyApp = () => (
  <AgentProvider config={{
    id: 'assistant',
    name: 'CauldronOS Assistant',
    description: 'A helpful AI assistant',
    systemPrompt: 'You are a helpful assistant.',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000
  }}>
    <MyComponent />
  </AgentProvider>
);

// Use the agent hook in your component
const MyComponent = () => {
  const { 
    sendMessage, 
    messages, 
    isLoading 
  } = useAgent();
  
  const handleSend = (message) => {
    sendMessage(message);
  };
  
  return (
    <div>
      <ConversationalUI
        messages={messages}
        onSendMessage={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
};
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run in watch mode during development
pnpm dev
```