import React from 'react';
import { Row as AntRow } from 'antd';
import type { RowProps as AntRowProps } from 'antd';

export interface RowProps extends AntRowProps {
  // Add any additional props here
}

/**
 * Row component based on Ant Design's Row
 * Part of the grid system
 */
export const Row: React.FC<RowProps> = (props) => {
  return <AntRow {...props} />;
};

export default Row;
