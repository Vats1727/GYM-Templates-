import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/gym_dev/gym_dev/server/public': {
        target: 'http://localhost',
        changeOrigin: true,
      }
    }
  }
})
