import { useRef, useState, useEffect } from 'react';
import { useMotionValue, useTransform, useAnimation, PanInfo, MotionValue } from 'framer-motion';

export interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export interface SwipeOptions {
  threshold?: number;
  velocity?: number;
  preventScroll?: boolean;
  preventDefaultTouchmove?: boolean;
}

/**
 * Hook for handling swipe gestures
 * 
 * @param handlers - Swipe event handlers
 * @param options - Swipe options
 * @returns - Handlers for motion components
 */
export const useSwipe = (
  handlers: SwipeHandlers,
  options: SwipeOptions = {}
) => {
  const {
    threshold = 50,
    velocity = 0.3,
    preventScroll = false,
    preventDefaultTouchmove = false,
  } = options;

  const handleDragEnd = (_: any, info: PanInfo) => {
    const { offset, velocity: dragVelocity } = info;
    const [offsetX, offsetY] = offset;
    const [velocityX, velocityY] = dragVelocity;

    // Check if the swipe was horizontal or vertical
    const isHorizontal = Math.abs(offsetX) > Math.abs(offsetY);

    if (isHorizontal) {
      if (offsetX > threshold && velocityX > velocity && handlers.onSwipeRight) {
        handlers.onSwipeRight();
      } else if (offsetX < -threshold && velocityX < -velocity && handlers.onSwipeLeft) {
        handlers.onSwipeLeft();
      }
    } else {
      if (offsetY > threshold && velocityY > velocity && handlers.onSwipeDown) {
        handlers.onSwipeDown();
      } else if (offsetY < -threshold && velocityY < -velocity && handlers.onSwipeUp) {
        handlers.onSwipeUp();
      }
    }
  };

  // Prevent default touch behavior if needed
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (preventDefaultTouchmove) {
        e.preventDefault();
      }
      if (preventScroll) {
        e.stopPropagation();
      }
    };

    if (preventDefaultTouchmove || preventScroll) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (preventDefaultTouchmove || preventScroll) {
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [preventDefaultTouchmove, preventScroll]);

  return {
    drag: true,
    dragElastic: 0.7,
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    onDragEnd: handleDragEnd,
  };
};

export interface PinchHandlers {
  onPinchIn?: (scale: number) => void;
  onPinchOut?: (scale: number) => void;
  onPinchEnd?: (scale: number) => void;
}

export interface PinchOptions {
  minScale?: number;
  maxScale?: number;
}

/**
 * Hook for handling pinch gestures
 * 
 * @param handlers - Pinch event handlers
 * @param options - Pinch options
 * @returns - Motion values and handlers
 */
export const usePinch = (
  handlers: PinchHandlers,
  options: PinchOptions = {}
) => {
  const {
    minScale = 0.5,
    maxScale = 2,
  } = options;

  const scale = useMotionValue(1);
  const previousScale = useRef(1);
  const [isPinching, setIsPinching] = useState(false);

  const handlePinch = (e: any) => {
    const newScale = Math.min(Math.max(e.scale, minScale), maxScale);
    scale.set(newScale);

    if (newScale > previousScale.current && handlers.onPinchOut) {
      handlers.onPinchOut(newScale);
    } else if (newScale < previousScale.current && handlers.onPinchIn) {
      handlers.onPinchIn(newScale);
    }

    previousScale.current = newScale;
    setIsPinching(true);
  };

  const handlePinchEnd = () => {
    if (handlers.onPinchEnd) {
      handlers.onPinchEnd(scale.get());
    }
    setIsPinching(false);
  };

  return {
    scale,
    isPinching,
    pinchHandlers: {
      onPinch: handlePinch,
      onPinchEnd: handlePinchEnd,
    },
  };
};

export interface DragHandlers {
  onDragStart?: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  onDrag?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEnd?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export interface DragOptions {
  axis?: 'x' | 'y' | 'both';
  bounds?: { left?: number; right?: number; top?: number; bottom?: number };
  elastic?: number;
  initial?: { x?: number; y?: number };
}

/**
 * Hook for handling drag gestures
 * 
 * @param handlers - Drag event handlers
 * @param options - Drag options
 * @returns - Motion values and handlers
 */
export const useDrag = (
  handlers: DragHandlers,
  options: DragOptions = {}
) => {
  const {
    axis = 'both',
    bounds = {},
    elastic = 0.5,
    initial = { x: 0, y: 0 },
  } = options;

  const x = useMotionValue(initial.x || 0);
  const y = useMotionValue(initial.y || 0);
  const controls = useAnimation();

  const dragProps = {
    drag: axis === 'both' ? true : axis,
    dragElastic: elastic,
    dragConstraints: bounds,
    dragMomentum: false,
    onDragStart: handlers.onDragStart,
    onDrag: handlers.onDrag,
    onDragEnd: handlers.onDragEnd,
    animate: controls,
    style: { x, y },
  };

  return {
    x,
    y,
    controls,
    dragProps,
  };
};

export interface ScrollOptions {
  threshold?: number;
  direction?: 'vertical' | 'horizontal' | 'both';
}

/**
 * Hook for creating scroll-linked animations
 * 
 * @param scrollY - Motion value for scroll position
 * @param options - Scroll options
 * @returns - Transformed motion value
 */
export const useScrollTransform = (
  scrollY: MotionValue<number>,
  inputRange: number[],
  outputRange: any[],
  options: ScrollOptions = {}
) => {
  const { direction = 'vertical' } = options;
  
  const transformedValue = useTransform(
    scrollY,
    inputRange,
    outputRange
  );

  return transformedValue;
};

export default {
  useSwipe,
  usePinch,
  useDrag,
  useScrollTransform,
};
