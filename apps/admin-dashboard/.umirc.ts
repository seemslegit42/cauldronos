import { defineConfig } from 'umi';

export default defineConfig({
  title: 'CauldronOS Admin Dashboard',
  favicons: ['/favicon.ico'],
  metas: [
    { name: 'description', content: 'CauldronOS Admin Dashboard' },
    { name: 'theme-color', content: '#00F0FF' }, // Cyberpunk theme color
  ],
  plugins: [
    '@umijs/plugins/dist/tailwindcss',
    '@umijs/plugins/dist/react-query',
    '@umijs/plugins/dist/access',
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/locale',
    '@umijs/plugins/dist/model',
  ],
  tailwindcss: {},
  reactQuery: {},
  npmClient: 'pnpm',

  // Access control configuration
  access: {},
  initialState: {},

  // i18n configuration
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
    baseSeparator: '-',
    title: true,
  },

  // Model configuration
  model: {},

  // Routes with access control
  routes: [
    {
      path: '/',
      component: '@/layouts/MainLayout',
      routes: [
        { path: '/', component: '@/pages/dashboard' },
        {
          path: '/users',
          component: '@/pages/users',
          access: 'canManageUsers', // Access control
        },
        {
          path: '/settings',
          component: '@/pages/settings',
          access: 'canManageSettings', // Access control
        },
        {
          path: '/ai',
          component: '@/pages/ai',
          access: 'canAccessAI', // Access control
        },
        {
          path: '/ai/crew-demo',
          component: '@/pages/ai/crew-demo',
          access: 'canAccessAI', // Access control
        },
        {
          path: '/modules',
          component: '@/pages/modules',
          access: 'canManageModules', // Access control
        },
        { path: '*', component: '@/pages/404' },
      ],
    },
  ],
  alias: {
    '@': './src',
    '@cauldronos/ui': '../../packages/ui/src',
    '@cauldronos/hooks': '../../packages/hooks/src',
    '@cauldronos/utils': '../../packages/utils/src',
    '@cauldronos/agents': '../../packages/agents/src',
    '@cauldronos/api': '../../packages/api/src',
  },
  publicPath: '/',
  hash: true,
  history: {
    type: 'browser',
  },
  targets: {
    chrome: 80,
    firefox: 80,
    safari: 13,
    edge: 80,
  },

  // Code splitting optimization
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },

  // Development tools
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,

  // Fast refresh for development
  fastRefresh: true,

  // Minifiers for production
  jsMinifier: 'terser',
  cssMinifier: 'cssnano',

  // MFSU optimization for faster development
  mfsu: {
    strategy: 'eager',
    esbuild: true,
  },

  // Proxy configuration
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },

  // SSR configuration for production
  ssr: process.env.NODE_ENV === 'production' ? {
    serverBuildPath: './dist/umi.server.js',
    builder: 'webpack',
    mode: 'stream',
    staticRoutes: {
      '/': { extraRoutePaths: ['/dashboard'] },
    },
    removeUnusedCss: true,
  } : false,

  // Webpack optimization
  chainWebpack: (config, { webpack }) => {
    // Add optimization for production build
    if (process.env.NODE_ENV === 'production') {
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
    }
    return config;
  },
});