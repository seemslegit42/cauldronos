import React from 'react';

interface UserIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ 
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
      {/* Head - perfect circle for geometric precision */}
      <circle 
        cx="12" 
        cy="8" 
        r="4" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      
      {/* Body - clean hexagonal shape */}
      <path 
        d="M5 21V19C5 16.7909 6.79086 15 9 15H15C17.2091 15 19 16.7909 19 19V21" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
