import React from 'react';
import { Result, Button, Card, Typography, Space } from 'antd';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

const { Text, Title } = Typography;

export interface ErrorStateProps {
  /**
   * Error object or message
   */
  error?: Error | string | null;
  
  /**
   * Title to display
   */
  title?: string;
  
  /**
   * Subtitle to display
   */
  subtitle?: string;
  
  /**
   * Function to retry the operation
   */
  retry?: () => void;
  
  /**
   * Text for the retry button
   */
  retryText?: string;
  
  /**
   * Whether to show the error state in a card
   */
  withCard?: boolean;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Additional style
   */
  style?: React.CSSProperties;
  
  /**
   * Whether to show a cyberpunk-styled error state
   */
  cyberpunk?: boolean;
}

/**
 * A component that displays an error state
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  title = 'Something went wrong',
  subtitle,
  retry,
  retryText = 'Try Again',
  withCard = false,
  className = '',
  style,
  cyberpunk = false,
}) => {
  // Get error message
  const errorMessage = error instanceof Error 
    ? error.message 
    : typeof error === 'string' 
      ? error 
      : subtitle || 'An error occurred while processing your request.';
  
  const content = cyberpunk ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center p-6 ${className}`}
      style={style}
    >
      <Space direction="vertical" size="middle" align="center">
        <AlertCircle size={48} color="#ff4d4f" />
        
        <Title level={4} style={{ color: '#ff4d4f', margin: 0 }}>
          {title}
        </Title>
        
        <Text type="secondary">
          {errorMessage}
        </Text>
        
        {retry && (
          <motion.button
            className="cyber-button error"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={retry}
            style={{
              background: 'rgba(255, 77, 79, 0.2)',
              border: '1px solid #ff4d4f',
              color: '#ff4d4f',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RefreshCw size={16} />
            {retryText}
          </motion.button>
        )}
      </Space>
    </motion.div>
  ) : (
    <Result
      status="error"
      title={title}
      subTitle={errorMessage}
      extra={
        retry && (
          <Button type="primary" onClick={retry}>
            {retryText}
          </Button>
        )
      }
    />
  );
  
  if (withCard) {
    return (
      <Card
        className={cyberpunk ? 'cyber-card error' : ''}
        bordered={!cyberpunk}
        style={cyberpunk ? { 
          background: 'rgba(0, 0, 0, 0.8)', 
          border: '1px solid #ff4d4f',
          boxShadow: '0 0 10px rgba(255, 77, 79, 0.5)'
        } : undefined}
      >
        {content}
      </Card>
    );
  }
  
  return content;
};

export default ErrorState;
