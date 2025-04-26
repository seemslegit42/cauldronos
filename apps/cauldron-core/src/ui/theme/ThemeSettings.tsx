import React, { useState } from 'react';
import { Card, Typography, Button, Space, Tabs, Alert, Divider } from 'antd';
import { SettingOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useTheme } from './ThemeProvider';
import ThemeBuilder from './ThemeBuilder';
import { useWorkspaces } from '../workspace/operations';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface ThemeSettingsProps {
  isAdmin?: boolean;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ isAdmin = false }) => {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const { currentWorkspace } = useWorkspaces();
  const [showBuilder, setShowBuilder] = useState(false);
  
  const handleSaveTheme = (newTheme: any) => {
    setTheme({
      ...newTheme,
      isDarkMode
    });
  };
  
  const handlePreviewTheme = (previewTheme: any) => {
    // In a real app, this would apply the theme temporarily for preview
    console.log('Preview theme:', previewTheme);
  };
  
  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title level={3}>Theme Settings</Title>
          {isAdmin && (
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={() => setShowBuilder(!showBuilder)}
            >
              {showBuilder ? 'Hide Theme Builder' : 'Customize Theme'}
            </Button>
          )}
        </div>
        
        <Paragraph>
          Customize the appearance of your workspace with themes and branding options.
        </Paragraph>
        
        {!isAdmin && (
          <Alert
            message="Admin Access Required"
            description="Only workspace administrators can customize the theme. Contact your workspace administrator for theme changes."
            type="info"
            showIcon
            className="mb-4"
          />
        )}
        
        <div className="mb-6">
          <Title level={4}>Current Theme</Title>
          <div className="flex flex-wrap gap-4 mb-4">
            <Card 
              size="small" 
              title="Primary Color" 
              style={{ width: 150, borderTop: `2px solid ${theme.primaryColor}` }}
            >
              <div 
                style={{ 
                  backgroundColor: theme.primaryColor, 
                  width: '100%', 
                  height: '40px', 
                  borderRadius: '4px' 
                }} 
              />
              <Text className="mt-2 block">{theme.primaryColor}</Text>
            </Card>
            
            <Card 
              size="small" 
              title="Success Color" 
              style={{ width: 150, borderTop: `2px solid ${theme.successColor}` }}
            >
              <div 
                style={{ 
                  backgroundColor: theme.successColor, 
                  width: '100%', 
                  height: '40px', 
                  borderRadius: '4px' 
                }} 
              />
              <Text className="mt-2 block">{theme.successColor}</Text>
            </Card>
            
            <Card 
              size="small" 
              title="Warning Color" 
              style={{ width: 150, borderTop: `2px solid ${theme.warningColor}` }}
            >
              <div 
                style={{ 
                  backgroundColor: theme.warningColor, 
                  width: '100%', 
                  height: '40px', 
                  borderRadius: '4px' 
                }} 
              />
              <Text className="mt-2 block">{theme.warningColor}</Text>
            </Card>
            
            <Card 
              size="small" 
              title="Error Color" 
              style={{ width: 150, borderTop: `2px solid ${theme.errorColor}` }}
            >
              <div 
                style={{ 
                  backgroundColor: theme.errorColor, 
                  width: '100%', 
                  height: '40px', 
                  borderRadius: '4px' 
                }} 
              />
              <Text className="mt-2 block">{theme.errorColor}</Text>
            </Card>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Card 
              size="small" 
              title="Border Radius" 
              style={{ width: 150 }}
            >
              <div 
                style={{ 
                  backgroundColor: theme.primaryColor, 
                  width: '100%', 
                  height: '40px', 
                  borderRadius: `${theme.borderRadius}px` 
                }} 
              />
              <Text className="mt-2 block">{theme.borderRadius}px</Text>
            </Card>
            
            <Card 
              size="small" 
              title="Font Size" 
              style={{ width: 150 }}
            >
              <div style={{ fontSize: `${theme.fontSize}px` }}>
                Sample Text
              </div>
              <Text className="mt-2 block">{theme.fontSize}px</Text>
            </Card>
            
            <Card 
              size="small" 
              title="Mode" 
              style={{ width: 150 }}
            >
              <div 
                style={{ 
                  backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff', 
                  color: isDarkMode ? '#ffffff' : '#000000',
                  width: '100%', 
                  height: '40px', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #d9d9d9'
                }} 
              >
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </div>
              <Button 
                type="link" 
                onClick={toggleDarkMode} 
                className="mt-2 p-0"
              >
                Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
              </Button>
            </Card>
          </div>
        </div>
        
        {showBuilder && isAdmin && (
          <>
            <Divider />
            <ThemeBuilder 
              onSave={handleSaveTheme}
              onPreview={handlePreviewTheme}
              initialTheme={theme}
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default ThemeSettings;
