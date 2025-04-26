import React from 'react';
import { Spin, Card, Typography } from 'antd';
import { motion } from 'framer-motion';

const { Text } = Typography;

export interface LoadingStateProps {
  /**
   * Text to display while loading
   */
  tip?: string;
  
  /**
   * Size of the spinner
   */
  size?: 'small' | 'default' | 'large';
  
  /**
   * Whether to show the loading state in a card
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
   * Whether to show a cyberpunk-styled loading state
   */
  cyberpunk?: boolean;
}

/**
 * A component that displays a loading state
 */
const LoadingState: React.FC<LoadingStateProps> = ({
  tip = 'Loading...',
  size = 'large',
  withCard = false,
  className = '',
  style,
  cyberpunk = false,
}) => {
  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center p-6 ${className}`}
      style={style}
    >
      {cyberpunk ? (
        <div className="cyber-spinner">
          <div className="cyber-spinner-inner"></div>
        </div>
      ) : (
        <Spin size={size} />
      )}
      
      {tip && (
        <Text
          className={`mt-4 ${cyberpunk ? 'cyber-text' : ''}`}
          style={cyberpunk ? { color: '#0ff', textShadow: '0 0 5px #0ff' } : undefined}
        >
          {tip}
        </Text>
      )}
    </motion.div>
  );
  
  if (withCard) {
    return (
      <Card
        className={cyberpunk ? 'cyber-card' : ''}
        bordered={!cyberpunk}
        style={cyberpunk ? { 
          background: 'rgba(0, 0, 0, 0.8)', 
          border: '1px solid #0ff',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
        } : undefined}
      >
        {content}
      </Card>
    );
  }
  
  return content;
};

export default LoadingState;
