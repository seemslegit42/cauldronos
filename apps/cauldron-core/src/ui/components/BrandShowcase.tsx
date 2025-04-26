import React from 'react';
import { Card, Typography, Divider, Space, Row, Col } from 'antd';
import { colors, typography } from '../styles/theme';
import './BrandShowcase.css';

const { Title, Text, Paragraph } = Typography;

/**
 * BrandShowcase component demonstrates the CauldronOS branding system
 * including colors, typography, and logo usage.
 */
const BrandShowcase: React.FC = () => {
  return (
    <div className="brand-showcase">
      <Title level={2} className="font-heading">CauldronOS Brand System</Title>

      <Divider orientation="left">Logo System</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="The Mark" bordered={false}>
            <div className="flex justify-center mb-4">
              <img src="/logo-mark.svg" alt="CauldronOS Mark" width={120} height={120} />
            </div>
            <Paragraph>
              The Abstract Node Hex represents the core essence of CauldronOS - a network of interconnected intelligence.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="The Wordmark" bordered={false}>
            <div className="flex justify-center mb-4">
              <img src="/logo-wordmark.svg" alt="CauldronOS Wordmark" width={240} height={60} />
            </div>
            <Paragraph>
              The CauldronOS wordmark uses Manrope Semibold, a modern typeface that balances technical precision with approachability.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Combined Logo" bordered={false}>
            <div className="flex justify-center mb-4">
              <img src="/logo.svg" alt="CauldronOS Logo" width={240} height={60} />
            </div>
            <Paragraph>
              The combined logo pairs the Abstract Node Hex with the CauldronOS wordmark for maximum brand recognition.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Color Palette</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Primary Colors" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div className="color-sample" style={{ backgroundColor: colors.voidPurple, height: 60, borderRadius: 4 }}>
                <Text style={{ color: '#fff', padding: 8, display: 'block' }}>
                  Void Purple<br />#2E1A47
                </Text>
              </div>
              <div className="color-sample" style={{ backgroundColor: colors.fluxAqua, height: 60, borderRadius: 4 }}>
                <Text style={{ color: '#fff', padding: 8, display: 'block' }}>
                  Flux Aqua<br />#00B2C9
                </Text>
              </div>
              <div className="color-sample" style={{ backgroundColor: colors.growthGreen, height: 60, borderRadius: 4 }}>
                <Text style={{ color: '#fff', padding: 8, display: 'block' }}>
                  Growth Green<br />#00B67F
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Secondary Colors" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div className="color-sample" style={{ backgroundColor: colors.voidPurpleLight, height: 40, borderRadius: 4 }}>
                <Text style={{ color: '#fff', padding: 8, display: 'block' }}>
                  Void Purple Light<br />#4A2D6D
                </Text>
              </div>
              <div className="color-sample" style={{ backgroundColor: colors.fluxAquaLight, height: 40, borderRadius: 4 }}>
                <Text style={{ color: '#fff', padding: 8, display: 'block' }}>
                  Flux Aqua Light<br />#25D5EC
                </Text>
              </div>
              <div className="color-sample" style={{ backgroundColor: colors.growthGreenLight, height: 40, borderRadius: 4 }}>
                <Text style={{ color: '#fff', padding: 8, display: 'block' }}>
                  Growth Green Light<br />#00E29E
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Accent Colors" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div className="color-sample" style={{ backgroundColor: colors.accentYellow, height: 40, borderRadius: 4 }}>
                <Text style={{ color: '#000', padding: 8, display: 'block' }}>
                  Accent Yellow<br />#FFD166
                </Text>
              </div>
              <div className="color-sample" style={{ backgroundColor: colors.accentRed, height: 40, borderRadius: 4 }}>
                <Text style={{ color: '#fff', padding: 8, display: 'block' }}>
                  Accent Red<br />#EF476F
                </Text>
              </div>
              <div className="color-sample" style={{ backgroundColor: colors.darkBg, height: 40, borderRadius: 4 }}>
                <Text style={{ color: '#fff', padding: 8, display: 'block' }}>
                  Dark Background<br />#121212
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Typography</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Heading Font: Manrope" bordered={false}>
            <div style={{ fontFamily: typography.fontFamilyHeading }}>
              <div style={{ fontSize: 32, fontWeight: 700 }}>Heading 1</div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>Heading 2</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Heading 3</div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>Heading 4</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Heading 5</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Body Font: Inter" bordered={false}>
            <div style={{ fontFamily: typography.fontFamilyBody }}>
              <p style={{ fontSize: 16, fontWeight: 400 }}>
                Regular body text using Inter font. CauldronOS is a modular operating system for micro-SaaS tools, built with modern web technologies.
              </p>
              <p style={{ fontSize: 14, fontWeight: 400 }}>
                Smaller body text for UI elements and secondary content.
              </p>
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                Bold body text for emphasis and important information.
              </p>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Code Font: JetBrains Mono" bordered={false}>
            <div style={{ fontFamily: typography.fontFamilyCode, backgroundColor: '#f5f5f5', padding: 16, borderRadius: 4 }}>
              <pre style={{ margin: 0 }}>
{`// Example code
function hello() {
  console.log("Hello, CauldronOS!");
  return true;
}`}
              </pre>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Brand Voice</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="Voice Examples" bordered={false}>
            <div className="terminal" style={{ marginBottom: 16 }}>
              <Text style={{ display: 'block', marginBottom: 8 }}>$ cauldron --optimize system</Text>
              <Text className="text-flux-aqua">
                Task completed in 0.03 seconds. You're welcome.
              </Text>
            </div>
            <div className="terminal" style={{ marginBottom: 16 }}>
              <Text style={{ display: 'block', marginBottom: 8 }}>$ cauldron --divide-by-zero</Text>
              <Text className="text-accent-red">
                Looks like you're trying to divide by zero. Bold move, but even CauldronOS has its limits.
              </Text>
            </div>
            <div className="terminal">
              <Text style={{ display: 'block', marginBottom: 8 }}>$ cauldron --status</Text>
              <Text className="text-growth-green">
                We've optimized your system while you were getting coffee. You're now 15% more efficient than your coworkers.
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BrandShowcase;
