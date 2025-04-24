import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | number;
  padding?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Container component with responsive width and padding
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 24,
  className = '',
  style = {},
}) => {
  // Convert maxWidth to pixel value
  const getMaxWidthValue = (): string | number => {
    const widthMap = {
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1600,
      full: '100%',
    };
    
    if (typeof maxWidth === 'number') {
      return maxWidth;
    }
    
    return widthMap[maxWidth] || widthMap.lg;
  };
  
  return (
    <div
      className={`container ${className}`}
      style={{
        width: '100%',
        maxWidth: getMaxWidthValue(),
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
