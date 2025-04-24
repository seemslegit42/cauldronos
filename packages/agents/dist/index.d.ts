import React from 'react';

interface AIProviderProps {
    children: React.ReactNode;
}
/**
 * Provider component that makes the AI functionality available throughout the application.
 * It manages the state of the AI and provides methods to interact with it.
 * This implementation uses Zustand for state management.
 */
declare const AIProvider: React.FC<AIProviderProps>;

interface AIAssistantProviderProps {
    children: React.ReactNode;
}
/**
 * Provider component that makes the AI Assistant available throughout the application.
 * It manages the state of the assistant and provides methods to interact with it.
 */
declare const AIAssistantProvider: React.FC<AIAssistantProviderProps>;

/**
 * Agents package
 */

declare const CauldronAgents: {
    version: string;
    name: string;
};

export { AIAssistantProvider, AIProvider, CauldronAgents };
