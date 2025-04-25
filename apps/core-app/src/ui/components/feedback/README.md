# Feedback Components

This directory contains components for providing feedback to users in CauldronOS.

## Components

- `Alert` - Enhanced alert component
- `Message` - Enhanced message component
- `Notification` - Enhanced notification component
- `Progress` - Enhanced progress component
- `Result` - Enhanced result component
- `Skeleton` - Enhanced skeleton loading component

## Usage

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
