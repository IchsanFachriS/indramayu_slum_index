import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // PENTING: Untuk GitHub Pages, gunakan relative path
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemap untuk production
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  assetsInclude: ['**/*.tif', '**/*.tiff'],
  optimizeDeps: {
    include: ['xml-utils']
  }
})