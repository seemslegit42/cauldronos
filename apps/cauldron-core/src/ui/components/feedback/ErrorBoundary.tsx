import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorState from './ErrorState';

interface ErrorBoundaryProps {
  /**
   * Children to render
   */
  children: ReactNode;
  
  /**
   * Custom fallback component
   */
  fallback?: ReactNode;
  
  /**
   * Function to call when an error occurs
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  
  /**
   * Whether to use cyberpunk styling
   */
  cyberpunk?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * A component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <ErrorState
          error={this.state.error}
          title="Component Error"
          subtitle="Something went wrong in this component."
          cyberpunk={this.props.cyberpunk}
          withCard
          retry={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
