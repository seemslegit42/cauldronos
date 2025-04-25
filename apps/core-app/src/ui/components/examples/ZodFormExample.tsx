import React from 'react';
import { Card, Typography, Space, message } from 'antd';
import { z } from 'zod';
import { ZodForm, ZodFormItem } from '../form/ZodForm';
import { Input } from '../form/Input';
import { Select } from '../form/Select';
import { Button } from '../Button';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';

const { Title, Text } = Typography;

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['user', 'admin', 'developer'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
  bio: z.string().max(200, 'Bio cannot exceed 200 characters').optional(),
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

/**
 * Example form component using Zod for validation
 */
export const ZodFormExample: React.FC = () => {
  // Default form values
  const defaultValues: Partial<FormValues> = {
    role: 'user',
  };

  // Form submission handler
  const handleSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    message.success('Form submitted successfully!');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transitions.fadeIn}
    >
      <Card 
        title={<Title level={4}>User Registration</Title>}
        className="cauldron-card"
      >
        <ZodForm
          schema={formSchema}
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        >
          {({ formState }) => (
            <Space direction="vertical" style={{ width: '100%' }}>
              <ZodFormItem
                name="name"
                label="Name"
                required
              >
                <Input placeholder="Enter your name" />
              </ZodFormItem>
              
              <ZodFormItem
                name="email"
                label="Email"
                required
              >
                <Input placeholder="Enter your email" />
              </ZodFormItem>
              
              <ZodFormItem
                name="role"
                label="Role"
                required
              >
                <Select placeholder="Select your role">
                  <Select.Option value="user">User</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="developer">Developer</Select.Option>
                </Select>
              </ZodFormItem>
              
              <ZodFormItem
                name="bio"
                label="Bio"
              >
                <Input.TextArea 
                  placeholder="Tell us about yourself (optional)"
                  rows={4}
                />
              </ZodFormItem>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button type="default">Cancel</Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={formState.isSubmitting}
                >
                  Submit
                </Button>
              </div>
              
              {formState.errors && Object.keys(formState.errors).length > 0 && (
                <Text type="danger">
                  Please fix the errors above before submitting.
                </Text>
              )}
            </Space>
          )}
        </ZodForm>
      </Card>
    </motion.div>
  );
};

export default ZodFormExample;