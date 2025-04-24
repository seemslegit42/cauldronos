import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom', 'antd', '@ant-design/icons', '@ant-design/pro-components', '@ant-design/x', 'framer-motion'],
});
