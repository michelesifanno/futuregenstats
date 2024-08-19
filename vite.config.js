import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  // Configurazione per gestire il fallback al file index.html
  server: {
    historyApiFallback: true,
    define: {
      'process.env': process.env
    },
    server: {
      proxy: process.env.NODE_ENV === 'development' ? {
        '/api': {
          target: 'https://www.fotmob.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      } : undefined, // Nessun proxy in produzione
    },
  },
});
