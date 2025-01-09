import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output folder
    assetsDir: 'assets', // Folder for static assets
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Correctly resolve aliases
    },
  },
  server: {
    open: true, // Open the app in the browser
  },
  base: '/', // Ensure this matches your deployment root (default `/`)
});
