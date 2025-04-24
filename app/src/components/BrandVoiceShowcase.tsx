import React from 'react';
import { Typography, Card, Divider, Space, Row, Col } from 'antd';
import './BrandVoiceShowcase.css';

const { Title, Text, Paragraph } = Typography;

/**
 * BrandVoiceShowcase component demonstrates the CauldronOS brand voice
 * with examples of copy for different contexts.
 */
const BrandVoiceShowcase: React.FC = () => {
  return (
    <div className="brand-voice-showcase">
      <Title level={2} className="font-heading">CauldronOS Brand Voice</Title>
      <Paragraph className="font-body">
        The CauldronOS brand voice is self-aware, witty, and slightly irreverent, while remaining
        confident and helpful. We use humor and analogies to explain complex concepts and aren't
        afraid to call out industry BS.
      </Paragraph>
      
      <Divider orientation="left">Core Values</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} lg={6}>
          <Card className="value-card">
            <Title level={4}>Smart Efficiency</Title>
            <Paragraph>Work smarter, not harder. (Duh.)</Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={12} lg={6}>
          <Card className="value-card">
            <Title level={4}>Profitable Innovation</Title>
            <Paragraph>Build cool stuff that actually makes money. (Groundbreaking, we know.)</Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={12} lg={6}>
          <Card className="value-card">
            <Title level={4}>Ruthless Pragmatism</Title>
            <Paragraph>If it doesn't solve a real problem, we don't build it.</Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={12} lg={6}>
          <Card className="value-card">
            <Title level={4}>Self-Aware Transparency</Title>
            <Paragraph>We're honest about the tech, the challenges, and the startup grind.</Paragraph>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Brand Voice Examples</Divider>
      
      <Title level={3}>Landing Page Headlines</Title>
      <Card className="voice-example-card">
        <Title level={2} className="example-headline">Cauldron: So You Wanna Build an AI Empire? We'll Help You Avoid the Usual Chaos.</Title>
        <Space direction="vertical" size="middle" className="mt-4">
          <Paragraph className="example-subhead">
            "Forget 'Move Fast and Break Things.' We're about 'Build Smart and Don't Go Broke.'"
          </Paragraph>
          <Paragraph className="example-subhead">
            "Agent Templates: Think of them as your AI dev cheat codes. (But, like, ethical cheat codes.)"
          </Paragraph>
          <Paragraph className="example-subhead">
            "Scalability that doesn't cost a fortune. Because your server bill shouldn't be scarier than your code."
          </Paragraph>
        </Space>
      </Card>
      
      <Title level={3} className="mt-8">Pricing Page</Title>
      <Card className="voice-example-card">
        <Paragraph className="mb-4">Instead of "tiers," we call them "Levels" (like in an RPG):</Paragraph>
        <Space direction="vertical" size="middle">
          <div className="pricing-level">
            <Title level={4}>Level 1: "Apprentice"</Title>
            <Text>Basic features to get you started on your alchemy journey.</Text>
          </div>
          <div className="pricing-level">
            <Title level={4}>Level 2: "Journeyman"</Title>
            <Text>More features for the serious potion-maker.</Text>
          </div>
          <div className="pricing-level">
            <Title level={4}>Level 3: "Master Alchemist"</Title>
            <Text>Full power to transmute your ideas into digital gold.</Text>
          </div>
        </Space>
      </Card>
      
      <Title level={3} className="mt-8">Loading Screens</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className="loading-example">
            <div className="loading-spinner"></div>
            <Text className="loading-text">Brewing awesome... Estimated time: Less than your last coffee break.</Text>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="loading-example">
            <div className="loading-spinner"></div>
            <Text className="loading-text">Distilling data... (Don't worry, we're not gonna sell it.)</Text>
          </Card>
        </Col>
      </Row>
      
      <Title level={3} className="mt-8">Documentation</Title>
      <Card className="voice-example-card">
        <Space direction="vertical" size="middle">
          <Paragraph className="example-doc">
            "Yes, we have docs. And they're not written by robots. (Mostly.)"
          </Paragraph>
          <Paragraph className="example-doc">
            "Troubleshooting: If it's broken, try turning it off and on again. Seriously, it works 80% of the time."
          </Paragraph>
        </Space>
      </Card>
      
      <Divider orientation="left">Tagline & Mission</Divider>
      <Card className="tagline-card">
        <Title level={3} className="tagline">Brew Your Business. Distilled to Perfection.</Title>
        <Paragraph className="mission">
          To provide a modular web application framework that empowers developers to create profitable, 
          AI-driven micro-SaaS applications with less toil and more…well, more success.
        </Paragraph>
      </Card>
    </div>
  );
};

export default BrandVoiceShowcase;
