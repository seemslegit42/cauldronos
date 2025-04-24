import React from 'react';
import { Card, Typography, Space, Divider } from 'antd';
import CodeHighlighter from './CodeHighlighter';
import { cx } from '../utils/styleUtils';

const { Title, Text, Paragraph } = Typography;

export interface CodeExampleProps {
  title: string;
  description?: React.ReactNode;
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  fileName?: string;
  className?: string;
  additionalContent?: React.ReactNode;
}

/**
 * CodeExample component for displaying code examples with explanations
 * 
 * @example
 * ```tsx
 * <CodeExample
 *   title="Basic Button Example"
 *   description="A simple button component with onClick handler."
 *   code={`<Button onClick={() => console.log('Clicked!')}>Click Me</Button>`}
 *   language="jsx"
 *   fileName="ButtonExample.jsx"
 * />
 * ```
 */
const CodeExample: React.FC<CodeExampleProps> = ({
  title,
  description,
  code,
  language = 'javascript',
  showLineNumbers = false,
  fileName,
  className,
  additionalContent,
}) => {
  return (
    <Card 
      className={cx('code-example mb-6', className)}
      title={<Title level={4} className="m-0">{title}</Title>}
    >
      <Space direction="vertical" className="w-full">
        {description && (
          <>
            <div className="description">
              {typeof description === 'string' ? <Paragraph>{description}</Paragraph> : description}
            </div>
            <Divider className="my-3" />
          </>
        )}
        
        <CodeHighlighter
          code={code}
          language={language}
          showLineNumbers={showLineNumbers}
          fileName={fileName}
        />
        
        {additionalContent && (
          <>
            <Divider className="my-3" />
            <div className="additional-content">
              {additionalContent}
            </div>
          </>
        )}
      </Space>
    </Card>
  );
};

export default CodeExample;
