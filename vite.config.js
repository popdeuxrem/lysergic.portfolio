import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  publicDir: './static',
  plugins: [],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    sourcemap: true
  }
})
