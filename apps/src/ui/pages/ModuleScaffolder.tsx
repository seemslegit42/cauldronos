import React from 'react';
import { Typography, Breadcrumb, Alert } from 'antd';
import { HomeOutlined, CodeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from 'wasp/client/auth';
import RoleBasedAccess from '../auth/RoleBasedAccess';
import WorkspaceAccess from '../auth/WorkspaceAccess';
import ModuleScaffolder from '../modules/ModuleScaffolder';

const { Title, Paragraph } = Typography;

const ModuleScaffolderPage: React.FC = () => {
  const { data: user } = useAuth();

  const handleModuleGenerated = (moduleData: any) => {
    console.log('Module generated:', moduleData);
    // In a real implementation, this would trigger the module creation process
  };

  return (
    <RoleBasedAccess allowedRoles={['ADMIN']}>
      <WorkspaceAccess>
        <div>
          <div className="mb-6">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/dashboard">
                  <HomeOutlined /> Dashboard
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/modules">
                  Modules
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <CodeOutlined /> Module Scaffolder
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="mb-6">
            <Title level={2}>Module Scaffolder</Title>
            <Paragraph>
              Create new modules for your workspace using the Module Scaffolder. Define database models, UI components, and more.
            </Paragraph>
          </div>

          <Alert
            message="Developer Preview"
            description="The Module Scaffolder is currently in developer preview. Generated modules may require additional configuration."
            type="warning"
            showIcon
            className="mb-6"
          />

          <ModuleScaffolder onComplete={handleModuleGenerated} />
        </div>
      </WorkspaceAccess>
    </RoleBasedAccess>
  );
};

export default ModuleScaffolderPage;
