import React from 'react';

interface AnalyticsIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const AnalyticsIcon: React.FC<AnalyticsIconProps> = ({ 
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
      {/* Base grid */}
      <rect 
        x="3" 
        y="3" 
        width="18" 
        height="18" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      {/* Bar chart elements - geometric and aligned */}
      <path 
        d="M7 14V18" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M12 10V18" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M17 6V18" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      {/* Data points */}
      <circle cx="7" cy="14" r="1" fill={color} />
      <circle cx="12" cy="10" r="1" fill={color} />
      <circle cx="17" cy="6" r="1" fill={color} />
    </svg>
  );
};

export default AnalyticsIcon;
