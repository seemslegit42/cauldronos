# PredictiveForm Components

This directory contains form components with AI-powered features for enhanced user experience.

## Components

### PredictiveForm

The original AI-enhanced form component that provides intelligent features like smart defaults, suggestions, auto-validation, and insights.

### EnhancedPredictiveForm

An advanced version of PredictiveForm built with Ant Design X, offering additional AI-first features:

- **AI Thought Process**: Visualize the AI's reasoning process when completing or validating forms
- **Voice Input**: Enable voice input for form fields
- **Field History**: Track and suggest previous entries for form fields
- **AI Chat Interface**: Integrated chat assistant to help users complete the form
- **Predefined Prompts**: Quick action buttons for common form operations
- **Field Importance**: Visual indicators for field priority
- **Field Recommendations**: AI-generated suggestions for field values
- **Enhanced Styling**: Cyberpunk styling option for a futuristic look

## Usage

### Basic PredictiveForm

```tsx
import { PredictiveForm } from '@cauldronos/ui';
import { Form, Input, Button } from 'antd';

const MyForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <PredictiveForm
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      contextId="user-profile"
      learningMode="passive"
      showInsights={true}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>
      
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Enter your email" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </PredictiveForm>
  );
};
```

### Enhanced PredictiveForm with Ant Design X

```tsx
import { EnhancedPredictiveForm } from '@cauldronos/ui';
import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

const MyEnhancedForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  // Simulate AI form completion
  const handleAIComplete = async (values) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...values,
      name: values.name || 'John Doe',
      email: values.email || 'john.doe@example.com',
    };
  };

  // Simulate AI form validation
  const handleAIValidate = async (values) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const issues = [];
    if (!values.name) issues.push('Name is required');
    if (!values.email) issues.push('Email is required');
    return { valid: issues.length === 0, issues };
  };

  // Define predefined prompts
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
    }
  ];

  return (
    <EnhancedPredictiveForm
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      contextId="user-profile"
      learningMode="active"
      showInsights={true}
      showAICompletion={true}
      showAIValidation={true}
      onAIComplete={handleAIComplete}
      onAIValidate={handleAIValidate}
      showThoughtProcess={true}
      showFieldHistory={true}
      enableVoiceInput={true}
      showAIChat={true}
      predefinedPrompts={predefinedPrompts}
      showFieldImportance={true}
      fieldImportance={{
        name: 'high',
        email: 'medium'
      }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input prefix={<UserOutlined />} placeholder="Enter your name" />
      </Form.Item>
      
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input prefix={<MailOutlined />} placeholder="Enter your email" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </EnhancedPredictiveForm>
  );
};
```

## Props

### EnhancedPredictiveForm Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
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

Plus all standard Ant Design Form props.

## Example

See `EnhancedPredictiveFormExample.tsx` for a complete example implementation.