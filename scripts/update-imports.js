/**
 * Script to update import paths in the migrated files
 * Usage: node scripts/update-imports.js <file-path>
 * Example: node scripts/update-imports.js packages/agents/src/components/AIButton.tsx
 */

const fs = require('fs');
const path = require('path');

// Get file path from command line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path');
  process.exit(1);
}

// Resolve file path
const resolvedFilePath = path.resolve(process.cwd(), filePath);

// Check if file exists
if (!fs.existsSync(resolvedFilePath)) {
  console.error(`File does not exist: ${resolvedFilePath}`);
  process.exit(1);
}

// Import path mappings
const importMappings = [
  { from: 'cauldronos-ui', to: '@cauldronos/ui' },
  { from: 'cauldronos-hooks', to: '@cauldronos/hooks' },
  { from: 'cauldronos-utils', to: '@cauldronos/utils' },
  { from: 'cauldronos-agents', to: '@cauldronos/agents' },
  { from: 'cauldronos-api', to: '@cauldronos/api' },
  { from: '../../ui/', to: '@cauldronos/ui/' },
  { from: '../../hooks/', to: '@cauldronos/hooks/' },
  { from: '../../utils/', to: '@cauldronos/utils/' },
  { from: '../../api/', to: '@cauldronos/api/' },
  { from: '../../ai/', to: '@cauldronos/agents/' },
  { from: '../ui/', to: '@cauldronos/ui/' },
  { from: '../hooks/', to: '@cauldronos/hooks/' },
  { from: '../utils/', to: '@cauldronos/utils/' },
  { from: '../api/', to: '@cauldronos/api/' },
  { from: '../ai/', to: '@cauldronos/agents/' },
];

// Icon imports to update
const iconImports = [
  'RobotOutlined',
  'ThunderboltOutlined',
  'SendOutlined',
  'UserOutlined',
  'CloseOutlined',
  'ExpandOutlined',
  'CompressOutlined',
  'PushpinOutlined',
  'MinusOutlined',
  'SettingOutlined',
  'InfoCircleOutlined',
  'PlusOutlined',
  'CopyOutlined',
  'CheckOutlined',
  'CodeOutlined',
  'TableOutlined',
  'UnorderedListOutlined',
  'FileTextOutlined',
  'WarningOutlined',
  'LoadingOutlined',
  'BarChartOutlined',
  'SearchOutlined',
  'QuestionCircleOutlined',
  'ToolOutlined',
  'DeleteOutlined',
  'ExportOutlined',
  'ApiOutlined',
  'BranchesOutlined',
  'MoreOutlined',
  'ReloadOutlined',
  'BulbOutlined',
];

// Read file content
let content = fs.readFileSync(resolvedFilePath, 'utf8');

// Update import paths
importMappings.forEach(({ from, to }) => {
  const regex = new RegExp(`from ['"]${from}['"]`, 'g');
  content = content.replace(regex, `from '${to}'`);
});

// Update icon imports
const iconImportRegex = new RegExp(`import {([^}]*)} from ['"]cauldronos-ui['"]`, 'g');
content = content.replace(iconImportRegex, (match, importList) => {
  // Check if the import list contains any icons
  const hasIcons = iconImports.some(icon => importList.includes(icon));
  
  if (hasIcons) {
    // Extract non-icon imports
    const nonIconImports = importList
      .split(',')
      .map(item => item.trim())
      .filter(item => !iconImports.includes(item));
    
    // Extract icon imports
    const iconImportsList = importList
      .split(',')
      .map(item => item.trim())
      .filter(item => iconImports.includes(item));
    
    let result = '';
    
    // Add non-icon imports if any
    if (nonIconImports.length > 0) {
      result += `import { ${nonIconImports.join(', ')} } from '@cauldronos/ui';\n`;
    }
    
    // Add icon imports if any
    if (iconImportsList.length > 0) {
      result += `import { ${iconImportsList.join(', ')} } from '@ant-design/icons';`;
    }
    
    return result;
  }
  
  // If no icons, just update the import path
  return `import {${importList}} from '@cauldronos/ui'`;
});

// Write updated content back to file
fs.writeFileSync(resolvedFilePath, content);

console.log(`Updated imports in ${resolvedFilePath}`);