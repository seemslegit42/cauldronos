import React from 'react';
import { Card, Typography } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import ThemeSettings from '../theme/ThemeSettings';
import RoleBasedAccess from '../auth/RoleBasedAccess';
import WorkspaceAccess from '../auth/WorkspaceAccess';

const { Title, Text } = Typography;

const WorkspaceThemeSettings: React.FC = () => {
  return (
    <RoleBasedAccess allowedRoles={['ADMIN', 'MANAGER']}>
      <WorkspaceAccess>
        <div>
          <div className="mb-6">
            <Title level={2}>Theme Settings</Title>
            <Text type="secondary">
              Customize the appearance of your workspace
            </Text>
          </div>
          
          <ThemeSettings isAdmin={true} />
        </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default WorkspaceThemeSettings;
