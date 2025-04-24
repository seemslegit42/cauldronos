# Using pnpm in this Project

This project uses [pnpm](https://pnpm.io/) as its package manager. pnpm offers several advantages over npm and yarn:

- Faster installation times
- Disk space efficiency through content-addressable storage
- Strict dependency resolution
- Built-in monorepo support

## Prerequisites

- Node.js (version 18 or higher)
- pnpm (version 8 or higher)

## Installation

If you don't have pnpm installed, you can install it using:

```bash
npm install -g pnpm
```

## Project Setup

To set up the project:

```bash
# Clone the repository
git clone <repository-url>
cd cauldronos

# Install dependencies
pnpm install
```

## Working with the Monorepo

This project is structured as a monorepo with the following packages:

- `app`: The main application
- `blog`: The blog site
- `e2e-tests`: End-to-end tests

You can run commands for specific packages using the root scripts:

```bash
# Run the main app in development mode
pnpm app:dev

# Build the blog
pnpm blog:build

# Run e2e tests
pnpm e2e:test
```

Or you can use pnpm's filter syntax to run commands in specific packages:

```bash
# Run a command in a specific package
pnpm --filter app dev
pnpm --filter blog build
```

## Adding Dependencies

To add a dependency to a specific package:

```bash
# Add a dependency to the app package
pnpm --filter app add <package-name>

# Add a dev dependency to the blog package
pnpm --filter blog add -D <package-name>
```

To add a dependency to the workspace root (shared across all packages):

```bash
pnpm add -w <package-name>
```

## Troubleshooting

If you encounter issues with dependencies or package installation:

1. Clean the project and reinstall dependencies:

```bash
# On Windows
./convert-to-pnpm.ps1

# On Linux/macOS
chmod +x ./convert-to-pnpm.sh
./convert-to-pnpm.sh
```

2. If specific packages fail to install, try installing them individually:

```bash
pnpm --filter <package-name> install
```

3. For native dependencies that require compilation, ensure you have the necessary build tools installed.

## Converting from npm/yarn

If you're working on a branch that still uses npm or yarn, run the conversion script:

```bash
# On Windows
./convert-to-pnpm.ps1

# On Linux/macOS
chmod +x ./convert-to-pnpm.sh
./convert-to-pnpm.sh
```

This script will:
- Remove all existing lock files (package-lock.json, yarn.lock)
- Clean all node_modules directories
- Install dependencies using pnpm

## Best Practices

1. Always use pnpm commands from the root directory
2. Use `pnpm --filter <package>` for package-specific operations
3. Keep the pnpm-workspace.yaml file updated if you add new packages
4. Run the conversion script if you pull changes that modify dependencies