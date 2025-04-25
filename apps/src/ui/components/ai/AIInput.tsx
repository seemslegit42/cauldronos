import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Spin, Tooltip } from 'antd';
import { SendOutlined, RobotOutlined, LoadingOutlined, AudioOutlined, StopOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';
import { transitions } from '@/ui/animations/transitions';

export interface AIInputProps {
  onSubmit: (value: string) => Promise<void>;
  onAIAssist?: (value: string) => Promise<string>;
  placeholder?: string;
  loading?: boolean;
  className?: string;
  autoFocus?: boolean;
  showVoiceInput?: boolean;
  cyberpunk?: boolean;
}

/**
 * AI-enhanced input component with typing suggestions and voice input
 */
export const AIInput: React.FC<AIInputProps> = ({
  onSubmit,
  onAIAssist,
  placeholder = 'Type a message...',
  loading = false,
  className = '',
  autoFocus = false,
  showVoiceInput = true,
  cyberpunk = false,
}) => {
  const { reducedMotion } = useMotion();
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isAssisting, setIsAssisting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<any>(null);
  const suggestionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Focus input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Clear any existing suggestion timeout
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }

    // If the input is not empty and we have an AI assist function, get suggestions
    if (newValue && onAIAssist && !isAssisting) {
      suggestionTimeoutRef.current = setTimeout(async () => {
        try {
          setIsAssisting(true);
          const aiSuggestion = await onAIAssist(newValue);
          setSuggestion(aiSuggestion.slice(newValue.length));
        } catch (error) {
          console.error('Error getting AI suggestion:', error);
          setSuggestion('');
        } finally {
          setIsAssisting(false);
        }
      }, 500);
    } else {
      setSuggestion('');
    }
  };

  // Handle key down events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Submit on Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    // Accept suggestion on Tab
    else if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      setValue(value + suggestion);
      setSuggestion('');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!value.trim() || loading) return;

    try {
      await onSubmit(value);
      setValue('');
      setSuggestion('');
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      setValue(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div className={`ai-input-container ${cyberpunk ? 'cyberpunk' : ''} ${className}`}>
      <div className="ai-input-wrapper">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          autoComplete="off"
          className="ai-input"
          suffix={
            <div className="ai-input-actions">
              {isAssisting && (
                <Spin 
                  indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} 
                  className="ai-input-spinner" 
                />
              )}
              {showVoiceInput && (
                <Tooltip title={isRecording ? "Stop recording" : "Voice input"}>
                  <Button
                    type="text"
                    icon={isRecording ? <StopOutlined /> : <AudioOutlined />}
                    onClick={handleVoiceInput}
                    className={`voice-button ${isRecording ? 'recording' : ''}`}
                  />
                </Tooltip>
              )}
              <Tooltip title="Send message">
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSubmit}
                  disabled={!value.trim() || loading}
                  className="send-button"
                />
              </Tooltip>
            </div>
          }
        />
        
        {/* AI Suggestion */}
        {suggestion && !reducedMotion && (
          <AnimatePresence>
            <motion.div
              className="ai-suggestion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="suggestion-prefix">{value}</span>
              <span className="suggestion-text">{suggestion}</span>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      
      {/* Hint text */}
      <div className="ai-input-hint">
        <RobotOutlined /> Press <kbd>Tab</kbd> to accept AI suggestions
      </div>
    </div>
  );
};

export default AIInput;