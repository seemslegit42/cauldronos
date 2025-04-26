import React from 'react';

interface SuccessIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const SuccessIcon: React.FC<SuccessIconProps> = ({ 
  size = 24, 
  color = '#00B67F', // Default to Growth Green
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
      
      {/* Checkmark - clean, geometric lines */}
      <path 
        d="M8 12L11 15L16 9" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SuccessIcon;
