import { ProLayoutProps } from '@ant-design/pro-components';
import { colors } from '../src/styles/theme';

/**
 * @name CauldronOS Default Settings
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark',
  // Corporate cyberpunk primary color
  colorPrimary: colors.primaryBlue,
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'CauldronOS',
  pwa: true,
  logo: '/logo.svg',
  iconfontUrl: '',
  token: {
    // Customize layout tokens
    sider: {
      colorMenuBackground: colors.darkBgElevated,
      colorTextMenu: colors.darkText,
      colorTextMenuSelected: colors.primaryBlue,
      colorTextMenuItemHover: colors.primaryCyan,
    },
    header: {
      colorBgHeader: colors.darkBgElevated,
      colorTextMenuSelected: colors.primaryBlue,
      colorTextMenu: colors.darkText,
    },
    // Typography
    fontFamily: "'Roboto Mono', monospace",
    borderRadius: 4,
  },
};

export default Settings;
