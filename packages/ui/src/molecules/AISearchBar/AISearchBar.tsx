import React, { useState, useEffect, useRef } from 'react';
import { Input, AutoComplete, Spin, Button, Space, Tag, Tooltip, Dropdown } from 'antd';
import { SearchOutlined, CloseCircleOutlined, HistoryOutlined, RobotOutlined, SettingOutlined, AudioOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme';
import { transitions } from '../../animations/transitions';
import { useAccessibility } from '../../hooks/useAccessibility';
import { createSearchAriaAttributes, KeyCodes } from '../../utils/accessibility';

export interface AISearchBarProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;

  /**
   * Callback when search is submitted
   */
  onSearch?: (value: string) => void;

  /**
   * Callback when AI-assisted search is requested
   */
  onAISearch?: (value: string) => Promise<string[]>;

  /**
   * Whether to show recent searches
   * @default true
   */
  recentSearches?: boolean;

  /**
   * Maximum number of recent searches to show
   * @default 5
   */
  maxRecentSearches?: number;

  /**
   * Source of suggestions
   * - none: No suggestions
   * - static: Static suggestions provided via the suggestions prop
   * - user-behavior: Suggestions based on user behavior
   * - ai: AI-generated suggestions
   * @default "ai"
   */
  suggestionsSource?: 'none' | 'static' | 'user-behavior' | 'ai';

  /**
   * Static suggestions to show
   */
  suggestions?: string[];

  /**
   * Scope of the search
   * - global: Search across the entire application
   * - current: Search only in the current view
   * - custom: Custom scope defined by the scopeOptions
   * @default "global"
   */
  scope?: 'global' | 'current' | 'custom';

  /**
   * Custom scope options
   */
  scopeOptions?: { label: string; value: string }[];

  /**
   * Whether to allow voice input
   * @default false
   */
  allowVoiceInput?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Style object
   */
  style?: React.CSSProperties;

  /**
   * Whether to show the search button
   * @default true
   */
  showSearchButton?: boolean;

  /**
   * Size of the search bar
   * @default "middle"
   */
  size?: 'small' | 'middle' | 'large';

  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;

  /**
   * Whether the search is loading
   * @default false
   */
  loading?: boolean;
}

/**
 * AISearchBar component
 *
 * An intelligent search bar with AI-powered suggestions, recent searches,
 * and natural language processing capabilities.
 */
