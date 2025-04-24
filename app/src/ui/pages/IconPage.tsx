import React from 'react';
import { Typography, Button, Space, Divider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import IconShowcase from '../components/IconShowcase';

const { Title, Paragraph } = Typography;

/**
 * IconPage displays the CauldronOS iconography system and provides
 * access to icon assets and guidelines.
 */
const IconPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title level={1} className="font-heading">CauldronOS Iconography</Title>
        <Paragraph className="text-lg max-w-2xl mx-auto">
          A comprehensive icon system for CauldronOS, featuring geometric precision, clean lines, 
          and a consistent visual language that aligns with our brand identity.
        </Paragraph>
        <Space size="middle" className="mt-6">
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            href="/docs/icon-guidelines.md"
            target="_blank"
          >
            Download Icon Guidelines
          </Button>
          <Button href="/docs/icon-guidelines.md" target="_blank">
            View Documentation
          </Button>
        </Space>
      </div>
      
      <Divider />
      
      <IconShowcase />
      
      <Divider />
      
      <div className="text-center mt-12 mb-8">
        <Title level={3} className="font-heading">Ready to Use the CauldronOS Icons?</Title>
        <Paragraph className="max-w-2xl mx-auto">
          The complete icon set is available in the src/icons directory. Each icon is implemented as a React component
          with customizable size, color, and other properties. For questions or clarifications
          about the iconography system, please contact the design team.
        </Paragraph>
      </div>
    </div>
  );
};

export default IconPage;
