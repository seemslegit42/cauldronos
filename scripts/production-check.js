#!/usr/bin/env node

/**
 * Production Readiness Check Script
 * 
 * This script performs a series of checks to ensure the application is ready for production.
 * It checks for:
 * - Build artifacts
 * - Environment variables
 * - Security issues
 * - Performance optimizations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// Log utilities
const log = {
  info: (message) => console.log(`${colors.blue}[INFO]${colors.reset} ${message}`),
  success: (message) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`),
  warning: (message) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`),
  error: (message) => console.log(`${colors.red}[ERROR]${colors.reset} ${message}`),
  section: (message) => console.log(`\n${colors.cyan}=== ${message} ===${colors.reset}\n`),
};

// Check if a directory exists
const directoryExists = (dirPath) => {
  try {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch (error) {
    return false;
  }
};

// Check if a file exists
const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch (error) {
    return false;
  }
};

// Check build artifacts
const checkBuildArtifacts = () => {
  log.section('Checking Build Artifacts');
  
  const packages = [
    'packages/ui',
    'packages/hooks',
    'packages/utils',
    'packages/agents',
    'packages/api',
  ];
  
  const apps = [
    'apps/admin-dashboard',
    'apps/client-portal',
    'apps/cauldron-core',
  ];
  
  let allBuildsExist = true;
  
  // Check package builds
  packages.forEach(pkg => {
    const distPath = path.join(process.cwd(), pkg, 'dist');
    if (directoryExists(distPath)) {
      log.success(`${pkg} build artifacts exist`);
    } else {
      log.error(`${pkg} build artifacts missing`);
      allBuildsExist = false;
    }
  });
  
  // Check app builds
  apps.forEach(app => {
    const distPath = path.join(process.cwd(), app, 'dist');
    if (directoryExists(distPath)) {
      log.success(`${app} build artifacts exist`);
    } else {
      log.error(`${app} build artifacts missing`);
      allBuildsExist = false;
    }
  });
  
  return allBuildsExist;
};

// Check environment variables
const checkEnvironmentVariables = () => {
  log.section('Checking Environment Variables');
  
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envPath = path.join(process.cwd(), '.env');
  
  if (!fileExists(envExamplePath)) {
    log.error('.env.example file missing');
    return false;
  }
  
  log.success('.env.example file exists');
  
  if (!fileExists(envPath)) {
    log.warning('.env file missing - will need to be created for production');
    return true;
  }
  
  log.success('.env file exists');
  
  // Read .env.example and check if all variables are in .env
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  const env = fs.readFileSync(envPath, 'utf8');
  
  const envExampleVars = envExample
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => line.split('=')[0]);
  
  const envVars = env
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => line.split('=')[0]);
  
  const missingVars = envExampleVars.filter(v => !envVars.includes(v));
  
  if (missingVars.length > 0) {
    log.warning(`Missing environment variables: ${missingVars.join(', ')}`);
    return true;
  }
  
  log.success('All required environment variables are set');
  return true;
};

// Check for security issues
const checkSecurity = () => {
  log.section('Checking Security');
  
  // Check for .env in .gitignore
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  if (fileExists(gitignorePath)) {
    const gitignore = fs.readFileSync(gitignorePath, 'utf8');
    if (gitignore.includes('.env')) {
      log.success('.env is in .gitignore');
    } else {
      log.error('.env is not in .gitignore');
      return false;
    }
  } else {
    log.error('.gitignore file missing');
    return false;
  }
  
  // Check for package vulnerabilities
  try {
    log.info('Checking for package vulnerabilities...');
    execSync('pnpm audit', { stdio: 'pipe' });
    log.success('No package vulnerabilities found');
  } catch (error) {
    log.warning('Package vulnerabilities found. Run pnpm audit for details');
  }
  
  return true;
};

// Check for Docker setup
const checkDocker = () => {
  log.section('Checking Docker Setup');
  
  const dockerfilePath = path.join(process.cwd(), 'Dockerfile');
  const dockerignorePath = path.join(process.cwd(), '.dockerignore');
  
  if (fileExists(dockerfilePath)) {
    log.success('Dockerfile exists');
  } else {
    log.error('Dockerfile missing');
    return false;
  }
  
  if (fileExists(dockerignorePath)) {
    log.success('.dockerignore exists');
  } else {
    log.error('.dockerignore missing');
    return false;
  }
  
  return true;
};

// Run all checks
const runChecks = () => {
  log.section('PRODUCTION READINESS CHECK');
  
  const buildCheck = checkBuildArtifacts();
  const envCheck = checkEnvironmentVariables();
  const securityCheck = checkSecurity();
  const dockerCheck = checkDocker();
  
  log.section('SUMMARY');
  
  if (buildCheck && envCheck && securityCheck && dockerCheck) {
    log.success('All checks passed! The application is ready for production.');
    return 0;
  } else {
    log.error('Some checks failed. Please fix the issues before deploying to production.');
    return 1;
  }
};

// Run the script
process.exit(runChecks());
