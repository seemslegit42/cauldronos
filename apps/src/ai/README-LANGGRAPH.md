# Groq Swarm Langgraph Integration

This integration combines the power of Groq's high-performance AI models with Langgraph's workflow orchestration capabilities. It enables the creation of sophisticated AI workflows with multiple steps, branching logic, and state management.

## Features

- **Multi-step Workflows**: Break down complex tasks into smaller, more manageable steps
- **Specialized Agents**: Use different agents with specific instructions for each step
- **Branching Logic**: Create workflows with conditional branching based on intermediate results
- **Visualization**: Visualize the workflow and track progress through each step
- **Streaming Responses**: Get real-time updates as the workflow progresses

## Components

### Services

- **GroqSwarmLanggraphService**: A service for creating and executing Langgraph workflows
  - `src/ai/services/GroqSwarmLanggraphService.ts`

### Hooks

- **useGroqSwarmLanggraph**: A React hook for using the service in React components
  - `src/ai/hooks/useGroqSwarmLanggraph.ts`

### Components

- **GroqSwarmLanggraphChat**: A React component for chatting with Groq Swarm using Langgraph
  - `src/ai/components/GroqSwarmLanggraphChat.tsx`
- **LanggraphVisualizer**: A React component for visualizing Langgraph workflows
  - `src/ai/components/LanggraphVisualizer.tsx`

### API Routes

- **groqSwarmLanggraphHandler**: A server-side handler for processing Langgraph requests
  - `src/server/api/groqSwarmLanggraph.ts`
- **API Route**: A Next.js API route for the Groq Swarm Langgraph service
  - `src/pages/api/ai/swarm/langgraph.ts`

### Demo Pages

- **GroqSwarmLanggraphDemo**: A demo page for the Groq Swarm Langgraph integration
  - `src/ai/GroqSwarmLanggraphDemo.tsx`
- **Demo Page**: A Next.js page for the demo
  - `src/pages/groq-swarm-langgraph-demo.tsx`

### Python Backend

- **langgraph_bridge.py**: A Python script for bridging between Node.js and Langgraph
  - `swarm-groq/examples/langgraph_bridge.py`

## Usage

### Creating a Workflow

```typescript
import GroqSwarmLanggraphService from '../services/GroqSwarmLanggraphService';

// Create a service instance
const service = new GroqSwarmLanggraphService();

// Create a reasoning workflow
const workflow = service.createReasoningWorkflow('What is the meaning of life?');

// Create a research workflow
const workflow = service.createResearchWorkflow('The history of artificial intelligence');

// Create a custom workflow
const workflow = service.createBranchingWorkflow(
  'Custom Workflow',
  'A custom workflow with branching logic',
  nodes,
  edges,
  entryNode,
  exitNode
);
```

### Using the Hook

```typescript
import { useGroqSwarmLanggraph } from '../hooks/useGroqSwarmLanggraph';

// Use the hook
const {
  messages,
  isLoading,
  error,
  currentNodeId,
  nodeHistory,
  executeWorkflow,
  executeWorkflowStreaming,
  sendMessageToReasoningWorkflow,
  sendMessageToResearchWorkflow,
  resetConversation,
  service
} = useGroqSwarmLanggraph();

// Send a message to a reasoning workflow
const handleSendMessage = async (message: string) => {
  await sendMessageToReasoningWorkflow(message);
};
```

### Using the Component

```tsx
import GroqSwarmLanggraphChat from '../components/GroqSwarmLanggraphChat';

// Use the component
<GroqSwarmLanggraphChat
  title="Groq Swarm Langgraph Chat"
  description="Chat with Groq Swarm using Langgraph for complex reasoning"
  initialContext={{
    currentPage: 'Langgraph Demo',
    userRole: 'User',
    workspaceName: 'Demo Workspace'
  }}
  onMessageReceived={handleMessageReceived}
  onNodeTransition={handleNodeTransition}
  height={600}
  showVisualizer={true}
  customWorkflows={customWorkflows}
/>
```

## Integration with Existing Components

The Groq Swarm Langgraph integration is designed to work seamlessly with existing components:

- **Zustand**: Used for state management across components
- **TanStack React Query**: Used for API calls and caching
- **Zod**: Used for schema validation
- **Framer Motion**: Used for animations
- **Ant Design Pro Components**: Used for UI elements

## Requirements

- Node.js 14+
- Python 3.8+
- Groq API key
- Langgraph library

## License

This project is licensed under the MIT License - see the LICENSE file for details.