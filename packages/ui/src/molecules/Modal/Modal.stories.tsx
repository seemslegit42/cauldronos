import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button, Typography, Space, Form, Input, Select, Divider, Radio } from 'antd';
import { InfoCircleOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Create a wrapper component to control the modal state
const ModalDemo = ({
  title = 'Modal Title',
  cyberpunk = false,
  animationType = 'scale',
  glow = false,
  backdropBlur = false,
  gestureEnabled = false,
  width = 520,
  centered = false,
  closable = true,
  maskClosable = true,
  footer = undefined,
  content = 'Basic modal content',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cyberpunk={cyberpunk}
        animationType={animationType}
        glow={glow}
        backdropBlur={backdropBlur}
        gestureEnabled={gestureEnabled}
        width={width}
        centered={centered}
        closable={closable}
        maskClosable={maskClosable}
        footer={footer === 'none' ? null : footer === 'custom' ? (
          <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleOk}>
              Submit
            </Button>
          </Space>
        ) : undefined}
      >
        {typeof content === 'string' ? <p>{content}</p> : content}
      </Modal>
    </div>
  );
};

const meta: Meta<typeof ModalDemo> = {
  title: 'Molecules/Modal',
  component: ModalDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    cyberpunk: { control: 'boolean' },
    animationType: {
      control: { type: 'select' },
      options: ['fade', 'scale', 'slide', 'flip', 'glitch', 'none'],
    },
    glow: { control: 'boolean' },
    backdropBlur: { control: 'boolean' },
    gestureEnabled: { control: 'boolean' },
    width: { control: 'number' },
    centered: { control: 'boolean' },
    closable: { control: 'boolean' },
    maskClosable: { control: 'boolean' },
    footer: {
      control: { type: 'select' },
      options: [undefined, 'none', 'custom'],
    },
    content: {
      control: { type: 'select' },
      options: ['basic', 'form', 'confirmation', 'success', 'error', 'info'],
      mapping: {
        basic: 'This is a basic modal with simple text content.',
        form: (
          <Form layout="vertical">
            <Form.Item label="Name" required>
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Role">
              <Select placeholder="Select a role">
                <Option value="admin">Administrator</Option>
                <Option value="user">User</Option>
                <Option value="guest">Guest</Option>
              </Select>
            </Form.Item>
          </Form>
        ),
        confirmation: (
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <ExclamationCircleOutlined style={{ fontSize: 22, color: '#faad14', marginRight: 16 }} />
              <Title level={5} style={{ margin: 0 }}>Confirm Action</Title>
            </div>
            <Paragraph>
              Are you sure you want to perform this action? This cannot be undone.
            </Paragraph>
          </Space>
        ),
        success: (
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <CheckCircleOutlined style={{ fontSize: 22, color: '#52c41a', marginRight: 16 }} />
              <Title level={5} style={{ margin: 0 }}>Success</Title>
            </div>
            <Paragraph>
              Your action has been completed successfully.
            </Paragraph>
          </Space>
        ),
        error: (
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <ExclamationCircleOutlined style={{ fontSize: 22, color: '#ff4d4f', marginRight: 16 }} />
              <Title level={5} style={{ margin: 0 }}>Error</Title>
            </div>
            <Paragraph>
              An error occurred while processing your request. Please try again.
            </Paragraph>
          </Space>
        ),
        info: (
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <InfoCircleOutlined style={{ fontSize: 22, color: '#1677ff', marginRight: 16 }} />
              <Title level={5} style={{ margin: 0 }}>Information</Title>
            </div>
            <Paragraph>
              This is an informational message that provides additional context.
            </Paragraph>
          </Space>
        ),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModalDemo>;

export const Default: Story = {
  args: {
    title: 'Basic Modal',
    cyberpunk: false,
    animationType: 'scale',
    glow: false,
    backdropBlur: false,
    gestureEnabled: false,
    width: 520,
    centered: false,
    closable: true,
    maskClosable: true,
    footer: undefined,
    content: 'basic',
  },
};

export const CyberpunkModal: Story = {
  args: {
    ...Default.args,
    title: 'Cyberpunk Modal',
    cyberpunk: true,
  },
};

export const GlowEffect: Story = {
  args: {
    ...Default.args,
    title: 'Glowing Modal',
    glow: true,
  },
};

export const BackdropBlur: Story = {
  args: {
    ...Default.args,
    title: 'Modal with Backdrop Blur',
    backdropBlur: true,
  },
};

export const CenteredModal: Story = {
  args: {
    ...Default.args,
    title: 'Centered Modal',
    centered: true,
  },
};

export const FadeAnimation: Story = {
  args: {
    ...Default.args,
    title: 'Fade Animation',
    animationType: 'fade',
  },
};

export const SlideAnimation: Story = {
  args: {
    ...Default.args,
    title: 'Slide Animation',
    animationType: 'slide',
  },
};

export const FlipAnimation: Story = {
  args: {
    ...Default.args,
    title: 'Flip Animation',
    animationType: 'flip',
  },
};

export const GlitchAnimation: Story = {
  args: {
    ...Default.args,
    title: 'Glitch Animation',
    animationType: 'glitch',
  },
};

export const FormModal: Story = {
  args: {
    ...Default.args,
    title: 'Form Modal',
    content: 'form',
    width: 600,
  },
};

export const ConfirmationModal: Story = {
  args: {
    ...Default.args,
    title: 'Confirmation',
    content: 'confirmation',
    footer: 'custom',
  },
};

export const SuccessModal: Story = {
  args: {
    ...Default.args,
    title: 'Success',
    content: 'success',
  },
};

export const ErrorModal: Story = {
  args: {
    ...Default.args,
    title: 'Error',
    content: 'error',
  },
};

export const InfoModal: Story = {
  args: {
    ...Default.args,
    title: 'Information',
    content: 'info',
  },
};

export const NoFooter: Story = {
  args: {
    ...Default.args,
    title: 'Modal without Footer',
    footer: 'none',
  },
};

export const CustomFooter: Story = {
  args: {
    ...Default.args,
    title: 'Modal with Custom Footer',
    footer: 'custom',
  },
};

export const FullFeatured: Story = {
  args: {
    title: 'Full Featured Modal',
    cyberpunk: true,
    animationType: 'glitch',
    glow: true,
    backdropBlur: true,
    centered: true,
    content: 'form',
    footer: 'custom',
    width: 600,
  },
};
