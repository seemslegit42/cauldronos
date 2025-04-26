import React from 'react';
import AsyncContent from './AsyncContent';
import { LoadingState, ErrorState, SuccessState } from './index';

export interface WithAsyncStatesProps {
  /**
   * Whether the component is loading
   */
  loading?: boolean;
  
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
   * Function to retry the operation
   */
  retry?: () => void;
  
  /**
   * Whether to use cyberpunk styling
   */
  cyberpunk?: boolean;
}

/**
 * Higher-order component that adds loading, error, and success states to a component
 * @param WrappedComponent The component to wrap
 * @param options Options for the HOC
 * @returns A new component with loading, error, and success states
 */
function withAsyncStates<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    /**
     * Whether to use cyberpunk styling
     */
    cyberpunk?: boolean;
    
    /**
     * Whether to use a card for the loading, error, and success states
     */
    withCard?: boolean;
    
    /**
     * Default loading message
     */
    loadingMessage?: string;
    
    /**
     * Default error message
     */
    errorMessage?: string;
    
    /**
     * Default success message
     */
    successMessage?: string;
  } = {}
) {
  const {
    cyberpunk = false,
    withCard = false,
    loadingMessage = 'Loading...',
    errorMessage = 'An error occurred',
    successMessage = 'Operation completed successfully',
  } = options;
  
  // Create a new component that wraps the original component
  const WithAsyncStates = (props: P & WithAsyncStatesProps) => {
    const { loading, error, success, successMessage: propSuccessMessage, retry, cyberpunk: propCyberpunk, ...rest } = props;
    
    // Use cyberpunk from props or options
    const useCyberpunk = propCyberpunk !== undefined ? propCyberpunk : cyberpunk;
    
    return (
      <AsyncContent
        loading={loading || false}
        error={error}
        success={success}
        successMessage={propSuccessMessage || successMessage}
        retry={retry}
        loadingFallback={
          <LoadingState
            tip={loadingMessage}
            withCard={withCard}
            cyberpunk={useCyberpunk}
          />
        }
        errorFallback={
          <ErrorState
            error={error}
            retry={retry}
            withCard={withCard}
            cyberpunk={useCyberpunk}
          />
        }
        successFallback={
          <SuccessState
            message={propSuccessMessage || successMessage}
            withCard={withCard}
            cyberpunk={useCyberpunk}
          />
        }
      >
        <WrappedComponent {...(rest as P)} />
      </AsyncContent>
    );
  };
  
  // Set display name for debugging
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAsyncStates.displayName = `withAsyncStates(${wrappedComponentName})`;
  
  return WithAsyncStates;
}

export default withAsyncStates;
