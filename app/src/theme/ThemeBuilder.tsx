import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Form, 
  Input, 
  Button, 
  Space, 
  Tabs, 
  Divider, 
  Upload, 
  message, 
  Tooltip,
  Switch,
  Collapse,
  ColorPicker,
  Row,
  Col,
  Radio,
  Slider,
  Popover
} from 'antd';
import { 
  UploadOutlined, 
  SaveOutlined, 
  UndoOutlined, 
  PlusOutlined, 
  DeleteOutlined,
  InfoCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  CopyOutlined,
  DownloadOutlined,
  UploadOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { Color } from 'antd/es/color-picker';
import { useWorkspaces } from '../workspace/operations';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

// Default theme colors
const defaultTheme = {
  primaryColor: '#1677ff',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#ff4d4f',
  infoColor: '#1677ff',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  borderRadius: 6,
  fontSize: 14,
  headerHeight: 64,
  sidebarWidth: 200,
  logoUrl: '',
  faviconUrl: '',
  customCss: ''
};

interface ThemeBuilderProps {
  onSave?: (theme: any) => void;
  onPreview?: (theme: any) => void;
  initialTheme?: any;
}

const ThemeBuilder: React.FC<ThemeBuilderProps> = ({ 
  onSave, 
  onPreview,
  initialTheme = defaultTheme
}) => {
  const { currentWorkspace } = useWorkspaces();
  const [form] = Form.useForm();
  const [theme, setTheme] = useState(initialTheme);
  const [logoFile, setLogoFile] = useState<UploadFile | null>(null);
  const [faviconFile, setFaviconFile] = useState<UploadFile | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  
  useEffect(() => {
    form.setFieldsValue(theme);
  }, [theme, form]);
  
  const handleColorChange = (color: Color, field: string) => {
    setTheme(prev => ({
      ...prev,
      [field]: color.toHexString()
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setTheme(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  const handleSliderChange = (value: number, field: string) => {
    setTheme(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = () => {
    form.validateFields().then(values => {
      const updatedTheme = {
        ...theme,
        ...values
      };
      
      if (onSave) {
        onSave(updatedTheme);
      }
      
      message.success('Theme saved successfully');
    });
  };
  
  const handleReset = () => {
    setTheme(defaultTheme);
    form.setFieldsValue(defaultTheme);
    message.info('Theme reset to default');
  };
  
  const handlePreview = () => {
    if (onPreview) {
      onPreview(theme);
    }
    setPreviewVisible(true);
  };
  
  const handleLogoUpload: UploadProps['onChange'] = ({ fileList }) => {
    if (fileList.length > 0) {
      setLogoFile(fileList[0]);
      // In a real app, this would upload the file and get a URL
      // For now, we'll just simulate it
      setTheme(prev => ({
        ...prev,
        logoUrl: 'https://example.com/logo.png'
      }));
    } else {
      setLogoFile(null);
      setTheme(prev => ({
        ...prev,
        logoUrl: ''
      }));
    }
  };
  
  const handleFaviconUpload: UploadProps['onChange'] = ({ fileList }) => {
    if (fileList.length > 0) {
      setFaviconFile(fileList[0]);
      // In a real app, this would upload the file and get a URL
      setTheme(prev => ({
        ...prev,
        faviconUrl: 'https://example.com/favicon.ico'
      }));
    } else {
      setFaviconFile(null);
      setTheme(prev => ({
        ...prev,
        faviconUrl: ''
      }));
    }
  };
  
  const exportTheme = () => {
    const themeJson = JSON.stringify(theme, null, 2);
    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentWorkspace?.name || 'workspace'}-theme.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const importTheme = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTheme = JSON.parse(e.target?.result as string);
        setTheme(importedTheme);
        form.setFieldsValue(importedTheme);
        message.success('Theme imported successfully');
      } catch (error) {
        message.error('Failed to import theme. Invalid file format.');
      }
    };
    reader.readAsText(file);
  };
  
  const beforeUpload = (file: File) => {
    const isJSON = file.type === 'application/json';
    if (!isJSON) {
      message.error('You can only upload JSON files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('File must be smaller than 2MB!');
    }
    
    if (isJSON && isLt2M) {
      importTheme(file);
    }
    
    return false;
  };
  
  const colorPreview = (color: string) => (
    <div 
      style={{ 
        backgroundColor: color, 
        width: '20px', 
        height: '20px', 
        borderRadius: '4px',
        border: '1px solid #d9d9d9'
      }} 
    />
  );
  
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>Theme Builder</Title>
        <Space>
          <Upload 
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Import</Button>
          </Upload>
          <Button icon={<DownloadOutlined />} onClick={exportTheme}>Export</Button>
          <Button icon={<UndoOutlined />} onClick={handleReset}>Reset</Button>
          <Button icon={<EyeOutlined />} onClick={handlePreview}>Preview</Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>Save Theme</Button>
        </Space>
      </div>
      
      <Paragraph>
        Customize the look and feel of your workspace with the theme builder. 
        Changes will be applied to all users in your workspace.
      </Paragraph>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={theme}
      >
        <Tabs defaultActiveKey="colors">
          <TabPane tab="Colors" key="colors">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="Primary Colors" className="mb-4">
                  <Form.Item 
                    label="Primary Color" 
                    name="primaryColor"
                    tooltip="The main color used throughout the application"
                  >
                    <div className="flex items-center">
                      <ColorPicker 
                        value={theme.primaryColor} 
                        onChange={(color) => handleColorChange(color, 'primaryColor')}
                        showText
                      />
                      <div className="ml-2">{colorPreview(theme.primaryColor)}</div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Success Color" 
                    name="successColor"
                    tooltip="Used for success states and messages"
                  >
                    <div className="flex items-center">
                      <ColorPicker 
                        value={theme.successColor} 
                        onChange={(color) => handleColorChange(color, 'successColor')}
                        showText
                      />
                      <div className="ml-2">{colorPreview(theme.successColor)}</div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Warning Color" 
                    name="warningColor"
                    tooltip="Used for warning states and messages"
                  >
                    <div className="flex items-center">
                      <ColorPicker 
                        value={theme.warningColor} 
                        onChange={(color) => handleColorChange(color, 'warningColor')}
                        showText
                      />
                      <div className="ml-2">{colorPreview(theme.warningColor)}</div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Error Color" 
                    name="errorColor"
                    tooltip="Used for error states and messages"
                  >
                    <div className="flex items-center">
                      <ColorPicker 
                        value={theme.errorColor} 
                        onChange={(color) => handleColorChange(color, 'errorColor')}
                        showText
                      />
                      <div className="ml-2">{colorPreview(theme.errorColor)}</div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Info Color" 
                    name="infoColor"
                    tooltip="Used for informational states and messages"
                  >
                    <div className="flex items-center">
                      <ColorPicker 
                        value={theme.infoColor} 
                        onChange={(color) => handleColorChange(color, 'infoColor')}
                        showText
                      />
                      <div className="ml-2">{colorPreview(theme.infoColor)}</div>
                    </div>
                  </Form.Item>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card title="Background & Text" className="mb-4">
                  <Form.Item 
                    label="Background Color" 
                    name="backgroundColor"
                    tooltip="The main background color of the application"
                  >
                    <div className="flex items-center">
                      <ColorPicker 
                        value={theme.backgroundColor} 
                        onChange={(color) => handleColorChange(color, 'backgroundColor')}
                        showText
                      />
                      <div className="ml-2">{colorPreview(theme.backgroundColor)}</div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Text Color" 
                    name="textColor"
                    tooltip="The main text color of the application"
                  >
                    <div className="flex items-center">
                      <ColorPicker 
                        value={theme.textColor} 
                        onChange={(color) => handleColorChange(color, 'textColor')}
                        showText
                      />
                      <div className="ml-2">{colorPreview(theme.textColor)}</div>
                    </div>
                  </Form.Item>
                </Card>
                
                <Card title="Preview" className="mb-4">
                  <div 
                    style={{ 
                      backgroundColor: theme.backgroundColor,
                      color: theme.textColor,
                      padding: '16px',
                      borderRadius: `${theme.borderRadius}px`,
                      border: '1px solid #d9d9d9'
                    }}
                  >
                    <h3 style={{ color: theme.primaryColor }}>Sample Heading</h3>
                    <p>This is a sample text to preview your theme.</p>
                    <div className="flex space-x-2 mt-2">
                      <Button type="primary" style={{ backgroundColor: theme.primaryColor }}>Primary</Button>
                      <Button style={{ backgroundColor: theme.successColor, color: '#fff' }}>Success</Button>
                      <Button style={{ backgroundColor: theme.warningColor, color: '#fff' }}>Warning</Button>
                      <Button style={{ backgroundColor: theme.errorColor, color: '#fff' }}>Error</Button>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
          
          <TabPane tab="Layout" key="layout">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="Dimensions" className="mb-4">
                  <Form.Item 
                    label="Border Radius" 
                    name="borderRadius"
                    tooltip="The border radius used for buttons, cards, and other elements"
                  >
                    <div>
                      <Slider
                        min={0}
                        max={20}
                        value={theme.borderRadius}
                        onChange={(value) => handleSliderChange(value, 'borderRadius')}
                      />
                      <div className="mt-2">
                        <div 
                          style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: theme.primaryColor,
                            borderRadius: `${theme.borderRadius}px`
                          }}
                        />
                      </div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Font Size" 
                    name="fontSize"
                    tooltip="The base font size used throughout the application"
                  >
                    <div>
                      <Slider
                        min={12}
                        max={18}
                        value={theme.fontSize}
                        onChange={(value) => handleSliderChange(value, 'fontSize')}
                      />
                      <div className="mt-2">
                        <Text style={{ fontSize: `${theme.fontSize}px` }}>
                          Sample text at {theme.fontSize}px
                        </Text>
                      </div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Header Height" 
                    name="headerHeight"
                    tooltip="The height of the top navigation bar"
                  >
                    <div>
                      <Slider
                        min={48}
                        max={80}
                        step={4}
                        value={theme.headerHeight}
                        onChange={(value) => handleSliderChange(value, 'headerHeight')}
                      />
                      <div className="mt-2">
                        <div 
                          style={{ 
                            width: '100%', 
                            height: `${theme.headerHeight}px`, 
                            backgroundColor: theme.primaryColor,
                            borderRadius: `${theme.borderRadius}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff'
                          }}
                        >
                          Header ({theme.headerHeight}px)
                        </div>
                      </div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Sidebar Width" 
                    name="sidebarWidth"
                    tooltip="The width of the sidebar navigation"
                  >
                    <div>
                      <Slider
                        min={160}
                        max={300}
                        step={10}
                        value={theme.sidebarWidth}
                        onChange={(value) => handleSliderChange(value, 'sidebarWidth')}
                      />
                      <div className="mt-2">
                        <div style={{ display: 'flex' }}>
                          <div 
                            style={{ 
                              width: `${theme.sidebarWidth}px`, 
                              height: '100px', 
                              backgroundColor: '#f0f2f5',
                              borderRadius: `${theme.borderRadius}px 0 0 ${theme.borderRadius}px`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRight: '1px solid #d9d9d9'
                            }}
                          >
                            Sidebar ({theme.sidebarWidth}px)
                          </div>
                          <div 
                            style={{ 
                              flex: 1, 
                              height: '100px', 
                              backgroundColor: theme.backgroundColor,
                              borderRadius: `0 ${theme.borderRadius}px ${theme.borderRadius}px 0`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid #d9d9d9',
                              borderLeft: 'none'
                            }}
                          >
                            Content
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form.Item>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card title="Branding" className="mb-4">
                  <Form.Item 
                    label="Logo" 
                    name="logoUrl"
                    tooltip="Upload your workspace logo"
                  >
                    <Upload
                      listType="picture-card"
                      fileList={logoFile ? [logoFile] : []}
                      onChange={handleLogoUpload}
                      maxCount={1}
                      beforeUpload={() => false}
                    >
                      {!logoFile && (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                  
                  <Form.Item 
                    label="Favicon" 
                    name="faviconUrl"
                    tooltip="Upload your workspace favicon (shown in browser tabs)"
                  >
                    <Upload
                      listType="picture-card"
                      fileList={faviconFile ? [faviconFile] : []}
                      onChange={handleFaviconUpload}
                      maxCount={1}
                      beforeUpload={() => false}
                    >
                      {!faviconFile && (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                </Card>
                
                <Card title="Custom CSS" className="mb-4">
                  <Form.Item 
                    label="Custom CSS" 
                    name="customCss"
                    tooltip="Add custom CSS to further customize your workspace"
                  >
                    <Input.TextArea 
                      rows={6} 
                      placeholder=".my-custom-class { color: red; }"
                      value={theme.customCss}
                      onChange={(e) => handleInputChange(e, 'customCss')}
                    />
                  </Form.Item>
                  <Text type="secondary">
                    Advanced: Add custom CSS to override default styles. Use with caution.
                  </Text>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        
        <Divider />
        
        <div className="flex justify-end">
          <Space>
            <Button icon={<UndoOutlined />} onClick={handleReset}>
              Reset to Default
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save Theme
            </Button>
          </Space>
        </div>
      </Form>
    </Card>
  );
};

export default ThemeBuilder;
