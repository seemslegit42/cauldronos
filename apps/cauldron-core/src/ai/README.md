# Conversational Workflow System

This system implements a sophisticated conversational workflow using Langchain, Vercel AI SDK, and Groq as the inference backend, integrated with Ant Design X components and Groq Swarm.

## Architecture

The system is built with the following components:

1. **ConversationalWorkflowService**: Core service that manages the workflow stages and integrates with Langchain and Groq.
2. **ConversationalWorkflow Component**: Ant Design X-based UI component for the conversational interface.
3. **AI Store**: Zustand-based state management for AI conversations and workflow state.
4. **API Route Handler**: Backend API for processing conversational workflows with Zod validation.
5. **Demo Page**: Showcase of the conversational workflow system in action.
6. **React Hook**: Custom hook for using the conversational workflow in React components.

## Workflow Stages

The system implements a structured workflow with the following stages:

1. **Initial**: Starting the conversation
2. **Understanding**: Comprehending the user's needs
3. **Planning**: Developing a solution approach
4. **Execution**: Implementing the solution
5. **Refinement**: Improving the solution
6. **Completion**: Finalizing the solution

## Key Features

- **Stage-Based Workflow**: Conversations progress through different stages for structured problem-solving
- **Streaming Responses**: Real-time streaming of AI responses with Ant Design X's XStream component
- **Adaptive Reasoning**: Uses Groq Swarm for complex reasoning tasks in planning and execution stages
- **Flexible Processing**: Support for both API-based and local processing of messages
- **Rich UI Components**: Leverages Ant Design X's specialized AI components
- **Progress Visualization**: Visual indicators of workflow progress
- **Robust Error Handling**: Comprehensive error handling with Zod validation
- **State Management**: Zustand-based state management for global access to conversation state

## Technologies Used

- **Langchain**: For creating sophisticated AI chains and workflows
- **Vercel AI SDK**: For streamlined AI integration and streaming responses
- **Groq**: As the inference backend for fast and efficient AI processing
- **Ant Design X**: For building the conversational UI components with AI-specific features
- **Groq Swarm**: For orchestrating multi-step AI tasks and complex reasoning
- **Zustand**: For state management across components
- **Framer Motion**: For smooth animations and transitions
- **Zod**: For schema validation and type safety

## Usage

### Using the ConversationalWorkflow Component

```tsx
import { ConversationalWorkflow } from '../ai/components/ConversationalWorkflow';
import { WorkflowContext, WorkflowStage } from '../ai/services/ConversationalWorkflowService';
import { AIMessage } from '../ai/components/FloatingAIAssistant';

const MyComponent = () => {
  // Handle message received
  const handleMessageReceived = (message: AIMessage) => {
    console.log('Received message:', message);
  };
  
  // Handle stage change
  const handleStageChange = (stage: WorkflowStage) => {
    console.log('Workflow stage changed to:', stage);
  };
  
  // Initial context for the workflow
  const initialContext: Partial<WorkflowContext> = {
    currentPage: 'My Page',
    userRole: 'User',
    workspaceName: 'My Workspace',
    requiresReasoning: true
  };
  
  return (
    <ConversationalWorkflow
      title="My AI Assistant"
      description="Have a conversation with the AI assistant."
      initialContext={initialContext}
      onMessageReceived={handleMessageReceived}
      onStageChange={handleStageChange}
      showStageIndicator={true}
      showStageProgress={true}
      height={600}
      useApi={true}
    />
  );
};
```

### Using the useConversationalWorkflow Hook

```tsx
import { useConversationalWorkflow } from '../ai/hooks/useConversationalWorkflow';
import { XChat, XChatInput, XChatList, XChatItem, XBubble, XChatMessage } from '@ant-design/x';
import { Button } from 'antd';

const MyCustomChatComponent = () => {
  const { 
    messages, 
    isLoading, 
    error, 
    workflowContext, 
    sendMessage, 
    resetConversation,
    getCurrentStage,
    getStageProgress
  } = useConversationalWorkflow({
    initialContext: {
      currentPage: 'My Page',
      userRole: 'User',
      workspaceName: 'My Workspace'
    },
    onMessageReceived: (message) => {
      console.log('Received message:', message);
    },
    useLocalProcessing: false,
    apiEndpoint: '/api/conversationalWorkflow'
  });
  
  const [inputValue, setInputValue] = useState('');
  
  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  return (
    <div>
      <div>Current Stage: {getCurrentStage()}</div>
      <div>Progress: {getStageProgress()}%</div>
      
      <XChat>
        <XChatList>
          {messages.map(message => (
            <XChatItem
              key={message.id}
              type={message.role === 'user' ? 'self' : 'others'}
            >
              <XBubble>
                <XChatMessage
                  type={message.type === 'markdown' ? 'markdown' : 'text'}
                  content={message.content}
                />
              </XBubble>
            </XChatItem>
          ))}
        </XChatList>
        
        <XChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={handleSend}
          disabled={isLoading}
        />
      </XChat>
      
      <Button onClick={resetConversation}>Reset Conversation</Button>
      
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};
```

## API Reference

### ConversationalWorkflow Component Props

| Prop | Type | Description |
|------|------|-------------|
| title | string | The title of the conversation |
| description | string | A description of the conversation |
| initialContext | Partial<WorkflowContext> | Initial context for the workflow |
| onMessageSent | (message: string) => void | Callback when a message is sent |
| onMessageReceived | (message: AIMessage) => void | Callback when a message is received |
| onStageChange | (stage: WorkflowStage) => void | Callback when the workflow stage changes |
| className | string | CSS class name |
| style | React.CSSProperties | Inline styles |
| showStageIndicator | boolean | Whether to show the stage indicator |
| showStageProgress | boolean | Whether to show the stage progress |
| height | number \| string | Height of the chat container |
| useApi | boolean | Whether to use the API for processing messages |

### useConversationalWorkflow Hook Options

| Option | Type | Description |
|--------|------|-------------|
| initialContext | Partial<WorkflowContext> | Initial context for the workflow |
| onMessageReceived | (message: AIMessage) => void | Callback when a message is received |
| onError | (error: Error) => void | Callback when an error occurs |
| onStageChange | (stage: WorkflowStage) => void | Callback when the workflow stage changes |
| useLocalProcessing | boolean | Whether to process messages locally instead of via API |
| apiEndpoint | string | The API endpoint for processing messages |

## Demo

To see the conversational workflow system in action, visit the demo page at `/conversational-workflow-demo`.