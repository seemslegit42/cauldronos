import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: [
    'react',
    'react-dom',
    'antd',
    '@ant-design/icons',
    '@cauldronos/ui',
    '@cauldronos/hooks',
    '@cauldronos/utils',
    'react-router-dom',
    'wasp/client/auth',
    'react-draggable',
    'react-markdown',
    'react-syntax-highlighter',
    'react-syntax-highlighter/dist/esm/styles/prism',
    'react-syntax-highlighter/dist/esm/languages/prism/javascript',
    'react-syntax-highlighter/dist/esm/languages/prism/typescript',
    'react-syntax-highlighter/dist/esm/languages/prism/python',
    'react-syntax-highlighter/dist/esm/languages/prism/bash',
    '@tanstack/react-query'
  ],
  esbuildOptions(options) {
    options.jsx = 'transform';
    options.jsxFactory = 'React.createElement';
    options.jsxFragment = 'React.Fragment';
  },
});
