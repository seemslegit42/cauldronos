import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import DocsDrawer from './DocsDrawer';

interface DocsButtonProps {
  className?: string;
}

const DocsButton: React.FC<DocsButtonProps> = ({ className }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  
  const showDrawer = () => {
    setDrawerVisible(true);
  };
  
  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  
  return (
    <>
      <Tooltip title="Documentation">
        <Button 
          type="text" 
          icon={<QuestionCircleOutlined />} 
          onClick={showDrawer}
          className={className}
        />
      </Tooltip>
      
      <DocsDrawer 
        visible={drawerVisible} 
        onClose={closeDrawer} 
      />
    </>
  );
};

export default DocsButton;
