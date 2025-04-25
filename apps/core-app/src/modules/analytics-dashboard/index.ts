import AnalyticsDashboardModule from './AnalyticsDashboardModule';
import { registerModule } from '../registerModules';
import { BarChartOutlined } from '@ant-design/icons';

// Register the Analytics Dashboard module
registerModule({
  slug: 'analytics-dashboard',
  name: 'Analytics Dashboard',
  description: 'Comprehensive analytics dashboard with data visualizations',
  version: '1.0.0',
  category: 'analytics',
  component: AnalyticsDashboardModule,
  menuIcon: <BarChartOutlined />,
  menuLabel: 'Analytics',
  menuOrder: 10,
  requiredRoles: ['MANAGER', 'ADMIN'],
});

export default AnalyticsDashboardModule;