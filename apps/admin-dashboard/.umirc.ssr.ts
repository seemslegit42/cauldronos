import { defineConfig } from 'umi';
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
      '/users': {},
      '/settings': {},
      '/ai': {},
      '/modules': {},
    },
    // Optimize SSR performance
    mode: 'stream',
    // Remove unused CSS in SSR
    removeUnusedCss: true,
  },
  // Optimize for production
  chunks: ['vendors', 'antd', 'framer-motion', 'umi'],
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
            antd: {
              name: 'antd',
              test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
              priority: 20,
            },
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 20,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 0,
              reuseExistingChunk: true,
            },
          },
        },
      },
    });
    return config;
  },
});
