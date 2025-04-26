import React from 'react';
import { Typography, Card, Divider, Space, Row, Col } from 'antd';
import './TypographyShowcase.css';

const { Title, Text, Paragraph } = Typography;

/**
 * TypographyShowcase component demonstrates the CauldronOS typography system
 * with Manrope for headings and JetBrains Mono for code.
 */
const TypographyShowcase: React.FC = () => {
  return (
    <div className="typography-showcase">
      <Title level={2} className="font-heading">CauldronOS Typography</Title>
      <Paragraph className="font-body">
        The CauldronOS typography system uses Manrope for headings with bolder font weights,
        Inter for body text, and JetBrains Mono for code blocks.
      </Paragraph>
      
      <Divider orientation="left">Heading Font: Manrope</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card className="typography-card">
            <div className="heading-examples">
              <div className="heading-example">
                <Title level={1}>Heading 1 (36px, Extra Bold)</Title>
                <Text type="secondary">Font: Manrope, Weight: 800, Size: 36px</Text>
              </div>
              
              <div className="heading-example">
                <Title level={2}>Heading 2 (28px, Bold)</Title>
                <Text type="secondary">Font: Manrope, Weight: 700, Size: 28px</Text>
              </div>
              
              <div className="heading-example">
                <Title level={3}>Heading 3 (22px, Bold)</Title>
                <Text type="secondary">Font: Manrope, Weight: 700, Size: 22px</Text>
              </div>
              
              <div className="heading-example">
                <Title level={4}>Heading 4 (18px, Semibold)</Title>
                <Text type="secondary">Font: Manrope, Weight: 600, Size: 18px</Text>
              </div>
              
              <div className="heading-example">
                <Title level={5}>Heading 5 (16px, Semibold)</Title>
                <Text type="secondary">Font: Manrope, Weight: 600, Size: 16px</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Body Font: Inter</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className="typography-card">
            <Title level={4}>Regular Body Text</Title>
            <Paragraph className="body-example">
              This is regular body text using Inter font. CauldronOS is a modular operating system for 
              micro-SaaS tools, built with modern web technologies. The quick brown fox jumps over the 
              lazy dog.
            </Paragraph>
            <Text type="secondary">Font: Inter, Weight: 400, Size: 14px</Text>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card className="typography-card">
            <Title level={4}>Medium Body Text</Title>
            <Paragraph className="body-example medium">
              This is medium body text using Inter font. CauldronOS is a modular operating system for 
              micro-SaaS tools, built with modern web technologies. The quick brown fox jumps over the 
              lazy dog.
            </Paragraph>
            <Text type="secondary">Font: Inter, Weight: 500, Size: 14px</Text>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card className="typography-card">
            <Title level={4}>Small Body Text</Title>
            <Paragraph className="body-example small">
              This is small body text using Inter font. CauldronOS is a modular operating system for 
              micro-SaaS tools, built with modern web technologies. The quick brown fox jumps over the 
              lazy dog.
            </Paragraph>
            <Text type="secondary">Font: Inter, Weight: 400, Size: 12px</Text>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card className="typography-card">
            <Title level={4}>Large Body Text</Title>
            <Paragraph className="body-example large">
              This is large body text using Inter font. CauldronOS is a modular operating system for 
              micro-SaaS tools, built with modern web technologies.
            </Paragraph>
            <Text type="secondary">Font: Inter, Weight: 400, Size: 16px</Text>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Code Font: JetBrains Mono</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card className="typography-card">
            <Title level={4}>Code Block</Title>
            <div className="code-example">
              <pre>
{`// Example code using JetBrains Mono
function brewAwesome() {
  console.log("Brewing awesome... Estimated time: Less than your last coffee break.");
  return {
    status: "brewing",
    progress: 42,
    estimatedTime: "less than your coffee break"
  };
}`}
              </pre>
            </div>
            <Text type="secondary">Font: JetBrains Mono, Weight: 400, Size: 14px</Text>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card className="typography-card">
            <Title level={4}>Inline Code</Title>
            <Paragraph>
              You can use the <code>brewAwesome()</code> function to start the brewing process. 
              It returns an object with <code>status</code>, <code>progress</code>, and <code>estimatedTime</code> properties.
            </Paragraph>
            <Text type="secondary">Font: JetBrains Mono, Weight: 400, Size: 14px</Text>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card className="typography-card">
            <Title level={4}>Terminal Output</Title>
            <div className="terminal-example">
              <div className="terminal-line">$ cauldron brew --awesome</div>
              <div className="terminal-line">Brewing awesome... Estimated time: Less than your last coffee break.</div>
              <div className="terminal-line">Progress: ████████████░░░░░░░░ 42%</div>
            </div>
            <Text type="secondary">Font: JetBrains Mono, Weight: 400, Size: 14px</Text>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Font Combinations</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card className="typography-card">
            <Title level={2} className="combination-heading">Cauldron: So You Wanna Build an AI Empire?</Title>
            <Paragraph className="combination-body">
              We'll help you avoid the usual chaos. Forget 'Move Fast and Break Things.' We're about 'Build Smart and Don't Go Broke.'
              Agent Templates: Think of them as your AI dev cheat codes. (But, like, ethical cheat codes.)
            </Paragraph>
            <div className="combination-code">
              <code>import { brewAwesome } from 'cauldron-os';</code>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TypographyShowcase;
