import React from 'react';
import { Card, Switch, Space, Typography, Divider, Button, Alert } from 'antd';
import { useUIStore } from '../../store/uiStore';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';
import { 
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  ExperimentOutlined,
  RocketOutlined,
  ToolOutlined,
  AppstoreOutlined,
  TableOutlined,
  MenuOutlined,
  LayoutOutlined,
  BgColorsOutlined
} from '@ant-design/icons';
import { enableAllMigrationFeatures, disableAllMigrationFeatures } from '../../utils/migrationUtils';

const { Title, Text, Paragraph } = Typography;

/**
 * Migration Settings panel component
 * Allows users to control which enhanced components are enabled
 */
export const MigrationSettings: React.FC = () => {
  const { migrationFlags, setMigrationFlags } = useUIStore();

  // Handle toggling a specific flag
  const toggleFlag = (flagName: string, value: boolean) => {
    if (!migrationFlags) return;
    
    setMigrationFlags({
      ...migrationFlags,
      [flagName]: value,
    });
  };

  // Calculate how many features are enabled
  const enabledCount = migrationFlags 
    ? Object.values(migrationFlags).filter(Boolean).length 
    : 0;
  
  const totalCount = migrationFlags 
    ? Object.keys(migrationFlags).length 
    : 0;
  
  const migrationProgress = totalCount > 0 
    ? Math.round((enabledCount / totalCount) * 100) 
    : 0;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transitions.fadeIn}
    >
      <Card 
        title={
          <Space>
            <ExperimentOutlined />
            <Title level={4}>UI Migration Settings</Title>
          </Space>
        }
        className="cauldron-card"
        extra={
          <Space>
            <Button 
              type="primary" 
              icon={<CheckCircleOutlined />}
              onClick={enableAllMigrationFeatures}
            >
              Enable All
            </Button>
            <Button 
              icon={<CloseCircleOutlined />}
              onClick={disableAllMigrationFeatures}
            >
              Disable All
            </Button>
          </Space>
        }
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message={`Migration Progress: ${migrationProgress}%`}
            description={`${enabledCount} of ${totalCount} enhanced components enabled`}
            type={migrationProgress === 100 ? "success" : migrationProgress > 50 ? "info" : "warning"}
            showIcon
          />
          
          <Paragraph>
            Use these settings to control which enhanced UI components are enabled.
            You can gradually migrate to the new UI system by enabling components one by one.
          </Paragraph>

          <Divider orientation="left">
            <Space>
              <RocketOutlined />
              <Text>Core Components</Text>
            </Space>
          </Divider>
          
          <div className="setting-item">
            <Space>
              <ToolOutlined />
              <Text>Enhanced Buttons</Text>
            </Space>
            <Switch 
              checked={migrationFlags?.useEnhancedButtons} 
              onChange={(checked) => toggleFlag('useEnhancedButtons', checked)} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <div className="setting-item">
            <Space>
              <AppstoreOutlined />
              <Text>Enhanced Cards</Text>
            </Space>
            <Switch 
              checked={migrationFlags?.useEnhancedCards} 
              onChange={(checked) => toggleFlag('useEnhancedCards', checked)} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <div className="setting-item">
            <Space>
              <AppstoreOutlined />
              <Text>Enhanced Modals</Text>
            </Space>
            <Switch 
              checked={migrationFlags?.useEnhancedModals} 
              onChange={(checked) => toggleFlag('useEnhancedModals', checked)} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <div className="setting-item">
            <Space>
              <ToolOutlined />
              <Text>Enhanced Forms</Text>
            </Space>
            <Switch 
              checked={migrationFlags?.useEnhancedForms} 
              onChange={(checked) => toggleFlag('useEnhancedForms', checked)} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <div className="setting-item">
            <Space>
              <ToolOutlined />
              <Text>Enhanced Inputs</Text>
            </Space>
            <Switch 
              checked={migrationFlags?.useEnhancedInputs} 
              onChange={(checked) => toggleFlag('useEnhancedInputs', checked)} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <Divider orientation="left">
            <Space>
              <InfoCircleOutlined />
              <Text>Advanced Components</Text>
            </Space>
          </Divider>
          
          <div className="setting-item">
            <Space>
              <TableOutlined />
              <Text>Enhanced Tables</Text>
            </Space>
            <Switch 
              checked={migrationFlags?.useEnhancedTables} 
              onChange={(checked) => toggleFlag('useEnhancedTables', checked)} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <div className="setting-item">
            <Space>
              <MenuOutlined />
              <Text>Enhanced Menus</Text>
            </Space>
            <Switch 
              checked={migrationFlags?.useEnhancedMenus} 
              onChange={(checked) => toggleFlag('useEnhancedMenus', checked)} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <div className="setting-item">
            <Space>
              <LayoutOutlined />
              <Text>Enhanced Layouts</Text>
            </Space>
            <Switch 
              checked={migrationFlags?.useEnhancedLayouts} 
              onChange={(checked) => toggleFlag('useEnhancedLayouts', checked)} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <Divider orientation="left">
            <Space>
              <BgColorsOutlined />
              <Text>Theme</Text>
            </Space>
          </Divider>
          
          <div className="setting-item">
            <Space>
              <BgColorsOutlined />
              <Text>Cyberpunk Theme</Text>
            </Space>
            <Switch 
              checked={migrationFlags?.useCyberpunkTheme} 
              onChange={(checked) => toggleFlag('useCyberpunkTheme', checked)} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <Alert
            message="Note"
            description="Changes to these settings will affect the entire application. Some components may require a page refresh to fully apply changes."
            type="info"
            showIcon
          />
        </Space>
      </Card>
      
      <style jsx>{`
        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
      `}</style>
    </motion.div>
  );
};

export default MigrationSettings;