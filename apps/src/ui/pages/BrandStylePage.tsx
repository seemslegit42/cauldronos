import React from 'react';
import { Typography, Tabs, Divider } from 'antd';
import TypographyShowcase from '../components/TypographyShowcase';
import BrandVoiceShowcase from '../components/BrandVoiceShowcase';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

/**
 * BrandStylePage displays the CauldronOS typography and brand voice
 * in a tabbed interface.
 */
const BrandStylePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title level={1} className="font-heading">CauldronOS Brand Style</Title>
        <Paragraph className="text-lg max-w-2xl mx-auto">
          The CauldronOS brand style combines bold typography with a witty, self-aware voice
          to create a distinctive and memorable brand experience.
        </Paragraph>
      </div>
      
      <Divider />
      
      <Tabs defaultActiveKey="typography" size="large" centered>
        <TabPane tab="Typography" key="typography">
          <div className="py-8">
            <TypographyShowcase />
          </div>
        </TabPane>
        <TabPane tab="Brand Voice" key="brand-voice">
          <div className="py-8">
            <BrandVoiceShowcase />
          </div>
        </TabPane>
      </Tabs>
      
      <Divider />
      
      <div className="text-center mt-12 mb-8">
        <Title level={3} className="font-heading">Core Brand Elements</Title>
        <Paragraph className="max-w-2xl mx-auto">
          <strong>Core Idea:</strong> Cauldron: The Alchemized App Platform - Turning Complexity into Gold (Figuratively. We're not actual alchemists. Sorry.)
        </Paragraph>
        <Paragraph className="max-w-2xl mx-auto">
          <strong>Tagline:</strong> Brew Your Business. Distilled to Perfection.
        </Paragraph>
        <Paragraph className="max-w-2xl mx-auto">
          <strong>Mission:</strong> To provide a modular web application framework that empowers developers to create profitable, 
          AI-driven micro-SaaS applications with less toil and more…well, more success.
        </Paragraph>
        <Paragraph className="max-w-2xl mx-auto">
          <strong>Vision:</strong> To be the go-to platform for building and scaling a new generation of highly specialized, 
          high-value AI-powered tools.
        </Paragraph>
      </div>
    </div>
  );
};

export default BrandStylePage;
