import React from 'react';
import { Table as AntTable, TableProps as AntTableProps } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';
import { transitions } from '@/ui/animations/transitions';

export interface TableProps<RecordType extends object = any> extends AntTableProps<RecordType> {
  animated?: boolean;
  cyberpunk?: boolean;
  animateRows?: boolean;
}

/**
 * Enhanced Table component with animation support
 */
export function Table<RecordType extends object = any>({
  animated = true,
  cyberpunk = false,
  animateRows = true,
  className = '',
  ...props
}: TableProps<RecordType>) {
  const { reducedMotion } = useMotion();
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotion || !animated) {
    return (
      <AntTable 
        className={`
          enhanced-table 
          ${cyberpunk ? 'cyberpunk-table' : ''} 
          ${className}
        `} 
        {...props} 
      />
    );
  }

  // Custom row render function to add animations
  const customRowRender = (record: RecordType, index: number, indent: number, expanded: boolean) => {
    return {
      style: {
        animationDelay: `${index * 0.05}s`,
      },
      className: 'animated-table-row',
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AntTable 
        className={`
          enhanced-table 
          ${cyberpunk ? 'cyberpunk-table' : ''} 
          ${animateRows ? 'animate-rows' : ''}
          ${className}
        `} 
        onRow={animateRows ? customRowRender : undefined}
        {...props} 
      />
    </motion.div>
  );
}

export default Table;