import { defineConfig } from 'umi';

export default defineConfig({
  title: 'CauldronOS Admin Dashboard',
  favicons: ['/favicon.ico'],
  metas: [
    { name: 'description', content: 'CauldronOS Admin Dashboard' },
    { name: 'theme-color', content: '#00F0FF' }, // Updated to match cyberpunk theme
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
    strategy: 'normal',
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
  } : false,
});