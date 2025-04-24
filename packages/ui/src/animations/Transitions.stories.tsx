import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from 'framer-motion';
import { transitions } from './transitions';
import { Card, Typography, Button, Space, Divider, Select, Radio } from 'antd';
import { useAccessibility } from '../hooks/useAccessibility';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// Create a wrapper component to demonstrate transitions
const TransitionDemo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedTransition, setSelectedTransition] = useState('fadeIn');
  const [direction, setDirection] = useState('up');
  const { reducedMotionEnabled } = useAccessibility();
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  const getTransitionVariant = () => {
    switch (selectedTransition) {
      case 'fadeIn':
        return transitions.fadeIn;
      case 'slideUp':
        return transitions.slideUp;
      case 'slideDown':
        return transitions.slideDown;
      case 'slideLeft':
        return transitions.slideLeft;
      case 'slideRight':
        return transitions.slideRight;
      case 'scale':
        return transitions.scale;
      case 'modal':
        return transitions.modal;
      case 'flipX':
        return transitions.flipX;
      case 'flipY':
        return transitions.flipY;
      case 'perspective':
        return transitions.perspective;
      case 'blur':
        return transitions.blur;
      case 'elasticScale':
        return transitions.elasticScale;
      case 'swipeLeft':
        return transitions.swipeLeft;
      case 'swipeRight':
        return transitions.swipeRight;
      case 'glitch':
        return transitions.glitch;
      default:
        return transitions.fadeIn;
    }
  };
  
  return (
    <Card title="Animation Transitions" style={{ width: 600 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ marginBottom: 16 }}>
          <Text>Reduced Motion Enabled: {reducedMotionEnabled ? 'Yes' : 'No'}</Text>
          <Paragraph type="secondary">
            Note: If reduced motion is enabled in your system preferences, animations will be simplified.
          </Paragraph>
        </div>
        
        <Space style={{ marginBottom: 16 }}>
          <Select
            value={selectedTransition}
            onChange={setSelectedTransition}
            style={{ width: 200 }}
          >
            <Option value="fadeIn">Fade In</Option>
            <Option value="slideUp">Slide Up</Option>
            <Option value="slideDown">Slide Down</Option>
            <Option value="slideLeft">Slide Left</Option>
            <Option value="slideRight">Slide Right</Option>
            <Option value="scale">Scale</Option>
            <Option value="modal">Modal</Option>
            <Option value="flipX">Flip X</Option>
            <Option value="flipY">Flip Y</Option>
            <Option value="perspective">Perspective</Option>
            <Option value="blur">Blur</Option>
            <Option value="elasticScale">Elastic Scale</Option>
            <Option value="swipeLeft">Swipe Left</Option>
            <Option value="swipeRight">Swipe Right</Option>
            <Option value="glitch">Glitch</Option>
          </Select>
          
          <Button onClick={toggleVisibility}>
            {isVisible ? 'Hide' : 'Show'}
          </Button>
        </Space>
        
        {selectedTransition.includes('slide') && (
          <Radio.Group
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            style={{ marginBottom: 16 }}
          >
            <Radio.Button value="up">Up</Radio.Button>
            <Radio.Button value="down">Down</Radio.Button>
            <Radio.Button value="left">Left</Radio.Button>
            <Radio.Button value="right">Right</Radio.Button>
          </Radio.Group>
        )}
        
        <Divider />
        
        <div style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={selectedTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={getTransitionVariant()}
                style={{
                  width: 300,
                  perspective: selectedTransition === 'perspective' ? 1000 : undefined,
                }}
              >
                <Card
                  title="Animated Content"
                  style={{
                    width: '100%',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <Paragraph>
                    This content is animated using the {selectedTransition} transition.
                    Try different transitions to see how they work.
                  </Paragraph>
                  <Button type="primary">Action</Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <Divider />
        
        <Title level={5}>Transition Types</Title>
        <Paragraph>
          <ul>
            <li><strong>Fade In:</strong> Simple opacity transition</li>
            <li><strong>Slide:</strong> Movement with opacity change</li>
            <li><strong>Scale:</strong> Size change with opacity</li>
            <li><strong>Modal:</strong> Combination of scale and slide for dialogs</li>
            <li><strong>Flip:</strong> 3D rotation on X or Y axis</li>
            <li><strong>Perspective:</strong> 3D perspective effect</li>
            <li><strong>Blur:</strong> Blur filter transition</li>
            <li><strong>Elastic Scale:</strong> Bouncy scale effect</li>
            <li><strong>Swipe:</strong> Sliding transition with spring physics</li>
            <li><strong>Glitch:</strong> Cyberpunk-style glitch effect</li>
          </ul>
        </Paragraph>
      </Space>
    </Card>
  );
};

const meta: Meta = {
  title: 'Animations/Transitions',
  component: TransitionDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
