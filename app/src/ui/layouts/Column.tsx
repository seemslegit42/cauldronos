import React from 'react';
import { Col as AntCol } from 'antd';
import type { ColProps as AntColProps } from 'antd';

export interface ColumnProps extends AntColProps {
  // Add any additional props here
}

/**
 * Column component based on Ant Design's Col
 * Part of the grid system
 */
export const Column: React.FC<ColumnProps> = (props) => {
  return <AntCol {...props} />;
};

export default Column;
