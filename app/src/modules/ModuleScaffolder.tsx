import React, { useState } from 'react';
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Select,
  Switch,
  Divider,
  Steps,
  Space,
  Tag,
  Row,
  Col,
  Alert,
  Tooltip,
  Modal,
  Spin,
  message
} from 'antd';
import {
  AppstoreAddOutlined,
  CodeOutlined,
  DatabaseOutlined,
  FormOutlined,
  RocketOutlined,
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useAI } from '../ai/AIProvider';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

// Define the module types
const MODULE_TYPES = [
  {
    key: 'crud',
    name: 'CRUD Application',
    description: 'Create a full CRUD (Create, Read, Update, Delete) module with database models and UI components.',
    icon: <DatabaseOutlined />
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    description: 'Create a dashboard module with charts, statistics, and data visualization components.',
    icon: <AppstoreAddOutlined />
  },
  {
    key: 'form',
    name: 'Form Builder',
    description: 'Create a form builder module with customizable form fields and validation.',
    icon: <FormOutlined />
  },
  {
    key: 'custom',
    name: 'Custom Module',
    description: 'Create a custom module with your own specifications.',
    icon: <CodeOutlined />
  }
];

// Define the field types for database models
const FIELD_TYPES = [
  { value: 'string', label: 'String' },
  { value: 'text', label: 'Text (Long String)' },
  { value: 'integer', label: 'Integer' },
  { value: 'float', label: 'Float' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'date', label: 'Date' },
  { value: 'datetime', label: 'DateTime' },
  { value: 'enum', label: 'Enum' },
  { value: 'relation', label: 'Relation' }
];

// Define the UI component types
const UI_COMPONENT_TYPES = [
  { value: 'table', label: 'Table' },
  { value: 'form', label: 'Form' },
  { value: 'card', label: 'Card' },
  { value: 'list', label: 'List' },
  { value: 'chart', label: 'Chart' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'kanban', label: 'Kanban Board' }
];

interface ModuleScaffolderProps {
  onComplete?: (moduleData: any) => void;
}

