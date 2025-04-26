import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco, dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from '../theme/ThemeProvider';
import { cx } from '../utils/styleUtils';

// Import language support
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('py', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('sql', sql);

export interface CodeHighlighterProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  lineNumberStyle?: React.CSSProperties;
  customStyle?: React.CSSProperties;
  className?: string;
  fileName?: string;
  copyable?: boolean;
}

/**
 * CodeHighlighter component for syntax highlighting code snippets
 * 
 * @example
 * ```tsx
 * <CodeHighlighter 
 *   code="const hello = 'world';" 
 *   language="javascript" 
 *   showLineNumbers 
 *   fileName="example.js"
 * />
 * ```
 */
const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = false,
  wrapLines = false,
  lineNumberStyle,
  customStyle,
  className,
  fileName,
  copyable = true,
}) => {
  const { isDarkMode } = useTheme();
  const [copied, setCopied] = React.useState(false);

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={cx('code-highlighter-container rounded-md overflow-hidden', className)}>
      {fileName && (
        <div className="code-highlighter-header flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">{fileName}</span>
          {copyable && (
            <button
              onClick={handleCopy}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <div className="relative">
        {!fileName && copyable && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors z-10"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
        <SyntaxHighlighter
          language={language}
          style={isDarkMode ? dark : docco}
          showLineNumbers={showLineNumbers}
          wrapLines={wrapLines}
          lineNumberStyle={lineNumberStyle}
          customStyle={{
            margin: 0,
            borderRadius: fileName ? '0 0 0.375rem 0.375rem' : '0.375rem',
            ...customStyle,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeHighlighter;
