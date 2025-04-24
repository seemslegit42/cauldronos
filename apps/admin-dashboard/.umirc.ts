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
  ],
  tailwindcss: {},
  reactQuery: {},
  npmClient: 'pnpm',
  routes: [
    {
      path: '/',
      component: '@/layouts/MainLayout',
      routes: [
        { path: '/', component: '@/pages/dashboard' },
        { path: '/users', component: '@/pages/users' },
        { path: '/settings', component: '@/pages/settings' },
        { path: '/ai', component: '@/pages/ai' },
        { path: '/modules', component: '@/pages/modules' },
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
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
  fastRefresh: true,
  jsMinifier: 'terser',
  cssMinifier: 'cssnano',
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
});