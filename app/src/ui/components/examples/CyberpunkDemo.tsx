import React, { useState } from 'react';
import { Space, Typography, Divider, Row, Col } from 'antd';
import { Button } from '../Button';
import { Card } from '../Card';
import { Modal } from '../Modal';
import { AICard } from '../ai/AICard';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';

const { Title, Text, Paragraph } = Typography;

/**
 * Demo component showcasing the cyberpunk UI system
 */
export const CyberpunkDemo: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [terminalModalVisible, setTerminalModalVisible] = useState(false);
  const [glassModalVisible, setGlassModalVisible] = useState(false);

  return (
    <div className="cyberpunk-demo">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={transitions.fadeIn}
      >
        <Title level={2} className="neon-text">CauldronOS UI System</Title>
        <Paragraph>
          A comprehensive UI system with cyberpunk aesthetics, animation support, and AI-native components.
        </Paragraph>

        <Divider orientation="left">Buttons</Divider>
        <Space wrap>
          <Button type="primary">Primary Button</Button>
          <Button>Default Button</Button>
          <Button variant="cyber">Cyber Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="text">Text Button</Button>
          <Button variant="cyber" glowOnHover>Glow Button</Button>
          <Button variant="cyber" glitchOnHover>Glitch Button</Button>
        </Space>

        <Divider orientation="left">Cards</Divider>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="Default Card" variant="default">
              <p>This is a standard card with default styling.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Cyber Card" variant="cyber" hoverEffect="lift">
              <p>This card has a cyberpunk style with lift effect on hover.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Terminal Card" variant="terminal">
              <p>This card mimics a terminal interface.</p>
            </Card>
          </Col>
        </Row>

        <Divider orientation="left">AI Components</Divider>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <AICard
              title="AI-Generated Content"
              description={
                <Paragraph>
                  This is an example of AI-generated content with metadata about the model,
                  confidence level, and other relevant information.
                </Paragraph>
              }
              model="Groq Swarm"
              confidence={0.85}
              tags={["AI", "Generated", "Example"]}
              footer={
                <Text type="secondary">Generated in 1.2 seconds</Text>
              }
            />
          </Col>
          <Col span={12}>
            <AICard
              title="AI Processing"
              isGenerating={true}
            />
          </Col>
        </Row>

        <Divider orientation="left">Modals</Divider>
        <Space>
          <Button variant="cyber" onClick={() => setModalVisible(true)}>
            Open Cyber Modal
          </Button>
          <Button variant="cyber" onClick={() => setTerminalModalVisible(true)}>
            Open Terminal Modal
          </Button>
          <Button variant="cyber" onClick={() => setGlassModalVisible(true)}>
            Open Glass Modal
          </Button>
        </Space>

        <Modal
          title="Cyber Modal"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          variant="cyber"
          footer={[
            <Button key="back" onClick={() => setModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => setModalVisible(false)}>
              Submit
            </Button>,
          ]}
        >
          <p>This is a modal with cyberpunk styling.</p>
        </Modal>

        <Modal
          title="Terminal Modal"
          open={terminalModalVisible}
          onCancel={() => setTerminalModalVisible(false)}
          variant="terminal"
          footer={[
            <Button key="back" onClick={() => setTerminalModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => setTerminalModalVisible(false)}>
              Submit
            </Button>,
          ]}
        >
          <p>This modal mimics a terminal interface.</p>
        </Modal>

        <Modal
          title="Glass Modal"
          open={glassModalVisible}
          onCancel={() => setGlassModalVisible(false)}
          variant="glass"
          footer={[
            <Button key="back" onClick={() => setGlassModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => setGlassModalVisible(false)}>
              Submit
            </Button>,
          ]}
        >
          <p>This modal has a glass morphism effect.</p>
        </Modal>

        <Divider orientation="left">Background Effects</Divider>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card className="grid-bg" style={{ height: 200 }}>
              <Title level={5}>Grid Background</Title>
              <p>A subtle grid pattern background.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="circuit-bg" style={{ height: 200 }}>
              <Title level={5}>Circuit Background</Title>
              <p>A background with circuit-like patterns.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="hex-bg" style={{ height: 200 }}>
              <Title level={5}>Hexagonal Background</Title>
              <p>A background with hexagonal patterns.</p>
            </Card>
          </Col>
        </Row>

        <Divider orientation="left">Text Effects</Divider>
        <Space direction="vertical">
          <Title level={4} className="neon-text">Neon Text Effect</Title>
          <Title level={4} className="glitch-text">Glitch Text Effect (Hover)</Title>
        </Space>
      </motion.div>
    </div>
  );
};

export default CyberpunkDemo;