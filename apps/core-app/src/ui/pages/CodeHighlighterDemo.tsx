import React, { useState } from 'react';
import { Card, Typography, Tabs, Select, Switch, Space, Divider, Input, Button, Form } from 'antd';
import { CodeHighlighter, CodeExample } from '../components';
import { useTheme } from '../theme/ThemeProvider';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const CodeHighlighterDemo: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('1');
  const [language, setLanguage] = useState('javascript');
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [fileName, setFileName] = useState('example.js');
  const [customCode, setCustomCode] = useState(`// Example JavaScript code
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Call the function
const message = greet('World');
console.log(message); // Output: Hello, World!
`);

  // Example code snippets
  const examples = {
    javascript: `// Example JavaScript code
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Call the function
const message = greet('World');
console.log(message); // Output: Hello, World!
`,
    typescript: `// Example TypeScript code
interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return \`Hello, \${person.name}! You are \${person.age} years old.\`;
}

// Create a person object
const person: Person = {
  name: 'Alice',
  age: 30
};

// Call the function
const message = greet(person);
console.log(message);
`,
    python: `# Example Python code
def factorial(n):
    """Calculate the factorial of a number."""
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)

# Calculate factorial of 5
result = factorial(5)
print(f"The factorial of 5 is {result}")  # Output: The factorial of 5 is 120
`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example HTML</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is the home section of my website.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2023 My Website</p>
    </footer>
</body>
</html>
`,
    css: `/* Example CSS code */
body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}

nav ul li {
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

nav ul li a:hover {
  color: #0066cc;
}

@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
  }

  nav ul li {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
`,
    json: `{
  "name": "cauldronos",
  "version": "1.0.0",
  "description": "A modular enterprise OS framework for AI SaaS",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "jest": "^27.0.6",
    "nodemon": "^2.0.12"
  },
  "author": "CauldronOS Team",
  "license": "MIT"
}
`,
    sql: `-- Example SQL query
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a new user
INSERT INTO users (username, email, password_hash)
VALUES ('johndoe', 'john@example.com', 'hashed_password_here');

-- Query to find users
SELECT id, username, email, created_at
FROM users
WHERE created_at > '2023-01-01'
ORDER BY created_at DESC
LIMIT 10;
`,
    bash: `#!/bin/bash
# Example Bash script

# Define variables
APP_NAME="CauldronOS"
VERSION="1.0.0"
LOG_FILE="/var/log/cauldron.log"

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if required tools are installed
echo "Checking dependencies..."
for cmd in node npm docker; do
  if command_exists "$cmd"; then
    echo "✅ $cmd is installed"
  else
    echo "❌ $cmd is not installed"
    exit 1
  fi
done

# Create directory structure
echo "Creating directory structure..."
mkdir -p ./data/logs
mkdir -p ./config

# Write configuration
echo "Writing configuration..."
cat > ./config/app.json << EOF
{
  "name": "$APP_NAME",
  "version": "$VERSION",
  "logFile": "$LOG_FILE"
}
EOF

echo "Setup completed successfully!"
`
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCustomCode(examples[value as keyof typeof examples]);

    // Update file extension based on language
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      html: 'html',
      css: 'css',
      json: 'json',
      sql: 'sql',
      bash: 'sh'
    };

    setFileName(`example.${extensions[value]}`);
  };

  return (
    <div className="code-highlighter-demo">
      <Title level={2}>Code Highlighter Component</Title>
      <Paragraph>
        A customizable syntax highlighting component for displaying code snippets with support for multiple languages,
        themes, line numbers, and more.
      </Paragraph>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Examples" key="1">
          <Card className="mb-6">
            <Space direction="vertical" className="w-full">
              <div className="flex flex-wrap gap-4 mb-4">
                <div>
                  <Text strong>Language:</Text>
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                    style={{ width: 150, marginLeft: 8 }}
                  >
                    <Option value="javascript">JavaScript</Option>
                    <Option value="typescript">TypeScript</Option>
                    <Option value="python">Python</Option>
                    <Option value="html">HTML</Option>
                    <Option value="css">CSS</Option>
                    <Option value="json">JSON</Option>
                    <Option value="sql">SQL</Option>
                    <Option value="bash">Bash</Option>
                  </Select>
                </div>
                <div>
                  <Text strong>Show Line Numbers:</Text>
                  <Switch
                    checked={showLineNumbers}
                    onChange={setShowLineNumbers}
                    style={{ marginLeft: 8 }}
                  />
                </div>
                <div>
                  <Text strong>File Name:</Text>
                  <Input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    style={{ width: 150, marginLeft: 8 }}
                  />
                </div>
              </div>

              <Divider />

              <CodeHighlighter
                code={customCode}
                language={language}
                showLineNumbers={showLineNumbers}
                fileName={fileName}
              />

              <Divider />

              <TextArea
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                rows={10}
                placeholder="Enter your code here..."
                className="font-mono"
              />
            </Space>
          </Card>
        </TabPane>

        <TabPane tab="Usage" key="2">
          <Card className="mb-6">
            <Title level={4}>Basic Usage</Title>
            <Paragraph>
              Import the component and use it in your React components:
            </Paragraph>

            <CodeHighlighter
              code={`import CodeHighlighter from '../components/CodeHighlighter';

