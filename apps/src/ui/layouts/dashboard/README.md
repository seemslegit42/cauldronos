# Dashboard Layouts

This directory contains dashboard layout components for CauldronOS.

## Components

- `DashboardLayout` - Layout for dashboard pages
- `DashboardHeader` - Header component for dashboard layout
- `DashboardSidebar` - Sidebar component for dashboard layout
- `DashboardContent` - Content component for dashboard layout

## Usage

```jsx
import { DashboardLayout } from '@ui/layouts/dashboard';
import { MetricsCard } from '@ui/components/dashboard';

function DashboardPage() {
  return (
    <DashboardLayout
      title="Analytics Dashboard"
      breadcrumbs={[
        { title: 'Home', path: '/' },
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'Analytics' }
      ]}
    >
      <div className="dashboard-content">
        <MetricsCard title="Users" value={1234} />
        <MetricsCard title="Revenue" value="$12,345" />
      </div>
    </DashboardLayout>
  );
}
```
