import React from 'react';
import Row from './Row';
import Column from './Column';

export interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gutter?: number | [number, number];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Grid component that creates a grid layout with equal columns
 */
export const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  gutter = 16,
  className = '',
  style = {},
}) => {
  // Convert React children to array
  const childrenArray = React.Children.toArray(children);
  
  // Calculate column span based on total columns
  const span = 24 / columns;
  
  return (
    <Row gutter={gutter} className={className} style={style}>
      {childrenArray.map((child, index) => (
        <Column key={index} span={span}>
          {child}
        </Column>
      ))}
    </Row>
  );
};

export default Grid;
