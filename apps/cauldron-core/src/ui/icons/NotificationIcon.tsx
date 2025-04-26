import React from 'react';

interface NotificationIconProps {
  size?: number;
  color?: string;
  className?: string;
  hasNotification?: boolean;
  notificationColor?: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  hasNotification = false,
  notificationColor = '#EF476F'
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
      {/* Bell shape with geometric precision */}
      <path 
        d="M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5V5.5C16.3487 6.31356 18 8.71043 18 11.5V15.5L19.7071 17.2071C20.0976 17.5976 20.0976 18.2308 19.7071 18.6213C19.3166 19.0118 18.6834 19.0118 18.2929 18.6213L18 18.328V18.5C18 19.3284 17.3284 20 16.5 20H7.5C6.67157 20 6 19.3284 6 18.5V18.328L5.70711 18.6213C5.31658 19.0118 4.68342 19.0118 4.29289 18.6213C3.90237 18.2308 3.90237 17.5976 4.29289 17.2071L6 15.5V11.5C6 8.71043 7.65131 6.31356 10 5.5V5Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Bottom element */}
      <path 
        d="M10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Notification dot (conditionally rendered) */}
      {hasNotification && (
        <circle 
          cx="17" 
          cy="7" 
          r="3" 
          fill={notificationColor} 
          stroke="none" 
        />
      )}
    </svg>
  );
};

export default NotificationIcon;
