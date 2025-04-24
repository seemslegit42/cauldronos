import React, { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  type?: string;
  direction?: string;
  cyberpunk?: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children,
  type = 'fade',
  direction = 'up',
  cyberpunk = false
}) => {
  return <>{children}</>;
};

export default PageTransition;
