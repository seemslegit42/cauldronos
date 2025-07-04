import React from 'react';

interface LoadingIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ 
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
      className={`${className} animate-spin`}
    >
      {/* Circular loading indicator with geometric precision */}
      <path 
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LoadingIcon;
