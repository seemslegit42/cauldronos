import React from 'react';
import { Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface AISearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onAISearch?: (query: string) => Promise<string[]>;
  recentSearches?: boolean;
  maxRecentSearches?: number;
  suggestionsSource?: 'ai' | 'history' | 'both';
  scope?: 'global' | 'page' | 'section';
  allowVoiceInput?: boolean;
  cyberpunk?: boolean;
}

export const AISearchBar: React.FC<AISearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onAISearch,
  recentSearches = false,
  maxRecentSearches = 5,
  suggestionsSource = 'both',
  scope = 'global',
  allowVoiceInput = false,
  cyberpunk = false
}) => {
  const handleSearch = (value: string) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <Search
      placeholder={placeholder}
      onSearch={handleSearch}
      enterButton={<SearchOutlined />}
      size="large"
      className="w-full"
    />
  );
};

export default AISearchBar;
