import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      'avataaars': resolve(__dirname, '../dist/index.mjs')
    }
  },
  server: {
    port: 3000,
    open: true
  }
}) 