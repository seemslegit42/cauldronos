# Navigation Components

This directory contains navigation components for CauldronOS.

## Components

- `Menu` - Enhanced menu component
- `Breadcrumb` - Enhanced breadcrumb component
- `Pagination` - Enhanced pagination component
- `Steps` - Enhanced steps component
- `Tabs` - Enhanced tabs component
- `Dropdown` - Enhanced dropdown component
- `Sidebar` - Sidebar navigation component
- `TopNav` - Top navigation component

## Usage

```jsx
import { Menu, Breadcrumb, Tabs } from '@ui/components/navigation';

function NavigationExample() {
  return (
    <div>
      <TopNav />
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Overview" key="1">
          Overview Content
        </Tabs.TabPane>
        <Tabs.TabPane tab="Details" key="2">
          Details Content
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
```
