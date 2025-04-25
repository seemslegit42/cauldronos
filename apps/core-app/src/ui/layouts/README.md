# Layouts

This directory contains layout components and systems for CauldronOS.

## Components

- `Container` - Basic container component with responsive padding
- `Grid` - Flexible grid system
- `Row` and `Column` - Row and column components for grid layouts
- `PageLayout` - Standard page layout with header, sidebar, and content
- `DashboardLayout` - Layout specifically for dashboard pages
- `SplitLayout` - Two-column layout for side-by-side content

## Usage

```jsx
import { Container, Row, Column } from '@ui/layouts';

function Page() {
  return (
    <Container>
      <Row>
        <Column span={8}>Left content</Column>
        <Column span={16}>Right content</Column>
      </Row>
    </Container>
  );
}

// Using page layouts
import { PageLayout } from '@ui/layouts';

function AppPage() {
  return (
    <PageLayout
      header={<Header />}
      sidebar={<Sidebar />}
      footer={<Footer />}
    >
      Page content
    </PageLayout>
  );
}
```

## Layout System

The layout system follows the CauldronOS design guidelines:

- 24-column grid system (compatible with Ant Design)
- 8px base unit for spacing
- Responsive breakpoints
- Consistent margins and padding
