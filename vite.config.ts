import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*', 'demo/**/*'],
      strictOutput: true,
      copyDtsFiles: false
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'Avataaars',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        }
      }
    },
    sourcemap: true,
    minify: false,
    target: 'es2022'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    typecheck: {
      enabled: true
    }
  }
}) 