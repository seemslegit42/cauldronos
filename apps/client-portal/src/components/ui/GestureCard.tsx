import React, { ReactNode } from 'react';
import { Card } from 'antd';

interface GestureCardProps {
  title: ReactNode;
  children: ReactNode;
  draggable?: boolean;
  swipeable?: boolean;
  cyberpunk?: boolean;
}

export const GestureCard: React.FC<GestureCardProps> = ({
  title,
  children,
  draggable = false,
  swipeable = false,
  cyberpunk = false
}) => {
  return (
    <Card title={title} className="bg-gray-900 border-gray-700 shadow-md">
      {children}
    </Card>
  );
};

export default GestureCard;