const ModuleScaffolder: React.FC<ModuleScaffolderProps> = ({ onComplete }) => {
  const { sendMessage } = useAI();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [moduleType, setModuleType] = useState<string | null>(null);
  const [dbModels, setDbModels] = useState<any[]>([]);
  const [uiComponents, setUiComponents] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedModule, setGeneratedModule] = useState<any>(null);
  const [isPromptModalVisible, setIsPromptModalVisible] = useState(false);
  const [promptValue, setPromptValue] = useState('');
  const [isProcessingPrompt, setIsProcessingPrompt] = useState(false);

  // Handle module type selection
  const handleModuleTypeSelect = (type: string) => {
    setModuleType(type);
    form.setFieldsValue({ moduleType: type });

    // Set default values based on module type
    if (type === 'crud') {
      setDbModels([{ name: '', fields: [{ name: '', type: 'string', required: true }] }]);
      setUiComponents([{ type: 'table' }, { type: 'form' }]);
    } else if (type === 'dashboard') {
      setDbModels([]);
      setUiComponents([{ type: 'dashboard' }, { type: 'chart' }]);
    } else if (type === 'form') {
      setDbModels([{ name: '', fields: [{ name: '', type: 'string', required: true }] }]);
      setUiComponents([{ type: 'form' }]);
    } else {
      setDbModels([]);
      setUiComponents([]);
    }
  };

  // Add a new database model
  const addDbModel = () => {
    setDbModels([...dbModels, { name: '', fields: [{ name: '', type: 'string', required: true }] }]);
  };

  // Remove a database model
  const removeDbModel = (index: number) => {
    const newModels = [...dbModels];
    newModels.splice(index, 1);
    setDbModels(newModels);
  };

  // Add a field to a database model
  const addField = (modelIndex: number) => {
    const newModels = [...dbModels];
    newModels[modelIndex].fields.push({ name: '', type: 'string', required: false });
    setDbModels(newModels);
  };

  // Remove a field from a database model
  const removeField = (modelIndex: number, fieldIndex: number) => {
    const newModels = [...dbModels];
    newModels[modelIndex].fields.splice(fieldIndex, 1);
    setDbModels(newModels);
  };

  // Update a database model
  const updateDbModel = (modelIndex: number, key: string, value: any) => {
    const newModels = [...dbModels];
    newModels[modelIndex][key] = value;
    setDbModels(newModels);
  };

  // Update a field in a database model
  const updateField = (modelIndex: number, fieldIndex: number, key: string, value: any) => {
    const newModels = [...dbModels];
    newModels[modelIndex].fields[fieldIndex][key] = value;
    setDbModels(newModels);
  };

  // Add a UI component
  const addUiComponent = () => {
    setUiComponents([...uiComponents, { type: 'table' }]);
  };

  // Remove a UI component
  const removeUiComponent = (index: number) => {
    const newComponents = [...uiComponents];
    newComponents.splice(index, 1);
    setUiComponents(newComponents);
  };

  // Update a UI component
  const updateUiComponent = (index: number, key: string, value: any) => {
    const newComponents = [...uiComponents];
    newComponents[index][key] = value;
    setUiComponents(newComponents);
  };

  // Handle next step
  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle previous step
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsGenerating(true);

      // Combine form values with models and components
      const moduleData = {
        ...values,
        dbModels,
        uiComponents
      };

      try {
        // In a real implementation, this would call an API to generate the module
        // For now, we'll simulate the module generation

        // First, create a more detailed module structure
        const generatedModuleData = {
          ...moduleData,
          slug: values.name.toLowerCase().replace(/\s+/g, '-'),
          version: '1.0.0',
          isEnabled: true,
          isCore: false,
          category: moduleType === 'crud' ? 'productivity' :
                   moduleType === 'dashboard' ? 'analytics' :
                   moduleType === 'form' ? 'productivity' : 'other',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          permissions: ['READ', 'WRITE'],
          dependencies: [],
          config: {
            routes: [
              {
                path: `/modules/${values.name.toLowerCase().replace(/\s+/g, '-')}`,
                component: `${values.name.replace(/\s+/g, '')}Page`,
                exact: true,
                auth: true
              }
            ],
            menuItems: [
              {
                label: values.name,
                path: `/modules/${values.name.toLowerCase().replace(/\s+/g, '-')}`,
                icon: moduleType === 'crud' ? 'DatabaseOutlined' :
                       moduleType === 'dashboard' ? 'BarChartOutlined' :
                       moduleType === 'form' ? 'FormOutlined' : 'AppstoreOutlined'
              }
            ]
          },
          files: [
            {
              path: `${values.name.replace(/\s+/g, '')}Page.tsx`,
              content: `// Generated module: ${values.name}\n// Description: ${values.description}\n\nimport React from 'react';\nimport { Card, Typography } from 'antd';\n\nconst ${values.name.replace(/\s+/g, '')}Page = () => {\n  return (\n    <Card title="${values.name}">\n      <Typography.Paragraph>\n        ${values.description}\n      </Typography.Paragraph>\n    </Card>\n  );\n};\n\nexport default ${values.name.replace(/\s+/g, '')}Page;`
            },
            {
              path: `${values.name.replace(/\s+/g, '')}Module.ts`,
              content: `// Generated module: ${values.name}\n// Description: ${values.description}\n\nexport const ${values.name.replace(/\s+/g, '')}Module = {\n  name: '${values.name}',\n  slug: '${values.name.toLowerCase().replace(/\s+/g, '-')}',\n  description: '${values.description}',\n  version: '1.0.0',\n  isEnabled: true,\n  isCore: false,\n  category: '${moduleType === 'crud' ? 'productivity' : moduleType === 'dashboard' ? 'analytics' : moduleType === 'form' ? 'productivity' : 'other'}',\n};`
            }
          ]
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        setGeneratedModule(generatedModuleData);

        if (onComplete) {
          onComplete(generatedModuleData);
        }

        message.success(`Module "${values.name}" has been successfully scaffolded!`);
      } catch (error) {
        console.error('Error generating module:', error);
        message.error('Failed to generate module. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Show the AI prompt modal
  const showPromptModal = () => {
    setIsPromptModalVisible(true);
  };

  // Handle AI prompt submission
  const handlePromptSubmit = async () => {
    if (!promptValue.trim()) {
      message.error('Please enter a prompt');
      return;
    }

    setIsProcessingPrompt(true);

    try {
      // Send the prompt to the AI
      const response = await sendMessage(
        `Generate a module scaffold based on this description: ${promptValue}. Include database models, fields, and UI components.`,
        { context: 'module_scaffolder' }
      );

      // Parse the AI response (in a real implementation, this would be more robust)
      try {
        // This is a simplified example - in a real app, you'd have more robust parsing
        const moduleData = {
          name: promptValue.split(' ')[0],
          description: promptValue,
          moduleType: 'custom',
          dbModels: [
            {
              name: 'Example',
              fields: [
                { name: 'name', type: 'string', required: true },
                { name: 'description', type: 'text', required: false }
              ]
            }
          ],
          uiComponents: [
            { type: 'table' },
            { type: 'form' }
          ]
        };

        // Update the form with the generated data
        form.setFieldsValue({
          name: moduleData.name,
          description: moduleData.description,
          moduleType: moduleData.moduleType
        });

        setModuleType(moduleData.moduleType);
        setDbModels(moduleData.dbModels);
        setUiComponents(moduleData.uiComponents);

        setIsPromptModalVisible(false);
        message.success('Module scaffold generated from your prompt!');
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        message.error('Could not parse the AI response. Please try a different prompt.');
      }
    } catch (error) {
      console.error('Error processing prompt:', error);
      message.error('An error occurred while processing your prompt');
    } finally {
      setIsProcessingPrompt(false);
    }
  };

  // Render the steps
  const steps = [
    {
      title: 'Basic Info',
      content: (
        <div className="p-6">
          <Form.Item
            name="name"
            label="Module Name"
            rules={[{ required: true, message: 'Please enter a module name' }]}
          >
            <Input placeholder="e.g., Customer Management" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={4} placeholder="Describe what this module does..." />
          </Form.Item>

          <Form.Item
            name="moduleType"
            label="Module Type"
            rules={[{ required: true, message: 'Please select a module type' }]}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {MODULE_TYPES.map(type => (
                <Card
                  key={type.key}
                  hoverable
                  className={`cursor-pointer ${moduleType === type.key ? 'border-primary border-2' : ''}`}
                  onClick={() => handleModuleTypeSelect(type.key)}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-4 text-primary">
                      {type.icon}
                    </div>
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs text-gray-500">{type.description}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Form.Item>

          <Divider />

          <div className="text-center">
            <Button type="dashed" icon={<RocketOutlined />} onClick={showPromptModal}>
              Or Generate from AI Prompt
            </Button>
          </div>
        </div>
      )
    },
    {
      title: 'Database Models',
      content: (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Title level={4}>Database Models</Title>
            <Button type="primary" icon={<PlusOutlined />} onClick={addDbModel}>
              Add Model
            </Button>
          </div>

          {dbModels.length === 0 ? (
            <Alert
              message="No Database Models"
              description="This module doesn't have any database models. Click 'Add Model' to create one."
              type="info"
              showIcon
            />
          ) : (
            dbModels.map((model, modelIndex) => (
              <Card
                key={modelIndex}
                title={
                  <div className="flex justify-between items-center">
                    <Input
                      placeholder="Model Name"
                      value={model.name}
                      onChange={e => updateDbModel(modelIndex, 'name', e.target.value)}
                      style={{ width: 200 }}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeDbModel(modelIndex)}
                    />
                  </div>
                }
                className="mb-6"
              >
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <Text strong>Fields</Text>
                    <Button type="dashed" icon={<PlusOutlined />} onClick={() => addField(modelIndex)}>
                      Add Field
                    </Button>
                  </div>

                  {model.fields.map((field: any, fieldIndex: number) => (
                    <div key={fieldIndex} className="flex items-center mb-2">
                      <Input
                        placeholder="Field Name"
                        value={field.name}
                        onChange={e => updateField(modelIndex, fieldIndex, 'name', e.target.value)}
                        style={{ width: 150, marginRight: 8 }}
                      />
                      <Select
                        value={field.type}
                        onChange={value => updateField(modelIndex, fieldIndex, 'type', value)}
                        style={{ width: 150, marginRight: 8 }}
                      >
                        {FIELD_TYPES.map(type => (
                          <Option key={type.value} value={type.value}>{type.label}</Option>
                        ))}
                      </Select>
                      <div className="flex items-center mr-2">
                        <Switch
                          checked={field.required}
                          onChange={checked => updateField(modelIndex, fieldIndex, 'required', checked)}
                          size="small"
                        />
                        <Text className="ml-1 text-xs">Required</Text>
                      </div>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeField(modelIndex, fieldIndex)}
                        disabled={model.fields.length <= 1}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>
      )
    },
    {
      title: 'UI Components',
      content: (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Title level={4}>UI Components</Title>
            <Button type="primary" icon={<PlusOutlined />} onClick={addUiComponent}>
              Add Component
            </Button>
          </div>

          {uiComponents.length === 0 ? (
            <Alert
              message="No UI Components"
              description="This module doesn't have any UI components. Click 'Add Component' to create one."
              type="info"
              showIcon
            />
          ) : (
            <Row gutter={[16, 16]}>
              {uiComponents.map((component, index) => (
                <Col key={index} xs={24} md={12}>
                  <Card
                    title={
                      <div className="flex justify-between items-center">
                        <Select
                          value={component.type}
                          onChange={value => updateUiComponent(index, 'type', value)}
                          style={{ width: 150 }}
                        >
                          {UI_COMPONENT_TYPES.map(type => (
                            <Option key={type.value} value={type.value}>{type.label}</Option>
                          ))}
                        </Select>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeUiComponent(index)}
                        />
                      </div>
                    }
                  >
                    <div className="p-4 bg-gray-50 rounded-md text-center">
                      <div className="text-4xl text-gray-300 mb-2">
                        {component.type === 'table' && <DatabaseOutlined />}
                        {component.type === 'form' && <FormOutlined />}
                        {component.type === 'card' && <AppstoreAddOutlined />}
                        {component.type === 'list' && <AppstoreAddOutlined />}
                        {component.type === 'chart' && <AppstoreAddOutlined />}
                        {component.type === 'dashboard' && <AppstoreAddOutlined />}
                        {component.type === 'calendar' && <AppstoreAddOutlined />}
                        {component.type === 'kanban' && <AppstoreAddOutlined />}
                      </div>
                      <Text type="secondary">{component.type.charAt(0).toUpperCase() + component.type.slice(1)} Component</Text>
                    </div>

                    {component.type === 'table' && (
                      <div className="mt-4">
                        <Form.Item label="Data Source">
                          <Select
                            value={component.dataSource || (dbModels.length > 0 ? dbModels[0].name : undefined)}
                            onChange={value => updateUiComponent(index, 'dataSource', value)}
                          >
                            {dbModels.map((model, modelIndex) => (
                              <Option key={modelIndex} value={model.name}>{model.name || `Model ${modelIndex + 1}`}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    )}

                    {component.type === 'form' && (
                      <div className="mt-4">
                        <Form.Item label="Data Source">
                          <Select
                            value={component.dataSource || (dbModels.length > 0 ? dbModels[0].name : undefined)}
                            onChange={value => updateUiComponent(index, 'dataSource', value)}
                          >
                            {dbModels.map((model, modelIndex) => (
                              <Option key={modelIndex} value={model.name}>{model.name || `Model ${modelIndex + 1}`}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )
    },
    {
      title: 'Review & Generate',
      content: (
        <div className="p-6">
          <Alert
            message="Ready to Generate"
            description="Review your module configuration and click 'Generate Module' to create your module."
            type="info"
            showIcon
            className="mb-6"
          />

          <Card title="Module Summary" className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text strong>Name:</Text>
                <Paragraph>{form.getFieldValue('name')}</Paragraph>
              </div>
              <div>
                <Text strong>Type:</Text>
                <Paragraph>
                  {MODULE_TYPES.find(type => type.key === moduleType)?.name || 'Custom Module'}
                </Paragraph>
              </div>
            </div>
            <div className="mt-4">
              <Text strong>Description:</Text>
              <Paragraph>{form.getFieldValue('description')}</Paragraph>
            </div>
          </Card>

          <Card title="Database Models" className="mb-6">
            {dbModels.length === 0 ? (
              <Text type="secondary">No database models defined</Text>
            ) : (
              dbModels.map((model, index) => (
                <div key={index} className="mb-4">
                  <Title level={5}>{model.name || `Model ${index + 1}`}</Title>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {model.fields.map((field: any, fieldIndex: number) => (
                      <div key={fieldIndex} className="mb-1">
                        <Tag color={field.required ? 'blue' : 'default'}>
                          {field.name || `field_${fieldIndex + 1}`}: {field.type}
                          {field.required && ' (required)'}
                        </Tag>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </Card>

          <Card title="UI Components">
            {uiComponents.length === 0 ? (
              <Text type="secondary">No UI components defined</Text>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {uiComponents.map((component, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {component.type === 'table' && <DatabaseOutlined />}
                        {component.type === 'form' && <FormOutlined />}
                        {component.type === 'card' && <AppstoreAddOutlined />}
                        {component.type === 'list' && <AppstoreAddOutlined />}
                        {component.type === 'chart' && <AppstoreAddOutlined />}
                        {component.type === 'dashboard' && <AppstoreAddOutlined />}
                        {component.type === 'calendar' && <AppstoreAddOutlined />}
                        {component.type === 'kanban' && <AppstoreAddOutlined />}
                      </div>
                      <Text strong>{component.type.charAt(0).toUpperCase() + component.type.slice(1)}</Text>
                      {component.dataSource && (
                        <div className="text-xs text-gray-500 mt-1">
                          Data Source: {component.dataSource}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="module-scaffolder">
      <Card
        title={
          <div className="flex items-center">
            <CodeOutlined className="mr-2" />
            <span>Module Scaffolder</span>
          </div>
        }
        extra={
          <Tooltip title="The Module Scaffolder helps you create new modules for your workspace with database models and UI components.">
            <QuestionCircleOutlined />
          </Tooltip>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: '',
            description: '',
            moduleType: null
          }}
        >
          <Steps current={currentStep} className="mb-8">
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <div className="steps-content">
            {steps[currentStep].content}
          </div>

          <div className="steps-action mt-6 flex justify-between">
            {currentStep > 0 && (
              <Button onClick={handlePrev}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={isGenerating}
                icon={<RocketOutlined />}
              >
                Generate Module
              </Button>
            )}
          </div>
        </Form>

        {generatedModule && (
          <div className="mt-8">
            <Alert
              message="Module Generated Successfully!"
              description={
                <div>
                  <Paragraph>
                    Your module <Text strong>{generatedModule.name}</Text> has been successfully generated.
                  </Paragraph>
                  <Space>
                    <Button type="primary" icon={<SettingOutlined />}>
                      Configure Module
                    </Button>
                    <Button icon={<AppstoreOutlined />}>
                      View Module
                    </Button>
                  </Space>
                </div>
              }
              type="success"
              showIcon
              icon={<CheckCircleOutlined />}
            />

            <Card title="Generated Files" className="mt-4">
              <List
                dataSource={generatedModule.files || []}
                renderItem={(file: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<CodeOutlined style={{ fontSize: 24 }} />}
                      title={file.path}
                      description={
                        <div>
                          <Button type="link" size="small" onClick={() => {
                            Modal.info({
                              title: file.path,
                              width: 800,
                              content: (
                                <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
                                  <pre style={{ backgroundColor: '#f5f5f5', padding: 16, borderRadius: 4 }}>
                                    {file.content}
                                  </pre>
                                </div>
                              ),
                              okText: 'Close'
                            });
                          }}>
                            View Code
                          </Button>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            <Card title="Module Configuration" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text strong>Slug:</Text>
                  <Paragraph>{generatedModule.slug}</Paragraph>
                </div>
                <div>
                  <Text strong>Version:</Text>
                  <Paragraph>{generatedModule.version}</Paragraph>
                </div>
                <div>
                  <Text strong>Category:</Text>
                  <Paragraph>{generatedModule.category}</Paragraph>
                </div>
                <div>
                  <Text strong>Status:</Text>
                  <Paragraph>
                    <Badge status="success" text="Enabled" />
                  </Paragraph>
                </div>
              </div>

              <Divider />

              <Title level={5}>Routes</Title>
              <List
                dataSource={generatedModule.config?.routes || []}
                renderItem={(route: any) => (
                  <List.Item>
                    <Tag color="blue">{route.path}</Tag>
                    <Text className="ml-2">→</Text>
                    <Text code className="ml-2">{route.component}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        )}
      </Card>

      {/* AI Prompt Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <RocketOutlined className="mr-2" />
            <span>Generate Module from AI Prompt</span>
          </div>
        }
        open={isPromptModalVisible}
        onCancel={() => setIsPromptModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsPromptModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isProcessingPrompt}
            onClick={handlePromptSubmit}
          >
            Generate
          </Button>
        ]}
      >
        <div className="mb-4">
          <Alert
            message="Describe Your Module"
            description="Describe the module you want to create in natural language. The AI will generate database models and UI components based on your description."
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            className="mb-4"
          />
          <TextArea
            rows={6}
            value={promptValue}
            onChange={e => setPromptValue(e.target.value)}
            placeholder="e.g., Create a customer management module with fields for name, email, phone, and address. Include a table view and a form for adding/editing customers."
          />
        </div>

        {isProcessingPrompt && (
          <div className="text-center py-4">
            <Spin />
            <div className="mt-2 text-gray-500">Processing your request...</div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModuleScaffolder;
