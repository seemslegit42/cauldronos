import React from 'react';
import { Typography, Card, Divider, Space, Row, Col, Tabs } from 'antd';
import './BrandHierarchyShowcase.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

/**
 * BrandHierarchyShowcase demonstrates the relationship between
 * Pixel Potion (parent brand) and CauldronOS (flagship product).
 */
const BrandHierarchyShowcase: React.FC = () => {
  return (
    <div className="brand-hierarchy-showcase">
      <Title level={2} className="font-heading">Brand Hierarchy</Title>
      <Paragraph className="font-body">
        The relationship between Pixel Potion (parent brand) and CauldronOS (flagship product),
        showing how they work together while maintaining their distinct identities.
      </Paragraph>
      
      <div className="relationship-diagram">
        <img src="/brand-relationship.svg" alt="Brand Relationship Diagram" className="relationship-image" />
      </div>
      
      <Divider orientation="left">Pixel Potion: The Parent Brand</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="brand-card pixel-potion-card">
            <div className="brand-logo">
              <img src="/pixel-potion-logo.svg" alt="Pixel Potion Logo" width={150} />
            </div>
            <Title level={4}>The Alchemist Studio of AI</Title>
            <Paragraph>
              Creators of innovative, slightly edgy, and highly effective AI-driven tools.
              Pushing boundaries with purpose.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="brand-card">
            <Title level={4}>Tone & Voice</Title>
            <ul className="brand-list">
              <li><Text strong>Confident, Creative, Experimental</Text></li>
              <li><Text strong>Quirky and Rebellious</Text></li>
              <li><Text strong>Results-Oriented</Text></li>
            </ul>
            <div className="voice-example pixel-voice">
              "We're not just building AI; we're brewing up something different."
            </div>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="brand-card">
            <Title level={4}>Visual Identity</Title>
            <ul className="brand-list">
              <li><Text strong>Hex Logo with Potion Flask</Text></li>
              <li><Text strong>Digital Gradients & Animations</Text></li>
              <li><Text strong>Creative Typography</Text></li>
            </ul>
            <div className="color-swatches">
              <div className="color-swatch purple-swatch" title="Deep Purple (#4A0D67)"></div>
              <div className="color-swatch aqua-swatch" title="Electric Aqua (#3DAA9D)"></div>
              <div className="color-swatch gold-swatch" title="Muted Gold (#B8860B)"></div>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">CauldronOS: The Flagship Product</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="brand-card cauldron-card">
            <div className="brand-logo">
              <img src="/cauldron-product-logo.svg" alt="CauldronOS Logo" width={200} />
            </div>
            <Title level={4}>The OS for AI Apps</Title>
            <Paragraph>
              Our core platform for building and scaling agentic AI apps.
              Designed for developers who need power, reliability, and profitability.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="brand-card">
            <Title level={4}>Tone & Voice</Title>
            <ul className="brand-list">
              <li><Text strong>Pragmatic & Developer-Focused</Text></li>
              <li><Text strong>Self-Aware & Witty</Text></li>
              <li><Text strong>Technically Precise</Text></li>
            </ul>
            <div className="voice-example cauldron-voice">
              "Build smart. Scale smarter. Profit smarter."
            </div>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="brand-card">
            <Title level={4}>Visual Identity</Title>
            <ul className="brand-list">
              <li><Text strong>Abstract Node Hex</Text></li>
              <li><Text strong>Technical "Cyberpunk" Aesthetic</Text></li>
              <li><Text strong>Functional Typography</Text></li>
            </ul>
            <div className="color-swatches">
              <div className="color-swatch purple-swatch" title="Deep Purple (#4A0D67)"></div>
              <div className="color-swatch aqua-swatch emphasis" title="Electric Aqua (#3DAA9D)"></div>
              <div className="color-swatch gold-swatch" title="Muted Gold (#B8860B)"></div>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Brand Application</Divider>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Co-Branding" key="1">
          <Card className="application-card">
            <Title level={4}>Co-Branding Guidelines</Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <div className="co-branding-example">
                  <img src="/pixel-potion-wordmark.svg" alt="Pixel Potion Wordmark" width={250} className="mb-4" />
                  <img src="/cauldron-product-logo.svg" alt="CauldronOS as Product" width={300} />
                </div>
              </Col>
              <Col xs={24} md={12}>
                <ul className="brand-list">
                  <li><Text>Pixel Potion positioned as the parent/creator</Text></li>
                  <li><Text>CauldronOS positioned as the product/solution</Text></li>
                  <li><Text>Maintain proper spacing and hierarchy</Text></li>
                  <li><Text>Always identify CauldronOS as "A Product of Pixel Potion" in formal contexts</Text></li>
                </ul>
              </Col>
            </Row>
          </Card>
        </TabPane>
        
        <TabPane tab="Voice Adaptation" key="2">
          <Card className="application-card">
            <Title level={4}>Voice Adaptation Examples</Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card className="voice-card pixel-voice-card">
                  <Title level={5}>Pixel Potion Voice</Title>
                  <div className="voice-example-large">
                    "We're forging the future of AI, one damn cool tool at a time. Because let's face it, the world needs less hype and more results."
                  </div>
                  <Text type="secondary">More experimental, quirky, and boundary-pushing</Text>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card className="voice-card cauldron-voice-card">
                  <Title level={5}>CauldronOS Voice</Title>
                  <div className="voice-example-large">
                    "Brewing awesome... Estimated time: Less than your last coffee break. We've optimized your system while you were getting coffee."
                  </div>
                  <Text type="secondary">More focused on technical accuracy and developer needs</Text>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>
        
        <TabPane tab="Visual Consistency" key="3">
          <Card className="application-card">
            <Title level={4}>Visual Consistency Examples</Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card className="visual-card">
                  <Title level={5}>Shared Elements</Title>
                  <ul className="brand-list">
                    <li><Text>Hexagon shape in logos</Text></li>
                    <li><Text>Shared color palette</Text></li>
                    <li><Text>Manrope for key headings</Text></li>
                    <li><Text>Geometric, clean design</Text></li>
                  </ul>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card className="visual-card">
                  <Title level={5}>Distinct Elements</Title>
                  <ul className="brand-list">
                    <li><Text>Pixel Potion: More creative, potion imagery</Text></li>
                    <li><Text>CauldronOS: More technical, node network imagery</Text></li>
                    <li><Text>Pixel Potion: More emphasis on purple</Text></li>
                    <li><Text>CauldronOS: More emphasis on aqua</Text></li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default BrandHierarchyShowcase;