export const AISearchBar: React.FC<AISearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onAISearch,
  recentSearches = true,
  maxRecentSearches = 5,
  suggestionsSource = 'ai',
  suggestions: staticSuggestions = [],
  scope = 'global',
  scopeOptions = [],
  allowVoiceInput = false,
  className = '',
  style = {},
  showSearchButton = true,
  size = 'middle',
  cyberpunk = false,
  loading = false,
}) => {
  const { token } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState<{ value: string; label: React.ReactNode }[]>([]);
  const [recentSearchList, setRecentSearchList] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedScope, setSelectedScope] = useState(scope === 'custom' && scopeOptions.length > 0 ? scopeOptions[0].value : scope);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const searchInputRef = useRef<Input>(null);
  const [isListening, setIsListening] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Use accessibility hook
  const {
    announce,
    createKeyHandler,
    createAriaAttributes
  } = useAccessibility();

  // Create ARIA attributes for search
  const searchAriaAttributes = createAriaAttributes(
    createSearchAriaAttributes(
      'Search',
      showResults,
      'search-results'
    )
  );

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (recentSearches) {
      const savedSearches = localStorage.getItem('aiSearchBar_recentSearches');
      if (savedSearches) {
        try {
          const parsed = JSON.parse(savedSearches);
          setRecentSearchList(Array.isArray(parsed) ? parsed.slice(0, maxRecentSearches) : []);
        } catch (e) {
          console.error('Failed to parse recent searches:', e);
          setRecentSearchList([]);
        }
      }
    }
  }, [recentSearches, maxRecentSearches]);

  // Update options when search value, recent searches, or suggestions change
  useEffect(() => {
    updateOptions();
  }, [searchValue, recentSearchList, staticSuggestions, aiSuggestions]);

  // Get AI suggestions when search value changes
  useEffect(() => {
    const getAISuggestions = async () => {
      if (suggestionsSource === 'ai' && searchValue && onAISearch) {
        setIsSearching(true);
        try {
          const suggestions = await onAISearch(searchValue);
          setAiSuggestions(suggestions);
        } catch (error) {
          console.error('Error getting AI suggestions:', error);
        } finally {
          setIsSearching(false);
        }
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchValue) {
        getAISuggestions();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchValue, onAISearch, suggestionsSource]);

  // Update the options based on current state
  const updateOptions = () => {
    const newOptions: { value: string; label: React.ReactNode }[] = [];

    // Add recent searches
    if (recentSearches && recentSearchList.length > 0) {
      newOptions.push({
        value: 'recent-searches-header',
        label: (
          <div className="search-option-header">
            <HistoryOutlined /> Recent Searches
          </div>
        ),
        disabled: true,
      });

      recentSearchList
        .filter(item => searchValue ? item.toLowerCase().includes(searchValue.toLowerCase()) : true)
        .forEach(item => {
          newOptions.push({
            value: item,
            label: (
              <div className="search-option-item">
                <Space>
                  <HistoryOutlined />
                  <span>{item}</span>
                </Space>
                <Button
                  type="text"
                  size="small"
                  icon={<CloseCircleOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecentSearch(item);
                  }}
                />
              </div>
            ),
          });
        });
    }

    // Add static suggestions
    if (suggestionsSource === 'static' && staticSuggestions.length > 0) {
      if (newOptions.length > 0) {
        newOptions.push({
          value: 'suggestions-divider',
          label: <div className="search-option-divider" />,
          disabled: true,
        });
      }

      newOptions.push({
        value: 'suggestions-header',
        label: (
          <div className="search-option-header">
            <SearchOutlined /> Suggestions
          </div>
        ),
        disabled: true,
      });

      staticSuggestions
        .filter(item => searchValue ? item.toLowerCase().includes(searchValue.toLowerCase()) : true)
        .forEach(item => {
          newOptions.push({
            value: item,
            label: (
              <div className="search-option-item">
                <SearchOutlined />
                <span>{item}</span>
              </div>
            ),
          });
        });
    }

    // Add AI suggestions
    if (suggestionsSource === 'ai' && aiSuggestions.length > 0) {
      if (newOptions.length > 0) {
        newOptions.push({
          value: 'ai-suggestions-divider',
          label: <div className="search-option-divider" />,
          disabled: true,
        });
      }

      newOptions.push({
        value: 'ai-suggestions-header',
        label: (
          <div className="search-option-header">
            <RobotOutlined /> AI Suggestions
          </div>
        ),
        disabled: true,
      });

      aiSuggestions.forEach(item => {
        newOptions.push({
          value: item,
          label: (
            <div className="search-option-item">
              <Space>
                <RobotOutlined />
                <span>{item}</span>
              </Space>
              <Tag color="blue">AI</Tag>
            </div>
          ),
        });
      });
    }

    setOptions(newOptions);
  };

  // Handle search submission
  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    // Add to recent searches
    if (recentSearches) {
      const newRecentSearches = [
        value,
        ...recentSearchList.filter(item => item !== value),
      ].slice(0, maxRecentSearches);

      setRecentSearchList(newRecentSearches);
      localStorage.setItem('aiSearchBar_recentSearches', JSON.stringify(newRecentSearches));
    }

    // Call onSearch callback
    if (onSearch) {
      onSearch(value);
    }

    // Announce to screen readers
    announce(`Searching for ${value} in ${selectedScope} scope`);

    // Show results
    setShowResults(true);
  };

  // Handle keyboard shortcuts
  const handleKeyboardShortcuts = createKeyHandler(
    [KeyCodes.ESCAPE],
    (event) => {
      setSearchValue('');
      setShowResults(false);
      announce('Search cleared');
    },
    { preventDefault: true }
  );

  // Remove an item from recent searches
  const removeRecentSearch = (value: string) => {
    const newRecentSearches = recentSearchList.filter(item => item !== value);
    setRecentSearchList(newRecentSearches);
    localStorage.setItem('aiSearchBar_recentSearches', JSON.stringify(newRecentSearches));
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearchList([]);
    localStorage.removeItem('aiSearchBar_recentSearches');
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    // This is a type assertion to avoid TypeScript errors
    // In a real implementation, you would use the proper types
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript);
      setIsListening(false);

      // Auto-submit after voice input
      handleSearch(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Render scope selector
  const renderScopeSelector = () => {
    if (scope === 'global' || scope === 'current') {
      return (
        <Tag color={token.colorPrimary}>
          {scope === 'global' ? 'Global Search' : 'Current View'}
        </Tag>
      );
    }

    if (scope === 'custom' && scopeOptions.length > 0) {
      return (
        <Dropdown
          menu={{
            items: scopeOptions.map(option => ({
              key: option.value,
              label: option.label,
              onClick: () => setSelectedScope(option.value),
            })),
          }}
          trigger={['click']}
        >
          <Tag color={token.colorPrimary} style={{ cursor: 'pointer' }}>
            {scopeOptions.find(option => option.value === selectedScope)?.label || 'Select Scope'}
          </Tag>
        </Dropdown>
      );
    }

    return null;
  };

  return (
    <div
      className={`ai-search-bar ${cyberpunk ? 'cyberpunk' : ''} ${className}`}
      style={{
        ...style,
        position: 'relative',
      }}
      {...searchAriaAttributes}
      onKeyDown={handleKeyboardShortcuts}
    >
      <AutoComplete
        value={searchValue}
        options={options}
        onChange={setSearchValue}
        onSelect={(value) => {
          // Skip headers and dividers
          if (
            value === 'recent-searches-header' ||
            value === 'suggestions-header' ||
            value === 'ai-suggestions-header' ||
            value === 'suggestions-divider' ||
            value === 'ai-suggestions-divider'
          ) {
            return;
          }

          setSearchValue(value);
          handleSearch(value);
          announce(`Selected: ${value}`);
        }}
        style={{ width: '100%' }}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
          padding: '8px 0',
        }}
        id="search-results"
        dropdownRender={(menu) => (
          <div>
            {menu}
            {recentSearches && recentSearchList.length > 0 && (
              <div style={{ padding: '8px 12px', textAlign: 'right' }}>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    clearRecentSearches();
                    announce('Recent searches cleared');
                  }}
                  aria-label="Clear recent searches"
                >
                  Clear Recent Searches
                </Button>
              </div>
            )}
          </div>
        )}
      >
        <Input
          ref={searchInputRef}
          placeholder={placeholder}
          size={size}
          prefix={<SearchOutlined style={{ color: token.colorTextSecondary }} />}
          suffix={
            <Space>
              {isSearching && <Spin size="small" />}
              {searchValue && (
                <Button
                  type="text"
                  size="small"
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    setSearchValue('');
                    announce('Search cleared');
                  }}
                  aria-label="Clear search"
                />
              )}
              {allowVoiceInput && (
                <Tooltip title="Voice Search">
                  <Button
                    type="text"
                    size="small"
                    icon={isListening ? <Spin size="small" /> : <AudioOutlined />}
                    onClick={handleVoiceInput}
                    disabled={isListening}
                    aria-label={isListening ? "Listening..." : "Voice search"}
                  />
                </Tooltip>
              )}
              {renderScopeSelector()}
            </Space>
          }
          onPressEnter={() => handleSearch(searchValue)}
          className={`ai-search-input ${cyberpunk ? 'cyberpunk' : ''}`}
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={showResults}
        />
      </AutoComplete>

      {showSearchButton && (
        <AnimatePresence>
          {searchValue && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={transitions.fadeIn}
              style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => handleSearch(searchValue)}
                loading={loading}
                aria-label="Search"
              >
                Search
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <style jsx>{`
        .ai-search-bar {
          width: 100%;
        }

        .ai-search-bar.cyberpunk .ai-search-input {
          border-color: ${token.colorPrimary};
          box-shadow: 0 0 5px ${token.colorPrimary}80;
        }

        .ai-search-bar.cyberpunk .ai-search-input:focus,
        .ai-search-bar.cyberpunk .ai-search-input:hover {
          border-color: ${token.colorPrimary};
          box-shadow: 0 0 10px ${token.colorPrimary};
        }

        .search-option-header {
          font-weight: 500;
          color: ${token.colorTextSecondary};
          padding: 4px 0;
        }

        .search-option-divider {
          height: 1px;
          background-color: ${token.colorBorder};
          margin: 4px 0;
        }

        .search-option-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 0;
        }

        /* Focus styles for accessibility */
        .ai-search-bar :focus-visible {
          outline: 2px solid ${token.colorPrimary};
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default AISearchBar;
