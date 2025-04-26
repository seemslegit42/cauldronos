import React, { ReactNode } from 'react';
import { Spin, Result, Button } from 'antd';
import { motion } from 'framer-motion';

export interface AsyncContentProps<T> {
  /**
   * Whether the content is loading
   */
  loading: boolean;
  
  /**
   * Error object if there was an error
   */
  error?: Error | null;
  
  /**
   * Whether to show a success state
   */
  success?: boolean;
  
  /**
   * Success message to display
   */
  successMessage?: string;
  
  /**
   * How long to show the success message before showing the content (ms)
   */
  successDuration?: number;
  
  /**
   * Custom loading component
   */
  loadingFallback?: ReactNode;
  
  /**
   * Custom error component
   */
  errorFallback?: ReactNode;
  
  /**
   * Custom success component
   */
  successFallback?: ReactNode;
  
  /**
   * Function to retry the operation
   */
  retry?: () => void;
  
  /**
   * Children render function that receives the data
   */
  children: ReactNode | ((data: T) => ReactNode);
  
  /**
   * Data to pass to the children render function
   */
  data?: T;
  
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * A component that handles loading, error, and success states for async operations
 */
function AsyncContent<T>({
  loading,
  error,
  success,
  successMessage = 'Operation completed successfully',
  successDuration = 2000,
  loadingFallback,
  errorFallback,
  successFallback,
  retry,
  children,
  data,
  className,
}: AsyncContentProps<T>) {
  const [showSuccess, setShowSuccess] = React.useState(success);
  
  // Reset success state after duration
  React.useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, successDuration);
      
      return () => clearTimeout(timer);
    }
    
    return undefined;
  }, [success, successDuration]);
  
  // Default loading fallback
  const defaultLoadingFallback = (
    <div className="flex items-center justify-center p-8">
      <Spin size="large" tip="Loading..." />
    </div>
  );
  
  // Default error fallback
  const defaultErrorFallback = (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={error?.message || 'An error occurred while processing your request.'}
      extra={
        retry && (
          <Button type="primary" onClick={retry}>
            Try Again
          </Button>
        )
      }
    />
  );
  
  // Default success fallback
  const defaultSuccessFallback = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center p-8"
    >
      <Result
        status="success"
        title="Success"
        subTitle={successMessage}
      />
    </motion.div>
  );
  
  // Render loading state
  if (loading) {
    return (
      <div className={className}>
        {loadingFallback || defaultLoadingFallback}
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className={className}>
        {errorFallback || defaultErrorFallback}
      </div>
    );
  }
  
  // Render success state
  if (showSuccess) {
    return (
      <div className={className}>
        {successFallback || defaultSuccessFallback}
      </div>
    );
  }
  
  // Render content
  return (
    <div className={className}>
      {typeof children === 'function' && data !== undefined
        ? (children as (data: T) => ReactNode)(data)
        : children}
    </div>
  );
}

export default AsyncContent;
