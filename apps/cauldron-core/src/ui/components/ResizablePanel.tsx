import React, { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { Card } from 'antd';
import { cx } from '../utils/styleUtils';
import 'react-resizable/css/styles.css';

export interface ResizablePanelProps extends Omit<ResizableBoxProps, 'width' | 'height'> {
  title?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  resizeHandles?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>;
  children: React.ReactNode;
  bordered?: boolean;
  extra?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  title,
  className,
  contentClassName,
  defaultWidth = 300,
  defaultHeight = 200,
  minWidth = 200,
  minHeight = 100,
  maxWidth = 800,
  maxHeight = 600,
  resizeHandles = ['se'],
  children,
  bordered = true,
  extra,
  bodyStyle,
  ...resizableProps
}) => {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);

  // Update dimensions when defaults change
  useEffect(() => {
    setWidth(defaultWidth);
  }, [defaultWidth]);

  useEffect(() => {
    setHeight(defaultHeight);
  }, [defaultHeight]);

  const handleResize = (
    _event: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } }
  ) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  return (
    <ResizableBox
      width={width}
      height={height}
      minConstraints={[minWidth, minHeight]}
      maxConstraints={[maxWidth, maxHeight]}
      onResize={handleResize}
      resizeHandles={resizeHandles}
      handle={
        <div className="react-resizable-handle custom-resize-handle">
          <div className="resize-indicator" />
        </div>
      }
      className={cx('resizable-panel-container', className)}
      {...resizableProps}
    >
      <Card
        title={title}
        bordered={bordered}
        className={cx('resizable-panel-card', contentClassName)}
        style={{ width: '100%', height: '100%' }}
        bodyStyle={{ overflow: 'auto', ...bodyStyle }}
        extra={extra}
      >
        {children}
      </Card>
    </ResizableBox>
  );
};

export default ResizablePanel;
