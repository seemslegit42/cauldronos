# Data Display Components

This directory contains components for displaying data in CauldronOS.

## Components

- `Table` - Enhanced table component
- `List` - Enhanced list component
- `Card` - Enhanced card component
- `Statistic` - Component for displaying statistics
- `Timeline` - Component for displaying timeline data
- `Tree` - Component for displaying hierarchical data

## Usage

```jsx
import { Table, Card, Statistic } from '@ui/components/data-display';

function DataPage() {
  return (
    <div>
      <Card title="User Statistics">
        <Statistic title="Total Users" value={1234} />
      </Card>
      <Table 
        columns={columns} 
        dataSource={userData} 
        loading={loading}
      />
    </div>
  );
}
```
