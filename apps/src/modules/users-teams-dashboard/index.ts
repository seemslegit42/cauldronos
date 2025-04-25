import UsersTeamsDashboardModule from './UsersTeamsDashboardModule';
import { registerModule } from '../registerModules';
import { TeamOutlined } from '@ant-design/icons';

// Register the Users & Teams Dashboard module
registerModule({
  slug: 'users-teams-dashboard',
  name: 'Users & Teams Dashboard',
  description: 'Comprehensive dashboard for managing users and teams',
  version: '1.0.0',
  category: 'analytics',
  component: UsersTeamsDashboardModule,
  menuIcon: <TeamOutlined />,
  menuLabel: 'Users & Teams',
  menuOrder: 20,
  requiredRoles: ['MANAGER', 'ADMIN'],
});

export default UsersTeamsDashboardModule;