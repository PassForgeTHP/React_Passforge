import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    appType: 'spa',
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(
        isDevelopment
          ? 'http://localhost:3000'
          : 'https://passforge-api.onrender.com'
      ),
    },
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
      proxy: {
        '/contacts': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  };
});
