# Script to convert the project to use pnpm

# Function to remove lock files and node_modules
function Clean-Project {
    param (
        [string]$directory
    )
    
    Write-Host "Cleaning $directory..."
    
    # Remove lock files
    if (Test-Path "$directory/package-lock.json") {
        Remove-Item "$directory/package-lock.json" -Force
        Write-Host "  Removed package-lock.json"
    }
    
    if (Test-Path "$directory/yarn.lock") {
        Remove-Item "$directory/yarn.lock" -Force
        Write-Host "  Removed yarn.lock"
    }
    
    # Remove node_modules
    if (Test-Path "$directory/node_modules") {
        Remove-Item "$directory/node_modules" -Recurse -Force
        Write-Host "  Removed node_modules"
    }
}

# Install pnpm if not already installed
Write-Host "Checking if pnpm is installed..."
$pnpmInstalled = $null
try {
    $pnpmInstalled = Get-Command pnpm -ErrorAction SilentlyContinue
} catch {
    $pnpmInstalled = $null
}

if ($null -eq $pnpmInstalled) {
    Write-Host "Installing pnpm..."
    npm install -g pnpm
}

# Clean root and all project directories
Write-Host "`n=== Cleaning project directories ==="
Clean-Project "."
Clean-Project "app"
Clean-Project "blog"
Clean-Project "e2e-tests"

# Also clean any nested node_modules in app/src/ui if it exists
if (Test-Path "app/src/ui") {
    Clean-Project "app/src/ui"
}

# Remove any existing pnpm-lock.yaml files to ensure fresh installation
if (Test-Path "pnpm-lock.yaml") {
    Remove-Item "pnpm-lock.yaml" -Force
    Write-Host "Removed root pnpm-lock.yaml"
}

if (Test-Path "app/pnpm-lock.yaml") {
    Remove-Item "app/pnpm-lock.yaml" -Force
    Write-Host "Removed app/pnpm-lock.yaml"
}

# Install dependencies using pnpm
Write-Host "`n=== Installing dependencies with pnpm ==="
pnpm install

Write-Host "`n=== Conversion to pnpm completed ==="
Write-Host "You can now use the following commands:"
Write-Host "  pnpm app:dev     - Run the app in development mode"
Write-Host "  pnpm app:build   - Build the app"
Write-Host "  pnpm blog:dev    - Run the blog in development mode"
Write-Host "  pnpm blog:build  - Build the blog"
Write-Host "  pnpm e2e:test    - Run end-to-end tests"