// Basic usage
<CodeHighlighter
  code="const hello = 'world';"
  language="javascript"
/>

// With line numbers and filename
<CodeHighlighter
  code="const hello = 'world';"
  language="javascript"
  showLineNumbers={true}
  fileName="example.js"
/>

// With custom styles
<CodeHighlighter
  code="const hello = 'world';"
  language="javascript"
  customStyle={{ fontSize: '16px' }}
  className="my-custom-class"
/>
`}
              language="typescript"
              showLineNumbers={true}
              fileName="Example.tsx"
            />

            <Divider />

            <Title level={4}>Props</Title>
            <Paragraph>
              The CodeHighlighter component accepts the following props:
            </Paragraph>

            <CodeHighlighter
              code={`interface CodeHighlighterProps {
  code: string;              // The code to highlight (required)
  language?: string;         // The language for syntax highlighting (default: 'javascript')
  showLineNumbers?: boolean; // Whether to show line numbers (default: false)
  wrapLines?: boolean;       // Whether to wrap long lines (default: false)
  lineNumberStyle?: React.CSSProperties; // Custom style for line numbers
  customStyle?: React.CSSProperties;     // Custom style for the code block
  className?: string;        // Additional CSS class for the container
  fileName?: string;         // Optional file name to display in header
  copyable?: boolean;        // Whether to show copy button (default: true)
}`}
              language="typescript"
              showLineNumbers={true}
            />
          </Card>
        </TabPane>

        <TabPane tab="Supported Languages" key="3">
          <Card className="mb-6">
            <Paragraph>
              The CodeHighlighter component supports the following languages:
            </Paragraph>

            <ul className="list-disc pl-6 mb-4">
              <li>JavaScript (js, javascript)</li>
              <li>TypeScript (ts, typescript)</li>
              <li>Python (py, python)</li>
              <li>HTML (html)</li>
              <li>CSS (css)</li>
              <li>JSON (json)</li>
              <li>SQL (sql)</li>
              <li>Bash/Shell (sh, bash)</li>
            </ul>

            <Paragraph>
              Additional languages can be added by importing and registering them in the CodeHighlighter component.
            </Paragraph>

            <CodeHighlighter
              code={`// Import additional language support
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';

// Register languages
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('java', java);`}
              language="javascript"
              showLineNumbers={true}
            />
          </Card>
        </TabPane>

        <TabPane tab="CodeExample Component" key="4">
          <Card className="mb-6">
            <Title level={4}>CodeExample Component</Title>
            <Paragraph>
              The CodeExample component combines a code snippet with explanatory text and additional content,
              making it perfect for documentation and tutorials.
            </Paragraph>

            <Divider />

            <CodeExample
              title="Basic Button Example"
              description="A simple button component with onClick handler. This example shows how to create a basic button with an event handler."
              code={`import React from 'react';
import { Button } from 'antd';

const MyButton = () => {
  const handleClick = () => {
    console.log('Button clicked!');
    // Add your logic here
  };

  return (
    <Button type="primary" onClick={handleClick}>
      Click Me
    </Button>
  );
};

export default MyButton;`}
              language="jsx"
              fileName="MyButton.jsx"
              showLineNumbers={true}
            />

            <CodeExample
              title="API Request Example"
              description={
                <>
                  <Paragraph>
                    This example demonstrates how to make an API request using React Query and handle loading, error, and success states.
                  </Paragraph>
                  <ul className="list-disc pl-6">
                    <li>Uses React Query for data fetching</li>
                    <li>Handles loading and error states</li>
                    <li>Displays data in a list</li>
                  </ul>
                </>
              }
              code={`import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { List, Spin, Alert } from 'antd';

const fetchUsers = async () => {
  const response = await fetch('https://api.example.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const UserList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert type="error" message={error.message} />;
  }

  return (
    <List
      dataSource={data}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            title={user.name}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
};

export default UserList;`}
              language="tsx"
              fileName="UserList.tsx"
              showLineNumbers={true}
              additionalContent={
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                  <Text strong>Note:</Text>
                  <Paragraph className="mb-0">
                    Remember to set up a React Query provider at the root of your application:
                  </Paragraph>
                  <CodeHighlighter
                    code={`import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
    </QueryClientProvider>
  );
}`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              }
            />

            <Title level={4}>Usage</Title>
            <CodeHighlighter
              code={`import CodeExample from '../components/CodeExample';

<CodeExample
  title="Example Title"
  description="Description text or React node"
  code={\`const example = 'code';\`}
  language="javascript"
  fileName="example.js"
  showLineNumbers={true}
  additionalContent={<div>Additional content here</div>}
/>`}
              language="tsx"
              showLineNumbers={true}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CodeHighlighterDemo;
