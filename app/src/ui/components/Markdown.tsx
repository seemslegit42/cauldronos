import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Typography, Alert } from 'antd';
import { clsx } from 'clsx';

const { Title, Paragraph, Text, Link } = Typography;

interface MarkdownProps {
  content: string;
  className?: string;
}

/**
 * Markdown component for rendering markdown content with syntax highlighting
 */
const Markdown: React.FC<MarkdownProps> = ({ content, className }) => {
  return (
    <div className={clsx('markdown-content', className)}>
      <ReactMarkdown
        components={{
          // Headings
          h1: ({ node, ...props }) => <Title level={1} {...props} />,
          h2: ({ node, ...props }) => <Title level={2} {...props} />,
          h3: ({ node, ...props }) => <Title level={3} {...props} />,
          h4: ({ node, ...props }) => <Title level={4} {...props} />,
          h5: ({ node, ...props }) => <Title level={5} {...props} />,
          
          // Paragraphs and text
          p: ({ node, ...props }) => <Paragraph {...props} />,
          strong: ({ node, ...props }) => <Text strong {...props} />,
          em: ({ node, ...props }) => <Text italic {...props} />,
          del: ({ node, ...props }) => <Text delete {...props} />,
          
          // Links
          a: ({ node, ...props }) => <Link {...props} />,
          
          // Lists
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
          
          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-4 text-gray-700" {...props} />
          ),
          
          // Code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            return !inline ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={language}
                PreTag="div"
                className="rounded-md my-4"
                showLineNumbers
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-red-500" {...props}>
                {children}
              </code>
            );
          },
          
          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-200" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-200" {...props} />,
          tr: ({ node, ...props }) => <tr {...props} />,
          th: ({ node, ...props }) => (
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              {...props}
            />
          ),
          td: ({ node, ...props }) => <td className="px-6 py-4 whitespace-nowrap" {...props} />,
          
          // Horizontal rule
          hr: ({ node, ...props }) => <hr className="my-6 border-gray-200" {...props} />,
          
          // Custom components for alerts
          div: ({ node, className, ...props }) => {
            if (className === 'note') {
              return <Alert message="Note" description={props.children} type="info" showIcon />;
            }
            if (className === 'warning') {
              return <Alert message="Warning" description={props.children} type="warning" showIcon />;
            }
            if (className === 'error') {
              return <Alert message="Error" description={props.children} type="error" showIcon />;
            }
            if (className === 'success') {
              return <Alert message="Success" description={props.children} type="success" showIcon />;
            }
            return <div className={className} {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;