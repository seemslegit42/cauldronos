import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface AISearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  recentSearches?: boolean;
  maxRecentSearches?: number;
  suggestionsSource?: string;
  scope?: string;
  allowVoiceInput?: boolean;
  cyberpunk?: boolean;
}

const AISearchBar: React.FC<AISearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  recentSearches = false,
  maxRecentSearches = 5,
  suggestionsSource,
  scope,
  allowVoiceInput = false,
  cyberpunk = false,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      onChange={handleSearch}
      className={`w-full ${cyberpunk ? 'border-blue-400 shadow-blue-400/20 shadow-sm' : ''}`}
      size="large"
    />
  );
};

export default AISearchBar;
