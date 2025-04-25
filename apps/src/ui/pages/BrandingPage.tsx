import React from 'react';
import { Typography, Button, Space, Divider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import BrandShowcase from '../components/BrandShowcase';

const { Title, Paragraph } = Typography;

/**
 * BrandingPage displays the CauldronOS branding system and provides
 * access to brand assets and guidelines.
 */
const BrandingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <img src="/logo.svg" alt="CauldronOS Logo" className="mx-auto mb-6" width={280} />
        <Title level={1} className="font-heading">CauldronOS Brand System</Title>
        <Paragraph className="text-lg max-w-2xl mx-auto">
          A comprehensive branding system for CauldronOS, featuring a corporate cyberpunk aesthetic
          with a focus on clarity, intelligence, and a touch of irreverence.
        </Paragraph>
        <Space size="middle" className="mt-6">
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            href="/docs/brand-guidelines.md"
            target="_blank"
          >
            Download Brand Guidelines
          </Button>
          <Button href="/docs/brand-guidelines.md" target="_blank">
            View Documentation
          </Button>
        </Space>
      </div>
      
      <Divider />
      
      <BrandShowcase />
      
      <Divider />
      
      <div className="text-center mt-12 mb-8">
        <Title level={3} className="font-heading">Ready to Use the CauldronOS Brand?</Title>
        <Paragraph className="max-w-2xl mx-auto">
          The complete brand assets are available in the public directory. For questions or clarifications
          about the branding system, please contact the design team.
        </Paragraph>
      </div>
    </div>
  );
};

export default BrandingPage;
