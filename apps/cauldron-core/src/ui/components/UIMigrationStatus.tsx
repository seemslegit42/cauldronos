import React, { useEffect, useState } from 'react';
import { Alert, Card, Progress, Space, Typography, Button } from 'antd';
import { CheckCircleOutlined, RocketOutlined, SettingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { transitions } from '../animations/transitions';
import { useMigrationStatus } from '../utils/migrateUI';
import { enableAllMigrationFeatures } from '../utils/migrationUtils';

const { Title, Text, Paragraph } = Typography;

interface UIMigrationStatusProps {
  onComplete?: () => void;
  showSettings?: boolean;
  onShowSettings?: () => void;
}

/**
 * UI Migration Status component
 * Displays the current migration status and provides controls to complete the migration
 */
export const UIMigrationStatus: React.FC<UIMigrationStatusProps> = ({
  onComplete,
  showSettings = true,
  onShowSettings,
}) => {
  const { migrationProgress, enabledCount, totalCount, isFullyMigrated } = useMigrationStatus();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handle complete migration button click
  const handleCompleteMigration = () => {
    enableAllMigrationFeatures();
    setShowSuccessMessage(true);
    
    // Call onComplete callback after a delay
    if (onComplete) {
      setTimeout(onComplete, 2000);
    }
  };

  // Show success message when fully migrated
  useEffect(() => {
    if (isFullyMigrated) {
      setShowSuccessMessage(true);
    }
  }, [isFullyMigrated]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transitions.fadeIn}
    >
      <Card
        title={
          <Space>
            <RocketOutlined />
            <Title level={4}>UI Migration Status</Title>
          </Space>
        }
        className="cauldron-card"
        extra={
          showSettings && (
            <Button
              icon={<SettingOutlined />}
              onClick={onShowSettings}
            >
              Migration Settings
            </Button>
          )
        }
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {showSuccessMessage ? (
            <Alert
              message="Migration Complete"
              description="All enhanced UI components are now enabled."
              type="success"
              showIcon
              icon={<CheckCircleOutlined />}
            />
          ) : (
            <>
              <Paragraph>
                The UI migration is {migrationProgress === 100 ? 'complete' : 'in progress'}.
                {migrationProgress < 100 && ' You can complete the migration to enable all enhanced components.'}
              </Paragraph>

              <Progress
                percent={migrationProgress}
                status={migrationProgress === 100 ? 'success' : 'active'}
                format={() => `${migrationProgress}%`}
              />

              <Text>
                {enabledCount} of {totalCount} enhanced components enabled
              </Text>

              {migrationProgress < 100 && (
                <Button
                  type="primary"
                  icon={<RocketOutlined />}
                  onClick={handleCompleteMigration}
                >
                  Complete Migration
                </Button>
              )}
            </>
          )}
        </Space>
      </Card>
    </motion.div>
  );
};

export default UIMigrationStatus;