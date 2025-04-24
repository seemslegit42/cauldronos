import React, { useState, useEffect, useRef } from 'react';
import { Typography, Spin } from '@cauldronos/ui';
import { LoadingOutlined } from '@ant-design/icons';

const { Text, Paragraph, Title } = Typography;

interface StreamableTextProps {
  content: string;
  isStreaming?: boolean;
  streamingSpeed?: number; // ms per character for simulating streaming
  variant?: 'text' | 'paragraph' | 'title';
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  style?: React.CSSProperties;
  onStreamingComplete?: () => void;
}

/**
 * A component that can display text with a streaming effect, simulating AI typing.
 * It gracefully handles both streaming and non-streaming text.
 */
const StreamableText: React.FC<StreamableTextProps> = ({
  content,
  isStreaming = false,
  streamingSpeed = 10,
  variant = 'paragraph',
  level = 4,
  className = '',
  style = {},
  onStreamingComplete
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(!isStreaming);
  const contentRef = useRef(content);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update content ref when content changes
  useEffect(() => {
    contentRef.current = content;

    // If not streaming, immediately show full content
    if (!isStreaming) {
      setDisplayedContent(content);
      setIsComplete(true);
      if (onStreamingComplete) onStreamingComplete();
    } else {
      // Reset for new streaming content
      setDisplayedContent('');
      setIsComplete(false);
    }
  }, [content, isStreaming, onStreamingComplete]);

  // Handle streaming effect
  useEffect(() => {
    if (!isStreaming || isComplete) return;

    let currentIndex = 0;
    const fullContent = contentRef.current;

    const streamNextChar = () => {
      if (currentIndex < fullContent.length) {
        setDisplayedContent(fullContent.substring(0, currentIndex + 1));
        currentIndex++;
        timeoutRef.current = setTimeout(streamNextChar, streamingSpeed);
      } else {
        setIsComplete(true);
        if (onStreamingComplete) onStreamingComplete();
      }
    };

    timeoutRef.current = setTimeout(streamNextChar, streamingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isStreaming, isComplete, streamingSpeed, onStreamingComplete]);

  // Cursor blinking effect
  const cursor = !isComplete ? (
    <Text className="animate-pulse" style={{ marginLeft: 1 }}>▋</Text>
  ) : null;

  // Loading indicator for when streaming hasn't started yet
  const loadingIndicator = isStreaming && displayedContent === '' ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
  ) : null;

  // Render the appropriate typography component
  const renderContent = () => {
    const content = (
      <>
        {displayedContent}
        {cursor}
        {loadingIndicator}
      </>
    );

    switch (variant) {
      case 'text':
        return <Text className={className} style={style}>{content}</Text>;
      case 'title':
        return <Title level={level} className={className} style={style}>{content}</Title>;
      case 'paragraph':
      default:
        return <Paragraph className={className} style={style}>{content}</Paragraph>;
    }
  };

  return renderContent();
};

export default StreamableText;
