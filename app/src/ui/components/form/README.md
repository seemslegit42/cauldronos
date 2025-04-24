# Form Components

This directory contains form-related components for CauldronOS.

## Components

- `Input` - Enhanced input component
- `Select` - Enhanced select component
- `Checkbox` - Enhanced checkbox component
- `Radio` - Enhanced radio component
- `Switch` - Enhanced switch component
- `DatePicker` - Enhanced date picker component
- `TimePicker` - Enhanced time picker component
- `Upload` - Enhanced upload component
- `Form` - Enhanced form component

## Usage

```jsx
import { Form, Input, Select, Button } from '@ui/components/form';

function UserForm() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item 
        name="name" 
        label="Name" 
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>
      <Form.Item 
        name="role" 
        label="Role" 
        rules={[{ required: true, message: 'Please select a role' }]}
      >
        <Select placeholder="Select a role">
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}
```
