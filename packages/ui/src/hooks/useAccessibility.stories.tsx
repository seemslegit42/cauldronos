import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useAccessibility } from './useAccessibility';
import { Card, Typography, Button, Space, Switch, Divider, Alert } from 'antd';
import { KeyCodes } from '../utils/accessibility';

const { Title, Paragraph, Text } = Typography;

// Create a wrapper component to use the hook
const AccessibilityDemo = () => {
  const [message, setMessage] = useState('');
  const [focusTrapActive, setFocusTrapActive] = useState(false);
  
  const {
    keyboardEnabled,
    screenReaderEnabled,
    highContrastEnabled,
    reducedMotionEnabled,
    focusVisibleEnabled,
    announce,
    createKeyHandler,
    createAriaAttributes,
    createFocusTrap,
  } = useAccessibility({
    enableKeyboard: true,
    enableScreenReader: true,
    enableHighContrast: false,
    enableReducedMotion: false,
    enableFocusVisible: true,
  });
  
  // Create a keyboard handler for the Enter and Space keys
  const handleButtonKeyDown = createKeyHandler(
    [KeyCodes.ENTER, KeyCodes.SPACE],
    () => {
      setMessage('Button activated with keyboard!');
      announce('Button activated with keyboard');
    },
    { preventDefault: true }
  );
  
  // Create ARIA attributes for the button
  const buttonAriaAttributes = createAriaAttributes({
    role: 'button',
    'aria-label': 'Accessible Button',
  });
  
  // Create a focus trap
  const focusTrap = createFocusTrap('focus-trap-container');
  
  return (
    <Card title="Accessibility Demo" style={{ width: 600 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="Accessibility Features"
          description={
            <ul>
              <li>Keyboard Navigation: {keyboardEnabled ? 'Enabled' : 'Disabled'}</li>
              <li>Screen Reader Support: {screenReaderEnabled ? 'Enabled' : 'Disabled'}</li>
              <li>High Contrast Mode: {highContrastEnabled ? 'Enabled' : 'Disabled'}</li>
              <li>Reduced Motion: {reducedMotionEnabled ? 'Enabled' : 'Disabled'}</li>
              <li>Focus Visible: {focusVisibleEnabled ? 'Enabled' : 'Disabled'}</li>
            </ul>
          }
          type="info"
          showIcon
        />
        
        <Divider>Keyboard Navigation</Divider>
        
        <Paragraph>
          Try using the keyboard to navigate and activate the elements below.
          Press Tab to move focus and Enter or Space to activate.
        </Paragraph>
        
        <div
          role={buttonAriaAttributes.role}
          aria-label={buttonAriaAttributes['aria-label']}
          tabIndex={0}
          onKeyDown={handleButtonKeyDown}
          onClick={() => {
            setMessage('Button clicked!');
            announce('Button clicked');
          }}
          style={{
            padding: '8px 16px',
            background: '#1677ff',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'inline-block',
            outline: focusVisibleEnabled ? 'none' : undefined,
          }}
          className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Accessible Button
        </div>
        
        {message && (
          <Alert
            message={message}
            type="success"
            showIcon
            closable
            onClose={() => setMessage('')}
            style={{ marginTop: 16 }}
          />
        )}
        
        <Divider>Screen Reader Announcements</Divider>
        
        <Space>
          <Button
            onClick={() => {
              announce('This is a polite announcement', false);
              setMessage('Polite announcement sent to screen reader');
            }}
          >
            Polite Announcement
          </Button>
          
          <Button
            onClick={() => {
              announce('This is an assertive announcement', true);
              setMessage('Assertive announcement sent to screen reader');
            }}
          >
            Assertive Announcement
          </Button>
        </Space>
        
        <Divider>Focus Trap</Divider>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            onClick={() => setFocusTrapActive(!focusTrapActive)}
          >
            {focusTrapActive ? 'Deactivate' : 'Activate'} Focus Trap
          </Button>
          
          {focusTrapActive && (
            <Card
              id="focus-trap-container"
              title="Focus Trap Container"
              style={{ border: '2px solid #1677ff' }}
              onKeyDown={focusTrap.onKeyDown}
            >
              <Paragraph>
                Focus is trapped within this container. Try tabbing through the elements.
                Focus will cycle back to the first element when you reach the end.
              </Paragraph>
              
              <Space>
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
              </Space>
            </Card>
          )}
        </Space>
      </Space>
    </Card>
  );
};

const meta: Meta = {
  title: 'Hooks/useAccessibility',
  component: AccessibilityDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
