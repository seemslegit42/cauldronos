import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Switch, 
  Select, 
  InputNumber, 
  Button, 
  Card, 
  Typography, 
  Divider, 
  Space, 
  Collapse,
  Alert
} from 'antd';
import { z } from 'zod';
import { Plugin } from './types';
import { usePlugins } from './PluginRegistry';

const { Title, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

interface PluginConfigProps {
  plugin: Plugin;
  onSave?: (config: Record<string, any>) => void;
}

/**
 * Component for configuring a plugin
 */
const PluginConfig: React.FC<PluginConfigProps> = ({ plugin, onSave }) => {
  const { updatePluginConfig } = usePlugins();
  const [form] = Form.useForm();
  const [config, setConfig] = useState<Record<string, any>>(plugin.config || plugin.defaultConfig);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Update form when plugin changes
  useEffect(() => {
    form.setFieldsValue(plugin.config || plugin.defaultConfig);
    setConfig(plugin.config || plugin.defaultConfig);
  }, [plugin, form]);

  // Handle form submission
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      // Validate the config against the schema
      const validatedConfig = plugin.configSchema.parse(values);
      
      // Update the config
      await updatePluginConfig(plugin.id, validatedConfig);
      
      // Call the onSave callback if provided
      if (onSave) {
        onSave(validatedConfig);
      }
      
      // Clear validation errors
      setValidationErrors([]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format the error messages
        const errorMessages = error.errors.map((err) => {
          const path = err.path.join('.');
          return `${path ? `${path}: ` : ''}${err.message}`;
        });
        
        setValidationErrors(errorMessages);
      } else {
        setValidationErrors(['An error occurred while validating the configuration']);
      }
    }
  };

  // Reset the form to default values
  const handleReset = () => {
    form.setFieldsValue(plugin.defaultConfig);
    setConfig(plugin.defaultConfig);
  };

  // Render a form field based on the schema
  const renderField = (key: string, schema: z.ZodTypeAny, path: string = '') => {
    const fullPath = path ? `${path}.${key}` : key;
    
    // Get the field description from the schema
    const description = schema._def.description;
    
    // Handle different schema types
    if (schema instanceof z.ZodString) {
      return (
        <Form.Item
          key={fullPath}
          name={fullPath}
          label={key}
          help={description}
          rules={[{ required: schema._def.isRequired }]}
        >
          <Input />
        </Form.Item>
      );
    } else if (schema instanceof z.ZodNumber) {
      return (
        <Form.Item
          key={fullPath}
          name={fullPath}
          label={key}
          help={description}
          rules={[{ required: schema._def.isRequired }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      );
    } else if (schema instanceof z.ZodBoolean) {
      return (
        <Form.Item
          key={fullPath}
          name={fullPath}
          label={key}
          help={description}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      );
    } else if (schema instanceof z.ZodEnum) {
      return (
        <Form.Item
          key={fullPath}
          name={fullPath}
          label={key}
          help={description}
          rules={[{ required: schema._def.isRequired }]}
        >
          <Select>
            {schema._def.values.map((value: string) => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    } else if (schema instanceof z.ZodArray) {
      // For arrays, we'll use a simple text input with comma-separated values
      return (
        <Form.Item
          key={fullPath}
          name={fullPath}
          label={key}
          help={description}
          rules={[{ required: schema._def.isRequired }]}
          getValueFromEvent={(e) => e.target.value.split(',').map((v: string) => v.trim())}
          getValueProps={(value) => ({ value: Array.isArray(value) ? value.join(', ') : value })}
        >
          <Input placeholder="Comma-separated values" />
        </Form.Item>
      );
    } else if (schema instanceof z.ZodObject) {
      // For objects, we'll render a nested form
      return (
        <Card key={fullPath} title={key} className="mb-4">
          {Object.entries(schema.shape).map(([nestedKey, nestedSchema]) =>
            renderField(nestedKey, nestedSchema as z.ZodTypeAny, fullPath)
          )}
        </Card>
      );
    }
    
    // Default fallback for unsupported types
    return (
      <Form.Item
        key={fullPath}
        name={fullPath}
        label={key}
        help={description}
      >
        <Input />
      </Form.Item>
    );
  };

  return (
    <div>
      <Title level={4}>Plugin Configuration</Title>
      <Text type="secondary">Configure the settings for {plugin.name}</Text>
      
      <Divider />
      
      {validationErrors.length > 0 && (
        <Alert
          type="error"
          message="Configuration Errors"
          description={
            <ul className="pl-5 mt-2">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          }
          className="mb-4"
          showIcon
        />
      )}
      
      <Form
        form={form}
        layout="vertical"
        initialValues={config}
        onFinish={handleSubmit}
      >
        {Object.entries(plugin.configSchema.shape).map(([key, schema]) =>
          renderField(key, schema as z.ZodTypeAny)
        )}
        
        <Divider />
        
        <Collapse className="mb-4">
          <Panel header="Advanced Settings" key="advanced">
            <Text type="secondary" className="block mb-4">
              These are the raw configuration values. Edit with caution.
            </Text>
            <Form.Item name="__raw" hidden>
              <Input.TextArea
                rows={10}
                value={JSON.stringify(config, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setConfig(parsed);
                    form.setFieldsValue(parsed);
                  } catch (error) {
                    // Ignore JSON parse errors
                  }
                }}
              />
            </Form.Item>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
              {JSON.stringify(config, null, 2)}
            </pre>
          </Panel>
        </Collapse>
        
        <Space>
          <Button type="primary" htmlType="submit">
            Save Configuration
          </Button>
          <Button onClick={handleReset}>
            Reset to Defaults
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default PluginConfig;
