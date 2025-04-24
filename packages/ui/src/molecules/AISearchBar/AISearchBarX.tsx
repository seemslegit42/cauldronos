import React, { useState, useEffect, useRef } from 'react';
import { Input, AutoComplete, Spin, Button, Space, Tag, Tooltip, Dropdown, Typography } from 'antd';
import { SearchOutlined, CloseCircleOutlined, HistoryOutlined, RobotOutlined, SettingOutlined, AudioOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Bubble, Sender, Suggestion } from '@ant-design/x';
import { useTheme } from '../../theme';
import { transitions } from '../../animations/transitions';
import { useAccessibility } from '../../hooks/useAccessibility';
import { createSearchAriaAttributes, KeyCodes } from '../../utils/accessibility';

const { Text } = Typography;

export interface AISearchBarXProps {
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

  /**
   * Whether to show AI chat interface for complex queries
   * @default false
   */
  showAIChat?: boolean;

  /**
   * Whether to show intelligent filters
   * @default false
   */
  showIntelligentFilters?: boolean;

  /**
   * Whether to show semantic search capabilities
   * @default false
   */
  semanticSearch?: boolean;

  /**
   * Whether to show search insights
   * @default false
   */
  showInsights?: boolean;

  /**
   * Callback when AI chat is requested
   */
  onAIChat?: (query: string) => Promise<string>;
}

/**
 * AISearchBarX component
 *
 * An intelligent search bar with AI-powered suggestions, recent searches,
 * natural language processing capabilities, and Ant Design X integration.
 */
