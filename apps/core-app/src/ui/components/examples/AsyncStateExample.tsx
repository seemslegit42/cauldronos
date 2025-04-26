import React, { useState } from 'react';
import { Button, Card, Space, Typography, Divider } from 'antd';
import { 
  AsyncContent, 
  LoadingState, 
  ErrorState, 
  SuccessState,
  withAsyncStates
} from '../feedback';

const { Title, Paragraph } = Typography;

/**
 * Example component that demonstrates how to use the async state components
 */
const AsyncStateExample: React.FC = () => {
  // State for AsyncContent example
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<string[]>([]);

  // Function to simulate loading
  const handleLoading = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setData(['Item 1', 'Item 2', 'Item 3']);
    }, 2000);
  };

  // Function to simulate error
  const handleError = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    // Simulate API error
    setTimeout(() => {
      setLoading(false);
      setError(new Error('Failed to fetch data'));
    }, 2000);
  };

  // Function to simulate success
  const handleSuccess = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    // Simulate API success
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setData(['Item 1', 'Item 2', 'Item 3']);
    }, 2000);
  };

  // Create a component with async states using the HOC
  const ExampleComponentWithAsyncStates = withAsyncStates(
    () => (
      <Card title="Component with Async States">
        <Paragraph>This component was wrapped with the withAsyncStates HOC</Paragraph>
      </Card>
    ),
    { cyberpunk: true }
  );

  return (
    <div>
      <Title level={2}>Async State Components</Title>
      <Paragraph>
        These components provide consistent loading, error, and success states for async operations.
      </Paragraph>

      <Divider orientation="left">AsyncContent Component</Divider>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Button onClick={handleLoading}>Show Loading</Button>
          <Button onClick={handleError} danger>Show Error</Button>
          <Button onClick={handleSuccess} type="primary">Show Success</Button>
        </Space>

        <AsyncContent
          loading={loading}
          error={error}
          success={success}
          successMessage="Data loaded successfully!"
          retry={handleLoading}
          data={data}
        >
          {(items) => (
            <Card title="Data">
              <ul>
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Card>
          )}
        </AsyncContent>
      </Space>

      <Divider orientation="left">Individual Components</Divider>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="Loading State">
          <LoadingState tip="Loading data..." cyberpunk withCard />
        </Card>

        <Card title="Error State">
          <ErrorState 
            error="Failed to load data" 
            cyberpunk 
            withCard 
            retry={() => alert('Retry clicked')} 
          />
        </Card>

        <Card title="Success State">
          <SuccessState 
            message="Data saved successfully!" 
            cyberpunk 
            withCard 
            onAction={() => alert('Action clicked')} 
            actionText="Continue" 
          />
        </Card>
      </Space>

      <Divider orientation="left">withAsyncStates HOC</Divider>
      <ExampleComponentWithAsyncStates 
        loading={loading} 
        error={error} 
        success={success} 
        retry={handleLoading} 
      />
    </div>
  );
};

export default AsyncStateExample;
