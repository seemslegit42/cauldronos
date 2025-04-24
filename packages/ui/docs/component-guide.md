# Component Guide for CauldronOS UI

This guide provides information on how to use the components in the CauldronOS UI package.

## Table of Contents

1. [Introduction](#introduction)
2. [AI-Native Components](#ai-native-components)
   - [AISearchBar](#aisearchbar)
   - [InsightCard](#insightcard)
   - [PredictiveForm](#predictiveform)
   - [EnhancedPredictiveForm](#enhancedpredictiveform)
   - [AIForm](#aiform)
3. [Animation Components](#animation-components)
   - [PageTransition](#pagetransition)
   - [FadeIn](#fadein)
   - [SlideIn](#slidein)
   - [Stagger](#stagger)
   - [GestureCard](#gesturecard)
4. [Card Components](#card-components)
   - [CyberpunkCard](#cyberpunkcard)
4. [Accessibility](#accessibility)
5. [Storybook](#storybook)

## Introduction

The CauldronOS UI package provides a set of components for building AI-native, accessible, and animated user interfaces. This guide provides information on how to use these components.

## AI-Native Components

### AISearchBar

The `AISearchBar` component is an intelligent search bar with AI-powered suggestions, recent searches, and natural language processing capabilities.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placeholder` | `string` | `'Search...'` | Placeholder text for the search input |
| `onSearch` | `(value: string) => void` | - | Callback when search is submitted |
| `onAISearch` | `(value: string) => Promise<string[]>` | - | Callback when AI-assisted search is requested |
| `recentSearches` | `boolean` | `true` | Whether to show recent searches |
| `maxRecentSearches` | `number` | `5` | Maximum number of recent searches to show |
| `suggestionsSource` | `'none' \| 'static' \| 'user-behavior' \| 'ai'` | `'ai'` | Source of suggestions |
| `suggestions` | `string[]` | - | Static suggestions to show |
| `scope` | `'global' \| 'current' \| 'custom'` | `'global'` | Scope of the search |
| `scopeOptions` | `{ label: string; value: string }[]` | - | Custom scope options |
| `allowVoiceInput` | `boolean` | `false` | Whether to allow voice input |
| `className` | `string` | - | Additional CSS class |
| `style` | `React.CSSProperties` | - | Style object |
| `showSearchButton` | `boolean` | `true` | Whether to show the search button |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` | Size of the search bar |
| `cyberpunk` | `boolean` | `false` | Whether to apply cyberpunk styling |
| `loading` | `boolean` | `false` | Whether the search is loading |

#### Example

```tsx
import { AISearchBar } from '@cauldronos/ui';

const MyComponent = () => {
  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };
  
  const handleAISearch = async (value: string) => {
    // Call AI API to get suggestions
    return [
      `Results for "${value}"`,
      `Information about "${value}"`,
      `Data related to "${value}"`,
    ];
  };
  
  return (
    <AISearchBar
      placeholder="Search..."
      onSearch={handleSearch}
      onAISearch={handleAISearch}
      recentSearches={true}
      maxRecentSearches={5}
      suggestionsSource="ai"
      scope="global"
      allowVoiceInput={true}
      cyberpunk={true}
    />
  );
};
```

### InsightCard

The `InsightCard` component is a card component for displaying AI-generated insights with metrics, recommendations, and interactive features.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `insight` | `InsightData` | - | Insight data to display |
| `loading` | `boolean` | `false` | Whether the card is loading |
| `showSource` | `boolean` | `true` | Whether to show the source of the insight |
| `showConfidence` | `boolean` | `true` | Whether to show the confidence level |
| `showTimestamp` | `boolean` | `true` | Whether to show the timestamp |
| `showTags` | `boolean` | `true` | Whether to show tags |
| `showMetrics` | `boolean` | `true` | Whether to show metrics |
| `showRecommendations` | `boolean` | `true` | Whether to show recommendations |
| `showActions` | `boolean` | `true` | Whether to show actions (pin, share, etc.) |
| `refreshable` | `boolean` | `true` | Whether to allow refreshing the insight |
| `onRefresh` | `() => void` | - | Callback when refresh is clicked |
| `onPin` | `() => void` | - | Callback when pin is clicked |
| `onShare` | `() => void` | - | Callback when share is clicked |
| `isPinned` | `boolean` | `false` | Whether the insight is pinned |
| `className` | `string` | - | Additional CSS class |
| `style` | `React.CSSProperties` | - | Style object |
| `cyberpunk` | `boolean` | `false` | Whether to apply cyberpunk styling |
| `defaultExpanded` | `boolean` | `false` | Whether to show the expanded view by default |
| `chartComponent` | `React.ReactNode` | - | Custom chart component to render |

#### Example

```tsx
import { InsightCard } from '@cauldronos/ui';

const MyComponent = () => {
  const insight = {
    title: 'User Growth Trend',
    description: 'User growth has increased by 12.5% in the last month, which is 5% higher than the previous month. This suggests that recent marketing campaigns have been effective.',
    source: 'User Analytics',
    confidence: 0.85,
    timestamp: new Date(),
    tags: ['Users', 'Growth', 'Marketing'],
    type: 'trend',
    metrics: [
      {
        name: 'Current Month',
        value: '12.5%',
        change: 5.0,
        changeType: 'increase',
      },
      {
        name: 'Previous Month',
        value: '7.5%',
        change: 0,
        changeType: 'neutral',
      },
      {
        name: 'Average',
        value: '8.2%',
        change: 0,
        changeType: 'neutral',
      },
    ],
    recommendations: [
      'Continue current marketing strategies',
      'Focus on user retention to maintain growth',
      'Analyze which channels are driving the most growth',
    ],
  };
  
  return (
    <InsightCard
      insight={insight}
      cyberpunk={true}
      showRecommendations={true}
      defaultExpanded={false}
      onRefresh={() => console.log('Refresh clicked')}
      onPin={() => console.log('Pin clicked')}
      onShare={() => console.log('Share clicked')}
    />
  );
};
```

### PredictiveForm

The `PredictiveForm` component is an AI-enhanced form component that provides intelligent features like smart defaults, suggestions, auto-validation, and insights.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `learningMode` | `'passive' \| 'active' \| 'aggressive'` | `'passive'` | Learning mode for the form |
| `contextId` | `string` | - | Context ID for the form to associate learning with specific forms |
| `showSuggestions` | `boolean` | `true` | Whether to show suggestions |
| `showInsights` | `boolean` | `false` | Whether to show insights about the form data |
| `autoValidate` | `boolean` | `true` | Whether to auto-validate fields as user types |
| `smartDefaults` | `boolean` | `true` | Whether to show smart defaults |
| `onSuggestion` | `(fieldName: string, value: any) => void` | - | Custom suggestion handler |
| `onAIComplete` | `(values: Record<string, any>) => Promise<Record<string, any>>` | - | Callback when AI completes the form |
| `onAIValidate` | `(values: Record<string, any>) => Promise<{ valid: boolean; issues?: string[] }>` | - | Callback when AI validates the form |
| `showAICompletion` | `boolean` | `false` | Whether to show the AI completion button |
| `showAIValidation` | `boolean` | `false` | Whether to show the AI validation button |
| `showCompletionProgress` | `boolean` | `true` | Whether to show the form completion progress |
| `cyberpunk` | `boolean` | `false` | Whether to apply cyberpunk styling |
| `aiModel` | `string` | `'default'` | AI model to use for suggestions and completion |
| `fieldDependencies` | `Record<string, string[]>` | - | Field dependencies for smart suggestions |

#### Example

```tsx
import { PredictiveForm } from '@cauldronos/ui';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const MyComponent = () => {
  const handleFormSubmit = (values: any) => {
    console.log('Form submitted:', values);
  };
  
  const handleAIComplete = async (values: any) => {
    // Call AI API to complete form
    return {
      ...values,
      name: values.name || 'John Doe',
      email: values.email || 'john.doe@example.com',
      occupation: values.occupation || 'Software Engineer',
    };
  };
  
  const handleAIValidate = async (values: any) => {
    // Call AI API to validate form
    const issues = [];
    
    if (!values.name) {
      issues.push('Name is required');
    }
    
    if (values.email && !values.email.includes('@')) {
      issues.push('Email must be valid');
    }
    
    return {
      valid: issues.length === 0,
      issues,
    };
  };
  
  return (
    <PredictiveForm
      onFinish={handleFormSubmit}
      learningMode="active"
      contextId="user-form"
      showSuggestions={true}
      showInsights={true}
      autoValidate={true}
      smartDefaults={true}
      showAICompletion={true}
      showAIValidation={true}
      onAIComplete={handleAIComplete}
      onAIValidate={handleAIValidate}
      cyberpunk={true}
      fieldDependencies={{
        bio: ['occupation'],
      }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>
      
      <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
        <Input placeholder="Enter your email" />
      </Form.Item>
      
      <Form.Item name="occupation" label="Occupation">
        <Select placeholder="Select your occupation">
          <Option value="software-engineer">Software Engineer</Option>
          <Option value="designer">Designer</Option>
          <Option value="product-manager">Product Manager</Option>
          <Option value="data-scientist">Data Scientist</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      
      <Form.Item name="bio" label="Bio">
        <Input.TextArea placeholder="Tell us about yourself" rows={4} />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </PredictiveForm>
  );
};
```

### EnhancedPredictiveForm

The `EnhancedPredictiveForm` component is an advanced version of PredictiveForm with additional features like thought process visualization, voice input, chat assistance, and field importance indicators.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `learningMode` | `'passive' \| 'active' \| 'aggressive'` | `'passive'` | Learning mode for the form |
| `contextId` | `string` | - | Context ID for the form to associate learning with specific forms |
| `showSuggestions` | `boolean` | `true` | Whether to show suggestions |
| `showInsights` | `boolean` | `false` | Whether to show insights about the form data |
| `autoValidate` | `boolean` | `true` | Whether to auto-validate fields as user types |
| `smartDefaults` | `boolean` | `true` | Whether to show smart defaults |
| `onSuggestion` | `(fieldName: string, value: any) => void` | - | Custom suggestion handler |
| `onAIComplete` | `(values: Record<string, any>) => Promise<Record<string, any>>` | - | Callback when AI completes the form |
| `onAIValidate` | `(values: Record<string, any>) => Promise<{ valid: boolean; issues?: string[] }>` | - | Callback when AI validates the form |
| `showAICompletion` | `boolean` | `true` | Whether to show the AI completion button |
| `showAIValidation` | `boolean` | `true` | Whether to show the AI validation button |
| `showCompletionProgress` | `boolean` | `true` | Whether to show the form completion progress |
| `cyberpunk` | `boolean` | `false` | Whether to apply cyberpunk styling |
| `aiModel` | `string` | `'default'` | AI model to use for suggestions and completion |
| `fieldDependencies` | `Record<string, string[]>` | `{}` | Field dependencies for smart suggestions |
| `showThoughtProcess` | `boolean` | `false` | Whether to show the AI thought process |
| `showFieldHistory` | `boolean` | `false` | Whether to show field history |
| `enableVoiceInput` | `boolean` | `false` | Whether to show voice input option |
| `showRecommendations` | `boolean` | `true` | Whether to show field recommendations |
| `showAIChat` | `boolean` | `false` | Whether to show the AI chat interface for form assistance |
| `predefinedPrompts` | `Array<{ key: string; label: React.ReactNode; description: string; }>` | `[]` | Predefined prompts for the form |
| `onPromptSelect` | `(promptKey: string) => void` | - | Callback when user selects a predefined prompt |
| `showFieldImportance` | `boolean` | `false` | Whether to show field importance indicators |
| `fieldImportance` | `Record<string, 'high' \| 'medium' \| 'low'>` | `{}` | Field importance ratings |

#### Example

```tsx
import { EnhancedPredictiveForm } from '@cauldronos/ui';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const MyComponent = () => {
  const handleFormSubmit = (values: any) => {
    console.log('Form submitted:', values);
  };
  
  const handleAIComplete = async (values: any) => {
    // Call AI API to complete form
    return {
      ...values,
      name: values.name || 'John Doe',
      email: values.email || 'john.doe@example.com',
      phone: values.phone || '555-123-4567',
      country: values.country || 'United States',
    };
  };
  
  const handleAIValidate = async (values: any) => {
    // Call AI API to validate form
    const issues = [];
    
    if (!values.name) {
      issues.push('Name is required');
    }
    
    if (values.email && !values.email.includes('@')) {
      issues.push('Email must be valid');
    }
    
    return {
      valid: issues.length === 0,
      issues,
    };
  };
  
  const predefinedPrompts = [
    {
      key: 'fill-all',
      label: 'Fill All Fields',
      description: 'Fill in all form fields with sample data'
    },
    {
      key: 'validate',
      label: 'Validate Form',
      description: 'Check if the form is valid'
    },
    {
      key: 'clear',
      label: 'Clear Form',
      description: 'Clear all form fields'
    }
  ];
  
  const handlePromptSelect = (promptKey: string) => {
    console.log('Prompt selected:', promptKey);
  };
  
  return (
    <EnhancedPredictiveForm
      onFinish={handleFormSubmit}
      learningMode="active"
      contextId="user-profile"
      showInsights={true}
      showAICompletion={true}
      showAIValidation={true}
      onAIComplete={handleAIComplete}
      onAIValidate={handleAIValidate}
      cyberpunk={true}
      aiModel="GPT-4"
      showThoughtProcess={true}
      showFieldHistory={true}
      enableVoiceInput={true}
      showRecommendations={true}
      showAIChat={true}
      predefinedPrompts={predefinedPrompts}
      onPromptSelect={handlePromptSelect}
      showFieldImportance={true}
      fieldImportance={{
        name: 'high',
        email: 'high',
        phone: 'medium',
        country: 'low'
      }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>
      
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Enter your email" />
      </Form.Item>
      
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input placeholder="Enter your phone number" />
      </Form.Item>
      
      <Form.Item name="country" label="Country" rules={[{ required: true }]}>
        <Select placeholder="Select your country">
          <Option value="United States">United States</Option>
          <Option value="Canada">Canada</Option>
          <Option value="United Kingdom">United Kingdom</Option>
          <Option value="Australia">Australia</Option>
        </Select>
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </EnhancedPredictiveForm>
  );
};
```

### AIForm

The `AIForm` component is a Zod-powered form component with AI assistance, smart suggestions, and real-time validation.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `schema` | `z.ZodType<any, any>` | - | Zod schema for form validation |
| `onSubmit` | `(values: z.infer<T>) => void \| Promise<void>` | - | Callback when form is submitted with valid data |
| `aiAssistance` | `boolean` | `true` | Whether to show AI assistance |
| `showSuggestions` | `boolean` | `true` | Whether to show field suggestions |
| `inlineValidation` | `boolean` | `true` | Whether to show validation errors inline |
| `validateOnBlur` | `boolean` | `true` | Whether to validate on blur |
| `validateOnChange` | `boolean` | `false` | Whether to validate on change |
| `showSubmitButton` | `boolean` | `true` | Whether to show a submit button |
| `submitText` | `string` | `'Submit'` | Text for the submit button |
| `showResetButton` | `boolean` | `false` | Whether to show a reset button |
| `resetText` | `string` | `'Reset'` | Text for the reset button |
| `cyberpunk` | `boolean` | `false` | Whether to use cyberpunk styling |

#### Example

```tsx
import { AIForm } from '@cauldronos/ui';
import { Form, Input } from 'antd';
import { z } from 'zod';

// Define Zod schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
});

const MyComponent = () => {
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <AIForm
      schema={userSchema}
      onSubmit={handleSubmit}
      layout="vertical"
      aiAssistance={true}
      showSuggestions={true}
      inlineValidation={true}
      cyberpunk={true}
      showResetButton={true}
    >
      <Form.Item name="name" label="Name">
        <Input placeholder="Enter your name" />
      </Form.Item>
      
      <Form.Item name="email" label="Email">
        <Input placeholder="Enter your email" />
      </Form.Item>
      
      <Form.Item name="phone" label="Phone">
        <Input placeholder="Enter your phone number" />
      </Form.Item>
    </AIForm>
  );
};
```

## Animation Components

### PageTransition

The `PageTransition` component is an enhanced page transition component for smooth transitions between pages/routes.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | - | Children to render |
| `className` | `string` | - | Additional CSS class |
| `motionProps` | `MotionProps` | - | Additional motion props |
| `type` | `'fade' \| 'slide' \| 'scale' \| 'flip' \| 'blur' \| 'perspective' \| 'swipe'` | `'fade'` | Transition type |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Direction for slide transitions |
| `gestureEnabled` | `boolean` | `false` | Whether to enable gesture-based navigation |
| `onSwipeLeft` | `() => void` | - | Callback when swiped left |
| `onSwipeRight` | `() => void` | - | Callback when swiped right |
| `onSwipeUp` | `() => void` | - | Callback when swiped up |
| `onSwipeDown` | `() => void` | - | Callback when swiped down |
| `pageKey` | `string` | - | Unique key for the page (for AnimatePresence) |
| `perspective` | `boolean` | `false` | Whether to apply 3D perspective |
| `cyberpunk` | `boolean` | `false` | Whether to apply cyberpunk styling |

#### Example

```tsx
import { PageTransition } from '@cauldronos/ui';

const MyPage = () => {
  return (
    <PageTransition
      type="slide"
      direction="up"
      gestureEnabled={true}
      onSwipeLeft={() => console.log('Swiped left')}
      onSwipeRight={() => console.log('Swiped right')}
      cyberpunk={true}
    >
      <div>
        <h1>Page Title</h1>
        <p>Page content</p>
      </div>
    </PageTransition>
  );
};
```

### GestureCard

The `GestureCard` component is a card component with gesture-based interactions like drag, swipe, and pinch.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | - | Title of the card |
| `children` | `React.ReactNode` | - | Content of the card |
| `draggable` | `boolean` | `false` | Whether to enable drag gesture |
| `swipeable` | `boolean` | `false` | Whether to enable swipe gesture |
| `pinchable` | `boolean` | `false` | Whether to enable pinch gesture |
| `onSwipeLeft` | `() => void` | - | Callback when card is swiped left |
| `onSwipeRight` | `() => void` | - | Callback when card is swiped right |
| `onSwipeUp` | `() => void` | - | Callback when card is swiped up |
| `onSwipeDown` | `() => void` | - | Callback when card is swiped down |
| `onDrag` | `(e: MouseEvent \| TouchEvent \| PointerEvent, info: PanInfo) => void` | - | Callback when card is dragged |
| `onDragEnd` | `(e: MouseEvent \| TouchEvent \| PointerEvent, info: PanInfo) => void` | - | Callback when card drag ends |
| `dragAxis` | `'x' \| 'y' \| 'both'` | `'both'` | Axis to constrain drag |
| `dragBounds` | `{ left?: number; right?: number; top?: number; bottom?: number }` | - | Bounds for dragging |
| `cyberpunk` | `boolean` | `false` | Whether to apply cyberpunk styling |
| `showGestureIndicators` | `boolean` | `true` | Whether to show gesture indicators |
| `className` | `string` | - | Additional CSS class |
| `style` | `React.CSSProperties` | - | Style object |

#### Example

```tsx
import { GestureCard } from '@cauldronos/ui';

const MyComponent = () => {
  return (
    <GestureCard
      title="Gesture Card"
      draggable={true}
      swipeable={true}
      pinchable={false}
      onSwipeLeft={() => console.log('Swiped left')}
      onSwipeRight={() => console.log('Swiped right')}
      dragAxis="both"
      cyberpunk={true}
      showGestureIndicators={true}
    >
      <p>Try dragging or swiping this card</p>
    </GestureCard>
  );
};
```

### FadeIn

The `FadeIn` component is a simple wrapper component that fades in its children.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | `number` | `0.5` | The duration of the animation in seconds |
| `delay` | `number` | `0` | The delay before the animation starts in seconds |
| `style` | `React.CSSProperties` | - | Custom style for the container |
| `className` | `string` | - | Custom class name for the container |

#### Example

```tsx
import { FadeIn } from '@cauldronos/ui';

const MyComponent = () => {
  return (
    <FadeIn delay={0.2} duration={0.5}>
      <h1>Welcome to CauldronOS</h1>
      <p>This content will fade in smoothly</p>
    </FadeIn>
  );
};
```

### SlideIn

The `SlideIn` component is a wrapper component that slides in its children from a specified direction.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | The direction of the slide animation |
| `duration` | `number` | `0.5` | The duration of the animation in seconds |
| `delay` | `number` | `0` | The delay before the animation starts in seconds |
| `distance` | `number` | `20` | The distance to slide in pixels |
| `style` | `React.CSSProperties` | - | Custom style for the container |
| `className` | `string` | - | Custom class name for the container |

#### Example

```tsx
import { SlideIn } from '@cauldronos/ui';

const MyComponent = () => {
  return (
    <SlideIn direction="up" delay={0.3} distance={30}>
      <div className="card">
        <h2>Slide In Card</h2>
        <p>This card slides in from the bottom</p>
      </div>
    </SlideIn>
  );
};
```

### Stagger

The `Stagger` component is a container component that animates its children in a staggered sequence.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `staggerDelay` | `number` | `0.1` | The delay between each child animation in seconds |
| `initialDelay` | `number` | `0` | The initial delay before the first animation starts in seconds |
| `childVariant` | `'fade' \| 'slideUp' \| 'slideDown' \| 'slideLeft' \| 'slideRight' \| 'scale'` | `'fade'` | The animation variant to apply to each child |
| `style` | `React.CSSProperties` | - | Custom style for the container |
| `className` | `string` | - | Custom class name for the container |

#### Example

```tsx
import { Stagger } from '@cauldronos/ui';

const MyComponent = () => {
  const items = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' },
    { id: 4, title: 'Item 4' },
  ];

  return (
    <Stagger childVariant="slideUp" staggerDelay={0.1} initialDelay={0.2}>
      {items.map(item => (
        <div key={item.id} className="item">
          {item.title}
        </div>
      ))}
    </Stagger>
  );
};
```

## Card Components

### CyberpunkCard

The `CyberpunkCard` component is a stylized card component with cyberpunk aesthetics including glow effects, scanlines, and animated interactions.

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | - | The title of the card |
| `extra` | `React.ReactNode` | - | The extra content in the top-right corner of the card |
| `glowColor` | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error' \| 'info' \| string` | `'primary'` | The color of the glow effect |
| `glowOnHover` | `boolean` | `true` | Whether to show a glow effect on hover |
| `alwaysGlow` | `boolean` | `false` | Whether to show a permanent glow effect |
| `pulseGlow` | `boolean` | `false` | Whether to show a pulsing glow effect |
| `scanlines` | `boolean` | `true` | Whether to show scanlines effect |
| `borderHighlight` | `boolean` | `true` | Whether to show a border highlight |
| `glitchOnHover` | `boolean` | `false` | Whether to show a glitch effect on hover |
| `glowIntensity` | `number` | `0.5` | The intensity of the glow effect (0-1) |
| `borderStyle` | `'solid' \| 'dashed' \| 'dotted' \| 'double' \| 'groove' \| 'ridge' \| 'inset' \| 'outset'` | `'solid'` | The border style |
| `perspective` | `boolean` | `false` | Whether to show a 3D perspective effect |

#### Example

```tsx
import { CyberpunkCard } from '@cauldronos/ui';

const MyComponent = () => {
  return (
    <CyberpunkCard
      title="Cyberpunk Card"
      glowColor="primary"
      glowOnHover={true}
      pulseGlow={true}
      scanlines={true}
      borderHighlight={true}
      glitchOnHover={true}
      glowIntensity={0.7}
    >
      <p>This card has cyberpunk styling with glow effects and scanlines.</p>
      <p>Hover over it to see the glow and glitch effects.</p>
    </CyberpunkCard>
  );
};
```

## Accessibility

The CauldronOS UI package includes built-in accessibility features through the `useAccessibility` hook and accessibility utilities. See the [Accessibility Guide](./accessibility-guide.md) for more information.

## Storybook

The CauldronOS UI package includes a Storybook for component documentation and testing. Run `pnpm storybook` to view the component documentation with interactive examples.
