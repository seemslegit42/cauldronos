#!/bin/bash
# Script to convert the project to use pnpm

# Function to clean a project directory
clean_project() {
    local dir=$1
    echo "Cleaning $dir..."
    
    # Remove lock files
    if [ -f "$dir/package-lock.json" ]; then
        rm -f "$dir/package-lock.json"
        echo "  Removed package-lock.json"
    fi
    
    if [ -f "$dir/yarn.lock" ]; then
        rm -f "$dir/yarn.lock"
        echo "  Removed yarn.lock"
    fi
    
    # Remove node_modules
    if [ -d "$dir/node_modules" ]; then
        rm -rf "$dir/node_modules"
        echo "  Removed node_modules"
    fi
}

# Install pnpm if not already installed
echo "Checking if pnpm is installed..."
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm
fi

# Clean root and all project directories
echo -e "\n=== Cleaning project directories ==="
clean_project "."
clean_project "app"
clean_project "blog"
clean_project "e2e-tests"

# Also clean any nested node_modules in app/src/ui if it exists
if [ -d "app/src/ui" ]; then
    clean_project "app/src/ui"
fi

# Remove any existing pnpm-lock.yaml files to ensure fresh installation
if [ -f "pnpm-lock.yaml" ]; then
    rm -f "pnpm-lock.yaml"
    echo "Removed root pnpm-lock.yaml"
fi

if [ -f "app/pnpm-lock.yaml" ]; then
    rm -f "app/pnpm-lock.yaml"
    echo "Removed app/pnpm-lock.yaml"
fi

# Install dependencies using pnpm
echo -e "\n=== Installing dependencies with pnpm ==="
pnpm install

echo -e "\n=== Conversion to pnpm completed ==="
echo "You can now use the following commands:"
echo "  pnpm app:dev     - Run the app in development mode"
echo "  pnpm app:build   - Build the app"
echo "  pnpm blog:dev    - Run the blog in development mode"
echo "  pnpm blog:build  - Build the blog"
echo "  pnpm e2e:test    - Run end-to-end tests"