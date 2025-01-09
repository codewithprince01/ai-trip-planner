import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures the app works well with paths in subdirectories or deployment platforms like Vercel.
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Alias path configuration.
    },
  },
});
