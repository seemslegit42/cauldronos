# Dashboard Components

This directory contains components for building dashboards in CauldronOS.

## Components

- `MetricsCard` - Card for displaying metrics
- `ChartCard` - Card for displaying charts
- `StatisticsPanel` - Panel for displaying statistics
- `ActivityFeed` - Feed for displaying recent activity

## Usage

```jsx
import { MetricsCard, ChartCard } from '@ui/components/dashboard';

function DashboardPage() {
  return (
    <div>
      <MetricsCard 
        title="Total Users" 
        value={1234} 
        trend={{ value: 5.2, type: 'up' }} 
      />
      <ChartCard 
        title="User Growth" 
        chart={<LineChart data={userData} />} 
      />
    </div>
  );
}
```
