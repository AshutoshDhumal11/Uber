import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the output matches the Vercel config
  },
  server: {
    port: 3001, // Local development port
  },
  preview: {
    port: 5000, // Local production preview port
  },
});
