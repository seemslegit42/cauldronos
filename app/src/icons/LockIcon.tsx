import React from 'react';

interface LockIconProps {
  size?: number;
  color?: string;
  className?: string;
  locked?: boolean;
}

const LockIcon: React.FC<LockIconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  locked = true
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
      {/* Lock body - geometric rectangle with rounded corners */}
      <rect 
        x="5" 
        y="11" 
        width="14" 
        height="10" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      
      {/* Lock shackle - conditionally rendered based on locked state */}
      {locked ? (
        <path 
          d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      ) : (
        <path 
          d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      )}
      
      {/* Keyhole */}
      <circle 
        cx="12" 
        cy="16" 
        r="1" 
        fill={color} 
      />
    </svg>
  );
};

export default LockIcon;
