# CauldronOS Design System

This document outlines the design system for CauldronOS, providing guidelines for consistent UI/UX development.

## Table of Contents

1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Components](#components)
6. [Animations](#animations)
7. [Accessibility](#accessibility)
8. [Usage Guidelines](#usage-guidelines)

## Design Principles

CauldronOS follows these core design principles:

- **AI-First**: Interfaces should feel intelligent and anticipate user needs
- **Cyberpunk Aesthetic**: Modern, sleek, with subtle sci-fi influences
- **Responsive & Adaptive**: Works seamlessly across all devices
- **Accessible**: Usable by everyone, regardless of abilities
- **Performant**: Fast, smooth, and efficient
- **Consistent**: Predictable patterns and behaviors
- **Clear & Simple**: UIs should be visually clear and uncluttered
- **Visually Hierarchical**: Use visual cues to establish information hierarchy

## Brand Identity

CauldronOS branding includes:
- Abstract Node Hex logo
- Manrope for headings
- Inter for body text
- JetBrains Mono for code
- Void Purple, Flux Aqua as primary colors
- Confident, witty brand voice

## Color System

Our color system is built around a cyberpunk-inspired palette:

### Primary Colors

- **Void Purple** (`#4A0D67`): Deep purple for primary backgrounds and brand identity
- **Flux Aqua** (`#3DAA9D`): Electric aqua for primary actions and accents

### Accent Colors

- **Alchemy Gold** (`#B8860B`): Muted gold for success states and profit indicators
- **Warning Amber** (`#FFD166`): Bright amber for warnings
- **Error Red** (`#EF476F`): Vibrant red for errors

### Neutral Colors

#### Dark Mode (Default)
- **Obsidian Black** (`#0D1117`): Deep blue-black for backgrounds
- **Dark Gray** (various): For UI elements and containers
- **Light Gray** (various): For text and borders

#### Light Mode
- **White** (`#FFFFFF`): For backgrounds
- **Light Gray** (various): For UI elements and containers
- **Dark Gray** (various): For text and borders

### Cyberpunk Accents

- **Cyan** (`#00F0FF`): Electric cyan for highlights
- **Purple** (`#BD00FF`): Neon purple for special elements
- **Pink** (`#FF0099`): Hot pink for emphasis

## Typography

CauldronOS uses a carefully selected set of fonts:

- **Headings**: Manrope - Clean, modern, with subtle technical character
- **Body**: Inter - Highly readable, neutral, works well at all sizes
- **Code**: JetBrains Mono - Monospaced font with excellent readability for code

### Font Sizes

- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 28px
- 4xl: 32px
- 5xl: 36px
- 6xl: 48px

### Font Weights

- normal: 400
- medium: 500
- semibold: 600
- bold: 700

## Spacing

CauldronOS uses an 8px grid system for consistent spacing:

- 0: 0
- 0.5: 4px
- 1: 8px
- 2: 16px
- 3: 24px
- 4: 32px
- 5: 40px
- 6: 48px
- 7: 56px
- 8: 64px
- 9: 72px
- 10: 80px
- 12: 96px
- 16: 128px
- 20: 160px
- 24: 192px

## Components

CauldronOS uses enhanced Ant Design components with custom styling and animations.

### Component Categories

1. **Form Components**
   - Input, Select, Button, Checkbox, Switch, DatePicker, Upload
   - ZodForm for schema validation

2. **Data Display**
   - Card, Table, List

3. **Layout**
   - PageContainer, ProLayout

4. **AI Components**
   - AIInput, AITable, AIForm

5. **Animation Components**
   - FadeIn, SlideIn, ScaleIn, Stagger, PageTransition
   - AnimatedModal, AnimatedDrawer

### Component Usage

```jsx
// Import components from the UI library
import { 
  Button, 
  Card, 
  Input, 
  ZodForm, 
  ZodFormItem 
} from '@/ui/components';

// Use components with enhanced features
function MyComponent() {
  return (
    <Card 
      title="My Card" 
      hoverable 
      glowOnHover 
      cyberpunk
    >
      <ZodForm
        schema={mySchema}
        onSubmit={handleSubmit}
      >
        <ZodFormItem name="name" label="Name">
          <Input placeholder="Enter your name" />
        </ZodFormItem>
        
        <Button type="primary" htmlType="submit" cyberpunk>
          Submit
        </Button>
      </ZodForm>
    </Card>
  );
}
```

## Animations

CauldronOS uses Framer Motion for smooth, performant animations.

### Animation Principles

- Subtle and purposeful
- Consistent timing and easing
- Respect user preferences (reduced motion)
- Enhance rather than distract

### Animation Types

1. **Transitions**: Page transitions, route changes
2. **Feedback**: Button clicks, form submissions
3. **State Changes**: Loading states, errors, success
4. **Micro-interactions**: Hover effects, focus states
5. **Attention**: Drawing attention to important elements

### Animation Usage

```jsx
import { 
  FadeIn, 
  SlideIn, 
  motion 
} from '@/ui/animations';

// Using animation components
function MyComponent() {
  return (
    <FadeIn>
      <div>This content will fade in</div>
    </FadeIn>
  );
}

// Using motion directly
function MyMotionComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      This will animate too
    </motion.div>
  );
}
```

## Accessibility

CauldronOS is committed to accessibility:

- **Color Contrast**: All text meets WCAG AA standards
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Respects user preferences for reduced motion
- **Focus Indicators**: Clear focus states for keyboard users

## Usage Guidelines

### Theme Configuration

The theme can be configured using the theme store:

```jsx
import { useThemeStore } from '@/styles/themeStore';

function ThemeToggle() {
  const { mode, setMode } = useThemeStore();
  
  return (
    <Button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </Button>
  );
}
```

### Responsive Design

CauldronOS is mobile-first and fully responsive:

- Use the provided responsive utilities
- Test on multiple device sizes
- Use the breakpoints defined in the design system

### AI Integration

When using AI components:

- Provide clear feedback when AI is processing
- Allow users to override AI suggestions
- Use AI to enhance, not replace, user control
- Respect user privacy and data

## Contributing

When adding to the design system:

1. Follow the established patterns and guidelines
2. Document any new additions or changes
3. Include examples and usage guidelines
4. Ensure accessibility compliance

---

This design system is a living document and will evolve as CauldronOS grows.
