import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AISearchBarX } from './AISearchBarX';

const meta: Meta<typeof AISearchBarX> = {
  title: 'Molecules/AISearchBarX',
  component: AISearchBarX,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    recentSearches: { control: 'boolean' },
    maxRecentSearches: { control: 'number' },
    suggestionsSource: {
      control: { type: 'select' },
      options: ['none', 'static', 'user-behavior', 'ai'],
    },
    scope: {
      control: { type: 'select' },
      options: ['global', 'current', 'custom'],
    },
    allowVoiceInput: { control: 'boolean' },
    showSearchButton: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'middle', 'large'],
    },
    cyberpunk: { control: 'boolean' },
    loading: { control: 'boolean' },
    showAIChat: { control: 'boolean' },
    showIntelligentFilters: { control: 'boolean' },
    semanticSearch: { control: 'boolean' },
    showInsights: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof AISearchBarX>;

// Mock AI search function
const mockAISearch = async (query: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    `Results for "${query}"`,
    `Information about "${query}"`,
    `Data related to "${query}"`,
    `Analysis of "${query}"`,
  ];
};

// Mock AI chat function
const mockAIChat = async (query: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `I found some information about "${query}". This is an AI-generated response that would typically provide more detailed information than a simple search result. It can include analysis, suggestions, and follow-up questions.`;
};

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    recentSearches: true,
    maxRecentSearches: 5,
    suggestionsSource: 'ai',
    scope: 'global',
    allowVoiceInput: false,
    showSearchButton: true,
    size: 'middle',
    cyberpunk: false,
    loading: false,
    showAIChat: false,
    showIntelligentFilters: false,
    semanticSearch: false,
    showInsights: false,
    onSearch: (value) => console.log('Search:', value),
    onAISearch: mockAISearch,
    onAIChat: mockAIChat,
  },
};

export const WithAIChat: Story = {
  args: {
    ...Default.args,
    showAIChat: true,
    placeholder: 'Search or ask a question...',
  },
};

export const WithIntelligentFilters: Story = {
  args: {
    ...Default.args,
    showIntelligentFilters: true,
  },
};

export const WithSemanticSearch: Story = {
  args: {
    ...Default.args,
    semanticSearch: true,
  },
};

export const Cyberpunk: Story = {
  args: {
    ...Default.args,
    cyberpunk: true,
    placeholder: 'Search the matrix...',
  },
};

export const FullFeatured: Story = {
  args: {
    ...Default.args,
    showAIChat: true,
    showIntelligentFilters: true,
    semanticSearch: true,
    showInsights: true,
    allowVoiceInput: true,
    cyberpunk: true,
    placeholder: 'Search or ask anything...',
  },
};
