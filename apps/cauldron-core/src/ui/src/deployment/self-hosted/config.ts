/**
 * Self-hosted deployment configuration
 * 
 * This file contains configuration specific to self-hosted deployments.
 */

export const selfHostedConfig = {
  // API endpoints
  apiUrl: process.env.REACT_APP_API_URL || '/api',
  
  // Authentication
  authConfig: {
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    clerkApiKey: process.env.CLERK_API_KEY,
  },
  
  // Storage
  storageConfig: {
    path: process.env.STORAGE_PATH || '/data/storage',
  },
  
  // Database
  databaseConfig: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'cauldronos',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
  },
  
  // Server
  serverConfig: {
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || '0.0.0.0',
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['*'],
  },
  
  // Monitoring
  monitoringConfig: {
    loggingLevel: process.env.LOGGING_LEVEL || 'info',
    logFilePath: process.env.LOG_FILE_PATH || '/var/log/cauldronos',
  },
  
  // Feature flags
  featureFlags: {
    enableAI: process.env.ENABLE_AI === 'true',
    enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
    enableBilling: process.env.ENABLE_BILLING === 'true',
  },
};

/**
 * Initialize self-hosted specific services
 */
export const initializeSelfHostedServices = () => {
  // Initialize local file storage
  if (selfHostedConfig.storageConfig.path) {
    // Initialize local storage
    console.log('Initializing local file storage');
  }
  
  // Initialize local monitoring
  if (selfHostedConfig.monitoringConfig.logFilePath) {
    // Initialize local logging
    console.log('Initializing local logging');
  }
  
  // Initialize other self-hosted services
  console.log('Self-hosted services initialized');
};
