import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: false,
        secure: false,
      },
      cors: false,
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://127.0.0.1:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Увеличиваем лимит предупреждений до 1000 KB (1 МБ)
  },
});
