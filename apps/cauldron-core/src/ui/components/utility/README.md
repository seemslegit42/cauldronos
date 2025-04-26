# Utility Components

This directory contains utility components for CauldronOS.

## Components

- `CodeHighlighter` - Component for highlighting code
- `CodeExample` - Component for displaying code examples
- `ResizablePanel` - Resizable panel component
- `DraggableCard` - Draggable card component
- `Markdown` - Component for rendering markdown
- `Toast` - Toast notification component

## Usage

```jsx
import { CodeHighlighter, ResizablePanel, Markdown } from '@ui/components/utility';

function UtilityExample() {
  return (
    <div>
      <ResizablePanel defaultSize={300}>
        <CodeHighlighter language="javascript">
          {`function example() {
  console.log('Hello, world!');
}`}
        </CodeHighlighter>
      </ResizablePanel>
      <Markdown>
        {`# Markdown Example
This is a **markdown** example with _formatting_.
`}
      </Markdown>
    </div>
  );
}
```
