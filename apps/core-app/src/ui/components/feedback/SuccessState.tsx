import React from 'react';
import { Result, Button, Card, Typography, Space } from 'antd';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const { Text, Title } = Typography;

export interface SuccessStateProps {
  /**
   * Title to display
   */
  title?: string;
  
  /**
   * Message to display
   */
  message?: string;
  
  /**
   * Function to call when the user clicks the action button
   */
  onAction?: () => void;
  
  /**
   * Text for the action button
   */
  actionText?: string;
  
  /**
   * Whether to show the success state in a card
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
   * Whether to show a cyberpunk-styled success state
   */
  cyberpunk?: boolean;
  
  /**
   * Whether to auto-dismiss the success state
   */
  autoDismiss?: boolean;
  
  /**
   * Duration in milliseconds before auto-dismissing
   */
  autoDismissDuration?: number;
  
  /**
   * Function to call when the success state is dismissed
   */
  onDismiss?: () => void;
}

/**
 * A component that displays a success state
 */
const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Success',
  message = 'Operation completed successfully',
  onAction,
  actionText = 'Continue',
  withCard = false,
  className = '',
  style,
  cyberpunk = false,
  autoDismiss = false,
  autoDismissDuration = 3000,
  onDismiss,
}) => {
  // Auto-dismiss
  React.useEffect(() => {
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, autoDismissDuration);
      
      return () => clearTimeout(timer);
    }
    
    return undefined;
  }, [autoDismiss, autoDismissDuration, onDismiss]);
  
  const content = cyberpunk ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex flex-col items-center justify-center p-6 ${className}`}
      style={style}
    >
      <Space direction="vertical" size="middle" align="center">
        <CheckCircle size={48} color="#52c41a" />
        
        <Title level={4} style={{ color: '#52c41a', margin: 0 }}>
          {title}
        </Title>
        
        <Text>
          {message}
        </Text>
        
        {onAction && (
          <motion.button
            className="cyber-button success"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            style={{
              background: 'rgba(82, 196, 26, 0.2)',
              border: '1px solid #52c41a',
              color: '#52c41a',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {actionText}
          </motion.button>
        )}
      </Space>
    </motion.div>
  ) : (
    <Result
      status="success"
      title={title}
      subTitle={message}
      extra={
        onAction && (
          <Button type="primary" onClick={onAction}>
            {actionText}
          </Button>
        )
      }
    />
  );
  
  if (withCard) {
    return (
      <Card
        className={cyberpunk ? 'cyber-card success' : ''}
        bordered={!cyberpunk}
        style={cyberpunk ? { 
          background: 'rgba(0, 0, 0, 0.8)', 
          border: '1px solid #52c41a',
          boxShadow: '0 0 10px rgba(82, 196, 26, 0.5)'
        } : undefined}
      >
        {content}
      </Card>
    );
  }
  
  return content;
};

export default SuccessState;
