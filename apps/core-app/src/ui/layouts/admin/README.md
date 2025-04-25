# Admin Layouts

This directory contains admin layout components for CauldronOS.

## Components

- `AdminLayout` - Layout for admin pages
- `AdminHeader` - Header component for admin layout
- `AdminSidebar` - Sidebar component for admin layout
- `AdminContent` - Content component for admin layout

## Usage

```jsx
import { AdminLayout } from '@ui/layouts/admin';
import { MetricsOverview, SystemLogTable } from '@ui/components/admin';

function AdminDashboardPage() {
  return (
    <AdminLayout
      title="Admin Dashboard"
      breadcrumbs={[
        { title: 'Home', path: '/' },
        { title: 'Admin', path: '/admin' },
        { title: 'Dashboard' }
      ]}
    >
      <div className="admin-content">
        <MetricsOverview />
        <SystemLogTable />
      </div>
    </AdminLayout>
  );
}
```
