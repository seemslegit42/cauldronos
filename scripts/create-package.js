/**
 * Script to create a new package in the monorepo
 * Usage: node scripts/create-package.js <package-name> <package-type>
 * Example: node scripts/create-package.js my-package app
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get package name and type from command line arguments
const packageName = process.argv[2];
const packageType = process.argv[3] || 'package'; // Default to 'package'

if (!packageName) {
  console.error('Please provide a package name');
  process.exit(1);
}

// Validate package type
const validTypes = ['app', 'package', 'config'];
if (!validTypes.includes(packageType)) {
  console.error(`Invalid package type: ${packageType}. Valid types are: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Determine package directory
let packageDir;
if (packageType === 'app') {
  packageDir = path.join(process.cwd(), 'apps', packageName);
} else if (packageType === 'config') {
  packageDir = path.join(process.cwd(), 'configs', packageName);
} else {
  packageDir = path.join(process.cwd(), 'packages', packageName);
}

// Create package directory
if (fs.existsSync(packageDir)) {
  console.error(`Package directory already exists: ${packageDir}`);
  process.exit(1);
}

fs.mkdirSync(packageDir, { recursive: true });
fs.mkdirSync(path.join(packageDir, 'src'), { recursive: true });

// Create package.json
const packageJson = {
  name: packageType === 'config' ? `@cauldronos/${packageName}-config` : `@cauldronos/${packageName}`,
  version: '0.1.0',
  private: true,
  main: './src/index.ts',
  types: './src/index.ts',
  scripts: {
    build: 'tsup',
    dev: 'tsup --watch',
    lint: 'eslint "src/**/*.ts*"',
    clean: 'rm -rf .turbo && rm -rf node_modules && rm -rf dist',
    typecheck: 'tsc --noEmit',
  },
  dependencies: {},
  devDependencies: {
    '@cauldronos/eslint-config': 'workspace:*',
    '@cauldronos/tsconfig': 'workspace:*',
    'eslint': '^8.39.0',
    'tsup': '^6.7.0',
    'typescript': '^5.0.4',
  },
};

// Add React dependencies for apps and UI-related packages
if (packageType === 'app' || packageName.includes('ui') || packageName.includes('components')) {
  packageJson.dependencies = {
    ...packageJson.dependencies,
    'react': '^18.2.0',
    'react-dom': '^18.2.0',
  };
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    '@types/react': '^18.2.0',
    '@types/react-dom': '^18.2.0',
  };
}

fs.writeFileSync(
  path.join(packageDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Create tsconfig.json
const tsConfig = {
  extends: packageType === 'app' 
    ? '../../configs/tsconfig/react.json'
    : '../../configs/tsconfig/base.json',
  include: ['src'],
  exclude: ['node_modules', 'dist'],
};

if (packageType === 'app') {
  tsConfig.compilerOptions = {
    baseUrl: '.',
    paths: {
      '@/*': ['./src/*'],
    },
  };
}

fs.writeFileSync(
  path.join(packageDir, 'tsconfig.json'),
  JSON.stringify(tsConfig, null, 2)
);

// Create index.ts
fs.writeFileSync(
  path.join(packageDir, 'src', 'index.ts'),
  `// ${packageName} package\n\nexport const hello = () => {\n  return 'Hello from ${packageName}';\n};\n`
);

// Create README.md
fs.writeFileSync(
  path.join(packageDir, 'README.md'),
  `# @cauldronos/${packageName}\n\n${packageType === 'app' ? 'Application' : 'Package'} for the CauldronOS platform.\n\n## Development\n\n\`\`\`bash\n# Install dependencies\npnpm install\n\n# Build the package\npnpm build\n\n# Run in watch mode during development\npnpm dev\n\`\`\`\n`
);

console.log(`Created ${packageType} '${packageName}' at ${packageDir}`);

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('pnpm install', { stdio: 'inherit' });
  console.log('Dependencies installed successfully');
} catch (error) {
  console.error('Failed to install dependencies:', error.message);
}

console.log(`\nNext steps:
1. Add your code to ${packageDir}/src
2. Import the package in your application
3. Run 'pnpm build' to build the package
4. Run 'pnpm dev' to start development mode
`);