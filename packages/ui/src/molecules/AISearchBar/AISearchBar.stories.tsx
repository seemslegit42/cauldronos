import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AISearchBar } from './AISearchBar';

const meta: Meta<typeof AISearchBar> = {
  title: 'Molecules/AISearchBar',
  component: AISearchBar,
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
  },
};

export default meta;
type Story = StoryObj<typeof AISearchBar>;

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
    onSearch: (value) => console.log('Search:', value),
    onAISearch: mockAISearch,
  },
};

export const WithStaticSuggestions: Story = {
  args: {
    ...Default.args,
    suggestionsSource: 'static',
    suggestions: ['Dashboard', 'Users', 'Settings', 'Reports', 'Analytics'],
  },
};

export const WithVoiceInput: Story = {
  args: {
    ...Default.args,
    allowVoiceInput: true,
  },
};

export const CyberpunkStyle: Story = {
  args: {
    ...Default.args,
    cyberpunk: true,
  },
};

export const CustomScope: Story = {
  args: {
    ...Default.args,
    scope: 'custom',
    scopeOptions: [
      { label: 'All', value: 'all' },
      { label: 'Documents', value: 'documents' },
      { label: 'Images', value: 'images' },
      { label: 'Videos', value: 'videos' },
    ],
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};
