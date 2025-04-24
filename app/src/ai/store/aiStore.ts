import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AIMessage } from '../components/FloatingAIAssistant';
import { WorkflowStage } from '../services/ConversationalWorkflowService';
import { AI_MODELS } from '../config/aiConfig';
import { AI_MODELS } from '../config/aiConfig';

// Define the conversation interface
export interface Conversation {
  id: string;
  title: string;
  messages: AIMessage[];
  metadata?: Record<string, any>;
}

// Define the AI store state
interface AIState {
  // Conversations
  conversations: Conversation[];
  activeConversationId: string | null;
  
  // UI state
  isAILoading: boolean;
  isVisible: boolean;
  currentNode: string | null;
  currentWorkflowStage: WorkflowStage;
  
  // Configuration
  selectedModel: string;
  useStreaming: boolean;
  useSwarm: boolean;
  useLangGraph: boolean;
  
  // Context data
  contextData: Record<string, any>;
}

// Define the AI store actions
interface AIActions {
  // Conversation actions
  setActiveConversation: (conversation: Conversation) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  deleteConversation: (id: string) => void;
  addMessageToConversation: (conversationId: string, message: AIMessage) => void;
  clearConversations: () => void;
  
  // UI actions
  setIsAILoading: (isLoading: boolean) => void;
  toggleVisibility: () => void;
  setCurrentNode: (node: string | null) => void;
  setCurrentWorkflowStage: (stage: WorkflowStage) => void;
  
  // Configuration actions
  setSelectedModel: (model: string) => void;
  toggleStreaming: () => void;
  toggleSwarm: () => void;
  toggleLangGraph: () => void;
  
  // Context actions
  updateContextData: (data: Record<string, any>) => void;
  clearContextData: () => void;
}

// Create the AI store
export const useAIStore = create<AIState & AIActions>()(
  immer(
    persist(
      (set) => ({
        // Initial state
        conversations: [],
        activeConversationId: null,
        isAILoading: false,
        isVisible: false,
        currentNode: null,
        currentWorkflowStage: WorkflowStage.INITIAL,
        selectedModel: AI_MODELS?.groq?.llama3_70b || 'llama3-70b-8192',
        useStreaming: true,
        useSwarm: true,
        useLangGraph: false,
        contextData: {},
  
  // Set the active conversation
  setActiveConversation: (conversation) => {
    set((state) => {
      // Check if the conversation already exists
      const existingConversation = state.conversations.find(
        (c) => c.id === conversation.id
      );
      
      if (existingConversation) {
        // If it exists, just set it as active
        return {
          activeConversationId: conversation.id
        };
      } else {
        // If it doesn't exist, add it and set it as active
        return {
          conversations: [...state.conversations, conversation],
          activeConversationId: conversation.id
        };
      }
    });
  },
  
  // Add a new conversation
  addConversation: (conversation) => {
    set((state) => ({
      conversations: [...state.conversations, conversation]
    }));
  },
  
  // Update an existing conversation
  updateConversation: (id, updates) => {
    set((state) => ({
      conversations: state.conversations.map((conversation) =>
        conversation.id === id
          ? { ...conversation, ...updates }
          : conversation
      )
    }));
  },
  
  // Delete a conversation
  deleteConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.filter(
        (conversation) => conversation.id !== id
      ),
      activeConversationId:
        state.activeConversationId === id
          ? state.conversations.length > 1
            ? state.conversations.find((c) => c.id !== id)?.id || null
            : null
          : state.activeConversationId
    }));
  },
  
  // Add a message to a conversation
  addMessageToConversation: (conversationId, message) => {
    set((state) => ({
      conversations: state.conversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [...conversation.messages, message]
            }
          : conversation
      )
    }));
  },
  
  // Set the AI loading state
  setIsAILoading: (isLoading) => {
    set({ isAILoading });
  },
  
  // Set the current workflow stage
  setCurrentWorkflowStage: (stage) => {
    set({ currentWorkflowStage: stage });
  },
  
  // Clear all conversations
  clearConversations: () => {
    set({
      conversations: [],
      activeConversationId: null
    });
  },
  
  // UI actions
  toggleVisibility: () => {
    set((state) => ({
      isVisible: !state.isVisible
    }));
  },
  
  setCurrentNode: (node) => {
    set({ currentNode: node });
  },
  
  // Configuration actions
  setSelectedModel: (model) => {
    set({ selectedModel: model });
  },
  
  toggleStreaming: () => {
    set((state) => ({
      useStreaming: !state.useStreaming
    }));
  },
  
  toggleSwarm: () => {
    set((state) => ({
      useSwarm: !state.useSwarm
    }));
  },
  
  toggleLangGraph: () => {
    set((state) => ({
      useLangGraph: !state.useLangGraph
    }));
  },
  
  // Context actions
  updateContextData: (data) => {
    set((state) => ({
      contextData: { ...state.contextData, ...data }
    }));
  },
  
  clearContextData: () => {
    set({ contextData: {} });
  }
}),
{
  name: 'ai-store',
  partialize: (state) => ({
    selectedModel: state.selectedModel,
    useStreaming: state.useStreaming,
    useSwarm: state.useSwarm,
    useLangGraph: state.useLangGraph,
  }),
}
)
)
);

// Helper function to get the active conversation
export const getActiveConversation = (): Conversation | undefined => {
  const { conversations, activeConversationId } = useAIStore.getState();
  return conversations.find((c) => c.id === activeConversationId);
};

// Helper function to get a conversation by ID
export const getConversationById = (id: string): Conversation | undefined => {
  const { conversations } = useAIStore.getState();
  return conversations.find((c) => c.id === id);
};