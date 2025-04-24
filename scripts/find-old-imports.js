/**
 * Script to find old import paths in the migrated files
 * Usage: node scripts/find-old-imports.js <directory>
 * Example: node scripts/find-old-imports.js packages/agents/src
 */

const fs = require('fs');
const path = require('path');

// Get directory from command line arguments
const directory = process.argv[2];

if (!directory) {
  console.error('Please provide a directory to search');
  process.exit(1);
}

// Resolve directory path
const resolvedDirectory = path.resolve(process.cwd(), directory);

// Check if directory exists
if (!fs.existsSync(resolvedDirectory)) {
  console.error(`Directory does not exist: ${resolvedDirectory}`);
  process.exit(1);
}

// Old import patterns to search for
const oldImportPatterns = [
  'cauldronos-ui',
  'cauldronos-hooks',
  'cauldronos-utils',
  'cauldronos-agents',
  'cauldronos-api',
  '../ui/',
  '../hooks/',
  '../utils/',
  '../ai/',
  '../api/',
  '../../ui/',
  '../../hooks/',
  '../../utils/',
  '../../ai/',
  '../../api/',
];

// Function to check if a file contains old import patterns
const checkFile = (filePath) => {
  // Skip node_modules
  if (filePath.includes('node_modules')) {
    return;
  }

  // Only check TypeScript and JavaScript files
  if (!['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(filePath))) {
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const matches = [];

    lines.forEach((line, index) => {
      if (line.includes('import ') || line.includes('from ')) {
        for (const pattern of oldImportPatterns) {
          if (line.includes(pattern)) {
            matches.push({
              line: index + 1,
              content: line.trim(),
              pattern,
            });
            break;
          }
        }
      }
    });

    if (matches.length > 0) {
      console.log(`\nFile: ${filePath}`);
      matches.forEach(match => {
        console.log(`  Line ${match.line}: ${match.content}`);
        console.log(`  Pattern: ${match.pattern}`);
      });
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
  }
};

// Function to recursively search a directory
const searchDirectory = (dirPath) => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      searchDirectory(entryPath);
    } else {
      checkFile(entryPath);
    }
  }
};

console.log(`Searching for old import patterns in ${resolvedDirectory}...`);
searchDirectory(resolvedDirectory);
console.log('Search completed.');