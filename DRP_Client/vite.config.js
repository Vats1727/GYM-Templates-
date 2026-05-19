import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/GYM-Templates-/DRP_Server/public': {
        target: 'http://localhost',
        changeOrigin: true,
      }
    }
  }
})

