import { cloudConfig, initializeCloudServices } from './cloud/config';
import { selfHostedConfig, initializeSelfHostedServices } from './self-hosted/config';

/**
 * Deployment type
 */
export type DeploymentType = 'cloud' | 'self-hosted';

/**
 * Detect the current deployment type
 */
export const detectDeploymentType = (): DeploymentType => {
  // Check for environment variable that explicitly sets deployment type
  if (process.env.DEPLOYMENT_TYPE === 'cloud') {
    return 'cloud';
  }
  
  if (process.env.DEPLOYMENT_TYPE === 'self-hosted') {
    return 'self-hosted';
  }
  
  // If not explicitly set, try to detect based on environment
  // For example, check for cloud-specific environment variables
  if (
    process.env.STORAGE_BUCKET ||
    process.env.VERCEL ||
    process.env.AWS_REGION ||
    process.env.AZURE_FUNCTIONS_ENVIRONMENT ||
    process.env.GOOGLE_CLOUD_PROJECT
  ) {
    return 'cloud';
  }
  
  // Default to self-hosted
  return 'self-hosted';
};

/**
 * Get configuration based on deployment type
 */
export const getConfig = () => {
  const deploymentType = detectDeploymentType();
  
  return deploymentType === 'cloud' ? cloudConfig : selfHostedConfig;
};

/**
 * Initialize services based on deployment type
 */
export const initializeDeployment = () => {
  const deploymentType = detectDeploymentType();
  
  console.log(`Initializing ${deploymentType} deployment`);
  
  if (deploymentType === 'cloud') {
    initializeCloudServices();
  } else {
    initializeSelfHostedServices();
  }
  
  return {
    deploymentType,
    config: getConfig(),
  };
};
