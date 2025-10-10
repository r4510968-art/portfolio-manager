import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'portfolio-manager' with your repo name
export default defineConfig({
  base: '/portfolio-manager/',
  plugins: [react()],
});
