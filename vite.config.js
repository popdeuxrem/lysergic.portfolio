import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './',
  publicDir: 'public',
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('rapier')) {
            return 'rapier'
          }
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three'
          }
        }
      }
    }
  }
})
