import React from 'react';
import { PageContainer as AntPageContainer, PageContainerProps as AntPageContainerProps } from '@ant-design/pro-components';
import { PageTransition } from '@/ui/animations';

export interface PageContainerProps extends AntPageContainerProps {
  animated?: boolean;
  cyberpunk?: boolean;
}

/**
 * Enhanced PageContainer component with animation support
 * Wraps Ant Design Pro's PageContainer with page transition animations
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  animated = true,
  cyberpunk = false,
  className = '',
  children,
  ...props
}) => {
  // If animation is disabled, render without animation wrapper
  if (!animated) {
    return (
      <AntPageContainer
        className={`
          enhanced-page-container 
          ${cyberpunk ? 'cyberpunk-page-container' : ''} 
          ${className}
        `}
        {...props}
      >
        {children}
      </AntPageContainer>
    );
  }

  return (
    <PageTransition>
      <AntPageContainer
        className={`
          enhanced-page-container 
          ${cyberpunk ? 'cyberpunk-page-container' : ''} 
          ${className}
        `}
        {...props}
      >
        {children}
      </AntPageContainer>
    </PageTransition>
  );
};

export default PageContainer;