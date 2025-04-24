import React, { ReactNode } from 'react';

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default AIProvider;
