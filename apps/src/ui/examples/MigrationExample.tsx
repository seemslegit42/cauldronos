import React, { useState } from 'react';
import { Typography, Divider, Space, Row, Col, Button as AntButton, Card as AntCard, Modal as AntModal } from 'antd';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { createMigratedComponent, useMigrationFlags } from '../utils/migrationUtils';

const { Title, Paragraph, Text } = Typography;

// Create migrated components using the migration utilities
const MigratedButton = createMigratedComponent(
  AntButton,
  Button,
  'useEnhancedButtons'
);

const MigratedCard = createMigratedComponent(
  AntCard,
  Card,
  'useEnhancedCards'
);

const MigratedModal = createMigratedComponent(
  AntModal,
  Modal,
  'useEnhancedModals'
);

/**
 * Example component demonstrating how to use the migration utilities
 */
export const MigrationExample: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const migrationFlags = useMigrationFlags();

  return (
    <div>
      <Title level={2}>Migration Utilities Example</Title>
      <Paragraph>
        This example demonstrates how to use the migration utilities to gradually
        adopt the enhanced UI components. The components below will render either
        the original Ant Design components or the enhanced components based on the
        migration feature flags.
      </Paragraph>

      <Divider orientation="left">Feature Flags Status</Divider>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <AntCard title="Button Migration">
            <Text>Enhanced Buttons: </Text>
            <Text strong>{migrationFlags.useEnhancedButtons ? 'Enabled' : 'Disabled'}</Text>
          </AntCard>
        </Col>
        <Col span={8}>
          <AntCard title="Card Migration">
            <Text>Enhanced Cards: </Text>
            <Text strong>{migrationFlags.useEnhancedCards ? 'Enabled' : 'Disabled'}</Text>
          </AntCard>
        </Col>
        <Col span={8}>
          <AntCard title="Modal Migration">
            <Text>Enhanced Modals: </Text>
            <Text strong>{migrationFlags.useEnhancedModals ? 'Enabled' : 'Disabled'}</Text>
          </AntCard>
        </Col>
      </Row>

      <Divider orientation="left">Migrated Components</Divider>
      <Paragraph>
        The components below use the <code>createMigratedComponent</code> utility to
        conditionally render either the original or enhanced component based on the
        feature flags.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <MigratedCard title="Migrated Card">
            <Paragraph>
              This card will render as either the original Ant Design Card or the
              enhanced Card based on the feature flag.
            </Paragraph>
            <MigratedButton type="primary" onClick={() => setIsModalVisible(true)}>
              Open Modal
            </MigratedButton>
          </MigratedCard>
        </Col>
        <Col span={8}>
          <MigratedCard title="Migrated Card with Props">
            {migrationFlags.useEnhancedCards ? (
              <Paragraph>
                This card is using the enhanced version with cyberpunk styling.
                It supports additional props like <code>variant</code> and <code>hoverEffect</code>.
              </Paragraph>
            ) : (
              <Paragraph>
                This card is using the original Ant Design Card.
                It doesn't support the enhanced props.
              </Paragraph>
            )}
            <Space>
              <MigratedButton type="default">Default</MigratedButton>
              <MigratedButton type="primary">Primary</MigratedButton>
            </Space>
          </MigratedCard>
        </Col>
        <Col span={8}>
          <MigratedCard 
            title="Enhanced Props Example"
            // These props will only be applied when the enhanced card is enabled
            // @ts-ignore - TypeScript will complain about these props, but they're handled by the HOC
            variant="cyber"
            hoverEffect="glow"
          >
            <Paragraph>
              This card has enhanced props that will only be applied when the
              enhanced card is enabled. If the enhanced card is disabled, these
              props will be ignored.
            </Paragraph>
            <MigratedButton 
              type="primary"
              // These props will only be applied when the enhanced button is enabled
              // @ts-ignore - TypeScript will complain about these props, but they're handled by the HOC
              variant="cyber"
              glowOnHover
            >
              Enhanced Button
            </MigratedButton>
          </MigratedCard>
        </Col>
      </Row>

      <MigratedModal
        title="Migrated Modal"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <MigratedButton key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </MigratedButton>,
          <MigratedButton key="submit" type="primary" onClick={() => setIsModalVisible(false)}>
            OK
          </MigratedButton>,
        ]}
        // These props will only be applied when the enhanced modal is enabled
        // @ts-ignore - TypeScript will complain about these props, but they're handled by the HOC
        variant="cyber"
        glowEffect
      >
        <Paragraph>
          This modal will render as either the original Ant Design Modal or the
          enhanced Modal based on the feature flag.
        </Paragraph>
        <Paragraph>
          {migrationFlags.useEnhancedModals
            ? "You're seeing the enhanced modal with cyberpunk styling."
            : "You're seeing the original Ant Design modal."}
        </Paragraph>
      </MigratedModal>

      <Divider orientation="left">Implementation Code</Divider>
      <AntCard>
        <pre style={{ background: '#f5f5f5', padding: '16px', overflow: 'auto' }}>
{`// Create migrated components using the migration utilities
const MigratedButton = createMigratedComponent(
  AntButton,
  Button,
  'useEnhancedButtons'
);

const MigratedCard = createMigratedComponent(
  AntCard,
  Card,
  'useEnhancedCards'
);

const MigratedModal = createMigratedComponent(
  AntModal,
  Modal,
  'useEnhancedModals'
);

// Use the migrated components in your code
function MyComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  return (
    <MigratedCard title="Migrated Card">
      <MigratedButton 
        type="primary"
        onClick={() => setIsModalVisible(true)}
        // Enhanced props (only applied when enhanced button is enabled)
        variant="cyber"
        glowOnHover
      >
        Open Modal
      </MigratedButton>
      
      <MigratedModal
        title="Migrated Modal"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        // Enhanced props (only applied when enhanced modal is enabled)
        variant="cyber"
        glowEffect
      >
        Modal content
      </MigratedModal>
    </MigratedCard>
  );
}`}
        </pre>
      </AntCard>
    </div>
  );
};

export default MigrationExample;