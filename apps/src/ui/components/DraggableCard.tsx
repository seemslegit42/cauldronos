import React, { useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Card, CardProps } from 'antd';
import { cx } from '../utils/styleUtils';

export interface DraggableCardProps extends CardProps {
  dragHandleClassName?: string;
  onDragStop?: (e: DraggableEvent, data: DraggableData) => void;
  defaultPosition?: { x: number; y: number };
  bounds?: string | HTMLElement;
  disabled?: boolean;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  children,
  className,
  dragHandleClassName = 'drag-handle',
  onDragStop,
  defaultPosition = { x: 0, y: 0 },
  bounds = 'parent',
  disabled = false,
  ...cardProps
}) => {
  const [position, setPosition] = useState(defaultPosition);

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
    if (onDragStop) {
      onDragStop(e, data);
    }
  };

  return (
    <Draggable
      handle={`.${dragHandleClassName}`}
      defaultPosition={defaultPosition}
      position={position}
      onStop={handleDragStop}
      bounds={bounds}
      disabled={disabled}
    >
      <div className={cx('draggable-card-wrapper', className)}>
        <Card
          {...cardProps}
          className={cx('draggable-card', cardProps.className)}
        >
          <div className={cx(dragHandleClassName, 'cursor-move mb-2 h-6 bg-gray-100 dark:bg-gray-800 rounded')} />
          {children}
        </Card>
      </div>
    </Draggable>
  );
};

export default DraggableCard;
