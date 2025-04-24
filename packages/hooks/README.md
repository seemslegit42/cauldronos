# @cauldronos/hooks

This package contains all the shared React hooks for the CauldronOS platform.

## Categories

- **Data Hooks**: For data fetching, caching, and state management
- **Auth Hooks**: For authentication and authorization
- **UI Hooks**: For UI state and interactions
- **Motion Hooks**: For animations and transitions using Framer Motion

## Usage

```tsx
import { useMediaQuery, useSidebar, useStaggerAnimation } from '@cauldronos/hooks';

// Use hooks in your components
const MyComponent = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { collapsed, toggleSidebar } = useSidebar();
  const staggerVariants = useStaggerAnimation(0.1, 0.2);
  
  return (
    <div>
      {isMobile ? 'Mobile View' : 'Desktop View'}
      <button onClick={toggleSidebar}>
        {collapsed ? 'Expand' : 'Collapse'} Sidebar
      </button>
      
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Children will animate with staggered timing */}
        <motion.div variants={staggerVariants}>Item 1</motion.div>
        <motion.div variants={staggerVariants}>Item 2</motion.div>
        <motion.div variants={staggerVariants}>Item 3</motion.div>
      </motion.div>
    </div>
  );
};
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run in watch mode during development
pnpm dev
```