# @cauldronos/ui

This package contains all the shared UI components for the CauldronOS platform, following atomic design principles with AI-native features and motion intelligence.

## Structure

- `atoms/`: Basic building blocks (Button, Input, Typography, etc.)
- `molecules/`: Combinations of atoms (Card, AnimatedCard, Form, Menu, AISearchBar, InsightCard, GestureCard, etc.)
- `organisms/`: Complex components (Header, Sidebar, SmartTable, PredictiveForm, etc.)
- `templates/`: Page layouts (DashboardLayout, AuthLayout, etc.)
- `theme/`: Theme-related utilities and components
- `animations/`: Animation components and utilities with gesture support
- `hooks/`: Custom React hooks for accessibility and more
- `utils/`: Utility functions for accessibility and other features
- `types/`: TypeScript type definitions

## Usage

```tsx
import {
  Button,
  AnimatedCard,
  SmartTable,
  DashboardLayout,
  ThemeProvider,
  FadeIn,
  SlideIn,
  AISearchBar,
  InsightCard,
  PredictiveForm,
  GestureCard,
  PageTransition,
  useAccessibility
} from '@cauldronos/ui';

// Use components in your app
const MyApp = () => (
  <ThemeProvider>
    <PageTransition type="slide" direction="up" cyberpunk>
      <DashboardLayout>
        <AISearchBar
          placeholder="Search..."
          onAISearch={async (query) => {
            // Call AI API to get suggestions
            return [`Results for "${query}"`, `Information about "${query}"`];
          }}
          cyberpunk
        />

        <FadeIn>
          <AnimatedCard
            title="Welcome"
            animationVariant="hover"
          >
            <SlideIn direction="up" delay={0.2}>
              <p>Get started with CauldronOS</p>
              <Button type="primary">Launch</Button>
            </SlideIn>
          </AnimatedCard>
        </FadeIn>

        <GestureCard
          title="Gesture Card"
          draggable
          swipeable
          cyberpunk
        >
          <p>Try dragging or swiping this card</p>
        </GestureCard>

        <InsightCard
          insight={{
            title: 'User Growth Trend',
            description: 'User growth has increased by 12.5% in the last month.',
            type: 'trend',
            metrics: [{ name: 'Growth', value: '12.5%', change: 5.0, changeType: 'increase' }],
            recommendations: ['Continue current marketing strategies']
          }}
          cyberpunk
        />

        <SmartTable
          title="Data Analysis"
          columns={columns}
          dataSource={data}
          insights
          patternDetection
          anomalyHighlighting
        />

        <PredictiveForm
          learningMode="active"
          showAICompletion
          showAIValidation
          cyberpunk
        >
          {/* Form fields */}
        </PredictiveForm>
      </DashboardLayout>
    </PageTransition>
  </ThemeProvider>
);
```

## Design Principles

- **Intelligence First**: Components anticipate user needs and provide smart defaults
- **Motion with Meaning**: Animation enhances understanding and provides feedback
- **Consistency and Coherence**: Unified experience across all interfaces
- **Accessibility and Inclusivity**: Design for all users, regardless of ability

## Technical Foundation

- Built with Ant Design, Ant Design X, and Ant Design Pro components
- Enhanced with Framer Motion for fluid animations, micro-interactions, and gesture support
- Supports dark mode and responsive design out of the box
- Uses TailwindCSS for styling with the `twMerge` utility
- Form components use Zod for validation
- AI-native components provide intelligent features and adaptability
- Accessibility features built-in with ARIA support and keyboard navigation
- Storybook documentation for component usage and testing

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run in watch mode during development
pnpm dev

# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

## Documentation

For detailed documentation on component usage and the design system, refer to:

- [design-system.json](../../design-system.json) - Color tokens, spacing, typography, component variants
- [component-map.md](../../component-map.md) - Old ➡️ New components list with replacement rationale
- [usage-guide.md](../../usage-guide.md) - A short dev guide on how to build UI "The Cauldron Way™"
- [component-guide.md](./docs/component-guide.md) - Detailed documentation for all components
- [accessibility-guide.md](./docs/accessibility-guide.md) - Guide for creating accessible components

### Storybook

The UI package includes a Storybook for component documentation and testing. Run `pnpm storybook` to view the component documentation with interactive examples.

### New AI-Native Components

#### AISearchBar

An intelligent search bar with AI-powered suggestions, recent searches, and natural language processing capabilities.

#### InsightCard

A card component for displaying AI-generated insights with metrics, recommendations, and interactive features.

#### PredictiveForm

An AI-enhanced form component that provides intelligent features like smart defaults, suggestions, auto-validation, and insights.

#### EnhancedPredictiveForm

An advanced version of PredictiveForm with additional features like thought process visualization, voice input, chat assistance, and field importance indicators.

#### AIForm

A Zod-powered form component with AI assistance, smart suggestions, and real-time validation.

#### GestureCard

A card component with gesture-based interactions like drag, swipe, and pinch.

#### CyberpunkCard

A stylized card component with cyberpunk aesthetics including glow effects, scanlines, and animated interactions.

### Animation Components

#### PageTransition

A wrapper component that adds smooth transitions to page content using Framer Motion animations.

#### FadeIn

A simple wrapper component that fades in its children.

#### SlideIn

A wrapper component that slides in its children from a specified direction.

#### Stagger

A container component that animates its children in a staggered sequence.

### Accessibility

The UI package includes built-in accessibility features through the `useAccessibility` hook and accessibility utilities. See the [Accessibility Guide](./docs/accessibility-guide.md) for more information.