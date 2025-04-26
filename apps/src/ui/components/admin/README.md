# Admin Components

This directory contains components specific to the admin interface of CauldronOS.

## Components

- `MetricsOverview` - Overview of key metrics for administrators
- `SidebarNav` - Navigation sidebar for admin pages
- `SystemLogTable` - Table for displaying system logs
- `TopNavBar` - Top navigation bar for admin pages
- `UserStatsPanel` - Panel for displaying user statistics

## Usage

```jsx
import { MetricsOverview, SidebarNav } from '@ui/components/admin';

function AdminPage() {
  return (
    <div>
      <TopNavBar />
      <div className="admin-content">
        <SidebarNav />
        <MetricsOverview />
      </div>
    </div>
  );
}
```
