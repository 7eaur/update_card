import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  publicDir: '../src/assets',
  server: { fs: { allow: ['..'] } },
  build: { target: 'es2022', outDir: 'dist', emptyOutDir: true },
});
