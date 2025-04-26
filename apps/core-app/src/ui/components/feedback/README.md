# Feedback Components

This directory contains components for providing feedback to users in CauldronOS.

## Components

- `Alert` - Enhanced alert component
- `Message` - Enhanced message component
- `Notification` - Enhanced notification component
- `Progress` - Enhanced progress component
- `Result` - Enhanced result component
- `Skeleton` - Enhanced skeleton loading component
- `AsyncContent` - Component for handling loading, error, and success states
- `LoadingState` - Component for displaying loading states
- `ErrorState` - Component for displaying error states
- `SuccessState` - Component for displaying success states
- `ErrorBoundary` - Component for catching and displaying component errors
- `withAsyncStates` - Higher-order component for adding async states to any component

## Usage

### Basic Feedback Components

```jsx
import { Alert, Progress, Notification } from '@ui/components/feedback';

function FeedbackPage() {
  return (
    <div>
      <Alert
        type="success"
        message="Operation completed successfully"
        closable
      />
      <Progress percent={75} status="active" />
      <button onClick={() => Notification.success({
        message: 'Success',
        description: 'Operation completed successfully'
      })}>
        Show Notification
      </button>
    </div>
  );
}
```

### AsyncContent

The `AsyncContent` component is a versatile component for handling loading, error, and success states in async operations.

```jsx
import { AsyncContent } from '@ui/components/feedback';

function MyComponent() {
  const { data, isLoading, error, refetch } = useQuery(...);

  return (
    <AsyncContent
      loading={isLoading}
      error={error}
      retry={refetch}
      data={data}
    >
      {(data) => (
        <div>
          {data.map(item => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
    </AsyncContent>
  );
}
```

### LoadingState

The `LoadingState` component provides a consistent loading UI.

```jsx
import { LoadingState } from '@ui/components/feedback';

function MyLoadingComponent() {
  return (
    <LoadingState
      tip="Loading data..."
      cyberpunk
      withCard
    />
  );
}
```

### ErrorState

The `ErrorState` component provides a consistent error UI with retry functionality.

```jsx
import { ErrorState } from '@ui/components/feedback';

function MyErrorComponent({ error, retry }) {
  return (
    <ErrorState
      error={error}
      retry={retry}
      cyberpunk
      withCard
    />
  );
}
```

### SuccessState

The `SuccessState` component provides a consistent success UI.

```jsx
import { SuccessState } from '@ui/components/feedback';

function MySuccessComponent({ message, onContinue }) {
  return (
    <SuccessState
      message={message}
      onAction={onContinue}
      actionText="Continue"
      cyberpunk
      withCard
    />
  );
}
```

### ErrorBoundary

The `ErrorBoundary` component catches JavaScript errors in its child component tree and displays a fallback UI.

```jsx
import { ErrorBoundary } from '@ui/components/feedback';

function MyComponent() {
  return (
    <ErrorBoundary>
      <ComponentThatMightError />
    </ErrorBoundary>
  );
}
```

### withAsyncStates

The `withAsyncStates` higher-order component adds loading, error, and success states to any component.

```jsx
import { withAsyncStates } from '@ui/components/feedback';

const MyComponent = ({ data }) => (
  <div>
    {data.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
);

const MyComponentWithAsyncStates = withAsyncStates(MyComponent, { cyberpunk: true });

function ParentComponent() {
  const { data, isLoading, error, refetch } = useQuery(...);

  return (
    <MyComponentWithAsyncStates
      loading={isLoading}
      error={error}
      retry={refetch}
      data={data}
    />
  );
}
```
