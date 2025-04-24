/**
 * Script to help migrate files from the old structure to the new monorepo structure
 * Usage: node scripts/migrate-files.js <source-path> <destination-path>
 * Example: node scripts/migrate-files.js app/src/ui/components packages/ui/src/atoms
 */

const fs = require('fs');
const path = require('path');

// Get source and destination paths from command line arguments
const sourcePath = process.argv[2];
const destinationPath = process.argv[3];

if (!sourcePath || !destinationPath) {
  console.error('Please provide source and destination paths');
  process.exit(1);
}

// Resolve paths
const resolvedSourcePath = path.resolve(process.cwd(), sourcePath);
const resolvedDestinationPath = path.resolve(process.cwd(), destinationPath);

// Check if source path exists
if (!fs.existsSync(resolvedSourcePath)) {
  console.error(`Source path does not exist: ${resolvedSourcePath}`);
  process.exit(1);
}

// Create destination directory if it doesn't exist
if (!fs.existsSync(resolvedDestinationPath)) {
  fs.mkdirSync(resolvedDestinationPath, { recursive: true });
}

/**
 * Copy a file or directory recursively
 * @param {string} source Source path
 * @param {string} destination Destination path
 */
function copyRecursive(source, destination) {
  // Get source stats
  const stats = fs.statSync(source);

  // If source is a directory, copy all its contents
  if (stats.isDirectory()) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    // Get all files and directories in the source directory
    const entries = fs.readdirSync(source);

    // Copy each entry recursively
    for (const entry of entries) {
      const sourcePath = path.join(source, entry);
      const destinationPath = path.join(destination, entry);
      copyRecursive(sourcePath, destinationPath);
    }
  } else {
    // If source is a file, copy it to the destination
    fs.copyFileSync(source, destination);
    console.log(`Copied: ${source} -> ${destination}`);
  }
}

// Copy files from source to destination
copyRecursive(resolvedSourcePath, resolvedDestinationPath);

console.log(`\nMigration completed:
- Source: ${resolvedSourcePath}
- Destination: ${resolvedDestinationPath}

Next steps:
1. Update imports in the copied files to use the new paths
2. Remove the original files if they are no longer needed
3. Run 'pnpm build' to build the packages
`);