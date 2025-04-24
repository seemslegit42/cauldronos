/**
 * Script to update exports in each package's index.ts file
 * Usage: node scripts/update-exports.js <package-path>
 * Example: node scripts/update-exports.js packages/ui
 */

const fs = require('fs');
const path = require('path');

// Get package path from command line arguments
const packagePath = process.argv[2];

if (!packagePath) {
  console.error('Please provide a package path');
  process.exit(1);
}

// Resolve package path
const resolvedPackagePath = path.resolve(process.cwd(), packagePath);

// Check if package exists
if (!fs.existsSync(resolvedPackagePath)) {
  console.error(`Package does not exist: ${resolvedPackagePath}`);
  process.exit(1);
}

// Get package name
const packageName = path.basename(resolvedPackagePath);

// Get src directory
const srcDir = path.join(resolvedPackagePath, 'src');

// Check if src directory exists
if (!fs.existsSync(srcDir)) {
  console.error(`Src directory does not exist: ${srcDir}`);
  process.exit(1);
}

// Get index.ts file
const indexFile = path.join(srcDir, 'index.ts');

// Create index.ts file if it doesn't exist
if (!fs.existsSync(indexFile)) {
  fs.writeFileSync(indexFile, '');
}

// Get all directories in src
const directories = fs.readdirSync(srcDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Generate exports for each directory
const exports = directories.map(dir => {
  return `export * from './${dir}';`;
}).join('\n');

// Add types export
const typesExport = `export * from './types';`;

// Write exports to index.ts
fs.writeFileSync(indexFile, `/**
 * ${packageName} package
 */

${exports}
${typesExport}
`);

console.log(`Updated exports in ${indexFile}`);/**
 * Script to update exports in each package's index.ts file
 * Usage: node scripts/update-exports.js <package-path>
 * Example: node scripts/update-exports.js packages/ui
 */

const fs = require('fs');
const path = require('path');

// Get package path from command line arguments
const packagePath = process.argv[2];

if (!packagePath) {
  console.error('Please provide a package path');
  process.exit(1);
}

// Resolve package path
const resolvedPackagePath = path.resolve(process.cwd(), packagePath);

// Check if package exists
if (!fs.existsSync(resolvedPackagePath)) {
  console.error(`Package does not exist: ${resolvedPackagePath}`);
  process.exit(1);
}

// Get package name
const packageName = path.basename(resolvedPackagePath);

// Get src directory
const srcDir = path.join(resolvedPackagePath, 'src');

// Check if src directory exists
if (!fs.existsSync(srcDir)) {
  console.error(`Src directory does not exist: ${srcDir}`);
  process.exit(1);
}

// Get index.ts file
const indexFile = path.join(srcDir, 'index.ts');

// Create index.ts file if it doesn't exist
if (!fs.existsSync(indexFile)) {
  fs.writeFileSync(indexFile, '');
}

// Get all directories in src
const directories = fs.readdirSync(srcDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Generate exports for each directory
const exports = directories.map(dir => {
  return `export * from './${dir}';`;
}).join('\n');

// Add types export
const typesExport = `export * from './types';`;

// Write exports to index.ts
fs.writeFileSync(indexFile, `/**
 * ${packageName} package
 */

${exports}
${typesExport}
`);

console.log(`Updated exports in ${indexFile}`);