export const AISearchBarX: React.FC<AISearchBarXProps> = ({
  placeholder = 'Search...',
  onSearch,
  onAISearch,
  onAIChat,
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
  showAIChat = false,
  showIntelligentFilters = false,
  semanticSearch = false,
  showInsights = false,
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
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ content: string; role: 'user' | 'assistant' }>>([]);
  const [chatResponse, setChatResponse] = useState('');
  const [isProcessingChat, setIsProcessingChat] = useState(false);

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
      try {
        const savedSearches = localStorage.getItem('aiSearchBar_recentSearches');
        if (savedSearches) {
          setRecentSearchList(JSON.parse(savedSearches));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, [recentSearches]);

  // Update options when dependencies change
  useEffect(() => {
    updateOptions();
  }, [recentSearchList, aiSuggestions, searchValue, staticSuggestions, suggestionsSource]);

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
    if (recentSearches && recentSearchList.length > 0 && !searchValue) {
      newOptions.push({
        value: 'recent-searches-header',
        label: (
          <div className="search-option-header">
            <Space>
              <HistoryOutlined />
              <span>Recent Searches</span>
            </Space>
          </div>
        ),
      });

      recentSearchList.forEach(search => {
        newOptions.push({
          value: search,
          label: (
            <div className="search-option-item">
              <Space>
                <HistoryOutlined style={{ color: token.colorTextSecondary, fontSize: '0.8em' }} />
                <span>{search}</span>
              </Space>
              <Button
                type="text"
                size="small"
                icon={<CloseCircleOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  removeRecentSearch(search);
                }}
                aria-label={`Remove ${search} from recent searches`}
              />
            </div>
          ),
        });
      });

      // Add divider if we have more sections
      if (
        (suggestionsSource === 'static' && staticSuggestions.length > 0) ||
        (suggestionsSource === 'ai' && aiSuggestions.length > 0)
      ) {
        newOptions.push({
          value: 'suggestions-divider',
          label: <div className="search-option-divider" />,
        });
      }
    }

    // Add static suggestions
    if (suggestionsSource === 'static' && staticSuggestions.length > 0) {
      newOptions.push({
        value: 'suggestions-header',
        label: (
          <div className="search-option-header">
            <Space>
              <SettingOutlined />
              <span>Suggestions</span>
            </Space>
          </div>
        ),
      });

      staticSuggestions.forEach(suggestion => {
        if (suggestion.toLowerCase().includes(searchValue.toLowerCase()) || !searchValue) {
          newOptions.push({
            value: suggestion,
            label: (
              <div className="search-option-item">
                <span>{suggestion}</span>
              </div>
            ),
          });
        }
      });

      // Add divider if we have more sections
      if (suggestionsSource === 'ai' && aiSuggestions.length > 0) {
        newOptions.push({
          value: 'ai-suggestions-divider',
          label: <div className="search-option-divider" />,
        });
      }
    }

    // Add AI suggestions
    if (suggestionsSource === 'ai' && aiSuggestions.length > 0) {
      newOptions.push({
        value: 'ai-suggestions-header',
        label: (
          <div className="search-option-header">
            <Space>
              <RobotOutlined />
              <span>AI Suggestions</span>
            </Space>
          </div>
        ),
      });

      aiSuggestions.forEach(suggestion => {
        newOptions.push({
          value: suggestion,
          label: (
            <div className="search-option-item">
              <Space>
                <RobotOutlined style={{ color: token.colorPrimary, fontSize: '0.8em' }} />
                <span>{suggestion}</span>
              </Space>
            </div>
          ),
        });
      });
    }

    // Add AI chat option for complex queries
    if (showAIChat && searchValue.length > 10) {
      newOptions.push({
        value: 'ai-chat-divider',
        label: <div className="search-option-divider" />,
      });
      
      newOptions.push({
        value: 'ai-chat-option',
        label: (
          <div className="search-option-item ai-chat-option">
            <Space>
              <RobotOutlined style={{ color: token.colorPrimary }} />
              <span>Ask AI assistant about: <Text strong>{searchValue}</Text></span>
            </Space>
          </div>
        ),
      });
    }

    setOptions(newOptions);
  };

  // Handle search submission
  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    // Check if this is the AI chat option
    if (value === 'ai-chat-option') {
      handleAIChatRequest(searchValue);
      return;
    }

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

  // Handle AI chat request
  const handleAIChatRequest = (query: string) => {
    if (!onAIChat) return;
    
    setShowChatInterface(true);
    setIsProcessingChat(true);
    
    // Add user message
    const newMessages = [
      ...chatMessages,
      { content: query, role: 'user' as const }
    ];
    setChatMessages(newMessages);
    
    // Get AI response
    onAIChat(query)
      .then(response => {
        setChatResponse(response);
        setChatMessages([
          ...newMessages,
          { content: response, role: 'assistant' as const }
        ]);
      })
      .catch(error => {
        console.error('Error getting AI chat response:', error);
        setChatMessages([
          ...newMessages,
          { content: 'Sorry, I encountered an error processing your request.', role: 'assistant' as const }
        ]);
      })
      .finally(() => {
        setIsProcessingChat(false);
      });
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      announce('Voice recognition is not supported in your browser');
      return;
    }

    // Toggle listening state
    if (isListening) {
      setIsListening(false);
      announce('Voice input stopped');
      return;
    }

    setIsListening(true);
    announce('Listening for voice input');

    // Use the SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript);
      announce(`Recognized: ${transcript}`);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      announce(`Voice recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Remove a recent search
  const removeRecentSearch = (search: string) => {
    const newRecentSearches = recentSearchList.filter(item => item !== search);
    setRecentSearchList(newRecentSearches);
    localStorage.setItem('aiSearchBar_recentSearches', JSON.stringify(newRecentSearches));
    announce(`Removed ${search} from recent searches`);
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearchList([]);
    localStorage.removeItem('aiSearchBar_recentSearches');
    announce('Cleared all recent searches');
  };

  // Handle keyboard shortcuts
  const handleKeyboardShortcuts = createKeyHandler({
    [KeyCodes.ESCAPE]: () => {
      if (searchValue) {
        setSearchValue('');
        announce('Search cleared');
      } else if (showChatInterface) {
        setShowChatInterface(false);
        announce('AI chat interface closed');
      }
    },
    [KeyCodes.SLASH]: (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        searchInputRef.current?.focus();
        announce('Search focused');
      }
    },
  });

  // Render scope selector
  const renderScopeSelector = () => {
    if (scope === 'global' || scope === 'current') {
      return null;
    }

    if (scope === 'custom' && scopeOptions.length > 0) {
      return (
        <Dropdown
          menu={{
            items: scopeOptions.map(option => ({
              key: option.value,
              label: option.label,
              onClick: () => {
                setSelectedScope(option.value);
                announce(`Search scope set to ${option.label}`);
              },
            })),
          }}
          trigger={['click']}
        >
          <Button
            type="text"
            size="small"
            onClick={(e) => e.preventDefault()}
            aria-label="Select search scope"
            aria-haspopup="true"
          >
            {scopeOptions.find(option => option.value === selectedScope)?.label || 'Scope'}
          </Button>
        </Dropdown>
      );
    }

    return null;
  };

  // Render AI chat interface
  const renderChatInterface = () => {
    if (!showChatInterface) return null;

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={transitions.scale}
        className="ai-chat-interface"
      >
        <div className="ai-chat-header">
          <Space>
            <RobotOutlined />
            <span>AI Assistant</span>
          </Space>
          <Button
            type="text"
            size="small"
            icon={<CloseCircleOutlined />}
            onClick={() => {
              setShowChatInterface(false);
              announce('AI chat interface closed');
            }}
            aria-label="Close AI chat"
          />
        </div>
        
        <div className="ai-chat-content">
          <Bubble.List
            items={chatMessages}
            renderItem={(item) => (
              <Bubble
                content={item.content}
                type={item.role === 'user' ? 'primary' : 'secondary'}
              />
            )}
          />
          
          {isProcessingChat && (
            <div className="ai-chat-loading">
              <Spin size="small" />
              <span>Processing your request...</span>
            </div>
          )}
        </div>
        
        <div className="ai-chat-footer">
          <Sender
            onSend={(value) => {
              if (value.trim() && onAIChat) {
                handleAIChatRequest(value);
              }
            }}
            placeholder="Ask a follow-up question..."
            disabled={isProcessingChat}
          />
        </div>
      </motion.div>
    );
  };

  // Render intelligent suggestions
  const renderIntelligentSuggestions = () => {
    if (!showIntelligentFilters || !searchValue) return null;

    // Example intelligent filters based on search context
    const filters = [
      { key: 'recent', label: 'Recent' },
      { key: 'relevant', label: 'Most Relevant' },
      { key: 'type', label: 'Filter by Type' },
    ];

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={transitions.fadeIn}
        className="intelligent-filters"
      >
        <Space wrap>
          {filters.map(filter => (
            <Tag key={filter.key} className="filter-tag">
              {filter.label}
            </Tag>
          ))}
        </Space>
      </motion.div>
    );
  };

  return (
    <div
      className={`ai-search-bar-x ${cyberpunk ? 'cyberpunk' : ''} ${className}`}
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
            value === 'ai-suggestions-divider' ||
            value === 'ai-chat-divider'
          ) {
            return;
          }

          if (value === 'ai-chat-option') {
            handleAIChatRequest(searchValue);
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
        dropdownMatchSelectWidth={true}
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

      {renderIntelligentSuggestions()}

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

      <AnimatePresence>
        {showChatInterface && renderChatInterface()}
      </AnimatePresence>

      {semanticSearch && searchValue && (
        <div className="semantic-search-indicator">
          <Text type="secondary">
            <RobotOutlined /> Using semantic search to find related results
          </Text>
        </div>
      )}

      <style jsx>{`
        .ai-search-bar-x {
          width: 100%;
        }

        .ai-search-bar-x.cyberpunk .ai-search-input {
          border-color: ${token.colorPrimary};
          box-shadow: 0 0 5px ${token.colorPrimary}80;
        }

        .ai-search-bar-x.cyberpunk .ai-search-input:focus,
        .ai-search-bar-x.cyberpunk .ai-search-input:hover {
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

        .ai-chat-option {
          color: ${token.colorPrimary};
          font-weight: 500;
        }

        .ai-chat-interface {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background-color: ${token.colorBgContainer};
          border-radius: 8px;
          box-shadow: ${token.boxShadow};
          z-index: 1000;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 400px;
        }

        .ai-chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid ${token.colorBorderSecondary};
          background-color: ${token.colorBgElevated};
        }

        .ai-chat-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          min-height: 200px;
          max-height: 300px;
        }

        .ai-chat-footer {
          padding: 12px 16px;
          border-top: 1px solid ${token.colorBorderSecondary};
          background-color: ${token.colorBgElevated};
        }

        .ai-chat-loading {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          color: ${token.colorTextSecondary};
        }

        .intelligent-filters {
          margin-top: 8px;
        }

        .filter-tag {
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-tag:hover {
          color: ${token.colorPrimary};
          border-color: ${token.colorPrimary};
        }

        .semantic-search-indicator {
          margin-top: 4px;
          font-size: 12px;
        }

        /* Focus styles for accessibility */
        .ai-search-bar-x :focus-visible {
          outline: 2px solid ${token.colorPrimary};
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default AISearchBarX;
