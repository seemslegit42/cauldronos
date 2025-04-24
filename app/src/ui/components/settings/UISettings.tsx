import React from 'react';
import { Card, Switch, Radio, Space, Typography, Divider } from 'antd';
import { useUIStore } from '../../store/uiStore';
import { motion } from 'framer-motion';
import { transitions } from '../../animations/transitions';
import { 
  Moon, 
  Sun, 
  Minimize2, 
  Maximize2, 
  Sidebar, 
  Bell, 
  Zap, 
  Scan, 
  Sparkles 
} from 'lucide-react';

const { Title, Text } = Typography;
const { Group: RadioGroup, Button: RadioButton } = Radio;

/**
 * UI Settings panel component
 * Allows users to customize their UI preferences
 */
export const UISettings: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    reducedMotion,
    toggleReducedMotion,
    uiDensity,
    setUIDensity,
    isSidebarCollapsed,
    toggleSidebar,
    notificationsEnabled,
    toggleNotifications,
    glowEffectsEnabled,
    toggleGlowEffects,
    scanlineEffectsEnabled,
    toggleScanlineEffects,
    glitchEffectsEnabled,
    toggleGlitchEffects,
  } = useUIStore();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={transitions.fadeIn}
    >
      <Card 
        title={<Title level={4}>UI Settings</Title>}
        className="cauldron-card"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Divider orientation="left">Theme</Divider>
          
          <div className="setting-item">
            <Space>
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
              <Text>Dark Mode</Text>
            </Space>
            <Switch 
              checked={isDarkMode} 
              onChange={toggleDarkMode} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <div className="setting-item">
            <Space>
              <Minimize2 size={16} />
              <Text>Reduced Motion</Text>
            </Space>
            <Switch 
              checked={reducedMotion} 
              onChange={toggleReducedMotion} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <Divider orientation="left">Layout</Divider>
          
          <div className="setting-item">
            <Text>UI Density</Text>
            <RadioGroup 
              value={uiDensity} 
              onChange={(e) => setUIDensity(e.target.value)}
              optionType="button"
            >
              <RadioButton value="compact">Compact</RadioButton>
              <RadioButton value="default">Default</RadioButton>
              <RadioButton value="comfortable">Comfortable</RadioButton>
            </RadioGroup>
          </div>
          
          <div className="setting-item">
            <Space>
              <Sidebar size={16} />
              <Text>Collapsed Sidebar</Text>
            </Space>
            <Switch 
              checked={isSidebarCollapsed} 
              onChange={toggleSidebar} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <Divider orientation="left">Notifications</Divider>
          
          <div className="setting-item">
            <Space>
              <Bell size={16} />
              <Text>Enable Notifications</Text>
            </Space>
            <Switch 
              checked={notificationsEnabled} 
              onChange={toggleNotifications} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <Divider orientation="left">Visual Effects</Divider>
          
          <div className="setting-item">
            <Space>
              <Zap size={16} />
              <Text>Glow Effects</Text>
            </Space>
            <Switch 
              checked={glowEffectsEnabled} 
              onChange={toggleGlowEffects} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <div className="setting-item">
            <Space>
              <Scan size={16} />
              <Text>Scanline Effects</Text>
            </Space>
            <Switch 
              checked={scanlineEffectsEnabled} 
              onChange={toggleScanlineEffects} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
          
          <div className="setting-item">
            <Space>
              <Sparkles size={16} />
              <Text>Glitch Effects</Text>
            </Space>
            <Switch 
              checked={glitchEffectsEnabled} 
              onChange={toggleGlitchEffects} 
              checkedChildren="On" 
              unCheckedChildren="Off"
            />
          </div>
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

export default UISettings;