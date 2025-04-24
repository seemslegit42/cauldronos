/**
 * Script to update import paths in all files in a directory
 * Usage: node scripts/update-all-imports.js <directory-path>
 * Example: node scripts/update-all-imports.js packages/agents/src
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get directory path from command line arguments
const directoryPath = process.argv[2];

if (!directoryPath) {
  console.error('Please provide a directory path');
  process.exit(1);
}

// Resolve directory path
const resolvedDirectoryPath = path.resolve(process.cwd(), directoryPath);

// Check if directory exists
if (!fs.existsSync(resolvedDirectoryPath)) {
  console.error(`Directory does not exist: ${resolvedDirectoryPath}`);
  process.exit(1);
}

// Function to recursively process files in a directory
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules
      if (entry.name === 'node_modules') {
        continue;
      }
      processDirectory(entryPath);
    } else {
      // Only process TypeScript and JavaScript files
      if (['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(entry.name))) {
        try {
          console.log(`Processing ${entryPath}...`);
          execSync(`node ${path.join(process.cwd(), 'scripts/update-imports.js')} ${entryPath}`);
        } catch (error) {
          console.error(`Error processing ${entryPath}: ${error.message}`);
        }
      }
    }
  }
}

console.log(`Updating imports in ${resolvedDirectoryPath}...`);
processDirectory(resolvedDirectoryPath);
console.log('Done!');