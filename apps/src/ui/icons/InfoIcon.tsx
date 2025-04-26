import React from 'react';

interface InfoIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ 
  size = 24, 
  color = '#00B2C9', // Default to Flux Aqua
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
      
      {/* Information "i" */}
      <path 
        d="M12 8V8.01" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      <path 
        d="M12 12V16" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Dot for the "i" */}
      <circle 
        cx="12" 
        cy="8" 
        r="1" 
        fill={color} 
      />
    </svg>
  );
};

export default InfoIcon;
