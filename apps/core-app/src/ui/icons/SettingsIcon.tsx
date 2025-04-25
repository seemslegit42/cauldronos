import React from 'react';

interface SettingsIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const SettingsIcon: React.FC<SettingsIconProps> = ({ 
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
      {/* Central gear element */}
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      {/* Gear teeth - geometric and precise */}
      <path 
        d="M19.4 15.5L16.9 14.5C16.7 14.4 16.6 14.2 16.6 14C16.6 13.8 16.7 13.6 16.9 13.5L19.4 12.5C19.7 12.4 19.9 12.1 19.8 11.8L18.8 9.2C18.7 8.9 18.4 8.7 18.1 8.8L15.6 9.8C15.4 9.9 15.2 9.8 15.1 9.6L14.1 7.1C14 6.8 13.7 6.6 13.4 6.7L10.8 7.7C10.5 7.8 10.3 8.1 10.4 8.4L11.4 10.9C11.5 11.1 11.4 11.3 11.2 11.4L8.7 12.4C8.4 12.5 8.2 12.8 8.3 13.1L9.3 15.7C9.4 16 9.7 16.2 10 16.1L12.5 15.1C12.7 15 12.9 15.1 13 15.3L14 17.8C14.1 18.1 14.4 18.3 14.7 18.2L17.3 17.2C17.6 17.1 17.8 16.8 17.7 16.5L16.7 14C16.6 13.8 16.7 13.6 16.9 13.5"
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Outer ring for balance */}
      <path 
        d="M12 2V5M12 19V22M2 12H5M19 12H22"
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SettingsIcon;
