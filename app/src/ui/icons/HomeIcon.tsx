import React from 'react';

interface HomeIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({ 
  size = 24, 
  color = 'currentColor',
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
      {/* Geometric house shape with clean lines */}
      <path 
        d="M3 10.182V21H9V14H15V21H21V10.182L12 3L3 10.182Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Subtle detail for the roof peak */}
      <path 
        d="M12 3L2 11H4.5L12 5L19.5 11H22L12 3Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
