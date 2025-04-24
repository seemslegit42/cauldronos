import { defineConfig } from 'umi';
import { join } from 'path';
import baseConfig from './.umirc';

export default defineConfig({
  ...baseConfig,
  ssr: {
    // Enable SSR
    serverBuildPath: './dist/umi.server.js',
    builder: 'webpack',
    // Prerender specific routes
    staticRoutes: {
      '/': { extraRoutePaths: ['/dashboard'] },
    },
    // Optimize SSR performance
    mode: 'stream',
    // Remove unused CSS in SSR
    removeUnusedCss: true,
  },
  // Optimize for production
  chunks: ['vendors', 'umi'],
  chainWebpack: (config, { webpack }) => {
    // Add optimization for SSR build
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 1,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
            },
          },
        },
      },
    });
    return config;
  },
});
