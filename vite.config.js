import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//https: vitejs.dev/config/
export default defineConfig({
  base: '/Response-201-Front/',
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
