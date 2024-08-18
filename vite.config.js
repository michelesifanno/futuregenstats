import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Configurazione per gestire il fallback al file index.html
  server: {
    historyApiFallback: true,
  },
});
