import React from 'react';
import { List as AntList, ListProps as AntListProps } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';
import { transitions } from '@/ui/animations/transitions';

export interface ListProps<T> extends AntListProps<T> {
  animated?: boolean;
  cyberpunk?: boolean;
  staggerItems?: boolean;
}

/**
 * Enhanced List component with animation support
 */
export function List<T>({
  animated = true,
  cyberpunk = false,
  staggerItems = true,
  className = '',
  renderItem,
  ...props
}: ListProps<T>) {
  const { reducedMotion } = useMotion();
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotion || !animated || !renderItem) {
    return (
      <AntList 
        className={`
          enhanced-list 
          ${cyberpunk ? 'cyberpunk-list' : ''} 
          ${className}
        `} 
        renderItem={renderItem}
        {...props} 
      />
    );
  }

  // Custom renderItem function to add animations
  const animatedRenderItem = (item: T, index: number) => {
    const originalItem = renderItem(item, index);
    
    if (!originalItem) return null;
    
    return (
      <motion.div
        variants={transitions.staggerItem}
        custom={index}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          ...transitions.defaults,
          delay: staggerItems ? index * 0.05 : 0,
        }}
      >
        {originalItem}
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={transitions.staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AntList 
        className={`
          enhanced-list 
          ${cyberpunk ? 'cyberpunk-list' : ''} 
          ${className}
        `} 
        renderItem={animatedRenderItem}
        {...props} 
      />
    </motion.div>
  );
}

// Re-export sub-components
List.Item = AntList.Item;

export default List;