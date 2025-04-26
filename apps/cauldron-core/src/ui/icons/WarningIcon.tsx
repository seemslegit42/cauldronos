import React from 'react';

interface WarningIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const WarningIcon: React.FC<WarningIconProps> = ({ 
  size = 24, 
  color = '#FFD166', // Default to Accent Yellow
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
      {/* Triangular warning shape - geometric and precise */}
      <path 
        d="M12 3L3 20H21L12 3Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Exclamation mark */}
      <path 
        d="M12 10V14" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Dot */}
      <circle 
        cx="12" 
        cy="17" 
        r="1" 
        fill={color} 
      />
    </svg>
  );
};

export default WarningIcon;
