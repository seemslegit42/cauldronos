import React from 'react';

interface ErrorIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const ErrorIcon: React.FC<ErrorIconProps> = ({ 
  size = 24, 
  color = '#EF476F', // Default to Accent Red
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular background */}
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      
      {/* X mark - clean, geometric lines */}
      <path 
        d="M15 9L9 15" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      <path 
        d="M9 9L15 15" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ErrorIcon;
