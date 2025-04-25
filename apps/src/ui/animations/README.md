# Animations

This directory contains animation components and utilities for CauldronOS.

## Components

- Animation components built with Framer Motion
- Transition presets
- Animation utilities

## Usage

```jsx
// Using animation components
import { FadeIn, SlideIn } from '@ui/animations';

function Component() {
  return (
    <FadeIn duration={0.3} delay={0.1}>
      <div>This content will fade in</div>
    </FadeIn>
  );
}

// Using animation presets
import { useAnimation } from 'framer-motion';
import { transitions } from '@ui/animations';

function AnimatedComponent() {
  const controls = useAnimation();
  
  return (
    <motion.div
      animate={controls}
      initial="hidden"
      variants={transitions.fadeIn}
      onClick={() => controls.start('visible')}
    >
      Click me to animate
    </motion.div>
  );
}
```

## Animation Guidelines

- Animations should be subtle and purposeful
- Use consistent timing and easing
- Provide accessibility options (reduced motion)
- Optimize for performance

## Animation Presets

- `fadeIn/fadeOut` - Opacity transitions
- `slideIn/slideOut` - Position transitions
- `scaleIn/scaleOut` - Size transitions
- `staggered` - Staggered animations for lists
- `page` - Page transition animations
