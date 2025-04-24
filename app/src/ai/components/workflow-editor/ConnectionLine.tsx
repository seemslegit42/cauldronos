import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './WorkflowEditor.css';

// Define the types for connection line props
interface ConnectionLineProps {
  sourceId: string;
  targetId: string;
  sourceType: 'agent' | 'task';
  targetType: 'agent' | 'task';
  animated?: boolean;
}

/**
 * ConnectionLine - A visual representation of a connection between nodes in the workflow editor
 */
const ConnectionLine: React.FC<ConnectionLineProps> = ({
  sourceId,
  targetId,
  sourceType,
  targetType,
  animated = true
}) => {
  // State for the line coordinates
  const [line, setLine] = useState({
    x1: 0, y1: 0, x2: 0, y2: 0
  });

  // Effect to calculate the line coordinates
  useEffect(() => {
    const calculateLineCoordinates = () => {
      // Get the source and target elements
      const sourceElement = document.querySelector(`[data-${sourceType}-id="${sourceId}"]`);
      const targetElement = document.querySelector(`[data-${targetType}-id="${targetId}"]`);
      
      if (!sourceElement || !targetElement) {
        return;
      }
      
      // Get the bounding rectangles
      const sourceRect = sourceElement.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      
      // Calculate the center points
      const sourceX = sourceRect.left + sourceRect.width / 2;
      const sourceY = sourceRect.top + sourceRect.height / 2;
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;
      
      // Set the line coordinates
      setLine({
        x1: sourceX,
        y1: sourceY,
        x2: targetX,
        y2: targetY
      });
    };
    
    // Calculate the initial coordinates
    calculateLineCoordinates();
    
    // Add a resize event listener
    window.addEventListener('resize', calculateLineCoordinates);
    
    // Add a scroll event listener
    document.addEventListener('scroll', calculateLineCoordinates);
    
    // Clean up the event listeners
    return () => {
      window.removeEventListener('resize', calculateLineCoordinates);
      document.removeEventListener('scroll', calculateLineCoordinates);
    };
  }, [sourceId, targetId, sourceType, targetType]);

  // Animation variants
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <svg
      className="connection-line"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <motion.path
        d={`M${line.x1},${line.y1} C${line.x1},${(line.y1 + line.y2) / 2} ${line.x2},${(line.y1 + line.y2) / 2} ${line.x2},${line.y2}`}
        fill="none"
        stroke="#3DAA9D"
        strokeWidth="2"
        strokeDasharray={animated ? "5,5" : "none"}
        variants={animated ? pathVariants : undefined}
        initial="hidden"
        animate="visible"
      />
      <motion.circle
        cx={line.x2}
        cy={line.y2}
        r="4"
        fill="#3DAA9D"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      />
    </svg>
  );
};

export default ConnectionLine;
