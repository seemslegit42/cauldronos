import React from 'react';
import { Card, Typography, Divider, Space, Row, Col } from 'antd';
import { colors } from '../styles/theme';
import './IconShowcase.css';

// Import our custom icons
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  NotificationIcon,
  AnalyticsIcon,
  LockIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  InfoIcon,
  LoadingIcon
} from '../icons';

const { Title, Text } = Typography;

/**
 * IconShowcase component demonstrates the CauldronOS iconography system
 */
const IconShowcase: React.FC = () => {
  return (
    <div className="icon-showcase">
      <Title level={2} className="font-heading">CauldronOS Iconography</Title>
      <Text className="font-body">
        The CauldronOS icon system uses geometric precision, clean lines, and a consistent visual language.
      </Text>
      
      <Divider orientation="left">UI Icons</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <HomeIcon size={32} color={colors.fluxAqua} />
            </div>
            <div className="icon-info">
              <Text strong>Home</Text>
              <Text type="secondary">Navigation</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <SettingsIcon size={32} color={colors.fluxAqua} />
            </div>
            <div className="icon-info">
              <Text strong>Settings</Text>
              <Text type="secondary">Configuration</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <UserIcon size={32} color={colors.fluxAqua} />
            </div>
            <div className="icon-info">
              <Text strong>User</Text>
              <Text type="secondary">Profile</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <NotificationIcon size={32} color={colors.fluxAqua} hasNotification={true} />
            </div>
            <div className="icon-info">
              <Text strong>Notification</Text>
              <Text type="secondary">Alerts</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <AnalyticsIcon size={32} color={colors.fluxAqua} />
            </div>
            <div className="icon-info">
              <Text strong>Analytics</Text>
              <Text type="secondary">Data</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <LockIcon size={32} color={colors.fluxAqua} />
            </div>
            <div className="icon-info">
              <Text strong>Lock</Text>
              <Text type="secondary">Security</Text>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Status Icons</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <SuccessIcon size={32} />
            </div>
            <div className="icon-info">
              <Text strong>Success</Text>
              <Text type="secondary">Confirmation</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <WarningIcon size={32} />
            </div>
            <div className="icon-info">
              <Text strong>Warning</Text>
              <Text type="secondary">Caution</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <ErrorIcon size={32} />
            </div>
            <div className="icon-info">
              <Text strong>Error</Text>
              <Text type="secondary">Problem</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <InfoIcon size={32} />
            </div>
            <div className="icon-info">
              <Text strong>Info</Text>
              <Text type="secondary">Information</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <LoadingIcon size={32} />
            </div>
            <div className="icon-info">
              <Text strong>Loading</Text>
              <Text type="secondary">Process</Text>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Color Variations</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <HomeIcon size={32} color={colors.voidPurple} />
            </div>
            <div className="icon-info">
              <Text strong>Void Purple</Text>
              <Text type="secondary">#2E1A47</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <HomeIcon size={32} color={colors.fluxAqua} />
            </div>
            <div className="icon-info">
              <Text strong>Flux Aqua</Text>
              <Text type="secondary">#00B2C9</Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="icon-card">
            <div className="icon-display">
              <HomeIcon size={32} color={colors.growthGreen} />
            </div>
            <div className="icon-info">
              <Text strong>Growth Green</Text>
              <Text type="secondary">#00B67F</Text>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Size Variations</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card>
            <Space size="large">
              <div className="size-example">
                <HomeIcon size={16} color={colors.fluxAqua} />
                <Text type="secondary">16px</Text>
              </div>
              
              <div className="size-example">
                <HomeIcon size={24} color={colors.fluxAqua} />
                <Text type="secondary">24px</Text>
              </div>
              
              <div className="size-example">
                <HomeIcon size={32} color={colors.fluxAqua} />
                <Text type="secondary">32px</Text>
              </div>
              
              <div className="size-example">
                <HomeIcon size={48} color={colors.fluxAqua} />
                <Text type="secondary">48px</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default IconShowcase;
