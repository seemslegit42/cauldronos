# Main Layouts

This directory contains main layout components for CauldronOS.

## Components

- `MainLayout` - Main application layout
- `Sidebar` - Sidebar component for main layout
- `TopNav` - Top navigation component for main layout
- `Footer` - Footer component for main layout

## Usage

```jsx
import { MainLayout } from '@ui/layouts/main';

function App() {
  return (
    <MainLayout>
      <div className="content">
        Page content goes here
      </div>
    </MainLayout>
  );
}
```
