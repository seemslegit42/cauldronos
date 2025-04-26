import React, { useState } from 'react';
import {
  Card,
  Typography,
  Table,
  List,
  Button,
  Space,
  Divider,
  Tag,
  Collapse,
  Tooltip,
  Spin,
  Empty
} from 'cauldronos-ui';
import {
  CopyOutlined,
  CheckOutlined,
  CodeOutlined,
  TableOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  LoadingOutlined
} from 'cauldronos-ui';
import StreamableText from './StreamableText';
import ReactMarkdown from 'react-markdown';
// Import SyntaxHighlighter and a style
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// Import languages you want to use
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';

// Register the languages you want to use
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('sql', sql);

const { Text, Paragraph, Title } = Typography;
const { Panel } = Collapse;

// Types of content the AI can output
export type AIOutputType =
  | 'text'
  | 'markdown'
  | 'code'
  | 'table'
  | 'list'
  | 'action'
  | 'error'
  | 'loading'
  | 'empty';

// Structure for suggested actions
export interface AISuggestedAction {
  label: string;
  onClick: () => void;
  type?: 'default' | 'primary' | 'link' | 'text' | 'dashed';
  icon?: React.ReactNode;
  tooltip?: string;
}

// Structure for table data
export interface AITableData {
  columns: {
    title: string;
    dataIndex: string;
    key: string;
    render?: (text: any, record: any) => React.ReactNode;
  }[];
  dataSource: Record<string, any>[];
}

// Structure for list data
export interface AIListData {
  items: {
    key: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    extra?: React.ReactNode;
  }[];
}

// Props for the AIOutputBlock component
export interface AIOutputBlockProps {
  type: AIOutputType;
  content?: string | AITableData | AIListData | AISuggestedAction[];
  isStreaming?: boolean;
  language?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onStreamingComplete?: () => void;
}

/**
 * A versatile component that can render different types of AI output,
 * including streaming text, markdown, code blocks, tables, lists, and suggested actions.
 */
const AIOutputBlock: React.FC<AIOutputBlockProps> = ({
  type,
  content,
  isStreaming = false,
  language = 'javascript',
  title,
  className = '',
  style = {},
  onStreamingComplete
}) => {
  const [copied, setCopied] = useState(false);

  // Handle copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render different types of content
  const renderContent = () => {
    switch (type) {
      case 'text':
        return (
          <StreamableText
            content={content as string}
            isStreaming={isStreaming}
            variant="paragraph"
            onStreamingComplete={onStreamingComplete}
          />
        );

      case 'markdown':
        if (isStreaming) {
          return (
            <StreamableText
              content={content as string}
              isStreaming={isStreaming}
              variant="paragraph"
              onStreamingComplete={onStreamingComplete}
            />
          );
        } else {
          return (
            <div className="markdown-content">
              <ReactMarkdown>{content as string}</ReactMarkdown>
            </div>
          );
        }

      case 'code':
        const codeContent = content as string;
        return (
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <Tooltip title={copied ? "Copied!" : "Copy code"}>
                <Button
                  type="text"
                  icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                  onClick={() => handleCopy(codeContent)}
                  size="small"
                />
              </Tooltip>
            </div>
            {isStreaming ? (
              <div className="bg-gray-800 p-4 rounded overflow-auto">
                <StreamableText
                  content={codeContent}
                  isStreaming={isStreaming}
                  variant="text"
                  className="text-white font-mono"
                  onStreamingComplete={onStreamingComplete}
                />
              </div>
            ) : (
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{ borderRadius: '4px' }}
                showLineNumbers={true}
                showInlineLineNumbers={true}
                wrapLongLines={true}
              >
                {codeContent}
              </SyntaxHighlighter>
            )}
          </div>
        );

      case 'table':
        const tableData = content as AITableData;
        return (
          <Table
            columns={tableData.columns}
            dataSource={tableData.dataSource}
            pagination={tableData.dataSource.length > 10 ? { pageSize: 10 } : false}
            size="small"
            bordered
          />
        );

      case 'list':
        const listData = content as AIListData;
        return (
          <List
            itemLayout="horizontal"
            dataSource={listData.items}
            renderItem={item => (
              <List.Item extra={item.extra}>
                <List.Item.Meta
                  avatar={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        );

      case 'action':
        const actions = content as AISuggestedAction[];
        return (
          <Space wrap>
            {actions.map((action, index) => (
              <Tooltip key={index} title={action.tooltip}>
                <Button
                  type={action.type || 'default'}
                  icon={action.icon}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              </Tooltip>
            ))}
          </Space>
        );

      case 'error':
        return (
          <div className="flex items-center text-red-500">
            <WarningOutlined className="mr-2" />
            <Text type="danger">{content as string}</Text>
          </div>
        );

      case 'loading':
        return (
          <div className="flex items-center justify-center py-4">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            <Text className="ml-2 text-gray-500">
              {content || 'Thinking...'}
            </Text>
          </div>
        );

      case 'empty':
        return (
          <Empty
            description={content as string || 'No data available'}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        );

      default:
        return <Text>Unsupported content type</Text>;
    }
  };

  // Render the output block with appropriate styling
  return (
    <Card
      title={title ? (
        <div className="flex items-center">
          {getIconForType(type)}
          <span className="ml-2">{title}</span>
        </div>
      ) : null}
      className={`ai-output-block ${className}`}
      style={style}
      bordered
    >
      {renderContent()}
    </Card>
  );
};

// Helper function to get an icon based on the content type
const getIconForType = (type: AIOutputType) => {
  switch (type) {
    case 'text':
    case 'markdown':
      return <FileTextOutlined />;
    case 'code':
      return <CodeOutlined />;
    case 'table':
      return <TableOutlined />;
    case 'list':
      return <UnorderedListOutlined />;
    case 'error':
      return <WarningOutlined />;
    case 'loading':
      return <LoadingOutlined spin />;
    case 'action':
      return <InfoCircleOutlined />;
    default:
      return null;
  }
};

export default AIOutputBlock;
